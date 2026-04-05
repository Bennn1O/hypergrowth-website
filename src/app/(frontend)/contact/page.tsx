import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Réserver un appel | HyperGrowth',
  description:
    'Réservez un appel avec un Operating Partner HyperGrowth. 30 minutes pour évaluer votre contexte et voir si le fit est là.',
}

const containerClass =
  'hpg-container'

const steps = [
  {
    num: '01',
    title: 'Vous réservez',
    description: 'Choisissez un créneau directement dans l\'agenda. Pas de formulaire intermédiaire, pas d\'attente.',
  },
  {
    num: '02',
    title: 'On échange 30 min',
    description: 'Un Operating Partner analyse votre contexte, vos enjeux, votre phase de croissance.',
  },
  {
    num: '03',
    title: 'On construit la suite',
    description: 'Si le fit est là, on pose ensemble les bases d\'un plan d\'accompagnement sur-mesure.',
  },
]

export default function ContactPage() {
  return (
    <main className="flex flex-col items-stretch">

      {/* Hero */}
      <section className="relative overflow-hidden pt-[180px] pb-10 max-[767px]:pt-[130px]">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-20"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-4 max-w-[640px]">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Réserver un appel
            </span>
            <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              Parlons de votre{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">croissance.</span>
            </h1>
            <p className="max-w-[480px] text-[0.95rem] font-thin leading-[1.7] text-hpg-silver">
              30 minutes. Un Operating Partner. Pas de pitch, pas d&apos;engagement. On regarde ensemble si le contexte s&apos;y prête.
            </p>
          </div>
        </div>
      </section>

      {/* Booking + Killian */}
      <section className="mx-auto w-full pb-10">
        <div className={containerClass}>
          <div className="flex items-start gap-10 max-[991px]:flex-col">

            {/* Killian card */}
            <div className="flex w-[300px] shrink-0 flex-col gap-6 max-[991px]:w-full max-[991px]:flex-row max-[767px]:flex-col">
              <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[rgb(35_20_46_/_0.52)] backdrop-blur-[26px]">
                <Image
                  src="/images/68dfda277a4f4332ebf28661_OP3.avif"
                  alt="Killian Palermo, fondateur HyperGrowth"
                  width={300}
                  height={220}
                  className="h-[220px] w-full object-cover object-[50%_20%]"
                />
                <div className="flex flex-col gap-2 p-5">
                  <span className="font-medium">Killian Palermo</span>
                  <span className="text-[0.75rem] font-thin text-hpg-orchid/80">Fondateur, Operating Partner</span>
                  <p className="mt-1 text-[0.82rem] font-thin leading-[1.6] text-hpg-silver">
                    &ldquo;On ne travaille pas avec tout le monde. On sélectionne les dirigeants avec qui le fit est réel et l&apos;ambition partagée.&rdquo;
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-4">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="font-instrument-italic mt-0.5 shrink-0 text-[1.1rem] italic leading-none text-hpg-orchid opacity-50">
                      {step.num}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[0.88rem] font-medium">{step.title}</span>
                      <span className="text-[0.8rem] font-thin leading-[1.6] text-hpg-silver">{step.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HubSpot embed */}
            <div className="flex-1 overflow-hidden rounded-[16px] border border-white/10 bg-[rgb(35_20_46_/_0.3)] backdrop-blur-[14px] max-[991px]:w-full">
              <iframe
                src="https://meetings-eu1.hubspot.com/kpalermo?embed=true"
                width="100%"
                height="700"
                frameBorder="0"
                title="Réserver un appel avec Killian Palermo"
                style={{ display: 'block' }}
              />
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
