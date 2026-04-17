'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    VIVENU?: { init?: () => void; replaceLinks?: () => void }
  }
}

const EMBED_SRC = 'https://vivenu.com/web/deliver/js/v1/embed.js'

export default function TicketButton({ small }: { small?: boolean }) {
  useEffect(() => {
    const initVivenu = () => {
      window.VIVENU?.init?.() ?? window.VIVENU?.replaceLinks?.()
    }

    if (window.VIVENU) {
      initVivenu()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', initVivenu, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = EMBED_SRC
    script.async = true
    script.addEventListener('load', initVivenu, { once: true })
    document.head.appendChild(script)
  }, [])

  const className = small
    ? 'vivenu-btn inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm text-white cursor-pointer gradient-bg no-underline'
    : 'vivenu-btn inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base sm:gap-4 sm:px-14 sm:py-6 sm:text-xl text-white cursor-pointer gradient-bg no-underline shadow-lg shadow-sc-orange/30'

  return (
    <a
      className={className}
      href="https://tickets.infield.live/event/startup-contacts-4k68sh?useEmbed=true"
    >
      <span>Tickets kaufen</span>
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
