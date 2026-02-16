import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pureva : Structurer une startup en hypercroissance | HyperGrowth',
  description: 'Comment structurer une startup en hypercroissance sans en brider la dynamique ? Une étude de cas réalisée par les Operating Partner HyperGrowth.',
  openGraph: {
    title: 'Pureva : Structurer une startup en hypercroissance | HyperGrowth',
    description: 'Découvrez comment nous avons structuré Pureva pour supporter une croissance 10x tout en préservant son ADN entrepreneurial.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pureva : Cas d\'étude HyperGrowth',
    description: 'Structuration d\'une startup en hypercroissance sans brider sa dynamique.',
  },
}

export default function PurevaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
