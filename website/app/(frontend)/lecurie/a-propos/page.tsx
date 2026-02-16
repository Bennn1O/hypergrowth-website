import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'À propos | HyperGrowth',
  description: 'L\'histoire et la vision derrière HyperGrowth et le concept OP-X.',
}

export default function AProposPage() {
  return (
    <PageShell
      eyebrow="L'écurie"
      title="À propos"
      description="Découvrez l'histoire et la vision d'HyperGrowth."
      primaryHref="/lecurie/les-op"
      primaryLabel="Voir l'équipe"
      secondaryHref="/contact"
      secondaryLabel="Nous contacter"
    />
  )
}
