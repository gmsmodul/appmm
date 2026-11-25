import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Bell,
  MessageSquare,
  Search,
  Library,
  Calendar,
  BookOpen,
  Users,
  Award,
  Layers,
  Plus,
  Download,
  CheckCheck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Save,
  RefreshCw,
  X,
  CheckCircle2,
  Sparkles,
  FileText,
  Palette,
  FormInput,
  Table2,
  Smartphone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { MobileNavUiKitDemo } from './MobileNavUiKitDemo';
import { Mobile375FixesUiKit } from './Mobile375FixesUiKit';
import { SplitFilterButton } from '../ui/SplitFilterButton';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { ElasticPullToRefresh } from '../ui/ElasticPullToRefresh';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { PASTEL_THEMES } from '../../constants/theme';

interface MobileUiKitProps {
  activeSubJump: string;
}

export const MobileUiKit: React.FC<MobileUiKitProps> = ({ activeSubJump }) => {
  const { triggerToast } = useApp();

  // 1. Mobile Header Demo State
  const [headerMode, setHeaderMode] = useState<'utilities' | 'dataentry' | 'datadisplay' | 'tables'>('utilities');

  // 3. Mobile Split Filter Demo State
  const [demoClass, setDemoClass] = useState('All');
  const [demoStatus, setDemoStatus] = useState('All');
  const [demoType, setDemoType] = useState('All');

  // 4. Mobile Hairline List Preview State
  const [hairlineMode, setHairlineMode] = useState<'mobile' | 'desktop'>('mobile');

  // 5. Mobile Bottom Sheet Demo State
  const [sheetOpen, setSheetOpen] = useState(false);
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose: () => setSheetOpen(false),
  });

  // 6. Mobile Gestures & Slide Demo State
  const [ptrDemoSeq, setPtrDemoSeq] = useState(0);
  const [slideMonth, setSlideMonth] = useState('Feb');
  const [glideSegment, setGlideSegment] = useState<'Semua' | 'Materi' | 'Kuis' | 'Rekap'>('Semua');
  const [glideCardIdx, setGlideCardIdx] = useState(0);
  const [glideViewportWidth, setGlideViewportWidth] = useState(308);
  const glideViewportRef = useRef<HTMLDivElement>(null);
  const [transitionTab, setTransitionTab] = useState(0);
  const [transitionDir, setTransitionDir] = useState<1 | -1>(1);
  const [depthPullDemo, setDepthPullDemo] = useState(false);

  useEffect(() => {
    if (activeSubJump !== 'Mobile Gestures & Slide') return;
    const el = glideViewportRef.current;
    if (!el) return;
    const updateWidth = () => {
      if (el.clientWidth > 0) setGlideViewportWidth(el.clientWidth);
    };
    updateWidth();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeSubJump]);

  // 7. Mobile Notification Popover Demo State
  const [notifTab, setNotifTab] = useState<'All' | 'Unread'>('All');
  const [demoNotifs, setDemoNotifs] = useState([
    {
      id: 'mn-1',
      title: 'Quiz 3 Grade Published',
      desc: 'Class 302 Calculus results are now available for review.',
      time: '5m ago',
      unread: true,
      theme: 'periwinkle' as const,
    },
    {
      id: 'mn-2',
      title: 'Parent Message Received',
      desc: 'Mrs. Anderson sent an excuse note for tomorrow.',
      time: '24m ago',
      unread: true,
      theme: 'peach' as const,
    },
    {
      id: 'mn-3',
      title: 'Lesson Slides Approved',
      desc: 'Unit 4: Derivatives slides marked Ready to Teach.',
      time: '2h ago',
      unread: false,
      theme: 'mint' as const,
    },
  ]);

  const headerPageMeta = {
    utilities: { title: 'Grid', category: '1. Utilities', icon: Palette },
    dataentry: { title: 'Buttons', category: '3. Data Entry', icon: FormInput },
    datadisplay: { title: 'Accordion', category: '2. Data Display', icon: Layers },
    tables: { title: 'Data Tables', category: '5. Tables', icon: Table2 },
  };
  const ActiveHeaderIcon = headerPageMeta[headerMode].icon;

  const filteredDemoNotifs = demoNotifs.filter((n) => notifTab === 'All' || n.unread);
  const unreadDemoCount = demoNotifs.filter((n) => n.unread).length;

  return (
    <div className="space-y-8">
      {/* 1. Mobile Header */}
      {activeSubJump === 'Mobile Header' && (
          <UiDocPage
          title="Mobile Header"
          description="Header responsif khusus UI KIT tanpa breadcrumb di mobile: menampilkan ikon kategori + nama komponen pada layar kecil, serta breadcrumb UI KIT > Kategori > Komponen di desktop."
          subLinks={[
            { id: 'mhd-overview', label: 'Category Header vs Inner Breadcrumb' },
            { id: 'mhd-inner', label: 'Breadcrumb Removal Rule (Mobile vs Tablet/PC)' },
            { id: 'mhd-subbar', label: 'Right-Aligned Sub-Header Action Bar' },
          ]}
        >
          <UiDocSection
            id="mhd-overview"
            title="Category Header vs Inner Breadcrumb"
            classesHint="h-16 px-4 border-b bg-white/80 / flex md:hidden items-center gap-2"
            codeSnippet={`{/* Mobile Header (< 768px) */}\n<div className="flex md:hidden items-center gap-2 min-w-0">\n  <CategoryIcon className="w-[18px] h-[18px] text-[#ee2e65] shrink-0" />\n  <h1 className="text-[17px] font-semibold truncate">{uiSubJump}</h1>\n</div>\n\n{/* Desktop Header (>= 768px) */}\n<nav className="hidden md:flex items-center gap-2 text-[13px]">\n  <span>UI KIT</span> <ChevronRight /> <span>{category}</span> <ChevronRight /> <span>{uiSubJump}</span>\n</nav>`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {(['utilities', 'dataentry', 'datadisplay', 'tables'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setHeaderMode(m)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      headerMode === m
                        ? 'bg-[#ee2e65] text-white shadow-xs'
                        : 'bg-[#F4F5F8] text-[#5A5D67] hover:text-[#1C1D21]'
                    }`}
                  >
                    {headerPageMeta[m].category}
                  </button>
                ))}
              </div>

              <div className="bg-[#E8EAEE] rounded-2xl p-4 sm:p-6 flex justify-center">
                <div className="w-full max-w-[375px] bg-white rounded-[24px] shadow-md border border-black/[0.12] overflow-hidden">
                  {/* Simulated Mobile Top Header */}
                  <div className="h-16 px-4 border-b border-black/[0.12] flex items-center justify-between gap-3 bg-white">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-[#FEF1F5] text-[#ee2e65] flex items-center justify-center shrink-0">
                        <ActiveHeaderIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-[#646772] leading-tight">
                          UI KIT · {headerPageMeta[headerMode].category.replace(/^\d+\.\s*/, '')}
                        </span>
                        <span className="block text-[16px] font-semibold tracking-tight text-[#1C1D21] truncate leading-tight">
                          {headerPageMeta[headerMode].title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => triggerToast('UI KIT Updates', 'Membuka panel pembaruan komponen.', 'info')}
                        className="w-9 h-9 rounded-full border border-black/[0.14] flex items-center justify-center text-[#1C1D21] relative cursor-pointer"
                      >
                        <Bell className="w-4 h-4" />
                        <span className="min-w-[16px] h-[16px] px-1 rounded-full bg-[#EF4444] text-white text-[9.5px] font-bold flex items-center justify-center absolute -top-1 -right-1 ring-2 ring-white tabular-nums">
                          3
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast('Search UI KIT', 'Membuka pencarian cepat komponen.', 'info')}
                        className="w-9 h-9 rounded-full border border-black/[0.14] flex items-center justify-center text-[#1C1D21] cursor-pointer"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Simulated Body Below Mobile Header */}
                  <div className="p-4 space-y-3 bg-white">
                    <div className="flex items-center justify-end gap-2">
                      <span className="mr-auto px-2.5 py-1 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                        Token v2.4
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-black/[0.14] text-xs font-medium text-[#1C1D21] whitespace-nowrap shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 text-gray-500" />
                        <span>PDF</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-medium whitespace-nowrap shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="h-14 rounded-2xl bg-[#F4F5F8] border border-black/[0.10] flex items-center justify-center text-[11.5px] text-[#646772]">
                      Konten UI KIT tampil bersih tanpa duplikasi judul
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mhd-inner"
            title="Breadcrumb Removal Rule (Mobile vs Tablet/PC)"
            classesHint="flex md:hidden (Icon + Title) | hidden md:flex (Breadcrumb)"
            codeSnippet={`{/* Mobile: Category Title */}\n<div className="flex md:hidden items-center gap-2 min-w-0">\n  <Icon className="w-[18px] h-[18px] text-[#ee2e65]" />\n  <h1 className="text-[17px] font-semibold truncate">{uiSubJump}</h1>\n</div>\n\n{/* Tablet & PC: Breadcrumb */}\n<nav className="hidden md:flex items-center gap-2 text-[13px]">\n  <span>UI KIT</span> <ChevronRight /> <span>{category}</span> <ChevronRight /> <span>{uiSubJump}</span>\n</nav>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#FAFBFD] border border-black/[0.12] space-y-1.5">
                <div className="font-semibold text-[#1C1D21]">Mobile (&lt; 768px)</div>
                <p className="text-[#5A5D67] leading-relaxed">
                  Sidebar &amp; breadcrumb disembunyikan. Header menampilkan ikon kategori + nama komponen aktif secara ringkas untuk menghindari dua baris judul yang sempit.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAFBFD] border border-black/[0.12] space-y-1.5">
                <div className="font-semibold text-[#1C1D21]">Tablet &amp; PC (&ge; 768px)</div>
                <p className="text-[#5A5D67] leading-relaxed">
                  Sidebar kiri menampilkan seluruh kategori, dan header menampilkan breadcrumb animasi <code className="px-1 py-0.5 rounded bg-gray-100">UI KIT &gt; Kategori &gt; Komponen</code>.
                </p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mhd-subbar"
            title="Right-Aligned Sub-Header Action Bar"
            classesHint="flex items-center justify-end gap-2.5 w-full md:w-auto"
            codeSnippet={`<div className="flex items-center justify-end gap-2.5 w-full md:w-auto">\n  <button className={ACTION_BTN_SECONDARY}>...</button>\n  <button className={ACTION_BTN_PRIMARY}>...</button>\n</div>`}
          >
            <div className="max-w-[375px] bg-[#FAFBFD] p-3.5 rounded-2xl border border-black/[0.12]">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => triggerToast('Export Tokens', 'Mengunduh konfigurasi JSON token.', 'success')}
                  className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-black/[0.14] bg-white text-xs font-medium text-[#1C1D21] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('New Token', 'Menambahkan varian token baru.', 'info')}
                  className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2. Mobile Bottom Dock */}
      {activeSubJump === 'Mobile Bottom Dock' && <MobileNavUiKitDemo />}

      {/* 3. Mobile Split Filters */}
      {activeSubJump === 'Mobile Split Filters' && (
        <UiDocPage
          title="Mobile Split Filters"
          description="Split Button filter pengganti deretan pill panjang: klik sisi kiri untuk berpindah cepat ke opsi berikutnya, klik panah kanan untuk membuka dropdown lengkap."
          subLinks={[
            { id: 'msf-variants', label: 'Variant Styles (Dark / Primary / Surface)' },
            { id: 'msf-badges', label: 'Status Split with Count Badges' },
          ]}
        >
          <UiDocSection
            id="msf-variants"
            title="Split Filter Button Variants"
            classesHint="SplitFilterButton variant='dark' | 'primary' | 'surface' (1 kata di mobile, prefix di desktop)"
            codeSnippet={`<SplitFilterButton\n  value={selectedClass}\n  onChange={setSelectedClass}\n  prefix="Kelas"\n  icon={Users}\n  variant="dark"\n  options={[\n    { value: 'All', label: 'Semua', mobileLabel: 'Semua' },\n    { value: '302', label: 'Class 302', mobileLabel: '302' },\n  ]}\n/>`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <SplitFilterButton
                  value={demoClass}
                  onChange={setDemoClass}
                  prefix="Kelas"
                  icon={Users}
                  variant="dark"
                  options={[
                    { value: 'All', label: 'Semua', mobileLabel: 'Semua' },
                    { value: '302', label: 'Class 302', mobileLabel: '302' },
                    { value: '303', label: 'Class 303', mobileLabel: '303' },
                    { value: '304', label: 'Class 304', mobileLabel: '304' },
                    { value: '305', label: 'Class 305', mobileLabel: '305' },
                  ]}
                />

                <SplitFilterButton
                  value={demoType}
                  onChange={setDemoType}
                  prefix="Tipe"
                  icon={Layers}
                  variant="surface"
                  options={[
                    { value: 'All', label: 'Semua Tipe', mobileLabel: 'Semua' },
                    { value: 'video', label: 'Video', mobileLabel: 'Video' },
                    { value: 'document', label: 'Dokumen', mobileLabel: 'Dokumen' },
                    { value: 'slides', label: 'Slides', mobileLabel: 'Slides' },
                    { value: 'lab', label: 'Lab', mobileLabel: 'Lab' },
                  ]}
                />
              </div>

              <div className="text-xs text-[#5A5D67] bg-[#FAFBFD] px-3.5 py-2.5 rounded-xl border border-black/[0.10]">
                Kelas aktif: <strong className="text-[#1C1D21]">{demoClass}</strong> · Tipe aktif:{' '}
                <strong className="text-[#1C1D21]">{demoType}</strong> — klik sisi kiri untuk beralih cepat, atau tekan panah untuk memilih dari daftar.
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="msf-badges"
            title="Status Split Filter with KPI Count Badges"
            classesHint="variant='primary' + options[].badge + options[].badgeClassName"
            codeSnippet={`<SplitFilterButton\n  value={status}\n  onChange={setStatus}\n  prefix="Status"\n  icon={Award}\n  variant="primary"\n  options={[\n    { value: 'All', label: 'All', mobileLabel: 'All', badge: 10, badgeClassName: 'bg-[#FEF1F5] text-[#9D113C]' },\n    { value: 'Honor Roll', label: 'Honor Roll', mobileLabel: 'Honor', badge: 4, badgeClassName: 'bg-[#E6F9F0] text-[#146C43]' },\n  ]}\n/>`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SplitFilterButton
                value={demoStatus}
                onChange={setDemoStatus}
                prefix="Status"
                icon={Award}
                variant="primary"
                options={[
                  {
                    value: 'All',
                    label: 'All',
                    mobileLabel: 'All',
                    badge: 10,
                    badgeClassName: 'bg-[#FEF1F5] text-[#9D113C]',
                  },
                  {
                    value: 'Honor Roll',
                    label: 'Honor Roll',
                    mobileLabel: 'Honor',
                    badge: 4,
                    badgeClassName: 'bg-[#E6F9F0] text-[#146C43]',
                  },
                  {
                    value: 'Active',
                    label: 'Active',
                    mobileLabel: 'Active',
                    badge: 5,
                    badgeClassName: 'bg-[#F4F5F8] text-[#1C1D21]',
                  },
                  {
                    value: 'Needs Support',
                    label: 'Needs Support',
                    mobileLabel: 'Support',
                    badge: 1,
                    badgeClassName: 'bg-[#FFECEB] text-[#942922]',
                  },
                ]}
              />

              <span className="text-xs text-[#5A5D67]">
                Status terpilih: <strong className="text-[#9D113C]">{demoStatus}</strong>
              </span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 4. Mobile Compact Buttons */}
      {activeSubJump === 'Mobile Compact Buttons' && (
        <UiDocPage
          title="Mobile Compact Buttons"
          description="Standar tombol & daftar mobile: setiap CTA utama memakai Primary Rose (#ee2e65), ketinggian seragam h-9, Ikon + 1 Kata singkat di layar kecil tanpa membungkus baris, serta daftar garis tipis di mobile."
          subLinks={[
            { id: 'mbtn-oneword', label: 'Icon + 1-Word Action Set' },
            { id: 'mbtn-badges', label: 'Compact Status & Metric Pills' },
            { id: 'mlt-hairline-table', label: 'Mobile Hairline List vs Desktop Table' },
          ]}
        >
          <UiDocSection
            id="mbtn-oneword"
            title="Icon + 1-Word Action Set"
            classesHint="inline-flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-full whitespace-nowrap shrink-0 bg-[#ee2e65]"
            codeSnippet={`<button className="inline-flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-[13px] font-medium whitespace-nowrap shrink-0">\n  <Plus className="w-4 h-4 shrink-0" />\n  <span className="sm:hidden">Create</span>\n  <span className="hidden sm:inline">Create Component</span>\n</button>`}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { label: 'Create', icon: Plus, style: 'bg-[#ee2e65] text-white hover:bg-[#d82256]' },
                { label: 'Add', icon: Plus, style: 'bg-[#ee2e65] text-white hover:bg-[#d82256]' },
                { label: 'Save', icon: Save, style: 'bg-[#ee2e65] text-white hover:bg-[#d82256]' },
                { label: 'Export', icon: Download, style: 'bg-white text-[#1C1D21] border border-black/[0.14] hover:bg-[#FAFBFD]' },
                { label: 'CSV', icon: FileText, style: 'bg-white text-[#1C1D21] border border-black/[0.14] hover:bg-[#FAFBFD]' },
                { label: 'Statistics', icon: BarChart2, style: 'bg-white text-[#1C1D21] border border-black/[0.14] hover:bg-[#FAFBFD]' },
                { label: 'Read', icon: CheckCheck, style: 'bg-[#FEF1F5] text-[#9D113C] border border-[#FBC2D4]/70 hover:bg-[#FDE0E9]' },
                { label: 'Back', icon: ArrowLeft, style: 'bg-[#F4F5F8] text-[#1C1D21] hover:bg-gray-200/70' },
              ].map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => triggerToast(btn.label, `Tombol mobile "${btn.label}" ditekan.`, 'info')}
                    className={`inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium transition-colors active:scale-95 whitespace-nowrap shrink-0 cursor-pointer ${btn.style}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </UiDocSection>

          <UiDocSection
            id="mbtn-badges"
            title="Compact Mobile Inline Badges"
            classesHint="px-2.5 py-1 rounded-full text-[11.5px] font-bold"
            codeSnippet={`<span className="px-2.5 py-1 rounded-full bg-[#FFF5E6] text-[#8C5811] text-[11.5px] font-bold">Avg 93%</span>`}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full bg-[#FFF5E6] text-[#8C5811] text-[11.5px] font-bold tabular-nums">
                Avg 93%
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FFECEB] text-[#942922] text-[11.5px] font-bold tabular-nums">
                4 Unread
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#E6F9F0] text-[#146C43] text-[11.5px] font-bold tabular-nums">
                4 Honor
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11.5px] font-bold tabular-nums">
                10 Total
              </span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mlt-hairline-table"
            title="Mobile Hairline List vs Desktop Table"
            description="Pada layar kecil (< 768px), tabel lebar diganti daftar garis tipis tanpa kartu berat (divide-y divide-black/[0.12]) yang merender langsung di kanvas putih."
            classesHint="md:hidden divide-y divide-black/[0.12] | hidden md:block rounded-2xl border overflow-hidden"
            codeSnippet={`{/* Mobile Hairline List */}\n<div className="md:hidden divide-y divide-black/[0.12]">\n  {rows.map(r => (\n    <div className="py-3 flex items-center justify-between gap-3">\n      <div className="flex items-center gap-2.5 min-w-0">...</div>\n      <span className="text-xs font-bold tabular-nums">{r.score}</span>\n    </div>\n  ))}\n</div>`}
            actions={
              <div className="inline-flex bg-gray-100 p-0.5 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setHairlineMode('mobile')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                    hairlineMode === 'mobile' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Mobile List
                </button>
                <button
                  type="button"
                  onClick={() => setHairlineMode('desktop')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                    hairlineMode === 'desktop' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Desktop Table
                </button>
              </div>
            }
          >
            {hairlineMode === 'mobile' ? (
              <div className="max-w-sm mx-auto bg-white rounded-[22px] border border-black/[0.12] px-4 py-1 divide-y divide-black/[0.12]">
                {[
                  { init: 'SA', name: 'Sarah Anderson', sub: 'Token Layout · 14 Sep', val: '96%', tone: 'bg-[#E6F9F0] text-[#146C43]' },
                  { init: 'JW', name: 'James Wilson', sub: 'Motion Spec · 15 Sep', val: '92%', tone: 'bg-[#FEF1F5] text-[#9D113C]' },
                  { init: 'EC', name: 'Emily Carter', sub: 'Grid Audit · 16 Sep', val: '85%', tone: 'bg-[#FFF5E6] text-[#8C5811]' },
                ].map((item) => (
                  <div key={item.name} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold flex items-center justify-center shrink-0">
                        {item.init}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[#1C1D21] truncate">{item.name}</div>
                        <div className="text-[11px] text-[#646772] truncate">{item.sub}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums shrink-0 ${item.tone}`}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-300 overflow-x-auto bg-white text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-300 text-gray-600">
                    <tr>
                      <th className="py-2.5 px-3.5 font-semibold">Reviewer</th>
                      <th className="py-2.5 px-3.5 font-semibold">Scope</th>
                      <th className="py-2.5 px-3.5 font-semibold text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 tabular-nums">
                    <tr>
                      <td className="py-2.5 px-3.5 font-semibold text-gray-900">Sarah Anderson</td>
                      <td className="py-2.5 px-3.5 text-gray-600">Token Layout · 14 Sep</td>
                      <td className="py-2.5 px-3.5 text-right font-bold text-[#146C43]">96%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-semibold text-gray-900">James Wilson</td>
                      <td className="py-2.5 px-3.5 text-gray-600">Motion Spec · 15 Sep</td>
                      <td className="py-2.5 px-3.5 text-right font-bold text-[#9D113C]">92%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-semibold text-gray-900">Emily Carter</td>
                      <td className="py-2.5 px-3.5 text-gray-600">Grid Audit · 16 Sep</td>
                      <td className="py-2.5 px-3.5 text-right font-bold text-[#8C5811]">85%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 5. Mobile Bottom Sheet */}
      {activeSubJump === 'Mobile Bottom Sheet' && (
        <UiDocPage
          title="Mobile Bottom Sheet"
          description="Panel lembaran bawah khusus mobile dengan handle seret (swipe-down to dismiss), animasi spring lembut, dan tombol tutup X."
          subLinks={[{ id: 'mbs-interactive', label: 'Interactive Swipeable Bottom Sheet' }]}
        >
          <UiDocSection
            id="mbs-interactive"
            title="Interactive Swipeable Bottom Sheet"
            classesHint="rounded-t-[28px] shadow-2xl animate-bottom-sheet / useBottomSheetMotion"
            codeSnippet={`const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({ onClose });\n\n<div ref={backdropRef} data-modal-sheet-backdrop="true" className="fixed inset-0 z-50 flex items-end">\n  <div ref={setSheetElement} {...sheetGestureProps} className="w-full bg-white rounded-t-[28px] p-5 animate-bottom-sheet">\n    <div data-sheet-handle="true" className="w-10 h-1 bg-black/20 rounded-full mx-auto" />\n    ...\n  </div>\n</div>`}
          >
            <div className="bg-[#E8EAEE] rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-4">
              <div className="w-full max-w-[340px] bg-white rounded-[26px] p-4 space-y-3 shadow-lg border border-black/[0.12]">
                <div className="flex justify-center">
                  <div className="w-10 h-1 bg-black/20 rounded-full animate-sheet-handle" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#FEF1F5] text-[#9D113C] flex items-center justify-center font-bold text-xs">
                      UI
                    </div>
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#1C1D21]">Component Sheet</div>
                      <div className="text-[11px] text-[#646772]">Tarik handle ke bawah untuk menutup</div>
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-[#F4F5F8] flex items-center justify-center text-[#5A5D67]">
                    <X className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-[#E6F9F0] text-[#146C43] font-semibold">
                    Tokens · 96%
                  </div>
                  <div className="p-2.5 rounded-2xl bg-[#FEF1F5] text-[#9D113C] font-semibold">
                    Coverage · 92.4%
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buka Live Bottom Sheet</span>
              </button>
            </div>

            {sheetOpen &&
              createPortal(
                <div
                  ref={backdropRef}
                  data-modal-sheet-backdrop="true"
                  className="animate-ui-fade fixed inset-0 z-[9999] bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
                >
                  <div
                    ref={setSheetElement}
                    {...sheetGestureProps}
                    className="w-full sm:max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] p-5 sm:p-6 shadow-2xl space-y-4 animate-bottom-sheet"
                  >
                    <div
                      data-sheet-handle="true"
                      className="flex justify-center py-2 -mt-2 cursor-grab active:cursor-grabbing touch-none sm:hidden"
                    >
                      <div className="w-10 h-1 bg-black/20 rounded-full animate-sheet-handle" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#1C1D21]">Live Mobile Bottom Sheet</h3>
                        <p className="text-[12px] text-[#646772]">
                          Tarik handle ke bawah di layar sentuh atau tekan Tutup.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={animateClose}
                        aria-label="Close sheet"
                        className="w-8 h-8 rounded-full hover:bg-[#F4F5F8] flex items-center justify-center text-[#5A5D67] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAFBFD] border border-black/[0.10] text-xs text-[#5A5D67] leading-relaxed">
                      Sheet ini memakai hook <code className="px-1 py-0.5 rounded bg-gray-100">useBottomSheetMotion</code> untuk mendukung gestur seret ke bawah secara halus dengan akselerasi spring.
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={animateClose}
                        className="h-9 px-4 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>,
                document.body
              )}
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 6. Mobile Gestures & Slide */}
      {activeSubJump === 'Mobile Gestures & Slide' && (
        <UiDocPage
          title="Mobile Gestures & Slide"
          description="Interaksi sentuh khusus mobile: Elastic Header Pull-to-Refresh bergaya pegas, Horizontal Slide Indicator dengan Motion Gliding Pill, Swipe-to-Glide Card Slider (drag x + velocity snap), serta transisi halaman arah adaptif dan Sheet Depth Pull-Back."
          subLinks={[
            { id: 'mgs-ptr', label: 'Elastic Header Pull to Refresh' },
            { id: 'mgs-slide', label: 'Horizontal Slide & Gliding Pill' },
            { id: 'mgs-glide', label: 'Motion Gliding & Swipe Deck' },
            { id: 'mgs-transition-depth', label: 'Responsive PageTransition & Sheet Pull-Back' },
          ]}
        >
          <UiDocSection
            id="mgs-ptr"
            title="Elastic Header Pull to Refresh"
            classesHint="ElasticPullToRefresh onRefresh={...} allowDesktopMousePull"
            codeSnippet={`<ElasticPullToRefresh onRefresh={handleWorkspaceRefresh}>\n  <PageContent />\n</ElasticPullToRefresh>`}
            actions={
              <button
                type="button"
                onClick={() => setPtrDemoSeq((s) => s + 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/15 text-[#9D113C] dark:text-[#f895b5] text-xs font-semibold hover:bg-[#FDE0E9] dark:hover:bg-[#ee2e65]/25 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulasi Pull</span>
              </button>
            }
          >
            <div className="bg-[#E8EAEE] dark:bg-[#121418] rounded-2xl p-4 sm:p-6 flex justify-center">
              <div className="w-full max-w-[340px] h-[250px] bg-white dark:bg-[#181B21] rounded-[24px] border border-black/[0.12] dark:border-white/[0.10] shadow-md overflow-hidden flex flex-col">
                <ElasticPullToRefresh
                  allowDesktopMousePull
                  demoTriggerSeq={ptrDemoSeq}
                  onRefresh={() => triggerToast('Segarkan', 'Data mobile berhasil diperbarui.', 'success')}
                >
                  <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                    <div className="text-xs font-semibold text-[#1C1D21] dark:text-[#F3F4F6]">
                      Tarik ke bawah area ini
                    </div>
                    <div className="p-3 rounded-2xl bg-[#EEF8F3] dark:bg-emerald-500/15 text-xs text-[#146C43] dark:text-emerald-300 font-medium">
                      Design Tokens · Synced
                    </div>
                    <div className="p-3 rounded-2xl bg-[#FEF1F5] dark:bg-[#ee2e65]/15 text-xs text-[#9D113C] dark:text-[#f895b5] font-medium">
                      Motion Specs · 12 Categories
                    </div>
                  </div>
                </ElasticPullToRefresh>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mgs-slide"
            title="Horizontal Slide Indicator & Gliding Pill"
            description="Menggabungkan HorizontalSlideTrack (pengganti scrollbar horizontal dengan kapsul indikator gerak) dan spring layoutId gliding pill agar sorotan aktif meluncur mulus antar item saat diklik atau digeser."
            classesHint="HorizontalSlideTrack activeKey={month} visibility='always' + motion.span layoutId"
            codeSnippet={`<HorizontalSlideTrack activeKey={month} accent="primary" visibility="always">\n  <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border">\n    {months.map((m) => (\n      <button key={m} data-slide-active={month === m ? 'true' : undefined} className="relative px-3.5 py-1.5 rounded-full">\n        {month === m && (\n          <motion.span\n            layoutId="month-glide-pill"\n            transition={{ type: 'spring', stiffness: 460, damping: 32 }}\n            className="absolute inset-0 rounded-full bg-[#ee2e65]"\n          />\n        )}\n        <span className="relative z-10">{m}</span>\n      </button>\n    ))}\n  </div>\n</HorizontalSlideTrack>`}
          >
            <div className="max-w-sm bg-[#FAFBFD] dark:bg-[#15181E] p-4 rounded-2xl border border-black/[0.12] dark:border-white/[0.10] space-y-3">
              <HorizontalSlideTrack
                activeKey={slideMonth}
                trackClassName="inline-flex items-center gap-1 bg-white dark:bg-[#1B1E24] p-1 rounded-full border border-black/[0.12] dark:border-white/[0.10] max-w-full select-none"
                accent="primary"
                visibility="always"
              >
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => {
                  const isActive = slideMonth === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      data-slide-active={isActive ? 'true' : undefined}
                      onClick={() => setSlideMonth(m)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-colors duration-150 ${
                        isActive
                          ? 'text-white'
                          : 'text-[#5A5D67] dark:text-gray-400 hover:text-[#1C1D21] dark:hover:text-gray-200'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mgs-month-glide-pill"
                          transition={{ type: 'spring', stiffness: 460, damping: 32, mass: 0.78 }}
                          className="absolute inset-0 rounded-full bg-[#ee2e65] shadow-xs"
                        />
                      )}
                      <span className="relative z-10">{m}</span>
                    </button>
                  );
                })}
              </HorizontalSlideTrack>
              <div className="flex items-center justify-between text-[11.5px] text-[#646772] dark:text-gray-400">
                <span>
                  Bulan terpilih:{' '}
                  <strong className="text-[#1C1D21] dark:text-[#F3F4F6]">{slideMonth}</strong>
                </span>
                <span className="text-[11px] font-medium text-[#ee2e65] dark:text-[#f895b5]">
                  Spring Glide + Track Indicator
                </span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mgs-glide"
            title="Motion Gliding Pill & Swipe-to-Glide Card Slider"
            description="Geser langsung kartu dengan jari atau mouse (drag='x') untuk meluncur bebas dengan efek pegas tepi dan velocity snap, serta rasakan gliding pill pada segmented tab bar."
            classesHint="motion.div drag='x' + dragElastic + spring snap | motion.span layoutId"
            codeSnippet={`<motion.div\n  drag="x"\n  dragConstraints={{ left: -(slides.length - 1) * width, right: 0 }}\n  dragElastic={0.18}\n  animate={{ x: -activeIndex * width }}\n  transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.85 }}\n  onDragEnd={(_, info) => snapToNearestSlide(info.offset.x, info.velocity.x)}\n  className="flex cursor-grab active:cursor-grabbing"\n>\n  {slides.map(s => <div style={{ width }}>{s}</div>)}\n</motion.div>`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* Left: Gliding Segmented Pill & Underline Bar */}
              <div className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-[#FAFBFD] dark:bg-[#15181E] p-4 flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                    Gliding Tab & Segmented Indicator
                  </div>
                  <p className="text-[11px] text-[#646772] dark:text-gray-400">
                    Ketuk tab untuk melihat kapsul latar dan garis bawah meluncur serempak dengan kurva spring.
                  </p>
                </div>

                {/* Gliding Segmented Pill */}
                <div className="rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.10] dark:border-white/[0.08] p-1 grid grid-cols-4 gap-1">
                  {(['Semua', 'Materi', 'Kuis', 'Rekap'] as const).map((tab) => {
                    const active = glideSegment === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setGlideSegment(tab)}
                        className={`relative py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          active
                            ? 'text-white'
                            : 'text-[#5A5D67] dark:text-gray-400 hover:text-[#1C1D21] dark:hover:text-gray-200'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mgs-seg-glide-pill"
                            transition={{ type: 'spring', stiffness: 460, damping: 33, mass: 0.78 }}
                            className="absolute inset-0 rounded-lg bg-[#1C1D21] dark:bg-[#ee2e65] shadow-xs"
                          />
                        )}
                        <span className="relative z-10">{tab}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Gliding Underline Tab Rail */}
                <div className="border-b border-black/[0.10] dark:border-white/[0.10] grid grid-cols-4 text-xs">
                  {(['Semua', 'Materi', 'Kuis', 'Rekap'] as const).map((tab) => {
                    const active = glideSegment === tab;
                    return (
                      <button
                        key={`ul-${tab}`}
                        type="button"
                        onClick={() => setGlideSegment(tab)}
                        className={`relative pb-2.5 text-center font-semibold cursor-pointer transition-colors ${
                          active
                            ? 'text-[#ee2e65] dark:text-[#f895b5]'
                            : 'text-[#646772] dark:text-gray-400 hover:text-[#1C1D21] dark:hover:text-gray-200'
                        }`}
                      >
                        <span>{tab}</span>
                        {active && (
                          <motion.span
                            layoutId="mgs-underline-glide"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#ee2e65]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-[#646772] dark:text-gray-400 flex items-center justify-between">
                  <span>
                    Filter aktif:{' '}
                    <strong className="text-[#1C1D21] dark:text-[#F3F4F6]">{glideSegment}</strong>
                  </span>
                  <code className="text-[10.5px] font-mono text-[#ee2e65] dark:text-[#f895b5]">
                    layoutId spring
                  </code>
                </div>
              </div>

              {/* Right: Swipe-to-Glide Interactive Card Slider */}
              <div className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-[#FAFBFD] dark:bg-[#15181E] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                      Swipe-to-Glide Card Deck
                    </div>
                    <div className="text-[11px] text-[#646772] dark:text-gray-400">
                      Seret kartu ke kiri/kanan atau gunakan panah
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={glideCardIdx === 0}
                      onClick={() => setGlideCardIdx((i) => Math.max(0, i - 1))}
                      aria-label="Slide sebelumnya"
                      className="w-7 h-7 rounded-full border border-black/[0.12] dark:border-white/[0.12] bg-white dark:bg-[#1B1E24] text-[#1C1D21] dark:text-gray-200 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={glideCardIdx === 3}
                      onClick={() => setGlideCardIdx((i) => Math.min(3, i + 1))}
                      aria-label="Slide berikutnya"
                      className="w-7 h-7 rounded-full border border-black/[0.12] dark:border-white/[0.12] bg-white dark:bg-[#1B1E24] text-[#1C1D21] dark:text-gray-200 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  ref={glideViewportRef}
                  className="w-full overflow-hidden rounded-xl border border-black/[0.10] dark:border-white/[0.10] bg-white dark:bg-[#181B21] select-none"
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -3 * glideViewportWidth, right: 0 }}
                    dragElastic={0.16}
                    animate={{ x: -glideCardIdx * glideViewportWidth }}
                    transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.85 }}
                    onDragEnd={(_, info) => {
                      const threshold = Math.min(56, glideViewportWidth * 0.22);
                      if (info.offset.x < -threshold || info.velocity.x < -280) {
                        setGlideCardIdx((i) => Math.min(3, i + 1));
                      } else if (info.offset.x > threshold || info.velocity.x > 280) {
                        setGlideCardIdx((i) => Math.max(0, i - 1));
                      }
                    }}
                    className="flex cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    {[
                      {
                        step: '01 / 04',
                        title: 'Elastic Gesture Tracking',
                        desc: 'Kartu mengikuti pergeseran jari 1:1 secara real-time di sumbu horizontal.',
                        metric: '98.2%',
                        metricLabel: 'Presensi Kelas',
                        tint: 'bg-[#FEF1F5] text-[#9D113C] dark:bg-[#ee2e65]/15 dark:text-[#f895b5]',
                      },
                      {
                        step: '02 / 04',
                        title: 'Velocity Momentum Snap',
                        desc: 'Geseran cepat (flick) otomatis meluncur ke kartu berikutnya meski jarak seret pendek.',
                        metric: '42m',
                        metricLabel: 'Rata-rata Sesi',
                        tint: 'bg-[#EDE9FE] text-[#543DE2] dark:bg-indigo-500/20 dark:text-indigo-300',
                      },
                      {
                        step: '03 / 04',
                        title: 'Rubber-Band Edge Resistance',
                        desc: 'Di ujung daftar (awal/akhir), tarikan memantul lembut tanpa hentakan keras.',
                        metric: '1.284',
                        metricLabel: 'Peserta Aktif',
                        tint: 'bg-[#E6F9F0] text-[#146C43] dark:bg-emerald-500/20 dark:text-emerald-300',
                      },
                      {
                        step: '04 / 04',
                        title: 'Spring Gliding Dots',
                        desc: 'Indikator posisi di bawah kartu memanjang dan meluncur seirama dengan slide aktif.',
                        metric: '88.4',
                        metricLabel: 'Skor Evaluasi',
                        tint: 'bg-[#FFF5E6] text-[#8C5811] dark:bg-amber-500/20 dark:text-amber-300',
                      },
                    ].map((slide) => (
                      <div
                        key={slide.step}
                        style={{ width: glideViewportWidth }}
                        className="shrink-0 p-4 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold tabular-nums ${slide.tint}`}>
                            {slide.step}
                          </span>
                          <span className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6] tabular-nums">
                            {slide.metric}{' '}
                            <span className="font-normal text-[11px] text-gray-500 dark:text-gray-400">
                              · {slide.metricLabel}
                            </span>
                          </span>
                        </div>
                        <div className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                          {slide.title}
                        </div>
                        <p className="text-[11px] text-[#5A5D67] dark:text-gray-400 leading-relaxed">
                          {slide.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Gliding Dot Indicator */}
                <div className="flex items-center justify-center gap-1.5">
                  {[0, 1, 2, 3].map((dot) => {
                    const isCurrent = glideCardIdx === dot;
                    return (
                      <button
                        key={dot}
                        type="button"
                        onClick={() => setGlideCardIdx(dot)}
                        aria-label={`Pilih slide ${dot + 1}`}
                        className="p-1 cursor-pointer"
                      >
                        <motion.span
                          animate={{
                            width: isCurrent ? 22 : 6,
                            backgroundColor: isCurrent ? '#ee2e65' : 'rgba(148,163,184,0.45)',
                          }}
                          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                          className="block h-1.5 rounded-full"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mgs-transition-depth"
            title="Responsive PageTransition & Sheet Pull-Back"
            description="Transisi konten adaptif menggunakan spring X-axis di mobile & Y-axis di desktop (dibungkus MotionConfig reducedMotion='user'), serta efek depth pull-back pada .app-shell-container saat Bottom Sheet aktif."
            classesHint="PageTransition transitionKey={key} directionOverride={dir} | .app-shell-container"
            codeSnippet={`<MotionConfig reducedMotion="user">\n  <PageTransition transitionKey={\`\${uiCategory}-\${uiSubJump}\`} directionOverride={dir}>\n    <Content />\n  </PageTransition>\n</MotionConfig>`}
            actions={
              <button
                type="button"
                onClick={() => setDepthPullDemo((v) => !v)}
                className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11.5px] font-semibold cursor-pointer ${
                  depthPullDemo
                    ? 'bg-[#ee2e65] text-white'
                    : 'bg-[#F4F5F8] dark:bg-[#1B1E24] text-[#1C1D21] dark:text-gray-200 border border-transparent dark:border-white/[0.10]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span>{depthPullDemo ? 'Tutup Sheet Pull-Back' : 'Simulasi Depth Pull-Back'}</span>
              </button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PageTransition axis preview */}
              <div className="rounded-2xl border border-gray-300 dark:border-white/[0.10] bg-[#FAFBFD] dark:bg-[#15181E] p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                    Adaptive Axis Switch (Mobile X vs Desktop Y)
                  </span>
                  <div className="flex items-center gap-1">
                    {['Grid', 'Buttons', 'Cards'].map((lbl, idx) => (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => {
                          setTransitionDir(idx >= transitionTab ? 1 : -1);
                          setTransitionTab(idx);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                          transitionTab === idx
                            ? 'bg-[#ee2e65] text-white'
                            : 'bg-white dark:bg-[#1B1E24] text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-white/[0.10]'
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-24 rounded-xl bg-white dark:bg-[#181B21] border border-gray-300 dark:border-white/[0.10] overflow-hidden relative flex items-center justify-center p-4">
                  <AnimatePresence mode="popLayout" initial={false} custom={transitionDir}>
                    <motion.div
                      key={transitionTab}
                      custom={transitionDir}
                      initial={{ opacity: 0, x: transitionDir * 24, scale: 0.985 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          x: { type: 'spring', stiffness: 400, damping: 34, mass: 0.85 },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: transitionDir * -20,
                        scale: 0.99,
                        transition: { duration: 0.16 },
                      }}
                      className="text-center space-y-1"
                    >
                      <div className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                        Halaman {['1. Grid System', '2. Action Buttons', '3. Pastel Cards'][transitionTab]}
                      </div>
                      <div className="text-[11px] text-[#5A5D67] dark:text-gray-400">
                        Spring directional transition (stiffness: 400, damping: 36)
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* App Shell Depth Pull-Back Preview */}
              <div className="rounded-2xl border border-gray-300 dark:border-white/[0.10] bg-[#E8EAEE] dark:bg-[#121418] p-4 flex items-center justify-center relative overflow-hidden min-h-[164px]">
                <div
                  className="w-full max-w-[260px] h-[132px] bg-white dark:bg-[#181B21] rounded-[20px] p-3 border border-black/[0.12] dark:border-white/[0.10] shadow-sm transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: depthPullDemo ? 'scale(0.95)' : 'scale(1)',
                    filter: depthPullDemo ? 'brightness(0.88)' : 'none',
                  }}
                >
                  <div className="text-[11px] font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                    .app-shell-container
                  </div>
                  <div className="text-[10px] text-[#646772] dark:text-gray-400 mt-1">
                    {depthPullDemo ? 'Tarik mundur (scale 0.95, brightness 0.88)' : 'Latar normal (scale 1)'}
                  </div>
                </div>
                <AnimatePresence>
                  {depthPullDemo && (
                    <motion.div
                      initial={{ y: 40, opacity: 0, filter: 'blur(3px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 380, damping: 28 } }}
                      exit={{ y: 36, opacity: 0, filter: 'blur(2px)', transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
                      className="absolute inset-x-4 bottom-2 bg-white dark:bg-[#1B1E24] rounded-t-[20px] p-3 shadow-xl border border-black/[0.14] dark:border-white/[0.12] flex items-center justify-between"
                    >
                      <span className="text-[11px] font-semibold text-[#1C1D21] dark:text-[#F3F4F6]">
                        Bottom Sheet Aktif
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/15 text-[#ee2e65] dark:text-[#f895b5] text-[10px] font-bold">
                        Pull-Back
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 7. Mobile Notifications */}
      {activeSubJump === 'Mobile Notifications' && (
        <UiDocPage
          title="Mobile Notifications"
          description="Pusat notifikasi portal edge-to-edge di mobile dan notifikasi toast yang ditempatkan di atas bottom nav bar agar tidak tertumpuk."
          subLinks={[
            { id: 'mnf-popover', label: 'Mobile Notification Center Popover' },
            { id: 'mnf-toast', label: 'Mobile Elevated Toast Position' },
          ]}
        >
          <UiDocSection
            id="mnf-popover"
            title="Mobile Notification Center Popover"
            classesHint="createPortal(..., document.body) / fixed inset-x-3 z-[9999] rounded-[24px]"
            codeSnippet={`createPortal(\n  <div style={{ top, left: 12, right: 12 }} className="fixed bg-white rounded-[24px] shadow-2xl p-4 z-[9999]">\n    <NotificationsHeader />\n    <SegmentedFilter />\n    <NotificationCards />\n  </div>,\n  document.body\n)`}
          >
            <div className="bg-[#E8EAEE] rounded-2xl p-4 sm:p-6 flex justify-center">
              <div className="w-full max-w-[352px] bg-white rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-black/[0.14] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#1C1D21]">Notifications</span>
                    {unreadDemoCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FFECEB] text-[#942922] text-[10.5px] font-bold">
                        {unreadDemoCount} New
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDemoNotifs((prev) => prev.map((n) => ({ ...n, unread: false })))
                    }
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#9D113C] hover:underline cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Read</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
                  {(['All', 'Unread'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setNotifTab(tab)}
                      className={`flex-1 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        notifTab === tab
                          ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {filteredDemoNotifs.map((n) => {
                    const theme = PASTEL_THEMES[n.theme] || PASTEL_THEMES.periwinkle;
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() =>
                          setDemoNotifs((prev) =>
                            prev.map((item) => (item.id === n.id ? { ...item, unread: false } : item))
                          )
                        }
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                          n.unread ? `${theme.bg} border-black/[0.12]` : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            n.unread ? theme.dot : 'bg-gray-400'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-gray-900 truncate">{n.title}</span>
                            <span className="text-[10.5px] text-gray-500 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{n.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                  {filteredDemoNotifs.length === 0 && (
                    <div className="py-5 text-center text-xs text-gray-500">
                      Semua notifikasi sudah dibaca.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mnf-toast"
            title="Mobile Elevated Toast Position"
            classesHint="fixed bottom-20 md:bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[9999]"
            codeSnippet={`<div className="fixed bottom-20 md:bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[9999]">\n  <ToastCard />\n</div>`}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => triggerToast('Berhasil Disimpan', 'Perubahan jadwal kelas tersimpan.', 'success')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Success</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Info Terbaru', 'Materi baru siap ditinjau.', 'info')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1C1D21] text-white text-xs font-semibold cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Info</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Perhatian', 'Ada 1 siswa perlu bimbingan.', 'warning')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Warning</span>
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 8. MOBILE 375PX FIXES */}
      {activeSubJump === 'Mobile 375px Fixes' && <Mobile375FixesUiKit />}
    </div>
  );
};
