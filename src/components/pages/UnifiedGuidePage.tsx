import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  FileCheck,
  Flame,
  Plus,
  Scale,
  Search,
  Users,
} from 'lucide-react';
import { useApp, PanduanSubtabId } from '../../context/AppContext';
import { SOP_SECTIONS_META } from '../../data/multimediaPlatformData';
import { MinistryRoleItem, RuleItem, SopModuleItem } from '../../types';
import { ACTION_BTN_PRIMARY } from '../../constants/buttonStyles';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { CrudRowActions, SectionAddButton } from '../multimedia/CrudRowActions';
import { PageAttachmentsBar } from '../multimedia/PageAttachmentsBar';
import { getBadgeToneClass } from '../multimedia/toneClasses';

function isValueCategory(category: string): boolean {
  const c = category.toLowerCase();
  return c.includes('value') || c.includes('komitmen') || c.includes('nilai');
}

export const UnifiedGuidePage: React.FC = () => {
  const {
    panduanSubtab,
    setPanduanSubtab,
    setActivePage,
    setGms2Subtab,
    bukuSakuValuesList,
    rulesList,
    crewChiefTimelineList,
    sopV5List,
    ministryRolesList,
    leaderDivisionsList,
    openRuleModal,
    openSopModal,
    openMinistryRoleModal,
    openCrudCreate,
    openCrudEdit,
    requestDeleteItem,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [ruleCategoryFilter, setRuleCategoryFilter] = useState('all');
  const [sopSectionFilter, setSopSectionFilter] = useState('all');
  const [roleGroupFilter, setRoleGroupFilter] = useState('all');

  const q = searchQuery.trim().toLowerCase();

  // Split rulesList cleanly: Value & Komitmen -> Tab 1; Disciplinary / Tata Tertib / Sanksi / Komunikasi -> Tab 2
  const valueRules = useMemo(
    () => rulesList.filter((r) => isValueCategory(r.category)),
    [rulesList]
  );

  const disciplinaryRules = useMemo(
    () => rulesList.filter((r) => !isValueCategory(r.category)),
    [rulesList]
  );

  // Tab 1 (Value & Komitmen) filtered datasets
  const filteredValues = useMemo(() => {
    if (!q) return bukuSakuValuesList;
    return bukuSakuValuesList.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q) ||
        v.num.toLowerCase().includes(q)
    );
  }, [bukuSakuValuesList, q]);

  const filteredValueRules = useMemo(() => {
    if (!q) return valueRules;
    return valueRules.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    );
  }, [valueRules, q]);

  // Tab 2 (Rules & Kedisiplinan) categories & grouped rows
  const ruleCategories = useMemo(() => {
    const uniq = Array.from(new Set(disciplinaryRules.map((r) => r.category)));
    return ['all', ...uniq];
  }, [disciplinaryRules]);

  const groupedDisciplinaryRules = useMemo(() => {
    const activeCat = ruleCategories.includes(ruleCategoryFilter) ? ruleCategoryFilter : 'all';
    const filtered = disciplinaryRules.filter((r) => {
      const catOk = activeCat === 'all' || r.category === activeCat;
      const textOk =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q);
      return catOk && textOk;
    });
    return filtered.reduce<Record<string, RuleItem[]>>((acc, r) => {
      if (!acc[r.category]) acc[r.category] = [];
      acc[r.category].push(r);
      return acc;
    }, {});
  }, [disciplinaryRules, q, ruleCategories, ruleCategoryFilter]);

  // Tab 3 (SOP Operasional) sections, Crew Chief timeline & grouped Manual SOP V5
  const sopSectionTabs = useMemo(() => {
    const knownIds = new Set(SOP_SECTIONS_META.map((s) => s.id));
    const extras: Array<{ id: string; label: string }> = [];
    sopV5List.forEach((m) => {
      if (!knownIds.has(m.section)) {
        knownIds.add(m.section);
        extras.push({ id: m.section, label: `${m.section}. Tambahan Tim` });
      }
    });
    return [...SOP_SECTIONS_META, ...extras];
  }, [sopV5List]);

  const filteredCrewChief = useMemo(() => {
    if (sopSectionFilter !== 'all' && sopSectionFilter !== 'crewchief') return [];
    if (!q) return crewChiefTimelineList;
    return crewChiefTimelineList.filter(
      (t) =>
        t.time.toLowerCase().includes(q) ||
        t.phase.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
    );
  }, [crewChiefTimelineList, q, sopSectionFilter]);

  const groupedSop = useMemo(() => {
    if (sopSectionFilter === 'crewchief') return {};
    const filtered = sopV5List.filter((m) => {
      const secOk = sopSectionFilter === 'all' || m.section === sopSectionFilter;
      const textOk =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q) ||
        m.sectionTitle.toLowerCase().includes(q);
      return secOk && textOk;
    });
    return filtered.reduce<Record<string, SopModuleItem[]>>((acc, item) => {
      if (!acc[item.sectionTitle]) acc[item.sectionTitle] = [];
      acc[item.sectionTitle].push(item);
      return acc;
    }, {});
  }, [q, sopSectionFilter, sopV5List]);

  // Tab 4 (Peran & Struktur Tim) groups, roles & Team Leader divisions
  const roleGroups = useMemo(() => {
    const uniq = Array.from(new Set(ministryRolesList.map((r) => r.group)));
    return ['all', ...uniq];
  }, [ministryRolesList]);

  const groupedRoles = useMemo(() => {
    const activeGrp = roleGroups.includes(roleGroupFilter) ? roleGroupFilter : 'all';
    const filtered = ministryRolesList.filter((r) => {
      const grpOk = activeGrp === 'all' || r.group === activeGrp;
      const textOk =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.duties.toLowerCase().includes(q) ||
        r.req.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q);
      return grpOk && textOk;
    });
    return filtered.reduce<Record<string, MinistryRoleItem[]>>((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [ministryRolesList, q, roleGroupFilter, roleGroups]);

  const filteredLeaderDivisions = useMemo(() => {
    if (!q) return leaderDivisionsList;
    return leaderDivisionsList.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.scope.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q)
    );
  }, [leaderDivisionsList, q]);

  const categoryCards: Array<{
    id: PanduanSubtabId;
    title: string;
    metric: string;
    caption: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'value',
      title: 'Value & Komitmen',
      metric: `${bukuSakuValuesList.length} Nilai · ${valueRules.length} Komitmen`,
      caption: 'Nilai dasar, syarat & komitmen pelayan',
      icon: Flame,
    },
    {
      id: 'rules',
      title: 'Rules & Kedisiplinan',
      metric: `${disciplinaryRules.length} Aturan & Etika`,
      caption: 'Call time, grooming, MCR, sanksi & teguran',
      icon: Scale,
    },
    {
      id: 'sop',
      title: 'SOP Operasional',
      metric: `${crewChiefTimelineList.length} Fase PIC · ${sopV5List.length} Modul`,
      caption: 'Alur Crew Chief H-60 & Manual SOP V5',
      icon: FileCheck,
    },
    {
      id: 'peran',
      title: 'Peran & Struktur Tim',
      metric: `${ministryRolesList.length} Bidang · ${leaderDivisionsList.length} Divisi`,
      caption: 'Bidang Team Ministry & Team Leader',
      icon: Users,
    },
  ];

  const subtabs: Array<{
    id: PanduanSubtabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'value', label: 'Value & Komitmen', icon: Flame },
    { id: 'rules', label: 'Rules & Kedisiplinan', icon: Scale },
    { id: 'sop', label: 'SOP Operasional', icon: FileCheck },
    { id: 'peran', label: 'Peran & Struktur Tim', icon: Users },
  ];

  const searchPlaceholder: Record<PanduanSubtabId, string> = {
    value: 'Cari nilai dasar, komitmen, syarat pelayanan...',
    rules: 'Cari call time, seragam, tata tertib MCR, sanksi...',
    sop: 'Cari SOP Crew Chief, VD, TD, Kamera, Rigging...',
    peran: 'Cari bidang peran ministry, kualifikasi, divisi...',
  };

  const primaryCtaConfig: Record<
    PanduanSubtabId,
    { label: string; shortLabel: string; onClick: () => void }
  > = {
    value: {
      label: 'Tambah Nilai',
      shortLabel: 'Nilai',
      onClick: () => openCrudCreate('bsValue'),
    },
    rules: {
      label: 'Tambah Aturan',
      shortLabel: 'Aturan',
      onClick: () =>
        openCrudCreate('rule', {
          category: 'Kedisiplinan & Penampilan',
          type: 'ATURAN',
        }),
    },
    sop: {
      label: 'Tambah SOP',
      shortLabel: 'SOP',
      onClick: () => openCrudCreate('sop'),
    },
    peran: {
      label: 'Tambah Peran',
      shortLabel: 'Peran',
      onClick: () => openCrudCreate('ministryRole'),
    },
  };

  const activeCta = primaryCtaConfig[panduanSubtab];

  return (
    <div className="px-2.5 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 w-full space-y-5 ui-stagger">
      <PageAttachmentsBar page="panduan" />

      {/* Unified Overview Banner & 4 Category Cards */}
      <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-[24px] p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#ee2e65] dark:text-[#f895b5]">
              Pusat Standar Terpadu · Tanpa Duplikasi
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#1C1D21] dark:text-white tracking-tight">
              Panduan, SOP &amp; Rules Departemen Multimedia
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Konsolidasi Buku Saku Ministry, Manual SOP V5, dan Rules &amp; Kedisiplinan yang
              dikelompokkan rapi sesuai kategori: Value dengan Value, Rules dengan Rules, SOP
              dengan SOP, dan Peran dengan Peran.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setGms2Subtab('wipr');
              setActivePage('gms2');
            }}
            className="inline-flex items-center gap-1.5 self-start sm:self-center px-3.5 py-2 rounded-full bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.10] dark:border-white/[0.10] hover:border-[#ee2e65] text-xs font-semibold text-[#1C1D21] dark:text-gray-200 hover:text-[#ee2e65] dark:hover:text-[#f895b5] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-[#ee2e65]" />
            <span>Base Platform WI / PR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {categoryCards.map((card) => {
            const Icon = card.icon;
            const isActive = panduanSubtab === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setPanduanSubtab(card.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FEF1F5]/75 dark:bg-[#ee2e65]/15 border-[#ee2e65] shadow-2xs'
                    : 'bg-[#F9FAFC] dark:bg-[#1B1E24] border-black/[0.08] dark:border-white/[0.08] hover:border-[#ee2e65]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider truncate ${
                      isActive
                        ? 'text-[#9D113C] dark:text-[#f895b5]'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {card.title}
                  </span>
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#ee2e65]' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </div>
                <div className="text-sm sm:text-[15px] font-bold text-[#1C1D21] dark:text-white tabular-nums truncate">
                  {card.metric}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {card.caption}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Navigation Tabs + Search + Context-Aware CTA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 bg-[#F4F5F8] dark:bg-[#1B1E24] p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
          <HorizontalSlideTrack
            activeKey={panduanSubtab}
            accent="primary"
            visibility="auto"
            showControls
            fadeEdges
            trackClassName="flex items-center gap-1"
          >
            {subtabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = panduanSubtab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-slide-active={isActive ? 'true' : undefined}
                  onClick={() => setPanduanSubtab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ee2e65] text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </HorizontalSlideTrack>
        </div>

        <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0">
          <div className="relative flex-1 lg:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder[panduanSubtab]}
              className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-xs text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
            />
          </div>
          <button
            type="button"
            onClick={activeCta.onClick}
            className={ACTION_BTN_PRIMARY}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{activeCta.label}</span>
            <span className="sm:hidden">{activeCta.shortLabel}</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: VALUE & KOMITMEN                                           */}
      {/* ================================================================= */}
      {panduanSubtab === 'value' && (
        <div className="space-y-5 ui-stagger">
          {/* Table 1: 5 Nilai Dasar Pelayan Multimedia */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  {bukuSakuValuesList.length} Nilai Dasar Pelayan Multimedia Ministry
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredValues.length} Nilai
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('bsValue')}
                />
              </div>
            </div>

            {filteredValues.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400">
                Tidak ada nilai dasar yang cocok dengan pencarian Anda.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] table-fixed text-left border-collapse">
                  <colgroup>
                    <col className="w-[64px]" />
                    <col className="w-[220px]" />
                    <col />
                    <col className="w-[104px]" />
                  </colgroup>
                  <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-4">No</th>
                      <th className="py-3 px-4">Nilai Dasar</th>
                      <th className="py-3 px-4">Makna &amp; Sikap Pelayanan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                    {filteredValues.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] tabular-nums align-middle">
                          {row.num}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white break-words align-middle">
                          {row.name}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                          {row.desc}
                        </td>
                        <td className="py-3.5 px-4 text-right align-middle">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('bsValue', row.id)}
                            onDelete={() => requestDeleteItem('bsValue', row.id, row.name)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Table 2: Komitmen & Persyaratan Pelayan */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Komitmen &amp; Persyaratan Pelayan
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredValueRules.length} Dokumen
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() =>
                    openCrudCreate('rule', {
                      category: 'Value & Komitmen',
                      type: 'KOMITMEN',
                    })
                  }
                />
              </div>
            </div>

            {filteredValueRules.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400">
                Tidak ada dokumen komitmen yang cocok dengan pencarian Anda.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] table-fixed text-left border-collapse">
                  <colgroup>
                    <col className="w-[64px]" />
                    <col className="w-[30%]" />
                    <col className="w-[132px]" />
                    <col />
                    <col className="w-[172px]" />
                  </colgroup>
                  <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-4">No</th>
                      <th className="py-3 px-4">Judul Komitmen / Syarat</th>
                      <th className="py-3 px-4">Tipe</th>
                      <th className="py-3 px-4">Ringkasan Standar</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                    {filteredValueRules.map((r, idx) => (
                      <tr
                        key={r.id}
                        onClick={() => openRuleModal(r.id)}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums align-middle">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                          {r.title}
                        </td>
                        <td className="py-3.5 px-4 align-middle">
                          <span
                            className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              r.tone
                            )}`}
                          >
                            {r.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                          {r.summary}
                        </td>
                        <td className="py-3.5 px-4 text-right align-middle">
                          <CrudRowActions
                            detailLabel="Baca"
                            onDetail={() => openRuleModal(r.id)}
                            onEdit={() => openCrudEdit('rule', r.id)}
                            onDelete={() => requestDeleteItem('rule', r.id, r.title)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: RULES & KEDISIPLINAN                                       */}
      {/* ================================================================= */}
      {panduanSubtab === 'rules' && (
        <div className="space-y-5 ui-stagger">
          <div className="flex flex-wrap items-center gap-2">
            {ruleCategories.map((cat) => {
              const isActive =
                (ruleCategories.includes(ruleCategoryFilter) ? ruleCategoryFilter : 'all') === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setRuleCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#ee2e65] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-gray-600 dark:text-gray-300 hover:border-[#ee2e65]'
                  }`}
                >
                  {cat === 'all' ? 'Semua Kategori Rules' : cat}
                </button>
              );
            })}
          </div>

          {Object.keys(groupedDisciplinaryRules).length === 0 ? (
            <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-10 text-center space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ada aturan yang cocok dengan filter pencarian.
              </p>
              <button
                type="button"
                onClick={() =>
                  openCrudCreate('rule', {
                    category: 'Kedisiplinan & Penampilan',
                    type: 'ATURAN',
                  })
                }
                className={ACTION_BTN_PRIMARY}
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>Tambah Aturan</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5 ui-stagger">
              {Object.entries(groupedDisciplinaryRules).map(([categoryName, items]) => (
                <div
                  key={categoryName}
                  className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs"
                >
                  <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                        {categoryName}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                        {items.length} Dokumen
                      </span>
                      <SectionAddButton
                        label="Tambah"
                        onClick={() => openCrudCreate('rule', { category: categoryName })}
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[920px] table-fixed text-left border-collapse">
                      <colgroup>
                        <col className="w-[64px]" />
                        <col className="w-[30%]" />
                        <col className="w-[132px]" />
                        <col />
                        <col className="w-[172px]" />
                      </colgroup>
                      <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <tr>
                          <th className="py-3 px-4">No</th>
                          <th className="py-3 px-4">Judul Aturan / Etika</th>
                          <th className="py-3 px-4">Tipe</th>
                          <th className="py-3 px-4">Ringkasan Standar</th>
                          <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                        {items.map((r, idx) => (
                          <tr
                            key={r.id}
                            onClick={() => openRuleModal(r.id)}
                            className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                          >
                            <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums align-middle">
                              {String(idx + 1).padStart(2, '0')}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                              {r.title}
                            </td>
                            <td className="py-3.5 px-4 align-middle">
                              <span
                                className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                                  r.tone
                                )}`}
                              >
                                {r.type}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                              {r.summary}
                            </td>
                            <td className="py-3.5 px-4 text-right align-middle">
                              <CrudRowActions
                                detailLabel="Baca"
                                onDetail={() => openRuleModal(r.id)}
                                onEdit={() => openCrudEdit('rule', r.id)}
                                onDelete={() => requestDeleteItem('rule', r.id, r.title)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 3: SOP OPERASIONAL (CREW CHIEF + MANUAL SOP V5)               */}
      {/* ================================================================= */}
      {panduanSubtab === 'sop' && (
        <div className="space-y-5 ui-stagger">
          <div className="bg-[#F4F5F8] dark:bg-[#1B1E24] p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
            <HorizontalSlideTrack
              activeKey={sopSectionFilter}
              accent="primary"
              visibility="auto"
              showControls
              fadeEdges
              trackClassName="flex items-center gap-1"
            >
              {sopSectionTabs.map((sec) => {
                const isActive = sopSectionFilter === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    data-slide-active={isActive ? 'true' : undefined}
                    onClick={() => setSopSectionFilter(sec.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#ee2e65] text-white shadow-xs'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </HorizontalSlideTrack>
          </div>

          {filteredCrewChief.length === 0 && Object.keys(groupedSop).length === 0 ? (
            <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-10 text-center space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ada modul SOP operasional yang sesuai filter pencarian.
              </p>
              <button
                type="button"
                onClick={() => openCrudCreate('sop')}
                className={ACTION_BTN_PRIMARY}
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>Tambah Modul SOP</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5 ui-stagger">
              {/* Crew Chief & PIC Ibadah Timeline (merged former Buku Saku + PIC Crew Guideline) */}
              {filteredCrewChief.length > 0 && (
                <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
                  <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                        SOP Crew Chief &amp; PIC Ibadah (H-60 Menit s/d Pasca Ibadah)
                      </h4>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                        {filteredCrewChief.length} Fase
                      </span>
                      <SectionAddButton
                        label="Tambah"
                        onClick={() => openCrudCreate('crewChief')}
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                      <colgroup>
                        <col className="w-[156px]" />
                        <col className="w-[240px]" />
                        <col />
                        <col className="w-[104px]" />
                      </colgroup>
                      <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <tr>
                          <th className="py-3 px-4">Waktu</th>
                          <th className="py-3 px-4">Fase Kerja</th>
                          <th className="py-3 px-4">Tugas &amp; Tanggung Jawab PIC / Crew Chief</th>
                          <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                        {filteredCrewChief.map((t) => {
                          const rowId = t.id || t.time;
                          return (
                            <tr
                              key={rowId}
                              className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors"
                            >
                              <td className="py-3.5 px-4 align-middle">
                                <span
                                  className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap tabular-nums ${getBadgeToneClass(
                                    'brand'
                                  )}`}
                                >
                                  {t.time}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                                {t.phase}
                              </td>
                              <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                                {t.desc}
                              </td>
                              <td className="py-3.5 px-4 text-right align-middle">
                                <CrudRowActions
                                  onEdit={() => openCrudEdit('crewChief', rowId)}
                                  onDelete={() =>
                                    requestDeleteItem('crewChief', rowId, `${t.time} — ${t.phase}`)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Grouped Manual SOP V5 Modules */}
              {Object.entries(groupedSop).map(([secTitle, items]) => (
                <div
                  key={secTitle}
                  className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs"
                >
                  <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                        {secTitle}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                        {items.length} Modul
                      </span>
                      <SectionAddButton
                        label="Tambah"
                        onClick={() =>
                          openCrudCreate('sop', {
                            section: items[0]?.section || 'VII',
                            sectionTitle: secTitle,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[920px] table-fixed text-left border-collapse">
                      <colgroup>
                        <col className="w-[64px]" />
                        <col className="w-[30%]" />
                        <col className="w-[152px]" />
                        <col />
                        <col className="w-[172px]" />
                      </colgroup>
                      <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <tr>
                          <th className="py-3 px-4">No</th>
                          <th className="py-3 px-4">Modul / Peran</th>
                          <th className="py-3 px-4">Tipe</th>
                          <th className="py-3 px-4">Ringkasan Standar</th>
                          <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                        {items.map((m) => (
                          <tr
                            key={m.id}
                            onClick={() => openSopModal(m.id)}
                            className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                          >
                            <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums align-middle">
                              #{m.num}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                              {m.title}
                            </td>
                            <td className="py-3.5 px-4 align-middle">
                              <span
                                className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                                  m.tone
                                )}`}
                              >
                                {m.type}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                              {m.summary}
                            </td>
                            <td className="py-3.5 px-4 text-right align-middle">
                              <CrudRowActions
                                onDetail={() => openSopModal(m.id)}
                                onEdit={() => openCrudEdit('sop', m.id)}
                                onDelete={() => requestDeleteItem('sop', m.id, m.title)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 4: PERAN & STRUKTUR TIM (17 BIDANG + TEAM LEADER)             */}
      {/* ================================================================= */}
      {panduanSubtab === 'peran' && (
        <div className="space-y-5 ui-stagger">
          <div className="flex flex-wrap items-center gap-2">
            {roleGroups.map((grp) => {
              const isActive =
                (roleGroups.includes(roleGroupFilter) ? roleGroupFilter : 'all') === grp;
              return (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setRoleGroupFilter(grp)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#ee2e65] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-gray-600 dark:text-gray-300 hover:border-[#ee2e65]'
                  }`}
                >
                  {grp === 'all' ? 'Semua Kategori Tim' : grp}
                </button>
              );
            })}
          </div>

          {Object.keys(groupedRoles).length === 0 ? (
            <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-10 text-center space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ada bidang peran yang cocok dengan pencarian Anda.
              </p>
              <button
                type="button"
                onClick={() => openCrudCreate('ministryRole')}
                className={ACTION_BTN_PRIMARY}
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>Tambah Peran</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5 ui-stagger">
              {Object.entries(groupedRoles).map(([grpName, roles]) => (
                <div
                  key={grpName}
                  className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs"
                >
                  <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                        Tim {grpName}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                        {roles.length} Bidang
                      </span>
                      <SectionAddButton
                        label="Tambah"
                        onClick={() => openCrudCreate('ministryRole', { group: grpName })}
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[940px] table-fixed text-left border-collapse">
                      <colgroup>
                        <col className="w-[64px]" />
                        <col className="w-[22%]" />
                        <col className="w-[25%]" />
                        <col />
                        <col className="w-[172px]" />
                      </colgroup>
                      <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <tr>
                          <th className="py-3 px-4">No</th>
                          <th className="py-3 px-4">Nama Bidang</th>
                          <th className="py-3 px-4">Syarat &amp; Kualifikasi</th>
                          <th className="py-3 px-4">Tugas Utama</th>
                          <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                        {roles.map((r) => {
                          const rowId = r.id || r.num;
                          return (
                            <tr
                              key={rowId}
                              onClick={() => openMinistryRoleModal(rowId)}
                              className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                            >
                              <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] tabular-nums align-middle">
                                #{r.num}
                              </td>
                              <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                                {r.name}
                              </td>
                              <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 leading-relaxed break-words align-middle">
                                {r.req}
                              </td>
                              <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                                {r.duties}
                              </td>
                              <td className="py-3.5 px-4 text-right align-middle">
                                <CrudRowActions
                                  onDetail={() => openMinistryRoleModal(rowId)}
                                  onEdit={() => openCrudEdit('ministryRole', rowId)}
                                  onDelete={() =>
                                    requestDeleteItem('ministryRole', rowId, r.name)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Struktur Team Leader (3 Divisi Pengembangan) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Struktur Team Leader ({leaderDivisionsList.length} Divisi Pengembangan)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredLeaderDivisions.length} Divisi
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('leaderDiv')}
                />
              </div>
            </div>

            {filteredLeaderDivisions.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400">
                Tidak ada divisi Team Leader yang cocok dengan pencarian Anda.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
                  <colgroup>
                    <col className="w-[230px]" />
                    <col className="w-[260px]" />
                    <col />
                    <col className="w-[104px]" />
                  </colgroup>
                  <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-4">Divisi Leader</th>
                      <th className="py-3 px-4">Cakupan Tim</th>
                      <th className="py-3 px-4">Tugas &amp; Tanggung Jawab Utama</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                    {filteredLeaderDivisions.map((div) => (
                      <tr
                        key={div.id}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white break-words align-middle">
                          {div.name}
                        </td>
                        <td className="py-3.5 px-4 align-middle">
                          <span
                            className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              div.tone
                            )}`}
                          >
                            {div.scope}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                          {div.desc}
                        </td>
                        <td className="py-3.5 px-4 text-right align-middle">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('leaderDiv', div.id)}
                            onDelete={() => requestDeleteItem('leaderDiv', div.id, div.name)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
