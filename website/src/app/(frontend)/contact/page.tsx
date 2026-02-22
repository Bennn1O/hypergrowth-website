import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | HyperGrowth',
  description:
    "Parlons de votre phase de scaling. Décrivez votre contexte et découvrez comment l'écurie HyperGrowth peut vous accompagner.",
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

const steps = [
  {
    num: '01',
    title: 'Vous candidatez',
    description:
      'Remplissez le formulaire en décrivant votre contexte, vos enjeux et vos objectifs de croissance.',
  },
  {
    num: '02',
    title: 'On échange',
    description:
      'Un Operating Partner prend contact avec vous pour un premier échange de 30 minutes, sans engagement.',
  },
  {
    num: '03',
    title: 'On construit votre plan',
    description:
      'Si le fit est là, on construit ensemble un plan d\'accompagnement personnalisé selon votre phase.',
  },
]

export default function ContactPage() {
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
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Contact
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Parlons de votre{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">croissance</span>
            </h1>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Décrivez votre contexte et découvrez comment l&apos;écurie HyperGrowth peut vous
              accompagner dans votre phase de scaling.
            </p>
          </div>
        </div>
      </section>

      {/* ── Formulaire ───────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex gap-10 max-[991px]:flex-col">
            {/* Colonne gauche — formulaire */}
            <div className={`flex flex-1 flex-col gap-6 rounded-[16px] p-10 max-[767px]:p-8 ${glassClass}`}>
              <div className="flex flex-col gap-2">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                  Candidature
                </span>
                <h2 className="text-[1.5rem] font-medium leading-[1.2]">
                  Votre situation
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 max-[479px]:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8rem] text-white/60">Prénom</label>
                    <input
                      type="text"
                      placeholder="Killian"
                      className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.9rem] text-white placeholder-white/30 outline-none transition focus:border-[#f285f040] focus:bg-white/[0.06]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8rem] text-white/60">Nom</label>
                    <input
                      type="text"
                      placeholder="Palermo"
                      className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.9rem] text-white placeholder-white/30 outline-none transition focus:border-[#f285f040] focus:bg-white/[0.06]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.8rem] text-white/60">Email professionnel</label>
                  <input
                    type="email"
                    placeholder="killian@hypergrowth.fr"
                    className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.9rem] text-white placeholder-white/30 outline-none transition focus:border-[#f285f040] focus:bg-white/[0.06]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.8rem] text-white/60">Entreprise</label>
                  <input
                    type="text"
                    placeholder="HyperGrowth"
                    className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.9rem] text-white placeholder-white/30 outline-none transition focus:border-[#f285f040] focus:bg-white/[0.06]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.8rem] text-white/60">CA annuel actuel</label>
                  <select className="rounded-[10px] border border-white/10 bg-[rgb(35_20_46_/_0.52)] px-4 py-3 text-[0.9rem] text-white/70 outline-none transition focus:border-[#f285f040]">
                    <option value="">Sélectionnez une tranche</option>
                    <option>Moins de 200k€</option>
                    <option>200k€ — 500k€</option>
                    <option>500k€ — 1M€</option>
                    <option>1M€ — 5M€</option>
                    <option>Plus de 5M€</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.8rem] text-white/60">
                    Décrivez votre situation et vos objectifs
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mon entreprise est en phase de scaling. Mon principal blocage est..."
                    className="resize-none rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.9rem] text-white placeholder-white/30 outline-none transition focus:border-[#f285f040] focus:bg-white/[0.06]"
                  />
                </div>

                <button className={btnViolet}>
                  Envoyer ma candidature
                  <Arrow />
                </button>
              </div>
            </div>

            {/* Colonne droite — infos */}
            <div className="flex w-[340px] shrink-0 flex-col gap-6 max-[991px]:w-full">
              {/* Process */}
              <div className="flex flex-col gap-5">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                  Comment ça marche
                </span>
                <div className="flex flex-col gap-3">
                  {steps.map((step) => (
                    <div
                      key={step.num}
                      className="flex gap-4 rounded-[12px] border border-white/10 bg-white/[0.02] p-5"
                    >
                      <span className="font-instrument-italic italic text-[1.5rem] leading-none text-[#f285f0] opacity-50">
                        {step.num}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[0.9rem] font-medium">{step.title}</span>
                        <span className="text-[0.8rem] font-thin leading-[1.6] text-[#cfcfcf]">
                          {step.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Killian */}
              <div className={`overflow-hidden rounded-[12px] ${glassClass}`}>
                <Image
                  src="/images/68dfda277a4f4332ebf28661_OP3.avif"
                  alt="Killian Palermo"
                  width={340}
                  height={200}
                  className="h-[180px] w-full object-cover object-[50%_20%]"
                />
                <div className="flex flex-col gap-2 p-5">
                  <span className="font-medium">Killian Palermo</span>
                  <span className="text-[0.8rem] font-thin text-[#cfcfcf]">
                    Fondateur HyperGrowth
                  </span>
                  <p className="text-[0.8rem] font-thin leading-[1.6] text-[#cfcfcf]">
                    &ldquo;On ne travaille pas avec tout le monde. On sélectionne les dirigeants
                    avec qui le fit est réel et l&apos;ambition partagée.&rdquo;
                  </p>
                </div>
              </div>

              {/* Test alternatif */}
              <div className="flex flex-col gap-3 rounded-[12px] border border-white/10 bg-white/[0.02] p-5">
                <span className="text-[0.8rem] font-medium">
                  Pas encore prêt à candidater ?
                </span>
                <p className="text-[0.8rem] font-thin leading-[1.6] text-[#cfcfcf]">
                  Faites d&apos;abord le test de scalabilité pour identifier vos priorités.
                </p>
                <Link
                  href="/concept/test-de-scalabilite"
                  className="text-[0.8rem] font-medium text-[#f285f0] transition hover:opacity-70"
                >
                  Faire le test →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Score scalabilité ────────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Le score de scalabilité
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Votre projet est-il{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">scalable</span> ?
            </h2>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Remplissez le questionnaire en moins de 5 minutes et faites enfin un état des
              lieux concret sur votre situation.
            </p>
            <Link href="/concept/test-de-scalabilite" className={btnViolet}>
              Découvrir mon score
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
