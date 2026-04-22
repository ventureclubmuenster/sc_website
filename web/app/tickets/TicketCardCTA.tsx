const TICKET_URL = 'https://tickets.infield.live/event/startup-contacts-4k68sh'

export default function TicketCardCTA() {
  return (
    <a
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-white cursor-pointer gradient-bg no-underline shadow-lg shadow-sc-orange/30"
      href={TICKET_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Tickets kaufen</span>
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
