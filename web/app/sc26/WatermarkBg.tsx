/**
 * Wiederholendes "STARTUP CONTACTS"-Wasserzeichen — 1:1 nachgebaut nach dem
 * Hintergrund der Hall of Fame auf der Startseite (components/HallOfFame.tsx).
 * Liegt absolut hinter dem Section-Inhalt (pointer-events-none, sehr dezent),
 * sodass Blöcke und Schrift nicht überschrieben werden — der Inhalt muss dafür
 * lediglich `relative z-10` tragen.
 */
export default function WatermarkBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {[...Array(24)].map((_, i) => (
        <span
          key={i}
          className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.025] tracking-tighter whitespace-nowrap leading-none"
          style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
        >
          STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
        </span>
      ))}
    </div>
  )
}
