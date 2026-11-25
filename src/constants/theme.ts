import { PastelTheme, PastelThemeKey } from '../types';

export const PASTEL_THEMES: Record<PastelThemeKey, PastelTheme> = {
  periwinkle: {
    bg: 'bg-[#F0EFFC]',
    header: 'bg-[#D6D4FF]',
    border: 'border-[#C7C4FF]',
    text: 'text-[#3F3B99]',
    dot: 'bg-[#6C5DD3]',
    hex: '#D6D4FF',
  },
  peach: {
    bg: 'bg-[#FFF5E6]',
    header: 'bg-[#FDE6C4]',
    border: 'border-[#FAD7A0]',
    text: 'text-[#8C5811]',
    dot: 'bg-[#F59E0B]',
    hex: '#FDE6C4',
  },
  coral: {
    bg: 'bg-[#FFECEB]',
    header: 'bg-[#FAD2CF]',
    border: 'border-[#F5B7B1]',
    text: 'text-[#942922]',
    dot: 'bg-[#EF4444]',
    hex: '#FAD2CF',
  },
  mint: {
    bg: 'bg-[#E6F9F0]',
    header: 'bg-[#C4F0DC]',
    border: 'border-[#A3E4C6]',
    text: 'text-[#146C43]',
    dot: 'bg-[#10B981]',
    hex: '#C4F0DC',
  },
};
