import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Test de Scalabilité | HyperGrowth',
  description:
    "Mesurez votre maturité de passage à l'échelle et identifiez vos priorités d'action en moins de 5 minutes.",
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

const dimensions = [
  {
    num: '01',
    title: 'Organisation & Délégation',
    description:
      'Êtes-vous en capacité de déléguer sans perdre en qualité ? Votre structure tient-elle sans vous ?',
  },
  {
    num: '02',
    title: 'Acquisition & Croissance',
    description:
      'Vos canaux d\'acquisition sont-ils prédictibles et scalables ? Votre pipeline est-il maîtrisé ?',
  },
  {
    num: '03',
    title: 'Systèmes & Processus',
    description:
      'Vos opérations sont-elles documentées ? Avez-vous des process qui tournent sans votre intervention ?',
  },
  {
    num: '04',
    title: 'Finance & Pilotage',
    description:
      'Pilotez-vous avec les bons indicateurs ? Votre trésorerie est-elle sous contrôle à 90 jours ?',
  },
  {
    num: '05',
    title: 'Management & Équipe',
    description:
      'Votre équipe est-elle alignée sur vos objectifs ? Recrutez-vous avec méthode ou dans l\'urgence ?',
  },
  {
    num: '06',
    title: 'Posture Dirigeant',
    description:
      'Êtes-vous dans votre rôle de CEO ou encore dans l\'opérationnel ? Avez-vous du temps pour penser ?',
  },
]

const stats = [
  { value: '+82%', label: 'identifient un frein majeur' },
  { value: '+70%', label: 'ajustent leur stratégie sous 7 jours' },
  { value: '5 min', label: 'pour compléter le test' },
  { value: '150+', label: 'dirigeants ont déjà testé' },
]

export default function TestScalabilitePage() {
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
              Le Concept
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Votre score de{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">scalabilité</span>
            </h1>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Un questionnaire de 5 minutes pour faire un état des lieux honnête de votre
              business et identifier vos priorités d&apos;action.
            </p>
            <Link
              href="https://hypergrowth.fr/concept/test-de-scalabilite"
              target="_blank"
              rel="noopener noreferrer"
              className={`self-start ${btnViolet}`}
            >
              Faire le test maintenant
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="grid grid-cols-4 gap-4 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-[12px] border border-white/10 bg-white/[0.02] p-6 text-center"
              >
                <span className="font-instrument-italic italic text-[2.5rem] leading-none text-[#f285f0]">
                  {stat.value}
                </span>
                <span className="text-[0.8rem] text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accroche ─────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-start gap-10 max-[767px]:flex-col">
            <div className="flex flex-1 flex-col gap-6">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Pourquoi ce test
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                La croissance cache souvent les{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">vrais blocages</span>
              </h2>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                On rencontre beaucoup de dirigeants qui travaillent dur mais qui tournent en rond.
                Ils sentent que quelque chose bloque, mais n&apos;arrivent pas à mettre le doigt
                dessus.
              </p>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                Ce test a été conçu à partir de 150+ accompagnements pour vous aider à faire un
                diagnostic honnête en quelques minutes. Pas de théorie, que du concret.
              </p>
              <Link href="https://hypergrowth.fr/concept/test-de-scalabilite" target="_blank" rel="noopener noreferrer" className={`self-start ${btnViolet}`}>
                Découvrir mon score
                <Arrow />
              </Link>
            </div>
            <div className="w-[380px] shrink-0 overflow-hidden rounded-[16px] max-[767px]:w-full">
              <Image
                src="/images/68dfda277a4f4332ebf28661_OP3.avif"
                alt="Killian Palermo"
                width={760}
                height={540}
                className="h-[380px] w-full object-cover object-[50%_20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 dimensions ─────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Ce que le test évalue
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                6 dimensions{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">clés</span>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1">
              {dimensions.map((dim) => (
                <div key={dim.num} className={`flex flex-col gap-4 rounded-[12px] p-6 ${glassClass}`}>
                  <span className="font-instrument-italic italic text-[2rem] leading-none text-[#f285f0] opacity-40">
                    {dim.num}
                  </span>
                  <h3 className="font-medium leading-[1.3]">{dim.title}</h3>
                  <p className="text-[0.85rem] font-thin leading-[1.6] text-[#cfcfcf]">
                    {dim.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA test ─────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div
            className="relative overflow-hidden rounded-[20px] p-12 text-center max-[767px]:p-8"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(125,63,171,0.35) 0%, rgba(10,4,16,0.95) 70%)',
              border: '1px solid rgba(242,133,240,0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                5 minutes chrono
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Quel est votre{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">score</span> ?
              </h2>
              <p className="max-w-[480px] font-thin leading-[1.7] text-[#cfcfcf]">
                Remplissez le questionnaire et obtenez un diagnostic personnalisé sur votre
                maturité de passage à l&apos;échelle.
              </p>
              <Link
                href="https://hypergrowth.fr/concept/test-de-scalabilite"
                target="_blank"
                rel="noopener noreferrer"
                className={btnViolet}
              >
                Faire le test — 5 min
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Aller plus loin
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Prêt à passer à l&apos;
              <span className="font-instrument-italic italic text-[#f285f0]">action</span> ?
            </h2>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Une fois votre score en main, échangez avec un Operating Partner pour construire
              votre plan d&apos;accompagnement.
            </p>
            <Link href="/contact" className={btnViolet}>
              Postuler à l&apos;accompagnement
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
