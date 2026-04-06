'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function CommunitySection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="mx-auto">
      <div className="mx-auto flex max-w-[var(--width-container)] flex-col items-center justify-center px-8 py-4 max-[767px]:px-4 max-[479px]:mx-0 max-[479px]:px-4">
        <div className="flex items-start gap-10 max-[767px]:flex-col max-[767px]:gap-6">
          <div className="w-[50%] shrink-0 overflow-hidden rounded-xl max-[767px]:w-full">
            <Image
              src="/images/68dff51fedf4c46812d51800_club.avif"
              alt="Photo depuis les loges surmontant un circuit de formule 1, réservé aux membres du HyperClub"
              width={480}
              height={640}
              className="w-full object-cover"
            />
          </div>

          <div
            ref={ref}
            className={`reveal-x${isInView ? ' in-view' : ''} sticky top-[120px] flex flex-col items-start gap-5 py-4 max-[767px]:static`}
          >
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">Communauté</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium leading-[1.08]">
              Dans le paddock des dirigeants{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">qui gagnent.</span>
            </h2>
            <p className="text-[0.95rem] font-normal leading-[1.7] text-hpg-silver">
              Dans une écurie F1, personne n&apos;est spectateur. Chaque membre a un rôle, une intention, une vitesse. L&apos;HyperClub fonctionne pareil : 80+ dirigeants qui s&apos;entraident avec précision, se retrouvent dans des lieux qui comptent, et avancent ensemble plus vite qu&apos;ils ne le feraient seuls.
            </p>
            <Link
              href="/communaute/hyperclub"
              className="mt-2 inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
            >
              <div>HyperClub</div>
              <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
