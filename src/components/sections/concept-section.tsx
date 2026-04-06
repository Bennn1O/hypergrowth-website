'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-auto px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-4'

const glassCardClass =
  'relative isolate flex min-h-[300px] flex-col items-start justify-between gap-6 self-stretch rounded-xl border border-white/12 bg-[rgb(35_20_46_/_0.52)] p-8 backdrop-blur-[26px] transition hover:-translate-y-0.5 hover:border-hpg-orchid/35 hover:shadow-[0_24px_40px_rgb(7_2_12_/_0.35)] max-[479px]:min-h-[240px]'

const cards = [
  {
    image: '/images/68f24ba7f77ac21dc6e1fc31__LRG4850.avif',
    alt: "Portrait de l'Operating Partner Ulysse El Sherbeeny",
    tag: 'Niveau 01',
    title: 'Operating Partner',
    subtitle: 'Le système nerveux central',
    description: 'Il ne survole pas. Il tient le cockpit. Il prend un périmètre explicite, orchestre les expertises, structure le rythme de décision et accompagne jusqu\'à ce que l\'organisation tienne sans lui.',
  },
  {
    image: '/images/692a54175cc379b9eeaf3183_samuel-fernandes.avif',
    alt: "Portrait d'expert",
    tag: 'Niveau 02',
    title: 'Les Experts',
    subtitle: 'Le système de pit stop',
    description: 'Prescrits, pas accumulés. L\'expert entre, il exécute, il transmet, il sort. Il n\'intervient que si le problème est correctement nommé, son impact réel, son scope cadré précisément.',
  },
  {
    image: '/images/68dfda277a4f4332ebf28661_OP3.avif',
    alt: 'Niveau stratégique HyperGrowth',
    tag: 'Niveau 03',
    title: 'Niveau Stratégique',
    subtitle: 'Le recadrage de hauteur',
    description: 'Quand la situation demande une hauteur de vue qui ne peut pas émerger depuis l\'intérieur. Recadrage de vision, arbitrages de trajectoire, décisions macro, moments de rupture.',
  },
]

export function ConceptSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="mx-auto mb-16">
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center gap-3 max-[479px]:px-4">

          <span
            className={`reveal${isInView ? ' in-view' : ''} text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40`}
          >
            Le Concept
          </span>

          <div className="flex w-full flex-col items-center justify-center gap-12">

            {/* Header */}
            <div
              className={`reveal${isInView ? ' in-view' : ''} flex w-[70%] flex-col items-center gap-5 p-4 text-center max-[991px]:w-auto`}
              style={{ '--d': '0.1s' } as React.CSSProperties}
            >
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Le modèle <span className="font-instrument-italic italic text-hpg-orchid">OP-X</span>
              </h2>
              <p className="max-w-[52ch] text-[0.95rem] leading-[1.7] text-hpg-silver">
                OP-X n&apos;est pas un framework. C&apos;est une architecture d&apos;intervention conçue pour tenir dans la durée, transformer une entreprise sans créer de dépendance à celui qui l&apos;aide.
              </p>
            </div>

            {/* 3 cards */}
            <div className="flex w-full flex-row items-stretch justify-start gap-4 max-[767px]:flex-col">
              {cards.map((card, index) => (
                <div
                  key={card.title}
                  className={`${glassCardClass} reveal${isInView ? ' in-view' : ''} flex-1`}
                  style={{ '--d': `${0.2 + index * 0.08}s` } as React.CSSProperties}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={48}
                        height={48}
                        className="h-12 w-12 min-h-12 min-w-12 overflow-hidden rounded-md object-cover object-[50%_20%]"
                      />
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/30">
                        {card.tag}
                      </span>
                    </div>
                    <div>
                      <div className="text-[1.25rem] font-instrument-italic italic leading-[1.2] text-white">
                        {card.title}
                      </div>
                      <div className="mt-1 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-hpg-orchid/70">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                  <p className="text-[0.88rem] font-normal leading-[1.7] text-hpg-silver">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`reveal${isInView ? ' in-view' : ''}`}
              style={{ '--d': '0.4s' } as React.CSSProperties}
            >
              <Link
                href="/concept/methode-op-x"
                className="group inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
              >
                <div>Découvrir la méthode OP-X</div>
                <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
