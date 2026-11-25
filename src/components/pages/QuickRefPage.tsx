import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CrudRowActions, SectionAddButton } from '../multimedia/CrudRowActions';
import { PageAttachmentsBar } from '../multimedia/PageAttachmentsBar';
import { getBadgeToneClass } from '../multimedia/toneClasses';

export const QuickRefPage: React.FC = () => {
  const {
    camMatrixList,
    fdSignalsList,
    levelingList,
    churchCategoriesList,
    openLevelModal,
    openCrudCreate,
    openCrudEdit,
    requestDeleteItem,
  } = useApp();

  const [filter, setFilter] = useState('');
  const q = filter.trim().toLowerCase();

  const cams = useMemo(
    () =>
      camMatrixList.filter(
        (c) =>
          !q ||
          c.cam.toLowerCase().includes(q) ||
          c.rig.toLowerCase().includes(q) ||
          c.lens.toLowerCase().includes(q) ||
          c.notes.toLowerCase().includes(q)
      ),
    [camMatrixList, q]
  );

  const signals = useMemo(
    () =>
      fdSignalsList.filter(
        (s) =>
          !q ||
          s.code.toLowerCase().includes(q) ||
          s.gesture.toLowerCase().includes(q) ||
          s.meaning.toLowerCase().includes(q)
      ),
    [fdSignalsList, q]
  );

  const levels = useMemo(
    () =>
      levelingList.filter(
        (l) =>
          !q ||
          l.grade.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.scope.toLowerCase().includes(q) ||
          l.msj.toLowerCase().includes(q)
      ),
    [levelingList, q]
  );

  const cats = useMemo(
    () =>
      churchCategoriesList.filter(
        (c) =>
          !q ||
          c.cat.toLowerCase().includes(q) ||
          c.label.toLowerCase().includes(q) ||
          c.capacity.toLowerCase().includes(q) ||
          c.staffMM.toLowerCase().includes(q) ||
          c.equip.toLowerCase().includes(q)
      ),
    [churchCategoriesList, q]
  );

  return (
    <div className="px-2.5 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 w-full space-y-5 ui-stagger">
      <PageAttachmentsBar page="quickref" />

      {/* Top Filter Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1C1D21] dark:text-white">
            4 Tabel Referensi Cepat Lapangan
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ketik kata kunci untuk menyaring atau kelola langsung matriks kamera, isyarat FD, leveling, dan kategori gereja.
          </p>
        </div>

        <div className="relative w-full sm:w-80 shrink-0">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter CAM, isyarat FD, kategori A-E..."
            className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] text-xs text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
          />
        </div>
      </div>

      {/* Table 1: CAM 1-9 */}
      <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
        <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
              Matriks Pembagian Kamera (CAM 1 – 9)
            </h4>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
              {cams.length} Kamera
            </span>
            <SectionAddButton
              label="Tambah"
              onClick={() => openCrudCreate('camMatrix')}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
            <colgroup>
              <col className="w-[128px]" />
              <col className="w-[152px]" />
              <col className="w-[22%]" />
              <col />
              <col className="w-[104px]" />
            </colgroup>
            <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3 px-4">Kamera</th>
                <th className="py-3 px-4">Rig / Mount</th>
                <th className="py-3 px-4">Lensa / Gear</th>
                <th className="py-3 px-4">Tugas Utama &amp; Framing</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
              {cams.map((c) => {
                const rowId = c.id || c.cam;
                return (
                  <tr key={rowId} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-[#1C1D21] dark:text-white whitespace-nowrap">
                      {c.cam}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                          c.tone
                        )}`}
                      >
                        {c.rig}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{c.lens}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {c.notes}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <CrudRowActions
                        onEdit={() => openCrudEdit('camMatrix', rowId)}
                        onDelete={() => requestDeleteItem('camMatrix', rowId, c.cam)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Isyarat Tangan FD */}
      <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
        <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
              10 Isyarat Tangan Floor Director (FD)
            </h4>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
              {signals.length} Isyarat
            </span>
            <SectionAddButton
              label="Tambah"
              onClick={() => openCrudCreate('fdSignal')}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] table-fixed text-left border-collapse">
            <colgroup>
              <col className="w-[144px]" />
              <col className="w-[34%]" />
              <col />
              <col className="w-[104px]" />
            </colgroup>
            <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Gerakan Tangan</th>
                <th className="py-3 px-4">Arti / Tindakan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
              {signals.map((s) => {
                const rowId = s.id || s.code;
                return (
                  <tr key={rowId} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                      {s.code}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{s.gesture}</td>
                    <td className="py-3 px-4 font-medium text-[#1C1D21] dark:text-white">
                      {s.meaning}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <CrudRowActions
                        onEdit={() => openCrudEdit('fdSignal', rowId)}
                        onDelete={() =>
                          requestDeleteItem('fdSignal', rowId, `${s.code} — ${s.meaning}`)
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

      {/* Table 3: Ringkasan Jenjang Trainee - Bintang 4 */}
      <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
        <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
              Ringkasan Jenjang Pelayan (Trainee – Bintang 4)
            </h4>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
              {levels.length} Jenjang
            </span>
            <SectionAddButton
              label="Tambah"
              onClick={() => openCrudCreate('level')}
            />
          </div>
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
            <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Peran</th>
                <th className="py-3 px-4">Syarat MSJ &amp; Masa</th>
                <th className="py-3 px-4">Lingkup Wewenang</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
              {levels.map((l) => {
                const rowId = l.id || l.grade;
                return (
                  <tr
                    key={rowId}
                    onClick={() => openLevelModal(rowId)}
                    className="hover:bg-[#FEF1F5]/35 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                          l.tone
                        )}`}
                      >
                        {l.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1C1D21] dark:text-white">{l.role}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {l.msj} • {l.duration}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{l.scope}</td>
                    <td className="py-3 px-4 text-right">
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

      {/* Table 4: Kategori A-E */}
      <div className="bg-white dark:bg-[#15181E] border border-black/[0.10] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
        <div className="px-4 sm:px-5 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-white uppercase tracking-wide truncate">
              Indikator Kategori Gereja (Kategori A – E)
            </h4>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
              {cats.length} Kategori
            </span>
            <SectionAddButton
              label="Tambah"
              onClick={() => openCrudCreate('churchCat')}
            />
          </div>
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
            <thead className="bg-[#F9FAFC]/60 dark:bg-[#1B1E24]/50 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Kapasitas</th>
                <th className="py-3 px-4">Staff MM</th>
                <th className="py-3 px-4">Relawan</th>
                <th className="py-3 px-4">Perangkat Minimal</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] text-xs sm:text-[13px]">
              {cats.map((c) => {
                const rowId = c.id || c.cat;
                const catLabel = c.cat.toLowerCase().startsWith('kategori')
                  ? c.cat
                  : `Kategori ${c.cat}`;
                return (
                  <tr key={rowId} className="hover:bg-[#F9FAFC] dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-[#ee2e65] dark:text-[#f895b5] whitespace-nowrap">
                      {catLabel} ({c.label})
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1C1D21] dark:text-white">
                      {c.capacity}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{c.staffMM}</td>
                    <td className="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-300">
                      {c.relawan}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{c.equip}</td>
                    <td className="py-3 px-4 text-right">
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
  );
};
