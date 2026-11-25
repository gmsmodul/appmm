import type { WebSocket } from 'ws';

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';
export type QuizMode = 'classic' | 'test';

export interface ServerQuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctOptionIndex?: number;
  acceptedAnswers?: string[];
  timeLimitSec: number;
  points: number;
  explanation?: string;
}

export interface ServerQuiz {
  id: string;
  title: string;
  subject: string;
  classCode: string;
  description: string;
  theme: string;
  createdAt: string;
  questions: ServerQuizQuestion[];
}

export interface RoomSettings {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showExplanation: boolean;
  streakBonus: boolean;
}

export interface ParticipantAnswer {
  questionId: string;
  isCorrect: boolean;
  pointsAwarded: number;
  timeTakenMs: number;
  submittedValue: string;
  selectedOptionIndex?: number;
}

interface InternalParticipant {
  id: string;
  name: string;
  avatarColor: string;
  connected: boolean;
  socket: WebSocket | null;
  score: number;
  streak: number;
  bestStreak: number;
  correctCount: number;
  answeredCount: number;
  tabSwitches: number;
  finished: boolean;
  answers: ParticipantAnswer[];
}

interface InternalRoom {
  code: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  hostClientId: string;
  hostSockets: Set<WebSocket>;
  mode: QuizMode;
  settings: RoomSettings;
  status: 'lobby' | 'countdown' | 'active' | 'ended';
  countdownEndsAt?: number;
  countdownTimer?: ReturnType<typeof setTimeout>;
  paused: boolean;
  rawQuestions: ServerQuizQuestion[];
  preparedQuestions: ServerQuizQuestion[];
  participants: Map<string, InternalParticipant>;
  createdAt: number;
  startedAt?: string;
  endedAt?: string;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function normalizeAnswer(val: string): string {
  return val.trim().toLowerCase().replace(/\s+/g, ' ');
}

function safeSend(socket: WebSocket | null, payload: unknown): void {
  if (!socket || socket.readyState !== 1) return;
  try {
    socket.send(JSON.stringify(payload));
  } catch {
    // Ignore transient closed socket write errors
  }
}

export class LiveQuizRoomManager {
  private rooms = new Map<string, InternalRoom>();
  private socketMeta = new Map<WebSocket, { code: string; role: 'host' | 'participant'; clientId: string }>();

  private generateUniqueCode(): string {
    for (let attempt = 0; attempt < 30; attempt++) {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      if (!this.rooms.has(code)) return code;
    }
    return String(Date.now()).slice(-6);
  }

  private buildQuestionStats(room: InternalRoom) {
    const list = room.preparedQuestions.length > 0 ? room.preparedQuestions : room.rawQuestions;
    const participants = Array.from(room.participants.values());
    return list.map((q) => {
      let totalAttempts = 0;
      let correctAttempts = 0;
      const optionCounts = Array.isArray(q.options) ? new Array(q.options.length).fill(0) : [];
      for (const p of participants) {
        const ans = p.answers.find((a) => a.questionId === q.id);
        if (ans) {
          totalAttempts += 1;
          if (ans.isCorrect) correctAttempts += 1;
          if (
            typeof ans.selectedOptionIndex === 'number' &&
            ans.selectedOptionIndex >= 0 &&
            ans.selectedOptionIndex < optionCounts.length
          ) {
            optionCounts[ans.selectedOptionIndex] += 1;
          }
        }
      }
      const accuracyPct = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
      return {
        questionId: q.id,
        prompt: q.prompt,
        type: q.type,
        totalAttempts,
        correctAttempts,
        accuracyPct,
        optionCounts,
      };
    });
  }

  private serializeParticipants(room: InternalRoom, maskTestScores: boolean) {
    return Array.from(room.participants.values())
      .map((p) => ({
        id: p.id,
        name: p.name,
        avatarColor: p.avatarColor,
        connected: p.connected,
        score: maskTestScores ? 0 : p.score,
        streak: maskTestScores ? 0 : p.streak,
        bestStreak: maskTestScores ? 0 : p.bestStreak,
        correctCount: maskTestScores ? 0 : p.correctCount,
        answeredCount: p.answeredCount,
        tabSwitches: p.tabSwitches,
        finished: p.finished,
        answers: maskTestScores
          ? p.answers.map((a) => ({
              ...a,
              isCorrect: false,
              pointsAwarded: 0,
            }))
          : p.answers,
      }))
      .sort((a, b) => b.score - a.score || b.answeredCount - a.answeredCount);
  }

  private buildHostState(room: InternalRoom) {
    const activeQuestions = room.preparedQuestions.length > 0 ? room.preparedQuestions : room.rawQuestions;
    return {
      type: 'room:state',
      payload: {
        code: room.code,
        quizId: room.quizId,
        quizTitle: room.quizTitle,
        subject: room.subject,
        mode: room.mode,
        settings: room.settings,
        status: room.status,
        countdownEndsAt: room.countdownEndsAt,
        paused: room.paused,
        role: 'host',
        totalQuestions: activeQuestions.length,
        participants: this.serializeParticipants(room, false),
        hostQuestions: activeQuestions,
        questionStats: this.buildQuestionStats(room),
        startedAt: room.startedAt,
        endedAt: room.endedAt,
      },
    };
  }

  private buildParticipantState(room: InternalRoom, participantId: string) {
    const activeQuestions = room.preparedQuestions.length > 0 ? room.preparedQuestions : room.rawQuestions;
    const participant = room.participants.get(participantId);
    const maskTestScores = room.mode === 'test' && room.status === 'active';
    const allowReview =
      room.status === 'ended' || (room.mode === 'classic' && Boolean(participant?.finished));
    const questionsForParticipant =
      room.status === 'active' || room.status === 'ended'
        ? activeQuestions.map((q) => ({
            id: q.id,
            type: q.type,
            prompt: q.prompt,
            options: q.options,
            timeLimitSec: q.timeLimitSec,
            points: q.points,
          }))
        : undefined;

    return {
      type: 'room:state',
      payload: {
        code: room.code,
        quizId: room.quizId,
        quizTitle: room.quizTitle,
        subject: room.subject,
        mode: room.mode,
        settings: room.settings,
        status: room.status,
        countdownEndsAt: room.countdownEndsAt,
        paused: room.paused,
        role: 'participant',
        participantId,
        totalQuestions: activeQuestions.length,
        participants: this.serializeParticipants(room, maskTestScores),
        questionsForParticipant,
        reviewQuestions: allowReview ? activeQuestions : undefined,
        questionStats: room.status === 'ended' ? this.buildQuestionStats(room) : undefined,
        startedAt: room.startedAt,
        endedAt: room.endedAt,
      },
    };
  }

  private sendToHosts(room: InternalRoom, message: unknown): void {
    for (const hs of Array.from(room.hostSockets)) {
      if (hs.readyState === 1) {
        safeSend(hs, message);
      } else {
        room.hostSockets.delete(hs);
      }
    }
  }

  private broadcastRoomState(room: InternalRoom): void {
    this.sendToHosts(room, this.buildHostState(room));
    for (const p of room.participants.values()) {
      safeSend(p.socket, this.buildParticipantState(room, p.id));
    }
  }

  public getRoomSummary(code: string) {
    const room = this.rooms.get(code.trim());
    if (!room) return null;
    return {
      code: room.code,
      quizTitle: room.quizTitle,
      subject: room.subject,
      mode: room.mode,
      status: room.status,
      participantCount: room.participants.size,
      totalQuestions: room.rawQuestions.length,
    };
  }

  public handleMessage(ws: WebSocket, rawData: string): void {
    let msg: { type?: string; payload?: Record<string, unknown> };
    try {
      msg = JSON.parse(rawData);
    } catch {
      safeSend(ws, { type: 'room:error', payload: { message: 'Format pesan WebSocket tidak valid.' } });
      return;
    }

    const type = msg.type;
    const payload = (msg.payload || {}) as Record<string, unknown>;

    if (type === 'host:create') {
      const quiz = payload.quiz as ServerQuiz | undefined;
      const hostClientId = String(payload.hostClientId || '');
      const mode = (payload.mode === 'test' ? 'test' : 'classic') as QuizMode;
      const rawSettings = (payload.settings || {}) as Partial<RoomSettings>;
      if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        safeSend(ws, { type: 'room:error', payload: { message: 'Kuis harus memiliki minimal 1 pertanyaan.' } });
        return;
      }

      const code = this.generateUniqueCode();
      const settings: RoomSettings = {
        shuffleQuestions: Boolean(rawSettings.shuffleQuestions),
        shuffleOptions: Boolean(rawSettings.shuffleOptions),
        showExplanation: rawSettings.showExplanation !== undefined ? Boolean(rawSettings.showExplanation) : mode === 'classic',
        streakBonus: mode === 'classic' ? rawSettings.streakBonus !== false : false,
      };

      const room: InternalRoom = {
        code,
        quizId: quiz.id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        hostClientId,
        hostSockets: new Set([ws]),
        mode,
        settings,
        status: 'lobby',
        paused: false,
        rawQuestions: quiz.questions,
        preparedQuestions: [],
        participants: new Map(),
        createdAt: Date.now(),
      };

      this.rooms.set(code, room);
      this.socketMeta.set(ws, { code, role: 'host', clientId: hostClientId });
      safeSend(ws, this.buildHostState(room));
      return;
    }

    if (type === 'host:reconnect') {
      const code = String(payload.code || '').trim();
      const hostClientId = String(payload.hostClientId || '');
      const room = this.rooms.get(code);
      if (!room || (hostClientId && room.hostClientId !== hostClientId)) {
        safeSend(ws, { type: 'room:error', payload: { message: 'Sesi Host tidak ditemukan atau telah kedaluwarsa.' } });
        return;
      }
      room.hostSockets.add(ws);
      this.socketMeta.set(ws, { code, role: 'host', clientId: room.hostClientId });
      safeSend(ws, this.buildHostState(room));
      return;
    }

    if (type === 'host:update_settings') {
      const code = String(payload.code || '').trim();
      const hostClientId = String(payload.hostClientId || '');
      const room = this.rooms.get(code);
      if (!room || room.hostClientId !== hostClientId || room.status !== 'lobby') return;

      if (payload.mode === 'classic' || payload.mode === 'test') {
        room.mode = payload.mode;
      }
      const nextSettings = (payload.settings || {}) as Partial<RoomSettings>;
      room.settings = {
        shuffleQuestions: nextSettings.shuffleQuestions ?? room.settings.shuffleQuestions,
        shuffleOptions: nextSettings.shuffleOptions ?? room.settings.shuffleOptions,
        showExplanation: nextSettings.showExplanation ?? room.settings.showExplanation,
        streakBonus: room.mode === 'classic' ? (nextSettings.streakBonus ?? room.settings.streakBonus) : false,
      };
      this.broadcastRoomState(room);
      return;
    }

    if (type === 'host:kick') {
      const code = String(payload.code || '').trim();
      const hostClientId = String(payload.hostClientId || '');
      const participantId = String(payload.participantId || '');
      const room = this.rooms.get(code);
      if (!room || room.hostClientId !== hostClientId) return;

      const target = room.participants.get(participantId);
      if (target) {
        safeSend(target.socket, { type: 'room:kicked', payload: { message: 'Host mengeluarkan Anda dari ruangan.' } });
        if (target.socket) this.socketMeta.delete(target.socket);
        room.participants.delete(participantId);
        this.broadcastRoomState(room);
      }
      return;
    }

    if (type === 'host:start') {
      const code = String(payload.code || '').trim();
      const hostClientId = String(payload.hostClientId || '');
      const room = this.rooms.get(code);
      if (!room || room.hostClientId !== hostClientId) return;
      if (room.status !== 'lobby') return;

      let prepared = room.rawQuestions.map((q) => ({ ...q, options: [...(q.options || [])] }));
      if (room.settings.shuffleQuestions) {
        prepared = shuffleArray(prepared);
      }
      if (room.settings.shuffleOptions) {
        prepared = prepared.map((q) => {
          if (q.type !== 'multiple_choice' || q.options.length < 2) return q;
          const indexed = q.options.map((opt, idx) => ({ opt, isCorrect: idx === q.correctOptionIndex }));
          const shuffled = shuffleArray(indexed);
          return {
            ...q,
            options: shuffled.map((item) => item.opt),
            correctOptionIndex: shuffled.findIndex((item) => item.isCorrect),
          };
        });
      }

      room.preparedQuestions = prepared;
      room.paused = false;
      room.status = 'countdown';
      room.countdownEndsAt = Date.now() + 3000;
      if (room.countdownTimer) {
        clearTimeout(room.countdownTimer);
      }
      this.broadcastRoomState(room);

      room.countdownTimer = setTimeout(() => {
        if (room.status !== 'countdown') return;
        room.status = 'active';
        room.countdownEndsAt = undefined;
        room.countdownTimer = undefined;
        room.startedAt = new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        });
        this.broadcastRoomState(room);
      }, 3050);
      return;
    }

    if (type === 'host:toggle_pause') {
      const code = String(payload.code || '').trim();
      const hostClientId = String(payload.hostClientId || '');
      const room = this.rooms.get(code);
      if (!room || room.hostClientId !== hostClientId) return;
      if (room.status !== 'active') return;

      room.paused = !room.paused;
      this.broadcastRoomState(room);
      return;
    }

    if (type === 'host:end') {
      const code = String(payload.code || '').trim();
      const hostClientId = String(payload.hostClientId || '');
      const room = this.rooms.get(code);
      if (!room || room.hostClientId !== hostClientId) return;

      if (room.countdownTimer) {
        clearTimeout(room.countdownTimer);
        room.countdownTimer = undefined;
      }
      room.countdownEndsAt = undefined;
      room.paused = false;
      if (room.preparedQuestions.length === 0) {
        room.preparedQuestions = room.rawQuestions.map((q) => ({ ...q, options: [...(q.options || [])] }));
      }
      room.status = 'ended';
      room.endedAt = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      this.broadcastRoomState(room);
      return;
    }

    if (type === 'participant:join') {
      const code = String(payload.code || '').trim();
      const name = String(payload.name || '').trim();
      const participantId = String(payload.participantId || '').trim();
      const avatarColor = String(payload.avatarColor || 'bg-[#D6D4FF] text-[#3F3B99]');

      const room = this.rooms.get(code);
      if (!room) {
        safeSend(ws, { type: 'room:error', payload: { message: `Ruangan dengan kode ${code} tidak ditemukan.` } });
        return;
      }

      const existing = room.participants.get(participantId);
      if (!existing && room.status === 'ended') {
        safeSend(ws, { type: 'room:error', payload: { message: 'Sesi LiveQuiz ini sudah berakhir.' } });
        return;
      }

      if (!name && !existing) {
        safeSend(ws, { type: 'room:error', payload: { message: 'Masukkan nama peserta terlebih dahulu.' } });
        return;
      }

      if (existing) {
        existing.socket = ws;
        existing.connected = true;
        if (name) existing.name = name;
        this.socketMeta.set(ws, { code, role: 'participant', clientId: participantId });
        this.broadcastRoomState(room);
        return;
      }

      const participant: InternalParticipant = {
        id: participantId,
        name: name.slice(0, 32),
        avatarColor,
        connected: true,
        socket: ws,
        score: 0,
        streak: 0,
        bestStreak: 0,
        correctCount: 0,
        answeredCount: 0,
        tabSwitches: 0,
        finished: false,
        answers: [],
      };
      room.participants.set(participantId, participant);
      this.socketMeta.set(ws, { code, role: 'participant', clientId: participantId });
      this.broadcastRoomState(room);
      return;
    }

    if (type === 'participant:answer') {
      const code = String(payload.code || '').trim();
      const participantId = String(payload.participantId || '').trim();
      const questionId = String(payload.questionId || '').trim();
      const selectedOptionIndex = typeof payload.selectedOptionIndex === 'number' ? payload.selectedOptionIndex : -1;
      const textAnswer = typeof payload.textAnswer === 'string' ? payload.textAnswer : '';
      const timeTakenMs = Math.max(0, Number(payload.timeTakenMs || 0));

      const room = this.rooms.get(code);
      if (!room || room.status !== 'active' || room.paused) return;
      const participant = room.participants.get(participantId);
      if (!participant) return;

      // Idempotent guard against duplicate submits or reconnect retries
      const existingAnswer = participant.answers.find((a) => a.questionId === questionId);
      const question = room.preparedQuestions.find((q) => q.id === questionId);
      if (!question) return;

      if (existingAnswer) {
        safeSend(ws, {
          type: 'answer:result',
          payload:
            room.mode === 'test'
              ? {
                  questionId,
                  isCorrect: false,
                  pointsAwarded: 0,
                  totalScore: 0,
                  streak: 0,
                }
              : {
                  questionId,
                  isCorrect: existingAnswer.isCorrect,
                  pointsAwarded: existingAnswer.pointsAwarded,
                  totalScore: participant.score,
                  streak: participant.streak,
                  correctDisplay:
                    question.type === 'short_answer'
                      ? (question.acceptedAnswers || [])[0] || ''
                      : question.options[question.correctOptionIndex ?? 0] || '',
                  explanation: room.settings.showExplanation ? question.explanation : undefined,
                },
        });
        return;
      }

      let isCorrect = false;
      let submittedValue = '';

      if (question.type === 'short_answer') {
        submittedValue = textAnswer.trim();
        const normalized = normalizeAnswer(textAnswer);
        const accepted = (question.acceptedAnswers || []).map(normalizeAnswer).filter(Boolean);
        isCorrect = normalized.length > 0 && accepted.includes(normalized);
      } else {
        submittedValue =
          selectedOptionIndex >= 0 && selectedOptionIndex < question.options.length
            ? question.options[selectedOptionIndex]
            : 'Waktu Habis';
        isCorrect = selectedOptionIndex === question.correctOptionIndex;
      }

      let pointsAwarded = 0;
      if (isCorrect) {
        if (room.mode === 'classic') {
          const totalMs = Math.max(1000, question.timeLimitSec * 1000);
          const speedRatio = Math.max(0, Math.min(1, 1 - timeTakenMs / totalMs));
          const speedBonus = Math.round(question.points * 0.4 * speedRatio);
          participant.streak += 1;
          participant.bestStreak = Math.max(participant.bestStreak, participant.streak);
          const streakBonus = room.settings.streakBonus ? Math.min(500, (participant.streak - 1) * 100) : 0;
          pointsAwarded = question.points + speedBonus + streakBonus;
        } else {
          pointsAwarded = question.points;
        }
        participant.correctCount += 1;
      } else {
        participant.streak = 0;
      }

      participant.score += pointsAwarded;
      participant.answeredCount += 1;
      participant.answers.push({
        questionId,
        isCorrect,
        pointsAwarded,
        timeTakenMs,
        submittedValue,
        selectedOptionIndex: question.type !== 'short_answer' ? selectedOptionIndex : undefined,
      });

      if (participant.answeredCount >= room.preparedQuestions.length) {
        participant.finished = true;
      }

      const correctDisplay =
        question.type === 'short_answer'
          ? (question.acceptedAnswers || [])[0] || ''
          : question.options[question.correctOptionIndex ?? 0] || '';

      safeSend(ws, {
        type: 'answer:result',
        payload:
          room.mode === 'test'
            ? {
                questionId,
                isCorrect: false,
                pointsAwarded: 0,
                totalScore: 0,
                streak: 0,
              }
            : {
                questionId,
                isCorrect,
                pointsAwarded,
                totalScore: participant.score,
                streak: participant.streak,
                correctDisplay,
                explanation: room.settings.showExplanation ? question.explanation : undefined,
              },
      });

      const allParticipants = Array.from(room.participants.values());
      const allFinished =
        allParticipants.length > 0 && allParticipants.every((p) => p.finished);

      if (allFinished) {
        room.paused = false;
        room.status = 'ended';
        room.endedAt = new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        this.broadcastRoomState(room);
        return;
      }

      // Notify Host immediately; in Classic mode also update participants' live leaderboard
      this.sendToHosts(room, this.buildHostState(room));
      if (room.mode === 'classic') {
        for (const p of room.participants.values()) {
          safeSend(p.socket, this.buildParticipantState(room, p.id));
        }
      } else {
        safeSend(participant.socket, this.buildParticipantState(room, participant.id));
      }
      return;
    }

    if (type === 'participant:tab_switch') {
      const code = String(payload.code || '').trim();
      const participantId = String(payload.participantId || '').trim();
      const room = this.rooms.get(code);
      if (!room || room.mode !== 'test' || room.status !== 'active') return;
      const participant = room.participants.get(participantId);
      if (!participant || participant.finished) return;

      participant.tabSwitches += 1;
      this.sendToHosts(room, this.buildHostState(room));
      return;
    }

    if (type === 'participant:update_name') {
      const code = String(payload.code || '').trim();
      const participantId = String(payload.participantId || '').trim();
      const nextName = String(payload.name || '').trim().slice(0, 32);
      const room = this.rooms.get(code);
      if (!room || !nextName) return;
      const participant = room.participants.get(participantId);
      if (!participant) return;

      participant.name = nextName;
      this.broadcastRoomState(room);
      return;
    }

    if (type === 'participant:emote') {
      const code = String(payload.code || '').trim();
      const participantId = String(payload.participantId || '').trim();
      const emoji = String(payload.emoji || '').trim().slice(0, 8);
      const room = this.rooms.get(code);
      if (!room || !emoji) return;
      const participant = room.participants.get(participantId);
      if (!participant) return;

      const emoteEvent = {
        type: 'room:emote',
        payload: {
          id: `${participantId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          participantId,
          name: participant.name,
          emoji,
        },
      };
      this.sendToHosts(room, emoteEvent);
      for (const p of room.participants.values()) {
        safeSend(p.socket, emoteEvent);
      }
      return;
    }

    if (type === 'room:leave') {
      this.handleDisconnect(ws, true);
    }
  }

  public handleDisconnect(ws: WebSocket, explicitLeave = false): void {
    const meta = this.socketMeta.get(ws);
    if (!meta) return;
    this.socketMeta.delete(ws);

    const room = this.rooms.get(meta.code);
    if (!room) return;

    if (meta.role === 'host') {
      room.hostSockets.delete(ws);
      return;
    }

    const participant = room.participants.get(meta.clientId);
    if (!participant) return;

    if (explicitLeave && room.status === 'lobby') {
      room.participants.delete(meta.clientId);
    } else if (participant.socket === ws) {
      participant.connected = false;
      participant.socket = null;
    }

    this.broadcastRoomState(room);
  }
}
