import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
  Palette,
  FormInput,
  Smartphone,
  ChevronsUpDown,
  Search,
  Layers,
  MessageSquareHeart,
  Table2,
  Compass,
  Sparkles,
  LayoutTemplate,
  ShieldCheck,
  Bell,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';

interface DemoModule {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | null;
  dividerBefore?: boolean;
}

const DEMO_MODULES: DemoModule[] = [
  { id: 'utilities', label: '1. Utilities', icon: Palette },
  { id: 'datadisplay', label: '2. Data Display', icon: Layers },
  { id: 'dataentry', label: '3. Data Entry', icon: FormInput },
  { id: 'feedback', label: '4. Feedback', icon: MessageSquareHeart },
  { id: 'tables', label: '5. Tables', icon: Table2 },
  { id: 'navigation', label: '8. Navigation', icon: Compass },
  { id: 'behavioral', label: '9. Behavioral', icon: Sparkles },
  { id: 'layout', label: '10. Layout', icon: LayoutTemplate },
  { id: 'authstate', label: '11. Auth State', icon: ShieldCheck },
  { id: 'mobilekit', label: '12. Mobile UI Kit', icon: Smartphone },
  { id: 'updates', label: 'UI KIT Updates', icon: Bell, badge: '3', dividerBefore: true },
];

const DockPreview: React.FC<{
  activeId: string;
  onSelect: (id: string) => void;
  onToggleMenu?: () => void;
  onSearchClick?: () => void;
  menuExpanded?: boolean;
  showUnreadDots?: boolean;
}> = ({
  activeId,
  onSelect,
  onToggleMenu,
  onSearchClick,
  menuExpanded = false,
  showUnreadDots = true,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const primaryIds = ['utilities', 'dataentry', 'mobilekit'];
  const isOverflowActive = !primaryIds.includes(activeId);
  const activeOverflowMod = isOverflowActive
    ? DEMO_MODULES.find((m) => m.id === activeId)
    : undefined;
  const activeSlotIndex = isOverflowActive ? 3 : primaryIds.indexOf(activeId);

  useLayoutEffect(() => {
    const update = () => {
      const bar = barRef.current;
      const btn = slotRefs.current[activeSlotIndex];
      if (!bar || !btn) return;
      const bRect = bar.getBoundingClientRect();
      const sRect = btn.getBoundingClientRect();
      if (sRect.width === 0) return;
      setIndicator({
        left: sRect.left - bRect.left,
        width: sRect.width,
        ready: true,
      });
    };
    update();
    const bar = barRef.current;
    if (!bar || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [activeSlotIndex, activeId]);

  const ActiveOverflowIcon = activeOverflowMod?.icon;

  return (
    <div className="w-full max-w-[352px] flex items-center gap-2">
      <div
        ref={barRef}
        className="relative flex-1 bg-white rounded-full p-1 shadow-[0_10px_28px_-8px_rgba(15,23,42,0.16)] border border-black/[0.14] flex items-center justify-between"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#ee2e65] shadow-[0_5px_14px_-4px_rgba(238,46,101,0.55)] transition-[transform,width,opacity] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            indicator.ready ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: `${indicator.width}px`,
            transform: `translate3d(${indicator.left}px, 0, 0)`,
          }}
        />

        {[
          { id: 'utilities', label: '1. Utilities', icon: Palette, dot: false },
          { id: 'dataentry', label: '3. Data Entry', icon: FormInput, dot: false },
          { id: 'mobilekit', label: '12. Mobile UI Kit', icon: Smartphone, dot: showUnreadDots },
        ].map((slot, idx) => {
          const Icon = slot.icon;
          const isActive = activeSlotIndex === idx;
          return (
            <button
              key={slot.id}
              ref={(el) => {
                slotRefs.current[idx] = el;
              }}
              type="button"
              aria-label={slot.label}
              onClick={() => onSelect(slot.id)}
              className={`relative z-10 flex-1 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                isActive ? 'text-white' : 'text-[#1C1D21] hover:text-[#ee2e65]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'stroke-[2.2px]' : 'stroke-[1.9px]'}`} />
                {slot.dot && (
                  <span
                    className={`w-2 h-2 rounded-full absolute -top-0.5 -right-1 ring-[1.5px] ${
                      isActive ? 'bg-white ring-[#ee2e65]' : 'bg-[#EF4444] ring-white'
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}

        <button
          ref={(el) => {
            slotRefs.current[3] = el;
          }}
          type="button"
          aria-label="Toggle module menu"
          aria-expanded={menuExpanded}
          onClick={() => (onToggleMenu ? onToggleMenu() : onSelect('datadisplay'))}
          className={`relative z-10 h-10 rounded-full flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer ${
            isOverflowActive ? 'flex-[1.28] px-2.5 text-white' : 'flex-1 text-[#1C1D21] hover:text-[#ee2e65]'
          }`}
        >
          {isOverflowActive && ActiveOverflowIcon && (
            <ActiveOverflowIcon className="w-[17px] h-[17px] stroke-[2.1px] shrink-0" />
          )}
          <ChevronsUpDown className="w-[15px] h-[15px] stroke-[2.1px] shrink-0" />
        </button>
      </div>

      <button
        type="button"
        aria-label="Mobile quick search"
        onClick={onSearchClick}
        className="w-12 h-12 shrink-0 rounded-full bg-white shadow-[0_10px_28px_-8px_rgba(15,23,42,0.16)] border border-black/[0.14] flex items-center justify-center text-[#1C1D21] hover:text-[#ee2e65] active:scale-95 transition-all cursor-pointer"
      >
        <Search className="w-[18px] h-[18px] stroke-[2px]" />
      </button>
    </div>
  );
};

export const MobileNavUiKitDemo: React.FC = () => {
  const { triggerToast } = useApp();

  // Section 1: Basic Floating Dock State
  const [dockActive, setDockActive] = useState('utilities');
  const [showDots, setShowDots] = useState(true);

  // Section 2: Overflow Category Active State
  const [overflowActive, setOverflowActive] = useState('datadisplay');

  // Section 3: Interactive Floating Drawer Card
  const [drawerActive, setDrawerActive] = useState('utilities');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [drawerPeekHeight, setDrawerPeekHeight] = useState<number | null>(null);
  const drawerSandboxRef = useRef<HTMLDivElement>(null);
  const drawerListRef = useRef<HTMLDivElement>(null);
  const drawerTimerRef = useRef<number | null>(null);

  const openDrawerDemo = () => {
    if (drawerTimerRef.current) {
      window.clearTimeout(drawerTimerRef.current);
      drawerTimerRef.current = null;
    }
    setDrawerClosing(false);
    setDrawerOpen(true);
  };

  const closeDrawerDemo = () => {
    if (!drawerOpen || drawerClosing) return;
    setDrawerClosing(true);
    drawerTimerRef.current = window.setTimeout(() => {
      setDrawerOpen(false);
      setDrawerClosing(false);
      drawerTimerRef.current = null;
    }, 220);
  };

  useEffect(() => {
    if (!drawerOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (drawerSandboxRef.current && !drawerSandboxRef.current.contains(e.target as Node)) {
        closeDrawerDemo();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [drawerOpen, drawerClosing]);

  useLayoutEffect(() => {
    if (!drawerOpen) {
      setDrawerPeekHeight(null);
      return;
    }

    const computeDrawerPeek = () => {
      const scroller = drawerListRef.current;
      if (!scroller) return;

      const capHeight = 264;
      if (scroller.scrollHeight <= capHeight + 2) {
        setDrawerPeekHeight((prev) => (prev !== null ? null : prev));
        return;
      }

      const items = Array.from(
        scroller.querySelectorAll<HTMLElement>('[data-drawer-item="true"]')
      );
      let targetMid: number | null = null;
      for (const item of items) {
        const midInContent = item.offsetTop + item.offsetHeight * 0.5;
        if (midInContent <= capHeight) {
          targetMid = Math.round(midInContent);
        } else {
          break;
        }
      }

      setDrawerPeekHeight((prev) => (prev !== targetMid ? targetMid : prev));
    };

    computeDrawerPeek();
    const scroller = drawerListRef.current;
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(computeDrawerPeek) : null;
    if (ro && scroller) ro.observe(scroller);
    window.addEventListener('resize', computeDrawerPeek);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', computeDrawerPeek);
    };
  }, [drawerOpen]);

  useEffect(() => {
    return () => {
      if (drawerTimerRef.current) window.clearTimeout(drawerTimerRef.current);
    };
  }, []);

  return (
    <UiDocPage
      title="Mobile Bottom Nav"
      subLinks={[
        { id: 'mnav-dock', label: 'Floating Pill Dock & Search' },
        { id: 'mnav-overflow', label: 'Overflow Slot Indicator' },
        { id: 'mnav-popup', label: 'Floating Vertical Drawer Card' },
        { id: 'mnav-search-sheet', label: 'Quick Search Bottom Sheet' },
      ]}
    >
      <UiDocSection
        id="mnav-dock"
        title="Floating Pill Dock & Detached Search"
        classesHint="max-w-[352px] p-1 h-10 / w-12 h-12 rounded-full bg-white / bg-[#ee2e65]"
        codeSnippet={`<div className="max-w-[352px] flex items-center gap-2">\n  <nav className="relative flex-1 bg-white rounded-full p-1 shadow-lg flex items-center">\n    <span className="absolute top-1 bottom-1 rounded-full bg-[#ee2e65] transition-transform" />\n    {slots.map(s => <button className="h-10">{s.icon}</button>)}\n  </nav>\n  <button className="w-12 h-12 rounded-full bg-white shadow-lg"><Search /></button>\n</div>`}
        actions={
          <button
            type="button"
            onClick={() => setShowDots((d) => !d)}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 sm:hidden shrink-0" />
            <span className="sm:hidden">Badge</span>
            <span className="hidden sm:inline">
              {showDots ? 'Sembunyikan Badge Dot' : 'Tampilkan Badge Dot'}
            </span>
          </button>
        }
      >
        <div className="bg-[#F4F5F8] rounded-2xl p-5 sm:p-6 border border-black/[0.12] flex flex-col items-center gap-3">
          <DockPreview
            activeId={dockActive}
            onSelect={setDockActive}
            showUnreadDots={showDots}
            onToggleMenu={() => setDockActive('datadisplay')}
            onSearchClick={() =>
              triggerToast('UI KIT Search', 'Membuka panel pencarian cepat kategori & komponen UI KIT.', 'info')
            }
          />
          <div className="text-xs text-gray-600 font-medium">
            Slot aktif: <strong className="text-gray-900 capitalize">{dockActive}</strong>
          </div>
        </div>
      </UiDocSection>

      <UiDocSection
        id="mnav-overflow"
        title="Overflow Slot Indicator (Active Category)"
        classesHint="flex-[1.35] px-3 bg-[#ee2e65] text-white"
        codeSnippet={`<button className={isOverflowActive ? 'flex-[1.35] px-3 text-white' : 'flex-1'}>\n  {isOverflowActive && <ActiveCategoryIcon />}\n  <ChevronsUpDown />\n</button>`}
      >
        <div className="bg-[#F4F5F8] rounded-2xl p-5 sm:p-6 border border-black/[0.12] flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-1.5">
            {[
              { id: 'datadisplay', label: 'Data Display' },
              { id: 'feedback', label: 'Feedback' },
              { id: 'tables', label: 'Tables' },
              { id: 'authstate', label: 'Auth State' },
              { id: 'utilities', label: 'Utilities (Primary)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOverflowActive(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  overflowActive === item.id
                    ? 'bg-[#ee2e65] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <DockPreview
            activeId={overflowActive}
            onSelect={setOverflowActive}
            onSearchClick={() =>
              triggerToast('Quick Search', 'Menampilkan pencarian cepat UI KIT.', 'info')
            }
          />
        </div>
      </UiDocSection>

      <UiDocSection
        id="mnav-popup"
        title="Floating Vertical Drawer Card"
        classesHint="rounded-[24px] max-w-[272px] bg-white shadow-2xl / no-scrollbar half-peek cue"
        codeSnippet={`<div className="w-[272px] bg-white rounded-[24px] shadow-2xl border overflow-hidden">\n  <ProfileHeader />\n  <div className="overflow-y-auto no-scrollbar px-2 pt-2" style={{ maxHeight: peekMidHeight }}>\n    {modules.map(m => <button className={active ? 'bg-[#ee2e65] text-white rounded-full' : '...'}>{m.label}</button>)}\n  </div>\n</div>`}
        actions={
          <button
            type="button"
            onClick={() => (drawerOpen && !drawerClosing ? closeDrawerDemo() : openDrawerDemo())}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold cursor-pointer hover:bg-primary-100 whitespace-nowrap shrink-0"
          >
            <ChevronsUpDown className="w-3.5 h-3.5 sm:hidden shrink-0" />
            <span className="sm:hidden">Popup</span>
            <span className="hidden sm:inline">
              {drawerOpen && !drawerClosing ? 'Tutup Popup' : 'Buka Popup'}
            </span>
          </button>
        }
      >
        <div
          ref={drawerSandboxRef}
          className="bg-[#E8EAEE] rounded-2xl p-5 sm:p-6 border border-black/[0.12] flex flex-col items-start gap-2.5"
        >
          {drawerOpen && (
            <div
              className={`w-full max-w-[272px] bg-white rounded-[24px] shadow-[0_20px_48px_-12px_rgba(15,23,42,0.25)] border border-black/[0.14] overflow-hidden ${
                drawerClosing ? 'animate-menu-fold-down' : 'animate-menu-fold-up'
              }`}
            >
              {/* Profile & Action Row */}
              <div className="px-3.5 pt-3 pb-2.5 border-b border-black/[0.12] flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#ee2e65] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    UI
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-[#1C1D21] truncate">UI KIT</div>
                    <div className="text-[10px] text-[#646772]">Design System</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDrawerActive('behavioral')}
                    className="w-7 h-7 rounded-full hover:bg-[#F4F5F8] text-[#4B4E57] flex items-center justify-center cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      triggerToast('UI KIT Export', 'Menyiapkan ekspor token komponen UI KIT.', 'success')
                    }
                    className="w-7 h-7 rounded-full bg-[#ee2e65] text-white flex items-center justify-center hover:brightness-105 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Vertical Items List (Excludes primary dock tabs: Utilities, Data Entry, Mobile UI Kit) */}
              <div
                ref={drawerListRef}
                style={{ maxHeight: drawerPeekHeight ? `${drawerPeekHeight}px` : '264px' }}
                className="relative px-2 pt-2 overflow-y-auto overflow-x-hidden no-scrollbar overscroll-contain"
              >
                <div className="space-y-0.5 pb-2">
                  {DEMO_MODULES.filter(
                    (mod) => !['utilities', 'dataentry', 'mobilekit'].includes(mod.id)
                  ).map((mod) => {
                    const Icon = mod.icon;
                    const isCurrent = drawerActive === mod.id;
                    return (
                      <React.Fragment key={mod.id}>
                        {mod.dividerBefore && <div className="my-1 border-t border-black/[0.12] mx-2" />}
                        <button
                          type="button"
                          data-drawer-item="true"
                          onClick={() => setDrawerActive(mod.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-left font-semibold transition-all duration-200 cursor-pointer ${
                            isCurrent
                              ? 'bg-[#ee2e65] text-white shadow-xs'
                              : 'text-[#1C1D21] hover:bg-[#F4F5F8]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="text-[13px] truncate">{mod.label}</span>
                          </div>
                          {mod.badge && (
                            <span
                              className={`min-w-[24px] h-5 px-1.5 rounded-full text-[10.5px] font-bold flex items-center justify-center shrink-0 ${
                                isCurrent ? 'bg-white text-[#ee2e65]' : 'bg-[#EF4444] text-white'
                              }`}
                            >
                              {mod.badge}
                            </span>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <DockPreview
            activeId={drawerActive === 'updates' ? 'utilities' : drawerActive}
            onSelect={(id) => {
              setDrawerActive(id);
              closeDrawerDemo();
            }}
            menuExpanded={drawerOpen && !drawerClosing}
            onToggleMenu={() => (drawerOpen && !drawerClosing ? closeDrawerDemo() : openDrawerDemo())}
            onSearchClick={() =>
              triggerToast('Mobile Search', 'Membuka modal pencarian cepat.', 'info')
            }
          />
        </div>
      </UiDocSection>

      <UiDocSection
        id="mnav-search-sheet"
        title="Quick Search Bottom Sheet"
        classesHint="rounded-t-[28px] bg-white shadow-2xl / w-10 h-1 rounded-full bg-black/20"
        codeSnippet={`<div className="bg-white rounded-t-[28px] p-5 space-y-4 shadow-2xl">\n  <div className="w-10 h-1 bg-black/20 rounded-full mx-auto" />\n  <div className="flex items-center gap-2 bg-[#F4F5F8] rounded-full px-4 py-2.5 border border-black/[0.14]">\n    <Search className="w-4 h-4 text-[#646772]" />\n    <input placeholder="Cari modul, siswa, atau materi..." />\n  </div>\n</div>`}
      >
        <div className="bg-[#E8EAEE] rounded-2xl p-5 sm:p-6 border border-black/[0.12] flex justify-center">
          <div className="w-full max-w-[340px] bg-white rounded-[26px] p-4 space-y-3 shadow-[0_20px_48px_-12px_rgba(15,23,42,0.22)] border border-black/[0.14]">
            <div className="flex justify-center pb-0.5">
              <div className="w-10 h-1 bg-black/20 rounded-full" />
            </div>
            <div className="flex items-center gap-2 bg-[#F4F5F8] rounded-full px-3.5 py-2 border border-black/[0.14]">
              <Search className="w-3.5 h-3.5 text-[#646772] shrink-0" />
              <span className="text-[12.5px] text-[#646772] truncate">
                Cari komponen, varian, atau kategori UI KIT...
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#646772] px-1">
                Quick Access Categories
              </div>
              {DEMO_MODULES.slice(0, 3).map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() =>
                      triggerToast('Quick Search', `Membuka kategori ${mod.label}.`, 'info')
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-[#FAFBFD] hover:bg-[#F4F5F8] border border-black/[0.10] text-[#1C1D21] text-[12.5px] font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{mod.label}</span>
                    </span>
                    <span className="text-[10.5px] text-[#646772]">Buka</span>
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
