'use client'

import { useState } from 'react'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'

const kombiCards = [
  {
    title: 'STARTUPS',
    subtitle: 'Die Arbeitgeber der Zukunft',
    description:
      'Lerne Gründerteams kennen, die mit den Lösungen von morgen ganze Branchen verändern. Egal ob du ein Praktikum, eine Werkstudentenstelle oder eine Festanstellung suchst, hier wirst du fündig.',
    icon: '🚀',
  },
  {
    title: 'UNTERNEHMEN',
    subtitle: 'Innovationstreiber der Branche',
    description:
      'Triff etablierte Unternehmen, die ihre Branchen aktiv vorantreiben und auf Innovation setzen. Entdecke spannende Karrierewege in den verschiedensten Branchen und Unternehmensgrößen.',
    icon: '🏢',
  },
]

export default function KombinationSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
            <span className="text-white">EINE EINMALIGE </span>
            <span className="text-sc-orange">KOMBINATION</span>
          </h2>
          <p className="text-white/60 text-center text-base md:text-lg max-w-2xl mx-auto mb-14">
            Startup Contacts bringt zusammen, was zusammen gehört, an einem einzigen Tag, unter einem Dach.
          </p>
        </FadeIn>

        <StaggerContainer stagger={0.15} className="grid md:grid-cols-2 gap-6">
          {kombiCards.map((card, i) => {
            const isActive = activeIndex === i

            return (
              <StaggerItem
                key={i}
                direction={i === 0 ? 'left' : 'right'}
                distance={50}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-sc-orange/40 hover:bg-white/[0.06] cursor-pointer"
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
              Startups <span className="text-sc-orange">×</span> Unternehmen <span className="text-sc-orange">×</span> Dein Talent
            </p>
            <p className="text-white/70 text-lg md:text-2xl font-semibold mt-4">
              = dein Sprungbrett in die Karriere von morgen
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
