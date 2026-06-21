import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investoren',
  description:
    'Als Investor auf der Startup Contacts Münster: Entdecke die innovativsten Startups aus dem DACH-Raum. 8. Juni 2027 in Münster.',
  alternates: { canonical: 'https://www.startup-contacts.de/investoren' },
  openGraph: {
    title: 'Investoren | Startup Contacts',
    description: 'Entdecke die innovativsten Startups aus dem DACH-Raum auf der Startup Contacts Münster.',
    url: 'https://www.startup-contacts.de/investoren',
  },
}

import { client } from '@/lib/sanity/client'
import { investorenPageQuery, sharedFormatItemsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import WhyInvestSection from './WhyInvestSection'
import FormatSection from '@/components/FormatSection'

interface ImageField {
  asset: { _ref: string }
}

interface SanityFormatItem {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  image?: ImageField
  wide?: boolean
}

interface WhyCard {
  title?: string
  subtitle?: string
  description?: string
}

interface InvestorenPageData {
  heroImage?: ImageField
  heroHeadline?: string
  heroSubtext?: string
  heroHighlight?: string
  whyHeadingWhite?: string
  whyHeadingOrange?: string
  whyIntro?: string
  whyCards?: WhyCard[]
  whyTaglineParts?: string[]
  whyTaglineResult?: string
  formatHeadingBefore?: string
  formatHeadingOrange?: string
  formatHeadingAfter?: string
  ticketCtaText?: string
}

async function getPageData(): Promise<InvestorenPageData | null> {
  return client.fetch(investorenPageQuery, {}, { cache: 'no-store' })
}

export default async function InvestorenPage() {
  const [data, formatItems] = await Promise.all([
    getPageData(),
    client.fetch(sharedFormatItemsQuery, {}, { cache: 'no-store' }) as Promise<SanityFormatItem[] | null>,
  ])

  // Hero-Hintergrund: Sanity-Bild hat Vorrang, sonst lokales Standardbild.
  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : '/investoren-hero.jpg'

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline={data?.heroHeadline || 'SMART MONEY TRIFFT INNOVATION'}
        subtext={data?.heroSubtext || 'Entdecken Sie die vielversprechendsten Startups der Region, bevor es alle anderen tun'}
        highlight={data?.heroHighlight || 'Exklusiver Zugang. Direkter Kontakt. Echte Deals.'}
      />

      <div className="relative bg-black overflow-hidden">
        {/* Repeating watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.03] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="h-20 md:h-32" />

        {/* Why Invest Section */}
        <WhyInvestSection
          headingWhite={data?.whyHeadingWhite}
          headingOrange={data?.whyHeadingOrange}
          intro={data?.whyIntro}
          cards={data?.whyCards}
          taglineParts={data?.whyTaglineParts}
          taglineResult={data?.whyTaglineResult}
        />

        <FormatSection
          heading={<><span className="text-white">{data?.formatHeadingBefore || 'LERNE DIE SZENE BEI UNSEREN'} </span><span className="gradient-text">{data?.formatHeadingOrange || 'FORMATEN'}</span><span className="text-white"> {data?.formatHeadingAfter || 'KENNEN'}</span></>}
          items={formatItems?.map((f) => ({
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
