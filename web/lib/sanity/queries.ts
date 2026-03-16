import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    clubLogo,
    eventDate,
    navLinks[] {
      label,
      href
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`

export const landingPageQuery = groq`
  *[_type == "landingPage"][0] {
    stellDirVorSpeaker,
    stellDirVorBesucher,
    stellDirVorStaende,
    networkingBg,
    erwartungCoCreation,
    erwartungWorkshops,
    erwartungBuehne,
    erwartungSideEvents,
    wenStartups,
    wenCorporates,
    wenTalente,
    wenInvestoren,
    whyUs[] {
      title,
      bgImage
    }
  }
`

export const speakersQuery = groq`
  *[_type == "speaker2026"] | order(name asc) {
    _id,
    name,
    slug,
    title,
    bio,
    image,
    socialLinks
  }
`

export const speakers2025Query = groq`
  *[_type == "speaker2025"] | order(orderRank asc) {
    _id,
    name,
    title,
    stage,
    image,
    socialLinks {
      linkedin
    }
  }
`

export const programQuery = groq`
  *[_type == "program"] | order(orderRank asc) {
    _id,
    title,
    type,
    startTime,
    endTime,
    location,
    description,
    speakers[]-> {
      _id,
      name,
      title,
      image
    }
  }
`

export const partnersQuery = groq`
  *[_type == "partner2026"] | order(orderRank asc) {
    _id,
    name,
    category,
    logo,
    url
  }
`

export const exhibitorsQuery = groq`
  *[_type == "exhibitor2026"] | order(orderRank asc) {
    _id,
    name,
    type,
    description,
    standNumber,
    logo
  }
`

export const teamQuery = groq`
  *[_type == "team"] | order(orderRank asc) {
    _id,
    name,
    role,
    image,
    linkedin
  }
`

export const partners2025Query = groq`
  *[_type == "partner2025"] | order(orderRank asc) {
    _id,
    name,
    category,
    logo,
    url
  }
`

export const studierendePageQuery = groq`
  *[_type == "studierendePage"][0] {
    "heroVideoUrl": heroVideo.asset->url,
    heroHeadingPrefix,
    heroHeadingHighlight,
    heroSubtext,
    heroDateLine,
    featureCards[] {
      title,
      hoverText,
      image
    }
  }
`

export const exhibitors2025Query = groq`
  *[_type == "exhibitor2025"] | order(orderRank asc) {
    _id,
    name,
    logo
  }
`

export const innovationVillagePageQuery = groq`
  *[_type == "innovationVillagePage"][0] {
    heroImage,
    heroSubtext,
    ausstellerImage,
    ausstellerText1,
    ausstellerText2,
    ausstellerCta,
    besucherImage,
    besucherText1,
    besucherText2,
    besucherCta
  }
`

export const advisoryBoardQuery = groq`
  *[_type == "advisoryBoard"] | order(orderRank asc) {
    _id,
    name,
    role,
    image,
    linkedin
  }
`
