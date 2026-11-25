import React, { useEffect, useState } from 'react';
import { Check, Link2, Paperclip, Upload, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { PAGE_LABELS_MAP } from '../../data/multimediaPlatformData';
import { SpaModulePageId } from '../../types';

const PAGE_OPTIONS: Array<{ value: SpaModulePageId; label: string }> = [
  { value: 'overview', label: PAGE_LABELS_MAP.overview },
  { value: 'orgchart', label: PAGE_LABELS_MAP.orgchart },
  { value: 'gms2', label: PAGE_LABELS_MAP.gms2 },
  { value: 'panduan', label: PAGE_LABELS_MAP.panduan },
  { value: 'perintisan', label: PAGE_LABELS_MAP.perintisan },
  { value: 'quickref', label: PAGE_LABELS_MAP.quickref },
];

export const AttachDocumentModal: React.FC = () => {
  const {
    isAttachDocOpen,
    attachDefaultPage,
    closeAttachModal,
    attachPageDocument,
    triggerToast,
  } = useApp();

  const [targetPage, setTargetPage] = useState<SpaModulePageId>(attachDefaultPage);
  const [attachMode, setAttachMode] = useState<'file' | 'link'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    if (isAttachDocOpen) {
      setTargetPage(attachDefaultPage);
      playUiMotionSound('pop');
    }
  }, [isAttachDocOpen, attachDefaultPage]);

  const resetAndClose = () => {
    setSelectedFile(null);
    setLinkTitle('');
    setLinkUrl('');
    closeAttachModal();
  };

  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose: resetAndClose,
  });

  if (!isAttachDocOpen) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attachMode === 'file') {
      if (!selectedFile) {
        triggerToast('File Belum Dipilih', 'Pilih file dokumen terlebih dahulu.', 'warning');
        return;
      }
      const sizeKb = Math.max(1, Math.round(selectedFile.size / 1024));
      const meta =
        sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
      const objectUrl = URL.createObjectURL(selectedFile);
      attachPageDocument(targetPage, {
        name: selectedFile.name,
        kind: 'file',
        url: objectUrl,
        meta,
      });
      resetAndClose();
      return;
    }

    if (!linkUrl.trim()) {
      triggerToast('URL Kosong', 'Masukkan URL tautan dokumen terlebih dahulu.', 'warning');
      return;
    }
    const cleanUrl = linkUrl.trim();
    attachPageDocument(targetPage, {
      name: linkTitle.trim() || cleanUrl,
      kind: 'link',
      url: cleanUrl,
      meta: 'Tautan Eksternal',
    });
    resetAndClose();
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
        className="w-full sm:max-w-md bg-white dark:bg-[#15181E] rounded-t-[28px] sm:rounded-[26px] border border-black/[0.12] dark:border-white/[0.10] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-bottom-sheet"
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
              Lampiran Halaman
            </span>
            <h3 className="text-[16px] font-bold text-[#1C1D21] dark:text-white flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#ee2e65]" /> Lampirkan Dokumen
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
              Halaman Tujuan
            </label>
            <select
              value={targetPage}
              onChange={(e) => setTargetPage(e.target.value as SpaModulePageId)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white outline-none focus:border-[#ee2e65]"
            >
              {PAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAttachMode('file')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                attachMode === 'file'
                  ? 'border-[#ee2e65] bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5]'
                  : 'border-black/[0.12] dark:border-white/[0.12] bg-white dark:bg-[#1B1E24] text-gray-600 dark:text-gray-300'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>
            <button
              type="button"
              onClick={() => setAttachMode('link')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                attachMode === 'link'
                  ? 'border-[#ee2e65] bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5]'
                  : 'border-black/[0.12] dark:border-white/[0.12] bg-white dark:bg-[#1B1E24] text-gray-600 dark:text-gray-300'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Link / URL</span>
            </button>
          </div>

          {attachMode === 'file' ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                Pilih File (PDF, DOCX, XLSX, PNG, JPG)
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-gray-600 dark:text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FEF1F5] dark:file:bg-[#ee2e65]/20 file:text-[#9D113C] dark:file:text-[#f895b5] hover:file:bg-[#FDE0E9] cursor-pointer"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                  Judul Tautan
                </label>
                <input
                  type="text"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="Contoh: Google Drive SOP Asli"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                  URL Tautan <span className="text-[#ee2e65]">*</span>
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2.5 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button type="button" onClick={animateClose} className={ACTION_BTN_SECONDARY}>
              <X className="w-4 h-4 sm:hidden shrink-0" />
              <span>Batal</span>
            </button>
            <button type="submit" className={ACTION_BTN_PRIMARY}>
              <Check className="w-4 h-4 shrink-0" />
              <span>Lampirkan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
