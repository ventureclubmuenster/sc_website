import type { Metadata } from 'next'
import Script from 'next/script'
import CountdownTimer from '@/components/CountdownTimer'

export const metadata: Metadata = {
  title: 'Tickets | Startup Contacts',
  description: 'Sichere dir dein Ticket für die Startup Contacts Karrieremesse.',
}

export default function ShopPage() {
  return (
    <>
      {/* ── Full-width hero ── */}
      <section className="relative px-6 pt-24 pb-16 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-venture-purple/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase leading-tight">
            <span className="text-white">Startup </span>
            <span className="text-venture-purple">Contacts</span>
          </h1>
          <p className="text-white/50 text-lg mt-2">Vision becomes Venture.</p>

          <p className="text-white/70 text-sm leading-relaxed mt-6 max-w-2xl">
            Die Startup Contacts 2026 ist die größte von Studierenden organisierte Innovationsmesse in NRW.
            Unter dem Motto &bdquo;Vision becomes Venture&ldquo; bringt sie über 30 Startups, Investoren, Unternehmen und
            Studierende für Workshops, Keynotes und Networking zusammen.
          </p>

          <p className="text-white/50 text-sm mt-4">
            Weitere Informationen findet ihr unter:{' '}
            <a href="https://www.startup-contacts.de/" target="_blank" rel="noopener noreferrer" className="text-venture-purple hover:underline">
              https://www.startup-contacts.de/
            </a>
          </p>
          <p className="text-white/50 text-sm mt-1">
            Bei Fragen könnt ihr euch gerne unter{' '}
            <a href="mailto:info@ventureclub-muenster.de" className="text-venture-purple hover:underline">
              info@ventureclub-muenster.de
            </a>
            {' '}bei uns melden.
          </p>
        </div>
      </section>

      {/* ── Two-column: Info left + Sidebar right ── */}
      <section className="bg-black px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* Left column — Date, Video, Map */}
          <div className="flex flex-col gap-12">
            {/* Date badge */}
            <div>
              <h2 className="text-white font-bold text-base mb-4">Date</h2>
              <div className="inline-flex flex-col items-center border border-white/15 rounded-xl px-6 py-4">
                <span className="text-venture-purple text-sm font-semibold">Jun</span>
                <span className="text-white text-3xl font-bold leading-tight">15</span>
              </div>
            </div>

            {/* Video */}
            <div>
              <h2 className="text-white font-bold text-base mb-4">Video</h2>
              <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/uNZWsofAFEI"
                  title="Startup Contacts – Aftermovie"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-white font-bold text-base mb-4">Location</h2>
              <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=7.6280%2C51.9430%2C7.6380%2C51.9480&layer=mapnik&marker=51.9455%2C7.6330"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="MCC Halle Münsterland – Karte"
                />
              </div>
              <a
                href="https://www.openstreetmap.org/?mlat=51.9455&mlon=7.6330#map=17/51.9455/7.6330"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-venture-purple text-sm mt-3 hover:underline"
              >
                Größere Karte ansehen &rarr;
              </a>
            </div>
          </div>

          {/* Right sidebar — sticky info card */}
          <div className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-6">
            {/* Event card */}
            <div className="bg-card-grey rounded-2xl p-6 flex flex-col gap-5">
              <div>
                <h3 className="text-white font-bold text-lg">Startup Contacts</h3>
                <p className="text-white/50 text-sm">MCC Halle Münsterland</p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <CountdownTimer targetDate="2026-04-05T10:00:00+02:00" />
              </div>

              <a
                href="#tickets"
                className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-venture-purple text-white font-medium hover:bg-venture-purple/85 transition-colors text-sm"
              >
                Tickets sichern
              </a>
            </div>

            {/* Date & Location details */}
            <div className="bg-card-grey rounded-2xl p-6 flex flex-col gap-5">
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">15.06.2026</p>
                  <p className="text-white/40 text-xs">Mon 10:00 AM</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">MCC Halle Münsterland</p>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Albersloher Weg 32<br />
                    48155 Münster<br />
                    Germany
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-white/10" />

      {/* ── Tickets ── */}
      <section id="tickets" className="bg-black px-6 py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-center mb-4">
            <span className="text-venture-purple">TICKETS </span>
            <span className="text-white">SICHERN</span>
          </h2>
          <p className="text-white/50 text-sm text-center mb-12">
            Wähle dein Ticket und sei dabei.
          </p>

          <Script src="https://js.stripe.com/v3/pricing-table.js" strategy="afterInteractive" />

          {/* @ts-expect-error — Stripe web component not typed in React */}
          <stripe-pricing-table
            pricing-table-id="prctbl_1TBc9JKBFIWC10dM1anIyUEP"
            publishable-key="pk_test_51TBbpaKBFIWC10dMlObR3ycGjRjBYbJQ14ZyU6dhPLzlRbkMiWMigd5Mziuo0Ewsc13qUEYc7ZDaPhpeLwwuzw9700oFsI3WkX"
          />
        </div>
      </section>
    </>
  )
}
