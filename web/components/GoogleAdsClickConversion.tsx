'use client'

import { type ReactNode, useCallback } from 'react'

declare global {
  function gtag(...args: unknown[]): void
}

export default function GoogleAdsClickConversion({
  sendTo,
  href,
  children,
  className,
  ...props
}: {
  sendTo: string
  href: string
  children: ReactNode
  className?: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: sendTo,
          event_callback: () => {
            window.location.href = href
          },
        })
      } else {
        window.location.href = href
      }
    },
    [sendTo, href],
  )

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
