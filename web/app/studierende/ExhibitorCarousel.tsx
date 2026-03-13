'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Exhibitor {
  _id: string
  name: string
  logoUrl?: string
}

export default function ExhibitorCarousel({ exhibitors }: { exhibitors: Exhibitor[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  // Each card is 25% wide (4 per row), we shift by 2 cards = 50% each tick
  // But we work in pixels for smooth animation
  const cardWidth = 280 // approximate card width including gap
  const shiftAmount = 2 // shift 2 cards at a time

  useEffect(() => {
    if (exhibitors.length <= 8) return // no scrolling needed if 8 or fewer

    const interval = setInterval(() => {
      setOffset((prev) => prev + shiftAmount)
    }, 2500)

    return () => clearInterval(interval)
  }, [exhibitors.length])

  // Duplicate the list to create an infinite loop effect
  const displayList = [...exhibitors, ...exhibitors, ...exhibitors]

  // Reset offset when it has scrolled through the full original list
  const effectiveOffset = exhibitors.length > 0 ? offset % exhibitors.length : 0

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${effectiveOffset * (100 / 4)}%)`,
          // each item is 25% of container width (4 visible)
        }}
      >
        {displayList.map((exhibitor, i) => (
          <div
            key={`${exhibitor._id}-${i}`}
            className="flex-shrink-0 w-1/4 px-2"
          >
            <div className="flex items-center justify-center bg-white rounded-xl h-20 md:h-24 px-4">
              {exhibitor.logoUrl ? (
                <div className="relative w-full h-full p-3">
                  <Image
                    src={exhibitor.logoUrl}
                    alt={exhibitor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-black/60 text-sm font-medium text-center">
                  {exhibitor.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
