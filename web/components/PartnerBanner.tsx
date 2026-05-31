import { client } from '@/lib/sanity/client'
import { logoSliderQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

// Ein Logo kommt entweder aus Sanity (image) oder ist ein lokales Fallback (src).
interface LogoItem {
  name?: string
  image?: object
  src?: string
  // true = heller/weißer Hintergrund -> Logo wird auf weißer Fläche in Originalfarbe gezeigt.
  whiteBackground?: boolean
  // Aus den Sanity-Metadaten: hat das Bild KEINE Transparenz (= meist weißer Hintergrund)?
  isOpaque?: boolean
  // Individuelle Größe in % (100 = Standard).
  scalePercent?: number
}

// Fallback-Logos, solange im Sanity-"Logo-Slider" noch keine Logos gepflegt sind.
// Sobald in Sanity Logos hinzugefügt werden, ersetzen diese den Fallback automatisch.
const fallbackLogos: LogoItem[] = [
  { name: 'clockin', src: '/partners-banner/clockin.png' },
  { name: 'liba', src: '/partners-banner/liba.png' },
  { name: 'Google Cloud', src: '/partners-banner/google-cloud.svg' },
  { name: 'NRW.BANK', src: '/partners-banner/nrw-bank.png' },
  { name: 'Placke-Kulemann', src: '/partners-banner/placke-kulemann.png' },
  { name: 'web computing', src: '/partners-banner/web-computing.png' },
]

async function getLogos(): Promise<LogoItem[]> {
  const data = await client.fetch<{ logos?: LogoItem[] }>(
    logoSliderQuery,
    {},
    { cache: 'no-store' },
  )
  const fromSanity = (data?.logos ?? []).filter((l) => l?.image)
  return fromSanity.length > 0 ? fromSanity : fallbackLogos
}

function srcFor(logo: LogoItem): string {
  if (logo.image) return urlFor(logo.image).height(200).fit('max').auto('format').url()
  return logo.src ?? ''
}

// Logo auf hellem Hintergrund? Manueller Schalter hat Vorrang, sonst Auto-Erkennung
// über die Sanity-Metadaten (Bild ohne Transparenz = i.d.R. weißer Hintergrund).
function isOnLight(logo: LogoItem): boolean {
  if (logo.whiteBackground === true) return true
  if (logo.whiteBackground === false) return false
  return logo.isOpaque === true
}

export default async function PartnerBanner() {
  const logos = await getLogos()
  if (logos.length === 0) return null

  // Für einen nahtlosen, lückenlosen Lauf wird die Logo-Reihe so oft wiederholt,
  // dass eine Hälfte breiter als der Bildschirm ist. Die zweite (identische) Hälfte
  // sorgt zusammen mit der Animation (translateX 0 → -50%) für den nahtlosen Übergang.
  const perHalf = Math.max(2, Math.ceil(8 / logos.length))
  const half = Array.from({ length: perHalf }).flatMap(() => logos)
  const loop = [...half, ...half]

  return (
    <section className="relative bg-black py-4 md:py-8 overflow-hidden">
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
            const key = `${logo.name ?? 'logo'}-${i}`
            const scale = (logo.scalePercent ?? 100) / 100
            const imgStyle = {
              '--logo-scale': scale,
              ...(onLight ? {} : { filter: 'brightness(0) invert(1)' }),
            } as React.CSSProperties
            // eslint-disable-next-line @next/next/no-img-element
            const img = (
              <img
                src={srcFor(logo)}
                alt={logo.name ?? 'Partner'}
                className="logo-img shrink-0 w-auto object-contain"
                style={imgStyle}
              />
            )
            // Logos mit hellem Hintergrund bekommen eine weiße Fläche, damit sie
            // (in Originalfarbe) erkennbar bleiben statt als weißer Block zu verschwinden.
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
