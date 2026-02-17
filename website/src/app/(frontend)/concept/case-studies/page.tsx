import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Case Studies | HyperGrowth',
  description:
    'Découvrez comment HyperGrowth accompagne la structuration et le passage à l\'échelle.',
}

export default function ConceptCaseStudiesPage() {
  return (
    <PageShell
      eyebrow="Le Concept"
      title="Case Studies"
      description="Explore nos études de cas et les transformations obtenues chez nos clients."
      primaryHref="/case-studies/etude-de-cas-pureva"
      primaryLabel="Étude de cas Pureva"
      secondaryHref="/concept/methode-op-x"
      secondaryLabel="Voir la méthode OP-X"
    />
  )
}
