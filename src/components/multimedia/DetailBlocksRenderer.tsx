import React from 'react';
import { CAM_MATRIX_DATA, FD_HAND_SIGNALS_DATA } from '../../data/multimediaPlatformData';
import { DetailContentBlock } from '../../types';
import { getBadgeToneClass, getCalloutToneClass } from './toneClasses';

interface DetailBlocksRendererProps {
  blocks: DetailContentBlock[];
}

export const DetailBlocksRenderer: React.FC<DetailBlocksRendererProps> = ({ blocks }) => {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      {blocks.map((block, idx) => {
        if (block.kind === 'paragraph') {
          return (
            <p key={idx} className="text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
              {block.text}
            </p>
          );
        }

        if (block.kind === 'metaBox') {
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#F9FAFC] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08] text-xs space-y-1.5"
            >
              {block.lines.map((line, lIdx) => (
                <div key={lIdx}>
                  <span className="font-bold text-gray-900 dark:text-white">{line.label}:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-300">{line.value}</span>
                </div>
              ))}
            </div>
          );
        }

        if (block.kind === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <div key={idx} className="space-y-2">
              {block.title && (
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {block.title}
                </div>
              )}
              <ListTag
                className={`${
                  block.ordered ? 'list-decimal' : 'list-disc'
                } pl-5 space-y-2 text-[13.5px] text-gray-700 dark:text-gray-300`}
              >
                {block.items.map((item, iIdx) => (
                  <li key={iIdx}>
                    {item.lead && (
                      <strong className="text-gray-900 dark:text-white">{item.lead}: </strong>
                    )}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ListTag>
            </div>
          );
        }

        if (block.kind === 'callout') {
          const toneStyle = getCalloutToneClass(block.tone);
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <div key={idx} className={`p-4 rounded-2xl border ${toneStyle.wrapper}`}>
              {block.title && (
                <div className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${toneStyle.title}`}>
                  {block.title}
                </div>
              )}
              {block.text && (
                <p className="text-[13.5px] leading-relaxed text-gray-800 dark:text-gray-200">
                  {block.text}
                </p>
              )}
              {block.items && block.items.length > 0 && (
                <ListTag
                  className={`${
                    block.ordered ? 'list-decimal' : 'list-disc'
                  } pl-5 space-y-1.5 text-[13px] text-gray-700 dark:text-gray-300 ${
                    block.text ? 'mt-2' : ''
                  }`}
                >
                  {block.items.map((item, iIdx) => (
                    <li key={iIdx}>
                      {item.lead && (
                        <strong className="text-gray-900 dark:text-white">{item.lead}: </strong>
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ListTag>
              )}
            </div>
          );
        }

        if (block.kind === 'fdSignalsTable') {
          return (
            <div
              key={idx}
              className="border border-black/[0.10] dark:border-white/[0.10] rounded-2xl overflow-hidden bg-white dark:bg-[#15181E]"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] text-gray-500 dark:text-gray-400 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Isyarat</th>
                      <th className="py-2.5 px-3">Gerakan</th>
                      <th className="py-2.5 px-3">Arti</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    {FD_HAND_SIGNALS_DATA.map((s) => (
                      <tr key={s.code}>
                        <td className="py-2.5 px-3 font-bold text-gray-900 dark:text-white">
                          {s.code}
                        </td>
                        <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">
                          {s.gesture}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-[#ee2e65] dark:text-[#f895b5]">
                          {s.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        if (block.kind === 'camMatrixTable') {
          return (
            <div
              key={idx}
              className="border border-black/[0.10] dark:border-white/[0.10] rounded-2xl overflow-hidden bg-white dark:bg-[#15181E]"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#F9FAFC] dark:bg-[#1B1E24] border-b border-black/[0.08] dark:border-white/[0.08] text-gray-500 dark:text-gray-400 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Kamera</th>
                      <th className="py-2.5 px-3">Rig</th>
                      <th className="py-2.5 px-3">Lensa</th>
                      <th className="py-2.5 px-3">Tugas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    {CAM_MATRIX_DATA.map((c) => (
                      <tr key={c.cam}>
                        <td className="py-2.5 px-3 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                          {c.cam}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold border whitespace-nowrap ${getBadgeToneClass(
                              c.tone
                            )}`}
                          >
                            {c.rig}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{c.lens}</td>
                        <td className="py-2.5 px-3 text-gray-700 dark:text-gray-300">{c.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
