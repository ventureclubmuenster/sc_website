import { client } from '@/lib/sanity/client'
import { unternehmenPageQuery, exhibitors2025Query, fokusfelderQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import ExhibitorGrid from '../startups/ExhibitorGrid'
import BentoGrid from '@/components/BentoGrid'
import FokusfeldGrid from './FokusfeldGrid'

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

interface FokusfelderData {
  fokusProduktion?: ImageField
  fokusLogistik?: ImageField
  fokusEnergie?: ImageField
  fokusBau?: ImageField
  fokusInfrastruktur?: ImageField
  fokusLifestyle?: ImageField
}

interface UnternehmenPageData {
  heroImage?: ImageField
  bentoStartupSzene?: ImageField
  bentoVipAccess?: ImageField
  bentoFoodDrinks?: ImageField
  bentoExperience?: ImageField
  bentoAfterwork?: ImageField
  bentoInnovationVillage?: ImageField
}

const fokusfelderTexte = [
  { title: 'PRODUKTION', description: 'Treffen Sie Startups mit frischen Lösungen für Fertigung, Automatisierung und Industrie 4.0 – und Talente, die Ihre Produktion voranbringen.', key: 'fokusProduktion' as const },
  { title: 'LOGISTIK & EINKAUF', description: 'Vernetzen Sie sich mit innovativen Anbietern für Supply Chain, Beschaffung und smarte Logistikprozesse.', key: 'fokusLogistik' as const },
  { title: 'ENERGIE & NACHHALTIGKEIT', description: 'Entdecken Sie Startups, die an der Energiewende arbeiten – und gewinnen Sie Talente für Ihre Nachhaltigkeitsstrategie.', key: 'fokusEnergie' as const },
  { title: 'BAU- & HANDWERK', description: 'Von ConTech bis digitales Handwerk: Finden Sie Partner und Nachwuchs für die Zukunft der Bauwirtschaft.', key: 'fokusBau' as const },
  { title: 'BETRIEBS INFRASTRUKTUR', description: 'IT, Facility Management, interne Prozesse – lernen Sie Startups kennen, die Ihren Betrieb effizienter machen.', key: 'fokusInfrastruktur' as const },
  { title: 'LIFESTYLE', description: 'Food, Fashion, Sport, Wellness: Tauschen Sie sich mit kreativen Gründern und jungen Talenten der Lifestyle-Branche aus.', key: 'fokusLifestyle' as const },
]

const bentoTexte = [
  { title: 'ZUGANG ZUR STARTUP SZENE', key: 'bentoStartupSzene' as const },
  { title: 'VIP-ACCESS', key: 'bentoVipAccess' as const },
  { title: 'FOOD & DRINKS', key: 'bentoFoodDrinks' as const },
  { title: 'EXPERIENCE', key: 'bentoExperience' as const },
  { title: 'AFTERWORK', key: 'bentoAfterwork' as const },
  { title: 'INNOVATION VILLAGE', key: 'bentoInnovationVillage' as const },
]

async function getPageData(): Promise<UnternehmenPageData | null> {
  return client.fetch(unternehmenPageQuery, {}, { cache: 'no-store' })
}

async function getFokusfelder(): Promise<FokusfelderData | null> {
  return client.fetch(fokusfelderQuery, {}, { cache: 'no-store' })
}

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

export default async function UnternehmenPage() {
  const [data, fokusfelder, exhibitors] = await Promise.all([getPageData(), getFokusfelder(), getExhibitors()])

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

  const bentoWithUrls = bentoTexte.map((b) => {
    const img = data?.[b.key]
    return {
      title: b.title,
      imageUrl: img ? urlFor(img).width(800).height(600).url() : undefined,
    }
  })

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="IHR UNTERNEHMEN TREIBT DIE BRANCHE VORAN?"
        subtext="Kommen Sie vorbei und bringen Sie Ihr Wissen ein"
        highlight="Co-Creation als Innovationstreiber"
      />

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

        {/* Intro Section */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              Fördern Sie die Branche durch Startups und lassen Sie sich inspirieren. Eine einmalige Kombination aus Innovation, Networking und Co-Creation erwartet Sie.
            </p>
          </div>
        </section>

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

        {/* Benefits auf einen Blick */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">BENEFITS AUF EINEN </span>
              <span className="text-sc-orange">BLICK</span>
            </h2>

            <BentoGrid items={bentoWithUrls} />
          </div>
        </section>
      </div>
    </>
  )
}
