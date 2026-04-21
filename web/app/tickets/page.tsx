import type { Metadata } from 'next'
import BigCountdown from '@/components/BigCountdown'

export const metadata: Metadata = {
  title: 'Tickets',
  description:
    'Tickets für die Startup Contacts Münster am 15. Juni 2026. Student, Regular und Premium Access. Launch am 22.04.2026 um 18:00 Uhr.',
  alternates: { canonical: 'https://www.startup-contacts.de/tickets' },
  openGraph: {
    title: 'Tickets | Startup Contacts',
    description:
      'Student, Regular und Premium Access für die Startup Contacts Münster. Ticket Launch am 22.04.2026 um 18:00 Uhr.',
    url: 'https://www.startup-contacts.de/tickets',
  },
}

const LAUNCH_DATE = '2026-04-22T18:00:00+02:00'

interface TicketPrice {
  amount: string
  strikethrough?: string
  badge?: string
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
  { text: 'Zugang zur Afterparty*' },
  { text: 'Getränke und Verpflegung inkludiert' },
]

const tickets: Ticket[] = [
  {
    name: 'Student Access',
    tagline: 'Für Studierende und Talente',
    price: {
      amount: '15 €',
      strikethrough: '30 €',
      badge: '50 % Early Bird',
    },
    perks: STANDARD_PERKS,
  },
  {
    name: 'Regular Access',
    tagline: 'Für Unternehmen und Professionals',
    price: { amount: '70 €' },
    perks: [
      ...STANDARD_PERKS,
      { text: 'Zugang zur separaten Working Area für Meetings' },
    ],
  },
  {
    name: 'Premium Access',
    tagline: 'Das volle VIP Erlebnis',
    price: { amount: '250 €' },
    perks: [
      ...STANDARD_PERKS,
      { text: 'Zugang zur separaten Working Area für Meetings' },
      { text: 'Zugang zum Pre Event am Vorabend', highlight: true },
      { text: 'VIP Lounge inkl. Premium Catering', highlight: true },
      { text: 'Zugang zum VIP Working Space' },
      { text: 'Präferierter Workshop Zugang' },
      { text: 'Separater VIP Eingang — keine Warteschlangen' },
    ],
  },
]

export default function TicketsPage() {
  return (
    <>
      {/* Header + Countdown */}
      <section className="relative bg-black pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255,94,0,0.25) 0%, transparent 55%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight">
            <span className="text-white">DER COUNTDOWN </span>
            <span className="gradient-text">LÄUFT</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-6 max-w-2xl">
            Am 22.04.2026 um 18:00 Uhr gehen die Tickets live. Sichere dir dein Ticket auf der
            größten studentisch organisierten Startup Messe in NRW.
          </p>

          <div className="mt-14 md:mt-16">
            <BigCountdown targetDate={LAUNCH_DATE} />
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="bg-black pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              <span className="text-white">Startup Contacts </span>
              <span className="gradient-text">Tickets</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.name} ticket={ticket} />
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

function TicketCard({ ticket }: { ticket: Ticket }) {
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

        <div className="mt-8 pb-6 border-b border-white/5">
          <div className="h-7 mb-3">
            {ticket.price.badge && (
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-white px-3 py-1 rounded-full gradient-bg">
                {ticket.price.badge}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-4">
            <span
              className={`text-5xl lg:text-6xl font-black tabular-nums leading-none ${
                ticket.price.strikethrough ? 'gradient-text' : 'text-white'
              }`}
            >
              {ticket.price.amount}
            </span>
            {ticket.price.strikethrough && (
              <span className="text-white/30 text-3xl lg:text-4xl font-bold line-through tabular-nums leading-none">
                {ticket.price.strikethrough}
              </span>
            )}
          </div>
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
          <button
            type="button"
            disabled
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-white/40 bg-white/[0.04] border border-white/10 cursor-not-allowed"
          >
            Tickets soon
          </button>
        </div>
      </div>
    </div>
  )
}
