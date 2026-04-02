'use client'

import { motion } from 'motion/react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function StatementSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="relative overflow-hidden py-[clamp(1rem,2vw,1.8rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.09] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #803fab, transparent 70%)' }}
      />
      <div className="mx-auto max-w-[var(--width-container)] px-20 max-[991px]:px-10 max-[767px]:px-6 max-[479px]:px-4">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[22ch] text-center text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.02em] max-[767px]:max-w-[20ch]"
        >
          On ne scale pas un chaos élégant.{' '}
          <span className="font-instrument-italic italic text-hpg-orchid">On le structure d&apos;abord.</span>
        </motion.p>
      </div>
    </section>
  )
}
