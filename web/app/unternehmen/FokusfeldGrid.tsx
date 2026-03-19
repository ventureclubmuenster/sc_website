'use client'

import Image from 'next/image'
import { useState } from 'react'
import FadeIn from '@/components/FadeIn'

interface Fokusfeld {
  title: string
  description?: string
  imageUrl?: string
}

export default function FokusfeldGrid({ fokusfelder }: { fokusfelder: Fokusfeld[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      {/* Desktop: horizontal expanding columns */}
      <FadeIn direction="up" duration={0.7} className="hidden md:flex h-[400px] gap-2">
        {fokusfelder.map((feld, i) => {
          const isHovered = hoveredIndex === i

          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out"
              style={{ flex: isHovered ? 3 : 1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              {feld.imageUrl ? (
                <Image
                  src={feld.imageUrl}
                  alt={feld.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-white/5" />
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isHovered
                    ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.35) 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.35) 100%)',
                }}
              />

              {/* Gradient accent line */}
              <div
                className="absolute bottom-0 left-0 h-[3px] gradient-line transition-all duration-500 ease-out"
                style={{ width: isHovered ? '100%' : '0%' }}
              />

              {/* Vertical title (default) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: isHovered ? 0 : 1 }}
              >
                <h3
                  className="text-white text-base font-extrabold uppercase tracking-wider"
                  style={{
                    textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {feld.title}
                </h3>
              </div>

              {/* Horizontal title (on hover, top-left) */}
              <div
                className="absolute top-0 left-0 p-5"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: isHovered ? 'opacity 200ms 300ms' : 'opacity 50ms',
                }}
              >
                <h3
                  className="text-white text-2xl font-extrabold uppercase tracking-wider"
                  style={{ textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)' }}
                >
                  {feld.title}
                </h3>
                {feld.description && (
                  <p className="text-white/80 text-sm mt-2 max-w-xs leading-relaxed">
                    {feld.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </FadeIn>

      {/* Mobile: stacked grid */}
      <FadeIn direction="up" duration={0.7} className="grid grid-cols-2 gap-3 md:hidden">
        {fokusfelder.map((feld, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl h-40"
          >
            {feld.imageUrl ? (
              <Image
                src={feld.imageUrl}
                alt={feld.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-white/5" />
            )}

            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.35) 100%)',
              }}
            />

            <div className="absolute inset-0 flex items-end justify-center p-4">
              <h3
                className="text-white text-sm font-extrabold uppercase tracking-wider text-center"
                style={{ textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)' }}
              >
                {feld.title}
              </h3>
            </div>
          </div>
        ))}
      </FadeIn>
    </>
  )
}
