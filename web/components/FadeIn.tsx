'use client'

import { motion, type Variant } from 'framer-motion'
import { type ReactNode, useSyncExternalStore } from 'react'

// ---------------------------------------------------------------------------
// Performance detection
// ---------------------------------------------------------------------------

/** Detect once whether the device can handle animations comfortably. */
function detectCanAnimate(): boolean {
  if (typeof window === 'undefined') return true // SSR – assume capable

  // Respect OS-level "reduce motion" preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  const nav = navigator as Navigator & { deviceMemory?: number }

  // Low CPU core count (≤ 2 logical cores → likely low-end mobile)
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) return false

  // Low memory (Chrome-only API, ≤ 2 GB)
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return false

  return true
}

let cachedResult: boolean | null = null

function getCanAnimate(): boolean {
  if (cachedResult === null) cachedResult = detectCanAnimate()
  return cachedResult
}

// Tiny external store so every component shares a single value without re-computing.
function subscribe(cb: () => void) {
  // Also listen for changes to prefers-reduced-motion at runtime
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handler = () => { cachedResult = null; cb() }
  mq.addEventListener('change', handler)
  return () => mq.removeEventListener('change', handler)
}

function getSnapshot() { return getCanAnimate() }
function getServerSnapshot() { return true }

export function useCanAnimate() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span'
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
}

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className,
  once = true,
  as = 'div',
}: FadeInProps) {
  const canAnimate = useCanAnimate()

  if (!canAnimate) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const offset = offsets[direction]

  const hidden: Variant = {
    opacity: 0,
    x: offset.x * distance,
    y: offset.y * distance,
  }

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }

  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{ hidden, visible }}
      className={className}
    >
      {children}
    </Component>
  )
}

/** Stagger wrapper — wraps children in a container that staggers their animations */
export function StaggerContainer({
  children,
  stagger = 0.1,
  className,
  as = 'div',
}: {
  children: ReactNode
  stagger?: number
  className?: string
  as?: 'div' | 'section' | 'ul'
}) {
  const canAnimate = useCanAnimate()

  if (!canAnimate) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

/** A motion child that works inside StaggerContainer */
export function StaggerItem({
  children,
  direction = 'up',
  distance = 40,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  direction?: Direction
  distance?: number
  duration?: number
  className?: string
}) {
  const canAnimate = useCanAnimate()

  if (!canAnimate) {
    return <div className={className}>{children}</div>
  }

  const offset = offsets[direction]

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: offset.x * distance, y: offset.y * distance },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
