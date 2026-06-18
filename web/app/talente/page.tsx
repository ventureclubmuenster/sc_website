import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talente',
  description:
    'Talente & Studierende aufgepasst: Entdecke Startups und Unternehmen als potenzielle Arbeitgeber auf der Startup Contacts Münster. 8. Juni 2027.',
  alternates: { canonical: 'https://www.startup-contacts.de/talente' },
  openGraph: {
    title: 'Talente | Startup Contacts',
    description: 'Entdecke Startups und Unternehmen als potenzielle Arbeitgeber auf der Startup Contacts Münster.',
    url: 'https://www.startup-contacts.de/talente',
  },
}

import { client } from '@/lib/sanity/client'
import { studierendePageQuery, exhibitors2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import KombinationSection from './KombinationSection'
import FeatureCards from './FeatureCards'
import ExhibitorGrid from '../startups/ExhibitorGrid'
import { buildCuratedExhibitors, mapManualExhibitors } from '@/lib/curatedExhibitors'
import ProgramCards from './ProgramCards'
import BentoGridTalente from '@/components/BentoGridTalente'
import BenefitsSection from './BenefitsSection'

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
  wide?: boolean
  tall?: boolean
}

interface KombiCard {
  title?: string
  subtitle?: string
  description?: string
}

interface ExhibitorLogo {
  name?: string
  logo?: ImageField
  whiteBackground?: boolean
  url?: string
}

interface TalentePageData {
  heroImage?: ImageField
  heroHeadline?: string
  heroSubtext?: string
  heroHighlight?: string
  featureCards?: FeatureCard[]
  bentoItems?: BentoItem[]
  programCards?: ProgramCard[]
  kombiHeadingWhite?: string
  kombiHeadingOrange?: string
  kombiIntro?: string
  kombiCards?: KombiCard[]
  kombiTaglineParts?: string[]
  kombiTaglineResult?: string
  bentoHeadingWhite?: string
  bentoHeadingOrange?: string
  exhibitorHeadingWhite1?: string
  exhibitorHeadingOrange?: string
  exhibitorHeadingWhite2?: string
  alleAusstellerText?: string
  alleAusstellerLink?: string
  ticketCtaText?: string
  perksLabel?: string
  perkDrinks?: string
  perkLunch?: string
  perkStartupSzeneTitle?: string
  perkStartupSzeneSub?: string
  perkSpeakerTitle?: string
  perkSpeakerSub?: string
  perkAfterparty?: string
  perkWorkshopsTitle?: string
  perkWorkshopsSub?: string
  perksCtaText?: string
  perkStartupSzeneImage?: ImageField
  perkWorkshopsImage?: ImageField
  exhibitorLogos?: ExhibitorLogo[]
}

async function getPageData(): Promise<TalentePageData | null> {
  return client.fetch(studierendePageQuery, {}, { cache: 'no-store' })
}

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

async function getSalitosLogo(): Promise<{ logo: ImageField } | null> {
  return client.fetch(
    `*[_type == "partner2026" && name == "Salitos"][0]{ logo }`,
    {},
    { cache: 'no-store' }
  )
}

const defaultBentoItems: BentoItem[] = [
  { title: 'CO-CREATION', buttonText: 'Erfahre mehr', buttonLink: '/co-creation' },
  { title: 'WORKSHOPS', buttonText: 'Erfahre mehr', buttonLink: '/workshops' },
  { title: 'LIVE-PODCASTS', buttonText: 'Erfahre mehr', buttonLink: '/podcasts' },
  { title: 'INSPIRATION', buttonText: 'Erfahre mehr', buttonLink: '/innovation-village' },
  { title: 'TALKS', buttonText: 'Erfahre mehr', buttonLink: '/main-stage', wide: false, tall: true },
  { title: 'PERKS', tall: false },
  { title: 'AFTERPARTY', wide: false, tall: false },
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
  const [data, exhibitors, salitosData] = await Promise.all([getPageData(), getExhibitors(), getSalitosLogo()])

  const salitosLogoUrl = salitosData?.logo
    ? urlFor(salitosData.logo).width(200).url()
    : undefined

  const speakerImageUrls = [
    'image-6e21e26f209b4bab021c7cb20d62d86a529fcef0-800x800-jpg',
    'image-040375e8a16eb0389862379ea0d2dc36e8de6b1c-800x800-jpg',
    'image-b3f61a9fb40ee4e79105bb343836fad13480e21e-2359x2359-png',
  ].map((ref) => urlFor({ asset: { _ref: ref } }).width(120).height(120).fit('crop').url())

  const workshopsImageUrl = urlFor(
    data?.perkWorkshopsImage ?? { asset: { _ref: 'image-b99e9ab13690682109dc693a129c2a2d53e5c54f-2000x1334-jpg' } }
  ).width(600).height(400).fit('crop').url()

  const startupSceneImageUrl = urlFor(
    data?.perkStartupSzeneImage ?? { asset: { _ref: 'image-7098046c7d10705f7ae3f8d5e27c796439799f89-2000x1334-jpg' } }
  ).width(600).height(400).fit('crop').url()

  const headline = data?.heroHeadline || 'ERLEBE DIE STARTUP SZENE'
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
  const tallItems = ['TALKS']
  const smallItems = ['PERKS', 'PERKS ', 'AFTERPARTY']

  const bentoWithUrls = bentoItems.map((b) => ({
    title: b.title,
    buttonText: b.buttonText,
    buttonLink: b.buttonLink,
    imageUrl: b.image ? urlFor(b.image).width(800).height(600).url() : undefined,
    wide: b.wide ?? (smallItems.includes(b.title) ? false : undefined),
    tall: b.tall ?? (tallItems.includes(b.title) ? true : smallItems.includes(b.title) ? false : undefined),
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

        {/* Benefits */}
        <BenefitsSection
          salitosLogoUrl={salitosLogoUrl}
          workshopsImageUrl={workshopsImageUrl}
          startupSceneImageUrl={startupSceneImageUrl}
          speakerImageUrls={speakerImageUrls}
          perksLabel={data?.perksLabel}
          perkDrinks={data?.perkDrinks}
          perkLunch={data?.perkLunch}
          perkStartupSzeneTitle={data?.perkStartupSzeneTitle}
          perkStartupSzeneSub={data?.perkStartupSzeneSub}
          perkSpeakerTitle={data?.perkSpeakerTitle}
          perkSpeakerSub={data?.perkSpeakerSub}
          perkAfterparty={data?.perkAfterparty}
          perkWorkshopsTitle={data?.perkWorkshopsTitle}
          perkWorkshopsSub={data?.perkWorkshopsSub}
          perksCtaText={data?.perksCtaText}
        />

        {/* Spacer before Kombination */}
        <div className="h-12 md:h-20" />

        {/* Einmalige Kombination */}
        <KombinationSection
          headingWhite={data?.kombiHeadingWhite}
          headingOrange={data?.kombiHeadingOrange}
          intro={data?.kombiIntro}
          cards={data?.kombiCards}
          taglineParts={data?.kombiTaglineParts}
          taglineResult={data?.kombiTaglineResult}
        />

        {/* Was dich erwartet – temporarily hidden
        <section id="was-erwartet" className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="h-section text-center mb-12">
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
            <h2 className="h-section text-center mb-12">
              <span className="text-white">{data?.bentoHeadingWhite || 'MEHR ALS EINE'} </span>
              <span className="gradient-text">{data?.bentoHeadingOrange || 'MESSE'}</span>
            </h2>

            <BentoGridTalente items={bentoWithUrls} />
          </div>
        </section>

        {/* Unser Programm für dich – temporarily hidden
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="h-section text-center mb-12">
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
            <h2 className="h-section text-center mb-12">
              <span className="text-white">{data?.exhibitorHeadingWhite1 || 'WER'} </span>
              <span className="gradient-text">{data?.exhibitorHeadingOrange || 'DABEI'} </span>
              <span className="text-white">{data?.exhibitorHeadingWhite2 || 'IST'}</span>
            </h2>

            <ExhibitorGrid
              exhibitors={
                data?.exhibitorLogos?.length
                  ? mapManualExhibitors(data.exhibitorLogos)
                  : buildCuratedExhibitors(exhibitors)
              }
            />

            <div className="flex justify-center mt-10">
              <a
                href={data?.alleAusstellerLink || '/innovation-village#aussteller-2026'}
                className="inline-flex items-center gap-2 border border-white/30 text-white text-sm px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                {data?.alleAusstellerText || 'Alle Aussteller'} &rarr;
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
