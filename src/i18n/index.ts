import { en } from './dictionaries/en';
import { fr, type Dictionary } from './dictionaries/fr';
import type { Locale } from './config';

export * from './config';
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
