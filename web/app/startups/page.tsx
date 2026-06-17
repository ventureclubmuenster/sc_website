import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startups',
  description:
    'Als Startup auf der Startup Contacts Münster ausstellen: Treffe Mittelstand, Talente und Investoren. 8. Juni 2027 in Münster.',
  alternates: { canonical: 'https://www.startup-contacts.de/startups' },
  openGraph: {
    title: 'Startups | Startup Contacts',
    description: 'Als Startup auf der Startup Contacts Münster ausstellen: Treffe Mittelstand, Talente und Investoren.',
    url: 'https://www.startup-contacts.de/startups',
  },
}

import { client } from '@/lib/sanity/client'
import { startupsPageQuery, exhibitors2025Query, fokusfelderQuery, sharedFormatItemsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import ExhibitorGrid from './ExhibitorGrid'
import FokusfeldGrid from '../unternehmen/FokusfeldGrid'
import { buildCuratedExhibitors, mapManualExhibitors } from '@/lib/curatedExhibitors'
import KombinationSection from './KombinationSection'
import FormatSection from '@/components/FormatSection'
import SubtleTicketCTA from '@/components/SubtleTicketCTA'

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

interface KombiCard {
  title?: string
  subtitle?: string
  description?: string
}

interface FokusItem {
  title?: string
  description?: string
}

interface ExhibitorLogo {
  name?: string
  logo?: ImageField
  whiteBackground?: boolean
  url?: string
}

interface StartupsPageData {
  heroImage?: ImageField
  featuredExhibitors?: Exhibitor[]
  heroHeadline?: string
  heroSubtext?: string
  kombiHeadingWhite?: string
  kombiHeadingOrange?: string
  kombiIntro?: string
  kombiCards?: KombiCard[]
  kombiTaglineParts?: string[]
  kombiTaglineResult?: string
  fokusHeadingWhite?: string
  fokusHeadingOrange?: string
  fokusItems?: FokusItem[]
  formatHeadingBefore?: string
  formatHeadingOrange?: string
  formatHeadingAfter?: string
  exhibitorHeadingWhite1?: string
  exhibitorHeadingOrange?: string
  exhibitorHeadingWhite2?: string
  alleAusstellerText?: string
  alleAusstellerLink?: string
  ticketCtaText?: string
  exhibitorLogos?: ExhibitorLogo[]
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

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

export default async function StartupsPage() {
  const [data, fokusfelder, exhibitors, formatItems] = await Promise.all([
    getPageData(),
    getFokusfelder(),
    getExhibitors(),
    client.fetch(sharedFormatItemsQuery, {}, { cache: 'no-store' }) as Promise<SanityFormatItem[] | null>,
  ])

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  const fokusfelderWithUrls = fokusfelderTexte.map((f, i) => {
    const img = fokusfelder?.[f.key]
    const override = data?.fokusItems?.[i]
    return {
      title: override?.title || f.title,
      description: override?.description || f.description,
      imageUrl: img ? urlFor(img).width(600).height(400).url() : undefined,
    }
  })

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline={data?.heroHeadline || 'STARTUPS BAUEN DIE ZUKUNFT'}
        subtext={data?.heroSubtext || 'Wir wollen die Basis dafür schaffen'}
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
        <KombinationSection
          headingWhite={data?.kombiHeadingWhite}
          headingOrange={data?.kombiHeadingOrange}
          intro={data?.kombiIntro}
          cards={data?.kombiCards}
          taglineParts={data?.kombiTaglineParts}
          taglineResult={data?.kombiTaglineResult}
        />

        {/* Fokusfelder */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="h-section text-center mb-12">
              <span className="text-white">{data?.fokusHeadingWhite || 'UNSERE'} </span>
              <span className="gradient-text">{data?.fokusHeadingOrange || 'FOKUSFELDER'}</span>
            </h2>

            <FokusfeldGrid fokusfelder={fokusfelderWithUrls} />
          </div>
        </section>

        <FormatSection
          heading={<><span className="text-white">{data?.formatHeadingBefore || 'BRINGE DEIN WISSEN IN UNSERE'} </span><span className="gradient-text">{data?.formatHeadingOrange || 'FORMATE'}</span><span className="text-white"> {data?.formatHeadingAfter || 'EIN'}</span></>}
          items={formatItems?.map((f) => ({
            title: f.title,
            description: f.description,
            buttonText: f.buttonText,
            buttonLink: f.buttonLink,
            imageUrl: f.image ? urlFor(f.image).width(800).height(600).url() : undefined,
            wide: f.wide,
          }))}
        />

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

        <SubtleTicketCTA text={data?.ticketCtaText || 'Als Startup Ticket sichern'} />
      </div>
    </>
  )
}
