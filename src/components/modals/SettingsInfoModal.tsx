import React, { useEffect } from 'react';
import { BookOpen, RotateCcw, Settings, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';

export const SettingsInfoModal: React.FC = () => {
  const { isSettingsInfoOpen, setIsSettingsInfoOpen, resetAllPlatformData } = useApp();

  useEffect(() => {
    if (isSettingsInfoOpen) {
      playUiMotionSound('pop');
    }
  }, [isSettingsInfoOpen]);

  const handleClose = () => setIsSettingsInfoOpen(false);
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose: handleClose,
  });

  if (!isSettingsInfoOpen) return null;

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
        className="w-full sm:max-w-lg bg-white dark:bg-[#15181E] rounded-t-[28px] sm:rounded-[26px] border border-black/[0.12] dark:border-white/[0.10] shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2.5 cursor-grab active:cursor-grabbing touch-none shrink-0"
        >
          <div className="w-10 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        </div>

        <div className="px-6 py-4 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider text-[#ee2e65] dark:text-[#f895b5]">
              Multimedia Platform Hub
            </span>
            <h3 className="text-[16px] font-bold text-[#1C1D21] dark:text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#ee2e65]" /> Info Sistem &amp; Cakupan Dokumen
            </h3>
          </div>
          <button
            type="button"
            onClick={animateClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#232730] border border-black/[0.08] dark:border-white/[0.10] hover:border-[#ee2e65] text-gray-500 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto ui-scrollbar text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-[13.5px]">
            <strong>Multimedia Platform — GMS Ecosystem &amp; SOP Hub</strong> mengonsolidasikan dokumen resmi Departemen Multimedia GMS ke dalam arsitektur UI Kit terpadu:
          </p>
          <div className="p-4 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]">
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#ee2e65]" /> Cakupan Dokumen Terkonsolidasi
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
              <li>
                <strong>Konsep 5 Bidang Ekosistem:</strong> System, Tools, Advancement, Relations, Servolution.
              </li>
              <li>
                <strong>Platform GMS II Rev II (Base Platform • 78 Hal.):</strong> Pengantar &amp; Visi, Struktur V1 &amp; V2 Synodal, 5 Jabatan Staff, Framework Leveling Trainee–Bintang 4, Servolution, 8 Regional &amp; Kategori Gereja A–E, 6 Prinsip &amp; Akuntabilitas, TPS 14 Langkah, Lampiran WI/PR (WI-01 s/d PR-03) &amp; 6 Formulir Standar.
              </li>
              <li>
                <strong>Panduan, SOP &amp; Rules Terpadu (4 Kategori tanpa duplikasi):</strong> menggabungkan Buku Saku Ministry, Manual SOP V5, dan Rules &amp; Kedisiplinan menjadi <em>Value &amp; Komitmen</em>, <em>Rules &amp; Kedisiplinan</em> (termasuk Tata Tertib MCR &amp; Kode Etik Kamera), <em>SOP Operasional</em> (Crew Chief H-60 + 20 Modul V5 Bagian I–VI), serta <em>Peran &amp; Struktur Tim</em> (17 Bidang Team Ministry &amp; 3 Divisi Team Leader).
              </li>
              <li>
                <strong>Workshop Dasar Gereja Perintisan:</strong> Kurikulum 4 Materi, Metode 1 vs Metode 2, Target Pendampingan Regional &amp; Milestone.
              </li>
              <li>
                <strong>Referensi Cepat:</strong> Matriks CAM 1–9, 10 Isyarat Tangan FD, Leveling &amp; Kategori Gereja A–E.
              </li>
            </ul>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border border-[#FBC2D4] dark:border-[#ee2e65]/30 text-xs text-[#9D113C] dark:text-[#f895b5]">
            Dokumen tambahan dan tautan eksternal yang Anda buat tersimpan secara lokal di browser dan langsung dapat dicari lewat Pencarian Global (<kbd className="font-mono font-bold">⌘K</kbd>).
          </div>
        </div>

        <div className="px-6 py-3.5 bg-[#F9FAFC] dark:bg-[#1B1E24] border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetAllPlatformData();
                animateClose();
              }}
              className={ACTION_BTN_SECONDARY}
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Reset Data Default</span>
            </button>
          </div>
          <button type="button" onClick={animateClose} className={ACTION_BTN_PRIMARY}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
