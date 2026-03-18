'use client'

import { useState } from 'react'
import Link from 'next/link'
import WartelisteButton from './WartelisteButton'

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
      { label: 'Co-Creation Corner', href: '/co-creation' },
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
      { label: 'Jobwall', href: '/jobwall' },
    ],
  },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  function toggleGroup(label: string) {
    setExpandedGroup(expandedGroup === label ? null : label)
  }

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
        <nav className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex flex-col gap-2">
          {navGroups.map((group) => (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between text-xs font-semibold text-white/40 uppercase tracking-wider py-2"
              >
                {group.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`transition-transform duration-200 ${expandedGroup === group.label ? 'rotate-180' : ''}`}
                >
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </button>
              {expandedGroup === group.label && (
                <div className="flex flex-col gap-1 mb-2">
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
              )}
            </div>
          ))}

          <Link
            href="/speaker"
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white text-base py-2 transition-colors"
          >
            Speaker
          </Link>
          <Link
            href="/partner"
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white text-base py-2 transition-colors"
          >
            Partner
          </Link>

          <div className="mt-2">
            <WartelisteButton />
          </div>
        </nav>
      )}
    </div>
  )
}
