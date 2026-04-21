'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function BigCountdown({ targetDate }: { targetDate: string }) {
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
    return <div className="h-[220px] sm:h-[260px] md:h-[300px]" />
  }

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-sc-orange text-sm sm:text-base font-semibold tracking-[0.3em] uppercase">
          Sale is live
        </span>
        <p className="text-white text-2xl sm:text-3xl font-bold">Tickets sind jetzt verfügbar</p>
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

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8">
      <span className="text-sc-orange text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
        Ticket Launch · 22.04.2026 · 18:00 Uhr
      </span>
      <div className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] px-3 py-5 sm:px-6 sm:py-8 md:px-10 md:py-10 min-w-[70px] sm:min-w-[110px] md:min-w-[150px]"
          >
            <span className="text-white text-4xl sm:text-6xl md:text-7xl font-black tabular-nums leading-none">
              {pad(u.value)}
            </span>
            <span className="text-white/40 text-[10px] sm:text-xs md:text-sm mt-2 sm:mt-3 uppercase tracking-[0.2em]">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
