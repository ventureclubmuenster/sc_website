'use client'

import { useState } from 'react'

export default function DiscountBadge() {
  const [copied, setCopied] = useState(false)

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
        <span className="text-sm font-semibold text-white leading-snug">
          10% sparen mit Code
        </span>

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
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2v1"/></svg>
                Kopieren
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] font-normal text-white/40 leading-snug">
          Wende den Code bei &ldquo;Promo- oder Gutschein-Code einlösen&rdquo; an
        </p>
      </div>
    </div>
  )
}
