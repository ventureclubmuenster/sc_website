import { client } from '@/lib/sanity/client'
import { studierendePageQuery, exhibitors2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import KombinationSection from './KombinationSection'
import FeatureCards from './FeatureCards'
import ExhibitorGrid from '../startups/ExhibitorGrid'
import ProgramCards from './ProgramCards'
import BentoGrid from '@/components/BentoGrid'

interface FeatureCard {
  title: string
  subheader?: string
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
  whiteLogo?: { asset: { _ref: string } }
  whiteBackground?: boolean
}

interface ImageField {
  asset: { _ref: string }
}

interface BentoItem {
  title: string
  buttonText?: string
  buttonLink?: string
  image?: ImageField
}

interface TalentePageData {
  heroImage?: ImageField
  heroHeadline?: string
  heroSubtext?: string
  heroHighlight?: string
  featureCards?: FeatureCard[]
  bentoItems?: BentoItem[]
  programCards?: ProgramCard[]
}

async function getPageData(): Promise<TalentePageData | null> {
  return client.fetch(studierendePageQuery, {}, { cache: 'no-store' })
}

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

const defaultBentoItems: BentoItem[] = [
  { title: 'CO-CREATION', buttonText: 'Erfahre mehr', buttonLink: '/co-creation' },
  { title: 'WORKSHOPS', buttonText: 'Erfahre mehr', buttonLink: '/workshops' },
  { title: 'LIVE-PODCASTS', buttonText: 'Erfahre mehr', buttonLink: '/podcasts' },
  { title: 'INSPIRATION', buttonText: 'Erfahre mehr', buttonLink: '/innovation-village' },
  { title: 'TALKS', buttonText: 'Erfahre mehr', buttonLink: '/main-stage' },
  { title: 'PERKS' },
  { title: 'AFTERPARTY' },
]

const defaultProgramCards: ProgramCard[] = [
  { title: 'WORKSHOPS', buttonText: 'Erfahre mehr', buttonLink: '/workshops' },
  { title: 'AFTERPARTY', buttonText: 'Erfahre mehr', buttonLink: '/afterparty' },
  { title: 'FOUNDER MATCHING', buttonText: 'Erfahre mehr', buttonLink: '/founder-matching' },
]

const defaultCards: FeatureCard[] = [
  { title: 'CO-CREATION', subheader: 'Echte Probleme. Deine Lösungen.', hoverText: 'Arbeite in der Co-Creation mit regionalen Startups an den Herausforderungen von morgen.' },
  { title: 'WORKSHOPS', subheader: 'Skill-up statt Frontalbeschallung.', hoverText: 'Hands-on Workshops, die dich wirklich weiterbringen. Von Tech-Trends bis Founder-Skills.' },
  { title: 'MISSION', subheader: 'Eintauchen in die Szene.', hoverText: 'Finde deinen Job, dein Praktikum oder dein Team. Networking ohne steifen Dresscode.' },
  { title: 'INSPIRATION', subheader: 'Insights aus erster Hand.', hoverText: 'Mainstage-Talks und Live-Podcasts mit den Machern aus der Region.' },
]

export default async function TalentePage() {
  const [data, exhibitors] = await Promise.all([getPageData(), getExhibitors()])

  const headline = data?.heroHeadline || 'GESTALTE DIE LÖSUNGEN VON MORGEN'
  const subtext = data?.heroSubtext || 'Die Chance den Arbeitgeber von morgen zu finden'
  const highlight = data?.heroHighlight || '30+ Startups und Unternehmen'
  const cards = data?.featureCards?.length ? data.featureCards : defaultCards
  const programCards = data?.programCards?.length ? data.programCards : defaultProgramCards

  // Pre-build image URLs on the server
  const cardsWithUrls = cards.map((card) => ({
    title: card.title,
    subheader: card.subheader,
    hoverText: card.hoverText,
    imageUrl: card.image ? urlFor(card.image).width(800).height(600).url() : undefined,
  }))

  const bentoItems = data?.bentoItems?.length ? data.bentoItems : defaultBentoItems
  const bentoWithUrls = bentoItems.map((b) => ({
    title: b.title,
    buttonText: b.buttonText,
    buttonLink: b.buttonLink,
    imageUrl: b.image ? urlFor(b.image).width(800).height(600).url() : undefined,
  }))

  const programCardsWithUrls = programCards.map((card) => ({
    title: card.title,
    buttonText: card.buttonText,
    buttonLink: card.buttonLink,
    imageUrl: card.image ? urlFor(card.image).width(800).height(600).url() : undefined,
  }))

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline={headline}
        subtext={subtext}
        highlight={highlight}
      />

      {/* Content sections with watermark background */}
      <div className="relative bg-black overflow-hidden">
        {/* Repeating "Startup Contacts" watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.04] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
            </span>
          ))}
        </div>

        {/* Spacer between hero and Kombination */}
        <div className="h-20 md:h-32" />

        {/* Einmalige Kombination */}
        <KombinationSection />

        {/* Was dich erwartet – temporarily hidden
        <section id="was-erwartet" className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="gradient-text">WAS </span>
              <span className="text-white">DICH ERWARTET</span>
            </h2>

            <FeatureCards cards={cardsWithUrls} />
          </div>
        </section>
        */}

        {/* Mehr als eine Messe */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">MEHR ALS EINE </span>
              <span className="gradient-text">MESSE</span>
            </h2>

            <BentoGrid items={bentoWithUrls} />
          </div>
        </section>

        {/* Unser Programm für dich – temporarily hidden
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">UNSER </span>
              <span className="gradient-text">PROGRAMM </span>
              <span className="text-white">FÜR DICH</span>
            </h2>

            <ProgramCards cards={programCardsWithUrls} />
          </div>
        </section>
        */}

        {/* Wer zuletzt dabei war */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">WER </span>
              <span className="gradient-text">ZULETZT </span>
              <span className="text-white">DABEI WAR</span>
            </h2>

            <ExhibitorGrid
              exhibitors={exhibitors.map((ex) => ({
                _id: ex._id,
                name: ex.name,
                logoUrl: ex.logo ? urlFor(ex.logo).width(600).fit('max').url() : undefined,
                whiteLogoUrl: ex.whiteLogo ? urlFor(ex.whiteLogo).width(600).fit('max').url() : undefined,
                whiteBackground: ex.whiteBackground ?? false,
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
      </div>
    </>
  )
}
