export interface ColorShade {
  token: string;
  hex: string;
}

export interface ColorFamily {
  name: string;
  slug: string;
  semanticRole?: string;
  baseHex: string;
  lightShades: ColorShade[]; // light-5 down to light-1
  darkShades: ColorShade[];  // dark-1 down to dark-5
}

export const isLightHex = (hex: string): boolean => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  // Relative perceptual luminance (YIQ)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 165;
};

export const MULTIMEDIA_COLOR_FAMILIES: ColorFamily[] = [
  {
    name: 'Red',
    slug: 'red',
    semanticRole: 'Status: Danger',
    baseHex: '#f83f37',
    lightShades: [
      { token: 'red-light-5', hex: '#fff1f1' },
      { token: 'red-light-4', hex: '#fdc5c3' },
      { token: 'red-light-3', hex: '#fb9f9b' },
      { token: 'red-light-2', hex: '#fa7d77' },
      { token: 'red-light-1', hex: '#f95851' },
    ],
    darkShades: [
      { token: 'red-dark-1', hex: '#ff2f26' },
      { token: 'red-dark-2', hex: '#ed1622' },
      { token: 'red-dark-3', hex: '#cf020d' },
      { token: 'red-dark-4', hex: '#b10911' },
      { token: 'red-dark-5', hex: '#8b0c12' },
    ],
  },
  {
    name: 'Pink',
    slug: 'pink',
    baseHex: '#ed1b60',
    lightShades: [
      { token: 'pink-light-5', hex: '#feeff4' },
      { token: 'pink-light-4', hex: '#fabacf' },
      { token: 'pink-light-3', hex: '#f68daf' },
      { token: 'pink-light-2', hex: '#f36493' },
      { token: 'pink-light-1', hex: '#ef3975' },
    ],
    darkShades: [
      { token: 'pink-dark-1', hex: '#df195f' },
      { token: 'pink-dark-2', hex: '#be1b54' },
      { token: 'pink-dark-3', hex: '#a7194b' },
      { token: 'pink-dark-4', hex: '#90143f' },
      { token: 'pink-dark-5', hex: '#6f1333' },
    ],
  },
  {
    name: 'Purple',
    slug: 'purple',
    baseHex: '#ab26aa',
    lightShades: [
      { token: 'purple-light-5', hex: '#f9f0f9' },
      { token: 'purple-light-4', hex: '#e6bde5' },
      { token: 'purple-light-3', hex: '#d592d4' },
      { token: 'purple-light-2', hex: '#c66cc5' },
      { token: 'purple-light-1', hex: '#b642b5' },
    ],
    darkShades: [
      { token: 'purple-dark-1', hex: '#9a3092' },
      { token: 'purple-dark-2', hex: '#882787' },
      { token: 'purple-dark-3', hex: '#7c2181' },
      { token: 'purple-dark-4', hex: '#701b76' },
      { token: 'purple-dark-5', hex: '#5d1864' },
    ],
  },
  {
    name: 'Violet',
    slug: 'violet',
    baseHex: '#6640b2',
    lightShades: [
      { token: 'violet-light-5', hex: '#f4f2fa' },
      { token: 'violet-light-4', hex: '#d1c5e8' },
      { token: 'violet-light-3', hex: '#b29fd8' },
      { token: 'violet-light-2', hex: '#977dcb' },
      { token: 'violet-light-1', hex: '#7a59bc' },
    ],
    darkShades: [
      { token: 'violet-dark-1', hex: '#603bab' },
      { token: 'violet-dark-2', hex: '#5935a3' },
      { token: 'violet-dark-3', hex: '#482e7e' },
      { token: 'violet-dark-4', hex: '#3a196c' },
      { token: 'violet-dark-5', hex: '#2d1453' },
    ],
  },
  {
    name: 'Indigo',
    slug: 'indigo',
    baseHex: '#3a55b1',
    lightShades: [
      { token: 'indigo-light-5', hex: '#f1f3f9' },
      { token: 'indigo-light-4', hex: '#c4cce7' },
      { token: 'indigo-light-3', hex: '#9caad8' },
      { token: 'indigo-light-2', hex: '#798cca' },
      { token: 'indigo-light-1', hex: '#536bbb' },
    ],
    darkShades: [
      { token: 'indigo-dark-1', hex: '#3650ab' },
      { token: 'indigo-dark-2', hex: '#2f4595' },
      { token: 'indigo-dark-3', hex: '#273c87' },
      { token: 'indigo-dark-4', hex: '#002663' },
      { token: 'indigo-dark-5', hex: '#0a2042' },
    ],
  },
  {
    name: 'Blue',
    slug: 'blue',
    baseHex: '#0092ee',
    lightShades: [
      { token: 'blue-light-5', hex: '#edf7fe' },
      { token: 'blue-light-4', hex: '#b2defa' },
      { token: 'blue-light-3', hex: '#7fc8f6' },
      { token: 'blue-light-2', hex: '#52b5f3' },
      { token: 'blue-light-1', hex: '#21a0f0' },
    ],
    darkShades: [
      { token: 'blue-dark-1', hex: '#0089e0' },
      { token: 'blue-dark-2', hex: '#007fd0' },
      { token: 'blue-dark-3', hex: '#0768a5' },
      { token: 'blue-dark-4', hex: '#004f82' },
      { token: 'blue-dark-5', hex: '#044067' },
    ],
  },
  {
    name: 'Sky',
    slug: 'sky',
    semanticRole: 'Palet Tambahan',
    baseHex: '#00acf0',
    lightShades: [
      { token: 'sky-light-5', hex: '#edf9fe' },
      { token: 'sky-light-4', hex: '#b2e6fa' },
      { token: 'sky-light-3', hex: '#7fd5f7' },
      { token: 'sky-light-2', hex: '#52c7f5' },
      { token: 'sky-light-1', hex: '#21b7f2' },
    ],
    darkShades: [
      { token: 'sky-dark-1', hex: '#00a0df' },
      { token: 'sky-dark-2', hex: '#0293c9' },
      { token: 'sky-dark-3', hex: '#0285b4' },
      { token: 'sky-dark-4', hex: '#02729a' },
      { token: 'sky-dark-5', hex: '#075875' },
    ],
  },
  {
    name: 'Cyan',
    slug: 'cyan',
    semanticRole: 'Status: Info',
    baseHex: '#1ebccd',
    lightShades: [
      { token: 'cyan-light-5', hex: '#effafb' },
      { token: 'cyan-light-4', hex: '#bbebf0' },
      { token: 'cyan-light-3', hex: '#8edde6' },
      { token: 'cyan-light-2', hex: '#66d2dd' },
      { token: 'cyan-light-1', hex: '#3bc5d3' },
    ],
    darkShades: [
      { token: 'cyan-dark-1', hex: '#16a9b9' },
      { token: 'cyan-dark-2', hex: '#0e949f' },
      { token: 'cyan-dark-3', hex: '#0b858f' },
      { token: 'cyan-dark-4', hex: '#046b73' },
      { token: 'cyan-dark-5', hex: '#065459' },
    ],
  },
  {
    name: 'Teal',
    slug: 'teal',
    baseHex: '#009b84',
    lightShades: [
      { token: 'teal-light-5', hex: '#edf8f6' },
      { token: 'teal-light-4', hex: '#b2e1da' },
      { token: 'teal-light-3', hex: '#7fcdc1' },
      { token: 'teal-light-2', hex: '#52bbac' },
      { token: 'teal-light-1', hex: '#21a894' },
    ],
    darkShades: [
      { token: 'teal-dark-1', hex: '#018975' },
      { token: 'teal-dark-2', hex: '#028068' },
      { token: 'teal-dark-3', hex: '#026f58' },
      { token: 'teal-dark-4', hex: '#02624f' },
      { token: 'teal-dark-5', hex: '#044b3b' },
    ],
  },
  {
    name: 'Green',
    slug: 'green',
    semanticRole: 'Status: Success',
    baseHex: '#22af47',
    lightShades: [
      { token: 'green-light-5', hex: '#eff9f2' },
      { token: 'green-light-4', hex: '#bce7c7' },
      { token: 'green-light-3', hex: '#90d7a3' },
      { token: 'green-light-2', hex: '#69c982' },
      { token: 'green-light-1', hex: '#3fb95f' },
    ],
    darkShades: [
      { token: 'green-dark-1', hex: '#1aa23e' },
      { token: 'green-dark-2', hex: '#179237' },
      { token: 'green-dark-3', hex: '#138431' },
      { token: 'green-dark-4', hex: '#056b33' },
      { token: 'green-dark-5', hex: '#05592b' },
    ],
  },
  {
    name: 'Neon',
    slug: 'neon',
    baseHex: '#88c241',
    lightShades: [
      { token: 'neon-light-5', hex: '#f3f9ec' },
      { token: 'neon-light-4', hex: '#dbedc6' },
      { token: 'neon-light-3', hex: '#c3e0a0' },
      { token: 'neon-light-2', hex: '#aed67e' },
      { token: 'neon-light-1', hex: '#97ca5a' },
    ],
    darkShades: [
      { token: 'neon-dark-1', hex: '#79b62f' },
      { token: 'neon-dark-2', hex: '#67a41c' },
      { token: 'neon-dark-3', hex: '#59970e' },
      { token: 'neon-dark-4', hex: '#4c7f16' },
      { token: 'neon-dark-5', hex: '#3d680f' },
    ],
  },
  {
    name: 'Lime',
    slug: 'lime',
    baseHex: '#d0d962',
    lightShades: [
      { token: 'lime-light-5', hex: '#f9faeb' },
      { token: 'lime-light-4', hex: '#f1f4d0' },
      { token: 'lime-light-3', hex: '#e7ecb0' },
      { token: 'lime-light-2', hex: '#dfe594' },
      { token: 'lime-light-1', hex: '#d6de76' },
    ],
    darkShades: [
      { token: 'lime-dark-1', hex: '#c3cc34' },
      { token: 'lime-dark-2', hex: '#b7c11a' },
      { token: 'lime-dark-3', hex: '#9ea809' },
      { token: 'lime-dark-4', hex: '#878b09' },
      { token: 'lime-dark-5', hex: '#6f7208' },
    ],
  },
  {
    name: 'Sun',
    slug: 'sun',
    baseHex: '#fde314',
    lightShades: [
      { token: 'sun-light-5', hex: '#fffbe5' },
      { token: 'sun-light-4', hex: '#fef7c2' },
      { token: 'sun-light-3', hex: '#fef19a' },
      { token: 'sun-light-2', hex: '#feec76' },
      { token: 'sun-light-1', hex: '#fde74f' },
    ],
    darkShades: [
      { token: 'sun-dark-1', hex: '#e8cd04' },
      { token: 'sun-dark-2', hex: '#cfb602' },
      { token: 'sun-dark-3', hex: '#b39b00' },
      { token: 'sun-dark-4', hex: '#8f7b00' },
      { token: 'sun-dark-5', hex: '#6b5b00' },
    ],
  },
  {
    name: 'Yellow',
    slug: 'yellow',
    semanticRole: 'Status: Warning',
    baseHex: '#ffbf36',
    lightShades: [
      { token: 'yellow-light-5', hex: '#fff8eb' },
      { token: 'yellow-light-4', hex: '#ffecc2' },
      { token: 'yellow-light-3', hex: '#ffdf9a' },
      { token: 'yellow-light-2', hex: '#ffd477' },
      { token: 'yellow-light-1', hex: '#ffc750' },
    ],
    darkShades: [
      { token: 'yellow-dark-1', hex: '#f0ab18' },
      { token: 'yellow-dark-2', hex: '#da9709' },
      { token: 'yellow-dark-3', hex: '#bd8000' },
      { token: 'yellow-dark-4', hex: '#976600' },
      { token: 'yellow-dark-5', hex: '#704b00' },
    ],
  },
  {
    name: 'Orange',
    slug: 'orange',
    baseHex: '#ff9528',
    lightShades: [
      { token: 'orange-light-5', hex: '#fff4e9' },
      { token: 'orange-light-4', hex: '#ffdfbe' },
      { token: 'orange-light-3', hex: '#ffca93' },
      { token: 'orange-light-2', hex: '#ffb76d' },
      { token: 'orange-light-1', hex: '#ffa344' },
    ],
    darkShades: [
      { token: 'orange-dark-1', hex: '#f18313' },
      { token: 'orange-dark-2', hex: '#dc7309' },
      { token: 'orange-dark-3', hex: '#bd6003' },
      { token: 'orange-dark-4', hex: '#974c02' },
      { token: 'orange-dark-5', hex: '#6e3701' },
    ],
  },
  {
    name: 'Pumpkin',
    slug: 'pumpkin',
    baseHex: '#ff6f00',
    lightShades: [
      { token: 'pumpkin-light-5', hex: '#fff1e6' },
      { token: 'pumpkin-light-4', hex: '#ffd4b2' },
      { token: 'pumpkin-light-3', hex: '#ffb780' },
      { token: 'pumpkin-light-2', hex: '#ff9a4d' },
      { token: 'pumpkin-light-1', hex: '#ff8121' },
    ],
    darkShades: [
      { token: 'pumpkin-dark-1', hex: '#e86400' },
      { token: 'pumpkin-dark-2', hex: '#cc5800' },
      { token: 'pumpkin-dark-3', hex: '#ad4a00' },
      { token: 'pumpkin-dark-4', hex: '#8a3b00' },
      { token: 'pumpkin-dark-5', hex: '#662b00' },
    ],
  },
  {
    name: 'Brown',
    slug: 'brown',
    baseHex: '#8d6e63',
    lightShades: [
      { token: 'brown-light-5', hex: '#f4f0ef' },
      { token: 'brown-light-4', hex: '#dcd2cf' },
      { token: 'brown-light-3', hex: '#c5b5af' },
      { token: 'brown-light-2', hex: '#b09a92' },
      { token: 'brown-light-1', hex: '#9d8278' },
    ],
    darkShades: [
      { token: 'brown-dark-1', hex: '#7f6258' },
      { token: 'brown-dark-2', hex: '#6e544b' },
      { token: 'brown-dark-3', hex: '#5d473f' },
      { token: 'brown-dark-4', hex: '#4a3832' },
      { token: 'brown-dark-5', hex: '#382a25' },
    ],
  },
  {
    name: 'Gold',
    slug: 'gold',
    baseHex: '#c19a3f',
    lightShades: [
      { token: 'gold-light-5', hex: '#f9f5ec' },
      { token: 'gold-light-4', hex: '#ece0c4' },
      { token: 'gold-light-3', hex: '#decb9c' },
      { token: 'gold-light-2', hex: '#d1b779' },
      { token: 'gold-light-1', hex: '#c8a759' },
    ],
    darkShades: [
      { token: 'gold-dark-1', hex: '#b08b35' },
      { token: 'gold-dark-2', hex: '#9a782c' },
      { token: 'gold-dark-3', hex: '#816424' },
      { token: 'gold-dark-4', hex: '#674f1c' },
      { token: 'gold-dark-5', hex: '#4c3a14' },
    ],
  },
  {
    name: 'Smoke',
    slug: 'smoke',
    baseHex: '#78909c',
    lightShades: [
      { token: 'smoke-light-5', hex: '#f2f4f6' },
      { token: 'smoke-light-4', hex: '#d7dfe3' },
      { token: 'smoke-light-3', hex: '#bcc8ce' },
      { token: 'smoke-light-2', hex: '#a2b2ba' },
      { token: 'smoke-light-1', hex: '#8b9fa9' },
    ],
    darkShades: [
      { token: 'smoke-dark-1', hex: '#68808c' },
      { token: 'smoke-dark-2', hex: '#586e79' },
      { token: 'smoke-dark-3', hex: '#485b65' },
      { token: 'smoke-dark-4', hex: '#37474f' },
      { token: 'smoke-dark-5', hex: '#263238' },
    ],
  },
  {
    name: 'Grey',
    slug: 'grey',
    baseHex: '#8b9196',
    lightShades: [
      { token: 'grey-light-5', hex: '#f4f5f6' },
      { token: 'grey-light-4', hex: '#dddfe1' },
      { token: 'grey-light-3', hex: '#c7cacd' },
      { token: 'grey-light-2', hex: '#b2b6b9' },
      { token: 'grey-light-1', hex: '#9ea3a7' },
    ],
    darkShades: [
      { token: 'grey-dark-1', hex: '#787e83' },
      { token: 'grey-dark-2', hex: '#666b70' },
      { token: 'grey-dark-3', hex: '#54585c' },
      { token: 'grey-dark-4', hex: '#424549' },
      { token: 'grey-dark-5', hex: '#2f3235' },
    ],
  },
  {
    name: 'Dark',
    slug: 'dark',
    baseHex: '#262b31',
    lightShades: [
      { token: 'dark-light-5', hex: '#eaebed' },
      { token: 'dark-light-4', hex: '#c1c4c8' },
      { token: 'dark-light-3', hex: '#989ca3' },
      { token: 'dark-light-2', hex: '#70757e' },
      { token: 'dark-light-1', hex: '#494e56' },
    ],
    darkShades: [
      { token: 'dark-dark-1', hex: '#202429' },
      { token: 'dark-dark-2', hex: '#1a1d22' },
      { token: 'dark-dark-3', hex: '#14171b' },
      { token: 'dark-dark-4', hex: '#0e1013' },
      { token: 'dark-dark-5', hex: '#07080a' },
    ],
  },
  {
    name: 'Primary Rose',
    slug: 'primary',
    semanticRole: 'Brand Primary',
    baseHex: '#ee2e65',
    lightShades: [
      { token: 'primary-light-5', hex: '#fef1f5' },
      { token: 'primary-light-4', hex: '#fde0e9' },
      { token: 'primary-light-3', hex: '#fbc2d4' },
      { token: 'primary-light-2', hex: '#f895b5' },
      { token: 'primary-light-1', hex: '#f45d8e' },
    ],
    darkShades: [
      { token: 'primary-dark-1', hex: '#d81f54' },
      { token: 'primary-dark-2', hex: '#c11448' },
      { token: 'primary-dark-3', hex: '#9d113c' },
      { token: 'primary-dark-4', hex: '#831236' },
      { token: 'primary-dark-5', hex: '#4e051c' },
    ],
  },
];
