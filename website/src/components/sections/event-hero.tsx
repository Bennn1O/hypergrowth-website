'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface EventHeroProps {
  event: {
    title: string;
    category: string;
    categoryDescription: string;
    location: string;
    country: string;
    startFormatted: string;
    endFormatted: string;
    status: 'past' | 'upcoming';
    description: string;
  };
}

export default function EventHero({ event }: EventHeroProps) {
  const isPast = event.status === 'past';

  return (
    <section className="border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Left Column */}
          <div>
            {/* Category Info */}
            <div className="mb-12 rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {event.category}
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
                {event.categoryDescription}
              </p>
            </div>

            {/* Status & Category Tags */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
                {event.category}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${
                  isPast
                    ? 'bg-gray-200 text-gray-900'
                    : 'bg-purple-100 text-purple-900'
                }`}
              >
                {isPast ? 'Évènement passé' : 'Prochain évènement'}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-8 text-5xl font-bold text-gray-900 lg:text-6xl">
              {event.title}
            </h1>

            {/* Date & Location */}
            <div className="mb-8 flex flex-col gap-4 text-lg text-gray-700 sm:flex-row">
              <div className="flex items-center gap-2">
                <span>Du</span>
                <span className="font-semibold">{event.startFormatted}</span>
                <span>au</span>
                <span className="font-semibold">{event.endFormatted}</span>
              </div>
              <span className="hidden text-gray-400 sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{event.location}</span>
                <span className="text-gray-500">{event.country}</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <p className="text-base leading-relaxed text-gray-700">
                {event.description}
              </p>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900">
                Sur inscription
              </div>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <span className="uppercase">Nous contacter</span>
                </Link>

                <Link
                  href="/#inscription"
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  <span className="uppercase">S'inscrire à l'évènement</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
