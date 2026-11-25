import React, { useEffect, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { AddDocTarget } from '../../types';

const TARGET_OPTIONS: Array<{ value: AddDocTarget; label: string }> = [
  { value: 'value', label: 'Panduan · Value & Komitmen (Nilai / Komitmen)' },
  { value: 'rules', label: 'Panduan · Rules & Kedisiplinan (Aturan / Etika)' },
  { value: 'sop', label: 'Panduan · SOP Operasional (Modul SOP V5)' },
  { value: 'peran', label: 'Panduan · Peran & Struktur Tim (Bidang Ministry)' },
  { value: 'gms2', label: 'Platform GMS II (Lampiran WI / PR)' },
];

export const AddDocumentModal: React.FC = () => {
  const { isAddDocOpen, addDocDefaultTarget, closeAddDocModal, handleAddDocSubmit } = useApp();

  const [target, setTarget] = useState<AddDocTarget>(addDocDefaultTarget);
  const [title, setTitle] = useState('');
  const [categoryOrCode, setCategoryOrCode] = useState('');
  const [summary, setSummary] = useState('');
  const [bodyLines, setBodyLines] = useState('');

  useEffect(() => {
    if (isAddDocOpen) {
      setTarget(addDocDefaultTarget);
      playUiMotionSound('pop');
    }
  }, [isAddDocOpen, addDocDefaultTarget]);

  const handleClose = () => {
    setTitle('');
    setCategoryOrCode('');
    setSummary('');
    setBodyLines('');
    closeAddDocModal();
  };

  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose: handleClose,
  });

  if (!isAddDocOpen) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    handleAddDocSubmit({
      target,
      title,
      categoryOrCode,
      summary,
      bodyLines,
    });
    setTitle('');
    setCategoryOrCode('');
    setSummary('');
    setBodyLines('');
  };

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
        className="w-full sm:max-w-lg bg-white dark:bg-[#15181E] rounded-t-[28px] sm:rounded-[26px] border border-black/[0.12] dark:border-white/[0.10] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-bottom-sheet"
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
              Repositori Dokumen
            </span>
            <h3 className="text-[16px] font-bold text-[#1C1D21] dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#ee2e65]" /> Tambah Dokumen / Modul Baru
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

        <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto ui-scrollbar text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
              Target Halaman Modul
            </label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value as AddDocTarget)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white outline-none focus:border-[#ee2e65]"
            >
              {TARGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
              Judul Dokumen / Peran <span className="text-[#ee2e65]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: WI-08 Standar Kamera Gimbal"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                Kategori / Kode / Tag
              </label>
              <input
                type="text"
                value={categoryOrCode}
                onChange={(e) => setCategoryOrCode(e.target.value)}
                placeholder="Contoh: WI-08 / Bagian VIII / Live"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                Ringkasan Singkat
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Deskripsi 1 baris..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
              Isi Lengkap / Poin Jobdesk (1 baris = 1 poin)
            </label>
            <textarea
              rows={4}
              value={bodyLines}
              onChange={(e) => setBodyLines(e.target.value)}
              placeholder="Tuliskan detail SOP, aturan, atau poin jobdesk baris per baris..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button type="button" onClick={animateClose} className={ACTION_BTN_SECONDARY}>
              <X className="w-4 h-4 sm:hidden shrink-0" />
              <span>Batal</span>
            </button>
            <button type="submit" className={ACTION_BTN_PRIMARY}>
              <Check className="w-4 h-4 shrink-0" />
              <span>Simpan ke Halaman</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
