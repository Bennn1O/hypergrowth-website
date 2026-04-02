'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const opPortraits = [
  '/images/691c061ffd35bc39df62402e_4.avif',
  '/images/691d6cf72d819a8d8fb58687_manon-werquin.avif',
  '/images/691c03760aa8bdaef402445a_6.avif',
  '/images/691c04b0968fd7912c9495f0_evan.avif',
]

const expertPortraits = [
  '/images/69245b88607064c4ad4689d2_elise-hetsch.avif',
  '/images/69246e7904d0945af5d37bb6_anthony-diochon.avif',
  '/images/692d6588601597f7adcd0b96_portrait.avif',
  '/images/692458acf8b048f9a195d760_guillaume-pesnel.avif',
]

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-auto px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

const glassClass =
  'border border-white/10 bg-[rgb(31_18_43_/_0.44)] backdrop-blur-[14px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.11),0_24px_52px_rgb(4_2_8_/_0.33)]'

const easeExpo = [0.16, 1, 0.3, 1] as const

const gridCells = ['header', 'killian', 'ulysse', 'ops', 'experts', 'cta']

export function TeamSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="mx-auto py-10">
      <div className={containerClass}>
        <div className="flex flex-col items-start justify-center max-[479px]:px-4">
          <div
            ref={ref}
            className="grid grid-cols-3 grid-rows-[auto_auto_auto] gap-4 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1"
          >
            {gridCells.map((cell, index) => {
              const motionProps = {
                initial: { opacity: 0, y: 24 },
                animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                transition: { duration: 0.7, ease: easeExpo, delay: index * 0.1 },
              }

              if (cell === 'header') {
                return (
                  <motion.div key={cell} {...motionProps} className="flex flex-col justify-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">L&apos;écurie</span>
                    <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                      Les <span className="font-instrument-italic italic text-hpg-orchid">équipes</span>
                    </h2>
                    <p className="max-w-[280px] text-[0.95rem] font-thin leading-[1.7] text-hpg-silver">
                      Découvrez les Operating partners et les experts qui constituent l&apos;éco-système HyperGrowth.
                    </p>
                  </motion.div>
                )
              }

              if (cell === 'killian') {
                return (
                  <motion.div key={cell} {...motionProps} className={`flex flex-col items-start justify-center gap-16 rounded-xl p-8 ${glassClass}`}>
                    <Image src="/images/portrait-killian.webp" alt="Portrait du fondateur Killian Palermo" width={70} height={70} className="rounded-[10px]" />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl leading-[1.2]">Killian Palermo</h3>
                      <div className="font-thin text-hpg-silver">Founder &amp; Chief OP</div>
                    </div>
                  </motion.div>
                )
              }

              if (cell === 'ulysse') {
                return (
                  <motion.div key={cell} {...motionProps} className={`flex flex-col items-start justify-center gap-16 rounded-xl p-8 ${glassClass}`}>
                    <Image src="/images/portrait-ulysse-square.webp" alt="Portrait de l'Operating Partner Ulysse El Sherbeeny" width={70} height={70} className="rounded-[10px]" />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl leading-[1.2]">Ulysse El Sherbeeny</h3>
                      <div className="font-thin text-hpg-silver">CEO &amp; OP scaling perso</div>
                    </div>
                  </motion.div>
                )
              }

              if (cell === 'ops') {
                return (
                  <motion.div key={cell} {...motionProps} className="flex flex-col items-start justify-start gap-16 rounded-xl border border-white/10 bg-[var(--hpg-color-violet)] p-8">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl leading-[1.2]">Les OP</h3>
                      <div className="flex">
                        {opPortraits.map((portrait, i) => (
                          <Image
                            key={portrait}
                            src={portrait}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                            style={{ outline: '4px solid var(--hpg-color-violet)', marginRight: i === opPortraits.length - 1 ? 0 : '-0.4rem' }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="font-thin text-hpg-silver">Ils vous accompagnent au quotidien, vous allègent, et vous aident à prendre les décisions.</div>
                  </motion.div>
                )
              }

              if (cell === 'experts') {
                return (
                  <motion.div key={cell} {...motionProps} className="flex flex-col items-start justify-start gap-16 rounded-xl border border-white/10 bg-[var(--hpg-color-violet)] p-8">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl leading-[1.2]">Les Experts</h3>
                      <div className="flex">
                        {expertPortraits.map((portrait, i) => (
                          <Image
                            key={portrait}
                            src={portrait}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                            style={{ outline: '4px solid var(--hpg-color-violet)', marginRight: i === expertPortraits.length - 1 ? 0 : '-0.4rem' }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="font-thin text-hpg-silver">Ils exécutent, apportent leur expertise et vous accompagne sur une mission précise.</div>
                  </motion.div>
                )
              }

              if (cell === 'cta') {
                return (
                  <motion.div key={cell} {...motionProps} className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-xl border border-hpg-violet-border p-8">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: "url('https://cdn.prod.website-files.com/68d56b17b598c54a4e9c8d9d/68de97f25b726628c7d71e1c_HPG_brand-elements_trait-16-9.avif')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(128_63_171_/_0.6)_0%,rgb(24_10_34_/_0.85)_50%,rgb(24_10_34_/_0.95)_100%)] backdrop-blur-[14px]" />
                    <div className="relative z-10 flex flex-col gap-3">
                      <h3 className="text-2xl leading-[1.2]">Prêt à scaler ?</h3>
                      <p className="text-[0.85rem] font-thin leading-[1.6] text-hpg-silver">
                        Découvrez les profils qui pourraient piloter votre croissance et exécuter à vos côtés.
                      </p>
                    </div>
                    <Link
                      href="/lecurie/les-op"
                      className="relative z-10 inline-flex items-center justify-center gap-8 rounded-xl border border-hpg-violet-border bg-hpg-violet px-6 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
                    >
                      <div>Découvrir les profils</div>
                      <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
                    </Link>
                  </motion.div>
                )
              }

              return null
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
