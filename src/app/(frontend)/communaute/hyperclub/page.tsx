import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "L'HyperClub : communauté privée de dirigeants | HyperGrowth",
  description:
    "Réservé aux dirigeants et entrepreneurs performants. Communauté privée d'échange, de progression et de networking.",
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

const pillars = [
  {
    title: 'Hotseats trimestriels',
    description:
      "Sessions confidentielles entre pairs pour prendre du recul, débloquer vos sujets et repartir avec des actions concrètes.",
  },
  {
    title: "Accès à notre carnet d'adresses",
    description:
      "Investisseurs, talents, scale-ups, partenaires ; le réseau devient aussi le vôtre.",
  },
  {
    title: 'Une communauté qui vous comprend',
    description:
      "Entrepreneurs partageant vos enjeux, avec bienveillance et exigence.",
  },
]

const eventTypes = [
  {
    title: 'Café Croissance',
    status: 'OUVERT AU PUBLIC',
    description:
      "Format hot seat de 8h à 15h. Présentez votre projet face à 10 entrepreneurs confirmés.",
  },
  {
    title: 'Mastermind',
    status: 'SUR CANDIDATURE',
    description:
      "4 à 10 jours en lieu privé étranger. Ateliers, échanges et networking intense.",
  },
  {
    title: 'Dîners HyperClub',
    status: 'RÉSERVÉ AUX MEMBRES',
    description:
      "Dîner d'exception avec 6-8 dirigeants confirmés pour créer des synergies durables.",
  },
]

const portraits = [
  { src: '/images/68f24ff5559ba47fde418d85_julianne-aknine.avif', alt: 'Julianne Aknine' },
  { src: '/images/68f24ff529d2973a4e798c51_marion-carneiro.avif', alt: 'Marion Carneiro' },
  { src: '/images/68f24ff58d7f007873dc70f4_eva-lecocq.avif', alt: 'Eva Lecocq' },
  { src: '/images/68f24ff558e8f8004bcbd487_laura-chetail.avif', alt: 'Laura Chetail' },
]

export default function HyperclubPage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[180px] pb-16 max-[767px]:pt-[130px] max-[767px]:pb-10">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-7">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Communauté
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              L&apos;HyperClub
            </h1>
            <p className="max-w-[540px] font-normal leading-[1.7] text-hpg-silver">
              Réservé aux dirigeants et entrepreneurs performants. C&apos;est une communauté
              privée d&apos;échange, de progression et de networking.
            </p>
            <Link href="/contact" className={`self-start ${btnViolet}`}>
              Postuler
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Photo membres ────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[16px]">
            <Image
              src="/images/68dff51fedf4c46812d51800_club.avif"
              alt="Membres HyperClub"
              width={1300}
              height={580}
              className="max-h-[500px] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 3 Piliers ────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Ce que vous obtenez
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Un réseau d&apos;exigence et de{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">clarté</span>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 max-[767px]:grid-cols-1">
              {pillars.map((pillar, i) => (
                <div key={pillar.title} className={`flex flex-col gap-4 rounded-[12px] p-8 ${glassClass}`}>
                  <span className="font-instrument-italic italic text-[2.5rem] leading-none text-hpg-orchid opacity-40">
                    0{i + 1}
                  </span>
                  <h3 className="font-instrument-italic italic text-[1.3rem] leading-[1.2]">
                    {pillar.title}
                  </h3>
                  <p className="font-normal leading-[1.6] text-hpg-silver">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Portraits membres ────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-center gap-6 max-[767px]:flex-col">
            <div className="flex flex-1 flex-col gap-5">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                La communauté
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                <span className="font-instrument-italic italic text-hpg-orchid">150+</span>{' '}
                dirigeants accompagnés
              </h2>
              <p className="font-normal leading-[1.7] text-hpg-silver">
                Des entrepreneurs et dirigeants de tous secteurs, réunis par la même ambition :
                scaler sans perdre le contrôle.
              </p>
            </div>
            <div className="flex gap-3 max-[767px]:w-full">
              {portraits.map((p) => (
                <div key={p.alt} className="overflow-hidden rounded-[12px]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={120}
                    height={160}
                    className="h-[180px] w-[100px] object-cover object-top max-[479px]:h-[140px] max-[479px]:w-[72px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Formats évènements ───────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Évènements &amp; lives
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Trois formats, une{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">intention</span>
              </h2>
            </div>
            <div className="flex gap-4 max-[991px]:flex-col">
              {eventTypes.map((type) => (
                <div key={type.title} className={`flex flex-1 flex-col gap-6 rounded-[12px] p-8 ${glassClass}`}>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-instrument-italic italic text-[1.3rem] leading-[1.2]">
                      {type.title}
                    </h3>
                    <span className="text-[0.75rem] font-medium tracking-[0.06em] text-hpg-orchid">
                      {type.status}
                    </span>
                  </div>
                  <p className="font-normal leading-[1.6] text-hpg-silver">{type.description}</p>
                </div>
              ))}
            </div>
            <Link href="/communaute/evenements" className={`self-start ${btnViolet}`}>
              Voir tous les évènements
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Réserver un appel ────────────────────────────────── */}
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
                Vous voulez intégrer{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">l&apos;HyperClub&nbsp;?</span>
              </h2>
              <p className="max-w-[480px] font-normal leading-[1.7] text-hpg-silver">
                On sélectionne les dirigeants avec qui le fit est réel. Un appel de 30 minutes pour évaluer votre profil.
              </p>
              <Link href="/contact" className={btnViolet}>
                Réserver un appel
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
