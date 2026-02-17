import { readItem, readItems, withToken } from '@directus/sdk'
import { requestDirectus, type DirectusRecord } from '@/lib/directus'

const articlesCollection =
  process.env.DIRECTUS_ARTICLES_COLLECTION ??
  process.env.DIRECTUS_RESOURCES_COLLECTION ??
  'articles'

export interface ResourceArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string | null
}

const fallbackArticles: Record<string, ResourceArticle> = {
  'deleguer-sans-lacher-prise': {
    id: 'fallback-deleguer-sans-lacher-prise',
    slug: 'deleguer-sans-lacher-prise',
    title: 'Déléguer sans lâcher prise',
    excerpt: 'Comment déléguer efficacement sans perdre le contrôle stratégique.',
    content: 'Article en cours de mise en forme finale.',
    publishedAt: null,
  },
  'quand-tout-repose-sur-vous-le-piege-du-micro-management': {
    id: 'fallback-micro-management',
    slug: 'quand-tout-repose-sur-vous-le-piege-du-micro-management',
    title: 'Quand tout repose sur vous : le piège du micro-management',
    excerpt: 'Quand tout repose sur vous : reprendre le lead sans micro-manager.',
    content: 'Article en cours de mise en forme finale.',
    publishedAt: null,
  },
}

function getStringField(item: DirectusRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = item[key]
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }

  return null
}

function getIdField(item: DirectusRecord): string | null {
  const id = item.id
  if (typeof id === 'string' || typeof id === 'number') {
    return String(id)
  }

  return null
}

function mapResourceArticle(item: DirectusRecord): ResourceArticle | null {
  const id = getIdField(item)
  const slug = getStringField(item, ['slug'])
  const title = getStringField(item, ['title', 'name'])

  if (!id || !slug || !title) {
    return null
  }

  return {
    id,
    slug,
    title,
    excerpt:
      getStringField(item, ['excerpt', 'description', 'summary', 'chapo']) ??
      'Article en cours de rédaction.',
    content:
      getStringField(item, ['content', 'body', 'article']) ??
      'Article en cours de rédaction.',
    publishedAt:
      getStringField(item, [
        'published_at',
        'publishedAt',
        'date_published',
        'date_created',
      ]) ?? null,
  }
}

export async function getPublishedResourceBySlug(
  slug: string,
): Promise<ResourceArticle | null> {
  const resources = await requestDirectus(
    readItems(articlesCollection, {
      filter: {
        slug: {
          _eq: slug,
        },
      } as never,
      fields: ['*'],
      limit: 1,
    }),
  )

  const mappedResource = resources?.[0]
    ? mapResourceArticle(resources[0] as DirectusRecord)
    : null

  return mappedResource ?? fallbackArticles[slug] ?? null
}

interface PreviewResourceParams {
  id: string
  token: string
  version?: string
}

export async function getPreviewResourceById({
  id,
  token,
  version,
}: PreviewResourceParams): Promise<ResourceArticle | null> {
  const resource = await requestDirectus(
    withToken(
      token,
      readItem(articlesCollection, id, {
        fields: ['*'],
        ...(version ? { version } : {}),
      }),
    ),
  )

  if (!resource) {
    return null
  }

  return mapResourceArticle(resource as DirectusRecord)
}
