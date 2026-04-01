'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import WartelisteButton from './WartelisteButton'
import scLogo from '@/app/images/SC_logo_nav_bar.avif'

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

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  function toggleGroup(label: string) {
    setExpandedGroup(expandedGroup === label ? null : label)
  }

  return (
    <div
      className="lg:hidden bg-black/85 backdrop-blur-md border border-white/10"
      style={{ borderRadius: open ? '1.5rem' : '2.5rem', transition: 'border-radius 100ms ease' }}
    >
      {/* Top bar with logo + burger */}
      <div className="px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={scLogo}
            alt="Startup Contacts"
            height={100}
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => { setOpen(!open); if (open) setExpandedGroup(null) }}
          className="text-white p-3"
          aria-label="Menü öffnen"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Expanded menu content */}
      <div
        className="grid"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 100ms ease',
        }}
      >
        <nav className="overflow-hidden px-6 flex flex-col gap-2">
          <div className={`border-t border-white/10 pt-2 pb-6 flex flex-col gap-2`}>
          {navGroups.map((group) => (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between text-sm font-semibold text-white/40 uppercase tracking-wider py-3"
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
                      className="text-white/70 hover:text-white text-lg py-2.5 transition-colors pl-2"
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
            className="text-white/70 hover:text-white text-lg py-3 transition-colors"
          >
            Speaker
          </Link>
          <Link
            href="/partner"
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white text-lg py-3 transition-colors"
          >
            Partner
          </Link>

          <div className="mt-2">
            <WartelisteButton small />
          </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
