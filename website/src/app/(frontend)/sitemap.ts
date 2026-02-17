import type { MetadataRoute } from 'next'
import { ALL_SITEMAP_PATHS, toAbsoluteUrl } from '@/data/sitemap-routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ALL_SITEMAP_PATHS.map((path) => ({
    url: toAbsoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
