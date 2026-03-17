'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

interface GlowButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function GlowButton({ href, onClick, children }: GlowButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [intensity, setIntensity] = useState(0)
  const animRef = useRef<number>(0)
  const targetRef = useRef(0)
  const currentRef = useRef(0)

  // Smooth lerp animation for intensity
  useEffect(() => {
    targetRef.current = isHovered ? 1 : 0

    const animate = () => {
      const speed = isHovered ? 0.12 : 0.04 // fast in, slow out
      currentRef.current += (targetRef.current - currentRef.current) * speed

      // Snap to target when close enough
      if (Math.abs(currentRef.current - targetRef.current) < 0.005) {
        currentRef.current = targetRef.current
      }

      setIntensity(currentRef.current)

      if (currentRef.current !== targetRef.current) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [isHovered])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
  }, [])

  const t = intensity // 0–1 smooth value

  const Tag = href ? Link : 'button'
  const tagProps = href ? { href } : { type: 'button' as const, onClick }

  return (
    <Tag
      {...tagProps as Record<string, unknown>}
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white overflow-hidden cursor-pointer"
      style={{
        background: t > 0.01
          ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,94,0,${0.3 * t}) 0%, rgba(255,94,0,${0.1 * t}) 40%, rgba(255,94,0,${0.02 * t}) 70%)`
          : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        border: `1px solid rgba(255,${Math.round(94 * t + 255 * (1 - t))},${Math.round(0 * t + 255 * (1 - t))},${0.12 + 0.48 * t})`,
        boxShadow: `0 0 ${40 * t}px rgba(255,94,0,${0.4 * t}), 0 0 ${80 * t}px rgba(255,94,0,${0.2 * t}), 0 0 ${120 * t}px rgba(255,94,0,${0.1 * t}), inset 0 0 ${40 * t}px rgba(255,94,0,${0.1 * t})`,
        transition: 'background 0.6s ease-out',
      }}
    >
      {/* Primary cursor glow */}
      <span
        className="pointer-events-none absolute w-40 h-40 rounded-full"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(255,94,0,${0.12 + 0.68 * t}) 0%, rgba(255,94,0,${0.04 + 0.26 * t}) 40%, transparent 70%)`,
        }}
      />

      {/* Wide ambient glow */}
      <span
        className="pointer-events-none absolute w-72 h-72 rounded-full"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(255,94,0,${0.03 + 0.32 * t}) 0%, rgba(255,94,0,${0.1 * t}) 50%, transparent 70%)`,
        }}
      />

      {/* Conic border sweep */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          opacity: t,
          background: `conic-gradient(from 0deg at ${pos.x}% ${pos.y}%, rgba(255,94,0,0.7), rgba(255,60,0,0.3) 25%, transparent 40%, transparent 60%, rgba(255,94,0,0.3) 75%, rgba(255,94,0,0.7))`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
        }}
      />

      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
        <span
          className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,94,0,0.25), rgba(255,255,255,0.1), rgba(255,94,0,0.25), transparent)',
          }}
        />
      </span>

      {/* Text */}
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
      <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-sc-orange" aria-hidden="true">
        &rarr;
      </span>
    </Tag>
  )
}
