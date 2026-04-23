'use client'

const TICKET_URL = 'https://tickets.infield.live/event/startup-contacts-4k68sh'
const CONVERSION_ID = 'AW-857927386/ag-FCMOG6qAcENrdi5kD'

declare global {
  function gtag(...args: unknown[]): void
}

export default function TicketCardCTA() {
  const handleClick = () => {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: CONVERSION_ID })
    }
  }

  return (
    <a
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-white cursor-pointer gradient-bg no-underline shadow-lg shadow-sc-orange/30"
      href={TICKET_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <span>Tickets kaufen</span>
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
