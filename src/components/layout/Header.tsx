import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Bell,
  BellRing,
  BookOpen,
  Building2,
  CheckCheck,
  ChevronRight,
  Compass,
  Layers,
  LayoutGrid,
  Moon,
  Network,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Sun,
  WifiOff,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { PASTEL_THEMES } from '../../constants/theme';
import { PageId, PastelThemeKey } from '../../types';
import { useIsMobile } from '../../hooks/useIsMobile';
import { getPageDirection } from '../ui/PageTransition';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { playUiMotionSound } from '../../utils/uiMotionSound';

type SearchCategoryFilter =
  | 'All'
  | 'Modules'
  | 'Rules'
  | 'SOP V5'
  | 'Platform GMS II'
  | 'Ministry'
  | 'Referensi Cepat';

interface SearchEntry {
  id: string;
  category: Exclude<SearchCategoryFilter, 'All'>;
  title: string;
  desc: string;
  meta: string;
  badge?: string;
  theme: PastelThemeKey;
  onSelect: () => void;
}

const SEARCH_MODULES: Array<{
  id: PageId;
  label: string;
  desc: string;
  keywords: string;
  theme: PastelThemeKey;
}> = [
  {
    id: 'overview',
    label: 'Overview (5 Bidang)',
    desc: 'Tagline GMS Multimedia, Pelayanan Saputangan Paulus & 5 Bidang Ekosistem Multimedia GMS',
    keywords: 'dashboard bidang visi misi saputangan paulus',
    theme: 'periwinkle',
  },
  {
    id: 'orgchart',
    label: 'Struktur Organisasi',
    desc: 'Bagan V2 Synodal & V1 Dept. Multimedia, 8 Regional & Jenjang Karier',
    keywords: 'bagan v1 v2 sinodal regional svg png',
    theme: 'coral',
  },
  {
    id: 'gms2',
    label: 'Platform GMS II (Base • 78 Hal.)',
    desc: 'Base Platform Hal. 1–78: Pengantar, 5 Jabatan, Leveling, Servolution, Kategori A–E, 6 Prinsip, TPS, WI/PR & 6 Formulir',
    keywords: 'gms2 base platform pengantar servolution jabatan leveling tps wi pr formulir pengadaan prinsip',
    theme: 'periwinkle',
  },
  {
    id: 'panduan',
    label: 'Panduan, SOP & Rules (4 Kategori)',
    desc: 'Pusat terpadu Value & Komitmen, Rules & Kedisiplinan, SOP Operasional (Crew Chief + V5), dan Peran & Struktur Tim',
    keywords: 'panduan value komitmen aturan rules disiplin sop crew chief vd td kamera ministry leader',
    theme: 'mint',
  },
  {
    id: 'perintisan',
    label: 'Workshop Perintisan',
    desc: 'Kurikulum 4 materi dasar, Metode 1 vs Metode 2 & Target pendampingan',
    keywords: 'perintisan satelit metode regional',
    theme: 'mint',
  },
  {
    id: 'quickref',
    label: 'Referensi Cepat',
    desc: 'Matriks CAM 1–9, 10 Isyarat Tangan FD, Leveling & Kategori Gereja A–E',
    keywords: 'cepat matriks cam fd isyarat kategori',
    theme: 'peach',
  },
];

export const Header: React.FC = () => {
  const {
    activePage,
    prevPage,
    setActivePage,
    setOrgSubtab,
    setGms2Subtab,
    setPanduanSubtab,
    notifications,
    unreadNotifCount,
    handleMarkAllRead,
    handleNotificationClick,
    browserNotifEnabled,
    toggleBrowserNotifications,
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    bukuSakuValuesList,
    rulesList,
    crewChiefTimelineList,
    sopV5List,
    gms2PengantarList,
    gms2ServolutionList,
    gms2PrinsipList,
    gms2FormsList,
    gms2WiPrList,
    levelingList,
    churchCategoriesList,
    tpsStepsList,
    ministryRolesList,
    leaderDivisionsList,
    jabatanList,
    regionalsList,
    camMatrixList,
    fdSignalsList,
    openRuleModal,
    openSopModal,
    openJabatanModal,
    openLevelModal,
    openWiPrModal,
    openGms2FormModal,
    openMinistryRoleModal,
    openAddDocModal,
    isOnline,
    pendingSyncCount,
    syncPendingNow,
    theme,
    toggleTheme,
  } = useApp();

  const isMobile = useIsMobile();
  const direction = getPageDirection(prevPage, activePage, isMobile);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsFilter, setNotificationsFilter] = useState<'All' | 'Unread' | 'Reminders'>('All');
  const [popoverCoords, setPopoverCoords] = useState<{
    top: number;
    right: number;
    isSm: boolean;
  }>({ top: 68, right: 16, isSm: false });
  const notifWrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<SearchCategoryFilter>('All');
  const [searchActiveIdx, setSearchActiveIdx] = useState(0);
  const [searchCoords, setSearchCoords] = useState<{
    top: number;
    right: number;
    isSm: boolean;
  }>({ top: 68, right: 16, isSm: false });
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const searchPopoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updatePopoverPosition = useCallback(() => {
    const el = notifWrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPopoverCoords({
      top: Math.round(rect.bottom + 8),
      right: Math.max(12, Math.round(window.innerWidth - rect.right)),
      isSm: window.innerWidth >= 640,
    });
  }, []);

  const updateSearchPosition = useCallback(() => {
    const el = searchWrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSearchCoords({
      top: Math.round(rect.bottom + 8),
      right: Math.max(12, Math.round(window.innerWidth - rect.right)),
      isSm: window.innerWidth >= 640,
    });
  }, []);

  useEffect(() => {
    if (!notificationsOpen) return;
    updatePopoverPosition();
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        notifWrapperRef.current &&
        !notifWrapperRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNotificationsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', updatePopoverPosition);
    window.addEventListener('scroll', updatePopoverPosition, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition, true);
    };
  }, [notificationsOpen, updatePopoverPosition]);

  useEffect(() => {
    if (!isGlobalSearchOpen) {
      setSearchQuery('');
      setSearchCategory('All');
      setSearchActiveIdx(0);
      return;
    }
    setNotificationsOpen(false);
    updateSearchPosition();
    const focusTimer = window.setTimeout(() => searchInputRef.current?.focus(), 60);

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(target) &&
        searchPopoverRef.current &&
        !searchPopoverRef.current.contains(target)
      ) {
        setIsGlobalSearchOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', updateSearchPosition);
    window.addEventListener('scroll', updateSearchPosition, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', updateSearchPosition);
      window.removeEventListener('scroll', updateSearchPosition, true);
    };
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen, updateSearchPosition]);

  const reminderNotifCount = notifications.filter((n) => Boolean(n.isReminder)).length;

  const filteredNotifications = notifications.filter((n) => {
    if (notificationsFilter === 'Unread') return n.unread;
    if (notificationsFilter === 'Reminders') return Boolean(n.isReminder);
    return true;
  });

  const allSearchEntries = useMemo<SearchEntry[]>(() => {
    const close = () => setIsGlobalSearchOpen(false);
    const list: SearchEntry[] = [];

    SEARCH_MODULES.forEach((mod) => {
      list.push({
        id: `mod-${mod.id}`,
        category: 'Modules',
        title: mod.label,
        desc: mod.desc,
        meta: 'Halaman',
        badge: mod.keywords.split(' ')[0],
        theme: mod.theme,
        onSelect: () => {
          setActivePage(mod.id);
          close();
        },
      });
    });

    bukuSakuValuesList.forEach((v) => {
      list.push({
        id: `bsval-${v.id}`,
        category: 'Ministry',
        title: `${v.num}. ${v.name}`,
        desc: v.desc,
        meta: 'Value & Komitmen',
        badge: 'Nilai Dasar',
        theme: 'mint',
        onSelect: () => {
          setPanduanSubtab('value');
          setActivePage('panduan');
          close();
        },
      });
    });

    rulesList.forEach((r) => {
      const isVal =
        r.category.toLowerCase().includes('value') ||
        r.category.toLowerCase().includes('komitmen');
      list.push({
        id: `rule-${r.id}`,
        category: 'Rules',
        title: r.title,
        desc: r.summary,
        meta: r.category,
        badge: r.type,
        theme: 'peach',
        onSelect: () => {
          setPanduanSubtab(isVal ? 'value' : 'rules');
          setActivePage('panduan');
          openRuleModal(r.id);
          close();
        },
      });
    });

    crewChiefTimelineList.forEach((t) => {
      list.push({
        id: `cc-${t.id || t.time}`,
        category: 'SOP V5',
        title: `Crew Chief ${t.time} — ${t.phase}`,
        desc: t.desc,
        meta: 'SOP Crew Chief',
        badge: 'PIC Ibadah',
        theme: 'coral',
        onSelect: () => {
          setPanduanSubtab('sop');
          setActivePage('panduan');
          close();
        },
      });
    });

    sopV5List.forEach((m) => {
      list.push({
        id: `sop-${m.id}`,
        category: 'SOP V5',
        title: `#${m.num} ${m.title}`,
        desc: m.summary,
        meta: `Bagian ${m.section}`,
        badge: m.type,
        theme: 'coral',
        onSelect: () => {
          setPanduanSubtab('sop');
          setActivePage('panduan');
          openSopModal(m.id);
          close();
        },
      });
    });

    gms2PengantarList.forEach((p) => {
      const pageLabel = p.pages.toLowerCase().startsWith('hal') ? p.pages : `Hal. ${p.pages}`;
      list.push({
        id: `gms2-pengantar-${p.id}`,
        category: 'Platform GMS II',
        title: `${p.section} (${pageLabel})`,
        desc: p.desc,
        meta: pageLabel,
        badge: 'Pengantar GMS II',
        theme: 'periwinkle',
        onSelect: () => {
          if (p.linkPage === 'orgchart') {
            setActivePage('orgchart');
          } else {
            setGms2Subtab('pengantar');
            setActivePage('gms2');
          }
          close();
        },
      });
    });

    jabatanList.forEach((j) => {
      const targetKey = j.id || j.num;
      const pageLabel = j.pages.toLowerCase().startsWith('hal') ? j.pages : `Hal. ${j.pages}`;
      list.push({
        id: `jab-${targetKey}`,
        category: 'Platform GMS II',
        title: `${j.title} (${pageLabel})`,
        desc: j.desc,
        meta: j.nature,
        badge: 'Jabatan GMS II',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('pengantar');
          setActivePage('gms2');
          openJabatanModal(targetKey);
          close();
        },
      });
    });

    levelingList.forEach((lv) => {
      const targetKey = lv.id || lv.grade;
      list.push({
        id: `gms2-level-${targetKey}`,
        category: 'Platform GMS II',
        title: `${lv.grade} — ${lv.role} (${lv.duration})`,
        desc: `${lv.objektif} · ${lv.scope}`,
        meta: lv.msj,
        badge: 'Leveling GMS II',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('pelayanan');
          setActivePage('gms2');
          openLevelModal(targetKey);
          close();
        },
      });
    });

    gms2ServolutionList.forEach((sv) => {
      const pageLabel = sv.pages.toLowerCase().startsWith('hal') ? sv.pages : `Hal. ${sv.pages}`;
      list.push({
        id: `gms2-serv-${sv.id}`,
        category: 'Platform GMS II',
        title: `${sv.component} (${pageLabel})`,
        desc: sv.desc,
        meta: pageLabel,
        badge: 'Servolution',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('pelayanan');
          setActivePage('gms2');
          close();
        },
      });
    });

    churchCategoriesList.forEach((c) => {
      const catLabel = c.cat.toLowerCase().startsWith('kategori') ? c.cat : `Kategori ${c.cat}`;
      list.push({
        id: `gms2-cat-${c.id || c.cat}`,
        category: 'Platform GMS II',
        title: `${catLabel} (${c.label}) — ${c.capacity}`,
        desc: `Staff: ${c.staffMM} · Relawan: ${c.relawan} · ${c.equip}`,
        meta: 'Hal. 51–55',
        badge: 'Kategori Gereja',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('kantor');
          setActivePage('gms2');
          close();
        },
      });
    });

    gms2PrinsipList.forEach((pr) => {
      list.push({
        id: `gms2-prinsip-${pr.id}`,
        category: 'Platform GMS II',
        title: `${pr.code} — ${pr.title}`,
        desc: pr.desc,
        meta: pr.group,
        badge: pr.group === 'Aspek Akuntabilitas' ? 'Akuntabilitas' : 'Prinsip Pengadaan',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('kantor');
          setActivePage('gms2');
          close();
        },
      });
    });

    tpsStepsList.forEach((step) => {
      list.push({
        id: `gms2-tps-${step.id}`,
        category: 'Platform GMS II',
        title: `TPS Tahap #${step.step} — ${step.title}`,
        desc: step.desc,
        meta: 'Hal. 59–64',
        badge: 'Pengadaan TPS',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('pengadaan');
          setActivePage('gms2');
          close();
        },
      });
    });

    gms2WiPrList.forEach((w) => {
      list.push({
        id: `wipr-${w.id}`,
        category: 'Platform GMS II',
        title: `${w.code} — ${w.title}`,
        desc: w.summary,
        meta: w.type,
        badge: w.type,
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('wipr');
          setActivePage('gms2');
          openWiPrModal(w.id);
          close();
        },
      });
    });

    gms2FormsList.forEach((f) => {
      list.push({
        id: `gms2-form-${f.id}`,
        category: 'Platform GMS II',
        title: `${f.code} — ${f.title}`,
        desc: f.summary,
        meta: 'Hal. 72–78',
        badge: 'Formulir Standar',
        theme: 'periwinkle',
        onSelect: () => {
          setGms2Subtab('wipr');
          setActivePage('gms2');
          openGms2FormModal(f.id);
          close();
        },
      });
    });

    ministryRolesList.forEach((r) => {
      const targetKey = r.id || r.num;
      list.push({
        id: `role-${targetKey}`,
        category: 'Ministry',
        title: `#${r.num} ${r.name}`,
        desc: `${r.group} · ${r.duties}`,
        meta: r.group,
        badge: 'Peran Tim',
        theme: 'mint',
        onSelect: () => {
          setPanduanSubtab('peran');
          setActivePage('panduan');
          openMinistryRoleModal(targetKey);
          close();
        },
      });
    });

    leaderDivisionsList.forEach((div) => {
      list.push({
        id: `ldiv-${div.id}`,
        category: 'Ministry',
        title: div.name,
        desc: `${div.scope} · ${div.desc}`,
        meta: div.scope,
        badge: 'Team Leader',
        theme: 'mint',
        onSelect: () => {
          setPanduanSubtab('peran');
          setActivePage('panduan');
          close();
        },
      });
    });

    regionalsList.forEach((reg) => {
      list.push({
        id: `reg-${reg.id || reg.no}`,
        category: 'Modules',
        title: `${reg.name} (${reg.center})`,
        desc: reg.desc,
        meta: 'Regional',
        badge: 'Sinodal',
        theme: 'periwinkle',
        onSelect: () => {
          setOrgSubtab('sinodal');
          setActivePage('orgchart');
          close();
        },
      });
    });

    camMatrixList.forEach((c) => {
      list.push({
        id: `cam-${c.id || c.cam}`,
        category: 'Referensi Cepat',
        title: `${c.cam} (${c.rig})`,
        desc: `${c.lens} · ${c.notes}`,
        meta: c.rig,
        badge: 'CAM Matrix',
        theme: 'peach',
        onSelect: () => {
          setActivePage('quickref');
          close();
        },
      });
    });

    fdSignalsList.forEach((s) => {
      list.push({
        id: `fd-${s.id || s.code}`,
        category: 'Referensi Cepat',
        title: `Isyarat FD ${s.code} — ${s.meaning}`,
        desc: s.gesture,
        meta: 'FD Signal',
        badge: 'Referensi Cepat',
        theme: 'peach',
        onSelect: () => {
          setActivePage('quickref');
          close();
        },
      });
    });

    return list;
  }, [
    bukuSakuValuesList,
    camMatrixList,
    churchCategoriesList,
    crewChiefTimelineList,
    fdSignalsList,
    gms2FormsList,
    gms2PengantarList,
    gms2PrinsipList,
    gms2ServolutionList,
    gms2WiPrList,
    jabatanList,
    leaderDivisionsList,
    levelingList,
    ministryRolesList,
    openGms2FormModal,
    openJabatanModal,
    openLevelModal,
    openMinistryRoleModal,
    openRuleModal,
    openSopModal,
    openWiPrModal,
    regionalsList,
    rulesList,
    setActivePage,
    setGms2Subtab,
    setIsGlobalSearchOpen,
    setOrgSubtab,
    setPanduanSubtab,
    sopV5List,
    tpsStepsList,
  ]);

  const filteredSearchEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allSearchEntries
      .filter((item) => {
        if (searchCategory !== 'All' && item.category !== searchCategory) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.badge || '').toLowerCase().includes(q)
        );
      })
      .slice(0, q ? 24 : 12);
  }, [allSearchEntries, searchCategory, searchQuery]);

  useEffect(() => {
    setSearchActiveIdx(0);
  }, [searchQuery, searchCategory]);

  useEffect(() => {
    if (!isGlobalSearchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsGlobalSearchOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSearchActiveIdx((prev) =>
          filteredSearchEntries.length > 0 ? (prev + 1) % filteredSearchEntries.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSearchActiveIdx((prev) =>
          filteredSearchEntries.length > 0
            ? (prev - 1 + filteredSearchEntries.length) % filteredSearchEntries.length
            : 0
        );
      } else if (e.key === 'Enter' && filteredSearchEntries[searchActiveIdx]) {
        e.preventDefault();
        filteredSearchEntries[searchActiveIdx].onSelect();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredSearchEntries, isGlobalSearchOpen, searchActiveIdx, setIsGlobalSearchOpen]);

  const pageMeta: Record<
    PageId,
    { title: string; icon: React.ComponentType<{ className?: string }>; iconClass?: string }
  > = {
    overview: { title: 'Overview — 5 Bidang Ekosistem', icon: LayoutGrid },
    orgchart: { title: 'Struktur Organisasi', icon: Network, iconClass: 'text-[#ee2e65]' },
    gms2: { title: 'Platform GMS II — Base Platform (78 Hal.)', icon: Building2 },
    panduan: { title: 'Panduan, SOP & Rules', icon: BookOpen },
    perintisan: { title: 'Workshop Perintisan', icon: Compass },
    quickref: { title: 'Referensi Cepat', icon: Zap },
    uikit: {
      title: 'Design System & UI Components',
      icon: Layers,
      iconClass: 'text-[#9D113C] dark:text-[#f895b5]',
    },
  };

  const currentMeta = pageMeta[activePage] || pageMeta.orgchart;
  const CurrentPageIcon = currentMeta.icon;

  const searchCategories: SearchCategoryFilter[] = [
    'All',
    'Modules',
    'Rules',
    'SOP V5',
    'Platform GMS II',
    'Ministry',
    'Referensi Cepat',
  ];

  return (
    <header className="relative z-30 h-16 px-3 sm:px-5 border-b border-black/[0.12] dark:border-white/[0.08] flex items-center justify-between gap-3 sm:gap-4 shrink-0 bg-white/80 dark:bg-[#121418]/90 backdrop-blur-sm no-print transition-colors duration-200">
      <div className="relative flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
        {/* Mobile Header Left */}
        <div className="flex md:hidden items-center min-w-0 flex-1 relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {activePage === 'overview' ? (
              <motion.div
                key="mobile-header-overview"
                initial={{ opacity: 0, x: direction * 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -12 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2.5 min-w-0 w-full"
              >
                <div className="w-9 h-9 rounded-full bg-[#ee2e65] text-white text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
                  MP
                </div>
                <div className="min-w-0">
                  <span className="block text-[15px] font-semibold tracking-tight text-[#1C1D21] dark:text-[#F3F4F6] truncate leading-tight">
                    Platform
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`mobile-header-${activePage}`}
                initial={{ opacity: 0, x: direction * 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -12 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2 min-w-0 w-full"
              >
                <CurrentPageIcon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    currentMeta.iconClass || 'text-[#1C1D21] dark:text-[#F3F4F6]'
                  }`}
                />
                <h1 className="text-[17px] font-semibold tracking-tight text-[#1C1D21] dark:text-[#F3F4F6] truncate">
                  {currentMeta.title}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tablet & PC Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-[13px] min-w-0">
          <span className="text-[#646772] dark:text-gray-400 font-medium shrink-0">
            Platform
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#8A8D98] dark:text-gray-500 shrink-0" />
          <div className="relative flex items-center min-w-0 overflow-hidden py-0.5">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`desktop-crumb-${activePage}`}
                initial={{ opacity: 0, y: direction * 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -8 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-1.5 font-semibold text-[#1C1D21] dark:text-[#F3F4F6] min-w-0"
              >
                <CurrentPageIcon
                  className={`w-4 h-4 shrink-0 ${
                    currentMeta.iconClass || 'text-[#1C1D21] dark:text-[#F3F4F6]'
                  }`}
                />
                <span className="truncate">{currentMeta.title}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </nav>
      </div>

      {/* Top Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5 relative shrink-0">
        {(!isOnline || pendingSyncCount > 0) && (
          <button
            type="button"
            onClick={() => void syncPendingNow()}
            className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full border text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              !isOnline
                ? 'bg-amber-50 dark:bg-amber-500/15 border-amber-300 dark:border-amber-500/35 text-amber-800 dark:text-amber-300'
                : 'bg-[#F0EFFC] dark:bg-[#1B1E24] border-[#D6D4FF] dark:border-white/[0.12] text-[#3F3B99] dark:text-[#C4B5FD]'
            }`}
          >
            {!isOnline ? (
              <WifiOff className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="hidden sm:inline">
              {!isOnline ? 'Offline' : `Sync (${pendingSyncCount})`}
            </span>
          </button>
        )}

        {activePage !== 'uikit' && (
          <button
            type="button"
            onClick={() => openAddDocModal()}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Dokumen</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => {
            playUiMotionSound('pop');
            toggleTheme();
          }}
          aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          title={theme === 'dark' ? 'Tema Terang (Light)' : 'Tema Gelap (Dark)'}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#1B1E24] border-white/[0.14] text-[#C6F135] hover:bg-[#232730]'
              : 'border-black/[0.14] text-[#1C1D21] hover:bg-[#F4F5F8]'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Bell & Popover */}
        <div ref={notifWrapperRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setIsGlobalSearchOpen(false);
              setNotificationsOpen((prev) => {
                playUiMotionSound(!prev ? 'pop' : 'tick');
                return !prev;
              });
            }}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors relative cursor-pointer ${
              notificationsOpen
                ? 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5] border-[#FBC2D4] dark:border-[#ee2e65]/40'
                : 'border-black/[0.14] dark:border-white/[0.12] text-[#1C1D21] dark:text-gray-200 hover:bg-[#F4F5F8] dark:hover:bg-[#1B1E24]'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="min-w-[17px] h-[17px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center absolute -top-1 -right-1 ring-2 ring-white dark:ring-[#121418] tabular-nums">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {notificationsOpen &&
            createPortal(
              <div
                ref={popoverRef}
                data-no-pull="true"
                data-ui-popover="true"
                style={{
                  top: popoverCoords.top,
                  right: popoverCoords.isSm ? popoverCoords.right : 12,
                  left: popoverCoords.isSm ? undefined : 12,
                }}
                className="fixed sm:w-[380px] bg-white dark:bg-[#15181E] rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.22)] dark:shadow-[0_24px_56px_-12px_rgba(0,0,0,0.65)] border border-black/[0.14] dark:border-white/[0.10] p-4 z-[9999] space-y-3 animate-ui-pop"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[15px] font-semibold text-[#1C1D21] dark:text-white">
                      Notifikasi Multimedia
                    </span>
                    {unreadNotifCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FFECEB] dark:bg-rose-500/20 text-[#942922] dark:text-rose-300 text-[10.5px] font-bold shrink-0">
                        {unreadNotifCount} Baru
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={toggleBrowserNotifications}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                        browserNotifEnabled
                          ? 'bg-[#E6F9F0] dark:bg-emerald-500/20 text-[#146C43] dark:text-emerald-300'
                          : 'bg-gray-100 dark:bg-[#232730] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2C313C]'
                      }`}
                    >
                      <BellRing className="w-3 h-3 shrink-0" />
                      <span>{browserNotifEnabled ? 'Alert On' : 'Alert'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#9D113C] dark:text-[#f895b5] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5 sm:hidden shrink-0" />
                      <span className="sm:hidden">Read</span>
                      <span className="hidden sm:inline">Tandai Dibaca</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#1B1E24] p-0.5 rounded-lg">
                  {(
                    [
                      { id: 'All' as const, label: `Semua (${notifications.length})` },
                      { id: 'Unread' as const, label: `Baru (${unreadNotifCount})` },
                      { id: 'Reminders' as const, label: `Pengingat (${reminderNotifCount})` },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setNotificationsFilter(tab.id)}
                      className={`flex-1 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        notificationsFilter === tab.id
                          ? 'bg-white dark:bg-[#262B34] text-gray-900 dark:text-white shadow-2xs font-semibold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto ui-scrollbar space-y-2 pr-1 overscroll-contain">
                  {filteredNotifications.map((notif) => {
                    const pastel = PASTEL_THEMES[notif.theme] || PASTEL_THEMES.periwinkle;
                    return (
                      <button
                        key={notif.id}
                        type="button"
                        onClick={() => {
                          handleNotificationClick(notif);
                          setNotificationsOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          notif.unread
                            ? `${pastel.bg} dark:bg-[#1B1E24] border-black/[0.06] dark:border-[#ee2e65]/30`
                            : 'bg-gray-50 dark:bg-[#181B22] border-gray-100 dark:border-white/[0.06] hover:bg-gray-100/70 dark:hover:bg-[#1E222B]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            notif.unread ? pastel.dot : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {notif.title}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 shrink-0 tabular-nums">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                            {notif.desc}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {notif.reminderTag && (
                              <span className="inline-block text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5]">
                                {notif.reminderTag}
                              </span>
                            )}
                            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-[#262B34] text-gray-900 dark:text-gray-100 shadow-2xs">
                              Buka {notif.category} →
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8 text-xs text-gray-500 dark:text-gray-400">
                      Semua pengingat sudah dibaca.
                    </div>
                  )}
                </div>
              </div>,
              document.body
            )}
        </div>

        {/* Search Button & Popover */}
        <div ref={searchWrapperRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(false);
              setIsGlobalSearchOpen((prev) => {
                playUiMotionSound(!prev ? 'pop' : 'tick');
                return !prev;
              });
            }}
            aria-label="Search aplikasi"
            aria-expanded={isGlobalSearchOpen}
            title="Cari Panduan, SOP, Rules, Platform GMS II (⌘K / /)"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors relative cursor-pointer ${
              isGlobalSearchOpen
                ? 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5] border-[#FBC2D4] dark:border-[#ee2e65]/40'
                : 'border-black/[0.14] dark:border-white/[0.12] text-[#1C1D21] dark:text-gray-200 hover:bg-[#F4F5F8] dark:hover:bg-[#1B1E24]'
            }`}
          >
            <Search className="w-4 h-4 shrink-0" />
          </button>

          {isGlobalSearchOpen &&
            createPortal(
              <div
                ref={searchPopoverRef}
                data-no-pull="true"
                data-ui-popover="true"
                style={{
                  top: searchCoords.top,
                  right: searchCoords.isSm ? searchCoords.right : 12,
                  left: searchCoords.isSm ? undefined : 12,
                }}
                className="fixed sm:w-[420px] bg-white dark:bg-[#15181E] rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.22)] dark:shadow-[0_24px_56px_-12px_rgba(0,0,0,0.65)] border border-black/[0.14] dark:border-white/[0.10] p-4 z-[9999] space-y-3 animate-ui-pop"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[15px] font-semibold text-[#1C1D21] dark:text-white">
                      Pencarian Global
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#F0EFFC] dark:bg-white/[0.08] text-[#3F3B99] dark:text-[#C4B5FD] text-[10.5px] font-bold shrink-0 tabular-nums">
                      {filteredSearchEntries.length} Hasil
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#232730] text-gray-600 dark:text-gray-300 text-[10.5px] font-mono font-semibold">
                      ⌘K
                    </kbd>
                    {(searchQuery || searchCategory !== 'All') && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchCategory('All');
                          searchInputRef.current?.focus();
                        }}
                        className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#9D113C] dark:text-[#f895b5] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 shrink-0" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#F4F5F8] dark:bg-[#1B1E24] rounded-xl px-3 py-2 border border-black/[0.12] dark:border-white/[0.12] focus-within:bg-white dark:focus-within:bg-[#15181E] focus-within:border-[#ee2e65] transition-colors">
                  <Search className="w-3.5 h-3.5 text-[#646772] dark:text-gray-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    enterKeyHint="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari SOP V5, rules, GMS II, regional, CAM..."
                    className="flex-1 bg-transparent text-xs text-[#1C1D21] dark:text-white placeholder:text-[#646772] dark:placeholder:text-gray-400 outline-none min-w-0"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Hapus pencarian"
                      className="text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="bg-gray-100/90 dark:bg-[#1B1E24] p-1 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
                  <HorizontalSlideTrack
                    activeKey={searchCategory}
                    accent="dark"
                    visibility="auto"
                    showControls
                    fadeEdges
                    indicatorSize="wide"
                    trackClassName="flex items-center gap-1"
                    indicatorClassName="mt-1.5 pb-0.5"
                  >
                    {searchCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        data-slide-active={searchCategory === cat ? 'true' : undefined}
                        onClick={() => setSearchCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          searchCategory === cat
                            ? 'bg-white dark:bg-[#262B34] text-gray-900 dark:text-white shadow-2xs font-semibold'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </HorizontalSlideTrack>
                </div>

                <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto ui-scrollbar space-y-2 pr-1 overscroll-contain">
                  {filteredSearchEntries.map((item, idx) => {
                    const pastel = PASTEL_THEMES[item.theme] || PASTEL_THEMES.periwinkle;
                    const isHighlighted = idx === searchActiveIdx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setSearchActiveIdx(idx)}
                        onClick={item.onSelect}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isHighlighted
                            ? `${pastel.bg} dark:bg-[#1B1E24] border-black/[0.06] dark:border-[#ee2e65]/35`
                            : 'bg-gray-50 dark:bg-[#181B22] border-gray-100 dark:border-white/[0.06] hover:bg-gray-100/70 dark:hover:bg-[#1E222B]'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${pastel.dot}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 shrink-0 tabular-nums">
                              {item.meta}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">
                            {item.desc}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {item.badge && (
                              <span className="inline-block text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5]">
                                {item.badge}
                              </span>
                            )}
                            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-[#262B34] text-gray-900 dark:text-gray-100 shadow-2xs">
                              Buka {item.category} →
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  {filteredSearchEntries.length === 0 && (
                    <div className="text-center py-8 text-xs text-gray-500 dark:text-gray-400">
                      Tidak ada hasil untuk &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </header>
  );
};
