'use client'

import Link from 'next/link'
import NavDropdown from './NavDropdown'

const navGroups = [
  {
    label: 'Für Besucher',
    items: [
      { label: 'Unternehmen', href: '/unternehmen' },
      { label: 'Startups', href: '/startups' },
      { label: 'Studierende', href: '/studierende' },
      { label: 'Investoren', href: '/investoren' },
      { label: 'Besucher', href: '/besucher' },
    ],
  },
  {
    label: 'Programm',
    items: [
      { label: 'Speaker', href: '/speaker' },
      { label: 'Workshops & Q&As', href: '/workshops-q-as' },
      { label: 'Formate', href: '/formate' },
      { label: 'Innovation Village', href: '/innovation-village' },
      { label: 'Schedule', href: '/schedule' },
    ],
  },
  {
    label: 'Partner',
    items: [
      { label: 'Unsere Partner', href: '/partner' },
      { label: 'Advisory Board', href: '/advisory-board' },
      { label: 'Jobwall', href: '/jobwall' },
    ],
  },
]

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navGroups.map((group) => (
        <NavDropdown key={group.label} label={group.label} items={group.items} />
      ))}
      <Link
        href="/ueber-uns"
        className="text-sm text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap"
      >
        Über uns
      </Link>
    </nav>
  )
}
