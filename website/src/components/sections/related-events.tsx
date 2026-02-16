'use client';

import Link from 'next/link';
import { ArrowRight01Icon } from 'hugeicons-react';

interface RelatedEventsProps {
  currentEventId: string;
}

const ALL_EVENTS = [
  {
    id: 'cafe-croissance-lille',
    title: 'Café Croissance Lille',
    category: 'Café Croissance',
    date: 'December 17, 2025',
    location: 'Lille',
    country: 'FRANCE',
    status: 'upcoming' as const,
    description:
      'Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés.',
  },
  {
    id: 'mastermind-srilanka',
    title: 'Mastermind Sri Lanka',
    category: 'Mastermind',
    date: 'November 29, 2025 - December 7, 2025',
    location: 'Weligama',
    country: 'SRI LANKA',
    status: 'past' as const,
    description:
      'De 4 à 10 jours dans un lieu privé à l\'étranger avec activités, ateliers et networking.',
  },
  {
    id: 'diner-hyperclub',
    title: 'Dîners HyperClub',
    category: 'Dîners HyperClub',
    date: 'À définir',
    location: 'Lyon',
    country: 'FRANCE',
    status: 'upcoming' as const,
    description:
      'Un dîner d\'exception avec 6 à 8 entrepreneurs et dirigeants confirmés pour créer des synergies.',
  },
];

export default function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  const eventTypes = [
    {
      title: 'Café Croissance',
      status: 'OUVERT AU PUBLIC',
      description:
        'Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et un plan d\'action structuré.',
    },
    {
      title: 'Mastermind',
      status: 'SUR CANDIDATURE',
      description:
        'De 4 à 10 jours dans un lieu privé à l\'étranger. Activités, ateliers, échanges et networking. Vous créez un réseau solide et vivez une expérience unique avec d\'autres dirigeants.',
    },
    {
      title: 'Dîners HyperClub',
      status: 'RÉSERVÉ AUX MEMBRES',
      description:
        'Un dîner d\'exception avec 6 à 8 entrepreneurs et dirigeants confirmés. Un moment exclusif pour échanger, créer des synergies et tisser des relations fortes autour d\'une belle table.',
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase text-blue-600">
            Communauté
          </p>
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Évènements et lives
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700">
            Chaque année, dans le cadre de l'HyperClub, nous organisons plusieurs
            évènements à destination d'entrepreneurs et de dirigeants afin
            d'explorer ensemble des problématiques business et de créer un réseau
            solide.
          </p>
        </div>

        {/* Event Types Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {eventTypes.map((eventType) => (
            <div
              key={eventType.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8"
            >
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {eventType.title}
              </h3>
              <p className="mb-4 text-xs font-semibold uppercase text-blue-600">
                {eventType.status}
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {eventType.description}
              </p>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="flex items-center justify-center">
          <Link
            href="/communaute/evenements"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <span className="uppercase text-sm">Voir tous les évènements</span>
            <ArrowRight01Icon size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
