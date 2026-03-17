import { client } from '@/lib/sanity/client'
import { studierendePageQuery, exhibitors2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import FeatureCards from './FeatureCards'
import ExhibitorCarousel from './ExhibitorCarousel'

interface FeatureCard {
  title: string
  hoverText: string
  image?: { asset: { _ref: string } }
}

interface Exhibitor {
  _id: string
  name: string
  logo?: { asset: { _ref: string } }
}

interface StudierendePageData {
  heroImage?: { asset: { _ref: string } }
  heroHeadline?: string
  heroSubtext?: string
  heroHighlight?: string
  featureCards?: FeatureCard[]
}

async function getPageData(): Promise<StudierendePageData | null> {
  return client.fetch(studierendePageQuery, {}, { cache: 'no-store' })
}

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

const defaultCards: FeatureCard[] = [
  { title: 'COMMUNITY', hoverText: 'Egal, ob du schon länger dabei bist oder ganz neu einsteigst – auf der Startup Contacts triffst du Gleichgesinnte, mit denen du gemeinsam in die Welt der Startups eintauchen kannst.' },
  { title: 'EXPERIENCE', hoverText: '' },
  { title: 'KNOWLEDGE', hoverText: '' },
  { title: 'INSPIRATION', hoverText: '' },
]

export default async function StudierendePage() {
  const [data, exhibitors] = await Promise.all([getPageData(), getExhibitors()])

  const headline = data?.heroHeadline || 'TALENTE AUFGEPASST'
  const subtext = data?.heroSubtext || 'Die Chance den Arbeitgeber von morgen zu finden'
  const highlight = data?.heroHighlight || '30+ Startups und Unternehmen'
  const cards = data?.featureCards?.length ? data.featureCards : defaultCards

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : null

  const cardsWithUrls = cards.map((card) => ({
    title: card.title,
    hoverText: card.hoverText,
    imageUrl: card.image ? urlFor(card.image).width(800).height(600).url() : undefined,
  }))

  // Split headline into two lines at space for stacked layout
  const headlineParts = headline.split(' ')
  const topLine = headlineParts.slice(0, Math.ceil(headlineParts.length / 2)).join(' ')
  const bottomLine = headlineParts.slice(Math.ceil(headlineParts.length / 2)).join(' ')

  return (
    <>
      {/* Hero Section — Instagram post inspired */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background image */}
        {heroImageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-card-grey" />
        )}

        {/* Dark-to-orange gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-sc-orange/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
            {/* Left side — Bold headline */}
            <div className="flex-1">
              <div className="mb-6">
                <span className="inline-block bg-sc-orange text-black text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-sm">
                  Startup Contacts 2026
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] tracking-tight">
                <span className="block text-white">{topLine}</span>
                <span className="block text-sc-orange">{bottomLine}</span>
              </h1>
            </div>

            {/* Right side — Subtext & CTA */}
            <div className="flex-1 lg:max-w-md">
              {/* Decorative question mark */}
              <div className="text-sc-orange text-[120px] sm:text-[160px] font-black leading-none -mb-8 -ml-2 select-none opacity-80">
                ?
              </div>

              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
                {subtext}
              </p>

              <p className="text-sc-orange text-lg sm:text-xl font-extrabold uppercase tracking-wide mt-4">
                {highlight}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#was-erwartet"
                  className="inline-flex items-center gap-2 bg-sc-orange text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-white transition-colors"
                >
                  Mehr erfahren
                </a>
                <a
                  href="/newsletter"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-white hover:text-black transition-colors"
                >
                  Newsletter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
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
              href="/innovation-village"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-sm px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Alle Aussteller &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
