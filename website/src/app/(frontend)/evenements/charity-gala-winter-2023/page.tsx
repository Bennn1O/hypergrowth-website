import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Charity Gala Winter 2023 | HyperGrowth',
  description: 'Retour sur le Charity Gala Winter 2023 de la communauté HyperGrowth.',
}

export default function CharityGalaWinterPage() {
  return (
    <PageShell
      eyebrow="Événements"
      title="Charity Gala Winter 2023"
      description="Le détail complet de l'événement est en cours de finalisation."
      primaryHref="/communaute/evenements"
      primaryLabel="Retour aux événements"
      secondaryHref="/contact"
      secondaryLabel="Demander des infos"
    />
  )
}
