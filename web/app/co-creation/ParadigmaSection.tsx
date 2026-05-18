import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import WatermarkBackground from './WatermarkBackground'

interface ParadigmaSectionProps {
  nicht?: string[]
  sondern?: string[]
}

const defaultNicht = [
  'Offene Fragestellungen ohne Ownership',
  'Allgemeine Workshops',
  'Diskussionen ohne Output',
]

const defaultSondern = [
  'Konkrete Probleme von Unternehmen',
  'Klare Verantwortlichkeit pro Team',
  'Praxisnahe Lösungen mit Pitch',
]

export default function ParadigmaSection({ nicht, sondern }: ParadigmaSectionProps) {
  const nichtList = nicht?.length ? nicht : defaultNicht
  const sondernList = sondern?.length ? sondern : defaultSondern

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
          <span className="text-white">PARADIGMEN</span>
          <span className="gradient-text">WECHSEL</span>
        </h2>

        <div className="relative overflow-hidden py-8 md:py-12 -mx-4 md:-mx-8 px-4 md:px-8">
          <WatermarkBackground />
          <StaggerContainer stagger={0.15} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* NICHT */}
          <StaggerItem direction="left">
            <div className="liquid-glass rounded-2xl p-8 h-full transition-colors duration-300 hover:bg-black/40">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/15 border border-red-400/30 text-red-300 text-xl font-bold">
                  ✕
                </span>
                <h3 className="text-2xl font-extrabold uppercase tracking-wide text-white/80">Nicht</h3>
              </div>
              <ul className="space-y-3">
                {nichtList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-base">
                    <span className="text-red-400/70 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* SONDERN */}
          <StaggerItem direction="right">
            <div className="liquid-glass rounded-2xl p-8 h-full transition-colors duration-300 hover:border-sc-orange/40 hover:bg-black/40 border border-sc-orange/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-bg text-white text-xl font-bold">
                  ✓
                </span>
                <h3 className="text-2xl font-extrabold uppercase tracking-wide gradient-text">Sondern</h3>
              </div>
              <ul className="space-y-3">
                {sondernList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/85 text-base">
                    <span className="gradient-text font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
