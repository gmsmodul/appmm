import React, { useState, useEffect } from 'react';
import { Play, Pause, Copy, Check, Sparkles } from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import {
  UiLoader,
  UI_LOADERS_CATALOG,
  UiLoaderVariant,
} from '../ui/UiLoader';
import { useApp } from '../../context/AppContext';

const ACCENT_PALETTES = [
  { id: 'lime', label: 'Electric Lime', color: '#C6F135', track: 'rgba(255,255,255,0.14)' },
  { id: 'rose', label: 'Primary Rose', color: '#ee2e65', track: 'rgba(255,255,255,0.14)' },
  { id: 'violet', label: 'Indigo Violet', color: '#8B7BFF', track: 'rgba(255,255,255,0.14)' },
  { id: 'cyan', label: 'Sky Cyan', color: '#38BDF8', track: 'rgba(255,255,255,0.14)' },
] as const;

export const LoadingAnimationsUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [selectedId, setSelectedId] = useState<UiLoaderVariant>('spinner-arc');
  const [accentId, setAccentId] = useState<(typeof ACCENT_PALETTES)[number]['id']>('lime');
  const [autoCycle, setAutoCycle] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);

  const activeLoader =
    UI_LOADERS_CATALOG.find((item) => item.id === selectedId) || UI_LOADERS_CATALOG[0];
  const activePalette =
    ACCENT_PALETTES.find((p) => p.id === accentId) || ACCENT_PALETTES[0];

  useEffect(() => {
    if (!autoCycle) return;
    const timer = window.setInterval(() => {
      setSelectedId((prev) => {
        const idx = UI_LOADERS_CATALOG.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % UI_LOADERS_CATALOG.length;
        return UI_LOADERS_CATALOG[nextIdx].id;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [autoCycle]);

  const handleCopyLoader = () => {
    const snippet = `<UiLoader variant="${activeLoader.id}" size="lg" color="${activePalette.color}" />`;
    navigator.clipboard?.writeText(snippet);
    setCopiedSlug(true);
    triggerToast('Disalin', `${activeLoader.slug} disalin ke papan klip.`, 'success');
    window.setTimeout(() => setCopiedSlug(false), 1600);
  };

  return (
    <UiDocPage
      title="20 Loading Animations"
      description="Koleksi 20 animasi loading modern (termasuk loader/spinner-arc, dual-ring, morph-blob, newton-dots, hingga terminal-pulse) dalam panggung dark-window interaktif dan komponen reusable <UiLoader />."
      subLinks={[
        { id: 'ldr-stage', label: 'Interactive Stage (20 Loaders)' },
        { id: 'ldr-gallery', label: 'All 20 Loaders Grid' },
        { id: 'ldr-app-usage', label: 'Light App Integration' },
      ]}
    >
      {/* SECTION 1: macOS Dark Stage Window + Numbered 1..20 List */}
      <UiDocSection
        id="ldr-stage"
        title="Interactive Loader Stage (loader/spinner-arc · 1–20)"
        description="Pilih angka 1–20 di bawah jendela preview (atau aktifkan Auto-Cycle) untuk melihat animasi loading secara penuh di kanvas gelap."
        classesHint="<UiLoader variant='spinner-arc' size='xl' color='#C6F135' />"
        actions={
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="inline-flex items-center gap-1 rounded-full border border-gray-300 dark:border-white/[0.12] bg-gray-100/80 dark:bg-[#1B1E24] px-2 py-1">
              {ACCENT_PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  title={p.label}
                  aria-label={`Warna aksen ${p.label}`}
                  onClick={() => setAccentId(p.id)}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                    accentId === p.id ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-1 dark:ring-offset-[#1B1E24] scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: p.color }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAutoCycle((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-colors cursor-pointer ${
                autoCycle
                  ? 'bg-gray-900 dark:bg-[#C6F135] text-white dark:text-[#121418] border-gray-900 dark:border-[#C6F135]'
                  : 'bg-white dark:bg-[#1B1E24] text-gray-700 dark:text-gray-200 border-gray-300 dark:border-white/[0.12] hover:bg-gray-50 dark:hover:bg-[#232730]'
              }`}
            >
              {autoCycle ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{autoCycle ? 'Pause Cycle' : 'Auto-Cycle'}</span>
            </button>
          </div>
        }
        codeSnippet={`import { UiLoader } from '../components/ui/UiLoader';\n\n<UiLoader\n  variant="${activeLoader.id}"\n  size="xl"\n  color="${activePalette.color}"\n/>`}
      >
        <div className="space-y-5">
          {/* Dark macOS Showcase Window matching the reel layout */}
          <div
            data-dark-preserve="true"
            className="rounded-2xl overflow-hidden border border-gray-900/90 dark:border-white/[0.12] bg-[#121418] shadow-[0_20px_50px_-16px_rgba(15,23,42,0.45)] dark:shadow-[0_24px_56px_-16px_rgba(0,0,0,0.75)]"
          >
            {/* Window Titlebar */}
            <div className="px-4 py-3 bg-[#1B1E24] border-b border-white/[0.07] flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              <div className="px-3 py-1 rounded-full bg-[#121418] border border-white/10 text-[11px] font-mono text-gray-300 truncate">
                {activeLoader.slug}
              </div>

              <button
                type="button"
                onClick={handleCopyLoader}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-medium text-gray-200 transition-colors cursor-pointer shrink-0"
              >
                {copiedSlug ? (
                  <>
                    <Check className="w-3 h-3 text-[#C6F135]" />
                    <span>Disalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="hidden sm:inline">Copy JSX</span>
                  </>
                )}
              </button>
            </div>

            {/* Center Stage */}
            <div className="h-56 sm:h-64 flex flex-col items-center justify-center relative px-6">
              <div
                aria-hidden="true"
                className="absolute w-44 h-44 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-300"
                style={{ backgroundColor: activePalette.color }}
              />
              <div key={`${activeLoader.id}-${accentId}`} className="relative z-10 animate-ui-fade">
                <UiLoader
                  variant={activeLoader.id}
                  size="xl"
                  color={activePalette.color}
                  trackColor={activePalette.track}
                  label={activeLoader.name}
                />
              </div>
              <div className="mt-6 text-center space-y-0.5 relative z-10">
                <div className="text-xs font-semibold text-white tracking-tight">
                  {activeLoader.num}. {activeLoader.name}
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/[0.08] text-[10px] font-medium text-gray-300">
                    {activeLoader.category}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 max-w-md">{activeLoader.description}</p>
              </div>
            </div>
          </div>

          {/* 2-Column Numbered 1..20 Index matching the Reel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
            {UI_LOADERS_CATALOG.map((item) => {
              const isSelected = item.id === activeLoader.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setAutoCycle(false);
                    setSelectedId(item.id);
                  }}
                  className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121418] dark:bg-[#1B1E24] text-white border-[#121418] dark:border-[#C6F135]/60 shadow-xs'
                      : 'bg-gray-50/70 dark:bg-[#121418] hover:bg-gray-100/90 dark:hover:bg-[#1B1E24] text-gray-800 dark:text-gray-200 border-gray-200/80 dark:border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 text-xs font-bold tabular-nums shrink-0 ${
                        isSelected ? 'text-[#C6F135]' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {item.num}.
                    </span>
                    <span className="text-xs font-semibold truncate">{item.name}</span>
                  </div>
                  <span
                    className={`text-[10.5px] font-mono shrink-0 ${
                      isSelected ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {item.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </UiDocSection>

      {/* SECTION 2: All 20 Loaders Live Grid */}
      <UiDocSection
        id="ldr-gallery"
        title="All 20 Loaders Live Grid"
        description="Klik kartu mana saja untuk menyorot animasi di stage utama dan menyalin kode komponennya."
        classesHint="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3"
        codeSnippet={`{UI_LOADERS_CATALOG.map((item) => (\n  <UiLoader key={item.id} variant={item.id} size="md" color="#C6F135" />\n))}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {UI_LOADERS_CATALOG.map((item) => {
            const isSelected = item.id === activeLoader.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAutoCycle(false);
                  setSelectedId(item.id);
                  document.getElementById('ldr-stage')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className={`group rounded-xl p-3 bg-[#15181E] dark:bg-[#121418] border text-left transition-all flex flex-col items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-[#C6F135] ring-2 ring-[#C6F135]/30'
                    : 'border-gray-800 dark:border-white/[0.10] hover:border-gray-600 dark:hover:border-white/25 hover:-translate-y-0.5'
                }`}
                data-dark-preserve="true"
              >
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className={isSelected ? 'text-[#C6F135] font-bold' : ''}>
                    #{String(item.num).padStart(2, '0')}
                  </span>
                  <span className="opacity-70">{item.category}</span>
                </div>
                <div className="h-12 flex items-center justify-center">
                  <UiLoader
                    variant={item.id}
                    size="md"
                    color={activePalette.color}
                    trackColor={activePalette.track}
                    label={item.name}
                  />
                </div>
                <div className="w-full text-center text-[11px] font-semibold text-gray-200 truncate">
                  {item.name}
                </div>
              </button>
            );
          })}
        </div>
      </UiDocSection>

      {/* SECTION 3: Light Surface Application Usage */}
      <UiDocSection
        id="ldr-app-usage"
        title="Light App Integration (Buttons, Cards & Search)"
        description="Contoh pemakaian <UiLoader /> pada permukaan aplikasi terang (tombol aksi, kartu sinkronisasi, dan indikator pencarian)."
        classesHint="<UiLoader variant='spinner-arc' size='sm' color='#ee2e65' trackColor='#fde0e9' />"
        codeSnippet={`<button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ee2e65] text-white text-xs font-semibold">\n  <UiLoader variant="spinner-arc" size="sm" color="#FFFFFF" trackColor="rgba(255,255,255,0.28)" />\n  <span>Menyimpan...</span>\n</button>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl border border-gray-300 bg-white p-4 flex flex-col justify-between gap-3">
            <div className="text-[11px] font-semibold text-gray-500">Action Button</div>
            <div>
              <button
                type="button"
                onClick={() => triggerToast('Sedang Memproses', 'Menggunakan UiLoader spinner-arc pada tombol.', 'info')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ee2e65] text-white font-semibold cursor-pointer"
              >
                <UiLoader
                  variant="spinner-arc"
                  size="sm"
                  color="#FFFFFF"
                  trackColor="rgba(255,255,255,0.28)"
                />
                <span>Sinkronkan Data</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-4 flex flex-col justify-between gap-3">
            <div className="text-[11px] font-semibold text-gray-500">AI / Search Status</div>
            <div className="flex items-center gap-2.5 text-gray-700 font-medium">
              <UiLoader
                variant="typing-wave"
                size="sm"
                color="#ee2e65"
                trackColor="#FEF1F5"
              />
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#ee2e65]" />
                Menyiapkan saran...
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-4 flex flex-col justify-between gap-3">
            <div className="text-[11px] font-semibold text-gray-500">Inline Card Sync</div>
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
              <span className="font-medium text-gray-800">Upload Modul</span>
              <UiLoader
                variant="elastic-ring"
                size="sm"
                color="currentColor"
                trackColor="rgba(156,163,175,0.28)"
              />
            </div>
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
