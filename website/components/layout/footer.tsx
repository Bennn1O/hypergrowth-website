import Link from 'next/link'
import { ArrowUpRight01Icon } from 'hugeicons-react'

const footerSections = [
  { title: 'Le Concept', links: [ { label: 'Méthode OP-X', href: '/concept/methode-op-x' }, { label: 'Case Studies', href: '/concept/case-studies' }, { label: 'Scalabilité', href: '/concept/test-de-scalabilite' } ] },
  { title: 'Communauté', links: [ { label: 'Évènements', href: '/communaute/evenements' }, { label: 'HyperClub', href: '/communaute/hyperclub' }, { label: 'Témoignages', href: '/communaute/temoignages' } ] },
  { title: "L'écurie", links: [ { label: 'À Propos', href: '/lecurie/a-propos' }, { label: "L'équipe", href: '/lecurie/les-op' }, { label: 'Ressources', href: '/lecurie/ressources' } ] },
]

const footerEvents = ['Café Croissance Bordeaux', 'Mastermind Sri Lanka', 'Café Croissance Lille']

export function Footer() {
  return (
      <footer className="mx-auto mt-20 flex w-full flex-col gap-8 rounded-xl bg-hpg-violet bg-[radial-gradient(circle_farthest-corner_at_20%_50%,var(--hpg-color-night),#803fab00),url('/images/hpg-brand-trait-16-9.avif')] bg-[length:auto,cover] bg-[position:0_0,0_0] bg-no-repeat px-8 py-4 max-[767px]:px-4 max-[479px]:m-0 max-[479px]:py-[1.1rem]">
        <div className="flex items-stretch gap-8 py-8 max-[991px]:flex-col">
          <div className="flex w-1/2 flex-col items-start justify-center gap-8 max-[991px]:w-full max-[479px]:px-4">
            <div className="flex flex-col gap-8">
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">Votre projet est-il <span className="font-instrument-italic italic text-hpg-orchid">scalable</span> ?</h2>
              <div className="font-thin">
                Nous avons créé ce questionnaire pour aider les founders à faire un état des lieux. Remplissez-le en
                moins de 5 minutes et faites enfin un état des lieux concret sur votre situation.
              </div>
            </div>

            <Link
              href="/concept/test-de-scalabilite"
              className="inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:bg-[#6f33a0]"
            >
              <div>Découvrir mon score</div>
              <ArrowUpRight01Icon size={20} />
            </Link>
          </div>

          <div className="grid w-1/2 grid-cols-2 gap-x-10 gap-y-8 rounded-xl border border-white/10 bg-[rgb(31_18_43_/_0.44)] p-8 backdrop-blur-[14px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.11),0_24px_52px_rgb(4_2_8_/_0.33)] max-[991px]:w-full max-[479px]:grid-cols-1">
            {footerSections.map((section) => (
              <div key={section.title}>
                <div className="mb-4 text-xs font-medium uppercase tracking-[0.08em] text-white/40">{section.title}</div>
                <div className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-[0.85rem] leading-[1.3] text-white transition-colors hover:text-hpg-orchid">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.08em] text-white/40">Les Évènements</div>
              <div className="flex flex-col gap-3">
                {footerEvents.map((eventName) => (
                  <div key={eventName} className="text-[0.85rem] leading-[1.3] text-white">
                    {eventName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between text-[0.8rem] max-[767px]:flex-col max-[767px]:gap-4 max-[767px]:text-center">
          <Link href="/">
            <span className="font-instrument-italic text-[1.15rem] font-normal text-hpg-orchid">Hyper</span>
            Growth
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-hpg-silver">
            <span className="font-thin">2026 | Tous droits réservés</span>
            <span className="text-white/20">·</span>
            <span>Designed by</span>
            <a href="https://www.bleuecitadelle.com" target="_blank" rel="noopener noreferrer" className="font-instrument-italic text-[0.95rem] text-hpg-orchid hover:underline">Bleue Citadelle,</a>
            <span> brought to you by</span>
            <a href="https://omenstudio.co" target="_blank" rel="noopener noreferrer" className="font-medium uppercase tracking-[0.02em] text-white hover:text-hpg-orchid">OMEN STUDIO</a>
          </div>

          <Link href="/mentions-legales" className="font-thin text-hpg-silver hover:text-white">
            Mentions Légales
          </Link>
        </div>
      </footer>
  )
}
