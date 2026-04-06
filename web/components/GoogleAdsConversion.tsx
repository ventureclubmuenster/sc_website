'use client'

import { useEffect } from 'react'

declare global {
  function gtag(...args: unknown[]): void
}

export default function GoogleAdsConversion({ sendTo }: { sendTo: string }) {
  useEffect(() => {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: sendTo })
    }
  }, [sendTo])

  return null
}
