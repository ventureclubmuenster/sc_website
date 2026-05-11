import { client } from '@/lib/sanity/client'
import { coCreationPageQuery, fokusfelderQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import FadeIn from '@/components/FadeIn'
import FokusfeldGrid from '@/app/unternehmen/FokusfeldGrid'
import ParadigmaSection from './ParadigmaSection'
import PrinzipienGrid from './PrinzipienGrid'
import AblaufTimeline from './AblaufTimeline'
import PartnerSection from './PartnerSection'
import BewerbungsCTA from './BewerbungsCTA'
import BewerbungButton from './BewerbungButton'
import FAQSection from './FAQSection'
import ImagePlaceholder from './ImagePlaceholder'

interface ImageField {
  asset: { _ref: string }
}

interface Prinzip {
  icon?: string
  title?: string
  description?: string
}

interface Station {
  time?: string
  title?: string
  description?: string
}

interface CompanyField {
  name: string
  logo?: ImageField
  whiteBackground?: boolean
  challenge?: string
}

interface CtaSideImageField {
  image?: ImageField
  caption?: string
}

interface CoCreationPageData {
  heroImage?: ImageField
  heroHeadline?: string
  heroSubtext?: string
  heroHighlight?: string
  visionHeadline?: string
  visionGradientWord?: string
  visionText?: string
  visionImage?: ImageField
  paradigmaNicht?: string[]
  paradigmaSondern?: string[]
  prinzipienBackgroundImage?: ImageField
  prinzipien?: Prinzip[]
  ablaufStations?: Station[]
  rFactoryLogo?: ImageField
  vcmDescription?: string
  rFactoryDescription?: string
  companies?: CompanyField[]
  ctaHeadline?: string
  ctaText?: string
  bewerbungsUrl?: string
  ctaBackgroundImage?: ImageField
  ctaSideImages?: CtaSideImageField[]
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
  { title: 'PRODUKTION', description: 'Fertigung, Automatisierung und Industrie 4.0. Eure Lösungen treffen auf echte Werke.', key: 'fokusProduktion' as const },
  { title: 'LOGISTIK & EINKAUF', description: 'Supply Chain, Beschaffung und smarte Prozesse, direkt mit den Lead-Unternehmen optimiert.', key: 'fokusLogistik' as const },
  { title: 'ENERGIE & NACHHALTIGKEIT', description: 'Energiewende, Effizienz und Kreislaufwirtschaft. Probleme aus erster Hand.', key: 'fokusEnergie' as const },
  { title: 'BAU- & HANDWERK', description: 'ConTech und digitales Handwerk. Der Mittelstand bringt seine Baustellen mit.', key: 'fokusBau' as const },
  { title: 'BETRIEBS-INFRASTRUKTUR', description: 'IT, Facility und interne Prozesse. Hier entsteht Effizienz im Alltag.', key: 'fokusInfrastruktur' as const },
  { title: 'LIFESTYLE', description: 'Food, Fashion, Sport und Wellness. Co-Creation für Brands und Talente.', key: 'fokusLifestyle' as const },
]

async function getPageData(): Promise<CoCreationPageData | null> {
  return client.fetch(coCreationPageQuery, {}, { cache: 'no-store' })
}

async function getFokusfelder(): Promise<FokusfelderData | null> {
  return client.fetch(fokusfelderQuery, {}, { cache: 'no-store' })
}

export default async function CoCreationPage() {
  const [data, fokusfelder] = await Promise.all([getPageData(), getFokusfelder()])

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  const visionImageUrl = data?.visionImage
    ? urlFor(data.visionImage).width(1200).height(800).url()
    : undefined

  const rFactoryLogoUrl = data?.rFactoryLogo
    ? urlFor(data.rFactoryLogo).width(400).fit('max').url()
    : undefined

  const prinzipienBgUrl = data?.prinzipienBackgroundImage
    ? urlFor(data.prinzipienBackgroundImage).width(1920).height(1080).url()
    : undefined

  const ctaBgUrl = data?.ctaBackgroundImage
    ? urlFor(data.ctaBackgroundImage).width(1920).height(1080).url()
    : undefined

  const ctaSideImages = data?.ctaSideImages?.map((s) => ({
    imageUrl: s.image ? urlFor(s.image).width(400).height(500).fit('crop').url() : undefined,
    caption: s.caption,
  }))

  const fokusfelderWithUrls = fokusfelderTexte.map((f) => {
    const img = fokusfelder?.[f.key]
    return {
      title: f.title,
      description: f.description,
      imageUrl: img ? urlFor(img).width(800).height(600).url() : undefined,
    }
  })

  // Vision-Headline mit Gradient-Wort splitten (case-insensitive, nur a-zäöüß-Vergleich)
  const visionHeadlineRaw = data?.visionHeadline ?? 'Mitdenken. Mitgestalten. Mitentscheiden.'
  const visionGradientWord = data?.visionGradientWord ?? 'Mitentscheiden'
  const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß]/gi, '')
  const gradientWordNorm = norm(visionGradientWord)
  const visionHeadlineParts = visionHeadlineRaw.split(' ').map((word) => ({
    text: word,
    isGradient: norm(word) === gradientWordNorm,
  }))

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        eyebrow="Co-Creation"
        headline={data?.heroHeadline ?? 'GEMEINSAM PROBLEME LÖSEN'}
        headlineAllWhite
        subtext={
          data?.heroSubtext ??
          'Ein Hackathon mitten auf der Messe. Studierende und Unternehmen arbeiten gemeinsam an realen Herausforderungen. Ein intensiver Arbeitstag, an dessen Ende konkrete Lösungen stehen.'
        }
        subtextWide
        subtextMuted
      >
        <BewerbungButton small href={data?.bewerbungsUrl} />
      </HeroSection>

      <div className="relative bg-black overflow-hidden">
        {/* Spacer between hero and first section */}
        <div className="h-20 md:h-32" />

        {/* === 2. Vision === */}
        <section id="vision" className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="up" duration={0.7}>
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-sm md:text-base tracking-wide text-white/60 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                  Was ist Co-Creation?
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold uppercase leading-tight mb-6">
                  {visionHeadlineParts.map((p, i) => (
                    <span key={i}>
                      <span className={p.isGradient ? 'gradient-text' : 'text-white'}>{p.text}</span>{' '}
                    </span>
                  ))}
                </h2>
                <div className="space-y-4 text-white/75 text-base md:text-lg leading-relaxed">
                  <p>
                    {data?.visionText ??
                      'Co-Creation ist kein klassisches Eventformat. Es ist ein fokussierter Arbeitstag, an dem interdisziplinäre Teams reale Problemstellungen bearbeiten. Das Ziel: umsetzbare Ergebnisse.'}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" duration={0.8} delay={0.15}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <ImagePlaceholder
                  src={visionImageUrl}
                  alt="Co-Creation in Aktion"
                  label="Vision-Bild"
                  fill
                  className="rounded-2xl"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* === 3. Paradigmenwechsel === */}
        <ParadigmaSection nicht={data?.paradigmaNicht} sondern={data?.paradigmaSondern} />

        {/* === 4. Dreiklang === */}
        <PrinzipienGrid prinzipien={data?.prinzipien} backgroundImageUrl={prinzipienBgUrl} />

        {/* === 5. Fokusfelder === */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
              <span className="text-white">DIE </span>
              <span className="gradient-text">INNOVATIONSFELDER</span>
            </h2>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
              Sechs Themenfelder, die unsere Lead-Unternehmen mitbringen.
            </p>
            <FokusfeldGrid fokusfelder={fokusfelderWithUrls} />
          </div>
        </section>

        {/* === 6. Tagesablauf === */}
        <AblaufTimeline stations={data?.ablaufStations} />

        {/* === 7. Veranstalter === */}
        <PartnerSection
          rFactoryLogoUrl={rFactoryLogoUrl}
          vcmDescription={data?.vcmDescription}
          rFactoryDescription={data?.rFactoryDescription}
        />

        {/* === 8. Bewerbungs-CTA (vorletzte) === */}
        <BewerbungsCTA
          headline={data?.ctaHeadline}
          text={data?.ctaText}
          bewerbungsUrl={data?.bewerbungsUrl}
          backgroundImageUrl={ctaBgUrl}
          sideImages={ctaSideImages}
        />

        {/* === 9. FAQ (letzte) === */}
        <FAQSection />
      </div>
    </>
  )
}
