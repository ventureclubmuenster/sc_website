'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'

interface Startup {
  _id: string
  name: string
  logoUrl?: string
}

export default function StartupCarousel({ startups }: { startups: Startup[] }) {
  const [offset, setOffset] = useState(0)
  const count = startups.length

  useEffect(() => {
    if (count <= 4) return

    const interval = setInterval(() => {
      setOffset((prev) => prev + 1)
    }, 2500)

    return () => clearInterval(interval)
  }, [count])

  if (count === 0) {
    return (
      <FadeIn direction="up">
        <p className="text-white/40 text-center py-8">
          Startups werden bald bekannt gegeben.
        </p>
      </FadeIn>
    )
  }

  if (count <= 4) {
    const cols = count <= 2 ? 'md:grid-cols-2' : count === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
    return (
      <FadeIn direction="up">
        <div className={`grid grid-cols-2 ${cols} gap-4`}>
          {startups.map((s) => (
            <Card key={s._id} startup={s} />
          ))}
        </div>
      </FadeIn>
    )
  }

  const repeats = Math.ceil(20 / count) + 2
  const displayList: Startup[] = []
  for (let i = 0; i < repeats; i++) {
    displayList.push(...startups)
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
          {displayList.map((startup, i) => (
            <div
              key={`${startup._id}-${i}`}
              className="flex-shrink-0 w-1/2 md:w-1/4 px-2"
            >
              <Card startup={startup} />
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

function Card({ startup }: { startup: Startup }) {
  return (
    <div className="flex items-center justify-center bg-white rounded-xl h-20 md:h-24 px-4">
      {startup.logoUrl ? (
        <Image
          src={startup.logoUrl}
          alt={startup.name}
          width={200}
          height={80}
          className="object-contain max-h-12 md:max-h-16 w-auto"
        />
      ) : (
        <span className="text-black/60 text-sm font-medium text-center">
          {startup.name}
        </span>
      )}
    </div>
  )
}
