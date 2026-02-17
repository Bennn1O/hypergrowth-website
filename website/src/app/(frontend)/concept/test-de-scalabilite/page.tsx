import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Test de Scalabilité | HyperGrowth',
  description:
    'Mesurez votre maturité de passage à l\'échelle et identifiez vos priorités d\'action.',
}

export default function TestScalabilitePage() {
  return (
    <PageShell
      eyebrow="Le Concept"
      title="Test de Scalabilité"
      description="Le test est en cours d'intégration finale."
      primaryHref="/contact"
      primaryLabel="Parler à un OP"
      secondaryHref="/concept/methode-op-x"
      secondaryLabel="Découvrir la méthode"
    />
  )
}
