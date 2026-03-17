import { client } from '@/lib/sanity/client'
import { studierendePageQuery, exhibitors2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'
import FeatureCards from './FeatureCards'
import ExhibitorCarousel from './ExhibitorCarousel'
import ProgramCards from './ProgramCards'

interface FeatureCard {
  title: string
  hoverText: string
  image?: { asset: { _ref: string } }
}

interface ProgramCard {
  title: string
  buttonText: string
  buttonLink: string
  image?: { asset: { _ref: string } }
}

interface Exhibitor {
  _id: string
  name: string
  logo?: { asset: { _ref: string } }
}

interface TalentePageData {
  heroImage?: { asset: { _ref: string } }
  heroHeadline?: string
  heroSubtext?: string
  heroHighlight?: string
  featureCards?: FeatureCard[]
  programCards?: ProgramCard[]
}

async function getPageData(): Promise<TalentePageData | null> {
  return client.fetch(studierendePageQuery, {}, { cache: 'no-store' })
}

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

const defaultProgramCards: ProgramCard[] = [
  { title: 'WORKSHOPS', buttonText: 'Erfahre mehr', buttonLink: '/workshops' },
  { title: 'AFTERPARTY', buttonText: 'Erfahre mehr', buttonLink: '/afterparty' },
  { title: 'FOUNDER MATCHING', buttonText: 'Erfahre mehr', buttonLink: '/founder-matching' },
]

const defaultCards: FeatureCard[] = [
  { title: 'COMMUNITY', hoverText: 'Egal, ob du schon länger dabei bist oder ganz neu einsteigst – auf der Startup Contacts triffst du Gleichgesinnte, mit denen du gemeinsam in die Welt der Startups eintauchen kannst.' },
  { title: 'EXPERIENCE', hoverText: '' },
  { title: 'KNOWLEDGE', hoverText: '' },
  { title: 'INSPIRATION', hoverText: '' },
]

export default async function TalentePage() {
  const [data, exhibitors] = await Promise.all([getPageData(), getExhibitors()])

  const headline = data?.heroHeadline || 'TALENTE AUFGEPASST'
  const subtext = data?.heroSubtext || 'Die Chance den Arbeitgeber von morgen zu finden'
  const highlight = data?.heroHighlight || '30+ Startups und Unternehmen'
  const cards = data?.featureCards?.length ? data.featureCards : defaultCards
  const programCards = data?.programCards?.length ? data.programCards : defaultProgramCards

  // Pre-build image URLs on the server
  const cardsWithUrls = cards.map((card) => ({
    title: card.title,
    hoverText: card.hoverText,
    imageUrl: card.image ? urlFor(card.image).width(800).height(600).url() : undefined,
  }))

  const programCardsWithUrls = programCards.map((card) => ({
    title: card.title,
    buttonText: card.buttonText,
    buttonLink: card.buttonLink,
    imageUrl: card.image ? urlFor(card.image).width(800).height(600).url() : undefined,
  }))

  // Split headline into two lines at space for stacked layout
  const headlineParts = headline.split(' ')
  const topLine = headlineParts.slice(0, Math.ceil(headlineParts.length / 2)).join(' ')
  const bottomLine = headlineParts.slice(Math.ceil(headlineParts.length / 2)).join(' ')

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {data?.heroImage ? (
          <Image
            src={urlFor(data.heroImage).width(1920).height(1080).url()}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' }}
          >
            <span className="text-white block">{topLine}</span>
            <span className="text-sc-orange block">{bottomLine}</span>
          </h1>

          <p className="text-white/80 text-sm md:text-base mt-6 max-w-xl mx-auto">
            {subtext}
          </p>

          <p className="text-sc-orange text-sm md:text-base font-bold mt-1">
            {highlight}
          </p>
        </div>
      </section>

      {/* Was dich erwartet */}
      <section id="was-erwartet" className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
            <span className="text-sc-orange">WAS </span>
            <span className="text-white">DICH ERWARTET</span>
          </h2>

          <FeatureCards cards={cardsWithUrls} />
        </div>
      </section>

      {/* Wer zuletzt dabei war */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
            <span className="text-white">WER </span>
            <span className="text-sc-orange">ZULETZT </span>
            <span className="text-white">DABEI WAR</span>
          </h2>

          <ExhibitorCarousel
            exhibitors={exhibitors.map((ex) => ({
              _id: ex._id,
              name: ex.name,
              logoUrl: ex.logo ? urlFor(ex.logo).width(400).height(200).url() : undefined,
            }))}
          />

          <div className="flex justify-center mt-10">
            <a
              href="/innovation-village#aussteller"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-sm px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Alle Aussteller &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Unser Programm für dich */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
            <span className="text-white">UNSER </span>
            <span className="text-sc-orange">PROGRAMM </span>
            <span className="text-white">FÜR DICH</span>
          </h2>

          <ProgramCards cards={programCardsWithUrls} />
        </div>
      </section>
    </>
  )
}
