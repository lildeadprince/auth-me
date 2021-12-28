import { useEffect } from 'react';

const THEME_VARIANTS = ['auto', 'dark', 'light'] as const;
export type ThemeVariant = typeof THEME_VARIANTS[number];

export type DarkThemeConfig = {
  rootElement: HTMLElement;
  darkSelector: string;
  lightSelector: string;
};

export function useDarkThemeDomUpdates(theme: ThemeVariant, themeConfig: DarkThemeConfig) {
  useEffect(() => {
    const { rootElement, darkSelector: dark, lightSelector: light } = themeConfig;

    if (theme === 'auto') {
      rootElement.classList.remove(dark, light);
    } else if (theme === 'light') {
      rootElement.classList.add(light);
      rootElement.classList.remove(dark);
    } else if (theme === 'dark') {
      rootElement.classList.add(dark);
      rootElement.classList.remove(light);
    }

    return () => {
      rootElement.classList.remove(light);
      rootElement.classList.remove(dark);
    };
  }, [theme, themeConfig]);
}

export function isKindOfTheme(s: string): s is ThemeVariant {
  return THEME_VARIANTS.indexOf(s as ThemeVariant) !== -1;
}
