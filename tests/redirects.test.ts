import { describe, expect, test } from 'bun:test';
import vercel from '../vercel.json';

/**
 * Every URL listed in the previous hypergrowth.fr sitemap (14/11/2026) must land somewhere:
 * on a page of the new site, or on a redirect to one. Losing one loses its search ranking.
 */
const OLD_URLS = [
  '/',
  '/concept/methode-op-x',
  '/concept/case-studies',
  '/concept/test-de-scalabilite',
  '/concept/vsl',
  '/communaute/evenements',
  '/communaute/hyperclub',
  '/communaute/temoignages',
  '/lecurie/a-propos',
  '/lecurie/les-op',
  '/lecurie/ressources',
  '/contact',
  '/mentions-legales',
  '/case-studies/etude-de-cas-pureva',
  '/case-studies/etude-de-cas-nophone',
  '/case-studies/etude-de-cas-koko-kombucha',
  '/case-studies/etude-de-cas-net-and-connect',
  '/case-studies/etude-de-cas-minastorm',
  '/case-studies/etude-de-cas-la-draft',
  '/evenements/cafe-croissance-lille',
  '/evenements/mastermind-srilanka',
  '/operating-partners/anthony-diochon',
  '/operating-partners/ben-bremont-operating-partner',
  '/operating-partners/elise-hetsch',
  '/operating-partners/evan-riquelme-operating-partner',
  '/operating-partners/gabriel-girardon',
  '/operating-partners/guillaume-pesnel',
  '/operating-partners/julie-ducourau-operating-partner',
  '/operating-partners/julie-simon-operating-partner',
  '/operating-partners/killian-palermo',
  '/operating-partners/manon-werquin-operating-partner',
  '/operating-partners/samuel-fernandes',
  '/operating-partners/ulysselsher-operating-partner',
  '/ressources/deleguer-sans-lacher-prise',
  '/ressources/quand-tout-repose-sur-vous-le-piege-du-micro-management',
  // Redirects the previous site already served.
  '/ecurie/a-propos',
  '/ecurie/les-op',
  '/ecurie/ressources',
  '/concept/test-scalabilite',
  '/concept/case-studies/pureva',
  '/operating-partners/ulysse-l-sher-operating-partner',
  '/operating-partners/benjamin-bremont-operating-partner',
  '/questionnaire-immersion',
  '/onboarding-client',
];

/** Pages the new site serves itself. */
const PAGES = ['/', '/en', '/mentions-legales', '/en/mentions-legales'];
const SECTIONS = ['avant', 'methode', 'expertises', 'resultats', 'maison', 'ecosysteme', 'cafe'];

/** Vercel path patterns: `:name*` matches any rest of the path, `:name` one segment. */
function matches(source: string, path: string): boolean {
  const pattern = source
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\/:\w+\*/g, '(?:/.*)?')
    .replace(/:\w+/g, '[^/]+');
  return new RegExp(`^${pattern}$`).test(path);
}

function resolve(path: string): string | undefined {
  if (PAGES.includes(path)) return path;
  return vercel.redirects.find((r) => matches(r.source, path))?.destination;
}

describe('previous hypergrowth.fr URLs', () => {
  test.each(OLD_URLS)('%s lands on a page', (path) => {
    const target = resolve(path);
    expect(target).toBeDefined();
    if (target!.startsWith('https://')) return; // forms on Cockpit
    const [page, hash] = target!.split('#');
    expect(PAGES).toContain(page || '/');
    if (hash) expect(SECTIONS).toContain(hash);
  });

  test('redirects are permanent and never loop', () => {
    for (const r of vercel.redirects) {
      expect(r.statusCode).toBe(301);
      expect(matches(r.source, r.destination.split('#')[0])).toBe(false);
    }
  });
});
