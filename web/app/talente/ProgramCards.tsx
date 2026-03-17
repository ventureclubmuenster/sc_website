'use client'

import Image from 'next/image'

interface ProgramCardData {
  title: string
  buttonText: string
  buttonLink: string
  imageUrl?: string
}

export default function ProgramCards({ cards }: { cards: ProgramCardData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl h-64 md:h-80 cursor-pointer"
        >
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              className="object-cover transition-all duration-500 group-hover:grayscale"
            />
          ) : (
            <div className="absolute inset-0 bg-white/10" />
          )}

          {/* Dark overlay - gets darker on hover */}
          <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/60" />

          {/* Title - always visible */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <span
              className="text-white text-2xl md:text-3xl font-extrabold uppercase tracking-wider"
              style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)' }}
            >
              {card.title}
            </span>

            {/* Button - appears on hover */}
            <a
              href={card.buttonLink}
              className="opacity-0 group-hover:opacity-100 transition-all duration-500 inline-flex items-center justify-center gap-2 border border-white/50 text-white text-sm px-8 py-3 rounded-full hover:border-venture-purple hover:bg-venture-purple hover:scale-105 transition-all"
            >
              {card.buttonText} &rarr;
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
