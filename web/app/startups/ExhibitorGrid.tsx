'use client'

import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface Exhibitor {
  _id: string
  name: string
  logoUrl?: string
  whiteLogoUrl?: string
  whiteBackground?: boolean
  url?: string
  /** Logo-Größe in % (100 = Standard). */
  scalePercent?: number
}

export default function ExhibitorGrid({ exhibitors }: { exhibitors: Exhibitor[] }) {
  if (exhibitors.length === 0) {
    return (
      <p className="text-white/40 text-center py-8">
        Aussteller werden bald bekannt gegeben.
      </p>
    )
  }

  return (
    <StaggerContainer stagger={0.08} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {exhibitors.map((ex) => {
        const useDarkBg = !ex.whiteBackground
        const logoSrc = useDarkBg && ex.whiteLogoUrl ? ex.whiteLogoUrl : ex.logoUrl

        // Standard-Logogröße ist 75 % der Kachel; per scalePercent skalierbar.
        const sizePct = 75 * ((ex.scalePercent ?? 100) / 100)
        const content = logoSrc ? (
          <img
            src={logoSrc}
            alt={ex.name}
            className="object-contain"
            style={{ width: `${sizePct}%`, height: `${sizePct}%` }}
          />
        ) : (
          <span className={`text-sm font-semibold text-center ${
            ex.whiteBackground ? 'text-black/60' : 'text-white/60'
          }`}>
            {ex.name}
          </span>
        )

        return (
          <StaggerItem
            key={ex._id}
            direction="up"
            distance={30}
            className={`rounded-xl overflow-hidden aspect-[2/1] flex items-center justify-center ${
              ex.whiteBackground ? 'bg-white' : 'bg-black border border-white/10'
            }`}
          >
            {ex.url ? (
              <a
                href={ex.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ex.name}
                className="w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
