import { NextResponse } from 'next/server'
import { serverClient } from '@/lib/sanity/serverClient'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const ALLOWED_STATUS = ['Student', 'Young Professional', 'Sonstiges'] as const
const ALLOWED_SKILLS = [
  'Business / Strategie',
  'Tech / IT',
  'Design / Kreativ',
  'Engineering',
  'Marketing / Kommunikation',
  'Sonstiges',
] as const
const ALLOWED_VERFUEGBARKEIT = ['Ja', 'Nein', 'Unsicher'] as const
const ALLOWED_ESSENS_PRAEFERENZ = ['Mit Fleisch', 'Vegetarisch', 'Vegan'] as const

const LIMITS = {
  vollerName: 200,
  institution: 200,
  rolle: 200,
  semester: 50,
  statusSonstiges: 100,
  skillsSonstiges: 200,
  motivation: 2000,
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      vollerName,
      email,
      status,
      statusSonstiges,
      institution,
      rolle,
      semester,
      skills,
      skillsSonstiges,
      motivation,
      verfuegbarkeit,
      essensPraeferenz,
    } = body ?? {}

    // Required fields
    if (
      !vollerName ||
      !email ||
      !status ||
      !institution ||
      !rolle ||
      !skills ||
      !motivation ||
      !verfuegbarkeit ||
      !essensPraeferenz
    ) {
      return NextResponse.json(
        { error: 'Bitte fülle alle Pflichtfelder aus.' },
        { status: 400 },
      )
    }

    // Type checks
    if (
      typeof vollerName !== 'string' ||
      typeof email !== 'string' ||
      typeof status !== 'string' ||
      typeof institution !== 'string' ||
      typeof rolle !== 'string' ||
      typeof motivation !== 'string' ||
      typeof verfuegbarkeit !== 'string' ||
      typeof essensPraeferenz !== 'string' ||
      !Array.isArray(skills)
    ) {
      return NextResponse.json({ error: 'Ungültige Eingabe.' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }

    if (
      vollerName.length > LIMITS.vollerName ||
      institution.length > LIMITS.institution ||
      rolle.length > LIMITS.rolle ||
      motivation.length > LIMITS.motivation
    ) {
      return NextResponse.json({ error: 'Eingabe zu lang.' }, { status: 400 })
    }

    if (!ALLOWED_STATUS.includes(status as (typeof ALLOWED_STATUS)[number])) {
      return NextResponse.json({ error: 'Ungültiger Status.' }, { status: 400 })
    }

    if (!ALLOWED_VERFUEGBARKEIT.includes(verfuegbarkeit as (typeof ALLOWED_VERFUEGBARKEIT)[number])) {
      return NextResponse.json({ error: 'Ungültige Verfügbarkeit.' }, { status: 400 })
    }

    if (!ALLOWED_ESSENS_PRAEFERENZ.includes(essensPraeferenz as (typeof ALLOWED_ESSENS_PRAEFERENZ)[number])) {
      return NextResponse.json({ error: 'Ungültige Essenspräferenz.' }, { status: 400 })
    }

    if (skills.length === 0) {
      return NextResponse.json({ error: 'Bitte wähle mindestens eine Stärke aus.' }, { status: 400 })
    }

    for (const s of skills) {
      if (typeof s !== 'string' || !ALLOWED_SKILLS.includes(s as (typeof ALLOWED_SKILLS)[number])) {
        return NextResponse.json({ error: 'Ungültige Skill-Auswahl.' }, { status: 400 })
      }
    }

    // Optional fields type/length
    const statusSonstigesClean =
      typeof statusSonstiges === 'string' && statusSonstiges.length <= LIMITS.statusSonstiges
        ? statusSonstiges.trim()
        : ''
    const skillsSonstigesClean =
      typeof skillsSonstiges === 'string' && skillsSonstiges.length <= LIMITS.skillsSonstiges
        ? skillsSonstiges.trim()
        : ''
    const semesterClean =
      typeof semester === 'string' && semester.length <= LIMITS.semester ? semester.trim() : ''

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('SANITY_API_WRITE_TOKEN is not set')
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 })
    }

    const eingegangenAm = new Date().toISOString()

    const doc = await serverClient.create({
      _type: 'coCreationAnmeldung',
      vollerName: vollerName.trim(),
      email: email.trim(),
      status,
      statusSonstiges: statusSonstigesClean || undefined,
      institution: institution.trim(),
      rolle: rolle.trim(),
      semester: semesterClean || undefined,
      skills,
      skillsSonstiges: skillsSonstigesClean || undefined,
      motivation: motivation.trim(),
      verfuegbarkeit,
      essensPraeferenz,
      eingegangenAm,
    })

    // Fire-and-log email notification — failures here must not break the user flow
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const NOTIFY_TO = process.env.CO_CREATION_NOTIFY_TO
    const NOTIFY_FROM = process.env.CO_CREATION_NOTIFY_FROM

    if (RESEND_API_KEY && NOTIFY_TO && NOTIFY_FROM) {
      const rows: Array<[string, string]> = [
        ['Name', vollerName],
        ['E-Mail', email],
        ['Status', status + (statusSonstigesClean ? ` (${statusSonstigesClean})` : '')],
        ['Institution', institution],
        ['Rolle / Studiengang', rolle],
        ['Semester', semesterClean || '—'],
        ['Skills', skills.join(', ') + (skillsSonstigesClean ? ` (Sonstiges: ${skillsSonstigesClean})` : '')],
        ['Motivation', motivation],
        ['Verfügbarkeit 15.06.2026', verfuegbarkeit],
        ['Essenspräferenz', essensPraeferenz],
      ]
      const html = `
<h2>Neue Co-Creation Anmeldung</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
${rows
  .map(
    ([label, value]) => `
  <tr>
    <td style="padding:6px 12px;border:1px solid #ddd;background:#f7f7f7;vertical-align:top;"><strong>${escapeHtml(label)}</strong></td>
    <td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`,
  )
  .join('')}
</table>
<p style="font-family:sans-serif;font-size:12px;color:#777;margin-top:16px;">
  Eingegangen am: ${escapeHtml(eingegangenAm)}<br/>
  Sanity Doc ID: ${escapeHtml(doc._id)}
</p>
`

      const firstName = vollerName.trim().split(' ')[0]
      const confirmationHtml = `
<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px;">
  <p>Hey ${escapeHtml(firstName)},</p>
  <p>
    vielen Dank für deine Bewerbung zur <strong>Co-Creation Challenge</strong> beim startup-contacts 2026!
    Wir haben deine Anmeldung erhalten und melden uns in Kürze bei dir.
  </p>
  <p>
    Falls du noch Fragen hast, kannst du einfach auf diese Mail antworten.
  </p>
  <p>
    Bis bald!<br/>
    <strong>Das startup-contacts Team</strong>
  </p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
  <p style="font-size:12px;color:#999;">
    startup-contacts · Venture Club Münster e.V.<br/>
    <a href="https://startup-contacts.de" style="color:#FF5E00;text-decoration:none;">startup-contacts.de</a>
  </p>
</div>
`

      try {
        const [notifyRes, confirmRes] = await Promise.allSettled([
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: NOTIFY_FROM,
              to: NOTIFY_TO,
              reply_to: email,
              subject: `Neue Co-Creation Anmeldung: ${vollerName}`,
              html,
            }),
          }),
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: NOTIFY_FROM,
              to: email,
              subject: 'Deine Bewerbung zur Co-Creation Challenge',
              html: confirmationHtml,
            }),
          }),
        ])

        if (notifyRes.status === 'fulfilled' && !notifyRes.value.ok) {
          const errBody = await notifyRes.value.text().catch(() => '')
          console.error('Resend notify error', { status: notifyRes.value.status, body: errBody })
        }
        if (confirmRes.status === 'fulfilled' && !confirmRes.value.ok) {
          const errBody = await confirmRes.value.text().catch(() => '')
          console.error('Resend confirm error', { status: confirmRes.value.status, body: errBody })
        }
        if (notifyRes.status === 'rejected') console.error('Resend notify exception', notifyRes.reason)
        if (confirmRes.status === 'rejected') console.error('Resend confirm exception', confirmRes.reason)
      } catch (err) {
        console.error('Resend email exception', err)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Co-Creation Anmeldung error', err)
    return NextResponse.json({ error: 'Etwas ist schiefgelaufen.' }, { status: 500 })
  }
}
