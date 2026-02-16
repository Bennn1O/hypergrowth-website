import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  EXPERTISE_SLUGS,
  slugToLabel,
} from '@/data/sitemap-routes'

interface Props {
  params: Promise<{ slug: string }>
}

const darkSectionClass =
  "relative overflow-hidden bg-[linear-gradient(180deg,rgb(24_10_34_/_0.98),rgb(24_10_34_/_0.86)_40%,rgb(24_10_34_/_0.96)),radial-gradient(circle_farthest-corner_at_18%_14%,rgb(242_133_240_/_0.2),transparent_45%),radial-gradient(circle_farthest-corner_at_86%_82%,rgb(128_63_171_/_0.27),transparent_48%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.06),transparent_32%)] before:content-['']"

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-[#b36fd8] bg-[#7b3da9] px-8 py-4 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_28px_rgb(14_3_21_/_0.45)] transition-all duration-200 hover:-translate-y-px hover:border-[#d19bee] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25),0_18px_34px_rgb(14_3_21_/_0.55)]'

const expertiseLabels: Record<string, string> = {
  'comptabilite-finances': 'Comptabilité & Finances',
  'crm-email-marketing': 'CRM & Email Marketing',
  'design-graphique': 'Design Graphique',
  'direction-artistique': 'Direction Artistique',
  'identite-verbale': 'Identité Verbale',
  'lead-generation-skills': 'Lead Generation',
  'live-events-webinaires': 'Live Events & Webinaires',
  'nutrition-sante': 'Nutrition & Santé',
  'process-expertise': 'Structuration de Process',
  'sales-marketing-strategy': 'Stratégie Sales & Marketing',
  'scalability-expertise': 'Scalabilité',
  'software-development-expertise': 'Software Development',
  'ux-ui': 'UX/UI',
  'web-design': 'Web Design',
}

export function generateStaticParams() {
  return EXPERTISE_SLUGS.map((slug) => ({ slug }))
}

function getExpertiseLabel(slug: string): string {
  return expertiseLabels[slug] ?? slugToLabel(slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!EXPERTISE_SLUGS.includes(slug as (typeof EXPERTISE_SLUGS)[number])) {
    return {
      title: 'Expertise introuvable | HyperGrowth',
    }
  }

  const label = getExpertiseLabel(slug)

  return {
    title: `${label} | Expertises HyperGrowth`,
    description: `Découvrez l'expertise ${label} au sein de l'écosystème HyperGrowth.`,
  }
}

export default async function ExpertisePage({ params }: Props) {
  const { slug } = await params

  if (!EXPERTISE_SLUGS.includes(slug as (typeof EXPERTISE_SLUGS)[number])) {
    notFound()
  }

  const label = getExpertiseLabel(slug)

  return (
    <div className="pt-20">
      <section className={`${darkSectionClass} py-32`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <p className="mb-6 text-sm font-semibold text-purple-400">Expertises</p>
          <h1 className="mb-8 text-5xl font-bold md:text-7xl">{label}</h1>
          <p className="max-w-3xl text-xl text-white/70">
            Cette page est bien routée et indexable. Le contenu détaillé de
            l&apos;expertise est à compléter pendant la migration CMS.
          </p>
          <div className="mt-10">
            <Link
              href="/lecurie/les-op"
              className={primaryButtonClass}
            >
              Voir les Operating Partners
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
