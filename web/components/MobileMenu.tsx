'use client'

import { useState } from 'react'
import Link from 'next/link'

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

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2"
        aria-label="Menü öffnen"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <nav className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex flex-col gap-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                {group.label}
              </span>
              <div className="mt-1 flex flex-col gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-white/70 hover:text-white text-base py-1 transition-colors pl-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/ueber-uns"
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white text-base py-1 transition-colors"
          >
            Über uns
          </Link>
          <a
            href="#tickets"
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-venture-purple text-white text-sm font-medium"
          >
            Tickets
          </a>
        </nav>
      )}
    </div>
  )
}
