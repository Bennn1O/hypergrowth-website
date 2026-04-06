import { ArrowIcon } from '@/components/ui/arrow-icon'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllOperatingPartnerProfiles,
  getOperatingPartnerProfileBySlug,
  getOperatingPartnerSlugs,
  type PartnerProfile,
} from '@/lib/team'

interface Props {
  params: Promise<{ slug: string }>
}

const containerClass =
  'hpg-container'

const glassClass =
  'hpg-glass'

const btnViolet =
  'hpg-btn-violet group'

const socialIcons: Record<string, { icon: string; label: string }> = {
  linkedinUrl: { icon: '/images/68e76c318862de30ebd604fd_HPG_website_icon_in.svg', label: 'LinkedIn' },
  instagramUrl: { icon: '/images/68e76c31fbfa2332813a4f7d_HPG_website_icon_instagram.svg', label: 'Instagram' },
  youtubeUrl: { icon: '/images/68e76c314844a6859af11f8e_HPG_website_icon_youtube.svg', label: 'YouTube' },
  websiteUrl: { icon: '/images/68e76c31f943fa3247f315c2_HPG_website_icon_web.svg', label: 'Site web' },
}

export async function generateStaticParams() {
  const slugs = await getOperatingPartnerSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const partner = await getOperatingPartnerProfileBySlug(slug)

  if (!partner) {
    return {
      title: 'Operating Partner introuvable | HyperGrowth',
    }
  }

  return {
    title: `${partner.name} | Operating Partner HyperGrowth`,
    description: partner.shortDescription,
    openGraph: {
      title: `${partner.name} | Operating Partner HyperGrowth`,
      description: partner.shortDescription,
      ...(partner.imageUrl ? { images: [partner.imageUrl] } : {}),
    },
  }
}

function SocialLinks({ partner }: { partner: PartnerProfile }) {
  const links = (
    ['linkedinUrl', 'instagramUrl', 'youtubeUrl', 'websiteUrl'] as const
  ).filter((key) => partner[key])

  if (links.length === 0) return null

  return (
    <div className="flex gap-3">
      {links.map((key) => {
        const url = partner[key]
        if (!url) return null
        const { icon, label } = socialIcons[key]
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:border-hpg-orchid/30 hover:bg-white/[0.08]"
            title={label}
          >
            <Image src={icon} alt={label} width={18} height={18} />
          </a>
        )
      })}
    </div>
  )
}

function TeamMemberCard({
  member,
  currentSlug,
}: {
  member: PartnerProfile & { slug: string }
  currentSlug: string
}) {
  const isCurrent = member.slug === currentSlug

  return (
    <Link
      href={`/operating-partners/${member.slug}`}
      className={`flex flex-col gap-3 rounded-[12px] p-5 ${glassClass} transition hover:-translate-y-0.5 hover:border-hpg-orchid/19 ${isCurrent ? 'ring-1 ring-hpg-orchid/40' : ''}`}
    >
      {member.imageUrl ? (
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-lg object-cover object-top"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] text-sm font-medium text-white/40">
          {member.name.split(' ').map((n) => n[0]).join('')}
        </div>
      )}
      <div>
        <p className="text-[0.85rem] font-medium">{member.name}</p>
        <p className="text-[0.75rem] text-hpg-orchid">{member.title}</p>
      </div>
    </Link>
  )
}

export default async function OperatingPartnerPage({ params }: Props) {
  const { slug } = await params
  const partner = await getOperatingPartnerProfileBySlug(slug)

  if (!partner) {
    notFound()
  }

  const allPartners = await getAllOperatingPartnerProfiles()

  return (
    <main className="flex flex-col items-stretch">
      <section className="relative overflow-hidden pt-[180px] pb-16 max-[767px]:pt-[130px] max-[767px]:pb-10">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex gap-12 max-[767px]:flex-col max-[767px]:gap-8">
            {partner.imageUrl && (
              <div className="shrink-0">
                <Image
                  src={partner.imageUrl}
                  alt={`Portrait de ${partner.name}`}
                  width={280}
                  height={350}
                  className={`h-[350px] w-[280px] rounded-[16px] object-cover object-top max-[767px]:h-[280px] max-[767px]:w-full ${glassClass}`}
                  priority
                />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-center gap-5">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                L&apos;Écurie
              </span>
              <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1]">
                {partner.name}
              </h1>
              <p className="text-[1.1rem] font-medium text-hpg-orchid">
                {partner.title}
              </p>
              <p className="max-w-[560px] font-normal leading-[1.7] text-hpg-silver">
                {partner.shortDescription}
              </p>
              {partner.expertiseTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {partner.expertiseTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.75rem] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <SocialLinks partner={partner} />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full pb-8">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                L&apos;équipe complète
              </span>
              <p className="max-w-[500px] font-normal leading-[1.7] text-hpg-silver">
                Operating Partners et Experts de l&apos;écosystème HyperGrowth.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3 max-[991px]:grid-cols-3 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1">
              {allPartners.map((member) => (
                <TeamMemberCard key={member.slug} member={member} currentSlug={slug} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div
            className="relative overflow-hidden rounded-[20px] p-12 text-center max-[767px]:p-8"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(125,63,171,0.35) 0%, rgba(10,4,16,0.95) 70%)',
              border: '1px solid rgba(242,133,240,0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Prochaine étape
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08]">
                Travailler avec{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">{partner.name.split(' ')[0]} ?</span>
              </h2>
              <p className="max-w-[480px] font-normal leading-[1.7] text-hpg-silver">
                Un appel de 30 minutes pour évaluer votre contexte et voir si le fit est là.
              </p>
              <Link href="/contact" className={btnViolet}>
                Réserver un appel
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
