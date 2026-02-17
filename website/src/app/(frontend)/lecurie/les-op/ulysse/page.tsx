import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Ulysse L. Sher – OP HyperGrowth',
  description:
    "Ulysse L. Sher accompagne les dirigeants ambitieux dans leur structuration et leur croissance.",
  openGraph: {
    title: 'Ulysse L. Sher – OP HyperGrowth',
    description:
      "Ulysse L. Sher accompagne les dirigeants ambitieux dans leur structuration et leur croissance.",
    images: ['/images/691a9c6ffd17d3b642956b6f_Profil.avif'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulysse L. Sher – OP HyperGrowth',
    description:
      "Ulysse L. Sher accompagne les dirigeants ambitieux dans leur structuration et leur croissance.",
    images: ['/images/691a9c6ffd17d3b642956b6f_Profil.avif'],
  },
}

export default function UlysseLegacyPage() {
  permanentRedirect('/operating-partners/ulysselsher-operating-partner')
}
