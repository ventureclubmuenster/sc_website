'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface CoCreationModalProps {
  open: boolean
  onClose: () => void
}

export default function CoCreationModal({ open, onClose }: CoCreationModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 animate-in fade-in duration-300"
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-card-grey/95 border border-white/10 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Schließen"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div className="p-8 sm:p-12 text-center">
          <p className="gradient-text font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-4">
            Bewerbungsphase abgeschlossen
          </p>
          <p className="text-white/60 text-base max-w-md mx-auto leading-relaxed">
            Die Bewerbungsfrist für die Co-Creation Challenge ist abgelaufen.
            Vielen Dank an alle, die sich beworben haben.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
