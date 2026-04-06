import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/layout/cookie-banner'
import { LenisProvider } from '@/providers/lenis-provider'

const archivo = localFont({
  src: '../../../public/fonts/archivo-variable.woff2',
  variable: '--archivo',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
})

const archivoItalic = localFont({
  src: '../../../public/fonts/archivo-italic-variable.woff2',
  variable: '--archivo-italic',
  weight: '100 900',
  style: 'italic',
  display: 'swap',
})

const instrument = localFont({
  src: '../../../public/fonts/instrument-serif-regular.woff2',
  variable: '--instrument',
  weight: '400',
  style: 'normal',
  display: 'swap',
})

const instrumentItalic = localFont({
  src: '../../../public/fonts/instrument-serif-italic.woff2',
  variable: '--instrument-italic',
  weight: '400',
  style: 'italic',
  display: 'swap',
})

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
    <html lang="fr-FR" className={`${archivo.variable} ${archivoItalic.variable} ${instrument.variable} ${instrumentItalic.variable}`}>
      <head>
        <link rel="icon" href="/images/68df88f2746392ab1ec9141b_HPG_website_fav-icon.png" />
        <link rel="apple-touch-icon" href="/images/68df88f650217f54f596a7c6_HPG_website_webclip.png" />
        <link
          rel="preload"
          as="image"
          href="/images/hpg-brand-trait-16-9.avif"
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href="/images/68f5e45298cd778cac552b86_HPG_website_gradient-2.avif"
          type="image/avif"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-hpg-night text-white antialiased">
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/hpg-brand-trait-16-9.avif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <LenisProvider>
          <div className="relative isolate z-10 -mt-[100px] max-[991px]:-mt-[84px] max-[767px]:-mt-[70px]">
            <Header />
            {children}
            <Footer />
          </div>
        </LenisProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
