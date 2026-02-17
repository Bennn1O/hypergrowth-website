import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Manon Werquin – OP HyperGrowth',
  description:
    "Manon Werquin accompagne les dirigeants ambitieux dans leur structuration et leur croissance.",
  openGraph: {
    title: 'Manon Werquin – OP HyperGrowth',
    description:
      "Manon Werquin accompagne les dirigeants ambitieux dans leur structuration et leur croissance.",
    images: ['/images/691d6cf72d819a8d8fb58687_manon-werquin.avif'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manon Werquin – OP HyperGrowth',
    description:
      "Manon Werquin accompagne les dirigeants ambitieux dans leur structuration et leur croissance.",
    images: ['/images/691d6cf72d819a8d8fb58687_manon-werquin.avif'],
  },
}

export default function MarionWerquinLegacyPage() {
  permanentRedirect('/operating-partners/manon-werquin-operating-partner')
}
