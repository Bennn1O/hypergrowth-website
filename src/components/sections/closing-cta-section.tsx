'use client'

import Link from 'next/link'
import { ArrowUpRight01Icon } from 'hugeicons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function ClosingCtaSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="relative overflow-hidden py-[clamp(4rem,8vw,7rem)]">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #f285f0, transparent 70%)' }}
      />

      <div className="mx-auto max-w-[var(--width-container)] px-20 max-[991px]:px-10 max-[767px]:px-6 max-[479px]:px-4">
        <div className="flex flex-col items-center gap-8 text-center">

          <p
            className={`reveal${isInView ? ' in-view' : ''} text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40`}
          >
            Prochaine étape
          </p>

          <h2
            className={`reveal${isInView ? ' in-view' : ''} mx-auto max-w-[18ch] text-[clamp(2.4rem,5.5vw,4rem)] font-bold leading-[1.06] tracking-[-0.025em]`}
            style={{ '--d': '0.08s' } as React.CSSProperties}
          >
            Votre organisation peut tenir{' '}
            <span className="font-instrument-italic italic text-hpg-orchid">sans nous.</span>
          </h2>

          <p
            className={`reveal${isInView ? ' in-view' : ''} mx-auto max-w-[48ch] text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.7] text-hpg-silver/80`}
            style={{ '--d': '0.16s' } as React.CSSProperties}
          >
            C&apos;est l&apos;objectif. On entre, on structure, on scale, on sort. Un appel pour voir si le contexte s&apos;y prête.
          </p>

          <div
            className={`reveal${isInView ? ' in-view' : ''}`}
            style={{ '--d': '0.24s' } as React.CSSProperties}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-xl border border-hpg-violet-border bg-hpg-violet px-8 py-4 text-[0.95rem] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid"
            >
              Réserver un appel
              <ArrowUpRight01Icon size={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
