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
  { title: 'CO-CREATION', buttonText: 'Erfahre mehr', buttonLink: '/co-creation' },
  { title: 'WORKSHOPS', buttonText: 'Erfahre mehr', buttonLink: '/workshops' },
  { title: 'LIVE PODCAST', buttonText: 'Erfahre mehr', buttonLink: '/podcast' },
  { title: 'TALKS', buttonText: 'Erfahre mehr', buttonLink: '/main-stage' },
  { title: 'INNOVATION VILLAGE', buttonText: 'Erfahre mehr', buttonLink: '/innovation-village', wide: true },
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
              <span className="text-sc-orange">FORMATE</span>
            </>
          )}
        </h2>

        <BentoGrid items={displayItems} />
      </div>
    </section>
  )
}
