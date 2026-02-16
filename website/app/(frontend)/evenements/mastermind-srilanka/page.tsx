import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Mastermind Sri Lanka | HyperGrowth',
  description: 'Événement mastermind HyperGrowth au Sri Lanka.',
}

export default function MastermindSriLankaPage() {
  return (
    <PageShell
      eyebrow="Événements"
      title="Mastermind Sri Lanka"
      description="Le détail complet de l'événement est en cours de finalisation."
      primaryHref="/communaute/evenements"
      primaryLabel="Retour aux événements"
      secondaryHref="/contact"
      secondaryLabel="Demander des infos"
    />
  )
}
