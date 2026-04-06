import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'La Méthode OP-X en vidéo | HyperGrowth',
  description:
    "Découvrez en vidéo le modèle OP-X et comment HyperGrowth accompagne les dirigeants ambitieux dans leur phase de scaling.",
}

const containerClass =
  'hpg-container'

const btnViolet =
  'hpg-btn-violet group'

const Arrow = () => (
  <Image
    src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
    alt=""
    width={18}
    height={18}
    className="transition-transform duration-200 group-hover:-rotate-45"
  />
)

export default function VslPage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* Hero + Video */}
      <section className="relative overflow-hidden pt-[180px] pb-16 max-[767px]:pt-[130px] max-[767px]:pb-10">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Le Concept
            </span>
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1]">
              La Méthode{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">OP-X</span>
            </h1>
            <p className="max-w-[560px] font-normal leading-[1.7] text-hpg-silver">
              Découvrez comment HyperGrowth accompagne les dirigeants ambitieux
              dans leur phase de scaling grâce au modèle OP-X.
            </p>
          </div>

          {/* YouTube Embed */}
          <div className="mt-12 overflow-hidden rounded-[16px] border border-white/10 bg-black/20">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/lk-6ulCa3hs?rel=0"
                title="HyperGrowth - La Méthode OP-X"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Prochaine étape
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Prêt à passer à{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">l&apos;action</span> ?
            </h2>
            <p className="max-w-[520px] font-normal leading-[1.7] text-hpg-silver">
              Réservez un échange de 30 minutes avec un Operating Partner pour
              discuter de votre situation et de vos objectifs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className={btnViolet}>
                Réserver un appel
                <Arrow />
              </Link>
              <Link
                href="/concept/methode-op-x"
                className="group inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                En savoir plus sur la méthode
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
