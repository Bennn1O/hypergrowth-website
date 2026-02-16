'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from './navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)')
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange)
    }
  }, [])

  return (
    <header className="sticky inset-x-0 top-[20px] z-50 bg-transparent">
      <div
        className={`mx-auto md:max-w-[80vw] rounded-[12px] border border-[#975fbd80] bg-[radial-gradient(circle_at_80%_50%,#f285f05e,#803fab57_25%,#180a22bf_67%)] px-16 py-2 backdrop-blur-[14px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08),0_18px_34px_-8px_rgb(0_0_0_/_0.45)] max-[991px]:w-[95%] max-[991px]:min-w-0 max-[991px]:max-w-none max-[991px]:rounded-[16px] max-[991px]:border-[#d697f583] max-[991px]:bg-[radial-gradient(circle_at_85%_15%,#f7b2f566,#803fab8a_42%,#12071cf2_84%)] max-[991px]:px-3 max-[991px]:py-2 max-[991px]:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.16),0_20px_38px_-20px_rgb(0_0_0_/_0.88)] max-[479px]:max-w-[95%] max-[479px]:pr-3 ${
          isMenuOpen
            ? 'max-[991px]:border-[#f1b2f7a8] max-[991px]:bg-[linear-gradient(160deg,#341d4b_0%,#20112f_50%,#130a21_100%)] max-[991px]:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_24px_38px_-18px_rgb(0_0_0_/_0.95)]'
            : ''
        }`}
      >
        <nav className="relative flex min-h-[4.2rem] items-center justify-between max-[991px]:min-h-[3.5rem]">
          <Link href="/" className="w-nav-brand inline-flex items-center" aria-label="HyperGrowth">
            <Image
              src="/images/68de97d1aee597e626dbfbc5_HPG_brand-elements_3D.avif"
              alt="HyperGrowth"
              width={80}
              height={80}
              priority
              className="h-auto w-[78px] max-[991px]:w-[60px]"
            />
          </Link>

          <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`hidden items-center justify-center rounded-[12px] border border-[#ffffff2e] bg-[linear-gradient(145deg,#ffffff1e,#ffffff08)] p-2.5 text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.22),0_10px_20px_rgb(2_0_4_/_0.35)] backdrop-blur-[8px] transition-all duration-200 max-[991px]:inline-flex ${
              isMenuOpen
                ? 'translate-y-[1px] border-[#f2a8f0bf] bg-[linear-gradient(145deg,#f285f05e,#7f43ad57)]'
                : 'hover:border-white/40 hover:bg-white/[0.16]'
            }`}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
