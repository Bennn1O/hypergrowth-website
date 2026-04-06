import { cachedClient } from '@/sanity/lib/client'
import {
  CASE_STUDIES_LIST_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from '@/sanity/lib/queries'

export interface CaseStudyStat {
  value: string
  label: string
}

export interface CaseStudySection {
  badge: string
  title: string
  description: string
}

export interface CaseStudyDetail {
  subtitle: string
  heroImage: { src: string; alt: string }
  avant: {
    desires: CaseStudySection
    problems: CaseStudySection
  }
  apres: {
    solutions: CaseStudySection
    results: CaseStudySection
  }
  stats: CaseStudyStat[]
  testimonial?: {
    quote: string
    author: string
    authorImage: string
    linkedinUrl?: string
  }
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  category: string
  description: string
  image: string
  imageAlt: string
  imageObjectClass?: string
  imageBgClass?: string
  stats: CaseStudyStat[]
  attribution?: string
  linkedinName?: string
  linkedinUrl?: string
  companyUrl?: string
  detail?: CaseStudyDetail
}

export interface ClientLogo {
  src: string
  alt: string
  width: number
}


const staticCaseStudies: CaseStudy[] = [
  {
    id: 'pureva',
    slug: 'etude-de-cas-pureva',
    title: 'Pureva',
    category: 'Scale-up B2C',
    description:
      "Startup deeptech dans la filtration d'eau. Organisation en tension, trésorerie sous pression, croissance bloquée. En 12 mois, l'entreprise a doublé son ARR et récupéré 100k€ de trésorerie via optimisation financière.",
    image: '/images/691ef6d06b58b6bb2805b595_Frame_427322191.avif',
    imageAlt: 'Pureva — filtre à eau installé sur un robinet',
    stats: [
      { value: '+230%', label: 'Croissance ARR' },
      { value: '+100k€', label: 'Trésorerie récupérée' },
    ],
    attribution: 'Adrien Charles-Nicolas & Vincent Mongis · CEO @ Pureva',
    detail: {
      subtitle: "Comment structurer une startup en hypercroissance sans en brider la dynamique ?",
      heroImage: {
        src: '/images/691ef6d06b58b6bb2805b595_Frame_427322191.avif',
        alt: 'Pureva — filtre à eau installé sur un robinet',
      },
      avant: {
        desires: {
          badge: 'Les Désirs du client',
          title: "Structurer la croissance et stabiliser l'entreprise",
          description:
            'Adrien & Vincent voulaient un cadre stratégique clair (finance, RH, pilotage) pour absorber leur hypercroissance sans perdre en qualité.',
        },
        problems: {
          badge: 'Problèmes et challenges',
          title: 'Hypercroissance non pilotée',
          description:
            "Trésorerie sous pression, modèle 100 % externalisé difficile à coordonner, décisions lentes, absence de pilotage financier et manque d'expertise tech pour la suite.",
        },
      },
      apres: {
        solutions: {
          badge: 'Les Désirs du client',
          title: 'Structuration & pilotage complet.',
          description:
            "Mise en place d'un système financier robuste, optimisation du BFR, structuration des process, gouvernance fondée, intégration de prestataires clés et activation d'un comité scientifique.",
        },
        results: {
          badge: 'Problèmes et challenges',
          title: 'Clarté, alignement et puissance décisionnelle.',
          description:
            "Dirigeants alignés, organisation fluide, vision long terme assumée, écosystème solide (finance, juridique, R&D) et confiance retrouvée dans la capacité à scaler.",
        },
      },
      stats: [
        { value: '+230%', label: "Croissance de l'ARR depuis le début de l'accompagnement." },
        { value: '+100K€', label: 'Trésorerie récupérée via optimisation financière.' },
      ],
      testimonial: {
        quote:
          "Killian possède des qualités d'analyse humaines et structurelles qui peuvent faire changer grandement les choses sur une entreprise en croissance. Il est à la fois votre accélérateur et le pilier d'une structure organisée et surtout efficace !",
        author: 'Adrien Charles-Nicolas & Vincent Mongis',
        authorImage: '/images/6921580b599cf93460328c8c_IMG_8814.webp',
        linkedinUrl: 'https://www.linkedin.com/in/adrien-charles-nicolas-b819b6157/',
      },
    },
  },
  {
    id: 'nophone',
    slug: 'etude-de-cas-nophone',
    title: 'Nophone',
    category: 'E-commerce BtoB',
    description:
      "Marque e-commerce de pochettes anti-ondes à 100K€/mois mais une organisation qui menaçait de s'effondrer sous son propre poids. Équipes mal cadrées, fondateur englué dans l'opérationnel, levée internationale en jeu.",
    image: '/images/nophone-pochette.avif',
    imageAlt: 'Nophone — pochette anti-ondes',
    stats: [
      { value: '+50%', label: 'CA (100K → 150K/mois)' },
      { value: '3x moins', label: 'De temps opérationnel' },
      { value: '5-10M€', label: 'Levée en cours' },
    ],
  },
  {
    id: 'koko-kombucha',
    slug: 'etude-de-cas-koko-kombucha',
    title: 'Koko Kombucha',
    category: 'E-commerce BtoC',
    description:
      "Marque de boissons avec une CEO voulant sortir de l'opérationnel, une croissance à piloter et une réflexion de fond sur l'avenir de l'entreprise. CA passé aux 6 chiffres mensuels, croissance maîtrisée et pilotée.",
    image: '/images/koko-kombucha.webp',
    imageAlt: 'Koko Kombucha — canette produit',
    imageObjectClass: 'object-contain',
    imageBgClass: 'bg-[#e8e4e0]',
    stats: [
      { value: '6 chiffres', label: 'CA mensuel atteint' },
      { value: 'CEO sortie', label: "De l'opérationnel" },
    ],
  },
  {
    id: 'net-and-connect',
    slug: 'etude-de-cas-net-and-connect',
    title: 'Net & Connect',
    category: "Club d'entrepreneurs",
    description:
      "Club d'entrepreneurs autour du padel B2B : belle croissance, zéro process pour la maîtriser. Leads non traités, fondateur englué dans l'opérationnel, croissance qui génère autant de chaos que d'opportunités. Structuration complète et nouvelles verticales lancées.",
    image: '/images/netandconnect.jpg',
    imageAlt: 'Net & Connect — Lucas Lopez, fondateur',
    imageObjectClass: 'object-cover object-[50%_20%]',
    stats: [
      { value: '6 chiffres', label: 'CA mensuel atteint' },
      { value: 'Levée', label: 'En cours' },
    ],
  },
  {
    id: 'minastorm',
    slug: 'etude-de-cas-minastorm',
    title: 'Minastorm',
    category: 'E-commerce, Mode',
    description:
      "Marque de mode féminine à 7 chiffres avec une CEO trop dans le cambouis. Sans visibilité sur sa zone de génie, la posture gestion primait sur la croissance. Repositionnement marketing, activation de leviers sans augmenter la charge.",
    image: '/images/minastorm.webp',
    imageAlt: 'Minastorm — marque de mode féminine',
    imageObjectClass: 'object-cover object-top',
    stats: [
      { value: '7 chiffres', label: 'CA maintenu et soutenu' },
      { value: 'CEO libérée', label: 'Travaille beaucoup moins' },
    ],
  },
  {
    id: 'la-draft',
    slug: 'etude-de-cas-la-draft',
    title: 'La Draft',
    category: 'Agence RPO',
    description:
      "Agence RPO spécialisée profils de niche industrielle et technique. Potentiel évident, mais dirigeants pas encore dans leur zone de génie, process inexistants, blocage sur la capacité à investir. CA aux 6 chiffres mensuels et lancement d'un SaaS accompagné.",
    image: '/images/ladraft-team.jpeg',
    imageAlt: "La Draft — équipe agence RPO",
    stats: [
      { value: '6 chiffres', label: 'CA mensuel atteint' },
      { value: 'SaaS lancé', label: 'Frontliner accompagné' },
    ],
  },
]

export const clientLogos: ClientLogo[] = [
  { src: '/images/logos/logo-1.avif', alt: 'Logo client 1', width: 120 },
  { src: '/images/logos/logo-2.avif', alt: 'Logo client 2', width: 120 },
  { src: '/images/logos/logo-3.avif', alt: 'Logo client 3', width: 150 },
  { src: '/images/logos/logo-4.avif', alt: 'Logo client 4', width: 150 },
  { src: '/images/logos/logo-5.avif', alt: 'Logo client 5', width: 150 },
  { src: '/images/logos/logo-6.avif', alt: 'Logo client 6', width: 200 },
  { src: '/images/logos/logo-sova-care.svg', alt: 'Logo Sova Care', width: 120 },
  { src: '/images/logos/logo-8.avif', alt: 'Logo client 8', width: 150 },
  { src: '/images/logos/logo-9.avif', alt: 'Logo client 9', width: 150 },
  { src: '/images/logos/logo-10.avif', alt: 'Logo client 10', width: 120 },
  { src: '/images/logos/logo-11.avif', alt: 'Logo client 11', width: 100 },
  { src: '/images/logos/logo-12.avif', alt: 'Logo client 12', width: 120 },
  { src: '/images/logos/logo-13.avif', alt: 'Logo client 13', width: 100 },
  { src: '/images/logos/logo-14.avif', alt: 'Logo client 14', width: 150 },
]

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return staticCaseStudies
  const data = await cachedClient.fetch<CaseStudy[]>(CASE_STUDIES_LIST_QUERY)
  return data?.length ? data : staticCaseStudies
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticCaseStudies.find((cs) => cs.slug === slug) ?? null
  }
  const data = await cachedClient.fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG_QUERY, { slug })
  if (data) return data
  return staticCaseStudies.find((cs) => cs.slug === slug) ?? null
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticCaseStudies.map((cs) => cs.slug)
  }
  const data = await cachedClient.fetch<{ slug: string }[]>(CASE_STUDY_SLUGS_QUERY)
  const sanityslugs = data?.map((d) => d.slug).filter(Boolean) ?? []
  return sanityslugs.length ? sanityslugs : staticCaseStudies.map((cs) => cs.slug)
}
