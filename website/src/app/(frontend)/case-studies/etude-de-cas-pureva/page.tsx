import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Étude de Cas Pureva | HyperGrowth',
  description: 'Comment Pureva a structuré sa croissance avec l\'approche HyperGrowth.',
}

export default function PurevaCaseStudyPage() {
  return (
    <PageShell
      eyebrow="Case Studies"
      title="Étude de cas Pureva"
      description="Le case study complet est en cours de mise à jour."
      primaryHref="/concept/case-studies"
      primaryLabel="Retour aux case studies"
      secondaryHref="/contact"
      secondaryLabel="Parler à un OP"
    />
  )
}
