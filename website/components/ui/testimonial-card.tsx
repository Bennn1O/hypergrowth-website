'use client'

import Image from 'next/image'
import Link from 'next/link'

interface TestimonialCardProps {
  testimonial: {
    id: string
    quote: string[]
    name: string
    role: string
    company: string
    companyUrl: string
    image: string
    linkedinUrl: string
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 hover:border-white/20 transition-colors duration-300">
      {/* Quote Icon */}
      <div className="mb-6 flex-shrink-0">
        <svg
          className="h-10 w-10 text-white/30"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5C17.92 2.697 16 8.746 16 10c0 1-3.278 1-4 3s2.468 7.4 7 7.4c.993 0 1.906-.1 2.743-.26-1.887 3.374-4.744 5.86-9.743 5.86C2 20 3 21 3 21z" />
        </svg>
      </div>

      {/* Quote Text */}
      <div className="mb-8 space-y-4">
        {testimonial.quote.map((paragraph, idx) => (
          <p key={idx} className="text-base md:text-lg leading-relaxed text-white/90">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div className="mb-6 h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10" />

      {/* Author Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative h-14 w-14 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-white/10">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          {/* Name & Role */}
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm md:text-base truncate">
              {testimonial.name}
            </p>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-white/60">
              <span>{testimonial.role}</span>
              <span>@</span>
              <Link
                href={testimonial.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/100 transition-colors underline decoration-white/20 hover:decoration-white/40"
              >
                {testimonial.company}
              </Link>
            </div>
          </div>
        </div>

        {/* LinkedIn Link */}
        <Link
          href={testimonial.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn profile of ${testimonial.name}`}
          className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Image
            src="/images/icon-linkedin.svg"
            alt=""
            width={20}
            height={20}
            className="opacity-60 hover:opacity-100 transition-opacity"
          />
        </Link>
      </div>
    </article>
  )
}
