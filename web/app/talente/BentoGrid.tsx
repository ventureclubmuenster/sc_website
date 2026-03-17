'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BentoItem {
  title: string
  imageUrl?: string
}

// Bento layout patterns: each item gets a col-span and row-span
const layoutPatterns = [
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', height: 'h-48 md:h-full' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-48 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-48 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-48 md:h-56' },
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1', height: 'h-48 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2', height: 'h-48 md:h-full' },
]

export default function BentoGrid({ items }: { items: BentoItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[14rem] gap-3">
      {items.map((item, i) => {
        const pattern = layoutPatterns[i % layoutPatterns.length]
        const isHovered = hoveredIndex === i

        return (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${pattern.colSpan} ${pattern.rowSpan} ${pattern.height}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image */}
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-white/5" />
            )}

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: isHovered
                  ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
              }}
            />

            {/* Orange accent line - slides in from left on hover */}
            <div
              className="absolute bottom-0 left-0 h-[3px] bg-sc-orange transition-all duration-500 ease-out"
              style={{ width: isHovered ? '100%' : '0%' }}
            />

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h3
                className="text-white text-xl md:text-2xl font-extrabold uppercase tracking-wider text-center transition-all duration-500 ease-out"
                style={{
                  textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)',
                  transform: isHovered ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                }}
              >
                {item.title}
              </h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}
