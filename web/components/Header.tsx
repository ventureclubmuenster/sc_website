import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import DesktopNav from './DesktopNav'
import MobileMenu from './MobileMenu'
import scLogo from '@/app/images/SC_logo_nav_bar.avif'

async function getSettings() {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } })
}

export default async function Header() {
  const settings = await getSettings()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={scLogo}
            alt="Startup Contacts"
            height={100}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav — 3 Dropdowns + Über uns */}
        <DesktopNav />

        {/* Desktop CTA */}
        <Link
          href="/shop"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-md bg-venture-purple text-white text-base font-medium hover:bg-[#6a50ee] transition-colors duration-200 shrink-0"
        >
          Tickets
        </Link>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  )
}
