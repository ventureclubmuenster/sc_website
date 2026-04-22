'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    VIVENU?: { init?: () => void; replaceLinks?: () => void }
  }
}

const EMBED_SRC = 'https://vivenu.com/web/deliver/js/v1/embed.js'
const TICKET_URL = 'https://tickets.infield.live/event/startup-contacts-4k68sh?useEmbed=true'

export default function TicketCardCTA() {
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

  return (
    <a
      className="vivenu-btn w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-white cursor-pointer gradient-bg no-underline shadow-lg shadow-sc-orange/30"
      href={TICKET_URL}
    >
      <span>Tickets kaufen</span>
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
