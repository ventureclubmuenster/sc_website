import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Co-Creation Challenge',
  description:
    'Hackathon auf der Startup Contacts Münster. 30 Plätze, Lead-Unternehmen, 1 Tag echte Lösungen. VCM und R-Factory. Jetzt mitmachen.',
  alternates: { canonical: 'https://www.startup-contacts.de/co-creation' },
  openGraph: {
    title: 'Co-Creation Challenge | Startup Contacts',
    description:
      'Hackathon auf der Startup Contacts. Konkrete Probleme, kleine Teams, klarer Output. Gemeinsam mit VCM und R-Factory.',
    url: 'https://www.startup-contacts.de/co-creation',
  },
}

export default function CoCreationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
