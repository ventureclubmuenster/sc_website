import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import ImagePlaceholder from './ImagePlaceholder'
import { renderHeadline } from './headlineFormat'

interface Karte {
  number?: string
  title?: string
  description?: string
  imageUrl?: string
}

interface WasIstChallengeProps {
  eyebrow?: string
  headline?: string
  intro?: string
  karten?: Karte[]
}

const defaultKarten: Karte[] = [
  {
    number: '01',
    title: 'Reale Challenge',
    description:
      'Die Aufgaben kommen aus Unternehmenspraxis, Produktion, Prozessen, Services oder digitalen Schnittstellen.',
  },
  {
    number: '02',
    title: 'Geführter Prozess',
    description:
      'R-Factory bringt Struktur, Methoden und Coaching in den Sprint.',
  },
  {
    number: '03',
    title: 'Startup-Atmosphäre',
    description:
      'Die Challenge läuft mitten im Startup Contacts Umfeld mit Messe, Netzwerk und Gründergeist.',
  },
]

export default function WasIstChallenge({
  eyebrow,
  headline,
  intro,
  karten,
}: WasIstChallengeProps) {
  const items = karten?.length ? karten : defaultKarten
  const eyebrowText = eyebrow ?? 'Was ist die Challenge?'
  const headlineText =
    headline ?? 'EIN *SPRINT* FÜR *ECHTE AUFGABEN*|AUS DEM *MITTELSTAND*'
  const introText =
    intro ??
    'Die Co-Creation Challenge bringt Talente und Unternehmen an einem Arbeitstag zusammen. Jedes Team arbeitet an einer konkreten Fragestellung und entwickelt einen ersten Lösungsansatz. Angestrebt werden bewusst hybride Hardware-/Software-Konzepte, die über reine Software hinausgehen und im Unternehmen weitergedacht werden können.'

  return (
    <section className="relative z-10 px-6 py-20 overflow-hidden" id="was-ist-die-challenge">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-sm md:text-base tracking-wide text-white/60 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
            {eyebrowText}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-5 leading-tight">
            {renderHeadline(headlineText)}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            {introText}
          </p>
        </div>

        <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((k, i) => (
            <StaggerItem key={i} direction="up">
              <div className="group liquid-glass rounded-2xl p-8 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/50 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-extrabold shadow-lg shadow-orange-500/30 ring-1 ring-white/20">
                    {k.number ?? String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 gradient-line opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {k.imageUrl && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                    <ImagePlaceholder
                      src={k.imageUrl}
                      alt={k.title ?? 'Karten-Bild'}
                      label={`Sanity → Co-Creation → Was ist die Challenge → Karte ${k.number ?? i + 1} → Bild`}
                      fill
                      rounded="rounded-xl"
                    />
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide text-white mb-3">
                  {k.title ?? 'Titel'}
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  {k.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
