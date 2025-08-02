
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { REVOLUTIONARY_THEMES, applyTheme, ThemeName } from '@/themes/revolutionaryThemes';

export const ThemeSystem = () => {
  const { theme } = useStore();

  useEffect(() => {
    // Apply the revolutionary theme
    applyTheme(theme as ThemeName);
  }, [theme]);

  return null;
};

export const getThemeConfig = (theme: string) => {
  return REVOLUTIONARY_THEMES[theme as ThemeName] || REVOLUTIONARY_THEMES.default;
};
