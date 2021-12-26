import { useEffect, useState } from 'react';

const THEME_VARIANTS = ['auto', 'dark', 'light'] as const;
export type ThemeVariant = typeof THEME_VARIANTS[number];

export type DarkThemeConfig = {
  rootElement: HTMLElement;
  darkSelector: string;
  lightSelector: string;
  useBgImageSelector: string;
};

export function useDarkThemeDomUpdates(theme: ThemeVariant, themeConfig: DarkThemeConfig) {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const { rootElement, darkSelector: dark, lightSelector: light, useBgImageSelector: useBackground } = themeConfig;

    if (theme === 'auto') {
      rootElement.classList.remove(dark, light);
    } else if (theme === 'light') {
      rootElement.classList.add(light);
      rootElement.classList.remove(dark);
    } else if (theme === 'dark') {
      rootElement.classList.add(dark);
      rootElement.classList.remove(light);
    }

    if (!useBackground) {
      // if image is requested before
    }
    setShowBackground(true);

    return () => {
      rootElement.classList.remove(light);
      rootElement.classList.remove(dark);
      rootElement.classList.remove(useBackground);
    };
  }, [theme, themeConfig]);
}

export function isKindOfTheme(s: string): s is ThemeVariant {
  return THEME_VARIANTS.indexOf(s as ThemeVariant) !== -1;
}
