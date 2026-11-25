import React, { useMemo, useState } from 'react';
import { Download, GitFork, Globe2, Image as ImageIcon, Layers, Network, Plus, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrgChartNodeItem } from '../../types';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { CrudRowActions, SectionAddButton } from '../multimedia/CrudRowActions';
import { PageAttachmentsBar } from '../multimedia/PageAttachmentsBar';
import {
  downloadOrgPng,
  downloadOrgSvg,
  OfficialV1OrgSvg,
  SinodalRegionalOrgSvg,
  SynodalV2OrgSvg,
} from '../multimedia/OrgChartSvgs';
import { getBadgeToneClass } from '../multimedia/toneClasses';

export const OrgChartPage: React.FC = () => {
  const {
    orgSubtab,
    setOrgSubtab,
    orgV2Nodes,
    orgV1Nodes,
    regionalsList,
    churchCategoriesList,
    pilarMappingList,
    levelingList,
    openOrgNodeModal,
    openLevelModal,
    openCrudCreate,
    openCrudEdit,
    requestDeleteItem,
    triggerToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [orgVersion, setOrgVersion] = useState<'v2' | 'v1'>('v2');

  const q = searchQuery.trim().toLowerCase();
  const isV2 = orgVersion === 'v2';
  const nodeEntity = isV2 ? 'orgNodeV2' : 'orgNodeV1';

  const groupedNodes = useMemo(() => {
    const sourceNodes: OrgChartNodeItem[] = isV2 ? orgV2Nodes : orgV1Nodes;
    const filtered = sourceNodes.filter(
      (n) =>
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.unit.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.badge.toLowerCase().includes(q)
    );
    return filtered.reduce<Record<string, OrgChartNodeItem[]>>((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    }, {});
  }, [isV2, orgV1Nodes, orgV2Nodes, q]);

  const filteredRegionals = useMemo(
    () =>
      regionalsList.filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.center.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q)
      ),
    [q, regionalsList]
  );

  const subtabs = [
    { id: 'bagan' as const, label: '1. Bagan Struktur Resmi (V1 & V2)', icon: GitFork },
    { id: 'sinodal' as const, label: '2. Hierarki Sinodal & 8 Regional', icon: Globe2 },
    { id: 'pilar' as const, label: '3. Pemetaan Bidang & Jenjang Karier', icon: Layers },
  ];

  const activeSvgId = isV2 ? 'org-chart-v2-svg' : 'org-chart-svg';
  const activeFileBase = isV2
    ? 'multimedia-synodal-structure-v2'
    : 'struktur-dept-multimedia-v1';
  const activeCount = isV2 ? orgV2Nodes.length : orgV1Nodes.length;

  return (
    <div className="px-2.5 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 w-full space-y-5 ui-stagger">
      <PageAttachmentsBar page="orgchart" />

      {/* Header Controls: Search + Sub-Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 bg-[#F4F5F8] dark:bg-[#1B1E24] p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
          <HorizontalSlideTrack
            activeKey={orgSubtab}
            accent="primary"
            visibility="auto"
            showControls
            fadeEdges
            trackClassName="flex items-center gap-1"
          >
            {subtabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = orgSubtab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-slide-active={isActive ? 'true' : undefined}
                  onClick={() => setOrgSubtab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
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

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari posisi, unit, atau regional..."
            className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-xs text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
          />
        </div>
      </div>

      {/* Subtab 1: Official V1 & V2 Bagan */}
      {orgSubtab === 'bagan' && (
        <div className="space-y-5 ui-stagger">
          {/* Version Switcher Bar */}
          <div className="bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setOrgVersion('v2')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer ${
                  isV2
                    ? 'bg-[#ee2e65] text-white shadow-xs'
                    : 'bg-white dark:bg-[#15181E] text-gray-700 dark:text-gray-300 border border-black/[0.08] dark:border-white/[0.10] hover:text-[#ee2e65]'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Struktur V2 — Multimedia Synodal Structure</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isV2
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5]'
                  }`}
                >
                  Terbaru
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrgVersion('v1')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer ${
                  !isV2
                    ? 'bg-[#ee2e65] text-white shadow-xs'
                    : 'bg-white dark:bg-[#15181E] text-gray-700 dark:text-gray-300 border border-black/[0.08] dark:border-white/[0.10] hover:text-[#ee2e65]'
                }`}
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>Struktur V1 — Dept. Multimedia</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5 px-2">
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                {isV2
                  ? `Menampilkan V2 (${activeCount} Posisi / Unit)`
                  : `Menampilkan V1 (${activeCount} Posisi / Unit)`}
              </span>
              <SectionAddButton
                label="Tambah Posisi"
                onClick={() => openCrudCreate(nodeEntity)}
              />
            </div>
          </div>

          {/* Interactive SVG Org Chart Card */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#1C1D21] dark:text-white">
                  {isV2
                    ? 'Gambar Bagan Struktur V2 — Multimedia Synodal Structure'
                    : 'Gambar Bagan Struktur V1 — Dept. Multimedia'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isV2
                    ? 'Struktur terbaru: Head of MM, Secretary, Operational (4 Unit), Development (5 Bidang), dan Regional Support (Regional In & 12 Regional Out).'
                    : 'Struktur versi 1: Multimedia, Sekretaris, Ministry (Crew Chief + 13 Crew & Team Leader), Video Production, dan Tech. Support.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadOrgSvg(activeSvgId, `${activeFileBase}.svg`, () =>
                      triggerToast('Unduhan SVG', `Berhasil mengunduh ${activeFileBase}.svg`, 'success')
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#232730] border border-black/[0.10] dark:border-white/[0.12] hover:border-[#ee2e65] text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> SVG
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadOrgPng(activeSvgId, `${activeFileBase}.png`, () =>
                      triggerToast('Unduhan PNG 2x', `Berhasil mengunduh ${activeFileBase}.png`, 'success')
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> PNG
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 overflow-x-auto bg-white">
              <div className="min-w-[820px]">
                {isV2 ? (
                  <SynodalV2OrgSvg
                    onSelectNode={(id) => openOrgNodeModal(id, 'V2 Synodal')}
                  />
                ) : (
                  <OfficialV1OrgSvg
                    onSelectNode={(id) => openOrgNodeModal(id, 'V1 Dept. MM')}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sectioned Position Tables */}
          {Object.keys(groupedNodes).length === 0 ? (
            <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-10 text-center space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ada posisi struktur yang cocok dengan pencarian Anda.
              </p>
              <button
                type="button"
                onClick={() => openCrudCreate(nodeEntity)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Posisi Struktur</span>
              </button>
            </div>
          ) : (
            Object.entries(groupedNodes).map(([sectionName, nodes]) => (
              <div
                key={sectionName}
                className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs"
              >
                <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                      {sectionName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                      {nodes.length} Posisi
                    </span>
                    <SectionAddButton
                      label="Tambah"
                      onClick={() => openCrudCreate(nodeEntity, { section: sectionName })}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[940px] table-fixed text-left border-collapse">
                    <colgroup>
                      <col className="w-[64px]" />
                      <col className="w-[24%]" />
                      <col className="w-[180px]" />
                      <col />
                      <col className="w-[184px]" />
                    </colgroup>
                    <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      <tr>
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">Posisi / Jabatan</th>
                        <th className="py-3 px-4">Level / Unit</th>
                        <th className="py-3 px-4">Ringkasan Jobdesk</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                      {nodes.map((node, idx) => (
                        <tr
                          key={node.id}
                          onClick={() =>
                            openOrgNodeModal(node.id, isV2 ? 'V2 Synodal' : 'V1 Dept. MM')
                          }
                          className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums align-middle">
                            {String(idx + 1).padStart(2, '0')}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white leading-snug break-words align-middle">
                            {node.title}
                          </td>
                          <td className="py-3.5 px-4 align-middle">
                            <span
                              className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                                node.tone
                              )}`}
                            >
                              {node.badge}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                            {node.summary}
                          </td>
                          <td className="py-3.5 px-4 text-right align-middle">
                            <CrudRowActions
                              detailLabel="Jobdesk"
                              onDetail={() =>
                                openOrgNodeModal(node.id, isV2 ? 'V2 Synodal' : 'V1 Dept. MM')
                              }
                              onEdit={() => openCrudEdit(nodeEntity, node.id)}
                              onDelete={() =>
                                requestDeleteItem(nodeEntity, node.id, node.title)
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

      {/* Subtab 2: Hierarki Sinodal & 8 Regional */}
      {orgSubtab === 'sinodal' && (
        <div className="space-y-5 ui-stagger">
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#1C1D21] dark:text-white">
                  Gambar Bagan Sinodal &amp; 8 Regional GMS
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sumber: Platform GMS II Rev II (Pusat Sinode Surabaya Barat → 8 Regional → GMS Lokal &amp; Perintisan)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadOrgSvg('sinodal-chart-svg', 'hierarki-sinodal-gms.svg', () =>
                      triggerToast('Unduhan SVG', 'Berhasil mengunduh hierarki-sinodal-gms.svg', 'success')
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#232730] border border-black/[0.10] dark:border-white/[0.12] hover:border-[#ee2e65] text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> SVG
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadOrgPng('sinodal-chart-svg', 'hierarki-sinodal-gms.png', () =>
                      triggerToast('Unduhan PNG 2x', 'Berhasil mengunduh hierarki-sinodal-gms.png', 'success')
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> PNG
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 overflow-x-auto bg-white">
              <div className="min-w-[800px]">
                <SinodalRegionalOrgSvg />
              </div>
            </div>
          </div>

          {/* 8 Regional Table */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Daftar Regional Resmi GMS II
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
                  <col className="w-[168px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Regional</th>
                    <th className="py-3 px-4">Kota Pusat</th>
                    <th className="py-3 px-4">Cakupan Wilayah &amp; Mandat</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredRegionals.map((r) => {
                    const rowId = r.id || r.no;
                    return (
                      <tr
                        key={rowId}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors"
                      >
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
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Church Categories Table */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Klasifikasi Gereja Lokal &amp; Struktur Multimedia (Kategori A–E)
                </h4>
              </div>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('churchCat')}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[180px]" />
                  <col className="w-[155px]" />
                  <col className="w-[170px]" />
                  <col className="w-[160px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Kapasitas Jemaat</th>
                    <th className="py-3 px-4">Standar Staff MM</th>
                    <th className="py-3 px-4">Standar Relawan</th>
                    <th className="py-3 px-4">Perangkat Minimal</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {churchCategoriesList.map((c) => {
                    const rowId = c.id || c.cat;
                    const catLabel = c.cat.toLowerCase().startsWith('kategori')
                      ? c.cat
                      : `Kategori ${c.cat}`;
                    const isCatE = c.cat.trim().toUpperCase().endsWith('E');
                    return (
                      <tr key={rowId} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white whitespace-nowrap">
                          {catLabel} ({c.label})
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-gray-700 dark:text-gray-300">
                          {c.capacity}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              isCatE ? 'brand' : 'neutral'
                            )}`}
                          >
                            {c.staffMM}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-700 dark:text-emerald-300">
                          {c.relawan}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{c.equip}</td>
                        <td className="py-3.5 px-4 text-right">
                          <CrudRowActions
                            onEdit={() => openCrudEdit('churchCat', rowId)}
                            onDelete={() =>
                              requestDeleteItem('churchCat', rowId, `${catLabel} (${c.label})`)
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
        </div>
      )}

      {/* Subtab 3: Pemetaan Bidang & Tangga Jenjang Karier */}
      {orgSubtab === 'pilar' && (
        <div className="space-y-5 ui-stagger">
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Pemetaan Konsep ke Struktur Resmi Dept. Multimedia
                </h4>
              </div>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('pilarMap')}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[64px]" />
                  <col className="w-[170px]" />
                  <col className="w-[28%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Bidang</th>
                    <th className="py-3 px-4">Pengemban Tugas di Bagan Resmi</th>
                    <th className="py-3 px-4">Fokus Mandat &amp; Dokumen Terkait</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {pilarMappingList.map((m, idx) => (
                    <tr key={m.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5]">
                        {m.pilar}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#1C1D21] dark:text-white">
                        {m.unit}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {m.focus}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <CrudRowActions
                          onEdit={() => openCrudEdit('pilarMap', m.id)}
                          onDelete={() => requestDeleteItem('pilarMap', m.id, m.pilar)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5 Jenjang Karier Table */}
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                  Tangga Jenjang Karier Pelayan Multimedia (Trainee – Bintang 4)
                </h4>
              </div>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('level')}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[144px]" />
                  <col className="w-[24%]" />
                  <col className="w-[22%]" />
                  <col />
                  <col className="w-[172px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Status / Peran</th>
                    <th className="py-3 px-4">Syarat Rohani &amp; Masa</th>
                    <th className="py-3 px-4">Lingkup Wewenang</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {levelingList.map((l) => {
                    const rowId = l.id || l.grade;
                    return (
                      <tr
                        key={rowId}
                        onClick={() => openLevelModal(rowId)}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              l.tone
                            )}`}
                          >
                            {l.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                          {l.role}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                          {l.msj} • {l.duration}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{l.scope}</td>
                        <td className="py-3.5 px-4 text-right">
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
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
