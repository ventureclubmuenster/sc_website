import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formate | Startup Contacts',
  description: 'Entdecke die Formate der Startup Contacts: Workshops, Main Stage, Podcast, Innovation Village und mehr. 15. Juni 2026 in Münster.',
  alternates: {
    canonical: 'https://www.startup-contacts.de/formate',
  },
}

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-bold">Formate</h1>
    </div>
  )
}
