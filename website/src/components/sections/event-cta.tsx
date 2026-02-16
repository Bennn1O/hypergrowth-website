'use client';

import Link from 'next/link';
import { ArrowRight01Icon } from 'hugeicons-react';

interface EventCTAProps {
  title: string;
  date: string;
}

export default function EventCTA({ title, date }: EventCTAProps) {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-white p-8 sm:flex-row sm:items-center lg:p-12">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{date}</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <span className="uppercase">Nous contacter</span>
              <ArrowRight01Icon size={18} />
            </Link>

            <Link
              href="/#inscription"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              <span className="uppercase">S'inscrire</span>
              <ArrowRight01Icon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
