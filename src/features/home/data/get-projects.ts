import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../../../i18n';

export type ProjectEntry = CollectionEntry<'projects'>;

/** Projects for one locale, sorted by `order`. Entries live in src/content/projects/<locale>/. */
export async function getProjects(locale: Locale): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', ({ id }) => id.startsWith(`${locale}/`));
  return entries.sort((a, b) => a.data.order - b.data.order);
}
