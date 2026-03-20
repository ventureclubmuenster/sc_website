import { NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID // optional: assign subscribers to a group

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ALLOWED_ROLES = [
  'Studierende/r',
  'Startup-Gründer/in',
  'Unternehmen',
  'Investor/in',
  'Sonstige',
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, role } = body

    if (!email || !firstName || !lastName || !role) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 })
    }

    if (
      typeof email !== 'string' ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof role !== 'string'
    ) {
      return NextResponse.json({ error: 'Ungültige Eingabe.' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }

    if (firstName.length > 100 || lastName.length > 100) {
      return NextResponse.json({ error: 'Name zu lang.' }, { status: 400 })
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Ungültige Rolle.' }, { status: 400 })
    }

    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY is not set')
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 })
    }

    const payload: Record<string, unknown> = {
      email,
      fields: {
        name: firstName,
        last_name: lastName,
        role,
      },
    }

    if (MAILERLITE_GROUP_ID) {
      payload.groups = [MAILERLITE_GROUP_ID]
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      await res.json().catch(() => ({}))
      console.error('MailerLite error:', { status: res.status })
      return NextResponse.json(
        { error: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Etwas ist schiefgelaufen.' }, { status: 500 })
  }
}
