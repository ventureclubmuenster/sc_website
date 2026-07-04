import type { Metadata } from 'next'
import Link from 'next/link'
import GlowButton from '@/components/GlowButton'

export const metadata: Metadata = {
  title: {
    absolute: 'Startup Contacts 2026 | Startup Messe Münster in der Halle Münsterland',
  },
  description:
    'Startup Contacts 2026: größte studentisch organisierte Startup Messe in NRW. 8. Juni 2027, Halle Münsterland Münster. Jetzt Tickets sichern.',
  alternates: { canonical: 'https://www.startup-contacts.de' },
  openGraph: {
    title: 'Startup Contacts 2026 | Startup Messe Münster',
    description:
      'Größte studentisch organisierte Startup Messe in NRW. 8. Juni 2027, Halle Münsterland Münster. Co-Creation zwischen Startups, Mittelstand und Talenten.',
    url: 'https://www.startup-contacts.de',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Startup Contacts 2026',
  description:
    'Deutschlands größte studentisch organisierte Startup Messe und Co-Creation Event in der Halle Münsterland in Münster, NRW. Networking, Workshops, Main Stage und Innovation Village für Startups, Talente und Mittelstand.',
  startDate: '2027-06-08T09:00:00+02:00',
  endDate: '2027-06-08T22:00:00+02:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Halle Münsterland',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Albersloher Weg 32',
      postalCode: '48155',
      addressLocality: 'Münster',
      addressCountry: 'DE',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Venture Club Münster e.V.',
    url: 'https://ventureclub-muenster.de',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.startup-contacts.de/tickets',
    availability: 'https://schema.org/InStock',
  },
  image: 'https://www.startup-contacts.de/opengraph-image',
  url: 'https://www.startup-contacts.de',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wann findet die Startup Contacts 2027 statt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Startup Contacts findet am 8. Juni 2027 in der Halle Münsterland in Münster statt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was kostet ein Ticket?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Alle Ticketoptionen findest du auf unserer Ticketseite. Studierende erhalten vergünstigten Eintritt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Können Auszubildende und Schüler auch ein Student-Ticket kaufen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Auszubildende und Schüler können ebenfalls ein Student-Ticket kaufen. Ladet dazu einfach einen Ausweis eurer Schule oder Berufsschule hoch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Für wen ist die Startup Messe gedacht?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für Studierende und Talente, Gründerinnen und Gründer, mittelständische Unternehmen aus NRW und Investoren, die am deutschen Startup Ökosystem teilhaben wollen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wer organisiert die Startup Contacts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Messe wird vom Venture Club Münster e.V. organisiert, einer studentischen Initiative der Universität Münster.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wo genau ist die Halle Münsterland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Albersloher Weg 32, 48155 Münster. Gut erreichbar mit Auto, Bus und Bahn.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Formate bietet die Startup Contacts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Co-Creation Sessions, Workshops, Live Podcasts, Main Stage Talks und das Innovation Village mit Startups aus sechs Fokusfeldern.',
      },
    },
  ],
}
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { landingPageQuery, sharedFormatItemsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroCTA from '@/components/HeroCTA'
import AnimatedStatsGrid from '@/components/AnimatedStatsGrid'
import HallOfFame from '@/components/HallOfFame'
import FormatSection from '@/components/FormatSection'
import RotatingWords from '@/components/RotatingWords'
import HeroVideo from '@/components/HeroVideo'
import PartnerBanner from '@/components/PartnerBanner'
import SaveTheDate from '@/components/SaveTheDate'

async function getLandingPage() {
  return client.fetch(landingPageQuery, {}, { cache: 'no-store' })
}

export default async function Home() {
  const [data, formatItems] = await Promise.all([
    getLandingPage(),
    client.fetch(sharedFormatItemsQuery, {}, { cache: 'no-store' }),
  ])

  const statsCards = [
    { number: '20+', label: 'Speaker & Themen', image: data?.stellDirVorSpeaker },
    { number: '1000+', label: 'Besucher', image: data?.stellDirVorBesucher },
    { number: '35+', label: 'Stände', image: data?.stellDirVorStaende },
  ]

  const wenCards = [
    { label: 'Startups', href: '/startups', image: data?.wenStartups },
    { label: 'Corporates', href: '/unternehmen', image: data?.wenCorporates },
    { label: 'Talente', href: '/talente', image: data?.wenTalente },
    { label: 'Investoren', href: '/investoren', image: data?.wenInvestoren },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ── Hero Section ── */}
      <section className="bg-black overflow-x-hidden -mt-24">

        {/* ── Mobile layout: video stacked above content ── */}
        <div className="lg:hidden flex flex-col">
          {/* Spacer for fixed navbar */}
          <div className="h-[80px]" />

          {/* Hero video */}
          <div className="relative w-full aspect-video overflow-hidden">
            <HeroVideo videoUrl={data?.heroVideoUrl} youtubeId="1NUZVnJK3XE" />
          </div>

          {/* Content below video */}
          <div className="px-4 pt-6 pb-2">
            <h1 className="font-bold uppercase leading-[0.85] tracking-tighter text-white text-[clamp(1.75rem,7.5vw,4rem)] -ml-0.5">
              Zukunft
              <br />
              <span className="text-white/55">durch</span>
              <br />
              Zusammenarbeit<span className="gradient-text">.</span>
            </h1>

            <p className="mt-4 text-white/60 text-sm leading-snug">
              Die größte studentisch organisierte Startup Messe in NRW.
              <br />
              Erlebe co-creation zwischen Startups, Talenten und Mittelstand.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col font-bold uppercase tracking-tight">
                <span className="text-xl gradient-text">8. Juni 2027</span>
                <span className="text-sm text-white/60">Halle Münsterland</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <HeroCTA small />
              </div>
            </div>
          </div>
          <div>
            <PartnerBanner />
          </div>
        </div>

        {/* ── Desktop layout: full-screen video background ── */}
        <div className="relative hidden lg:flex min-h-screen flex-col justify-end">
          <HeroVideo videoUrl={data?.heroVideoUrl} youtubeId="1NUZVnJK3XE" cover />

          {/* Content — editorial layout, bottom-aligned, full bleed */}
          <div className="relative z-10 w-full px-8 pt-32">
            <h1 className="h-display text-white -ml-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 6.5rem)' }}>
              Zukunft
              <br />
              <span className="text-white/55">durch</span>
              <br />
              Zusammenarbeit<span className="gradient-text">.</span>
            </h1>

            <p className="mt-8 text-white/60 text-base md:text-lg lg:text-xl leading-snug">
              Die größte studentisch organisierte Startup Messe in NRW.
              <br />
              Erlebe co-creation zwischen Startups, Talenten und Mittelstand.
            </p>

            <div className="mt-8 flex flex-row items-end gap-10">
              <div className="flex flex-col font-bold uppercase tracking-tight">
                <span className="text-xl md:text-2xl gradient-text">8. Juni 2027</span>
                <span className="text-base md:text-lg text-white/60">Halle Münsterland</span>
              </div>
              <div className="flex flex-1 items-center gap-4">
                <HeroCTA large />
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-10">
            <PartnerBanner />
          </div>
        </div>

      </section>

      {/* ── Save the Date 2027 + Newsletter ── */}
      <SaveTheDate />

      {/* ── Stell dir vor was ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        {/* Repeating "Startup Contacts" watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.03] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
            </span>
          ))}
        </div>
        <div className="relative z-10">
          <h2 className="h-section text-center">
            Stell <span className="gradient-text">dir</span> vor was...
          </h2>

          <AnimatedStatsGrid
            cards={statsCards.map((stat) => ({
              number: stat.number,
              label: stat.label,
              imageUrl: stat.image ? urlFor(stat.image).width(600).height(450).url() : undefined,
            }))}
          />

          <h2 className="h-section text-center mt-12">
            <span className="gradient-text">...Gemeinsam</span> erreichen können
          </h2>
        </div>
      </section>

      {/* ── Wir haben ... (rotating words) ── */}
      <RotatingWords />

      {/* ── Networking Together ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Top and bottom black fade */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>
        {data?.networkingBg && (
          <Image
            src={urlFor(data.networkingBg).width(1920).height(1080).url()}
            alt="Networking Together"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
          />
        )}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="relative inline-block text-white/40">
              Net
              <svg
                className="absolute left-[-6%] top-[33%] w-[112%] h-[45%] pointer-events-none"
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 24 C8 22, 14 20, 30 17 C60 12, 120 10, 160 12 C180 13, 192 14, 197 16
                     C194 18, 186 19, 170 19 C130 20, 60 22, 25 26 C14 28, 8 28, 4 24Z"
                  fill="#FF5E00"
                  fillOpacity="0.75"
                />
              </svg>
            </span>
            <span className="gradient-text">working</span>
            <span className="text-white"> together</span>
          </h2>

          <div className="mt-10 space-y-6">
            <p className="body">
              Für die Zukunft braucht es neue Lösungen. Doch für welche Probleme? Und mit welchen Tools?
            </p>
            <p className="body">
              Auf der Startup Contacts fördern wir den Austausch und die Zusammenarbeit zur Entwicklung
              gemeinsamer Lösungen und Visionen. Es geht darum, eine nachhaltige Wertschöpfung für die
              Transformation Deutschlands zu schaffen. Durch eine Verbindung aus Erfahrung und neuen Ideen.
              Dafür bringen wir die wichtigen Faktoren der Transformation an einen Ort und fördern die aktive
              Beteiligung in unseren Formaten.
            </p>
            <p className="body">
              Unser Ziel ist es, einen Beitrag dafür zu leisten, dass auf der Startup Contacts neue Lösungen
              entstehen, welche dem Mittelstand mit Hilfe von Startups und Talenten bei der Transformation
              helfen.
            </p>
          </div>

          <div className="mt-10">
            <p className="eyebrow text-center mb-4">Unsere Fokusfelder</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Produktion', 'Logistik & Einkauf', 'Energie & Nachhaltigkeit', 'Bau & Handwerk', 'Betriebsinfrastruktur', 'Lifestyle'].map((field) => (
                <span key={field} className="px-4 py-2 border border-white/20 rounded-full text-white/70 text-sm font-medium uppercase tracking-wide">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Unsere Formate (Bento Grid) ── */}
      <div className="relative bg-black overflow-hidden">
        {/* Repeating watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <span
              key={`fmt-${i}`}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.03] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
            </span>
          ))}
        </div>
        <FormatSection
          heading={<><span className="text-white">WAS </span><span className="gradient-text">DU</span><span className="text-white"> ERWARTEN KANNST</span></>}
          items={formatItems?.map((f: { title: string; description?: string; buttonText?: string; buttonLink?: string; image?: { asset: { _ref: string } }; wide?: boolean }) => ({
            title: f.title,
            description: f.description,
            buttonText: f.buttonText,
            buttonLink: f.buttonLink,
            imageUrl: f.image ? urlFor(f.image).width(800).height(600).url() : undefined,
            wide: f.wide,
          }))}
        />
      </div>

      {/* ── Wen du erwarten kannst ── */}
      <section className="relative pt-20 pb-32 px-6 bg-black overflow-hidden">
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold uppercase text-white/[0.03] pointer-events-none select-none tracking-tighter leading-none text-right">
          BESU<br />CHER
        </span>
        <div className="relative z-10">
          <h2 className="h-section text-center">
            Wen <span className="gradient-text">du</span> erwarten kannst
          </h2>

          <div className="mt-14 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wenCards.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative aspect-square sm:aspect-[3/4] rounded-2xl overflow-hidden flex items-end p-6"
              >
                {item.image && (
                  <Image
                    src={urlFor(item.image).width(500).height(667).url()}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Subtle gradient for text readability + hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-sc-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 w-full text-center text-xs lg:text-lg font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Startup Messe in NRW — Info Section ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="h-section text-center">
            Die <span className="gradient-text">Startup Messe</span> in NRW
          </h2>

          <div className="mt-12 space-y-6">
            <p className="body">
              Die Startup Contacts ist Deutschlands größte studentisch organisierte Startup Messe.
              Am 8. Juni 2027 bringen wir in der Halle Münsterland in Münster Startups,
              mittelständische Unternehmen, Studierende und Investoren zusammen.
            </p>
            <p className="body">
              Organisiert wird die Messe vom Venture Club Münster e.V., einer studentischen
              Initiative an der Universität Münster. Münster zählt mit über 60.000 Studierenden
              zu den Top-5 Gründungshochschulen in Deutschland. Dieses Potenzial nutzen wir:
              Über 30 Aussteller, 20 Speaker, fünf Veranstaltungsformate und mehr als 1.000
              Besucher machen die Startup Contacts zur zentralen Innovationsmesse in NRW.
            </p>
            <p className="body">
              Was uns von anderen Events unterscheidet, ist unser Fokus auf Co-Creation.
              Bei uns stehen nicht Vorträge und Messestände im Mittelpunkt, sondern die aktive
              Zusammenarbeit. In unseren Formaten arbeiten Startups, Unternehmen und Talente
              gemeinsam an echten Herausforderungen und entwickeln Lösungen, die den Mittelstand
              bei der Transformation unterstützen.
            </p>
            <p className="body">
              Auf unserer Main Stage sprechen Speaker von Unternehmen wie SAP LeanIX, Fiege
              und Flaschenpost. Dazu kommen Live Podcasts mit Gründerinnen und Gründern,
              praxisnahe Workshops und das Innovation Village, in dem junge Startups aus
              sechs Fokusfeldern ausstellen: Produktion, Logistik, Energie, Bau und Handwerk,
              Betriebsinfrastruktur sowie Lifestyle. So vereint die Startup Contacts 2026
              Elemente einer klassischen Startup Messe, eines Startup Kongresses und einer
              Innovation Convention an einem Tag.
            </p>
            <p className="body">
              Münster ist dafür der ideale Standort. Mit einem aktiven Startup Ökosystem
              und starken Mittelstandsunternehmen in der Region bringt die Stadt Talente,
              Gründerinnen, Gründer und Corporates zusammen. Die Halle Münsterland liegt
              zentral und ist sowohl mit dem Auto als auch per Bahn gut erreichbar. Mehr
              über die{' '}
              <Link
                href="/startups-muenster"
                className="text-sc-orange hover:underline underline-offset-4"
              >
                Startup Szene in Münster
              </Link>{' '}
              erfährst du auf unserer eigenen Seite dazu.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="min-w-0">
              <span className="block text-3xl md:text-4xl font-bold gradient-text">30+</span>
              <span className="eyebrow">Aussteller</span>
            </div>
            <div className="min-w-0">
              <span className="block text-3xl md:text-4xl font-bold gradient-text">1.000+</span>
              <span className="eyebrow">Besucher</span>
            </div>
            <div className="min-w-0">
              <span className="block text-3xl md:text-4xl font-bold gradient-text">60.000+</span>
              <span className="eyebrow">Studierende in Münster</span>
            </div>
            <div className="min-w-0">
              <span className="block text-3xl md:text-4xl font-bold gradient-text">Top 5</span>
              <span className="eyebrow">Gründungshochschule</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Aftermovie ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="h-section text-center">
            Der Startup Contacts <span className="gradient-text">2026</span> Aftermovie
          </h2>

          <div className="mt-12 relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/SAzmYtaAFhE?rel=0&modestbranding=1"
              title="Startup Contacts 2026 – Aftermovie"
              allow="encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── Hall of Fame ── */}
      {data?.hallOfFame && <HallOfFame speakers={data.hallOfFame} />}

      {/* ── FAQ ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="h-section text-center">
            Häufige Fragen zur <span className="gradient-text">Startup Contacts</span>
          </h2>

          <div className="mt-14 divide-y divide-white/10 border-t border-b border-white/10">
            {[
              {
                q: 'Wann findet die Startup Contacts 2027 statt?',
                a: 'Die Startup Contacts findet am 8. Juni 2027 in der Halle Münsterland in Münster statt.',
              },
              {
                q: 'Was kostet ein Ticket?',
                a: (
                  <>
                    Alle Ticketoptionen findest du auf unserer{' '}
                    <Link href="/tickets" className="text-sc-orange hover:underline underline-offset-4">
                      Ticketseite
                    </Link>
                    . Studierende erhalten vergünstigten Eintritt.
                  </>
                ),
              },
              {
                q: 'Können Auszubildende und Schüler auch ein Student-Ticket kaufen?',
                a: 'Ja, Auszubildende und Schüler können ebenfalls ein Student-Ticket kaufen. Ladet dazu einfach einen Ausweis eurer Schule oder Berufsschule hoch.',
              },
              {
                q: 'Für wen ist die Startup Messe gedacht?',
                a: 'Für Studierende und Talente, Gründerinnen und Gründer, mittelständische Unternehmen aus NRW und Investoren, die am deutschen Startup Ökosystem teilhaben wollen.',
              },
              {
                q: 'Wer organisiert die Startup Contacts?',
                a: 'Die Messe wird vom Venture Club Münster e.V. organisiert, einer studentischen Initiative der Universität Münster.',
              },
              {
                q: 'Wo genau ist die Halle Münsterland?',
                a: 'Albersloher Weg 32, 48155 Münster. Gut erreichbar mit Auto, Bus und Bahn.',
              },
              {
                q: 'Welche Formate bietet die Startup Contacts?',
                a: 'Co-Creation Sessions, Workshops, Live Podcasts, Main Stage Talks und das Innovation Village mit Startups aus sechs Fokusfeldern.',
              },
            ].map((item, i) => (
              <details key={i} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg md:text-xl font-semibold text-white">
                  <span>{item.q}</span>
                  <span className="text-sc-orange transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <div className="mt-4 body">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <p className="mt-10 body text-center">
            Bei weiteren Fragen meldet euch bitte bei{' '}
            <a
              href="mailto:info@startup-contacts.de"
              className="text-sc-orange hover:underline underline-offset-4"
            >
              info@startup-contacts.de
            </a>
          </p>
        </div>
      </section>

      {/* ── Unsere vergangenen Partner ── */}
      {data?.vergangenePartner && data.vergangenePartner.length > 0 && (
        <section className="relative py-32 px-6 bg-black overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="h-section text-center mb-14">
              Unsere <span className="gradient-text">Partner</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.vergangenePartner.map((p: { name?: string; logo?: { asset: { _ref: string } }; whiteBackground?: boolean; _key?: string }, i: number) => (
                <div
                  key={p._key || i}
                  className={`rounded-xl overflow-hidden aspect-[2/1] flex items-center justify-center ${
                    p.whiteBackground ? 'bg-white' : 'bg-black border border-white/10'
                  }`}
                >
                  {p.logo ? (
                    <img
                      src={urlFor(p.logo).width(600).fit('max').url()}
                      alt={p.name || `Partner ${i + 1}`}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  ) : (
                    <span className={`text-sm font-semibold text-center ${
                      p.whiteBackground ? 'text-black/60' : 'text-white/60'
                    }`}>
                      {p.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-14 flex justify-center">
              <GlowButton href="/partner">Alle Partner</GlowButton>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
