import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Check,
  ChevronDown,
  X,
  Lock,
  Minus,
  Layers,
  Sparkles,
  ShieldCheck,
  Search,
  RotateCcw,
} from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { CustomSelect } from '../ui/CustomSelect';
import {
  ACTION_BTN_SECONDARY,
  ACTION_BTN_SOFT_PRIMARY,
} from '../../constants/buttonStyles';

interface SelectCheckboxRadioUiKitProps {
  isVisible: (itemKey: string) => boolean;
}

interface MultiOptionItem {
  value: string;
  label: string;
  meta?: string;
  disabled?: boolean;
  disabledReason?: string;
  clearBlockerLabel?: string;
}

interface PortalCoords {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  openUp: boolean;
}

const MULTI_SUBJECT_OPTIONS: MultiOptionItem[] = [
  { value: 'kalkulus', label: 'Kalkulus Diferensial', meta: 'Wajib' },
  { value: 'fisika', label: 'Fisika Induksi', meta: 'Lab' },
  { value: 'statistika', label: 'Statistika Terapan', meta: 'Data' },
  { value: 'kimia', label: 'Kimia Organik', meta: 'Praktikum' },
  { value: 'astronomi', label: 'Astronomi Dasar', meta: 'Pilihan' },
  { value: 'aljabar', label: 'Aljabar Linear Matriks', meta: 'Wajib' },
  { value: 'biologi', label: 'Biologi Molekuler', meta: 'Lab' },
  { value: 'komputasi', label: 'Algoritma & Komputasi', meta: 'Studio' },
  { value: 'ekonomi', label: 'Ekonomi Mikro Kuantitatif', meta: 'Pilihan' },
  { value: 'desain', label: 'Visualisasi Data UI', meta: 'Studio' },
  { value: 'etika', label: 'Etika Riset Akademik', meta: 'Umum' },
];

const TOPIC_ITEMS = [
  { id: 't1', label: 'Turunan & Integral Lanjut' },
  { id: 't2', label: 'Aljabar Linear Matriks' },
  { id: 't3', label: 'Probabilitas & Distribusi' },
];

function computePortalCoords(
  el: HTMLElement | null,
  itemCount: number,
  extraChrome = 96
): PortalCoords | null {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const estimatedHeight = Math.min(itemCount * 38 + extraChrome, 310);
  const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - 12);
  const spaceAbove = Math.max(0, rect.top - 12);
  const openUp = spaceBelow < Math.min(estimatedHeight, 220) && spaceAbove > spaceBelow;
  const maxHeight = Math.max(180, Math.min(310, openUp ? spaceAbove : spaceBelow));
  const width = Math.max(rect.width, 260);
  let left = rect.left;
  if (left + width > window.innerWidth - 12) {
    left = Math.max(12, window.innerWidth - width - 12);
  }
  if (left < 12) left = 12;

  return {
    top: openUp ? rect.top - 6 : rect.bottom + 6,
    left,
    width,
    maxHeight,
    openUp,
  };
}

export const SelectCheckboxRadioUiKit: React.FC<SelectCheckboxRadioUiKitProps> = ({ isVisible }) => {
  // Select state
  const [basicVal, setBasicVal] = useState('302');
  const [smVal, setSmVal] = useState('weekly');
  const [pillVal, setPillVal] = useState('all');
  const [quickPeriodSeg, setQuickPeriodSeg] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const [multiOpen, setMultiOpen] = useState(false);
  const [multiSearch, setMultiSearch] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>(['kalkulus', 'statistika']);
  const [multiCoords, setMultiCoords] = useState<PortalCoords | null>(null);
  const multiTriggerRef = useRef<HTMLDivElement>(null);
  const multiMenuRef = useRef<HTMLDivElement>(null);

  const [disOptVal, setDisOptVal] = useState('302');
  const [slot304Unlocked, setSlot304Unlocked] = useState(false);
  const [archive306Unlocked, setArchive306Unlocked] = useState(false);
  const [disAllVal, setDisAllVal] = useState('locked');
  const [disMultiOpen, setDisMultiOpen] = useState(false);
  const [disMultiSelected, setDisMultiSelected] = useState<string[]>(['ui-tokens']);
  const [legacyUnlocked, setLegacyUnlocked] = useState(false);
  const [vrSlotUnlocked, setVrSlotUnlocked] = useState(false);
  const [disMultiCoords, setDisMultiCoords] = useState<PortalCoords | null>(null);
  const disMultiTriggerRef = useRef<HTMLButtonElement>(null);
  const disMultiMenuRef = useRef<HTMLDivElement>(null);

  // Checkbox state
  const [chkSm, setChkSm] = useState(true);
  const [chkMd, setChkMd] = useState(true);
  const [chkLg, setChkLg] = useState(false);
  const [checkedTopics, setCheckedTopics] = useState<string[]>(['t1', 't2']);
  const masterChkRef = useRef<HTMLInputElement>(null);
  const [chkCards, setChkCards] = useState<string[]>(['notif', 'sync']);

  // Radio state
  const [radSizeVal, setRadSizeVal] = useState<'sm' | 'md' | 'lg'>('md');
  const [radInlineVal, setRadInlineVal] = useState('hybrid');
  const [radDisVal, setRadDisVal] = useState('active-a');
  const [radCardVal, setRadCardVal] = useState('classic');

  const disabledMultiOptions: MultiOptionItem[] = useMemo(
    () => [
      { value: 'ui-tokens', label: 'Design Tokens & Color', meta: 'Tersedia' },
      { value: 'ui-motion', label: 'Motion & Springs', meta: 'Tersedia' },
      {
        value: 'ui-legacy',
        label: 'Legacy Grid (Arsip)',
        meta: legacyUnlocked ? 'Dipulihkan' : 'Terkunci',
        disabled: !legacyUnlocked,
        disabledReason: 'Disembunyikan dari kurikulum Term 2026',
        clearBlockerLabel: 'Pulihkan',
      },
      { value: 'ui-mobile', label: 'Mobile Gestures', meta: 'Tersedia' },
      {
        value: 'ui-beta',
        label: 'Experimental VR Lab',
        meta: vrSlotUnlocked ? 'Slot terbuka' : 'Penuh',
        disabled: !vrSlotUnlocked,
        disabledReason: 'Kuota lab penuh (20/20 kursi)',
        clearBlockerLabel: 'Tambah slot',
      },
    ],
    [legacyUnlocked, vrSlotUnlocked]
  );

  const filteredMultiSubjects = useMemo(() => {
    const q = multiSearch.trim().toLowerCase();
    if (!q) return MULTI_SUBJECT_OPTIONS;
    return MULTI_SUBJECT_OPTIONS.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.meta && opt.meta.toLowerCase().includes(q))
    );
  }, [multiSearch]);

  const updateMultiCoords = useCallback(() => {
    setMultiCoords(computePortalCoords(multiTriggerRef.current, MULTI_SUBJECT_OPTIONS.length, 108));
  }, []);

  const updateDisMultiCoords = useCallback(() => {
    setDisMultiCoords(computePortalCoords(disMultiTriggerRef.current, disabledMultiOptions.length, 92));
  }, [disabledMultiOptions.length]);

  useEffect(() => {
    if (!multiOpen) {
      setMultiSearch('');
    }
    if (!multiOpen && !disMultiOpen) return;
    if (multiOpen) updateMultiCoords();
    if (disMultiOpen) updateDisMultiCoords();

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        multiOpen &&
        !multiTriggerRef.current?.contains(target) &&
        !multiMenuRef.current?.contains(target)
      ) {
        setMultiOpen(false);
      }
      if (
        disMultiOpen &&
        !disMultiTriggerRef.current?.contains(target) &&
        !disMultiMenuRef.current?.contains(target)
      ) {
        setDisMultiOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMultiOpen(false);
        setDisMultiOpen(false);
      }
    };
    const onScrollOrResize = (e: Event) => {
      const t = e.target;
      if (
        t instanceof Node &&
        (multiMenuRef.current?.contains(t) || disMultiMenuRef.current?.contains(t))
      ) {
        return;
      }
      if (multiOpen) updateMultiCoords();
      if (disMultiOpen) updateDisMultiCoords();
    };

    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [multiOpen, disMultiOpen, updateMultiCoords, updateDisMultiCoords]);

  const allTopicsSelected = checkedTopics.length === TOPIC_ITEMS.length;
  const someTopicsSelected = checkedTopics.length > 0 && checkedTopics.length < TOPIC_ITEMS.length;

  useEffect(() => {
    if (masterChkRef.current) {
      masterChkRef.current.indeterminate = someTopicsSelected;
    }
  }, [someTopicsSelected]);

  const toggleMultiValue = (val: string) => {
    setMultiSelected((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleDisMultiValue = (val: string, disabled?: boolean) => {
    if (disabled) return;
    setDisMultiSelected((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleTopic = (id: string) => {
    setCheckedTopics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllTopics = () => {
    if (allTopicsSelected) {
      setCheckedTopics([]);
    } else {
      setCheckedTopics(TOPIC_ITEMS.map((t) => t.id));
    }
  };

  const toggleChkCard = (id: string) => {
    setChkCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* ========================================================= */}
      {/* SELECT (Basic, Multiple Select, Disabling Option) */}
      {/* ========================================================= */}
      {isVisible('select') && (
        <UiDocPage
          title="Select"
          description="Komponen pemilih opsi tunggal dan ganda lengkap dengan varian ukuran, Multiple Select interaktif, serta penonaktifan opsi maupun seluruh kontrol."
          subLinks={[
            { id: 'sel-basic', label: 'Basic Select' },
            { id: 'sel-multiple', label: 'Multiple Select' },
            { id: 'sel-disabled', label: 'Disabling Option' },
          ]}
        >
          {/* 1. Basic Select */}
          <UiDocSection
            id="sel-basic"
            title="Basic Select"
            description="Single-value dropdown UI KIT dengan Type-to-Filter otomatis (>= 10 opsi), portal collision-aware, serta alternatif Segmented Control jika opsi kurang dari 5."
            classesHint="CustomSelect / size='sm' | 'md' / pill={true} / inline segmented (< 5 opsi)"
            codeSnippet={`// Menu dipakai saat opsi >= 5; bila > 10 otomatis aktif search filter
<CustomSelect
  value={value}
  onChange={setValue}
  placeholder="Pilih kelas..."
  options={classOptions} // >= 10 opsi otomatis Type-to-Filter
/>

// Bila opsi < 5, prioritaskan 1-tap Segmented Control:
<div className="inline-flex rounded-lg border border-gray-300 bg-gray-100 p-0.5">
  {['Harian', 'Mingguan', 'Bulanan'].map(opt => ...)}
</div>`}
            actions={
              basicVal ? (
                <button
                  type="button"
                  onClick={() => setBasicVal('')}
                  className={ACTION_BTN_SECONDARY}
                >
                  <span>Reset Pilihan</span>
                </button>
              ) : null
            }
          >
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 block">
                    Default Select (11 opsi · Auto Filter)
                  </label>
                  <CustomSelect
                    className="w-full"
                    value={basicVal}
                    onChange={setBasicVal}
                    placeholder="Pilih kelas aktif..."
                    ariaLabel="Default Select"
                    options={[
                      { value: '302', label: 'Class 302 — Kalkulus IV' },
                      { value: '303', label: 'Class 303 — Fisika Induksi' },
                      { value: '304', label: 'Class 304 — Seni Rupa Murni' },
                      { value: '305', label: 'Class 305 — Statistika Data' },
                      { value: '306', label: 'Class 306 — Kimia Organik' },
                      { value: '307', label: 'Class 307 — Astronomi Dasar' },
                      { value: '308', label: 'Class 308 — Biologi Sel' },
                      { value: '309', label: 'Class 309 — Algoritma Struktur Data' },
                      { value: '310', label: 'Class 310 — Ekonomi Makro' },
                      { value: '311', label: 'Class 311 — Desain Interaksi' },
                      { value: '312', label: 'Class 312 — Etika Riset' },
                    ]}
                  />
                  <p className="text-[11px] text-gray-500">
                    Daftar &ge; 10 baris otomatis menampilkan kolom filter di atas menu. Terpilih:{' '}
                    <span className="font-semibold text-gray-800">{basicVal || 'Belum ada'}</span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 block">Compact Select (sm)</label>
                  <CustomSelect
                    className="w-full"
                    size="sm"
                    value={smVal}
                    onChange={setSmVal}
                    ariaLabel="Compact Select"
                    options={[
                      { value: 'daily', label: 'Harian' },
                      { value: 'weekly', label: 'Mingguan' },
                      { value: 'monthly', label: 'Bulanan' },
                      { value: 'quarterly', label: 'Triwulan' },
                      { value: 'semester', label: 'Per Semester' },
                      { value: 'yearly', label: 'Tahunan' },
                    ]}
                  />
                  <p className="text-[11px] text-gray-500">Tinggi ringkas h-8 untuk toolbar tabel.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 block">Pill Select (rounded-full)</label>
                  <CustomSelect
                    className="w-full"
                    pill
                    value={pillVal}
                    onChange={setPillVal}
                    ariaLabel="Pill Select"
                    options={[
                      { value: 'all', label: 'Semua Status' },
                      { value: 'published', label: 'Terpublikasi' },
                      { value: 'review', label: 'Menunggu Tinjauan' },
                      { value: 'scheduled', label: 'Terjadwal Rilis' },
                      { value: 'draft', label: 'Draf Internal' },
                      { value: 'archived', label: 'Diarsipkan' },
                    ]}
                  />
                  <p className="text-[11px] text-gray-500">Bentuk kapsul serasi dengan tombol aksi h-9.</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-900">Aturan 06 · Tidak Perlu Menu Jika Opsi &lt; 5</div>
                  <p className="text-[11px] text-gray-600">
                    Untuk 3 pilihan sederhana, tampilkan langsung sebagai Segmented Control agar selesai dalam 1 ketukan tanpa membuka menu.
                  </p>
                </div>
                <div
                  role="radiogroup"
                  aria-label="Rentang Laporan Cepat"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white p-0.5 shrink-0"
                >
                  {(
                    [
                      { id: 'daily', label: 'Harian' },
                      { id: 'weekly', label: 'Mingguan' },
                      { id: 'monthly', label: 'Bulanan' },
                    ] as const
                  ).map((item) => {
                    const active = quickPeriodSeg === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setQuickPeriodSeg(item.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </UiDocSection>

          {/* 2. Multiple Select */}
          <UiDocSection
            id="sel-multiple"
            title="Multiple Select"
            description="Multi-select dengan pencarian cepat (>10 opsi), tetap terbuka saat memilih (stay open on pick), hitungan live, dan tombol Done eksplisit di footer."
            classesHint="Stay open on pick + sticky search + checkbox rows + sticky footer (live count & Done CTA)"
            codeSnippet={`<div className="relative">
  <TriggerChips selected={selected} onToggle={() => setOpen(!open)} />
  {open && createPortal(
    <div className="flex flex-col rounded-xl border bg-white shadow-xl">
      <SearchHeader value={q} onChange={setQ} />
      <div className="overflow-y-auto p-1.5">{/* Stay open on pick */}</div>
      <div className="border-t p-2 flex items-center justify-between">
        <span className="tabular-nums">{selected.length} dipilih</span>
        <button onClick={() => setOpen(false)}>Done</button>
      </div>
    </div>,
    document.body
  )}
</div>`}
            actions={
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMultiSelected(MULTI_SUBJECT_OPTIONS.map((o) => o.value))}
                  className={ACTION_BTN_SOFT_PRIMARY}
                >
                  <span>Pilih Semua</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMultiSelected([])}
                  className={ACTION_BTN_SECONDARY}
                >
                  <span>Kosongkan</span>
                </button>
              </div>
            }
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="relative">
                <div
                  ref={multiTriggerRef}
                  role="button"
                  tabIndex={0}
                  onClick={() => setMultiOpen((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setMultiOpen((v) => !v);
                    }
                  }}
                  aria-expanded={multiOpen}
                  className={`min-h-10 w-full rounded-xl border px-3 py-1.5 flex items-center justify-between gap-2 bg-white transition-all duration-200 cursor-pointer ${
                    multiOpen
                      ? 'border-[#ee2e65] ring-2 ring-[#ee2e65]/15'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    {multiSelected.length === 0 ? (
                      <span className="text-gray-500">Pilih satu atau lebih mata pelajaran...</span>
                    ) : (
                      multiSelected.map((val) => {
                        const opt = MULTI_SUBJECT_OPTIONS.find((o) => o.value === val);
                        if (!opt) return null;
                        return (
                          <span
                            key={val}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] border border-[#FBC2D4]/70 text-[11px] font-semibold animate-ui-pop"
                          >
                            <span>{opt.label}</span>
                            <button
                              type="button"
                              aria-label={`Hapus ${opt.label}`}
                              onClick={() => toggleMultiValue(val)}
                              className="hover:text-[#ee2e65] cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-semibold tabular-nums">
                      {multiSelected.length}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        multiOpen ? 'rotate-180 text-[#ee2e65]' : ''
                      }`}
                    />
                  </div>
                </div>

                {multiOpen &&
                  multiCoords &&
                  createPortal(
                    <div
                      ref={multiMenuRef}
                      style={{
                        position: 'fixed',
                        top: multiCoords.top,
                        left: multiCoords.left,
                        width: multiCoords.width,
                        maxHeight: multiCoords.maxHeight,
                        transform: multiCoords.openUp ? 'translateY(-100%)' : undefined,
                      }}
                      className={`${
                        multiCoords.openUp ? 'animate-ui-pop-up' : 'animate-ui-pop'
                      } flex flex-col rounded-xl border border-gray-300 bg-white/95 backdrop-blur-sm shadow-[0_16px_38px_-10px_rgba(15,23,42,0.16)] z-[9999] overflow-hidden`}
                    >
                      <div className="p-1.5 border-b border-gray-200 bg-white shrink-0">
                        <div className="relative flex items-center">
                          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 pointer-events-none" />
                          <input
                            type="text"
                            value={multiSearch}
                            onChange={(e) => setMultiSearch(e.target.value)}
                            placeholder="Ketik untuk filter mata pelajaran..."
                            className="w-full h-8 pl-8 pr-7 rounded-lg border border-gray-300 bg-gray-50/70 text-xs text-gray-800 placeholder:text-gray-500 focus:bg-white focus:outline-none focus:border-primary-500"
                          />
                          {multiSearch && (
                            <button
                              type="button"
                              onClick={() => setMultiSearch('')}
                              aria-label="Hapus pencarian"
                              className="absolute right-1.5 p-1 rounded text-gray-500 hover:text-gray-800 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-1.5 overflow-y-auto space-y-0.5 flex-1">
                        {filteredMultiSubjects.length === 0 ? (
                          <div className="px-3 py-4 text-center text-xs text-gray-500">
                            Tidak ada mata pelajaran yang cocok.
                          </div>
                        ) : (
                          filteredMultiSubjects.map((opt) => {
                            const active = multiSelected.includes(opt.value);
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => toggleMultiValue(opt.value)}
                                className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 text-left text-xs transition-colors cursor-pointer ${
                                  active
                                    ? 'bg-[#FEF1F5] text-[#9D113C] font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50 font-medium'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span
                                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                                      active
                                        ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                                        : 'bg-white border-gray-300'
                                    }`}
                                  >
                                    {active && <Check className="w-3 h-3 animate-ui-check" />}
                                  </span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {opt.meta && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-300/80 shrink-0">
                                    {opt.meta}
                                  </span>
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div className="px-2.5 py-2 border-t border-gray-200 bg-gray-50/90 flex items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="font-semibold text-gray-800 tabular-nums">
                            {multiSelected.length} dipilih
                          </span>
                          {multiSelected.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setMultiSelected([])}
                              className="text-gray-500 hover:text-gray-900 underline cursor-pointer"
                            >
                              Kosongkan
                            </button>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setMultiOpen(false)}
                          className="px-3 py-1 rounded-lg bg-gray-900 hover:bg-black text-white text-[11px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                        >
                          Done
                        </button>
                      </div>
                    </div>,
                    document.body
                  )}
              </div>

              <p className="text-[11px] text-gray-500">
                Terpilih ({multiSelected.length}):{' '}
                <span className="font-mono text-gray-700">
                  {multiSelected.length > 0 ? multiSelected.join(', ') : '—'}
                </span>
              </p>
            </div>
          </UiDocSection>

          {/* 3. Disabling Option */}
          <UiDocSection
            id="sel-disabled"
            title="Disabling Option (Reasons, Not Grey)"
            description="Menampilkan alasan pemblokiran secara inline beserta tombol aksi 1-klik untuk membuka blokir (bukan sekadar teks abu-abu tanpa konteks)."
            classesHint="options: [{ value, label, disabled, disabledReason, clearBlockerLabel, onClearBlocker }]"
            actions={
              slot304Unlocked || archive306Unlocked || legacyUnlocked || vrSlotUnlocked ? (
                <button
                  type="button"
                  onClick={() => {
                    setSlot304Unlocked(false);
                    setArchive306Unlocked(false);
                    setLegacyUnlocked(false);
                    setVrSlotUnlocked(false);
                  }}
                  className={ACTION_BTN_SECONDARY}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Blocker</span>
                </button>
              ) : null
            }
            codeSnippet={`<CustomSelect
  value={val}
  onChange={setVal}
  options={[
    { value: '302', label: 'Class 302 — Tersedia' },
    {
      value: '304',
      label: 'Class 304 — Seni Rupa',
      disabled: !slotUnlocked,
      disabledReason: 'Kuota penuh (30/30 kursi)',
      clearBlockerLabel: 'Tambah 5 slot',
      onClearBlocker: () => setSlotUnlocked(true),
    },
  ]}
/>`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              {/* Specific Disabled Options with Inline Reasons + 1-click fix */}
              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800">Option + Inline Blocker</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                    Reasons + Fix
                  </span>
                </div>
                <CustomSelect
                  className="w-full"
                  value={disOptVal}
                  onChange={setDisOptVal}
                  ariaLabel="Select with Blocker Reasons"
                  options={[
                    { value: '302', label: 'Class 302 — Tersedia' },
                    { value: '303', label: 'Class 303 — Tersedia' },
                    {
                      value: '304',
                      label: 'Class 304 — Seni Rupa',
                      meta: slot304Unlocked ? '+5 slot' : undefined,
                      disabled: !slot304Unlocked,
                      disabledReason: 'Kuota penuh (30/30 kursi)',
                      clearBlockerLabel: 'Tambah 5 slot',
                      onClearBlocker: () => setSlot304Unlocked(true),
                    },
                    { value: '305', label: 'Class 305 — Tersedia' },
                    {
                      value: '306',
                      label: 'Class 306 — Arsip Term Lalu',
                      meta: archive306Unlocked ? 'Aktif' : undefined,
                      disabled: !archive306Unlocked,
                      disabledReason: 'Arsip semester 2025 belum diaktifkan',
                      clearBlockerLabel: 'Aktifkan',
                      onClearBlocker: () => setArchive306Unlocked(true),
                    },
                  ]}
                />
                <p className="text-[11px] text-gray-500">
                  Klik buka menu untuk melihat alasan blokir &amp; tombol pembuka langsung.
                </p>
              </div>

              {/* Whole Select Disabled */}
              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800">Control-Level Lock</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-200/70 text-gray-700 text-[10px] font-semibold">
                    Read-only lock
                  </span>
                </div>
                <CustomSelect
                  className="w-full"
                  disabled
                  value={disAllVal}
                  onChange={setDisAllVal}
                  ariaLabel="Disabled Select"
                  options={[
                    { value: 'locked', label: 'Term 2026 (Terkunci Sistem)' },
                  ]}
                />
                <p className="text-[11px] text-gray-500">
                  Alasan kunci: periode akademik sudah disahkan oleh admin pusat.
                </p>
              </div>

              {/* Multiple Select with Disabled Option + Inline Resolver + Done CTA */}
              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800">Multi-Select + Blocker Fix</span>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                </div>

                <div className="relative">
                  <button
                    ref={disMultiTriggerRef}
                    type="button"
                    onClick={() => setDisMultiOpen((v) => !v)}
                    className="w-full h-9 px-3 rounded-lg border border-gray-300 bg-white hover:border-gray-400 flex items-center justify-between gap-2 text-left cursor-pointer"
                  >
                    <span className="truncate text-gray-700 font-medium tabular-nums">
                      {disMultiSelected.length} modul dipilih
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                        disMultiOpen ? 'rotate-180 text-[#ee2e65]' : ''
                      }`}
                    />
                  </button>

                  {disMultiOpen &&
                    disMultiCoords &&
                    createPortal(
                      <div
                        ref={disMultiMenuRef}
                        style={{
                          position: 'fixed',
                          top: disMultiCoords.top,
                          left: disMultiCoords.left,
                          width: Math.max(disMultiCoords.width, 290),
                          maxHeight: disMultiCoords.maxHeight,
                          transform: disMultiCoords.openUp ? 'translateY(-100%)' : undefined,
                        }}
                        className={`${
                          disMultiCoords.openUp ? 'animate-ui-pop-up' : 'animate-ui-pop'
                        } flex flex-col rounded-xl border border-gray-300 bg-white/95 backdrop-blur-sm shadow-[0_16px_38px_-10px_rgba(15,23,42,0.16)] z-[9999] overflow-hidden`}
                      >
                        <div className="p-1.5 overflow-y-auto space-y-1 flex-1">
                          {disabledMultiOptions.map((opt) => {
                            const active = disMultiSelected.includes(opt.value);
                            if (opt.disabled) {
                              return (
                                <div
                                  key={opt.value}
                                  className="w-full px-2.5 py-2 rounded-lg bg-gray-50 border border-gray-200/90 flex items-start justify-between gap-2 text-xs"
                                >
                                  <div className="flex items-start gap-2 min-w-0">
                                    <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                      <div className="font-semibold text-gray-700 truncate">{opt.label}</div>
                                      <div className="text-[11px] text-gray-600 leading-snug">
                                        {opt.disabledReason}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (opt.value === 'ui-legacy') setLegacyUnlocked(true);
                                      if (opt.value === 'ui-beta') setVrSlotUnlocked(true);
                                    }}
                                    className="px-2 py-1 rounded-md bg-white hover:bg-primary-50 text-primary-700 border border-primary-300 text-[11px] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                                  >
                                    {opt.clearBlockerLabel}
                                  </button>
                                </div>
                              );
                            }

                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => toggleDisMultiValue(opt.value, false)}
                                className={`w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 text-left text-xs cursor-pointer ${
                                  active
                                    ? 'bg-[#FEF1F5] text-[#9D113C] font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                                      active
                                        ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                                        : 'bg-white border-gray-300'
                                    }`}
                                  >
                                    {active && <Check className="w-2.5 h-2.5 animate-ui-check" />}
                                  </span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {opt.meta && (
                                  <span className="text-[10px] text-gray-500 shrink-0">{opt.meta}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className="px-2.5 py-1.5 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-[11px] shrink-0">
                          <span className="text-gray-600 font-semibold tabular-nums">
                            {disMultiSelected.length} aktif
                          </span>
                          <button
                            type="button"
                            onClick={() => setDisMultiOpen(false)}
                            className="px-2.5 py-1 rounded-md bg-gray-900 hover:bg-black text-white font-semibold cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>,
                      document.body
                    )}
                </div>
                <p className="text-[11px] text-gray-500">
                  Item terkunci menjelaskan penyebabnya dan dapat dibuka 1-klik.
                </p>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* ========================================================= */}
      {/* CHECKBOX */}
      {/* ========================================================= */}
      {isVisible('checkbox') && (
        <UiDocPage
          title="Checkbox"
          description="Kontrol centang multi-pilihan dengan efek tactile spring (.animate-ui-check), status indeterminate induk-anak, disabled, dan varian kartu pilihan."
          subLinks={[
            { id: 'chk-basic', label: 'Basic & Sizing' },
            { id: 'chk-states', label: 'Indeterminate & Disabled' },
            { id: 'chk-cards', label: 'Checkbox Cards' },
          ]}
        >
          {/* 1. Basic & Sizing */}
          <UiDocSection
            id="chk-basic"
            title="Basic Checkbox & Sizing"
            description="Ukuran Small, Medium, dan Large memakai accent Primary Rose (#ee2e65) serta animasi pantulan otomatis saat dicentang."
            classesHint="w-3.5 h-3.5 / w-4 h-4 / w-5 h-5 accent-[#ee2e65]"
            codeSnippet={`<label className="inline-flex items-center gap-2.5 cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    className="w-4 h-4 rounded accent-[#ee2e65] cursor-pointer"
  />
  <span>Aktifkan sinkronisasi otomatis</span>
</label>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-4 space-y-3">
                <span className="font-semibold text-gray-800 block">Native Tactile Sizing (SM / MD / LG)</span>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={chkSm}
                    onChange={(e) => setChkSm(e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-[#ee2e65] cursor-pointer"
                  />
                  <span className="text-gray-700">Small Checkbox (14px — Ringkas)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={chkMd}
                    onChange={(e) => setChkMd(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#ee2e65] cursor-pointer"
                  />
                  <span className="text-gray-700">Medium Checkbox (16px — Standar UI KIT)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={chkLg}
                    onChange={(e) => setChkLg(e.target.checked)}
                    className="w-5 h-5 rounded accent-[#ee2e65] cursor-pointer"
                  />
                  <span className="text-gray-700">Large Checkbox (20px — Touch Target)</span>
                </label>
              </div>

              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-4 space-y-3">
                <span className="font-semibold text-gray-800 block">Custom Animated Box (.animate-ui-check)</span>
                {[
                  { label: 'Izinkan unduh PDF materi', state: chkSm, toggle: () => setChkSm((v) => !v) },
                  { label: 'Kirim ringkasan skor otomatis', state: chkMd, toggle: () => setChkMd((v) => !v) },
                  { label: 'Tampilkan lencana progres kelas', state: chkLg, toggle: () => setChkLg((v) => !v) },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.toggle}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer group"
                  >
                    <span
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                        item.state
                          ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                          : 'bg-white border-gray-300 group-hover:border-[#ee2e65]'
                      }`}
                    >
                      {item.state && <Check className="w-3 h-3 animate-ui-check" />}
                    </span>
                    <span className={item.state ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </UiDocSection>

          {/* 2. Indeterminate & Disabled */}
          <UiDocSection
            id="chk-states"
            title="Indeterminate & Disabled States"
            description="Mendukung status indeterminate saat sebagian child terpilih, serta status disabled (tercentang & kosong)."
            classesHint="inputRef.current.indeterminate = true | disabled:opacity-50"
            codeSnippet={`// Indeterminate parent checkbox
useEffect(() => {
  if (masterRef.current) masterRef.current.indeterminate = someSelected;
}, [someSelected]);`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Parent / Child Indeterminate */}
              <div className="rounded-xl border border-gray-300/90 bg-white p-4 space-y-2.5">
                <label className="flex items-center justify-between gap-2 pb-2 border-b border-gray-300 cursor-pointer select-none">
                  <div className="flex items-center gap-2.5">
                    <input
                      ref={masterChkRef}
                      type="checkbox"
                      checked={allTopicsSelected}
                      onChange={toggleAllTopics}
                      className="w-4 h-4 rounded accent-[#ee2e65] cursor-pointer"
                    />
                    <span className="font-semibold text-gray-900">Pilih Semua Topik Silabus</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[10px] font-semibold tabular-nums">
                    {someTopicsSelected ? (
                      <>
                        <Minus className="w-2.5 h-2.5" />
                        <span>Sebagian ({checkedTopics.length}/3)</span>
                      </>
                    ) : (
                      <span>{checkedTopics.length}/3 Aktif</span>
                    )}
                  </span>
                </label>

                <div className="pl-5 space-y-2">
                  {TOPIC_ITEMS.map((topic) => (
                    <label key={topic.id} className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={checkedTopics.includes(topic.id)}
                        onChange={() => toggleTopic(topic.id)}
                        className="w-4 h-4 rounded accent-[#ee2e65] cursor-pointer"
                      />
                      <span className="text-gray-700">{topic.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Disabled Variants */}
              <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4 space-y-3">
                <span className="font-semibold text-gray-800 block">Disabled States</span>
                <label className="flex items-center gap-2.5 cursor-not-allowed opacity-60 select-none">
                  <input type="checkbox" disabled className="w-4 h-4 rounded cursor-not-allowed" />
                  <span className="text-gray-500">Disabled Unchecked (Tidak aktif)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-not-allowed opacity-60 select-none">
                  <input
                    type="checkbox"
                    disabled
                    defaultChecked
                    className="w-4 h-4 rounded accent-[#ee2e65] cursor-not-allowed"
                  />
                  <span className="text-gray-500">Disabled Checked (Dikunci sistem)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded accent-rose-600 ring-2 ring-rose-500/20 cursor-pointer"
                  />
                  <span className="text-rose-700 font-medium">Persetujuan Wajib (Required State)</span>
                </label>
              </div>
            </div>
          </UiDocSection>

          {/* 3. Checkbox Cards */}
          <UiDocSection
            id="chk-cards"
            title="Checkbox Card Group"
            description="Kartu pilihan ganda dengan sorotan Primary Rose (#ee2e65) dan tinta lembut (#FEF1F5) saat aktif."
            classesHint="border-[#ee2e65] bg-[#FEF1F5] / border-gray-300 bg-white"
            codeSnippet={`<label className={active ? 'border-[#ee2e65] bg-[#FEF1F5]' : 'border-gray-300 bg-white'}>
  <input type="checkbox" className="accent-[#ee2e65]" />
  ...
</label>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                {
                  id: 'notif',
                  title: 'Notifikasi Push',
                  desc: 'Peringatan langsung ke perangkat pengajar.',
                  icon: Sparkles,
                },
                {
                  id: 'sync',
                  title: 'Sinkron Cloud',
                  desc: 'Cadangkan revisi komponen secara real-time.',
                  icon: Layers,
                },
                {
                  id: 'audit',
                  title: 'Audit Akses',
                  desc: 'Catat perubahan hak akses setiap sesi.',
                  icon: ShieldCheck,
                },
              ].map((card) => {
                const active = chkCards.includes(card.id);
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => toggleChkCard(card.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer flex items-start justify-between gap-2.5 ${
                      active
                        ? 'border-[#ee2e65] bg-[#FEF1F5] shadow-xs'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#ee2e65]' : 'text-gray-500'}`} />
                        <span className={`font-semibold ${active ? 'text-[#9D113C]' : 'text-gray-900'}`}>
                          {card.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{card.desc}</p>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        active ? 'bg-[#ee2e65] border-[#ee2e65] text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 animate-ui-check" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* ========================================================= */}
      {/* RADIO */}
      {/* ========================================================= */}
      {isVisible('radio') && (
        <UiDocPage
          title="Radio"
          description="Kontrol pilihan tunggal (single-choice) dalam ukuran sm/md/lg, susunan inline & vertikal, status disabled, serta kartu pilihan."
          subLinks={[
            { id: 'rad-basic', label: 'Basic & Sizing' },
            { id: 'rad-states', label: 'Inline & Disabled' },
            { id: 'rad-cards', label: 'Radio Option Cards' },
          ]}
        >
          {/* 1. Basic & Sizing */}
          <UiDocSection
            id="rad-basic"
            title="Basic Radio & Sizing"
            description="Tiga ukuran standar radio button dengan Primary Rose (#ee2e65) accent dan animasi spring saat dipilih."
            classesHint="type='radio' w-3.5 h-3.5 / w-4 h-4 / w-5 h-5 accent-[#ee2e65]"
            codeSnippet={`<label className="inline-flex items-center gap-2.5 cursor-pointer">
  <input
    type="radio"
    name="size"
    value="md"
    checked={value === 'md'}
    onChange={() => setValue('md')}
    className="w-4 h-4 accent-[#ee2e65] cursor-pointer"
  />
  <span>Medium Radio (16px)</span>
</label>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-4 space-y-3">
                <span className="font-semibold text-gray-800 block">Radio Sizing (SM / MD / LG)</span>
                {(
                  [
                    { val: 'sm', label: 'Small Radio (14px)', cls: 'w-3.5 h-3.5' },
                    { val: 'md', label: 'Medium Radio (16px — Default)', cls: 'w-4 h-4' },
                    { val: 'lg', label: 'Large Radio (20px — Touch)', cls: 'w-5 h-5' },
                  ] as const
                ).map((item) => (
                  <label key={item.val} className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="uikit-radio-size"
                      value={item.val}
                      checked={radSizeVal === item.val}
                      onChange={() => setRadSizeVal(item.val)}
                      className={`${item.cls} accent-[#ee2e65] cursor-pointer`}
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="rounded-xl border border-gray-300/90 bg-gray-50/50 p-4 space-y-3">
                <span className="font-semibold text-gray-800 block">Custom Animated Ring Radio</span>
                {(
                  [
                    { val: 'sm', label: 'Mode Ringkas (Mobile Dock)' },
                    { val: 'md', label: 'Mode Standar (UI KIT Default)' },
                    { val: 'lg', label: 'Mode Luas (Presentation)' },
                  ] as const
                ).map((item) => {
                  const active = radSizeVal === item.val;
                  return (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setRadSizeVal(item.val)}
                      className="w-full flex items-center gap-2.5 text-left cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                          active ? 'border-[#ee2e65] bg-[#FEF1F5]' : 'border-gray-300 bg-white'
                        }`}
                      >
                        {active && <span className="w-2 h-2 rounded-full bg-[#ee2e65] animate-ui-check" />}
                      </span>
                      <span className={active ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </UiDocSection>

          {/* 2. Inline & Disabled */}
          <UiDocSection
            id="rad-states"
            title="Inline, Vertical & Disabled Radio"
            description="Susunan horizontal inline untuk pilihan cepat serta opsi radio yang dinonaktifkan."
            classesHint="flex flex-wrap gap-4 | disabled cursor-not-allowed"
            codeSnippet={`<div className="flex flex-wrap items-center gap-4">
  <label><input type="radio" name="mode" /> Tatap Muka</label>
  <label><input type="radio" name="mode" /> Hybrid</label>
  <label className="opacity-50"><input type="radio" name="mode" disabled /> Terkunci</label>
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-gray-300/90 bg-white p-4 space-y-3">
                <span className="font-semibold text-gray-800 block">Horizontal Inline Group</span>
                <div className="flex flex-wrap items-center gap-4">
                  {[
                    { val: 'offline', label: 'Tatap Muka' },
                    { val: 'hybrid', label: 'Hybrid' },
                    { val: 'online', label: 'Daring Penuh' },
                  ].map((opt) => (
                    <label key={opt.val} className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="uikit-radio-inline"
                        value={opt.val}
                        checked={radInlineVal === opt.val}
                        onChange={(e) => setRadInlineVal(e.target.value)}
                        className="w-4 h-4 accent-[#ee2e65] cursor-pointer"
                      />
                      <span className="text-gray-700 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500">
                  Nilai aktif: <code className="font-mono text-gray-800">{radInlineVal}</code>
                </p>
              </div>

              <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4 space-y-2.5">
                <span className="font-semibold text-gray-800 block">Vertical + Disabled Options</span>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="uikit-radio-disabled"
                    checked={radDisVal === 'active-a'}
                    onChange={() => setRadDisVal('active-a')}
                    className="w-4 h-4 accent-[#ee2e65] cursor-pointer"
                  />
                  <span className="text-gray-800">Akses Standar (Aktif)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-not-allowed opacity-55 select-none">
                  <input
                    type="radio"
                    name="uikit-radio-disabled"
                    disabled
                    className="w-4 h-4 cursor-not-allowed"
                  />
                  <span className="text-gray-500">Mode Penguji Khusus (Disabled)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-not-allowed opacity-55 select-none">
                  <input
                    type="radio"
                    name="uikit-radio-locked-checked"
                    disabled
                    defaultChecked
                    className="w-4 h-4 accent-[#ee2e65] cursor-not-allowed"
                  />
                  <span className="text-gray-500">Default Terkunci (Disabled Checked)</span>
                </label>
              </div>
            </div>
          </UiDocSection>

          {/* 3. Radio Option Cards */}
          <UiDocSection
            id="rad-cards"
            title="Radio Option Cards"
            description="Pilihan tunggal berbentuk kartu interaktif dengan indikator lingkar aktif dan highlight Primary Rose."
            classesHint="border-[#ee2e65] bg-[#FEF1F5] | ring indicator"
            codeSnippet={`<button onClick={() => setValue(opt.id)} className={active ? 'border-[#ee2e65] bg-[#FEF1F5]' : 'border-gray-300 bg-white'}>
  ...
</button>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                {
                  id: 'classic',
                  title: 'Mode Klasik',
                  desc: 'Peringkat langsung & umpan balik tiap soal.',
                },
                {
                  id: 'timed',
                  title: 'Mode Terjadwal',
                  desc: 'Batas waktu per sesi dengan pengawasan ketat.',
                },
                {
                  id: 'practice',
                  title: 'Latihan Mandiri',
                  desc: 'Tanpa batas waktu untuk pengulangan materi.',
                },
              ].map((card) => {
                const active = radCardVal === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setRadCardVal(card.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer flex items-start justify-between gap-2.5 ${
                      active
                        ? 'border-[#ee2e65] bg-[#FEF1F5] shadow-xs'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <span className={`font-semibold block ${active ? 'text-[#9D113C]' : 'text-gray-900'}`}>
                        {card.title}
                      </span>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{card.desc}</p>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        active ? 'border-[#ee2e65] bg-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {active && <span className="w-2 h-2 rounded-full bg-[#ee2e65] animate-ui-check" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}
    </>
  );
};
