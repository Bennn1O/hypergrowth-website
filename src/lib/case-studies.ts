export interface CaseStudy {
  id: string
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  linkedinName: string
  linkedinUrl: string
  companyUrl: string
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
    description: "Structuration et scaling d'une plateforme innovante.",
    image: '/images/case-studies/pureva-case-study.avif',
    imageAlt: "Cas d'étude Pureva",
    linkedinName: 'Adrien Charles-Nicolas & Vincent Mongis',
    linkedinUrl: 'https://www.linkedin.com/in/adrien-charles-nicolas-b819b6157/',
    companyUrl: 'https://pureva.com',
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
  return staticCaseStudies
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return staticCaseStudies.find((cs) => cs.slug === slug) ?? null
}

export async function getCaseStudySlugs(): Promise<string[]> {
  return staticCaseStudies.map((cs) => cs.slug)
}
