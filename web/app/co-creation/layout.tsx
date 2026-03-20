import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Co-Creation',
  description:
    'Co-Creation auf der Startup Contacts Münster: Arbeite gemeinsam mit Startups, Unternehmen und Talenten an Lösungen für die Zukunft.',
  alternates: { canonical: 'https://www.startup-contacts.de/co-creation' },
  openGraph: {
    title: 'Co-Creation | Startup Contacts',
    description: 'Gemeinsam neue Lösungen entwickeln — Co-Creation auf der Startup Contacts Münster.',
    url: 'https://www.startup-contacts.de/co-creation',
  },
}

export default function CoCreationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
