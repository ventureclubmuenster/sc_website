'use client'

import { useEffect, useState } from 'react'
import FadeIn from '@/components/FadeIn'
import AppButton from '@/components/AppButton'

/**
 * True only for Android devices (Samsung, Huawei, …).
 * Desktop (PC/Laptop) and iOS (iPhone/iPad) return false, so the
 * App button stays hidden there.
 */
function detectIsAndroid(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const isAndroid = /android/i.test(ua)
  // Guard against iPadOS reporting a desktop UA, and exclude any iOS markers.
  const isIOS = /iphone|ipad|ipod/i.test(ua)
  return isAndroid && !isIOS
}

export default function WorkshopAppCTA() {
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    setIsAndroid(detectIsAndroid())
  }, [])

  return (
    <section className="relative pt-2 md:pt-3 pb-10 md:pb-12 px-6 bg-black overflow-hidden">
      {/* Ambient gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-sc-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeIn direction="up" duration={0.7} distance={30}>
          <div className="group liquid-glass rounded-3xl px-6 py-8 md:px-10 md:py-10 text-center overflow-hidden relative transition-colors duration-500 hover:border-sc-orange/60">
            {/* Greyish tint (always on) */}
            <span className="absolute inset-0 rounded-3xl bg-white/[0.12] pointer-events-none" />

            {/* Headline */}
            <h2 className="relative z-10 text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-[1.15] max-w-2xl mx-auto">
              App mit deinem Ticket{' '}
              <span className="gradient-text">freischalten</span>{' '}&amp;{' '}direkt
              für Workshops <span className="gradient-text">bewerben</span>
            </h2>

            {/* Subtext */}
            <p className="relative z-10 mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              In der App sicherst du dir deinen Platz in den Workshops, die zu
              dir passen, bevor sie ausgebucht sind.
            </p>

            {/* CTA Button — only shown on Android devices */}
            {isAndroid && (
              <FadeIn direction="up" duration={0.7} delay={0.3}>
                <div className="relative z-10 mt-6 flex justify-center">
                  <AppButton small wide />
                </div>
              </FadeIn>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
