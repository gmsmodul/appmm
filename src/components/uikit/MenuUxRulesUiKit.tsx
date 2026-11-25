import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpDown,
  ShieldAlert,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { CustomSelect, CustomSelectOption } from '../ui/CustomSelect';
import {
  ACTION_BTN_SECONDARY,
  ACTION_BTN_SOFT_PRIMARY,
} from '../../constants/buttonStyles';

interface MenuUxRulesUiKitProps {
  isVisible: (itemKey: string) => boolean;
}

const CITY_OPTIONS: CustomSelectOption[] = [
  { value: 'jkt', label: 'DKI Jakarta — Kampus Pusat', meta: 'WIB' },
  { value: 'bdg', label: 'Bandung — Studio Desain', meta: 'WIB' },
  { value: 'sby', label: 'Surabaya — Lab Teknik', meta: 'WIB' },
  { value: 'yog', label: 'Yogyakarta — Riset Kurikulum', meta: 'WIB' },
  { value: 'smg', label: 'Semarang — Pusat Pelatihan', meta: 'WIB' },
  { value: 'mlg', label: 'Malang — Akademi Vokasi', meta: 'WIB' },
  { value: 'mdn', label: 'Medan — Hub Sumatera', meta: 'WIB' },
  { value: 'plm', label: 'Palembang — Pusat Sains', meta: 'WIB' },
  { value: 'dps', label: 'Denpasar — Kampus Kreatif', meta: 'WITA' },
  { value: 'mks', label: 'Makassar — Hub Indonesia Timur', meta: 'WITA' },
  { value: 'bpn', label: 'Balikpapan — Pusat Energi', meta: 'WITA' },
  { value: 'mnd', label: 'Manado — Lab Kelautan', meta: 'WITA' },
  { value: 'bjm', label: 'Banjarmasin — Akademi Digital', meta: 'WITA' },
  { value: 'pdg', label: 'Padang — Riset Terapan', meta: 'WIB' },
  { value: 'slo', label: 'Surakarta — Studio Kriya', meta: 'WIB' },
  { value: 'jay', label: 'Jayapura — Hub Papua', meta: 'WIT' },
];

const MONTH_NAMES_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const MONTH_NAME_MAP: Record<string, number> = {
  jan: 0,
  januari: 0,
  january: 0,
  feb: 1,
  februari: 1,
  february: 1,
  mar: 2,
  maret: 2,
  march: 2,
  apr: 3,
  april: 3,
  mei: 4,
  may: 4,
  jun: 5,
  juni: 5,
  june: 5,
  jul: 6,
  juli: 6,
  july: 6,
  agu: 7,
  agustus: 7,
  aug: 7,
  august: 7,
  sep: 8,
  september: 8,
  okt: 9,
  oktober: 9,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  des: 11,
  desember: 11,
  dec: 11,
  december: 11,
};

function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getLeadingMondayOffset(year: number, monthIndex: number): number {
  return (new Date(year, monthIndex, 1).getDay() + 6) % 7;
}

function formatDateInput(year: number, monthIndex: number, day: number): string {
  return `${String(day).padStart(2, '0')}/${String(monthIndex + 1).padStart(2, '0')}/${year}`;
}

function parseFlexibleDate(raw: string): { year: number; month: number; day: number } | null {
  const s = raw.trim();
  if (!s) return null;

  const dmy = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]) - 1;
    const year = Number(dmy[3]);
    if (year >= 1940 && year <= 2035 && month >= 0 && month <= 11) {
      const maxD = getDaysInMonth(year, month);
      if (day >= 1 && day <= maxD) return { year, month, day };
    }
    return null;
  }

  const ymd = s.match(/^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})$/);
  if (ymd) {
    const year = Number(ymd[1]);
    const month = Number(ymd[2]) - 1;
    const day = Number(ymd[3]);
    if (year >= 1940 && year <= 2035 && month >= 0 && month <= 11) {
      const maxD = getDaysInMonth(year, month);
      if (day >= 1 && day <= maxD) return { year, month, day };
    }
    return null;
  }

  const named = s.match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/);
  if (named) {
    const day = Number(named[1]);
    const m = MONTH_NAME_MAP[named[2].toLowerCase()];
    const year = Number(named[3]);
    if (m !== undefined && year >= 1940 && year <= 2035) {
      const maxD = getDaysInMonth(year, m);
      if (day >= 1 && day <= maxD) return { year, month: m, day };
    }
  }

  return null;
}

const YEAR_OPTIONS: CustomSelectOption[] = Array.from({ length: 71 }, (_, i) => {
  const yr = String(2030 - i);
  return { value: yr, label: yr };
});

const MONTH_OPTIONS: CustomSelectOption[] = MONTH_NAMES_ID.map((m, idx) => ({
  value: String(idx),
  label: m,
}));

const COMPETENCY_TAGS = [
  { value: 'ui-systems', label: 'Design Systems', group: 'UI' },
  { value: 'motion-ux', label: 'Motion & Micro-interaction', group: 'Motion' },
  { value: 'a11y', label: 'Accessibility WCAG AA', group: 'Core' },
  { value: 'tokens', label: 'Typography & Tokens', group: 'UI' },
  { value: 'charts', label: 'Data Visualization', group: 'Analytics' },
  { value: 'forms', label: 'Form Validation UX', group: 'Entry' },
  { value: 'mobile', label: 'Responsive Touch Targets', group: 'Mobile' },
  { value: 'perf', label: 'Rendering Performance', group: 'Eng' },
  { value: 'tables', label: 'Dense Data Tables', group: 'Data' },
  { value: 'modals', label: 'Dialog & Focus Trap', group: 'Overlay' },
  { value: 'search', label: 'Command Palette Search', group: 'Nav' },
];

export const MenuUxRulesUiKit: React.FC<MenuUxRulesUiKitProps> = ({ isVisible }) => {
  // 01 · Type to filter
  const [selectedCity, setSelectedCity] = useState('bdg');

  // 02 · Typed dates
  const [birthYear, setBirthYear] = useState(1994);
  const [birthMonth, setBirthMonth] = useState(7); // Agustus
  const [birthDay, setBirthDay] = useState(14);
  const [typedDate, setTypedDate] = useState('14/08/1994');
  const [dateParseError, setDateParseError] = useState(false);

  const syncCalendarDate = (y: number, m: number, d: number) => {
    const clampedDay = Math.min(d, getDaysInMonth(y, m));
    setBirthYear(y);
    setBirthMonth(m);
    setBirthDay(clampedDay);
    setTypedDate(formatDateInput(y, m, clampedDay));
    setDateParseError(false);
  };

  const handleTypedDateChange = (nextVal: string) => {
    setTypedDate(nextVal);
    if (!nextVal.trim()) {
      setDateParseError(false);
      return;
    }
    const parsed = parseFlexibleDate(nextVal);
    if (parsed) {
      setBirthYear(parsed.year);
      setBirthMonth(parsed.month);
      setBirthDay(parsed.day);
      setDateParseError(false);
    } else {
      setDateParseError(true);
    }
  };

  // 03 · Stay open on pick
  const [stayOpenMenu, setStayOpenMenu] = useState(false);
  const [stayQuery, setStayQuery] = useState('');
  const [staySelected, setStaySelected] = useState<string[]>(['ui-systems', 'motion-ux', 'a11y']);
  const [stayCoords, setStayCoords] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
    openUp: boolean;
  } | null>(null);
  const stayTriggerRef = useRef<HTMLButtonElement>(null);
  const stayMenuRef = useRef<HTMLDivElement>(null);

  const filteredCompetencies = useMemo(() => {
    const q = stayQuery.trim().toLowerCase();
    if (!q) return COMPETENCY_TAGS;
    return COMPETENCY_TAGS.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    );
  }, [stayQuery]);

  const updateStayCoords = useCallback(() => {
    const el = stayTriggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - 12);
    const spaceAbove = Math.max(0, rect.top - 12);
    const openUp = spaceBelow < 230 && spaceAbove > spaceBelow;
    const maxHeight = Math.max(180, Math.min(312, openUp ? spaceAbove : spaceBelow));
    const width = Math.max(rect.width, 280);
    let left = rect.left;
    if (left + width > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - width - 12);
    }
    setStayCoords({
      top: openUp ? rect.top - 6 : rect.bottom + 6,
      left,
      width,
      maxHeight,
      openUp,
    });
  }, []);

  useEffect(() => {
    if (!stayOpenMenu) {
      setStayQuery('');
      return;
    }
    updateStayCoords();
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!stayTriggerRef.current?.contains(target) && !stayMenuRef.current?.contains(target)) {
        setStayOpenMenu(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStayOpenMenu(false);
    };
    const onScrollOrResize = (e: Event) => {
      if (stayMenuRef.current && e.target instanceof Node && stayMenuRef.current.contains(e.target)) {
        return;
      }
      updateStayCoords();
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
  }, [stayOpenMenu, updateStayCoords]);

  // 04 · Collision-aware
  const [collisionVal, setCollisionVal] = useState('auto');
  const [forceUpDemo, setForceUpDemo] = useState<'down' | 'up'>('up');

  // 05 · Reasons, not grey
  const [selectedPlanOption, setSelectedPlanOption] = useState('standard');
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [seatQuotaUpgraded, setSeatQuotaUpgraded] = useState(false);
  const [invoiceSettled, setInvoiceSettled] = useState(false);

  // 06 · No menu under 5
  const [priorityVal, setPriorityVal] = useState<'rendah' | 'sedang' | 'tinggi' | 'kritis'>('tinggi');
  const [thresholdMode, setThresholdMode] = useState<'3' | '4' | '7'>('4');
  const [thresholdPick, setThresholdPick] = useState('mingguan');

  const thresholdChoices = useMemo(() => {
    const base = [
      { value: 'harian', label: 'Harian' },
      { value: 'mingguan', label: 'Mingguan' },
      { value: 'bulanan', label: 'Bulanan' },
      { value: 'triwulan', label: 'Triwulan' },
      { value: 'semester', label: 'Semester' },
      { value: 'tahunan', label: 'Tahunan' },
      { value: 'kustom', label: 'Rentang Kustom' },
    ];
    return base.slice(0, Number(thresholdMode));
  }, [thresholdMode]);

  const reasonOptions: CustomSelectOption[] = [
    { value: 'standard', label: 'Workspace Standar', meta: 'Siap pakai' },
    {
      value: 'audit',
      label: 'Log Keamanan & Ekspor Audit',
      meta: twoFaEnabled ? 'Terverifikasi' : undefined,
      disabled: !twoFaEnabled,
      disabledReason: 'Membutuhkan verifikasi 2FA aktif terlebih dahulu',
      clearBlockerLabel: 'Aktifkan 2FA',
      onClearBlocker: () => setTwoFaEnabled(true),
    },
    {
      value: 'team-pro',
      label: 'Slot Tim Kolaboratif (Kursi #6)',
      meta: seatQuotaUpgraded ? '10 kursi' : undefined,
      disabled: !seatQuotaUpgraded,
      disabledReason: 'Batas tim 5/5 anggota telah tercapai',
      clearBlockerLabel: 'Tambah kuota',
      onClearBlocker: () => setSeatQuotaUpgraded(true),
    },
    {
      value: 'billing-pro',
      label: 'Aktivasi Domain Kustom',
      meta: invoiceSettled ? 'Lunas' : undefined,
      disabled: !invoiceSettled,
      disabledReason: 'Tagihan periode berjalan menunggu pelunasan',
      clearBlockerLabel: 'Tandai lunas',
      onClearBlocker: () => setInvoiceSettled(true),
    },
  ];

  if (!isVisible('menuuxrules')) return null;

  const daysInBirthMonth = getDaysInMonth(birthYear, birthMonth);
  const leadingBirthOffsets = getLeadingMondayOffset(birthYear, birthMonth);

  return (
    <UiDocPage
      title="Menu UX Rules"
      description="Enam pola menu interaktif yang menghemat waktu pengguna: Type-to-Filter (>10 baris), Typed Dates + Month/Year Jump, Stay Open on Pick + tombol Done, Collision-Aware Portal, Reasons Not Grey, dan No Menu Under 5."
      subLinks={[
        { id: 'mux-type-filter', label: '01 · Type to Filter' },
        { id: 'mux-typed-dates', label: '02 · Typed Dates' },
        { id: 'mux-stay-open', label: '03 · Stay Open on Pick' },
        { id: 'mux-collision', label: '04 · Collision-Aware' },
        { id: 'mux-reasons', label: '05 · Reasons, Not Grey' },
        { id: 'mux-no-menu-under-5', label: '06 · No Menu Under 5' },
      ]}
    >
      {/* 01 · Type to filter */}
      <UiDocSection
        id="mux-type-filter"
        title="01 · Type to Filter (> 10 Baris)"
        description="Daftar lebih dari 10 opsi otomatis menyematkan kolom pencarian di bagian atas menu agar pengguna tidak perlu menggulir tanpa henti."
        classesHint="CustomSelect searchable (auto when options.length >= 10)"
        codeSnippet={`// CustomSelect otomatis mengaktifkan kolom filter jika options.length >= 10
<CustomSelect
  value={city}
  onChange={setCity}
  searchPlaceholder="Ketik nama kota atau zona waktu..."
  options={cityOptions} // 16 lokasi
/>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start text-xs">
          <div className="md:col-span-6 space-y-2">
            <label className="font-semibold text-gray-800 block">
              Pilih Hub Akademik (16 Opsi — Otomatis Searchable)
            </label>
            <CustomSelect
              className="w-full"
              value={selectedCity}
              onChange={setSelectedCity}
              searchPlaceholder="Ketik kota, hub, atau WITA..."
              options={CITY_OPTIONS}
              ariaLabel="Pilih Hub Akademik"
            />
            <p className="text-[11px] text-gray-500">
              Nilai aktif: <code className="font-mono font-semibold text-gray-800">{selectedCity}</code> · Fokus langsung ke input filter saat dibuka.
            </p>
          </div>
          <div className="md:col-span-6 rounded-xl border border-gray-300 bg-gray-50/70 p-3.5 space-y-1.5">
            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-primary-600" />
              <span>Aturan Implementasi</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Setiap <code className="font-mono text-gray-800">CustomSelect</code> dengan &ge;10 item otomatis menyisipkan search box sticky, memfilter label + metadata + tombol hapus cepat, dan menampilkan empty state jika tidak ada yang cocok.
            </p>
          </div>
        </div>
      </UiDocSection>

      {/* 02 · Typed dates */}
      <UiDocSection
        id="mux-typed-dates"
        title="02 · Typed Dates + Month & Year Jump"
        description="Daripada memaksa pengguna menekan tombol panah ratusan kali untuk memilih tanggal lahir tahun 1994, sediakan input teks yang langsung diparse dan pemilih Bulan + Tahun."
        classesHint="Typed input (DD/MM/YYYY | YYYY-MM-DD | 14 Agu 1994) + Month & Year CustomSelect jump"
        actions={
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleTypedDateChange('14/08/1994')}
              className={ACTION_BTN_SOFT_PRIMARY}
            >
              <span>Lompat 14/08/1994</span>
            </button>
            <button
              type="button"
              onClick={() => syncCalendarDate(2026, 1, 18)}
              className={ACTION_BTN_SECONDARY}
            >
              <span>Hari Ini (2026)</span>
            </button>
          </div>
        }
        codeSnippet={`// Parse langsung DD/MM/YYYY, YYYY-MM-DD, atau "14 Agu 1994"
<input
  value={typedDate}
  onChange={(e) => handleTypedDateChange(e.target.value)}
  placeholder="DD/MM/YYYY atau 14 Agu 1994"
/>
<div className="flex gap-1.5">
  <CustomSelect options={MONTH_OPTIONS} value={String(month)} onChange={...} />
  <CustomSelect options={YEAR_OPTIONS} value={String(year)} onChange={...} />
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start text-xs">
          <div className="md:col-span-6 rounded-xl border border-gray-300 bg-white p-4 space-y-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-800 flex items-center justify-between">
                <span>Ketik Tanggal (Otomatis Parse)</span>
                <span className="text-[11px] font-mono text-gray-500">DD/MM/YYYY · YYYY-MM-DD</span>
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={typedDate}
                  onChange={(e) => handleTypedDateChange(e.target.value)}
                  placeholder="Misal: 14/08/1994 atau 1994-08-14"
                  className={`w-full h-9 pl-9 pr-3 rounded-lg border font-mono text-xs tabular-nums focus:outline-none transition-colors ${
                    dateParseError
                      ? 'border-rose-500 bg-rose-50/40 text-rose-700'
                      : 'border-gray-300 focus:border-primary-600 text-gray-900'
                  }`}
                />
              </div>
              {dateParseError ? (
                <p className="text-[11px] text-rose-600">
                  Format belum dikenali. Gunakan DD/MM/YYYY (mis. 14/08/1994) atau YYYY-MM-DD.
                </p>
              ) : (
                <p className="text-[11px] text-gray-500">
                  Hasil parse:{' '}
                  <strong className="text-gray-900 tabular-nums">
                    {birthDay} {MONTH_NAMES_ID[birthMonth]} {birthYear}
                  </strong>
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-gray-200 space-y-2.5">
              <div className="flex items-center gap-1.5">
                <CustomSelect
                  className="flex-1"
                  size="sm"
                  value={String(birthMonth)}
                  onChange={(val) => syncCalendarDate(birthYear, Number(val), birthDay)}
                  options={MONTH_OPTIONS}
                  ariaLabel="Pilih Bulan"
                />
                <CustomSelect
                  className="w-24"
                  size="sm"
                  value={String(birthYear)}
                  onChange={(val) => syncCalendarDate(Number(val), birthMonth, birthDay)}
                  options={YEAR_OPTIONS}
                  ariaLabel="Pilih Tahun"
                />
                <button
                  type="button"
                  onClick={() => {
                    const prevM = birthMonth === 0 ? 11 : birthMonth - 1;
                    const prevY = birthMonth === 0 ? Math.max(1960, birthYear - 1) : birthYear;
                    syncCalendarDate(prevY, prevM, birthDay);
                  }}
                  aria-label="Bulan sebelumnya"
                  className="h-8 w-8 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextM = (birthMonth + 1) % 12;
                    const nextY = birthMonth === 11 ? Math.min(2030, birthYear + 1) : birthYear;
                    syncCalendarDate(nextY, nextM, birthDay);
                  }}
                  aria-label="Bulan berikutnya"
                  className="h-8 w-8 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center tabular-nums">
                {['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'].map((d) => (
                  <div key={d} className="font-bold text-gray-500 py-1 text-[11px]">
                    {d}
                  </div>
                ))}
                {Array.from({ length: leadingBirthOffsets }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInBirthMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const active = birthDay === dayNum;
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => syncCalendarDate(birthYear, birthMonth, dayNum)}
                      className={`py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                        active
                          ? 'bg-gray-900 text-white font-bold'
                          : 'hover:bg-primary-50 text-gray-700'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-6 space-y-3">
            <div className="rounded-xl border border-gray-300 bg-gray-50/70 p-4 space-y-2">
              <div className="font-semibold text-gray-900">Mengapa ini menghemat ratusan klik?</div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Menjangkau Agustus 1994 dari tahun 2026 membutuhkan ~380 klik tombol panah kiri jika tanpa lompatan bulan/tahun. Dengan kombinasi <strong>Typed Input</strong> + <strong>Month/Year Jump (searchable)</strong>, pengguna cukup mengetik <code className="font-mono text-gray-800">14/08/1994</code> atau 2 klik di dropdown Tahun.
              </p>
            </div>
            <div className="rounded-xl border border-gray-300 bg-white p-3.5 space-y-1.5">
              <div className="text-[11px] font-semibold text-gray-700">Format yang didukung parser:</div>
              <div className="flex flex-wrap gap-1.5">
                {['14/08/1994', '1994-08-14', '14 Agu 1994', '01-01-2001'].map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => handleTypedDateChange(ex)}
                    className="px-2 py-1 rounded-md border border-gray-300 bg-gray-50 hover:bg-primary-50 hover:border-primary-300 font-mono text-[11px] text-gray-700 cursor-pointer transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 03 · Stay open on pick */}
      <UiDocSection
        id="mux-stay-open"
        title="03 · Stay Open on Pick + Explicit Done"
        description="Multi-select jangan langsung menutup menu setiap kali satu item dicentang. Tetap buka menu, perbarui hitungan secara live, dan tutup lewat tombol Done."
        classesHint="Stay open toggle + live count badge + explicit Done button in sticky footer"
        codeSnippet={`<div className="flex flex-col rounded-xl border bg-white shadow-xl">
  <SearchHeader value={query} onChange={setQuery} />
  <div className="flex-1 overflow-y-auto p-1.5">
    {items.map(item => (
      <button onClick={() => toggleItem(item.value)}>{/* menu stays open */}</button>
    ))}
  </div>
  <div className="border-t px-3 py-2 flex items-center justify-between bg-gray-50">
    <span className="tabular-nums font-semibold">{selected.length} dipilih</span>
    <button onClick={() => setOpen(false)}>Done</button>
  </div>
</div>`}
      >
        <div className="max-w-lg space-y-3 text-xs">
          <button
            ref={stayTriggerRef}
            type="button"
            onClick={() => setStayOpenMenu((v) => !v)}
            className={`w-full min-h-10 px-3 py-2 rounded-xl border bg-white flex items-center justify-between gap-2 transition-all cursor-pointer ${
              stayOpenMenu
                ? 'border-primary-500 ring-2 ring-primary-500/15'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Layers className="w-4 h-4 text-primary-600 shrink-0" />
              <span className="font-medium text-gray-800 truncate">
                {staySelected.length === 0
                  ? 'Pilih kompetensi UI KIT...'
                  : `${staySelected.length} kompetensi dipilih`}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-[11px] tabular-nums">
                {staySelected.length}/{COMPETENCY_TAGS.length}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-180 ${
                  stayOpenMenu ? 'rotate-180 text-primary-600' : ''
                }`}
              />
            </div>
          </button>

          {stayOpenMenu &&
            stayCoords &&
            createPortal(
              <div
                ref={stayMenuRef}
                style={{
                  position: 'fixed',
                  top: stayCoords.top,
                  left: stayCoords.left,
                  width: stayCoords.width,
                  maxHeight: stayCoords.maxHeight,
                  transform: stayCoords.openUp ? 'translateY(-100%)' : undefined,
                }}
                className={`${
                  stayCoords.openUp ? 'animate-ui-pop-up' : 'animate-ui-pop'
                } flex flex-col rounded-xl border border-gray-300 bg-white/95 backdrop-blur-sm shadow-[0_16px_38px_-10px_rgba(15,23,42,0.16)] z-[9999] overflow-hidden`}
              >
                <div className="p-1.5 border-b border-gray-200 bg-white shrink-0">
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 pointer-events-none" />
                    <input
                      type="text"
                      value={stayQuery}
                      onChange={(e) => setStayQuery(e.target.value)}
                      placeholder="Filter kompetensi..."
                      className="w-full h-8 pl-8 pr-7 rounded-lg border border-gray-300 bg-gray-50/70 text-xs focus:bg-white focus:outline-none focus:border-primary-500"
                    />
                    {stayQuery && (
                      <button
                        type="button"
                        onClick={() => setStayQuery('')}
                        className="absolute right-1.5 p-1 text-gray-500 hover:text-gray-800 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-1.5 overflow-y-auto space-y-0.5 flex-1">
                  {filteredCompetencies.map((item) => {
                    const active = staySelected.includes(item.value);
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setStaySelected((prev) =>
                            prev.includes(item.value)
                              ? prev.filter((x) => x !== item.value)
                              : [...prev, item.value]
                          )
                        }
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 text-left text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#FEF1F5] text-[#9D113C] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                              active
                                ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {active && <Check className="w-3 h-3 animate-ui-check" />}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gray-600 border border-gray-300/80 shrink-0">
                          {item.group}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-semibold text-gray-800 tabular-nums">
                      {staySelected.length} dipilih
                    </span>
                    {staySelected.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setStaySelected([])}
                        className="text-gray-500 hover:text-gray-900 underline cursor-pointer"
                      >
                        Kosongkan
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStayOpenMenu(false)}
                    className="px-3 py-1 rounded-lg bg-gray-900 hover:bg-black text-white text-[11px] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>,
              document.body
            )}

          {staySelected.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {staySelected.map((val) => {
                const found = COMPETENCY_TAGS.find((t) => t.value === val);
                if (!found) return null;
                return (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF1F5] text-[#9D113C] border border-[#FBC2D4]/70 text-[11px] font-semibold"
                  >
                    <span>{found.label}</span>
                    <button
                      type="button"
                      onClick={() => setStaySelected((prev) => prev.filter((x) => x !== val))}
                      aria-label={`Hapus ${found.label}`}
                      className="hover:text-[#ee2e65] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </UiDocSection>

      {/* 04 · Collision-aware */}
      <UiDocSection
        id="mux-collision"
        title="04 · Collision-Aware Portal & Flip Up"
        description="Menu yang dirender di dalam kartu overflow-hidden akan terpotong. Render via createPortal ke document.body dan balikkan arah ke atas (flip up) saat ruang di bawah terbatas."
        classesHint="createPortal(..., document.body) + spaceBelow < height -> openUp (animate-ui-pop-up)"
        actions={
          <button
            type="button"
            onClick={() => setForceUpDemo((d) => (d === 'up' ? 'down' : 'up'))}
            className={ACTION_BTN_SECONDARY}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Arah Uji: {forceUpDemo === 'up' ? 'Flip Up' : 'Auto Viewport'}</span>
          </button>
        }
        codeSnippet={`// Portal keluar dari overflow-hidden + deteksi tepi layar
const spaceBelow = window.innerHeight - rect.bottom - 12;
const spaceAbove = rect.top - 12;
const openUp = spaceBelow < Math.min(estHeight, 200) && spaceAbove > spaceBelow;
const maxHeight = Math.max(132, Math.min(272, openUp ? spaceAbove : spaceBelow));

return createPortal(
  <div style={{ position: 'fixed', top, left, maxHeight }} className={openUp ? 'animate-ui-pop-up' : 'animate-ui-pop'}>
    ...
  </div>,
  document.body
);`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-gray-300 bg-gray-50/60 p-4 overflow-hidden space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-900">Di dalam Kontainer overflow-hidden</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                Portal Bebas Klip
              </span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Meskipun kartu pembungkus ini memakai <code className="font-mono text-gray-800">overflow-hidden</code> dengan ruang sempit, menu tetap muncul utuh dan tidak terpotong batas kartu.
            </p>
            <CustomSelect
              className="w-full"
              direction={forceUpDemo}
              value={collisionVal}
              onChange={setCollisionVal}
              ariaLabel="Collision-aware Portal Select"
              options={[
                { value: 'auto', label: 'Otomatis Sesuai Viewport' },
                { value: 'top-flip', label: 'Flip Up Saat Dekat Bawah Layar' },
                { value: 'clamp-h', label: 'Max-Height Dibatasi Ruang Tersedia' },
                { value: 'scroll-sync', label: 'Sinkronisasi Posisi Saat Scroll' },
                { value: 'edge-safe', label: 'Aman dari Tepi Kanan/Kiri' },
              ]}
            />
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-2">
            <div className="font-semibold text-gray-900">Mekanisme Collision-Aware</div>
            <ul className="space-y-1.5 text-[11px] text-gray-600 list-disc pl-4">
              <li>
                <strong>Portal ke body:</strong> Memisahkan menu dari stacking context dan <code className="font-mono">overflow-hidden</code> kartu/tabel.
              </li>
              <li>
                <strong>Auto Flip-Up:</strong> Jika ruang di bawah trigger lebih sempit dibanding di atas, animasi otomatis berganti ke <code className="font-mono">animate-ui-pop-up</code>.
              </li>
              <li>
                <strong>Height Clamping:</strong> Tinggi maksimum menu dibatasi tepat sesuai ruang layar yang tersisa agar item paling bawah tetap dapat digulir.
              </li>
            </ul>
          </div>
        </div>
      </UiDocSection>

      {/* 05 · Reasons, not grey */}
      <UiDocSection
        id="mux-reasons"
        title="05 · Reasons, Not Grey (Alasan & Solusi 1-Klik)"
        description="Jangan hanya membuat item tidak aktif berwarna abu-abu bisu. Jelaskan penyebabnya tepat di baris opsi dan sediakan aksi 1-klik untuk membereskannya."
        classesHint="disabledReason + clearBlockerLabel + onClearBlocker"
        actions={
          twoFaEnabled || seatQuotaUpgraded || invoiceSettled ? (
            <button
              type="button"
              onClick={() => {
                setTwoFaEnabled(false);
                setSeatQuotaUpgraded(false);
                setInvoiceSettled(false);
                setSelectedPlanOption('standard');
              }}
              className={ACTION_BTN_SECONDARY}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Blocker</span>
            </button>
          ) : null
        }
        codeSnippet={`{
  value: 'audit',
  label: 'Log Keamanan & Ekspor Audit',
  disabled: !twoFaEnabled,
  disabledReason: 'Membutuhkan verifikasi 2FA aktif terlebih dahulu',
  clearBlockerLabel: 'Aktifkan 2FA',
  onClearBlocker: () => setTwoFaEnabled(true),
}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start text-xs">
          <div className="md:col-span-6 space-y-2">
            <label className="font-semibold text-gray-800 block">
              Buka Fitur Terkunci dari Dalam Menu
            </label>
            <CustomSelect
              className="w-full"
              value={selectedPlanOption}
              onChange={setSelectedPlanOption}
              options={reasonOptions}
              ariaLabel="Fitur dengan alasan blokir"
            />
            <p className="text-[11px] text-gray-500">
              Terpilih: <code className="font-mono font-semibold text-gray-800">{selectedPlanOption}</code>
            </p>
          </div>

          <div className="md:col-span-6 rounded-xl border border-gray-300 bg-gray-50/70 p-3.5 space-y-2">
            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Status Prasyarat (Live)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="rounded-lg border border-gray-300 bg-white px-2.5 py-2">
                <div className="text-gray-500">2FA</div>
                <div className={`font-semibold ${twoFaEnabled ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {twoFaEnabled ? 'Aktif' : 'Belum'}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 bg-white px-2.5 py-2">
                <div className="text-gray-500">Kursi Tim</div>
                <div className={`font-semibold ${seatQuotaUpgraded ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {seatQuotaUpgraded ? '10 kursi' : '5/5 penuh'}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 bg-white px-2.5 py-2">
                <div className="text-gray-500">Tagihan</div>
                <div className={`font-semibold ${invoiceSettled ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {invoiceSettled ? 'Lunas' : 'Tertunda'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 06 · No menu under 5 */}
      <UiDocSection
        id="mux-no-menu-under-5"
        title="06 · No Menu Under 5 (One Tap, Nothing Hidden)"
        description="Jika opsi kurang dari 5, hindari menyembunyikannya di balik dropdown menu. Tampilkan langsung sebagai Segmented Control atau Inline Radio."
        classesHint="< 5 options -> inline segmented control / radio group | >= 5 -> CustomSelect"
        actions={
          <div className="inline-flex items-center rounded-lg border border-gray-300 bg-gray-100 p-0.5 text-[11px]">
            {(
              [
                { val: '3', label: '3 Opsi' },
                { val: '4', label: '4 Opsi' },
                { val: '7', label: '7 Opsi' },
              ] as const
            ).map((m) => (
              <button
                key={m.val}
                type="button"
                onClick={() => setThresholdMode(m.val)}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  thresholdMode === m.val
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        }
        codeSnippet={`// Bila options.length < 5: langsung tampilkan Segmented Control / Inline Radio
{options.length < 5 ? (
  <div role="radiogroup" className="inline-flex rounded-lg border border-gray-300 bg-gray-100 p-0.5">
    {options.map(opt => <button onClick={() => setVal(opt.value)}>{opt.label}</button>)}
  </div>
) : (
  <CustomSelect value={val} onChange={setVal} options={options} />
)}`}
      >
        <div className="space-y-4 text-xs">
          {/* Dynamic Threshold Proof */}
          <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-gray-900">
                  Adaptor Otomatis Berdasarkan Jumlah Opsi ({thresholdChoices.length} Opsi)
                </div>
                <p className="text-[11px] text-gray-600">
                  {thresholdChoices.length < 5
                    ? 'Jumlah < 5: Dirender terbuka sebagai Segmented Control — satu ketukan, nol menu tersembunyi.'
                    : 'Jumlah >= 5: Dipromosikan ke CustomSelect agar tidak memenuhi baris horizontal.'}
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 ${
                  thresholdChoices.length < 5
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-primary-50 text-primary-700 border border-primary-200'
                }`}
              >
                {thresholdChoices.length < 5 ? 'Inline Segmented (1 tap)' : 'Dropdown Menu (>= 5)'}
              </span>
            </div>

            {thresholdChoices.length < 5 ? (
              <div
                role="radiogroup"
                aria-label="Frekuensi Evaluasi"
                className="inline-flex flex-wrap items-center rounded-xl border border-gray-300 bg-gray-100 p-1 gap-1"
              >
                {thresholdChoices.map((opt) => {
                  const active = thresholdPick === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setThresholdPick(opt.value)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-white text-gray-900 shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="max-w-xs">
                <CustomSelect
                  className="w-full"
                  value={thresholdPick}
                  onChange={setThresholdPick}
                  options={thresholdChoices}
                  ariaLabel="Frekuensi Evaluasi"
                />
              </div>
            )}
          </div>

          {/* Inline Radio 4 options example */}
          <div className="rounded-xl border border-gray-300 bg-gray-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-semibold text-gray-900">Prioritas Tugas (4 Opsi · Inline Radios)</div>
              <p className="text-[11px] text-gray-600">
                Seluruh opsi terbaca sekaligus tanpa klik pembuka menu.
              </p>
            </div>
            <div role="radiogroup" aria-label="Prioritas Tugas" className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'rendah', label: 'Rendah' },
                  { id: 'sedang', label: 'Sedang' },
                  { id: 'tinggi', label: 'Tinggi' },
                  { id: 'kritis', label: 'Kritis' },
                ] as const
              ).map((item) => {
                const active = priorityVal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPriorityVal(item.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'border-[#ee2e65] bg-[#FEF1F5] text-[#9D113C]'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        active ? 'border-[#ee2e65] bg-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {active && <span className="w-2 h-2 rounded-full bg-[#ee2e65]" />}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
