import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'VSL | HyperGrowth',
  description:
    "Présentation vidéo du concept OP-X et de l'approche HyperGrowth pour structurer une croissance durable.",
}

export default function VslPage() {
  return (
    <PageShell
      eyebrow="Le Concept"
      title="VSL HyperGrowth"
      description="La VSL est en cours de migration."
      primaryHref="/concept/methode-op-x"
      primaryLabel="Découvrir la méthode"
      secondaryHref="/concept/case-studies"
      secondaryLabel="Voir les case studies"
    />
  )
}
