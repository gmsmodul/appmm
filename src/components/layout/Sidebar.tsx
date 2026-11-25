import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  BookOpen,
  Building2,
  Camera,
  Compass,
  LayoutGrid,
  Network,
  PanelLeft,
  Settings,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    setIsSettingsInfoOpen,
  } = useApp();

  const mainMenu: Array<{
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    isTag?: boolean;
  }> = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid, badge: '5 Bidang', isTag: true },
    { id: 'orgchart', label: 'Struktur Organisasi', icon: Network, badge: 'Baru' },
    { id: 'gms2', label: 'Platform GMS II', icon: Building2, badge: 'Base', isTag: true },
    {
      id: 'panduan',
      label: 'Panduan, SOP & Rules',
      icon: BookOpen,
      badge: '4 Kat.',
      isTag: true,
    },
    { id: 'perintisan', label: 'Workshop Perintisan', icon: Compass, badge: '3 Tab', isTag: true },
    { id: 'quickref', label: 'Referensi Cepat', icon: Zap, badge: '4' },
  ];

  const mainMenuRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeMenuBtnRef = useRef<HTMLButtonElement | null>(null);
  const [menuIndicator, setMenuIndicator] = useState({ top: 0, height: 0, visible: false });
  const [peekMaxHeight, setPeekMaxHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateMenuIndicator = () => {
      const container = mainMenuRef.current;
      const activeBtn = activeMenuBtnRef.current;
      const isMainActive = mainMenu.some((m) => m.id === activePage);
      if (!container || !activeBtn || !isMainActive) {
        setMenuIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }
      const cRect = container.getBoundingClientRect();
      const bRect = activeBtn.getBoundingClientRect();
      if (bRect.height === 0) return;
      setMenuIndicator({
        top: bRect.top - cRect.top,
        height: bRect.height,
        visible: true,
      });
    };

    updateMenuIndicator();
    const container = mainMenuRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(updateMenuIndicator);
    ro.observe(container);
    return () => ro.disconnect();
  }, [activePage, sidebarOpen]);

  useLayoutEffect(() => {
    const computePeekHeight = () => {
      const wrapper = scrollWrapperRef.current;
      const scroller = scrollContainerRef.current;
      if (!wrapper || !scroller) return;

      const availableHeight = wrapper.clientHeight;
      const totalHeight = scroller.scrollHeight;

      if (availableHeight <= 0 || totalHeight <= availableHeight + 2) {
        setPeekMaxHeight((prev) => (prev !== null ? null : prev));
        return;
      }

      const scrollerRect = scroller.getBoundingClientRect();
      const items = Array.from(
        scroller.querySelectorAll<HTMLElement>('[data-sidebar-item="true"]')
      );

      let targetMid: number | null = null;
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const topInContent = rect.top - scrollerRect.top + scroller.scrollTop;
        const midInContent = topInContent + rect.height * 0.5;
        if (midInContent <= availableHeight) {
          targetMid = Math.round(midInContent);
        } else {
          break;
        }
      }

      setPeekMaxHeight((prev) => (prev !== targetMid ? targetMid : prev));
    };

    computePeekHeight();
    const wrapper = scrollWrapperRef.current;
    const scroller = scrollContainerRef.current;
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(computePeekHeight) : null;
    if (ro && wrapper) ro.observe(wrapper);
    if (ro && scroller) ro.observe(scroller);
    window.addEventListener('resize', computePeekHeight);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', computePeekHeight);
    };
  }, [sidebarOpen]);

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
  };

  return (
    <aside
      className={`hidden md:flex md:static inset-y-0 left-0 z-20 h-full max-h-full overflow-hidden shrink-0 flex-col transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] bg-transparent backdrop-blur-md border-r border-black/[0.12] dark:border-white/[0.08] ${
        sidebarOpen ? 'w-[264px]' : 'w-[84px]'
      } p-4 select-none`}
    >
      {/* Brand Logo Header */}
      <div className="shrink-0 flex items-center justify-between px-2 pt-1 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#ee2e65] flex items-center justify-center text-white shadow-[0_4px_12px_-3px_rgba(238,46,101,0.45)] shrink-0">
            <Camera className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <span className="block font-semibold text-[15px] tracking-tight text-[#1C1D21] dark:text-[#F3F4F6] truncate">
                Platform
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle Sidebar"
          className="hidden md:flex w-8 h-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.08] items-center justify-center text-[#6E717A] dark:text-gray-400 transition-colors shrink-0 cursor-pointer"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Navigation Region */}
      <div ref={scrollWrapperRef} className="flex-1 min-h-0 flex flex-col">
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto no-scrollbar"
          style={peekMaxHeight !== null ? { maxHeight: `${peekMaxHeight}px` } : undefined}
        >
          {/* Main Menu Group */}
          <div ref={mainMenuRef} className="relative space-y-1">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 right-0 top-0 rounded-lg bg-white dark:bg-[#1B1E24] shadow-xs dark:shadow-none dark:border dark:border-white/[0.08] transition-[transform,height,opacity] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                menuIndicator.visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                height: `${menuIndicator.height}px`,
                transform: `translate3d(0, ${menuIndicator.top}px, 0)`,
              }}
            />
            {sidebarOpen && (
              <div className="relative z-10 px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Main menu
              </div>
            )}
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-sidebar-item="true"
                  ref={isActive ? activeMenuBtnRef : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group cursor-pointer ${
                    isActive
                      ? `text-gray-900 dark:text-white font-semibold ${
                          menuIndicator.visible ? '' : 'bg-white dark:bg-[#1B1E24] shadow-xs'
                        }`
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/[0.06] hover:text-gray-950 dark:hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? 'text-[#ee2e65]'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                      }`}
                    />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </div>
                  {sidebarOpen &&
                    item.badge &&
                    (item.isTag ? (
                      <span className="text-[11px] font-semibold bg-[#F0EFFC] dark:bg-white/[0.08] text-[#3F3B99] dark:text-[#C4B5FD] px-1.5 py-0.5 rounded-md tabular-nums whitespace-nowrap shrink-0">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5] text-[11px] font-semibold flex items-center justify-center tabular-nums whitespace-nowrap shrink-0">
                        {item.badge}
                      </span>
                    ))}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Settings & Info + Account */}
      <div className="shrink-0 pt-3 mt-2 border-t border-black/[0.12] dark:border-white/[0.08] space-y-2.5">
        <button
          type="button"
          onClick={() => setIsSettingsInfoOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/[0.06] hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
        >
          <Settings className="w-4 h-4 shrink-0 text-gray-600 dark:text-gray-400" />
          {sidebarOpen && <span>Settings &amp; Info</span>}
        </button>

        <div className="px-1">
          {sidebarOpen && (
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 px-1">
              Workspace
            </div>
          )}
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/75 dark:bg-[#121418]/90 border border-black/[0.10] dark:border-white/[0.08] transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#ee2e65] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
              MP
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[#1C1D21] dark:text-[#F3F4F6] truncate">
                  Admin Utama
                </div>
                <div className="text-[11px] text-[#646772] dark:text-gray-400 truncate">
                  Dept. Multimedia GMS
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
