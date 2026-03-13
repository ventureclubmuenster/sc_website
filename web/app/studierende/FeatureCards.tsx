'use client'

import Image from 'next/image'

interface CardData {
  title: string
  hoverText: string
  imageUrl?: string
}

export default function FeatureCards({ cards }: { cards: CardData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/60" />

          {/* Default title - visible, hides on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
            <span
              className="text-white text-2xl md:text-3xl font-extrabold uppercase tracking-wider"
              style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)' }}
            >
              {card.title}
            </span>
          </div>

          {/* Hover text - appears on hover */}
          {card.hoverText && (
            <div className="absolute inset-0 flex items-center justify-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p
                className="text-white text-xs md:text-sm text-center leading-relaxed font-bold"
                style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
              >
                {card.hoverText}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
