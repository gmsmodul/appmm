import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Smartphone,
  Monitor,
  ShieldCheck,
  Hand,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import {
  ACTION_BTN_PRIMARY,
  ACTION_BTN_SECONDARY,
  ACTION_BTN_SOFT_PRIMARY,
  ACTION_BTN_DARK,
  ACTION_BTN_DANGER_SOFT,
} from '../../constants/buttonStyles';

type EntrancePreset = 'ui-page' | 'ui-stagger' | 'ui-fade' | 'ui-slide-down';
type PopPreset =
  | 'animate-ui-pop'
  | 'animate-ui-pop-up'
  | 'animate-ui-pop-right'
  | 'animate-ui-pop-left'
  | 'animate-ui-toast'
  | 'animate-menu-fold-up'
  | 'animate-ui-drawer-left'
  | 'animate-ui-drawer-right'
  | 'animate-ui-drawer-top'
  | 'animate-ui-drawer-bottom';

const POP_PRESETS: {
  id: PopPreset;
  label: string;
  spec: string;
  origin: string;
}[] = [
  { id: 'animate-ui-pop', label: 'Pop Down', spec: '180ms var(--ease-out) · scale(0.95)', origin: 'Dropdown / Popover' },
  { id: 'animate-ui-pop-up', label: 'Pop Up', spec: '180ms var(--ease-out) · scale(0.95)', origin: 'Dropup Menu' },
  { id: 'animate-ui-pop-right', label: 'Pop Right', spec: '180ms var(--ease-out) · scale(0.95)', origin: 'Submenu Kanan' },
  { id: 'animate-ui-pop-left', label: 'Pop Left', spec: '180ms var(--ease-out) · scale(0.95)', origin: 'Submenu Kiri' },
  { id: 'animate-ui-toast', label: 'Toast In', spec: '240ms var(--ease-out) · scale(0.95)', origin: 'Toast / Alert' },
  { id: 'animate-menu-fold-up', label: 'Menu Fold Up', spec: '240ms var(--ease-out) · scale(0.95)', origin: 'Mobile Dock Menu' },
  { id: 'animate-ui-drawer-left', label: 'Drawer Left', spec: '260ms var(--ease-out)', origin: 'Sidebar / Laci Kiri' },
  { id: 'animate-ui-drawer-right', label: 'Drawer Right', spec: '260ms var(--ease-out)', origin: 'Detail Panel Kanan' },
  { id: 'animate-ui-drawer-top', label: 'Drawer Top', spec: '260ms var(--ease-out)', origin: 'Top Sheet' },
  { id: 'animate-ui-drawer-bottom', label: 'Drawer Bottom', spec: '280ms var(--ease-out)', origin: 'Bottom Sheet' },
];

const SLIDE_TABS = ['Overview', 'Tokens', 'Springs', 'Gestures'] as const;

export const MotionUiKit: React.FC = () => {
  // 0. Emil Kowalski 3 CSS Animation Rules (Side by Side)
  const [rule1Active, setRule1Active] = useState(false);
  const [rule2Open, setRule2Open] = useState(true);
  const [rule3Seq, setRule3Seq] = useState(1);

  // 0B. Spring vs Linear, Own-Beat Stagger, Overshoot + Blur + Sound
  const [swapSpringActive, setSwapSpringActive] = useState(false);
  const [staggerBeatSeq, setStaggerBeatSeq] = useState(1);
  const [tinyOvershoot, setTinyOvershoot] = useState(true);
  const [tinyBlur, setTinyBlur] = useState(true);
  const [tinySound, setTinySound] = useState(true);
  const [tinySeq, setTinySeq] = useState(1);

  // 1. Easing Curves
  const [easingActive, setEasingActive] = useState(false);

  // 2. Entrance & Stagger
  const [entrancePreset, setEntrancePreset] = useState<EntrancePreset>('ui-stagger');
  const [entranceSeq, setEntranceSeq] = useState(1);

  // 3. Popovers & Drawers
  const [popPreset, setPopPreset] = useState<PopPreset>('animate-ui-pop');
  const [popSeq, setPopSeq] = useState(1);

  // 4. Tactile Feedback
  const [shakeSeq, setShakeSeq] = useState(0);
  const [checkSeq, setCheckSeq] = useState(1);
  const [checkedTactile, setCheckedTactile] = useState(true);
  const [progressStripedAnimated, setProgressStripedAnimated] = useState(true);

  // 5. Framer Motion Springs & Adaptive Axis
  const [springMode, setSpringMode] = useState<'mobile' | 'desktop'>('mobile');
  const [springStep, setSpringStep] = useState(0);
  const [springDirection, setSpringDirection] = useState<1 | -1>(1);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [activeSlideTab, setActiveSlideTab] = useState<number>(0);
  const [simulateReduced, setSimulateReduced] = useState(false);
  const [a11yMoved, setA11yMoved] = useState(false);

  const replayEntrance = (preset: EntrancePreset) => {
    setEntrancePreset(preset);
    setEntranceSeq((s) => s + 1);
  };

  const replayPop = (preset: PopPreset) => {
    setPopPreset(preset);
    setPopSeq((s) => s + 1);
  };

  const triggerSpringStep = (dir: 1 | -1) => {
    setSpringDirection(dir);
    setSpringStep((prev) => (prev + dir + 4) % 4);
  };

  return (
    <UiDocPage
      title="Motion & Animations"
      description="Standar gerak UI KIT berbasis aturan Emil Kowalski (--ease-out / --ease-fluid, durasi < 300ms, scale(0.95) + opacity: 0), dikombinasikan dengan Spring physics, Own-Beat Stagger (+45ms/beat), dan Sensory Polish."
      subLinks={[
        { id: 'mot-emil-rules', label: '3 CSS Animation Rules' },
        { id: 'mot-craft-details', label: 'Spring, Stagger & Sensory Polish' },
        { id: 'mot-easing', label: 'Easing Curves' },
        { id: 'mot-entrance', label: 'Entrances & Stagger' },
        { id: 'mot-pop', label: 'Popovers, Fold & Drawers' },
        { id: 'mot-feedback', label: 'Feedback Micro-Interactions' },
        { id: 'mot-spring', label: 'Springs & Adaptive Axis' },
        { id: 'mot-a11y', label: 'Reduced Motion & Rules' },
      ]}
    >
      {/* 0. EMIL KOWALSKI'S 3 CSS ANIMATION RULES (RECOMMENDED STANDARDS) */}
      <UiDocSection
        id="mot-emil-rules"
        title="Emil Kowalski's 3 CSS Animation Rules"
        description="Tiga standar animasi CSS yang diterapkan di seluruh UI KIT: Emil's ease-out (200ms), 180ms Dropdown, dan scale(0.95) + opacity: 0 untuk seluruh komponen masuk."
        classesHint="--ease-out: cubic-bezier(0.23, 1, 0.32, 1) | 200ms buttons | 180ms dropdown | scale(0.95) + opacity: 0"
        codeSnippet={`:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-fluid: cubic-bezier(0.23, 1, 0.32, 1);
}

/* 1. Emil's ease-out (200ms) on buttons & menus */
.ui-btn { transition: transform 200ms var(--ease-out); }

/* 2. Recommended: 180ms Dropdown (< 300ms) */
.ui-dropdown { animation: ui-pop 180ms var(--ease-out) both; }

/* 3. Recommended: scale(0.95) + opacity: 0 */
@keyframes ui-pop {
  from { opacity: 0; scale: 0.95; filter: blur(2px); }
  to   { opacity: 1; scale: 1;    filter: blur(0px); }
}`}
      >
        <div className="space-y-4">
          {/* RULE 1: Emil's ease-out (200ms) */}
          <div className="rounded-xl border border-emerald-200/90 bg-white p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                    Rule 1
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Emil&apos;s ease-out (200ms)</span>
                  </span>
                  <code className="text-[11px] font-mono text-[#9D113C] bg-[#FEF1F5] px-1.5 py-0.5 rounded">
                    cubic-bezier(0.23, 1, 0.32, 1)
                  </code>
                </div>
                <p className="text-xs text-gray-500">
                  Digunakan pada seluruh tombol dan menu UI KIT agar respon instan di awal dan mendarat lembut di posisi akhir.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRule1Active((v) => !v);
                  playUiMotionSound('tick', tinySound);
                }}
                className={ACTION_BTN_PRIMARY}
              >
                {rule1Active ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Putar (200ms)</span>
              </button>
            </div>

            <div className="relative h-10 rounded-lg bg-[#FEF1F5]/50 border border-[#FBC2D4]/60 flex items-center overflow-hidden px-2">
              <div
                style={{
                  transitionProperty: 'left',
                  transitionDuration: '200ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  left: rule1Active ? 'calc(100% - 5.5rem)' : '0.35rem',
                }}
                className="absolute h-7 px-3 rounded-md bg-[#ee2e65] text-white text-[11px] font-semibold inline-flex items-center justify-center shadow-xs"
              >
                Menu Item
              </div>
            </div>
          </div>

          {/* RULE 2: Recommended: 180ms Dropdown */}
          <div className="rounded-xl border border-emerald-200/90 bg-white p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                    Rule 2
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Recommended: 180ms Dropdown</span>
                  </span>
                  <code className="text-[11px] font-mono text-[#9D113C] bg-[#FEF1F5] px-1.5 py-0.5 rounded">
                    180ms var(--ease-out)
                  </code>
                </div>
                <p className="text-xs text-gray-500">
                  Seluruh dropdown, CustomSelect, dan popover UI KIT menggunakan durasi sub-300ms (<code>180ms</code>) agar sigap tanpa membuat pengguna menunggu.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRule2Open((v) => !v);
                  playUiMotionSound('pop', tinySound);
                }}
                className={ACTION_BTN_SOFT_PRIMARY}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-[180ms] ${rule2Open ? 'rotate-180' : ''}`} />
                <span>{rule2Open ? 'Tutup Dropdown' : 'Buka Dropdown'}</span>
              </button>
            </div>

            <div className="min-h-[124px] rounded-lg bg-[#FEF1F5]/35 border border-[#FBC2D4]/50 p-2.5 flex flex-col justify-start text-xs">
              <div
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '180ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  opacity: rule2Open ? 1 : 0,
                  transform: rule2Open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.95)',
                  pointerEvents: rule2Open ? 'auto' : 'none',
                }}
                className="max-w-xs rounded-lg bg-white border border-[#FBC2D4]/60 shadow-sm p-1.5 space-y-1 origin-top"
              >
                <div className="px-2.5 py-1 rounded bg-[#FEF1F5] font-semibold text-[#9D113C]">Duplikat Modul</div>
                <div className="px-2.5 py-1 rounded text-gray-700">Ekspor PDF</div>
                <div className="px-2.5 py-1 rounded text-rose-600">Hapus Draf</div>
              </div>
            </div>
          </div>

          {/* RULE 3: Recommended: scale(0.95) + opacity: 0 */}
          <div className="rounded-xl border border-emerald-200/90 bg-white p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                    Rule 3
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Recommended: scale(0.95) + opacity: 0</span>
                  </span>
                  <code className="text-[11px] font-mono text-[#9D113C] bg-[#FEF1F5] px-1.5 py-0.5 rounded">
                    180ms var(--ease-out)
                  </code>
                </div>
                <p className="text-xs text-gray-500">
                  &ldquo;Nothing in the real world appears from nothing.&rdquo; Semua modal, toast, popover, dan halaman muncul halus dari <code>scale(0.95)</code> + <code>opacity: 0</code>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  playUiMotionSound('pop', tinySound);
                  setRule3Seq((s) => s + 1);
                }}
                className={ACTION_BTN_SECONDARY}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Animasi</span>
              </button>
            </div>

            <div className="h-24 rounded-lg bg-[#FEF1F5]/35 border border-[#FBC2D4]/50 flex items-center justify-center p-3 text-xs">
              <div
                key={`ninetyfive-${rule3Seq}`}
                style={{ animation: 'demo-scale-95 180ms cubic-bezier(0.23, 1, 0.32, 1) both' }}
                className="rounded-xl bg-white border border-[#FBC2D4]/70 shadow-sm px-4 py-2.5 text-center"
              >
                <p className="font-semibold text-gray-900">Muncul alami dari scale(0.95)</p>
                <p className="text-[11px] text-[#9D113C]">Halus, cepat &amp; realistis</p>
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 0B. SPRING, OWN-BEAT STAGGER & SENSORY POLISH */}
      <UiDocSection
        id="mot-craft-details"
        title="Spring, Own-Beat Stagger & Sensory Polish"
        description="Standar gerak organik UI KIT: gunakan Spring fisik, biarkan tiap elemen tiba pada ketukannya sendiri (+45ms/beat), dan padukan sedikit overshoot, motion blur, serta suara halus saat mendarat."
        classesHint="type: 'spring' | staggerChildren: 0.045 | overshoot + blur(4px) + playUiMotionSound('land')"
        codeSnippet={`// 1. Recommended: Spring (Hidup & Organik)
transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.8 }}

// 2. Recommended: Own-Beat Stagger (+45ms / beat)
transition={{ delay: index * 0.045, type: 'spring', stiffness: 440, damping: 24, mass: 0.78 }}

// 3. Sensory Polish: Overshoot + Motion Blur + Landing Sound
initial={{ opacity: 0, scale: 0.95, y: 10, filter: 'blur(4px)' }}
animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
onAnimationComplete={() => playUiMotionSound('land', soundEnabled)}`}
        actions={
          <button
            type="button"
            onClick={() => {
              const next = !tinySound;
              setTinySound(next);
              if (next) playUiMotionSound('pop', true);
            }}
            className={tinySound ? ACTION_BTN_SOFT_PRIMARY : ACTION_BTN_SECONDARY}
          >
            {tinySound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{tinySound ? 'Landing Sound: ON' : 'Landing Sound: OFF'}</span>
          </button>
        }
      >
        <div className="space-y-4">
          {/* 1. Spring */}
          <div className="rounded-xl border border-emerald-200/90 bg-white p-4 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                    1. Spring
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Spring (Hidup &amp; Organik)</span>
                  </span>
                  <code className="text-[11px] font-mono text-[#9D113C] bg-[#FEF1F5] px-1.5 py-0.5 rounded">
                    stiffness: 420, damping: 22
                  </code>
                </div>
                <p className="text-xs text-gray-500">
                  Digunakan pada PageTransition, Accordion, dan animasi interaktif UI KIT agar perpindahan terasa alami tanpa kesan mekanis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSwapSpringActive((v) => !v);
                  playUiMotionSound('pop', tinySound);
                }}
                className={ACTION_BTN_PRIMARY}
              >
                {swapSpringActive ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Putar Spring</span>
              </button>
            </div>

            <div className="relative h-10 rounded-lg bg-[#FEF1F5]/50 border border-[#FBC2D4]/60 px-2 flex items-center overflow-hidden">
              <motion.div
                animate={{ x: swapSpringActive ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.8 }}
                onAnimationComplete={() => {
                  if (swapSpringActive) playUiMotionSound('land', tinySound);
                }}
                className="h-7 px-3 rounded-md bg-[#ee2e65] text-white text-[11px] font-semibold inline-flex items-center"
              >
                Spring
              </motion.div>
            </div>
          </div>

          {/* 2. Own-Beat Stagger */}
          <div className="rounded-xl border border-emerald-200/90 bg-white p-4 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                    2. Own-Beat Stagger
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tiba di Ketukan Masing-Masing</span>
                  </span>
                  <code className="text-[11px] font-mono text-[#9D113C] bg-[#FEF1F5] px-1.5 py-0.5 rounded">
                    +45ms / beat
                  </code>
                </div>
                <p className="text-xs text-gray-500">
                  Diterapkan melalui kelas <code>.ui-stagger</code> di seluruh halaman UI KIT dengan ritme bertahap <code>45ms</code> per elemen agar mata mengikuti hierarki konten secara alami.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStaggerBeatSeq((s) => s + 1);
                  if (tinySound) {
                    [0, 45, 90, 135].forEach((ms) => {
                      window.setTimeout(() => playUiMotionSound('tick', true), ms + 60);
                    });
                  }
                }}
                className={ACTION_BTN_SOFT_PRIMARY}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mainkan Beat Stagger</span>
              </button>
            </div>

            <div key={`beat-${staggerBeatSeq}`} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Beat 1 · 0ms', 'Beat 2 · 45ms', 'Beat 3 · 90ms', 'Beat 4 · 135ms'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    delay: i * 0.045,
                    type: 'spring',
                    stiffness: 440,
                    damping: 24,
                    mass: 0.78,
                  }}
                  className="rounded-lg border border-[#FBC2D4]/70 bg-[#FEF1F5]/70 px-3 py-2 font-semibold text-[#9D113C] text-center"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3. Sensory Polish: overshoot + motion blur + landing sound */}
          <div className="rounded-xl border border-emerald-200/90 bg-white p-4 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[11px] font-bold">
                    3. Sensory Polish
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Overshoot + Motion Blur + Landing Sound</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Aktif di seluruh aplikasi pada transisi halaman, bottom sheet, toast, dan modal; klik <strong>Uji Mendarat</strong> untuk merasakan dan mendengarnya.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  playUiMotionSound('pop', tinySound);
                  setTinySeq((s) => s + 1);
                }}
                className={ACTION_BTN_PRIMARY}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Uji Mendarat</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {[
                {
                  label: 'A Little Overshoot',
                  active: tinyOvershoot,
                  toggle: () => setTinyOvershoot((v) => !v),
                },
                {
                  label: 'Touch of Motion Blur (4px)',
                  active: tinyBlur,
                  toggle: () => setTinyBlur((v) => !v),
                },
                {
                  label: 'Sound on Landing',
                  active: tinySound,
                  toggle: () => setTinySound((v) => !v),
                },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.toggle}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium border transition-colors cursor-pointer ${
                    chip.active
                      ? 'bg-[#FEF1F5] border-[#ee2e65] text-[#9D113C]'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${chip.active ? 'bg-[#ee2e65]' : 'bg-gray-400'}`}
                  />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>

            <div className="h-28 rounded-xl bg-gray-50/70 border border-gray-300/90 flex items-center justify-center p-4 overflow-hidden">
              <motion.div
                key={`tiny-${tinySeq}`}
                initial={{
                  opacity: 0,
                  y: 14,
                  scale: 0.95,
                  filter: tinyBlur ? 'blur(4px)' : 'blur(0px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={
                  tinyOvershoot
                    ? { type: 'spring', stiffness: 460, damping: 20, mass: 0.78 }
                    : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }
                }
                onAnimationComplete={() => playUiMotionSound('land', tinySound)}
                className="w-full max-w-sm rounded-xl border border-[#FBC2D4]/70 bg-white px-4 py-3 flex items-center justify-between gap-3 shadow-xs"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-900">Komponen Mendarat di Posisi Akhir</p>
                  <p className="text-[11px] text-gray-600">
                    {tinyOvershoot ? 'Overshoot spring' : 'Emil ease-out'} ·{' '}
                    {tinyBlur ? 'Blur 4px→0px' : 'Tanpa blur'} ·{' '}
                    {tinySound ? 'Audio thock aktif' : 'Hening'}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#ee2e65] text-white text-[11px] font-semibold shrink-0">
                  Settled
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 1. EASING CURVES */}
      <UiDocSection
        id="mot-easing"
        title="Easing Curves Visualizer"
        description="Kurva waktu tunggal yang digunakan secara konsisten di :root adalah --ease-out / --ease-fluid (cubic-bezier(0.23, 1, 0.32, 1)) sesuai aturan Emil Kowalski."
        classesHint=":root { --ease-out: cubic-bezier(0.23, 1, 0.32, 1); --ease-fluid: cubic-bezier(0.23, 1, 0.32, 1); }"
        codeSnippet={`:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-fluid: cubic-bezier(0.23, 1, 0.32, 1);
}`}
        actions={
          <button
            type="button"
            onClick={() => {
              setEasingActive((v) => !v);
              playUiMotionSound('tick', tinySound);
            }}
            className={ACTION_BTN_PRIMARY}
          >
            {easingActive ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{easingActive ? 'Kembalikan' : 'Putar Kurva'}</span>
          </button>
        }
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-3.5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <code className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-[#FEF1F5] text-[#9D113C]">
                  --ease-out / --ease-fluid
                </code>
                <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                  cubic-bezier(0.23, 1, 0.32, 1)
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Kurva standar tunggal di seluruh button (200ms), dropdown (180ms), fade, drawer &amp; sheet
              </span>
            </div>
            <div className="relative h-9 rounded-lg bg-white border border-gray-300/90 px-2 flex items-center overflow-hidden">
              <div className="w-full h-1 rounded-full bg-gray-200" />
              <div
                style={{
                  transitionProperty: 'left',
                  transitionDuration: '200ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  left: easingActive ? 'calc(100% - 2.25rem)' : '0.5rem',
                }}
                className="absolute w-7 h-7 rounded-lg bg-[#ee2e65] text-white flex items-center justify-center shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 2. ENTRANCES & STAGGER */}
      <UiDocSection
        id="mot-entrance"
        title="Page, Fade & Stagger Cascade"
        description="Animasi masuk halaman dari scale(0.95) + opacity: 0 dan efek berurutan (own-beat stagger) bertahap 45ms per item (seluruh durasi < 300ms)."
        classesHint=".animate-ui-page .ui-stagger .animate-ui-fade .animate-ui-slide-down"
        codeSnippet={`<div className="animate-ui-page">Konten halaman masuk (240ms var(--ease-out))</div>
<div className="ui-stagger space-y-2">
  <div>Item 1 (0ms)</div>
  <div>Item 2 (45ms)</div>
  <div>Item 3 (90ms)</div>
</div>`}
        actions={
          <button
            type="button"
            onClick={() => replayEntrance(entrancePreset)}
            className={ACTION_BTN_SOFT_PRIMARY}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Putar Ulang</span>
          </button>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'ui-stagger', label: '.ui-stagger (+45ms own-beat)' },
                { id: 'ui-page', label: '.animate-ui-page (240ms blur+scale)' },
                { id: 'ui-fade', label: '.animate-ui-fade (200ms opacity)' },
                { id: 'ui-slide-down', label: '.animate-ui-slide-down (200ms)' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => replayEntrance(btn.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  entrancePreset === btn.id
                    ? 'bg-[#1C1D21] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-gray-300/90 bg-gray-50/70 p-4 min-h-[176px]">
            {entrancePreset === 'ui-stagger' ? (
              <div key={`stagger-${entranceSeq}`} className="ui-stagger space-y-2">
                {[
                  { delay: '0ms', title: 'Header & Ringkasan Modul' },
                  { delay: '45ms', title: 'Kartu Metrik Utama (KPI)' },
                  { delay: '90ms', title: 'Daftar Komponen Interaktif' },
                  { delay: '135ms', title: 'Footer Aksi & Referensi Kelas' },
                ].map((row, idx) => (
                  <div
                    key={row.title}
                    className="flex items-center justify-between rounded-lg bg-white border border-gray-300/90 px-3.5 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#FEF1F5] text-[#9D113C] font-semibold flex items-center justify-center tabular-nums">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-800">{row.title}</span>
                    </div>
                    <code className="text-[11px] text-gray-500 font-mono tabular-nums">+{row.delay}</code>
                  </div>
                ))}
              </div>
            ) : (
              <div
                key={`${entrancePreset}-${entranceSeq}`}
                className={`rounded-xl bg-white border border-gray-300/90 p-5 flex items-center justify-between gap-4 ${
                  entrancePreset === 'ui-page'
                    ? 'animate-ui-page'
                    : entrancePreset === 'ui-fade'
                    ? 'animate-ui-fade'
                    : 'animate-ui-slide-down'
                }`}
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {entrancePreset === 'ui-page'
                      ? 'Page Entrance (.animate-ui-page)'
                      : entrancePreset === 'ui-fade'
                      ? 'Tab / Panel Fade (.animate-ui-fade)'
                      : 'Banner Slide Down (.animate-ui-slide-down)'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {entrancePreset === 'ui-page'
                      ? 'translate: 0 12px → 0, filter: blur(4px) → 0px (260ms var(--ease-out))'
                      : entrancePreset === 'ui-fade'
                      ? 'opacity: 0 → 1 dengan --ease-out (200ms)'
                      : 'translate: 0 -8px → 0, filter: blur(2px) → 0px (200ms)'}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#FEF1F5] text-[#9D113C] text-xs font-semibold shrink-0">
                  Aktif
                </span>
              </div>
            )}
          </div>
        </div>
      </UiDocSection>

      {/* 3. POPOVERS, FOLD & DIRECTIONAL DRAWERS */}
      <UiDocSection
        id="mot-pop"
        title="Popovers, Menu Fold & Directional Drawers"
        description="Semua utilitas overlay arah atas, bawah, kiri, kanan, lipatan dock mobile, dan toast masuk."
        classesHint=".animate-ui-pop .animate-ui-pop-up .animate-menu-fold-up .animate-ui-toast .animate-ui-drawer-*"
        codeSnippet={`<div className="animate-ui-pop">Popover / Dropdown</div>
<div className="animate-menu-fold-up">Mobile Dock Vertical Drawer</div>
<div className="animate-ui-drawer-right">Right Side Drawer</div>`}
        actions={
          <button
            type="button"
            onClick={() => replayPop(popPreset)}
            className={ACTION_BTN_SECONDARY}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Overlay</span>
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-7 flex flex-wrap gap-1.5 content-start">
            {POP_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => replayPop(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  popPreset === preset.id
                    ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-5 rounded-xl border border-gray-300/90 bg-gray-100/70 p-4 flex items-center justify-center min-h-[156px] overflow-hidden">
            {(() => {
              const activeMeta = POP_PRESETS.find((p) => p.id === popPreset) || POP_PRESETS[0];
              return (
                <div
                  key={`${popPreset}-${popSeq}`}
                  className={`${popPreset} w-full max-w-[260px] rounded-xl bg-white border border-gray-300 p-4 shadow-md space-y-1.5`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-900">{activeMeta.label}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-[10px] font-semibold">
                      {activeMeta.origin}
                    </span>
                  </div>
                  <code className="block text-[11px] font-mono text-gray-600">.{activeMeta.id}</code>
                  <p className="text-[11px] text-gray-500">{activeMeta.spec}</p>
                </div>
              );
            })()}
          </div>
        </div>
      </UiDocSection>

      {/* 4. FEEDBACK MICRO-INTERACTIONS */}
      <UiDocSection
        id="mot-feedback"
        title="Tactile Feedback & Micro-Interactions"
        description="Umpan balik fisik saat pengguna menekan tombol (scale 0.965), validasi gagal (shake), centang spring, dan bilah progres."
        classesHint=".animate-ui-shake .animate-ui-check .animate-ui-stripes .ui-kit-root button:active"
        codeSnippet={`<input className={hasError ? 'animate-ui-shake border-red-500' : ''} />
<Check className="animate-ui-check text-emerald-600" />
<div className="animate-ui-stripes bg-stripes" />`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Error Shake + Spring Check */}
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-800">Error Shake & Check Spring</span>
              <code className="text-[11px] font-mono text-gray-500">.animate-ui-shake / .animate-ui-check</code>
            </div>

            <div className="flex items-center gap-2">
              <div
                key={`shake-${shakeSeq}`}
                className={`flex-1 rounded-lg border px-3 py-2 bg-white text-xs flex items-center justify-between ${
                  shakeSeq > 0
                    ? 'animate-ui-shake border-red-400 text-red-700'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                <span>{shakeSeq > 0 ? 'Kode verifikasi tidak valid!' : 'Input validasi siap diuji'}</span>
                {shakeSeq > 0 ? (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                ) : (
                  <Check key={`chk-${checkSeq}`} className="w-4 h-4 text-emerald-600 animate-ui-check shrink-0" />
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShakeSeq((s) => s + 1)}
                className={ACTION_BTN_DANGER_SOFT}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Picu Shake</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShakeSeq(0);
                  setCheckSeq((s) => s + 1);
                }}
                className={ACTION_BTN_SECONDARY}
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Reset & Check</span>
              </button>
            </div>
          </div>

          {/* Tactile Press + Checkbox + Stripes */}
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-800">Tactile Press & Progress Stripes</span>
              <code className="text-[11px] font-mono text-gray-500">scale: 0.965 / .animate-ui-stripes</code>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className={ACTION_BTN_DARK}>
                <Hand className="w-3.5 h-3.5" />
                <span>Tahan Tombol (90ms)</span>
              </button>

              <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checkedTactile}
                  onChange={(e) => setCheckedTactile(e.target.checked)}
                  className="w-4 h-4 accent-[#ee2e65] cursor-pointer"
                />
                <span>Checkbox Spring</span>
              </label>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Animated Stripes (0.85s linear infinite)</span>
                <button
                  type="button"
                  onClick={() => setProgressStripedAnimated((v) => !v)}
                  className="font-semibold text-[#ee2e65] hover:underline cursor-pointer"
                >
                  {progressStripedAnimated ? 'Jeda' : 'Jalankan'}
                </button>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full w-3/4 rounded-full bg-[#ee2e65] ${
                    progressStripedAnimated ? 'animate-ui-stripes' : ''
                  }`}
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, rgba(255,255,255,0.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.28) 75%, transparent 75%, transparent)',
                    backgroundSize: '1.25rem 1.25rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 5. MOTION/REACT SPRINGS & ADAPTIVE AXIS */}
      <UiDocSection
        id="mot-spring"
        title="Motion Springs, Adaptive Axis & Touch Gestures"
        description="Kombinasi motion/react (PageTransition, AnimatePresence Accordion) dengan hook gestur sentuh untuk mobile bottom sheet & pull-to-refresh."
        classesHint="PageTransition | AnimatePresence | useBottomSheetMotion | ElasticPullToRefresh"
        codeSnippet={`// PageTransition.tsx — Adaptive Axis
// Mobile (<768px): x ±28px, spring(stiffness: 400, damping: 36, mass: 0.85)
// Desktop (>=768px): y ±16px, spring(stiffness: 420, damping: 36, mass: 0.82)
<AnimatePresence mode="popLayout" custom={{ direction, isMobile }}>
  <motion.div variants={pageVariants} initial="enter" animate="center" exit="exit" />
</AnimatePresence>`}
      >
        <div className="space-y-5">
          {/* Interactive PageTransition Preview */}
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-900">Adaptive PageTransition Simulator</span>
                <div className="inline-flex rounded-full bg-white border border-gray-300 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSpringMode('mobile')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                      springMode === 'mobile' ? 'bg-[#1C1D21] text-white' : 'text-gray-600'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile (X-Axis)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpringMode('desktop')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                      springMode === 'desktop' ? 'bg-[#1C1D21] text-white' : 'text-gray-600'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Desktop (Y-Axis)</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  triggerSpringStep(-1);
                  playUiMotionSound('tick', tinySound);
                }}
                className={ACTION_BTN_SECONDARY}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerSpringStep(1);
                  playUiMotionSound('tick', tinySound);
                }}
                className={ACTION_BTN_PRIMARY}
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative h-28 rounded-xl bg-white border border-gray-300/90 overflow-hidden flex items-center justify-center p-4">
            <AnimatePresence mode="popLayout" initial={false} custom={springDirection}>
              <motion.div
                key={`${springMode}-${springStep}`}
                custom={springDirection}
                initial={
                  springMode === 'mobile'
                    ? { opacity: 0, x: springDirection * 24, scale: 0.95, filter: 'blur(4px)' }
                    : { opacity: 0, y: springDirection * 14, scale: 0.95, filter: 'blur(4px)' }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition:
                    springMode === 'mobile'
                      ? { type: 'spring', stiffness: 420, damping: 26, mass: 0.8 }
                      : { type: 'spring', stiffness: 420, damping: 24, mass: 0.8 },
                }}
                exit={
                  springMode === 'mobile'
                    ? { opacity: 0, x: springDirection * -18, scale: 0.95, filter: 'blur(2px)', transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }
                    : { opacity: 0, y: springDirection * -10, scale: 0.95, filter: 'blur(2px)', transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }
                }
                onAnimationComplete={() => playUiMotionSound('land', tinySound)}
                className="w-full flex items-center justify-between gap-3 px-2"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Layar #{springStep + 1} — {springMode === 'mobile' ? 'Horizontal Spring (X ±24px)' : 'Vertical Spring (Y ±14px)'}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {springMode === 'mobile'
                      ? 'stiffness: 420, damping: 26, mass: 0.8'
                      : 'stiffness: 420, damping: 24, mass: 0.8'}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-mono tabular-nums">
                  dir: {springDirection > 0 ? '+1' : '-1'}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sliding Pill Indicator + Motion Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-900">Sliding Pill Indicator (translate3d)</span>
              <code className="text-[11px] font-mono text-gray-500">200ms --ease-out</code>
            </div>
            <div className="relative grid grid-cols-4 rounded-xl bg-white border border-gray-300 p-1">
              <span
                aria-hidden="true"
                style={{ transform: `translate3d(${activeSlideTab * 100}%, 0, 0)` }}
                className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-lg bg-[#1C1D21] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
              />
              {SLIDE_TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveSlideTab(i);
                    playUiMotionSound('tick', tinySound);
                  }}
                  className={`relative z-10 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeSlideTab === i ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500">
              Pola yang sama menggerakkan indikator aktif pada Sidebar, Mobile Bottom Nav, Tabs, dan Scroll Spy.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300/90 bg-gray-50/60 p-4 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setAccordionOpen((v) => !v);
                playUiMotionSound('tick', tinySound);
              }}
              className="w-full flex items-center justify-between text-xs font-semibold text-gray-900 cursor-pointer"
            >
              <span>Motion Accordion (AnimatePresence height: &apos;auto&apos;)</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  accordionOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {accordionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, filter: 'blur(3px)' }}
                  animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ height: 0, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                    <div className="rounded-lg bg-white border border-gray-300/90 p-3 text-[11px] text-gray-600 leading-relaxed space-y-1">
                      <p>
                        <strong>Touch Gestures Aktif:</strong>
                      </p>
                      <p>• <code>useBottomSheetMotion</code>: Swipe-down tutup saat <code>deltaY &gt; 92px</code> atau <code>velocity &gt; 0.45</code> + rubber-band resistance.</p>
                      <p>• <code>ElasticPullToRefresh</code>: Kurva SVG kuadratik + RAF spring rebound.</p>
                      <p>• <code>.app-shell-container</code>: Latar mundur <code>scale: 0.982</code> saat sheet terbuka.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 6. REDUCED MOTION & COMPOSITOR RULES */}
      <UiDocSection
        id="mot-a11y"
        title="Reduced Motion & Compositor Architecture"
        description="Uji langsung perilaku aksesibilitas prefers-reduced-motion beserta standar arsitektur CSS yang menjaga 60fps tanpa bentrok properti."
        classesHint="MotionConfig reducedMotion='user' | @media (prefers-reduced-motion: reduce)"
        codeSnippet={`<MotionConfig reducedMotion="user">
  <AppContent />
</MotionConfig>

/* CSS menggunakan properti terpisah (translate, scale) */
@keyframes ui-page {
  from { opacity: 0; translate: 0 12px; filter: blur(4px); }
  to   { opacity: 1; translate: 0 0;    filter: blur(0px); }
}`}
      >
        <div className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] overflow-hidden">
          {/* Interactive Reduced Motion Bar */}
          <div className="p-4 bg-[#FAFBFD] dark:bg-[#15181E] border-b border-black/[0.08] dark:border-white/[0.08] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold text-[#1C1D21] dark:text-[#F3F4F6]">
                  Simulasi Reduced Motion
                </span>
                <span className="text-gray-400 dark:text-gray-600">·</span>
                <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400 tabular-nums">
                  {simulateReduced ? '0.01ms (Instant Snap)' : '240ms ease-out + spring'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-gray-100 dark:bg-[#1B1E24] p-0.5 border border-black/[0.08] dark:border-white/[0.08] text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSimulateReduced(false)}
                    className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                      !simulateReduced
                        ? 'bg-white dark:bg-[#252A34] text-gray-900 dark:text-[#F3F4F6] shadow-2xs'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimulateReduced(true)}
                    className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                      simulateReduced
                        ? 'bg-white dark:bg-[#252A34] text-gray-900 dark:text-[#F3F4F6] shadow-2xs'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Reduced
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setA11yMoved((v) => !v);
                    playUiMotionSound('tick', tinySound);
                  }}
                  className={ACTION_BTN_PRIMARY}
                >
                  <Play className="w-3 h-3" />
                  <span>Uji Gerak</span>
                </button>
              </div>
            </div>

            <div className="relative h-10 rounded-xl bg-white dark:bg-[#181B21] border border-black/[0.10] dark:border-white/[0.08] px-2 flex items-center overflow-hidden">
              <div
                style={{
                  transform: a11yMoved ? 'translate3d(calc(100% - 7rem), 0, 0)' : 'translate3d(0, 0, 0)',
                  transitionProperty: 'transform',
                  transitionDuration: simulateReduced ? '0.01ms' : '240ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                className="w-full flex items-center"
              >
                <div className="h-7 w-28 px-3 rounded-lg bg-[#1C1D21] dark:bg-[#ee2e65] text-white text-[11px] font-semibold inline-flex items-center justify-center tabular-nums">
                  <span>{simulateReduced ? 'Instant State' : 'Fluid Glide'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Hairline Architectural Spec Rows (No 3-Box Slop) */}
          <div className="divide-y divide-black/[0.08] dark:divide-white/[0.08]">
            {[
              {
                num: '01',
                title: 'Aksesibilitas Reduced Motion',
                summary:
                  'Saat pengguna mengaktifkan preferensi kurangi gerak di OS, animasi, blur, dan efek skala turun otomatis ke transisi instan.',
                token: 'MotionConfig · 0.01ms',
              },
              {
                num: '02',
                title: 'Isolasi Properti Transform CSS',
                summary:
                  'Keyframe menggunakan properti individual translate dan scale sehingga tidak menimpa utilitas posisi atau rotasi elemen lain.',
                token: 'translate / scale',
              },
              {
                num: '03',
                title: 'Eksekusi Jalur Compositor GPU',
                summary:
                  'Transisi diprioritaskan pada transform, opacity, dan clip-path agar tetap 60fps tanpa memicu kalkulasi ulang tata letak.',
                token: 'translate3d · 60fps',
              },
            ].map((spec) => (
              <div
                key={spec.num}
                className="px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-[11px] font-mono font-semibold text-gray-400 dark:text-gray-500 pt-0.5 tabular-nums shrink-0">
                    {spec.num}
                  </span>
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-xs font-semibold text-[#1C1D21] dark:text-[#F3F4F6]">
                      {spec.title}
                    </div>
                    <p className="text-xs text-[#5A5D67] dark:text-gray-400 leading-relaxed">
                      {spec.summary}
                    </p>
                  </div>
                </div>

                <code className="self-start sm:self-center shrink-0 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-[#1B1E24] border border-black/[0.06] dark:border-white/[0.08] text-[11px] font-mono text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {spec.token}
                </code>
              </div>
            ))}
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
