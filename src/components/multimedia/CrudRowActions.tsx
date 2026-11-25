import React from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

interface CrudRowActionsProps {
  onDetail?: () => void;
  detailLabel?: string;
  onEdit: () => void;
  onDelete?: () => void;
}

export const CrudRowActions: React.FC<CrudRowActionsProps> = ({
  onDetail,
  detailLabel = 'Detail',
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="inline-flex items-center justify-end gap-1.5 whitespace-nowrap"
      onClick={(e) => e.stopPropagation()}
    >
      {onDetail && (
        <button
          type="button"
          onClick={onDetail}
          title={detailLabel}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5] hover:bg-[#FDE0E9] dark:hover:bg-[#ee2e65]/30 text-[11px] font-semibold transition-colors cursor-pointer"
        >
          <Eye className="w-3 h-3" />
          <span className="hidden sm:inline">{detailLabel}</span>
        </button>
      )}
      <button
        type="button"
        onClick={onEdit}
        title="Edit"
        aria-label="Edit item"
        className="w-7 h-7 rounded-full bg-white dark:bg-[#232730] border border-black/[0.10] dark:border-white/[0.12] hover:border-[#ee2e65] hover:text-[#ee2e65] text-gray-500 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          title="Hapus"
          aria-label="Hapus item"
          className="w-7 h-7 rounded-full bg-white dark:bg-[#232730] border border-black/[0.10] dark:border-white/[0.12] hover:border-red-500 hover:text-red-500 text-gray-500 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

interface SectionAddButtonProps {
  label?: string;
  onClick: () => void;
}

export const SectionAddButton: React.FC<SectionAddButtonProps> = ({
  label = 'Tambah',
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ee2e65] hover:bg-[#d82256] text-white text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
    >
      <Plus className="w-3 h-3 shrink-0" />
      <span>{label}</span>
    </button>
  );
};
