import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { innovationVillagePageQuery, exhibitors2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import InfoTabs from './InfoTabs'

interface PageData {
  heroImage?: { asset: { _ref: string } }
  heroSubtext?: string
  ausstellerImage?: { asset: { _ref: string } }
  ausstellerText1?: string
  ausstellerText2?: string
  ausstellerCta?: string
  besucherImage?: { asset: { _ref: string } }
  besucherText1?: string
  besucherText2?: string
  besucherCta?: string
}

interface Exhibitor {
  _id: string
  name: string
  logo?: { asset: { _ref: string } }
}

async function getPageData(): Promise<PageData | null> {
  return client.fetch(innovationVillagePageQuery, {}, { cache: 'no-store' })
}

async function getExhibitors(): Promise<Exhibitor[]> {
  return client.fetch(exhibitors2025Query, {}, { cache: 'no-store' })
}

export default async function InnovationVillagePage() {
  const [data, exhibitors] = await Promise.all([getPageData(), getExhibitors()])

  const subtext = data?.heroSubtext || 'Wer war zuletzt dabei? Schau dir unsere Aussteller an – oder werde selbst Teil des Innovation Village!'

  const ausstellerTab = {
    image: data?.ausstellerImage ? urlFor(data.ausstellerImage).width(800).height(1000).url() : undefined,
    text1: data?.ausstellerText1 || 'Im Innovation Village triffst du auf genau die Menschen, die deine Projekte voranbringen können.\nVon neugierigen Studierenden bis hin zu Young Professionals mit ersten Erfahrungen – auf unsere Messe stehen besonders junge Talente im Vordergrund. Zeige woran du arbeitest und komme direkt mit potenziellen Kunden, Bewerbern oder Partnern ins Gespräch.',
    text2: data?.ausstellerText2 || 'Neben Sichtbarkeit für dein Produkt oder deine Marke bietet das Village vor allem eins: Echten Austausch auf Augenhöhe. Wer dabei sein möchte, sichert sich nicht nur einen Platz mitten im Geschehen sondern auch Zugang zu den Talenten von morgen.',
    cta: data?.ausstellerCta || 'Du möchtest als Aussteller dabei sein? Wir freuen uns über deine Nachricht!',
    heading: 'FÜR',
    headingHighlight: 'AUSSTELLER',
    buttonText: 'Kontaktiere uns!',
    buttonLink: 'mailto:info@ventureclub-muenster.de',
  }

  const besucherTab = {
    image: data?.besucherImage ? urlFor(data.besucherImage).width(800).height(1000).url() : undefined,
    text1: data?.besucherText1 || 'Im Innovation Village warten über 30 Aussteller darauf, dich an ihren Ständen zu begrüßen. Ob du einfach neugierig bist, spannende Gespräche suchst oder auf Jobsuche bist. Hier bist du genau richtig.\nIn persönlicher Atmosphäre lernst du innovative Lösungen, neue Ansätze und Menschen kennen, die mit Leidenschaft dabei sin. Lass dich inspirieren – direkt, nahbar und auf Augenhöhe.',
    text2: data?.besucherText2 || 'Neben kleinen Goodies erwarten dich inspirierenden Gespräche und viele spannende Leute. Ob Startup oder etabliertes, innovatives Unternehmen: Das Innovation Village ist der perfekte Ort, um dich auszutauschen und Kontakte zu knüpfen. Vielleicht sogar für dein nächstes Projekt.',
    cta: data?.besucherCta || 'Klingt spannend? Melde dich jetzt für unseren Newsletter an, um nichts mehr zu verpassen!',
    heading: 'FÜR',
    headingHighlight: 'BESUCHER',
    buttonText: 'Jetzt Anmelden!',
    buttonLink: '/newsletter',
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
        {data?.heroImage ? (
          <Image
            src={urlFor(data.heroImage).width(1920).height(1080).url()}
            alt="Innovation Village"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' }}
          >
            <span className="text-sc-orange">INNOVATION </span>
            <span className="text-white">VILLAGE</span>
          </h1>

          <p className="text-white/80 text-sm md:text-base mt-6 max-w-2xl mx-auto">
            {subtext}
          </p>
        </div>
      </section>

      {/* Tabbed Info Section */}
      <InfoTabs aussteller={ausstellerTab} besucher={besucherTab} />

      {/* Aussteller Grid */}
      <section id="aussteller" className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
            <span className="text-white">AUSSTELLER DER </span>
            <span className="text-sc-orange">STARTUP CONTACTS</span>
          </h2>

          <p className="text-white/60 text-sm md:text-base text-center mb-12">
            Klicke auf eines der Logos, um mehr über unsere Aussteller zu erfahren!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exhibitors.map((ex) => (
              <div
                key={ex._id}
                className="flex items-center justify-center bg-gray-100 rounded-xl h-20 md:h-24 px-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                {ex.logo ? (
                  <Image
                    src={urlFor(ex.logo).width(400).height(200).url()}
                    alt={ex.name}
                    width={200}
                    height={80}
                    className="object-contain max-h-12 md:max-h-16 w-auto"
                  />
                ) : (
                  <span className="text-black/60 text-sm font-medium text-center">
                    {ex.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
