import React, { useEffect, useState } from 'react';
import { Check, Pencil, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { CRUD_ENTITY_SCHEMAS } from '../multimedia/crudSchemas';
import { CrudModalState } from '../../types';

const CrudEntitySheet: React.FC<{
  modalState: CrudModalState;
  onClose: () => void;
}> = ({ modalState, onClose }) => {
  const { saveCrudItem } = useApp();
  const schema = CRUD_ENTITY_SCHEMAS[modalState.entity];
  const [values, setValues] = useState<Record<string, string>>(modalState.initialValues);

  useEffect(() => {
    setValues(modalState.initialValues);
    playUiMotionSound('pop');
  }, [modalState]);

  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCrudItem(modalState.entity, values, modalState.itemId);
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
        className="w-full sm:max-w-xl bg-white dark:bg-[#15181E] rounded-t-[28px] sm:rounded-[26px] border border-black/[0.12] dark:border-white/[0.10] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2.5 cursor-grab active:cursor-grabbing touch-none shrink-0"
        >
          <div className="w-10 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        </div>

        <div className="px-6 py-4 bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider text-[#ee2e65] dark:text-[#f895b5]">
              {schema.sectionBadge}
            </span>
            <h3 className="text-[16px] font-bold text-[#1C1D21] dark:text-white flex items-center gap-2 truncate">
              {modalState.mode === 'create' ? (
                <Plus className="w-4 h-4 text-[#ee2e65] shrink-0" />
              ) : (
                <Pencil className="w-4 h-4 text-[#ee2e65] shrink-0" />
              )}
              <span className="truncate">
                {modalState.mode === 'create' ? schema.createTitle : schema.editTitle}
              </span>
            </h3>
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

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto ui-scrollbar text-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {schema.fields.map((field) => {
              const spanClass = field.halfWidth ? 'sm:col-span-1' : 'sm:col-span-2';
              const val = values[field.key] ?? '';
              return (
                <div key={field.key} className={spanClass}>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                    {field.label}
                    {field.required && <span className="text-[#ee2e65] ml-0.5">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={field.rows || 3}
                      required={field.required}
                      value={val}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={val}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white outline-none focus:border-[#ee2e65]"
                    >
                      {(field.options || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      required={field.required}
                      value={val}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1B1E24] border border-black/[0.14] dark:border-white/[0.12] text-sm text-[#1C1D21] dark:text-white placeholder:text-gray-400 outline-none focus:border-[#ee2e65]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button type="button" onClick={animateClose} className={ACTION_BTN_SECONDARY}>
              <X className="w-4 h-4 sm:hidden shrink-0" />
              <span>Batal</span>
            </button>
            <button type="submit" className={ACTION_BTN_PRIMARY}>
              <Check className="w-4 h-4 shrink-0" />
              <span>{modalState.mode === 'create' ? 'Tambahkan' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CrudEntityModal: React.FC = () => {
  const { crudModal, closeCrudModal } = useApp();
  if (!crudModal) return null;
  return <CrudEntitySheet modalState={crudModal} onClose={closeCrudModal} />;
};
