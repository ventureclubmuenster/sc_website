import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import ImagePlaceholder from './ImagePlaceholder'
import { renderHeadline } from './headlineFormat'

interface Karte {
  title?: string
  description?: string
}

interface HybrideLoesungenProps {
  eyebrow?: string
  headline?: string
  intro?: string
  imageUrl?: string
  imageTitle?: string
  imageSubtitle?: string
  imageBody?: string
  karten?: Karte[]
}

const defaultKarten: Karte[] = [
  {
    title: 'Hardware + Software',
    description:
      'Physische Produkte, Sensorik, digitale Services und Datenflüsse werden zusammen gedacht.',
  },
  {
    title: 'Prozess + Mensch',
    description:
      'Lösungen sollen im Arbeitsalltag funktionieren und jenseits der ersten Folie weitergedacht werden können.',
  },
  {
    title: 'Mittelstand + Talent',
    description:
      'Unternehmenswissen trifft frische Perspektiven und neue Methoden.',
  },
  {
    title: 'Konzept + nächste Schritte',
    description:
      'Am Ende des Tages steht ein greifbarer Ansatz, der weiter diskutiert und entwickelt werden kann.',
  },
]

export default function HybrideLoesungen({
  eyebrow,
  headline,
  intro,
  imageUrl,
  imageTitle,
  imageSubtitle,
  imageBody,
  karten,
}: HybrideLoesungenProps) {
  const items = karten?.length ? karten : defaultKarten
  const eyebrowText = eyebrow ?? 'Innovationsfokus'
  const headlineText = headline ?? 'HYBRIDE LÖSUNGEN FÜR *REALE SYSTEME*'
  const introText =
    intro ??
    'Viele Mittelstandsprobleme entstehen an der Schnittstelle von Hardware, Software, Prozessen und Menschen. Genau dort setzt die Co-Creation Challenge an.'
  const imageTitleText = imageTitle ?? 'Von Maschinen und Daten zu nutzbaren Lösungen.'
  const imageBodyText =
    imageBody ?? 'die nutzerorientiert und für Unternehmen tragfähig sind.'
  const imageSubtitleText = imageSubtitle ?? 'Gesucht werden Ideen,'

  return (
    <section className="relative z-10 px-6 py-20" id="hybride-loesungen">
      <div className="max-w-7xl mx-auto">
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
          className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5"
        >
          {/* Großes Bild links, spannt auf Desktop beide Reihen */}
          <StaggerItem direction="up" className="lg:col-span-1 lg:row-span-2">
            <div className="relative liquid-glass rounded-2xl overflow-hidden h-full min-h-[400px] lg:min-h-[500px]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Hybride Lösungen"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <ImagePlaceholder
                  alt="Hybride Lösungen"
                  fill
                  label="Sanity → Hybride Lösungen → Hauptbild"
                  className="h-full w-full"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight text-white mb-1 leading-tight">
                  {imageTitleText}
                </h3>
                {imageSubtitleText && (
                  <p className="text-base md:text-lg font-bold text-white/90 mb-2">
                    {imageSubtitleText}
                  </p>
                )}
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  {imageBodyText}
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* 4 Stichwort-Karten rechts (2×2 auf Desktop) */}
          {items.map((k, i) => (
            <StaggerItem key={i} direction="up">
              <div className="liquid-glass rounded-2xl p-6 md:p-7 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/50 hover:-translate-y-1">
                <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wide text-white mb-3 leading-tight">
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
