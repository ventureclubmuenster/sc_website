'use client'

import { useState } from 'react'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'

const cards = [
  {
    title: 'DEAL FLOW',
    subtitle: 'Kuratierte Startups aus 6 Fokusfeldern',
    description:
      'Kein Rauschen, nur Relevanz. Wir bringen Sie mit Startups zusammen, die zu Ihrer Investmentstrategie passen — von Deep Tech bis Lifestyle.',
    icon: '📊',
  },
  {
    title: 'NETZWERK',
    subtitle: 'Co-Investoren & Corporate Partners',
    description:
      'Treffen Sie andere Investoren, Business Angels und Corporates in einem exklusiven Rahmen. Neue Syndikate entstehen hier.',
    icon: '🤝',
  },
  {
    title: 'STANDORT',
    subtitle: 'Münster — Top 5 Gründungsstandort',
    description:
      'Die Region gehört zu den dynamischsten Startup-Ökosystemen Deutschlands. Entdecken Sie Potenziale, bevor sie auf dem Radar der Masse landen.',
    icon: '📍',
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
            <span className="text-sc-orange">STARTUP CONTACTS?</span>
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
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-white/[0.06] cursor-pointer"
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
              Deal Flow <span className="text-sc-orange">×</span> Netzwerk <span className="text-sc-orange">×</span> Exklusivität
            </p>
            <p className="text-white/70 text-lg md:text-2xl font-semibold mt-4">
              = Ihr Vorteil als Investor bei Startup Contacts
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
