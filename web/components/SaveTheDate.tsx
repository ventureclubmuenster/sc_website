import GlowButton from './GlowButton'

export default function SaveTheDate() {
  return (
    <section className="relative bg-black px-6 py-16 md:py-20 overflow-hidden">
      {/* Repeating "Startup Contacts" watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.03] tracking-tighter whitespace-nowrap leading-none"
            style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
          >
            STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto rounded-3xl border border-sc-orange/70 bg-card-grey px-6 py-10 md:px-10 md:py-12 text-center">
        <h2 className="font-bold uppercase leading-[0.85] tracking-tighter text-white text-[clamp(1.75rem,7.5vw,4rem)] lg:font-extrabold lg:tracking-[-0.04em] lg:text-[clamp(2.5rem,5vw,6.5rem)]">
          Save the Date
        </h2>
        <p className="mt-4 text-xl md:text-2xl font-bold uppercase tracking-tight">
          <span className="gradient-text">8. Juni 2027 · Halle Münsterland</span>
        </p>
        <p className="body mt-5 max-w-xl mx-auto">
          Trag dich in unseren Newsletter ein: Sei beim Vorverkaufsstart als
          Erste:r dabei und erfahre als Erstes vom reduzierten Early-Bird-Rabatt
          der Startup Contacts 2027.
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
