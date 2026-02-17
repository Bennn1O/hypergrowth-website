import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Scaling stratégique et conseil pour dirigeants ambitieux | HyperGrowth',
  description: "Accélérez la croissance de votre entreprise avec un Operating Partner dédié. Structuration, méthodologie OP-X, réseau d'élite – entrez dans l'écurie HyperGrowth.",
  keywords: ['scaling', 'hypercroissance', 'operating partner', 'conseil stratégique', 'dirigeants'],
  openGraph: {
    title: 'Scaling stratégique et conseil pour dirigeants ambitieux | HyperGrowth',
    description: "Accélérez la croissance de votre entreprise avec un Operating Partner dédié.",
    images: ['/images/68df88f9c3bc25774b700adf_1cbfc1f48d56e188805ab8fc77bb484c_HPG_website_open-graph.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scaling stratégique et conseil pour dirigeants ambitieux | HyperGrowth',
    description: "Accélérez la croissance de votre entreprise avec un Operating Partner dédié.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr-FR">
      <head>
        <link rel="icon" href="/images/68df88f2746392ab1ec9141b_HPG_website_fav-icon.png" />
        <link rel="apple-touch-icon" href="/images/68df88f650217f54f596a7c6_HPG_website_webclip.png" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-[#180a22] text-white antialiased">
        <div className="-mt-[100px] max-[991px]:-mt-[84px] max-[767px]:-mt-[70px]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
