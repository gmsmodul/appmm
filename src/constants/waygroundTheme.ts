export interface WaygroundTilePalette {
  letter: string;
  label: string;
  bg: string;
  hoverBg: string;
  borderBottom: string;
  badgeBg: string;
  shape: 'diamond' | 'circle' | 'square' | 'triangle';
}

export const WAYGROUND_OPTION_TILES: WaygroundTilePalette[] = [
  {
    letter: 'A',
    label: 'Opsi A',
    bg: 'bg-[#2F6DAE]',
    hoverBg: 'hover:bg-[#377CC4]',
    borderBottom: 'border-b-4 border-[#1D4878]',
    badgeBg: 'bg-[#1D4878]/65',
    shape: 'diamond',
  },
  {
    letter: 'B',
    label: 'Opsi B',
    bg: 'bg-[#2C9CA6]',
    hoverBg: 'hover:bg-[#33B0BB]',
    borderBottom: 'border-b-4 border-[#196870]',
    badgeBg: 'bg-[#196870]/65',
    shape: 'circle',
  },
  {
    letter: 'C',
    label: 'Opsi C',
    bg: 'bg-[#EDA92A]',
    hoverBg: 'hover:bg-[#F5B73D]',
    borderBottom: 'border-b-4 border-[#B0770D]',
    badgeBg: 'bg-[#B0770D]/65',
    shape: 'square',
  },
  {
    letter: 'D',
    label: 'Opsi D',
    bg: 'bg-[#D5546D]',
    hoverBg: 'hover:bg-[#E2647D]',
    borderBottom: 'border-b-4 border-[#992D43]',
    badgeBg: 'bg-[#992D43]/65',
    shape: 'triangle',
  },
];

export const WAYGROUND_TF_TILES = [
  {
    letter: 'A',
    bg: 'bg-[#2C9CA6]',
    hoverBg: 'hover:bg-[#33B0BB]',
    borderBottom: 'border-b-4 border-[#196870]',
    badgeBg: 'bg-[#196870]/65',
  },
  {
    letter: 'B',
    bg: 'bg-[#D5546D]',
    hoverBg: 'hover:bg-[#E2647D]',
    borderBottom: 'border-b-4 border-[#992D43]',
    badgeBg: 'bg-[#992D43]/65',
  },
];

export const WAYGROUND_PARTICIPANT_TILES = [
  {
    keyNum: '1',
    bg: 'bg-gradient-to-b from-[#A3A808] to-[#8C9105]',
    hoverBg: 'hover:brightness-110',
    borderBottom: 'border-b-[5px] border-[#5E6202]',
  },
  {
    keyNum: '2',
    bg: 'bg-gradient-to-b from-[#A855F7] to-[#8B3DE0]',
    hoverBg: 'hover:brightness-110',
    borderBottom: 'border-b-[5px] border-[#5B21B6]',
  },
  {
    keyNum: '3',
    bg: 'bg-gradient-to-b from-[#FA6E14] to-[#E5580C]',
    hoverBg: 'hover:brightness-110',
    borderBottom: 'border-b-[5px] border-[#9A3412]',
  },
  {
    keyNum: '4',
    bg: 'bg-gradient-to-b from-[#14B8A6] to-[#0D9488]',
    hoverBg: 'hover:brightness-110',
    borderBottom: 'border-b-[5px] border-[#115E59]',
  },
];

export const WAYGROUND_PARTICIPANT_TF_TILES = [
  {
    keyNum: '1',
    bg: 'bg-gradient-to-b from-[#14B8A6] to-[#0D9488]',
    hoverBg: 'hover:brightness-110',
    borderBottom: 'border-b-[5px] border-[#115E59]',
  },
  {
    keyNum: '2',
    bg: 'bg-gradient-to-b from-[#FA6E14] to-[#E5580C]',
    hoverBg: 'hover:brightness-110',
    borderBottom: 'border-b-[5px] border-[#9A3412]',
  },
];

export const WAYGROUND_ARENA_SHELL =
  'rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_top,_#6A134B_0%,_#3B0B2E_52%,_#1D0518_100%)] text-white border border-white/10 shadow-[0_24px_60px_-20px_rgba(26,7,34,0.55)]';

export type WaygroundArenaThemeId = 'plum' | 'indigo' | 'emerald' | 'midnight';

export interface WaygroundArenaTheme {
  id: WaygroundArenaThemeId;
  name: string;
  swatch: string;
  bgGradient: string;
  animatedBgGradient: string;
  auroraColors: [string, string];
  spotlightGlow: string;
  podiumTop: string;
  podiumRim: string;
  podiumBase: string;
  portalColors: [string, string, string, string];
  gridStroke: string;
}

export const WAYGROUND_ARENA_THEMES: Record<WaygroundArenaThemeId, WaygroundArenaTheme> = {
  plum: {
    id: 'plum',
    name: 'Plum Arena',
    swatch: '#9B1B5A',
    bgGradient:
      'radial-gradient(ellipse at 50% 18%, #7A144F 0%, #440B2F 50%, #1F0417 100%)',
    animatedBgGradient:
      'linear-gradient(125deg, #210519 0%, #6D124B 28%, #9D174D 52%, #4C1042 76%, #1D0417 100%)',
    auroraColors: ['rgba(236, 72, 153, 0.34)', 'rgba(139, 92, 246, 0.28)'],
    spotlightGlow: 'rgba(219, 39, 119, 0.38)',
    podiumTop: '#EC4899',
    podiumRim: '#BE185D',
    podiumBase: '#831843',
    portalColors: ['#B6B81A', '#8B5CF6', '#F97316', '#14B8A6'],
    gridStroke: 'rgba(244, 114, 182, 0.22)',
  },
  indigo: {
    id: 'indigo',
    name: 'Cosmic Violet',
    swatch: '#5B4CE2',
    bgGradient:
      'radial-gradient(ellipse at 50% 18%, #432382 0%, #26124E 52%, #120826 100%)',
    animatedBgGradient:
      'linear-gradient(125deg, #100724 0%, #371B73 28%, #5B21B6 52%, #2E1065 76%, #120826 100%)',
    auroraColors: ['rgba(168, 85, 247, 0.34)', 'rgba(56, 189, 248, 0.24)'],
    spotlightGlow: 'rgba(139, 92, 246, 0.36)',
    podiumTop: '#A855F7',
    podiumRim: '#7E22CE',
    podiumBase: '#581C87',
    portalColors: ['#22D3EE', '#A855F7', '#F59E0B', '#10B981'],
    gridStroke: 'rgba(192, 132, 252, 0.2)',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Stage',
    swatch: '#0D9488',
    bgGradient:
      'radial-gradient(ellipse at 50% 18%, #0F4C4A 0%, #0A2E33 52%, #05181C 100%)',
    animatedBgGradient:
      'linear-gradient(125deg, #04171B 0%, #0D4B4A 28%, #0F766E 52%, #0A383E 76%, #05181C 100%)',
    auroraColors: ['rgba(20, 184, 166, 0.32)', 'rgba(59, 130, 246, 0.22)'],
    spotlightGlow: 'rgba(20, 184, 166, 0.32)',
    podiumTop: '#14B8A6',
    podiumRim: '#0F766E',
    podiumBase: '#115E59',
    portalColors: ['#84CC16', '#06B6D4', '#F59E0B', '#3B82F6'],
    gridStroke: 'rgba(94, 234, 212, 0.18)',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Slate',
    swatch: '#334155',
    bgGradient:
      'radial-gradient(ellipse at 50% 18%, #283147 0%, #171D2B 52%, #0B0E16 100%)',
    animatedBgGradient:
      'linear-gradient(125deg, #090D16 0%, #1E293B 28%, #312E81 52%, #1E2538 76%, #0B0E16 100%)',
    auroraColors: ['rgba(99, 102, 241, 0.3)', 'rgba(56, 189, 248, 0.22)'],
    spotlightGlow: 'rgba(96, 165, 250, 0.28)',
    podiumTop: '#6366F1',
    podiumRim: '#4338CA',
    podiumBase: '#312E81',
    portalColors: ['#38BDF8', '#818CF8', '#FB923C', '#2DD4BF'],
    gridStroke: 'rgba(148, 163, 184, 0.18)',
  },
};

