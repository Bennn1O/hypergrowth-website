'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'

interface ScrollRevealOptions {
  once?: boolean
  amount?: number | 'some' | 'all'
}

export function useScrollReveal(options?: ScrollRevealOptions) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.15,
  })
  return { ref, isInView }
}
