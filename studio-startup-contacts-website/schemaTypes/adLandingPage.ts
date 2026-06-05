import { defineType, defineField } from 'sanity'

/**
 * Ad Landing Page (SC26)
 * Eigenständige, voll editierbare Landing Page für Instagram-Ads.
 * Inhaltlich an die Startseite angelehnt, aber als separates Singleton — Änderungen
 * hier wirken sich NICHT auf die normale Startseite aus.
 * Wird unter der "Secret"-Route /sc26 ausgespielt (noindex, nicht verlinkt).
 */
export default defineType({
  name: 'adLandingPage',
  title: 'Ad Landing Page (SC26)',
  type: 'document',
  fieldsets: [
    { name: 'settings', title: '⚙️ Einstellungen (Ticket-Link & CTA)', options: { collapsible: true, collapsed: false } },
    { name: 'hero', title: '① Hero', options: { collapsible: true, collapsed: false } },
    { name: 'slider', title: '①½ Logo-Slidebanner (unter Hero)', options: { collapsible: true, collapsed: true } },
    { name: 'stats', title: '② Stell dir vor was … (Zahlen)', options: { collapsible: true, collapsed: true } },
    { name: 'formate', title: '③ Was du erwarten kannst (Formate)', options: { collapsible: true, collapsed: true } },
    { name: 'speaker', title: '④ Unsere Speaker', options: { collapsible: true, collapsed: true } },
    { name: 'zielgruppen', title: '⑤ Wen du erwarten kannst', options: { collapsible: true, collapsed: true } },
    { name: 'logos', title: '⑥ Aussteller-/Firmen-Logos', options: { collapsible: true, collapsed: true } },
    { name: 'faq', title: '⑦ Häufige Fragen (FAQ)', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    // ── ⚙️ Einstellungen ──────────────────────────────────────────────
    defineField({
      name: 'ticketUrl',
      title: 'Ticket-Link (Secret-Shop)',
      description: 'Ziel aller "Ticket sichern"-Buttons. Hier den geheimen Shop-Link eintragen.',
      type: 'url',
      fieldset: 'settings',
      initialValue:
        'https://tickets.infield.live/event/69777da5382b6da735040ed6/6a194aef06e962eac8cc2904',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button-Text',
      type: 'string',
      fieldset: 'settings',
      initialValue: 'Ticket sichern',
    }),

    // ── ① Hero ────────────────────────────────────────────────────────
    defineField({
      name: 'heroHeadline',
      title: 'Headline (Zeile 1 & 3)',
      description: 'Wird in zwei Zeilen gezeigt, getrennt durch das gedämpfte Wort darunter.',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Zukunft Zusammenarbeit',
    }),
    defineField({
      name: 'heroHeadlineMuted',
      title: 'Gedämpftes Mittelwort',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'durch',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Subline',
      type: 'text',
      rows: 2,
      fieldset: 'hero',
      initialValue:
        'Die größte studentisch organisierte Startup Messe in NRW.\nWo Studierende, Startups und Mittelstand aufeinandertreffen.',
    }),
    defineField({
      name: 'heroDateLabel',
      title: 'Datum',
      type: 'string',
      fieldset: 'hero',
      initialValue: '15. Juni 2026',
    }),
    defineField({
      name: 'heroLocationLabel',
      title: 'Ort',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Halle Münsterland',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero-Video (MP4, optional)',
      description: 'Optional. Ohne Upload wird das Standard-Video der Website genutzt.',
      type: 'file',
      options: { accept: 'video/mp4,video/*' },
      fieldset: 'hero',
    }),

    // ── ①½ Logo-Slidebanner ───────────────────────────────────────────
    defineField({
      name: 'sliderLogos',
      title: 'Slidebanner-Logos',
      description:
        'Laufender Logo-Banner unter der Hero-Section (wie auf der Startseite). PNG/SVG mit ' +
        'transparentem Hintergrund — wird automatisch weiß dargestellt. Ohne Pflege werden die ' +
        'Standard-Logos der Website gezeigt.',
      type: 'array',
      fieldset: 'slider',
      options: { layout: 'grid' },
      of: [
        {
          type: 'object',
          name: 'logo',
          fields: [
            defineField({ name: 'image', title: 'Logo-Bild', type: 'image', options: { hotspot: false }, validation: (r) => r.required() }),
            defineField({ name: 'name', title: 'Name (Alt-Text)', type: 'string' }),
            defineField({
              name: 'whiteBackground',
              title: 'Heller / weißer Hintergrund',
              description: 'Aktivieren, wenn das Logo sonst als weißer Block verschwindet (wird dann auf weißer Fläche gezeigt).',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({ name: 'scalePercent', title: 'Größe (%)', type: 'number', initialValue: 100, validation: (r) => r.min(30).max(200) }),
          ],
          preview: { select: { title: 'name', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Logo', media }) },
        },
      ],
    }),

    // ── ② Stats ───────────────────────────────────────────────────────
    defineField({
      name: 'statsHeading',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'stats',
      initialValue: 'Stell dir vor was …',
    }),
    defineField({
      name: 'statsSubheading',
      title: 'Unterüberschrift',
      type: 'string',
      fieldset: 'stats',
      initialValue: '… Gemeinsam erreichen können',
    }),
    defineField({
      name: 'stats',
      title: 'Zahlen (3 Karten)',
      type: 'array',
      fieldset: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Zahl (z.B. "35+")', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Beschriftung', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'image', title: 'Hintergrundbild', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'number', subtitle: 'label', media: 'image' } },
        },
      ],
      initialValue: [
        { number: '20+', label: 'Speaker & Themen' },
        { number: '1000+', label: 'Besucher' },
        { number: '35+', label: 'Stände' },
      ],
    }),

    // ── ③ Formate ─────────────────────────────────────────────────────
    defineField({
      name: 'formateHeading',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'formate',
      initialValue: 'Was du erwarten kannst',
    }),
    defineField({
      name: 'formatItems',
      title: 'Formate',
      type: 'array',
      fieldset: 'formate',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 2 }),
            defineField({ name: 'image', title: 'Hintergrundbild', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
      initialValue: [
        { title: 'WORKSHOPS', description: 'Hands-on Sessions zu KI, Karriere, Gründung und mehr' },
        { title: 'LIVE PODCAST', description: 'Gründungsgeschichten und Persönlichkeiten hautnah im Studio' },
        { title: 'TALKS', description: 'Keynotes, Panels und Fireside Chats auf der Main Stage' },
        { title: 'INNOVATION VILLAGE', description: 'Über 30 Aussteller zeigen ihre Innovationen an einem Ort' },
      ],
    }),

    // ── ④ Speaker ─────────────────────────────────────────────────────
    defineField({
      name: 'speakerHeading',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'speaker',
      initialValue: 'Unsere Speaker',
    }),
    defineField({
      name: 'speakers',
      title: 'Speaker',
      description: 'Beliebig viele. Foto pro Speaker hochladen.',
      type: 'array',
      fieldset: 'speaker',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'role', title: 'Rolle / Firma', type: 'string' }),
            defineField({ name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'linkedins',
              title: 'LinkedIn-Profile',
              description:
                'Ein Eintrag pro Person. Bei zwei Personen (z.B. „Hannes & Jeremy") zwei Einträge mit ' +
                'Namen anlegen — dann erscheinen zwei LinkedIn-Logos, jeweils anklickbar.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'name', title: 'Name (optional)', type: 'string' }),
                    defineField({ name: 'url', title: 'LinkedIn-Link', type: 'url', validation: (r) => r.required() }),
                  ],
                  preview: { select: { title: 'name', subtitle: 'url' }, prepare: ({ title, subtitle }) => ({ title: title || 'LinkedIn', subtitle }) },
                },
              ],
              validation: (r) => r.max(2),
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
        },
      ],
      initialValue: [
        { name: 'Jan Kraume', role: 'Co-Founder @OACE' },
        { name: 'Splash' },
        { name: 'Knounity' },
        { name: 'Hannes & Jeremy' },
      ],
    }),

    // ── ⑤ Zielgruppen ─────────────────────────────────────────────────
    defineField({
      name: 'zielgruppenHeading',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'zielgruppen',
      initialValue: 'Wen du erwarten kannst',
    }),
    defineField({
      name: 'zielgruppen',
      title: 'Zielgruppen-Karten',
      type: 'array',
      fieldset: 'zielgruppen',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Beschriftung', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        },
      ],
      initialValue: [
        { label: 'Startups' },
        { label: 'Corporates' },
        { label: 'Talente' },
        { label: 'Investoren' },
      ],
    }),

    // ── ⑥ Aussteller-/Firmen-Logos ────────────────────────────────────
    defineField({
      name: 'logosHeading',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'logos',
      initialValue: 'Mit dabei',
    }),
    defineField({
      name: 'companyLogos',
      title: 'Logos',
      description: 'Logos der teilnehmenden Unternehmen/Aussteller. Werden unten auf der Seite angezeigt.',
      type: 'array',
      fieldset: 'logos',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: 'url', title: 'Website-Link (optional)', type: 'url' }),
            defineField({
              name: 'whiteBackground',
              title: 'Weiße Kachel?',
              description: 'Aktivieren, wenn das Logo einen weißen Hintergrund braucht.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
    }),

    // ── ⑦ FAQ ─────────────────────────────────────────────────────────
    defineField({
      name: 'faqHeading',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'faq',
      initialValue: 'Häufige Fragen',
    }),
    defineField({
      name: 'faq',
      title: 'Fragen & Antworten',
      type: 'array',
      fieldset: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Frage', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'answer', title: 'Antwort', type: 'text', rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      initialValue: [
        { question: 'Wann findet die Startup Contacts 2026 statt?', answer: 'Die Startup Contacts findet am 15. Juni 2026 in der Halle Münsterland in Münster statt.' },
        { question: 'Welche Formate bietet die Startup Contacts?', answer: 'Co-Creation Sessions, Workshops, Live Podcasts, Main Stage Talks und das Innovation Village mit Startups aus sechs Fokusfeldern.' },
        { question: 'Können Auszubildende und Schüler auch ein Student-Ticket kaufen?', answer: 'Ja, Auszubildende und Schüler können ebenfalls ein Student-Ticket kaufen. Ladet dazu einfach einen Ausweis eurer Schule oder Berufsschule hoch.' },
        { question: 'Für wen ist die Startup Messe gedacht?', answer: 'Für Studierende und Talente, Gründerinnen und Gründer, mittelständische Unternehmen aus NRW und Investoren, die am deutschen Startup Ökosystem teilhaben wollen.' },
        { question: 'Wo genau ist die Halle Münsterland?', answer: 'Albersloher Weg 32, 48155 Münster. Gut erreichbar mit Auto, Bus und Bahn.' },
        { question: 'Was kostet ein Ticket?', answer: 'Alle Ticketoptionen findest du auf unserer Ticketseite. Studierende erhalten vergünstigten Eintritt.' },
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Ad Landing Page (SC26)' }
    },
  },
})
