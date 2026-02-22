import { readItems } from '@directus/sdk'
import { requestDirectus, type DirectusRecord } from '@/lib/directus'

const eventsCollection = process.env.DIRECTUS_EVENTS_COLLECTION ?? 'events'

export interface Event {
  id: string
  slug: string
  title: string
  category: string
  status: 'open' | 'candidature' | 'members' | 'past'
  accessMode?: string
  isPast?: boolean
  date: string
  dateEnd?: string
  location: string
  country: string
  description: string
  longDescription: string
  format: string
  targetAudience: string
  imageUrl?: string
  href: string
  publishedAt?: string | null
}

const fallbackEvents: Event[] = [
  {
    id: 'cafe-croissance-lille',
    slug: 'cafe-croissance-lille',
    title: 'Café Croissance Lille',
    category: 'Café Croissance',
    status: 'past',
    accessMode: 'Sur inscription',
    isPast: true,
    date: 'December 17, 2025',
    location: 'Lille',
    country: 'FRANCE',
    description:
      "Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d'action structuré.",
    longDescription:
      "Café Croissance est un cercle de 10-15 entrepreneurs qui viennent résoudre un vrai blocage business ou personnel grâce à un hot seat guidé et à l'intelligence collective. Pendant deux heures, chacun repart avec plus de clarté, des angles morts révélés et un plan d'action concret.",
    format: 'Hotseat en groupe',
    targetAudience: 'Entrepreneurs et dirigeants',
    href: '/evenements/cafe-croissance-lille',
    publishedAt: '2025-12-17T08:00:00.000Z',
  },
  {
    id: 'mastermind-srilanka',
    slug: 'mastermind-srilanka',
    title: 'Mastermind Sri Lanka',
    category: 'Mastermind',
    status: 'past',
    accessMode: 'Sur inscription',
    isPast: true,
    date: 'November 29, 2025',
    dateEnd: 'December 7, 2025',
    location: 'Weligama',
    country: 'SRI LANKA',
    description:
      "De 4 à 10 jours dans un lieu privé à l'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d'autres dirigeants.",
    longDescription:
      "Le Mastermind est une expérience immersive combinant débats stratégiques, ateliers pratiques et moments de détente. Un format pensé pour créer des liens profonds et durables avec d'autres entrepreneurs de haut niveau.",
    format: 'Immersion multi-jours',
    targetAudience: 'Dirigeants confirmés sur candidature',
    href: '/evenements/mastermind-srilanka',
    publishedAt: '2025-11-29T08:00:00.000Z',
  },
  {
    id: 'charity-gala-winter-2023',
    slug: 'charity-gala-winter-2023',
    title: 'Café Croissance Bordeaux',
    category: 'Café Croissance',
    status: 'past',
    accessMode: 'Ouvert au public',
    isPast: true,
    date: 'November 14, 2025',
    location: 'Bordeaux',
    country: 'FRANCE',
    description:
      "Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d'action structuré.",
    longDescription:
      "Le Café Croissance est un cercle d'entrepreneurs en croissance où chacun met sur la table un problème réel et repart avec un plan clair. Format hot seat : une personne expose sa situation, le groupe décortique, challenge, apporte des angles morts et des solutions concrètes.",
    format: 'Hotseat en groupe',
    targetAudience: 'Entrepreneurs et dirigeants',
    href: '/evenements/charity-gala-winter-2023',
    publishedAt: '2025-11-14T08:00:00.000Z',
  },
]

export const eventTypes = [
  {
    title: 'Café Croissance',
    status: 'OUVERT AU PUBLIC',
    description: 'Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d\'action structuré.',
  },
  {
    title: 'Mastermind',
    status: 'SUR CANDIDATURE',
    description: 'De 4 à 10 jours dans un lieu privé à l\'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d\'autres dirigeants.',
  },
  {
    title: 'Dîners HyperClub',
    status: 'RÉSERVÉ AUX MEMBRES',
    description: 'Un dîner d\'exception avec 6 à 8 entrepreneurs et dirigeants confirmés. Un moment exclusif pour échanger, créer des synergies et tisser des relations fortes autour d\'une belle table.',
  },
]

function getStringField(item: DirectusRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = item[key]
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }

  return null
}

function getBooleanField(item: DirectusRecord, keys: string[]): boolean | null {
  for (const key of keys) {
    const value = item[key]
    if (typeof value === 'boolean') {
      return value
    }
  }

  return null
}

function normalizeStatus(value: string | null): Event['status'] {
  if (value === 'open' || value === 'candidature' || value === 'members' || value === 'past') {
    return value
  }

  return 'past'
}

function mapEvent(item: DirectusRecord): Event | null {
  const slug = getStringField(item, ['slug'])
  const title = getStringField(item, ['title', 'name'])

  if (!slug || !title) {
    return null
  }

  const idValue = item.id
  const id =
    typeof idValue === 'string' || typeof idValue === 'number'
      ? String(idValue)
      : slug
  const status = normalizeStatus(getStringField(item, ['status']))
  const isPast = getBooleanField(item, ['is_past', 'isPast']) ?? status === 'past'
  const href = getStringField(item, ['href', 'path']) ?? `/evenements/${slug}`

  return {
    id,
    slug,
    title,
    category: getStringField(item, ['category', 'type']) ?? 'Évènement',
    status,
    accessMode: getStringField(item, ['access_mode', 'accessMode']) ?? undefined,
    isPast,
    date: getStringField(item, ['date', 'start_date', 'startDate']) ?? 'Date à confirmer',
    dateEnd: getStringField(item, ['date_end', 'dateEnd', 'end_date', 'endDate']) ?? undefined,
    location: getStringField(item, ['location', 'city']) ?? 'À confirmer',
    country: getStringField(item, ['country']) ?? 'FRANCE',
    description:
      getStringField(item, ['description', 'excerpt', 'summary']) ??
      'Détails en cours de finalisation.',
    longDescription:
      getStringField(item, ['long_description', 'longDescription', 'content']) ??
      'Le détail complet de cet évènement est en cours de finalisation.',
    format: getStringField(item, ['format']) ?? 'Format en cours de définition',
    targetAudience:
      getStringField(item, ['target_audience', 'targetAudience']) ??
      'Dirigeants et entrepreneurs',
    imageUrl: getStringField(item, ['image_url', 'imageUrl']) ?? undefined,
    href,
    publishedAt: getStringField(item, ['published_at', 'publishedAt']) ?? null,
  }
}

function sortEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }

    if (a.publishedAt) {
      return -1
    }

    if (b.publishedAt) {
      return 1
    }

    return a.title.localeCompare(b.title, 'fr')
  })
}

export async function getAllEvents(): Promise<Event[]> {
  const items = await requestDirectus(
    readItems(eventsCollection, {
      fields: ['*'],
      limit: 200,
      sort: ['-published_at', '-date', 'title'],
    }),
  )

  if (!items || items.length === 0) {
    return sortEvents(fallbackEvents)
  }

  const events = items
    .map((item) => mapEvent(item as DirectusRecord))
    .filter((item): item is Event => Boolean(item))

  if (events.length === 0) {
    return sortEvents(fallbackEvents)
  }

  return sortEvents(events)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getAllEvents()
  return events.find((event) => event.slug === slug) ?? null
}

export async function getEventSlugs(): Promise<string[]> {
  const events = await getAllEvents()
  return events.map((event) => event.slug)
}
