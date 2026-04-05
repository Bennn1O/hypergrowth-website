interface CaseStudySectionProps {
  title: string
  description?: string
  variant?: 'light' | 'dark' | 'gradient'
  children: React.ReactNode
}

const variantStyles = {
  light:
    'relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-violet-900/5',
  dark: 'relative overflow-hidden bg-zinc-950',
  gradient:
    'relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-violet-700/80',
}

export function CaseStudySection({
  title,
  description,
  variant = 'light',
  children,
}: CaseStudySectionProps) {
  return (
    <section className={`${variantStyles[variant]} py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-6 text-4xl md:text-5xl font-bold">{title}</h2>
          {description && (
            <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}
