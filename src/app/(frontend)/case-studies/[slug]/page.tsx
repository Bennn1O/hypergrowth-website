import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies'

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} : Cas Client HyperGrowth`,
    description: cs.description,
  }
}

const containerClass = 'hpg-container'
const glassClass = 'hpg-glass-soft'
const btnViolet = 'hpg-btn-violet group'

const Arrow = () => (
  <Image
    src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
    alt=""
    width={18}
    height={18}
    className="transition-transform duration-200 group-hover:-rotate-45"
  />
)

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const { detail } = cs

  return (
    <main className="flex flex-col items-stretch">
      <section className="relative overflow-hidden pt-[180px] pb-12 max-[767px]:pt-[130px]">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[50vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-block self-center rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/50">
              {cs.category}
            </span>
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.02]">
              {cs.title}
            </h1>
            <p className="max-w-[540px] text-[1rem] font-normal leading-[1.7] text-hpg-silver">
              {detail?.subtitle ?? cs.description}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className={`overflow-hidden rounded-[16px] ${cs.imageBgClass ?? ''}`}>
            <Image
              src={detail?.heroImage.src ?? cs.image}
              alt={detail?.heroImage.alt ?? cs.imageAlt}
              width={1300}
              height={700}
              className={`w-full ${cs.imageObjectClass ?? 'object-cover'}`}
              priority
            />
          </div>
        </div>
      </section>

      {detail ? (
        <>
          <section className="mx-auto w-full">
            <div className={containerClass}>
              <div className="flex items-start gap-8 max-[767px]:flex-col">
                <h2 className="w-[240px] shrink-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.1] max-[767px]:w-full">
                  Avant HyperGrowth
                </h2>
                <div className="flex flex-1 gap-4 max-[767px]:flex-col">
                  <div className={`flex flex-1 flex-col gap-6 rounded-[12px] p-8 ${glassClass}`}>
                    <span className="inline-block self-start rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                      {detail.avant.desires.badge}
                    </span>
                    <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                      {detail.avant.desires.title}
                    </h3>
                    <p className="text-[0.9rem] font-normal leading-[1.7] text-hpg-silver">
                      {detail.avant.desires.description}
                    </p>
                  </div>
                  <div className={`flex flex-1 flex-col gap-6 rounded-[12px] p-8 ${glassClass}`}>
                    <span className="inline-block self-start rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                      {detail.avant.problems.badge}
                    </span>
                    <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                      {detail.avant.problems.title}
                    </h3>
                    <p className="text-[0.9rem] font-normal leading-[1.7] text-hpg-silver">
                      {detail.avant.problems.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mx-auto w-full">
            <div className={containerClass}>
              <div className="flex items-start gap-8 max-[767px]:flex-col">
                <h2 className="w-[240px] shrink-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.1] max-[767px]:w-full">
                  Avec HyperGrowth
                </h2>
                <div className="flex flex-1 gap-4 max-[767px]:flex-col">
                  <div className="flex flex-1 flex-col gap-6 rounded-[12px] bg-hpg-violet-btn p-8 shadow-[0_16px_40px_rgb(80_20_120_/_0.35)]">
                    <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                      {detail.apres.solutions.badge}
                    </span>
                    <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                      {detail.apres.solutions.title}
                    </h3>
                    <p className="text-[0.9rem] font-normal leading-[1.7] text-white/85">
                      {detail.apres.solutions.description}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col gap-6 rounded-[12px] bg-hpg-violet-btn p-8 shadow-[0_16px_40px_rgb(80_20_120_/_0.35)]">
                    <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                      {detail.apres.results.badge}
                    </span>
                    <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                      {detail.apres.results.title}
                    </h3>
                    <p className="text-[0.9rem] font-normal leading-[1.7] text-white/85">
                      {detail.apres.results.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mx-auto w-full">
            <div className={containerClass}>
              <div className="flex gap-8 max-[767px]:flex-col">
                {detail.testimonial && (
                  <div className="relative flex flex-1 flex-col gap-6 overflow-hidden rounded-[12px] bg-hpg-violet-btn p-10 max-[767px]:p-8">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-20"
                      style={{
                        background:
                          'radial-gradient(ellipse at 80% 50%, #c084fc 0%, transparent 60%)',
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 flex flex-col gap-6">
                      <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                        Témoignage
                      </span>
                      <p className="text-[1rem] font-normal leading-[1.7] text-white/90">
                        {detail.testimonial.quote}
                      </p>
                      <div className="mt-auto flex items-center gap-3 border-t border-white/20 pt-6">
                        <Image
                          src={detail.testimonial.authorImage}
                          alt={detail.testimonial.author}
                          width={44}
                          height={44}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-[0.9rem] font-medium">{detail.testimonial.author}</p>
                        </div>
                        {detail.testimonial.linkedinUrl && (
                          <Image
                            src="/images/68e3f507fcac1b8c934d1e24_icons8-linkedin-250.svg"
                            alt="LinkedIn"
                            width={20}
                            height={20}
                            className="opacity-60"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex w-[280px] shrink-0 flex-col gap-4 max-[767px]:w-full max-[767px]:flex-row max-[479px]:flex-col">
                  {detail.stats.map((stat, i) => (
                    <div key={i} className={`flex flex-1 flex-col gap-2 rounded-[12px] p-8 ${glassClass}`}>
                      <span className="font-instrument-italic italic text-[2.8rem] leading-none text-hpg-orchid">
                        {stat.value}
                      </span>
                      <span className="mt-2 text-[0.85rem] font-normal leading-[1.5] text-hpg-silver">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto w-full">
          <div className={containerClass}>
            <div className="flex flex-wrap gap-4">
              {cs.stats.map((stat, i) => (
                <div key={i} className={`flex flex-1 min-w-[200px] flex-col gap-2 rounded-[12px] p-8 ${glassClass}`}>
                  <span className="font-instrument-italic italic text-[2.8rem] leading-none text-hpg-orchid">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[0.85rem] font-normal leading-[1.5] text-hpg-silver">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div
            className="relative overflow-hidden rounded-[20px] p-12 text-center max-[767px]:p-8"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(125,63,171,0.35) 0%, rgba(10,4,16,0.95) 70%)',
              border: '1px solid rgba(242,133,240,0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Prochaine étape
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08]">
                Et si c&apos;était votre{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">tour ?</span>
              </h2>
              <p className="max-w-[480px] font-normal leading-[1.7] text-hpg-silver">
                Un Operating Partner analyse votre contexte en 30 minutes. Pas d&apos;engagement,
                juste de la clarté.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className={btnViolet}>
                  Réserver un appel
                  <Arrow />
                </Link>
                <Link
                  href="/concept/case-studies"
                  className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Voir tous les cas clients
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
