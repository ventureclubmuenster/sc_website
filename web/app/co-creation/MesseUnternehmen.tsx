'use client'

import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { renderHeadline } from './headlineFormat'
import WatermarkBackground from './WatermarkBackground'

interface MesseUnternehmenItem {
  name: string
  bereich?: string
  logoUrl?: string
  logoWhiteBg?: boolean
  link?: string
}

interface MesseUnternehmenProps {
  headline?: string
  intro?: string
  items?: MesseUnternehmenItem[]
}

const defaultItems: MesseUnternehmenItem[] = [
  { name: 'Mustermann Maschinenbau GmbH', bereich: 'Maschinenbau & Produktion' },
  { name: 'TechFlow Solutions', bereich: 'Software & Tech' },
  { name: 'BauHandwerk Westfalen', bereich: 'Handwerk' },
]

function getInitials(name: string): string {
  const words = name
    .replace(/[^A-Za-zÄÖÜäöüß\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
  if (words.length === 0) return '·'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

export default function MesseUnternehmen({ headline, intro, items }: MesseUnternehmenProps) {
  const list = items?.length ? items : defaultItems
  const headlineText = headline ?? 'AUSSTELLENDE *UNTERNEHMEN*'
  const introText =
    intro ??
    'Eine vielfältige Auswahl innovativer Unternehmen aus unterschiedlichen Branchen, von Handwerk und Produktion bis hin zu Tech und Services. Jedes Unternehmen bringt seine eigenen, realen Herausforderungen mit.'

  return (
    <section className="relative z-10 px-6 pt-20 pb-32 md:pb-40 overflow-hidden" id="messe-unternehmen">
      <WatermarkBackground opacityClass="text-white/[0.06]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4 leading-tight">
          {renderHeadline(headlineText)}
        </h2>
        <p className="text-white/60 text-center max-w-3xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
          {introText.replace(/Herausforderungen mit\./g, 'Herausforderungen mit.')}
        </p>

        <StaggerContainer
          stagger={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {list.map((c, i) => (
            <StaggerItem key={i} direction="up">
              <div className="group relative bg-[#18181b] border border-white/5 rounded-2xl p-6 md:p-7 hover:border-sc-orange/70 transition-colors duration-500 h-full flex flex-col items-center text-center overflow-hidden">
                {(() => {
                  const logoBox = (
                    <div
                      className={`${c.logoWhiteBg ? 'bg-white' : 'bg-white/10'} rounded-xl p-1 inline-flex items-center justify-center w-full aspect-[3/2] ${c.link ? 'transition-transform duration-300 group-hover/logo:scale-[1.03]' : ''}`}
                    >
                      {c.logoUrl ? (
                        <Image
                          src={c.logoUrl}
                          alt={`${c.name} Logo`}
                          width={480}
                          height={320}
                          className="max-h-full max-w-full w-auto h-auto object-contain"
                        />
                      ) : (
                        <span
                          className={`text-7xl md:text-8xl font-extrabold tracking-wide ${
                            c.logoWhiteBg ? 'text-zinc-700' : 'text-white/80'
                          }`}
                        >
                          {getInitials(c.name)}
                        </span>
                      )}
                    </div>
                  )

                  return c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.name} Website öffnen (neuer Tab)`}
                      className="group/logo relative z-10 block w-full mb-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sc-orange/70 rounded-xl"
                    >
                      {logoBox}
                    </a>
                  ) : (
                    <div className="relative z-10 w-full mb-6">{logoBox}</div>
                  )
                })()}

                <h3 className="relative z-10 text-lg md:text-xl font-semibold uppercase tracking-wide gradient-text">
                  {c.name}
                </h3>
                {c.bereich && (
                  <p className="relative z-10 mt-2 text-sm font-light text-white/60 leading-relaxed">
                    {c.bereich}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
