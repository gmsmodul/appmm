export interface QueuedMutation {
  id: string;
  url: string;
  method: 'PUT' | 'POST' | 'DELETE';
  body?: unknown;
  createdAt: string;
  retries: number;
}

const OFFLINE_QUEUE_KEY = 'servolution_offline_sync_queue';

type QueueListener = (count: number) => void;
const listeners = new Set<QueueListener>();
let flushingPromise: Promise<{ flushed: number; remaining: number }> | null = null;
let autoListenerAttached = false;

function readQueue(): QueuedMutation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedMutation[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore storage quota failure
  }
  const count = queue.length;
  listeners.forEach((fn) => fn(count));
}

export function getOfflineQueueCount(): number {
  return readQueue().length;
}

export function getOfflineQueueSnapshot(): QueuedMutation[] {
  return readQueue();
}

export function subscribeOfflineQueue(listener: QueueListener): () => void {
  listeners.add(listener);
  listener(readQueue().length);
  ensureOnlineAutoFlush();
  return () => {
    listeners.delete(listener);
  };
}

export function enqueueOfflineMutation(
  url: string,
  method: 'PUT' | 'POST' | 'DELETE',
  body?: unknown
): QueuedMutation[] {
  const current = readQueue();
  // Coalesce idempotent PUT mutations targeting the same resource URL
  const deduped =
    method === 'PUT'
      ? current.filter((item) => !(item.method === 'PUT' && item.url === url))
      : current;

  const entry: QueuedMutation = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    url,
    method,
    body,
    createdAt: new Date().toISOString(),
    retries: 0,
  };

  const next = [...deduped, entry];
  writeQueue(next);
  return next;
}

export async function flushOfflineQueue(): Promise<{ flushed: number; remaining: number }> {
  if (typeof window === 'undefined') return { flushed: 0, remaining: 0 };
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { flushed: 0, remaining: readQueue().length };
  }
  if (flushingPromise) return flushingPromise;

  flushingPromise = (async () => {
    const queue = readQueue();
    if (queue.length === 0) return { flushed: 0, remaining: 0 };

    const remaining: QueuedMutation[] = [];
    let flushed = 0;

    for (let i = 0; i < queue.length; i += 1) {
      const item = queue[i];
      try {
        const res = await fetch(item.url, {
          method: item.method,
          headers: item.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
          body: item.body !== undefined ? JSON.stringify(item.body) : undefined,
        });
        if (res.ok || (res.status >= 400 && res.status < 500)) {
          // 2xx succeeded; 4xx won't succeed on retry so drop cleanly
          flushed += 1;
        } else {
          remaining.push({ ...item, retries: item.retries + 1 });
        }
      } catch {
        // Offline again or transient error: keep this + rest of queue in order
        remaining.push({ ...item, retries: item.retries + 1 }, ...queue.slice(i + 1));
        break;
      }
    }

    writeQueue(remaining);
    return { flushed, remaining: remaining.length };
  })().finally(() => {
    flushingPromise = null;
  });

  return flushingPromise;
}

export async function executeWithOfflineQueue(
  url: string,
  method: 'PUT' | 'POST' | 'DELETE',
  body?: unknown
): Promise<'synced' | 'queued'> {
  ensureOnlineAutoFlush();

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    enqueueOfflineMutation(url, method, body);
    return 'queued';
  }

  try {
    const res = await fetch(url, {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok && res.status >= 500) {
      enqueueOfflineMutation(url, method, body);
      return 'queued';
    }
    return 'synced';
  } catch {
    enqueueOfflineMutation(url, method, body);
    return 'queued';
  }
}

export function ensureOnlineAutoFlush(): void {
  if (typeof window === 'undefined' || autoListenerAttached) return;
  autoListenerAttached = true;
  window.addEventListener('online', () => {
    void flushOfflineQueue();
  });
}
