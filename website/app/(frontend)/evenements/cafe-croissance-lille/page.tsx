import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Café Croissance Lille | HyperGrowth',
  description: 'Rencontrez des dirigeants lors du Café Croissance à Lille.',
}

export default function CafeCroissanceLillePage() {
  return (
    <PageShell
      eyebrow="Événements"
      title="Café Croissance Lille"
      description="Détails et inscriptions en cours de finalisation."
      primaryHref="/communaute/evenements"
      primaryLabel="Retour aux événements"
      secondaryHref="/contact"
      secondaryLabel="Recevoir les prochaines dates"
    />
  )
}
