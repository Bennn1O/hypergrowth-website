import Link from 'next/link'
import { eventTypes } from '@/data/events'

export function EventTypesSection() {
  return (
    <section className="py-32 bg-[#0f0a1f]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold mb-12">Types d'événements HyperGrowth</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {eventTypes.map((event) => (
            <div key={event.title} className="glassmorphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
              <p className="text-xs font-semibold text-primary-purple-light mb-4 uppercase">
                {event.status}
              </p>
              <p className="text-white/70">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
