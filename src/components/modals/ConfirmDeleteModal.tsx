import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import { ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { DeleteConfirmState } from '../../types';

const ConfirmDeleteSheet: React.FC<{
  state: DeleteConfirmState;
  onCancel: () => void;
}> = ({ state, onCancel }) => {
  const { confirmDeleteItem } = useApp();

  useEffect(() => {
    playUiMotionSound('pop');
  }, [state]);

  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose: onCancel,
  });

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
        className="w-full sm:max-w-md bg-white dark:bg-[#15181E] rounded-t-[28px] sm:rounded-[26px] border border-black/[0.12] dark:border-white/[0.10] shadow-2xl overflow-hidden flex flex-col animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2.5 cursor-grab active:cursor-grabbing touch-none shrink-0"
        >
          <div className="w-10 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-500/15 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-[#1C1D21] dark:text-white">
                Konfirmasi Hapus Data
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                Anda yakin ingin menghapus{' '}
                <span className="font-bold text-[#1C1D21] dark:text-white">
                  &ldquo;{state.label}&rdquo;
                </span>
                ? Perubahan tersimpan otomatis di browser Anda.
              </p>
            </div>
            <button
              type="button"
              onClick={animateClose}
              aria-label="Tutup"
              className="w-8 h-8 rounded-full bg-white dark:bg-[#232730] border border-black/[0.08] dark:border-white/[0.10] text-gray-500 dark:text-gray-300 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-end gap-2.5 pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button type="button" onClick={animateClose} className={ACTION_BTN_SECONDARY}>
              <span>Batal</span>
            </button>
            <button
              type="button"
              onClick={confirmDeleteItem}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 shrink-0" />
              <span>Ya, Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConfirmDeleteModal: React.FC = () => {
  const { deleteConfirm, cancelDeleteItem } = useApp();
  if (!deleteConfirm) return null;
  return <ConfirmDeleteSheet state={deleteConfirm} onCancel={cancelDeleteItem} />;
};
