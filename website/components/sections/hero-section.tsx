import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight01Icon } from 'hugeicons-react'

const logos = [
  { src: '/images/68f246d99c0f71325b0fa8c9_10.avif', width: 120 },
  { src: '/images/68f246d902445111cfe4d20d_8.avif', width: 120 },
  { src: '/images/68f246d8f3f048136e02e401_3.avif', width: 150 },
  { src: '/images/68f246d82979e450b678014f_6.avif', width: 150 },
  { src: '/images/68f246d829b9ad261622ba22_12.avif', width: 150 },
  { src: '/images/68f246d8564c0248e12490c9_5.avif', width: 200 },
  { src: '/images/68f246d8728a7b045347ea0f_logo-sova-care.svg', width: 120 },
  { src: '/images/68f246d863b4e3d783e683cf_14.avif', width: 150 },
  { src: '/images/68f246d8360b7b49e57bcd69_13.avif', width: 150 },
  { src: '/images/68f246d85e5a645da800b0a9_4.avif', width: 120 },
  { src: '/images/690b518dd86eff19215d6875_HPG_web_logos-partenaires_12.avif', width: 100 },
  { src: '/images/690b518d4cca311dae76b1e0_HPG_web_logos-partenaires_14.avif', width: 120 },
  { src: '/images/690b518c1b1be138f398eb4e_HPG_web_logos-partenaires_13.avif', width: 100 },
  { src: '/images/690b518ce5274c3996037d83_HPG_web_logos-partenaires_11.avif', width: 150 },
]

const stats = [
  { value: '400M€', label: 'valeur créée' },
  { value: '150+', label: 'dirigeants accompagnés' },
  { value: '12 mois', label: 'pour que ça tienne' },
]

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-hidden px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

export function HeroSection() {
  const marqueeLogos = [...logos, ...logos]

  return (
    <section
      className="relative mb-6 overflow-hidden pt-[clamp(5.4rem,10vw,7.5rem)] max-[767px]:mb-4 max-[767px]:pt-26 md:mb-10"
    >
      {/* Gradient glow - orchid top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] -top-[10%] h-[70vh] w-[60vw] rounded-full opacity-[0.18] blur-[120px] max-[767px]:h-[50vh] max-[767px]:w-[80vw] max-[767px]:opacity-[0.14]"
        style={{ background: 'radial-gradient(circle, #f285f0, transparent 70%)' }}
      />
      {/* Gradient glow - violet right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15%] top-[20%] h-[60vh] w-[50vw] rounded-full opacity-[0.14] blur-[120px] max-[767px]:h-[40vh] max-[767px]:w-[70vw] max-[767px]:opacity-[0.1]"
        style={{ background: 'radial-gradient(circle, #803fab, transparent 70%)' }}
      />
      {/* Gradient image overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/68f5e45298cd778cac552b86_HPG_website_gradient-2.avif')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen"
      />

      <div className={containerClass}>
        <div className="flex flex-col items-center justify-between gap-[clamp(3rem,6vw,5rem)] py-[clamp(1.1rem,3vw,2.5rem)] max-[767px]:gap-16 max-[479px]:px-4">

          {/* Main hero content */}
          <div className="flex w-full flex-col items-center gap-8 text-center max-[767px]:gap-6">

            {/* Tagline */}
            <span className="hpg-hero-animate hpg-hero-animate-1 text-[0.85rem] font-archivo leading-[1.3] tracking-[0.06em] text-hpg-silver max-[479px]:text-[0.75rem] md:text-base">
              OPERATING, YOUR WAY.
            </span>

            {/* H1 */}
            <h1 className="hpg-hero-animate hpg-hero-animate-2 mx-auto max-w-[22ch] text-center text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-[1.0] tracking-[-0.025em] max-[991px]:text-[clamp(2.2rem,5.5vw,3.2rem)] max-[991px]:leading-[1.05] max-[767px]:text-[clamp(2rem,7.5vw,2.6rem)] max-[767px]:leading-[1.1]">
              Votre organisation doit scaler.{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">Sans que tout repose sur vous.</span>
            </h1>

            {/* Sub-copy */}
            <p className="hpg-hero-animate hpg-hero-animate-3 mx-auto max-w-[52ch] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.65] text-hpg-silver/80 max-[767px]:max-w-[40ch]">
              Ce n&apos;est pas du conseil. C&apos;est un système de pilotage vivant, jusqu&apos;à ce que votre organisation tienne sans nous.
            </p>

            {/* CTAs */}
            <div className="hpg-hero-animate hpg-hero-animate-4 flex items-center gap-3 max-[479px]:flex-col max-[479px]:w-full">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid max-[479px]:w-full max-[479px]:justify-center"
              >
                Réserver un appel
                <ArrowUpRight01Icon size={18} className="transition-transform duration-200 group-hover:-rotate-45" />
              </Link>
              <Link
                href="/concept/test-de-scalabilite"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.01em] text-white/80 transition-colors hover:border-white/40 hover:text-white max-[479px]:w-full max-[479px]:justify-center"
              >
                Tester ma scalabilité
              </Link>
            </div>

            {/* Stats strip */}
            <div className="hpg-hero-animate hpg-hero-animate-5 flex items-center gap-8 max-[479px]:gap-5">
              {stats.map((stat, i) => (
                <div key={stat.value} className="flex items-center gap-8 max-[479px]:gap-5">
                  <div className="text-center">
                    <div className="text-[1.15rem] font-bold tracking-[-0.02em] text-white max-[479px]:text-[1rem]">
                      {stat.value}
                    </div>
                    <div className="text-[0.7rem] font-medium uppercase tracking-[0.08em] text-white/35 max-[479px]:text-[0.6rem]">
                      {stat.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-6 w-px bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Logos marquee */}
          <div className="hpg-hero-animate hpg-hero-animate-4 flex w-full flex-col items-center justify-center gap-2 overflow-hidden md:gap-3">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40 max-[479px]:text-[0.65rem]">Ils nous font confiance</span>
            <div className="w-full overflow-hidden mask-[linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)]">
              <div className="flex w-max items-center justify-start gap-[clamp(1.1rem,4vw,3.8rem)] py-[0.9rem] [animation:hpg-scroll-logos_30s_linear_infinite] [will-change:transform] hover:[animation-play-state:paused] motion-reduce:[animation:none] max-[767px]:[animation-duration:24s]">
                {marqueeLogos.map((logo, index) => (
                  <Image
                    key={`logo-track-${index}`}
                    src={logo.src}
                    alt={index < logos.length ? 'Logo partenaire' : ''}
                    width={logo.width}
                    height={60}
                    className="block h-auto max-h-[60px] w-auto max-w-[clamp(90px,24vw,180px)] shrink-0 object-contain opacity-80 transition hover:-translate-y-0.5 hover:opacity-100 max-[479px]:max-h-[44px] max-[479px]:max-w-[clamp(64px,20vw,130px)] md:max-h-[76px] md:max-w-[clamp(100px,18vw,190px)]"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
