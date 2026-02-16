import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Événements | HyperGrowth',
  description: 'Découvrez les événements HyperGrowth : cafés croissance, masterminds et rencontres privées.',
}

export default function CommunauteEvenementsPage() {
  return (
    <PageShell
      eyebrow="Communauté"
      title="Événements"
      description="Retrouve nos événements à venir et passés."
      primaryHref="/evenements/cafe-croissance-lille"
      primaryLabel="Café Croissance Lille"
      secondaryHref="/evenements/mastermind-srilanka"
      secondaryLabel="Mastermind Sri Lanka"
    />
  )
}
