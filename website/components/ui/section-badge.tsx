import { StarsIcon } from 'hugeicons-react'

interface SectionBadgeProps {
  label: string
  className?: string
}

export function SectionBadge({ label, className = '' }: SectionBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 ${className}`}>
      <StarsIcon size={16} className="text-purple-400" />
      <span className="text-sm font-semibold text-gray-300">{label}</span>
    </div>
  )
}
