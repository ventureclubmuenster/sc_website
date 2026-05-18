import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import WatermarkBackground from './WatermarkBackground'

interface Company {
  name: string
  logoUrl?: string
  whiteBackground?: boolean
  challenge?: string
}

interface UnternehmenPlaceholderProps {
  companies?: Company[]
}

export default function UnternehmenPlaceholder({ companies }: UnternehmenPlaceholderProps) {
  // Wenn keine echten Unternehmen gepflegt sind, zeigen wir 3 Platzhalter
  const showPlaceholders = !companies || companies.length === 0
  const placeholderSlots = ['Coming Soon', 'Coming Soon', 'Coming Soon']

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
          <span className="text-white">DIE </span>
          <span className="gradient-text">LEAD-UNTERNEHMEN</span>
        </h2>
        <p className="italic text-white/40 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
          {showPlaceholders
            ? 'Demnächst hier: unsere Partner-Unternehmen mit ihren konkreten Challenges.'
            : 'Diese Unternehmen bringen ihre echten Probleme mit auf die Messe.'}
        </p>

        <div className="relative overflow-hidden py-8 md:py-12 -mx-4 md:-mx-8 px-4 md:px-8">
          <WatermarkBackground />
          <StaggerContainer stagger={0.1} className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showPlaceholders
            ? placeholderSlots.map((label, i) => (
                <StaggerItem key={i} direction="up">
                  <div className="relative aspect-[4/3] rounded-2xl liquid-glass flex items-center justify-center p-6 text-center shadow-lg shadow-sc-orange/20 ring-1 ring-sc-orange/20">
                    <span className="gradient-text font-extrabold text-lg uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                </StaggerItem>
              ))
            : companies!.map((c, i) => (
                <StaggerItem key={i} direction="up">
                  <div
                    className={`group relative aspect-[4/3] rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-300 hover:-translate-y-1 ${
                      c.whiteBackground
                        ? 'bg-white border border-white/20'
                        : 'liquid-glass hover:border-sc-orange/40'
                    }`}
                  >
                    {c.logoUrl ? (
                      <div className="relative w-full h-24 mb-3">
                        <Image
                          src={c.logoUrl}
                          alt={c.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 mb-3 flex items-center justify-center bg-red-300/40 border border-dashed border-red-400/60 rounded-lg">
                        <span className="text-red-50 font-mono text-xs">Logo fehlt</span>
                      </div>
                    )}
                    <div
                      className={`text-center font-bold ${
                        c.whiteBackground ? 'text-black' : 'text-white'
                      }`}
                    >
                      {c.name}
                    </div>
                    {c.challenge && (
                      <div
                        className={`mt-2 text-xs leading-relaxed text-center max-w-xs ${
                          c.whiteBackground ? 'text-black/60' : 'text-white/60'
                        }`}
                      >
                        {c.challenge}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
