import React, { useState, useEffect } from 'react';
import {
  Check,
  Wifi,
  WifiOff,
  Loader2,
  RefreshCw,
  RotateCcw,
  Bookmark,
  Heart,
  Zap,
  AlertTriangle,
  Database,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { UiSkeleton, UiSkeletonGroup } from '../ui/UiSkeleton';
import { useApp } from '../../context/AppContext';

interface TaskOptItem {
  id: string;
  title: string;
  owner: string;
  completed: boolean;
}

const INITIAL_TASKS: TaskOptItem[] = [
  { id: 'TSK-1', title: 'Audit Safe-Area Navigation Dock', owner: 'Nadia Putri', completed: true },
  { id: 'TSK-2', title: 'Convert Table 375px to Card Stack', owner: 'Rafi Pratama', completed: false },
  { id: 'TSK-3', title: 'Add Offline Mutation Replay Queue', owner: 'Sinta Dewi', completed: false },
];

export const AppOptimizationUiKit: React.FC = () => {
  const { isOnline: browserOnline, pendingSyncCount } = useApp();

  // 1. Optimistic UI state
  const [optMode, setOptMode] = useState<'optimistic' | 'blocking'>('optimistic');
  const [simulateError, setSimulateError] = useState(false);
  const [tasks, setTasks] = useState<TaskOptItem[]>(INITIAL_TASKS);
  const [blockingId, setBlockingId] = useState<string | null>(null);
  const [syncNotice, setSyncNotice] = useState<string>('Siap — perubahan tersinkron');

  const handleToggleTask = (id: string) => {
    if (optMode === 'blocking') {
      if (blockingId) return;
      setBlockingId(id);
      setSyncNotice('Menunggu respons server (900ms)...');
      window.setTimeout(() => {
        setBlockingId(null);
        if (simulateError) {
          setSyncNotice('Gagal menyimpan — perubahan dibatalkan');
          return;
        }
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
        setSyncNotice('Tersimpan setelah menunggu server');
      }, 900);
      return;
    }

    // Optimistic: update state instantaneously, sync in background, rollback if server fails
    const prevSnapshot = tasks;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    setSyncNotice('UI diperbarui instan (0ms) · menyinkronkan di latar...');

    window.setTimeout(() => {
      if (simulateError) {
        setTasks(prevSnapshot);
        setSyncNotice('Server gagal — rollback otomatis ke state sebelumnya');
      } else {
        setSyncNotice('Tersinkron ke server tanpa menunggu');
      }
    }, 650);
  };

  // 2. Skeleton vs Spinner state
  const [loadingPattern, setLoadingPattern] = useState<'skeleton' | 'spinner' | 'loaded'>('skeleton');

  // 3. Cache-first + SWR Preload state
  const [cachePhase, setCachePhase] = useState<'cache-swr' | 'cold-empty'>('cache-swr');
  const [screenOpened, setScreenOpened] = useState(true);
  const [revalidating, setRevalidating] = useState(false);
  const [cachedVersion, setCachedVersion] = useState(4);

  const handleOpenScreen = (mode: 'cache-swr' | 'cold-empty') => {
    setCachePhase(mode);
    if (mode === 'cache-swr') {
      setScreenOpened(true);
      setRevalidating(true);
      window.setTimeout(() => {
        setCachedVersion((v) => v + 1);
        setRevalidating(false);
      }, 650);
    } else {
      setScreenOpened(false);
      setRevalidating(true);
      window.setTimeout(() => {
        setScreenOpened(true);
        setRevalidating(false);
      }, 950);
    }
  };

  // 4. Tactile Tap state
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);
  const [tapCount, setTapCount] = useState(0);

  // 5. Offline Queue Simulator
  const [simOffline, setSimOffline] = useState(false);
  const [simQueue, setSimQueue] = useState<{ id: string; label: string; time: string }[]>([]);
  const [simSyncedLog, setSimSyncedLog] = useState<string[]>([
    'Batch 12 rules tersinkron',
    'Navigasi terakhir tersimpan ke cache',
  ]);
  const [flushingQueue, setFlushingQueue] = useState(false);

  const enqueueSimulatedAction = (label: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (simOffline) {
      setSimQueue((prev) => [...prev, { id: `${Date.now()}`, label, time }]);
    } else {
      setSimSyncedLog((prev) => [`${label} (${time})`, ...prev].slice(0, 4));
    }
  };

  useEffect(() => {
    if (simOffline || simQueue.length === 0) return;
    setFlushingQueue(true);
    const timer = window.setTimeout(() => {
      const flushedLabels = simQueue.map((q) => `${q.label} (synced after reconnect)`);
      setSimSyncedLog((prev) => [...flushedLabels.reverse(), ...prev].slice(0, 4));
      setSimQueue([]);
      setFlushingQueue(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [simOffline, simQueue]);

  return (
    <UiDocPage
      title="App Optimization"
      description="5 pola optimasi inti agar aplikasi terasa responsif seperti produk matang: Optimistic UI, Shimmer Skeletons, Preload & Cache-First SWR, Tactile Tap Feedback tanpa layout jump, dan Offline Queue Auto-Sync."
      subLinks={[
        { id: 'opt-optimistic', label: '1. Optimistic UI' },
        { id: 'opt-skeletons', label: '2. Shimmer Skeletons' },
        { id: 'opt-cache', label: '3. Preload & Cache SWR' },
        { id: 'opt-tactile', label: '4. Tactile Tap Motion' },
        { id: 'opt-offline', label: '5. Offline Sync Queue' },
      ]}
    >
      {/* 1. OPTIMISTIC UI UPDATES */}
      <UiDocSection
        id="opt-optimistic"
        title="Opt 1 · Optimistic UI Updates (No Waiting on Buttons)"
        description="Jangan memblokir tombol dengan spinner sambil menunggu server selesai. Perbarui state UI seketika (0ms), sinkronkan ke server di latar, dan lakukan rollback otomatis hanya bila request gagal."
        classesHint="Optimistic state update + background sync + error rollback"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100/80 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setOptMode('optimistic')}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  optMode === 'optimistic' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                }`}
              >
                Optimistic (0ms)
              </button>
              <button
                type="button"
                onClick={() => setOptMode('blocking')}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  optMode === 'blocking' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                }`}
              >
                Blocking (900ms)
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSimulateError((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                simulateError
                  ? 'border-rose-300 bg-rose-50 text-rose-800'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{simulateError ? 'Error Rollback: ON' : 'Simulasi Error'}</span>
            </button>
          </div>
        }
        codeSnippet={`const handleToggle = async (id: string) => {
  const snapshot = items;
  setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  try {
    await api.toggleTask(id);
  } catch {
    setItems(snapshot); // Automatic rollback on error
  }
};`}
      >
        <div className="max-w-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-600 px-1">
            <span>Status sinkronisasi: <strong className="text-gray-900">{syncNotice}</strong></span>
            <span className="tabular-nums font-medium text-gray-500">
              {tasks.filter((t) => t.completed).length}/{tasks.length} selesai
            </span>
          </div>
          <div className="rounded-xl border border-gray-300/90 divide-y divide-gray-200 bg-white overflow-hidden">
            {tasks.map((task) => {
              const isBusy = blockingId === task.id;
              return (
                <div key={task.id} className="px-3.5 py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={`text-[13px] font-medium truncate transition-colors ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-[11px] text-gray-500">{task.owner}</p>
                  </div>
                  <button
                    type="button"
                    disabled={Boolean(blockingId)}
                    onClick={() => handleToggleTask(task.id)}
                    className={`touch-target-44 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                      task.completed
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-gray-900 text-white hover:bg-black'
                    }`}
                  >
                    {isBusy ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : task.completed ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </>
                    ) : (
                      <span>Complete</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </UiDocSection>

      {/* 2. SHIMMER SKELETONS */}
      <UiDocSection
        id="opt-skeletons"
        title="Opt 2 · Shimmer Skeletons (No Blank Screens or Spinners)"
        description="Ganti layar kosong dan spinner tunggal dengan skeleton shimmer abu-abu (`.ui-skeleton-shimmer`) yang dimensinya sama persis dengan kartu data final agar perpindahan ke konten bebas lompatan."
        classesHint="<UiSkeleton /> + .ui-skeleton-shimmer + <Suspense fallback={<UiKitCategorySkeleton />}>"
        actions={
          <div className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100/80 p-0.5 text-xs">
            {(
              [
                { key: 'skeleton', label: 'Shimmer Skeleton' },
                { key: 'spinner', label: 'Blank + Spinner' },
                { key: 'loaded', label: 'Loaded Content' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setLoadingPattern(opt.key)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  loadingPattern === opt.key ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        }
        codeSnippet={`<Suspense fallback={<UiKitCategorySkeleton />}>
  <LazyCategoryModule />
</Suspense>

{/* Reusable UiSkeleton (.ui-skeleton-shimmer) */}
<UiSkeleton variant="rounded" width={40} height={40} />
<UiSkeleton variant="text" lines={2} lastLineWidth="78%" />`}
      >
        <div className="max-w-xl rounded-xl border border-gray-300 bg-white p-4">
          {loadingPattern === 'spinner' ? (
            <div className="h-32 flex flex-col items-center justify-center gap-2 text-xs text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              <span>Layar kosong menunggu data...</span>
            </div>
          ) : loadingPattern === 'skeleton' ? (
            <UiSkeletonGroup label="Memuat Design System Catalog" className="h-32 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <UiSkeleton variant="rounded" className="w-10 h-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <UiSkeleton variant="text" className="h-4 w-44" />
                  <UiSkeleton variant="text" className="h-3 w-28" />
                </div>
                <UiSkeleton variant="rounded" className="h-6 w-16 rounded-md" />
              </div>
              <UiSkeleton variant="text" lines={2} lastLineWidth="80%" lineClassName="h-3" />
            </UiSkeletonGroup>
          ) : (
            <div className="h-32 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm shrink-0">
                  UI
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Design System Catalog</p>
                  <p className="text-xs text-gray-500">8 kategori lazy-loaded + preloaded</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium shrink-0">
                  Ready
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Transisi dari skeleton ke konten nyata berlangsung halus tanpa pergeseran tinggi kontainer sedikit pun.
              </p>
            </div>
          )}
        </div>
      </UiDocSection>

      {/* 3. PRELOAD, CACHE LAST STATE & REFRESH */}
      <UiDocSection
        id="opt-cache"
        title="Opt 3 · Preload, Cache Last State & Refresh (Never Open Empty)"
        description="Aplikasi menyimpan state terakhir (navigasi kategori, status baca pembaruan, dan database batch) ke `localStorage` serta melakukan preload chunk saat idle/hover agar layar langsung terisi saat dibuka lalu segar kembali di latar."
        classesHint="Cache-first hydration + preloadAdjacentCategories() + SWR background refresh"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenScreen('cache-swr')}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                cachePhase === 'cache-swr'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              Open Cached + SWR
            </button>
            <button
              type="button"
              onClick={() => handleOpenScreen('cold-empty')}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                cachePhase === 'cold-empty'
                  ? 'border-rose-300 bg-rose-50 text-rose-800'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              Open Cold Empty
            </button>
          </div>
        }
        codeSnippet={`// Sync frame-0 hydration from cache, then revalidate in background
const [batches, setBatches] = useState(() => apiService.getCachedBatchDatabaseStore().batches);
useEffect(() => {
  apiService.getBatchDatabaseStore().then((fresh) => setBatches(fresh.batches));
}, []);

// Hover / idle preloading for split category bundles
<button onMouseEnter={() => preloadCategoryModule(group.id)} />`}
      >
        <div className="max-w-xl rounded-xl border border-gray-300 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Database className="w-4 h-4 text-gray-500" />
              <span>Mode: {cachePhase === 'cache-swr' ? 'Cache-First + Stale-While-Revalidate' : 'Cold Fetch Tanpa Cache'}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 tabular-nums">
              {revalidating ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-primary-600" />
                  <span>Refreshing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Snapshot v{cachedVersion}</span>
                </>
              )}
            </span>
          </div>

          {!screenOpened ? (
            <div className="h-20 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-500">
              Layar kosong sementara fetch berjalan (950ms)...
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-2.5">
                <p className="text-[11px] text-gray-500">Last Route</p>
                <p className="font-semibold text-gray-900 mt-0.5 truncate">App Optimization</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-2.5">
                <p className="text-[11px] text-gray-500">Chunk Preload</p>
                <p className="font-semibold text-emerald-700 mt-0.5">Idle + Hover</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-2.5">
                <p className="text-[11px] text-gray-500">Cache State</p>
                <p className="font-semibold text-gray-900 mt-0.5 tabular-nums">v{cachedVersion}</p>
              </div>
            </div>
          )}
        </div>
      </UiDocSection>

      {/* 4. TACTILE TAP ANIMATIONS */}
      <UiDocSection
        id="opt-tactile"
        title="Opt 4 · Tactile Tap Feedback (Alive Response, Zero Layout Jump)"
        description="Tombol perlu memberi respons sentuhan yang terasa nyata saat ditekan (`scale: 0.97` selama 85ms, lalu pulih mulus `200ms --ease-out`) tanpa mengangkat layout atau menggeser tombol tetangganya."
        classesHint="active:scale-[0.97] + compositor-only scale transition (no layout jump)"
        codeSnippet={`/* Global tactile press across app buttons */
button:not(:disabled):not(.no-press):active {
  scale: 0.97;
  transition-duration: 85ms;
}`}
      >
        <div className="max-w-xl space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTapCount((c) => c + 1)}
              className="touch-target-44 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Tactile Primary ({tapCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className={`touch-target-44 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                liked
                  ? 'border-rose-300 bg-rose-50 text-rose-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 transition-transform duration-200 ${liked ? 'fill-rose-600 scale-110' : ''}`} />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>

            <button
              type="button"
              onClick={() => setBookmarked((v) => !v)}
              className={`touch-target-44 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                bookmarked
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-white' : ''}`} />
              <span>{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={() => setTapCount(0)}
              className="no-press touch-target-44 inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-dashed border-gray-300 text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Static (.no-press)</span>
            </button>
          </div>
          <p className="text-[11px] text-gray-500">
            Coba tekan tahan sebentar tombol di atas dan bandingkan sensasinya dengan tombol <code className="font-mono text-gray-700">.no-press</code>.
          </p>
        </div>
      </UiDocSection>

      {/* 5. OFFLINE SUPPORT & SYNC QUEUE */}
      <UiDocSection
        id="opt-offline"
        title="Opt 5 · Offline Support & Mutation Sync Queue"
        description="Saat koneksi putus, mutasi tidak boleh hilang. Antrean mutasi disimpan aman di `localStorage` (`servolution_offline_sync_queue`) lalu otomatis diputar ulang secara berurutan ketika event `online` kembali aktif."
        classesHint="executeWithOfflineQueue() + flushOfflineQueue() + window online listener"
        actions={
          <button
            type="button"
            onClick={() => setSimOffline((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
              simOffline
                ? 'border-rose-300 bg-rose-50 text-rose-800'
                : 'border-emerald-300 bg-emerald-50 text-emerald-800'
            }`}
          >
            {simOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{simOffline ? 'Simulasi: Offline' : 'Simulasi: Online'}</span>
          </button>
        }
        codeSnippet={`// When network is down or fetch hits 5xx, queue persists to localStorage
export async function executeWithOfflineQueue(url: string, method: 'PUT' | 'POST' | 'DELETE', body?: unknown) {
  if (navigator.onLine === false) {
    enqueueOfflineMutation(url, method, body);
    return 'queued';
  }
  ...
}
window.addEventListener('online', () => void flushOfflineQueue());`}
      >
        <div className="max-w-xl rounded-xl border border-gray-300 bg-white p-4 space-y-3.5 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                Real Browser Status: {browserOnline ? 'Online' : 'Offline'}
              </span>
              <span className="text-gray-500 tabular-nums">({pendingSyncCount} real queued)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => enqueueSimulatedAction('Simpan Perubahan Batch')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold cursor-pointer whitespace-nowrap shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Mutasi</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">Offline Queue</span>
                <span className="font-semibold tabular-nums text-amber-700">
                  {flushingQueue ? 'Syncing...' : `${simQueue.length} queued`}
                </span>
              </div>
              {simQueue.length === 0 ? (
                <p className="text-[11px] text-gray-500">
                  Aktifkan mode Offline lalu klik &ldquo;Kirim Mutasi&rdquo; untuk mengantrekan aksi.
                </p>
              ) : (
                <ul className="space-y-1">
                  {simQueue.map((item) => (
                    <li key={item.id} className="text-[11px] text-gray-800 flex items-center justify-between gap-2">
                      <span className="truncate">{item.label}</span>
                      <span className="text-gray-500 tabular-nums shrink-0">{item.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">Synced Log</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <ul className="space-y-1">
                {simSyncedLog.map((entry, idx) => (
                  <li key={`${entry}-${idx}`} className="text-[11px] text-gray-600 truncate">
                    • {entry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
