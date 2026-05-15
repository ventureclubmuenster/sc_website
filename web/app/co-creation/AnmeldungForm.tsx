'use client'

import { useState, type FormEvent } from 'react'

const STATUS_OPTIONS = ['Student', 'Young Professional', 'Sonstiges'] as const
const SKILL_OPTIONS = [
  'Business / Strategie',
  'Tech / IT',
  'Design / Kreativ',
  'Engineering',
  'Marketing / Kommunikation',
  'Sonstiges',
] as const
const VERFUEGBARKEIT_OPTIONS = ['Ja', 'Nein', 'Unsicher'] as const

type StatusOption = (typeof STATUS_OPTIONS)[number]
type SkillOption = (typeof SKILL_OPTIONS)[number]
type VerfuegbarkeitOption = (typeof VERFUEGBARKEIT_OPTIONS)[number]

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-sc-orange focus:ring-1 focus:ring-sc-orange transition-colors'

const labelClass = 'block text-sm font-medium text-white/80 mb-2'

export default function AnmeldungForm() {
  const [vollerName, setVollerName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<StatusOption | ''>('')
  const [statusSonstiges, setStatusSonstiges] = useState('')
  const [institution, setInstitution] = useState('')
  const [rolle, setRolle] = useState('')
  const [semester, setSemester] = useState('')
  const [skills, setSkills] = useState<SkillOption[]>([])
  const [skillsSonstiges, setSkillsSonstiges] = useState('')
  const [motivation, setMotivation] = useState('')
  const [verfuegbarkeit, setVerfuegbarkeit] = useState<VerfuegbarkeitOption | ''>('')
  const [consent, setConsent] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function toggleSkill(skill: SkillOption) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!consent) return
    if (!status || !verfuegbarkeit || skills.length === 0) return

    setFormStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/co-creation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vollerName,
          email,
          status,
          statusSonstiges: status === 'Sonstiges' ? statusSonstiges : undefined,
          institution,
          rolle,
          semester,
          skills,
          skillsSonstiges: skills.includes('Sonstiges') ? skillsSonstiges : undefined,
          motivation,
          verfuegbarkeit,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Etwas ist schiefgelaufen.')
      }

      setFormStatus('success')
    } catch (err) {
      setFormStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen.')
    }
  }

  if (formStatus === 'success') {
    return (
      <div className="text-center py-6">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-sc-orange/15 border border-sc-orange/40 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sc-orange">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-white mb-3">
          Danke für deine Bewerbung!
        </h3>
        <p className="text-white/70 max-w-md mx-auto">
          Wir haben deine Anmeldung erhalten und melden uns nach der Auswahl bei dir. Bis bald in Münster!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Voller Name */}
      <div>
        <label htmlFor="vollerName" className={labelClass}>
          Vor- und Nachname <span className="text-sc-orange">*</span>
        </label>
        <input
          id="vollerName"
          type="text"
          required
          maxLength={200}
          placeholder=""
          value={vollerName}
          onChange={(e) => setVollerName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          E-Mail-Adresse <span className="text-sc-orange">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          maxLength={254}
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Status */}
      <fieldset>
        <legend className={labelClass}>
          Status <span className="text-sc-orange">*</span>
        </legend>
        <div className="space-y-2">
          {STATUS_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer text-white/80 hover:text-white transition-colors">
              <input
                type="radio"
                name="status"
                value={opt}
                checked={status === opt}
                onChange={() => setStatus(opt)}
                required
                className="w-4 h-4 accent-sc-orange"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {status === 'Sonstiges' && (
          <input
            type="text"
            maxLength={100}
            placeholder="Bitte präzisieren"
            value={statusSonstiges}
            onChange={(e) => setStatusSonstiges(e.target.value)}
            className={`${inputClass} mt-3`}
          />
        )}
      </fieldset>

      {/* Institution */}
      <div>
        <label htmlFor="institution" className={labelClass}>
          Hochschule / Arbeitgeber <span className="text-sc-orange">*</span>
        </label>
        <input
          id="institution"
          type="text"
          required
          maxLength={200}
          placeholder=""
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Rolle / Studiengang */}
      <div>
        <label htmlFor="rolle" className={labelClass}>
          Studiengang / Jobtitel <span className="text-sc-orange">*</span>
        </label>
        <input
          id="rolle"
          type="text"
          required
          maxLength={200}
          placeholder=""
          value={rolle}
          onChange={(e) => setRolle(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Semester (optional) */}
      <div>
        <label htmlFor="semester" className={labelClass}>
          Semester <span className="text-white/40">(optional)</span>
        </label>
        <input
          id="semester"
          type="text"
          maxLength={50}
          placeholder=""
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Skills */}
      <fieldset>
        <legend className={labelClass}>
          Was bringst du mit? <span className="text-sc-orange">*</span>
          <span className="block text-xs font-normal text-white/40 mt-1">Mehrfachauswahl möglich</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SKILL_OPTIONS.map((opt) => {
            const checked = skills.includes(opt)
            return (
              <label
                key={opt}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  checked
                    ? 'border-sc-orange bg-sc-orange/10 text-white'
                    : 'border-white/15 bg-white/[0.03] text-white/80 hover:border-white/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSkill(opt)}
                  className="w-4 h-4 accent-sc-orange"
                />
                <span className="text-sm">{opt}</span>
              </label>
            )
          })}
        </div>
        {skills.includes('Sonstiges') && (
          <input
            type="text"
            maxLength={200}
            placeholder="Bitte präzisieren"
            value={skillsSonstiges}
            onChange={(e) => setSkillsSonstiges(e.target.value)}
            className={`${inputClass} mt-3`}
          />
        )}
      </fieldset>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className={labelClass}>
          Warum möchtest du an der Co-Creation Challenge teilnehmen? <span className="text-sc-orange">*</span>
        </label>
        <textarea
          id="motivation"
          required
          rows={4}
          maxLength={2000}
          placeholder="Was reizt dich am Format, was möchtest du beitragen? Schreib gerne so ausführlich, wie du magst, auch mehr als ein paar Sätze sind willkommen."
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>

      {/* Verfügbarkeit */}
      <fieldset>
        <legend className={labelClass}>
          Hast du am 15.06.2026 von ca. 09:00–17:00 Uhr Zeit? <span className="text-sc-orange">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {VERFUEGBARKEIT_OPTIONS.map((opt) => {
            const selected = verfuegbarkeit === opt
            return (
              <label
                key={opt}
                className={`px-5 py-2 rounded-full border cursor-pointer transition-colors ${
                  selected
                    ? 'border-sc-orange bg-sc-orange/10 text-white'
                    : 'border-white/15 bg-white/[0.03] text-white/80 hover:border-white/30'
                }`}
              >
                <input
                  type="radio"
                  name="verfuegbarkeit"
                  value={opt}
                  checked={selected}
                  onChange={() => setVerfuegbarkeit(opt)}
                  required
                  className="sr-only"
                />
                <span className="text-sm font-medium">{opt}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent text-sc-orange focus:ring-sc-orange focus:ring-offset-0 cursor-pointer accent-sc-orange"
        />
        <span className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
          Ich stimme zu, dass meine Angaben für die Bewerbung zur Co-Creation Challenge verarbeitet werden. Hier findest du unseren{' '}
          <a href="/datenschutz" className="text-sc-orange hover:underline">
            Datenschutz
          </a>
          .
        </span>
      </label>

      {/* Error */}
      {formStatus === 'error' && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!consent || formStatus === 'loading'}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sc-orange text-white font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {formStatus === 'loading' ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet...
            </>
          ) : (
            <>
              Jetzt bewerben
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
