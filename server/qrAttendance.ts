import crypto from 'crypto';

export type QrCutoffMode = 'schedule' | 'relative';

export interface QrAttendanceSession {
  id: string;
  scheduleId: string;
  classCode: string;
  subject: string;
  room: string;
  dateStr: string;
  startHour: string;
  endHour: string;
  cutoffMode: QrCutoffMode;
  lateToleranceMin: number;
  cutoffLabel: string;
  cutoffTimestampMs: number;
  createdAt: string;
  rotatingKey?: string;
}

export interface QrAttendanceCheckInRecord {
  id: string;
  sessionId: string;
  scheduleId: string;
  classCode: string;
  subject: string;
  crewName: string;
  initials: string;
  checkInTime: string;
  checkedInAtIso: string;
  status: 'On Time' | 'Late';
  minutesDiff: number;
}

interface SessionSecurityState {
  validKeys: Map<string, number>; // key -> expiresAtMs
  scanGrants: Map<string, number>; // grant -> expiresAtMs
}

const KEY_GRACE_MS = 45_000; // 45s rolling window for live in-class camera scans
const GRANT_TTL_MS = 5 * 60_000; // 5m after opening QR screen to complete name entry

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function formatTime24(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function buildInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'SC';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
}

function randomToken(bytes = 4): string {
  return crypto.randomBytes(bytes).toString('hex').toUpperCase();
}

export class QrAttendanceManager {
  private sessions = new Map<string, QrAttendanceSession>();
  private security = new Map<string, SessionSecurityState>();
  private checkIns: QrAttendanceCheckInRecord[] = [];

  private generateSessionId(): string {
    let candidate = '';
    do {
      const digits = Math.floor(100000 + Math.random() * 900000);
      candidate = `QR-${digits}`;
    } while (this.sessions.has(candidate));
    return candidate;
  }

  private pruneExpiredTokens(sec: SessionSecurityState, nowMs: number) {
    for (const [k, exp] of sec.validKeys.entries()) {
      if (exp < nowMs) sec.validKeys.delete(k);
    }
    for (const [g, exp] of sec.scanGrants.entries()) {
      if (exp < nowMs) sec.scanGrants.delete(g);
    }
  }

  public createSession(input: {
    scheduleId: string;
    classCode: string;
    subject: string;
    room: string;
    dateStr: string;
    startHour: string;
    endHour: string;
    lateToleranceMin?: number;
  }): QrAttendanceSession {
    const tolerance = Number.isFinite(input.lateToleranceMin)
      ? Math.max(0, Math.min(180, Number(input.lateToleranceMin)))
      : 5;

    const now = new Date();
    const match = String(input.startHour || '08:00').match(/(\d{1,2}):(\d{2})/);
    const hour = match ? Math.min(23, Math.max(0, Number(match[1]))) : 8;
    const minute = match ? Math.min(59, Math.max(0, Number(match[2]))) : 0;

    // Cutoff strictly depends on scheduled class startHour + lateToleranceMin
    const cutoffDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute + tolerance,
      0,
      0
    );

    const sessionId = this.generateSessionId();
    const initialKey = randomToken(4);

    const session: QrAttendanceSession = {
      id: sessionId,
      scheduleId: String(input.scheduleId || 'SCH-CUSTOM'),
      classCode: String(input.classCode || '302'),
      subject: String(input.subject || 'Servolution Session'),
      room: String(input.room || 'Main Hall'),
      dateStr: String(input.dateStr || ''),
      startHour: String(input.startHour || '08:00'),
      endHour: String(input.endHour || '09:30'),
      cutoffMode: 'schedule',
      lateToleranceMin: tolerance,
      cutoffLabel: formatTime24(cutoffDate),
      cutoffTimestampMs: cutoffDate.getTime(),
      createdAt: now.toISOString(),
      rotatingKey: initialKey,
    };

    const validKeys = new Map<string, number>();
    validKeys.set(initialKey, now.getTime() + KEY_GRACE_MS);

    this.sessions.set(session.id, session);
    this.security.set(session.id, {
      validKeys,
      scanGrants: new Map<string, number>(),
    });

    return session;
  }

  public rotateSessionKey(rawSessionId: string): { ok: true; key: string } | { ok: false; error: string } {
    const session = this.getSession(rawSessionId);
    if (!session) {
      return { ok: false, error: 'Sesi QR tidak ditemukan.' };
    }
    const sec = this.security.get(session.id);
    if (!sec) {
      return { ok: false, error: 'Keamanan sesi QR tidak ditemukan.' };
    }
    const nowMs = Date.now();
    this.pruneExpiredTokens(sec, nowMs);

    const nextKey = randomToken(4);
    sec.validKeys.set(nextKey, nowMs + KEY_GRACE_MS);
    session.rotatingKey = nextKey;
    return { ok: true, key: nextKey };
  }

  public getSession(rawId: string): QrAttendanceSession | undefined {
    const normalized = String(rawId || '').trim().toUpperCase();
    if (!normalized) return undefined;
    const direct = this.sessions.get(normalized);
    if (direct) return direct;
    if (/^\d{6}$/.test(normalized)) {
      return this.sessions.get(`QR-${normalized}`);
    }
    return undefined;
  }

  public verifySessionForScan(
    rawId: string,
    rawKey?: string
  ):
    | { ok: true; session: Omit<QrAttendanceSession, 'rotatingKey'>; checkIns: QrAttendanceCheckInRecord[]; scanGrant: string }
    | { ok: false; statusCode: number; error: string } {
    const session = this.getSession(rawId);
    if (!session) {
      return { ok: false, statusCode: 404, error: 'Sesi QR tidak ditemukan atau sudah berakhir.' };
    }
    const sec = this.security.get(session.id);
    if (!sec) {
      return { ok: false, statusCode: 403, error: 'Token sesi QR tidak valid.' };
    }

    const nowMs = Date.now();
    this.pruneExpiredTokens(sec, nowMs);

    const key = String(rawKey || '').trim().toUpperCase();
    const keyExpiry = key ? sec.validKeys.get(key) : undefined;
    if (!key || !keyExpiry || keyExpiry < nowMs) {
      return {
        ok: false,
        statusCode: 403,
        error: 'QR Code kedaluwarsa atau berasal dari tautan yang dibagikan. Silakan scan QR langsung di layar kelas.',
      };
    }

    const scanGrant = randomToken(8);
    sec.scanGrants.set(scanGrant, nowMs + GRANT_TTL_MS);

    const { rotatingKey: _omit, ...publicSession } = session;
    return {
      ok: true,
      session: publicSession,
      checkIns: this.getCheckIns(session.id),
      scanGrant,
    };
  }

  public recordCheckIn(
    rawSessionId: string,
    rawCrewName: string,
    rawScanGrant?: string
  ):
    | { ok: true; alreadyCheckedIn: boolean; record: QrAttendanceCheckInRecord; session: Omit<QrAttendanceSession, 'rotatingKey'> }
    | { ok: false; statusCode: number; error: string } {
    const session = this.getSession(rawSessionId);
    if (!session) {
      return { ok: false, statusCode: 404, error: 'Kode QR sesi tidak ditemukan atau sudah kedaluwarsa.' };
    }

    const sec = this.security.get(session.id);
    const nowMs = Date.now();
    if (sec) {
      this.pruneExpiredTokens(sec, nowMs);
      const grant = String(rawScanGrant || '').trim().toUpperCase();
      const grantExp = grant ? sec.scanGrants.get(grant) : undefined;
      if (!grant || !grantExp || grantExp < nowMs) {
        return {
          ok: false,
          statusCode: 403,
          error: 'Izin scan sudah berakhir. Silakan scan ulang QR langsung di layar kelas.',
        };
      }
      // Consume grant after check-in so it cannot be reused or forwarded
      sec.scanGrants.delete(grant);
    }

    const crewName = String(rawCrewName || '').trim();
    if (!crewName) {
      return { ok: false, statusCode: 400, error: 'Nama Servolution Crew wajib diisi.' };
    }

    const existing = this.checkIns.find(
      (item) =>
        item.sessionId === session.id &&
        item.crewName.trim().toLowerCase() === crewName.toLowerCase()
    );
    const { rotatingKey: _omit, ...publicSession } = session;
    if (existing) {
      return { ok: true, alreadyCheckedIn: true, record: existing, session: publicSession };
    }

    const now = new Date();
    const isLate = now.getTime() > session.cutoffTimestampMs;
    const minutesDiff = Math.round((now.getTime() - session.cutoffTimestampMs) / 60_000);

    const record: QrAttendanceCheckInRecord = {
      id: `CHK-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      sessionId: session.id,
      scheduleId: session.scheduleId,
      classCode: session.classCode,
      subject: session.subject,
      crewName,
      initials: buildInitials(crewName),
      checkInTime: formatTime24(now),
      checkedInAtIso: now.toISOString(),
      status: isLate ? 'Late' : 'On Time',
      minutesDiff,
    };

    this.checkIns.unshift(record);
    if (this.checkIns.length > 500) {
      this.checkIns.length = 500;
    }

    return { ok: true, alreadyCheckedIn: false, record, session: publicSession };
  }

  public getCheckIns(sessionId?: string): QrAttendanceCheckInRecord[] {
    if (sessionId) {
      const normalized = sessionId.trim().toUpperCase();
      return this.checkIns.filter((item) => item.sessionId === normalized);
    }
    return [...this.checkIns];
  }
}
