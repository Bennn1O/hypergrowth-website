export interface EventDetail {
  label: string
  value: string
}

export interface EventProgrammeStep {
  time: string
  title: string
  description: string
}

export interface EventPillar {
  title: string
  description: string
}

export interface EventPhoto {
  src: string
  alt: string
}

export interface EventConceptPanel {
  badge: string
  title: string
  body: string[]
}

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
  // Rich page content
  heroImage?: string
  details?: EventDetail[]
  conceptPanel?: EventConceptPanel
  programme?: EventProgrammeStep[]
  pillars?: EventPillar[]
  photos?: EventPhoto[]
}

const staticEvents: Event[] = [
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
    heroImage: '/images/692022b3e666fbb63e06e4db_HPG_café-croissance.avif',
    details: [
      { label: 'Date', value: '17 décembre 2025' },
      { label: 'Horaires', value: '8h — 15h' },
      { label: 'Format', value: 'Hot seat' },
      { label: 'Lieu', value: 'Lille (59800)' },
      { label: 'Places', value: '10 entrepreneurs max' },
      { label: 'Accès', value: 'Sur inscription' },
    ],
    conceptPanel: {
      badge: 'Le format',
      title: 'Hot seat collectif',
      body: [
        "Vous arrivez avec une problématique floue et vous repartez avec un plan d'action clair. 10 entrepreneurs et dirigeants confirmés se penchent sur votre cas pendant une heure.",
        "L'intelligence collective est mise au service de votre business. Pas de théorie, que du concret.",
      ],
    },
    programme: [
      {
        time: '8h00',
        title: 'Accueil & petit-déjeuner',
        description: 'Prise de contact avec les autres participants dans un cadre détendu.',
      },
      {
        time: '9h00',
        title: 'Présentation des projets',
        description:
          'Chaque entrepreneur présente son business, ses défis et sa problématique du moment.',
      },
      {
        time: '10h30',
        title: 'Hot seats collectifs',
        description:
          "L'intelligence collective se met au service de chaque projet. Questions, analyse, recommandations.",
      },
      {
        time: '13h00',
        title: 'Déjeuner réseau',
        description: 'Temps libre pour tisser des liens et explorer des synergies.',
      },
      {
        time: '14h30',
        title: "Plan d'action & clôture",
        description:
          "Chaque participant repart avec un plan d'action structuré et des contacts qualifiés.",
      },
    ],
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
    heroImage: '/images/6917211537fb0b829a250c5b_weligama-beach.avif',
    details: [
      { label: 'Dates', value: '29 nov. — 7 déc. 2025' },
      { label: 'Durée', value: '9 jours' },
      { label: 'Lieu', value: 'Weligama, Sri Lanka' },
      { label: 'Hébergement', value: 'Kima Surf' },
      { label: 'Participants', value: '10 — 20 entrepreneurs' },
      { label: 'Accès', value: 'Sur candidature' },
    ],
    conceptPanel: {
      badge: 'Le concept',
      title: 'Scaler autrement',
      body: [
        "Le Mastermind HyperGrowth, c'est l'idée que les meilleures décisions business se prennent quand on sort du quotidien, entouré de gens qui comprennent vos enjeux.",
        "9 jours au Sri Lanka pour travailler en profondeur, tisser des relations fortes et revenir avec un plan d'action béton.",
      ],
    },
    pillars: [
      {
        title: 'Ateliers de croissance',
        description:
          'Sessions de travail intensives sur vos sujets business. Stratégie, organisation, acquisition, management.',
      },
      {
        title: 'Hot seats collectifs',
        description:
          "Présentez vos blocages face au groupe. L'intelligence collective au service de votre croissance.",
      },
      {
        title: 'Networking de qualité',
        description:
          'Créez des relations solides avec des entrepreneurs partageant vos enjeux. Des synergies durables.',
      },
      {
        title: 'Ressourcement',
        description:
          'Activités en pleine nature, surf, exploration. Recharger pour mieux performer.',
      },
    ],
    photos: [
      {
        src: '/images/6917211537fb0b829a250c5b_weligama-beach.avif',
        alt: 'Plage de Weligama, Sri Lanka',
      },
      {
        src: '/images/6921393726a2b63f250dc53f_Kima-Surf-Sri-Lanka-Weligama-3.avif',
        alt: 'Kima Surf Hotel, Weligama',
      },
      {
        src: '/images/6921379f82977e6bf5b9dcc3_Tangalle-Sri-Lanka-Aerial.avif',
        alt: 'Vue aérienne, Sri Lanka',
      },
    ],
  },
]

export const eventTypes = [
  {
    title: 'Café Croissance',
    status: 'OUVERT AU PUBLIC',
    description:
      "Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d'action structuré.",
  },
  {
    title: 'Mastermind',
    status: 'SUR CANDIDATURE',
    description:
      "De 4 à 10 jours dans un lieu privé à l'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d'autres dirigeants.",
  },
  {
    title: 'Dîners HyperClub',
    status: 'RÉSERVÉ AUX MEMBRES',
    description:
      "Un dîner d'exception avec 6 à 8 entrepreneurs et dirigeants confirmés. Un moment exclusif pour échanger, créer des synergies et tisser des relations fortes autour d'une belle table.",
  },
]

import { client } from '@/sanity/lib/client'
import { ALL_EVENTS_QUERY, EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from '@/sanity/lib/queries'

function sortEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
    if (a.publishedAt) return -1
    if (b.publishedAt) return 1
    return a.title.localeCompare(b.title, 'fr')
  })
}

export async function getAllEvents(): Promise<Event[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return sortEvents(staticEvents)
  const data = await client.fetch(ALL_EVENTS_QUERY)
  return data?.length ? (data as Event[]) : sortEvents(staticEvents)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticEvents.find((event) => event.slug === slug) ?? null
  }
  const data = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })
  if (data) return data as Event
  return staticEvents.find((event) => event.slug === slug) ?? null
}

export async function getEventSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticEvents.map((event) => event.slug)
  }
  const data = await client.fetch(EVENT_SLUGS_QUERY)
  const sanitySlugs = data?.map((d: { slug: string }) => d.slug).filter(Boolean) ?? []
  return sanitySlugs.length ? sanitySlugs : staticEvents.map((event) => event.slug)
}
