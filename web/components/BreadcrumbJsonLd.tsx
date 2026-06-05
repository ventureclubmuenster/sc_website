'use client'

import { usePathname } from 'next/navigation'

const BASE_URL = 'https://www.startup-contacts.de'

// Maps URL segments to human-readable German breadcrumb labels.
const LABELS: Record<string, string> = {
  startups: 'Startups',
  'startups-muenster': 'Startups in Münster',
  unternehmen: 'Unternehmen',
  talente: 'Talente',
  investoren: 'Investoren',
  partner: 'Partner',
  speaker: 'Speaker',
  tickets: 'Tickets',
  'ueber-uns': 'Über uns',
  workshops: 'Workshops',
  podcast: 'Podcast',
  'innovation-village': 'Innovation Village',
  'main-stage': 'Main Stage',
  'co-creation': 'Co-Creation Challenge',
  'advisory-board': 'Advisory Board',
  newsletter: 'Newsletter',
  formate: 'Formate',
  jobwall: 'Jobwall',
  besucher: 'Besucher',
}

// Emits BreadcrumbList structured data derived from the current path.
// Rendered once in the root layout, so every route is covered automatically.
export default function BreadcrumbJsonLd() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // No breadcrumbs on the homepage, unknown routes, or noindex utility pages.
  if (segments.length === 0) return null
  const known = segments.every((s) => LABELS[s])
  if (!known) return null

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Startseite',
      item: BASE_URL,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: LABELS[segment],
      item: `${BASE_URL}/${segments.slice(0, index + 1).join('/')}`,
    })),
  ]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  )
}
