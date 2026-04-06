import { ArrowIcon } from '@/components/ui/arrow-icon'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllTestimonials } from '@/lib/testimonials'

export const metadata: Metadata = {
  title: 'Témoignages clients | HyperGrowth',
  description:
    'Ce que nos clients disent de leur accompagnement HyperGrowth. 150+ dirigeants accompagnés, 97% de satisfaction.',
}

const containerClass = 'hpg-container'

const btnViolet = 'hpg-btn-violet group'

const clientLogos = [
  { src: '/images/68f246d99c0f71325b0fa8c9_10.avif', alt: '' },
  { src: '/images/68f246d902445111cfe4d20d_8.avif', alt: '' },
  { src: '/images/68f246d8f3f048136e02e401_3.avif', alt: '' },
  { src: '/images/68f246d82979e450b678014f_6.avif', alt: '' },
  { src: '/images/68f246d829b9ad261622ba22_12.avif', alt: '' },
  { src: '/images/68f246d8564c0248e12490c9_5.avif', alt: '' },
  { src: '/images/68f246d8728a7b045347ea0f_logo-sova-care.svg', alt: '' },
  { src: '/images/68f246d863b4e3d783e683cf_14.avif', alt: '' },
  { src: '/images/68f246d8360b7b49e57bcd69_13.avif', alt: '' },
  { src: '/images/68f246d85e5a645da800b0a9_4.avif', alt: '' },
  { src: '/images/690b518dd86eff19215d6875_HPG_web_logos-partenaires_12.avif', alt: '' },
  { src: '/images/690b518d4cca311dae76b1e0_HPG_web_logos-partenaires_14.avif', alt: '' },
  { src: '/images/690b518c1b1be138f398eb4e_HPG_web_logos-partenaires_13.avif', alt: '' },
  { src: '/images/690b518ce5274c3996037d83_HPG_web_logos-partenaires_11.avif', alt: '' },
]

export default async function TemoignagesPage() {
  const testimonials = await getAllTestimonials()

  return (
    <main className="flex flex-col items-stretch">
      <section className="relative overflow-hidden pt-[180px] pb-16 max-[767px]:pt-[130px] max-[767px]:pb-10">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Communauté
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Témoignages
            </h1>
            <p className="max-w-[500px] font-normal leading-[1.7] text-hpg-silver">
              Ce que nos clients disent de leur accompagnement.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-4">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Ils nous font confiance
            </span>
            <div className="flex flex-wrap items-center gap-8 opacity-50 max-[767px]:gap-5">
              {clientLogos.map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="h-7 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-4">
            {testimonials.length === 0 ? (
              <p className="text-[0.95rem] text-white/40">Aucun témoignage pour le moment.</p>
            ) : (
              testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-6 rounded-[12px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-[8px] max-[767px]:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-hpg-orchid">
                      Témoignage
                    </span>
                    <Image
                      src="/images/68f62f2bf8f3beee3f75c9cb_HPG_website_icon_quote_blanc.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="shrink-0 opacity-20"
                    />
                  </div>
                  <p className="text-[0.95rem] leading-[1.75] text-hpg-silver">{t.quote}</p>
                  <div className="flex items-center gap-4 border-t border-white/[0.06] pt-6">
                    {t.photo && (
                      <Image
                        src={t.photo}
                        alt={t.author}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                      />
                    )}
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.9rem] font-medium">{t.author}</span>
                        {t.linkedinUrl && (
                          <a
                            href={t.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:opacity-70"
                          >
                            <Image
                              src="/images/68e76c318862de30ebd604fd_HPG_website_icon_in.svg"
                              alt="LinkedIn"
                              width={16}
                              height={16}
                            />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.8rem] text-hpg-silver">
                        {t.role && (
                          <span className="font-instrument-italic italic text-hpg-orchid">{t.role}</span>
                        )}
                        {t.role && t.company && <span>@</span>}
                        {t.company && (
                          t.companyUrl ? (
                            <a
                              href={t.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-white/20 underline-offset-2 transition hover:decoration-white/60"
                            >
                              {t.company}
                            </a>
                          ) : (
                            <span>{t.company}</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-stretch gap-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02] max-[767px]:flex-col">
            <div className="flex flex-1 flex-col gap-5 p-10 max-[767px]:p-8">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                L&apos;HyperClub
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Une communauté qui vous{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">comprend</span>
              </h2>
              <p className="font-normal leading-[1.7] text-hpg-silver">
                En rejoignant HyperGrowth, vous intégrez un collectif engagé, qui vous fait
                avancer plus vite, réfléchir plus justement, et accéder aux bonnes personnes
                au bon moment.
              </p>
              <Link href="/communaute/hyperclub" className={`self-start ${btnViolet}`}>
                Rejoindre l&apos;HyperClub
                <ArrowIcon />
              </Link>
            </div>
            <div className="w-[360px] shrink-0 overflow-hidden max-[767px]:w-full">
              <Image
                src="/images/68dff51fedf4c46812d51800_club.avif"
                alt="Membres HyperClub"
                width={720}
                height={540}
                className="h-full w-full object-cover max-[767px]:h-[240px]"
              />
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
                C&apos;est votre tour{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">maintenant.</span>
              </h2>
              <p className="max-w-[480px] font-normal leading-[1.7] text-hpg-silver">
                Un Operating Partner analyse votre contexte en 30 minutes. Pas d&apos;engagement, juste de la clarté.
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
