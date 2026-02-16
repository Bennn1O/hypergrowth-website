import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Le piège du micro-management | HyperGrowth',
  description: 'Quand tout repose sur vous : reprendre le lead sans micro-manager.',
}

export default function MicroManagementRessourcePage() {
  return (
    <PageShell
      eyebrow="Ressources"
      title="Le piège du micro-management"
      description="Article en cours de mise en forme finale."
      primaryHref="/lecurie/ressources"
      primaryLabel="Retour aux ressources"
      secondaryHref="/contact"
      secondaryLabel="Échanger avec nous"
    />
  )
}
