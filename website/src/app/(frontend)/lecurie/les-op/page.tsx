import type { Metadata } from 'next'
import { PageShell } from '@/src/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Les OP | HyperGrowth',
  description: 'Rencontrez les Operating Partners de l\'écosystème HyperGrowth.',
}

export default function LesOpPage() {
  return (
    <PageShell
      eyebrow="L'écurie"
      title="Les Operating Partners"
      description="Une équipe d'experts pour structurer votre passage à l'échelle."
      primaryHref="/operating-partners/ulysselsher-operating-partner"
      primaryLabel="Voir un profil"
      secondaryHref="/contact"
      secondaryLabel="Prendre rendez-vous"
    />
  )
}
