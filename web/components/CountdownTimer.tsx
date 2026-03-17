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

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(target))
    const id = setInterval(() => {
      const tl = getTimeLeft(target)
      setTimeLeft(tl)
      if (!tl) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!timeLeft) return null

  const units = [
    { value: timeLeft.days, label: 'd' },
    { value: timeLeft.hours, label: 'h' },
    { value: timeLeft.minutes, label: 'm' },
    { value: timeLeft.seconds, label: 's' },
  ]

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sc-orange text-sm font-semibold">Sale starts soon</span>
      <div className="flex items-center gap-3 text-white text-2xl font-bold tabular-nums">
        {units.map((u) => (
          <span key={u.label}>
            {u.value}<span className="text-white/40 text-lg font-normal">{u.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
