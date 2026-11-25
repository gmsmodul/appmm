import React from 'react';

export type UiSkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded' | 'pill';

export interface UiSkeletonProps {
  variant?: UiSkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  lastLineWidth?: string | number;
  lineClassName?: string;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<UiSkeletonVariant, string> = {
  text: 'rounded h-3.5',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-xl',
  pill: 'rounded-full',
};

function toCssSize(value?: string | number): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export const UiSkeleton: React.FC<UiSkeletonProps> = ({
  variant = 'rounded',
  width,
  height,
  lines = 1,
  lastLineWidth = '72%',
  lineClassName = '',
  animated = true,
  className = '',
  style,
  ariaLabel,
}) => {
  const shimmerClass = animated ? 'ui-skeleton-shimmer' : 'bg-gray-200 dark:bg-[#1B1E24]';

  if (lines > 1) {
    const count = Math.max(1, Math.floor(lines));
    return (
      <div
        role={ariaLabel ? 'status' : undefined}
        aria-busy={ariaLabel ? true : undefined}
        aria-label={ariaLabel}
        className={`space-y-2 ${className}`}
      >
        {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
        {Array.from({ length: count }).map((_, index) => {
          const isLast = index === count - 1;
          return (
            <div
              key={index}
              aria-hidden="true"
              style={{
                width: isLast ? toCssSize(lastLineWidth) : toCssSize(width) ?? '100%',
                height: toCssSize(height),
              }}
              className={`block ${VARIANT_CLASSES[variant === 'rounded' ? 'text' : variant]} ${shimmerClass} ${lineClassName}`}
            />
          );
        })}
      </div>
    );
  }

  const mergedStyle: React.CSSProperties = {
    ...(width !== undefined ? { width: toCssSize(width) } : {}),
    ...(height !== undefined ? { height: toCssSize(height) } : {}),
    ...style,
  };

  return (
    <div
      role={ariaLabel ? 'status' : undefined}
      aria-busy={ariaLabel ? true : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={mergedStyle}
      className={`block shrink-0 ${VARIANT_CLASSES[variant]} ${shimmerClass} ${className}`}
    >
      {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
    </div>
  );
};

export interface UiSkeletonGroupProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export const UiSkeletonGroup: React.FC<UiSkeletonGroupProps> = ({
  label = 'Memuat konten...',
  className = '',
  children,
}) => {
  return (
    <div role="status" aria-busy="true" aria-label={label} className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
};

export interface UiSkeletonCardProps {
  showMedia?: boolean;
  showAvatar?: boolean;
  lines?: number;
  showFooter?: boolean;
  animated?: boolean;
  className?: string;
}

export const UiSkeletonCard: React.FC<UiSkeletonCardProps> = ({
  showMedia = true,
  showAvatar = false,
  lines = 2,
  showFooter = true,
  animated = true,
  className = '',
}) => {
  return (
    <UiSkeletonGroup
      label="Memuat kartu..."
      className={`rounded-xl border border-gray-300 dark:border-white/[0.10] bg-white dark:bg-[#15181E] p-4 space-y-3 ${className}`}
    >
      {showMedia && (
        <UiSkeleton variant="rounded" className="h-28 w-full rounded-lg" animated={animated} />
      )}
      {showAvatar && (
        <div className="flex items-center gap-3">
          <UiSkeleton variant="circular" width={36} height={36} animated={animated} />
          <div className="flex-1 space-y-1.5">
            <UiSkeleton variant="text" className="h-3.5 w-36" animated={animated} />
            <UiSkeleton variant="text" className="h-2.5 w-24" animated={animated} />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <UiSkeleton variant="text" className="h-3.5 w-3/4" animated={animated} />
        {lines > 1 && (
          <UiSkeleton
            variant="text"
            lines={lines - 1}
            className="space-y-1.5"
            lineClassName="h-2.5"
            animated={animated}
          />
        )}
      </div>
      {showFooter && (
        <div className="flex items-center justify-between pt-1">
          <UiSkeleton variant="text" className="h-3 w-16" animated={animated} />
          <UiSkeleton variant="rounded" className="h-7 w-24 rounded-lg" animated={animated} />
        </div>
      )}
    </UiSkeletonGroup>
  );
};

export interface UiSkeletonListProps {
  rows?: number;
  showAvatar?: boolean;
  showTrailing?: boolean;
  animated?: boolean;
  className?: string;
}

export const UiSkeletonList: React.FC<UiSkeletonListProps> = ({
  rows = 3,
  showAvatar = true,
  showTrailing = true,
  animated = true,
  className = '',
}) => {
  return (
    <UiSkeletonGroup label="Memuat daftar..." className={`space-y-2.5 ${className}`}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 dark:border-white/[0.10] bg-white dark:bg-[#15181E]"
        >
          {showAvatar && (
            <UiSkeleton variant="rounded" className="w-9 h-9 rounded-lg" animated={animated} />
          )}
          <div className="flex-1 min-w-0 space-y-1.5">
            <UiSkeleton
              variant="text"
              className={`h-3 ${idx % 2 === 0 ? 'w-3/5' : 'w-1/2'}`}
              animated={animated}
            />
            <UiSkeleton
              variant="text"
              className={`h-2.5 ${idx % 2 === 0 ? 'w-4/5' : 'w-2/3'}`}
              animated={animated}
            />
          </div>
          {showTrailing && (
            <UiSkeleton variant="pill" className="w-14 h-5" animated={animated} />
          )}
        </div>
      ))}
    </UiSkeletonGroup>
  );
};

export interface UiSkeletonTableProps {
  rows?: number;
  columns?: number;
  animated?: boolean;
  className?: string;
}

export const UiSkeletonTable: React.FC<UiSkeletonTableProps> = ({
  rows = 4,
  columns = 3,
  animated = true,
  className = '',
}) => {
  const safeCols = Math.max(2, Math.min(5, columns));
  return (
    <UiSkeletonGroup
      label="Memuat tabel..."
      className={`border border-gray-300 dark:border-white/[0.10] rounded-xl overflow-hidden bg-white dark:bg-[#15181E] ${className}`}
    >
      <div className="px-4 py-2.5 bg-gray-50 dark:bg-[#181B21] border-b border-gray-300 dark:border-white/[0.08] flex items-center justify-between gap-3">
        {Array.from({ length: safeCols }).map((_, cIdx) => (
          <UiSkeleton
            key={cIdx}
            variant="text"
            className={`h-3 ${cIdx === 0 ? 'w-24' : 'w-16'}`}
            animated={animated}
          />
        ))}
      </div>
      <div className="divide-y divide-gray-200 dark:divide-white/[0.08]">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <UiSkeleton variant="circular" width={28} height={28} animated={animated} />
              <UiSkeleton
                variant="text"
                className={`h-3 ${rIdx % 2 === 0 ? 'w-28' : 'w-36'}`}
                animated={animated}
              />
            </div>
            {Array.from({ length: safeCols - 2 }).map((_, cIdx) => (
              <div key={cIdx} className="flex-1 flex justify-start">
                <UiSkeleton variant="text" className="h-2.5 w-20" animated={animated} />
              </div>
            ))}
            <div className="flex justify-end">
              <UiSkeleton variant="rounded" className="h-5 w-14 rounded-md" animated={animated} />
            </div>
          </div>
        ))}
      </div>
    </UiSkeletonGroup>
  );
};

export interface UiSkeletonSearchPanelProps {
  mode?: 'results' | 'recent-and-suggestions' | 'full';
  variant?: 'dropdown' | 'sheet';
  rows?: number;
  animated?: boolean;
  className?: string;
}

export const UiSkeletonSearchPanel: React.FC<UiSkeletonSearchPanelProps> = ({
  mode = 'results',
  variant = 'dropdown',
  rows = 4,
  animated = true,
  className = '',
}) => {
  const showRecentAndSuggestions = mode === 'recent-and-suggestions' || mode === 'full';
  const showResults = mode === 'results' || mode === 'full';
  const isSheet = variant === 'sheet';

  return (
    <UiSkeletonGroup
      label="Mencari komponen..."
      className={`${isSheet ? 'space-y-4' : 'p-2.5 space-y-3'} ${className}`}
    >
      {showRecentAndSuggestions && (
        <>
          {/* Recent Search Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <UiSkeleton variant="text" className="h-2.5 w-28" animated={animated} />
              <UiSkeleton variant="text" className="h-2.5 w-14" animated={animated} />
            </div>
            <div className="space-y-1.5">
              {[0, 1].map((idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-2.5 ${
                    isSheet
                      ? 'px-3.5 py-2.5 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]'
                      : 'px-2.5 py-2 rounded-lg bg-gray-50/70 dark:bg-[#1B1E24]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <UiSkeleton variant="circular" width={16} height={16} animated={animated} />
                    <UiSkeleton
                      variant="text"
                      className={`h-3 ${idx === 0 ? 'w-32' : 'w-24'}`}
                      animated={animated}
                    />
                  </div>
                  <UiSkeleton variant="circular" width={14} height={14} animated={animated} />
                </div>
              ))}
            </div>
          </div>

          {/* Suggestion Search Chips Skeleton */}
          <div className="space-y-2">
            <div className="px-1">
              <UiSkeleton variant="text" className="h-2.5 w-28" animated={animated} />
            </div>
            <div className="flex flex-wrap gap-1.5 px-1">
              <UiSkeleton variant="pill" className="h-7 w-24" animated={animated} />
              <UiSkeleton variant="pill" className="h-7 w-28" animated={animated} />
              <UiSkeleton variant="pill" className="h-7 w-20" animated={animated} />
              <UiSkeleton variant="pill" className="h-7 w-24" animated={animated} />
            </div>
          </div>
        </>
      )}

      {showResults && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1 pb-1">
            <UiSkeleton variant="text" className="h-2.5 w-24" animated={animated} />
            <UiSkeleton variant="text" className="h-2.5 w-20" animated={animated} />
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: rows }).map((_, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between gap-3 ${
                  isSheet
                    ? 'px-3.5 py-2.5 rounded-2xl bg-[#FAFBFD] dark:bg-[#1B1E24] border border-black/[0.08] dark:border-white/[0.08]'
                    : 'px-3 py-2 rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-white dark:bg-[#181B21]'
                }`}
              >
                <div className="flex-1 min-w-0 space-y-1.5">
                  <UiSkeleton
                    variant="text"
                    className={`h-3 ${idx % 2 === 0 ? 'w-36' : 'w-44'}`}
                    animated={animated}
                  />
                  <UiSkeleton
                    variant="text"
                    className={`h-2.5 ${idx % 2 === 0 ? 'w-24' : 'w-28'}`}
                    animated={animated}
                  />
                </div>
                <UiSkeleton variant="pill" className="h-5 w-16" animated={animated} />
              </div>
            ))}
          </div>
        </div>
      )}
    </UiSkeletonGroup>
  );
};
