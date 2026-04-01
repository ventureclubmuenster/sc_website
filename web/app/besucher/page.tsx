import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Besucher | Startup Contacts',
  description: 'Alle Informationen für Besucher der Startup Contacts Messe am 15. Juni 2026 in der Halle Münsterland in Münster.',
  alternates: {
    canonical: 'https://www.startup-contacts.de/besucher',
  },
}

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-bold">Besucher</h1>
    </div>
  )
}
