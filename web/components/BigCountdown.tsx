'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    totalSeconds,
  }
}

interface BigCountdownProps {
  targetDate: string
  label?: string
}

export default function BigCountdown({ targetDate, label = 'Early Bird Sale Ende' }: BigCountdownProps) {
  const target = new Date(targetDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(getTimeLeft(target))
    const id = setInterval(() => {
      const tl = getTimeLeft(target)
      setTimeLeft(tl)
      if (!tl) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!mounted) {
    return <div className="h-[160px] sm:h-[190px] md:h-[210px]" />
  }

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="text-sc-orange text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
          {label}
        </span>
        <p className="text-white text-xl sm:text-2xl font-bold">Early Bird ist vorbei</p>
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'Tage' },
    { value: timeLeft.hours, label: 'Stunden' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Sekunden' },
  ]

  const pad = (n: number) => n.toString().padStart(2, '0')

  const isUrgent = timeLeft.totalSeconds <= 30 * 60
  const isCritical = timeLeft.totalSeconds <= 5 * 60

  const labelColor = isUrgent ? 'text-red-500' : 'text-sc-orange'
  const borderColor = isUrgent ? 'border-red-500/40' : 'border-white/10'
  const numberColor = isUrgent ? 'text-red-500' : 'text-white'
  const blinkClass = isCritical ? 'countdown-blink' : ''

  return (
    <div className={`flex flex-col items-center gap-4 sm:gap-6 ${blinkClass}`}>
      <span className={`${labelColor} text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase`}>
        {label}
      </span>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-5">
        {units.map((u) => (
          <div
            key={u.label}
            className={`flex flex-col items-center justify-center rounded-xl border ${borderColor} bg-[#111111] px-2 py-3 sm:px-4 sm:py-5 md:px-6 md:py-6 min-w-[60px] sm:min-w-[85px] md:min-w-[105px]`}
          >
            <span className={`${numberColor} text-3xl sm:text-4xl md:text-5xl font-black tabular-nums leading-none`}>
              {pad(u.value)}
            </span>
            <span className="text-white/40 text-[9px] sm:text-[10px] md:text-xs mt-2 uppercase tracking-[0.2em]">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
