import BewerbungButton from './BewerbungButton'

interface InlineCTAProps {
  bewerbungsUrl?: string
  label?: string
  note?: string
  variant?: 'card' | 'minimal'
}

const DEFAULT_NOTE = 'Begrenzte Plätze · Bewerbung bis 11.06. um 18 Uhr möglich.'

export default function InlineCTA({
  bewerbungsUrl,
  label,
  note = DEFAULT_NOTE,
  variant = 'card',
}: InlineCTAProps) {
  if (variant === 'minimal') {
    return (
      <div className="relative z-10 px-6 py-10 flex flex-col items-center gap-3 text-center">
        <BewerbungButton small />
        <p className="text-white/60 text-xs md:text-sm font-mono uppercase tracking-wider">
          {note}
        </p>
      </div>
    )
  }

  return (
    <section className="relative z-10 px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto liquid-glass rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left">
        <div className="flex-1">
          <p className="text-white font-bold text-lg md:text-xl mb-1">
            Bereit, deine Challenge zu suchen?
          </p>
          <p className="text-white/65 text-sm md:text-base font-mono uppercase tracking-wider">
            {note}
          </p>
        </div>
        <div className="flex-shrink-0">
          <BewerbungButton small />
        </div>
      </div>
    </section>
  )
}
