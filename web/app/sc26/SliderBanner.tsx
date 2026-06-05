import { urlFor } from '@/lib/sanity/image'
import type { AdSliderLogo } from './sanity'

/**
 * Logo-Slidebanner der Ad Landing Page — 1:1 nachgebaut nach dem geteilten
 * components/PartnerBanner.tsx, aber gespeist aus dem eigenen Feld `sliderLogos`
 * der adLandingPage-Vorlage (add-only, der geteilte PartnerBanner bleibt unangetastet).
 */

// Ein Logo kommt aus Sanity (image) oder ist ein lokales Fallback (src).
interface LogoItem {
  name?: string
  image?: object
  src?: string
  whiteBackground?: boolean
  isOpaque?: boolean
  scalePercent?: number
}

// Fallback-Logos = identisch zur Startseite, solange in Sanity nichts gepflegt ist.
const fallbackLogos: LogoItem[] = [
  { name: 'clockin', src: '/partners-banner/clockin.png' },
  { name: 'liba', src: '/partners-banner/liba.png' },
  { name: 'Google Cloud', src: '/partners-banner/google-cloud.svg' },
  { name: 'NRW.BANK', src: '/partners-banner/nrw-bank.png' },
  { name: 'Placke-Kulemann', src: '/partners-banner/placke-kulemann.png' },
  { name: 'web computing', src: '/partners-banner/web-computing.png' },
]

function srcFor(logo: LogoItem): string {
  if (logo.image) return urlFor(logo.image).height(200).fit('max').auto('format').url()
  return logo.src ?? ''
}

function isOnLight(logo: LogoItem): boolean {
  if (logo.whiteBackground === true) return true
  if (logo.whiteBackground === false) return false
  return logo.isOpaque === true
}

function isSplash(logo: LogoItem): boolean {
  return logo.name?.trim().toLowerCase() === 'splash'
}

export default function SliderBanner({ logos }: { logos?: AdSliderLogo[] }) {
  const fromSanity = (logos ?? []).filter((l) => l?.image) as LogoItem[]
  const list = fromSanity.length > 0 ? fromSanity : fallbackLogos
  if (list.length === 0) return null

  const perHalf = Math.max(2, Math.ceil(8 / list.length))
  const half = Array.from({ length: perHalf }).flatMap(() => list)
  const loop = [...half, ...half]

  return (
    <section className="relative py-4 md:py-8 overflow-hidden bg-black">
      <div
        className="relative w-full overflow-hidden opacity-70 md:opacity-100"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="marquee-scroll flex items-center gap-6 md:gap-24 w-max">
          {loop.map((logo, i) => {
            const onLight = isOnLight(logo)
            const keepOriginal = onLight || isSplash(logo)
            const filter = keepOriginal ? undefined : 'brightness(0) invert(1)'
            const key = `${logo.name ?? 'logo'}-${i}`
            const scale = (logo.scalePercent ?? 100) / 100
            const imgStyle = {
              '--logo-scale': scale,
              ...(filter ? { filter } : {}),
            } as React.CSSProperties
            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={srcFor(logo)}
                alt={logo.name ?? 'Partner'}
                className="logo-img shrink-0 w-auto object-contain"
                style={imgStyle}
              />
            )
            return onLight ? (
              <div
                key={key}
                className="shrink-0 flex items-center rounded-lg bg-white px-3 py-1.5"
              >
                {img}
              </div>
            ) : (
              <div key={key} className="shrink-0 flex items-center">
                {img}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
