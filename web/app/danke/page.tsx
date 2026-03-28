import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Anmeldung erfolgreich | Startup Contacts',
  description: 'Danke für deine Newsletter-Anmeldung zur Startup Contacts Münster 2026.',
  alternates: { canonical: 'https://www.startup-contacts.de/danke' },
  robots: { index: false, follow: false },
}

export default function DankePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sc-orange/20 mb-8">
          <svg
            className="w-10 h-10 text-sc-orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          VIELEN <span className="gradient-text">DANK!</span>
        </h1>

        <p className="text-white/70 text-lg mb-3">
          Du bist jetzt auf der Liste.
        </p>
        <p className="text-white/50 text-base max-w-md mx-auto mb-12">
          Du wirst als Erstes über den Early-Bird Ticketverkauf informiert, sobald er startet.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sc-orange text-white font-semibold hover:brightness-110 transition-all"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  )
}
