'use client'

import Link from 'next/link'
import { NotFoundSection } from './components/not-found-section'
import { SplineCanvas } from './components/spline-viewer'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-hpg-night">
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-instrument text-sm font-400"
            aria-label="HyperGrowth home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded bg-hpg-violet">
              <span className="font-bold text-white">H</span>
            </div>
            <span className="hidden text-white sm:inline">HyperGrowth</span>
          </Link>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center pt-20 md:pt-24">
        <NotFoundSection
          title="Page introuvable"
          description="Cette page n'existe pas (ou plus). Mais pas de panique : découvrez comment structurer votre croissance avec HyperGrowth."
          customVisual={
            <SplineCanvas splineUrl="https://prod.spline.design/LPJMuZUqQ2mfwrP5/scene.splinecode" />
          }
          showHelp={true}
        />
      </main>

      <div className="border-t border-[#414141]/50 bg-gradient-to-r from-[#803fab]/5 via-transparent to-[#f285f0]/5 px-4 py-8 text-center md:px-8">
        <p className="text-sm font-300 text-hpg-silver">
          © 2026 HyperGrowth. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
