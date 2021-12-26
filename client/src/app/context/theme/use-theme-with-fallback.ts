import { useEffect, useMemo, useState } from 'react';
import { useAppTheme } from '~/app/context';
import { ThemeVariant } from '~/app/context/theme/use-dark-theme-dom-updates';

export function useThemeWithFallbackToSystem(): Exclude<ThemeVariant, 'auto'> {
  const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const { theme } = useAppTheme();
  const [systemThemePreference, setSystemThemePreference] = useState<Exclude<ThemeVariant, 'auto'>>(
    systemThemeMediaQuery.matches ? 'dark' : 'light',
  );

  useEffect(() => {
    const themeChangeHandler = (e: MediaQueryListEvent) => setSystemThemePreference(e.matches ? 'dark' : 'light');

    systemThemeMediaQuery.addEventListener('change', themeChangeHandler);
    return () => {
      systemThemeMediaQuery.removeEventListener('change', themeChangeHandler);
    };
  }, []);

  return useMemo(() => (theme === 'auto' ? systemThemePreference : theme), [theme, systemThemePreference]);
}
