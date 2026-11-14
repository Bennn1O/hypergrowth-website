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
 * URLs never end with a slash (same scheme as the previous hypergrowth.fr, so indexed URLs hold):
 * localizePath('/', 'fr') -> '/', localizePath('/', 'en') -> '/en', localizePath('/x', 'en') -> '/en/x'.
 */
export function localizePath(path: string, locale: Locale): string {
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const clean = `/${trimmed}`;
  if (locale === defaultLocale) return clean;
  return trimmed ? `/${locale}${clean}` : `/${locale}`;
}

/**
 * The public path of the page being rendered. Pages are built as files (`/en.html`,
 * `/mentions-legales.html`) and served without the extension, so drop `.html` and `index`:
 * '/index.html' -> '/', '/en.html' -> '/en', '/en/mentions-legales.html' -> '/en/mentions-legales'.
 */
export function pagePath(pathname: string): string {
  const path = pathname
    .replace(/\.html$/, '')
    .replace(/\/index$/, '/')
    .replace(/(.)\/+$/, '$1');
  return path === '' || path === '/index' ? '/' : path;
}

/** Removes the locale prefix from a pathname: '/en/work' -> '/work', '/en' -> '/'. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first) && first !== defaultLocale) {
    return `/${rest.join('/')}`.replace(/\/+$/, '') || '/';
  }
  return pathname.replace(/(.)\/+$/, '$1') || '/';
}
