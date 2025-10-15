'use client';

import * as React from 'react';
import { type ThemeName, getTheme } from './themes';

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  tokens: ReturnType<typeof getTheme>;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'wellness-tech',
  storageKey = 'gawin-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  // Hydration safe - only run on client
  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as ThemeName | null;
    if (stored) {
      setThemeState(stored);
    }
  }, [storageKey]);

  const setTheme = React.useCallback(
    (newTheme: ThemeName) => {
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);

      // Apply theme to document root
      document.documentElement.setAttribute('data-theme', newTheme);
    },
    [storageKey]
  );

  // Apply theme on mount and theme change
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const tokens = React.useMemo(() => getTheme(theme), [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      tokens,
    }),
    [theme, setTheme, tokens]
  );

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
