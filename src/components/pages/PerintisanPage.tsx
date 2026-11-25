import React, { useMemo, useState } from 'react';
import { ArrowLeftRight, Compass, Search, Wrench } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { CrudRowActions, SectionAddButton } from '../multimedia/CrudRowActions';
import { PageAttachmentsBar } from '../multimedia/PageAttachmentsBar';
import { getBadgeToneClass } from '../multimedia/toneClasses';

type PerintisanSubtab = 'gambaran' | 'metode' | 'sdm';

export const PerintisanPage: React.FC = () => {
  const {
    perintisanProfilList,
    perintisanMateriList,
    perintisanMetodeList,
    perintisanTargetList,
    perintisanMilestoneList,
    openCrudCreate,
    openCrudEdit,
    requestDeleteItem,
  } = useApp();

  const [subtab, setSubtab] = useState<PerintisanSubtab>('gambaran');
  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.trim().toLowerCase();

  const filteredMateri = useMemo(
    () =>
      perintisanMateriList.filter(
        (m) =>
          !q ||
          m.code.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q) ||
          m.desc.toLowerCase().includes(q)
      ),
    [perintisanMateriList, q]
  );

  const subtabs = [
    { id: 'gambaran' as const, label: 'Gambaran & Materi', icon: Compass },
    { id: 'metode' as const, label: 'Metode 1 vs Metode 2', icon: ArrowLeftRight },
    { id: 'sdm' as const, label: 'Pengelolaan SDM & Tools', icon: Wrench },
  ];

  return (
    <div className="px-2.5 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 w-full space-y-5 ui-stagger">
      <PageAttachmentsBar page="perintisan" />

      {/* Top Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 bg-[#F4F5F8] dark:bg-[#1B1E24] p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
          <HorizontalSlideTrack
            activeKey={subtab}
            accent="primary"
            visibility="auto"
            showControls
            fadeEdges
            trackClassName="flex items-center gap-1"
          >
            {subtabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = subtab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-slide-active={isActive ? 'true' : undefined}
                  onClick={() => setSubtab(tab.id)}
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
            placeholder="Cari materi atau target perintisan..."
            className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-xs text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
          />
        </div>
      </div>

      {/* Subtab 1: Gambaran & Materi */}
      {subtab === 'gambaran' && (
        <div className="space-y-5 ui-stagger">
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                Profil &amp; Prasyarat Workshop Dasar Gereja Perintisan
              </h4>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('perintisanProfil')}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[240px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {perintisanProfilList.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block max-w-full truncate px-2.5 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap ${getBadgeToneClass(
                            row.tone
                          )}`}
                        >
                          {row.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                        {row.desc}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <CrudRowActions
                          onEdit={() => openCrudEdit('perintisanProfil', row.id)}
                          onDelete={() =>
                            requestDeleteItem('perintisanProfil', row.id, row.label)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                Kurikulum {filteredMateri.length} Materi Wajib Gereja Perintisan
              </h4>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('perintisanMateri')}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[840px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[128px]" />
                  <col className="w-[28%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Kode</th>
                    <th className="py-3 px-4">Judul Materi</th>
                    <th className="py-3 px-4">Fokus Pembelajaran</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {filteredMateri.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] whitespace-nowrap">
                        {row.code}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                        {row.title}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {row.desc}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <CrudRowActions
                          onEdit={() => openCrudEdit('perintisanMateri', row.id)}
                          onDelete={() =>
                            requestDeleteItem('perintisanMateri', row.id, `${row.code}: ${row.title}`)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Metode 1 vs Metode 2 */}
      {subtab === 'metode' && (
        <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
          <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
              Perbandingan Metode 1 vs Metode 2 Workshop Perintisan
            </h4>
            <SectionAddButton
              label="Tambah"
              onClick={() => openCrudCreate('perintisanMetode')}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
              <colgroup>
                <col className="w-[200px]" />
                <col className="w-[38%]" />
                <col />
                <col className="w-[104px]" />
              </colgroup>
              <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-4">Aspek</th>
                  <th className="py-3 px-4">Metode 1: Pembekalan Tim Lokal</th>
                  <th className="py-3 px-4">Metode 2: Pengutusan Tim Regional</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                {perintisanMetodeList.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                      {row.aspect}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {row.m1}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {row.m2}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <CrudRowActions
                        onEdit={() => openCrudEdit('perintisanMetode', row.id)}
                        onDelete={() =>
                          requestDeleteItem('perintisanMetode', row.id, row.aspect)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Pengelolaan SDM & Tools */}
      {subtab === 'sdm' && (
        <div className="space-y-5 ui-stagger">
          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                Target Pendampingan Regional
              </h4>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('perintisanTarget')}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[230px]" />
                  <col className="w-[180px]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Aktivitas</th>
                    <th className="py-3 px-4">Frekuensi</th>
                    <th className="py-3 px-4">Tujuan Pendampingan</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {perintisanTargetList.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-[#1C1D21] dark:text-white">
                        {row.act}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                            row.tone
                          )}`}
                        >
                          {row.freq}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {row.desc}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <CrudRowActions
                          onEdit={() => openCrudEdit('perintisanTarget', row.id)}
                          onDelete={() =>
                            requestDeleteItem('perintisanTarget', row.id, row.act)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
                Milestone Pendampingan: Bulan 1–6 vs Bulan 6–12
              </h4>
              <SectionAddButton
                label="Tambah"
                onClick={() => openCrudCreate('perintisanMilestone')}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[170px]" />
                  <col className="w-[38%]" />
                  <col />
                  <col className="w-[104px]" />
                </colgroup>
                <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4">Aspek</th>
                    <th className="py-3 px-4">Bulan 1 – 6 (Fondasi &amp; Shadowing)</th>
                    <th className="py-3 px-4">Bulan 6 – 12 (Kemandirian &amp; Estafet)</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                  {perintisanMilestoneList.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap ${getBadgeToneClass(
                            row.tone
                          )}`}
                        >
                          {row.aspect}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {row.m1}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {row.m2}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <CrudRowActions
                          onEdit={() => openCrudEdit('perintisanMilestone', row.id)}
                          onDelete={() =>
                            requestDeleteItem('perintisanMilestone', row.id, row.aspect)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
