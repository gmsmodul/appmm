import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocket, WebSocketServer } from 'ws';
import { LiveQuizRoomManager } from './server/liveQuizRooms.ts';
import { QrAttendanceManager } from './server/qrAttendance.ts';
import { BatchDatabaseManager } from './server/batchDatabase.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const liveQuizRooms = new LiveQuizRoomManager();
const qrAttendance = new QrAttendanceManager();
const batchDb = new BatchDatabaseManager();
const wss = new WebSocketServer({ noServer: true });

app.use(express.json({ limit: '10mb' }));

// In-memory data store seeded for backend endpoints
let exams = [
  { id: 1, day: 1, classCode: '302', time: '8:00 am', title: 'Math Exam', grade: 'Grade 12', status: 'Confirmed', students: 19, theme: 'periwinkle' },
  { id: 2, day: 1, classCode: '303', time: '9:00 am', title: 'Physics Exam', grade: 'Grade 10', status: 'Confirmed', students: 18, theme: 'peach' },
  { id: 3, day: 3, classCode: '304', time: '8:00 am', title: 'Art Exam', grade: 'Grade 9', status: 'Confirmed', students: 20, theme: 'coral' },
  { id: 4, day: 3, classCode: '302', time: '9:00 am', title: 'Math Exam', grade: 'Grade 12', status: 'Confirmed', students: 19, theme: 'periwinkle' },
];

let assignments = [
  {
    id: 'ASG-01',
    classCode: 'Class 302',
    subject: 'Mathematics · Grade 12',
    title: 'Problem Set 4: Implicit Differentiation & Related Rates',
    dueDate: 'Fri, 13 Feb · 11:59 pm',
    status: 'Active',
    submitted: 21,
    total: 24,
    theme: 'periwinkle',
    submissions: [
      { id: 'SUB-1', initials: 'JW', name: 'James Wilson', time: 'Submitted 2h ago', status: 'Graded', score: 92, color: 'bg-[#C4F0DC] text-[#146C43]' },
      { id: 'SUB-2', initials: 'SA', name: 'Sarah Anderson', time: 'Submitted 4h ago', status: 'Graded', score: 96, color: 'bg-[#D6D4FF] text-[#3F3B99]' },
    ],
  },
];

// Backend API Endpoints (Ready to connect to PostgreSQL, SQLite, or Firebase)
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Servolution API', time: new Date().toISOString() });
});

// Exams
app.get('/api/exams', (_req: Request, res: Response) => {
  res.json(exams);
});

app.post('/api/exams', (req: Request, res: Response) => {
  const newExam = { id: Date.now(), ...req.body };
  exams.push(newExam);
  res.status(201).json(newExam);
});

// Assignments
app.get('/api/assignments', (_req: Request, res: Response) => {
  res.json(assignments);
});

app.post('/api/assignments', (req: Request, res: Response) => {
  const newAsg = { id: 'ASG-' + Date.now(), submitted: 0, submissions: [], ...req.body };
  assignments.push(newAsg);
  res.status(201).json(newAsg);
});

// LiveQuiz Room Lookup
app.get('/api/livequiz/room/:code', (req: Request, res: Response) => {
  const summary = liveQuizRooms.getRoomSummary(String(req.params.code || ''));
  if (!summary) {
    res.status(404).json({ error: 'Room not found' });
    return;
  }
  res.json(summary);
});

// QR Attendance Session & Check-In Endpoints
app.post('/api/attendance/qr-session', (req: Request, res: Response) => {
  const session = qrAttendance.createSession(req.body || {});
  res.status(201).json(session);
});

app.post('/api/attendance/qr-session/:id/rotate', (req: Request, res: Response) => {
  const result = qrAttendance.rotateSessionKey(String(req.params.id || ''));
  if (!result.ok) {
    res.status(404).json({ error: result.error });
    return;
  }
  res.json({ key: result.key });
});

app.get('/api/attendance/qr-session/:id', (req: Request, res: Response) => {
  const key = typeof req.query.k === 'string' ? req.query.k : '';
  const result = qrAttendance.verifySessionForScan(String(req.params.id || ''), key);
  if (!result.ok) {
    res.status(result.statusCode).json({ error: result.error });
    return;
  }
  res.json({
    session: result.session,
    checkIns: result.checkIns,
    scanGrant: result.scanGrant,
  });
});

app.post('/api/attendance/qr-checkin', (req: Request, res: Response) => {
  const { sessionId, crewName, scanGrant } = req.body || {};
  const result = qrAttendance.recordCheckIn(
    String(sessionId || ''),
    String(crewName || ''),
    typeof scanGrant === 'string' ? scanGrant : ''
  );
  if (!result.ok) {
    res.status(result.statusCode).json({ error: result.error });
    return;
  }

  if (!result.alreadyCheckedIn) {
    const packet = JSON.stringify({
      type: 'attendance:checkin',
      payload: result.record,
    });
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(packet);
      }
    }
  }

  res.status(result.alreadyCheckedIn ? 200 : 201).json({
    alreadyCheckedIn: result.alreadyCheckedIn,
    record: result.record,
    session: result.session,
  });
});

app.get('/api/attendance/checkins', (req: Request, res: Response) => {
  const sessionId = typeof req.query.sessionId === 'string' ? req.query.sessionId : undefined;
  res.json(qrAttendance.getCheckIns(sessionId));
});

// Unified Batch & Year Database Endpoints
app.get('/api/batches', (_req: Request, res: Response) => {
  res.json(batchDb.getStore());
});

app.put('/api/batches/store', (req: Request, res: Response) => {
  const saved = batchDb.replaceStore(req.body || { activeBatchId: '', batches: [] });
  res.json(saved);
});

app.put('/api/batches/active', (req: Request, res: Response) => {
  const batchId = String(req.body?.batchId || '');
  const result = batchDb.setActiveBatch(batchId);
  if (!result.ok) {
    res.status(404).json({ error: result.error });
    return;
  }
  res.json(result);
});

app.put('/api/batches/:id', (req: Request, res: Response) => {
  const batchId = String(req.params.id || '');
  const payload = req.body || {};
  if (!batchId) {
    res.status(400).json({ error: 'Batch ID required' });
    return;
  }
  const saved = batchDb.upsertBatch({ ...payload, id: batchId });
  res.json(saved);
});

app.delete('/api/batches/:id', (req: Request, res: Response) => {
  const batchId = String(req.params.id || '');
  const result = batchDb.deleteBatch(batchId);
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.json(result.store);
});

// Healthcheck endpoint for Cloud Run readiness
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Vite Middleware for Fullstack Dev / Static Dist Serving for Production
async function startServer() {
  const distDir = path.resolve(__dirname, 'dist');
  const distIndex = path.join(distDir, 'index.html');
  const shouldServeStatic =
    process.env.NODE_ENV === 'production' || fs.existsSync(distIndex);

  if (!shouldServeStatic) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      if (fs.existsSync(distIndex)) {
        res.sendFile(distIndex);
      } else {
        res.status(200).send('OK');
      }
    });
  }

  const httpServer = http.createServer(app);

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      liveQuizRooms.handleMessage(ws, data.toString());
    });
    ws.on('close', () => {
      liveQuizRooms.handleDisconnect(ws);
    });
  });

  httpServer.on('upgrade', (request, socket, head) => {
    const requestUrl = request.url || '';
    const pathname = requestUrl.split('?')[0];
    if (pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
