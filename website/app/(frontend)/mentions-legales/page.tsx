import type { Metadata } from 'next'
import { PageShell } from '@/app/(frontend)/components/page-shell'

export const metadata: Metadata = {
  title: 'Mentions Légales du site HyperGrowth',
  description:
    'Consultez les mentions légales d\'HyperGrowth : informations légales, éditeur, politiques de cookies, hébergeur et conditions d\'utilisation du site.',
}

export default function MentionsLegalesPage() {
  return (
    <PageShell
      eyebrow="Légal"
      title="Mentions Légales"
      description="Les mentions légales complètes sont en cours d'alignement final. Le routage et le SEO sont déjà en place."
      primaryHref="/contact"
      primaryLabel="Nous contacter"
    />
  )
}
