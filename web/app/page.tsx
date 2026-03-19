import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { landingPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroCTA from '@/components/HeroCTA'
import AnimatedStatsGrid from '@/components/AnimatedStatsGrid'
import HallOfFame from '@/components/HallOfFame'

async function getLandingPage() {
  return client.fetch(landingPageQuery, {}, { next: { revalidate: 3600 } })
}

export default async function Home() {
  const data = await getLandingPage()

  const statsCards = [
    { number: '20+', label: 'Speaker & Themen', image: data?.stellDirVorSpeaker },
    { number: '1000+', label: 'Besucher', image: data?.stellDirVorBesucher },
    { number: '20+', label: 'Stände', image: data?.stellDirVorStaende },
  ]

  const erwartungCards = [
    { label: 'Stände & Co-Creation', href: '/co-creation', image: data?.erwartungCoCreation },
    { label: 'Workshops', href: '/workshops', image: data?.erwartungWorkshops },
    { label: 'Bühnenprogramm', href: '/main-stage', image: data?.erwartungBuehne },
    { label: 'Side Events', href: '/innovation-village', image: data?.erwartungSideEvents },
  ]

  const wenCards = [
    { label: 'Startups', href: '/startups', image: data?.wenStartups },
    { label: 'Corporates', href: '/unternehmen', image: data?.wenCorporates },
    { label: 'Talente', href: '/talente', image: data?.wenTalente },
    { label: 'Investoren', href: '/investoren', image: data?.wenInvestoren },
  ]

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen bg-black overflow-hidden flex items-end -mt-20">
        {/* YouTube Aftermovie Background */}
        <div className="absolute inset-0 pt-20 z-0 pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/uNZWsofAFEI?autoplay=1&mute=1&loop=1&playlist=uNZWsofAFEI&controls=0&showinfo=0&modestbranding=1&rel=0&start=4&playsinline=1&disablekb=1&vq=hd1080&iv_load_policy=3&fs=0&cc_load_policy=0"
            className="absolute left-0 w-full aspect-video top-1/2 -translate-y-1/2"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        {/* Content — editorial layout, bottom-aligned, full bleed */}
        <div className="relative z-20 w-full px-4 sm:px-8 pb-16 pt-32">
          {/* Main heading */}
          <h1 className="font-bold uppercase leading-[0.85] tracking-tighter text-white text-[clamp(1.75rem,8.5vw,13rem)] -ml-1 sm:-ml-2">
            Zukunft
            <br />
            <span className="text-white/40">durch</span>
            <br />
            Zusammenarbeit<span className="text-sc-orange">.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-10 text-white/60 text-2xl md:text-3xl lg:text-4xl leading-snug max-w-3xl">
            Das größte Co-Creation Event Deutschlands zwischen Startups, Talenten & Mittelstand.
          </p>

          {/* Date, Location & CTA */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
            <div className="flex flex-col font-bold uppercase tracking-tight">
              <span className="text-3xl md:text-4xl">15. Juni 2026</span>
              <span className="text-xl md:text-2xl text-white/60">Münster</span>
            </div>

            <div className="shrink-0">
              <HeroCTA />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stell dir vor was ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        {/* Repeating "Startup Contacts" watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.04] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
            </span>
          ))}
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Stell <span className="text-sc-orange">dir</span> vor was...
          </h2>

          <AnimatedStatsGrid
            cards={statsCards.map((stat) => ({
              number: stat.number,
              label: stat.label,
              imageUrl: stat.image ? urlFor(stat.image).width(600).height(450).url() : undefined,
            }))}
          />

          <h2 className="mt-12 text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            <span className="text-sc-orange">...Gemeinsam</span> erreichen können
          </h2>
        </div>
      </section>

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
            <span className="text-sc-orange">working</span>
            <span className="text-white"> together</span>
          </h2>

          <div className="mt-10 space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              Für die Zukunft braucht es neue Lösungen. Doch für welche Probleme? Und mit welchen Tools?
            </p>
            <p>
              Auf der Startup Contacts fördern wir den Austausch und die Zusammenarbeit zur Entwicklung
              gemeinsamer Lösungen und Visionen. Es geht darum, eine nachhaltige Wertschöpfung für die
              Transformation Deutschlands zu schaffen. Durch eine Verbindung aus Erfahrung und neuen Ideen.
              Dafür bringen wir die wichtigen Faktoren der Transformation an einen Ort und fördern die aktive
              Beteiligung in unseren Formaten.
            </p>
            <p>
              Unser Ziel ist es, einen Beitrag dafür zu leisten, dass auf der Startup Contacts neue Lösungen
              entstehen, welche dem Mittelstand mit Hilfe von Startups und Talenten bei der Transformation
              helfen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Was du erwarten kannst ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold uppercase text-white/[0.03] pointer-events-none select-none tracking-tighter leading-none">
          FOR<br />MATE
        </span>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Was <span className="text-sc-orange">du</span> erwarten kannst
          </h2>

          <div className="mt-14 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {erwartungCards.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden flex items-end p-8"
              >
                {item.image && (
                  <Image
                    src={urlFor(item.image).width(800).height(500).url()}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Subtle gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Orange glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sc-orange/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wen du erwarten kannst ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold uppercase text-white/[0.03] pointer-events-none select-none tracking-tighter leading-none text-right">
          BESU<br />CHER
        </span>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Wen <span className="text-sc-orange">du</span> erwarten kannst
          </h2>

          <div className="mt-14 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wenCards.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden flex items-end p-6"
              >
                {item.image && (
                  <Image
                    src={urlFor(item.image).width(500).height(667).url()}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Subtle gradient for text readability + hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-sc-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-lg font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hall of Fame ── */}
      {data?.hallOfFame && <HallOfFame speakers={data.hallOfFame} />}
    </>
  )
}
