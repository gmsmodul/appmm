import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Compass,
  Navigation,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Menu,
  SlidersHorizontal,
  ExternalLink,
  Plus,
  TrendingUp,
  Check,
  Search,
  Home,
  BookOpen,
  Award,
  Bell,
  Copy,
  RotateCcw,
  ArrowLeft,
  Globe,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { CustomSelect } from '../ui/CustomSelect';
import { MobileNavUiKitDemo } from './MobileNavUiKitDemo';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { VerticalScrollTrack, VerticalScrollAccent } from '../ui/VerticalScrollTrack';
import { ElasticPullToRefresh } from '../ui/ElasticPullToRefresh';
import { MotionUiKit } from './MotionUiKit';
import { AppOptimizationUiKit } from './AppOptimizationUiKit';
import { GanttChartUiKit } from './GanttChartUiKit';
import { QuickAccessUiKit } from './QuickAccessUiKit';

interface OtherMultimediaUiKitProps {
  activeSubJump?: string;
  category: 'charts' | 'maps' | 'navigation' | 'behavioral' | 'layout' | 'all';
}

export const OtherMultimediaUiKit: React.FC<OtherMultimediaUiKitProps> = ({ activeSubJump, category }) => {
  const { triggerToast, setActiveDrawerSpec } = useApp();

  // 7. Maps States
  const [selectedZone, setSelectedZone] = useState('Cluster 302');
  const [slideMonthDemo, setSlideMonthDemo] = useState('Feb');
  const [ptrDemoSeq, setPtrDemoSeq] = useState(0);
  const [ptrSyncCount, setPtrSyncCount] = useState(0);
  const [ptrLastSync, setPtrLastSync] = useState('Baru saja');

  // 8. Navigation States
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [splitDarkDropdownOpen, setSplitDarkDropdownOpen] = useState(false);
  const [dropDirOpen, setDropDirOpen] = useState<'up' | 'right' | null>(null);
  const basicDropdownRef = useRef<HTMLDivElement>(null);
  const splitDarkDropdownRef = useRef<HTMLDivElement>(null);
  const dropUpRef = useRef<HTMLDivElement>(null);
  const dropRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen && !splitDarkDropdownOpen && !dropDirOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownOpen && basicDropdownRef.current && !basicDropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (splitDarkDropdownOpen && splitDarkDropdownRef.current && !splitDarkDropdownRef.current.contains(target)) {
        setSplitDarkDropdownOpen(false);
      }
      if (dropDirOpen === 'up' && dropUpRef.current && !dropUpRef.current.contains(target)) {
        setDropDirOpen(null);
      } else if (dropDirOpen === 'right' && dropRightRef.current && !dropRightRef.current.contains(target)) {
        setDropDirOpen(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setSplitDarkDropdownOpen(false);
        setDropDirOpen(null);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dropdownOpen, splitDarkDropdownOpen, dropDirOpen]);
  const [activeNavItem, setActiveNavItem] = useState('Overview');
  const [activeVertNav, setActiveVertNav] = useState('Profil Kelas');
  const [activeTabItem, setActiveTabItem] = useState('Ringkasan');
  const [wizardActiveStep, setWizardActiveStep] = useState(2);
  const [activeClassicMenu, setActiveClassicMenu] = useState('Dashboard');
  const [paginationPage, setPaginationPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('1');

  // 8.B Navigasi / URL State
  const [urlSearchQ, setUrlSearchQ] = useState('kalkulus');
  const [urlClassFilter, setUrlClassFilter] = useState('302');
  const [urlStatusFilter, setUrlStatusFilter] = useState<'all' | 'published' | 'draft'>('published');
  const [urlHashTab, setUrlHashTab] = useState<'ringkasan' | 'silabus' | 'peserta'>('silabus');
  const [urlHistoryStack, setUrlHistoryStack] = useState<string[]>(['/kelas/302#ringkasan', '/kelas/302#silabus']);
  const [urlSortCol, setUrlSortCol] = useState<'nama' | 'nilai' | 'tanggal'>('nilai');
  const [urlSortOrder, setUrlSortOrder] = useState<'asc' | 'desc'>('desc');
  const [urlTablePage, setUrlTablePage] = useState(2);

  // 9. Behavioral States
  const [spyActiveSection, setSpyActiveSection] = useState('Bab 1');
  const [loadMoreCount, setLoadMoreCount] = useState(3);
  const [draggableItems, setDraggableItems] = useState([
    '01. Menyiapkan Slide Presentasi Kalkulus',
    '02. Verifikasi Lembar Presensi Siswa',
    '03. Terbitkan Rubrik Praktikum Fisika B',
    '04. Publikasi Pengumuman Ujian Tengah Semester',
  ]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [scrollAccent, setScrollAccent] = useState<VerticalScrollAccent>('violet');
  const [scrollMatrixRows, setScrollMatrixRows] = useState(() =>
    [
      'Users & Roles',
      'Curriculum Modules',
      'Attendance Logs',
      'Exam Papers',
      'Assignments',
      'Live Quiz Rooms',
      'Schedule Slots',
      'Gradebook Export',
      'Media Library',
      'Audit Trail',
      'System Webhooks',
      'Billing & Invoices',
    ].map((name) => ({
      name,
      create: true,
      read: true,
      update: true,
      del: true,
      crud: true,
      access: true,
    }))
  );

  // 10. Layout States
  const [externalNavbarOpen, setExternalNavbarOpen] = useState(false);

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') === itemKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const handleMoveDraggable = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= draggableItems.length) return;
    const copy = [...draggableItems];
    [copy[idx], copy[targetIdx]] = [copy[targetIdx], copy[idx]];
    setDraggableItems(copy);
  };

  const handleScrollSpyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (top < 40) setSpyActiveSection('Bab 1');
    else if (top < 95) setSpyActiveSection('Bab 2');
    else setSpyActiveSection('Bab 3');
  };

  return (
    <div className="space-y-10 print-section">
      {/* ========================================================= */}
      {/* 6. CHARTS */}
      {/* ========================================================= */}
      {(category === 'all' || category === 'charts') && isVisible('charts') && (
        <UiDocPage
          title="Charts"
          subLinks={[
            { id: 'cht-bar', label: 'Bar Chart' },
            { id: 'cht-line', label: 'Line Chart' },
            { id: 'cht-donut', label: 'Donut Chart' },
            { id: 'cht-distribution', label: 'Attendance Donut Summary' },
          ]}
        >
          <UiDocSection
            id="cht-bar"
            title="Rata-rata Skor per Kelas (Bar Chart)"
            classesHint="h-48 flex items-end justify-between gap-4 border-b border-gray-300"
            codeSnippet={`<div className="h-48 flex items-end justify-between gap-4 border-b border-gray-300">\n  {data.map(col => <div style={{ height: \`\${col.score}%\` }} className="bg-[#ee2e65] rounded-t-lg" />)}\n</div>`}
            actions={
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold tabular-nums">
                <TrendingUp className="w-4 h-4" />
                <span>+4.2%</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="h-48 flex items-end justify-between gap-4 pt-4 px-2 border-b border-gray-300">
                {[
                  { cls: 'Class 302', score: 92, h: 'h-[92%]', color: 'bg-[#ee2e65]' },
                  { cls: 'Class 303', score: 86, h: 'h-[86%]', color: 'bg-[#F59E0B]' },
                  { cls: 'Class 304', score: 95, h: 'h-[95%]', color: 'bg-[#10B981]' },
                  { cls: 'Class 305', score: 89, h: 'h-[89%]', color: 'bg-[#EF4444]' },
                ].map((col) => (
                  <div key={col.cls} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-xs font-bold text-gray-700 tabular-nums">{col.score}%</span>
                    <div className={`w-full max-w-[72px] ${col.h} ${col.color} rounded-t-lg transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom hover:scale-y-[1.04] hover:brightness-105 cursor-pointer`} />
                    <span className="text-xs text-gray-500 truncate w-full text-center mt-1">{col.cls}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="tabular-nums">Total 88 Siswa Dinilai</span>
                <span className="text-primary-600 font-semibold">Bar Chart · Term 1 2026</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="cht-line"
            title="Tren Nilai Mingguan (Line Chart)"
            classesHint="svg polyline stroke='#ee2e65' strokeWidth='3'"
            codeSnippet={`<svg viewBox="0 0 320 120" className="w-full h-36">\n  <polyline fill="none" stroke="#ee2e65" strokeWidth="3" points="15,85 75,65 135,72 195,40 255,32 305,18" />\n</svg>`}
          >
            <div className="h-48 flex flex-col justify-between pt-2">
              <svg viewBox="0 0 320 120" className="w-full h-36 overflow-visible">
                <line x1="0" y1="30" x2="320" y2="30" stroke="#D1D5DB" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2="320" y2="70" stroke="#D1D5DB" strokeDasharray="3 3" />
                <polyline
                  fill="none"
                  stroke="#ee2e65"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="15,85 75,65 135,72 195,40 255,32 305,18"
                />
                {[
                  [15, 85],
                  [75, 65],
                  [135, 72],
                  [195, 40],
                  [255, 32],
                  [305, 18],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="#111827" stroke="#ffffff" strokeWidth="2" className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center hover:scale-125 cursor-pointer" />
                ))}
              </svg>
              <div className="flex justify-between text-[11px] text-gray-500 px-2">
                <span>Mgg 1</span>
                <span>Mgg 2</span>
                <span>Mgg 3</span>
                <span>Mgg 4</span>
                <span>Mgg 5</span>
                <span>Mgg 6</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="cht-donut"
            title="Komposisi Ketuntasan Belajar (Donut Chart)"
            classesHint="w-32 h-32 rounded-full border-8 border-primary-600 border-t-emerald-500 border-r-amber-500"
            codeSnippet={`<div className="w-32 h-32 rounded-full border-8 border-primary-600 border-t-emerald-500 border-r-amber-500 flex items-center justify-center">94%</div>`}
          >
            <div className="h-44 flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="w-32 h-32 rounded-full border-8 border-primary-600 border-t-emerald-500 border-r-amber-500 flex items-center justify-center text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900 tabular-nums">94%</div>
                  <div className="text-[11px] text-gray-500 font-semibold">Tuntas</div>
                </div>
              </div>
              <div className="space-y-2 text-xs tabular-nums">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                  <span>Video Selesai (62%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Kuis Lulus (32%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Dalam Proses (6%)</span>
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="cht-distribution"
            title="Distribusi Kehadiran Siswa (Donut Summary)"
            classesHint="w-32 h-32 rounded-full border-8 border-primary-600 border-t-emerald-500 border-r-amber-500"
            codeSnippet={`<div className="flex items-center justify-around">\n  <div className="w-32 h-32 rounded-full border-8 border-primary-600 border-t-emerald-500">96%</div>\n</div>`}
            actions={
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 tabular-nums">
                96.4% Hadir
              </span>
            }
          >
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              <div className="relative w-32 h-32 rounded-full border-8 border-primary-600 border-t-emerald-500 border-r-amber-500 flex items-center justify-center text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900 tabular-nums">96%</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Tepat Waktu</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs tabular-nums">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                  <span className="font-medium text-gray-800">Tepat Waktu (88%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-gray-800">Izin Sakit (8%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-medium text-gray-800">Dispensasi (4%)</span>
                </div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'charts') && isVisible('ganttchart') && (
        <GanttChartUiKit />
      )}

      {/* ========================================================= */}
      {/* 7. MAPS */}
      {/* ========================================================= */}
      {(category === 'all' || category === 'maps') && isVisible('googlemaps') && (
        <UiDocPage
          title="Google Maps"
        >
          <UiDocSection
            title="Campus Location Pin & Grid Backdrop"
            classesHint="bg-slate-900 text-white rounded-xl overflow-hidden"
            codeSnippet={`<div className="h-44 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center">\n  <MapPin className="w-5 h-5 text-rose-400" />\n  <div className="font-bold">Studio UI KIT Design Center</div>\n</div>`}
            actions={
              <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">Live GPS</span>
            }
          >
            <div className="relative h-48 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />
              <div className="relative z-10 space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-rose-500/20 mx-auto flex items-center justify-center border border-rose-500 text-rose-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">Studio UI KIT Design Center</div>
                <div className="text-xs text-slate-300">North Wing Floor 2 · Room 301</div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'maps') && isVisible('vectormaps') && (
        <UiDocPage
          title="Vector Maps"
        >
          <UiDocSection
            title="Interactive Campus Zone Selector"
            classesHint="bg-primary-950 text-primary-200 rounded-xl"
            codeSnippet={`<div className="h-44 rounded-xl bg-primary-950 text-white flex flex-col items-center justify-center">\n  {zones.map(z => <button onClick={() => setZone(z)}>{z}</button>)}\n</div>`}
            actions={
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                {selectedZone}
              </span>
            }
          >
            <div className="h-48 rounded-xl bg-primary-950 text-primary-200 flex flex-col items-center justify-center p-4 text-center space-y-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                <Compass className="w-4 h-4 text-primary-300" />
                <span>Zonasi Poligon Kampus</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {['Cluster 302', 'Lab Fisika', 'Auditorium'].map((z) => (
                  <button
                    key={z}
                    onClick={() => setSelectedZone(z)}
                    className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                      selectedZone === z ? 'bg-primary-500 text-white' : 'bg-primary-900 text-primary-200 hover:bg-primary-800'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
              <div key={selectedZone} className="text-xs text-primary-300 animate-ui-fade">Zona terpilih: {selectedZone}</div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'maps') && isVisible('animatedmaps') && (
        <UiDocPage
          title="Animated Maps"
        >
          <UiDocSection
            title="Live Moving Route Animation"
            classesHint="bg-emerald-950 text-emerald-200 / animate-ping"
            codeSnippet={`<div className="h-44 rounded-xl bg-emerald-950 text-white flex flex-col items-center justify-center">\n  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />\n</div>`}
            actions={
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Live Moving
              </span>
            }
          >
            <div className="h-48 rounded-xl bg-emerald-950 text-emerald-200 flex flex-col items-center justify-center p-4 text-center space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-sm font-bold text-white">Rute Antar Gedung</span>
              </div>
              <div className="text-xs text-emerald-300">Estimasi Waktu: 2 Menit (Jalan Kaki)</div>
              <div className="w-2/3 max-w-xs bg-emerald-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-2/3 animate-pulse" />
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* ========================================================= */}
      {/* 8. NAVIGATION */}
      {/* ========================================================= */}
      {(category === 'all' || category === 'navigation') && isVisible('breadcrumbs') && (
        <UiDocPage
          title="Breadcrumbs"
          subLinks={[
            { id: 'brc-chevron', label: 'Chevron Trail Breadcrumb' },
            { id: 'brc-slash', label: 'Slash Separator Breadcrumb' },
          ]}
        >
          <UiDocSection
            id="brc-chevron"
            title="Chevron Trail Breadcrumb"
            classesHint="flex items-center gap-2 bg-gray-50 px-3.5 py-2.5 rounded-lg"
            codeSnippet={`<nav className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3.5 py-2.5 rounded-lg">\n  <Home className="w-3.5 h-3.5" />\n  <ChevronRight className="w-3.5 h-3.5" />\n  <span className="font-bold text-gray-900">Class Materials</span>\n</nav>`}
          >
            <nav className="max-w-lg flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3.5 py-2.5 rounded-lg border border-gray-300">
              <Home className="w-3.5 h-3.5 text-gray-500" />
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              <span>Kurikulum 2026</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-bold text-gray-900">Class Materials</span>
            </nav>
          </UiDocSection>

          <UiDocSection
            id="brc-slash"
            title="Slash Separator Breadcrumb"
            classesHint="flex items-center gap-2 text-gray-500"
            codeSnippet={`<nav className="flex items-center gap-2 text-xs text-gray-500">\n  <span>UI KIT</span> <span>/</span> <span className="font-semibold text-primary-600">Bab 4</span>\n</nav>`}
          >
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <span>UI KIT</span>
              <span className="text-gray-500">/</span>
              <span>Matematika</span>
              <span className="text-gray-500">/</span>
              <span className="font-semibold text-primary-600">Bab 4 Turunan Rantai</span>
            </nav>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('dropdowns') && (
        <UiDocPage
          title="Dropdowns"
          subLinks={[
            { id: 'drp-basic', label: 'Basic Dropdown' },
            { id: 'drp-split', label: 'Split Dark Menu' },
            { id: 'drp-up', label: 'Dropup Direction' },
            { id: 'drp-right', label: 'Dropright Direction' },
            { id: 'drp-form', label: 'Inline Form Inside Dropdown' },
          ]}
        >
          <UiDocSection
            id="drp-basic"
            title="Basic Dropdown"
            classesHint="relative inline-block / absolute shadow-lg border border-gray-300"
            codeSnippet={`<div className="relative inline-block">\n  <button onClick={() => setOpen(!open)}>Basic Dropdown</button>\n  {open && <div className="absolute mt-1 w-56 rounded-xl border bg-white shadow-lg">...</div>}\n</div>`}
          >
            <div className="pb-32 text-xs">
              <div ref={basicDropdownRef} className="relative inline-block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Basic Dropdown</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 p-1.5 z-30 text-xs space-y-0.5 animate-ui-pop">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase text-gray-500">Dropdown Header</div>
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-100 flex items-center justify-between transition-colors duration-200 cursor-pointer"
                    >
                      <span>Ekspor PDF</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[10px]">Baru</span>
                    </button>
                    <button disabled className="w-full text-left p-2 rounded-lg text-gray-500 cursor-not-allowed">
                      Disabled Menu Item
                    </button>
                    <div className="h-[1px] bg-gray-200 my-1" />
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-rose-600 font-semibold transition-colors duration-200 cursor-pointer"
                    >
                      Arsipkan Modul
                    </button>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="drp-split"
            title="Split Dark Menu"
            classesHint="relative inline-block / inline-flex rounded-lg overflow-hidden border border-gray-900"
            codeSnippet={`<div className="relative inline-block">\n  <div className="inline-flex rounded-lg overflow-hidden border border-gray-900">\n    <button className="px-3.5 py-2 bg-gray-900 text-white">Split Dark</button>\n    <button onClick={() => setOpen(!open)} className="px-2.5 py-2 bg-gray-800 text-white">▼</button>\n  </div>\n  {open && <div className="absolute left-0 top-full mt-1.5 w-48 rounded-xl bg-gray-900 text-white shadow-lg p-1.5">...</div>}\n</div>`}
          >
            <div className="pb-32 text-xs">
              <div ref={splitDarkDropdownRef} className="relative inline-block">
                <div className="inline-flex rounded-lg overflow-hidden border border-gray-900">
                  <button
                    type="button"
                    onClick={() => triggerToast('Split Action', 'Aksi utama tombol split dijalankan.', 'info')}
                    className="px-3.5 py-2 bg-gray-900 text-white font-semibold cursor-pointer hover:bg-black"
                  >
                    Split Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setSplitDarkDropdownOpen(!splitDarkDropdownOpen)}
                    className="px-2.5 py-2 bg-gray-800 text-white hover:bg-black cursor-pointer border-l border-gray-700"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${splitDarkDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {splitDarkDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 bg-gray-900/95 backdrop-blur-sm text-gray-100 rounded-xl shadow-lg border border-gray-800 p-1.5 z-30 text-xs space-y-0.5 animate-ui-pop">
                    <button
                      type="button"
                      onClick={() => {
                        setSplitDarkDropdownOpen(false);
                        triggerToast('Duplikat', 'Salinan modul dibuat.', 'info');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                    >
                      Duplikat Modul
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSplitDarkDropdownOpen(false);
                        triggerToast('Ekspor', 'Mengekspor paket SCORM.', 'success');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                    >
                      Ekspor Paket (.zip)
                    </button>
                    <div className="h-[1px] bg-gray-800 my-1" />
                    <button
                      type="button"
                      onClick={() => setSplitDarkDropdownOpen(false)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-950/70 text-rose-400 font-semibold transition-colors duration-200 cursor-pointer"
                    >
                      Hapus Draft
                    </button>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="drp-up"
            title="Dropup Direction"
            classesHint="bottom-full mb-1.5 left-0"
            codeSnippet={`<div className="relative inline-block">\n  <button onClick={() => setOpen('up')}>Dropup</button>\n  {open === 'up' && <div className="absolute bottom-full mb-1.5 left-0 w-44 rounded-xl bg-white border shadow-lg">...</div>}\n</div>`}
          >
            <div className="pt-20 pb-2 text-xs">
              <div ref={dropUpRef} className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setDropDirOpen(dropDirOpen === 'up' ? null : 'up')}
                  className="px-3.5 py-2 rounded-lg bg-primary-50 text-primary-700 border border-primary-200 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Dropup</span>
                  <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${dropDirOpen === 'up' ? 'rotate-180' : ''}`} />
                </button>
                {dropDirOpen === 'up' && (
                  <div className="absolute bottom-full mb-1.5 left-0 w-44 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 p-2 z-30 text-xs animate-ui-pop-up">
                    <div className="p-1.5 font-semibold text-gray-800">Arah: Dropup</div>
                    <button
                      type="button"
                      onClick={() => setDropDirOpen(null)}
                      className="w-full text-left p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      Tutup Menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="drp-right"
            title="Dropright Direction"
            classesHint="left-full ml-1.5 top-0"
            codeSnippet={`<div className="relative inline-block">\n  <button onClick={() => setOpen('right')}>Dropright</button>\n  {open === 'right' && <div className="absolute left-full ml-1.5 top-0 w-44 rounded-xl bg-white border shadow-lg">...</div>}\n</div>`}
          >
            <div className="py-4 text-xs">
              <div ref={dropRightRef} className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setDropDirOpen(dropDirOpen === 'right' ? null : 'right')}
                  className="px-3.5 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Dropright</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${dropDirOpen === 'right' ? 'translate-x-0.5' : ''}`} />
                </button>
                {dropDirOpen === 'right' && (
                  <div className="absolute left-full ml-1.5 top-0 w-44 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 p-2 z-30 text-xs animate-ui-pop-right">
                    <div className="p-1.5 font-semibold text-gray-800">Arah: Dropright</div>
                    <button
                      type="button"
                      onClick={() => setDropDirOpen(null)}
                      className="w-full text-left p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      Tutup Menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="drp-form"
            title="Inline Form Inside Dropdown Menu"
            classesHint="p-3.5 rounded-xl border border-gray-300 bg-gray-50/70"
            codeSnippet={`<div className="p-3 rounded-xl border bg-gray-50 flex gap-2">\n  <input placeholder="Filter item..." />\n  <button>Go</button>\n</div>`}
          >
            <div className="max-w-xs p-3.5 rounded-xl border border-gray-300 bg-gray-50/70 space-y-2 text-xs">
              <div className="font-bold text-gray-800">Inline Form inside Dropdown Menu</div>
              <div className="flex gap-2">
                <input type="text" placeholder="Filter item..." className="flex-1 px-2.5 py-1.5 rounded-md border border-gray-300 bg-white" />
                <button
                  onClick={() => triggerToast('Dropdown Filter', 'Menu disaring.', 'info')}
                  className="px-3 py-1.5 rounded-md bg-gray-900 text-white font-semibold cursor-pointer"
                >
                  Go
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('nav') && (
        <UiDocPage
          title="Nav"
          subLinks={[
            { id: 'nav-horiz', label: 'Base Horizontal Nav' },
            { id: 'nav-vert', label: 'Vertical Navigation' },
            { id: 'nav-icon', label: 'Icon-Top with Badge' },
          ]}
        >
          <UiDocSection
            id="nav-horiz"
            title="Base Horizontal Navigation"
            classesHint="flex flex-wrap gap-2 / bg-primary-600 text-white"
            codeSnippet={`<nav className="flex gap-2">\n  {items.map(it => <button className={active ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-700'}>{it}</button>)}\n</nav>`}
          >
            <div className="flex flex-wrap gap-2 text-xs">
              {['Overview', 'Silabus', 'Nilai', 'Arsip'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNavItem(item)}
                  className={`px-3.5 py-2 rounded-lg font-semibold cursor-pointer ${
                    activeNavItem === item
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-50/70 text-primary-700 hover:bg-primary-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="nav-vert"
            title="Vertical Navigation"
            classesHint="relative grid grid-rows-3 border border-gray-300 rounded-xl divide-y"
            codeSnippet={`<div className="border border-gray-300 rounded-xl divide-y">\n  {items.map(v => <button className="block w-full text-left px-3 py-2">{v}</button>)}\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg text-xs">
              <div className="relative grid grid-rows-3 border border-gray-300 rounded-xl divide-y divide-gray-200 overflow-hidden bg-white">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-primary-50/90 transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translate3d(0, ${Math.max(0, ['Profil Kelas', 'Materi Video', 'Jadwal Ujian'].indexOf(activeVertNav)) * 100}%, 0)`,
                  }}
                >
                  <span className="absolute left-0 inset-y-1.5 w-[3px] rounded-r-full bg-primary-600" />
                </span>
                {['Profil Kelas', 'Materi Video', 'Jadwal Ujian'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVertNav(v)}
                    className={`relative z-10 block w-full text-left px-3.5 py-2.5 font-semibold transition-colors duration-200 cursor-pointer ${
                      activeVertNav === v ? 'text-primary-700' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-600 flex items-center">
                <span key={activeVertNav} className="animate-ui-fade">
                  Nav Vertical Aktif: <strong className="text-gray-900">{activeVertNav}</strong>
                </span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="nav-icon"
            title="Icon-Top with Badge"
            classesHint="grid grid-cols-3 gap-2.5"
            codeSnippet={`<div className="grid grid-cols-3 gap-2.5">\n  <button className="p-3 rounded-xl border flex flex-col items-center gap-1.5">Materi <span className="badge">8</span></button>\n</div>`}
          >
            <div className="max-w-md grid grid-cols-3 gap-2.5 text-xs">
              {[
                { name: 'Materi', icon: BookOpen, count: '8' },
                { name: 'Prestasi', icon: Award, count: '3' },
                { name: 'Peringatan', icon: Bell, count: '2' },
              ].map((it) => {
                const IconComp = it.icon;
                return (
                  <button
                    key={it.name}
                    onClick={() => setActiveNavItem(it.name)}
                    className={`group p-3 rounded-xl border flex flex-col items-center gap-1.5 font-semibold cursor-pointer transition-colors ${
                      activeNavItem === it.name
                        ? 'bg-primary-50 border-primary-300 text-primary-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{it.name}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-primary-600 text-white text-[10px] tabular-nums">
                      {it.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('tabs') && (
        <UiDocPage
          title="Tabs"
          subLinks={[
            { id: 'tab-underline', label: 'Underline Tabs' },
            { id: 'tab-segmented', label: 'Segmented Switcher' },
            { id: 'tab-vertical', label: 'Vertical Tabs' },
          ]}
        >
          <UiDocSection
            id="tab-underline"
            title="Underline Tabs"
            classesHint="border-b-2 border-primary-600"
            codeSnippet={`<div className="flex items-center gap-5 border-b border-gray-300">\n  <button className="pb-2.5 border-b-2 border-primary-600 font-semibold">Ringkasan</button>\n</div>`}
          >
            <div className="relative max-w-md inline-grid grid-cols-3 border-b border-gray-300 text-xs font-semibold">
              {['Ringkasan', 'Lembar Kerja', 'Riwayat'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTabItem(t)}
                  className={`px-4 pb-2.5 text-center transition-colors duration-200 cursor-pointer ${
                    activeTabItem === t ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t}
                </button>
              ))}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 w-1/3 h-0.5 bg-primary-600 rounded-full transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translate3d(${Math.max(0, ['Ringkasan', 'Lembar Kerja', 'Riwayat'].indexOf(activeTabItem)) * 100}%, 0, 0)`,
                }}
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="tab-segmented"
            title="Segmented Switcher"
            classesHint="inline-grid grid-cols-3 rounded-lg bg-gray-100 p-1"
            codeSnippet={`<div className="inline-flex rounded-lg bg-gray-100 p-1">\n  <button className="px-3 py-1.5 rounded-md bg-white shadow-2xs">Ringkasan</button>\n</div>`}
          >
            <div className="relative inline-grid grid-cols-3 rounded-lg bg-gray-100 p-1 text-xs">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-md bg-white shadow-2xs transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translate3d(${Math.max(0, ['Ringkasan', 'Lembar Kerja', 'Riwayat'].indexOf(activeTabItem)) * 100}%, 0, 0)`,
                }}
              />
              {['Ringkasan', 'Lembar Kerja', 'Riwayat'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTabItem(t)}
                  className={`relative z-10 px-3.5 py-1.5 rounded-md font-semibold text-center transition-colors duration-200 cursor-pointer ${
                    activeTabItem === t ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="tab-vertical"
            title="Vertical Side Tabs"
            classesHint="relative grid grid-rows-3 rounded-xl bg-gray-100/80 p-1 w-36"
            codeSnippet={`<div className="flex gap-4">\n  <div className="w-36 grid grid-rows-3">...</div>\n  <div className="flex-1 p-4 rounded-xl bg-gray-50 border">Panel Vertical</div>\n</div>`}
          >
            <div className="flex gap-4 text-xs max-w-lg items-stretch">
              <div className="relative grid grid-rows-3 rounded-xl bg-gray-100/80 p-1 w-36 shrink-0">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1 top-1 h-[calc((100%-0.5rem)/3)] rounded-lg bg-gray-900 shadow-xs transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translate3d(0, ${Math.max(0, ['Ringkasan', 'Lembar Kerja', 'Riwayat'].indexOf(activeTabItem)) * 100}%, 0)`,
                  }}
                />
                {['Ringkasan', 'Lembar Kerja', 'Riwayat'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTabItem(t)}
                    className={`relative z-10 px-3 py-2 rounded-lg text-left font-semibold transition-colors duration-200 cursor-pointer ${
                      activeTabItem === t ? 'text-white' : 'text-gray-700 hover:text-gray-950'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-300 text-gray-600 flex items-center">
                <span key={activeTabItem} className="animate-ui-fade">
                  Panel Vertical Tab: <strong className="text-gray-900">{activeTabItem}</strong>
                </span>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('wizard') && (
        <UiDocPage
          title="Wizard"
          subLinks={[
            { id: 'wiz-horizontal', label: 'Horizontal Step Wizard' },
            { id: 'wiz-vertical', label: 'Vertical Step Wizard' },
          ]}
        >
          <UiDocSection
            id="wiz-horizontal"
            title="Horizontal Step Wizard"
            classesHint="flex items-center justify-between"
            codeSnippet={`<button onClick={() => setStep(2)} className="flex items-center gap-2 font-bold text-primary-700">\n  <span className="w-6 h-6 rounded-full bg-primary-600 text-white">2</span> Review\n</button>`}
          >
            <div className="max-w-md flex items-center justify-between text-xs py-2">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setWizardActiveStep(s)}
                  className={`flex items-center gap-2 cursor-pointer ${
                    wizardActiveStep >= s ? 'text-primary-700 font-bold' : 'text-gray-500'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs tabular-nums transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      wizardActiveStep >= s ? 'bg-primary-600 text-white scale-105' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {wizardActiveStep > s ? <Check className="w-3.5 h-3.5 animate-ui-check" /> : s}
                  </span>
                  <span>{s === 1 ? 'Input' : s === 2 ? 'Review' : 'Terbit'}</span>
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="wiz-vertical"
            title="Vertical Step Wizard"
            classesHint="relative grid grid-rows-3 / bg-primary-50 text-primary-800"
            codeSnippet={`<div className="grid grid-rows-3 p-1.5 rounded-xl border">\n  <button className="w-full text-left px-3 py-2 rounded-lg">...</button>\n</div>`}
          >
            <div className="relative grid grid-rows-3 max-w-sm p-1.5 rounded-xl border border-gray-300 bg-white text-xs">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-1.5 top-1.5 h-[calc((100%-0.75rem)/3)] rounded-lg bg-primary-50/95 border border-primary-100 transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translate3d(0, ${Math.max(0, wizardActiveStep - 1) * 100}%, 0)`,
                }}
              >
                <span className="absolute left-0 inset-y-2 w-[3px] rounded-r-full bg-primary-600" />
              </span>
              {[
                { s: 1, label: '1. Informasi Dasar Kelas' },
                { s: 2, label: '2. Unggah Berkas Silabus' },
                { s: 3, label: '3. Konfirmasi & Publikasi' },
              ].map((item) => (
                <button
                  key={item.s}
                  onClick={() => setWizardActiveStep(item.s)}
                  className={`relative z-10 w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 font-semibold transition-colors duration-200 cursor-pointer ${
                    wizardActiveStep === item.s
                      ? 'text-primary-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center tabular-nums transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      wizardActiveStep === item.s
                        ? 'bg-primary-600 text-white scale-105'
                        : 'bg-gray-900 text-white'
                    }`}
                  >
                    {item.s}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('pagination') && (
        <UiDocPage
          title="Pagination"
          subLinks={[
            { id: 'pag-default', label: 'Default Pagination' },
            { id: 'pag-rounded', label: 'Rounded Pagination' },
            { id: 'pag-sizing', label: 'Sizing (Small & Large)' },
            { id: 'pag-jump', label: 'Jump to Page' },
          ]}
        >
          <UiDocSection
            id="pag-default"
            title="Default Pagination"
            classesHint="flex items-center gap-1.5 / rounded-md tabular-nums"
            codeSnippet={`<div className="flex items-center gap-1.5">\n  {[1, 2, 3, 4].map(p => <button className="px-3 py-1.5 rounded-md">{p}</button>)}\n</div>`}
          >
            <div className="flex items-center gap-1.5 text-xs tabular-nums">
              <button
                disabled={paginationPage === 1}
                onClick={() => setPaginationPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1.5 rounded-md border border-gray-300 text-gray-600 disabled:opacity-40 cursor-pointer"
              >
                «
              </button>
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  onClick={() => setPaginationPage(p)}
                  className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${
                    paginationPage === p
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={paginationPage === 4}
                onClick={() => setPaginationPage((p) => Math.min(4, p + 1))}
                className="px-2.5 py-1.5 rounded-md border border-gray-300 text-gray-600 disabled:opacity-40 cursor-pointer"
              >
                »
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="pag-rounded"
            title="Rounded Pagination"
            classesHint="rounded-full"
            codeSnippet={`<button className="w-8 h-8 rounded-full bg-gray-900 text-white font-bold">1</button>`}
          >
            <div className="flex items-center gap-1.5 text-xs tabular-nums">
              <button
                disabled={paginationPage === 1}
                onClick={() => setPaginationPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 disabled:opacity-40 cursor-pointer flex items-center justify-center"
              >
                «
              </button>
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  onClick={() => setPaginationPage(p)}
                  className={`w-8 h-8 rounded-full font-bold cursor-pointer flex items-center justify-center ${
                    paginationPage === p
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={paginationPage === 4}
                onClick={() => setPaginationPage((p) => Math.min(4, p + 1))}
                className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 disabled:opacity-40 cursor-pointer flex items-center justify-center"
              >
                »
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="pag-sizing"
            title="Sizing (Small & Large)"
            classesHint="px-2.5 py-1 text-[11px] / px-4 py-2 text-sm"
            codeSnippet={`<button className="px-4 py-2 text-sm rounded-md font-bold">1</button>`}
          >
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-1.5 tabular-nums">
                <span className="text-[11px] font-bold text-gray-500 w-14">Small:</span>
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPaginationPage(p)}
                    className={`px-2.5 py-1 text-[11px] rounded-md font-bold cursor-pointer ${
                      paginationPage === p
                        ? 'bg-gray-900 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 tabular-nums">
                <span className="text-[11px] font-bold text-gray-500 w-14">Large:</span>
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPaginationPage(p)}
                    className={`px-4 py-2 text-sm rounded-md font-bold cursor-pointer ${
                      paginationPage === p
                        ? 'bg-gray-900 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="pag-jump"
            title="Jump to Page"
            classesHint="w-14 px-2 py-1 rounded-md border text-center font-mono"
            codeSnippet={`<div className="flex items-center gap-2">\n  <span>Jump to page:</span>\n  <input type="number" value={page} onChange={...} className="w-14 px-2 py-1 border rounded-md" />\n</div>`}
          >
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>Jump to page:</span>
              <input
                type="number"
                min={1}
                max={4}
                value={jumpPageInput}
                onChange={(e) => {
                  setJumpPageInput(e.target.value);
                  const n = Number(e.target.value);
                  if (n >= 1 && n <= 4) setPaginationPage(n);
                }}
                className="w-14 px-2 py-1 rounded-md border border-gray-300 text-center font-mono tabular-nums"
              />
              <span className="text-gray-500">(Halaman aktif: {paginationPage})</span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('navigasiurlstate') && (
        <UiDocPage
          title="Navigasi / URL State"
          description="Sinkronisasi state UI dengan alamat URL browser: query parameter filter, fragmen hash tab beserta riwayat back, serta sorting dan pagination di query string."
          subLinks={[
            { id: 'url-query', label: 'Query Params & Filter Sync' },
            { id: 'url-hash', label: 'Route & Hash History' },
            { id: 'url-pagination', label: 'Sort & Pagination URL' },
          ]}
        >
          <UiDocSection
            id="url-query"
            title="Query Params & Filter Sync"
            description="Ubah kata kunci, kelas, atau status untuk melihat URL query string diperbarui secara real-time."
            classesHint="URLSearchParams / ?q=...&kelas=...&status=..."
            codeSnippet={`const params = new URLSearchParams({ q: search, kelas, status });\nconst nextUrl = \`/modul?\${params.toString()}\`;`}
          >
            <div className="max-w-xl space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 font-mono text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                  <span key={`${urlSearchQ}-${urlClassFilter}-${urlStatusFilter}`} className="truncate animate-ui-fade">
                    /modul?
                    {new URLSearchParams({
                      ...(urlSearchQ.trim() ? { q: urlSearchQ.trim() } : {}),
                      ...(urlClassFilter !== 'all' ? { kelas: urlClassFilter } : {}),
                      status: urlStatusFilter,
                    }).toString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const qs = new URLSearchParams({
                        ...(urlSearchQ.trim() ? { q: urlSearchQ.trim() } : {}),
                        ...(urlClassFilter !== 'all' ? { kelas: urlClassFilter } : {}),
                        status: urlStatusFilter,
                      }).toString();
                      navigator.clipboard?.writeText(`/modul?${qs}`);
                      triggerToast('URL Disalin', `/modul?${qs}`, 'info');
                    }}
                    className="p-1 rounded hover:bg-gray-800 text-gray-300 cursor-pointer"
                    title="Salin URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUrlSearchQ('');
                      setUrlClassFilter('all');
                      setUrlStatusFilter('all');
                    }}
                    className="group p-1 rounded hover:bg-gray-800 text-gray-300 cursor-pointer"
                    title="Reset Query"
                  >
                    <RotateCcw className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-90" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={urlSearchQ}
                  onChange={(e) => setUrlSearchQ(e.target.value)}
                  placeholder="Cari query (q)..."
                  className="px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
                <CustomSelect
                  value={urlClassFilter}
                  onChange={setUrlClassFilter}
                  className="w-full"
                  ariaLabel="Filter kelas URL"
                  options={[
                    { value: 'all', label: 'Semua Kelas' },
                    { value: '302', label: 'Kelas 302' },
                    { value: '304', label: 'Kelas 304' },
                  ]}
                />
                <CustomSelect
                  value={urlStatusFilter}
                  onChange={(val) => setUrlStatusFilter(val as 'all' | 'published' | 'draft')}
                  className="w-full"
                  ariaLabel="Filter status URL"
                  options={[
                    { value: 'all', label: 'Semua Status' },
                    { value: 'published', label: 'Published' },
                    { value: 'draft', label: 'Draft' },
                  ]}
                />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="url-hash"
            title="Route & Hash Tab History Sync"
            description="Setiap perpindahan tab memperbarui fragmen hash URL dan mencatat riwayat agar tombol Kembali (Back) berfungsi."
            classesHint="window.location.hash / history.pushState"
            codeSnippet={`const switchTab = (tab: string) => {\n  setActiveTab(tab);\n  history.push(basePath + '#' + tab);\n};`}
          >
            <div className="max-w-xl space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    disabled={urlHistoryStack.length <= 1}
                    onClick={() => {
                      if (urlHistoryStack.length <= 1) return;
                      const next = urlHistoryStack.slice(0, -1);
                      setUrlHistoryStack(next);
                      const lastHash = next[next.length - 1].split('#')[1] as 'ringkasan' | 'silabus' | 'peserta';
                      if (lastHash) setUrlHashTab(lastHash);
                    }}
                    className="group p-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    title="Back History"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5" />
                  </button>
                  <span key={urlHashTab} className="font-mono text-gray-800 truncate animate-ui-fade">
                    /kelas/302#<strong className="text-primary-600">{urlHashTab}</strong>
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 tabular-nums shrink-0">
                  Riwayat: {urlHistoryStack.length} langkah
                </span>
              </div>

              <div className="relative inline-grid grid-cols-3 rounded-lg border border-gray-300 bg-gray-100 p-1">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-md bg-white shadow-2xs transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translate3d(${Math.max(0, ['ringkasan', 'silabus', 'peserta'].indexOf(urlHashTab)) * 100}%, 0, 0)`,
                  }}
                />
                {(['ringkasan', 'silabus', 'peserta'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setUrlHashTab(tab);
                      setUrlHistoryStack((prev) => [...prev, `/kelas/302#${tab}`]);
                    }}
                    className={`relative z-10 px-3.5 py-1.5 rounded-md font-semibold capitalize text-center cursor-pointer transition-colors duration-200 ${
                      urlHashTab === tab ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="url-pagination"
            title="Sort & Pagination URL State"
            description="Menjaga konsistensi pengurutan kolom dan nomor halaman melalui query parameter URL agar tautan bisa dibagikan."
            classesHint="?sort=...&order=asc|desc&page=N"
            codeSnippet={`const query = \`?sort=\${sortCol}&order=\${sortOrder}&page=\${page}\`;`}
          >
            <div className="max-w-xl space-y-3 text-xs">
              <div
                key={`${urlSortCol}-${urlSortOrder}-${urlTablePage}`}
                className="px-3 py-2 rounded-lg bg-primary-50/70 border border-primary-100 font-mono text-[11px] text-primary-900 tabular-nums animate-ui-fade"
              >
                /nilai?sort={urlSortCol}&amp;order={urlSortOrder}&amp;page={urlTablePage}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Sortir:</span>
                  {(['nama', 'nilai', 'tanggal'] as const).map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => {
                        if (urlSortCol === col) {
                          setUrlSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
                        } else {
                          setUrlSortCol(col);
                          setUrlSortOrder('asc');
                        }
                      }}
                      className={`px-2.5 py-1 rounded-md font-semibold capitalize cursor-pointer ${
                        urlSortCol === col ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {col} {urlSortCol === col ? (urlSortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 tabular-nums">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setUrlTablePage(p)}
                      className={`w-7 h-7 rounded-md font-semibold cursor-pointer ${
                        urlTablePage === p
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('toolbar') && (
        <UiDocPage
          title="Toolbar"
        >
          <UiDocSection
            title="Asymmetric & Grouped Action Toolbar"
            classesHint="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
            codeSnippet={`<div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">\n  <div className="flex gap-1"><FilterBtn /><MenuBtn /></div>\n  <button className="px-3 py-1 bg-gray-900 text-white rounded">Baru</button>\n</div>`}
          >
            <div className="max-w-md flex items-center justify-between bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => triggerToast('Toolbar', 'Filter toolbar diklik.', 'info')}
                  className="p-1.5 rounded hover:bg-white hover:scale-105 text-gray-700 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-white hover:scale-105 text-gray-700 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer">
                  <Menu className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-white hover:scale-105 text-gray-700 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => triggerToast('Tambah Item', 'Aksi baru dari toolbar.', 'success')}
                className="group px-3 py-1.5 rounded-md bg-gray-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-90" />
                <span>Baru</span>
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'navigation') && isVisible('mobilebottomnav') && (
        <MobileNavUiKitDemo />
      )}

      {(category === 'all' || category === 'navigation') && isVisible('quickaccess') && (
        <QuickAccessUiKit />
      )}

      {/* ========================================================= */}
      {/* 9. BEHAVIORAL */}
      {/* ========================================================= */}
      {(category === 'all' || category === 'behavioral') && isVisible('motionanimations') && (
        <MotionUiKit />
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('appoptimization') && (
        <AppOptimizationUiKit />
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('scrollspy') && (
        <UiDocPage
          title="Scroll Spy"
        >
          <UiDocSection
            title="Live Scroll Position Tracker"
            description="Gulir kotak daftar bab di bawah untuk melihat indikator bab aktif berganti."
            classesHint="overflow-y-auto h-40"
            codeSnippet={`<div onScroll={handleScroll} className="h-40 overflow-y-auto">...</div>`}
            actions={
              <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold">
                Aktif: {spyActiveSection}
              </span>
            }
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="relative inline-grid grid-cols-3 rounded-lg bg-gray-100 p-1">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-md bg-gray-900 shadow-xs transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translate3d(${Math.max(0, ['Bab 1', 'Bab 2', 'Bab 3'].indexOf(spyActiveSection)) * 100}%, 0, 0)`,
                  }}
                />
                {['Bab 1', 'Bab 2', 'Bab 3'].map((bab) => (
                  <span
                    key={bab}
                    className={`relative z-10 px-3 py-1 rounded-md text-center font-semibold transition-colors duration-200 ${
                      spyActiveSection === bab ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {bab}
                  </span>
                ))}
              </div>
              <div
                onScroll={handleScrollSpyScroll}
                className="h-40 overflow-y-auto border border-gray-300 rounded-xl p-3 text-gray-600 space-y-3 bg-gray-50/50"
              >
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <strong className="text-gray-900 block">Bab 1: Limit & Kontinuitas</strong>
                  <span className="text-xs">Definisi variabel kontinu dan batas kiri-kanan fungsi real.</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <strong className="text-gray-900 block">Bab 2: Teorema Nilai Rata-Rata</strong>
                  <span className="text-xs">Penerapan turunan parsial pada fungsi dua variabel.</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <strong className="text-gray-900 block">Bab 3: Integral Lipat Tiga</strong>
                  <span className="text-xs">Evaluasi volume ruang dalam koordinat silinder dan bola.</span>
                </div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('stickyelements') && (
        <UiDocPage
          title="Sticky Elements"
        >
          <UiDocSection
            title="Sticky Panel Header"
            description="Gulir area daftar materi untuk melihat header ungu menempel di atas."
            classesHint="sticky top-0 z-10"
            codeSnippet={`<div className="h-48 overflow-y-auto">\n  <div className="sticky top-0 bg-primary-600 text-white p-2.5">Sticky Header</div>\n</div>`}
          >
            <div className="max-w-lg h-48 overflow-y-auto border border-gray-300 rounded-xl p-3 text-xs text-gray-600 space-y-2 bg-gray-50/50 relative">
              <div className="sticky top-0 bg-primary-600 text-white font-bold p-2.5 rounded-lg flex items-center justify-between">
                <span>Sticky Header Panel</span>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">position: sticky</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">Baris Materi #1 · Pengenalan Modul</div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">Baris Materi #2 · Latihan Mandiri</div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">Baris Materi #3 · Diskusi Kelompok</div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">Baris Materi #4 · Evaluasi Kuis</div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('draggable') && (
        <UiDocPage
          title="Draggable"
        >
          <UiDocSection
            title="Sortable Drag & Drop List"
            description="Seret item atau klik tombol panah untuk menukar urutan agenda."
            classesHint="draggable / onDragStart / onDrop / cursor-grab"
            codeSnippet={`<div draggable onDragStart={() => setDragIdx(idx)} onDrop={handleDrop} className="cursor-grab">\n  {item}\n</div>`}
          >
            <div className="max-w-lg space-y-2 text-xs">
              {draggableItems.map((item, idx) => (
                <div
                  key={item}
                  draggable
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIdx === null || dragIdx === idx) return;
                    const copy = [...draggableItems];
                    const [moved] = copy.splice(dragIdx, 1);
                    copy.splice(idx, 0, moved);
                    setDraggableItems(copy);
                    setDragIdx(null);
                  }}
                  className="p-2.5 bg-gray-50 rounded-lg border border-gray-300 flex items-center justify-between font-medium text-gray-800 cursor-grab hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                >
                  <div className="flex items-center gap-2 truncate">
                    <GripVertical className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveDraggable(idx, -1)}
                      className="px-1.5 py-0.5 rounded border border-gray-300 bg-white disabled:opacity-40 text-[10px] cursor-pointer"
                    >
                      ▲
                    </button>
                    <button
                      disabled={idx === draggableItems.length - 1}
                      onClick={() => handleMoveDraggable(idx, 1)}
                      className="px-1.5 py-0.5 rounded border border-gray-300 bg-white disabled:opacity-40 text-[10px] cursor-pointer"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('scrollablecontent') && (
        <UiDocPage
          title="Scrollable Content"
          subLinks={[
            { id: 'scr-custom-scrollbar', label: 'Custom Floating Pill Scrollbar' },
            { id: 'scr-container', label: 'Fixed-Height Scrollable Container' },
            { id: 'scr-slide-indicator', label: 'Horizontal Slide Indicator' },
          ]}
        >
          <UiDocSection
            id="scr-custom-scrollbar"
            title="Custom Floating Pill Scrollbar (Modal & Matrix Table)"
            description="Scrollbar vertikal kapsul 5px mengambang dengan trek pastel halus dan thumb bulat yang dapat digeser (drag), diklik di sepanjang rel, atau digulir dengan roda mouse/sentuhan."
            classesHint="VerticalScrollTrack | .ui-scrollbar-violet | .ui-scrollbar-rose | .ui-scrollbar-dark"
            codeSnippet={`<VerticalScrollTrack accent="violet" className="h-80">
  <table className="w-full text-xs">...</table>
</VerticalScrollTrack>

{/* Atau gunakan CSS utility langsung pada container overflow: */}
<div className="h-64 overflow-y-auto ui-scrollbar-violet">...</div>`}
            actions={
              <div className="inline-flex rounded-full bg-gray-100 p-0.5 text-[11px]">
                {(
                  [
                    { id: 'violet', label: 'Violet (#6852EC)' },
                    { id: 'primary', label: 'Rose (#ee2e65)' },
                    { id: 'dark', label: 'Dark (#1C1D21)' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setScrollAccent(opt.id)}
                    className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                      scrollAccent === opt.id
                        ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-5">
              {/* Interactive Modal + Table Preview matching uploaded screenshot */}
              <div className="rounded-2xl border border-gray-300 bg-white shadow-[0_18px_40px_-14px_rgba(15,23,42,0.12)] overflow-hidden">
                {/* Modal Top Header */}
                <div className="px-4 sm:px-5 pt-4 pb-2 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#111827]">
                      Role Permissions Matrix
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Gulir vertikal atau seret kapsul scrollbar di sisi kanan
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Preview Modal', 'Tombol tutup modal diuji.', 'info')}
                    aria-label="Close"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Matrix Area with Floating Pill Vertical Scrollbar */}
                <div className="px-3 sm:px-4 pb-2">
                  <VerticalScrollTrack
                    accent={scrollAccent}
                    className="h-[310px]"
                    contentClassName="pr-4 overflow-x-auto"
                    railInsetClass="top-1 bottom-1 right-0"
                  >
                    <div className="min-w-[520px] rounded-xl border border-gray-300 bg-white">
                      <table className="w-full text-xs border-collapse">
                        <thead className="sticky top-0 z-10 bg-[#F3F4F6] text-[#4B5563]">
                          <tr>
                            <th className="py-2.5 px-3 text-left font-medium">Module</th>
                            <th className="py-2.5 px-2 text-center font-medium">Create</th>
                            <th className="py-2.5 px-2 text-center font-medium">Read</th>
                            <th className="py-2.5 px-2 text-center font-medium">Update</th>
                            <th className="py-2.5 px-2 text-center font-medium">Delete</th>
                            <th className="py-2.5 px-3 text-center font-medium">CRUD</th>
                            <th className="py-2.5 px-3 text-center font-medium">Access</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {scrollMatrixRows.map((row, idx) => (
                            <tr key={row.name} className="hover:bg-gray-50/60 transition-colors">
                              <td className="py-3 px-3 font-medium text-gray-700 whitespace-nowrap">
                                {row.name}
                              </td>
                              {(['create', 'read', 'update', 'del'] as const).map((field) => {
                                const checked = row[field];
                                return (
                                  <td key={field} className="py-3 px-2 text-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setScrollMatrixRows((prev) =>
                                          prev.map((r, rIdx) =>
                                            rIdx === idx ? { ...r, [field]: !r[field] } : r
                                          )
                                        )
                                      }
                                      className={`w-4 h-4 rounded inline-flex items-center justify-center transition-colors cursor-pointer ${
                                        checked
                                          ? 'bg-[#0F172A] text-white'
                                          : 'bg-white border border-gray-300 text-transparent'
                                      }`}
                                    >
                                      <Check className="w-3 h-3 stroke-[2.5]" />
                                    </button>
                                  </td>
                                );
                              })}
                              {(['crud', 'access'] as const).map((toggleField) => {
                                const on = row[toggleField];
                                return (
                                  <td key={toggleField} className="py-3 px-3 text-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setScrollMatrixRows((prev) =>
                                          prev.map((r, rIdx) =>
                                            rIdx === idx
                                              ? { ...r, [toggleField]: !r[toggleField] }
                                              : r
                                          )
                                        )
                                      }
                                      className={`w-9 h-5 rounded-full p-0.5 inline-flex items-center transition-colors duration-200 cursor-pointer ${
                                        on ? 'bg-[#0F172A]' : 'bg-gray-300'
                                      }`}
                                    >
                                      <span
                                        className={`w-4 h-4 rounded-full bg-white shadow-2xs transition-transform duration-200 ${
                                          on ? 'translate-x-4' : 'translate-x-0'
                                        }`}
                                      />
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </VerticalScrollTrack>
                </div>

                {/* Modal Bottom Footer matching screenshot */}
                <div className="px-4 sm:px-5 py-3 bg-white border-t border-gray-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScrollMatrixRows((prev) =>
                        prev.map((r) => ({
                          ...r,
                          create: true,
                          read: true,
                          update: true,
                          del: true,
                          crud: true,
                          access: true,
                        }))
                      );
                      triggerToast('Reload Matrix', 'Status izin dikembalikan ke default.', 'info');
                    }}
                    className="h-8 px-3.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-800 cursor-pointer transition-colors"
                  >
                    Reload
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      triggerToast('Disimpan', 'Pengaturan matriks berhasil disimpan.', 'success')
                    }
                    className="h-8 px-4 rounded-lg bg-[#0F172A] hover:bg-black text-white text-xs font-medium cursor-pointer transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Pure CSS Utility Variants */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {[
                  {
                    cls: 'ui-scrollbar-violet',
                    title: 'Violet Pill (.ui-scrollbar-violet)',
                    badge: 'bg-[#EDE9FE] text-[#543DE2]',
                  },
                  {
                    cls: 'ui-scrollbar-rose',
                    title: 'Primary Rose (.ui-scrollbar-rose)',
                    badge: 'bg-[#FEF1F5] text-[#9D113C]',
                  },
                  {
                    cls: 'ui-scrollbar-dark',
                    title: 'Ink Dark (.ui-scrollbar-dark)',
                    badge: 'bg-gray-100 text-gray-800',
                  },
                ].map((variant) => (
                  <div key={variant.cls} className="rounded-xl border border-gray-300 bg-gray-50/50 p-3 space-y-2">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold ${variant.badge}`}>
                      {variant.title}
                    </span>
                    <div className={`h-24 overflow-y-auto pr-2 space-y-1.5 ${variant.cls}`}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div
                          key={n}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-[11px] text-gray-600"
                        >
                          Baris konten scroll #{n}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="scr-container"
            title="Fixed-Height Scrollable Container"
            classesHint="h-48 overflow-y-auto custom-sidebar-scrollbar"
            codeSnippet={`<div className="h-48 overflow-y-auto border border-gray-300 rounded-xl p-3 space-y-2">\n  {logs.map(n => <div>Log #{n}</div>)}\n</div>`}
          >
            <div className="max-w-lg h-48 overflow-y-auto border border-gray-300 rounded-xl p-3 text-xs text-gray-600 space-y-2 bg-gray-50/40 custom-sidebar-scrollbar">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="font-medium text-gray-800">Catatan Revisi Silabus #{n}</span>
                  <span className="text-[11px] text-gray-500">Terverifikasi</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="scr-slide-indicator"
            title="Horizontal Slide Indicator (Mobile Swipe Track)"
            description="Menggantikan scrollbar horizontal bawaan dengan capsule slide indicator halus yang mengikuti geseran sentuh, otomatis menengahkan item aktif, dan merespons momentum gerak."
            classesHint="no-scrollbar overflow-x-auto / slide-indicator-thumb"
            codeSnippet={`<HorizontalSlideTrack activeKey={selectedMonth} accent="dark">\n  {months.map(m => (\n    <button data-slide-active={selectedMonth === m ? 'true' : undefined} className="rounded-full shrink-0">{m}</button>\n  ))}\n</HorizontalSlideTrack>`}
          >
            <div className="max-w-sm bg-white border border-gray-300 rounded-2xl p-4 space-y-3 shadow-2xs">
              <HorizontalSlideTrack
                activeKey={slideMonthDemo}
                trackClassName="flex items-center gap-2 pb-1 select-none"
                accent="dark"
                visibility="always"
              >
                {['Jan', 'Feb', 'March', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-slide-active={slideMonthDemo === m ? 'true' : undefined}
                    onClick={() => setSlideMonthDemo(m)}
                    className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-200 active:scale-95 shrink-0 cursor-pointer ${
                      slideMonthDemo === m
                        ? 'bg-[#1C1D21] text-white shadow-2xs'
                        : 'bg-[#F4F5F8] text-[#5A5D67] hover:text-[#1C1D21]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </HorizontalSlideTrack>
              <div className="text-[11.5px] text-gray-500">
                Geser horizontal atau ketuk rel indikator — bulan aktif:{' '}
                <strong className="text-gray-900">{slideMonthDemo}</strong>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('pulltorefresh') && (
        <UiDocPage
          title="Pull to Refresh"
          subLinks={[
            { id: 'ptr-elastic', label: 'Elastic Header Pull to Refresh' },
          ]}
        >
          <UiDocSection
            id="ptr-elastic"
            title="Elastic Header Pull to Refresh"
            description="Tarik ke bawah dari bagian atas daftar (sentuh atau drag mouse) untuk meregangkan kurva elastis SVG mengikuti posisi jari, mengaktifkan spring rebound saat dilepas, dan memperbarui data."
            classesHint="ElasticPullToRefresh / SVG Quadratic Bezier / Spring RAF"
            codeSnippet={`<ElasticPullToRefresh onRefresh={handleRefresh}>\n  <div className="flex-1 overflow-y-auto">...</div>\n</ElasticPullToRefresh>`}
            actions={
              <button
                type="button"
                onClick={() => setPtrDemoSeq((s) => s + 1)}
                className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold cursor-pointer hover:bg-primary-100"
              >
                Simulasikan Pull-to-Refresh
              </button>
            }
          >
            <div className="max-w-sm rounded-[24px] border border-gray-300 bg-white overflow-hidden shadow-xs select-none">
              <div className="px-4 py-2.5 border-b border-black/[0.12] flex items-center justify-between bg-[#FAFBFD]">
                <span className="text-[12.5px] font-semibold text-[#1C1D21]">Jadwal & Aktivitas</span>
                <span className="text-[11px] text-[#646772] tabular-nums">
                  Sync #{ptrSyncCount} · {ptrLastSync}
                </span>
              </div>

              <ElasticPullToRefresh
                allowDesktopMousePull
                demoTriggerSeq={ptrDemoSeq}
                onRefresh={() => {
                  setPtrSyncCount((c) => c + 1);
                  setPtrLastSync(
                    new Date().toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                  );
                }}
                className="h-64 bg-white"
              >
                <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
                  <div className="text-[11px] font-medium text-[#646772] px-1">
                    Tarik ke bawah di area ini untuk melihat efek Elastic Header
                  </div>
                  {[
                    { code: '302', title: 'Calculus & Derivatives', time: '08:00 am', tint: 'bg-[#FEF1F5] text-[#9D113C]' },
                    { code: '303', title: 'Applied Physics Lab', time: '09:30 am', tint: 'bg-[#E6F9F0] text-[#146C43]' },
                    { code: '304', title: 'Organic Chemistry Quiz', time: '11:00 am', tint: 'bg-[#FFF5E6] text-[#8C5811]' },
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="p-3 rounded-2xl bg-[#FAFBFD] border border-black/[0.12] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 ${item.tint}`}>
                          {item.code}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-semibold text-[#1C1D21] truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#646772]">{item.time}</div>
                        </div>
                      </div>
                      <TrendingUp className="w-3.5 h-3.5 text-[#646772] shrink-0" />
                    </div>
                  ))}
                </div>
              </ElasticPullToRefresh>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('fixedfooter') && (
        <UiDocPage
          title="Fixed Footer"
        >
          <UiDocSection
            title="Sticky Bottom Action Bar"
            classesHint="sticky bottom-0 p-3 bg-gray-900 text-white"
            codeSnippet={`<div className="h-48 overflow-y-auto flex flex-col justify-between">\n  <div>...scrollable body...</div>\n  <div className="sticky bottom-0 bg-gray-900 text-white p-3">Simpan</div>\n</div>`}
          >
            <div className="max-w-lg h-48 overflow-y-auto border border-gray-300 rounded-xl text-xs text-gray-600 flex flex-col justify-between bg-gray-50/40 relative">
              <div className="p-3 space-y-2">
                <div className="p-2.5 bg-white rounded-lg border border-gray-200">Draft Soal Ujian Akhir Semester #1</div>
                <div className="p-2.5 bg-white rounded-lg border border-gray-200">Draft Soal Ujian Akhir Semester #2</div>
                <div className="p-2.5 bg-white rounded-lg border border-gray-200">Draft Soal Ujian Akhir Semester #3</div>
                <div className="p-2.5 bg-white rounded-lg border border-gray-200">Draft Soal Ujian Akhir Semester #4</div>
              </div>
              <div className="sticky bottom-0 p-3 bg-gray-900 text-white flex items-center justify-between">
                <span className="font-semibold">Fixed Action Footer</span>
                <button
                  onClick={() => triggerToast('Fixed Footer', 'Perubahan disimpan dari footer tetap.', 'success')}
                  className="px-3 py-1 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-semibold cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'behavioral') && isVisible('loadmore') && (
        <UiDocPage
          title="Load More"
        >
          <UiDocSection
            title="Progressive List Loader"
            description="Klik tombol Load More (+2) untuk memuat dua baris log tambahan ke daftar."
            classesHint="space-y-2 / w-full py-2 rounded-lg bg-gray-900 text-white"
            codeSnippet={`<button onClick={() => setCount(c => c + 2)}>Load More (+2)</button>`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="space-y-2">
                {Array.from({ length: loadMoreCount }).map((_, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 tabular-nums animate-ui-slide-down">
                    Entri Log Modul Pembelajaran #{i + 1} (Disetujui)
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setLoadMoreCount((p) => p + 2);
                  triggerToast('Load More', '2 entri log baru dimuat.', 'info');
                }}
                className="w-full py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black transition-colors cursor-pointer"
              >
                Load More (+2)
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* ========================================================= */}
      {/* 10. LAYOUT */}
      {/* ========================================================= */}
      {(category === 'all' || category === 'layout') && isVisible('menus') && (
        <UiDocPage
          title="Menus"
          subLinks={[
            { id: 'mnu-classic', label: 'Classic Sidebar Menu' },
            { id: 'mnu-horiz', label: 'Horizontal Menu' },
            { id: 'mnu-navbar', label: 'Navbar Menu' },
          ]}
        >
          <UiDocSection
            id="mnu-classic"
            title="Classic Vertical Sidebar Menu"
            classesHint="relative grid grid-rows-3 w-56 p-1.5 rounded-xl bg-gray-100/80 border border-gray-300"
            codeSnippet={`<div className="w-56 p-1.5 rounded-xl bg-gray-100 border grid grid-rows-3">\n  <button className="px-3 py-2 rounded-lg bg-gray-900 text-white font-semibold">Dashboard</button>\n  <button className="px-3 py-2 rounded-lg text-gray-700">Materials</button>\n</div>`}
          >
            <div className="relative grid grid-rows-3 w-56 p-1.5 rounded-xl bg-gray-100/80 border border-gray-300 text-xs">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-1.5 top-1.5 h-[calc((100%-0.75rem)/3)] rounded-lg bg-gray-900 shadow-xs transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translate3d(0, ${Math.max(0, ['Dashboard', 'Materials', 'UI Kit'].indexOf(activeClassicMenu)) * 100}%, 0)`,
                }}
              />
              {['Dashboard', 'Materials', 'UI Kit'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActiveClassicMenu(m)}
                  className={`relative z-10 w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors duration-200 cursor-pointer ${
                    activeClassicMenu === m ? 'text-white' : 'text-gray-700 hover:text-gray-950'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="mnu-horiz"
            title="Horizontal Menu"
            classesHint="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border"
            codeSnippet={`<div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border">\n  <span className="px-3 py-1 rounded bg-gray-900 text-white font-semibold">Overview</span>\n  <span>Courses</span>\n</div>`}
          >
            <div className="max-w-md flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs">
              <span className="px-3 py-1 rounded-md bg-gray-900 text-white font-semibold">Overview</span>
              <span className="px-3 py-1 rounded-md text-gray-700 hover:bg-white cursor-pointer">Courses</span>
              <span className="px-3 py-1 rounded-md text-gray-700 hover:bg-white cursor-pointer">Grades</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mnu-navbar"
            title="Navbar Menu"
            classesHint="flex items-center justify-between p-3 rounded-xl bg-primary-50 border border-primary-200"
            codeSnippet={`<div className="flex items-center justify-between p-3 rounded-xl bg-primary-50 border border-primary-200">\n  <span className="font-bold text-primary-900">Navbar Menu + Search</span>\n  <span className="badge">v2.4</span>\n</div>`}
          >
            <div className="max-w-md flex items-center justify-between p-3 rounded-xl bg-primary-50 border border-primary-200 text-xs">
              <span className="font-bold text-primary-900">Navbar Menu + Search</span>
              <span className="px-2 py-0.5 rounded bg-white text-primary-700 font-semibold tabular-nums">v2.4</span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'layout') && isVisible('navbar') && (
        <UiDocPage
          title="Navbar"
          subLinks={[
            { id: 'nbr-light', label: 'Brand + Search Navbar' },
            { id: 'nbr-dark', label: 'Dark Navbar' },
            { id: 'nbr-ext', label: 'External Toggle Content' },
            { id: 'nbr-offcanvas', label: 'Offcanvas Navbar' },
          ]}
        >
          <UiDocSection
            id="nbr-light"
            title="Brand + Search Navbar"
            classesHint="p-3 rounded-xl bg-white border flex items-center justify-between"
            codeSnippet={`<header className="p-3 rounded-xl bg-white border flex items-center justify-between">\n  <span className="font-bold">UI KIT</span>\n  <input placeholder="Navbar search..." />\n</header>`}
          >
            <div className="p-3 rounded-xl bg-white border border-gray-300 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <span className="w-6 h-6 rounded-md bg-primary-600 text-white flex items-center justify-center text-[10px]">
                  UI
                </span>
                <span>UI KIT</span>
              </div>
              <div className="relative flex-1 max-w-[200px]">
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Navbar search..." className="w-full pl-8 pr-2.5 py-1.5 rounded-md border border-gray-300 text-xs" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="nbr-dark"
            title="Dark Navbar"
            classesHint="p-3.5 bg-gray-900 text-white rounded-xl flex justify-between"
            codeSnippet={`<header className="p-3.5 bg-gray-900 text-white rounded-xl flex justify-between">\n  <span className="font-bold">UI KIT Dark Navbar</span>\n  <span>Design System</span>\n</header>`}
          >
            <div className="p-3.5 bg-gray-900 text-white rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold">UI KIT Dark Navbar</span>
              <span className="text-[11px] text-gray-300">Signed in as Design System</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="nbr-ext"
            title="External Content"
            classesHint="p-3 bg-gray-900 text-white rounded-lg"
            codeSnippet={`<button onClick={() => setOpen(!open)}>Toggle External Content</button>\n{open && <div className="p-3 bg-gray-900 text-white rounded-lg">External Content</div>}`}
          >
            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => setExternalNavbarOpen(!externalNavbarOpen)}
                className="px-3.5 py-2 rounded-lg bg-white border border-gray-300 font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Toggle External Content
              </button>
              {externalNavbarOpen && (
                <div className="p-3 bg-gray-900 text-white rounded-lg animate-ui-slide-down">
                  Konten eksternal navbar yang dapat dibuka-tutup di atas bilah navigasi.
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="nbr-offcanvas"
            title="Offcanvas"
            classesHint="bg-gray-900 text-white rounded-lg"
            codeSnippet={`<button onClick={() => setActiveDrawerSpec({ dir: 'right', type: 'offcanvas' })}>Buka Offcanvas</button>`}
          >
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-300 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">UI KIT Responsive Navbar</span>
              <button
                onClick={() => setActiveDrawerSpec({ dir: 'right', type: 'offcanvas' })}
                className="px-3 py-1.5 rounded-md bg-gray-900 text-white font-semibold cursor-pointer"
              >
                Buka Navbar Offcanvas
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'layout') && isVisible('pageheaders') && (
        <UiDocPage
          title="Page Headers"
        >
          <UiDocSection
            title="Contextual Page Header with Actions"
            classesHint="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            codeSnippet={`<div className="p-4 rounded-xl bg-gray-50 border flex items-center justify-between">\n  <div><span>Ruang Kelas Aktif</span><h3>Class 302 · Matematika</h3></div>\n  <div className="flex gap-2"><button>Ekspor</button><button>Mulai Sesi</button></div>\n</div>`}
          >
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-primary-700">Ruang Kelas Aktif</span>
                <h3 className="text-base font-bold text-gray-900">Class 302 · Matematika</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer">
                  Ekspor
                </button>
                <button className="px-3.5 py-2 rounded-lg bg-gray-900 text-white hover:bg-black cursor-pointer">
                  Mulai Sesi
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {(category === 'all' || category === 'layout') && isVisible('pagefooters') && (
        <UiDocPage
          title="Page Footers"
        >
          <UiDocSection
            title="Standard Application Footer Bar"
            classesHint="flex items-center justify-between p-4 bg-gray-100 rounded-xl border border-gray-300"
            codeSnippet={`<footer className="p-4 bg-gray-100 rounded-xl flex justify-between text-xs text-gray-600">\n  <span>© 2026 UI KIT Design System</span>\n  <div className="flex gap-4"><a>Privasi</a><a>Bantuan</a></div>\n</footer>`}
          >
            <div className="p-4 bg-gray-100 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600 border border-gray-300">
              <span>© 2026 UI KIT · Design System</span>
              <div className="flex gap-4 text-primary-600 font-semibold">
                <span className="cursor-pointer hover:underline">Privasi</span>
                <span className="cursor-pointer hover:underline">Ketentuan</span>
                <span className="cursor-pointer hover:underline">Bantuan</span>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}
    </div>
  );
};
