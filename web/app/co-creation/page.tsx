import { client } from '@/lib/sanity/client'
import { coCreationPageQuery, fokusfelderQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import FokusfeldGrid from '@/app/unternehmen/FokusfeldGrid'
import CoCreationHero from './CoCreationHero'
import WasIstChallenge from './WasIstChallenge'
import WarumTeilnehmen from './WarumTeilnehmen'
import AblaufTimeline from './AblaufTimeline'
import HybrideLoesungen from './HybrideLoesungen'
import PartnerSection from './PartnerSection'
import BewerbungsCTA from './BewerbungsCTA'
import FAQSection from './FAQSection'
import InlineCTA from './InlineCTA'

interface ImageField {
  asset: { _ref: string }
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

interface KarteField {
  number?: string
  title?: string
  description?: string
  image?: ImageField
}

interface HybrideKarteField {
  title?: string
  description?: string
}

interface CoCreationPageData {
  heroImage?: ImageField
  heroEyebrow?: string
  heroHeadline?: string
  heroSubline?: string
  heroBody?: string
  heroNote?: string
  wasIstChallengeEyebrow?: string
  wasIstChallengeHeadline?: string
  wasIstChallengeIntro?: string
  wasIstChallengeKarten?: KarteField[]
  warumTeilnehmenEyebrow?: string
  warumTeilnehmenHeadline?: string
  warumTeilnehmenIntro?: string
  warumTeilnehmenBackgroundImage?: ImageField
  warumTeilnehmenKarten?: KarteField[]
  ablaufStations?: Station[]
  hybrideLoesungenEyebrow?: string
  hybrideLoesungenHeadline?: string
  hybrideLoesungenIntro?: string
  hybrideLoesungenImage?: ImageField
  hybrideLoesungenImageTitle?: string
  hybrideLoesungenImageSubtitle?: string
  hybrideLoesungenImageBody?: string
  hybrideLoesungenKarten?: HybrideKarteField[]
  unternehmenEyebrow?: string
  unternehmenHeadline?: string
  unternehmenIntro?: string
  companies?: CompanyField[]
  rFactoryLogo?: ImageField
  vcmDescription?: string
  rFactoryDescription?: string
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

  const rFactoryLogoUrl = data?.rFactoryLogo
    ? urlFor(data.rFactoryLogo).width(400).fit('max').url()
    : undefined

  const ctaBgUrl = data?.ctaBackgroundImage
    ? urlFor(data.ctaBackgroundImage).width(1920).height(1080).url()
    : undefined

  const warumTeilnehmenBgUrl = data?.warumTeilnehmenBackgroundImage
    ? urlFor(data.warumTeilnehmenBackgroundImage).width(1920).height(1080).url()
    : undefined

  const hybrideLoesungenImageUrl = data?.hybrideLoesungenImage
    ? urlFor(data.hybrideLoesungenImage).width(1200).height(1400).fit('crop').url()
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

  const wasIstChallengeKarten = data?.wasIstChallengeKarten?.map((k) => ({
    number: k.number,
    title: k.title,
    description: k.description,
    imageUrl: k.image ? urlFor(k.image).width(800).height(600).url() : undefined,
  }))

  const warumTeilnehmenKarten = data?.warumTeilnehmenKarten?.map((k) => ({
    title: k.title,
    description: k.description,
    imageUrl: k.image ? urlFor(k.image).width(800).height(600).url() : undefined,
  }))

  return (
    <>
      <CoCreationHero
        imageUrl={heroImageUrl}
        eyebrow={data?.heroEyebrow ?? 'VCM × R-Factory · Startup Contacts · Halle Münsterland'}
        headline={data?.heroHeadline ?? 'CO-CREATION CHALLENGE'}
        subline={data?.heroSubline ?? 'Reale Mittelstandsprobleme gemeinsam lösen'}
        body={
          data?.heroBody ??
          'Ein geführter Innovationssprint für ausgewählte Studierende und Young Professionals. Gemeinsam mit Unternehmensvertretern, Mentorinnen und Coaches entwickelt ihr erste Lösungen für echte Herausforderungen aus dem Mittelstand.'
        }
        note={
          data?.heroNote ??
          'Die Bewerbung ist niedrigschwellig. Finale Details zu Unternehmen, Challenges und Pitch-Format folgen. Das Startup Contacts Ticket inkl. Verpflegung etc. ist in der Bewerbung mit inbegriffen.'
        }
        bewerbungsUrl={data?.bewerbungsUrl}
      />

      <div className="relative bg-black overflow-hidden">
        {/* === 1. Was ist die Challenge === */}
        <WasIstChallenge
          eyebrow={data?.wasIstChallengeEyebrow}
          headline={data?.wasIstChallengeHeadline}
          intro={data?.wasIstChallengeIntro}
          karten={wasIstChallengeKarten}
        />

        {/* === 2. Warum teilnehmen === */}
        <WarumTeilnehmen
          eyebrow={data?.warumTeilnehmenEyebrow}
          headline={data?.warumTeilnehmenHeadline}
          intro={data?.warumTeilnehmenIntro}
          karten={warumTeilnehmenKarten}
          backgroundImageUrl={warumTeilnehmenBgUrl}
        />

        {/* === CTA-Strip nach Warum-teilnehmen === */}
        <InlineCTA bewerbungsUrl={data?.bewerbungsUrl} />

        {/* === 3. Ablauf / Sprint-Struktur === */}
        <AblaufTimeline stations={data?.ablaufStations} />

        {/* === 3a. Hybride Lösungen für reale Systeme === */}
        <HybrideLoesungen
          eyebrow={data?.hybrideLoesungenEyebrow}
          headline={data?.hybrideLoesungenHeadline}
          intro={data?.hybrideLoesungenIntro}
          imageUrl={hybrideLoesungenImageUrl}
          imageTitle={data?.hybrideLoesungenImageTitle}
          imageSubtitle={data?.hybrideLoesungenImageSubtitle}
          imageBody={data?.hybrideLoesungenImageBody}
          karten={data?.hybrideLoesungenKarten}
        />

        {/* === 4. Innovationsfokus === */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
              <span className="text-white">DIE </span>
              <span className="gradient-text">INNOVATIONSFELDER</span>
            </h2>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
              Aus sechs Themenfeldern, die unsere Lead-Unternehmen mitbringen.
            </p>
            <FokusfeldGrid fokusfelder={fokusfelderWithUrls} />
          </div>
        </section>

        {/* === 5. Gemeinsam mit R-Factory === */}
        <PartnerSection
          rFactoryLogoUrl={rFactoryLogoUrl}
          vcmDescription={data?.vcmDescription}
          rFactoryDescription={data?.rFactoryDescription}
        />

        {/* === 6. Bewerbungs-CTA === */}
        <BewerbungsCTA
          headline={data?.ctaHeadline}
          text={data?.ctaText}
          bewerbungsUrl={data?.bewerbungsUrl}
          backgroundImageUrl={ctaBgUrl}
          sideImages={ctaSideImages}
        />

        {/* === 7. FAQ === */}
        <FAQSection />
      </div>
    </>
  )
}
