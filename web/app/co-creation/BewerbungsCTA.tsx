import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import BewerbungButton from './BewerbungButton'

interface CtaSideImage {
  imageUrl?: string
  caption?: string
}

interface BewerbungsCTAProps {
  headline?: string
  text?: string
  bewerbungsUrl?: string
  backgroundImageUrl?: string
  sideImages?: CtaSideImage[]
}

// Positions and float-animation classes for up to 4 polaroid-cards in the corners
const polaroidLayout = [
  { wrapper: 'absolute top-8 left-4 md:top-12 md:left-12 lg:left-20 hidden md:block', anim: 'cta-float-a' },
  { wrapper: 'absolute top-12 right-4 md:top-20 md:right-12 lg:right-24 hidden md:block', anim: 'cta-float-b' },
  { wrapper: 'absolute bottom-12 left-6 md:bottom-20 md:left-20 lg:left-32 hidden md:block', anim: 'cta-float-c' },
  { wrapper: 'absolute bottom-8 right-6 md:bottom-16 md:right-20 lg:right-32 hidden md:block', anim: 'cta-float-d' },
]

export default function BewerbungsCTA({
  headline,
  text,
  bewerbungsUrl,
  backgroundImageUrl,
  sideImages,
}: BewerbungsCTAProps) {
  const finalHeadline = headline ?? 'BEREIT MITZUMACHEN?'
  const finalText =
    text ??
    '30 Plätze für Studierende und Young Professionals. Die Bewerbung ist unkompliziert und formlos. Begrenzte Plätze · Bewerbung bis 11.06. um 18 Uhr möglich.'

  // Split headline: last word in gradient
  const words = finalHeadline.split(' ')
  const mainText = words.slice(0, -1).join(' ')
  const orangeWord = words[words.length - 1]

  const polaroids = (sideImages ?? []).slice(0, 4)

  return (
    <section className="relative py-32 md:py-40 px-6 overflow-hidden" id="bewerbung">
      {/* Top and bottom black fade — same pattern as Networking Together */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt="Bewerbungs-Hintergrund"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority={false}
        />
      )}

      {/* Decorative floating polaroids — only visible on md+ to avoid mobile clutter */}
      {polaroids.map((p, i) => {
        const layout = polaroidLayout[i]
        if (!layout || !p.imageUrl) return null
        return (
          <div key={i} className={layout.wrapper}>
            <div className={`relative ${layout.anim}`}>
              <div className="bg-white p-2 pb-8 shadow-2xl rounded-sm w-32 lg:w-40">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.imageUrl}
                    alt={p.caption ?? 'CTA Bild'}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                {p.caption && (
                  <p className="mt-2 text-center text-black text-xs font-mono leading-tight">
                    {p.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <FadeIn direction="up" duration={0.8} distance={30}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight mb-6">
            <span className="text-white">{mainText} </span>
            <span className="gradient-text">{orangeWord}</span>
          </h2>

          <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {finalText}
          </p>

          {/* The button itself sits inside FadeIn, with its own glow handled by GlowButton */}
          <div className="flex justify-center">
            <BewerbungButton href={bewerbungsUrl} large />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
