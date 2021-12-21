import { Dispatch, useCallback } from 'react';
import { createCtx } from '../../../utils';
import { useLocalPersistence, useStateFromLocal } from '../../../utils/hooks';
import { DarkThemeConfig, isKindOfTheme, ThemeVariant, useDarkThemeDomUpdates } from './use-dark-theme-dom-updates';

type DarkThemeCtx = {
  theme: ThemeVariant;
  setTheme: Dispatch<string>;
};

export const [AppThemeProvider, useAppTheme] = createCtx<DarkThemeCtx, DarkThemeConfig>(
  'DarkTheme',
  darkThemeConfig => {
    const [theme, setTheme] = useStateFromLocal<ThemeVariant>(
      'darkTheme',
      storedTheme => (isKindOfTheme(storedTheme) ? storedTheme : undefined),
      'auto',
    );

    useLocalPersistence('darkTheme', theme);
    useDarkThemeDomUpdates(theme, darkThemeConfig);

    return {
      theme,
      setTheme: useCallback((s: string) => isKindOfTheme(s) && setTheme(s), []),
    };
  },
);
