'use client'

import { useEffect, useState } from 'react'

const DEADLINE = new Date('2026-05-24T23:59:00')

function getTimeLeft() {
  const diff = DEADLINE.getTime() - Date.now()
  if (diff <= 0) return null

  const totalSec = Math.floor(diff / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  return { days, hours, minutes, seconds }
}

export default function DiscountBadge() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  const handleCopy = () => {
    navigator.clipboard.writeText('VCM').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-4 flex gap-3 text-white text-sm leading-relaxed font-semibold rounded-lg border border-sc-orange/30 bg-sc-orange/[0.08] px-3 py-2.5">
      <span aria-hidden className="text-sc-orange mt-[2px] shrink-0">★</span>
      <div className="flex flex-col gap-2 min-w-0 w-full">
        {/* Zeile 1: Label */}
        <span className="text-sm font-semibold text-white leading-snug">
          20% Countdown Rabatt
        </span>

        {/* Zeile 2: Code + Kopieren */}
        <div className="flex items-stretch gap-2">
          <span className="flex items-center rounded-md bg-sc-orange/20 border border-sc-orange/40 px-2.5 py-1.5 text-xs font-black tracking-widest text-sc-orange">
            VCM
          </span>
          <button
            onClick={handleCopy}
            aria-label="Code kopieren"
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
                Kopiert!
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Kopieren
              </>
            )}
          </button>
        </div>

        {/* Zeile 3: Hinweis */}
        <p className="text-[10px] font-normal text-white/40 leading-snug">
          Wende den Code bei &ldquo;Promo- oder Gutschein-Code einlösen&rdquo; an
        </p>

        {/* Zeile 4: Countdown eingebettet */}
        <div className="w-full rounded-md bg-black/30 border border-white/5 px-3 py-2 flex justify-between items-end font-mono tabular-nums">
          {[
            { value: pad(timeLeft.days), label: 'Tage' },
            { value: pad(timeLeft.hours), label: 'Std' },
            { value: pad(timeLeft.minutes), label: 'Min' },
            { value: pad(timeLeft.seconds), label: 'Sek' },
          ].map((seg, i) => (
            <span key={seg.label} className="flex items-end gap-1">
              {i > 0 && <span className="text-white/20 text-sm font-light mb-[4px]">:</span>}
              <span className="flex flex-col items-center">
                <span className="text-sm font-medium text-white leading-none">{seg.value}</span>
                <span className="text-[9px] font-normal text-white/35 leading-none mt-1">{seg.label}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
