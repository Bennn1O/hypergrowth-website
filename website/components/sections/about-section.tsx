'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const easeExpo = [0.16, 1, 0.3, 1] as const

export function AboutSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="mx-auto">
      <div className="mx-auto flex max-w-[var(--width-container)] flex-col items-center justify-center px-8 py-4 max-[767px]:px-4 max-[479px]:mx-0 max-[479px]:px-0">
        <div className="flex items-start gap-10 max-[767px]:flex-col max-[767px]:gap-6">
          <div className="w-[50%] shrink-0 overflow-hidden rounded-xl max-[767px]:w-full">
            <Image
              src="/images/68dfda277a4f4332ebf28661_OP3.avif"
              alt="Killian Palermo debout face à une table"
              width={1500}
              height={1000}
              className="w-full object-cover"
            />
          </div>

          <motion.div
            ref={ref}
            className="sticky top-[120px] flex flex-col items-start gap-5 py-4 max-[767px]:static"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">L&apos;écurie</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium leading-[1.08]">
              15 projets créés, 7 <span className="font-instrument-italic italic text-hpg-orchid">échecs</span>, des millions générés : j&apos;ai appris par l&apos;<span className="font-instrument-italic italic text-hpg-orchid">expérience.</span>
            </h2>
            <p className="text-[0.95rem] font-thin leading-[1.7] text-hpg-silver">
              J&apos;ai lancé plus de 15 boîtes, j&apos;en ai planté 7 et d&apos;autres ont généré des millions, ce qui m&apos;a
              permis de comprendre que le vrai défi, ce n&apos;est pas de démarrer, c&apos;est de scaler.
            </p>
            <p className="text-[0.95rem] font-thin leading-[1.7] text-hpg-silver">
              J&apos;ai donc créé un modèle simple et efficace : un Operating Partner qui avance avec toi, soutenu par
              des experts métiers.
            </p>
            <p className="text-[0.95rem] font-thin leading-[1.7] text-hpg-silver">
              Pas de théorie juste du concret, de l&apos;exécution et de la croissance maîtrisée.
            </p>
            <Link
              href="/lecurie/a-propos"
              className="mt-2 inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
            >
              <div>À propos</div>
              <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
