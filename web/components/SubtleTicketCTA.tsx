import Link from 'next/link'

export default function SubtleTicketCTA({ text = 'Jetzt Ticket sichern' }: { text?: string }) {
  return (
    <div className="relative z-10 flex justify-center pb-16">
      <Link
        href="/tickets"
        className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-wide transition-colors"
      >
        <span>{text}</span>
        <span
          aria-hidden
          className="gradient-text font-bold transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
  )
}
