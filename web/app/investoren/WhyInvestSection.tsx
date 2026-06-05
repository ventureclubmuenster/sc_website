'use client'

import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface Card {
  title?: string
  subtitle?: string
  description?: string
}

interface WhyInvestSectionProps {
  headingWhite?: string
  headingOrange?: string
  intro?: string
  cards?: Card[]
  taglineParts?: string[]
  taglineResult?: string
}

const defaultCards: Card[] = [
  {
    title: 'TALENTE',
    subtitle: 'Der Nachwuchs von morgen',
    description:
      'Münster als einer der stärksten Studierendenstandorte Deutschlands liefert ambitionierte Köpfe, die frische Perspektiven in junge Unternehmen einbringen.',
  },
  {
    title: 'UNTERNEHMEN',
    subtitle: 'Etablierte Player teilen ihre Probleme',
    description:
      'Corporates kommen mit konkreten Herausforderungen. Erkennen Sie frühzeitig, welche Branchen Innovationsbedarf haben und wo Investitionen Wirkung zeigen.',
  },
  {
    title: 'STARTUPS',
    subtitle: 'Moderne Lösungen für reale Probleme',
    description:
      'Treffen Sie Gründerteams, die mit innovativen Ansätzen genau die Lücken schließen, die der Markt braucht. Erleben Sie, warum Münster eine von Deutschlands Top-5-Gründungshochschulen ist.',
  },
]

const defaultTaglineParts = ['Talente', 'Unternehmen', 'Startups']

export default function WhyInvestSection({
  headingWhite,
  headingOrange,
  intro,
  cards,
  taglineParts,
  taglineResult,
}: WhyInvestSectionProps) {
  const tagline = taglineParts?.length ? taglineParts : defaultTaglineParts
  const cardList = cards?.length ? cards : defaultCards
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
            <span className="text-white">{headingWhite || 'WARUM'} </span>
            <span className="gradient-text">{headingOrange || 'STARTUP CONTACTS?'}</span>
          </h2>
          <p className="text-white/60 text-center text-base md:text-lg max-w-2xl mx-auto mb-14">
            {intro || 'Ein Tag. Ein Ort. Maximaler Zugang zu den innovativsten Gründern der Region.'}
          </p>
        </FadeIn>

        <StaggerContainer stagger={0.12} className="grid md:grid-cols-3 gap-6">
          {cardList.map((card, i) => (
            <StaggerItem key={i} direction="up" distance={40}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-8 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/40 cursor-pointer">
                <h3 className="text-sc-orange text-xl md:text-2xl font-extrabold uppercase tracking-wide mb-1">
                  {card.title}
                </h3>
                <p className="text-white/70 text-sm font-medium mb-4">
                  {card.subtitle}
                </p>

                <p className="text-white/60 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.1}>
          <div className="mt-16 md:mt-20 text-center">
            <p className="text-white text-2xl md:text-4xl font-extrabold tracking-tight">
              {tagline.map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-sc-orange"> × </span>}
                  {part}
                </span>
              ))}
            </p>
            <p className="text-white/70 text-lg md:text-2xl font-semibold mt-4">
              {taglineResult || '= wo Probleme auf Lösungen treffen'}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
