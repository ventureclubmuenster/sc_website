'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

/** Read a CSS custom property and return its hex value */
function getCSSColor(prop: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim() || fallback
}

/** Convert hex (#rrggbb) to {r,g,b} */
function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

interface GlowButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  small?: boolean
  gradient?: boolean
}

export default function GlowButton({ href, onClick, children, small, gradient }: GlowButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [intensity, setIntensity] = useState(0)
  const animRef = useRef<number>(0)
  const targetRef = useRef(0)
  const currentRef = useRef(0)

  const [colors, setColors] = useState({ from: { r: 254, g: 40, b: 31 }, to: { r: 246, g: 107, b: 1 } })
  useEffect(() => {
    setMounted(true)
    setColors({
      from: hexToRgb(getCSSColor('--gradient-from', '#fe281f')),
      to: hexToRgb(getCSSColor('--gradient-to', '#f66b01')),
    })
  }, [])

  const gTo = colors.to

  useEffect(() => {
    targetRef.current = isHovered ? 1 : 0

    const animate = () => {
      const speed = isHovered ? 0.12 : 0.04
      currentRef.current += (targetRef.current - currentRef.current) * speed

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

  const t = mounted ? intensity : 0

  // ── Gradient variant: wrapper holds glow, button sits inside ──
  if (gradient) {
    const btnClassName = small
      ? 'relative inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm text-white cursor-pointer gradient-bg'
      : 'relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-semibold text-lg text-white cursor-pointer gradient-bg'

    const glowConic = 'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 25%, #ff5e00 45%, #ff8a2a 50%, #ff5e00 55%, transparent 75%, transparent 100%)'

    const inner = (
      <>
        <span className="relative z-10">{children}</span>
        <span
          className="relative z-10 transition-transform duration-300"
          style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
          aria-hidden="true"
        >
          &rarr;
        </span>
      </>
    )

    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Sharp edge glow */}
        <span
          className="pointer-events-none absolute -inset-[3px] rounded-full"
          style={{
            background: glowConic,
            animation: 'glow-spin 3s linear infinite',
            filter: 'blur(4px)',
            opacity: t,
          }}
        />
        {/* Wide soft halo */}
        <span
          className="pointer-events-none absolute -inset-[8px] rounded-full"
          style={{
            background: glowConic,
            animation: 'glow-spin 3s linear infinite',
            filter: 'blur(14px)',
            opacity: t * 0.6,
          }}
        />

        {href ? (
          <Link href={href} ref={btnRef} className={btnClassName}>{inner}</Link>
        ) : (
          <button type="button" onClick={onClick} ref={btnRef} className={btnClassName}>{inner}</button>
        )}
      </div>
    )
  }

  // ── Glass variant (default) ──
  const sharedClassName = small
    ? 'group relative inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm text-white cursor-pointer'
    : 'group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white cursor-pointer'

  const sharedStyle = {
    background: t > 0.01
      ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.18 * t}) 0%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.08 * t}) 40%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.02 * t}) 70%)`
      : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    border: `1px solid rgba(${Math.round(gTo.r * t + 255 * (1 - t))},${Math.round(gTo.g * t + 255 * (1 - t))},${Math.round(gTo.b * t + 255 * (1 - t))},${0.12 + 0.38 * t})`,
    boxShadow: `0 0 ${40 * t}px rgba(${gTo.r},${gTo.g},${gTo.b},${0.25 * t}), 0 0 ${80 * t}px rgba(${gTo.r},${gTo.g},${gTo.b},${0.15 * t}), 0 0 ${120 * t}px rgba(${gTo.r},${gTo.g},${gTo.b},${0.07 * t}), inset 0 0 ${40 * t}px rgba(${gTo.r},${gTo.g},${gTo.b},${0.06 * t})`,
    transition: 'background 0.6s ease-out',
  }

  // Outer glow halo — lives outside the button so overflow:hidden can't clip it
  const glowHalo = (
    <>
      <span
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: '-40px',
          background: `radial-gradient(circle at 50% 50%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.18 * t}) 0%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.08 * t}) 40%, transparent 70%)`,
        }}
      />
      <span
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: '-80px',
          background: `radial-gradient(circle at 50% 50%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.10 * t}) 0%, rgba(${gTo.r},${gTo.g},${gTo.b},${0.04 * t}) 50%, transparent 70%)`,
        }}
      />
    </>
  )

  const glassInner = (
    <>
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          opacity: t,
          background: `conic-gradient(from 0deg at ${pos.x}% ${pos.y}%, rgba(${gTo.r},${gTo.g},${gTo.b},0.45), rgba(${gTo.r},${gTo.g},${gTo.b},0.2) 25%, transparent 40%, transparent 60%, rgba(${gTo.r},${gTo.g},${gTo.b},0.2) 75%, rgba(${gTo.r},${gTo.g},${gTo.b},0.45))`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
        }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
        <span
          className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${gTo.r},${gTo.g},${gTo.b},0.15), rgba(255,255,255,0.08), rgba(${gTo.r},${gTo.g},${gTo.b},0.15), transparent)`,
          }}
        />
      </span>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">{children}</span>
      <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-sc-orange" aria-hidden="true">&rarr;</span>
    </>
  )

  if (href) {
    return (
      <div
        className="relative inline-block"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {glowHalo}
        <Link
          href={href}
          ref={btnRef}
          className={sharedClassName}
          style={sharedStyle}
        >
          {glassInner}
        </Link>
      </div>
    )
  }

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {glowHalo}
      <button
        type="button"
        onClick={onClick}
        ref={btnRef}
        className={sharedClassName}
        style={sharedStyle}
      >
        {glassInner}
      </button>
    </div>
  )
}
