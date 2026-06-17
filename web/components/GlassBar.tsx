'use client'

import { usePathname } from 'next/navigation'

/**
 * Header-Container im Glas-Look. Auf /newsletter wird der Hintergrund
 * solide schwarz (statt transparent), damit die Navigationsleiste dort
 * nicht grau durchscheint.
 */
export default function GlassBar({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const glass = pathname === '/newsletter' ? 'liquid-glass-opaque' : 'liquid-glass'
  return <div className={`${className} ${glass}`}>{children}</div>
}
