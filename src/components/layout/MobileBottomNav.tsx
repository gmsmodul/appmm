import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Building2,
  CheckCheck,
  ChevronRight,
  ChevronsUpDown,
  Compass,
  Home,
  Network,
  Plus,
  Search,
  Settings,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { PASTEL_THEMES } from '../../constants/theme';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';

export const MobileBottomNav: React.FC = () => {
  const {
    activePage,
    setActivePage,
    unreadNotifCount,
    notifications,
    handleMarkAllRead,
    handleNotificationClick,
    rulesList,
    sopV5List,
    gms2WiPrList,
    ministryRolesList,
    openRuleModal,
    openSopModal,
    openWiPrModal,
    openMinistryRoleModal,
    openAddDocModal,
    openAttachModal,
    setIsSettingsInfoOpen,
    setGms2Subtab,
    setPanduanSubtab,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuSubview, setMenuSubview] = useState<'nav' | 'notifications' | 'quickCreate'>('nav');
  const [mobileNotifFilter, setMobileNotifFilter] = useState<'All' | 'Unread' | 'Reminders'>('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuCloseTimerRef = useRef<number | null>(null);
  const pillBarRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const openMenuSmoothly = () => {
    if (menuCloseTimerRef.current) {
      window.clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
    playUiMotionSound('pop');
    setMenuClosing(false);
    setMenuOpen(true);
  };

  const closeMenuSmoothly = () => {
    if (!menuOpen || menuClosing) return;
    playUiMotionSound('tick');
    setMenuClosing(true);
    menuCloseTimerRef.current = window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
      menuCloseTimerRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (menuCloseTimerRef.current) window.clearTimeout(menuCloseTimerRef.current);
    };
  }, []);

  const {
    setSheetElement: setSearchSheetEl,
    backdropRef: searchBackdropRef,
    animateClose: animateCloseSearch,
    sheetGestureProps: searchGestureProps,
  } = useBottomSheetMotion({
    onClose: () => {
      setSearchOpen(false);
      setSearchQuery('');
    },
  });

  const primarySlots: Array<{
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    dot?: boolean;
  }> = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'orgchart', label: 'Struktur Organisasi', icon: Network },
    { id: 'panduan', label: 'Panduan, SOP & Rules', icon: BookOpen, dot: unreadNotifCount > 0 },
  ];

  const allModules: Array<{
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | null;
    dividerBefore?: boolean;
  }> = [
    { id: 'overview', label: 'Overview (5 Bidang)', icon: Home },
    { id: 'orgchart', label: 'Struktur Organisasi', icon: Network, badge: 'Baru' },
    { id: 'gms2', label: 'Platform GMS II', icon: Building2, badge: 'Base' },
    { id: 'panduan', label: 'Panduan, SOP & Rules', icon: BookOpen, badge: '4 Kat.' },
    { id: 'perintisan', label: 'Workshop Perintisan', icon: Compass },
    { id: 'quickref', label: 'Referensi Cepat', icon: Zap },
  ];

  const primaryIds = new Set(primarySlots.map((s) => s.id));
  const popupModules = allModules.filter((m) => !primaryIds.has(m.id));
  const isOverflowActive = !primaryIds.has(activePage);
  const activeOverflowModule = isOverflowActive
    ? allModules.find((m) => m.id === activePage)
    : undefined;

  const activeSlotIndex = isOverflowActive
    ? 3
    : primarySlots.findIndex((s) => s.id === activePage);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const bar = pillBarRef.current;
      const btn = slotRefs.current[activeSlotIndex];
      if (!bar || !btn) return;
      const barRect = bar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      if (btnRect.width === 0) return;
      setIndicator({
        left: btnRect.left - barRect.left,
        width: btnRect.width,
        ready: true,
      });
    };

    updateIndicator();
    const bar = pillBarRef.current;
    const ro = typeof ResizeObserver !== 'undefined' && bar ? new ResizeObserver(updateIndicator) : null;
    if (ro && bar) ro.observe(bar);
    window.addEventListener('resize', updateIndicator);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSlotIndex, activePage, menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setMenuSubview('nav');
    }
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 140);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenuSmoothly();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, menuClosing]);

  const handleSelectPage = (id: PageId) => {
    setActivePage(id);
    closeMenuSmoothly();
  };

  const quickCreateActions = [
    { label: 'Tambah Dokumen / Aturan / SOP', action: () => openAddDocModal() },
    { label: 'Lampirkan File atau Tautan', action: () => openAttachModal() },
    { label: 'Info & Cakupan Dokumen', action: () => setIsSettingsInfoOpen(true) },
  ];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matchedModules = allModules
      .filter((m) => !q || m.label.toLowerCase().includes(q))
      .slice(0, q ? 5 : 4);

    const matchedRules = q
      ? rulesList
          .filter(
            (r) =>
              r.title.toLowerCase().includes(q) ||
              r.summary.toLowerCase().includes(q) ||
              r.category.toLowerCase().includes(q)
          )
          .slice(0, 4)
      : [];

    const matchedSops = q
      ? sopV5List
          .filter(
            (m) =>
              m.title.toLowerCase().includes(q) ||
              m.summary.toLowerCase().includes(q) ||
              m.type.toLowerCase().includes(q)
          )
          .slice(0, 4)
      : [];

    const matchedWiPr = q
      ? gms2WiPrList
          .filter(
            (w) =>
              w.title.toLowerCase().includes(q) ||
              w.code.toLowerCase().includes(q) ||
              w.summary.toLowerCase().includes(q)
          )
          .slice(0, 3)
      : [];

    const matchedRoles = q
      ? ministryRolesList
          .filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.group.toLowerCase().includes(q) ||
              r.duties.toLowerCase().includes(q)
          )
          .slice(0, 4)
      : [];

    return { matchedModules, matchedRules, matchedSops, matchedWiPr, matchedRoles };
  }, [allModules, gms2WiPrList, ministryRolesList, rulesList, searchQuery, sopV5List]);

  const ActiveOverflowIcon = activeOverflowModule?.icon;

  return (
    <>
      {menuOpen && (
        <div
          onClick={closeMenuSmoothly}
          className={`${
            menuClosing ? 'animate-ui-fade-out' : 'animate-ui-fade'
          } fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] md:hidden no-print`}
        >
          <div className="fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] inset-x-4 max-w-[352px] mx-auto pointer-events-none">
            <div
              onClick={(e) => e.stopPropagation()}
              data-ui-popover="true"
              className={`${
                menuClosing ? 'animate-menu-fold-down' : 'animate-menu-fold-up'
              } pointer-events-auto w-[min(276px,100%)] max-h-[calc(100vh-92px)] bg-white dark:bg-[#15181E] rounded-[24px] shadow-[0_20px_48px_-12px_rgba(15,23,42,0.28)] dark:shadow-[0_24px_56px_-12px_rgba(0,0,0,0.75)] border border-black/[0.14] dark:border-white/[0.12] flex flex-col overflow-hidden`}
            >
              {/* Top Header */}
              <div className="px-3.5 pt-3 pb-2.5 border-b border-black/[0.12] dark:border-white/[0.08] flex items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSelectPage('overview')}
                  className="flex items-center gap-2 min-w-0 text-left cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#ee2e65] text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs">
                    MP
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-[#1C1D21] dark:text-white truncate group-hover:text-[#ee2e65] transition-colors">
                      Platform
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    title="Info Sistem"
                    onClick={() => {
                      closeMenuSmoothly();
                      setIsSettingsInfoOpen(true);
                    }}
                    className="w-7 h-7 rounded-full hover:bg-[#F4F5F8] dark:hover:bg-[#232730] text-[#4B4E57] dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Tambah Dokumen"
                    onClick={() =>
                      setMenuSubview((prev) => (prev === 'quickCreate' ? 'nav' : 'quickCreate'))
                    }
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      menuSubview === 'quickCreate'
                        ? 'bg-[#FDE0E9] dark:bg-[#ee2e65]/25 text-[#9D113C] dark:text-[#f895b5] rotate-45'
                        : 'bg-[#ee2e65] text-white hover:brightness-105 shadow-xs'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subview: Main Navigation List */}
              {menuSubview === 'nav' && (
                <div className="overflow-y-auto p-2 space-y-0.5 overscroll-contain">
                  {popupModules.map((item) => {
                    const Icon = item.icon;
                    const isCurrent = activePage === item.id;
                    return (
                      <React.Fragment key={item.id}>
                        {item.dividerBefore && (
                          <div className="my-1 border-t border-black/[0.12] dark:border-white/[0.08] mx-2" />
                        )}
                        <button
                          type="button"
                          onClick={() => handleSelectPage(item.id)}
                          className={`touch-target-44 w-full flex items-center justify-between px-3 py-2 rounded-full text-left transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                            isCurrent
                              ? 'bg-[#ee2e65] text-white font-semibold shadow-[0_6px_16px_-6px_rgba(238,46,101,0.55)]'
                              : 'text-[#1C1D21] dark:text-gray-200 hover:bg-[#F4F5F8] dark:hover:bg-white/[0.06] font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isCurrent
                                  ? 'text-white stroke-[2.2px]'
                                  : 'text-[#1C1D21] dark:text-gray-300 stroke-[1.8px]'
                              }`}
                            />
                            <span className="text-[13px] truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`min-w-[22px] h-[20px] px-1.5 rounded-full text-[10.5px] font-bold flex items-center justify-center shrink-0 tabular-nums ${
                                isCurrent
                                  ? 'bg-white text-[#ee2e65]'
                                  : 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>

                        {item.id === 'quickref' && (
                          <button
                            type="button"
                            onClick={() => setMenuSubview('notifications')}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-full text-left text-[#1C1D21] dark:text-gray-200 hover:bg-[#F4F5F8] dark:hover:bg-white/[0.06] font-medium transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Bell className="w-4 h-4 shrink-0 text-[#1C1D21] dark:text-gray-300 stroke-[1.8px]" />
                              <span className="text-[13px] truncate">Notifikasi</span>
                            </div>
                            {unreadNotifCount > 0 && (
                              <span className="min-w-[22px] h-[20px] px-1.5 rounded-full bg-[#EF4444] text-white text-[10.5px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                                {unreadNotifCount}
                              </span>
                            )}
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}

              {/* Subview: Notifications */}
              {menuSubview === 'notifications' && (
                <div className="overflow-y-auto p-3 space-y-2.5 overscroll-contain">
                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => setMenuSubview('nav')}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1C1D21] dark:text-white hover:text-[#ee2e65] whitespace-nowrap cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                      <span>Kembali</span>
                    </button>
                    {unreadNotifCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#ee2e65] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>Tandai Dibaca</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#1B1E24] p-0.5 rounded-lg">
                    {(['All', 'Unread', 'Reminders'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setMobileNotifFilter(tab)}
                        className={`flex-1 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                          mobileNotifFilter === tab
                            ? 'bg-white dark:bg-[#262B34] text-gray-900 dark:text-white shadow-2xs font-semibold'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    {notifications
                      .filter((n) => {
                        if (mobileNotifFilter === 'Unread') return n.unread;
                        if (mobileNotifFilter === 'Reminders') return Boolean(n.isReminder);
                        return true;
                      })
                      .map((notif) => {
                        const pastel = PASTEL_THEMES[notif.theme] || PASTEL_THEMES.periwinkle;
                        return (
                          <button
                            key={notif.id}
                            type="button"
                            onClick={() => {
                              handleNotificationClick(notif);
                              closeMenuSmoothly();
                            }}
                            className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                              notif.unread
                                ? `${pastel.bg} dark:bg-[#1B1E24] border-black/[0.05] dark:border-[#ee2e65]/30`
                                : 'bg-[#FAFBFD] dark:bg-[#181B22] border-black/[0.04] dark:border-white/[0.06]'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                notif.unread ? pastel.dot : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[12.5px] font-semibold text-[#1C1D21] dark:text-white truncate">
                                  {notif.title}
                                </span>
                                <span className="text-[10.5px] text-[#8A8D98] dark:text-gray-400 shrink-0">
                                  {notif.time}
                                </span>
                              </div>
                              <p className="text-[11.5px] text-[#5A5D67] dark:text-gray-400 mt-0.5 line-clamp-2">
                                {notif.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Subview: Quick Create */}
              {menuSubview === 'quickCreate' && (
                <div className="overflow-y-auto p-3 space-y-1.5 overscroll-contain">
                  <div className="flex items-center justify-between px-1 pb-1">
                    <button
                      type="button"
                      onClick={() => setMenuSubview('nav')}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1C1D21] dark:text-white hover:text-[#ee2e65] whitespace-nowrap cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                      <span>Kembali</span>
                    </button>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8D98]">
                      Aksi Cepat
                    </span>
                  </div>

                  {quickCreateActions.map((act) => (
                    <button
                      key={act.label}
                      type="button"
                      onClick={() => {
                        closeMenuSmoothly();
                        act.action();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] hover:bg-[#FEF1F5] dark:hover:bg-[#ee2e65]/20 text-[#1C1D21] dark:text-white hover:text-[#ee2e65] text-[12.5px] font-semibold border border-black/[0.04] dark:border-white/[0.06] transition-colors cursor-pointer"
                    >
                      <span>{act.label}</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Bottom Navigation Dock */}
      <div
        data-ui-popover="true"
        className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-4 max-w-[352px] mx-auto z-40 md:hidden flex items-center gap-2 no-print"
      >
        <nav
          ref={pillBarRef}
          aria-label="Mobile navigation"
          className="relative flex-1 bg-white/95 dark:bg-[#15181E]/95 backdrop-blur-md rounded-full p-1 shadow-[0_10px_28px_-8px_rgba(15,23,42,0.18)] dark:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.75)] border border-black/[0.14] dark:border-white/[0.12] flex items-center justify-between"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#ee2e65] shadow-[0_5px_14px_-4px_rgba(238,46,101,0.55)] transition-[transform,width,opacity] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
              indicator.ready ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: `${indicator.width}px`,
              transform: `translate3d(${indicator.left}px, 0, 0)`,
            }}
          />

          {primarySlots.map((slot, index) => {
            const Icon = slot.icon;
            const isActive = activeSlotIndex === index;
            return (
              <button
                key={slot.id}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                type="button"
                aria-label={slot.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  setActivePage(slot.id);
                  closeMenuSmoothly();
                }}
                className={`relative z-10 flex-1 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-[#1C1D21] dark:text-gray-200 hover:text-[#ee2e65]'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Icon
                    className={`w-[18px] h-[18px] ${
                      isActive ? 'stroke-[2.2px]' : 'stroke-[1.9px]'
                    }`}
                  />
                  {slot.dot && (
                    <span
                      className={`w-2 h-2 rounded-full absolute -top-0.5 -right-1 ring-[1.5px] ${
                        isActive
                          ? 'bg-white ring-[#ee2e65]'
                          : 'bg-[#EF4444] ring-white dark:ring-[#15181E]'
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
            aria-label="Open navigation menu"
            aria-expanded={menuOpen && !menuClosing}
            onClick={() => (menuOpen && !menuClosing ? closeMenuSmoothly() : openMenuSmoothly())}
            className={`relative z-10 h-10 rounded-full flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer ${
              isOverflowActive
                ? 'flex-[1.28] px-2.5 text-white'
                : 'flex-1 text-[#1C1D21] dark:text-gray-200 hover:text-[#ee2e65]'
            }`}
          >
            {isOverflowActive && ActiveOverflowIcon && (
              <ActiveOverflowIcon className="w-[17px] h-[17px] stroke-[2.1px] shrink-0" />
            )}
            <ChevronsUpDown
              className={`w-[15px] h-[15px] stroke-[2.1px] shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                menuOpen && !menuClosing ? 'scale-110' : ''
              }`}
            />
          </button>
        </nav>

        <button
          type="button"
          aria-label="Cari dokumen Multimedia Platform"
          onClick={() => {
            closeMenuSmoothly();
            playUiMotionSound('pop');
            setSearchOpen(true);
          }}
          className={`w-12 h-12 shrink-0 rounded-full backdrop-blur-md shadow-[0_10px_28px_-8px_rgba(15,23,42,0.18)] border flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer ${
            searchOpen
              ? 'bg-[#ee2e65] text-white border-[#ee2e65]'
              : 'bg-white/95 dark:bg-[#15181E]/95 text-[#1C1D21] dark:text-gray-200 border-black/[0.14] dark:border-white/[0.12] hover:text-[#ee2e65]'
          }`}
        >
          <Search className="w-[18px] h-[18px] stroke-[2px]" />
        </button>
      </div>

      {/* Mobile Search Sheet */}
      {searchOpen && (
        <div
          ref={searchBackdropRef}
          data-modal-sheet-backdrop="true"
          className="animate-ui-fade fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end justify-center md:hidden no-print"
        >
          <div
            ref={setSearchSheetEl}
            {...searchGestureProps}
            className="w-full bg-white dark:bg-[#15181E] rounded-t-[28px] p-5 pb-[calc(1.75rem+env(safe-area-inset-bottom,0px))] space-y-4 shadow-2xl max-h-[82vh] flex flex-col animate-bottom-sheet"
          >
            <div
              data-sheet-handle="true"
              className="flex justify-center py-2 -mt-3 -mb-1 cursor-grab active:cursor-grabbing touch-none shrink-0"
            >
              <div className="w-10 h-1 bg-black/20 dark:bg-white/20 rounded-full animate-sheet-handle" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex-1 flex items-center gap-2.5 bg-[#F4F5F8] dark:bg-[#1B1E24] rounded-full px-4 py-2.5 border border-black/[0.12] dark:border-white/[0.12] focus-within:border-[#ee2e65] focus-within:bg-white dark:focus-within:bg-[#15181E] transition-colors">
                <Search className="w-4 h-4 text-[#646772] dark:text-gray-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  enterKeyHint="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari modul, SOP V5, rules, WI/PR..."
                  className="w-full bg-transparent text-[13.5px] text-[#1C1D21] dark:text-white placeholder:text-[#646772] dark:placeholder:text-gray-400 outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[#8A8D98] hover:text-[#1C1D21] dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                aria-label="Close search"
                onClick={animateCloseSearch}
                className="w-9 h-9 rounded-full hover:bg-[#F4F5F8] dark:hover:bg-[#232730] flex items-center justify-center text-[#6E717A] dark:text-gray-300 shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain space-y-4 pr-0.5">
              {searchResults.matchedModules.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8D98] px-1">
                    {searchQuery ? 'Halaman' : 'Akses Cepat Modul'}
                  </div>
                  <div className="space-y-1">
                    {searchResults.matchedModules.map((mod) => {
                      const Icon = mod.icon;
                      const isCurrent = activePage === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            setActivePage(mod.id);
                            animateCloseSearch();
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-colors text-left cursor-pointer ${
                            isCurrent
                              ? 'bg-[#ee2e65] text-white font-semibold'
                              : 'bg-[#FAFBFD] dark:bg-[#1B1E24] hover:bg-[#F4F5F8] dark:hover:bg-[#232730] text-[#1C1D21] dark:text-white font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="text-[13px] truncate">{mod.label}</span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 ${
                              isCurrent ? 'text-white/80' : 'text-[#B4B6C1]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {searchResults.matchedRules.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8D98] px-1">
                    Rules &amp; Kedisiplinan
                  </div>
                  <div className="space-y-1">
                    {searchResults.matchedRules.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          const isVal =
                            r.category.toLowerCase().includes('value') ||
                            r.category.toLowerCase().includes('komitmen');
                          setPanduanSubtab(isVal ? 'value' : 'rules');
                          setActivePage('panduan');
                          openRuleModal(r.id);
                          animateCloseSearch();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] text-left cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-[13px] font-semibold text-[#1C1D21] dark:text-white truncate">
                            {r.title}
                          </div>
                          <div className="text-[11px] text-[#8A8D98] truncate">{r.category}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B4B6C1] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.matchedSops.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8D98] px-1">
                    SOP Operasional
                  </div>
                  <div className="space-y-1">
                    {searchResults.matchedSops.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setPanduanSubtab('sop');
                          setActivePage('panduan');
                          openSopModal(m.id);
                          animateCloseSearch();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] text-left cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-[13px] font-semibold text-[#1C1D21] dark:text-white truncate">
                            #{m.num} {m.title}
                          </div>
                          <div className="text-[11px] text-[#8A8D98] truncate">Bagian {m.section}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B4B6C1] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.matchedWiPr.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8D98] px-1">
                    Platform GMS II (WI / PR)
                  </div>
                  <div className="space-y-1">
                    {searchResults.matchedWiPr.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => {
                          setGms2Subtab('wipr');
                          setActivePage('gms2');
                          openWiPrModal(w.id);
                          animateCloseSearch();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] text-left cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-[13px] font-semibold text-[#1C1D21] dark:text-white truncate">
                            {w.code} — {w.title}
                          </div>
                          <div className="text-[11px] text-[#8A8D98] truncate">{w.type}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B4B6C1] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.matchedRoles.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8D98] px-1">
                    Bidang Team Ministry
                  </div>
                  <div className="space-y-1">
                    {searchResults.matchedRoles.map((r) => (
                      <button
                        key={r.num}
                        type="button"
                        onClick={() => {
                          setPanduanSubtab('peran');
                          setActivePage('panduan');
                          openMinistryRoleModal(r.id || r.num);
                          animateCloseSearch();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] text-left cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-[13px] font-semibold text-[#1C1D21] dark:text-white truncate">
                            #{r.num} {r.name}
                          </div>
                          <div className="text-[11px] text-[#8A8D98] truncate">{r.group}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B4B6C1] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
