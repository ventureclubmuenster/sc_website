'use client'

import WartelisteButton from '@/components/WartelisteButton'

export default function WorkshopPreview2026() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
          Was dich <span className="gradient-text">dieses Jahr</span> erwartet
        </h2>

        {/* Coming Soon Card */}
        <div className="relative w-full max-w-xl mt-16">
          {/* Glow trail */}
          <div
            className="absolute -inset-[2px] rounded-2xl blur-md"
            style={{
              background:
                'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 35%, #ff5e00 50%, transparent 65%, transparent 100%)',
              animation: 'glow-spin 6s linear infinite',
              opacity: 0.7,
            }}
          />
          {/* Outer halo */}
          <div
            className="absolute -inset-2 rounded-2xl blur-xl"
            style={{
              background:
                'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 35%, #ff5e00 50%, transparent 65%, transparent 100%)',
              animation: 'glow-spin 6s linear infinite',
              opacity: 0.3,
            }}
          />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/[0.08] px-8 py-16 sm:px-12 sm:py-20 flex flex-col items-center text-center gap-5 bg-[#111111]">
            <p className="text-xs tracking-[0.35em] uppercase text-white/30 font-light">
              Workshops 2026
            </p>

            <h3 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
              COMING
              <br />
              <span className="gradient-text">
                SOON
              </span>
            </h3>

            <div className="w-16 h-px gradient-line" />

            <p className="text-white/40 text-sm sm:text-base max-w-sm leading-relaxed font-light">
              Die Workshops werden vor der Messe bekannt gegeben. Mit einem Ticket kannst du dich direkt auf deine Favoriten bewerben.
            </p>

            <div className="mt-4">
              <WartelisteButton />
            </div>
          </div>
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
    </section>
  )
}
