'use client'

import Link from 'next/link'
import NavDropdown from './NavDropdown'
import CoCreationButton from './CoCreationButton'
import AppButton from './AppButton'

const besucherGroup = {
  label: 'Besucher',
  items: [
    { label: 'Startups', href: '/startups' },
    { label: 'Talente', href: '/talente' },
    { label: 'Unternehmen', href: '/unternehmen' },
    { label: 'Investoren', href: '/investoren' },
  ],
}

const programmGroup = {
  label: 'Programm',
  items: [
    { label: 'Workshops', href: '/workshops' },
    { label: 'Main Stage', href: '/main-stage' },
    { label: 'Podcast', href: '/podcast' },
    { label: 'Innovation Village', href: '/innovation-village' },
  ],
}

const ueberUnsGroup = {
  label: 'Über uns',
  items: [
    { label: 'VCM', href: '/ueber-uns' },
    { label: 'Advisory Board', href: '/advisory-board' },
    { label: 'Jobwall', href: 'https://ventureclub-muenster.de/jobwall/' },
  ],
}

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      <NavDropdown label={besucherGroup.label} items={besucherGroup.items} />
      <NavDropdown label={programmGroup.label} items={programmGroup.items} />
      <CoCreationButton small />
      <NavDropdown label={ueberUnsGroup.label} items={ueberUnsGroup.items} />
      <Link
        href="/speaker"
        className="text-base text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap py-2"
      >
        Speaker
      </Link>
      <Link
        href="/partner"
        className="text-base text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap py-2"
      >
        Partner
      </Link>
      <AppButton small />
    </nav>
  )
}
