import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Café Croissance Lille | HyperGrowth',
  description:
    'Un format hot seat pour entrepreneurs et dirigeants. Présentez votre projet face à 10 experts et repartez avec un plan d\'action clair.',
}

const containerClass =
  'mx-auto block max-w-[1300px] px-[5rem] py-[2.5rem] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:max-w-[95vw] max-[479px]:px-4'

const glassClass =
  'border border-white/12 bg-[rgb(35_20_46_/_0.52)] backdrop-blur-[26px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08),0_24px_52px_rgb(4_2_8_/_0.28)]'

const btnViolet =
  'group inline-flex items-center justify-center gap-3 rounded-[12px] border border-[#9a59c5] bg-[#7d3fab] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]'

const Arrow = () => (
  <Image
    src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
    alt=""
    width={18}
    height={18}
    className="transition-transform duration-200 group-hover:-rotate-45"
  />
)

const details = [
  { label: 'Date', value: '17 décembre 2025' },
  { label: 'Horaires', value: '8h — 15h' },
  { label: 'Format', value: 'Hot seat' },
  { label: 'Lieu', value: 'Lille (59800)' },
  { label: 'Places', value: '10 entrepreneurs max' },
  { label: 'Accès', value: 'Sur inscription' },
]

const programme = [
  {
    time: '8h00',
    title: 'Accueil & petit-déjeuner',
    description: 'Prise de contact avec les autres participants dans un cadre détendu.',
  },
  {
    time: '9h00',
    title: 'Présentation des projets',
    description:
      'Chaque entrepreneur présente son business, ses défis et sa problématique du moment.',
  },
  {
    time: '10h30',
    title: 'Hot seats collectifs',
    description:
      "L'intelligence collective se met au service de chaque projet. Questions, analyse, recommandations.",
  },
  {
    time: '13h00',
    title: 'Déjeuner réseau',
    description: 'Temps libre pour tisser des liens et explorer des synergies.',
  },
  {
    time: '14h30',
    title: 'Plan d\'action & clôture',
    description:
      'Chaque participant repart avec un plan d\'action structuré et des contacts qualifiés.',
  },
]

export default function CafeCroissanceLillePage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* ── Hero ─────────────────────────────────────────────────── */}
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
              <span className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.06em] text-white/50">
                Événement passé
              </span>
            </div>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Café Croissance{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">Lille</span>
            </h1>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Un format hot seat pour entrepreneurs et dirigeants. Vous présentez votre projet,
              l&apos;intelligence collective se met au service de votre croissance.
            </p>
            <Link href="/communaute/evenements" className={`self-start ${btnViolet}`}>
              Voir tous les événements
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Photo ────────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[16px]">
            <Image
              src="/images/692022b3e666fbb63e06e4db_HPG_café-croissance.avif"
              alt="Café Croissance HyperGrowth"
              width={1300}
              height={580}
              className="max-h-[500px] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Détails pratiques ────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex gap-8 max-[767px]:flex-col">
            <div className="flex flex-1 flex-col gap-6">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Informations pratiques
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                17 décembre{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">2025</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 max-[479px]:grid-cols-1">
                {details.map((d) => (
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
            <div className="w-[360px] shrink-0 max-[767px]:w-full">
              <div className={`flex flex-col gap-5 rounded-[16px] p-8 ${glassClass}`}>
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                  Le format
                </span>
                <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                  Hot seat collectif
                </h3>
                <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                  Vous arrivez avec une problématique floue et vous repartez avec un plan
                  d&apos;action clair. 10 entrepreneurs et dirigeants confirmés se penchent sur
                  votre cas pendant une heure.
                </p>
                <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                  L&apos;intelligence collective est mise au service de votre business. Pas de
                  théorie, que du concret.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programme ────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Déroulé de la journée
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Une journée{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">structurée</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {programme.map((step) => (
                <div
                  key={step.time}
                  className="flex items-start gap-6 rounded-[12px] border border-white/10 bg-white/[0.02] p-6 max-[767px]:flex-col max-[767px]:gap-3"
                >
                  <span className="w-[80px] shrink-0 font-instrument-italic italic text-[1.1rem] text-[#f285f0]">
                    {step.time}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{step.title}</span>
                    <span className="text-[0.85rem] font-thin leading-[1.6] text-[#cfcfcf]">
                      {step.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Prochains événements ─────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Prochaines dates
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Ne manquez pas le prochain{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">Café Croissance</span>
            </h2>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Les prochaines dates sont annoncées en avant-première aux membres de l&apos;HyperClub
              et sur notre liste de diffusion.
            </p>
            <div className="flex gap-4 max-[479px]:flex-col">
              <Link href="/communaute/evenements" className={btnViolet}>
                Voir tous les événements
                <Arrow />
              </Link>
              <Link
                href="/communaute/hyperclub"
                className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Rejoindre l&apos;HyperClub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
