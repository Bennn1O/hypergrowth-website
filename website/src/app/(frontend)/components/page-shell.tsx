import Link from 'next/link'

interface PageShellProps {
  eyebrow: string
  title: string
  description: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

const darkSectionClass =
  "relative overflow-hidden bg-[linear-gradient(180deg,rgb(24_10_34_/_0.98),rgb(24_10_34_/_0.86)_40%,rgb(24_10_34_/_0.96)),radial-gradient(circle_farthest-corner_at_18%_14%,rgb(242_133_240_/_0.2),transparent_45%),radial-gradient(circle_farthest-corner_at_86%_82%,rgb(128_63_171_/_0.27),transparent_48%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.06),transparent_32%)] before:content-['']"

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-[#b36fd8] bg-[#7b3da9] px-8 py-4 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_28px_rgb(14_3_21_/_0.45)] transition-all duration-200 hover:-translate-y-px hover:border-[#d19bee] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25),0_18px_34px_rgb(14_3_21_/_0.55)]'

export function PageShell({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageShellProps) {
  return (
    <div className="pt-20">
      <section className={`${darkSectionClass} py-32`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <p className="mb-6 text-sm font-semibold text-purple-400">{eyebrow}</p>
          <h1 className="mb-8 text-5xl font-bold md:text-7xl">{title}</h1>
          <p className="max-w-3xl text-xl text-white/70">{description}</p>

          {(primaryHref || secondaryHref) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryHref && primaryLabel && (
                <Link
                  href={primaryHref}
                  className={primaryButtonClass}
                >
                  {primaryLabel}
                </Link>
              )}

              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white/90 transition-colors hover:bg-white/5"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
