export interface Event {
  id: string
  slug: string
  title: string
  category: string
  status: 'open' | 'candidature' | 'members' | 'past'
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
}

export const events: Event[] = [
  {
    id: 'cafe-croissance-lille',
    slug: 'cafe-croissance-lille',
    title: 'Café Croissance Lille',
    category: 'Café Croissance',
    status: 'past',
    date: 'December 17, 2025',
    location: 'Lille',
    country: 'FRANCE',
    description: 'Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d\'action structuré.',
    longDescription: 'Café Croissance est un cercle de 10–15 entrepreneurs qui viennent résoudre un vrai blocage business ou personnel grâce à un hot seat guidé et à l\'intelligence collective. Pendant deux heures, chacun repart avec plus de clarté, des angles morts révélés et un plan d\'action concret.',
    format: 'Hotseat en groupe',
    targetAudience: 'Entrepreneurs et dirigeants',
    href: '/evenements/cafe-croissance-lille',
  },
  {
    id: 'mastermind-srilanka',
    slug: 'mastermind-srilanka',
    title: 'Mastermind Sri Lanka',
    category: 'Mastermind',
    status: 'candidature',
    date: 'November 29, 2025',
    dateEnd: 'December 7, 2025',
    location: 'Weligama',
    country: 'SRI LANKA',
    description: 'De 4 à 10 jours dans un lieu privé à l\'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d\'autres dirigeants.',
    longDescription: 'Le Mastermind est une expérience immersive combinant débats stratégiques, ateliers pratiques et moments de détente. Un format pensé pour créer des liens profonds et durables avec d\'autres entrepreneurs de haut niveau.',
    format: 'Immersion multi-jours',
    targetAudience: 'Dirigeants confirmés sur candidature',
    href: '/evenements/mastermind-srilanka',
  },
  {
    id: 'charity-gala-winter-2023',
    slug: 'charity-gala-winter-2023',
    title: 'Charity Gala Winter 2023',
    category: 'Événement Spécial',
    status: 'past',
    date: 'Hiver 2023',
    location: 'France',
    country: 'FRANCE',
    description: 'Une soirée d\'exception réservée aux membres HyperClub. Une occasion rare de se rassembler autour d\'une cause commune tout en renforçant les liens avec d\'autres entrepreneurs et dirigeants confirmés.',
    longDescription: 'Charity Gala est une soirée d\'exception réservée aux membres HyperClub. Une occasion rare de se rassembler autour d\'une cause commune tout en renforçant les liens avec d\'autres entrepreneurs et dirigeants confirmés. Au programme : débats enrichissants, moments de connexion authentiques et soutien à une initiative caritative alignée avec nos valeurs.',
    format: 'Soirée networking exclusive',
    targetAudience: 'Membres HyperClub',
    href: '/evenements/charity-gala-winter-2023',
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

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug)
}

export function getAllEvents(): Event[] {
  return events
}
