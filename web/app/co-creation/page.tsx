import { client } from '@/lib/sanity/client'
import { coCreationPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import CoCreationHero from './CoCreationHero'
import WasIstChallenge from './WasIstChallenge'
import WarumTeilnehmen from './WarumTeilnehmen'
import AblaufTimeline from './AblaufTimeline'
import HybrideLoesungen from './HybrideLoesungen'
import PartnerSection from './PartnerSection'
import FAQSection from './FAQSection'
import MesseUnternehmen from './MesseUnternehmen'

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

interface MesseUnternehmenField {
  name: string
  bereich?: string
  logo?: ImageField
  logoWhiteBg?: boolean
  link?: string
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
  messeUnternehmenHeadline?: string
  messeUnternehmenIntro?: string
  messeUnternehmen?: MesseUnternehmenField[]
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

async function getPageData(): Promise<CoCreationPageData | null> {
  return client.fetch(coCreationPageQuery, {}, { cache: 'no-store' })
}

export default async function CoCreationPage() {
  const data = await getPageData()

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  const rFactoryLogoUrl = data?.rFactoryLogo
    ? urlFor(data.rFactoryLogo).width(400).fit('max').url()
    : undefined

  const warumTeilnehmenBgUrl = data?.warumTeilnehmenBackgroundImage
    ? urlFor(data.warumTeilnehmenBackgroundImage).width(1920).height(1080).url()
    : undefined

  const hybrideLoesungenImageUrl = data?.hybrideLoesungenImage
    ? urlFor(data.hybrideLoesungenImage).width(1200).height(1400).fit('crop').url()
    : undefined

  const messeUnternehmenItems = data?.messeUnternehmen?.map((c) => ({
    name: c.name,
    bereich: c.bereich,
    logoUrl: c.logo ? urlFor(c.logo).width(400).auto('format').url() : undefined,
    logoWhiteBg: c.logoWhiteBg,
    link: c.link,
  }))

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
        body={
          data?.heroBody ??
          'Ein geführter Innovationssprint für ausgewählte Studierende und Young Professionals. Gemeinsam mit Unternehmensvertretern, Mentorinnen und Coaches entwickelt ihr erste Lösungen für echte Herausforderungen aus dem Mittelstand.'
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

        {/* === 1b. Challenge Geber === */}
        <MesseUnternehmen items={messeUnternehmenItems} />

        {/* === 2. Warum teilnehmen === */}
        <WarumTeilnehmen
          eyebrow={data?.warumTeilnehmenEyebrow}
          headline={data?.warumTeilnehmenHeadline}
          intro={data?.warumTeilnehmenIntro}
          karten={warumTeilnehmenKarten}
          backgroundImageUrl={warumTeilnehmenBgUrl}
        />

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

        {/* === 5. Gemeinsam mit R-Factory === */}
        <PartnerSection
          rFactoryLogoUrl={rFactoryLogoUrl}
          vcmDescription={data?.vcmDescription}
          rFactoryDescription={data?.rFactoryDescription}
        />

        {/* === 7. FAQ === */}
        <FAQSection />
      </div>
    </>
  )
}
