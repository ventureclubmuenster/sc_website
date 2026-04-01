import BentoGrid from './BentoGrid'

interface FormatItem {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageUrl?: string
  wide?: boolean
}

const defaultItems: FormatItem[] = [
  { title: 'CO-CREATION', description: 'Arbeite gemeinsam mit Startups und Unternehmen an echten Herausforderungen', buttonText: 'Erfahre mehr', buttonLink: '/co-creation' },
  { title: 'WORKSHOPS', description: 'Hands-on Sessions zu KI, Karriere, Gründung und mehr', buttonText: 'Erfahre mehr', buttonLink: '/workshops' },
  { title: 'LIVE PODCAST', description: 'Gründungsgeschichten und Persönlichkeiten hautnah im Studio', buttonText: 'Erfahre mehr', buttonLink: '/podcast' },
  { title: 'TALKS', description: 'Keynotes, Panels und Fireside Chats auf der Main Stage', buttonText: 'Erfahre mehr', buttonLink: '/main-stage' },
  { title: 'INNOVATION VILLAGE', description: 'Über 30 Aussteller zeigen ihre Innovationen an einem Ort', buttonText: 'Erfahre mehr', buttonLink: '/innovation-village', wide: true },
]

interface FormatSectionProps {
  heading?: React.ReactNode
  items?: FormatItem[]
}

export default function FormatSection({ heading, items }: FormatSectionProps) {
  const displayItems = items?.length ? items : defaultItems

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
          {heading ?? (
            <>
              <span className="text-white">UNSERE </span>
              <span className="gradient-text">FORMATE</span>
            </>
          )}
        </h2>

        <BentoGrid items={displayItems} />
      </div>
    </section>
  )
}
