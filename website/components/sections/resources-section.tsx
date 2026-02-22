'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const featuredArticle = {
  category: 'Management',
  date: 'November 29, 2025',
  title: 'Quand tout repose sur vous : le piège du micro-management',
  excerpt:
    "Vous êtes le fondateur ou dirigeant d'une PME en phase de scaling et tout semble reposer sur vous. Travailler dur ne suffit pas, il faut travailler à bon escient – et à ce stade, cela signifie lever la tête du guidon.",
  href: '/ressources/quand-tout-repose-sur-vous-le-piege-du-micro-management',
}

const articles = [
  {
    category: 'Management',
    date: 'October 21, 2025',
    title: 'Déléguer sans lâcher prise',
    image: '/images/68f761cafda0ac1ba0ef621c_COUVERTURE.avif',
    href: '/ressources/deleguer-sans-lacher-prise',
    imageAlt:
      "Portrait d'une dirigeante concentrée devant son ordinateur, en pleine réflexion nocturne. Symbolise la charge mentale du CEO en scaling.",
  },
  {
    category: 'Management',
    date: 'November 29, 2025',
    title: 'Quand tout repose sur vous : le piège du micro-management',
    image: '/images/68f76b48bf1f2b7d00286595_reprendre-le-lead.avif',
    href: '/ressources/quand-tout-repose-sur-vous-le-piege-du-micro-management',
    imageAlt:
      "Portrait d'un dirigeant submergé par le flux de documents, illustrant la surcharge mentale liée au micro-management.",
  },
]

const containerClass =
  'mx-auto block max-w-[var(--width-container)] overflow-auto px-20 py-10 max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-10 max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

const glassClass =
  'border border-white/10 bg-[rgb(31_18_43_/_0.44)] backdrop-blur-[14px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.11),0_24px_52px_rgb(4_2_8_/_0.33)]'

const easeExpo = [0.16, 1, 0.3, 1] as const

export function ResourcesSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal()
  const { ref: featuredRef, isInView: featuredInView } = useScrollReveal()
  const { ref: listRef, isInView: listInView } = useScrollReveal()
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal()

  return (
    <section className="mx-auto py-10">
      <div className={containerClass}>
        <div className="flex flex-col gap-12 overflow-hidden rounded-xl border border-white/10 bg-transparent p-4 max-[479px]:px-4">
          <motion.div
            ref={headerRef}
            className="flex flex-col items-start justify-center gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">L&apos;écurie</span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              <span className="font-instrument-italic italic text-hpg-orchid">Ressources</span>
            </h2>
          </motion.div>

          <div className="flex gap-6 max-[991px]:flex-col">
            <motion.div
              ref={featuredRef}
              initial={{ opacity: 0, y: 24 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: easeExpo }}
              className="w-1/2 max-[991px]:w-full"
            >
              <Link
                href={featuredArticle.href}
                className={`flex h-full flex-col justify-between gap-8 rounded-xl p-8 transition hover:-translate-y-0.5 hover:border-[#f285f040] ${glassClass}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-instrument-italic text-hpg-orchid">{featuredArticle.category}</div>
                  <div className="text-[0.8rem] font-thin text-hpg-silver">{featuredArticle.date}</div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl leading-[1.2]">{featuredArticle.title}</h3>
                  <p className="text-[0.9rem] font-thin leading-[1.6] text-hpg-silver">{featuredArticle.excerpt}</p>
                </div>

                <div className="text-[0.8rem] uppercase underline decoration-hpg-orchid decoration-[0.005px] underline-offset-[10px]">Lire l&apos;article</div>
              </Link>
            </motion.div>

            <div ref={listRef} className="flex w-1/2 flex-col gap-4 max-[991px]:w-full">
              {articles.map((article, index) => (
                <motion.div
                  key={article.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={listInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: easeExpo, delay: index * 0.1 }}
                >
                  <Link
                    href={article.href}
                    className="flex flex-1 items-center gap-5 rounded-xl border border-transparent p-3 transition hover:-translate-y-0.5 hover:border-[#f285f040] hover:bg-white/[0.02]"
                  >
                    <div className="h-full w-[40%] shrink-0 overflow-hidden rounded-[10px]">
                      <Image src={article.image} alt={article.imageAlt} width={420} height={260} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <div className="flex items-center gap-3 text-[0.8rem] font-thin">
                        <span className="text-hpg-silver">{article.category}</span>
                        <span className="text-white/20">·</span>
                        <span className="text-[#737373]">{article.date}</span>
                      </div>

                      <h3 className="text-[1rem] font-light leading-[1.4]">{article.title}</h3>

                      <div className="text-[0.8rem] uppercase underline decoration-hpg-orchid decoration-[0.005px] underline-offset-[10px]">Lire l&apos;article</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            ref={ctaRef}
            className="flex items-center justify-end pt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <Link
              href="/lecurie/ressources"
              className="inline-flex items-center gap-8 border-b border-hpg-silver pb-0 text-hpg-silver hover:border-white hover:text-white"
            >
              <div>Tout voir</div>
              <ArrowUpRight01Icon size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
