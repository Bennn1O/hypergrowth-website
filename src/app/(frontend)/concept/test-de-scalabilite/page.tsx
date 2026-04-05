import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Test de Scalabilité | HyperGrowth',
  description:
    "Mesurez votre maturité de passage à l'échelle et identifiez vos priorités d'action en moins de 5 minutes.",
}

const containerClass =
  'hpg-container'

const glassClass =
  'hpg-glass-soft'

const dimensions = [
  {
    num: '01',
    title: 'Organisation & Délégation',
    description: 'Êtes-vous en capacité de déléguer sans perdre en qualité ? Votre structure tient-elle sans vous ?',
  },
  {
    num: '02',
    title: 'Acquisition & Croissance',
    description: 'Vos canaux d\'acquisition sont-ils prédictibles et scalables ? Votre pipeline est-il maîtrisé ?',
  },
  {
    num: '03',
    title: 'Systèmes & Processus',
    description: 'Vos opérations sont-elles documentées ? Avez-vous des process qui tournent sans votre intervention ?',
  },
  {
    num: '04',
    title: 'Finance & Pilotage',
    description: 'Pilotez-vous avec les bons indicateurs ? Votre trésorerie est-elle sous contrôle à 90 jours ?',
  },
  {
    num: '05',
    title: 'Management & Équipe',
    description: 'Votre équipe est-elle alignée sur vos objectifs ? Recrutez-vous avec méthode ou dans l\'urgence ?',
  },
  {
    num: '06',
    title: 'Posture Dirigeant',
    description: 'Êtes-vous dans votre rôle de CEO ou encore dans l\'opérationnel ? Avez-vous du temps pour penser ?',
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

      {/* Hero */}
      <section className="relative overflow-hidden pt-[180px] pb-10 max-[767px]:pt-[130px]">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-5 max-w-[640px]">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Le Concept
            </span>
            <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              Votre score de{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">scalabilité.</span>
            </h1>
            <p className="max-w-[480px] text-[0.95rem] font-thin leading-[1.7] text-hpg-silver">
              5 minutes. 6 dimensions. Un diagnostic honnête de votre organisation, et les vrais blocages que la croissance masque.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
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
      </section>

      {/* Typeform embed */}
      <section id="test" className="mx-auto w-full">
        <div className={containerClass}>
          <div className={`overflow-hidden rounded-[16px] ${glassClass}`}>
            <iframe
              src="https://form.typeform.com/to/STWAU1uE?typeform-embed=embed-widget&embed-opacity=0&typeform-embed-handles-redirect=1"
              width="100%"
              height="600"
              frameBorder="0"
              title="Test de scalabilité HyperGrowth"
              allow="camera; microphone; autoplay; encrypted-media;"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* 6 dimensions */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Ce que le test évalue
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08]">
                6 dimensions{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">clés</span>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1">
              {dimensions.map((dim) => (
                <div key={dim.num} className={`flex flex-col gap-4 rounded-[12px] p-6 ${glassClass}`}>
                  <span className="font-instrument-italic italic text-[2rem] leading-none text-hpg-orchid opacity-40">
                    {dim.num}
                  </span>
                  <h3 className="font-medium leading-[1.3]">{dim.title}</h3>
                  <p className="text-[0.85rem] font-thin leading-[1.6] text-hpg-silver">
                    {dim.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
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
                Score en main. Et maintenant{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">?</span>
              </h2>
              <p className="max-w-[480px] font-thin leading-[1.7] text-hpg-silver">
                Un Operating Partner analyse votre résultat avec vous en 30 minutes. Pas d&apos;engagement, juste de la clarté.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-[12px] border border-hpg-violet-border bg-hpg-violet-btn px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
              >
                Réserver un appel
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
