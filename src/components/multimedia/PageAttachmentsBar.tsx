import React from 'react';
import { ExternalLink, FileText, Paperclip, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SpaModulePageId } from '../../types';

interface PageAttachmentsBarProps {
  page: SpaModulePageId;
}

export const PageAttachmentsBar: React.FC<PageAttachmentsBarProps> = ({ page }) => {
  const { pageAttachments, openAttachModal, removePageAttachment } = useApp();
  const list = pageAttachments[page] || [];

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => openAttachModal(page)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.12] dark:border-white/[0.12] hover:border-[#ee2e65] dark:hover:border-[#ee2e65] text-xs font-semibold text-gray-700 dark:text-gray-200 hover:text-[#ee2e65] dark:hover:text-[#f895b5] transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Paperclip className="w-3.5 h-3.5 text-[#ee2e65]" />
        <span>Attach Dokumen</span>
      </button>

      {list.map((item) => {
        const isFile = item.kind === 'file';
        return (
          <div
            key={item.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#1B1E24] border border-black/[0.10] dark:border-white/[0.10] text-xs shadow-2xs max-w-full"
          >
            {isFile ? (
              <FileText className="w-3.5 h-3.5 text-[#ee2e65] shrink-0" />
            ) : (
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            )}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              download={isFile ? item.name : undefined}
              className="font-semibold text-gray-800 dark:text-gray-100 hover:text-[#ee2e65] dark:hover:text-[#f895b5] truncate max-w-[190px] sm:max-w-[260px]"
              title={`${item.name} (${item.meta})`}
            >
              {item.name}
            </a>
            <span className="text-[10.5px] text-gray-500 dark:text-gray-400 hidden sm:inline shrink-0">
              ({item.meta})
            </span>
            <button
              type="button"
              onClick={() => removePageAttachment(page, item.id)}
              className="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer shrink-0"
              title="Hapus lampiran"
              aria-label={`Hapus lampiran ${item.name}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
