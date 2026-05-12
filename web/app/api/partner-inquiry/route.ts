import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const PARTNER_INQUIRY_TO_EMAIL = process.env.PARTNER_INQUIRY_TO_EMAIL
const PARTNER_INQUIRY_FROM_EMAIL = process.env.PARTNER_INQUIRY_FROM_EMAIL

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ALLOWED_POSITIONS = [
  'Geschäftsführung',
  'Marketing',
  'HR / Recruiting',
  'Vertrieb',
  'Innovation',
  'Sonstige',
]

function escapeHtml(value: string): string {
  return value
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
      firstName,
      lastName,
      email,
      company,
      position,
      message,
      website,
    } = body

    // Honeypot: silently accept bot submissions without sending
    if (typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    if (!firstName || !lastName || !email || !company || !position || !message) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 })
    }

    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof email !== 'string' ||
      typeof company !== 'string' ||
      typeof position !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json({ error: 'Ungültige Eingabe.' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }

    if (firstName.length > 100 || lastName.length > 100) {
      return NextResponse.json({ error: 'Name zu lang.' }, { status: 400 })
    }

    if (company.length > 200) {
      return NextResponse.json({ error: 'Firmenname zu lang.' }, { status: 400 })
    }

    if (!ALLOWED_POSITIONS.includes(position)) {
      return NextResponse.json({ error: 'Ungültige Position.' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Nachricht zu lang.' }, { status: 400 })
    }

    if (!RESEND_API_KEY || !PARTNER_INQUIRY_TO_EMAIL || !PARTNER_INQUIRY_FROM_EMAIL) {
      console.error('Resend/Partner-Inquiry env vars missing')
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 })
    }

    const resend = new Resend(RESEND_API_KEY)

    const fullName = `${firstName} ${lastName}`.trim()
    const html = `
      <h2>Neue Partner-Anfrage</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
      <p><strong>Position:</strong> ${escapeHtml(position)}</p>
      <p><strong>Nachricht:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    `

    const text = [
      'Neue Partner-Anfrage',
      '',
      `Name: ${fullName}`,
      `E-Mail: ${email}`,
      `Firma: ${company}`,
      `Position: ${position}`,
      '',
      'Nachricht:',
      message,
    ].join('\n')

    const { error } = await resend.emails.send({
      from: PARTNER_INQUIRY_FROM_EMAIL,
      to: PARTNER_INQUIRY_TO_EMAIL,
      replyTo: email,
      subject: `Partner-Anfrage von ${company}`,
      html,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Versand fehlgeschlagen. Bitte versuche es erneut.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Etwas ist schiefgelaufen.' }, { status: 500 })
  }
}
