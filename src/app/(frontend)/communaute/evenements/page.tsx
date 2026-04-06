import { ArrowIcon } from '@/components/ui/arrow-icon'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllEvents, eventTypes } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Évènements : communauté d\'entrepreneurs et dirigeants | HyperGrowth',
  description:
    "L'intelligence collective est mise au service de votre business. Vous repartez avec un plan d'action et des relations solides.",
}

const containerClass = 'hpg-container'
const glassClass = 'hpg-glass'
const btnViolet = 'hpg-btn-violet group'

const stats = [
  { value: '+150', label: 'dirigeants accompagnés' },
  { value: '+400M€', label: 'CA piloté' },
  { value: '+82%', label: 'identifient un frein majeur' },
  { value: '+70%', label: 'ajustent leur stratégie sous 7 jours' },
]

const testimonials = [
  {
    name: 'Gabriel Girardon Pazienza',
    role: 'CEO',
    company: 'Bleue Citadelle',
    photo: '/images/694a7ec9e29d606df2d8a44a_1632819833484.avif',
    linkedin: 'https://www.linkedin.com/in/gabriel-girardon/',
    quote:
      "L'équipe HG a su s'adapter à ma posture d'agence particulière et me proposer un plan de scaling efficace et ultra personnalisé.",
  },
  {
    name: 'Jérôme Girard',
    role: 'Co-Fondateur',
    company: 'La Draft',
    photo: '/images/69496827d7541b3e2da5264b_1718637287531.avif',
    linkedin: 'https://www.linkedin.com/in/jerome-girard-789b3b86/',
    quote:
      "Cela fait maintenant 1 an que nous sommes accompagnés par Killian et son équipe et je peux dire sans hésitation que c'est l'une des meilleures décisions que nous avons prises pour notre business.",
  },
]

function formatEventDate(date: string, dateEnd?: string): string {
  const fmt = (d: string) => {
    const parsed = new Date(d)
    if (Number.isNaN(parsed.getTime())) return d
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(parsed)
  }
  if (dateEnd) return `Du ${fmt(date)} au ${fmt(dateEnd)}`
  return fmt(date)
}

export default async function CommunauteEvenementsPage() {
  const events = await getAllEvents()

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
              <span className="font-instrument-italic italic text-hpg-orchid">Évènements</span>{' '}
              & lives
            </h1>
            <p className="max-w-[520px] font-normal leading-[1.7] text-hpg-silver">
              L&apos;intelligence collective est mise au service de votre business. Vous repartez
              avec un plan d&apos;action et des relations solides.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-6 max-w-[700px]">
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Avez-vous déjà mis votre projet sur la{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">table</span> devant
              d&apos;autres dirigeants ?
            </h2>
            <p className="font-normal leading-[1.7] text-hpg-silver">
              Vous arrivez avec une problématique floue et vous repartez avec un plan d&apos;action
              clair et des relations solides.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex gap-4 max-[991px]:flex-col">
            {eventTypes.map((type) => (
              <div
                key={type.title}
                className={`flex flex-1 flex-col gap-8 rounded-[12px] p-8 ${glassClass}`}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                    {type.title}
                  </h3>
                  <span className="text-[0.8rem] font-medium tracking-[0.06em] text-hpg-orchid">
                    {type.status}
                  </span>
                </div>
                <p className="font-normal leading-[1.6] text-hpg-silver">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-3">
            {events.map((event) => {
              const isPast = event.isPast || event.status === 'past'
              return (
                <Link
                  key={event.id}
                  href={`/evenements/${event.slug}`}
                  className={`relative flex items-center justify-between gap-6 overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.02] px-6 py-5 transition max-[991px]:flex-col max-[991px]:items-start ${isPast ? 'opacity-50' : 'hover:-translate-y-0.5 hover:border-hpg-orchid/25 hover:bg-[rgb(24_10_34_/_0.3)]'}`}
                >
                  {isPast && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[rgb(24_10_34_/_0.5)]">
                      <span className="rounded-full border border-white/20 bg-[rgb(24_10_34_/_0.8)] px-4 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/60">
                        Événement passé
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-6 max-[991px]:flex-col max-[991px]:items-start max-[991px]:gap-2">
                    <span className="text-[1rem] font-medium">{event.title}</span>
                    <span className="text-[0.8rem] text-hpg-silver">
                      {formatEventDate(event.date, event.dateEnd)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.75rem]">
                      {event.category}
                    </span>
                    <span className="rounded-full bg-hpg-stealth px-3 py-1 text-[0.75rem]">
                      {event.location}, {event.country}
                    </span>
                    <Image
                      src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="opacity-40"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Notre impact
            </span>
            <div className="grid grid-cols-4 gap-4 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 rounded-[12px] border border-white/10 bg-white/[0.02] p-6 text-center"
                >
                  <span className="font-instrument-italic italic text-[2.5rem] leading-none text-hpg-orchid">
                    {stat.value}
                  </span>
                  <span className="text-[0.8rem] text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex gap-4 max-[767px]:flex-col">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className={`flex flex-1 flex-col gap-6 rounded-[12px] p-8 ${glassClass}`}
              >
                <Image
                  src="/images/68f62f2bf8f3beee3f75c9cb_HPG_website_icon_quote_blanc.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="opacity-30"
                />
                <p className="flex-1 text-[0.95rem] leading-[1.75] text-hpg-silver">{t.quote}</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover object-top"
                  />
                  <div>
                    <p className="text-[0.85rem] font-medium">{t.name}</p>
                    <p className="text-[0.75rem] text-hpg-silver">
                      <span className="text-hpg-orchid">{t.role}</span> @ {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
                Prêt à mettre votre projet sur{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">la table&nbsp;?</span>
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
