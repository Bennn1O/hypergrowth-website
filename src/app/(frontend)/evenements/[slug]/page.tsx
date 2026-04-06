import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEventBySlug, getEventSlugs, type Event } from '@/lib/events'

interface Props {
  params: Promise<{ slug: string }>
}

const containerClass =
  'hpg-container'

const glassClass =
  'hpg-glass'

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

export async function generateStaticParams() {
  const slugs = await getEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return { title: 'Événement introuvable | HyperGrowth' }
  }

  return {
    title: `${event.title} | HyperGrowth`,
    description: event.description,
  }
}

function HeroTitle({ title }: { title: string }) {
  const parts = title.split(' ')
  const last = parts.pop()
  return (
    <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
      {parts.join(' ')}{' '}
      <span className="font-instrument-italic italic text-hpg-orchid">{last}</span>
    </h1>
  )
}

function DetailsGrid({ event }: { event: Event }) {
  if (!event.details?.length) return null

  const dateLabel = event.dateEnd
    ? `${new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} — ${new Date(event.dateEnd).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`
    : new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section className="mx-auto w-full">
      <div className={containerClass}>
        <div className="flex gap-8 max-[767px]:flex-col">
          <div className="flex flex-1 flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Informations pratiques
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              {dateLabel.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">
                {dateLabel.split(' ').at(-1)}
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3 max-[479px]:grid-cols-1">
              {event.details.map((d) => (
                <div
                  key={d.label}
                  className={`flex flex-col gap-1 rounded-[10px] p-4 ${glassClass}`}
                >
                  <span className="text-[0.7rem] font-medium uppercase tracking-[0.08em] text-white/40">
                    {d.label}
                  </span>
                  <span className="text-[0.95rem] font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {event.conceptPanel && (
            <div className="w-[360px] shrink-0 max-[767px]:w-full">
              <div className={`flex flex-col gap-5 rounded-[16px] p-8 ${glassClass}`}>
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                  {event.conceptPanel.badge}
                </span>
                <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                  {event.conceptPanel.title}
                </h3>
                {event.conceptPanel.body.map((para, i) => (
                  <p key={i} className="font-thin leading-[1.7] text-hpg-silver">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProgrammeSection({ event }: { event: Event }) {
  if (!event.programme?.length) return null

  return (
    <section className="mx-auto w-full">
      <div className={containerClass}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Déroulé de la journée
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Une journée{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">structurée</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {event.programme.map((step) => (
              <div
                key={step.time}
                className="flex items-start gap-6 rounded-[12px] border border-white/10 bg-white/[0.02] p-6 max-[767px]:flex-col max-[767px]:gap-3"
              >
                <span className="w-[80px] shrink-0 font-instrument-italic italic text-[1.1rem] text-hpg-orchid">
                  {step.time}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{step.title}</span>
                  <span className="text-[0.85rem] font-thin leading-[1.6] text-hpg-silver">
                    {step.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PillarsSection({ event }: { event: Event }) {
  if (!event.pillars?.length) return null

  return (
    <section className="mx-auto w-full">
      <div className={containerClass}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Au programme
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              {event.dateEnd ? `${event.dateEnd.split(' ')[0] ?? '9'} jours` : 'Des journées'} pour changer de{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">perspective</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
            {event.pillars.map((pillar, i) => (
              <div key={pillar.title} className={`flex flex-col gap-4 rounded-[12px] p-8 ${glassClass}`}>
                <span className="font-instrument-italic italic text-[2.5rem] leading-none text-hpg-orchid opacity-40">
                  0{i + 1}
                </span>
                <h3 className="font-instrument-italic italic text-[1.3rem] leading-[1.2]">
                  {pillar.title}
                </h3>
                <p className="font-thin leading-[1.6] text-hpg-silver">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotosSection({ event }: { event: Event }) {
  if (!event.photos?.length) return null

  return (
    <section className="mx-auto w-full">
      <div className={containerClass}>
        <div className="flex flex-col gap-6">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
            {event.location}, {event.country}
          </span>
          <div className="grid grid-cols-3 gap-3 max-[767px]:grid-cols-1">
            {event.photos.map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-[12px]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={420}
                  height={280}
                  className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSection({ event }: { event: Event }) {
  const isCafe = event.category === 'Café Croissance'

  return (
    <section className="mx-auto w-full pb-16">
      <div className={containerClass}>
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
            {isCafe ? 'Prochaines dates' : 'Prochain Mastermind'}
          </span>
          <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
            {isCafe ? (
              <>
                Ne manquez pas le prochain{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">Café Croissance</span>
              </>
            ) : (
              <>
                La prochaine{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">destination</span>{' '}
                se prépare
              </>
            )}
          </h2>
          <p className="max-w-[520px] font-thin leading-[1.7] text-hpg-silver">
            {isCafe
              ? "Les prochaines dates sont annoncées en avant-première aux membres de l'HyperClub et sur notre liste de diffusion."
              : "Les prochains Mastermind sont réservés en priorité aux membres de l'HyperClub. Rejoignez la communauté pour ne pas manquer les annonces."}
          </p>
          <div className="flex gap-4 max-[479px]:flex-col">
            {isCafe ? (
              <>
                <Link href="/communaute/evenements" className={btnViolet}>
                  Voir tous les événements
                  <Arrow />
                </Link>
                <Link
                  href="/communaute/hyperclub"
                  className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  {"Rejoindre l'HyperClub"}
                </Link>
              </>
            ) : (
              <>
                <Link href="/communaute/hyperclub" className={btnViolet}>
                  {"Rejoindre l'HyperClub"}
                  <Arrow />
                </Link>
                <Link
                  href="/communaute/evenements"
                  className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Tous les événements
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return (
    <main className="flex flex-col items-stretch">
      <section className="relative overflow-hidden pt-[180px] pb-16 max-[767px]:pt-[130px] max-[767px]:pb-10">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Événements
              </span>
              {event.isPast && (
                <span className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.06em] text-white/50">
                  Événement passé
                </span>
              )}
            </div>
            <HeroTitle title={event.title} />
            <p className="max-w-[520px] font-thin leading-[1.7] text-hpg-silver">
              {event.description}
            </p>
            <Link href="/communaute/evenements" className={`self-start ${btnViolet}`}>
              Voir tous les événements
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      {event.heroImage && (
        <section className="mx-auto w-full">
          <div className={containerClass}>
            <div className="overflow-hidden rounded-[16px]">
              <Image
                src={event.heroImage}
                alt={event.title}
                width={1300}
                height={580}
                className="max-h-[500px] w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <DetailsGrid event={event} />
      <ProgrammeSection event={event} />
      <PillarsSection event={event} />
      <PhotosSection event={event} />
      <CtaSection event={event} />
    </main>
  )
}
