import { NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID // optional: assign subscribers to a group

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, role } = await request.json()

    if (!email || !firstName || !lastName || !role) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 })
    }

    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY is not set')
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 })
    }

    const body: Record<string, unknown> = {
      email,
      fields: {
        name: firstName,
        last_name: lastName,
        role,
      },
    }

    if (MAILERLITE_GROUP_ID) {
      body.groups = [MAILERLITE_GROUP_ID]
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.error('MailerLite error:', data)
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
