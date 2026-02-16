import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cas d\'études | HyperGrowth',
  description: 'Découvrez comment nos Operating Partner aident les entreprises en hypercroissance à structurer leur développement.',
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
