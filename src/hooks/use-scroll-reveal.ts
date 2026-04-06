'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealOptions {
  once?: boolean
  amount?: number
}

export function useScrollReveal(options?: ScrollRevealOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el: HTMLElement | null = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (options?.once !== false) observer.disconnect()
        }
      },
      { threshold: options?.amount ?? 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.once, options?.amount])

  return { ref, isInView }
}
