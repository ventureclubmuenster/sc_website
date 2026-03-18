'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'

interface Exhibitor {
  _id: string
  name: string
  logoUrl?: string
}

export default function ExhibitorCarousel({ exhibitors }: { exhibitors: Exhibitor[] }) {
  const [offset, setOffset] = useState(0)
  const count = exhibitors.length

  // Only auto-scroll if we have more than 4 exhibitors
  useEffect(() => {
    if (count <= 4) return

    const interval = setInterval(() => {
      setOffset((prev) => prev + 2)
    }, 2500)

    return () => clearInterval(interval)
  }, [count])

  // If 4 or fewer, just show them in a static grid
  if (count <= 4) {
    return (
      <FadeIn direction="up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exhibitors.map((exhibitor) => (
            <Card key={exhibitor._id} exhibitor={exhibitor} />
          ))}
        </div>
      </FadeIn>
    )
  }

  // Build a long enough list for seamless looping
  const repeats = Math.ceil(20 / count) + 2
  const displayList: Exhibitor[] = []
  for (let i = 0; i < repeats; i++) {
    displayList.push(...exhibitors)
  }

  const effectiveOffset = offset % count

  return (
    <FadeIn direction="up">
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${effectiveOffset * (100 / 4)}%)`,
        }}
      >
        {displayList.map((exhibitor, i) => (
          <div
            key={`${exhibitor._id}-${i}`}
            className="flex-shrink-0 w-1/2 md:w-1/4 px-2"
          >
            <Card exhibitor={exhibitor} />
          </div>
        ))}
      </div>
    </div>
    </FadeIn>
  )
}

function Card({ exhibitor }: { exhibitor: Exhibitor }) {
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-xl h-20 md:h-24 px-4">
      {exhibitor.logoUrl ? (
        <Image
          src={exhibitor.logoUrl}
          alt={exhibitor.name}
          width={200}
          height={80}
          className="object-contain max-h-12 md:max-h-16 w-auto"
        />
      ) : (
        <span className="text-black/60 text-sm font-medium text-center">
          {exhibitor.name}
        </span>
      )}
    </div>
  )
}
