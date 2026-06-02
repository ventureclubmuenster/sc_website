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
  const headlineText = headline ?? 'DIE *CHALLENGE GEBER*'
  const introText =
    intro ?? 'Die genauen Challenges werden den Teilnehmern zum Start mitgeteilt.'

  return (
    <section className="relative z-10 px-6 pt-20 pb-32 md:pb-40 overflow-hidden" id="messe-unternehmen">
      <WatermarkBackground opacityClass="text-white/[0.06]" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4 leading-tight">
          {renderHeadline(headlineText)}
        </h2>
        <p className="text-white/70 text-center max-w-3xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
          {introText}
        </p>

        <StaggerContainer
          stagger={0.12}
          className="grid grid-cols-1 gap-4 md:gap-5"
        >
          {list.map((c, i) => (
            <StaggerItem key={i} direction="up">
              <div className="group relative bg-[#4a2410] border border-white/5 rounded-2xl p-5 md:p-6 hover:border-sc-orange/70 transition-colors duration-500 overflow-hidden">
                {/* Logo links + Name/Branche-Pill ganz rechts */}
                <div className="relative z-10 flex items-center gap-4 mb-4">
                  {(() => {
                    const isWestfalen = c.name?.toLowerCase().includes('westfalen')
                    const logoEl =
                      isWestfalen && c.logoUrl ? (
                        <div
                          role="img"
                          aria-label={`${c.name} Logo`}
                          className={`h-14 md:h-24 w-28 md:w-56 bg-no-repeat bg-cover bg-center ${c.link ? 'transition-transform duration-300 group-hover/logo:scale-[1.03]' : ''}`}
                          style={{ backgroundImage: `url(${c.logoUrl})` }}
                        />
                      ) : c.logoUrl ? (
                        <Image
                          src={c.logoUrl}
                          alt={`${c.name} Logo`}
                          width={520}
                          height={240}
                          className={`h-20 md:h-24 w-auto max-w-[55%] object-contain ${c.link ? 'transition-transform duration-300 group-hover/logo:scale-[1.03]' : ''}`}
                        />
                      ) : (
                        <span className="text-3xl md:text-4xl font-extrabold tracking-wide text-white/80">
                          {getInitials(c.name)}
                        </span>
                      )

                    return c.link ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${c.name} Website öffnen (neuer Tab)`}
                        className="group/logo inline-flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sc-orange/70 rounded-md"
                      >
                        {logoEl}
                      </a>
                    ) : (
                      <div className="inline-flex">{logoEl}</div>
                    )
                  })()}

                  {c.name && (
                    <span className="ml-auto px-3 py-1.5 rounded-full bg-white/10 font-mono text-sm md:text-base font-bold tracking-wider gradient-text whitespace-nowrap">
                      {c.name}
                    </span>
                  )}
                </div>

                {c.bereich && (
                  <p className="relative z-10 text-white/75 text-sm md:text-base leading-relaxed uppercase font-medium tracking-wide">
                    {c.bereich}
                  </p>
                )}

                {/* Partner der EW Group: ADI Solutions */}
                {(() => {
                  const isEwGroup = c.name
                    ?.toLowerCase()
                    .replace(/[-_]/g, ' ')
                    .includes('ew group')
                  if (!isEwGroup) return null
                  return (
                    <div className="relative z-10 mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 md:gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="text-white/75 text-sm md:text-base font-medium tracking-wide whitespace-nowrap">
                          Partner der EW Group:
                        </span>
                        <span className="inline-flex items-center rounded-md bg-gray-400 px-3 py-2">
                          <Image
                            src="/logos/adi-solutions.png"
                            alt="ADI Solutions Logo"
                            width={520}
                            height={120}
                            className="h-6 md:h-8 w-auto object-contain"
                          />
                        </span>
                      </div>
                      <span className="-ml-3 px-3 py-1.5 rounded-full bg-white/10 font-mono text-sm md:text-base font-bold tracking-wider gradient-text whitespace-nowrap">
                        ADI Solutions: Software
                      </span>
                    </div>
                  )
                })()}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
