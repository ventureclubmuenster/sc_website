import { client } from '@/lib/sanity/client'
import { startupsPageQuery, startups2025Query, fokusfelderQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import ExhibitorGrid from './ExhibitorGrid'
import FokusfeldGrid from '../unternehmen/FokusfeldGrid'
import KombinationSection from './KombinationSection'
import FormatSection from '@/components/FormatSection'

interface ImageField {
  asset: { _ref: string }
}

interface Exhibitor {
  _id: string
  name: string
  logo?: ImageField
  whiteLogo?: ImageField
  whiteBackground?: boolean
}

interface SanityFormatItem {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  image?: ImageField
  wide?: boolean
}

interface StartupsPageData {
  heroImage?: ImageField
  featuredExhibitors?: Exhibitor[]
  formatItems?: SanityFormatItem[]
}

interface FokusfelderData {
  fokusProduktion?: ImageField
  fokusLogistik?: ImageField
  fokusEnergie?: ImageField
  fokusBau?: ImageField
  fokusInfrastruktur?: ImageField
  fokusLifestyle?: ImageField
}

const fokusfelderTexte = [
  { title: 'PRODUKTION', description: 'Zeigt eure Lösungen für Fertigung, Automatisierung und Industrie 4.0, direkt den Entscheidern, die danach suchen.', key: 'fokusProduktion' as const },
  { title: 'LOGISTIK & EINKAUF', description: 'Präsentiert eure Innovationen für Supply Chain, Beschaffung und smarte Logistikprozesse den richtigen Ansprechpartnern.', key: 'fokusLogistik' as const },
  { title: 'ENERGIE & NACHHALTIGKEIT', description: 'Ihr arbeitet an der Energiewende? Hier trefft ihr Unternehmen und Investoren, die genau das brauchen.', key: 'fokusEnergie' as const },
  { title: 'BAU- & HANDWERK', description: 'Von ConTech bis digitales Handwerk: Bringt eure Lösung vor die Akteure der Bauwirtschaft.', key: 'fokusBau' as const },
  { title: 'BETRIEBS INFRASTRUKTUR', description: 'IT, Facility Management, interne Prozesse: Zeigt, wie euer Startup den Betrieb effizienter macht.', key: 'fokusInfrastruktur' as const },
  { title: 'LIFESTYLE', description: 'Food, Fashion, Sport, Wellness: Vernetzt euch mit Corporates und Talenten der Lifestyle-Branche.', key: 'fokusLifestyle' as const },
]

async function getPageData(): Promise<StartupsPageData | null> {
  return client.fetch(startupsPageQuery, {}, { cache: 'no-store' })
}

async function getFokusfelder(): Promise<FokusfelderData | null> {
  return client.fetch(fokusfelderQuery, {}, { cache: 'no-store' })
}

async function getStartups(): Promise<Exhibitor[]> {
  return client.fetch(startups2025Query, {}, { cache: 'no-store' })
}

export default async function StartupsPage() {
  const [data, fokusfelder, allStartups] = await Promise.all([getPageData(), getFokusfelder(), getStartups()])

  // Use hand-picked exhibitors from Sanity, fall back to all startups
  const startups = data?.featuredExhibitors?.length ? data.featuredExhibitors : allStartups

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  const fokusfelderWithUrls = fokusfelderTexte.map((f) => {
    const img = fokusfelder?.[f.key]
    return {
      title: f.title,
      description: f.description,
      imageUrl: img ? urlFor(img).width(600).height(400).url() : undefined,
    }
  })

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="STARTUPS BAUEN DIE ZUKUNFT"
        subtext="Wir wollen die Basis dafür schaffen"
      />

      <div className="relative bg-black overflow-hidden">
        {/* Repeating watermark */}
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

        {/* Fokusfelder */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">UNSERE </span>
              <span className="text-sc-orange">FOKUSFELDER</span>
            </h2>

            <FokusfeldGrid fokusfelder={fokusfelderWithUrls} />
          </div>
        </section>

        {/* Wer zuletzt dabei war */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">WER </span>
              <span className="text-sc-orange">ZULETZT </span>
              <span className="text-white">DABEI WAR</span>
            </h2>

            <ExhibitorGrid
              exhibitors={startups.map((s) => ({
                _id: s._id,
                name: s.name,
                logoUrl: s.logo ? urlFor(s.logo).width(600).fit('max').url() : undefined,
                whiteLogoUrl: s.whiteLogo ? urlFor(s.whiteLogo).width(600).fit('max').url() : undefined,
                whiteBackground: s.whiteBackground ?? false,
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

        <FormatSection
          heading={<><span className="text-white">BRINGE DEIN WISSEN IN UNSERE </span><span className="text-sc-orange">FORMATE</span><span className="text-white"> EIN</span></>}
          items={data?.formatItems?.map((f) => ({
            title: f.title,
            description: f.description,
            buttonText: f.buttonText,
            buttonLink: f.buttonLink,
            imageUrl: f.image ? urlFor(f.image).width(800).height(600).url() : undefined,
            wide: f.wide,
          }))}
        />
      </div>
    </>
  )
}
