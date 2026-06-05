'use client'

import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface KombiCard {
  title?: string
  subtitle?: string
  description?: string
}

interface KombinationSectionProps {
  headingWhite?: string
  headingOrange?: string
  intro?: string
  cards?: KombiCard[]
  taglineParts?: string[]
  taglineResult?: string
}

const defaultCards: KombiCard[] = [
  {
    title: 'TALENTE',
    subtitle: 'Kontakt zu Studierenden',
    description:
      'Gewinnt motivierte Talente, die eure Vision teilen. Ob Praktikum, Werkstudentenstelle oder Festanstellung, hier trefft ihr die Macher von morgen.',
  },
  {
    title: 'UNTERNEHMEN',
    subtitle: 'Kontakt zu innovationssuchenden Unternehmen',
    description:
      'Corporates suchen aktiv nach Startup-Lösungen. Nutzt die Chance, eure Innovation direkt den Entscheidern zu pitchen und strategische Partnerschaften aufzubauen.',
  },
]

const defaultTaglineParts = ['Talente', 'Corporates', 'Euer Startup']

export default function KombinationSection({
  headingWhite,
  headingOrange,
  intro,
  cards,
  taglineParts,
  taglineResult,
}: KombinationSectionProps) {
  const cardList = cards?.length ? cards : defaultCards
  const tagline = taglineParts?.length ? taglineParts : defaultTaglineParts
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
            <span className="text-white">{headingWhite || 'EINE EINMALIGE'} </span>
            <span className="gradient-text">{headingOrange || 'KOMBINATION'}</span>
          </h2>
          <p className="text-white/60 text-center text-base md:text-lg max-w-2xl mx-auto mb-14">
            {intro || 'Startup Contacts bringt zusammen, was zusammen gehört, an einem einzigen Tag, unter einem Dach.'}
          </p>
        </FadeIn>

        {/* Two cards */}
        <StaggerContainer stagger={0.15} className="grid md:grid-cols-2 gap-6">
          {cardList.map((card, i) => (
            <StaggerItem
              key={i}
              direction={i === 0 ? 'left' : 'right'}
              distance={50}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-8 h-full transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/40 cursor-pointer">
                {/* Title */}
                <h3 className="text-sc-orange text-xl md:text-2xl font-extrabold uppercase tracking-wide mb-1">
                  {card.title}
                </h3>
                <p className="text-white/70 text-sm font-medium mb-4">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Connecting tagline */}
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
              {taglineResult || '= maximale Reichweite für eure Innovation'}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
