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
    formatItems[] {
      title,
      description,
      buttonText,
      buttonLink,
      image,
      wide
    },
    wenStartups,
    wenCorporates,
    wenTalente,
    wenInvestoren,
    hallOfFame[]-> {
      _id,
      name,
      title,
      image,
      slug,
      socialLinks
    },
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
    linkedin,
    year
  }
`

export const partners2025Query = groq`
  *[_type == "partner2025"] | order(orderRank asc) {
    _id,
    name,
    category,
    logo,
    whiteBackground,
    url
  }
`

export const studierendePageQuery = groq`
  *[_type == "studierendePage"] | order(_updatedAt desc)[0] {
    heroImage,
    heroHeadline,
    heroSubtext,
    heroHighlight,
    featureCards[] {
      title,
      subheader,
      hoverText,
      image
    },
    bentoItems[] {
      title,
      buttonText,
      buttonLink,
      image
    },
    programCards[] {
      title,
      buttonText,
      buttonLink,
      image
    }
  }
`

export const podcastPageQuery = groq`
  *[_type == "podcastPage"][0] {
    heroImage,
    quote,
    quoteAuthor,
    podcastEpisodes[] {
      guestName,
      title,
      description,
      youtubeId
    },
    studioImage
  }
`

export const exhibitors2025Query = groq`
  *[_type == "exhibitor2025"] | order(orderRank asc) {
    _id,
    name,
    logo,
    whiteLogo,
    whiteBackground
  }
`

export const innovationVillagePageQuery = groq`
  *[_type == "innovationVillagePage" && _id == "innovationVillagePage"][0] {
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

export const unternehmenPageQuery = groq`
  *[_type == "unternehmenPage"][0] {
    heroImage,
    bentoStartupSzene,
    bentoVipAccess,
    bentoFoodDrinks,
    bentoExperience,
    bentoAfterwork,
    bentoInnovationVillage
  }
`

export const startupsPageQuery = groq`
  *[_type == "startupsPage"][0] {
    heroImage,
    featuredExhibitors[]-> {
      _id,
      name,
      logo,
      whiteLogo,
      whiteBackground
    }
  }
`

export const fokusfelderQuery = groq`
  *[_type == "fokusfelder"][0] {
    fokusProduktion,
    fokusLogistik,
    fokusEnergie,
    fokusBau,
    fokusInfrastruktur,
    fokusLifestyle
  }
`

export const startups2025Query = groq`
  *[_type == "exhibitor2025" && type == "Startup"] | order(orderRank asc) {
    _id,
    name,
    logo
  }
`

export const investorenPageQuery = groq`
  *[_type == "investorenPage"][0] {
    heroImage,
    bentoInvestorBreakfast,
    bentoLetztesJahr,
    bentoMuensterTop5,
    bentoVipArea,
    bentoMeetGreet
  }
`

export const workshopsPageQuery = groq`
  *[_type == "workshopsPage" && _id == "workshopsPage"][0] {
    heroImage,
    workshopHistory[] {
      title,
      speaker,
      description,
      logo,
      logoWhiteBg,
      logo2,
      logo2WhiteBg
    },
    previewTopics[] {
      category,
      title,
      image
    }
  }
`

export const mainStagePageQuery = groq`
  *[_type == "mainStagePage" && _id == "mainStagePage"][0] {
    heroImage,
    flashbackTitle,
    flashbackTags,
    hallOfFame[]-> {
      _id,
      name,
      title,
      image,
      slug,
      socialLinks
    }
  }
`

export const ueberUnsPageQuery = groq`
  *[_type == "ueberUnsPage"] | order(_updatedAt desc)[0] {
    heroImage,
    missionCards[] {
      title,
      hoverText,
      image
    },
    timelineEntries[] {
      year,
      image,
      imagePosition,
      textBlocks
    }
  }
`

export const sharedFormatItemsQuery = groq`
  *[_type == "formateGrid" && _id == "formateGrid"][0].items[] {
    title,
    description,
    buttonText,
    buttonLink,
    image,
    wide
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
