'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface StatCard {
  number: string
  label: string
  imageUrl?: string
}

function parseNumber(str: string): { value: number; prefix: string; suffix: string } {
  const match = str.match(/^([^\d]*)(\d+)(.*)$/)
  if (!match) return { value: 0, prefix: '', suffix: str }
  return { value: parseInt(match[2], 10), prefix: match[1], suffix: match[3] }
}

// All counters finish at roughly the same time (~2s).
// Smaller numbers get a shorter duration so they don't crawl.
function getDuration(target: number): number {
  if (target <= 50) return 1800
  if (target <= 200) return 1900
  return 2000
}

function CountUp({ target, prefix, suffix, running, delay }: { target: number; prefix: string; suffix: string; running: boolean; delay: number }) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!running) {
      setCurrent(0)
      return
    }

    const duration = getDuration(target)
    let startTime = 0

    const start = () => {
      startTime = performance.now()
      rafRef.current = requestAnimationFrame(animate)
    }

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    // Start counting after the card's fly-in delay
    const timer = setTimeout(start, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [running, target, delay])

  return (
    <span>
      {prefix}{current}{suffix}
    </span>
  )
}

export default function AnimatedStatsGrid({ cards }: { cards: StatCard[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (entry.isIntersecting && !hasTriggered.current) {
      hasTriggered.current = true
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  return (
    <div ref={sectionRef} className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((stat, i) => {
        const { value, prefix, suffix } = parseNumber(stat.number)

        return (
          <div
            key={stat.label}
            className="relative aspect-[4/3] bg-card-grey rounded-2xl overflow-hidden flex items-end p-8 transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
              transitionDelay: `${i * 200}ms`,
            }}
          >
            {stat.imageUrl && (
              <Image
                src={stat.imageUrl}
                alt={stat.label}
                fill
                className="object-cover"
              />
            )}
            {/* Subtle gradient for text readability + corporate gradient accent at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <p className="text-4xl md:text-5xl font-bold tracking-tight">
                <CountUp
                  target={value}
                  prefix={prefix}
                  suffix={suffix}
                  running={isVisible}
                  delay={i * 200}
                />
              </p>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/70">{stat.label}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
