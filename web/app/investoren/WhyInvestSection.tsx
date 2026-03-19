'use client'

import { useState } from 'react'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'

const cards = [
  {
    title: 'TALENTE',
    subtitle: 'Der Nachwuchs von morgen',
    description:
      'Münster als einer der stärksten Studierendenstandorte Deutschlands liefert ambitionierte Köpfe, die frische Perspektiven in junge Unternehmen einbringen.',
    icon: '🎓',
  },
  {
    title: 'UNTERNEHMEN',
    subtitle: 'Etablierte Player teilen ihre Probleme',
    description:
      'Corporates kommen mit konkreten Herausforderungen. Erkennen Sie frühzeitig, welche Branchen Innovationsbedarf haben und wo Investitionen Wirkung zeigen.',
    icon: '🏢',
  },
  {
    title: 'STARTUPS',
    subtitle: 'Moderne Lösungen für reale Probleme',
    description:
      'Treffen Sie Gründerteams, die mit innovativen Ansätzen genau die Lücken schließen, die der Markt braucht. Erleben Sie, warum Münster eine von Deutschlands Top-5-Gründungshochschulen ist.',
    icon: '🚀',
  },
]

export default function WhyInvestSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
            <span className="text-white">WARUM </span>
            <span className="gradient-text">STARTUP CONTACTS?</span>
          </h2>
          <p className="text-white/60 text-center text-base md:text-lg max-w-2xl mx-auto mb-14">
            Ein Tag. Ein Ort. Maximaler Zugang zu den innovativsten Gründern der Region.
          </p>
        </FadeIn>

        <StaggerContainer stagger={0.12} className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const isActive = activeIndex === i

            return (
              <StaggerItem key={i} direction="up" distance={40}>
                <div
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-white/[0.06] cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <span className="text-4xl mb-4 block">{card.icon}</span>

                  <h3 className="text-sc-orange text-xl md:text-2xl font-extrabold uppercase tracking-wide mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-sm font-medium mb-4">
                    {card.subtitle}
                  </p>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  <div
                    className="absolute bottom-0 left-0 h-[3px] bg-sc-orange rounded-b-2xl transition-all duration-500 ease-out"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.1}>
          <div className="mt-16 md:mt-20 text-center">
            <p className="text-white text-2xl md:text-4xl font-extrabold tracking-tight">
              Talente <span className="text-sc-orange">×</span> Unternehmen <span className="text-sc-orange">×</span> Startups
            </p>
            <p className="text-white/70 text-lg md:text-2xl font-semibold mt-4">
              = wo Probleme auf Lösungen treffen
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
