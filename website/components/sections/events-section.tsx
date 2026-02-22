'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const eventTypes = [
  {
    title: 'Café Croissance',
    status: 'OUVERT AU PUBLIC',
    description: "Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d'action structuré.",
  },
  {
    title: 'Mastermind',
    status: 'SUR CANDIDATURE',
    description: "De 4 à 10 jours dans un lieu privé à l'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d'autres dirigeants.",
  },
  {
    title: 'Dîners HyperClub',
    status: 'RÉSERVÉ AUX MEMBRES',
    description: "Un dîner d'exception avec 6 à 8 entrepreneurs et dirigeants confirmés. Un moment exclusif pour échanger, créer des synergies et tisser des relations fortes autour d'une belle table.",
  },
]

const eventList = [
  {
    href: '/evenements/cafe-croissance-lille',
    title: 'Café Croissance Lille',
    date: 'December 17, 2025',
    type: 'Café Croissance',
    location: 'Lille',
    country: 'FRANCE',
  },
  {
    href: '/evenements/mastermind-srilanka',
    title: 'Mastermind Sri Lanka',
    dateRange: ['November 29, 2025', 'December 7, 2025'],
    type: 'Mastermind',
    location: 'Weligama',
    country: 'SRI LANKA',
  },
]

function isEventPast(event: (typeof eventList)[number]): boolean {
  const now = new Date()
  const endDate = event.dateRange ? new Date(event.dateRange[1]) : new Date(event.date!)
  return endDate < now
}

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-auto px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

const glassClass =
  'border border-white/10 bg-[rgb(31_18_43_/_0.44)] backdrop-blur-[14px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.11),0_24px_52px_rgb(4_2_8_/_0.33)]'

const easeExpo = [0.16, 1, 0.3, 1] as const

export function EventsSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal()
  const { ref: cardsRef, isInView: cardsInView } = useScrollReveal()
  const { ref: listRef, isInView: listInView } = useScrollReveal()
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal()

  return (
    <section className="mx-auto py-10">
      <div className={containerClass}>
        <div className="flex flex-col gap-12 overflow-hidden">
          <motion.div
            ref={headerRef}
            className="flex w-[60%] flex-col items-start justify-center gap-4 max-[991px]:w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">Communauté</span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              <span className="font-instrument-italic italic text-hpg-orchid">Évènements</span> &amp; lives
            </h2>
            <p className="hidden">Chaque année...</p>
          </motion.div>

          <div
            ref={cardsRef}
            className="flex items-stretch justify-between gap-4 max-[991px]:flex-col"
          >
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                className={`flex w-1/3 flex-col items-start justify-start gap-12 rounded-xl p-8 max-[991px]:w-full ${glassClass}`}
                initial={{ opacity: 0, y: 24 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, ease: easeExpo, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-start justify-between gap-4 self-stretch">
                  <h3 className="text-2xl leading-[1.2]">{event.title}</h3>
                  <div className="text-[0.8rem] leading-[1.3] text-hpg-orchid">{event.status}</div>
                </div>
                <div className="text-[0.9rem] font-thin leading-[1.5] text-hpg-silver">{event.description}</div>
              </motion.div>
            ))}
          </div>

          <div ref={listRef} className="flex flex-col gap-3">
            {eventList.map((event, index) => {
              const past = isEventPast(event)
              return (
                <motion.div
                  key={event.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={listInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.6, ease: easeExpo, delay: index * 0.1 }}
                >
                  <Link
                    href={event.href}
                    className={`relative flex items-center justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-6 py-5 transition max-[991px]:flex-col max-[991px]:items-start ${past ? 'opacity-50 grayscale-[30%]' : 'hover:-translate-y-0.5 hover:border-[#f285f040] hover:bg-[rgb(24_10_34_/_0.3)]'}`}
                  >
                    {past && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgb(24_10_34_/_0.5)]">
                        <span className="rounded-full border border-white/20 bg-[rgb(24_10_34_/_0.8)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-white/60">Événement passé</span>
                      </div>
                    )}
                    <div className="flex items-center gap-6 max-[991px]:flex-col max-[991px]:items-start max-[991px]:gap-2">
                      <div className="text-[1rem] font-medium">{event.title}</div>
                      <div className="text-[0.8rem] text-hpg-silver">
                        {event.dateRange ? `Du ${event.dateRange[0]} au ${event.dateRange[1]}` : event.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 max-[991px]:gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs">{event.type}</span>
                      <span className="rounded-full bg-hpg-stealth px-3 py-1 text-xs">{event.location}, {event.country}</span>
                      <ArrowUpRight01Icon size={16} className="opacity-40" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            ref={ctaRef}
            className="flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <Link
              href="/communaute/evenements"
              className="inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
            >
              <div>Voir tous les évènements</div>
              <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
