/**
 * Constantes et données pour la page Évènements
 */

export interface EventFormatData {
  id: string
  title: string
  status: string
  description: string
}

export interface EventData {
  id: string
  title: string
  type: string
  date: string
  endDate?: string
  location: string
  country: string
  status: string
  slug: string
  pastEvent?: boolean
}

export interface TestimonialData {
  id: string
  name: string
  title: string
  company: string
  companyUrl: string
  linkedinUrl: string
  image: string
  text: string
}

export const EVENT_FORMATS: EventFormatData[] = [
  {
    id: 'cafe-croissance',
    title: 'Café Croissance',
    status: 'OUVERT AU PUBLIC',
    description:
      'Un format Hotseat. De 8h à 15h, vous placez votre projet face à 10 entrepreneurs et dirigeants confirmés et repartez avec un plan d\'action.',
  },
  {
    id: 'mastermind',
    title: 'Mastermind',
    status: 'SUR CANDIDATURE',
    description:
      'De 4 à 10 jours dans un lieu privé, à l\'étranger, activités, moments d\'échange et de networking. Vous vous créez un réseau solide et vivez une aventure avec d\'autres dirigeants.',
  },
  {
    id: 'diner-hyperclub',
    title: 'Dîners HyperClub',
    status: 'RÉSERVÉ AUX MEMBRES',
    description:
      'Un dîner d\'exception avec 6 à 8 entrepreneurs et dirigeants confirmés, pour échanger et créer des synergies autour d\'une belle table.',
  },
]

export const EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Café Croissance Lille',
    type: 'Café Croissance',
    date: 'December 17, 2025',
    location: 'Lille',
    country: 'FRANCE',
    status: 'Sur inscription',
    slug: 'cafe-croissance-lille',
    pastEvent: true,
  },
  {
    id: '2',
    title: 'Mastermind Sri Lanka',
    type: 'Mastermind',
    date: 'November 29, 2025',
    endDate: 'December 7, 2025',
    location: 'Weligama',
    country: 'SRI LANKA',
    status: 'Sur inscription',
    slug: 'mastermind-srilanka',
    pastEvent: true,
  },
  {
    id: '3',
    title: 'Café Croissance Bordeaux',
    type: 'Café Croissance',
    date: 'November 14, 2025',
    location: 'Bordeaux',
    country: 'FRANCE',
    status: 'Ouvert au public',
    slug: 'cafe-croissance-bordeaux',
    pastEvent: true,
  },
]

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    name: 'Gabriel Girardon Pazienza',
    title: 'CEO',
    company: 'Bleue Citadelle',
    companyUrl: 'https://www.bleuecitadelle.com/',
    linkedinUrl: 'https://www.linkedin.com/in/gabriel-girardon/',
    image: '/images/694a7ec9e29d606df2d8a44a_1632819833484.avif',
    text: 'L\'équipe HG a su s\'adapter à ma posture d\'agence particulière et me proposer un plan de scaling efficace et ultra personnalisé. En alliant le perso et le pro, mon projet a pris une toute autre envergure tout en m\'évitant un surménage qui me semblait inévitable.\n\nUn énorme contraste avec les vendeurs de rêve qui pullulent dans la sphère du consulting, grâce à leur mélange de théorie et de concret. Je recommande chaudement à tous les entrepreneurs/dirigeants qui cherchent à passer un cap tout en restant lean et orientés action !',
  },
  {
    id: '2',
    name: 'Marion Carneiro',
    title: 'CEO',
    company: 'My Name Is Bond',
    companyUrl: 'https://mynameisbond.co/',
    linkedinUrl: 'https://www.linkedin.com/in/marion-carneiro/',
    image: '/images/691ef3e19b06a667ffe4e9e3_1761652261110.avif',
    text: 'Je recommande vivement Killian pour toute personne cherchant à faire passer son business au niveau supérieur. Quand j\'étais confrontée à des défis majeurs qui freinaient la croissance de mon agence My name is Bond, Killian a su identifier rapidement ce qui n\'allait pas en se basant sur de la data.\n\nGrâce à son expertise et à sa vision claire, il m\'a aidé à comprendre ce qui limitait notre progression. On a donc élaboré un plan d\'action concret et précis pour surmonter ces défis, ce qui a transformé notre approche et réaccéléré notre croissance.\n\nDonc, si vous avez besoin d\'une personne capable de diagnostiquer vos problèmes et de vous donner une direction claire, Killian est celui qu\'il vous faut. Merci à lui.',
  },
]

export const FEATURED_TESTIMONIAL_AVATARS = [
  '/images/68f24ff5559ba47fde418d85_julianne-aknine.avif',
  '/images/68f24ff529d2973a4e798c51_marion-carneiro.avif',
  '/images/68f24ff58d7f007873dc70f4_eva-lecocq.avif',
  '/images/68f24ff558e8f8004bcbd487_laura-chetail.avif',
]

export const FEATURE_ITEMS = [
  'Un entrepreneur expose sa problématique, dix autres cerveaux la décortiquent.',
  'En 20 minutes, vous comprenez ce que vous n\'auriez pas pu saisir seul.',
  'Vous obtenez des pistes concrètes pour ajuster offre, posture ou structure',
]

export const STATS = [
  {
    number: '+82%',
    description:
      'des dirigeant.e.s déclarent avoir identifié un frein majeur ignoré jusque-là.',
  },
  {
    number: '+70%',
    description: 'ajustent leur stratégie dans les 7 jours suivants.',
  },
  {
    number: '80+/100',
    description: 'score moyen des entreprises en forte croissance',
  },
]

export const HERO_STATS = {
  directors: '+150',
  ca: '+400M€',
}
