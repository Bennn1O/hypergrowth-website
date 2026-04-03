'use client'

import Link from 'next/link'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const eventTypes = [
  {
    num: '01',
    title: 'Café Croissance',
    status: 'OUVERT AU PUBLIC',
    statusColor: 'text-emerald-400/80',
    description: "Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d'action structuré.",
  },
  {
    num: '02',
    title: 'Mastermind',
    status: 'SUR CANDIDATURE',
    statusColor: 'text-hpg-orchid/80',
    description: "De 4 à 10 jours dans un lieu privé à l'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d'autres dirigeants.",
  },
  {
    num: '03',
    title: 'Dîners HyperClub',
    status: 'RÉSERVÉ AUX MEMBRES',
    statusColor: 'text-amber-400/80',
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

export function EventsSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal()
  const { ref: cardsRef, isInView: cardsInView } = useScrollReveal()
  const { ref: listRef, isInView: listInView } = useScrollReveal()
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal()

  return (
    <section className="mx-auto py-10">
      <div className={containerClass}>
        <div className="flex flex-col gap-12 overflow-hidden">
          <div
            ref={headerRef}
            className={`reveal${headerInView ? ' in-view' : ''} flex w-[60%] flex-col items-start justify-center gap-4 max-[991px]:w-full`}
          >
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">Communauté</span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Trois formats,{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">une communauté.</span>
            </h2>
            <p className="max-w-[52ch] text-[0.95rem] leading-[1.7] text-hpg-silver">
              Des formats pensés pour des dirigeants qui veulent progresser, se connecter et passer un cap, pas juste assister à un événement.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="flex items-stretch justify-between gap-4 max-[991px]:flex-col"
          >
            {eventTypes.map((event, index) => (
              <div
                key={event.title}
                className={`reveal${cardsInView ? ' in-view' : ''} flex w-1/3 flex-col items-start justify-between gap-6 rounded-xl p-8 max-[991px]:w-full ${glassClass}`}
                style={{ '--d': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-instrument text-[2.8rem] leading-none text-white/10">{event.num}</span>
                    <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${event.statusColor}`}>{event.status}</span>
                  </div>
                  <h3 className="text-[1.25rem] font-semibold leading-[1.2]">{event.title}</h3>
                </div>
                <p className="text-[0.88rem] font-thin leading-[1.6] text-hpg-silver">{event.description}</p>
              </div>
            ))}
          </div>

          <div ref={listRef} className="flex flex-col gap-3">
            {eventList.map((event, index) => {
              const past = isEventPast(event)
              return (
                <div
                  key={event.href}
                  className={`reveal${listInView ? ' in-view' : ''}`}
                  style={{ '--d': `${index * 0.1}s` } as React.CSSProperties}
                >
                  <Link
                    href={event.href}
                    className={`relative flex items-center justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-6 py-5 transition max-[991px]:flex-col max-[991px]:items-start ${past ? 'opacity-50 grayscale-[30%]' : 'hover:-translate-y-0.5 hover:border-[#f285f040] hover:bg-[rgb(24_10_34_/_0.3)]'}`}
                  >
                    <div className="flex items-center gap-6 max-[991px]:flex-col max-[991px]:items-start max-[991px]:gap-2">
                      <div className="text-[1rem] font-medium">{event.title}</div>
                      <div className="text-[0.8rem] text-hpg-silver">
                        {event.dateRange ? `Du ${event.dateRange[0]} au ${event.dateRange[1]}` : event.date}
                      </div>
                      {past && (
                        <span className="rounded-full border border-white/20 bg-white/[0.04] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-white/50">Événement passé</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 max-[991px]:gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs">{event.type}</span>
                      <span className="rounded-full bg-hpg-stealth px-3 py-1 text-xs">{event.location}, {event.country}</span>
                      <ArrowUpRight01Icon size={16} className="opacity-40" />
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          <div
            ref={ctaRef}
            className={`reveal${ctaInView ? ' in-view' : ''} flex justify-center`}
          >
            <Link
              href="/communaute/evenements"
              className="inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
            >
              <div>Voir tous les évènements</div>
              <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
