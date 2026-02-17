import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getOperatingPartnerProfileBySlug,
  getOperatingPartnerSlugs,
} from '@/lib/team'

interface Props {
  params: Promise<{ slug: string }>
}

const darkSectionClass =
  "relative overflow-hidden bg-[linear-gradient(180deg,rgb(24_10_34_/_0.98),rgb(24_10_34_/_0.86)_40%,rgb(24_10_34_/_0.96)),radial-gradient(circle_farthest-corner_at_18%_14%,rgb(242_133_240_/_0.2),transparent_45%),radial-gradient(circle_farthest-corner_at_86%_82%,rgb(128_63_171_/_0.27),transparent_48%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.06),transparent_32%)] before:content-['']"

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-[#b36fd8] bg-[#7b3da9] px-8 py-4 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_28px_rgb(14_3_21_/_0.45)] transition-all duration-200 hover:-translate-y-px hover:border-[#d19bee] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25),0_18px_34px_rgb(14_3_21_/_0.55)]'

interface PartnerProfile {
  name: string
  title: string
  shortDescription: string
  imageUrl: string | null
  websiteUrl: string | null
  linkedinUrl: string | null
}

async function getPartnerProfile(slug: string): Promise<PartnerProfile | null> {
  return getOperatingPartnerProfileBySlug(slug)
}

export async function generateStaticParams() {
  const slugs = await getOperatingPartnerSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const partner = await getPartnerProfile(slug)

  if (!partner) {
    return {
      title: 'Operating Partner introuvable | HyperGrowth',
    }
  }

  return {
    title: `${partner.name} | Operating Partner HyperGrowth`,
    description: partner.shortDescription,
  }
}

export default async function OperatingPartnerPage({ params }: Props) {
  const { slug } = await params
  const partner = await getPartnerProfile(slug)

  if (!partner) {
    notFound()
  }

  return (
    <div className="pt-20">
      <section className={`${darkSectionClass} py-32`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <p className="mb-6 text-sm font-semibold text-purple-400">L&apos;équipe</p>
          {partner.imageUrl && (
            <img
              src={partner.imageUrl}
              alt={`Photo de ${partner.name}`}
              className="mb-8 h-28 w-28 rounded-2xl border border-white/15 object-cover shadow-[0_14px_30px_rgb(6_1_10_/_0.45)]"
              loading="lazy"
            />
          )}
          <h1 className="mb-8 text-5xl font-bold md:text-7xl">{partner.name}</h1>
          <p className="mb-4 text-xl text-white/70">{partner.title}</p>
          <p className="max-w-3xl text-xl text-white/70">{partner.shortDescription}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/lecurie/les-op"
              className={primaryButtonClass}
            >
              Retour aux Operating Partners
            </Link>

            {partner.websiteUrl && (
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-4 font-semibold text-white/90 transition-colors hover:bg-white/5"
              >
                Website
              </a>
            )}

            {partner.linkedinUrl && (
              <a
                href={partner.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-4 font-semibold text-white/90 transition-colors hover:bg-white/5"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
