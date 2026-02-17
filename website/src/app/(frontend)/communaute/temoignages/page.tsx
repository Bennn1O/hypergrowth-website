import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Témoignages | HyperGrowth',
  description: 'Retours d\'expérience de dirigeants accompagnés par HyperGrowth.',
}

export default function CommunauteTemoignagesPage() {
  return (
    <PageShell
      eyebrow="Communauté"
      title="Témoignages"
      description="Ce que disent les dirigeants accompagnés par HyperGrowth."
      primaryHref="/temoignages/marion-carneiro"
      primaryLabel="Voir un témoignage"
      secondaryHref="/contact"
      secondaryLabel="Parler à l'équipe"
    />
  )
}
