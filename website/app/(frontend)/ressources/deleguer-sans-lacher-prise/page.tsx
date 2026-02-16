import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Déléguer sans lâcher prise | HyperGrowth',
  description: 'Comment déléguer efficacement sans perdre le contrôle stratégique.',
}

export default function DeleguerRessourcePage() {
  return (
    <PageShell
      eyebrow="Ressources"
      title="Déléguer sans lâcher prise"
      description="Article en cours de mise en forme finale."
      primaryHref="/lecurie/ressources"
      primaryLabel="Retour aux ressources"
      secondaryHref="/contact"
      secondaryLabel="Échanger avec nous"
    />
  )
}
