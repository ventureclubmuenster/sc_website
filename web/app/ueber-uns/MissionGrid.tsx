'use client'

import Image from 'next/image'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { urlFor } from '@/lib/sanity/image'

interface MissionCard {
  title: string
  hoverText?: string
  image?: unknown
}

interface MissionGridProps {
  cards: MissionCard[]
}

const fallbackCards: MissionCard[] = [
  { title: 'WER WIR SIND', hoverText: 'Der Venture Club Münster, kurz VCM, ist die größte studentische Initiative im Bereich Startup und Entrepreneurship in Münster.' },
  { title: 'WAS WIR MACHEN', hoverText: 'Wir organisieren Events, Workshops und die größte von Studierenden organisierte Startup-Messe in NRW.' },
  { title: 'UNSER WARUM', hoverText: 'Wir glauben, dass Innovation dort entsteht, wo die Kreativität junger Köpfe auf die Erfahrung aus der Praxis trifft.' },
  { title: 'UNSER WIE', hoverText: 'Durch studentisches Engagement, starke Partnerschaften und den Mut, groß zu denken.' },
]

export default function MissionGrid({ cards }: MissionGridProps) {
  const items = cards.length > 0 ? cards : fallbackCards

  return (
    <section className="relative py-28 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Der <span className="gradient-text">Venture Club Münster</span>
          </h2>
        </FadeIn>

        <StaggerContainer stagger={0.1} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((card, i) => (
            <StaggerItem key={card.title + i} direction="up" distance={30}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[16/9] cursor-default">
                {/* Background image — goes grayscale on hover */}
                {card.image ? (
                  <Image
                    src={urlFor(card.image).width(900).height(500).auto('format').url()}
                    alt={card.title}
                    fill
                    className="object-cover brightness-[0.4] group-hover:brightness-[0.3] group-hover:grayscale group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#111]" />
                )}

                {/* Default state: centered title */}
                <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                  <h3
                    className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white text-center px-6"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Hover state: text from bottom */}
                {card.hoverText && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 md:p-8">
                    <p
                      className="text-white text-sm md:text-base font-bold leading-relaxed text-center"
                      style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
                    >
                      {card.hoverText}
                    </p>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.4} duration={0.6}>
          <div className="mt-10 flex justify-center">
            <a
              href="https://ventureclub-muenster.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full text-white/80 hover:border-sc-orange hover:text-white transition-colors duration-300"
            >
              Erfahre mehr
              <span className="text-lg">&rarr;</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
