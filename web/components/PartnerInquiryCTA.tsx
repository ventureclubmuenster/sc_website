'use client'

import { useCallback, useEffect, useState } from 'react'
import PartnerInquiryForm from './PartnerInquiryForm'

export default function PartnerInquiryCTA() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    setSubmitted(false)
  }, [])

  // ESC to close + body scroll lock while open
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  // Auto-close 4s after successful submission
  useEffect(() => {
    if (!submitted) return
    const timeout = setTimeout(close, 4000)
    return () => clearTimeout(timeout)
  }, [submitted, close])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="liquid-glass rounded-full px-8 py-3.5 inline-flex items-center gap-3 text-white font-medium hover:bg-white/5 transition-colors"
      >
        Jetzt Partner werden
        <span aria-hidden="true">&rarr;</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-inquiry-title"
        >
          <div
            className="liquid-glass relative w-full max-w-lg rounded-2xl p-6 sm:p-8 my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-sc-orange/20 text-sc-orange mx-auto mb-5 flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 id="partner-inquiry-title" className="text-2xl font-bold text-white mb-2">
                  Danke für deine Anfrage!
                </h3>
                <p className="text-white/60">
                  Wir melden uns schnellstmöglich bei dir.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 id="partner-inquiry-title" className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                    <span className="gradient-text">Partner</span> werden
                  </h3>
                  <p className="text-white/60 text-sm mt-2">
                    Erzähl uns kurz von eurem Unternehmen — wir melden uns schnellstmöglich.
                  </p>
                </div>
                <PartnerInquiryForm onSuccess={() => setSubmitted(true)} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
