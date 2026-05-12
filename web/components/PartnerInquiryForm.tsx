'use client'

import { useState, type FormEvent } from 'react'

const positions = [
  'Geschäftsführung',
  'Marketing',
  'HR / Recruiting',
  'Vertrieb',
  'Innovation',
  'Sonstige',
]

export default function PartnerInquiryForm({ onSuccess }: { onSuccess: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!consent) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          company,
          position,
          message,
          website,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Etwas ist schiefgelaufen.')
      }

      onSuccess()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — invisible to humans, often filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pi-firstName" className="block text-sm font-medium text-white/80 mb-2">
            Vorname
          </label>
          <input
            id="pi-firstName"
            type="text"
            required
            placeholder="Vorname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors"
          />
        </div>
        <div>
          <label htmlFor="pi-lastName" className="block text-sm font-medium text-white/80 mb-2">
            Nachname
          </label>
          <input
            id="pi-lastName"
            type="text"
            required
            placeholder="Nachname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="pi-email" className="block text-sm font-medium text-white/80 mb-2">
          E-Mail
        </label>
        <input
          id="pi-email"
          type="email"
          required
          placeholder="deine@firma.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="pi-company" className="block text-sm font-medium text-white/80 mb-2">
          Firma
        </label>
        <input
          id="pi-company"
          type="text"
          required
          placeholder="Firmenname"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors"
        />
      </div>

      {/* Position */}
      <div>
        <label htmlFor="pi-position" className="block text-sm font-medium text-white/80 mb-2">
          Position
        </label>
        <select
          id="pi-position"
          required
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white appearance-none focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
          }}
        >
          <option value="" disabled className="bg-[#1a1a1a] text-white/50">
            Wähle aus...
          </option>
          {positions.map((p) => (
            <option key={p} value={p} className="bg-[#1a1a1a] text-white">
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="pi-message" className="block text-sm font-medium text-white/80 mb-2">
          Nachricht
        </label>
        <textarea
          id="pi-message"
          required
          rows={4}
          placeholder="Wie wollt ihr Partner werden? Was interessiert euch?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors resize-none"
        />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent text-sc-orange focus:ring-sc-orange focus:ring-offset-0 cursor-pointer accent-sc-orange"
        />
        <span className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
          Ich stimme der zweckmäßigen Verarbeitung meiner Daten zur Bearbeitung dieser Anfrage zu. Hier findest du unseren{' '}
          <a href="/datenschutz" className="text-sc-orange hover:underline">
            Datenschutz
          </a>
          .
        </span>
      </label>

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={!consent || status === 'loading'}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sc-orange text-white font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet...
            </>
          ) : (
            <>
              Anfrage senden
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
