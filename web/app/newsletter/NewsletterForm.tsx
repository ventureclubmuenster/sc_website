'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const roles = [
  'Studierende/r',
  'Startup-Gründer/in',
  'Unternehmen',
  'Investor/in',
  'Sonstige',
]

export default function NewsletterForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!consent) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, role }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Etwas ist schiefgelaufen.')
      }

      onSuccess?.()
      router.push('/danke')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
            Vorname
          </label>
          <input
            id="firstName"
            type="text"
            required
            placeholder="Vorname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
            Nachname
          </label>
          <input
            id="lastName"
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
        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors"
        />
      </div>

      {/* Role select */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white/80 mb-2">
          In welcher Rolle siehst du dich?
        </label>
        <select
          id="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
          {roles.map((r) => (
            <option key={r} value={r} className="bg-[#1a1a1a] text-white">
              {r}
            </option>
          ))}
        </select>
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
          Ich möchte alle Infos zur Startup Contacts, sowie weiteren Veranstaltungen erhalten und stimme der zweckmäßigen Verarbeitung meiner Daten zu. Hier findest du unseren{' '}
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
      <div className="pt-2">
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
              Jetzt Anmelden!
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
