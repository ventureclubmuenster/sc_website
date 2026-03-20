import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobwall',
  description:
    'Die Jobwall der Startup Contacts Münster: Offene Stellen bei Startups und innovativen Unternehmen aus Münster und der Region.',
  alternates: { canonical: 'https://www.startup-contacts.de/jobwall' },
  openGraph: {
    title: 'Jobwall | Startup Contacts',
    description: 'Offene Stellen bei Startups und innovativen Unternehmen auf der Startup Contacts Jobwall.',
    url: 'https://www.startup-contacts.de/jobwall',
  },
}

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-bold">Jobwall</h1>
    </div>
  )
}
