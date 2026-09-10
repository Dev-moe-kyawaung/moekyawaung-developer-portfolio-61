export type ThemeMode = 'dark' | 'light';

export type ThemeDef = {
  id: string;
  name: string;
  family: string;
  mode: ThemeMode;
  vibe: string;
  swatch: [string, string, string];
  pair: string;
};

export const THEMES: ThemeDef[] = [
  {
    id: 'aurora-dark',
    name: 'Aurora',
    family: 'Aurora',
    mode: 'dark',
    vibe: 'Teal · Indigo · Orchid',
    swatch: ['#04070a', '#5eead4', '#818cf8'],
    pair: 'aurora-light',
  },
  {
    id: 'noir-dark',
    name: 'Noir',
    family: 'Noir',
    mode: 'dark',
    vibe: 'Magenta · Cyan · Violet',
    swatch: ['#05030a', '#ff4d9d', '#22d3ee'],
    pair: 'noir-light',
  },
  {
    id: 'champagne-dark',
    name: 'Champagne',
    family: 'Champagne',
    mode: 'dark',
    vibe: 'Gold · Copper · Bronze',
    swatch: ['#0a0806', '#e2b464', '#c1784a'],
    pair: 'champagne-light',
  },
  {
    id: 'glacier-dark',
    name: 'Glacier',
    family: 'Glacier',
    mode: 'dark',
    vibe: 'Azure · Mint · Periwinkle',
    swatch: ['#03070f', '#60a5fa', '#5eead4'],
    pair: 'glacier-light',
  },
  {
    id: 'aurora-light',
    name: 'Aurora',
    family: 'Aurora',
    mode: 'light',
    vibe: 'Teal · Indigo on Ivory',
    swatch: ['#f4f8f7', '#0d9488', '#4f46e5'],
    pair: 'aurora-dark',
  },
  {
    id: 'noir-light',
    name: 'Noir',
    family: 'Noir',
    mode: 'light',
    vibe: 'Magenta · Cyan on Blush',
    swatch: ['#faf6fb', '#c2185b', '#0891b2'],
    pair: 'noir-dark',
  },
  {
    id: 'champagne-light',
    name: 'Champagne',
    family: 'Champagne',
    mode: 'light',
    vibe: 'Gold · Bronze on Parchment',
    swatch: ['#faf7f1', '#9a7433', '#b8873f'],
    pair: 'champagne-dark',
  },
  {
    id: 'glacier-light',
    name: 'Glacier',
    family: 'Glacier',
    mode: 'light',
    vibe: 'Azure · Mint on Frost',
    swatch: ['#f3f7fd', '#1d4ed8', '#0d9488'],
    pair: 'glacier-dark',
  },
];

export const THEME_MAP = Object.fromEntries(THEMES.map((t) => [t.id, t]));

export const DARK_THEMES = THEMES.filter((t) => t.mode === 'dark');
