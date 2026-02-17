import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'HyperClub | HyperGrowth',
  description: 'Le cercle de dirigeants en hypercroissance de la communauté HyperGrowth.',
}

export default function HyperclubPage() {
  return (
    <PageShell
      eyebrow="Communauté"
      title="HyperClub"
      description="Masterminds, rencontres et impulsion collective pour dirigeants ambitieux."
      primaryHref="/contact"
      primaryLabel="Candidater"
      secondaryHref="/communaute/evenements"
      secondaryLabel="Voir les événements"
    />
  )
}
