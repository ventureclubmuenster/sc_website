'use client'

import Image from 'next/image'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { urlFor } from '@/lib/sanity/image'

interface PreviewTopic {
  category: string
  title: string
  image?: unknown
}

interface WorkshopPreview2026Props {
  topics: PreviewTopic[]
}

const fallbackTopics: PreviewTopic[] = [
  { category: 'TECHNOLOGY', title: 'Generative AI für Effizienz' },
  { category: 'GROWTH', title: 'Scale-up Strategien für Startups' },
  { category: 'COMMUNITY', title: 'Karriere-Netzwerk strategisch aufbauen' },
  { category: 'IMPACT', title: 'Nachhaltiges Geschäftsmodell-Design' },
]

export default function WorkshopPreview2026({ topics }: WorkshopPreview2026Props) {
  const items = topics.length > 0 ? topics : fallbackTopics

  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Was dich <span className="text-sc-orange">dieses Jahr</span> erwartet
          </h2>
        </FadeIn>

        <FadeIn direction="up" duration={0.7} delay={0.15}>
          <p className="mt-6 text-center text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            Entdecke die Themen, die wir für dich vorbereiten. In intensiven Sessions lernst du,
            wie du neue Technologien und Strategien direkt in die Praxis umsetzt.
          </p>
        </FadeIn>

        <StaggerContainer stagger={0.1} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((topic) => (
            <StaggerItem key={topic.title} direction="up" distance={40}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-default">
                {/* Background image */}
                {topic.image ? (
                  <Image
                    src={urlFor(topic.image).width(800).height(600).auto('format').url()}
                    alt={topic.title}
                    fill
                    className="object-cover brightness-[0.35] group-hover:brightness-[0.5] transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#18181b] to-[#27272a]" />
                )}

                {/* Orange border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-sc-orange/40 group-hover:shadow-[inset_0_0_30px_rgba(255,94,0,0.08)] transition-all duration-500 z-10" />

                {/* Content overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  {/* Category badge */}
                  <span className="inline-block w-fit px-3 py-1 text-xs font-bold uppercase tracking-wider bg-sc-orange text-black rounded-md mb-4">
                    {topic.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">
                    {topic.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
