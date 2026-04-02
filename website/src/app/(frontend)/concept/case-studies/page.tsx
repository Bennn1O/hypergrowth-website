import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cas clients : structurer pour scale sans chaos | HyperGrowth',
  description:
    'Quelques exemples des projets que nous avons réalisés avec nos clients.',
}

const containerClass =
  'mx-auto block max-w-[1300px] px-[5rem] py-[2.5rem] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:max-w-[95vw] max-[479px]:px-0'

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

const clientLogos = [
  { src: '/images/68f246d8f3f048136e02e401_3.avif', alt: '' },
  { src: '/images/68f246d85e5a645da800b0a9_4.avif', alt: '' },
  { src: '/images/68f246d8564c0248e12490c9_5.avif', alt: '' },
  { src: '/images/68f246d82979e450b678014f_6.avif', alt: '' },
  { src: '/images/68f246d902445111cfe4d20d_8.avif', alt: '' },
  { src: '/images/68f246d99c0f71325b0fa8c9_10.avif', alt: '' },
  { src: '/images/68f246d829b9ad261622ba22_12.avif', alt: '' },
  { src: '/images/68f246d8360b7b49e57bcd69_13.avif', alt: '' },
  { src: '/images/68f246d863b4e3d783e683cf_14.avif', alt: '' },
]

export default function ConceptCaseStudiesPage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[180px] pb-20 max-[767px]:pt-[130px] max-[767px]:pb-12">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-30"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-7">
            <span className="inline-block self-start rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/50">
              Le Concept
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Case Studies
            </h1>
            <p className="max-w-[500px] text-[1rem] font-thin leading-[1.7] text-[#cfcfcf]">
              400M€ de valeur créée, 150+ dirigeants accompagnés. Voici ce que ça donne concrètement.
            </p>
            <Link href="/contact" className={`self-start ${btnViolet}`}>
              Réserver un appel
              <Arrow />
            </Link>

            {/* Logos clients */}
            <div className="mt-4 flex flex-col gap-4">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Ils nous font confiance
              </span>
              <div className="flex flex-wrap items-center gap-8 opacity-50 max-[767px]:gap-5">
                {clientLogos.map((logo, i) => (
                  <Image
                    key={i}
                    src={logo.src}
                    alt={logo.alt}
                    width={90}
                    height={36}
                    className="h-7 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Liste des case studies ────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            {/* Card Pureva */}
            <Link
              href="/case-studies/etude-de-cas-pureva"
              className={`group flex gap-0 overflow-hidden rounded-[16px] transition hover:-translate-y-0.5 hover:border-[#f285f040] max-[767px]:flex-col ${glassClass}`}
            >
              <div className="w-[45%] shrink-0 overflow-hidden max-[767px]:w-full max-[767px]:h-[240px]">
                <Image
                  src="/images/691ef6d06b58b6bb2805b595_Frame_427322191.avif"
                  alt="Pureva — filtre à eau installé sur un robinet"
                  width={600}
                  height={440}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                      Scale-up B2C
                    </span>
                    <span className="rounded-full border border-hpg-orchid/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-hpg-orchid/70">
                      Accompagnement OP-X
                    </span>
                  </div>
                  <h2 className="text-[1.6rem] font-bold leading-[1.1]">Pureva</h2>
                  <p className="text-[0.9rem] font-thin leading-[1.7] text-[#cfcfcf]">
                    Startup deeptech dans la filtration d&apos;eau. Organisation en tension, trésorerie sous pression, croissance bloquée. En 12 mois, l&apos;entreprise a doublé son ARR et récupéré 100k€ de trésorerie via optimisation financière.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 border-t border-white/[0.06] pt-4 max-[479px]:flex-col max-[479px]:gap-3">
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">+230%</div>
                      <div className="text-[0.75rem] text-white/50">Croissance ARR</div>
                    </div>
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">+100k€</div>
                      <div className="text-[0.75rem] text-white/50">Trésorerie récupérée</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[0.82rem] text-white/40">
                    <span>Adrien Charles-Nicolas & Vincent Mongis</span>
                    <span>·</span>
                    <span className="font-instrument-italic italic text-hpg-orchid/70">CEO @ Pureva</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card Nophone */}
            <div className={`flex gap-0 overflow-hidden rounded-[16px] max-[767px]:flex-col ${glassClass}`}>
              <div
                className="w-[45%] shrink-0 max-[767px]:w-full max-[767px]:h-[200px]"
                style={{
                  background: 'linear-gradient(135deg, rgb(35 20 46 / 0.9) 0%, rgb(20 10 30 / 0.95) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="font-instrument-italic italic text-[3.5rem] leading-none text-white/10">
                  Nophone
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                      Scale-up B2C
                    </span>
                    <span className="rounded-full border border-hpg-orchid/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-hpg-orchid/70">
                      Accompagnement OP-X
                    </span>
                  </div>
                  <h2 className="text-[1.6rem] font-bold leading-[1.1]">Nophone</h2>
                  <p className="text-[0.9rem] font-thin leading-[1.7] text-[#cfcfcf]">
                    Marque B2C en forte croissance. En 3 mois, 6 experts mobilisés sur la refonte site, la stratégie produit et la préparation d&apos;une ouverture internationale avec levée de fonds à la clé.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 border-t border-white/[0.06] pt-4 max-[479px]:flex-col max-[479px]:gap-3">
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">+25%</div>
                      <div className="text-[0.75rem] text-white/50">Demandes entrantes</div>
                    </div>
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">6</div>
                      <div className="text-[0.75rem] text-white/50">Experts mobilisés</div>
                    </div>
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">3 mois</div>
                      <div className="text-[0.75rem] text-white/50">Durée d&apos;intervention</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Coco Combucha */}
            <div className={`flex gap-0 overflow-hidden rounded-[16px] max-[767px]:flex-col ${glassClass}`}>
              <div
                className="w-[45%] shrink-0 max-[767px]:w-full max-[767px]:h-[200px]"
                style={{
                  background: 'linear-gradient(135deg, rgb(35 20 46 / 0.9) 0%, rgb(20 10 30 / 0.95) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="font-instrument-italic italic text-[3rem] leading-none text-white/10 text-center px-4">
                  Coco Combucha
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                      Scale-up B2C
                    </span>
                    <span className="rounded-full border border-hpg-orchid/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-hpg-orchid/70">
                      Accompagnement OP-X
                    </span>
                  </div>
                  <h2 className="text-[1.6rem] font-bold leading-[1.1]">Coco Combucha</h2>
                  <p className="text-[0.9rem] font-thin leading-[1.7] text-[#cfcfcf]">
                    Marque food & beverage avec un produit fort mais une organisation non structurée pour accélérer. En 2 mois d&apos;accompagnement, croissance record sur pic de saison.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 border-t border-white/[0.06] pt-4 max-[479px]:flex-col max-[479px]:gap-3">
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">+160%</div>
                      <div className="text-[0.75rem] text-white/50">Croissance sur pic</div>
                    </div>
                    <div>
                      <div className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid">2 mois</div>
                      <div className="text-[0.75rem] text-white/50">Durée d&apos;intervention</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modèle OP-X ──────────────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Le Concept
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Le modèle <span className="font-instrument-italic italic text-[#f285f0]">OP-X</span>
              </h2>
              <p className="max-w-[580px] text-base font-medium leading-[1.6] text-[#cfcfcf]">
                1 Operating Partner pour vous accompagner, +20 Experts pour exécuter à vos côtés.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-4 max-[767px]:grid-cols-1">
              {/* Card Operating Partner */}
              <div className={`flex flex-col items-start gap-4 rounded-[12px] p-8 text-left ${glassClass}`}>
                <Image
                  src="/images/68f24ba7f77ac21dc6e1fc31__LRG4850.avif"
                  alt="Portrait de l'Operating Partner Ulysse El Sherbeeny"
                  width={70}
                  height={70}
                  className="h-[70px] w-[70px] min-h-[70px] min-w-[70px] rounded-[5px] object-cover object-[50%_20%]"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                    Operating Partner
                  </h3>
                  <p className="font-thin leading-[1.6] text-[#cfcfcf]">
                    Un expert de la croissance rejoint votre équipe dirigeante pour piloter la
                    croissance avec vous, au quotidien.
                  </p>
                </div>
              </div>

              {/* Card Experts */}
              <div className={`flex flex-col items-start gap-4 rounded-[12px] p-8 text-left ${glassClass}`}>
                <Image
                  src="/images/692a54175cc379b9eeaf3183_samuel-fernandes.avif"
                  alt="Portrait de Samuel Fernandes, Expert"
                  width={70}
                  height={70}
                  className="h-[70px] w-[70px] min-h-[70px] min-w-[70px] rounded-[5px] object-cover object-[50%_20%]"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                    Experts
                  </h3>
                  <p className="font-thin leading-[1.6] text-[#cfcfcf]">
                    20+ experts A-players exécutent pour vous, et mettent en place les stratégies
                    imaginées par votre OP.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/concept/methode-op-x" className={btnViolet}>
              Découvrir la méthode OP-X
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
