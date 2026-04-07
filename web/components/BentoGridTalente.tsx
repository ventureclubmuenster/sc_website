'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { StaggerContainer, StaggerItem } from './FadeIn'

function CardInner({ item, isHovered }: { item: BentoItem; isHovered: boolean }) {
  return (
    <>
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

      {/* Title + Description + Click hint */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <h3
          className="text-white text-xl md:text-2xl font-extrabold uppercase tracking-wider text-center"
          style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' }}
        >
          {item.title}
        </h3>

        {(item.description || (item.buttonLink && item.buttonText)) && (
          <div
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              marginTop: '10px',
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            {item.description && (
              <p className="text-white/70 text-xs md:text-sm text-center max-w-xs">
                {item.description}
              </p>
            )}
            {item.buttonLink && item.buttonText && (
              <span className="text-white/80 text-xs md:text-sm tracking-wide">
                {item.buttonText} &rarr;
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )
}

interface BentoItem {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageUrl?: string
  wide?: boolean
  tall?: boolean
}

// 7-item bento layout patterns (for Talente page with extra tiles)
const layoutPatterns = [
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', height: 'h-28 md:h-full' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2', height: 'h-28 md:h-full' },
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1', height: 'h-28 md:h-56' },
]

const directions = ['left', 'up', 'right', 'up', 'left', 'up', 'right'] as const

export default function BentoGridTalente({ items }: { items: BentoItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[14rem] gap-3">
      {items.map((item, i) => {
        const pattern = layoutPatterns[i % layoutPatterns.length]
        const colSpan = item.wide ? 'md:col-span-2' : item.wide === false ? 'md:col-span-1' : pattern.colSpan
        const rowSpan = item.tall ? 'md:row-span-2' : item.tall === false ? 'md:row-span-1' : pattern.rowSpan
        const height = item.tall ? 'h-28 md:h-full' : item.tall === false ? 'h-28 md:h-56' : pattern.height
        const isHovered = hoveredIndex === i

        return (
          <StaggerItem
            key={i}
            direction={directions[i % directions.length]}
            distance={50}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${colSpan} ${rowSpan} ${height}`}
          >
          {item.buttonLink ? (
            <Link
              href={item.buttonLink}
              className="absolute inset-0"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardInner item={item} isHovered={isHovered} />
            </Link>
          ) : (
            <div
              className="absolute inset-0"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardInner item={item} isHovered={isHovered} />
            </div>
          )}
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
