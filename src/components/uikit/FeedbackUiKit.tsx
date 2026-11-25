import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Copy,
  Check,
  Clock,
  Compass,
  RotateCcw,
  Bell,
  ExternalLink,
  Loader2,
  Play,
  Pause,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import {
  UiSkeleton,
  UiSkeletonGroup,
  UiSkeletonCard,
  UiSkeletonList,
  UiSkeletonTable,
  UiSkeletonSearchPanel,
} from '../ui/UiSkeleton';
import { UiLoader } from '../ui/UiLoader';
import { LoadingAnimationsUiKit } from './LoadingAnimationsUiKit';

interface FeedbackUiKitProps {
  activeSubJump?: string;
}

export const FeedbackUiKit: React.FC<FeedbackUiKitProps> = ({ activeSubJump }) => {
  const { triggerToast, setUiSweetAlertType, setUiSessionModal, selectUiNode } = useApp();

  // Notifications
  const [notifPos, setNotifPos] = useState<'top-right' | 'bottom-right' | 'top-center'>('top-right');
  const [notifAnim, setNotifAnim] = useState<'slide' | 'fade' | 'bounce'>('slide');
  const [notifVisible, setNotifVisible] = useState(true);

  // Toast Alerts
  const [toastPosition, setToastPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');
  const [toastInverseOpen, setToastInverseOpen] = useState(true);

  // Tour
  const [tourStep, setTourStep] = useState(1);

  // Timeout
  const [timeoutSeconds, setTimeoutSeconds] = useState(45);
  const [timeoutRunning, setTimeoutRunning] = useState(false);

  useEffect(() => {
    if (!timeoutRunning) return;
    const t = setInterval(() => {
      setTimeoutSeconds((prev) => (prev <= 1 ? 45 : prev - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [timeoutRunning]);

  // Alerts
  const [activeAlerts, setActiveAlerts] = useState<string[]>([
    'primary',
    'success',
    'warning',
    'danger',
  ]);

  // Placeholders & Skeleton
  const [placeholderAnim, setPlaceholderAnim] = useState<'pulse' | 'wave'>('pulse');
  const [skeletonLoaded, setSkeletonLoaded] = useState(false);
  const [searchSkeletonState, setSearchSkeletonState] = useState<'loading-empty' | 'loading-results' | 'loaded'>('loading-empty');

  // Spinners
  const [spinnerBtnLoading, setSpinnerBtnLoading] = useState(true);

  // Progress Bar
  const [progressVal, setProgressVal] = useState(68);
  const [progressAnimated, setProgressAnimated] = useState(true);

  // Loading / Error State
  const [asyncPhase, setAsyncPhase] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
  const [inlineSyncPhase, setInlineSyncPhase] = useState<'loading' | 'error' | 'synced'>('error');

  // Bootstrap Toast
  const [showCornerToast, setShowCornerToast] = useState(true);

  // Clipboard
  const [clipboardCopied, setClipboardCopied] = useState(false);
  const codeSnippet = 'npm install @uikit/core --save';

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') === itemKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const removeAlert = (type: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a !== type));
  };

  return (
    <div className="space-y-10 print-section">
      {/* 4.1 SWEET ALERT */}
      {isVisible('sweetalert') && (
        <UiDocPage
          title="Sweet Alert"
          subLinks={[
            { id: 'sw-success', label: 'Success Alert' },
            { id: 'sw-confirm', label: 'Confirm Delete Alert' },
            { id: 'sw-timer', label: 'Auto Timer Alert' },
          ]}
        >
          <UiDocSection
            id="sw-success"
            title="Success Alert"
            classesHint="bg-emerald-50 text-emerald-800 border border-emerald-200"
            codeSnippet={`<button onClick={() => setUiSweetAlertType('success')} className="py-2.5 px-3.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">\n  Sweet Alert: Sukses\n</button>`}
          >
            <button
              onClick={() => setUiSweetAlertType('success')}
              className="group py-2.5 px-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Sweet Alert: Sukses</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 transition-transform duration-150 group-hover:scale-110" />
            </button>
          </UiDocSection>

          <UiDocSection
            id="sw-confirm"
            title="Confirm Delete Alert"
            classesHint="bg-rose-50 text-rose-800 border border-rose-200"
            codeSnippet={`<button onClick={() => setUiSweetAlertType('confirm')} className="py-2.5 px-3.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">\n  Konfirmasi Hapus\n</button>`}
          >
            <button
              onClick={() => setUiSweetAlertType('confirm')}
              className="group py-2.5 px-4 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Konfirmasi Hapus</span>
              <AlertTriangle className="w-4 h-4 text-rose-600 transition-transform duration-150 group-hover:scale-110" />
            </button>
          </UiDocSection>

          <UiDocSection
            id="sw-timer"
            title="Auto Timer Alert"
            classesHint="bg-primary-50 text-primary-800 border border-primary-200"
            codeSnippet={`<button onClick={() => triggerToast('Auto Close', 'Menutup dalam 3 detik...', 'info')}>\n  Timer Otomatis\n</button>`}
          >
            <button
              onClick={() =>
                triggerToast('Auto Close', 'Pemberitahuan akan menutup otomatis dalam 3 detik...', 'info')
              }
              className="group py-2.5 px-4 rounded-lg bg-primary-50 text-primary-800 border border-primary-200 text-xs font-semibold hover:bg-primary-100 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Timer Otomatis</span>
              <Clock className="w-4 h-4 text-primary-600 transition-transform duration-150 group-hover:rotate-12" />
            </button>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.2 NOTIFICATIONS */}
      {isVisible('notifications') && (
        <UiDocPage
          title="Notifications"
          subLinks={[
            { id: 'ntf-basic', label: 'Contextual Notification' },
            { id: 'ntf-pos', label: 'Position & Animation' },
            { id: 'ntf-title', label: 'With Title, Icon & Dismiss' },
            { id: 'ntf-url', label: 'Custom URL Action' },
          ]}
        >
          <UiDocSection
            id="ntf-basic"
            title="Contextual Notification"
            classesHint="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70"
            codeSnippet={`<div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-xs">\n  <strong>Berhasil:</strong> Nilai tugas Bab 4 telah tersimpan.\n</div>`}
            actions={<Bell className="w-4 h-4 text-primary-600" />}
          >
            <div className="max-w-md space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-900">
                <strong>Success Notification:</strong> Nilai tugas Kalkulus Bab 4 berhasil disimpan.
              </div>
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900">
                <strong>Warning Notification:</strong> Batas unggah laporan praktikum tinggal 1 hari lagi.
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="ntf-pos"
            title="Position & Animation Controls"
            classesHint="animate-bounce / animate-bottom-sheet"
            codeSnippet={`<div className="p-4 bg-white rounded-xl border border-primary-200 animate-bottom-sheet">...</div>`}
          >
            <div className="space-y-3 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {(['top-right', 'bottom-right', 'top-center'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setNotifPos(p)}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                      notifPos === p ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Pos: {p}
                  </button>
                ))}
                {(['slide', 'fade', 'bounce'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setNotifAnim(a)}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                      notifAnim === a ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-700'
                    }`}
                  >
                    Anim: {a}
                  </button>
                ))}
              </div>
              <div
                key={`${notifPos}-${notifAnim}`}
                className={`max-w-md p-3.5 bg-white rounded-xl border border-primary-200 shadow-xs text-gray-700 ${
                  notifAnim === 'bounce'
                    ? 'animate-ui-check'
                    : notifAnim === 'slide'
                    ? 'animate-ui-slide-down'
                    : 'animate-ui-fade'
                }`}
              >
                Pratinjau posisi <strong className="text-gray-900">{notifPos}</strong> dengan efek animasi{' '}
                <strong className="text-primary-700">{notifAnim}</strong>.
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="ntf-title"
            title="With Title, Icon & Dismissible"
            classesHint="flex items-start justify-between p-4 bg-white rounded-xl border"
            codeSnippet={`<div className="p-4 bg-white rounded-xl border border-primary-200">\n  <div className="flex justify-between font-bold"><span>With Title & Icon</span><button>×</button></div>\n  <p>Sarah mengumpulkan tugas.</p>\n</div>`}
          >
            {notifVisible ? (
              <div className="animate-ui-pop max-w-md p-4 bg-white rounded-xl border border-primary-200 shadow-xs space-y-1.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>With Title & Icon ({notifPos})</span>
                  </div>
                  <button onClick={() => setNotifVisible(false)} className="text-gray-500 hover:text-gray-800 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-gray-600">Sarah Anderson mengumpulkan tugas Kalkulus Bab 4.</p>
              </div>
            ) : (
              <button
                onClick={() => setNotifVisible(true)}
                className="animate-ui-fade px-3.5 py-2 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Tampilkan Kembali Notifikasi
              </button>
            )}
          </UiDocSection>

          <UiDocSection
            id="ntf-url"
            title="Custom URL Action"
            classesHint="inline-flex items-center gap-1 font-semibold text-primary-600 hover:underline"
            codeSnippet={`<a href="#notif-url" className="inline-flex items-center gap-1 font-semibold text-primary-600">\n  Buka Custom URL <ExternalLink className="w-3 h-3" />\n</a>`}
          >
            <div className="max-w-md p-4 bg-white rounded-xl border border-gray-300 shadow-xs space-y-1.5 text-xs">
              <div className="font-bold text-gray-900">Pembaruan Silabus Semester</div>
              <p className="text-gray-600">Dokumen revisi silabus siap ditinjau oleh pengajar wali.</p>
              <a
                href="#notif-url"
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast('Custom URL', 'Membuka detail tugas mahasiswa...', 'info');
                }}
                className="group inline-flex items-center gap-1 font-semibold text-primary-600 hover:underline pt-0.5"
              >
                <span>Buka Custom URL</span>
                <ExternalLink className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.3 TOAST ALERTS */}
      {isVisible('toastalerts') && (
        <UiDocPage
          title="Toast Alerts"
          subLinks={[
            { id: 'tst-basic', label: 'Basic Example' },
            { id: 'tst-inverse', label: 'Tostr Inverse' },
            { id: 'tst-pos', label: 'Toastr Alerts Positions' },
          ]}
        >
          <UiDocSection
            id="tst-basic"
            title="Basic Example"
            classesHint="bg-emerald-600 text-white rounded-lg"
            codeSnippet={`<button onClick={() => triggerToast('Basic Toast', 'Disimpan di top-right', 'success')}>\n  Basic Example Toast\n</button>`}
          >
            <button
              onClick={() => triggerToast('Basic Toast', `Ditampilkan di posisi ${toastPosition}.`, 'success')}
              className="py-2.5 px-4 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
            >
              Basic Example Toast ({toastPosition})
            </button>
          </UiDocSection>

          <UiDocSection
            id="tst-inverse"
            title="Tostr Inverse"
            classesHint="bg-gray-900 text-white rounded-lg"
            codeSnippet={`<div className="p-2.5 px-3.5 rounded-lg bg-gray-900 text-white flex justify-between">\n  <span>Tostr Inverse (Dark Surface)</span>\n  <button onClick={close}>×</button>\n</div>`}
          >
            <div className="max-w-sm text-xs font-semibold">
              {toastInverseOpen ? (
                <div className="animate-ui-pop p-2.5 px-3.5 rounded-lg bg-gray-900 text-white flex items-center justify-between">
                  <span>Tostr Inverse (Dark Surface)</span>
                  <button onClick={() => setToastInverseOpen(false)} className="text-gray-300 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setToastInverseOpen(true)}
                  className="animate-ui-fade py-2.5 px-3.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  Munculkan Tostr Inverse
                </button>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="tst-pos"
            title="Toastr Alerts Positions"
            classesHint="top-right / top-left / bottom-right / bottom-left"
            codeSnippet={`{['top-right', 'top-left', 'bottom-right', 'bottom-left'].map(pos => <button onClick={() => setPos(pos)}>{pos}</button>)}`}
          >
            <div className="flex flex-wrap gap-2 text-xs">
              {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    setToastPosition(pos);
                    triggerToast('Posisi Toast', `Posisi diatur ke ${pos}.`, 'info');
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium cursor-pointer ${
                    toastPosition === pos ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.4 TOUR */}
      {isVisible('tour') && (
        <UiDocPage
          title="Tour"
          description="Panduan pengenalan fitur (onboarding) bertahap dengan penanda langkah dan navigasi maju-mundur."
        >
          <UiDocSection
            title="Step-by-Step Onboarding Walkthrough"
            classesHint="border border-primary-200 bg-primary-50/40 rounded-xl p-4"
            codeSnippet={`<div className="p-4 rounded-xl border border-primary-200 bg-primary-50/40">\n  <div className="font-bold">Langkah {tourStep}: Filter Kelas</div>\n  <button onClick={nextStep}>Langkah Berikutnya</button>\n</div>`}
            actions={<Compass className="w-4 h-4 text-primary-600" />}
          >
            <div className="max-w-lg p-4 rounded-xl border border-primary-200 bg-primary-50/40 space-y-3 text-xs">
              <div key={tourStep} className="animate-ui-slide-down space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary-900">
                    {tourStep === 1 && 'Langkah 1: Filter Kelas & Pencarian'}
                    {tourStep === 2 && 'Langkah 2: Menambah Modul Baru'}
                    {tourStep === 3 && 'Langkah 3: Memantau Progres Video'}
                  </span>
                  <span className="text-[11px] font-bold text-primary-600 bg-white px-2.5 py-0.5 rounded-full border border-primary-200 tabular-nums">
                    {tourStep} dari 3
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {tourStep === 1 && 'Gunakan bilah pencarian dan tombol filter kelas untuk menyaring materi pelajaran.'}
                  {tourStep === 2 && 'Klik tombol "Buat Materi" untuk mengunggah dokumen PDF, slide presentasi, atau video.'}
                  {tourStep === 3 && 'Periksa kolom progress video di tabel untuk memverifikasi status selesai menonton.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                <button
                  disabled={tourStep === 1}
                  onClick={() => setTourStep((p) => p - 1)}
                  className="px-3 py-1.5 rounded-md bg-white border border-primary-200 text-primary-800 disabled:opacity-40 cursor-pointer"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => {
                    if (tourStep < 3) setTourStep((p) => p + 1);
                    else {
                      setTourStep(1);
                      triggerToast('Tour Selesai', 'Anda telah menyelesaikan panduan tur sistem!', 'success');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-md bg-primary-600 text-white font-semibold hover:bg-primary-700 cursor-pointer"
                >
                  {tourStep === 3 ? 'Selesaikan Tur' : 'Langkah Berikutnya'}
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.5 TIMEOUT */}
      {isVisible('timeout') && (
        <UiDocPage
          title="Timeout"
          description="Peringatan sesi diam (idle session) dengan timer hitung mundur dan tombol pemulihan atau modal kedaluwarsa."
        >
          <UiDocSection
            title="Session Expiration Countdown & Modal"
            classesHint="border border-amber-200 bg-amber-50/40 rounded-xl"
            codeSnippet={`<div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">\n  <span>Tersisa: {timeoutSeconds}s</span>\n  <button onClick={() => setUiSessionModal(true)}>Simulasi Modal</button>\n</div>`}
            actions={<Clock className="w-4 h-4 text-amber-600" />}
          >
            <div className="max-w-lg p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Sesi Anda Akan Segera Berakhir</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Tidak ada aktivitas selama 15 menit. Aktifkan timer hitung mundur atau buka simulasi modal sesi.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold text-amber-800 tabular-nums ${
                      timeoutRunning ? 'animate-pulse text-rose-700' : ''
                    }`}
                  >
                    Tersisa: {timeoutSeconds}s
                  </span>
                  <button
                    onClick={() => setTimeoutRunning(!timeoutRunning)}
                    className="px-2.5 py-1 rounded bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100/60 cursor-pointer"
                  >
                    {timeoutRunning ? 'Pause' : 'Start Timer'}
                  </button>
                </div>
                <button
                  onClick={() => setUiSessionModal(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  Simulasi Modal Timeout
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.6 ALERTS */}
      {isVisible('alerts') && (
        <UiDocPage
          title="Alerts"
          subLinks={[
            { id: 'alt-default', label: 'Default Alerts' },
            { id: 'alt-icon', label: 'Alerts with Icon' },
            { id: 'alt-rounded', label: 'Rounded Alerts' },
            { id: 'alt-dismiss', label: 'Dismissing Alerts' },
            { id: 'alt-inverse', label: 'Inverse Alerts' },
            { id: 'alt-border', label: 'Border Alerts' },
            { id: 'alt-custom', label: 'Custom Alerts' },
            { id: 'alt-add', label: 'Additional Content' },
            { id: 'alt-link', label: 'Link Color' },
          ]}
        >
          <UiDocSection
            id="alt-default"
            title="Default alerts"
            classesHint="p-3.5 bg-primary-50 border border-primary-200 rounded-xl"
            codeSnippet={`<div className="p-3.5 bg-primary-50 border border-primary-200 rounded-xl text-primary-950">\n  Default Alert: Silabus bab 4 telah disinkronkan.\n</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-primary-50 border border-primary-200 rounded-xl text-primary-950">
                <strong className="font-bold">Primary Alert:</strong> Silabus bab 4 telah disinkronkan.
              </div>
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
                <strong className="font-bold">Success Alert:</strong> 24 nilai tugas berhasil disimpan.
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-icon"
            title="Alerts with icon"
            classesHint="flex items-start gap-2.5 p-3.5 rounded-xl"
            codeSnippet={`<div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">\n  <AlertTriangle className="w-4 h-4 text-amber-600" />\n  <span>Tugas Fisika Terapan berakhir dalam 2 jam.</span>\n</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-primary-50 border border-primary-200 rounded-xl text-primary-950 flex items-start gap-2">
                <Info className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                <span>Jadwal ujian tengah semester telah diterbitkan.</span>
              </div>
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Batas pengumpulan tugas Fisika berakhir dalam 2 jam.</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-rounded"
            title="Rounded alerts"
            classesHint="px-4 py-2.5 rounded-full border"
            codeSnippet={`<div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-950">\n  Rounded Alert: Presensi hari ini telah tercatat.\n</div>`}
          >
            <div className="max-w-lg px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-950 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Rounded Alert:</strong> 24 nilai tugas berhasil dikirim ke rapor.
              </span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-dismiss"
            title="Dismissing"
            classesHint="flex items-start justify-between gap-3"
            codeSnippet={`<div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex justify-between">\n  <span>Alert dapat ditutup</span>\n  <button onClick={dismiss}>×</button>\n</div>`}
            actions={
              <button
                onClick={() => setActiveAlerts(['primary', 'success', 'warning', 'danger'])}
                className="group text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-rotate-90" />
                <span>Reset Alerts</span>
              </button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {activeAlerts.includes('warning') && (
                <div className="animate-ui-fade p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Warning Dismissible</strong>
                      <span>Tugas Fisika Terapan berakhir dalam 2 jam.</span>
                    </div>
                  </div>
                  <button onClick={() => removeAlert('warning')} className="text-amber-400 hover:text-amber-700 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {activeAlerts.includes('danger') && (
                <div className="animate-ui-fade p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Danger Dismissible</strong>
                      <span>Koneksi terputus saat menyimpan lembar presensi.</span>
                    </div>
                  </div>
                  <button onClick={() => removeAlert('danger')} className="text-rose-400 hover:text-rose-700 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {!activeAlerts.includes('warning') && !activeAlerts.includes('danger') && (
                <div className="animate-ui-fade text-gray-500 italic py-2">Semua alert ditutup. Klik Reset Alerts di kanan atas.</div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-inverse"
            title="Inverse alerts"
            classesHint="bg-gray-900 text-white rounded-xl p-4"
            codeSnippet={`<div className="p-4 rounded-xl bg-gray-900 text-white">Inverse Alerts</div>`}
          >
            <div className="max-w-md p-4 rounded-xl bg-gray-900 text-white space-y-1 text-xs">
              <strong className="block font-bold">Inverse Alerts (Solid Dark)</strong>
              <span className="text-gray-300">Pesan kontras tinggi untuk status kritis sistem.</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-border"
            title="Border alerts"
            classesHint="bg-white border-2 border-primary-500 rounded-xl p-4"
            codeSnippet={`<div className="p-4 rounded-xl bg-white border-2 border-primary-500">Outline Border Alert</div>`}
          >
            <div className="max-w-md p-4 rounded-xl bg-white border-2 border-primary-500 text-gray-800 space-y-1 text-xs">
              <strong className="block font-bold text-primary-700">Outline Border Alert</strong>
              <span>Batas keliling tegas pada permukaan bersih putih.</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-custom"
            title="Custom alerts"
            classesHint="bg-[#FEF1F5] border border-[#ee2e65] text-[#9D113C]"
            codeSnippet={`<div className="p-4 rounded-xl bg-[#FEF1F5] border border-[#ee2e65] text-[#9D113C]">Custom Brand Alert</div>`}
          >
            <div className="max-w-md p-4 rounded-xl bg-[#FEF1F5] border border-[#ee2e65] text-[#9D113C] space-y-1 text-xs">
              <strong className="block font-bold">Custom Alerts (Brand Primary)</strong>
              <span>Menggunakan token pastel turunannya dari warna utama #ee2e65.</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-add"
            title="Additional content"
            classesHint="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5"
            codeSnippet={`<div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">\n  <h4 className="font-bold">Pengumuman Semester</h4>\n  <p>Lengkapi rubrik sebelum Jumat.</p>\n</div>`}
          >
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-1.5">
              <h4 className="font-bold text-sm">Additional Content Alert · Pengumuman Semester</h4>
              <p className="leading-relaxed">
                Seluruh dosen pengampu diwajibkan melengkapi rubrik penilaian sebelum Jumat pukul 17:00 WIB untuk verifikasi dekanat.
              </p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="alt-link"
            title="Link color"
            classesHint="font-bold underline text-primary-800"
            codeSnippet={`<div className="p-3.5 rounded-xl bg-primary-50 border border-primary-200">\n  Lihat <a className="font-bold underline">Tautan Link Color</a>.\n</div>`}
          >
            <div className="p-3.5 rounded-xl bg-primary-50 border border-primary-200 text-primary-950 text-xs">
              Lihat panduan teknis pada{' '}
              <a
                href="#alt-link"
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast('Alert Link', 'Membuka link warna khusus di dalam alert.', 'info');
                }}
                className="font-bold underline text-primary-700 hover:text-primary-950"
              >
                Tautan Link Color Panduan Akademik
              </a>
              .
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.7 PLACEHOLDERS */}
      {isVisible('placeholders') && (
        <UiDocPage
          title="Placeholders"
          subLinks={[
            { id: 'plh-demo', label: 'Demo' },
            { id: 'plh-color', label: 'Color' },
            { id: 'plh-sizing', label: 'Sizing' },
            { id: 'plh-anim', label: 'Animation' },
          ]}
        >
          <UiDocSection
            id="plh-demo"
            title="Demo"
            classesHint="bg-gray-200 rounded / rounded-full"
            codeSnippet={`<div className="flex items-center gap-3">\n  <div className="w-10 h-10 rounded-full bg-gray-200" />\n  <div className="space-y-2 flex-1"><div className="h-3 bg-gray-200 rounded w-3/4" /></div>\n</div>`}
          >
            <div className="max-w-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-2.5 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="plh-color"
            title="Neutral Content Skeleton"
            description="Skeleton selalu memakai warna abu-abu netral agar tidak terbaca sebagai indikator status (merah/kuning/hijau), dengan proporsi yang mengikuti struktur konten akhirnya."
            classesHint="bg-gray-100 / bg-gray-200 (netral tanpa warna status)"
            codeSnippet={`<div className="p-4 rounded-xl border border-gray-300 bg-white space-y-3">\n  <div className="h-3.5 bg-gray-200 rounded w-1/3" />\n  <div className="h-2.5 bg-gray-100 rounded w-1/4" />\n  <div className="h-3 bg-gray-100 rounded w-full" />\n  <div className="h-7 bg-gray-200 rounded-lg w-28" />\n</div>`}
          >
            <div className="max-w-sm p-4 rounded-xl border border-gray-300 bg-white space-y-3">
              <div className="space-y-1.5">
                <div className="h-3.5 bg-gray-200 rounded w-2/5" />
                <div className="h-2.5 bg-gray-100 rounded w-1/3" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-gray-100 rounded w-full" />
                <div className="h-2.5 bg-gray-100 rounded w-5/6" />
              </div>
              <div className="pt-1 flex items-center gap-2">
                <div className="h-7 bg-gray-200 rounded-lg w-24" />
                <div className="h-7 bg-gray-100 rounded-lg w-24" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="plh-sizing"
            title="Sizing"
            classesHint="h-1.5 / h-2.5 / h-4 / h-6"
            codeSnippet={`<div className="h-6 bg-gray-200 rounded" />\n<div className="h-1.5 bg-gray-200 rounded" />`}
          >
            <div className="max-w-md space-y-2.5">
              <div className="h-6 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-2.5 bg-gray-200 rounded w-full" />
              <div className="h-1.5 bg-gray-200 rounded w-full" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="plh-anim"
            title="Animation"
            classesHint="animate-pulse"
            codeSnippet={`<div className="animate-pulse space-y-2">\n  <div className="h-3 bg-primary-200 rounded w-3/4" />\n</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {(['pulse', 'wave'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setPlaceholderAnim(a)}
                    className={`px-2.5 py-1 rounded-md capitalize font-semibold cursor-pointer ${
                      placeholderAnim === a ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            }
          >
            <div className={`max-w-md space-y-2.5 ${placeholderAnim === 'pulse' ? 'animate-pulse' : ''}`}>
              <div
                className={`h-3 rounded w-3/4 ${
                  placeholderAnim === 'wave'
                    ? 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-ui-stripes'
                    : 'bg-gray-200'
                }`}
              />
              <div
                className={`h-2.5 rounded w-1/2 ${
                  placeholderAnim === 'wave'
                    ? 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-ui-stripes'
                    : 'bg-gray-200'
                }`}
              />
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.7B SKELETON */}
      {isVisible('skeleton') && (
        <UiDocPage
          title="Skeleton"
          description="Komponen reusable <UiSkeleton /> memakai kelas .ui-skeleton-shimmer agar loading state konsisten untuk avatar, kartu, tabel, daftar, serta panel Search, Recent Search & Suggestion Search."
          subLinks={[
            { id: 'skl-profile', label: 'Profile & Avatar' },
            { id: 'skl-card', label: 'Card Skeleton' },
            { id: 'skl-table', label: 'Table Rows Skeleton' },
            { id: 'skl-list', label: 'List & Feed Skeleton' },
            { id: 'skl-search', label: 'Search, Recent & Suggestion' },
          ]}
        >
          <UiDocSection
            id="skl-profile"
            title="Profile & Avatar Skeleton"
            classesHint="<UiSkeleton variant='circular' /> · .ui-skeleton-shimmer"
            codeSnippet={`<UiSkeletonGroup label="Memuat profil...">\n  <div className="flex items-center gap-3.5">\n    <UiSkeleton variant="circular" width={48} height={48} />\n    <UiSkeleton variant="text" lines={2} lastLineWidth="64%" className="flex-1" />\n    <UiSkeleton variant="rounded" width={64} height={28} />\n  </div>\n</UiSkeletonGroup>`}
          >
            <UiSkeletonGroup label="Memuat profil..." className="max-w-md flex items-center gap-3.5">
              <UiSkeleton variant="circular" width={48} height={48} />
              <div className="flex-1 min-w-0">
                <UiSkeleton variant="text" lines={2} lastLineWidth="64%" />
              </div>
              <UiSkeleton variant="rounded" className="h-7 w-16 rounded-lg" />
            </UiSkeletonGroup>
          </UiDocSection>

          <UiDocSection
            id="skl-card"
            title="Card Skeleton"
            classesHint="<UiSkeletonCard /> · .ui-skeleton-shimmer"
            codeSnippet={`<UiSkeletonCard showMedia showFooter lines={3} />`}
            actions={
              <button
                type="button"
                onClick={() => setSkeletonLoaded(!skeletonLoaded)}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-90" />
                <span>{skeletonLoaded ? 'Tampilkan Skeleton' : 'Simulasikan Selesai'}</span>
              </button>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {skeletonLoaded ? (
                <div key="loaded" className="animate-ui-fade rounded-xl border border-gray-300 bg-white p-4 space-y-3">
                  <div className="h-28 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                    Kalkulus IV · Modul Video HD
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">Integral Lipat &amp; Aplikasi</h4>
                    <p className="text-xs text-gray-500">12 sesi video · 4 kuis evaluasi siap diakses.</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-emerald-700 tabular-nums">92% Tuntas</span>
                    <button
                      type="button"
                      onClick={() => triggerToast('Modul Dibuka', 'Membuka modul Kalkulus IV.', 'info')}
                      className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold cursor-pointer"
                    >
                      Buka Kelas
                    </button>
                  </div>
                </div>
              ) : (
                <UiSkeletonCard key="skeleton" className="animate-ui-fade" lines={2} />
              )}

              <UiSkeletonCard lines={2} />
            </div>
          </UiDocSection>

          <UiDocSection
            id="skl-table"
            title="Table Rows Skeleton"
            classesHint="<UiSkeletonTable rows={4} columns={3} /> · .ui-skeleton-shimmer"
            codeSnippet={`<UiSkeletonTable rows={4} columns={3} />`}
          >
            <UiSkeletonTable rows={4} columns={3} className="max-w-2xl" />
          </UiDocSection>

          <UiDocSection
            id="skl-list"
            title="List & Feed Skeleton"
            classesHint="<UiSkeletonList rows={3} /> · .ui-skeleton-shimmer"
            codeSnippet={`<UiSkeletonList rows={3} showAvatar showTrailing />`}
          >
            <UiSkeletonList rows={3} className="max-w-lg" />
          </UiDocSection>

          <UiDocSection
            id="skl-search"
            title="Search, Recent & Suggestion Skeleton"
            description="Skeleton shimmer terstruktur untuk state loading saat membuka recent search, memuat suggestion chips, dan memfilter hasil pencarian secara real-time."
            classesHint="<UiSkeletonSearchPanel mode='recent-and-suggestions' | 'results' /> · .ui-skeleton-shimmer"
            actions={
              <div className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100/80 p-0.5 text-xs">
                {(
                  [
                    { key: 'loading-empty', label: 'Recent & Saran' },
                    { key: 'loading-results', label: 'Loading Hasil' },
                    { key: 'loaded', label: 'Siap' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSearchSkeletonState(opt.key)}
                    className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap cursor-pointer ${
                      searchSkeletonState === opt.key ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            }
            codeSnippet={`<UiSkeletonSearchPanel mode="recent-and-suggestions" />\n<UiSkeletonSearchPanel mode="results" rows={3} />`}
          >
            <div className="max-w-md rounded-xl border border-gray-300 bg-white overflow-hidden shadow-xs">
              <div className="px-3.5 py-2.5 border-b border-gray-200 flex items-center gap-2.5 bg-gray-50/70">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-xs text-gray-500">
                  {searchSkeletonState === 'loading-results'
                    ? 'Mencari "Skeleton"...'
                    : 'Cari komponen, recent search, atau saran...'}
                </span>
              </div>
              {searchSkeletonState === 'loading-empty' && (
                <UiSkeletonSearchPanel mode="recent-and-suggestions" />
              )}
              {searchSkeletonState === 'loading-results' && (
                <UiSkeletonSearchPanel mode="results" rows={3} />
              )}
              {searchSkeletonState === 'loaded' && (
                <div className="p-3 space-y-3 animate-ui-fade">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 px-1">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pencarian Terakhir
                      </span>
                      <span className="text-[#ee2e65]">Hapus</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-800 flex items-center justify-between">
                      <span>UiSkeleton</span>
                      <span className="text-[11px] text-gray-500">4. Feedback</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-gray-500 px-1 inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#ee2e65]" /> Saran Pencarian
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {['Page Search', 'Motion & Animations', 'Kanban Board'].map((sug) => (
                        <span
                          key={sug}
                          className="px-2.5 py-1 rounded-full bg-[#FEF1F5] border border-[#FBC2D4] text-[11px] font-medium text-[#9D113C]"
                        >
                          {sug}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.8 SPINNERS */}
      {isVisible('spinners') && (
        <UiDocPage
          title="Spinners"
          subLinks={[
            { id: 'spn-border', label: 'Border spinner' },
            { id: 'spn-growing', label: 'Growing spinner' },
            { id: 'spn-variants', label: 'Variants' },
            { id: 'spn-sizes', label: 'Sizes' },
            { id: 'spn-align', label: 'Alignment & Text' },
            { id: 'spn-buttons', label: 'Buttons' },
            { id: 'spn-20-loaders', label: '20 Loading Animations' },
          ]}
        >
          <UiDocSection
            id="spn-border"
            title="Border spinner"
            classesHint="w-6 h-6 rounded-full border-2 border-gray-900 border-t-transparent animate-spin"
            codeSnippet={`<span className="w-6 h-6 rounded-full border-2 border-gray-900 border-t-transparent animate-spin inline-block" />`}
          >
            <span className="w-6 h-6 rounded-full border-2 border-gray-900 border-t-transparent animate-spin inline-block" />
          </UiDocSection>

          <UiDocSection
            id="spn-growing"
            title="Growing spinner"
            classesHint="w-5 h-5 rounded-full bg-primary-600 animate-ping"
            codeSnippet={`<span className="w-4 h-4 rounded-full bg-primary-600 animate-ping inline-block" />`}
          >
            <div className="flex items-center gap-6 py-1">
              <span className="w-4 h-4 rounded-full bg-primary-600 animate-ping inline-block" />
              <span className="w-5 h-5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="spn-variants"
            title="Variants"
            classesHint="border-primary-600 / border-emerald-600 / border-amber-500 / border-rose-600"
            codeSnippet={`<span className="w-6 h-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />`}
          >
            <div className="flex items-center gap-4">
              <span className="w-6 h-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
              <span className="w-6 h-6 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
              <span className="w-6 h-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <span className="w-6 h-6 rounded-full border-2 border-rose-600 border-t-transparent animate-spin" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="spn-sizes"
            title="Sizes"
            classesHint="w-4 h-4 / w-6 h-6 / w-9 h-9"
            codeSnippet={`<span className="w-4 h-4 ... animate-spin" />\n<span className="w-9 h-9 ... animate-spin" />`}
          >
            <div className="flex items-center gap-5">
              <span className="w-4 h-4 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" />
              <span className="w-6 h-6 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" />
              <span className="w-9 h-9 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="spn-align"
            title="Alignment & Text"
            classesHint="flex items-center justify-center gap-2.5"
            codeSnippet={`<div className="flex items-center justify-center gap-2.5 py-4">\n  <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />\n  <span className="text-xs font-medium text-gray-600">Memuat data akademik...</span>\n</div>`}
          >
            <div className="space-y-3 max-w-md text-xs">
              <div className="flex items-center justify-center gap-2.5 py-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/70">
                <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                <span className="font-medium text-gray-600">Memuat daftar siswa...</span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white">
                <span className="font-medium text-gray-700">Sinkronisasi nilai ujian</span>
                <span className="w-4 h-4 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="spn-buttons"
            title="Buttons"
            classesHint="inline-flex items-center gap-2"
            codeSnippet={`<button><span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> Loading Button...</button>`}
          >
            <button
              onClick={() => setSpinnerBtnLoading(!spinnerBtnLoading)}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold inline-grid place-items-center cursor-pointer transition-colors"
            >
              <span
                aria-hidden={!spinnerBtnLoading}
                className={`[grid-area:1/1] inline-flex items-center gap-2 transition-opacity duration-150 ${
                  spinnerBtnLoading ? 'opacity-100' : 'opacity-0 invisible'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Loading Button...</span>
              </span>
              <span
                className={`[grid-area:1/1] transition-opacity duration-150 ${
                  spinnerBtnLoading ? 'opacity-0 invisible' : 'opacity-100'
                }`}
              >
                Klik untuk Aktifkan Loading
              </span>
            </button>
          </UiDocSection>

          <UiDocSection
            id="spn-20-loaders"
            title="20 Loading Animations (loader/spinner-arc & Koleksi Modern)"
            description="Koleksi lengkap 20 animasi loading modern (Spinner Arc, Dual Ring, Morphing Blob, Newton Dots, Orbital Atom, dan lainnya) tersedia di sub-halaman Loading Animations."
            classesHint="<UiLoader variant='spinner-arc' size='lg' color='#C6F135' />"
            actions={
              <button
                type="button"
                onClick={() => selectUiNode('feedback', 'Loading Animations', 'ldr-stage')}
                className="px-3 py-1 rounded-full bg-[#121418] dark:bg-[#1B1E24] border border-transparent dark:border-white/[0.12] text-[#C6F135] text-xs font-semibold hover:brightness-110 cursor-pointer"
              >
                Buka 20 Loaders →
              </button>
            }
            codeSnippet={`<UiLoader variant="spinner-arc" size="lg" color="#C6F135" />\n<UiLoader variant="orbital-atom" size="lg" color="#C6F135" />`}
          >
            <div
              data-dark-preserve="true"
              className="rounded-xl bg-[#121418] border border-gray-900 dark:border-white/[0.10] p-4 flex flex-wrap items-center justify-around gap-4"
            >
              {(
                [
                  { id: 'spinner-arc', label: '1. Spinner Arc' },
                  { id: 'dual-ring', label: '2. Dual Ring' },
                  { id: 'morph-blob', label: '3. Morph Blob' },
                  { id: 'newton-dots', label: '4. Newton Dots' },
                  { id: 'orbital-atom', label: '10. Orbital Atom' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectUiNode('feedback', 'Loading Animations', 'ldr-stage')}
                  className="flex flex-col items-center gap-2 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <UiLoader variant={item.id} size="md" color="#C6F135" />
                  <span className="text-[11px] font-medium text-gray-300">{item.label}</span>
                </button>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.8B 20 LOADING ANIMATIONS */}
      {isVisible('loadinganimations') && <LoadingAnimationsUiKit />}

      {/* 4.9 PROGRESS BAR */}
      {(isVisible('progressbar') || isVisible('progress')) && (
        <UiDocPage
          title="Progress Bar"
          subLinks={[
            { id: 'prg-basic', label: 'Basic Progress' },
            { id: 'prg-label', label: 'With Label' },
            { id: 'prg-height', label: 'Height & Sizing' },
            { id: 'prg-bg', label: 'Backgrounds' },
            { id: 'prg-striped', label: 'Striped' },
            { id: 'prg-animated', label: 'Animated Stripes' },
            { id: 'prg-stacked', label: 'Multiple Bars' },
            { id: 'prg-circular', label: 'Circular Progress' },
          ]}
        >
          <UiDocSection
            id="prg-basic"
            title="Basic Progress"
            classesHint="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden"
            codeSnippet={`<div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">\n  <div className="bg-primary-600 h-full" style={{ width: '${progressVal}%' }} />\n</div>`}
            actions={
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-gray-700 tabular-nums">{progressVal}%</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={progressVal}
                  onChange={(e) => setProgressVal(Number(e.target.value))}
                  className="w-28 accent-primary-600 cursor-pointer"
                />
              </div>
            }
          >
            <div className="max-w-xl w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary-600 h-full transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ width: `${progressVal}%` }} />
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-label"
            title="With Label"
            classesHint="h-4 rounded-full text-[11px] font-bold text-white"
            codeSnippet={`<div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">\n  <div className="bg-primary-600 h-full text-xs text-white flex items-center justify-center" style={{ width: '${progressVal}%' }}>${progressVal}%</div>\n</div>`}
          >
            <div className="max-w-xl w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="bg-primary-600 h-full rounded-full text-[11px] font-bold text-white flex items-center justify-center transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] tabular-nums"
                style={{ width: `${progressVal}%` }}
              >
                {progressVal}%
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-height"
            title="Height & Sizing"
            classesHint="h-1 / h-2 / h-4"
            codeSnippet={`<div className="w-full bg-gray-200 h-1 rounded-full">...</div>\n<div className="w-full bg-gray-200 h-4 rounded-full">...</div>`}
          >
            <div className="max-w-xl space-y-3">
              <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                <div className="bg-gray-900 h-full w-3/5" />
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-600 h-full w-3/4" />
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-4/5" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-bg"
            title="Backgrounds"
            classesHint="bg-emerald-500 / bg-amber-500 / bg-rose-500"
            codeSnippet={`<div className="bg-emerald-500 h-full w-[75%]" />`}
          >
            <div className="max-w-xl space-y-2.5">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[78%]" />
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[52%]" />
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[28%]" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-striped"
            title="Striped"
            classesHint="bg-[linear-gradient(45deg,rgba(255,255,255,.25)_25%,transparent_25%,...)]"
            codeSnippet={`<div className="h-2.5 bg-emerald-500 bg-[linear-gradient(...)]" style={{ width: '${progressVal}%' }} />`}
          >
            <div className="max-w-xl w-full bg-gray-200 h-3 rounded-sm overflow-hidden">
              <div
                className="h-full bg-emerald-500 bg-[linear-gradient(45deg,rgba(255,255,255,.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.25)_50%,rgba(255,255,255,.25)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ width: `${progressVal}%` }}
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-animated"
            title="Animated Stripes"
            classesHint="animate-ui-stripes bg-primary-600"
            codeSnippet={`<div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">\n  <div className="h-full bg-primary-600 animate-ui-stripes" style={{ width: '${progressVal}%' }} />\n</div>`}
            actions={
              <button
                type="button"
                onClick={() => setProgressAnimated(!progressAnimated)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                {progressAnimated ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{progressAnimated ? 'Jeda Animasi' : 'Jalankan Animasi'}</span>
              </button>
            }
          >
            <div className="max-w-xl w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full bg-primary-600 bg-[linear-gradient(45deg,rgba(255,255,255,.28)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.28)_50%,rgba(255,255,255,.28)_75%,transparent_75%,transparent)] bg-[length:1.25rem_1.25rem] transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  progressAnimated ? 'animate-ui-stripes' : ''
                }`}
                style={{ width: `${progressVal}%` }}
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-stacked"
            title="Multiple bars"
            classesHint="flex / w-[80%] + w-[15%] + w-[5%]"
            codeSnippet={`<div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">\n  <div className="bg-emerald-500 w-[80%]" />\n  <div className="bg-amber-400 w-[15%]" />\n  <div className="bg-rose-500 w-[5%]" />\n</div>`}
          >
            <div className="max-w-xl space-y-1.5 text-xs">
              <div className="text-gray-600 tabular-nums">Multiple Stacked Bars (80% · 15% · 5%)</div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[80%]" />
                <div className="bg-amber-400 h-full w-[15%]" />
                <div className="bg-rose-500 h-full w-[5%]" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="prg-circular"
            title="Circular Progress"
            classesHint="svg circle strokeDasharray / strokeDashoffset"
            codeSnippet={`<svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">\n  <circle cx="18" cy="18" r="15.5" strokeWidth="3" className="stroke-primary-600 fill-none" strokeDasharray="97.4" strokeDashoffset={...} />\n</svg>`}
          >
            <div className="flex flex-wrap items-center gap-6">
              {[
                { label: 'Video', pct: progressVal, stroke: 'stroke-primary-600' },
                { label: 'Kuis', pct: 84, stroke: 'stroke-emerald-600' },
                { label: 'Tugas', pct: 45, stroke: 'stroke-amber-500' },
              ].map((ring) => {
                const r = 15.5;
                const c = 2 * Math.PI * r;
                const offset = c - (ring.pct / 100) * c;
                return (
                  <div key={ring.label} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r={r}
                          strokeWidth="3"
                          className="stroke-gray-200 fill-none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r={r}
                          strokeWidth="3"
                          strokeLinecap="round"
                          className={`${ring.stroke} fill-none transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]`}
                          strokeDasharray={c}
                          strokeDashoffset={offset}
                        />
                      </svg>
                      <span className="absolute text-[11px] font-bold text-gray-900 tabular-nums">
                        {ring.pct}%
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{ring.label}</span>
                  </div>
                );
              })}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.9B LOADING / ERROR STATE */}
      {isVisible('loadingerrorstate') && (
        <UiDocPage
          title="Loading / Error State"
          description="Siklus lengkap UI State untuk proses memuat data asinkron, pesan galat terstruktur, tombol coba lagi (retry), serta pemulihan parsial."
          subLinks={[
            { id: 'lds-lifecycle', label: 'Async Lifecycle Switcher' },
            { id: 'lds-network', label: 'Error & Retry Card' },
            { id: 'lds-inline', label: 'Inline Section Sync & Error' },
          ]}
        >
          <UiDocSection
            id="lds-lifecycle"
            title="Async Lifecycle Switcher (Idle / Loading / Success / Error)"
            description="Uji perubahan kondisi UI secara langsung antara status diam, memuat, berhasil, dan gagal."
            classesHint="rounded-xl border border-gray-300 bg-white p-4"
            codeSnippet={`{phase === 'loading' && <LoadingCard />}\n{phase === 'error' && <ErrorRetryCard onRetry={refetch} />}\n{phase === 'success' && <DataSummaryCard />}`}
          >
            <div className="max-w-xl space-y-3 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {(['idle', 'loading', 'success', 'error'] as const).map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => setAsyncPhase(phase)}
                    className={`px-3 py-1.5 rounded-lg font-semibold capitalize cursor-pointer transition-colors ${
                      asyncPhase === phase
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>

              {asyncPhase === 'idle' && (
                <div key="idle" className="animate-ui-fade p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/60 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-800">Siap Memuat Rekap Presensi</div>
                    <div className="text-[11px] text-gray-500">Klik tombol di samping untuk mengambil data semester aktif.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAsyncPhase('loading');
                      setTimeout(() => setAsyncPhase('success'), 900);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer shrink-0"
                  >
                    Muat Data
                  </button>
                </div>
              )}

              {asyncPhase === 'loading' && (
                <div key="loading" className="animate-ui-fade p-4 rounded-xl border border-gray-300 bg-white space-y-3">
                  <div className="flex items-center gap-2 text-primary-700 font-semibold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengambil data presensi kelas 302...</span>
                  </div>
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              )}

              {asyncPhase === 'success' && (
                <div key="success" className="animate-ui-slide-down p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 animate-ui-check" />
                    <div>
                      <div className="font-bold text-emerald-950">Data Berhasil Dimuat</div>
                      <div className="text-[11px] text-emerald-800 tabular-nums">
                        32 dari 32 mahasiswa tercatat hadir · Pembaruan terakhir 09:42 WIB
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAsyncPhase('loading');
                      setTimeout(() => setAsyncPhase('success'), 700);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold hover:bg-emerald-100 cursor-pointer shrink-0"
                  >
                    Muat Ulang
                  </button>
                </div>
              )}

              {asyncPhase === 'error' && (
                <div key="error" className="animate-ui-shake p-4 rounded-xl border border-rose-200 bg-rose-50/70 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-rose-950">Gagal Memuat Data (HTTP 503)</div>
                      <div className="text-[11px] text-rose-800">
                        Koneksi ke server nilai mengalami timeout. Silakan coba muat ulang.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAsyncPhase('loading');
                      setTimeout(() => {
                        setAsyncPhase('success');
                        triggerToast('Berhasil Dipulihkan', 'Data kelas berhasil dimuat ulang.', 'success');
                      }, 850);
                    }}
                    className="group px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-90" />
                    <span>Coba Lagi</span>
                  </button>
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="lds-network"
            title="Error & Retry Card"
            description="Panel status kegagalan permintaan lengkap dengan kode galat, penjelasan penyebab, dan aksi pemulihan."
            classesHint="rounded-xl border border-rose-200 bg-rose-50/50 p-4"
            codeSnippet={`<div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-2">\n  <div className="font-bold text-rose-900">ERR_CONNECTION_TIMED_OUT</div>\n  <button onClick={retry}>Coba Lagi</button>\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl text-xs">
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-bold text-rose-900">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Server Tidak Merespons</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200 tabular-nums">
                    504
                  </span>
                </div>
                <p className="text-rose-800 leading-relaxed">
                  Permintaan unggah berkas PDF melebihi batas waktu tunggu 15 detik.
                </p>
                <button
                  type="button"
                  onClick={() => triggerToast('Mencoba Ulang', 'Menghubungkan kembali ke server...', 'info')}
                  className="group px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-90" />
                  <span>Kirim Ulang</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Validasi Payload Gagal</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 tabular-nums">
                    422
                  </span>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  Format kolom NISN pada berkas CSV tidak sesuai standar 10 digit.
                </p>
                <button
                  type="button"
                  onClick={() => triggerToast('Detail Error', 'Menampilkan baris CSV bermasalah.', 'warning')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100 cursor-pointer"
                >
                  Periksa Baris Galat
                </button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="lds-inline"
            title="Inline Section Sync & Error"
            classesHint="px-3.5 py-2 rounded-lg border flex items-center justify-between"
            codeSnippet={`<div className="px-3.5 py-2 rounded-lg border border-amber-200 bg-amber-50 flex justify-between">\n  <span>Sinkronisasi parsial gagal</span>\n  <button onClick={retry}>Muat Ulang</button>\n</div>`}
          >
            <div className="max-w-xl space-y-2.5 text-xs">
              {inlineSyncPhase === 'loading' && (
                <div key="inline-loading" className="animate-ui-fade px-3.5 py-2.5 rounded-lg border border-primary-200 bg-primary-50/60 text-primary-900 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-600" />
                    <span>Menyinkronkan ringkasan nilai terbaru...</span>
                  </span>
                  <span className="text-[11px] font-mono text-primary-700 tabular-nums">Proses...</span>
                </div>
              )}

              {inlineSyncPhase === 'error' && (
                <div key="inline-error" className="animate-ui-shake px-3.5 py-2.5 rounded-lg border border-rose-200 bg-rose-50/70 text-rose-900 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Gagal memperbarui widget analitik mingguan.</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInlineSyncPhase('loading');
                      setTimeout(() => setInlineSyncPhase('synced'), 800);
                    }}
                    className="px-2.5 py-1 rounded bg-white border border-rose-200 text-rose-700 font-semibold hover:bg-rose-100 cursor-pointer shrink-0"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {inlineSyncPhase === 'synced' && (
                <div key="inline-synced" className="animate-ui-fade px-3.5 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 text-emerald-900 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 animate-ui-check" />
                    <span>Semua widget sinkron dengan data terbaru.</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setInlineSyncPhase('error')}
                    className="text-emerald-800 font-semibold hover:underline cursor-pointer shrink-0"
                  >
                    Simulasi Error
                  </button>
                </div>
              )}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.10 BOOTSTRAP TOAST */}
      {isVisible('bootstraptoast') && (
        <UiDocPage
          title="Bootstrap Toast"
          subLinks={[
            { id: 'bt-basic', label: 'Basic' },
            { id: 'bt-live', label: 'Live Example' },
            { id: 'bt-schemes', label: 'Color schemes' },
            { id: 'bt-custom', label: 'Custom content' },
          ]}
        >
          <UiDocSection
            id="bt-basic"
            title="Basic"
            classesHint="bg-white rounded-xl border border-gray-300 shadow-md"
            codeSnippet={`<div className="p-3.5 bg-white rounded-xl border border-gray-300 shadow-md">\n  <div className="font-bold pb-1.5 border-b">UI KIT Core</div>\n  <p className="text-xs text-gray-600 pt-1.5">Backup database berhasil disimpan.</p>\n</div>`}
          >
            <div className="max-w-sm p-3.5 bg-white rounded-xl border border-gray-300 shadow-md space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-gray-300">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  <span className="w-2 h-2 rounded-full bg-primary-600" />
                  <span>UI KIT Core</span>
                </div>
                <span className="text-[11px] text-gray-500">11m lalu</span>
              </div>
              <p className="text-gray-600">Backup otomatis database silabus berhasil disimpan.</p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="bt-live"
            title="Live example"
            classesHint="transition-opacity / shadow-md"
            codeSnippet={`{show ? <Toast onClose={() => setShow(false)} /> : <button onClick={() => setShow(true)}>Tampilkan Toast</button>}`}
          >
            {showCornerToast ? (
              <div className="animate-ui-pop max-w-sm p-3.5 bg-white rounded-xl border border-gray-300 shadow-md space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-300">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Live Toast Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500">Baru saja</span>
                    <button onClick={() => setShowCornerToast(false)} className="text-gray-500 hover:text-gray-800 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">Sinkronisasi rapor semester berjalan sukses.</p>
              </div>
            ) : (
              <button
                onClick={() => setShowCornerToast(true)}
                className="animate-ui-fade px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Live Example: Tampilkan Toast
              </button>
            )}
          </UiDocSection>

          <UiDocSection
            id="bt-schemes"
            title="Color schemes"
            classesHint="bg-primary-600 text-white / bg-emerald-600 text-white"
            codeSnippet={`<div className="px-3.5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold flex justify-between">\n  <span>Color Scheme: Primary Rose Toast</span>\n</div>`}
          >
            <div className="max-w-md space-y-2 text-xs">
              <div className="px-3.5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold flex items-center justify-between">
                <span>Color Scheme: Primary Rose Toast</span>
                <X className="w-3.5 h-3.5 opacity-80" />
              </div>
              <div className="px-3.5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center justify-between">
                <span>Color Scheme: Mint Success Toast</span>
                <X className="w-3.5 h-3.5 opacity-80" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="bt-custom"
            title="Custom content"
            classesHint="p-3.5 bg-white rounded-xl border border-gray-300 shadow-xs space-y-2.5"
            codeSnippet={`<div className="p-3.5 bg-white rounded-xl border space-y-2">\n  <div className="font-semibold">Konfirmasi penghapusan tugas?</div>\n  <div className="flex gap-2"><button>Ambil Tindakan</button><button>Tutup</button></div>\n</div>`}
          >
            <div className="max-w-sm p-3.5 bg-white rounded-xl border border-gray-300 shadow-xs space-y-2.5 text-xs">
              <div className="font-semibold text-gray-900">Custom Content: Konfirmasi penghapusan tugas?</div>
              <div className="flex gap-2">
                <button
                  onClick={() => triggerToast('Custom Toast', 'Tindakan diambil dari custom toast!', 'success')}
                  className="px-3 py-1.5 rounded-md bg-primary-600 text-white font-semibold cursor-pointer"
                >
                  Ambil Tindakan
                </button>
                <button className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 font-semibold">Tutup</button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4.11 CLIPBOARD */}
      {isVisible('clipboard') && (
        <UiDocPage
          title="Clipboard"
        >
          <UiDocSection
            title="Copy Code & Command Bar"
            classesHint="bg-gray-900 text-white rounded-lg font-mono"
            codeSnippet={`<button onClick={() => navigator.clipboard?.writeText(code)}>{copied ? 'Tersalin!' : 'Salin'}</button>`}
          >
            <div className="max-w-lg space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 bg-gray-900 text-white rounded-lg font-mono">
                <span className="truncate">{codeSnippet}</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(codeSnippet);
                    setClipboardCopied(true);
                    triggerToast('Tersalin', 'Perintah disalin ke clipboard!', 'success');
                    setTimeout(() => setClipboardCopied(false), 2000);
                  }}
                  className="ml-3 px-3 py-1 rounded bg-primary-600 text-white font-sans font-semibold hover:bg-primary-700 cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  {clipboardCopied ? (
                    <Check className="w-3.5 h-3.5 animate-ui-check" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{clipboardCopied ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>
              <span className="text-gray-500 block">
                Mendukung salin-tempel cepat kode kelas, token ujian, atau cuplikan perintah.
              </span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}
    </div>
  );
};
