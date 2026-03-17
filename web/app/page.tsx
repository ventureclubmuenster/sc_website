import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { landingPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroCTA from '@/components/HeroCTA'
import AnimatedStatsGrid from '@/components/AnimatedStatsGrid'

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
    { label: 'Stände & Co-Creation Corner', href: '/programm/co-creation', image: data?.erwartungCoCreation },
    { label: 'Workshops', href: '/programm/workshops', image: data?.erwartungWorkshops },
    { label: 'Bühnenprogramm', href: '/programm/main-stage', image: data?.erwartungBuehne },
    { label: 'Side Events', href: '/programm/innovation-village', image: data?.erwartungSideEvents },
  ]

  const wenCards = [
    { label: 'Startups', href: '/startups', image: data?.wenStartups },
    { label: 'Corporates', href: '/unternehmen', image: data?.wenCorporates },
    { label: 'Talente', href: '/studierende', image: data?.wenTalente },
    { label: 'Investoren', href: '/investoren', image: data?.wenInvestoren },
  ]

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-black overflow-hidden">
        {/* YouTube Aftermovie Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/uNZWsofAFEI?autoplay=1&mute=1&loop=1&playlist=uNZWsofAFEI&controls=0&showinfo=0&modestbranding=1&rel=0&start=4&playsinline=1&disablekb=1&vq=hd1080&iv_load_policy=3&fs=0&cc_load_policy=0"
            className="absolute -top-[60px] left-0 w-full aspect-video"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />

        <div className="relative z-20 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Zukunft durch Zusammenarbeit.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Das größte Co-Creation Event Deutschlands zwischen Startups, Talenten & Mittelstand.
          </p>

          {/* Orange divider */}
          <div className="mt-8 mx-auto w-16 h-1 bg-venture-purple rounded" />

          <p className="mt-6 text-xl md:text-2xl font-semibold">15. Juni 2026</p>
          <p className="text-lg text-white/70">Münster</p>

          <div className="mt-8">
            <HeroCTA />
          </div>
        </div>
      </section>

      {/* ── Stell dir vor was ── */}
      <section className="py-20 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-wide">
          Stell <span className="text-venture-purple">dir</span> vor was...
        </h2>

        <AnimatedStatsGrid
          cards={statsCards.map((stat) => ({
            number: stat.number,
            label: stat.label,
            imageUrl: stat.image ? urlFor(stat.image).width(600).height(450).url() : undefined,
          }))}
        />
      </section>

      {/* ── Gemeinsam erreichen können ── */}
      <section className="pt-8 pb-20 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-wide">
          <span className="text-venture-purple">...Gemeinsam</span> erreichen können
        </h2>
      </section>

      {/* ── Networking Together ── */}
      <section className="relative py-20 px-6 bg-card-grey overflow-hidden">
        {data?.networkingBg && (
          <Image
            src={urlFor(data.networkingBg).width(1920).height(1080).url()}
            alt="Networking Together"
            fill
            className="object-cover opacity-20"
          />
        )}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            <span className="line-through text-white/50">Net</span>
            <span className="text-venture-purple">working</span> together
          </h2>

          <div className="mt-10 space-y-6 text-white/70 text-base leading-relaxed">
            <p>
              Die Zukunft braucht es neue Lösungen. Doch für welche Probleme? Und mit welchen Tools?
            </p>
            <p>
              Auf der Startup Contacts fördern wir den Austausch und die Zusammenarbeit zur Entwicklung
              gemeinsamer Lösungen und Visionen. Es geht darum eine nachhaltige Wertschöpfung für die
              Transformation Deutschlands zu schaffen. Durch eine Verbindung aus Erfahrung und neuen Ideen.
              Dafür bringen wir die wichtigen Faktoren der Transformation an einen Ort und fördern die aktive
              Beteiligung in unseren Formaten.
            </p>
            <p>
              Unser Ziel ist es einen Beitrag dafür zu leisten, dass auf der Startup Contacts neue Lösungen
              entstehen, welche dem Mittelstand mit Hilfe von Startups und Talenten bei der Transformation
              helfen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Was du erwarten kannst ── */}
      <section className="py-20 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-wide">
          Was <span className="text-venture-purple">du</span> erwarten kannst
        </h2>

        <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {erwartungCards.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative aspect-[16/10] bg-card-grey rounded-lg overflow-hidden flex items-end p-6 hover:ring-2 hover:ring-venture-purple transition-all"
            >
              {item.image && (
                <Image
                  src={urlFor(item.image).width(800).height(500).url()}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="relative z-10 text-lg font-semibold uppercase tracking-wide group-hover:text-venture-purple transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Wen du erwarten kannst ── */}
      <section className="py-20 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-wide">
          Wen <span className="text-venture-purple">du</span> erwarten kannst
        </h2>

        <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {wenCards.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative aspect-[16/10] bg-card-grey rounded-lg overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-venture-purple transition-all"
            >
              {item.image && (
                <Image
                  src={urlFor(item.image).width(800).height(500).url()}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
              <span className="relative z-10 text-xl font-bold uppercase tracking-wider group-hover:text-venture-purple transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Was du erwarten kannst (Value Props) ── */}
      <section className="py-20 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-wide">
          Was <span className="text-venture-purple">du</span> erwarten kannst
        </h2>

        <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Zusammenarbeit',
              text: 'Auf der Startup Contacts arbeiten Gründer, Investoren, Talente & Mittelstand zusammen an praxisnahen Herausforderungen. So entstehen Lösungen, die über die Messe hinaus Einfluss haben und Transformation in der Wirtschaft tragen.',
            },
            {
              title: 'Inspiration',
              text: 'Lass dich davon inspirieren, wie andere Gründerinnen und Gründer die Transformation vorantreiben. Sie erzählen darüber wie sie es geschafft haben ihre Idee zur Realität zu machen und welche Herausforderungen sie dabei überwunden haben.',
            },
            {
              title: 'Tiefe Einblicke',
              text: 'Erhalte Einblicke in die Herausforderungen der Zukunft und die Fähigkeiten, die es braucht um die Transformation aktiv mitzugestalten.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="relative bg-card-grey rounded-lg overflow-hidden p-6 flex flex-col"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent" />
              <h3 className="text-lg font-bold uppercase tracking-wide">{card.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed relative z-10">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
