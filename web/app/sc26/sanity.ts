import { client } from '@/lib/sanity/client'

/**
 * Inline GROQ-Query für die Ad Landing Page (/sc26).
 * Bewusst hier lokal definiert, damit die geteilte lib/sanity/queries.ts unangetastet bleibt.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImage = any

export interface AdStat {
  _key?: string
  number?: string
  label?: string
  image?: SanityImage
}

export interface AdFormat {
  _key?: string
  title?: string
  description?: string
  image?: SanityImage
}

export interface AdLinkedIn {
  _key?: string
  name?: string
  url?: string
}

export interface AdSpeaker {
  _key?: string
  name?: string
  role?: string
  image?: SanityImage
  linkedins?: AdLinkedIn[]
}

export interface AdSliderLogo {
  _key?: string
  name?: string
  image?: SanityImage
  whiteBackground?: boolean
  scalePercent?: number
  isOpaque?: boolean
}

export interface AdZielgruppe {
  _key?: string
  label?: string
  image?: SanityImage
}

export interface AdLogo {
  _key?: string
  name?: string
  logo?: SanityImage
  url?: string
  whiteBackground?: boolean
}

export interface AdFaq {
  _key?: string
  question?: string
  answer?: string
}

export interface AdLandingPage {
  ticketUrl?: string
  ctaLabel?: string

  heroHeadline?: string
  heroHeadlineMuted?: string
  heroSubline?: string
  heroDateLabel?: string
  heroLocationLabel?: string
  heroVideoUrl?: string | null

  sliderLogos?: AdSliderLogo[]

  statsHeading?: string
  statsSubheading?: string
  stats?: AdStat[]

  formateHeading?: string
  formatItems?: AdFormat[]

  speakerHeading?: string
  speakers?: AdSpeaker[]

  zielgruppenHeading?: string
  zielgruppen?: AdZielgruppe[]

  logosHeading?: string
  companyLogos?: AdLogo[]

  faqHeading?: string
  faq?: AdFaq[]
}

const adLandingPageQuery = `
  *[_type == "adLandingPage" && _id in ["adLandingPage", "drafts.adLandingPage"]][0] {
    ticketUrl,
    ctaLabel,
    heroHeadline,
    heroHeadlineMuted,
    heroSubline,
    heroDateLabel,
    heroLocationLabel,
    "heroVideoUrl": heroVideo.asset->url,
    sliderLogos[]{ _key, name, whiteBackground, scalePercent, image, "isOpaque": image.asset->metadata.isOpaque },
    statsHeading,
    statsSubheading,
    stats[]{ _key, number, label, image },
    formateHeading,
    formatItems[]{ _key, title, description, image },
    speakerHeading,
    speakers[]{ _key, name, role, image, linkedins[]{ _key, name, url } },
    zielgruppenHeading,
    zielgruppen[]{ _key, label, image },
    logosHeading,
    companyLogos[]{ _key, name, logo, url, whiteBackground },
    faqHeading,
    faq[]{ _key, question, answer }
  }
`

export async function getAdLandingPage(): Promise<AdLandingPage | null> {
  return client.fetch(adLandingPageQuery, {}, { cache: 'no-store' })
}
