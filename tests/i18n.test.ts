import { describe, expect, test } from 'bun:test';
import { en } from '../src/i18n/dictionaries/en';
import { fr } from '../src/i18n/dictionaries/fr';
import { localizePath, pagePath, resolveLocale, stripLocale } from '../src/i18n/config';

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]));
  }
  return typeof value;
}

describe('dictionaries', () => {
  test('FR and EN share the same keys and list lengths', () => {
    expect(shape(en)).toEqual(shape(fr));
  });

  test('no empty string', () => {
    const empty: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === 'string' && value.trim() === '') empty.push(path);
      else if (value && typeof value === 'object') {
        for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`);
      }
    };
    walk(fr, 'fr');
    walk(en, 'en');
    expect(empty).toEqual([]);
  });
});

describe('routing helpers', () => {
  test('default locale has no prefix', () => {
    expect(localizePath('/', 'fr')).toBe('/');
    expect(localizePath('/work/', 'fr')).toBe('/work');
  });

  test('english is prefixed', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('work/', 'en')).toBe('/en/work');
  });

  test('stripLocale round-trips', () => {
    expect(stripLocale('/en/')).toBe('/');
    expect(stripLocale('/en')).toBe('/');
    expect(stripLocale('/en/work/')).toBe('/work');
    expect(stripLocale('/work/')).toBe('/work');
    expect(localizePath(stripLocale('/en/work/'), 'fr')).toBe('/work');
  });

  test('unknown locale falls back to french', () => {
    expect(resolveLocale(undefined)).toBe('fr');
    expect(resolveLocale('de')).toBe('fr');
    expect(resolveLocale('en')).toBe('en');
  });

  test('pagePath drops the built file name', () => {
    expect(pagePath('/index.html')).toBe('/');
    expect(pagePath('/')).toBe('/');
    expect(pagePath('/en.html')).toBe('/en');
    expect(pagePath('/en')).toBe('/en');
    expect(pagePath('/mentions-legales.html')).toBe('/mentions-legales');
    expect(pagePath('/en/mentions-legales.html')).toBe('/en/mentions-legales');
    expect(stripLocale(pagePath('/en.html'))).toBe('/');
  });
});
