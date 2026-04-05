const OPERATING_PARTNER_SLUGS = [
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

function slugToLabel(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export interface PartnerProfile {
  name: string
  title: string
  shortDescription: string
  imageUrl: string | null
  websiteUrl: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
  youtubeUrl: string | null
  expertiseTags: string[]
}

const fallbackPartnerNameOverrides: Record<string, string> = {
  'anthony-diochon': 'Anthony Diochon',
  'ben-bremont-operating-partner': 'Benjamin Brémont',
  'elise-hetsch': 'Elise Hetsch',
  'evan-riquelme-operating-partner': 'Evan Riquelme',
  'gabriel-girardon': 'Gabriel Girardon',
  'guillaume-pesnel': 'Guillaume Pesnel',
  'julie-ducourau-operating-partner': 'Julie Ducourau',
  'julie-simon-operating-partner': 'Julie Simon',
  'killian-palermo': 'Killian Palermo',
  'manon-werquin-operating-partner': 'Manon Werquin',
  'samuel-fernandes': 'Samuel Fernandes',
  'ulysselsher-operating-partner': 'Ulysse L. Sher',
}

const partnerProfiles: Record<string, PartnerProfile> = {
  'killian-palermo': {
    name: 'Killian Palermo',
    title: 'Fondateur & Operating Partner',
    shortDescription:
      "Entrepreneur et operating partner spécialisé dans l'hypercroissance. Plus de 10 ans d'expérience, 1 exit, 150+ dirigeants accompagnés. Killian a fondé HyperGrowth pour structurer l'accompagnement des dirigeants ambitieux grâce au modèle OP-X.",
    imageUrl: '/images/691c0365fd35bc39df5fa328_8.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/killian-palermo/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Diagnostic de Scalabilité', 'Stratégie Marketing & Vente', "Structuration d'entreprise"],
  },
  'ulysselsher-operating-partner': {
    name: 'Ulysse L. Sher',
    title: 'CEO & Operating Partner',
    shortDescription:
      "Expert du scaling personnel pour dirigeants. Ulysse articule performance physique, clarté mentale et posture sociale pour transformer les fondateurs en moteurs crédibles et durables de leur hypercroissance.",
    imageUrl: '/images/691a9c6ffd17d3b642956b6f_Profil.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/ulysse-el-sherbeeny/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Diagnostic de Scalabilité', 'Lead Generation', 'Stratégie Marketing & Vente'],
  },
  'manon-werquin-operating-partner': {
    name: 'Manon Werquin',
    title: 'Operating Partner',
    shortDescription:
      "Accompagne dirigeants et indépendants dans la structuration de leur organisation. Manon transforme une organisation saturée en système clair et pilotable, avec une expertise pointue en process et outils comme Notion.",
    imageUrl: '/images/691d6cf72d819a8d8fb58687_manon-werquin.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/manon-werquin/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Stratégie Marketing & Vente', "Structuration d'entreprise", 'Lead Generation'],
  },
  'evan-riquelme-operating-partner': {
    name: 'Evan Riquelme',
    title: 'Operating Partner',
    shortDescription:
      "Copywriter spécialisé en direct response et systèmes d'acquisition. Evan conçoit les tunnels de vente, séquences emails et pages qui convertissent pour les dirigeants en phase de scaling.",
    imageUrl: '/images/691c04b0968fd7912c9495f0_evan.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/evan-riquelme/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Lead Generation', 'Stratégie Marketing & Vente', 'Diagnostic de Scalabilité'],
  },
  'ben-bremont-operating-partner': {
    name: 'Benjamin Brémont',
    title: 'Operating Partner',
    shortDescription:
      "Consultant en croissance spécialisé CRM et acquisition. Benjamin structure les systèmes de génération de leads et d'automatisation commerciale pour accélérer la croissance des entreprises.",
    imageUrl: '/images/691c03760aa8bdaef402445a_6.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/benjamin-bremont/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Diagnostic de Scalabilité', 'Lead Generation', "Structuration d'entreprise"],
  },
  'julie-simon-operating-partner': {
    name: 'Julie Simon',
    title: 'Operating Partner',
    shortDescription:
      "COO externalisée spécialisée en distribution, marketing client et management. Julie accompagne les dirigeants dans la structuration opérationnelle de leur croissance, de l'organisation interne à la mise en place de process scalables.",
    imageUrl: '/images/691c061ffd35bc39df62402e_4.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/julie-simon-op/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Stratégie Marketing & Vente', 'Lead Generation', "Structuration d'entreprise"],
  },
  'julie-ducourau-operating-partner': {
    name: 'Julie Ducourau',
    title: 'Operating Partner / Operations Lead',
    shortDescription:
      "Responsable des opérations chez HyperGrowth. Julie pilote les process internes, l'automatisation et la coordination entre les Operating Partners et les experts pour garantir un accompagnement fluide et structuré.",
    imageUrl: '/images/691c030a24953cec9fda438c_2.avif',
    websiteUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/julie-ducourau/',
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Lead Generation', "Structuration d'entreprise", 'Diagnostic de Scalabilité'],
  },
  'gabriel-girardon': {
    name: 'Gabriel Girardon',
    title: 'Expert Brand Identity & UX',
    shortDescription:
      "Expert en image de marque visuelle et verbale. Gabriel conçoit les identités visuelles, interfaces et expériences utilisateur qui donnent de la crédibilité et de la cohérence aux marques en croissance.",
    imageUrl: '/images/692d6588601597f7adcd0b96_portrait.avif',
    websiteUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Design Graphique', 'Web Design', 'UX/UI'],
  },
  'anthony-diochon': {
    name: 'Anthony Diochon',
    title: 'Expert Comptabilité & Finances',
    shortDescription:
      "Expert-comptable avec un cabinet sur-mesure pour dirigeants, parcours KPMG France et Canada. Anthony accompagne les dirigeants en croissance sur la structuration financière, la fiscalité et le pilotage de la performance.",
    imageUrl: '/images/69246e7904d0945af5d37bb6_anthony-diochon.avif',
    websiteUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Comptabilité & Finances'],
  },
  'elise-hetsch': {
    name: 'Elise Hetsch',
    title: 'Experte Nutrition & Santé',
    shortDescription:
      "Nutrithérapeute spécialisée pour dirigeants. Elise aide les entrepreneurs à reprendre le pouvoir sur leur énergie, leur sommeil et leur performance physique pour tenir le rythme de la croissance.",
    imageUrl: '/images/69245b88607064c4ad4689d2_elise-hetsch.avif',
    websiteUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Nutrition & Santé'],
  },
  'samuel-fernandes': {
    name: 'Samuel Fernandes',
    title: 'Expert Live Events',
    shortDescription:
      "Spécialiste des Live Events et webinaires. Samuel fait passer les entreprises de 200k€ à 1M€/an grâce aux Live Events. Il conçoit les formats, les scripts et les systèmes qui transforment un événement en machine à générer du chiffre.",
    imageUrl: '/images/69245a7ec8515e0a48e321d0_samuel-fernandes.avif',
    websiteUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['Live Events (Webinaires)'],
  },
  'guillaume-pesnel': {
    name: 'Guillaume Pesnel',
    title: 'Expert CRM & Email Marketing',
    shortDescription:
      "Maîtrise Klaviyo comme peu d'équipes en France. Guillaume conçoit des systèmes d'email marketing pensés pour générer du chiffre, avec des séquences automatisées et une segmentation pointue.",
    imageUrl: '/images/692458acf8b048f9a195d760_guillaume-pesnel.avif',
    websiteUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    expertiseTags: ['CRM & Email Marketing'],
  },
}

import { client } from '@/sanity/lib/client'
import { ALL_PARTNERS_QUERY, PARTNER_BY_SLUG_QUERY, PARTNER_SLUGS_QUERY } from '@/sanity/lib/queries'

function toFallbackName(slug: string): string {
  return (
    fallbackPartnerNameOverrides[slug] ??
    slugToLabel(slug).replace(' Operating Partner', '')
  )
}

export async function getOperatingPartnerSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [...OPERATING_PARTNER_SLUGS]
  const data = await client.fetch(PARTNER_SLUGS_QUERY)
  const sanitySlugs = data?.map((d: { slug: string }) => d.slug).filter(Boolean) ?? []
  return sanitySlugs.length ? sanitySlugs : [...OPERATING_PARTNER_SLUGS]
}

export async function getOperatingPartnerProfileBySlug(slug: string): Promise<PartnerProfile | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    if (!OPERATING_PARTNER_SLUGS.includes(slug as (typeof OPERATING_PARTNER_SLUGS)[number])) return null
    return partnerProfiles[slug] ?? {
      name: toFallbackName(slug),
      title: 'Operating Partner',
      shortDescription: "Profil en cours d'intégration.",
      imageUrl: null,
      websiteUrl: null,
      linkedinUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
      expertiseTags: [],
    }
  }
  const data = await client.fetch(PARTNER_BY_SLUG_QUERY, { slug })
  if (data) return data as PartnerProfile
  return partnerProfiles[slug] ?? null
}

export async function getAllOperatingPartnerProfiles(): Promise<(PartnerProfile & { slug: string })[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return OPERATING_PARTNER_SLUGS.map((slug) => ({
      ...(partnerProfiles[slug] ?? {
        name: toFallbackName(slug),
        title: 'Operating Partner',
        shortDescription: "Profil en cours d'intégration.",
        imageUrl: null,
        websiteUrl: null,
        linkedinUrl: null,
        instagramUrl: null,
        youtubeUrl: null,
        expertiseTags: [],
      }),
      slug,
    }))
  }
  const data = await client.fetch(ALL_PARTNERS_QUERY)
  if (data?.length) return data as (PartnerProfile & { slug: string })[]
  return OPERATING_PARTNER_SLUGS.map((slug) => ({
    ...(partnerProfiles[slug] ?? {
      name: toFallbackName(slug),
      title: 'Operating Partner',
      shortDescription: "Profil en cours d'intégration.",
      imageUrl: null,
      websiteUrl: null,
      linkedinUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
      expertiseTags: [],
    }),
    slug,
  }))
}
