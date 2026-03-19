import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import DesktopNav from './DesktopNav'
import MobileMenu from './MobileMenu'
import WartelisteButton from './WartelisteButton'
import scLogo from '@/app/images/SC_logo_nav_bar.avif'

async function getSettings() {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } })
}

export default async function Header() {
  const settings = await getSettings()

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      {/* Desktop */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-8 h-20 items-center justify-between bg-black/85 backdrop-blur-md border border-white/10 rounded-full">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={scLogo}
            alt="Startup Contacts"
            height={100}
            className="object-contain"
          />
        </Link>
        <DesktopNav />
        <div className="shrink-0">
          <WartelisteButton />
        </div>
      </div>

      {/* Mobile */}
      <MobileMenu />
    </header>
  )
}
