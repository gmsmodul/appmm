import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Inbox,
  User,
  Image as ImageIcon,
  Award,
  Shield,
  MoreHorizontal,
  Flag,
  Layers,
  Lock,
  RefreshCw,
  Archive,
  BookOpen,
  Loader2,
  AlertTriangle,
  Bell,
  Clock,
  FileText,
  Plus,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { KanbanBoardUiKit } from './KanbanBoardUiKit';
import { TimelineUiKit } from './TimelineUiKit';
import { KpiCardUiKit } from './KpiCardUiKit';
import { CardArticleUiKit } from './CardArticleUiKit';
import { PASTEL_THEMES } from '../../constants/theme';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import cardOverlayImg from '../../assets/images/card_overlay_calculus_1794562505077.jpg';

interface DataDisplayUiKitProps {
  activeSubJump?: string;
}

type AccordionVariantKey =
  | 'Basic Example'
  | 'Flush'
  | 'Card'
  | 'Card shadow'
  | 'Card bold'
  | 'Card bold shadow'
  | 'Soft'
  | 'Soft card'
  | 'Soft card shadow'
  | 'Soft card bold'
  | 'Soft content'
  | 'Soft content flush'
  | 'Soft content card'
  | 'Soft content card shadow'
  | 'Simple'
  | 'Simple flush'
  | 'Simple card'
  | 'Simple card Shadow'
  | 'Simple card bold'
  | 'Icon'
  | 'Icon card bold'
  | 'Always open';

const ACCORDION_VARIANTS: {
  key: AccordionVariantKey;
  id: string;
  desc: string;
  classesHint: string;
  codeSnippet: string;
}[] = [
  {
    key: 'Basic Example',
    id: 'acc-basic',
    desc: 'Gaya akordion dasar berbingkai penuh dengan pemisah baris tipis dan satu item terbuka pada satu waktu.',
    classesHint: 'rounded-xl border border-gray-300 divide-y divide-gray-200 bg-white',
    codeSnippet: `<div className="rounded-xl border border-gray-300 divide-y divide-gray-200 overflow-hidden">\n  <button onClick={toggle} className="w-full px-4 py-3 flex justify-between font-semibold">Bab 1: Konsep Limit</button>\n  <div className="px-4 py-3 text-sm text-gray-600">Penjelasan materi silabus...</div>\n</div>`,
  },
  {
    key: 'Flush',
    id: 'acc-flush',
    desc: 'Akordion tanpa batas tepi luar atau sudut membulat agar menyatu langsung dengan kontainer induk.',
    classesHint: 'divide-y divide-gray-200 border-y border-gray-300',
    codeSnippet: `<div className="divide-y divide-gray-200 border-y border-gray-300">\n  <button className="w-full py-3 flex justify-between font-semibold">Item Flush</button>\n</div>`,
  },
  {
    key: 'Card',
    id: 'acc-card',
    desc: 'Setiap panel akordion berdiri sebagai kartu terpisah dengan jarak antar item.',
    classesHint: 'space-y-2.5 / rounded-xl border border-gray-300 bg-white',
    codeSnippet: `<div className="space-y-2.5">\n  <div className="rounded-xl border border-gray-300 bg-white overflow-hidden">...</div>\n</div>`,
  },
  {
    key: 'Card shadow',
    id: 'acc-card-shadow',
    desc: 'Varian kartu terpisah dilengkapi elevasi bayangan lembut pada tiap item.',
    classesHint: 'space-y-2.5 / rounded-xl border border-gray-300 shadow-sm',
    codeSnippet: `<div className="rounded-xl border border-gray-300 shadow-sm bg-white overflow-hidden">...</div>`,
  },
  {
    key: 'Card bold',
    id: 'acc-card-bold',
    desc: 'Kartu akordion dengan tipografi judul tebal (font-bold) dan kontras tinggi.',
    classesHint: 'rounded-xl border border-gray-300 font-bold text-gray-950',
    codeSnippet: `<button className="w-full px-4 py-3 font-bold text-gray-950">Judul Tebal</button>`,
  },
  {
    key: 'Card bold shadow',
    id: 'acc-card-bold-shadow',
    desc: 'Kombinasi kartu terpisah, judul tebal, dan bayangan elevasi untuk sorotan silabus utama.',
    classesHint: 'rounded-xl border border-gray-300 shadow-sm font-bold',
    codeSnippet: `<div className="rounded-xl border border-gray-300 shadow-sm font-bold">...</div>`,
  },
  {
    key: 'Soft',
    id: 'acc-soft',
    desc: 'Header item menggunakan latar pastel lembut saat kondisi terbuka.',
    classesHint: 'bg-primary-50/60 text-primary-950',
    codeSnippet: `<button className="w-full px-4 py-3 bg-primary-50/70 text-primary-950 font-semibold">Soft Header</button>`,
  },
  {
    key: 'Soft card',
    id: 'acc-soft-card',
    desc: 'Kartu terpisah dengan header pastel lembut untuk tampilan ramah pengguna.',
    classesHint: 'rounded-xl border border-primary-100 bg-primary-50/40',
    codeSnippet: `<div className="rounded-xl border border-primary-100 bg-primary-50/40">...</div>`,
  },
  {
    key: 'Soft card shadow',
    id: 'acc-soft-card-shadow',
    desc: 'Kartu pastel lembut dilengkapi bayangan elevasi halus.',
    classesHint: 'rounded-xl border border-primary-100 bg-primary-50/40 shadow-sm',
    codeSnippet: `<div className="rounded-xl border border-primary-100 bg-primary-50/40 shadow-sm">...</div>`,
  },
  {
    key: 'Soft card bold',
    id: 'acc-soft-card-bold',
    desc: 'Kartu pastel lembut dengan penekanan judul tebal.',
    classesHint: 'rounded-xl border border-primary-100 bg-primary-50/40 font-bold',
    codeSnippet: `<div className="rounded-xl border border-primary-100 bg-primary-50/40 font-bold">...</div>`,
  },
  {
    key: 'Soft content',
    id: 'acc-soft-content',
    desc: 'Bagian isi (body) yang dibuka diberi latar berwarna lembut agar kontras dengan header putih.',
    classesHint: 'bg-[#FEF1F5]/50 text-[#9D113C]',
    codeSnippet: `<div className="px-4 py-3 bg-[#FEF1F5]/50 text-[#9D113C]">Soft Body Content</div>`,
  },
  {
    key: 'Soft content flush',
    id: 'acc-soft-content-flush',
    desc: 'Varian flush tanpa bingkai luar dengan latar konten berwarna pastel lembut.',
    classesHint: 'divide-y divide-gray-200 / bg-[#FEF1F5]/50',
    codeSnippet: `<div className="divide-y divide-gray-200"><div className="bg-[#FEF1F5]/50">...</div></div>`,
  },
  {
    key: 'Soft content card',
    id: 'acc-soft-content-card',
    desc: 'Kartu terpisah dengan area isi berwarna lembut ketika panel dibuka.',
    classesHint: 'space-y-2.5 rounded-xl border / bg-[#FEF1F5]/50',
    codeSnippet: `<div className="rounded-xl border border-gray-300"><div className="bg-[#FEF1F5]/50 p-4">...</div></div>`,
  },
  {
    key: 'Soft content card shadow',
    id: 'acc-soft-content-card-shadow',
    desc: 'Kartu berbayang lembut dengan isi konten berwarna pastel saat aktif.',
    classesHint: 'rounded-xl border shadow-sm / bg-[#FEF1F5]/50',
    codeSnippet: `<div className="rounded-xl border border-gray-300 shadow-sm"><div className="bg-[#FEF1F5]/50 p-4">...</div></div>`,
  },
  {
    key: 'Simple',
    id: 'acc-simple',
    desc: 'Menggunakan ikon plus/minus (+ / −) minimalis sebagai penanda buka-tutup.',
    classesHint: 'font-mono text-base + / −',
    codeSnippet: `<button className="w-full px-4 py-3 flex justify-between"><span>Item</span><span>+</span></button>`,
  },
  {
    key: 'Simple flush',
    id: 'acc-simple-flush',
    desc: 'Kombinasi indikator plus/minus (+ / −) dengan gaya flush tanpa garis tepi luar.',
    classesHint: 'divide-y divide-gray-200 + / −',
    codeSnippet: `<div className="divide-y divide-gray-200 border-y border-gray-300">...</div>`,
  },
  {
    key: 'Simple card',
    id: 'acc-simple-card',
    desc: 'Kartu terpisah dengan tombol indikator (+ / −) yang ringan dan bersih.',
    classesHint: 'space-y-2.5 rounded-xl border + / −',
    codeSnippet: `<div className="rounded-xl border border-gray-300">...</div>`,
  },
  {
    key: 'Simple card Shadow',
    id: 'acc-simple-card-shadow',
    desc: 'Kartu indikator (+ / −) dilengkapi bayangan elevasi lembut.',
    classesHint: 'rounded-xl border shadow-sm + / −',
    codeSnippet: `<div className="rounded-xl border border-gray-300 shadow-sm">...</div>`,
  },
  {
    key: 'Simple card bold',
    id: 'acc-simple-card-bold',
    desc: 'Kartu indikator (+ / −) dengan teks judul tebal untuk daftar FAQ utama.',
    classesHint: 'rounded-xl border font-bold + / −',
    codeSnippet: `<div className="rounded-xl border border-gray-300 font-bold">...</div>`,
  },
  {
    key: 'Icon',
    id: 'acc-icon',
    desc: 'Menyertakan ikon kategori di depan setiap judul bab akordion.',
    classesHint: 'flex items-center gap-2.5',
    codeSnippet: `<button className="flex items-center gap-2.5"><BookOpen className="w-4 h-4 text-primary-600" /><span>Bab 1</span></button>`,
  },
  {
    key: 'Icon card bold',
    id: 'acc-icon-card-bold',
    desc: 'Kartu terpisah berikon depan dengan judul tebal untuk navigasi modul utama.',
    classesHint: 'rounded-xl border font-bold flex items-center gap-2.5',
    codeSnippet: `<div className="rounded-xl border border-gray-300 font-bold"><BookOpen className="w-4 h-4" /> ...</div>`,
  },
  {
    key: 'Always open',
    id: 'acc-always-open',
    desc: 'Mengizinkan beberapa panel akordion tetap terbuka secara bersamaan tanpa saling menutup.',
    classesHint: 'multi-open state array',
    codeSnippet: `const toggle = (i) => setOpen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);`,
  },
];

const AccordionVariantPreview: React.FC<{ variant: AccordionVariantKey }> = ({ variant }) => {
  const [openIndices, setOpenIndices] = useState<number[]>(variant === 'Always open' ? [0, 1] : [0]);

  const lower = variant.toLowerCase();
  const isFlush = lower.includes('flush');
  const isCard = lower.includes('card');
  const isShadow = lower.includes('shadow');
  const isBold = lower.includes('bold');
  const isSoft = lower.includes('soft') && !lower.includes('soft content');
  const isSoftContent = lower.includes('soft content');
  const isSimple = lower.includes('simple');
  const hasIcon = lower.includes('icon');
  const isAlwaysOpen = lower === 'always open';

  const toggle = (idx: number) => {
    if (isAlwaysOpen) {
      setOpenIndices((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
    } else {
      setOpenIndices((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  const items = [
    {
      title: 'Bab 1: Konsep Limit & Fungsi Kontinu',
      body: 'Membahas pendekatan limit kiri, limit kanan, dan teorema kekontinuan fungsi real.',
    },
    {
      title: 'Bab 2: Turunan Fungsi & Aturan Rantai',
      body: 'Aplikasi turunan tingkat tinggi dan laju perubahan sesaat dalam eksperimen fisika.',
    },
    {
      title: 'Bab 3: Integral Tentu & Luas Bidang',
      body: 'Integrasi substitusi aljabar dan perhitungan volume benda putar tiga dimensi.',
    },
  ];

  return (
    <div
      className={`${
        isCard
          ? 'space-y-2.5'
          : isFlush
          ? 'divide-y divide-gray-200 border-y border-gray-300'
          : 'rounded-xl border border-gray-300 divide-y divide-gray-200 overflow-hidden'
      } text-sm`}
    >
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={item.title}
            className={`${isCard ? 'rounded-xl border border-gray-300 overflow-hidden' : ''} ${
              isShadow ? 'shadow-sm' : ''
            } ${isSoft ? 'bg-primary-50/40' : 'bg-white'}`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer transition-colors ${
                isBold ? 'font-bold text-gray-950' : 'font-semibold text-gray-800'
              } ${isSoft && isOpen ? 'bg-primary-50 text-primary-950' : 'hover:bg-gray-50'}`}
            >
              <span className="flex items-center gap-2.5">
                {hasIcon && <BookOpen className="w-4 h-4 text-primary-600 shrink-0" />}
                <span>{item.title}</span>
              </span>
              {isSimple ? (
                <span
                  className={`font-mono text-base text-gray-500 leading-none transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isOpen ? 'rotate-180 text-primary-600' : ''
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              ) : (
                <ChevronRight
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0 ${
                    isOpen ? 'rotate-90 text-primary-600' : ''
                  }`}
                />
              )}
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-4 pb-3.5 pt-2.5 text-xs leading-relaxed border-t border-gray-200 ${
                    isSoftContent ? 'bg-[#FEF1F5]/55 text-[#9D113C]' : 'text-gray-600 bg-gray-50/40'
                  }`}
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const DataDisplayUiKit: React.FC<DataDisplayUiKitProps> = ({ activeSubJump }) => {
  const {
    setActiveDemoModal,
    setIsBottomSheetDemoOpen,
    setActiveDrawerSpec,
    triggerToast,
  } = useApp();

  // Tooltip & Popovers
  const [tooltipHover, setTooltipHover] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState<'basic' | 'dismiss' | null>(null);
  const basicPopoverRef = useRef<HTMLDivElement>(null);
  const dismissPopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popoverOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverOpen === 'basic' && basicPopoverRef.current && !basicPopoverRef.current.contains(target)) {
        setPopoverOpen(null);
      } else if (popoverOpen === 'dismiss' && dismissPopoverRef.current && !dismissPopoverRef.current.contains(target)) {
        setPopoverOpen(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopoverOpen(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [popoverOpen]);

  // Modal Size selector
  const [modalSizePreview, setModalSizePreview] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  // Carousel independent indices for stacked sections
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [swiperIdx, setSwiperIdx] = useState(1);
  const [cardCarouselIdx, setCardCarouselIdx] = useState(0);
  const [autoHeightIdx, setAutoHeightIdx] = useState(0);
  const carouselSlides = [
    {
      title: 'Kalkulus Differensial Lanjut',
      desc: 'Sesi video materi pembelajaran dan slide presentasi bab 4 beserta soal latihan.',
      bg: 'bg-[#FEF1F5] text-[#9D113C] border-[#FBC2D4]',
      tag: 'Matematika Peminatan',
    },
    {
      title: 'Praktikum Induksi Magnetik',
      desc: 'Panduan eksperimen Lab Fisika B dengan demonstrasi osiloskop digital serta pengamatan medan magnetik secara langsung di ruang lab.',
      bg: 'bg-[#FFF5E6] text-[#8C5811] border-[#FAD7A0]',
      tag: 'Fisika Terapan',
    },
    {
      title: 'Analisis Puisi Modernis & Majas',
      desc: 'Kumpulan antologi sastra modern dan standar sitasi penulisan esai format MLA.',
      bg: 'bg-[#E6F9F0] text-[#146C43] border-[#A3E4C6]',
      tag: 'Sastra Indonesia',
    },
  ];

  // Collapse
  const [collapseVertical, setCollapseVertical] = useState(true);
  const [collapseHorizontal, setCollapseHorizontal] = useState(true);

  // List Group
  const [listActiveTab, setListActiveTab] = useState(0);
  const [listChecks, setListChecks] = useState([true, false, true]);

  // Ribbon color
  const [ribbonColor, setRibbonColor] = useState<'primary' | 'emerald' | 'rose' | 'amber'>('primary');

  // Callout dismissible
  const [calloutDismissed, setCalloutDismissed] = useState(false);

  // Gallery selection
  const [galleryActive, setGalleryActive] = useState<string | null>(null);

  // Modal / Drawer State
  const [controlledOverlayOpen, setControlledOverlayOpen] = useState(true);
  const [drawerDraftText, setDrawerDraftText] = useState('Silabus Fisika Terapan');
  const [drawerDirtyConfirm, setDrawerDirtyConfirm] = useState(false);
  const [overlaySubmitting, setOverlaySubmitting] = useState(false);
  const [stackedLayerDepth, setStackedLayerDepth] = useState<0 | 1 | 2>(1);

  // Evolved Pattern States (Motion Accordion, Checklist Card, Widening 3-Col Carousel)
  const [motionAccOpen, setMotionAccOpen] = useState(true);
  const [motionAccSettled, setMotionAccSettled] = useState(true);
  const [checklistItems, setChecklistItems] = useState([
    { id: 'chk-1', label: 'Verifikasi token warna Primary Rose (#ee2e65)', done: true },
    { id: 'chk-2', label: 'Audit tinggi seragam CTA pill h-9 & 1-kata mobile', done: true },
    { id: 'chk-3', label: 'Sinkronkan spring PageTransition lintas breakpoint', done: false },
  ]);
  const [newCheckTask, setNewCheckTask] = useState('');
  const [widenCol, setWidenCol] = useState<0 | 1 | 2>(1);
  const [widenPage, setWidenPage] = useState(0);
  const [widenDir, setWidenDir] = useState<1 | -1>(1);

  const widenPages = [
    {
      period: 'Sprint W1 · Foundation',
      cols: [
        { title: 'Tokens & Grid', metric: '98%', pct: 14, sub: '14/14 bars' },
        { title: 'Buttons & CTAs', metric: '92%', pct: 13, sub: '13/14 bars' },
        { title: 'Mobile Motion', metric: '86%', pct: 12, sub: '12/14 bars' },
      ],
    },
    {
      period: 'Sprint W2 · Unification',
      cols: [
        { title: 'Tokens & Grid', metric: '100%', pct: 14, sub: '14/14 bars' },
        { title: 'Buttons & CTAs', metric: '96%', pct: 13, sub: '13/14 bars' },
        { title: 'Mobile Motion', metric: '93%', pct: 13, sub: '13/14 bars' },
      ],
    },
  ];

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') === itemKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  return (
    <div className="space-y-10 print-section">
      {/* 2.1 AVATAR */}
      {isVisible('avatar') && (
        <UiDocPage
          title="Avatar"
          subLinks={[
            { id: 'av-shapes', label: 'Shapes' },
            { id: 'av-sizing', label: 'Sizing' },
            { id: 'av-indicators', label: 'Indicators on avatar' },
            { id: 'av-badge', label: 'Badge on avatar' },
            { id: 'av-initials', label: 'Avatar with initials' },
            { id: 'av-icons', label: 'Avatar with Icons' },
            { id: 'av-inv-initials', label: 'Inverse initials' },
            { id: 'av-inv-icons', label: 'Inverse icons' },
            { id: 'av-logo', label: 'Avatar with logo' },
            { id: 'av-groups', label: 'Groups' },
          ]}
        >
          <UiDocSection
            id="av-shapes"
            title="Shapes"
            classesHint="rounded-none rounded-xl rounded-full"
            codeSnippet={`<div className="w-10 h-10 rounded-none bg-primary-600 text-white">SQ</div>\n<div className="w-10 h-10 rounded-xl bg-primary-600 text-white">RD</div>\n<div className="w-10 h-10 rounded-full bg-primary-600 text-white">CR</div>`}
          >
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <div className="text-center space-y-1.5">
                <div className="w-11 h-11 rounded-none bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center mx-auto">SQ</div>
                <span className="text-gray-500 block">Square</span>
              </div>
              <div className="text-center space-y-1.5">
                <div className="w-11 h-11 rounded-xl bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center mx-auto">RD</div>
                <span className="text-gray-500 block">Rounded</span>
              </div>
              <div className="text-center space-y-1.5">
                <div className="w-11 h-11 rounded-full bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center mx-auto">CR</div>
                <span className="text-gray-500 block">Circle</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-sizing"
            title="Sizing"
            classesHint="w-6..w-[72px]"
            codeSnippet={`<div className="w-6 h-6 rounded-full">XS</div>\n<div className="w-12 h-12 rounded-full">LG</div>`}
          >
            <div className="flex flex-wrap items-end gap-5 text-xs">
              {[
                { label: 'xs (24px)', cls: 'w-6 h-6 text-[9px]' },
                { label: 'sm (32px)', cls: 'w-8 h-8 text-[11px]' },
                { label: 'md (40px)', cls: 'w-10 h-10 text-xs' },
                { label: 'lg (48px)', cls: 'w-12 h-12 text-sm' },
                { label: 'xl (56px)', cls: 'w-14 h-14 text-base' },
                { label: 'xxl (72px)', cls: 'w-[72px] h-[72px] text-lg' },
              ].map((s) => (
                <div key={s.label} className="text-center space-y-1.5">
                  <div className={`${s.cls} rounded-full bg-primary-600 text-white font-bold flex items-center justify-center mx-auto`}>
                    JW
                  </div>
                  <span className="text-gray-500 font-mono tabular-nums block">{s.label}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-indicators"
            title="Indicators on avatar"
            classesHint="absolute bottom-0 right-0 ring-2 ring-white rounded-full"
            codeSnippet={`<div className="relative inline-block">\n  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center">JW</div>\n  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-white" />\n</div>`}
          >
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="relative inline-block">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center">JW</div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-white" />
                </div>
                <span className="text-gray-600">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative inline-block">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center">SA</div>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute bottom-0 right-0 ring-2 ring-white" />
                </div>
                <span className="text-gray-600">Away</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative inline-block">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center">EC</div>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute bottom-0 right-0 ring-2 ring-white" />
                </div>
                <span className="text-gray-600">Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative inline-block">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center">BW</div>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400 absolute bottom-0 right-0 ring-2 ring-white" />
                </div>
                <span className="text-gray-600">Offline</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-badge"
            title="Badge on avatar"
            classesHint="px-1.5 py-0.5 rounded-full bg-rose-600 text-white absolute -top-1.5 -right-2 ring-2 ring-white"
            codeSnippet={`<div className="relative inline-block">\n  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">BW</div>\n  <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold absolute -top-1.5 -right-2 ring-2 ring-white">4</span>\n</div>`}
          >
            <div className="flex flex-wrap items-center gap-7 text-xs">
              <div className="relative inline-block">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">BW</div>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold absolute -top-1.5 -right-2 ring-2 ring-white tabular-nums">4</span>
              </div>
              <div className="relative inline-block">
                <div className="w-11 h-11 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center">RS</div>
                <span className="px-1.5 py-0.5 rounded bg-primary-600 text-white text-[10px] font-bold absolute -bottom-1 -right-1 ring-2 ring-white">PRO</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-initials"
            title="Avatar with initials"
            classesHint="bg-[#FEF1F5] text-[#9D113C] rounded-full font-bold"
            codeSnippet={`<div className="w-10 h-10 rounded-full bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center">HW</div>`}
          >
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
              <div className="w-10 h-10 rounded-full bg-[#FEF1F5] text-[#9D113C] flex items-center justify-center">HW</div>
              <div className="w-10 h-10 rounded-full bg-[#E6F9F0] text-[#146C43] flex items-center justify-center">SA</div>
              <div className="w-10 h-10 rounded-full bg-[#FFF5E6] text-[#8C5811] flex items-center justify-center">EC</div>
              <div className="w-10 h-10 rounded-full bg-[#FFECEB] text-[#942922] flex items-center justify-center">JW</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-icons"
            title="Avatar with Icons"
            classesHint="bg-[#E6F9F0] text-[#146C43] rounded-full"
            codeSnippet={`<div className="w-10 h-10 rounded-full bg-[#E6F9F0] text-[#146C43] flex items-center justify-center"><User className="w-5 h-5" /></div>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F9F0] text-[#146C43] flex items-center justify-center"><User className="w-5 h-5" /></div>
              <div className="w-10 h-10 rounded-full bg-[#FEF1F5] text-[#9D113C] flex items-center justify-center"><BookOpen className="w-5 h-5" /></div>
              <div className="w-10 h-10 rounded-full bg-[#FFF5E6] text-[#8C5811] flex items-center justify-center"><Award className="w-5 h-5" /></div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-inv-initials"
            title="Inverse initials"
            classesHint="bg-gray-900 text-white rounded-full font-bold"
            codeSnippet={`<div className="w-10 h-10 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center">RS</div>`}
          >
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center">RS</div>
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center">JW</div>
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">SA</div>
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center">AL</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-inv-icons"
            title="Inverse icons"
            classesHint="bg-primary-600 text-white rounded-full"
            codeSnippet={`<div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center"><Shield className="w-5 h-5" /></div>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center"><Shield className="w-5 h-5" /></div>
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center"><User className="w-5 h-5" /></div>
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-logo"
            title="Avatar with logo"
            classesHint="w-10 h-10 rounded-xl bg-white border border-gray-300 font-black"
            codeSnippet={`<div className="w-10 h-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-black text-primary-600">S·OS</div>`}
          >
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-black text-primary-600 shadow-2xs">S·OS</div>
              <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black">302</div>
              <div className="w-11 h-11 rounded-full bg-[#FEF1F5] text-[#9D113C] border border-[#FDE0E9] flex items-center justify-center font-black">LAB</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="av-groups"
            title="Groups"
            classesHint="flex items-center -space-x-2.5 ring-2 ring-white"
            codeSnippet={`<div className="flex items-center -space-x-2.5">\n  <span className="w-9 h-9 rounded-full bg-primary-600 text-white ring-2 ring-white">JW</span>\n  <span className="w-9 h-9 rounded-full bg-gray-900 text-white ring-2 ring-white">+19</span>\n</div>`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center -space-x-2.5 text-xs">
                <span className="w-9 h-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center ring-2 ring-white">JW</span>
                <span className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center ring-2 ring-white">SA</span>
                <span className="w-9 h-9 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center ring-2 ring-white">EC</span>
                <span className="w-9 h-9 rounded-full bg-gray-900 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white tabular-nums">+19</span>
              </div>
              <span className="text-xs text-gray-500">22 peserta terdaftar di Class 302</span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.2 ACCORDION */}
      {isVisible('accordion') && (
        <UiDocPage
          title="Accordion"
          subLinks={[
            ...ACCORDION_VARIANTS.map((v) => ({ id: v.id, label: v.key })),
            { id: 'acc-motion', label: 'Motion Accordion (AnimatePresence)' },
          ]}
        >
          {ACCORDION_VARIANTS.map((variant) => (
            <UiDocSection
              key={variant.id}
              id={variant.id}
              title={variant.key}
              classesHint={variant.classesHint}
              codeSnippet={variant.codeSnippet}
            >
              <AccordionVariantPreview variant={variant.key} />
            </UiDocSection>
          ))}

          <UiDocSection
            id="acc-motion"
            title="Motion Accordion (AnimatePresence)"
            description="Pola akordion modern berbasis Motion AnimatePresence (height: 0 -> 'auto' dengan Spring physics + blur settle + --ease-out) dan state settled untuk membuka overflow-visible setelah transisi selesai."
            classesHint="AnimatePresence initial={false} / motion.div height: 'auto' + Spring & overflow toggle"
            codeSnippet={`<AnimatePresence initial={false}>\n  {isOpen && (\n    <motion.div\n      initial={{ opacity: 0, height: 0, filter: 'blur(3px)' }}\n      animate={{\n        opacity: 1,\n        height: 'auto',\n        filter: 'blur(0px)',\n        transition: {\n          height: { type: 'spring', stiffness: 420, damping: 30, mass: 0.8 },\n          opacity: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },\n        },\n      }}\n      exit={{ opacity: 0, height: 0, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}\n      onAnimationComplete={() => setSettled(true)}\n      style={{ overflow: settled ? 'visible' : 'hidden' }}\n    >\n      {children}\n    </motion.div>\n  )}\n</AnimatePresence>`}
          >
            <div className="max-w-lg rounded-2xl border border-black/[0.12] bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  playUiMotionSound('tick');
                  if (motionAccOpen) setMotionAccSettled(false);
                  setMotionAccOpen((v) => !v);
                }}
                aria-expanded={motionAccOpen}
                className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left bg-[#FAFBFD] hover:bg-[#F4F5F8] cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-7 h-7 rounded-xl bg-[#FEF1F5] text-[#ee2e65] flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-[#1C1D21] truncate">
                      Join Live Session via Code
                    </div>
                    <div className="text-[11px] text-[#646772] truncate">
                      Height spring auto-measure · {motionAccSettled ? 'overflow: visible' : 'animating'}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-[#646772] shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    motionAccOpen ? 'rotate-90 text-[#ee2e65]' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {motionAccOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, filter: 'blur(3px)' }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                      filter: 'blur(0px)',
                      transition: {
                        height: { type: 'spring', stiffness: 420, damping: 30, mass: 0.8 },
                        opacity: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                        filter: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      filter: 'blur(2px)',
                      transition: {
                        height: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                        opacity: { duration: 0.14, ease: [0.23, 1, 0.32, 1] },
                        filter: { duration: 0.14, ease: [0.23, 1, 0.32, 1] },
                      },
                    }}
                    onAnimationStart={() => setMotionAccSettled(false)}
                    onAnimationComplete={() => setMotionAccSettled(true)}
                    style={{ overflow: motionAccSettled ? 'visible' : 'hidden' }}
                  >
                    <div className="px-4 py-3.5 border-t border-black/[0.12] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[#5A5D67]">
                        Masukkan kode 6-digit untuk bergabung secara real-time.
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerToast('Motion Accordion', 'Aksi di dalam panel akordion berhasil.', 'success')}
                        className={ACTION_BTN_PRIMARY}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Join Session</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.3 BADGES */}
      {isVisible('badges') && (
        <UiDocPage
          title="Badges"
          subLinks={[
            { id: 'bdg-ctx', label: 'Contextual variations' },
            { id: 'bdg-pill', label: 'Pill badges' },
            { id: 'bdg-outline', label: 'Outline badges' },
            { id: 'bdg-soft', label: 'Soft badges' },
            { id: 'bdg-link', label: 'Link Badges' },
            { id: 'bdg-sizes', label: 'Sizes' },
            { id: 'bdg-ind', label: 'Badge indicator' },
            { id: 'bdg-icon', label: 'Badge with icon' },
            { id: 'bdg-ind-sizes', label: 'Badge indicator sizes' },
            { id: 'bdg-with-ind', label: 'Badge with indicator' },
            { id: 'bdg-headings', label: 'Badges with headings' },
            { id: 'bdg-status', label: 'Badge status' },
            { id: 'bdg-button', label: 'Button badges' },
          ]}
        >
          <UiDocSection id="bdg-ctx" title="Contextual variations" classesHint="bg-primary-600 bg-emerald-600 bg-amber-500 bg-rose-600 bg-gray-900" codeSnippet={`<span className="px-2.5 py-0.5 rounded-md bg-primary-600 text-white text-xs font-semibold">Primary</span>`}>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-0.5 rounded-md bg-primary-600 text-white">Primary</span>
              <span className="px-2.5 py-0.5 rounded-md bg-gray-600 text-white">Secondary</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white">Success</span>
              <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white">Danger</span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-white">Warning</span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-500 text-white">Info</span>
              <span className="px-2.5 py-0.5 rounded-md bg-gray-900 text-white">Dark</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-pill" title="Pill badges" classesHint="rounded-full" codeSnippet={`<span className="px-3 py-0.5 rounded-full bg-primary-600 text-white text-xs font-semibold">Primary</span>`}>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-0.5 rounded-full bg-primary-600 text-white">Primary</span>
              <span className="px-3 py-0.5 rounded-full bg-emerald-600 text-white">Success</span>
              <span className="px-3 py-0.5 rounded-full bg-rose-600 text-white">Danger</span>
              <span className="px-3 py-0.5 rounded-full bg-amber-500 text-white">Warning</span>
              <span className="px-3 py-0.5 rounded-full bg-gray-900 text-white">Dark</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-outline" title="Outline badges" classesHint="border border-primary-500 text-primary-700" codeSnippet={`<span className="px-2.5 py-0.5 rounded-md border border-primary-500 text-primary-700">Primary</span>`}>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-0.5 rounded-md border border-primary-500 text-primary-700">Primary</span>
              <span className="px-2.5 py-0.5 rounded-md border border-emerald-500 text-emerald-700">Success</span>
              <span className="px-2.5 py-0.5 rounded-md border border-rose-500 text-rose-700">Danger</span>
              <span className="px-2.5 py-0.5 rounded-md border border-amber-500 text-amber-700">Warning</span>
              <span className="px-2.5 py-0.5 rounded-md border border-gray-800 text-gray-900">Dark</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-soft" title="Soft badges" classesHint="bg-[#FEF1F5] text-[#9D113C] / bg-emerald-50 text-emerald-700" codeSnippet={`<span className="px-2.5 py-0.5 rounded-md bg-[#FEF1F5] text-[#9D113C] font-semibold">Soft Primary</span>`}>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-0.5 rounded-md bg-[#FEF1F5] text-[#9D113C]">Soft Primary</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700">Soft Success</span>
              <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700">Soft Danger</span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800">Soft Warning</span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700">Soft Info</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-link" title="Link Badges" classesHint="hover:opacity-85 hover:underline cursor-pointer" codeSnippet={`<a href="#bdg-link" className="px-2.5 py-0.5 rounded-md bg-primary-50 text-primary-700 font-semibold hover:underline">Link Badge ↗</a>`}>
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <a href="#bdg-link" className="px-2.5 py-0.5 rounded-md bg-primary-50 text-primary-700 hover:underline">Primary Link ↗</a>
              <a href="#bdg-link" className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 hover:underline">Success Link ↗</a>
              <a href="#bdg-link" className="px-2.5 py-0.5 rounded-md bg-gray-900 text-white hover:bg-black">Dark Link ↗</a>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-sizes" title="Sizes" classesHint="text-[10px] / text-xs / text-sm" codeSnippet={`<span className="px-1.5 py-0.5 text-[10px]">SM</span>\n<span className="px-2.5 py-0.5 text-xs">MD</span>\n<span className="px-3 py-1 text-sm">LG</span>`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-gray-900 text-white font-semibold">Small (SM)</span>
              <span className="px-2.5 py-0.5 text-xs rounded-md bg-gray-900 text-white font-semibold">Default (MD)</span>
              <span className="px-3.5 py-1 text-sm rounded-md bg-gray-900 text-white font-semibold">Large (LG)</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-ind" title="Badge indicator" classesHint="w-2.5 h-2.5 rounded-full" codeSnippet={`<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />`}>
            <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-icon" title="Badge with icon" classesHint="inline-flex items-center gap-1" codeSnippet={`<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200"><Award className="w-3 h-3" /> Unggulan</span>`}>
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200"><Award className="w-3 h-3" /> Unggulan</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> Terverifikasi</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-ind-sizes" title="Badge indicator sizes" classesHint="w-1.5..w-4 rounded-full" codeSnippet={`<span className="w-2 h-2 rounded-full bg-primary-600" />\n<span className="w-4 h-4 rounded-full bg-primary-600" />`}>
            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary-600" />xs</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary-600" />sm</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-600" />md</span>
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full bg-primary-600" />lg</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-primary-600" />xl</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-with-ind" title="Badge with indicator" classesHint="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" codeSnippet={`<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold">\n  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active Class\n</span>`}>
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active Class</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800"><span className="w-2 h-2 rounded-full bg-amber-500" /> Pending</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800"><span className="w-2 h-2 rounded-full bg-rose-500" /> Needs Support</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-headings" title="Badges with headings" classesHint="flex items-center gap-2" codeSnippet={`<h2 className="text-xl font-bold flex items-center gap-2">Judul H2 <span className="px-2 py-0.5 rounded bg-primary-600 text-white text-xs">New</span></h2>`}>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">Heading H2 <span className="px-2 py-0.5 rounded bg-primary-600 text-white text-xs">New</span></h2>
              <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">Heading H4 <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px]">Hot</span></h4>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-status" title="Badge status" classesHint="inline-flex items-center gap-2 text-xs font-semibold" codeSnippet={`<span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Published</span>`}>
            <div className="flex flex-wrap gap-5 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-emerald-700"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Published</span>
              <span className="inline-flex items-center gap-1.5 text-amber-700"><span className="w-2 h-2 rounded-full bg-amber-500" /> In Review</span>
              <span className="inline-flex items-center gap-1.5 text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-400" /> Draft</span>
            </div>
          </UiDocSection>

          <UiDocSection id="bdg-button" title="Button badges" classesHint="inline-flex items-center gap-2" codeSnippet={`<button className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold flex items-center gap-2">\n  Notifikasi <span className="px-1.5 py-0.5 rounded-full bg-primary-500 text-white text-[10px]">12</span>\n</button>`}>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold flex items-center gap-2">
                <span>Notifikasi</span>
                <span className="px-1.5 py-0.5 rounded-full bg-primary-500 text-white text-[10px] tabular-nums">12</span>
              </button>
              <button type="button" className="px-3.5 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-xs font-semibold flex items-center gap-2">
                <span>Pesan Masuk</span>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] tabular-nums">5</span>
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.4 ADVANCED BADGES */}
      {isVisible('advancedbadges') && (
        <UiDocPage
          title="Advanced Badges"
          description="Lencana terstruktur yang dipisahkan berdasarkan fungsinya: badge status proses, penghitung jumlah notifikasi, lencana penghargaan belajar, dan badge identitas pengguna."
          subLinks={[
            { id: 'adv-status', label: 'Badge Status' },
            { id: 'adv-notif', label: 'Jumlah Notifikasi' },
            { id: 'adv-award', label: 'Penghargaan Belajar' },
            { id: 'adv-avatar', label: 'Avatar Badges' },
          ]}
        >
          <UiDocSection
            id="adv-status"
            title="Badge Status"
            classesHint="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold"
            codeSnippet={`<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">\n  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />\n  <span>Aktif</span>\n</span>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aktif</span>
                </span>
                <p className="text-[11px] text-gray-500">Materi sudah dipublikasikan dan dapat dibuka siswa.</p>
              </div>
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Menunggu Review</span>
                </span>
                <p className="text-[11px] text-gray-500">Draf soal sedang diperiksa oleh koordinator bidang.</p>
              </div>
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-50 text-primary-800 border border-primary-200 font-semibold">
                  <FileText className="w-3.5 h-3.5 text-primary-600" />
                  <span>Selesai</span>
                </span>
                <p className="text-[11px] text-gray-500">Seluruh rangkaian latihan dan kuis telah dituntaskan.</p>
              </div>
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 border border-gray-300 font-semibold">
                  <Archive className="w-3.5 h-3.5 text-gray-500" />
                  <span>Diarsipkan</span>
                </span>
                <p className="text-[11px] text-gray-500">Arsip semester lalu; hanya tersedia dalam mode baca.</p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="adv-notif"
            title="Jumlah Notifikasi (Counter)"
            classesHint="relative inline-flex / tabular-nums rounded-full"
            codeSnippet={`<button className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white">\n  <Bell className="w-4 h-4" />\n  <span>Notifikasi</span>\n  <span className="px-1.5 py-0.5 rounded-full bg-primary-600 text-white text-[11px] font-bold tabular-nums">3</span>\n</button>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-gray-300 bg-white space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-300 font-semibold text-gray-800">
                  <Bell className="w-3.5 h-3.5 text-gray-600" />
                  <span>Pesan Masuk</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-primary-600 text-white text-[10px] font-bold tabular-nums">
                    3
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">3 pertanyaan baru dari siswa kelas 12.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-300 bg-white space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-300 font-semibold text-gray-800">
                  <FileText className="w-3.5 h-3.5 text-gray-600" />
                  <span>Perlu Dinilai</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold tabular-nums">
                    12
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">12 lembar jawaban menunggu koreksi pengajar.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-300 bg-white space-y-2.5">
                <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-300 font-semibold text-gray-800">
                  <Inbox className="w-3.5 h-3.5 text-gray-600" />
                  <span>Kotak Arsip</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-gray-900 text-white text-[10px] font-bold tabular-nums">
                    99+
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">Batas tampilan angka maksimum untuk antrean di atas 99 item.</p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="adv-award"
            title="Penghargaan (Pencapaian Belajar)"
            classesHint="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold"
            codeSnippet={`<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">\n  <Award className="w-3.5 h-3.5" /> Mahir · 10 Modul\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-300 font-semibold">
                  <Award className="w-3.5 h-3.5 text-gray-600" />
                  <span>Pemula</span>
                </span>
                <p className="text-[11px] text-gray-500">Menyelesaikan 1 modul pengantar beserta kuis awal.</p>
              </div>
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                  <Award className="w-3.5 h-3.5 text-sky-600" />
                  <span>Terampil</span>
                </span>
                <p className="text-[11px] text-gray-500">Lulus 5 modul inti dengan nilai latihan minimal 75.</p>
              </div>
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mahir</span>
                </span>
                <p className="text-[11px] text-gray-500">Menuntaskan 10 modul dengan rata-rata skor ≥ 85.</p>
              </div>
              <div className="p-3 rounded-xl border border-gray-300 bg-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-50 text-primary-800 border border-primary-200 font-semibold">
                  <Award className="w-3.5 h-3.5 text-primary-600" />
                  <span>Kehormatan</span>
                </span>
                <p className="text-[11px] text-gray-500">Seluruh tugas tepat waktu dengan nilai akhir ≥ 90.</p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="adv-avatar"
            title="Avatar Badges (Identitas Pengguna)"
            classesHint="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border"
            codeSnippet={`<div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-900 font-semibold">\n  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">HW</span>\n  <span>Dr. Hendra W. · Pengajar</span>\n</div>`}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-900 font-semibold">
                <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                  HW
                </span>
                <span>Dr. Hendra W. · Pengajar</span>
              </div>
              <div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-800 font-semibold">
                <span className="w-5 h-5 rounded-full bg-gray-700 text-white text-[10px] font-bold flex items-center justify-center">
                  NP
                </span>
                <span>Nadia P. · Ketua Kelas</span>
              </div>
              <div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  RA
                </span>
                <span>Rina A. · Asisten Lab</span>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.5 TOOLTIP */}
      {isVisible('tooltip') && (
        <UiDocPage
          title="Tooltip"
          subLinks={[
            { id: 'tip-basic', label: 'Basic examples' },
            { id: 'tip-disabled', label: 'Disabled elements' },
          ]}
        >
          <UiDocSection
            id="tip-basic"
            title="Basic examples"
            classesHint="relative inline-block / bg-gray-900 text-white"
            codeSnippet={`<div className="relative inline-block">\n  <button onMouseEnter={() => setHover('top')}>Top</button>\n  {hover === 'top' && <div className="absolute -top-8 px-2 py-1 rounded bg-gray-900 text-white text-xs">Tooltip top</div>}\n</div>`}
          >
            <div className="flex flex-wrap gap-3 text-xs py-4">
              {(['top', 'right', 'bottom', 'left'] as const).map((dir) => (
                <div key={dir} className="relative inline-block">
                  <button
                    onMouseEnter={() => setTooltipHover(dir)}
                    onMouseLeave={() => setTooltipHover(null)}
                    className="px-3.5 py-1.5 rounded-lg border border-gray-300 font-medium capitalize hover:bg-gray-50 cursor-pointer"
                  >
                    Tooltip on {dir}
                  </button>
                  {tooltipHover === dir && (
                    <div
                      className={`absolute px-2.5 py-1 rounded bg-gray-900 text-white text-[11px] whitespace-nowrap z-30 shadow-md ${
                        dir === 'top'
                          ? '-top-8 left-1/2 -translate-x-1/2 animate-ui-pop-up'
                          : dir === 'bottom'
                          ? '-bottom-8 left-1/2 -translate-x-1/2 animate-ui-pop'
                          : dir === 'left'
                          ? 'right-full mr-2 top-1/2 -translate-y-1/2 animate-ui-pop-left'
                          : 'left-full ml-2 top-1/2 -translate-y-1/2 animate-ui-pop-right'
                      }`}
                    >
                      Tooltip {dir}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="tip-disabled"
            title="Disabled elements"
            description="Bungkus tombol disabled di dalam kontainer pembungkus agar tooltip penjelasan tetap dapat dipicu saat hover."
            classesHint="relative inline-block / cursor-not-allowed"
            codeSnippet={`<div className="relative inline-block" onMouseEnter={show}>\n  <button disabled className="cursor-not-allowed">Disabled button</button>\n</div>`}
          >
            <div className="py-3">
              <div
                className="relative inline-block"
                onMouseEnter={() => setTooltipHover('disabled')}
                onMouseLeave={() => setTooltipHover(null)}
              >
                <button disabled className="px-3.5 py-1.5 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 text-xs font-medium cursor-not-allowed">
                  Disabled button
                </button>
                {tooltipHover === 'disabled' && (
                  <div className="animate-ui-pop-up absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-gray-900 text-white text-[11px] whitespace-nowrap z-30">
                    Tombol dinonaktifkan (Tooltip aktif)
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.6 POPOVERS */}
      {isVisible('popovers') && (
        <UiDocPage
          title="Popovers"
          subLinks={[
            { id: 'pop-basic', label: 'Basic examples' },
            { id: 'pop-disabled', label: 'Disabled elements' },
            { id: 'pop-dismiss', label: 'Dismiss on next clicks' },
          ]}
        >
          <UiDocSection
            id="pop-basic"
            title="Basic examples"
            classesHint="w-64 bg-white rounded-xl shadow-xl border border-gray-300 p-3.5"
            codeSnippet={`<button onClick={() => setOpen(!open)}>Toggle Popover</button>`}
          >
            <div className="pb-20">
              <div ref={basicPopoverRef} className="relative inline-block">
                <button
                  onClick={() => setPopoverOpen(popoverOpen === 'basic' ? null : 'basic')}
                  className="px-3.5 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Click to toggle popover
                </button>
                {popoverOpen === 'basic' && (
                  <div className="animate-ui-pop absolute left-0 top-11 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-300 p-3.5 z-30 space-y-1 text-xs">
                    <div className="font-bold text-gray-900">Popover Title</div>
                    <p className="text-gray-600 leading-relaxed">Panel konten melayang untuk menampilkan ringkasan detail bab atau profil siswa.</p>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="pop-disabled"
            title="Disabled elements"
            description="Menampilkan popover penjelasan pada wrapper elemen yang sedang dalam keadaan disabled."
            classesHint="inline-block pointer-events-auto"
            codeSnippet={`<span className="inline-block" title="Disabled popover"><button disabled>Disabled button</button></span>`}
          >
            <div className="text-xs">
              <button disabled className="px-3.5 py-2 rounded-lg bg-gray-100 text-gray-500 font-semibold cursor-not-allowed border border-gray-300">
                Disabled button with popover wrapper
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="pop-dismiss"
            title="Dismiss on next clicks"
            description="Popover otomatis tertutup ketika pengguna mengklik area lain di luar tombol (onBlur)."
            classesHint="onBlur={() => setOpen(false)}"
            codeSnippet={`<button onClick={() => setOpen(true)} onBlur={() => setOpen(false)}>Dismissible popover</button>`}
          >
            <div className="pb-20">
              <div ref={dismissPopoverRef} className="relative inline-block">
                <button
                  onClick={() => setPopoverOpen(popoverOpen === 'dismiss' ? null : 'dismiss')}
                  className="px-3.5 py-2 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-200 cursor-pointer"
                >
                  Dismissible popover
                </button>
                {popoverOpen === 'dismiss' && (
                  <div className="animate-ui-pop absolute left-0 top-11 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-300 p-3.5 z-30 space-y-1 text-xs">
                    <div className="font-bold text-gray-900">Dismiss on next click</div>
                    <p className="text-gray-600 leading-relaxed">Klik di mana saja di luar popup untuk menutup popover ini secara otomatis.</p>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.7 MODAL */}
      {isVisible('modal') && (
        <UiDocPage
          title="Modal"
          subLinks={[
            { id: 'mdl-components', label: 'Modal Components' },
            { id: 'mdl-live', label: 'Live demo' },
            { id: 'mdl-scroll', label: 'Scrolling long content' },
            { id: 'mdl-centered', label: 'Vertically centered' },
            { id: 'mdl-sizes', label: 'Optional sizes' },
            { id: 'mdl-elements', label: 'Modal with elements' },
            { id: 'mdl-sheet', label: 'Bottom Sheet' },
          ]}
        >
          <UiDocSection
            id="mdl-components"
            title="Modal Components"
            classesHint="rounded-2xl border border-gray-300 bg-white shadow-lg overflow-hidden max-w-md"
            codeSnippet={`<div className="rounded-2xl border bg-white shadow-lg max-w-md">\n  <div className="px-5 py-3 border-b font-bold">Modal title</div>\n  <div className="p-5 text-sm">Modal body text goes here.</div>\n  <div className="px-5 py-3 border-t flex justify-end gap-2">...</div>\n</div>`}
          >
            <div className="rounded-2xl border border-gray-300 bg-white shadow-md max-w-md overflow-hidden text-xs">
              <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900">Modal title</span>
                <X className="w-4 h-4 text-gray-500" />
              </div>
              <div className="p-5 text-gray-600 leading-relaxed">
                Modal body text goes here. Gunakan dialog ini untuk menampilkan informasi terfokus atau formulir singkat.
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-medium text-gray-700">Close</button>
                <button className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold">Save changes</button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mdl-live"
            title="Live demo"
            classesHint="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50"
            codeSnippet={`<button onClick={() => setActiveDemoModal('live')} className="px-4 py-2 rounded-lg bg-gray-900 text-white">Launch demo modal</button>`}
          >
            <button
              onClick={() => setActiveDemoModal('live')}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-black cursor-pointer"
            >
              Launch demo modal
            </button>
          </UiDocSection>

          <UiDocSection
            id="mdl-scroll"
            title="Scrolling long content"
            description="Modal dengan tinggi konten melebihi viewport sehingga bagian body dapat digulir secara independen."
            classesHint="max-h-[70vh] overflow-y-auto"
            codeSnippet={`<button onClick={() => setActiveDemoModal('scroll')} className="px-4 py-2 rounded-lg border">Launch scrollable modal</button>`}
          >
            <button
              onClick={() => setActiveDemoModal('scroll')}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
            >
              Launch scrollable modal
            </button>
          </UiDocSection>

          <UiDocSection
            id="mdl-centered"
            title="Vertically centered"
            classesHint="fixed inset-0 flex items-center justify-center p-4"
            codeSnippet={`<button onClick={() => setActiveDemoModal('live')}>Vertically centered modal</button>`}
          >
            <button
              onClick={() => {
                triggerToast('Modal Centered', 'Menampilkan modal terpusat vertikal di tengah layar.', 'info');
                setActiveDemoModal('live');
              }}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 cursor-pointer"
            >
              Vertically centered modal
            </button>
          </UiDocSection>

          <UiDocSection
            id="mdl-sizes"
            title="Optional sizes"
            description={`Variasi lebar maksimum dialog modal (Small, Default/MD, Large, Extra Large). Aktif: ${modalSizePreview.toUpperCase()}.`}
            classesHint="max-w-sm / max-w-md / max-w-2xl / max-w-4xl"
            codeSnippet={`<button onClick={() => openWithSize('sm')}>Small modal</button>\n<button onClick={() => openWithSize('lg')}>Large modal</button>\n<button onClick={() => openWithSize('xl')}>Extra large modal</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => {
                    setModalSizePreview(sz);
                    triggerToast('Ukuran Modal', `Pratinjau ukuran modal: ${sz.toUpperCase()}`, 'info');
                    setActiveDemoModal('live');
                  }}
                  className={`px-3.5 py-2 rounded-lg uppercase cursor-pointer ${
                    modalSizePreview === sz ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sz === 'sm' ? 'Small modal' : sz === 'md' ? 'Default modal' : sz === 'lg' ? 'Large modal' : 'Extra large modal'}
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="mdl-elements"
            title="Modal with elements"
            classesHint="space-y-3 / input / badge"
            codeSnippet={`<div className="rounded-2xl border bg-white p-5 space-y-3">\n  <span className="badge">Class 302</span>\n  <input placeholder="Judul materi baru..." />\n</div>`}
          >
            <div className="rounded-2xl border border-gray-300 bg-white shadow-sm max-w-md overflow-hidden text-xs">
              <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                <span className="font-bold text-gray-900">Modal + Embedded Form &amp; Badge</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-[10px]">Class 302</span>
              </div>
              <div className="p-5 space-y-3">
                <input
                  type="text"
                  readOnly
                  value="Kalkulus IV: Integral Lipat"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800"
                />
                <div className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                  <span>Terbitkan notifikasi ke 24 siswa</span>
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mdl-sheet"
            title="Bottom Sheet"
            classesHint="animate-bottom-sheet rounded-t-3xl"
            codeSnippet={`<button onClick={() => setIsBottomSheetDemoOpen(true)}>Launch Bottom Sheet</button>`}
          >
            <button
              onClick={() => setIsBottomSheetDemoOpen(true)}
              className="px-4 py-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 cursor-pointer"
            >
              Launch Bottom Sheet
            </button>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.8 CARDS */}
      {isVisible('cards') && (
        <UiDocPage
          title="Cards"
          subLinks={[
            { id: 'crd-basic', label: 'Card basic' },
            { id: 'crd-header-footer', label: 'Header and Footer' },
            { id: 'crd-titles', label: 'Titles, text, and links' },
            { id: 'crd-kitchen', label: 'Kitchen sink' },
            { id: 'crd-overlay', label: 'Image overlays' },
            { id: 'crd-horizontal', label: 'Horizontal' },
            { id: 'crd-background', label: 'Background and color' },
            { id: 'crd-border', label: 'Border' },
            { id: 'crd-icons', label: 'Card with icons' },
            { id: 'crd-badge', label: 'Card with badge' },
            { id: 'crd-table', label: 'Card with table' },
            { id: 'crd-progress', label: 'Card with progress bar' },
            { id: 'crd-line', label: 'Card with line' },
            { id: 'crd-kpi-strip', label: 'Pastel KPI Metric Strip' },
            { id: 'crd-checklist', label: 'Interactive Checklist Card' },
          ]}
        >
          <UiDocSection id="crd-basic" title="Card basic" classesHint="p-5 rounded-xl border border-gray-300 bg-white max-w-sm" codeSnippet={`<div className="p-5 rounded-xl border border-gray-300 bg-white max-w-sm space-y-2">\n  <h4 className="font-bold text-sm text-gray-900">Turunan fungsi</h4>\n  <p className="text-gray-600">Matematika · Kelas 12 — Memahami aturan rantai dan titik stasioner kurva.</p>\n  <button className={ACTION_BTN_PRIMARY}>Buka materi</button>\n</div>`}>
            <div className="p-5 rounded-xl border border-gray-300 bg-white max-w-sm text-xs space-y-2.5 transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(15,23,42,0.12)]">
              <div className="text-[11px] text-gray-500">Matematika · Kelas 12</div>
              <h4 className="font-bold text-sm text-gray-900">Turunan fungsi</h4>
              <p className="text-gray-600 leading-relaxed">
                Memahami aturan rantai, gradien garis singgung, serta penentuan nilai maksimum dan minimum fungsi.
              </p>
              <button
                type="button"
                onClick={() => triggerToast('Turunan fungsi', 'Membuka modul Matematika · Kelas 12.', 'info')}
                className={ACTION_BTN_PRIMARY}
              >
                Buka materi
              </button>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-header-footer" title="Header and Footer" classesHint="rounded-xl border border-gray-300 overflow-hidden max-w-sm" codeSnippet={`<div className="rounded-xl border overflow-hidden">\n  <div className="px-4 py-2.5 bg-gray-50 border-b font-semibold">Matematika · Kelas 12</div>\n  <div className="p-4">Turunan fungsi</div>\n  <div className="px-4 py-2 bg-gray-50 border-t flex justify-between"><span>12 soal latihan</span><a>Buka materi</a></div>\n</div>`}>
            <div className="rounded-xl border border-gray-300 overflow-hidden max-w-sm text-xs bg-white transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(15,23,42,0.12)]">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 font-semibold text-gray-800 flex justify-between items-center">
                <span>Matematika · Kelas 12</span>
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </div>
              <div className="p-4 space-y-1">
                <div className="font-bold text-sm text-gray-900">Turunan fungsi</div>
                <p className="text-gray-600 leading-relaxed">
                  Ringkasan konsep limit selisih disertai pembahasan soal bertahap untuk persiapan evaluasi.
                </p>
              </div>
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 text-gray-500 flex justify-between items-center tabular-nums">
                <span>12 soal latihan</span>
                <button
                  type="button"
                  onClick={() => triggerToast('Buka materi', 'Membuka Turunan fungsi (Kelas 12).', 'info')}
                  className="text-primary-600 font-semibold hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Buka materi →
                </button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-titles" title="Titles, text, and links" classesHint="space-y-2 max-w-sm" codeSnippet={`<div className="p-4 rounded-xl border border-gray-300 space-y-2">\n  <h4 className="font-bold">Turunan fungsi</h4>\n  <div className="text-gray-500">Matematika · Kelas 12</div>\n  <div className="flex gap-4 text-primary-600"><a>Buka materi</a><a>Unduh latihan</a></div>\n</div>`}>
            <div className="p-4 rounded-xl border border-gray-300 bg-white max-w-sm text-xs space-y-2">
              <h4 className="font-bold text-sm text-gray-900">Turunan fungsi</h4>
              <div className="text-gray-500">Matematika · Kelas 12</div>
              <p className="text-gray-600 leading-relaxed">
                Aplikasi turunan pertama dan uji turunan kedua untuk sketsa grafik kurva polinomial.
              </p>
              <div className="flex gap-4 font-semibold text-primary-600 pt-1">
                <a
                  href="#crd-titles"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast('Buka materi', 'Menampilkan slide Turunan fungsi.', 'info');
                  }}
                  className="hover:underline"
                >
                  Buka materi
                </a>
                <a
                  href="#crd-titles"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast('Unduh latihan', 'Mengunduh PDF latihan Turunan fungsi.', 'success');
                  }}
                  className="hover:underline"
                >
                  Unduh latihan
                </a>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-kitchen" title="Kitchen sink" classesHint="rounded-xl border border-gray-300 overflow-hidden max-w-sm" codeSnippet={`<div className="rounded-xl border overflow-hidden max-w-sm">...</div>`}>
            <div className="rounded-xl border border-gray-300 bg-white overflow-hidden max-w-sm text-xs">
              <div className="p-3.5 bg-[#FEF1F5] text-[#9D113C] font-bold">Turunan fungsi · Paket Belajar</div>
              <div className="divide-y divide-gray-200 text-gray-700">
                <div className="px-3.5 py-2.5 flex justify-between tabular-nums">
                  <span>Video Pembahasan</span>
                  <span className="text-gray-500">18 menit</span>
                </div>
                <div className="px-3.5 py-2.5 flex justify-between tabular-nums">
                  <span>Lembar Latihan PDF</span>
                  <span className="text-gray-500">12 soal</span>
                </div>
              </div>
              <div className="px-3.5 py-2.5 bg-gray-50 border-t border-gray-200 flex justify-between text-primary-600 font-semibold">
                <button
                  type="button"
                  onClick={() => triggerToast('Unduh latihan', 'Lembar latihan diunduh.', 'success')}
                  className="hover:underline cursor-pointer"
                >
                  Unduh latihan
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('Buka materi', 'Membuka paket Turunan fungsi.', 'info')}
                  className="hover:underline cursor-pointer"
                >
                  Buka materi
                </button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-overlay" title="Image overlays" classesHint="relative h-44 rounded-xl overflow-hidden max-w-md" codeSnippet={`<div className="relative h-44 rounded-xl overflow-hidden max-w-md">\n  <img src={thumbnail} alt="Catatan Turunan fungsi" className="absolute inset-0 w-full h-full object-cover" />\n  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />\n  <div className="relative z-10 p-5 text-white">\n    <div className="text-xs text-gray-200">Matematika · Kelas 12 · 18 menit</div>\n    <h4 className="font-bold text-base">Turunan fungsi</h4>\n  </div>\n</div>`}>
            <div className="group relative h-44 rounded-xl overflow-hidden border border-gray-300 bg-gray-900 text-white p-5 flex flex-col justify-end max-w-md text-xs">
              <img
                src={cardOverlayImg}
                alt="Catatan pembelajaran Turunan fungsi Matematika Kelas 12"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
              <div className="relative z-10 space-y-1">
                <div className="text-[11px] text-gray-200 tabular-nums">
                  Matematika · Kelas 12 · 18 menit
                </div>
                <div className="font-bold text-base text-white">Turunan fungsi</div>
                <p className="text-gray-200 leading-snug">
                  Menentukan laju perubahan sesaat dan gradien garis singgung kurva.
                </p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-horizontal" title="Horizontal" classesHint="rounded-xl border overflow-hidden flex h-36 max-w-md" codeSnippet={`<div className="rounded-xl border overflow-hidden flex h-36">\n  <img src={thumbnail} className="w-1/3 h-full object-cover" />\n  <div className="p-4 flex-1">Turunan fungsi</div>\n</div>`}>
            <div className="group rounded-xl border border-gray-300 overflow-hidden flex h-36 max-w-md text-xs bg-white transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(15,23,42,0.12)]">
              <div className="w-1/3 bg-gray-100 shrink-0 overflow-hidden">
                <img
                  src={cardOverlayImg}
                  alt="Thumbnail Turunan fungsi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-sm text-gray-900">Turunan fungsi</div>
                  <p className="text-gray-500 mt-1">Pembahasan aturan perkalian dan pembagian dua fungsi.</p>
                </div>
                <span className="text-[11px] text-gray-500 tabular-nums">Matematika · Kelas 12 · 18 menit</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-background" title="Background and color" classesHint="bg-gray-900 text-white / bg-primary-600 text-white" codeSnippet={`<div className="p-4 rounded-xl bg-gray-900 text-white">Dark Card</div>\n<div className="p-4 rounded-xl bg-primary-600 text-white">Brand Primary Card</div>`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg text-xs">
              <div className="p-4 rounded-xl bg-gray-900 text-white space-y-1.5">
                <div className="font-bold">Dark Background Card</div>
                <p className="text-gray-300">Kartu permukaan gelap untuk ringkasan prioritas.</p>
              </div>
              <div className="p-4 rounded-xl bg-primary-600 text-white space-y-1.5">
                <div className="font-bold">Brand Primary Card</div>
                <p className="text-primary-100">Kartu latar aksen penuh berwarna brand primary (#ee2e65).</p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-border" title="Border" classesHint="border-2 border-primary-500 bg-white" codeSnippet={`<div className="p-4 rounded-xl border-2 border-primary-500">Colored Border Card</div>`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg text-xs">
              <div className="p-4 rounded-xl border-2 border-primary-500 bg-white space-y-1">
                <div className="font-bold text-primary-900">Primary Border Card</div>
                <p className="text-gray-500">Garis tepi tegas 2px primary.</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-white space-y-1">
                <div className="font-bold text-emerald-900">Success Border Card</div>
                <p className="text-gray-500">Garis tepi tegas 2px emerald.</p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-icons" title="Card with icons" classesHint="flex items-center gap-3 p-4 rounded-xl border" codeSnippet={`<div className="p-4 rounded-xl border flex items-center gap-3">...</div>`}>
            <div className="p-4 rounded-xl border border-gray-300 flex items-center gap-3 max-w-sm text-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Turunan fungsi</div>
                <div className="text-gray-500">Matematika · Kelas 12</div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-badge" title="Card with badge" classesHint="rounded-xl border p-4 space-y-2" codeSnippet={`<div className="p-4 rounded-xl border space-y-2"><span className="badge">PRO</span><div>Card with badge</div></div>`}>
            <div className="p-4 rounded-xl border border-primary-200 bg-primary-50/30 max-w-sm text-xs space-y-2">
              <span className="px-2 py-0.5 rounded-full bg-primary-600 text-white text-[10px] font-bold">Featured Module</span>
              <div className="font-bold text-primary-950 text-sm">Card with Badge Heading</div>
              <p className="text-gray-600">Penekanan kategori modul langsung melalui lencana tersemat.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-table" title="Card with table" classesHint="rounded-xl border border-gray-300 overflow-hidden max-w-sm" codeSnippet={`<div className="rounded-xl border overflow-hidden">\n  <div className="px-3 py-2 bg-gray-50 border-b font-bold">Header</div>\n  <table className="w-full">...</table>\n</div>`}>
            <div className="rounded-xl border border-gray-300 overflow-hidden max-w-sm text-xs">
              <div className="px-3.5 py-2.5 bg-gray-50 border-b border-gray-200 font-bold text-gray-900">Card with Embedded Table</div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-gray-200 tabular-nums">
                  <tr><td className="p-2.5 font-medium">James W.</td><td className="p-2.5 text-right font-bold text-emerald-600">94</td></tr>
                  <tr><td className="p-2.5 font-medium">Sarah A.</td><td className="p-2.5 text-right font-bold text-emerald-600">98</td></tr>
                </tbody>
              </table>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-progress" title="Card with progress bar" classesHint="w-full bg-gray-200 h-2 rounded-full" codeSnippet={`<div className="p-4 rounded-xl border space-y-2"><div>78%</div><div className="h-2 bg-gray-200 rounded-full">...</div></div>`}>
            <div className="p-4 rounded-xl border border-gray-300 max-w-sm text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-gray-900">
                <span>Card with Progress Bar</span>
                <span className="text-primary-600 tabular-nums">78%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-600 h-full w-[78%] rounded-full" />
              </div>
              <p className="text-gray-500">Progres tonton video pembelajaran.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="crd-line" title="Card with line" classesHint="border-t-4 border-t-[#ee2e65] border border-gray-300" codeSnippet={`<div className="p-4 rounded-xl border-t-4 border-t-[#ee2e65] border">Card with Line</div>`}>
            <div className="p-4 rounded-xl border-t-4 border-t-[#ee2e65] border border-gray-300 max-w-sm text-xs space-y-2">
              <div className="font-bold text-gray-900 text-sm">Card with Top Line Accent</div>
              <p className="text-gray-500">Kombinasi garis aksen warna di atas untuk membedakan kartu unggulan.</p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="crd-kpi-strip"
            title="Pastel KPI Metric Strip"
            description="Strip 3-kolom hemat ruang yang memadukan palet PASTEL_THEMES dan angka tabular-nums sebagai pengganti kartu KPI terpisah."
            classesHint="rounded-2xl border border-black/[0.12] grid grid-cols-1 sm:grid-cols-3 divide-x"
            codeSnippet={`<div className="rounded-2xl border border-black/[0.12] overflow-hidden grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.12]">\n  <div className={\`p-4 \${PASTEL_THEMES.periwinkle.bg}\`}>...</div>\n  <div className={\`p-4 \${PASTEL_THEMES.mint.bg}\`}>...</div>\n  <div className={\`p-4 \${PASTEL_THEMES.peach.bg}\`}>...</div>\n</div>`}
          >
            <div className="max-w-xl rounded-2xl border border-black/[0.12] overflow-hidden grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.12]">
              <div className={`p-4 ${PASTEL_THEMES.periwinkle.bg}`}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9D113C]">Total Tokens</div>
                <div className="mt-1 kpi-value font-bold text-[#1C1D21]">148</div>
                <div className="mt-0.5 text-[11px] text-[#5A5D67]">12 kategori terstruktur</div>
              </div>
              <div className={`p-4 ${PASTEL_THEMES.mint.bg}`}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#146C43]">Adoption Rate</div>
                <div className="mt-1 kpi-value font-bold text-[#1C1D21]">96.4%</div>
                <div className="mt-0.5 text-[11px] text-[#5A5D67]">Komponen tersinkron</div>
              </div>
              <div className={`p-4 ${PASTEL_THEMES.peach.bg}`}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C5811]">Mobile Parity</div>
                <div className="mt-1 kpi-value font-bold text-[#1C1D21]">100%</div>
                <div className="mt-0.5 text-[11px] text-[#5A5D67]">Touch &amp; Spring Ready</div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="crd-checklist"
            title="Interactive Checklist Card"
            description="Kartu daftar tugas interaktif dengan toggle bundar Primary Rose (#ee2e65), coretan otomatis, dan input pill sebaris untuk menambah item."
            classesHint="rounded-2xl border border-black/[0.12] bg-white p-4 space-y-3"
            codeSnippet={`<form onSubmit={handleAdd} className="flex items-center gap-2">\n  <input className="flex-1 h-9 px-3.5 rounded-full border" placeholder="Tambah langkah..." />\n  <button className={ACTION_BTN_PRIMARY}>Add</button>\n</form>`}
          >
            <div className="max-w-md rounded-2xl border border-black/[0.12] bg-white p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#1C1D21]">Design System QA Checklist</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] font-bold tabular-nums text-[11px]">
                  {checklistItems.filter((i) => i.done).length}/{checklistItems.length}
                </span>
              </div>

              <div className="divide-y divide-black/[0.10]">
                {checklistItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setChecklistItems((prev) =>
                        prev.map((x) => (x.id === item.id ? { ...x, done: !x.done } : x))
                      )
                    }
                    className="w-full py-2.5 flex items-center gap-2.5 text-left cursor-pointer group"
                  >
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        item.done
                          ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                          : 'border-gray-400 bg-white group-hover:border-[#ee2e65]'
                      }`}
                    >
                      {item.done && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                    </span>
                    <span
                      className={`flex-1 transition-colors ${
                        item.done ? 'line-through text-[#646772]' : 'text-[#1C1D21] font-medium'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const txt = newCheckTask.trim();
                  if (!txt) return;
                  setChecklistItems((prev) => [
                    ...prev,
                    { id: `chk-${Date.now()}`, label: txt, done: false },
                  ]);
                  setNewCheckTask('');
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="text"
                  value={newCheckTask}
                  onChange={(e) => setNewCheckTask(e.target.value)}
                  placeholder="Tambah langkah verifikasi..."
                  className="flex-1 min-w-0 h-9 px-3.5 rounded-full border border-black/[0.14] bg-[#FAFBFD] text-xs focus:outline-none focus:border-[#ee2e65]"
                />
                <button type="submit" className={ACTION_BTN_PRIMARY}>
                  <Plus className="w-3.5 h-3.5 shrink-0" />
                  <span>Add</span>
                </button>
              </form>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.9 CAROUSEL */}
      {isVisible('carousel') && (
        <UiDocPage
          title="Carousel"
          subLinks={[
            { id: 'car-bootstrap', label: 'React-Bootstrap Carousel' },
            { id: 'car-swiper', label: 'Basic Swiper Carousel' },
            { id: 'car-responsive', label: 'Responsive Swiper Carousel' },
            { id: 'car-card', label: 'Card Carousel' },
            { id: 'car-autoheight', label: 'Auto Height Carousel' },
            { id: 'car-widening', label: 'Directional Widening 3-Col Carousel & Meter' },
          ]}
        >
          <UiDocSection
            id="car-bootstrap"
            title="React-Bootstrap Carousel"
            classesHint="transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] rounded-xl border p-5"
            codeSnippet={`<div className="p-5 rounded-xl border bg-[#FEF1F5]">\n  <div className="font-bold">{slide.title}</div>\n  <p className="text-xs">{slide.desc}</p>\n</div>`}
            actions={
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCarouselIdx((p) => (p === 0 ? carouselSlides.length - 1 : p - 1))}
                  className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCarouselIdx((p) => (p === carouselSlides.length - 1 ? 0 : p + 1))}
                  className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            }
          >
            <div key={carouselIdx} className={`animate-ui-fade p-5 rounded-xl border transition-all ${carouselSlides[carouselIdx].bg}`}>
              <span className="text-[11px] font-bold uppercase opacity-75 tabular-nums">
                {carouselSlides[carouselIdx].tag} ({carouselIdx + 1}/3)
              </span>
              <div className="font-bold text-base mt-1 text-gray-900">{carouselSlides[carouselIdx].title}</div>
              <p className="text-xs text-gray-700 mt-1">{carouselSlides[carouselIdx].desc}</p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="car-swiper"
            title="Basic Swiper Carousel"
            classesHint="flex items-center justify-center gap-1.5 mt-3"
            codeSnippet={`<div className="p-5 rounded-xl border">\n  <div>{slide.title}</div>\n  <div className="flex gap-1.5 mt-3">{dots}</div>\n</div>`}
            actions={
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setSwiperIdx((p) => (p === 0 ? carouselSlides.length - 1 : p - 1))}
                  className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSwiperIdx((p) => (p === carouselSlides.length - 1 ? 0 : p + 1))}
                  className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            }
          >
            <div>
              <div key={swiperIdx} className={`animate-ui-fade p-5 rounded-xl border transition-all ${carouselSlides[swiperIdx].bg}`}>
                <span className="text-[11px] font-bold uppercase opacity-75">{carouselSlides[swiperIdx].tag}</span>
                <div className="font-bold text-base mt-1 text-gray-900">{carouselSlides[swiperIdx].title}</div>
                <p className="text-xs text-gray-700 mt-1">{carouselSlides[swiperIdx].desc}</p>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSwiperIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                      swiperIdx === idx ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="car-responsive"
            title="Responsive Swiper Carousel"
            classesHint="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            codeSnippet={`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">\n  {slides.map(s => <div className="p-4 rounded-xl border">{s.title}</div>)}\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {carouselSlides.map((s) => (
                <div key={s.title} className={`p-4 rounded-xl border ${s.bg} transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-md`}>
                  <div className="text-[10px] font-bold uppercase opacity-75">{s.tag}</div>
                  <div className="font-bold text-sm mt-1 text-gray-900">{s.title}</div>
                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">{s.desc}</p>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="car-card"
            title="Card Carousel"
            classesHint="rounded-xl border border-gray-300 overflow-hidden"
            codeSnippet={`<div className="rounded-xl border border-gray-300 p-4 flex items-center justify-between">\n  <div>{slide.title}</div>\n</div>`}
            actions={
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCardCarouselIdx((p) => (p === 0 ? carouselSlides.length - 1 : p - 1))}
                  className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCardCarouselIdx((p) => (p === carouselSlides.length - 1 ? 0 : p + 1))}
                  className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            }
          >
            <div key={cardCarouselIdx} className="animate-ui-fade rounded-xl border border-gray-300 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-primary-600">
                  {carouselSlides[cardCarouselIdx].tag}
                </span>
                <div className="font-bold text-sm text-gray-900">{carouselSlides[cardCarouselIdx].title}</div>
                <p className="text-xs text-gray-600">{carouselSlides[cardCarouselIdx].desc}</p>
              </div>
              <button
                type="button"
                onClick={() => triggerToast('Modul Dibuka', carouselSlides[cardCarouselIdx].title, 'info')}
                className={`${ACTION_BTN_PRIMARY} shrink-0`}
              >
                Buka Modul
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="car-autoheight"
            title="Auto Height Carousel"
            classesHint="transition-all duration-[240ms]"
            codeSnippet={`<div className="p-4 rounded-xl border transition-all">{slide.desc}</div>`}
            actions={
              <button
                type="button"
                onClick={() => setAutoHeightIdx((p) => (p + 1) % carouselSlides.length)}
                className="px-2.5 py-1 rounded-md border border-gray-300 text-xs font-medium hover:bg-gray-50 cursor-pointer"
              >
                Slide Berikutnya ({autoHeightIdx + 1}/3)
              </button>
            }
          >
            <div key={autoHeightIdx} className={`animate-ui-fade p-5 rounded-xl border transition-all duration-[240ms] ${carouselSlides[autoHeightIdx].bg}`}>
              <div className="font-bold text-sm text-gray-900">{carouselSlides[autoHeightIdx].title}</div>
              <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">{carouselSlides[autoHeightIdx].desc}</p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="car-widening"
            title="Directional Widening 3-Col Carousel & Meter"
            description="Pola karousel 3-kolom dengan wipe clipPath inset() melebar saat dipilih, navigasi swipe horizontal berarah (onPanEnd), indikator titik, serta meter 14-bar tersegmentasi."
            classesHint="clipPath: inset(...) + onPanEnd swipe + 14-bar vertical segmented meter"
            codeSnippet={`<motion.div\n  animate={{ clipPath: activeCol === idx ? 'inset(0% 0% 0% 0%)' : 'inset(0% 10% 0% 10%)' }}\n  transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}\n>\n  <div className="flex gap-1">{bars.map(b => <span className="h-7 w-1.5 rounded-full" />)}</div>\n</motion.div>`}
            actions={
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setWidenDir(-1);
                    setWidenPage((p) => (p === 0 ? widenPages.length - 1 : p - 1));
                  }}
                  className={ACTION_BTN_SECONDARY}
                >
                  <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWidenDir(1);
                    setWidenPage((p) => (p + 1) % widenPages.length);
                  }}
                  className={ACTION_BTN_PRIMARY}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            }
          >
            <div className="space-y-3">
              <AnimatePresence mode="wait" initial={false} custom={widenDir}>
                <motion.div
                  key={widenPage}
                  custom={widenDir}
                  initial={{ opacity: 0, x: widenDir * 24 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } }}
                  exit={{ opacity: 0, x: widenDir * -24, transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
                  onPanEnd={(_, info) => {
                    if (info.offset.x < -40) {
                      setWidenDir(1);
                      setWidenPage((p) => (p + 1) % widenPages.length);
                    } else if (info.offset.x > 40) {
                      setWidenDir(-1);
                      setWidenPage((p) => (p === 0 ? widenPages.length - 1 : p - 1));
                    }
                  }}
                  className="rounded-2xl border border-black/[0.12] bg-[#FAFBFD] p-4 space-y-3 touch-pan-y select-none"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C1D21]">{widenPages[widenPage].period}</span>
                    <span className="text-[11px] text-[#646772]">Klik kolom untuk memperlebar · Geser untuk ganti</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {widenPages[widenPage].cols.map((col, idx) => {
                      const isExpanded = widenCol === idx;
                      return (
                        <motion.button
                          key={col.title}
                          type="button"
                          onClick={() => setWidenCol(idx as 0 | 1 | 2)}
                          animate={{
                            clipPath: isExpanded ? 'inset(0% 0% 0% 0% round 16px)' : 'inset(2% 2% 2% 2% round 16px)',
                            scale: isExpanded ? 1.02 : 0.985,
                          }}
                          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                          className={`text-left p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                            isExpanded
                              ? 'bg-white border-[#ee2e65]/45 shadow-sm'
                              : 'bg-white/75 border-black/[0.12] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#1C1D21] truncate">{col.title}</span>
                            <span className="text-xs font-bold text-[#ee2e65] tabular-nums shrink-0">{col.metric}</span>
                          </div>
                          {/* 14-Bar Vertical Segmented Meter */}
                          <div className="flex items-end gap-1 mt-3" aria-label={col.sub}>
                            {Array.from({ length: 14 }).map((_, barIdx) => (
                              <span
                                key={barIdx}
                                className={`h-7 flex-1 rounded-full transition-colors ${
                                  barIdx < col.pct ? 'bg-[#31D087]' : 'bg-[#D6DCE5]'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="mt-2 text-[10.5px] text-[#646772] tabular-nums">{col.sub}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-1.5">
                {widenPages.map((pg, idx) => (
                  <button
                    key={pg.period}
                    type="button"
                    aria-label={pg.period}
                    onClick={() => {
                      setWidenDir(idx >= widenPage ? 1 : -1);
                      setWidenPage(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                      widenPage === idx ? 'w-6 bg-[#ee2e65]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.10 COLLAPSE */}
      {isVisible('collapse') && (
        <UiDocPage
          title="Collapse"
          subLinks={[
            { id: 'col-vertical', label: 'Example (Vertical)' },
            { id: 'col-horizontal', label: 'Horizontal' },
          ]}
        >
          <UiDocSection
            id="col-vertical"
            title="Example"
            classesHint="p-3.5 rounded-xl border border-gray-300"
            codeSnippet={`<button onClick={() => setOpen(!open)}>Toggle Vertical</button>\n{open && <div className="p-3.5 border rounded-xl">Vertical Collapse Content</div>}`}
            actions={
              <button
                onClick={() => setCollapseVertical(!collapseVertical)}
                className="px-2.5 py-1 rounded-md bg-gray-900 text-white text-xs font-medium cursor-pointer"
              >
                {collapseVertical ? 'Tutup' : 'Buka'}
              </button>
            }
          >
            <div className="text-xs">
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  collapseVertical ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-3.5 rounded-xl border border-gray-300 bg-gray-50/70 text-gray-700">
                    <strong>Vertical Collapse:</strong> Konten catatan silabus dapat dibuka-tutup secara vertikal.
                  </div>
                </div>
              </div>
              {!collapseVertical && (
                <span className="animate-ui-fade text-gray-500 block">
                  Panel dalam kondisi tertutup. Klik Buka di kanan atas.
                </span>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="col-horizontal"
            title="Horizontal"
            classesHint="transition-all duration-[240ms] overflow-hidden"
            codeSnippet={`<div className={\`transition-all duration-[240ms] overflow-hidden \${open ? 'w-full p-3.5' : 'w-0 p-0'}\`}>Horizontal Panel</div>`}
            actions={
              <button
                onClick={() => setCollapseHorizontal(!collapseHorizontal)}
                className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-medium cursor-pointer"
              >
                {collapseHorizontal ? 'Tutup' : 'Buka'}
              </button>
            }
          >
            <div className="flex items-center overflow-hidden text-xs min-h-[48px]">
              <div
                className={`transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden rounded-xl border border-primary-200 bg-primary-50/60 text-primary-900 ${
                  collapseHorizontal ? 'w-full p-3.5 opacity-100' : 'w-0 p-0 opacity-0 border-0'
                }`}
              >
                <strong>Horizontal Collapse:</strong> Panel melebar mendatar sesuai ruang yang tersedia.
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.11 LIST GROUP */}
      {isVisible('listgroup') && (
        <UiDocPage
          title="List Group"
          subLinks={[
            { id: 'lg-basic', label: 'Basic List' },
            { id: 'lg-flush', label: 'Flush' },
            { id: 'lg-ctx', label: 'Contextual classes' },
            { id: 'lg-ctx-inv', label: 'Contextual inverse classes' },
            { id: 'lg-horiz', label: 'Horizontal' },
            { id: 'lg-badges', label: 'With badges' },
            { id: 'lg-links', label: 'Links and buttons' },
            { id: 'lg-icons', label: 'With icons' },
            { id: 'lg-checkbox', label: 'With checkbox' },
            { id: 'lg-js', label: 'JavaScript behavior' },
            { id: 'lg-numbered', label: 'Numbered' },
          ]}
        >
          <UiDocSection id="lg-basic" title="Basic List" classesHint="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md" codeSnippet={`<ul className="rounded-xl border divide-y"><li className="px-4 py-2.5">An item</li></ul>`}>
            <ul className="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs">
              <li className="px-4 py-2.5 bg-primary-600 text-white font-semibold rounded-t-xl">Active item</li>
              <li className="px-4 py-2.5 text-gray-800">A second item</li>
              <li className="px-4 py-2.5 text-gray-800">A third item</li>
              <li className="px-4 py-2.5 text-gray-500">Disabled item</li>
            </ul>
          </UiDocSection>

          <UiDocSection id="lg-flush" title="Flush" classesHint="divide-y divide-gray-200 border-y border-gray-300 max-w-md" codeSnippet={`<ul className="divide-y border-y"><li className="py-2.5">Flush item</li></ul>`}>
            <ul className="divide-y divide-gray-200 border-y border-gray-300 max-w-md text-xs text-gray-800">
              <li className="py-2.5">An item (Flush)</li>
              <li className="py-2.5">A second item</li>
              <li className="py-2.5">A third item</li>
            </ul>
          </UiDocSection>

          <UiDocSection id="lg-ctx" title="Contextual classes" classesHint="bg-emerald-50 / bg-amber-50 / bg-rose-50" codeSnippet={`<li className="px-4 py-2.5 bg-emerald-50 text-emerald-900">Success item</li>`}>
            <ul className="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs font-medium overflow-hidden">
              <li className="px-4 py-2.5 bg-primary-50 text-primary-900">Primary contextual item</li>
              <li className="px-4 py-2.5 bg-emerald-50 text-emerald-900">Success contextual item</li>
              <li className="px-4 py-2.5 bg-amber-50 text-amber-900">Warning contextual item</li>
              <li className="px-4 py-2.5 bg-rose-50 text-rose-900">Danger contextual item</li>
            </ul>
          </UiDocSection>

          <UiDocSection id="lg-ctx-inv" title="Contextual inverse classes" classesHint="bg-gray-900 text-white / bg-primary-600 text-white" codeSnippet={`<li className="px-4 py-2.5 bg-gray-900 text-white">Inverse Dark Row</li>`}>
            <ul className="rounded-xl overflow-hidden divide-y divide-white/15 max-w-md text-xs font-semibold text-white">
              <li className="px-4 py-2.5 bg-primary-600">Inverse Primary Row</li>
              <li className="px-4 py-2.5 bg-emerald-600">Inverse Success Row</li>
              <li className="px-4 py-2.5 bg-gray-900">Inverse Dark Row</li>
            </ul>
          </UiDocSection>

          <UiDocSection id="lg-horiz" title="Horizontal" classesHint="flex border border-gray-300 rounded-lg divide-x" codeSnippet={`<div className="flex border rounded-lg divide-x"><div className="flex-1 py-2">Item 1</div></div>`}>
            <div className="flex border border-gray-300 rounded-lg divide-x divide-gray-300 text-center font-medium text-xs max-w-md overflow-hidden">
              <div className="flex-1 py-2.5 bg-gray-50">An item</div>
              <div className="flex-1 py-2.5 bg-gray-50">A second item</div>
              <div className="flex-1 py-2.5 bg-gray-50">A third item</div>
            </div>
          </UiDocSection>

          <UiDocSection id="lg-badges" title="With badges" classesHint="flex items-center justify-between" codeSnippet={`<div className="px-4 py-2.5 flex justify-between">Class 302 <span className="badge">24</span></div>`}>
            <ul className="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs">
              <li className="px-4 py-2.5 flex items-center justify-between"><span>Class 302: Matematika</span><span className="px-2 py-0.5 rounded-full bg-primary-600 text-white font-bold tabular-nums">24</span></li>
              <li className="px-4 py-2.5 flex items-center justify-between"><span>Class 303: Fisika</span><span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold tabular-nums">22</span></li>
            </ul>
          </UiDocSection>

          <UiDocSection id="lg-links" title="Links and buttons" classesHint="w-full text-left px-4 py-2.5 hover:bg-gray-50" codeSnippet={`<button className="w-full text-left px-4 py-2.5 hover:bg-gray-50">Clickable Button Item</button>`}>
            <div className="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs overflow-hidden">
              <button onClick={() => triggerToast('List Action', 'Membuka item tautan aktif.', 'info')} className="w-full text-left px-4 py-2.5 bg-primary-50 text-primary-700 font-semibold transition-colors duration-200 cursor-pointer">The current button item</button>
              <button onClick={() => triggerToast('List Action', 'Membuka item kedua.', 'info')} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors duration-200 text-gray-800 cursor-pointer">A second button item</button>
            </div>
          </UiDocSection>

          <UiDocSection id="lg-icons" title="With icons" classesHint="flex items-center gap-2.5" codeSnippet={`<div className="px-4 py-2.5 flex items-center gap-2.5"><BookOpen className="w-4 h-4 text-primary-600" /> Silabus</div>`}>
            <ul className="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs font-medium">
              <li className="px-4 py-2.5 flex items-center gap-2.5"><BookOpen className="w-4 h-4 text-primary-600" /> Silabus Pembelajaran</li>
              <li className="px-4 py-2.5 flex items-center gap-2.5"><Layers className="w-4 h-4 text-emerald-600" /> Modul Praktikum</li>
            </ul>
          </UiDocSection>

          <UiDocSection id="lg-checkbox" title="With checkbox" classesHint="flex items-center gap-2.5 cursor-pointer" codeSnippet={`<label className="px-4 py-2.5 flex items-center gap-2.5"><input type="checkbox" /> First checkbox</label>`}>
            <div className="rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs">
              {['Class 302: Matematika Peminatan', 'Class 303: Fisika Terapan', 'Class 304: Seni Lukis Modern'].map((label, idx) => (
                <label key={label} className="px-4 py-2.5 flex items-center gap-2.5 hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={listChecks[idx]}
                    onChange={() => {
                      const c = [...listChecks];
                      c[idx] = !c[idx];
                      setListChecks(c);
                    }}
                    className="rounded text-primary-600"
                  />
                  <span className="font-medium text-gray-800">{label}</span>
                </label>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection id="lg-js" title="JavaScript behavior" classesHint="grid grid-cols-12 gap-4" codeSnippet={`<div className="grid grid-cols-12 gap-4">...</div>`}>
            <div className="grid grid-cols-12 gap-4 text-xs">
              <div className="relative col-span-5 grid grid-rows-3 rounded-xl border border-gray-300 divide-y divide-gray-200 overflow-hidden bg-white">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gray-900 transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translate3d(0, ${listActiveTab * 100}%, 0)`,
                  }}
                />
                {['Silabus', 'Video', 'Tugas'].map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setListActiveTab(i)}
                    className={`relative z-10 w-full text-left p-3 font-semibold transition-colors duration-200 cursor-pointer ${
                      listActiveTab === i ? 'text-white' : 'text-gray-700 hover:text-gray-950'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="col-span-7 p-4 rounded-xl border border-gray-300 bg-gray-50/70 text-gray-700 flex items-center">
                <span key={listActiveTab} className="animate-ui-fade">
                  Panel JS Behavior Aktif:{' '}
                  <strong className="text-gray-900">
                    {['Detail Silabus Lengkap', 'Rekaman Video Kuliah', 'Daftar Tugas Mahasiswa'][listActiveTab]}
                  </strong>
                </span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection id="lg-numbered" title="Numbered" classesHint="list-decimal list-inside" codeSnippet={`<ol className="list-decimal list-inside rounded-xl border divide-y"><li className="px-4 py-2.5">First item</li></ol>`}>
            <ol className="list-decimal list-inside rounded-xl border border-gray-300 divide-y divide-gray-200 max-w-md text-xs text-gray-800">
              <li className="px-4 py-2.5">Persiapan Silabus Term 1</li>
              <li className="px-4 py-2.5">Unggah Video Pembelajaran</li>
              <li className="px-4 py-2.5">Evaluasi &amp; Ujian Akhir</li>
            </ol>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.12 RIBBON */}
      {isVisible('ribbon') && (
        <UiDocPage
          title="Ribbon"
          subLinks={[
            { id: 'rib-overhead', label: 'Ribbon overhead' },
            { id: 'rib-over', label: 'Ribbon over' },
            { id: 'rib-touch', label: 'Ribbon touch' },
            { id: 'rib-square', label: 'Ribbon Square' },
            { id: 'rib-icon', label: 'Ribbon with Icon' },
            { id: 'rib-flag', label: 'Ribbon with Flag' },
            { id: 'rib-color', label: 'Color Option' },
          ]}
        >
          <UiDocSection id="rib-overhead" title="Ribbon overhead" classesHint="relative / absolute -top-2.5 left-4 rounded-full" codeSnippet={`<div className="relative p-4 rounded-xl border"><span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-primary-600 text-white text-[10px] font-bold">OVERHEAD</span>...</div>`}>
            <div className="relative p-5 rounded-xl border border-gray-300 bg-gray-50/50 max-w-sm text-xs mt-2">
              <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-primary-600 text-white text-[10px] font-bold">OVERHEAD</div>
              <div className="font-bold text-gray-900">Modul Unggulan</div>
              <p className="text-gray-500 mt-1">Pita berada tepat menumpang di garis tepi atas kartu.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="rib-over" title="Ribbon over" classesHint="relative / absolute top-3 left-3 rounded" codeSnippet={`<div className="relative p-4 rounded-xl border"><span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold">OVER</span></div>`}>
            <div className="relative p-5 pt-10 rounded-xl border border-gray-300 bg-white max-w-sm text-xs">
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">RIBBON OVER</div>
              <div className="font-bold text-gray-900">Materi Terpopuler</div>
              <p className="text-gray-500 mt-1">Ditempatkan di dalam area padding atas kartu.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="rib-touch" title="Ribbon touch" classesHint="absolute top-3 right-0 rounded-l-full" codeSnippet={`<div className="absolute top-3 right-0 pl-3 pr-2.5 py-0.5 rounded-l-full bg-gray-900 text-white">TOUCH</div>`}>
            <div className="relative p-5 rounded-xl border border-gray-300 bg-white max-w-sm text-xs">
              <div className="absolute top-3 right-0 pl-3 pr-2.5 py-0.5 rounded-l-full bg-gray-900 text-white text-[10px] font-bold">TOUCH RIGHT</div>
              <div className="font-bold text-gray-900">Modul Baru</div>
              <p className="text-gray-500 mt-1">Menyentuh batas kanan kontainer kartu secara presisi.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="rib-square" title="Ribbon Square" classesHint="rounded-none" codeSnippet={`<div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-none bg-primary-600 text-white">SQUARE</div>`}>
            <div className="relative p-5 rounded-xl border border-gray-300 bg-gray-50/50 max-w-sm text-xs mt-2">
              <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-none bg-primary-600 text-white text-[10px] font-bold">SQUARE</div>
              <div className="font-bold text-gray-900">Kartu Praktikum</div>
              <p className="text-gray-500 mt-1">Bentuk pita persegi tajam tanpa kelengkungan sudut.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="rib-icon" title="Ribbon with Icon" classesHint="inline-flex items-center gap-1" codeSnippet={`<div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500 text-white"><Award className="w-3 h-3" /> TOP</div>`}>
            <div className="relative p-5 rounded-xl border border-gray-300 bg-white max-w-sm text-xs mt-2">
              <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold inline-flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>FEATURED</span>
              </div>
              <div className="font-bold text-gray-900">Karya Terbaik</div>
              <p className="text-gray-500 mt-1">Menyertakan ikon visual untuk memperjelas arti penanda.</p>
            </div>
          </UiDocSection>

          <UiDocSection id="rib-flag" title="Ribbon with Flag" classesHint="absolute top-3 right-0 flex items-center gap-1" codeSnippet={`<div className="absolute top-3 right-0 pl-2.5 pr-2 py-0.5 bg-rose-600 text-white flex items-center gap-1"><Flag className="w-2.5 h-2.5" /> FLAG</div>`}>
            <div className="relative p-5 rounded-xl border border-gray-300 bg-white max-w-sm text-xs">
              <div className="absolute top-3 right-0 pl-2.5 pr-2 py-0.5 rounded-l-full bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1">
                <Flag className="w-2.5 h-2.5" />
                <span>FLAG</span>
              </div>
              <div className="font-bold text-gray-900">Prioritas Tinggi</div>
              <p className="text-gray-500 mt-1">Penanda perhatian mendesak dengan ikon bendera.</p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rib-color"
            title="Color Option"
            classesHint="bg-primary-600 / bg-emerald-600 / bg-rose-600 / bg-amber-500"
            codeSnippet={`<div className="bg-primary-600 text-white">Primary Ribbon</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {(['primary', 'emerald', 'rose', 'amber'] as const).map((col) => (
                  <button
                    key={col}
                    onClick={() => setRibbonColor(col)}
                    className={`px-2 py-0.5 rounded capitalize font-semibold cursor-pointer ${
                      ribbonColor === col ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            }
          >
            <div className="relative p-5 rounded-xl border border-gray-300 bg-gray-50/60 max-w-sm text-xs mt-2">
              <div
                key={ribbonColor}
                className={`animate-ui-pop absolute -top-2.5 left-4 px-2.5 py-0.5 rounded text-white text-[10px] font-bold uppercase transition-colors ${
                  ribbonColor === 'primary'
                    ? 'bg-primary-600'
                    : ribbonColor === 'emerald'
                    ? 'bg-emerald-600'
                    : ribbonColor === 'rose'
                    ? 'bg-rose-600'
                    : 'bg-amber-500'
                }`}
              >
                {ribbonColor} Ribbon
              </div>
              <div className="font-bold text-gray-900">Tema Warna Dinamis</div>
              <p className="text-gray-500 mt-1">Pilih warna pada tombol kanan atas untuk mengganti warna pita.</p>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.13 DRAWERS */}
      {isVisible('drawers') && (
        <UiDocPage
          title="Drawers"
          subLinks={[
            { id: 'drw-types', label: 'Drawer Types' },
            { id: 'drw-dir', label: 'Direction' },
          ]}
        >
          <UiDocSection
            id="drw-types"
            title="Drawer Types"
            classesHint="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl"
            codeSnippet={`<button onClick={() => setActiveDrawerSpec({ dir: 'right', type: 'Drawer' })}>Open Default Drawer</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button
                onClick={() => setActiveDrawerSpec({ dir: 'right', type: 'Drawer' })}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black cursor-pointer"
              >
                Default Overlay Drawer
              </button>
              <button
                onClick={() => setActiveDrawerSpec({ dir: 'left', type: 'Navigation Drawer' })}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 cursor-pointer"
              >
                Navigation Drawer
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="drw-dir"
            title="Direction"
            classesHint="left / right / top / bottom"
            codeSnippet={`<button onClick={() => setActiveDrawerSpec({ dir: 'left', type: 'Drawer' })}>Drawer: left</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              {(['left', 'right', 'top', 'bottom'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setActiveDrawerSpec({ dir, type: 'Drawer' })}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 cursor-pointer capitalize"
                >
                  Drawer: {dir}
                </button>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.14 OFFCANVAS */}
      {isVisible('offcanvas') && (
        <UiDocPage
          title="Offcanvas"
          subLinks={[
            { id: 'off-demo', label: 'Demo' },
            { id: 'off-place', label: 'Placement' },
          ]}
        >
          <UiDocSection
            id="off-demo"
            title="Demo"
            classesHint="fixed z-50 bg-white border-gray-300 transition-transform"
            codeSnippet={`<button onClick={() => setActiveDrawerSpec({ dir: 'left', type: 'Offcanvas' })}>Launch Offcanvas</button>`}
          >
            <button
              onClick={() => setActiveDrawerSpec({ dir: 'left', type: 'Offcanvas' })}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-black cursor-pointer"
            >
              Launch Offcanvas Demo
            </button>
          </UiDocSection>

          <UiDocSection
            id="off-place"
            title="Placement"
            classesHint="left / right / top / bottom"
            codeSnippet={`<button onClick={() => setActiveDrawerSpec({ dir: 'right', type: 'Offcanvas' })}>Offcanvas: right</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              {(['left', 'right', 'top', 'bottom'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setActiveDrawerSpec({ dir, type: 'Offcanvas' })}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 cursor-pointer capitalize"
                >
                  Offcanvas: {dir}
                </button>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.14B MODAL / DRAWER STATE */}
      {isVisible('modaldrawerstate') && (
        <UiDocPage
          title="Modal / Drawer State"
          description="Pola manajemen state untuk komponen overlay (Modal & Drawer): kontrol buka/tutup eksplisit, proteksi perubahan belum tersimpan, kunci proses simpan, dan tumpukan layer bertingkat."
          subLinks={[
            { id: 'mds-controlled', label: 'Controlled Open / Closed' },
            { id: 'mds-dirty', label: 'Unsaved Changes Guard' },
            { id: 'mds-submitting', label: 'Submitting & Close Lock' },
            { id: 'mds-stacked', label: 'Stacked Overlay Depth' },
          ]}
        >
          <UiDocSection
            id="mds-controlled"
            title="Controlled Open / Closed State"
            classesHint="isOpen: boolean / onClose: () => void"
            codeSnippet={`const [isOpen, setIsOpen] = useState(false);\n<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="text-gray-500">State saat ini:</span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono font-semibold ${
                      controlledOverlayOpen
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                  >
                    isOpen = {String(controlledOverlayOpen)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setControlledOverlayOpen(!controlledOverlayOpen)}
                  className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  {controlledOverlayOpen ? 'Tutup Panel' : 'Buka Panel'}
                </button>
              </div>

              {controlledOverlayOpen ? (
                <div className="animate-ui-pop p-4 rounded-xl border border-gray-300 bg-white shadow-sm flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-900">Modal / Drawer Terbuka</div>
                    <div className="text-[11px] text-gray-500">Klik tombol silang atau Tutup Panel untuk mengubah state ke false.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setControlledOverlayOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 hover:rotate-90 transition-all text-gray-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="animate-ui-fade p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/70 text-gray-500 text-center">
                  Overlay tertutup (`isOpen = false`). Klik Buka Panel untuk menampilkan kembali.
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="mds-dirty"
            title="Unsaved Changes Guard (Dirty State)"
            description="Mencegah penutupan modal/drawer secara tidak sengaja ketika input di dalamnya telah diubah namun belum disimpan."
            classesHint="isDirty ? showConfirmDiscard : closeImmediately"
            codeSnippet={`const handleRequestClose = () => {\n  if (isDirty) setConfirmDiscard(true);\n  else onClose();\n};`}
          >
            <div className="max-w-lg p-4 rounded-xl border border-gray-300 bg-white space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Edit Judul Drawer</span>
                  {drawerDraftText !== 'Silabus Fisika Terapan' && (
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                      Belum Disimpan
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (drawerDraftText !== 'Silabus Fisika Terapan') {
                      setDrawerDirtyConfirm(true);
                    } else {
                      triggerToast('Drawer Ditutup', 'Tidak ada perubahan, panel ditutup langsung.', 'info');
                    }
                  }}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
                  title="Tutup Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={drawerDraftText}
                onChange={(e) => {
                  setDrawerDraftText(e.target.value);
                  setDrawerDirtyConfirm(false);
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
              />

              {drawerDirtyConfirm && (
                <div className="animate-ui-slide-down p-3 rounded-lg border border-amber-200 bg-amber-50 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-amber-900 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Perubahan belum disimpan. Buang perubahan?</span>
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDrawerDirtyConfirm(false)}
                      className="px-2.5 py-1 rounded bg-white border border-amber-300 text-amber-900 font-semibold cursor-pointer"
                    >
                      Lanjut Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDrawerDraftText('Silabus Fisika Terapan');
                        setDrawerDirtyConfirm(false);
                        triggerToast('Dibuang', 'Perubahan dibatalkan dan drawer ditutup.', 'warning');
                      }}
                      className="px-2.5 py-1 rounded bg-rose-600 text-white font-semibold cursor-pointer"
                    >
                      Buang
                    </button>
                  </div>
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="mds-submitting"
            title="Async Submitting & Close Lock State"
            description="Mengunci tombol batal dan silang penutup selama proses pengiriman asinkron modal/drawer berjalan."
            classesHint="disabled={isSubmitting} / closeOnBackdrop={!isSubmitting}"
            codeSnippet={`<button disabled={isSubmitting} onClick={onCancel}>Batal</button>\n<button disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan'}</button>`}
          >
            <div className="max-w-lg p-4 rounded-xl border border-gray-300 bg-white space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Konfirmasi Publikasi Ujian</span>
                <span className="text-[11px] font-mono text-gray-500">
                  {overlaySubmitting ? 'closeLocked = true' : 'closeLocked = false'}
                </span>
              </div>
              <p className="text-gray-600">
                Saat menyimpan ke server, penutupan lewat backdrop maupun tombol Batal dinonaktifkan untuk mencegah data korup.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  disabled={overlaySubmitting}
                  onClick={() => triggerToast('Dibatalkan', 'Aksi modal dibatalkan.', 'info')}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={overlaySubmitting}
                  onClick={() => {
                    setOverlaySubmitting(true);
                    setTimeout(() => {
                      setOverlaySubmitting(false);
                      triggerToast('Publikasi Berhasil', 'Ujian telah diterbitkan ke kelas.', 'success');
                    }, 1100);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-75 inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-wait"
                >
                  {overlaySubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{overlaySubmitting ? 'Menyimpan...' : 'Simpan & Terbitkan'}</span>
                </button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="mds-stacked"
            title="Stacked Overlay Depth State"
            description="Mengelola kedalaman lapisan bertumpuk (Drawer dasar z-40 diikuti Dialog konfirmasi z-50) secara berurutan."
            classesHint="depth: 0 | 1 | 2 / z-40 -> z-50"
            codeSnippet={`{depth >= 1 && <DrawerLayer onOpenConfirm={() => setDepth(2)} />}\n{depth >= 2 && <ConfirmModalLayer onClose={() => setDepth(1)} />}`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono font-semibold text-gray-700 tabular-nums">
                  overlayDepth = {stackedLayerDepth}
                </span>
                <div className="flex gap-1.5">
                  {([0, 1, 2] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setStackedLayerDepth(lvl)}
                      className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                        stackedLayerDepth === lvl ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Layer {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative h-36 rounded-xl border border-gray-300 bg-gray-50 p-3 overflow-hidden flex items-center justify-center">
                {stackedLayerDepth === 0 && (
                  <span className="animate-ui-fade text-gray-500">Halaman Dasar Aktif (Tidak ada overlay terbuka)</span>
                )}
                {stackedLayerDepth >= 1 && (
                  <div className="animate-ui-drawer-right absolute inset-y-2 right-2 w-64 rounded-xl border border-gray-300 bg-white shadow-md p-3 flex flex-col justify-between z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">Layer 1: Drawer Filter</span>
                      <button
                        type="button"
                        onClick={() => setStackedLayerDepth(0)}
                        className="text-gray-500 hover:text-gray-800 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStackedLayerDepth(2)}
                      className="px-3 py-1.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 cursor-pointer"
                    >
                      Buka Modal Konfirmasi (Layer 2)
                    </button>
                  </div>
                )}
                {stackedLayerDepth === 2 && (
                  <div className="animate-ui-pop relative z-20 w-60 rounded-xl border border-rose-200 bg-white shadow-xl p-3.5 space-y-2.5">
                    <div className="font-bold text-gray-900">Layer 2: Konfirmasi Hapus</div>
                    <p className="text-[11px] text-gray-600">Menutup layer ini kembali ke Drawer Layer 1.</p>
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setStackedLayerDepth(1)}
                        className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 font-semibold cursor-pointer"
                      >
                        Kembali ke Layer 1
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.15 EMPTY STATES */}
      {isVisible('emptystates') && (
        <UiDocPage
          title="Empty States"
        >
          <UiDocSection
            title="Empty Inbox & CTA State"
            classesHint="p-8 text-center rounded-xl border border-dashed border-gray-300 bg-gray-50/50"
            codeSnippet={`<div className="p-8 text-center rounded-xl border border-dashed border-gray-300 bg-gray-50/50 space-y-2">\n  <Inbox className="w-8 h-8 text-gray-400 mx-auto" />\n  <div className="font-bold text-gray-800">Belum Ada Tugas Dikumpulkan</div>\n</div>`}
          >
            <div className="p-8 text-center rounded-xl border border-dashed border-gray-300 bg-gray-50/50 space-y-2.5">
              <Inbox className="w-9 h-9 text-gray-400 mx-auto" />
              <div className="text-sm font-bold text-gray-800">Belum Ada Tugas Dikumpulkan</div>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Siswa belum mengunggah lembar jawaban minggu ini. Bagikan tautan pengumpulan agar kelas segera merespons.
              </p>
              <button
                onClick={() => triggerToast('Tautan Tugas', 'Tautan unggahan disalin.', 'info')}
                className="px-3.5 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold cursor-pointer hover:bg-black"
              >
                Bagikan Tautan Tugas
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.16 STATES */}
      {isVisible('states') && (
        <UiDocPage
          title="States"
          subLinks={[
            { id: 'st-verified', label: 'Verified State' },
            { id: 'st-syncing', label: 'Syncing State' },
            { id: 'st-readonly', label: 'Read-Only Lock State' },
            { id: 'st-archived', label: 'Archived State' },
          ]}
        >
          <UiDocSection id="st-verified" title="Verified State" classesHint="border-emerald-200 bg-emerald-50/60 text-emerald-900" codeSnippet={`<div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> State: Terverifikasi</div>`}>
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center gap-2.5 text-emerald-900 text-xs font-semibold max-w-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>State: Terverifikasi</span>
            </div>
          </UiDocSection>

          <UiDocSection id="st-syncing" title="Syncing State" classesHint="border-primary-200 bg-primary-50/60 text-primary-900" codeSnippet={`<div className="p-3.5 rounded-xl border border-primary-200 bg-primary-50/60 flex items-center gap-2.5"><RefreshCw className="w-4 h-4 text-primary-600 animate-spin" /> State: Sinkronisasi</div>`}>
            <div className="p-3.5 rounded-xl border border-primary-200 bg-primary-50/60 flex items-center gap-2.5 text-primary-900 text-xs font-semibold max-w-xs">
              <RefreshCw className="w-4 h-4 text-primary-600 animate-spin shrink-0" />
              <span>State: Sinkronisasi</span>
            </div>
          </UiDocSection>

          <UiDocSection id="st-readonly" title="Read-Only Lock State" classesHint="border-gray-300 bg-gray-50 text-gray-700" codeSnippet={`<div className="p-3.5 rounded-xl border border-gray-300 bg-gray-50 flex items-center gap-2.5"><Lock className="w-4 h-4 text-gray-500" /> State: Read-Only Lock</div>`}>
            <div className="p-3.5 rounded-xl border border-gray-300 bg-gray-50 flex items-center gap-2.5 text-gray-700 text-xs font-semibold max-w-xs">
              <Lock className="w-4 h-4 text-gray-500 shrink-0" />
              <span>State: Read-Only Lock</span>
            </div>
          </UiDocSection>

          <UiDocSection id="st-archived" title="Archived State" classesHint="border-amber-200 bg-amber-50/60 text-amber-900" codeSnippet={`<div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center gap-2.5"><Archive className="w-4 h-4 text-amber-600" /> State: Diarsipkan</div>`}>
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center gap-2.5 text-amber-900 text-xs font-semibold max-w-xs">
              <Archive className="w-4 h-4 text-amber-600 shrink-0" />
              <span>State: Diarsipkan</span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.17 CALLOUT */}
      {isVisible('callout') && (
        <UiDocPage
          title="Callout"
          subLinks={[
            { id: 'cal-default', label: 'Callout' },
            { id: 'cal-close', label: 'Close over' },
            { id: 'cal-dark', label: 'Callout dark' },
            { id: 'cal-floating', label: 'Callout floating' },
          ]}
        >
          <UiDocSection id="cal-default" title="Callout" classesHint="p-3.5 bg-primary-50 border border-primary-200 rounded-xl" codeSnippet={`<div className="p-3.5 bg-primary-50 border border-primary-200 rounded-xl">Callout standar informasi akademik.</div>`}>
            <div className="p-3.5 bg-primary-50 border border-primary-200 rounded-xl text-primary-950 text-xs">
              <strong>Callout:</strong> Jadwal praktikum laboratorium semester ini dimulai setiap hari Senin pukul 08:00 WIB.
            </div>
          </UiDocSection>

          <UiDocSection id="cal-close" title="Close over" classesHint="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between" codeSnippet={`<div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between">...</div>`}>
            {!calloutDismissed ? (
              <div className="animate-ui-fade p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 flex justify-between items-start text-xs">
                <div>
                  <strong>Close over:</strong> Ujian tengah semester dijadwalkan Jumat depan.
                </div>
                <button
                  onClick={() => setCalloutDismissed(true)}
                  className="text-emerald-700 hover:text-black ml-3 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCalloutDismissed(false)}
                className="animate-ui-fade text-xs text-primary-600 font-semibold hover:underline cursor-pointer"
              >
                Tampilkan lagi Callout Close Over
              </button>
            )}
          </UiDocSection>

          <UiDocSection id="cal-dark" title="Callout dark" classesHint="p-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white" codeSnippet={`<div className="p-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white">Callout Dark</div>`}>
            <div className="p-3.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs">
              <strong>Callout dark:</strong> Pembaruan server nilai akademik telah selesai tanpa gangguan.
            </div>
          </UiDocSection>

          <UiDocSection id="cal-floating" title="Callout floating" classesHint="p-3.5 bg-white border border-amber-200 rounded-xl shadow-md" codeSnippet={`<div className="p-3.5 bg-white border border-amber-200 rounded-xl shadow-md">Callout Floating</div>`}>
            <div className="p-3.5 bg-white border border-amber-200 rounded-xl shadow-md text-gray-800 text-xs">
              <strong>Callout floating:</strong> Bayangan melayang halus untuk pemberitahuan prioritas tinggi.
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.18 GALLERY */}
      {isVisible('gallery') && (
        <UiDocPage
          title="Gallery"
        >
          <UiDocSection
            title="Interactive Documentation Grid"
            classesHint="grid grid-cols-2 md:grid-cols-4 gap-3"
            codeSnippet={`<div className="grid grid-cols-2 md:grid-cols-4 gap-3">\n  <button className="p-4 rounded-xl border bg-[#FEF1F5] text-left">Praktikum Optik</button>\n</div>`}
            actions={<ImageIcon className="w-4 h-4 text-primary-600" />}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {[
                  { title: 'Praktikum Optik & Spektroskopi', lab: 'Lab Fisika A', bg: 'bg-[#FEF1F5] text-[#9D113C]' },
                  { title: 'Diskusi Kalkulus Bab 4', lab: 'Room 302', bg: 'bg-[#E6F9F0] text-[#146C43]' },
                  { title: 'Resonansi Gelombang', lab: 'Lab Akustik', bg: 'bg-[#FFF5E6] text-[#8C5811]' },
                  { title: 'Pameran Karya Studio', lab: 'Studio Seni', bg: 'bg-[#FFECEB] text-[#942922]' },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      setGalleryActive(item.title);
                      triggerToast('Gallery Lightbox', `Pratinjau foto: ${item.title}`, 'info');
                    }}
                    className={`p-3.5 rounded-xl border border-gray-300 ${item.bg} text-left flex flex-col justify-between h-24 hover:shadow-md transition-shadow duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer`}
                  >
                    <span className="text-[10px] font-bold uppercase opacity-75">{item.lab}</span>
                    <span className="font-bold leading-snug">{item.title}</span>
                  </button>
                ))}
              </div>
              {galleryActive && (
                <div className="animate-ui-slide-down text-xs text-primary-700 font-medium bg-primary-50 px-3.5 py-2 rounded-lg flex justify-between items-center border border-primary-100">
                  <span>Dipilih: {galleryActive}</span>
                  <button onClick={() => setGalleryActive(null)} className="underline cursor-pointer">
                    Tutup
                  </button>
                </div>
              )}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 2.19 KANBAN BOARD */}
      {isVisible('kanbanboard') && <KanbanBoardUiKit />}

      {/* 2.20 TIMELINE */}
      {isVisible('timeline') && <TimelineUiKit />}

      {/* 2.21 KPI CARD */}
      {isVisible('kpicard') && <KpiCardUiKit />}

      {/* 2.22 CARD ARTICLE */}
      {isVisible('cardarticle') && <CardArticleUiKit />}
    </div>
  );
};
