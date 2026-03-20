import type { Metadata } from 'next'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    'Erfahre als Erstes vom Vorverkaufsstart und sichere dir deinen Platz auf der Startup Contacts Münster 2026.',
  alternates: { canonical: 'https://www.startup-contacts.de/newsletter' },
  openGraph: {
    title: 'Newsletter | Startup Contacts',
    description: 'Erfahre als Erstes vom Vorverkaufsstart der Startup Contacts Münster 2026.',
    url: 'https://www.startup-contacts.de/newsletter',
  },
}

export default function NewsletterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            SICHERE DIR DEINEN{' '}
            <span className="gradient-text">PLATZ</span>
          </h1>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Erfahre als Erstes vom Vorverkaufsstart und sichere dir dein Ticket für die Startup Contacts 2026.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-card-grey/60 border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-sm">
          <NewsletterForm />
        </div>
      </div>
    </main>
  )
}
