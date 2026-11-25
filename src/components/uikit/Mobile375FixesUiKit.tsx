import React, { useState } from 'react';
import {
  Check,
  X,
  CreditCard,
  Smartphone,
  Monitor,
  Hand,
  MousePointer,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';

interface ProjectRow {
  id: string;
  project: string;
  owner: string;
  deadline: string;
  budget: string;
  status: 'Approved' | 'Review' | 'Blocked';
}

const DEMO_PROJECTS: ProjectRow[] = [
  {
    id: 'PRJ-101',
    project: 'Modul UI Kit Mobile',
    owner: 'Nadia Putri',
    deadline: '18 Nov',
    budget: '+€5.3M',
    status: 'Approved',
  },
  {
    id: 'PRJ-102',
    project: 'Audit Safe-Area Nav',
    owner: 'Rafi Pratama',
    deadline: '21 Nov',
    budget: '+€1.8M',
    status: 'Review',
  },
  {
    id: 'PRJ-103',
    project: 'Refactor Form 16px',
    owner: 'Sinta Dewi',
    deadline: '24 Nov',
    budget: '+€920K',
    status: 'Blocked',
  },
];

const STATUS_BADGE_MAP: Record<ProjectRow['status'], string> = {
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Review: 'bg-amber-50 text-amber-700 border-amber-200',
  Blocked: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const Mobile375FixesUiKit: React.FC = () => {
  // Fix 1 state
  const [tableViewport, setTableViewport] = useState<'mobile-375' | 'desktop'>('mobile-375');

  // Fix 2 state
  const [kpiFixActive, setKpiFixActive] = useState(true);
  const [kpiFrameWidth, setKpiFrameWidth] = useState<320 | 375>(375);

  // Fix 3 state
  const [inputFixActive, setInputFixActive] = useState(true);
  const [focusedField, setFocusedField] = useState<'name' | 'card' | 'exp' | 'cvc' | null>('card');
  const [cardName, setCardName] = useState('Aulia Rahman');
  const [cardNumber, setCardNumber] = useState('4532 8910 2201 7741');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('842');

  // Fix 4 state
  const [pointerMode, setPointerMode] = useState<'coarse' | 'fine'>('coarse');
  const [lastTappedAction, setLastTappedAction] = useState<string>('Approve');

  // Fix 5 state
  const [safeAreaActive, setSafeAreaActive] = useState(true);
  const [selectedQueueIds, setSelectedQueueIds] = useState<string[]>(['Q-01', 'Q-05']);

  const toggleQueueItem = (id: string) => {
    setSelectedQueueIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <UiDocPage
      title="Mobile 375px Fixes"
      description="5 titik paling sering rusak pada dashboard 375px beserta perbaikan standar yang langsung aktif di seluruh aplikasi: Table-to-Card (< 640px), KPI 1 baris, Input >= 16px anti-zoom + keyboard, Touch Target 44px (pointer: coarse), dan Safe-Area Bottom Bar."
      subLinks={[
        { id: 'm375-tables', label: '1. Tables → Cards' },
        { id: 'm375-kpi', label: '2. Big Numbers 1 Line' },
        { id: 'm375-inputs', label: '3. 16px & Keyboards' },
        { id: 'm375-targets', label: '4. 44px Touch Targets' },
        { id: 'm375-bottom-bar', label: '5. Bottom Bar Safe-Area' },
      ]}
    >
      {/* FIX 1 · TABLES */}
      <UiDocSection
        id="m375-tables"
        title="Fix 1 · Tables (< 640px: table → cards)"
        description="Di layar < 640px, tabel multi-kolom memaksa pengguna menggeser horizontal dan menyembunyikan Status serta Deadline. Gunakan kartu terstruktur (`sm:hidden`) untuk < 640px dan pertahankan `<table>` (`hidden sm:block`) untuk tablet/desktop."
        classesHint="sm:hidden (cards) + hidden sm:block (table)"
        actions={
          <div className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100/80 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setTableViewport('mobile-375')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                tableViewport === 'mobile-375'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="tabular-nums">375px Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setTableViewport('desktop')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                tableViewport === 'desktop'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Table</span>
            </button>
          </div>
        }
        codeSnippet={`{/* Mobile < 640px: Stacked Card Rows */}
<div className="sm:hidden divide-y divide-gray-200 bg-white">
  {rows.map((row) => (
    <div key={row.id} className="p-3.5 space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] font-semibold text-gray-900">{row.project}</p>
          <p className="text-xs text-gray-500">{row.owner}</p>
        </div>
        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium border shrink-0">
          {row.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
        <div><span className="text-gray-500">Deadline:</span> <span className="font-medium text-gray-800">{row.deadline}</span></div>
        <div className="text-right tabular-nums font-semibold text-gray-900">{row.budget}</div>
      </div>
    </div>
  ))}
</div>

{/* Tablet/Desktop >= 640px: Standard Table */}
<div className="hidden sm:block overflow-x-auto">
  <table className="w-full text-left border-collapse">...</table>
</div>`}
      >
        {tableViewport === 'mobile-375' ? (
          <div className="mx-auto w-full max-w-[375px] rounded-2xl border border-gray-300 bg-gray-50 p-3 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-medium text-gray-600 px-0.5">
              <span className="tabular-nums">Viewport: 375px · sm:hidden active</span>
              <span className="text-emerald-700 font-semibold">0 hidden columns</span>
            </div>
            <div className="rounded-xl border border-gray-300/90 bg-white divide-y divide-gray-200 overflow-hidden">
              {DEMO_PROJECTS.map((row) => (
                <div key={row.id} className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 truncate">{row.project}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {row.id} · {row.owner}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium whitespace-nowrap shrink-0 ${STATUS_BADGE_MAP[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-500">Deadline: </span>
                      <span className="font-medium text-gray-900 tabular-nums">{row.deadline}</span>
                    </div>
                    <div className="text-right font-semibold text-gray-900 tabular-nums">
                      {row.budget}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-300/90">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                  <th className="py-2.5 px-3.5">ID</th>
                  <th className="py-2.5 px-3.5">Project</th>
                  <th className="py-2.5 px-3.5">Owner</th>
                  <th className="py-2.5 px-3.5">Deadline</th>
                  <th className="py-2.5 px-3.5 text-right">Budget</th>
                  <th className="py-2.5 px-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {DEMO_PROJECTS.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-2.5 px-3.5 text-gray-500 tabular-nums">{row.id}</td>
                    <td className="py-2.5 px-3.5 font-semibold text-gray-900">{row.project}</td>
                    <td className="py-2.5 px-3.5 text-gray-600">{row.owner}</td>
                    <td className="py-2.5 px-3.5 text-gray-700 tabular-nums">{row.deadline}</td>
                    <td className="py-2.5 px-3.5 text-right font-semibold text-gray-900 tabular-nums">
                      {row.budget}
                    </td>
                    <td className="py-2.5 px-3.5 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium whitespace-nowrap ${STATUS_BADGE_MAP[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </UiDocSection>

      {/* FIX 2 · BIG NUMBERS */}
      <UiDocSection
        id="m375-kpi"
        title="Fix 2 · Big Numbers (One Line, Capped Size)"
        description="Di kartu KPI 2 kolom pada layar sempit (320–375px), font besar seperti `text-3xl` membuat tanda `+` terpisah baris atau nilai panjang (`+Rp 14.8jt`) meluber keluar kartu. Bungkus kartu dengan `.kpi-container` (`container-type: inline-size`) dan gunakan `.kpi-value` agar ukuran huruf mengikuti lebar kartu (`clamp(1.0625rem, 12.5cqi, 1.875rem)`) serta terkunci 1 baris."
        classesHint=".kpi-container + .kpi-value (nowrap + tabular-nums + cqi clamp)"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-full border border-gray-300 dark:border-white/[0.12] bg-gray-100/80 dark:bg-[#1B1E24] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setKpiFrameWidth(320)}
                className={`px-2.5 py-1 rounded-full font-medium tabular-nums whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  kpiFrameWidth === 320
                    ? 'bg-white dark:bg-[#252A34] text-gray-900 dark:text-[#F3F4F6] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                320px
              </button>
              <button
                type="button"
                onClick={() => setKpiFrameWidth(375)}
                className={`px-2.5 py-1 rounded-full font-medium tabular-nums whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  kpiFrameWidth === 375
                    ? 'bg-white dark:bg-[#252A34] text-gray-900 dark:text-[#F3F4F6] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                375px
              </button>
            </div>
            <button
              type="button"
              onClick={() => setKpiFixActive((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                kpiFixActive
                  ? 'border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                  : 'border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/15 text-rose-800 dark:text-rose-300'
              }`}
            >
              {kpiFixActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              <span>{kpiFixActive ? 'Fixed: .kpi-value' : 'Before: Uncapped Wrap'}</span>
            </button>
          </div>
        }
        codeSnippet={`/* Global utility in src/index.css */
.kpi-container {
  container-type: inline-size;
}
.kpi-value {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  font-size: clamp(1.0625rem, 4.8vw, 1.875rem);
  line-height: 1.15;
}
.kpi-container .kpi-value {
  font-size: clamp(1.0625rem, 12.5cqi, 1.875rem);
}

<div className="kpi-container rounded-xl border p-3">
  <p className="kpi-value font-bold text-gray-900">+Rp 14.8jt</p>
</div>`}
      >
        <div
          style={{ maxWidth: `${kpiFrameWidth}px` }}
          className="mx-auto w-full rounded-2xl border border-gray-300 dark:border-white/[0.12] bg-gray-50 dark:bg-[#15181E] p-3 transition-[max-width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-400 mb-2.5">
            <span className="tabular-nums truncate">Card Container: {kpiFrameWidth}px (2-col grid)</span>
            <span className={`shrink-0 ${kpiFixActive ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-rose-700 dark:text-rose-400 font-semibold'}`}>
              {kpiFixActive ? '1 line locked' : 'Wraps on narrow width'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="kpi-container rounded-xl border border-gray-300/90 dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-3 min-w-0 overflow-hidden">
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">Net Growth</p>
              <p
                className={
                  kpiFixActive
                    ? 'mt-1.5 kpi-value font-bold text-gray-900 dark:text-[#F3F4F6] tracking-tight'
                    : 'mt-1.5 text-[28px] leading-[1.08] font-bold text-gray-900 dark:text-[#F3F4F6] break-words'
                }
              >
                {kpiFixActive ? '+€5.3M' : '+ €5.3 M'}
              </p>
              <p className="mt-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 tabular-nums truncate">+12.4% MoM</p>
            </div>
            <div className="kpi-container rounded-xl border border-gray-300/90 dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-3 min-w-0 overflow-hidden">
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">Tuition Total</p>
              <p
                className={
                  kpiFixActive
                    ? 'mt-1.5 kpi-value font-bold text-gray-900 dark:text-[#F3F4F6] tracking-tight'
                    : 'mt-1.5 text-[28px] leading-[1.08] font-bold text-gray-900 dark:text-[#F3F4F6] break-words'
                }
              >
                +Rp 14.8jt
              </p>
              <p className="mt-1 text-[11px] font-medium text-gray-600 dark:text-gray-400 tabular-nums truncate">98.4% settled</p>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* FIX 3 · INPUTS */}
      <UiDocSection
        id="m375-inputs"
        title="Fix 3 · Inputs (16px, and the right keyboard)"
        description="iOS Safari otomatis memperbesar layar (auto-zoom) ketika pengguna mengetuk input dengan `font-size < 16px`. Gunakan `text-base sm:text-sm` (`16px` di mobile, `14px` di desktop) serta atribut `inputMode`, `autoComplete`, dan `enterKeyHint`."
        classesHint="text-base sm:text-sm + inputMode='numeric' + enterKeyHint='next'"
        actions={
          <button
            type="button"
            onClick={() => setInputFixActive((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              inputFixActive
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                : 'border-rose-300 bg-rose-50 text-rose-800'
            }`}
          >
            {inputFixActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{inputFixActive ? 'Fixed: 16px + Keyboards' : 'Before: 14px (Auto-Zoom)'}</span>
          </button>
        }
        codeSnippet={`<input
  type="text"
  inputMode="numeric"
  autoComplete="cc-number"
  enterKeyHint="next"
  placeholder="4532 8910 2201 7741"
  className="w-full h-11 px-3 rounded-xl border border-gray-300 text-base sm:text-sm text-gray-900"
/>`}
      >
        <div className="mx-auto w-full max-w-[375px] rounded-2xl border border-gray-300 bg-gray-50 p-3.5 space-y-3">
          <div
            className={`rounded-xl border px-3 py-2 text-[11px] font-medium flex items-center justify-between gap-2 ${
              inputFixActive
                ? 'border-emerald-300 bg-emerald-50/90 text-emerald-800'
                : 'border-rose-300 bg-rose-50/90 text-rose-800'
            }`}
          >
            <span className="tabular-nums">
              {inputFixActive ? 'Computed font-size: 16px · No iOS Zoom' : 'Computed font-size: 14px · iOS Safari Zooms!'}
            </span>
            <span className="font-semibold shrink-0 tabular-nums">
              {focusedField === 'card' || focusedField === 'exp' || focusedField === 'cvc'
                ? inputFixActive
                  ? 'Keypad: Numeric'
                  : 'Keypad: Text'
                : 'Keypad: Text'}
            </span>
          </div>

          <div
            className={`rounded-xl border border-gray-300 bg-white p-3.5 space-y-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-left ${
              !inputFixActive && focusedField ? 'scale-[1.03] ring-2 ring-rose-300/70' : 'scale-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                <CreditCard className="w-3.5 h-3.5 text-gray-600" />
                <span>Update Billing Card</span>
              </div>
              <Lock className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">
                Name on card <span className="text-gray-400">(autoComplete=&quot;cc-name&quot;)</span>
              </label>
              <input
                type="text"
                autoComplete="cc-name"
                enterKeyHint="next"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`no-ios-zoom-guard w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-900 ${
                  inputFixActive ? 'text-base sm:text-sm' : 'text-[14px]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-600 mb-1">
                Card number <span className="text-gray-400">(inputMode=&quot;numeric&quot;)</span>
              </label>
              <input
                type="text"
                inputMode={inputFixActive ? 'numeric' : 'text'}
                autoComplete="cc-number"
                enterKeyHint="next"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                onFocus={() => setFocusedField('card')}
                onBlur={() => setFocusedField(null)}
                className={`no-ios-zoom-guard w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-gray-900 tabular-nums focus:outline-none focus:border-gray-900 ${
                  inputFixActive ? 'text-base sm:text-sm' : 'text-[14px]'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Expiry</label>
                <input
                  type="text"
                  inputMode={inputFixActive ? 'numeric' : 'text'}
                  autoComplete="cc-exp"
                  enterKeyHint="next"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  onFocus={() => setFocusedField('exp')}
                  onBlur={() => setFocusedField(null)}
                  className={`no-ios-zoom-guard w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-gray-900 tabular-nums focus:outline-none focus:border-gray-900 ${
                    inputFixActive ? 'text-base sm:text-sm' : 'text-[14px]'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">CVC</label>
                <input
                  type="text"
                  inputMode={inputFixActive ? 'numeric' : 'text'}
                  autoComplete="cc-csc"
                  enterKeyHint="done"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  onFocus={() => setFocusedField('cvc')}
                  onBlur={() => setFocusedField(null)}
                  className={`no-ios-zoom-guard w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-gray-900 tabular-nums focus:outline-none focus:border-gray-900 ${
                    inputFixActive ? 'text-base sm:text-sm' : 'text-[14px]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* FIX 4 · TOUCH TARGETS */}
      <UiDocSection
        id="m375-targets"
        title="Fix 4 · Touch Targets (44px, on touch only)"
        description="Tombol 28px terlalu kecil untuk ibu jari, tetapi memperbesarnya di desktop merusak kepadatan layout. Gunakan `@media (pointer: coarse)` dengan kelas `.touch-target-44` agar tinggi minimum `44px` hanya aktif pada layar sentuh."
        classesHint=".touch-target-44 (@media (pointer: coarse) { min-height: 44px; })"
        actions={
          <div className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100/80 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setPointerMode('coarse')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                pointerMode === 'coarse'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>Touch (coarse)</span>
            </button>
            <button
              type="button"
              onClick={() => setPointerMode('fine')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                pointerMode === 'fine'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>Mouse (fine)</span>
            </button>
          </div>
        }
        codeSnippet={`/* src/index.css */
@media (pointer: coarse) {
  .touch-target-44 {
    min-height: 44px;
  }
}

<button type="button" className="touch-target-44 h-8 px-3 rounded-lg ...">
  Approve
</button>`}
      >
        <div className="mx-auto w-full max-w-[375px] rounded-2xl border border-gray-300 bg-gray-50 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-medium text-gray-600">
            <span>
              Pointer: <strong className="text-gray-900">{pointerMode}</strong>
            </span>
            <span className="tabular-nums font-semibold text-gray-900">
              Target height: {pointerMode === 'coarse' ? '44px' : '32px'}
            </span>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-3.5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-semibold text-gray-900">Pengajuan Izin Kelas</p>
                <p className="text-xs text-gray-500">Nadia Putri · Batch 12 Pagi</p>
              </div>
              <span className="text-[11px] font-medium text-gray-500 tabular-nums">Terakhir: {lastTappedAction}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLastTappedAction('Approve')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  pointerMode === 'coarse' ? 'min-h-[44px]' : 'h-8'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>
              <button
                type="button"
                onClick={() => setLastTappedAction('Reject')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  pointerMode === 'coarse' ? 'min-h-[44px]' : 'h-8'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* FIX 5 · BOTTOM BAR */}
      <UiDocSection
        id="m375-bottom-bar"
        title="Fix 5 · Bottom Bar (safe-area, and room below)"
        description="Bar bawah fixed (`bottom: 0`) sering masuk ke bawah home indicator iOS/Android dan menutupi baris daftar terakhir. Tambahkan `viewport-fit=cover` di HTML, pad bar dengan `env(safe-area-inset-bottom)`, serta beri padding bawah pada area konten."
        classesHint="viewport-fit=cover + env(safe-area-inset-bottom) + pb-[calc(5.25rem+env(safe-area-inset-bottom))]"
        actions={
          <button
            type="button"
            onClick={() => setSafeAreaActive((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              safeAreaActive
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                : 'border-rose-300 bg-rose-50 text-rose-800'
            }`}
          >
            {safeAreaActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{safeAreaActive ? 'Fixed: Safe-Area + Room' : 'Before: Home Bar Overlap'}</span>
          </button>
        }
        codeSnippet={`<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

{/* Scrollable content reserves space for fixed bottom bar + safe area */}
<main className="pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-0">
  {children}
</main>

{/* Fixed bottom bar clears iOS/Android home indicator */}
<div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-4 z-50">
  <ActionBar />
</div>`}
      >
        <div className="mx-auto w-full max-w-[375px] rounded-[26px] border border-gray-400/80 bg-white overflow-hidden shadow-xs">
          {/* Simulated list body */}
          <div
            className={`p-3 space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar transition-[padding] duration-200 ${
              safeAreaActive ? 'pb-20' : 'pb-2'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 px-1">
              <span>Scroll ke paling bawah:</span>
              <span className={safeAreaActive ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                {safeAreaActive ? 'Item 05 terbaca utuh' : 'Item 05 tertutup bar'}
              </span>
            </div>
            {[
              { id: 'Q-01', title: 'Item 01 · Verifikasi Absensi' },
              { id: 'Q-02', title: 'Item 02 · Nilai Ujian Tengah' },
              { id: 'Q-03', title: 'Item 03 · Catatan Mentor' },
              { id: 'Q-04', title: 'Item 04 · Jadwal Remedial' },
              { id: 'Q-05', title: 'Item 05 · Evaluasi Akhir (Last Row)' },
            ].map((item) => {
              const checked = selectedQueueIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleQueueItem(item.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    checked
                      ? 'border-gray-900 bg-gray-50 text-gray-900 font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span
                    className={`w-4 h-4 rounded border inline-flex items-center justify-center shrink-0 ${
                      checked ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Simulated fixed bottom bar + iOS home indicator */}
          <div className="relative bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div
              className={`px-3.5 pt-2.5 flex items-center justify-between gap-2 transition-[padding] duration-200 ${
                safeAreaActive ? 'pb-7' : 'pb-1.5'
              }`}
            >
              <span className="text-xs font-medium text-gray-700 tabular-nums">
                {selectedQueueIds.length} selected
              </span>
              <button
                type="button"
                onClick={() => setSelectedQueueIds(['Q-01', 'Q-05'])}
                className="touch-target-44 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
              >
                <span>Approve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Simulated home indicator */}
            <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex justify-center">
              <div className="w-28 h-1 rounded-full bg-gray-900/75" />
            </div>
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
