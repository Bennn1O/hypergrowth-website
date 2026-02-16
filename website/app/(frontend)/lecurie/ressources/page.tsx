import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Ressources | HyperGrowth',
  description: 'Ressources, articles et contenus pour dirigeants en croissance.',
}

export default function EcurieRessourcesPage() {
  return (
    <PageShell
      eyebrow="L'écurie"
      title="Ressources"
      description="Articles et insights pour accélérer votre scalabilité."
      primaryHref="/ressources/deleguer-sans-lacher-prise"
      primaryLabel="Lire un article"
      secondaryHref="/contact"
      secondaryLabel="Échanger avec un OP"
    />
  )
}
