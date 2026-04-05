import type { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/lib/case-studies'
import { getEventSlugs } from '@/lib/events'
import { getOperatingPartnerSlugs } from '@/lib/team'

const SITE_URL = 'https://www.hypergrowth.fr'

const url = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)

const STATIC_PATHS = [
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
]

const RESOURCE_SLUGS = [
  'deleguer-sans-lacher-prise',
  'quand-tout-repose-sur-vous-le-piege-du-micro-management',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [caseStudies, eventSlugs, partnerSlugs] = await Promise.all([
    getAllCaseStudies(),
    getEventSlugs(),
    getOperatingPartnerSlugs(),
  ])

  const allPaths = [
    ...STATIC_PATHS,
    ...caseStudies.map((cs) => `/case-studies/${cs.slug}`),
    ...eventSlugs.map((slug) => `/evenements/${slug}`),
    ...partnerSlugs.map((slug) => `/operating-partners/${slug}`),
    ...RESOURCE_SLUGS.map((slug) => `/ressources/${slug}`),
  ]

  return allPaths.map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
