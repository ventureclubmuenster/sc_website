'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { StaggerContainer, StaggerItem } from './FadeIn'

interface BentoItem {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageUrl?: string
  wide?: boolean
}

// Bento layout patterns: each item gets a col-span and row-span
const layoutPatterns = [
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', height: 'h-28 md:h-full' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2', height: 'h-28 md:h-full' },
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
]

// Alternate directions for visual interest
const directions = ['left', 'up', 'right', 'up', 'left', 'up', 'right'] as const

export default function BentoGrid({ items }: { items: BentoItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[14rem] gap-3">
      {items.map((item, i) => {
        const pattern = layoutPatterns[i % layoutPatterns.length]
        const colSpan = item.wide ? 'md:col-span-2' : pattern.colSpan
        const isHovered = hoveredIndex === i

        return (
          <StaggerItem
            key={i}
            direction={directions[i % directions.length]}
            distance={50}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${colSpan} ${pattern.rowSpan} ${pattern.height}`}
          >
          <div
            className="absolute inset-0"
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
              <div className="absolute inset-0 bg-black" />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/65" />

            {/* Gradient accent line - slides in from left on hover */}
            <div
              className="absolute bottom-0 left-0 h-[3px] gradient-line transition-all duration-500 ease-out"
              style={{ width: isHovered ? '100%' : '0%' }}
            />

            {/* Title + Description + Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <h3
                className="text-white text-xl md:text-2xl font-extrabold uppercase tracking-wider text-center transition-all duration-500 ease-out"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                  transform: isHovered && (item.buttonLink || item.description) ? 'translateY(-12px)' : 'translateY(0)',
                }}
              >
                {item.title}
              </h3>

              {item.description && (
                <p
                  className="text-white/70 text-xs md:text-sm text-center max-w-xs mt-2 transition-all duration-500 ease-out"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
                  }}
                >
                  {item.description}
                </p>
              )}

              {/* Hover button */}
              {item.buttonLink && item.buttonText && (
                <Link
                  href={item.buttonLink}
                  className="mt-3 inline-flex items-center gap-2 border border-white/40 text-white text-xs md:text-sm px-6 py-2 rounded-full hover:bg-sc-orange hover:border-sc-orange transition-all duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s, background-color 0.3s, border-color 0.3s',
                  }}
                >
                  {item.buttonText} &rarr;
                </Link>
              )}
            </div>
          </div>
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
