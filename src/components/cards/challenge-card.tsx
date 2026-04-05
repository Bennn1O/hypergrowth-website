interface ChallengeCardProps {
  title: string
  description: string
  variant?: 'default' | 'highlighted'
}

export function ChallengeCard({
  title,
  description,
  variant = 'default',
}: ChallengeCardProps) {
  const baseStyles =
    'rounded-lg border bg-gradient-to-br backdrop-blur p-8 transition-all'

  const variants = {
    default:
      'border-zinc-800 from-white/5 to-white/0 hover:border-violet-600/50 hover:bg-white/10',
    highlighted:
      'border-violet-600/50 from-white/10 to-white/5 hover:from-white/15 hover:to-white/10',
  }

  return (
    <div className={`${baseStyles} ${variants[variant]}`}>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  )
}
