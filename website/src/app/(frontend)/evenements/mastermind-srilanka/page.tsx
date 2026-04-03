import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mastermind Sri Lanka | HyperGrowth',
  description:
    '7 jours en immersion à Weligama, Sri Lanka. Un cercle de 10 à 20 entrepreneurs pour scaler autrement.',
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
  { label: 'Dates', value: '29 nov. — 7 déc. 2025' },
  { label: 'Durée', value: '9 jours' },
  { label: 'Lieu', value: 'Weligama, Sri Lanka' },
  { label: 'Hébergement', value: 'Kima Surf' },
  { label: 'Participants', value: '10 — 20 entrepreneurs' },
  { label: 'Accès', value: 'Sur candidature' },
]

const pillars = [
  {
    title: 'Ateliers de croissance',
    description:
      'Sessions de travail intensives sur vos sujets business. Stratégie, organisation, acquisition, management.',
  },
  {
    title: 'Hot seats collectifs',
    description:
      'Présentez vos blocages face au groupe. L\'intelligence collective au service de votre croissance.',
  },
  {
    title: 'Networking de qualité',
    description:
      'Créez des relations solides avec des entrepreneurs partageant vos enjeux. Des synergies durables.',
  },
  {
    title: 'Ressourcement',
    description:
      'Activités en pleine nature, surf, exploration. Recharger pour mieux performer.',
  },
]

const photos = [
  {
    src: '/images/6917211537fb0b829a250c5b_weligama-beach.avif',
    alt: 'Plage de Weligama, Sri Lanka',
  },
  {
    src: '/images/6921393726a2b63f250dc53f_Kima-Surf-Sri-Lanka-Weligama-3.avif',
    alt: 'Kima Surf Hotel, Weligama',
  },
  {
    src: '/images/6921379f82977e6bf5b9dcc3_Tangalle-Sri-Lanka-Aerial.avif',
    alt: 'Vue aérienne, Sri Lanka',
  },
]

export default function MastermindSriLankaPage() {
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
              Mastermind{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">Sri Lanka</span>
            </h1>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              9 jours en immersion à Weligama. Un cercle de 10 à 20 entrepreneurs pour travailler
              autrement, créer des relations durables et scaler avec clarté.
            </p>
            <Link href="/communaute/evenements" className={`self-start ${btnViolet}`}>
              Voir tous les événements
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Photo hero ───────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[16px]">
            <Image
              src="/images/6917211537fb0b829a250c5b_weligama-beach.avif"
              alt="Weligama, Sri Lanka"
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
                29 nov. — 7 déc.{' '}
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
                  Le concept
                </span>
                <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                  Scaler autrement
                </h3>
                <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                  Le Mastermind HyperGrowth, c&apos;est l&apos;idée que les meilleures décisions
                  business se prennent quand on sort du quotidien, entouré de gens qui
                  comprennent vos enjeux.
                </p>
                <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                  9 jours au Sri Lanka pour travailler en profondeur, tisser des relations fortes
                  et revenir avec un plan d&apos;action béton.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 piliers ────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Au programme
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                9 jours pour changer de{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">perspective</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
              {pillars.map((pillar, i) => (
                <div key={pillar.title} className={`flex flex-col gap-4 rounded-[12px] p-8 ${glassClass}`}>
                  <span className="font-instrument-italic italic text-[2.5rem] leading-none text-[#f285f0] opacity-40">
                    0{i + 1}
                  </span>
                  <h3 className="font-instrument-italic italic text-[1.3rem] leading-[1.2]">
                    {pillar.title}
                  </h3>
                  <p className="font-thin leading-[1.6] text-[#cfcfcf]">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Galerie photos ───────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Weligama, Sri Lanka
            </span>
            <div className="grid grid-cols-3 gap-3 max-[767px]:grid-cols-1">
              {photos.map((photo) => (
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

      {/* ── Prochain Mastermind ──────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Prochain Mastermind
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              La prochaine{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">destination</span>{' '}
              se prépare
            </h2>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Les prochains Mastermind sont réservés en priorité aux membres de l&apos;HyperClub.
              Rejoignez la communauté pour ne pas manquer les annonces.
            </p>
            <div className="flex gap-4 max-[479px]:flex-col">
              <Link href="/communaute/hyperclub" className={btnViolet}>
                Rejoindre l&apos;HyperClub
                <Arrow />
              </Link>
              <Link
                href="/communaute/evenements"
                className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Tous les événements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
