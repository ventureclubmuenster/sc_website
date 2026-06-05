'use client'

/**
 * CTA-Button der Ad Landing Page (/sc26).
 * - Linkt auf den Secret-Ticketshop (per Prop, sonst Code-Fallback).
 * - Feuert dieselbe Google-Ads-Conversion wie die übrige Website.
 * - Design nach Vorlage: warme Creme-/Pfirsich-Fläche, oranger fetter Text + Pfeil,
 *   großzügig gerundet, weicher Schatten. Hebt sich beim Hover leicht an.
 */

const SECRET_TICKET_URL =
  'https://tickets.infield.live/event/69777da5382b6da735040ed6/6a194aef06e962eac8cc2904'
const CONVERSION_ID = 'AW-857927386/ag-FCMOG6qAcENrdi5kD'

declare global {
  function gtag(...args: unknown[]): void
}

type Size = 'sm' | 'md' | 'lg'

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-base sm:text-lg',
}

export default function CtaButton({
  href,
  label = 'Ticket sichern',
  size = 'md',
  className = '',
}: {
  href?: string
  label?: string
  size?: Size
  className?: string
}) {
  const target = href || SECRET_TICKET_URL

  const handleClick = () => {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: CONVERSION_ID })
    }
  }

  return (
    <a
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-sc-orange no-underline bg-[#FBD9BC] shadow-[0_8px_24px_rgba(255,94,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8CBA2] hover:shadow-[0_12px_30px_rgba(255,94,0,0.24)] ${sizeClasses[size]} ${className}`}
    >
      <span>{label}</span>
      <span
        className="transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        &rarr;
      </span>
    </a>
  )
}
