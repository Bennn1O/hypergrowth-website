'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-auto px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

const glassCardClass =
  'relative isolate flex min-h-[300px] flex-row items-center justify-center gap-4 self-stretch rounded-xl border border-white/12 bg-[rgb(35_20_46_/_0.52)] px-5 py-9 backdrop-blur-[26px] [mask-image:radial-gradient(160%_160%_at_50%_50%,rgb(0_0_0_/_0.96)_42%,rgb(0_0_0_/_0.86)_64%,transparent_100%)] transition hover:-translate-y-0.5 hover:border-hpg-orchid/35 hover:shadow-[0_24px_40px_rgb(7_2_12_/_0.35)] max-[479px]:min-h-[240px]'

const cards = [
  {
    image: '/images/68f24ba7f77ac21dc6e1fc31__LRG4850.avif',
    alt: "Portrait de l'Operating Partner Ulysse El Sherbeeny",
    title: 'Operating Partner',
    description: 'Un expert de la croissance rejoint votre équipe dirigeante pour piloter la croissance avec vous, au quotidien.',
    descriptionNode: null,
  },
  {
    image: '/images/692a54175cc379b9eeaf3183_samuel-fernandes.avif',
    alt: "Portrait d'expert",
    title: 'Experts',
    description: null,
    descriptionNode: (
      <>
        20+ experts <span className="font-archivo-italic italic">A-players</span> exécutent pour vous, et mettent en place les stratégie imaginées par votre OP.
      </>
    ),
  },
]

export function ConceptSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="mx-auto mb-16">
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center gap-3 max-[479px]:px-4">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40"
          >
            Le Concept
          </motion.span>

          <div className="flex w-full flex-col items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex w-[70%] flex-col items-center justify-between gap-8 p-4 text-center max-[991px]:w-auto"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                  Le modèle <span className="font-instrument-italic italic text-hpg-orchid">OP-X</span>
                </h2>
                <p className="text-base font-medium leading-[1.6] text-hpg-silver">
                  1 Operating Partner pour vous accompagner, +20 Experts pour éxecuter à vos côtés.
                </p>
              </div>
            </motion.div>

            <div className="flex w-[70%] flex-row items-center justify-start gap-6 max-[991px]:w-auto max-[479px]:flex-col">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.1 }}
                  className={glassCardClass}
                >
                  <div className="flex flex-col gap-4 self-stretch text-left">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={70}
                      height={70}
                      className="h-[70px] w-[70px] min-h-[70px] min-w-[70px] overflow-hidden rounded-[5px] object-cover object-[50%_20%]"
                    />
                    <div className="text-2xl leading-[1.2] font-instrument-italic italic">{card.title}</div>
                    <div className="font-thin">
                      {card.descriptionNode ?? card.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <Link
                href="/concept/methode-op-x"
                className="group inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
              >
                <div>En savoir plus</div>
                <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
