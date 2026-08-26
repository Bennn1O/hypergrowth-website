'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

const consentKey = 'hpg-cookie-consent'
const consentEvent = 'hpg-cookie-consent-change'

function subscribeToConsent(callback: () => void) {
  const handleChange = () => callback()
  window.addEventListener('storage', handleChange)
  window.addEventListener(consentEvent, handleChange)

  return () => {
    window.removeEventListener('storage', handleChange)
    window.removeEventListener(consentEvent, handleChange)
  }
}

function getConsentSnapshot() {
  return localStorage.getItem(consentKey)
}

function getServerConsentSnapshot() {
  return 'pending'
}

function acceptConsent() {
  localStorage.setItem(consentKey, 'accepted')
  window.dispatchEvent(new Event(consentEvent))
}

function declineConsent() {
  localStorage.setItem(consentKey, 'declined')
  window.dispatchEvent(new Event(consentEvent))
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  )

  if (consent !== null) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-4">
      <div className="flex items-center justify-between gap-6 rounded-[14px] border border-white/10 bg-[rgb(22_12_32_/_0.88)] px-5 py-4 backdrop-blur-[20px] shadow-[0_16px_40px_rgb(4_2_8_/_0.5)] max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-4">
        <p className="text-[0.82rem] leading-[1.6] text-white/60">
          On utilise des cookies pour mesurer l&apos;audience et améliorer votre expérience.{' '}
          <Link href="/mentions-legales" className="text-white/40 underline underline-offset-2 transition hover:text-white/70">
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={declineConsent}
            className="rounded-[8px] border border-white/10 px-4 py-2 text-[0.78rem] font-medium text-white/50 transition hover:border-white/20 hover:text-white/80"
          >
            Refuser
          </button>
          <button
            onClick={acceptConsent}
            className="rounded-[8px] border border-hpg-violet-border bg-hpg-violet-btn px-4 py-2 text-[0.78rem] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.15)] transition hover:bg-[#6f33a0]"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
