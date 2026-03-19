import { client } from '@/lib/sanity/client'
import { investorenPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import WhyInvestSection from './WhyInvestSection'
import FormatSection from '@/components/FormatSection'

interface ImageField {
  asset: { _ref: string }
}

interface InvestorenPageData {
  heroImage?: ImageField
  bentoInvestorBreakfast?: ImageField
  bentoLetztesJahr?: ImageField
  bentoMuensterTop5?: ImageField
  bentoVipArea?: ImageField
  bentoMeetGreet?: ImageField
}

const bentoTexte = [
  { title: 'INVESTOR BREAKFAST', key: 'bentoInvestorBreakfast' as const },
  { title: 'WER LETZTES JAHR DABEI WAR', key: 'bentoLetztesJahr' as const },
  { title: 'MÜNSTER TOP 5 GRÜNDUNGSHOCHSCHULEN DE', key: 'bentoMuensterTop5' as const },
  { title: 'VIP AREA', key: 'bentoVipArea' as const },
  { title: 'MEET & GREET', key: 'bentoMeetGreet' as const },
]

async function getPageData(): Promise<InvestorenPageData | null> {
  return client.fetch(investorenPageQuery, {}, { cache: 'no-store' })
}

export default async function InvestorenPage() {
  const data = await getPageData()

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

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
        headline="SMART MONEY TRIFFT INNOVATION"
        subtext="Entdecken Sie die vielversprechendsten Startups der Region — bevor es alle anderen tun"
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

        {/* Bento Grid */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-12">
              <span className="text-white">MEHR ALS EINE </span>
              <span className="text-sc-orange">MESSE</span>
            </h2>

            <BentoGrid items={bentoWithUrls} />
          </div>
        </section>

        <FormatSection heading={<><span className="text-white">LERNE DIE SZENE BEI UNSEREN </span><span className="text-sc-orange">FORMATEN</span><span className="text-white"> KENNEN</span></>} />
      </div>
    </>
  )
}
