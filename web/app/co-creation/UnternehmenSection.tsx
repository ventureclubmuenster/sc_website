import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import ImagePlaceholder from './ImagePlaceholder'

interface Company {
  name?: string
  logoUrl?: string
  whiteBackground?: boolean
  challenge?: string
}

interface UnternehmenSectionProps {
  eyebrow?: string
  headline?: string
  intro?: string
  companies?: Company[]
}

function splitHeadline(headline: string) {
  const words = headline.split(' ')
  if (words.length <= 1) return { main: '', last: headline }
  return { main: words.slice(0, -1).join(' '), last: words[words.length - 1] }
}

export default function UnternehmenSection({
  eyebrow,
  headline,
  intro,
  companies,
}: UnternehmenSectionProps) {
  const eyebrowText = eyebrow ?? 'Unternehmen & Aufgaben'
  const headlineText = headline ?? 'UNTERNEHMEN UND AUFGABEN FOLGEN'
  const introText =
    intro ??
    'Die beteiligten Unternehmen und konkreten Challenges werden kuratiert. Sobald die Auswahl steht, erscheinen hier Logos, Kurzprofile und Challenge-Teaser.'

  const { main, last } = splitHeadline(headlineText)

  const slots: Company[] = [0, 1, 2].map((i) => companies?.[i] ?? {})

  return (
    <section className="relative z-10 px-6 py-20" id="unternehmen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-sm md:text-base tracking-wide text-white/60 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
            {eyebrowText}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-5 leading-tight">
            <span className="text-white">{main}{main && ' '}</span>
            <span className="gradient-text">{last}</span>
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            {introText}
          </p>
        </div>

        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {slots.map((c, i) => {
            const number = String(i + 1).padStart(2, '0')
            const isPlaceholder = !c.name && !c.logoUrl
            return (
              <StaggerItem key={i} direction="up">
                <div className="group liquid-glass rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/50 hover:-translate-y-1">
                  <div className="inline-flex self-start items-center gap-2 mb-5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.03]">
                    <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                    <span className="font-mono text-xs tracking-wider text-white/70">
                      {c.name ? c.name : `Unternehmen ${number}`}
                    </span>
                  </div>

                  <div
                    className={`relative w-full h-28 mb-5 rounded-xl overflow-hidden ${
                      c.whiteBackground ? 'bg-white' : ''
                    }`}
                  >
                    <ImagePlaceholder
                      src={c.logoUrl}
                      alt={c.name ?? `Unternehmen ${number} Logo`}
                      label={`Sanity → Co-Creation → Unternehmen → ${number} → Logo`}
                      fill
                      rounded="rounded-xl"
                      className={c.whiteBackground ? 'object-contain p-4' : 'object-contain p-4'}
                    />
                  </div>

                  <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wide text-white mb-2 leading-tight">
                    {isPlaceholder ? 'Challenge in Abstimmung' : c.challenge ? 'Challenge' : 'Challenge in Abstimmung'}
                  </h3>
                  <p className="text-white/65 text-sm md:text-base leading-relaxed flex-1">
                    {c.challenge ??
                      'Kurzer Teaser zur Problemstellung, Branche und gewünschten Perspektive folgt, sobald die Challenge final abgestimmt ist.'}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
