import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investoren',
  description:
    'Als Investor auf der Startup Contacts Münster: Entdecke die innovativsten Startups aus dem DACH-Raum. 15. Juni 2026 in Münster.',
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

interface InvestorenPageData {
  heroImage?: ImageField
}

async function getPageData(): Promise<InvestorenPageData | null> {
  return client.fetch(investorenPageQuery, {}, { cache: 'no-store' })
}

export default async function InvestorenPage() {
  const [data, formatItems] = await Promise.all([
    getPageData(),
    client.fetch(sharedFormatItemsQuery, {}, { cache: 'no-store' }) as Promise<SanityFormatItem[] | null>,
  ])

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="SMART MONEY TRIFFT INNOVATION"
        subtext="Entdecken Sie die vielversprechendsten Startups der Region, bevor es alle anderen tun"
        highlight="Exklusiver Zugang. Direkter Kontakt. Echte Deals."
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

        {/* Spacer */}
        <div className="h-20 md:h-32" />

        {/* Why Invest Section */}
        <WhyInvestSection />

        <FormatSection
          heading={<><span className="text-white">LERNE DIE SZENE BEI UNSEREN </span><span className="gradient-text">FORMATEN</span><span className="text-white"> KENNEN</span></>}
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
