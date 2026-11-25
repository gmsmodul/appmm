import React, { useEffect } from 'react';
import { CheckCircle2, Pencil, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { DetailBlocksRenderer } from '../multimedia/DetailBlocksRenderer';
import { getBadgeToneClass } from '../multimedia/toneClasses';
import { CrudEntityType, MultimediaDetailModalPayload } from '../../types';

const MultimediaDetailSheet: React.FC<{
  payload: MultimediaDetailModalPayload;
  onClose: () => void;
}> = ({ payload, onClose }) => {
  const { openCrudEdit, requestDeleteItem, orgV2Nodes } = useApp();
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose,
  });

  useEffect(() => {
    playUiMotionSound('pop');
  }, [payload]);

  let badge = '';
  let title = '';
  let subtitle = '';
  let crudEntity: CrudEntityType = 'rule';
  let crudItemId = '';
  let deleteLabel = '';

  switch (payload.kind) {
    case 'pillar':
      badge = `BIDANG EKOSISTEM • ${payload.pillar.group}`;
      title = payload.pillar.name;
      subtitle = payload.pillar.role;
      crudEntity = 'pillar';
      crudItemId = payload.pillar.id;
      deleteLabel = payload.pillar.name;
      break;
    case 'rule':
      badge = `${payload.rule.category.toUpperCase()} • ${payload.rule.type}`;
      title = payload.rule.title;
      subtitle = payload.rule.summary;
      crudEntity = 'rule';
      crudItemId = payload.rule.id;
      deleteLabel = payload.rule.title;
      break;
    case 'sop':
      badge = `BAGIAN ${payload.sop.section} • #${payload.sop.num} • ${payload.sop.type}`;
      title = payload.sop.title;
      subtitle = payload.sop.summary;
      crudEntity = 'sop';
      crudItemId = payload.sop.id;
      deleteLabel = payload.sop.title;
      break;
    case 'orgNode':
      badge = `${payload.versionTag} • ${payload.node.badge} • ${payload.node.unit}`;
      title = payload.node.title;
      subtitle = payload.node.summary;
      crudEntity =
        orgV2Nodes.some((n) => n.id === payload.node.id) || payload.node.id.startsWith('v2-')
          ? 'orgNodeV2'
          : 'orgNodeV1';
      crudItemId = payload.node.id;
      deleteLabel = payload.node.title;
      break;
    case 'jabatan': {
      const pageLabel = payload.jabatan.pages.toLowerCase().startsWith('hal')
        ? payload.jabatan.pages
        : `Hal. ${payload.jabatan.pages}`;
      badge = `PLATFORM GMS II • JABATAN #${payload.jabatan.num} • ${payload.jabatan.nature}`;
      title = payload.jabatan.title;
      subtitle = `${payload.jabatan.desc} (${pageLabel})`;
      crudEntity = 'jabatan';
      crudItemId = payload.jabatan.id || payload.jabatan.num;
      deleteLabel = payload.jabatan.title;
      break;
    }
    case 'level':
      badge = `JENJANG KARIER • ${payload.level.grade}`;
      title = `${payload.level.grade} — ${payload.level.role}`;
      subtitle = payload.level.scope;
      crudEntity = 'level';
      crudItemId = payload.level.id || payload.level.grade;
      deleteLabel = `${payload.level.grade} — ${payload.level.role}`;
      break;
    case 'wipr':
      badge = `PLATFORM GMS II • ${payload.item.code} (${payload.item.type})`;
      title = payload.item.title;
      subtitle = payload.item.summary;
      crudEntity = 'wipr';
      crudItemId = payload.item.id;
      deleteLabel = `${payload.item.code} — ${payload.item.title}`;
      break;
    case 'gms2Form':
      badge = `PLATFORM GMS II • FORMULIR LAMPIRAN • ${payload.item.code}`;
      title = payload.item.title;
      subtitle = payload.item.summary;
      crudEntity = 'gms2Form';
      crudItemId = payload.item.id;
      deleteLabel = `${payload.item.code} — ${payload.item.title}`;
      break;
    case 'ministryRole':
      badge = `BUKU SAKU MINISTRY • BIDANG #${payload.role.num} • ${payload.role.group}`;
      title = payload.role.name;
      subtitle = payload.role.req;
      crudEntity = 'ministryRole';
      crudItemId = payload.role.id || payload.role.num;
      deleteLabel = payload.role.name;
      break;
  }

  return (
    <div
      ref={backdropRef}
      data-modal-sheet-backdrop="true"
      onClick={animateClose}
      className="animate-ui-fade fixed inset-0 z-50 bg-black/40 dark:bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 no-print"
    >
      <div
        ref={setSheetElement}
        {...sheetGestureProps}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl bg-white dark:bg-[#15181E] rounded-t-[28px] sm:rounded-[26px] border border-black/[0.12] dark:border-white/[0.10] shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2.5 cursor-grab active:cursor-grabbing touch-none shrink-0"
        >
          <div className="w-10 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-start justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider text-[#ee2e65] dark:text-[#f895b5] mb-1">
              {badge}
            </span>
            <h3 className="text-[17px] font-bold text-[#1C1D21] dark:text-white leading-snug">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={animateClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#232730] border border-black/[0.08] dark:border-white/[0.10] hover:border-[#ee2e65] text-gray-500 dark:text-gray-300 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto ui-scrollbar space-y-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {payload.kind === 'pillar' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Tanggung Jawab Inti
                </div>
                <p className="text-[13.5px] text-gray-800 dark:text-gray-200 leading-relaxed">
                  {payload.pillar.responsibility}
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Job Desk Utama
                </div>
                <ul className="space-y-2">
                  {payload.pillar.jobdesk.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13.5px]">
                      <CheckCircle2 className="w-4 h-4 text-[#ee2e65] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border border-[#FBC2D4] dark:border-[#ee2e65]/30">
                <div className="text-xs font-bold text-[#9D113C] dark:text-[#f895b5] uppercase tracking-wider mb-1">
                  Contoh SOP Dasar
                </div>
                <p className="text-[13.5px] text-gray-800 dark:text-gray-200 leading-relaxed">
                  {payload.pillar.baseSop}
                </p>
              </div>
            </div>
          )}

          {payload.kind === 'rule' && <DetailBlocksRenderer blocks={payload.rule.blocks} />}

          {payload.kind === 'sop' && <DetailBlocksRenderer blocks={payload.sop.blocks} />}

          {payload.kind === 'wipr' && <DetailBlocksRenderer blocks={payload.item.blocks} />}

          {payload.kind === 'gms2Form' && <DetailBlocksRenderer blocks={payload.item.blocks} />}

          {payload.kind === 'orgNode' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Ringkasan Peran
                </div>
                <p className="text-[13.5px] text-gray-800 dark:text-gray-200 leading-relaxed">
                  {payload.node.summary}
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Job Desk &amp; Kewenangan Utama
                </div>
                <ul className="space-y-2">
                  {payload.node.duties.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13.5px]">
                      <CheckCircle2 className="w-4 h-4 text-[#ee2e65] shrink-0 mt-0.5" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {payload.node.baseSop && (
                <div className="p-4 rounded-2xl bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border border-[#FBC2D4] dark:border-[#ee2e65]/30">
                  <div className="text-xs font-bold text-[#9D113C] dark:text-[#f895b5] uppercase tracking-wider mb-1">
                    Dasar SOP Bidang
                  </div>
                  <p className="text-[13.5px] text-gray-800 dark:text-gray-200 leading-relaxed">
                    {payload.node.baseSop}
                  </p>
                </div>
              )}
            </div>
          )}

          {payload.kind === 'jabatan' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border border-[#FBC2D4] dark:border-[#ee2e65]/30">
                <div className="text-xs font-bold text-[#9D113C] dark:text-[#f895b5] uppercase tracking-wider mb-1">
                  1. Deskripsi Umum Jabatan
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-gray-800 dark:text-gray-200">
                  {payload.jabatan.deskripsiUmum.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  2. Deskripsi Detail Pekerjaan
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-[13.5px]">
                  {payload.jabatan.deskripsiDetail.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-500/12 border border-indigo-200 dark:border-indigo-500/30">
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-1">
                  3. Tujuan / Produk Kerja
                </div>
                <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-800 dark:text-gray-200">
                  {payload.jabatan.tujuanProduk.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08] text-xs">
                <span className="font-bold text-gray-900 dark:text-white">4. Kualifikasi: </span>
                <span>{payload.jabatan.kualifikasi}</span>
              </div>
            </div>
          )}

          {payload.kind === 'level' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]">
                  <div className="font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Syarat Rohani &amp; Masa Tugas
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {payload.level.msj} • {payload.level.duration}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 mt-0.5">
                    Kehadiran: {payload.level.attendance}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border border-[#FBC2D4] dark:border-[#ee2e65]/30">
                  <div className="font-bold text-[#9D113C] dark:text-[#f895b5] uppercase mb-1">
                    Modul Pembelajaran
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {payload.level.modul}
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-500/12 border border-indigo-200 dark:border-indigo-500/30">
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">
                  Filosofis &amp; Tujuan
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Filosofis:</strong> {payload.level.filosofis}
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-200">
                  <strong>Objektif:</strong> {payload.level.objektif}
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Spesifikasi Jabatan &amp; Pekerjaan
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
                  {payload.level.spesifikasi.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {payload.kind === 'ministryRole' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Kualifikasi &amp; Persyaratan Khusus
                </div>
                <p className="text-[13.5px] font-medium text-gray-900 dark:text-white">
                  {payload.role.req}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border border-[#FBC2D4] dark:border-[#ee2e65]/30">
                <div className="text-xs font-bold text-[#9D113C] dark:text-[#f895b5] uppercase tracking-wider mb-1.5">
                  Tugas Utama di Lapangan
                </div>
                <p className="text-[13.5px] text-gray-800 dark:text-gray-200 leading-relaxed">
                  {payload.role.duties}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Kategori Tim:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeToneClass(
                    'brand'
                  )}`}
                >
                  {payload.role.group}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openCrudEdit(crudEntity, crudItemId)}
              className={ACTION_BTN_SECONDARY}
            >
              <Pencil className="w-3.5 h-3.5 text-[#ee2e65]" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => requestDeleteItem(crudEntity, crudItemId, deleteLabel)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#232730] border border-red-200 dark:border-red-500/30 hover:border-red-500 text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>
          <button type="button" onClick={animateClose} className={ACTION_BTN_PRIMARY}>
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export const MultimediaDetailModal: React.FC = () => {
  const { detailModal, setDetailModal } = useApp();
  if (!detailModal) return null;
  return <MultimediaDetailSheet payload={detailModal} onClose={() => setDetailModal(null)} />;
};
