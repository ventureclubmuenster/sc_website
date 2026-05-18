import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import ImagePlaceholder from './ImagePlaceholder'
import { renderHeadline } from './headlineFormat'

interface Karte {
  title?: string
  description?: string
  imageUrl?: string
}

interface WarumTeilnehmenProps {
  eyebrow?: string
  headline?: string
  intro?: string
  karten?: Karte[]
  backgroundImageUrl?: string
}

const defaultKarten: Karte[] = [
  {
    title: 'Unternehmen nah erleben',
    description:
      'Sprich direkt mit Menschen aus dem Mittelstand und verstehe, woran Unternehmen wirklich arbeiten.',
  },
  {
    title: 'Methoden anwenden',
    description:
      'Von Problem Framing bis Konzept: Du lernst einen kompakten, praxisnahen Innovationssprint.',
  },
  {
    title: 'Interdisziplinär arbeiten',
    description:
      'Studierende, Young Professionals und Unternehmen denken gemeinsam — Perspektiven treffen sich.',
  },
  {
    title: 'Netzwerk aufbauen',
    description:
      'Du bewegst dich im Umfeld von Startup Contacts, R-Factory, VCM und regionalen, erfolgreichen Unternehmen.',
  },
]

export default function WarumTeilnehmen({
  eyebrow,
  headline,
  intro,
  karten,
  backgroundImageUrl,
}: WarumTeilnehmenProps) {
  const items = karten?.length ? karten : defaultKarten
  const eyebrowText = eyebrow ?? 'Warum teilnehmen?'
  const headlineText =
    headline ?? 'PRAKTISCHE INNOVATIONSERFAHRUNG MIT DIREKTEM *UNTERNEHMENSZUGANG*'
  const introText =
    intro ??
    'Du arbeitest an einer Aufgabe, die für ein Unternehmen gerade relevant ist. Gleichzeitig lernst du neue Methoden, Menschen und Perspektiven kennen.'

  return (
    <section className="relative z-10 px-6 py-20 overflow-hidden" id="warum-teilnehmen">
      {backgroundImageUrl && (
        <>
          <Image
            src={backgroundImageUrl}
            alt="Warum teilnehmen — Hintergrund"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority={false}
          />
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-black to-transparent" />
          </div>
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto">
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

        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map((k, i) => (
            <StaggerItem key={i} direction="up">
              <div className="group liquid-glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/50 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30 ring-1 ring-white/20">
                  <span className="text-white text-base font-extrabold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {k.imageUrl && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                    <ImagePlaceholder
                      src={k.imageUrl}
                      alt={k.title ?? 'Karten-Bild'}
                      label={`Sanity → Co-Creation → Warum teilnehmen → Karte ${i + 1} → Bild`}
                      fill
                      rounded="rounded-xl"
                    />
                  </div>
                )}

                <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wide text-white mb-2 leading-tight">
                  {k.title ?? 'Titel'}
                </h3>
                <p className="text-white/65 text-sm md:text-base leading-relaxed">
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
