export const SITE_URL = 'https://www.hypergrowth.fr'

export const STATIC_SITEMAP_PATHS = [
  '/',
  '/concept/methode-op-x',
  '/contact',
  '/concept/test-de-scalabilite',
  '/lecurie/ressources',
  '/lecurie/a-propos',
  '/communaute/hyperclub',
  '/concept/case-studies',
  '/mentions-legales',
  '/communaute/evenements',
  '/lecurie/les-op',
  '/communaute/temoignages',
  '/concept/vsl',
  '/case-studies/etude-de-cas-pureva',
  '/ressources/deleguer-sans-lacher-prise',
  '/ressources/quand-tout-repose-sur-vous-le-piege-du-micro-management',
  '/evenements/cafe-croissance-lille',
  '/evenements/charity-gala-winter-2023',
  '/evenements/mastermind-srilanka',
] as const

export const OPERATING_PARTNER_SLUGS = [
  'anthony-diochon',
  'ben-bremont-operating-partner',
  'elise-hetsch',
  'evan-riquelme-operating-partner',
  'gabriel-girardon',
  'guillaume-pesnel',
  'julie-ducourau-operating-partner',
  'julie-simon-operating-partner',
  'killian-palermo',
  'manon-werquin-operating-partner',
  'samuel-fernandes',
  'ulysselsher-operating-partner',
] as const

export const EXPERTISE_SLUGS = [
  'comptabilite-finances',
  'crm-email-marketing',
  'design-graphique',
  'direction-artistique',
  'identite-verbale',
  'lead-generation-skills',
  'live-events-webinaires',
  'nutrition-sante',
  'process-expertise',
  'sales-marketing-strategy',
  'scalability-expertise',
  'software-development-expertise',
  'ux-ui',
  'web-design',
] as const

export const TESTIMONIAL_SLUGS = [
  'adrien-charles-testimonial',
  'gabriel-girardon-pazienza',
  'guillaume-vilain',
  'jerome-girard',
  'marion-carneiro',
] as const

export const DYNAMIC_SITEMAP_PATHS = [
  ...OPERATING_PARTNER_SLUGS.map((slug) => `/operating-partners/${slug}`),
  ...EXPERTISE_SLUGS.map((slug) => `/expertises/${slug}`),
  ...TESTIMONIAL_SLUGS.map((slug) => `/temoignages/${slug}`),
] as const

export const ALL_SITEMAP_PATHS = [
  ...STATIC_SITEMAP_PATHS,
  ...DYNAMIC_SITEMAP_PATHS,
]

export function toAbsoluteUrl(path: string): string {
  if (path === '/') {
    return SITE_URL
  }

  return `${SITE_URL}${path}`
}

export function slugToLabel(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
