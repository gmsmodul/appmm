import React from 'react';
import { UiSkeleton, UiSkeletonGroup } from '../ui/UiSkeleton';

export const UiKitCategorySkeleton: React.FC = () => {
  return (
    <UiSkeletonGroup label="Memuat komponen UI KIT" className="space-y-8">
      {/* Page Title & Quick Jump Header Skeleton */}
      <div className="pb-4 border-b border-gray-200 dark:border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2.5">
          <UiSkeleton variant="rounded" className="h-7 w-48 rounded-lg" />
          <UiSkeleton variant="circular" width={18} height={18} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <UiSkeleton variant="text" className="h-3.5 w-24" />
          <UiSkeleton variant="text" className="h-3.5 w-28" />
          <UiSkeleton variant="text" className="h-3.5 w-20" />
        </div>
      </div>

      {/* Section Cards matching UiDocSection geometry */}
      {[1, 2].map((sectionIdx) => (
        <div key={sectionIdx} className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <UiSkeleton variant="rounded" className="h-5 w-52 rounded-md" />
            <UiSkeleton variant="pill" className="h-7 w-28" />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-white/[0.10] bg-white dark:bg-[#15181E] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 dark:border-white/[0.08] flex items-center gap-5">
              <UiSkeleton variant="text" className="h-3.5 w-12" />
              <UiSkeleton variant="text" className="h-3.5 w-10" />
              <UiSkeleton variant="text" className="h-3.5 w-12" />
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <UiSkeleton variant="rounded" className="h-24 w-full" />
                <UiSkeleton variant="rounded" className="h-24 w-full" />
                <UiSkeleton variant="rounded" className="h-24 w-full hidden lg:block" />
              </div>
              <UiSkeleton variant="rounded" className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </UiSkeletonGroup>
  );
};

