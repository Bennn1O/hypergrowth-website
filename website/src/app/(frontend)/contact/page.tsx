import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Contact | HyperGrowth',
  description:
    "Parlons de votre phase de scaling. Décrivez votre contexte et découvrez comment l'écurie HyperGrowth peut vous accompagner.",
}

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Parlons de votre croissance"
      description="Cette page est en cours de migration depuis Webflow. En attendant, vous pouvez lancer votre diagnostic et revenir vers nous avec vos premiers résultats."
      primaryHref="/concept/test-de-scalabilite"
      primaryLabel="Faire le test de scalabilité"
      secondaryHref="/lecurie/les-op"
      secondaryLabel="Voir l'équipe"
    />
  )
}
