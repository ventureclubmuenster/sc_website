'use client'

import Link from 'next/link'
import NavDropdown from './NavDropdown'

const navGroups = [
  {
    label: 'Besucher',
    items: [
      { label: 'Startups', href: '/startups' },
      { label: 'Talente', href: '/talente' },
      { label: 'Unternehmen', href: '/unternehmen' },
      { label: 'Investoren', href: '/investoren' },
    ],
  },
  {
    label: 'Programm',
    items: [
      { label: 'Co-Creation', href: '/co-creation' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Main Stage', href: '/main-stage' },
      { label: 'Podcast', href: '/podcast' },
      { label: 'Innovation Village', href: '/innovation-village' },
    ],
  },
  {
    label: 'Über uns',
    items: [
      { label: 'VCM', href: '/ueber-uns' },
      { label: 'Advisory Board', href: '/advisory-board' },
      { label: 'Jobwall', href: 'https://ventureclub-muenster.de/jobwall/' },
    ],
  },
]

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {navGroups.map((group) => (
        <NavDropdown key={group.label} label={group.label} items={group.items} />
      ))}
      <Link
        href="/speaker"
        className="text-base text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap"
      >
        Speaker
      </Link>
      <Link
        href="/partner"
        className="text-base text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap"
      >
        Partner
      </Link>
    </nav>
  )
}
