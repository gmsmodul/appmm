import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  Check,
  X,
  Sun,
  Moon,
  Lock,
  Unlock,
  Bell,
  Cloud,
  ShieldCheck,
  Volume2,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { ToggleSwitch, ToggleColor } from '../ui/ToggleSwitch';
import { useApp } from '../../context/AppContext';
import { playUiMotionSound } from '../../utils/uiMotionSound';

interface ToggleUiKitProps {
  isVisible: (itemKey: string) => boolean;
}

interface SegmentedToggleProps {
  options: Array<{ id: string; label: string }>;
  value: string;
  onChange: (next: string) => void;
  color?: 'rose' | 'dark' | 'violet';
}

const SegmentedPillToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  color = 'rose',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const activeBtn = btnRefs.current[value];
      if (!track || !activeBtn) return;
      const tRect = track.getBoundingClientRect();
      const bRect = activeBtn.getBoundingClientRect();
      if (bRect.width === 0) return;
      setIndicator({
        left: bRect.left - tRect.left,
        width: bRect.width,
        ready: true,
      });
    };

    measure();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [value, options]);

  const pillBg =
    color === 'dark'
      ? 'bg-[#1C1D21] shadow-xs'
      : color === 'violet'
      ? 'bg-[#6852EC] shadow-[0_4px_12px_-3px_rgba(104,82,236,0.45)]'
      : 'bg-[#ee2e65] shadow-[0_4px_12px_-3px_rgba(238,46,101,0.45)]';

  return (
    <div
      ref={trackRef}
      role="tablist"
      className="relative inline-flex items-center p-1 rounded-full bg-[#F4F5F8] border border-black/[0.12]"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1 bottom-1 left-0 rounded-full transition-[transform,width,opacity] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${pillBg} ${
          indicator.ready ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${indicator.width}px`,
          transform: `translate3d(${indicator.left}px, 0, 0)`,
        }}
      />
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            ref={(el) => {
              btnRefs.current[opt.id] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => {
              if (opt.id !== value) {
                playUiMotionSound('tick');
                onChange(opt.id);
              }
            }}
            className={`relative z-10 inline-grid place-items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer whitespace-nowrap ${
              active ? 'text-white' : 'text-[#5A5D67] hover:text-[#1C1D21]'
            }`}
          >
            <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
              {opt.label}
            </span>
            <span className="col-start-1 row-start-1">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export const ToggleUiKit: React.FC<ToggleUiKitProps> = ({ isVisible }) => {
  const { triggerToast } = useApp();

  // 1. Sizes & Colors
  const [smOn, setSmOn] = useState(true);
  const [mdOn, setMdOn] = useState(true);
  const [lgOn, setLgOn] = useState(false);
  const [colorStates, setColorStates] = useState<Record<ToggleColor, boolean>>({
    primary: true,
    emerald: true,
    violet: true,
    dark: false,
  });

  // 2. Icon & Inner Label Toggles
  const [iconToggleOn, setIconToggleOn] = useState(true);
  const [textToggleOn, setTextToggleOn] = useState(true);
  const [darkThemeOn, setDarkThemeOn] = useState(false);
  const [accessUnlocked, setAccessUnlocked] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(true);

  // 3. Disabled & Async Loading
  const [asyncOn, setAsyncOn] = useState(true);
  const [asyncBusy, setAsyncBusy] = useState(false);

  // 4. Setting Rows & Cards
  const [rowSettings, setRowSettings] = useState({
    autoPublish: true,
    emailDigest: false,
    strictMode: true,
  });
  const [cardSettings, setCardSettings] = useState<Record<string, boolean>>({
    notif: true,
    cloud: true,
    guard: false,
    sound: true,
  });

  // 5. Segmented Pill Toggles
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [densityMode, setDensityMode] = useState('comfortable');
  const [publishScope, setPublishScope] = useState('public');

  const handleAsyncToggle = (next: boolean) => {
    setAsyncBusy(true);
    window.setTimeout(() => {
      setAsyncOn(next);
      setAsyncBusy(false);
      playUiMotionSound('success');
      triggerToast(
        'Sinkronisasi Toggle',
        next ? 'Fitur otomatis diaktifkan.' : 'Fitur otomatis dinonaktifkan.',
        'success'
      );
    }, 260);
  };

  if (!isVisible('toggle')) return null;

  return (
    <UiDocPage
      title="Toggle"
      subLinks={[
        { id: 'tog-basic', label: 'Sizes & Semantic Colors' },
        { id: 'tog-variants', label: 'Icon & Track Label Toggles' },
        { id: 'tog-states', label: 'Disabled & Async States' },
        { id: 'tog-cards', label: 'Toggle Rows & Setting Cards' },
        { id: 'tog-segmented', label: 'Segmented Pill Toggle' },
      ]}
    >
      {/* 1. Basic Sizes & Colors */}
      <UiDocSection
        id="tog-basic"
        title="Sizes & Semantic Colors"
        description="Sakelar toggle berbasis Spring physics (stiffness: 520, damping: 32) dengan kurva --ease-out dan tiga ukuran standar UI KIT."
        classesHint="ToggleSwitch | size='sm' | 'md' | 'lg' | color='primary' | 'emerald' | 'violet' | 'dark'"
        codeSnippet={`<ToggleSwitch size="sm" color="primary" checked={on} onChange={setOn} label="Small Toggle" />
<ToggleSwitch size="md" color="emerald" checked={on} onChange={setOn} label="Medium Toggle" />
<ToggleSwitch size="lg" color="violet" checked={on} onChange={setOn} label="Large Toggle" />`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Sizes */}
          <div className="rounded-xl border border-gray-300/90 bg-white p-4 space-y-3.5">
            <span className="font-semibold text-gray-800 block">Scale Sizing (sm / md / lg)</span>
            <ToggleSwitch
              size="sm"
              color="primary"
              checked={smOn}
              onChange={setSmOn}
              label="Small (32×18px)"
              description="Kompak untuk baris tabel atau kartu rapat"
              className="w-full"
            />
            <ToggleSwitch
              size="md"
              color="primary"
              checked={mdOn}
              onChange={setMdOn}
              label="Medium (40×22px · Default)"
              description="Standar formulir dan panel pengaturan"
              className="w-full"
            />
            <ToggleSwitch
              size="lg"
              color="primary"
              checked={lgOn}
              onChange={setLgOn}
              label="Large (50×28px · Touch)"
              description="Target sentuh ideal untuk tampilan mobile"
              className="w-full"
            />
          </div>

          {/* Semantic Colors */}
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-4 space-y-3.5">
            <span className="font-semibold text-gray-800 block">Semantic Brand Colors</span>
            {(
              [
                { color: 'primary', title: 'Primary Rose (#ee2e65)', sub: 'Aksi utama UI Design System' },
                { color: 'emerald', title: 'Success Emerald (#10B981)', sub: 'Status aktif & sinkronisasi' },
                { color: 'violet', title: 'Accent Violet (#6852EC)', sub: 'Fitur eksperimental & matrix' },
                { color: 'dark', title: 'Ink Dark (#1C1D21)', sub: 'Kontras tinggi netral' },
              ] as const
            ).map((item) => (
              <ToggleSwitch
                key={item.color}
                size="md"
                color={item.color}
                checked={colorStates[item.color]}
                onChange={(next) =>
                  setColorStates((prev) => ({ ...prev, [item.color]: next }))
                }
                label={item.title}
                description={item.sub}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </UiDocSection>

      {/* 2. Icon & Inner Label Toggles */}
      <UiDocSection
        id="tog-variants"
        title="Icon Thumb & Inner Track Label Toggles"
        description="Varian sakelar dengan ikon di dalam thumb maupun teks indikator ON/OFF di dalam rel."
        classesHint="checkedIcon | uncheckedIcon | onLabel | offLabel"
        codeSnippet={`<ToggleSwitch
  size="lg"
  checked={enabled}
  onChange={setEnabled}
  checkedIcon={<Check className="w-3 h-3 text-[#ee2e65]" />}
  uncheckedIcon={<X className="w-3 h-3 text-gray-500" />}
/>
<ToggleSwitch size="md" onLabel="ON" offLabel="OFF" checked={on} onChange={setOn} />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {/* Check / X Icon Thumb */}
          <div className="rounded-xl border border-gray-300/90 bg-white p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-gray-900">Status Icon Thumb</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {iconToggleOn ? 'Tervalidasi aktif' : 'Dinonaktifkan'}
              </div>
            </div>
            <ToggleSwitch
              size="lg"
              color="primary"
              checked={iconToggleOn}
              onChange={setIconToggleOn}
              checkedIcon={<Check className="w-3 h-3 text-[#ee2e65] stroke-[2.8]" />}
              uncheckedIcon={<X className="w-3 h-3 text-gray-500 stroke-[2.5]" />}
              ariaLabel="Status icon toggle"
            />
          </div>

          {/* ON / OFF Track Text */}
          <div className="rounded-xl border border-gray-300/90 bg-white p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-gray-900">Inner ON / OFF Label</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                Track: {textToggleOn ? 'ON' : 'OFF'}
              </div>
            </div>
            <ToggleSwitch
              size="md"
              color="emerald"
              onLabel="ON"
              offLabel="OFF"
              checked={textToggleOn}
              onChange={setTextToggleOn}
              ariaLabel="Inner label toggle"
            />
          </div>

          {/* Sun / Moon Appearance */}
          <div
            className={`rounded-xl border p-4 flex items-center justify-between gap-3 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              darkThemeOn
                ? 'bg-[#1C1D21] border-[#1C1D21] text-white'
                : 'bg-white border-gray-300/90 text-gray-900'
            }`}
          >
            <div>
              <div className="font-semibold">
                {darkThemeOn ? 'Mode Gelap' : 'Mode Terang'}
              </div>
              <div className={`text-[11px] mt-0.5 ${darkThemeOn ? 'text-white/65' : 'text-gray-500'}`}>
                Tema kanvas pratinjau
              </div>
            </div>
            <ToggleSwitch
              size="lg"
              color="violet"
              checked={darkThemeOn}
              onChange={setDarkThemeOn}
              checkedIcon={<Moon className="w-3 h-3 text-[#6852EC]" />}
              uncheckedIcon={<Sun className="w-3 h-3 text-amber-500" />}
              ariaLabel="Theme switch"
            />
          </div>

          {/* Lock / Unlock Security */}
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-gray-900">Akses Publik</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {accessUnlocked ? 'Terbuka untuk anggota' : 'Terkunci admin'}
              </div>
            </div>
            <ToggleSwitch
              size="md"
              color="dark"
              checked={accessUnlocked}
              onChange={setAccessUnlocked}
              checkedIcon={<Unlock className="w-2.5 h-2.5 text-[#1C1D21]" />}
              uncheckedIcon={<Lock className="w-2.5 h-2.5 text-gray-500" />}
              ariaLabel="Access lock toggle"
            />
          </div>

          {/* Eye / Visibility */}
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4 flex items-center justify-between gap-3 sm:col-span-2 lg:col-span-2">
            <div className="min-w-0">
              <div className="font-semibold text-gray-900">Pratinjau Token Rahasia</div>
              <div className="text-[11px] text-gray-500 font-mono mt-0.5 truncate">
                {previewVisible ? 'uk_live_94f2a8b1_029c' : '••••••••••••••••••••••'}
              </div>
            </div>
            <ToggleSwitch
              size="md"
              color="primary"
              checked={previewVisible}
              onChange={setPreviewVisible}
              checkedIcon={<Eye className="w-2.5 h-2.5 text-[#ee2e65]" />}
              uncheckedIcon={<EyeOff className="w-2.5 h-2.5 text-gray-500" />}
              ariaLabel="Token visibility toggle"
            />
          </div>
        </div>
      </UiDocSection>

      {/* 3. Disabled & Async Loading */}
      <UiDocSection
        id="tog-states"
        title="Disabled & Async Loading States"
        description="Status nonaktif terkunci sistem serta sakelar asinkron dengan spinner saat menyimpan konfigurasi."
        classesHint="disabled | loading | aria-busy"
        codeSnippet={`<ToggleSwitch disabled checked={false} onChange={() => {}} label="Disabled Off" />
<ToggleSwitch disabled checked={true} onChange={() => {}} label="Disabled On" />
<ToggleSwitch loading={isSaving} checked={val} onChange={handleSave} label="Async Save" />`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4">
            <ToggleSwitch
              disabled
              checked={false}
              onChange={() => {}}
              label="Disabled (Off)"
              description="Memerlukan izin admin"
              className="w-full"
            />
          </div>
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4">
            <ToggleSwitch
              disabled
              checked={true}
              onChange={() => {}}
              color="primary"
              label="Disabled (On)"
              description="Dikunci kebijakan keamanan"
              className="w-full"
            />
          </div>
          <div className="rounded-xl border border-gray-300/90 bg-white p-4">
            <ToggleSwitch
              checked={asyncOn}
              loading={asyncBusy}
              onChange={handleAsyncToggle}
              color="violet"
              label={asyncBusy ? 'Menyimpan...' : 'Auto-Sync Cloud'}
              description="Klik untuk simulasi simpan 260ms"
              className="w-full"
            />
          </div>
        </div>
      </UiDocSection>

      {/* 4. Toggle Rows & Setting Cards */}
      <UiDocSection
        id="tog-cards"
        title="Toggle Setting Rows & Feature Cards"
        description="Pola daftar pengaturan hairline dan kartu fitur interaktif dengan highlight Primary Rose (#ee2e65) saat aktif."
        classesHint="divide-y divide-black/[0.12] / border-[#ee2e65] bg-[#FEF1F5]"
        codeSnippet={`<button className={active ? 'border-[#ee2e65] bg-[#FEF1F5]' : 'border-gray-300 bg-white'}>
  <ToggleSwitch checked={active} onChange={toggle} />
</button>`}
      >
        <div className="space-y-4 text-xs">
          {/* Hairline List Rows */}
          <div className="rounded-2xl border border-gray-300/90 bg-white divide-y divide-black/[0.12] overflow-hidden">
            {[
              {
                key: 'autoPublish' as const,
                title: 'Publikasi Token Otomatis',
                desc: 'Perbarui perubahan variabel UI ke tim desain saat rilis.',
              },
              {
                key: 'emailDigest' as const,
                title: 'Ringkasan Aktivitas Mingguan',
                desc: 'Kirim catatan perubahan komponen setiap hari Senin pagi.',
              },
              {
                key: 'strictMode' as const,
                title: 'Validasi Kontras Aksesibilitas (WCAG AA)',
                desc: 'Peringatkan otomatis jika rasio kontras warna berada di bawah 4.5:1.',
              },
            ].map((row) => (
              <div key={row.key} className="px-4 py-3 hover:bg-[#FAFBFD] transition-colors">
                <ToggleSwitch
                  size="md"
                  color="primary"
                  checked={rowSettings[row.key]}
                  onChange={(next) =>
                    setRowSettings((prev) => ({ ...prev, [row.key]: next }))
                  }
                  label={row.title}
                  description={row.desc}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'notif',
                title: 'Notifikasi Push',
                desc: 'Info pembaruan komponen instan.',
                icon: Bell,
              },
              {
                id: 'cloud',
                title: 'Cloud Backup',
                desc: 'Simpan state UI KIT ke cloud.',
                icon: Cloud,
              },
              {
                id: 'guard',
                title: 'Proteksi Audit',
                desc: 'Catat setiap perubahan izin.',
                icon: ShieldCheck,
              },
              {
                id: 'sound',
                title: 'Sensory Audio',
                desc: 'Efek suara klik halus mikro.',
                icon: Volume2,
              },
            ].map((card) => {
              const active = Boolean(cardSettings[card.id]);
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    const next = !active;
                    playUiMotionSound(next ? 'pop' : 'tick');
                    setCardSettings((prev) => ({ ...prev, [card.id]: next }));
                  }}
                  className={`rounded-2xl border p-3.5 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex flex-col justify-between gap-3 ${
                    active
                      ? 'border-[#ee2e65] bg-[#FEF1F5] shadow-xs'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        active
                          ? 'bg-[#ee2e65] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                      <ToggleSwitch
                        size="sm"
                        color="primary"
                        checked={active}
                        onChange={(next) =>
                          setCardSettings((prev) => ({ ...prev, [card.id]: next }))
                        }
                        ariaLabel={card.title}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={`font-semibold ${active ? 'text-[#9D113C]' : 'text-gray-900'}`}>
                      {card.title}
                    </div>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </UiDocSection>

      {/* 5. Segmented Pill Toggle */}
      <UiDocSection
        id="tog-segmented"
        title="Segmented Pill Toggle (2-Way & 3-Way)"
        description="Toggle multi-opsi kapsul dengan indikator geser mulus (--ease-out 220ms) dan pengunci lebar inline-grid agar teks tidak bergeser."
        classesHint="ResizeObserver gliding pill / inline-grid zero-jump"
        codeSnippet={`<SegmentedPillToggle
  value={cycle}
  onChange={setCycle}
  options={[
    { id: 'monthly', label: 'Bulanan' },
    { id: 'yearly', label: 'Tahunan (-20%)' },
  ]}
/>`}
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-gray-300/90 bg-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ee2e65]" />
              <span className="font-semibold text-gray-800">2-Way Binary Toggle:</span>
            </div>
            <SegmentedPillToggle
              color="rose"
              value={billingCycle}
              onChange={setBillingCycle}
              options={[
                { id: 'monthly', label: 'Bulanan' },
                { id: 'yearly', label: 'Tahunan (-20%)' },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-gray-300/90 bg-white">
            <span className="font-semibold text-gray-800">3-Way Density Toggle (Violet):</span>
            <SegmentedPillToggle
              color="violet"
              value={densityMode}
              onChange={setDensityMode}
              options={[
                { id: 'compact', label: 'Compact' },
                { id: 'comfortable', label: 'Comfortable' },
                { id: 'spacious', label: 'Spacious' },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-gray-300/90 bg-white">
            <span className="font-semibold text-gray-800">3-Way Visibility Toggle (Ink Dark):</span>
            <SegmentedPillToggle
              color="dark"
              value={publishScope}
              onChange={setPublishScope}
              options={[
                { id: 'private', label: 'Private' },
                { id: 'team', label: 'Team' },
                { id: 'public', label: 'Public' },
              ]}
            />
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
