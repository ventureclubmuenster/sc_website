import { urlFor } from '@/lib/sanity/image'

interface ImageField {
  asset: { _ref: string }
}

interface ExhibitorSource {
  _id: string
  name: string
  logo?: ImageField
  whiteLogo?: ImageField
  whiteBackground?: boolean
}

export interface CuratedExhibitor {
  _id: string
  name: string
  logoUrl?: string
  whiteLogoUrl?: string
  whiteBackground: boolean
  url?: string
}

// Manuell in Sanity hochgeladene Logos für die Sektion "Wer dabei ist".
interface ManualExhibitorLogo {
  name?: string
  logo?: ImageField
  whiteBackground?: boolean
  url?: string
}

// Wandelt die in Sanity manuell gepflegten Logos in das ExhibitorGrid-Format um.
export function mapManualExhibitors(logos: ManualExhibitorLogo[]): CuratedExhibitor[] {
  return logos.map((e, index) => ({
    _id: `manual-${index}`,
    name: e.name ?? '',
    logoUrl: e.logo ? urlFor(e.logo).width(600).fit('max').url() : undefined,
    whiteLogoUrl: undefined,
    whiteBackground: e.whiteBackground ?? false,
    url: e.url,
  }))
}

interface CuratedConfig {
  name: string
  // Lokales Fallback-Logo aus /public, falls in Sanity kein Aussteller mit dem
  // Namen existiert.
  localLogo?: string
  // Hintergrund der Kachel beim lokalen Fallback (true = weiße Kachel).
  localWhiteBackground?: boolean
}

// Diese Aussteller werden in genau dieser Reihenfolge in der Sektion
// "WER DABEI IST" auf den Seiten "Startups", "Unternehmen" und "Talente" gezeigt.
// Vorhandene Sanity-Aussteller (exhibitor2025) werden per Namen gematcht; fehlt
// einer, wird das lokale Fallback-Logo verwendet.
const CURATED: CuratedConfig[] = [
  { name: 'Leadership Hub', localLogo: '/logos/leadership-hub.png', localWhiteBackground: true },
  { name: 'NRW Bank' },
  { name: 'flatsforfriendz', localLogo: '/logos/flatsforfriendz.png', localWhiteBackground: false },
  { name: 'Clockin' },
]

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

export function buildCuratedExhibitors(all: ExhibitorSource[]): CuratedExhibitor[] {
  return CURATED.map((cfg, index) => {
    const match = all.find((ex) => normalize(ex.name) === normalize(cfg.name))

    if (match) {
      return {
        _id: match._id,
        name: match.name,
        logoUrl: match.logo ? urlFor(match.logo).width(600).fit('max').url() : undefined,
        whiteLogoUrl: match.whiteLogo ? urlFor(match.whiteLogo).width(600).fit('max').url() : undefined,
        whiteBackground: match.whiteBackground ?? false,
      }
    }

    // Kein Sanity-Aussteller gefunden -> lokales Fallback-Logo nutzen.
    return {
      _id: `curated-${index}`,
      name: cfg.name,
      logoUrl: cfg.localLogo,
      whiteLogoUrl: undefined,
      whiteBackground: cfg.localWhiteBackground ?? false,
    }
  })
}
