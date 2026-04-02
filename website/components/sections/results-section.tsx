'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const stats = [
  { value: '400M€', label: "de chiffre d'affaire piloté" },
  { value: '150+', label: 'dirigeants accompagnés' },
  { value: '80+', label: "membres de l'HyperClub" },
  { value: '+7M€', label: 'levés par nos clients' },
]

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-auto px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

export function ResultsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="mx-auto py-10">
      <div className={containerClass}>
        <div className="flex flex-col items-stretch justify-start gap-3 max-[479px]:items-center">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40"
          >
            Nos cas clients
          </motion.span>

          <div className="flex w-full flex-row gap-8 max-[991px]:flex-col max-[479px]:items-center max-[479px]:px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex w-1/2 flex-col items-start justify-between gap-8 max-[991px]:w-full max-[479px]:items-center"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                  Nos <span className="font-instrument-italic italic text-hpg-orchid">résultats</span>
                </h2>
                <p className="text-base font-medium leading-[1.6] text-hpg-silver">
                  Des chiffres réels, sur des entreprises réelles. Ce que nous construisons avec nos clients — en transparence.
                </p>
              </div>

              <div className="flex flex-row items-center justify-start gap-4 max-[479px]:w-full max-[479px]:flex-col max-[479px]:items-start">
                <Link
                  href="/concept/case-studies"
                  className="group inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
                >
                  <div>Nos études de cas</div>
                  <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
                </Link>
              </div>
            </motion.div>

            <div className="grid w-1/2 grid-cols-2 gap-4 max-[991px]:w-full max-[479px]:grid-cols-1">
              {stats.map((stat, index) => (
                <motion.figure
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.1 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-[8px]"
                >
                  <div className="font-instrument text-[4.5rem] leading-[1] text-hpg-orchid">{stat.value}</div>
                  <div className="text-[0.8rem] font-medium leading-[1.3] text-white">{stat.label}</div>
                </motion.figure>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex w-full flex-col gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-8 max-[479px]:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-hpg-orchid">Témoignage</span>
                  <span className="text-[0.75rem] text-white/30">·</span>
                  <a
                    href="https://www.pureva.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/40 transition hover:text-white/60"
                  >
                    Pureva
                  </a>
                </div>
                <Image
                  src="/images/68f62f2bf8f3beee3f75c9cb_HPG_website_icon_quote_blanc.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="opacity-20"
                />
              </div>

              <p className="max-w-[700px] text-[0.95rem] leading-[1.7] text-hpg-silver">
                Killian possède des qualités d'analyse humaines et structurelles qui peuvent faire changer grandement les choses sur une entreprise en croissance. Il est à la fois votre accélérateur et le pilier d'une structure organisée et surtout efficace !
              </p>

              <div className="flex gap-6 max-[479px]:flex-col max-[479px]:gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-instrument text-[2.5rem] leading-[1] text-hpg-orchid">+230%</span>
                  <span className="text-[0.8rem] text-white/60">Croissance ARR</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-instrument text-[2.5rem] leading-[1] text-hpg-orchid">+100k€</span>
                  <span className="text-[0.8rem] text-white/60">Trésorerie récupérée</span>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-white/[0.06] pt-6">
                <Image
                  src="/images/6921580b599cf93460328c8c_IMG_8814.webp"
                  alt="Vincent Mongis et Adrien Charles-Nicolas"
                  width={48}
                  height={48}
                  className="h-[48px] w-[48px] rounded-full object-cover object-[50%_15%]"
                />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.9rem] font-medium">Vincent Mongis & Adrien Charles-Nicolas</span>
                    <a href="https://www.linkedin.com/company/pureva/" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">
                      <Image
                        src="/images/68e76c318862de30ebd604fd_HPG_website_icon_in.svg"
                        alt="LinkedIn"
                        width={16}
                        height={16}
                      />
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.8rem] text-hpg-silver">
                    <span className="font-instrument-italic italic text-hpg-orchid">CEO</span>
                    <span>@</span>
                    <a
                      href="https://www.pureva.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/20 underline-offset-2 transition hover:decoration-white/60"
                    >
                      Pureva
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
