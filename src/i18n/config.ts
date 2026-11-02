export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  fr: { short: 'FR', name: 'Français', htmlLang: 'fr', og: 'fr_FR' },
  en: { short: 'EN', name: 'English', htmlLang: 'en', og: 'en_US' },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Resolves Astro.currentLocale (or any string) to a supported locale. */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/**
 * Builds a path for a locale. The default locale is served without prefix:
 * localizePath('/', 'fr') -> '/', localizePath('/', 'en') -> '/en/'.
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = `/${path.replace(/^\/+/, '')}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

/** Removes the locale prefix from a pathname: '/en/work/' -> '/work/'. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first) && first !== defaultLocale) {
    return `/${rest.join('/')}`;
  }
  return pathname || '/';
}
