import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface Prinzip {
  title?: string
  description?: string
}

interface PrinzipienGridProps {
  prinzipien?: Prinzip[]
  backgroundImageUrl?: string
}

const defaults: Prinzip[] = [
  {
    title: 'Zusammenarbeit',
    description:
      'Studierende und Unternehmensvertreter arbeiten als Team an einer konkreten Problemstellung. Fokussiert, praxisnah und zielorientiert.',
  },
  {
    title: 'Lösung',
    description:
      'Ideen werden strukturiert entwickelt, hinterfragt und zu durchdachten Konzepten ausgearbeitet.',
  },
  {
    title: 'Pitch',
    description:
      'Abschluss-Präsentation vor Jury und Publikum. Bewertung, Feedback und ggf. Preisgeld.',
  },
]

export default function PrinzipienGrid({ prinzipien, backgroundImageUrl }: PrinzipienGridProps) {
  const items = prinzipien?.length ? prinzipien : defaults

  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Top and bottom black fade */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt="Dreiklang Hintergrund"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
          <span className="text-white">DER </span>
          <span className="gradient-text">DREIKLANG</span>
        </h2>
        <p className="text-white/60 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
          Drei klare Phasen, in denen aus Problemen echte Lösungen entstehen.
        </p>

        <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <StaggerItem key={i} direction="up">
              <div className="group liquid-glass rounded-2xl p-8 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/50 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-sm text-white/40 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 gradient-line opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide gradient-text mb-4">
                  {p.title ?? 'Schritt'}
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  {p.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
