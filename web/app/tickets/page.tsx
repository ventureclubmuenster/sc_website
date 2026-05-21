import type { Metadata } from 'next'
import TicketCardCTA from './TicketCardCTA'
import PartnerBanner from '@/components/PartnerBanner'
import DiscountBadge from './DiscountBadge'

export const metadata: Metadata = {
  title: 'Tickets',
  description:
    'Tickets für die Startup Contacts Münster am 15. Juni 2026. Student, Regular und Premium Access.',
  alternates: { canonical: 'https://www.startup-contacts.de/tickets' },
  openGraph: {
    title: 'Tickets | Startup Contacts',
    description:
      'Student, Regular und Premium Access für die Startup Contacts Münster.',
    url: 'https://www.startup-contacts.de/tickets',
  },
}

interface TicketPrice {
  amount: string
}

interface Perk {
  text: string
  highlight?: boolean
}

interface Ticket {
  name: string
  tagline: string
  price: TicketPrice
  perks: Perk[]
}

const STANDARD_PERKS: Perk[] = [
  { text: 'Zugang zur Messe und zu allen Formaten wie Keynotes, Workshops und Co-Creation Corner' },
  { text: 'Workshops' },
  { text: 'Getränke inklusive und ARO Bowl als Mittagessen' },
  { text: 'Crêpes, Hotdogs und Frühstück von Essmanns Backstube' },
  { text: 'Goodies' },
  { text: 'Zugang zur Zeitgeist Afterparty*' },
]

const tickets: Ticket[] = [
  {
    name: 'Student Access',
    tagline: 'Für Studierende und Talente',
    price: {
      amount: '30 €',
    },
    perks: [
      { text: 'Zugang zur Messe und zu allen Formaten wie Keynotes, Workshops und Co-Creation Corner' },
      { text: 'Workshops' },
      { text: 'Getränke inklusive und ARO Bowl als Mittagessen' },
      { text: 'Crêpes, Hotdogs und Frühstück von Essmanns Backstube' },
      { text: 'Goodies' },
      { text: 'Exklusiver Afterwork-Empfang mit free Drinks' },
      { text: 'Zugang zur Zeitgeist Afterparty*' },
    ],
  },
  {
    name: 'Regular Access',
    tagline: 'Für Unternehmen und Professionals',
    price: { amount: '70 €' },
    perks: [
      { text: 'Zugang zur Messe und zu allen Formaten wie Keynotes, Workshops und Co-Creation Corner' },
      { text: 'Workshops' },
      { text: 'Getränke inklusive und ARO Bowl als Mittagessen' },
      { text: 'Crêpes, Hotdogs und Frühstück von Essmanns Backstube' },
      { text: 'Goodies' },
      { text: 'Exklusiver Afterwork-Empfang mit free Drinks' },
      { text: 'Zugang zur Zeitgeist Afterparty*' },
      { text: 'Zugang zur separaten Working Area für Meetings', highlight: true },
    ],
  },
  {
    name: 'Premium Access',
    tagline: 'Das volle VIP Erlebnis',
    price: { amount: '250 €' },
    perks: [
      ...STANDARD_PERKS,
      { text: 'Zugang zum Pre Event am Vorabend', highlight: true },
      { text: 'Zugang zur VIP Lounge', highlight: true },
      { text: 'Premium Catering', highlight: true },
      { text: 'Zugang zum VIP Working Space', highlight: true },
      { text: 'Präferierter Workshop Zugang', highlight: true },
      { text: 'Separater VIP Eingang ohne lange Warteschlange', highlight: true },
    ],
  },
]

export default function TicketsPage() {
  return (
    <>
      {/* Tickets */}
      <section className="relative bg-black pt-32 pb-32 px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              <span className="text-white">Startup Contacts </span>
              <span className="gradient-text">Tickets</span>
            </h2>
            <p className="mt-5 text-xl md:text-3xl font-bold uppercase tracking-wide text-white/90">
              15. Juni 2026
            </p>
          </div>

          <div className="mt-10" />

          <PartnerBanner />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-4">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.name}
                ticket={ticket}
                showDiscountBadge={ticket.name === 'Student Access'}
              />
            ))}
          </div>

          <p className="text-white/40 text-xs leading-relaxed mt-10 max-w-3xl">
            * Der Einlass zur Afterparty erfolgt über Bändchen, die zu Beginn der Messe vor Ort
            ausgegeben werden. Die Anzahl ist aufgrund der Location begrenzt — die Verteilung läuft
            nach dem First-come-first-serve-Prinzip. Ein Ticket garantiert keinen Afterparty-Zugang.
          </p>
        </div>
      </section>
    </>
  )
}

function TicketCard({ ticket, showDiscountBadge }: { ticket: Ticket; showDiscountBadge?: boolean }) {
  return (
    <div className="relative group rounded-2xl p-[1.5px] h-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            'conic-gradient(from var(--glow-angle, 0deg), rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 32%, rgba(255,94,0,0.75) 50%, rgba(255,255,255,0.05) 68%, rgba(255,255,255,0.05) 100%)',
          animation: 'glow-spin 9s linear infinite',
          opacity: 0.55,
        }}
      />

      <div className="relative h-full flex flex-col rounded-[14.5px] bg-[#111111] p-8 lg:p-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {ticket.name}
          </h3>
          <p className="text-white/50 text-sm">{ticket.tagline}</p>
        </div>

        <div className="mt-8 border-b border-white/5 pb-6">
          <div className="flex items-baseline gap-4">
            <span className="text-5xl lg:text-6xl font-black tabular-nums leading-none text-white">
              {ticket.price.amount}
            </span>
          </div>
          {showDiscountBadge && <DiscountBadge />}
        </div>

        <div className="mt-8 flex-1">
          <p className="gradient-text text-xs uppercase tracking-[0.2em] mb-4 font-bold">Vorteile</p>
          <ul className="space-y-3">
            {ticket.perks.map((perk) => (
              <li
                key={perk.text}
                className={
                  perk.highlight
                    ? 'flex gap-3 text-white text-sm leading-relaxed font-semibold rounded-lg border border-sc-orange/30 bg-sc-orange/[0.08] px-3 py-2.5'
                    : 'flex gap-3 text-white/80 text-sm leading-relaxed px-3'
                }
              >
                <span aria-hidden className="text-sc-orange mt-[2px] shrink-0">
                  {perk.highlight ? '★' : '✓'}
                </span>
                <span>{perk.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <TicketCardCTA />
        </div>
      </div>
    </div>
  )
}
