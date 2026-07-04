'use client'

import { usePathname } from 'next/navigation'

/**
 * Header-Container im Glas-Look. Auf /newsletter und den /zertifikat-Seiten
 * wird der Hintergrund solide schwarz (statt transparent), damit die
 * Navigationsleiste dort nicht grau durchscheint.
 */
export default function GlassBar({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const opaque = pathname === '/newsletter' || pathname.startsWith('/zertifikat')
  const glass = opaque ? 'liquid-glass-opaque' : 'liquid-glass'
  return <div className={`${className} ${glass}`}>{children}</div>
}
