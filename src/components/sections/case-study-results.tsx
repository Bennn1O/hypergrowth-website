interface Result {
  metric: string
  label: string
}

interface CaseStudyResultsProps {
  title: string
  results: Result[]
  variant?: 'light' | 'dark' | 'gradient'
}

const variantStyles = {
  light:
    'relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-violet-900/5',
  dark: 'relative overflow-hidden bg-zinc-950',
  gradient:
    'relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-violet-700/80',
}

export function CaseStudyResults({
  title,
  results,
  variant = 'gradient',
}: CaseStudyResultsProps) {
  return (
    <section className={`${variantStyles[variant]} py-20 md:py-28`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-transparent"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <h2 className="mb-12 text-4xl md:text-5xl font-bold">{title}</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {results.map((result, index) => (
            <div
              key={index}
              className={`rounded-lg border px-8 py-12 text-center backdrop-blur transition-all ${
                variant === 'gradient'
                  ? 'border-white/20 bg-white/10 hover:bg-white/15'
                  : 'border-zinc-800 bg-white/5 hover:border-violet-600/50 hover:bg-white/10'
              }`}
            >
              <p className={`mb-4 text-5xl font-bold ${variant === 'gradient' ? 'text-white' : ''}`}>
                {result.metric}
              </p>
              <p className={`text-lg ${variant === 'gradient' ? 'text-white/80' : 'text-zinc-300'}`}>
                {result.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
