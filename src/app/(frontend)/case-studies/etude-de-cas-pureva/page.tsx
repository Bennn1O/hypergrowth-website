import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pureva : Cas Client HyperGrowth',
  description:
    'Comment structurer une startup en hypercroissance sans en brider la dynamique ? Étude de cas Pureva × HyperGrowth.',
}

const containerClass =
  'hpg-container'

const glassClass =
  'hpg-glass-soft'

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

export default function PurevaCaseStudyPage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[180px] pb-12 max-[767px]:pt-[130px]">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[50vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col items-center text-center gap-5">
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.02]">Pureva</h1>
            <p className="max-w-[540px] text-[1rem] font-thin leading-[1.7] text-hpg-silver">
              Comment structurer une startup en hypercroissance sans en brider la dynamique ?
            </p>
          </div>
        </div>
      </section>

      {/* ── Image hero ───────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[16px]">
            <Image
              src="/images/691ef6d06b58b6bb2805b595_Frame_427322191.avif"
              alt="Pureva — filtre à eau installé sur un robinet"
              width={1300}
              height={700}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Avant HyperGrowth ────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-start gap-8 max-[767px]:flex-col">
            <h2 className="w-[240px] shrink-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.1] max-[767px]:w-full">
              Avant HyperGrowth
            </h2>
            <div className="flex flex-1 gap-4 max-[767px]:flex-col">
              {/* Désirs du client */}
              <div className={`flex flex-1 flex-col gap-6 rounded-[12px] p-8 ${glassClass}`}>
                <span className="inline-block self-start rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                  Les Désirs du client
                </span>
                <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                  Structurer la croissance et stabiliser l'entreprise
                </h3>
                <p className="text-[0.9rem] font-thin leading-[1.7] text-hpg-silver">
                  Adrien & Vincent voulaient un cadre stratégique clair (finance, RH, pilotage)
                  pour absorber leur hypercroissance sans perdre en qualité.
                </p>
              </div>
              {/* Problèmes */}
              <div className={`flex flex-1 flex-col gap-6 rounded-[12px] p-8 ${glassClass}`}>
                <span className="inline-block self-start rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/50">
                  Problèmes et challenges
                </span>
                <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                  Hypercroissance non pilotée
                </h3>
                <p className="text-[0.9rem] font-thin leading-[1.7] text-hpg-silver">
                  Trésorerie sous pression, modèle 100 % externalisé difficile à coordonner,
                  décisions lentes, absence de pilotage financier et manque d'expertise tech pour
                  la suite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Avec HyperGrowth ─────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-start gap-8 max-[767px]:flex-col">
            <h2 className="w-[240px] shrink-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.1] max-[767px]:w-full">
              Avec HyperGrowth
            </h2>
            <div className="flex flex-1 gap-4 max-[767px]:flex-col">
              {/* Désirs */}
              <div className="flex flex-1 flex-col gap-6 rounded-[12px] bg-hpg-violet-btn p-8 shadow-[0_16px_40px_rgb(80_20_120_/_0.35)]">
                <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                  Les Désirs du client
                </span>
                <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                  Structuration & pilotage complet.
                </h3>
                <p className="text-[0.9rem] font-thin leading-[1.7] text-white/85">
                  Mise en place d'un système financier robuste, optimisation du BFR, structuration
                  des process, gouvernance fondée, intégration de prestataires clés et activation
                  d'un comité scientifique.
                </p>
              </div>
              {/* Résultats côté client */}
              <div className="flex flex-1 flex-col gap-6 rounded-[12px] bg-hpg-violet-btn p-8 shadow-[0_16px_40px_rgb(80_20_120_/_0.35)]">
                <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                  Problèmes et challenges
                </span>
                <h3 className="text-[1.2rem] font-medium leading-[1.25]">
                  Clarté, alignement et puissance décisionnelle.
                </h3>
                <p className="text-[0.9rem] font-thin leading-[1.7] text-white/85">
                  Dirigeants alignés, organisation fluide, vision long terme assumée, écosystème
                  solide (finance, juridique, R&D) et confiance retrouvée dans la capacité à
                  scaler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Résultats ────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex gap-8 max-[767px]:flex-col">
            {/* Témoignage */}
            <div className="relative flex flex-1 flex-col gap-6 overflow-hidden rounded-[12px] bg-hpg-violet-btn p-10 max-[767px]:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  background:
                    'radial-gradient(ellipse at 80% 50%, #c084fc 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col gap-6">
                <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                  Témoignage
                </span>
                <p className="text-[1rem] font-thin leading-[1.7] text-white/90">
                  Killian possède des qualités d'analyse humaines et structurelles qui peuvent
                  faire changer grandement les choses sur une entreprise en croissance. Il est à
                  la fois votre accélérateur et le pilier d'une structure organisée et surtout
                  efficace !
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-white/20 pt-6">
                  <Image
                    src="/images/6921580b599cf93460328c8c_IMG_8814.webp"
                    alt="Adrien Charles-Nicolas & Vincent Mongis"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-[0.9rem] font-medium">
                      Adrien Charles-Nicolas & Vincent Mongis
                    </p>
                  </div>
                  <Image
                    src="/images/68e3f507fcac1b8c934d1e24_icons8-linkedin-250.svg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex w-[280px] shrink-0 flex-col gap-4 max-[767px]:w-full max-[767px]:flex-row max-[479px]:flex-col">
              <div className={`flex flex-1 flex-col gap-2 rounded-[12px] p-8 ${glassClass}`}>
                <span className="font-instrument-italic italic text-[2.8rem] leading-none text-hpg-orchid">
                  +230%
                </span>
                <span className="mt-2 text-[0.85rem] font-thin leading-[1.5] text-hpg-silver">
                  Croissance de l'ARR depuis le début de l'accompagnement.
                </span>
              </div>
              <div className={`flex flex-1 flex-col gap-2 rounded-[12px] p-8 ${glassClass}`}>
                <span className="font-instrument-italic italic text-[2.8rem] leading-none text-hpg-orchid">
                  +100K€
                </span>
                <span className="mt-2 text-[0.85rem] font-thin leading-[1.5] text-hpg-silver">
                  Trésorerie récupérée via optimisation financière.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
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
                Et si c&apos;était votre{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">tour ?</span>
              </h2>
              <p className="max-w-[480px] font-thin leading-[1.7] text-hpg-silver">
                Un Operating Partner analyse votre contexte en 30 minutes. Pas d&apos;engagement, juste de la clarté.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className={btnViolet}>
                  Réserver un appel
                  <Arrow />
                </Link>
                <Link
                  href="/concept/case-studies"
                  className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Voir tous les cas clients
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
