import React from 'react';
import { Pencil, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PillarItem } from '../../types';
import { ACTION_BTN_PRIMARY } from '../../constants/buttonStyles';
import { CrudRowActions, SectionAddButton } from '../multimedia/CrudRowActions';
import { PageAttachmentsBar } from '../multimedia/PageAttachmentsBar';

export const MultimediaOverviewPage: React.FC = () => {
  const {
    setActivePage,
    setPanduanSubtab,
    overviewTagline,
    pillarsList,
    openPillarModal,
    openCrudCreate,
    openCrudEdit,
    requestDeleteItem,
    bukuSakuValuesList,
    rulesList,
    crewChiefTimelineList,
    sopV5List,
    ministryRolesList,
  } = useApp();

  const pillarsByGroup = pillarsList.reduce<Record<string, PillarItem[]>>((acc, p) => {
    if (!acc[p.group]) acc[p.group] = [];
    acc[p.group].push(p);
    return acc;
  }, {});

  return (
    <div className="px-2.5 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 w-full space-y-5 ui-stagger">
      <PageAttachmentsBar page="overview" />

      {/* Centered Tagline Banner */}
      <div className="relative bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-[24px] p-5 sm:p-7 shadow-xs text-center">
        <button
          type="button"
          onClick={() => openCrudEdit('overviewTagline', 'default')}
          title="Edit Tagline & Keterangan"
          className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-[#232730] border border-black/[0.10] dark:border-white/[0.12] hover:border-[#ee2e65] hover:text-[#ee2e65] text-[11px] font-semibold text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
        >
          <Pencil className="w-3 h-3" />
          <span className="hidden sm:inline">Edit</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/20 border border-[#FBC2D4] dark:border-[#ee2e65]/35 text-[#9D113C] dark:text-[#f895b5] text-[11px] font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> {overviewTagline.badge}
        </span>
        <h2 className="text-xl sm:text-3xl font-bold text-[#1C1D21] dark:text-white tracking-tight">
          {overviewTagline.quote}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2.5 max-w-2xl mx-auto leading-relaxed">
          {overviewTagline.desc}
        </p>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setActivePage('gms2')}
          className="text-left bg-white dark:bg-[#15181E] p-4 rounded-2xl border border-black/[0.10] dark:border-white/[0.08] hover:border-[#ee2e65]/50 shadow-2xs transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Platform GMS II (Base)
          </div>
          <div className="text-2xl font-bold text-[#1C1D21] dark:text-white mt-1 tabular-nums">
            78 Hal. Lengkap
          </div>
          <div className="text-xs text-[#ee2e65] dark:text-[#f895b5] font-medium mt-1">
            Dokumen Induk Hal. 1–78 →
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanduanSubtab('rules');
            setActivePage('panduan');
          }}
          className="text-left bg-white dark:bg-[#15181E] p-4 rounded-2xl border border-black/[0.10] dark:border-white/[0.08] hover:border-[#ee2e65]/50 shadow-2xs transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Value &amp; Rules
          </div>
          <div className="text-2xl font-bold text-[#1C1D21] dark:text-white mt-1 tabular-nums">
            {bukuSakuValuesList.length + rulesList.length} Standar
          </div>
          <div className="text-xs text-[#ee2e65] dark:text-[#f895b5] font-medium mt-1">
            Nilai, Komitmen, Etika &amp; Sanksi →
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanduanSubtab('sop');
            setActivePage('panduan');
          }}
          className="text-left bg-white dark:bg-[#15181E] p-4 rounded-2xl border border-black/[0.10] dark:border-white/[0.08] hover:border-[#ee2e65]/50 shadow-2xs transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            SOP Operasional
          </div>
          <div className="text-2xl font-bold text-[#1C1D21] dark:text-white mt-1 tabular-nums">
            {sopV5List.length} Modul + {crewChiefTimelineList.length} Fase
          </div>
          <div className="text-xs text-[#ee2e65] dark:text-[#f895b5] font-medium mt-1">
            Crew Chief H-60 &amp; Manual V5 →
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanduanSubtab('peran');
            setActivePage('panduan');
          }}
          className="text-left bg-white dark:bg-[#15181E] p-4 rounded-2xl border border-black/[0.10] dark:border-white/[0.08] hover:border-[#ee2e65]/50 shadow-2xs transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Peran &amp; Struktur Tim
          </div>
          <div className="text-2xl font-bold text-[#1C1D21] dark:text-white mt-1 tabular-nums">
            {ministryRolesList.length} Bidang
          </div>
          <div className="text-xs text-[#ee2e65] dark:text-[#f895b5] font-medium mt-1">
            Team Ministry &amp; Team Leader →
          </div>
        </button>
      </div>

      {/* Sectioned Ekosistem Tables */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1C1D21] dark:text-white">
            Konsep 5 Bidang Ekosistem Multimedia
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Klik baris untuk membaca Jobdesk &amp; SOP Dasar, atau tambah / ubah / hapus item tiap bagian.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openCrudCreate('pillar')}
          className={ACTION_BTN_PRIMARY}
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Tambah Bidang</span>
        </button>
      </div>

      {Object.keys(pillarsByGroup).length === 0 ? (
        <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl p-10 text-center space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Belum ada bidang ekosistem terdaftar.
          </p>
          <button
            type="button"
            onClick={() => openCrudCreate('pillar')}
            className={ACTION_BTN_PRIMARY}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Tambah Bidang Pertama</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5 ui-stagger">
          {Object.entries(pillarsByGroup).map(([groupName, items]) => (
            <div
              key={groupName}
              className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs"
            >
              <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wide truncate">
                    {groupName}
                  </h4>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                    {items.length} Bidang
                  </span>
                  <SectionAddButton
                    label="Tambah"
                    onClick={() => openCrudCreate('pillar', { group: groupName })}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] table-fixed text-left border-collapse">
                  <colgroup>
                    <col className="w-[64px]" />
                    <col className="w-[30%]" />
                    <col />
                    <col className="w-[172px]" />
                  </colgroup>
                  <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-4">No</th>
                      <th className="py-3 px-4">Nama Bidang</th>
                      <th className="py-3 px-4">Tanggung Jawab Utama</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
                    {items.map((p, idx) => (
                      <tr
                        key={p.id}
                        onClick={() => openPillarModal(p.id)}
                        className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-bold text-gray-400 dark:text-gray-500 tabular-nums align-middle">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3.5 px-4 align-middle">
                          <div className="min-w-0">
                            <div className="font-bold text-[#1C1D21] dark:text-white leading-snug break-words">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {p.role}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 leading-relaxed break-words align-middle">
                          {p.responsibility}
                        </td>
                        <td className="py-3.5 px-4 text-right align-middle">
                          <CrudRowActions
                            onDetail={() => openPillarModal(p.id)}
                            onEdit={() => openCrudEdit('pillar', p.id)}
                            onDelete={() => requestDeleteItem('pillar', p.id, p.name)}
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
  );
};
