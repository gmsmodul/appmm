import React, { useState, useRef, useMemo, useEffect, useLayoutEffect, Suspense } from 'react';
import {
  Download,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  CornerDownLeft,
  RotateCcw,
  Clock,
  Sparkles,
  Minus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageTransition, getOrderedDirection } from '../ui/PageTransition';
import { UI_KIT_CATALOG, UiKitSubSection } from '../uikit/uiKitCatalog';
import { UiKitCategorySkeleton } from '../uikit/UiKitCategorySkeleton';
import { UiSkeletonSearchPanel } from '../ui/UiSkeleton';
import { UiLoader } from '../ui/UiLoader';
import {
  RecentSearchEntry,
  UI_SUGGESTION_SEARCHES,
  loadRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} from '../../utils/uiSearchHistory';
import {
  LazyUtilitiesUiKit,
  LazyDataDisplayUiKit,
  LazyDataEntryUiKit,
  LazyFeedbackUiKit,
  LazyTableUiKit,
  LazyOtherMultimediaUiKit,
  LazyAuthStateUiKit,
  LazyMobileUiKit,
  preloadAdjacentCategories,
  scheduleIdleUiKitPreload,
} from '../uikit/uiKitPreload';

interface SearchResultEntry {
  key: string;
  groupId: string;
  groupLabel: string;
  itemLabel: string;
  section?: UiKitSubSection;
  score: number;
}

const FLAT_UI_ORDER = UI_KIT_CATALOG.flatMap((g) =>
  g.items.map((item) => `${g.id}::${item.label}`)
);

export const UiKitPage: React.FC = () => {
  const {
    uiCategory,
    prevUiCategory,
    uiSubJump,
    prevUiSubJump,
    uiTargetSectionId,
    selectUiNode,
    clearUiTargetSection,
    uiSearchFocusSeq,
    triggerToast,
  } = useApp();

  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearchEntry[]>(() =>
    loadRecentSearches()
  );

  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const sidebarListRef = useRef<HTMLDivElement>(null);
  const activeSidebarBtnRef = useRef<HTMLButtonElement | null>(null);
  const [sidebarIndicator, setSidebarIndicator] = useState({ top: 0, height: 0, ready: false });
  const canvasTopRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const flatItems = useMemo(
    () =>
      UI_KIT_CATALOG.flatMap((g) =>
        g.items.map((item) => ({ groupId: g.id, groupLabel: g.label, sub: item.label }))
      ),
    []
  );

  const currentIdx = flatItems.findIndex(
    (item) => item.groupId === uiCategory && item.sub === uiSubJump
  );

  const itemDirection = getOrderedDirection(
    `${prevUiCategory}::${prevUiSubJump}`,
    `${uiCategory}::${uiSubJump}`,
    FLAT_UI_ORDER
  );

  // Sync focus trigger from top Header search icon
  useEffect(() => {
    if (uiSearchFocusSeq > 0) {
      searchInputRef.current?.focus();
      setSearchDropdownOpen(true);
    }
  }, [uiSearchFocusSeq]);

  // Preload adjacent UI KIT chunks immediately + remaining chunks during browser idle
  useEffect(() => {
    preloadAdjacentCategories(uiCategory);
    scheduleIdleUiKitPreload();
  }, [uiCategory]);

  // Smoothly scroll to targeted section when triggered from Header/Mobile search or updates
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (uiTargetSectionId) {
        const el = document.getElementById(uiTargetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        clearUiTargetSection();
      } else {
        canvasTopRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
    return () => window.clearTimeout(id);
  }, [uiCategory, uiSubJump, uiTargetSectionId, clearUiTargetSection]);

  // Keyboard shortcut: '/' focuses search, 'Escape' closes dropdown
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'SELECT'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchDropdownOpen(true);
      } else if (e.key === 'Escape') {
        setSearchDropdownOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Brief shimmer skeleton feedback while typing a search query
  useEffect(() => {
    if (!normalizedQuery) {
      setIsSearchLoading(false);
      return;
    }
    setIsSearchLoading(true);
    const timer = window.setTimeout(() => {
      setIsSearchLoading(false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [normalizedQuery]);

  // Keep recent searches synced when dropdown opens (e.g. if updated from mobile sheet)
  useEffect(() => {
    if (searchDropdownOpen) {
      setRecentSearches(loadRecentSearches());
    }
  }, [searchDropdownOpen]);

  useLayoutEffect(() => {
    const updateSidebarIndicator = () => {
      const listEl = sidebarListRef.current;
      const activeEl = activeSidebarBtnRef.current;
      if (!listEl || !activeEl || listEl.offsetParent === null) {
        setSidebarIndicator((prev) => (prev.ready ? { ...prev, ready: false } : prev));
        return;
      }
      const listRect = listEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      if (activeRect.height === 0) return;
      setSidebarIndicator({
        top: activeRect.top - listRect.top,
        height: activeRect.height,
        ready: true,
      });
    };

    updateSidebarIndicator();
    const listEl = sidebarListRef.current;
    if (!listEl || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(updateSidebarIndicator);
    ro.observe(listEl);
    return () => ro.disconnect();
  }, [uiCategory, uiSubJump, normalizedQuery, mobileTocOpen]);

  // When search is empty, list the active category cleanly (categories live in main Sidebar);
  // when searching, search across all 12 categories.
  const filteredCatalog = useMemo(() => {
    if (!normalizedQuery) {
      const currentGroup = UI_KIT_CATALOG.find((g) => g.id === uiCategory) || UI_KIT_CATALOG[0];
      return [
        {
          ...currentGroup,
          matchedItems: currentGroup.items.map((item) => ({
            item,
            matchedSections: [] as UiKitSubSection[],
          })),
        },
      ];
    }

    return UI_KIT_CATALOG.map((group) => {
      const groupMatches =
        group.categoryTitle.toLowerCase().includes(normalizedQuery) ||
        group.label.toLowerCase().includes(normalizedQuery);

      const matchedItems = group.items
        .map((item) => {
          const itemNameMatch = item.label.toLowerCase().includes(normalizedQuery);
          const keywordMatch = item.keywords?.some((kw) =>
            kw.toLowerCase().includes(normalizedQuery)
          );
          const matchedSections = (item.sections ?? []).filter((sec) =>
            sec.title.toLowerCase().includes(normalizedQuery)
          );

          if (groupMatches || itemNameMatch || keywordMatch || matchedSections.length > 0) {
            return { item, matchedSections };
          }
          return null;
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

      return { ...group, matchedItems };
    }).filter((g) => g.matchedItems.length > 0);
  }, [normalizedQuery, uiCategory]);

  const quickSearchResults = useMemo<SearchResultEntry[]>(() => {
    if (!normalizedQuery) return [];

    const results: SearchResultEntry[] = [];
    UI_KIT_CATALOG.forEach((group) => {
      group.items.forEach((item) => {
        const labelLower = item.label.toLowerCase();
        const kwMatch = item.keywords?.some((k) => k.toLowerCase().includes(normalizedQuery));
        const exactItem = labelLower === normalizedQuery;
        const prefixItem = labelLower.startsWith(normalizedQuery);
        const containsItem = labelLower.includes(normalizedQuery);

        if (exactItem || prefixItem || containsItem || kwMatch) {
          results.push({
            key: `${group.id}::${item.label}`,
            groupId: group.id,
            groupLabel: group.label,
            itemLabel: item.label,
            score: exactItem ? 100 : prefixItem ? 85 : containsItem ? 70 : 50,
          });
        }

        (item.sections ?? []).forEach((sec) => {
          const secLower = sec.title.toLowerCase();
          if (secLower.includes(normalizedQuery)) {
            results.push({
              key: `${group.id}::${item.label}::${sec.id}`,
              groupId: group.id,
              groupLabel: group.label,
              itemLabel: item.label,
              section: sec,
              score: secLower === normalizedQuery ? 98 : secLower.startsWith(normalizedQuery) ? 80 : 65,
            });
          }
        });
      });
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 14);
  }, [normalizedQuery]);

  const handleSelectMultimediaNode = (
    groupId: string,
    subLabel: string,
    targetSectionId?: string,
    recordQuery?: { query: string; groupLabel?: string; sectionTitle?: string }
  ) => {
    if (recordQuery?.query) {
      setRecentSearches(
        saveRecentSearch({
          query: recordQuery.query,
          groupId,
          groupLabel: recordQuery.groupLabel,
          itemLabel: subLabel,
          sectionId: targetSectionId,
          sectionTitle: recordQuery.sectionTitle,
        })
      );
    }
    selectUiNode(groupId, subLabel, targetSectionId);
    setSearchDropdownOpen(false);
  };

  const handleStep = (delta: -1 | 1) => {
    const nextIdx = currentIdx + delta;
    if (nextIdx >= 0 && nextIdx < flatItems.length) {
      const target = flatItems[nextIdx];
      handleSelectMultimediaNode(target.groupId, target.sub);
    }
  };

  const handleExportUiKitPdf = () => {
    triggerToast('Mencetak Komponen', `Menyiapkan cetak PDF untuk komponen ${uiSubJump}...`, 'info');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const activeGroup = UI_KIT_CATALOG.find((g) => g.id === uiCategory) || UI_KIT_CATALOG[0];

  return (
    <div className="ui-kit-root flex-1 min-h-0 flex flex-col overflow-y-auto md:overflow-hidden p-5 sm:p-7 gap-5 bg-white dark:bg-[#121418] transition-colors duration-200">
      {/* Header Bar with Integrated UI Element Search */}
      <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-white/[0.08]">
        <div className="hidden md:block">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#ee2e65] mb-0.5">
            {activeGroup.categoryTitle}
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#F3F4F6]">
            {activeGroup.label}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 no-print">
          {/* Quick Search Bar with Live Dropdown */}
          <div ref={searchWrapperRef} className="relative w-full sm:w-72 lg:w-80">
            {isSearchLoading ? (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <UiLoader
                  variant="spinner-arc"
                  size="sm"
                  color="#ee2e65"
                  trackColor="#FDE0E9"
                  label="Mencari"
                />
              </span>
            ) : (
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
            <input
              ref={searchInputRef}
              type="text"
              enterKeyHint="search"
              value={searchQuery}
              onFocus={() => setSearchDropdownOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchDropdownOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && quickSearchResults.length > 0 && !isSearchLoading) {
                  e.preventDefault();
                  const top = quickSearchResults[0];
                  handleSelectMultimediaNode(top.groupId, top.itemLabel, top.section?.id, {
                    query: searchQuery.trim() || (top.section ? top.section.title : top.itemLabel),
                    groupLabel: top.groupLabel,
                    sectionTitle: top.section?.title,
                  });
                }
              }}
              placeholder="Cari elemen UI..."
              aria-label="Cari elemen UI Design System"
              className="w-full pl-9 pr-12 py-2 text-base sm:text-sm bg-gray-50/70 dark:bg-[#181B21] border border-gray-300 dark:border-white/[0.12] rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#1B1E24] focus:border-primary-500 transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.08] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#121418] border border-gray-300 dark:border-white/[0.12] rounded absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                /
              </kbd>
            )}

            {/* Quick-Jump Search Results, Recent Search & Suggestion Search Popover */}
            {searchDropdownOpen && (
              <div className="animate-ui-pop absolute left-0 right-0 top-full mt-1.5 bg-white/95 dark:bg-[#15181E]/95 backdrop-blur-sm border border-gray-300 dark:border-white/[0.12] rounded-xl shadow-[0_16px_36px_-10px_rgba(15,23,42,0.16)] dark:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.72)] z-40 overflow-hidden max-h-96 overflow-y-auto custom-sidebar-scrollbar">
                {!normalizedQuery ? (
                  <div className="p-2.5 space-y-3">
                    {/* Recent Searches */}
                    <div className="space-y-1.5">
                      <div className="px-1.5 flex items-center justify-between text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>Pencarian Terakhir</span>
                        </span>
                        {recentSearches.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setRecentSearches(clearRecentSearches())}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-[#ee2e65] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                            <span>Hapus</span>
                          </button>
                        )}
                      </div>

                      {recentSearches.length === 0 ? (
                        <div className="px-2.5 py-2 rounded-lg bg-gray-50/80 dark:bg-[#1B1E24] border border-dashed border-gray-200 dark:border-white/[0.10] text-[11px] text-gray-500 dark:text-gray-400">
                          Belum ada riwayat pencarian. Pilih saran di bawah atau ketik nama komponen.
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {recentSearches.map((rec) => (
                            <div
                              key={rec.id}
                              className="group flex items-center justify-between gap-1.5 rounded-lg hover:bg-primary-50/60 dark:hover:bg-[#1B1E24] transition-colors pr-1.5"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  if (rec.groupId && rec.itemLabel) {
                                    handleSelectMultimediaNode(
                                      rec.groupId,
                                      rec.itemLabel,
                                      rec.sectionId,
                                      {
                                        query: rec.query,
                                        groupLabel: rec.groupLabel,
                                        sectionTitle: rec.sectionTitle,
                                      }
                                    );
                                  } else {
                                    setSearchQuery(rec.query);
                                  }
                                }}
                                className="flex-1 min-w-0 px-2.5 py-1.5 text-left flex items-center gap-2 cursor-pointer"
                              >
                                <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ee2e65] shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-medium text-gray-800 dark:text-gray-100 truncate">
                                    {rec.query}
                                  </div>
                                  {(rec.groupLabel || rec.itemLabel) && (
                                    <div className="text-[10.5px] text-gray-500 dark:text-gray-400 truncate">
                                      {[rec.groupLabel, rec.itemLabel, rec.sectionTitle]
                                        .filter(Boolean)
                                        .join(' / ')}
                                    </div>
                                  )}
                                </div>
                              </button>
                              <button
                                type="button"
                                aria-label={`Hapus riwayat ${rec.query}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecentSearches(removeRecentSearch(rec.id));
                                }}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.08] cursor-pointer shrink-0"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suggestion Searches */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-200/80 dark:border-white/[0.08]">
                      <div className="px-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        <Sparkles className="w-3 h-3 text-[#ee2e65]" />
                        <span>Saran Pencarian</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-1">
                        {UI_SUGGESTION_SEARCHES.map((sug) => (
                          <button
                            key={sug.id}
                            type="button"
                            onClick={() =>
                              handleSelectMultimediaNode(
                                sug.groupId,
                                sug.itemLabel,
                                sug.sectionId,
                                {
                                  query: sug.label,
                                  groupLabel: sug.hint.split(' · ')[0],
                                }
                              )
                            }
                            title={sug.hint}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/[0.10] bg-gray-50/80 dark:bg-[#1B1E24] hover:bg-[#FEF1F5] dark:hover:bg-[#ee2e65]/15 hover:border-[#FBC2D4] dark:hover:border-[#ee2e65]/40 hover:text-[#9D113C] dark:hover:text-[#fbc2d4] text-[11.5px] font-medium text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                          >
                            <span>{sug.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : isSearchLoading ? (
                  <UiSkeletonSearchPanel mode="results" rows={4} />
                ) : quickSearchResults.length === 0 ? (
                  <div className="p-3.5 space-y-3">
                    <div className="text-center space-y-1">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        Elemen &ldquo;{searchQuery}&rdquo; tidak ditemukan.
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        Coba salah satu saran populer di bawah ini:
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {UI_SUGGESTION_SEARCHES.slice(0, 4).map((sug) => (
                        <button
                          key={sug.id}
                          type="button"
                          onClick={() => setSearchQuery(sug.query)}
                          className="px-2.5 py-1 rounded-full border border-[#FBC2D4] dark:border-[#ee2e65]/35 bg-[#FEF1F5] dark:bg-[#ee2e65]/15 text-[11px] font-medium text-[#9D113C] dark:text-[#fbc2d4] hover:brightness-95 cursor-pointer"
                        >
                          {sug.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-1.5 divide-y divide-gray-200 dark:divide-white/[0.08] animate-ui-fade">
                    <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-medium bg-gray-50/70 dark:bg-[#1B1E24]">
                      <span>{quickSearchResults.length} hasil cocok</span>
                      <span className="inline-flex items-center gap-1">
                        <CornerDownLeft className="w-3 h-3" /> Enter untuk buka
                      </span>
                    </div>
                    {quickSearchResults.map((res, idx) => (
                      <button
                        key={res.key}
                        type="button"
                        onClick={() =>
                          handleSelectMultimediaNode(res.groupId, res.itemLabel, res.section?.id, {
                            query: searchQuery.trim() || (res.section ? res.section.title : res.itemLabel),
                            groupLabel: res.groupLabel,
                            sectionTitle: res.section?.title,
                          })
                        }
                        className={`w-full px-3.5 py-2 text-left flex items-center justify-between gap-2 hover:bg-primary-50/60 dark:hover:bg-[#1B1E24] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                          idx === 0 ? 'bg-gray-50/50 dark:bg-[#181B21]' : ''
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {res.section ? res.section.title : res.itemLabel}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {res.groupLabel} / {res.itemLabel}
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-primary-600 dark:text-[#f45d8e] shrink-0">
                          {res.section ? 'Bagian' : 'Komponen'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleExportUiKitPdf}
            className="touch-target-44 group self-end sm:self-auto flex items-center justify-center gap-1.5 sm:gap-2 bg-[#ee2e65] hover:bg-[#d82256] text-white text-sm font-medium px-3.5 sm:px-4 h-9 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5" />
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile-only TOC Toggle Button */}
      <div className="md:hidden shrink-0 no-print">
        <button
          type="button"
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          className="touch-target-44 w-full flex items-center justify-between px-4 py-2.5 bg-white dark:bg-[#15181E] rounded-lg border border-gray-300 dark:border-white/[0.12] text-sm font-medium text-gray-800 dark:text-gray-100 cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2 min-w-0">
            <ListFilter className="w-4 h-4 text-[#ee2e65] shrink-0" />
            <span className="truncate">{activeGroup.label} · {uiSubJump}</span>
          </div>
          <span className="text-xs font-semibold text-[#9D113C] dark:text-[#fbc2d4] bg-[#FEF1F5] dark:bg-[#ee2e65]/15 px-2 py-0.5 rounded-md shrink-0">
            {mobileTocOpen ? 'Tutup' : 'Pilih'}
          </span>
        </button>
      </div>

      {/* 2-Column Layout: Active Category Directory on Left + Animated Showcase Canvas on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-0 items-stretch">
        {/* Left Directory Sidebar */}
        <div
          ref={sidebarScrollRef}
          className={`${
            mobileTocOpen ? 'block animate-ui-slide-down' : 'hidden md:block'
          } md:col-span-4 lg:col-span-3 xl:col-span-3 bg-white dark:bg-[#15181E] rounded-xl p-4 border border-gray-300/90 dark:border-white/[0.08] md:h-full max-h-[65vh] md:max-h-none overflow-y-auto custom-sidebar-scrollbar no-print`}
        >
          {normalizedQuery && (
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-gray-200 dark:border-white/[0.08]">
              <span className="text-xs font-medium text-gray-500">Hasil Filter</span>
              <span className="text-[11px] font-semibold text-[#ee2e65] tabular-nums">
                {filteredCatalog.reduce((acc, g) => acc + g.matchedItems.length, 0)} cocok
              </span>
            </div>
          )}

          {filteredCatalog.length === 0 ? (
            <div className="py-8 text-center space-y-2.5">
              <p className="text-xs text-gray-500">
                Tidak ada komponen yang cocok dengan &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 text-xs font-medium text-gray-700 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:hidden shrink-0" />
                <span className="sm:hidden">Reset</span>
                <span className="hidden sm:inline">Reset Pencarian</span>
              </button>
            </div>
          ) : (
            <div ref={sidebarListRef} className="relative space-y-5">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 right-0 top-0 rounded-lg bg-[#FEF1F5]/90 dark:bg-[#ee2e65]/15 shadow-[inset_2px_0_0_#ee2e65] transition-[transform,height,opacity] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  sidebarIndicator.ready ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  height: `${sidebarIndicator.height}px`,
                  transform: `translate3d(0, ${sidebarIndicator.top}px, 0)`,
                }}
              />
              {filteredCatalog.map((group) => {
                const isGroupActive = uiCategory === group.id;
                return (
                  <div key={group.id} className="relative z-10 space-y-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectMultimediaNode(group.id, group.matchedItems[0].item.label)
                      }
                      className="w-full flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] text-left cursor-pointer select-none"
                    >
                      <span className={`transition-colors duration-200 ${isGroupActive ? 'text-[#ee2e65]' : ''}`}>
                        {group.categoryTitle}
                      </span>
                      <span className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                        {group.matchedItems.length}
                      </span>
                    </button>

                    <div className="flex flex-col space-y-0.5">
                      {group.matchedItems.map(({ item, matchedSections }) => {
                        const isSubActive = uiSubJump === item.label && uiCategory === group.id;
                        return (
                          <div key={item.label} className="space-y-0.5">
                            <button
                              ref={isSubActive ? activeSidebarBtnRef : undefined}
                              type="button"
                              onClick={() => {
                                handleSelectMultimediaNode(
                                  group.id,
                                  item.label,
                                  matchedSections[0]?.id
                                );
                                if (window.innerWidth < 768) {
                                  setMobileTocOpen(false);
                                }
                              }}
                              className={`w-full text-left text-[13px] leading-relaxed font-semibold transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer py-1.5 px-2.5 rounded-lg flex items-center justify-between ${
                                isSubActive
                                  ? `text-[#9D113C] dark:text-[#fbc2d4] ${
                                      sidebarIndicator.ready
                                        ? ''
                                        : 'bg-[#FEF1F5]/90 dark:bg-[#ee2e65]/15 shadow-[inset_2px_0_0_#ee2e65]'
                                    }`
                                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-[#1B1E24]'
                              }`}
                            >
                              <span>{item.label}</span>
                            </button>

                            {normalizedQuery && matchedSections.length > 0 && (
                              <div className="pl-3 flex flex-col space-y-0.5 border-l border-[#FBC2D4] dark:border-[#ee2e65]/40 ml-2.5 animate-ui-slide-down">
                                {matchedSections.map((sec) => (
                                  <button
                                    key={sec.id}
                                    type="button"
                                    onClick={() => {
                                      handleSelectMultimediaNode(group.id, item.label, sec.id);
                                      if (window.innerWidth < 768) {
                                        setMobileTocOpen(false);
                                      }
                                    }}
                                    className="text-left text-xs text-gray-500 dark:text-gray-400 hover:text-[#ee2e65] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] py-0.5 px-1.5 rounded hover:bg-[#FEF1F5]/60 dark:hover:bg-[#1B1E24] cursor-pointer truncate"
                                  >
                                    {sec.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Showcase Canvas with Responsive PageTransition Motion */}
        <div
          ref={canvasTopRef}
          className="md:col-span-8 lg:col-span-9 xl:col-span-9 md:h-full md:overflow-y-auto custom-sidebar-scrollbar md:pr-2 space-y-5 min-w-0 pb-[calc(1.75rem+env(safe-area-inset-bottom,0px))] md:pb-4"
        >
          {/* Minimalist Unboxed Breadcrumb & Prev/Next Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-200 dark:border-white/[0.08] no-print">
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span>{activeGroup.label}</span>
              <span className="text-gray-500 dark:text-gray-500">/</span>
              <span className="text-gray-900 dark:text-[#F3F4F6] font-semibold">{uiSubJump}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                disabled={currentIdx <= 0}
                onClick={() => handleStep(-1)}
                className="group px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/[0.12] bg-white dark:bg-[#181B21] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1B1E24] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer font-medium transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap"
              >
                <ChevronLeft className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5" />
                <span className="sm:hidden">Prev</span>
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
              <button
                type="button"
                disabled={currentIdx >= flatItems.length - 1}
                onClick={() => handleStep(1)}
                className="group px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/[0.12] bg-white dark:bg-[#181B21] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1B1E24] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer font-medium transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap"
              >
                <span className="sm:hidden">Next</span>
                <span className="hidden sm:inline">Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Render active category + item inside directional PageTransition with layout-matched skeleton fallback */}
          <PageTransition
            transitionKey={`${uiCategory}-${uiSubJump}`}
            directionOverride={itemDirection}
            scrollResetOnChange={false}
          >
            <Suspense fallback={<UiKitCategorySkeleton />}>
              {uiCategory === 'utilities' && <LazyUtilitiesUiKit activeSubJump={uiSubJump} />}
              {uiCategory === 'datadisplay' && <LazyDataDisplayUiKit activeSubJump={uiSubJump} />}
              {uiCategory === 'dataentry' && <LazyDataEntryUiKit activeSubJump={uiSubJump} />}
              {uiCategory === 'feedback' && <LazyFeedbackUiKit activeSubJump={uiSubJump} />}
              {uiCategory === 'tables' && <LazyTableUiKit activeSubJump={uiSubJump} />}
              {['charts', 'maps', 'navigation', 'behavioral', 'layout'].includes(uiCategory) && (
                <LazyOtherMultimediaUiKit activeSubJump={uiSubJump} category={uiCategory as any} />
              )}
              {uiCategory === 'authstate' && <LazyAuthStateUiKit activeSubJump={uiSubJump} />}
              {uiCategory === 'mobilekit' && <LazyMobileUiKit activeSubJump={uiSubJump} />}
            </Suspense>
          </PageTransition>
        </div>
      </div>
    </div>
  );
};

