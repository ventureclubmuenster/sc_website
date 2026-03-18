'use client'

import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface Exhibitor {
  _id: string
  name: string
  logoUrl?: string
  whiteLogoUrl?: string
  whiteBackground?: boolean
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

        return (
          <StaggerItem
            key={ex._id}
            direction="up"
            distance={30}
            className={`rounded-xl overflow-hidden aspect-[2/1] flex items-center justify-center ${
              ex.whiteBackground ? 'bg-white' : 'bg-white/5 border border-white/10'
            }`}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={ex.name}
                className="w-3/4 h-3/4 object-contain"
              />
            ) : (
              <span className={`text-sm font-semibold text-center ${
                ex.whiteBackground ? 'text-black/60' : 'text-white/60'
              }`}>
                {ex.name}
              </span>
            )}
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
