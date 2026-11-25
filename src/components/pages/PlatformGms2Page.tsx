import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  Layers,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import { useApp, Gms2SubtabId } from '../../context/AppContext';
import { ACTION_BTN_PRIMARY } from '../../constants/buttonStyles';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { CrudRowActions, SectionAddButton } from '../multimedia/CrudRowActions';
import { PageAttachmentsBar } from '../multimedia/PageAttachmentsBar';
import { getBadgeToneClass } from '../multimedia/toneClasses';

const formatPageLabel = (pages: string) => {
  const trimmed = pages.trim();
  if (!trimmed || trimmed === '-') return 'Hal. -';
  return trimmed.toLowerCase().startsWith('hal') ? trimmed : `Hal. ${trimmed}`;
};

const formatChurchCatLabel = (cat: string) => {
  const trimmed = cat.trim();
  return trimmed.toLowerCase().startsWith('kategori') ? trimmed : `Kategori ${trimmed}`;
};

const BASE_PLATFORM_CHAPTERS: Array<{
  pages: string;
  label: string;
  subtab: Gms2SubtabId;
}> = [
  { pages: 'Hal. 2–5', label: 'Pengantar, Objektif & Struktur', subtab: 'pengantar' },
  { pages: 'Hal. 6–23', label: '5 Jabatan Resmi', subtab: 'pengantar' },
  { pages: 'Hal. 24–50', label: 'Leveling, Servolution & Workshop', subtab: 'pelayanan' },
  { pages: 'Hal. 51–59', label: 'Kategori A–E, 8 Regional & Prinsip', subtab: 'kantor' },
  { pages: 'Hal. 56–64', label: '14 Tahap Pengadaan TPS', subtab: 'pengadaan' },
  { pages: 'Hal. 65–78', label: 'Lampiran WI, PR & Formulir', subtab: 'wipr' },
];

export const PlatformGms2Page: React.FC = () => {
  const {
    gms2Subtab,
    setGms2Subtab,
    setActivePage,
    setOrgSubtab,
    gms2PengantarList,
    jabatanList,
    levelingList,
    gms2ServolutionList,
    ws1VideoList,
    ws1PhotoList,
    ws2ModulesList,
    churchCategoriesList,
    sinodalDefsList,
    regionalsList,
    gms2PrinsipList,
    tpsStepsList,
    gms2WiPrList,
    gms2FormsList,
    openJabatanModal,
    openLevelModal,
    openWiPrModal,
    openGms2FormModal,
    openCrudCreate,
    openCrudEdit,
    requestDeleteItem,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.trim().toLowerCase();

  const subtabs = [
    { id: 'pengantar' as const, label: '1. Pengantar, Objektif & 5 Jabatan', icon: Users },
    { id: 'pelayanan' as const, label: '2. Pengelolaan Pelayanan', icon: BookOpen },
    { id: 'kantor' as const, label: '3. Pengelolaan Kantor & A–E', icon: Building2 },
    { id: 'pengadaan' as const, label: '4. SOP & Pengadaan TPS', icon: ClipboardList },
    { id: 'wipr' as const, label: '5. Lampiran WI, PR & Formulir', icon: FileText },
  ];

  // Filtered lists across all 5 subtabs
  const filteredPengantar = useMemo(
    () =>
      gms2PengantarList.filter(
        (p) =>
          !q ||
          p.section.toLowerCase().includes(q) ||
          p.pages.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      ),
    [gms2PengantarList, q]
  );

  const filteredJabatan = useMemo(
    () =>
      jabatanList.filter(
        (j) =>
          !q ||
          j.title.toLowerCase().includes(q) ||
          j.desc.toLowerCase().includes(q) ||
          j.nature.toLowerCase().includes(q) ||
          j.pages.toLowerCase().includes(q) ||
          j.kualifikasi.toLowerCase().includes(q)
      ),
    [jabatanList, q]
  );

  const filteredLeveling = useMemo(
    () =>
      levelingList.filter(
        (l) =>
          !q ||
          l.grade.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.msj.toLowerCase().includes(q) ||
          l.modul.toLowerCase().includes(q) ||
          l.filosofis.toLowerCase().includes(q) ||
          l.objektif.toLowerCase().includes(q) ||
          l.scope.toLowerCase().includes(q)
      ),
    [levelingList, q]
  );

  const filteredServolution = useMemo(
    () =>
      gms2ServolutionList.filter(
        (s) =>
          !q ||
          s.component.toLowerCase().includes(q) ||
          s.pages.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q)
      ),
    [gms2ServolutionList, q]
  );

  const filteredWs1Video = useMemo(
    () =>
      ws1VideoList.filter(
        (r) =>
          !q ||
          r.week.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q)
      ),
    [ws1VideoList, q]
  );

  const filteredWs1Photo = useMemo(
    () =>
      ws1PhotoList.filter(
        (r) =>
          !q ||
          r.week.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q)
      ),
    [ws1PhotoList, q]
  );

  const filteredWs2Modules = useMemo(
    () =>
      ws2ModulesList.filter(
        (r) => !q || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)
      ),
    [ws2ModulesList, q]
  );

  const filteredChurchCats = useMemo(
    () =>
      churchCategoriesList.filter(
        (c) =>
          !q ||
          c.cat.toLowerCase().includes(q) ||
          c.label.toLowerCase().includes(q) ||
          c.statusGereja.toLowerCase().includes(q) ||
          c.capacity.toLowerCase().includes(q) ||
          c.building.toLowerCase().includes(q) ||
          c.staffMM.toLowerCase().includes(q) ||
          c.equip.toLowerCase().includes(q)
      ),
    [churchCategoriesList, q]
  );

  const filteredSinodalDefs = useMemo(
    () =>
      sinodalDefsList.filter(
        (d) => !q || d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)
      ),
    [sinodalDefsList, q]
  );

  const filteredRegionals = useMemo(
    () =>
      regionalsList.filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.center.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q)
      ),
    [regionalsList, q]
  );

  const filteredPrinsipGroups = useMemo(() => {
    const matched = gms2PrinsipList.filter(
      (p) =>
        !q ||
        p.code.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
    return matched.reduce<Record<string, typeof matched>>((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [gms2PrinsipList, q]);

  const filteredTpsSteps = useMemo(
    () =>
      tpsStepsList.filter(
        (s) =>
          !q ||
          s.step.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q)
      ),
    [tpsStepsList, q]
  );

  const filteredWiList = useMemo(
    () =>
      gms2WiPrList.filter(
        (w) =>
          w.type === 'WI' &&
          (!q ||
            w.code.toLowerCase().includes(q) ||
            w.title.toLowerCase().includes(q) ||
            w.summary.toLowerCase().includes(q))
      ),
    [gms2WiPrList, q]
  );

  const filteredPrList = useMemo(
    () =>
      gms2WiPrList.filter(
        (w) =>
          w.type !== 'WI' &&
          (!q ||
            w.code.toLowerCase().includes(q) ||
            w.title.toLowerCase().includes(q) ||
            w.summary.toLowerCase().includes(q))
      ),
    [gms2WiPrList, q]
  );

  const filteredFormsList = useMemo(
    () =>
      gms2FormsList.filter(
        (f) =>
          !q ||
          f.code.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q)
      ),
    [gms2FormsList, q]
  );

  const goToOfficialOrgChart = () => {
    setOrgSubtab('bagan');
    setActivePage('orgchart');
  };

  return (
    <div className="px-2.5 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 w-full space-y-4 ui-stagger">
      <PageAttachmentsBar page="gms2" />

      {/* Base Platform Overview Strip & Complete 78-Page Map */}
      <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start sm:items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/20 border border-[#FBC2D4] dark:border-[#ee2e65]/35 text-[#9D113C] dark:text-[#f895b5] text-[10.5px] font-bold uppercase tracking-wider shrink-0">
              <Layers className="w-3 h-3" /> Base Platform • 78 Hal.
            </span>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#1C1D21] dark:text-white leading-snug">
              Platform GMS II Rev II — Departemen Multimedia (Dokumen Induk Lengkap Hal. 1–78)
            </h2>
          </div>
          <button
            type="button"
            onClick={goToOfficialOrgChart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.10] dark:border-white/[0.12] hover:border-[#ee2e65] hover:text-[#ee2e65] text-[11px] font-semibold text-gray-700 dark:text-gray-200 transition-colors self-start sm:self-auto shrink-0 cursor-pointer"
          >
            <span>Bagan Struktur Resmi (Hal. 5)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2">
          {BASE_PLATFORM_CHAPTERS.map((ch) => {
            const isActive = gms2Subtab === ch.subtab;
            return (
              <button
                key={`${ch.pages}-${ch.label}`}
                type="button"
                onClick={() => setGms2Subtab(ch.subtab)}
                className={`text-left px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FEF1F5]/80 dark:bg-[#ee2e65]/15 border-[#FBC2D4] dark:border-[#ee2e65]/40'
                    : 'bg-[#F9FAFC] dark:bg-[#1B1E24] border-black/[0.06] dark:border-white/[0.06] hover:border-[#ee2e65]/40'
                }`}
              >
                <div className="text-[10.5px] font-bold text-[#ee2e65] dark:text-[#f895b5] tabular-nums">
                  {ch.pages}
                </div>
                <div className="text-[11.5px] font-semibold text-[#1C1D21] dark:text-gray-200 truncate mt-0.5">
                  {ch.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Toolbar: Subtabs + Search + Tambah WI/PR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 bg-[#F4F5F8] dark:bg-[#1B1E24] p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
          <HorizontalSlideTrack
            activeKey={gms2Subtab}
            accent="primary"
            visibility="auto"
            showControls
            fadeEdges
            trackClassName="flex items-center gap-1"
          >
            {subtabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = gms2Subtab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-slide-active={isActive ? 'true' : undefined}
                  onClick={() => setGms2Subtab(tab.id)}
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
              placeholder="Cari bab, jabatan, servolution, TPS, WI/PR..."
              className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-xs text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              openCrudCreate(gms2Subtab === 'wipr' ? 'wipr' : 'wipr')
            }
            className={ACTION_BTN_PRIMARY}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Tambah WI/PR</span>
            <span className="sm:hidden">WI/PR</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SUBTAB 1: PENGANTAR, OBJEKTIF & 5 JABATAN (HAL. 2–23)            */}
      {/* ================================================================= */}
      {gms2Subtab === 'pengantar' && (
        <div className="space-y-5 ui-stagger">
          {/* Bagian 1: Pengantar, Objektif & Struktur Dasar (Hal. 2–5) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 1: Pengantar, Mandat, Objektif &amp; Struktur Dasar (Hal. 2–5)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredPengantar.length} Dasar Platform
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('gms2Pengantar')}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[24%]" />
                  <col className="w-[128px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Bagian Platform</th>
                    <th className="py-3 px-4">Halaman</th>
                    <th className="py-3 px-4">Isi Resmi Platform GMS II Rev II</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredPengantar.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada poin pengantar yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredPengantar.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02] align-middle"
                      >
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug">
                          {row.section}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              row.tone
                            )}`}
                          >
                            {formatPageLabel(row.pages)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          <div>{row.desc}</div>
                          {row.linkPage === 'orgchart' && (
                            <button
                              type="button"
                              onClick={goToOfficialOrgChart}
                              className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#ee2e65] dark:text-[#f895b5] hover:underline cursor-pointer"
                            >
                              <span>Lihat Bagan Struktur Organisasi Resmi (V1 &amp; V2)</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('gms2Pengantar', row.id)}
                            onDelete={() =>
                              requestDeleteItem('gms2Pengantar', row.id, row.section)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 2: Keterangan Struktur — 5 Jabatan Lengkap (Hal. 6–23) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 2: Keterangan Struktur — 5 Jabatan Lengkap (Hal. 6–23)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredJabatan.length} Jabatan
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('jabatan')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[64px]" />
                  <col className="w-[24%]" />
                  <col className="w-[22%]" />
                  <col />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Jabatan &amp; Hal.</th>
                    <th className="py-3 px-4">Sifat Tugas</th>
                    <th className="py-3 px-4">Tanggung Jawab Inti</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredJabatan.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada jabatan yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredJabatan.map((j) => {
                      const rowId = j.id || j.num;
                      return (
                        <tr
                          key={rowId}
                          onClick={() => openJabatanModal(rowId)}
                          className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] tabular-nums">
                            {j.num}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#1C1D21] dark:text-white leading-snug">
                              {j.title}
                            </div>
                            <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                              {formatPageLabel(j.pages)}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block max-w-full px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border leading-snug ${getBadgeToneClass(
                                'indigo'
                              )}`}
                            >
                              {j.nature}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {j.desc}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <CrudRowActions
                              onDetail={() => openJabatanModal(rowId)}
                              onEdit={() => openCrudEdit('jabatan', rowId)}
                              onDelete={() => requestDeleteItem('jabatan', rowId, j.title)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SUBTAB 2: PENGELOLAAN PELAYANAN / MINISTRY (HAL. 24–50)          */}
      {/* ================================================================= */}
      {gms2Subtab === 'pelayanan' && (
        <div className="space-y-5 ui-stagger">
          {/* Bagian 1: Framework Leveling (Hal. 24–29) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 1: Framework Leveling / Jenjang Pelayanan (Trainee – Bintang 4 • Hal. 24–29)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredLeveling.length} Level
                </span>
                <SectionAddButton label="Tambah" onClick={() => openCrudCreate('level')} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[17%]" />
                  <col className="w-[16%]" />
                  <col className="w-[21%]" />
                  <col />
                  <col className="w-[138px]" />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Level &amp; Jabatan</th>
                    <th className="py-3 px-4">MSJ &amp; Modul</th>
                    <th className="py-3 px-4">Filosofis &amp; Objektif</th>
                    <th className="py-3 px-4">Uraian Tugas</th>
                    <th className="py-3 px-4">Durasi &amp; Hadir</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredLeveling.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada jenjang level yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredLeveling.map((l) => {
                      const rowId = l.id || l.grade;
                      return (
                        <tr
                          key={rowId}
                          onClick={() => openLevelModal(rowId)}
                          className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer align-top"
                        >
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                                l.tone
                              )}`}
                            >
                              {l.grade}
                            </span>
                            <div className="font-bold text-[#1C1D21] dark:text-white mt-1.5 leading-snug">
                              {l.role}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#1C1D21] dark:text-white">{l.msj}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {l.modul}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#1C1D21] dark:text-white">
                              {l.filosofis}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                              {l.objektif}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {l.scope}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#1C1D21] dark:text-white">
                              {l.duration}
                            </div>
                            <div className="text-[11px] font-semibold text-[#ee2e65] dark:text-[#f895b5] mt-0.5">
                              {l.attendance}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right align-middle">
                            <CrudRowActions
                              onDetail={() => openLevelModal(rowId)}
                              onEdit={() => openCrudEdit('level', rowId)}
                              onDelete={() =>
                                requestDeleteItem('level', rowId, `${l.grade} — ${l.role}`)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 2: Servolution — Syarat Umum, Pendaftaran & 5 Materi Awal (Hal. 30–37) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 2: Servolution — Syarat Umum, Pendaftaran &amp; 5 Materi Awal (Hal. 30–37)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredServolution.length} Poin
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('gms2Servolution')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[26%]" />
                  <col className="w-[120px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Komponen / Materi</th>
                    <th className="py-3 px-4">Halaman</th>
                    <th className="py-3 px-4">Ketentuan &amp; Silabus Resmi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredServolution.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada komponen Servolution yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredServolution.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug">
                          {row.component}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              row.tone
                            )}`}
                          >
                            {formatPageLabel(row.pages)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {row.desc}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('gms2Servolution', row.id)}
                            onDelete={() =>
                              requestDeleteItem('gms2Servolution', row.id, row.component)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 3: Workshop Dasar Lv.1 — Video Production & TS (Hal. 38–42) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 3: Workshop Dasar Lv.1 — Video Production &amp; TS (Hal. 38–42)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="hidden sm:inline text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredWs1Video.length} Minggu • Prasyarat: Lulus Servolution
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('ws1Video')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[144px]" />
                  <col className="w-[28%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Pertemuan</th>
                    <th className="py-3 px-4">Topik Materi</th>
                    <th className="py-3 px-4">Indikator &amp; Kemampuan Akhir / Ujian</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredWs1Video.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada materi Workshop Lv.1 Video yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredWs1Video.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] whitespace-nowrap">
                          {row.week}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#1C1D21] dark:text-white">
                          {row.title}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {row.desc}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('ws1Video', row.id)}
                            onDelete={() =>
                              requestDeleteItem('ws1Video', row.id, `${row.week} — ${row.title}`)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 4: Workshop Dasar Lv.1 — Photography (Hal. 40 & 42–43) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 4: Workshop Dasar Lv.1 — Photography (Hal. 40 &amp; 42–43)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredWs1Photo.length} Minggu
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('ws1Photo')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[144px]" />
                  <col className="w-[28%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Pertemuan</th>
                    <th className="py-3 px-4">Topik Materi</th>
                    <th className="py-3 px-4">Fokus &amp; Indikator Kompetensi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredWs1Photo.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada materi Workshop Lv.1 Photography yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredWs1Photo.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                          {row.week}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#1C1D21] dark:text-white">
                          {row.title}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {row.desc}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('ws1Photo', row.id)}
                            onDelete={() =>
                              requestDeleteItem('ws1Photo', row.id, `${row.week} — ${row.title}`)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 5: Workshop Dasar Lv.2, Komunitas & Pelayanan Reguler (Hal. 43–50) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 5: Workshop Dasar Lv.2, Komunitas &amp; Pelayanan Reguler (Hal. 43–50)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredWs2Modules.length} Sub-Bahasan
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('ws2Module')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[34%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Modul / Topik</th>
                    <th className="py-3 px-4">Fokus Pembinaan &amp; Pelaksanaan</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredWs2Modules.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada sub-bahasan Workshop Lv.2 yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredWs2Modules.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white break-words">
                          {row.title}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                          {row.desc}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('ws2Module', row.id)}
                            onDelete={() => requestDeleteItem('ws2Module', row.id, row.title)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SUBTAB 3: PENGELOLAAN KANTOR, KATEGORI A–E & SINODAL (HAL. 51–59) */}
      {/* ================================================================= */}
      {gms2Subtab === 'kantor' && (
        <div className="space-y-5 ui-stagger">
          {/* Bagian 1: Indikator Keperluan Pekerjaan Kategori A–E (Hal. 51–55) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 1: Indikator Keperluan Pekerjaan — Kategori A s/d E (Hal. 51–55)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredChurchCats.length} Kategori
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('churchCat')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[156px]" />
                  <col className="w-[15%]" />
                  <col className="w-[16%]" />
                  <col className="w-[116px]" />
                  <col className="w-[17%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Kategori &amp; Status</th>
                    <th className="py-3 px-4">Kapasitas</th>
                    <th className="py-3 px-4">Status Gedung</th>
                    <th className="py-3 px-4">Alat Luar Ibadah</th>
                    <th className="py-3 px-4">SDM Staff &amp; Relawan</th>
                    <th className="py-3 px-4">Asumsi Kebutuhan Alat</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs">
                  {filteredChurchCats.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada kategori gereja yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredChurchCats.map((c) => {
                      const rowId = c.id || c.cat;
                      const displayCat = formatChurchCatLabel(c.cat);
                      return (
                        <tr
                          key={rowId}
                          className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02] align-top"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#ee2e65] dark:text-[#f895b5]">
                              {displayCat}
                            </div>
                            <div className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 mt-0.5">
                              {c.statusGereja}
                            </div>
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">
                              {c.label}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                            {c.capacity}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                            {c.building}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                                c.otherRoomEquip === 'Ada' ? 'emerald' : 'gray'
                              )}`}
                            >
                              {c.otherRoomEquip}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#1C1D21] dark:text-white">
                              Staff: {c.staffMM}
                            </div>
                            <div className="text-emerald-700 dark:text-emerald-300 font-semibold mt-0.5">
                              Relawan: {c.relawan}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {c.equip}
                          </td>
                          <td className="py-3.5 px-4 text-right align-middle">
                            <CrudRowActions
                              onEdit={() => openCrudEdit('churchCat', rowId)}
                              onDelete={() =>
                                requestDeleteItem('churchCat', rowId, `${displayCat} (${c.label})`)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 2: Definisi Organisasi Sinodal, Lokal & Tim TPS (Hal. 56–59) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 2: Definisi Struktur Sinodal, Lokal &amp; Tim TPS (Hal. 56–59)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredSinodalDefs.length} Definisi Baku
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('sinodalDef')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[28%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Entitas / Istilah</th>
                    <th className="py-3 px-4">Ketentuan Resmi Platform GMS II</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredSinodalDefs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada definisi sinodal yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredSinodalDefs.map((def) => {
                      const titleClass =
                        def.tone === 'brand'
                          ? 'text-[#ee2e65] dark:text-[#f895b5]'
                          : def.tone === 'emerald'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-[#1C1D21] dark:text-white';
                      return (
                        <tr key={def.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                          <td className={`py-3.5 px-4 font-bold leading-snug ${titleClass}`}>
                            {def.title}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {def.desc}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <CrudRowActions
                              onEdit={() => openCrudEdit('sinodalDef', def.id)}
                              onDelete={() => requestDeleteItem('sinodalDef', def.id, def.title)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 3: Daftar 8 GMS Regional Resmi (Hal. 56–57) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 3: Daftar 8 GMS Regional Resmi di Bawah Sinode (Hal. 56–57)
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredRegionals.length} Regional
                </span>
                <SectionAddButton
                  label="Tambah"
                  onClick={() => openCrudCreate('regional')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[64px]" />
                  <col className="w-[24%]" />
                  <col className="w-[156px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Regional</th>
                    <th className="py-3 px-4">Kota Pusat</th>
                    <th className="py-3 px-4">Cakupan Wilayah &amp; Mandat</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredRegionals.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada data regional yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredRegionals.map((r) => {
                      const rowId = r.id || r.no;
                      return (
                        <tr key={rowId} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums">
                            {r.no}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                            {r.name}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                                'indigo'
                              )}`}
                            >
                              {r.center}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {r.desc}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <CrudRowActions
                              onEdit={() => openCrudEdit('regional', rowId)}
                              onDelete={() => requestDeleteItem('regional', rowId, r.name)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 4: 6 Prinsip Pengadaan & 3 Aspek Akuntabilitas (Hal. 58–59) */}
          {Object.keys(filteredPrinsipGroups).length === 0 ? (
            <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-8 text-center text-xs text-gray-400">
              Tidak ada prinsip pengadaan atau aspek akuntabilitas yang cocok dengan pencarian.
            </div>
          ) : (
            Object.entries(filteredPrinsipGroups).map(([groupTitle, items]) => (
              <div
                key={groupTitle}
                className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs"
              >
                <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                      Bagian 4: {groupTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                      {items.length} Poin
                    </span>
                    <SectionAddButton
                      label="Tambah"
                      onClick={() => openCrudCreate('gms2Prinsip', { group: groupTitle })}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
                    <colgroup>
                      <col className="w-[88px]" />
                      <col className="w-[26%]" />
                      <col />
                      <col className="w-[104px]" />
                    </colgroup>
                    <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                      <tr>
                        <th className="py-3 px-4">Kode</th>
                        <th className="py-3 px-4">Prinsip / Aspek</th>
                        <th className="py-3 px-4">Ketentuan Resmi</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]"
                        >
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap tabular-nums ${getBadgeToneClass(
                                item.tone
                              )}`}
                            >
                              {item.code}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug">
                            {item.title}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item.desc}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <CrudRowActions
                              onEdit={() => openCrudEdit('gms2Prinsip', item.id)}
                              onDelete={() =>
                                requestDeleteItem('gms2Prinsip', item.id, item.title)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* SUBTAB 4: SOP & PROSES PENGADAAN BERSAMA TIM TPS (HAL. 56–64)     */}
      {/* ================================================================= */}
      {gms2Subtab === 'pengadaan' && (
        <div className="space-y-4 ui-stagger">
          <div className="bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-emerald-800 dark:text-emerald-300">
                Landasan Pengadaan Bersama Tim TPS (Hal. 58–59): 6 Prinsip &amp; 3 Aspek Akuntabilitas
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Seluruh proses pengadaan wajib memenuhi prinsip <strong>Efisien, Efektif, Terbuka &amp; Maksimal, Transparan, Adil/Tidak Diskriminatif, dan Akuntabel</strong> — diimbangi kesiapan SDM &amp; SOP, sasaran fisik/keuangan/manfaat, serta kepatuhan peraturan Sinode GMS II.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setGms2Subtab('kantor')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white dark:bg-[#1B1E24] border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-semibold whitespace-nowrap shrink-0 hover:border-[#ee2e65] hover:text-[#ee2e65] transition-colors cursor-pointer"
            >
              <span>Lihat Detail Prinsip</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  SOP &amp; Proses Pengadaan Peralatan Penunjang Tatalayan Bersama Tim TPS ({filteredTpsSteps.length} Tahapan Baku • Hal. 56–64)
                </h4>
              </div>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('tpsStep')}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[128px]" />
                  <col className="w-[28%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Langkah</th>
                    <th className="py-3 px-4">Tahapan Proses</th>
                    <th className="py-3 px-4">Penanggung Jawab &amp; Prosedur</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredTpsSteps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada tahapan pengadaan TPS yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredTpsSteps.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                        <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] tabular-nums whitespace-nowrap">
                          Langkah {row.step}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                          {row.title}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {row.desc}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('tpsStep', row.id)}
                            onDelete={() =>
                              requestDeleteItem(
                                'tpsStep',
                                row.id,
                                `Langkah ${row.step}: ${row.title}`
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SUBTAB 5: LAMPIRAN WI, PR & FORMULIR RESMI (HAL. 65–78)           */}
      {/* ================================================================= */}
      {gms2Subtab === 'wipr' && (
        <div className="space-y-5 ui-stagger">
          {/* Bagian 1: Work Instructions (WI) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 1: Work Instructions (WI) • Hal. 65–69
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredWiList.length} Dokumen
                </span>
                <SectionAddButton
                  label="Tambah WI"
                  onClick={() => openCrudCreate('wipr', { type: 'WI' })}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[164px]" />
                  <col className="w-[28%]" />
                  <col className="w-[96px]" />
                  <col />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Kode Dokumen</th>
                    <th className="py-3 px-4">Judul Instruksi Kerja</th>
                    <th className="py-3 px-4">Tipe</th>
                    <th className="py-3 px-4">Ringkasan Isi &amp; Deadline</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredWiList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada Work Instruction (WI) yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredWiList.map((w) => (
                      <tr
                        key={w.id}
                        onClick={() => openWiPrModal(w.id)}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] tabular-nums whitespace-nowrap">
                          {w.code}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                          {w.title}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              w.tone
                            )}`}
                          >
                            {w.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {w.summary}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            detailLabel="Baca"
                            onDetail={() => openWiPrModal(w.id)}
                            onEdit={() => openCrudEdit('wipr', w.id)}
                            onDelete={() =>
                              requestDeleteItem('wipr', w.id, `${w.code} — ${w.title}`)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 2: Procedures (PR) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 2: Procedures (PR) • Hal. 69–72
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredPrList.length} Dokumen
                </span>
                <SectionAddButton
                  label="Tambah PR"
                  onClick={() => openCrudCreate('wipr', { type: 'PR', tone: 'blue' })}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[164px]" />
                  <col className="w-[28%]" />
                  <col className="w-[96px]" />
                  <col />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Kode Dokumen</th>
                    <th className="py-3 px-4">Judul Prosedur</th>
                    <th className="py-3 px-4">Tipe</th>
                    <th className="py-3 px-4">Ringkasan Prosedur</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredPrList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada Procedure (PR) yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredPrList.map((w) => (
                      <tr
                        key={w.id}
                        onClick={() => openWiPrModal(w.id)}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400 tabular-nums whitespace-nowrap">
                          {w.code}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                          {w.title}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              w.tone
                            )}`}
                          >
                            {w.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {w.summary}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            detailLabel="Baca"
                            onDetail={() => openWiPrModal(w.id)}
                            onEdit={() => openCrudEdit('wipr', w.id)}
                            onDelete={() =>
                              requestDeleteItem('wipr', w.id, `${w.code} — ${w.title}`)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian 3: Formulir & Dokumen Standar Lampiran (Hal. 72–78) */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Bagian 3: Formulir &amp; Dokumen Standar Lampiran • Hal. 72–78
                </h4>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  {filteredFormsList.length} Formulir
                </span>
                <SectionAddButton
                  label="Tambah Form"
                  onClick={() => openCrudCreate('gms2Form')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[164px]" />
                  <col className="w-[28%]" />
                  <col className="w-[96px]" />
                  <col />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Kode Formulir</th>
                    <th className="py-3 px-4">Nama Formulir Resmi</th>
                    <th className="py-3 px-4">Tipe</th>
                    <th className="py-3 px-4">Fungsi &amp; Acuan Dokumen</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredFormsList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-gray-400">
                        Tidak ada formulir lampiran yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredFormsList.map((f) => (
                      <tr
                        key={f.id}
                        onClick={() => openGms2FormModal(f.id)}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap">
                          {f.code}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                          {f.title}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              f.tone
                            )}`}
                          >
                            {f.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {f.summary}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            detailLabel="Baca"
                            onDetail={() => openGms2FormModal(f.id)}
                            onEdit={() => openCrudEdit('gms2Form', f.id)}
                            onDelete={() =>
                              requestDeleteItem('gms2Form', f.id, `${f.code} — ${f.title}`)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
