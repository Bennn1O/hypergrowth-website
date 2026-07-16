import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'si8kibky',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-04-05',
  useCdn: true,
})

export const cachedClient = {
  fetch: <T>(query: string, params: Record<string, unknown> = {}) =>
    client.fetch<T>(query, params, { next: { revalidate: 3600 } }),
}
