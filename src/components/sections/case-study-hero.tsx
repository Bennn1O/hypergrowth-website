import { ArrowRight01Icon } from 'hugeicons-react'

interface CaseStudyHeroProps {
  badge: string
  title: string
  description: string
  metrics: Array<{
    value: string
    label: string
  }>
  cta?: {
    label: string
    onClick?: () => void
  }
}

export function CaseStudyHero({
  badge,
  title,
  description,
  metrics,
  cta,
}: CaseStudyHeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-950/50 to-zinc-950 py-24 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-8 md:w-1/2">
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit rounded-full border border-zinc-700 px-4 py-2 text-sm uppercase tracking-wide text-zinc-400">
                {badge}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">{title}</h1>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-zinc-300 max-w-lg">
              {description}
            </p>

            {cta && (
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={cta.onClick}
                  className="group inline-flex items-center gap-3 rounded-lg bg-violet-700 px-6 py-3 font-medium transition-all hover:bg-zinc-900 hover:text-fuchsia-400"
                >
                  {cta.label} <ArrowRight01Icon size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Right Content - Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:w-1/2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="rounded-lg border border-zinc-800 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-4xl font-bold mb-2">{metric.value}</p>
                <p className="text-sm text-zinc-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
