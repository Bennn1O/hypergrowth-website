'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavigationProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  {
    title: 'Le Concept',
    items: [
      { label: 'La Méthode OP-X', href: '/concept/methode-op-x' },
      { label: 'Case Studies', href: '/concept/case-studies' },
      { label: 'Test de scalabilité', href: '/concept/test-de-scalabilite' },
    ],
  },
  {
    title: 'Communauté',
    items: [
      { label: 'Évènements', href: '/communaute/evenements' },
      { label: 'HyperClub', href: '/communaute/hyperclub' },
      { label: 'Témoignages', href: '/communaute/temoignages' },
    ],
  },
  {
    title: "L'écurie",
    items: [
      { label: 'À Propos', href: '/lecurie/a-propos' },
      { label: "L'Équipe", href: '/lecurie/les-op' },
      { label: 'Ressources', href: '/lecurie/ressources' },
    ],
  },
]

const arrowIcon = '/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg'

export function Navigation({ isOpen, onClose }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <>
      <nav className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center gap-3 max-[991px]:hidden">
        {navItems.map((section) => {
          const isCurrentOpen = openDropdown === section.title

          return (
            <div
              key={section.title}
              className="relative"
              onMouseEnter={() => setOpenDropdown(section.title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[10px] border border-transparent px-[1.2rem] py-[0.8rem] text-white transition-colors hover:bg-white/5"
              >
                <span className="text-[1rem] font-light leading-[1.3] text-white">{section.title}</span>
              </button>

              {isCurrentOpen && (
                <div className="absolute left-0 top-full z-40 w-[400px] pt-2">
                  <div className="rounded-[12px] border border-white/10 bg-[#1e0e2e] p-4 shadow-[0_22px_40px_rgb(2_0_5_/_0.5)]">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-[12px] border border-transparent px-4 py-3 text-[1rem] font-light leading-[1.3] text-white transition-colors hover:border-[#f285f054] hover:bg-white/[0.04] hover:text-[#f285f0]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <Link
        href="/concept/test-de-scalabilite"
        className="inline-flex items-center gap-2.5 rounded-[10px] border border-[#be7be4] bg-[linear-gradient(145deg,#9e55cb,#6f369f)] px-5 py-[0.65rem] text-[0.88rem] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_10px_22px_rgb(14_3_21_/_0.35)] group transition-all hover:-translate-y-0.5 hover:border-[#f285f0] hover:bg-none hover:bg-[#1a0d28] hover:text-[#f285f0] max-[991px]:hidden"
      >
        <span>Testez votre scalabilité</span>
        <Image src={arrowIcon} alt="" width={16} height={16} className="transition-transform duration-200 group-hover:-rotate-45" />
      </Link>

      <div
        id="mobile-navigation"
        className={`absolute -left-3 -right-3 top-[calc(100%+1rem)] z-40 mt-0 hidden flex-col items-stretch rounded-[18px] border border-[#d8a7f35c] bg-[linear-gradient(160deg,#311749_0%,#221236_52%,#140a24_100%)] p-4 shadow-[0_26px_38px_rgb(0_0_0_/_0.58)] ${
          isOpen ? 'max-[991px]:flex' : 'max-[991px]:hidden'
        }`}
      >
        <div className="mb-4 grid grid-cols-1 gap-3">
          {navItems.map((section) => (
            <div key={section.title} className="rounded-[12px] border border-white/10 bg-white/[0.02] px-3 py-3">
              <div className="mb-2 text-left text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#d8d8d8]">{section.title}</div>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex min-w-full items-center justify-start rounded-[10px] px-2 py-2 text-[0.96rem] text-white transition-colors hover:bg-white/[0.06] hover:text-[#f8bdf6]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/concept/test-de-scalabilite"
          onClick={onClose}
          className="inline-flex w-full items-center justify-center gap-3 rounded-[12px] border border-[#be7be4] bg-[linear-gradient(145deg,#9e55cb,#6f369f)] px-6 py-3 text-[0.9rem] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_28px_rgb(14_3_21_/_0.4)] group transition-all hover:-translate-y-0.5 hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]"
        >
          <span>Votre score de scalabilité</span>
          <Image src={arrowIcon} alt="" width={16} height={16} className="transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </>
  )
}
