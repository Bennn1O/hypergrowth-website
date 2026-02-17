import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Méthode OP-X | HyperGrowth',
  description:
    'Découvrez la méthode OP-X : un accompagnement structuré pour scaler votre entreprise durablement.',
}

export default function MethodeOpXPage() {
  return (
    <PageShell
      eyebrow="Le Concept"
      title="La Méthode OP-X"
      description="La page complète est en cours de réintégration en composants Next."
      primaryHref="/concept/test-de-scalabilite"
      primaryLabel="Faire le test"
      secondaryHref="/concept/case-studies"
      secondaryLabel="Voir les case studies"
    />
  )
}
