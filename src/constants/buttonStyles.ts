// Standardized pill action button classes matching the "+ New Lesson Plan" button in Class Preparation (h-9, px-3.5 sm:px-4, text-[13px], font-medium)
export const ACTION_BTN_BASE =
  'touch-target-44 inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 px-3.5 sm:px-4 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

export const ACTION_BTN_PRIMARY = `${ACTION_BTN_BASE} bg-[#ee2e65] hover:bg-[#d82256] text-white`;

export const ACTION_BTN_SECONDARY = `${ACTION_BTN_BASE} border border-black/[0.09] dark:border-white/[0.12] bg-white dark:bg-[#1B1E24] hover:bg-[#FAFBFD] dark:hover:bg-[#232730] text-[#1C1D21] dark:text-gray-200`;

export const ACTION_BTN_SOFT_PRIMARY = `${ACTION_BTN_BASE} bg-[#FEF1F5] dark:bg-[#ee2e65]/15 hover:bg-[#FDE0E9] dark:hover:bg-[#ee2e65]/25 border border-[#FBC2D4]/70 dark:border-[#ee2e65]/35 text-[#9D113C] dark:text-[#fbc2d4]`;

export const ACTION_BTN_DARK = `${ACTION_BTN_BASE} bg-[#1C1D21] dark:bg-[#262B34] hover:bg-black dark:hover:bg-[#313744] text-white`;

export const ACTION_BTN_DANGER_SOFT = `${ACTION_BTN_BASE} bg-[#FFECEB] dark:bg-rose-500/15 hover:bg-[#FAD2CF] dark:hover:bg-rose-500/25 text-[#942922] dark:text-rose-300`;
