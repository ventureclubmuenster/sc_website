'use client'

export default function WorkshopsComingSoon() {
  return (
    <section className="relative py-28 px-6 bg-black overflow-hidden">
      <div className="flex items-center justify-center">
        {/* Widget card with glow */}
        <div className="relative w-full max-w-xl">
          {/* Subtle glow trail running along edge */}
          <div
            className="absolute -inset-[2px] rounded-2xl blur-md"
            style={{
              background:
                'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 35%, #ff5e00 50%, transparent 65%, transparent 100%)',
              animation: 'glow-spin 6s linear infinite',
              opacity: 0.7,
            }}
          />
          {/* Outer soft halo */}
          <div
            className="absolute -inset-2 rounded-2xl blur-xl"
            style={{
              background:
                'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 35%, #ff5e00 50%, transparent 65%, transparent 100%)',
              animation: 'glow-spin 6s linear infinite',
              opacity: 0.3,
            }}
          />

          {/* Glass card */}
          <div className="relative rounded-2xl border border-white/[0.08] px-8 py-16 sm:px-12 sm:py-20 flex flex-col items-center text-center gap-5 bg-[#111111]">
            <p className="text-xs tracking-[0.35em] uppercase text-white/30 font-light">
              Workshops 2026
            </p>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
              COMING
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sc-orange to-orange-400">
                SOON
              </span>
            </h2>

            <div className="w-16 h-px bg-sc-orange" />

            <p className="text-white/40 text-sm sm:text-base max-w-sm leading-relaxed font-light">
              Wir geben bald die Themen der Workshops bekannt.
            </p>
          </div>
        </div>

        <style jsx>{`
          @property --glow-angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
          }
          @keyframes glow-spin {
            to {
              --glow-angle: 360deg;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
