import GlowButton from './GlowButton'

export default function SaveTheDate() {
  return (
    <section className="relative bg-black px-6 py-16 md:py-20 overflow-hidden">
      {/* Repeating "Startup Contacts" watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.07] tracking-tighter whitespace-nowrap leading-none"
            style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
          >
            STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto rounded-3xl border border-sc-orange bg-card-grey px-6 py-10 md:px-10 md:py-12 text-center">
        <h2 className="h-section">
          Save the Date
        </h2>
        <p className="mt-4 text-xl md:text-2xl font-bold uppercase tracking-tight">
          <span className="gradient-text">8. Juni 2027 · Halle Münsterland</span>
        </p>
        <p className="body mt-5 max-w-xl mx-auto">
          Trag dich in unseren Newsletter ein und verpasse keine Neuigkeiten:
          Sei beim Vorverkaufsstart als Erste:r dabei und erfahre vorab alles
          zu Tickets, Programm und Speakern der Startup Contacts 2027, damit
          du dir rechtzeitig deinen Platz sichern kannst.
        </p>
        <div className="mt-8 flex justify-center">
          <GlowButton href="/newsletter" gradient>
            Newsletter abonnieren
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
