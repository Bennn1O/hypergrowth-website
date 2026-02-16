import Link from 'next/link'
import type { Event } from '@/data/events'

interface EventCardProps {
  event: Event
  variant?: 'grid' | 'list'
}

const statusColors = {
  open: { bg: 'bg-primary-purple', text: 'text-white' },
  candidature: { bg: 'bg-accent-pink', text: 'text-white' },
  members: { bg: 'bg-primary-purple-light', text: 'text-white' },
  past: { bg: 'bg-white/10', text: 'text-white/70' },
}

export function EventCard({ event, variant = 'grid' }: EventCardProps) {
  const statusColor = statusColors[event.status]

  if (variant === 'list') {
    return (
      <Link href={event.href}>
        <div className="group glassmorphism rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold group-hover:text-primary-purple-light transition-colors">
                {event.title}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                {event.date}
                {event.dateEnd && ` - ${event.dateEnd}`}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColor.bg} ${statusColor.text}`}>
              {event.status === 'open' && 'Ouvert'}
              {event.status === 'candidature' && 'Candidature'}
              {event.status === 'members' && 'Membres'}
              {event.status === 'past' && 'Passé'}
            </div>
          </div>
          <p className="text-white/70 text-sm mb-3">{event.description}</p>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>{event.location}</span>
            <span className="text-white/30">•</span>
            <span>{event.country}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={event.href}>
      <div className="group glassmorphism rounded-2xl p-8 hover:bg-white/5 transition-colors cursor-pointer h-full flex flex-col">
        <div className="mb-4">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text} mb-3`}>
            {event.category}
          </div>
          <h3 className="text-2xl font-bold group-hover:text-primary-purple-light transition-colors">
            {event.title}
          </h3>
        </div>

        <p className="text-white/70 text-sm mb-4 flex-grow">{event.description}</p>

        <div className="space-y-2 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white/80">{event.date}</span>
            {event.dateEnd && <span>- {event.dateEnd}</span>}
          </div>
          <div className="flex items-center gap-2">
            <span>{event.location}</span>
            <span className="text-white/30">•</span>
            <span>{event.country}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
