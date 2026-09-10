import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { THEMES, THEME_MAP, type ThemeDef } from './themes';

type ThemeCtx = {
  theme: ThemeDef;
  themes: ThemeDef[];
  setTheme: (id: string) => void;
  toggleMode: () => void;
  cycle: () => void;
  isDark: boolean;
};

const Ctx = createContext<ThemeCtx | null>(null);
const STORAGE_KEY = 'mka-theme-2026';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'aurora-dark';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && THEME_MAP[saved] ? saved : 'aurora-dark';
  });

  const theme = THEME_MAP[themeId] ?? THEME_MAP['aurora-dark'];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.id);
    root.style.colorScheme = theme.mode;
    window.localStorage.setItem(STORAGE_KEY, theme.id);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme.swatch[0]);
  }, [theme]);

  const setTheme = useCallback((id: string) => {
    if (THEME_MAP[id]) setThemeId(id);
  }, []);

  const toggleMode = useCallback(() => {
    setThemeId((prev) => THEME_MAP[prev]?.pair ?? prev);
  }, []);

  const cycle = useCallback(() => {
    setThemeId((prev) => {
      const idx = THEMES.findIndex((t) => t.id === prev);
      return THEMES[(idx + 1) % THEMES.length].id;
    });
  }, []);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      themes: THEMES,
      setTheme,
      toggleMode,
      cycle,
      isDark: theme.mode === 'dark',
    }),
    [theme, setTheme, toggleMode, cycle]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
