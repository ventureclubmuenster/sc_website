import { defineType, defineField } from 'sanity'

const cardFields = [
  defineField({ name: 'title', title: 'Titel', type: 'string' }),
  defineField({ name: 'subtitle', title: 'Untertitel', type: 'string' }),
  defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
]

const fokusFields = [
  defineField({ name: 'title', title: 'Titel', type: 'string' }),
  defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
]

export default defineType({
  name: 'startupsPage',
  title: 'Seite: Für Startups',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'kombi', title: 'Einmalige Kombination' },
    { name: 'fokus', title: 'Fokusfelder (Texte)' },
    { name: 'sections', title: 'Weitere Texte' },
    { name: 'aussteller', title: 'Wer dabei ist (Logos)' },
  ],
  fields: [
    // ---- Hero ----
    defineField({ name: 'heroImage', title: 'Hero Hintergrundbild', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'STARTUPS BAUEN DIE ZUKUNFT', description: 'Das letzte Wort wird automatisch orange dargestellt.', group: 'hero' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2, initialValue: 'Wir wollen die Basis dafür schaffen', group: 'hero' }),

    // ---- Einmalige Kombination ----
    defineField({ name: 'kombiHeadingWhite', title: 'Überschrift (weißer Teil)', type: 'string', initialValue: 'EINE EINMALIGE', group: 'kombi' }),
    defineField({ name: 'kombiHeadingOrange', title: 'Überschrift (oranger Teil)', type: 'string', initialValue: 'KOMBINATION', group: 'kombi' }),
    defineField({ name: 'kombiIntro', title: 'Einleitungstext', type: 'text', rows: 2, initialValue: 'Startup Contacts bringt zusammen, was zusammen gehört, an einem einzigen Tag, unter einem Dach.', group: 'kombi' }),
    defineField({ name: 'kombiCards', title: 'Karten', type: 'array', group: 'kombi', of: [{ type: 'object', fields: cardFields, preview: { select: { title: 'title', subtitle: 'subtitle' } } }], validation: (Rule) => Rule.max(2) }),
    defineField({ name: 'kombiTaglineParts', title: 'Tagline-Teile (mit × verbunden)', type: 'array', of: [{ type: 'string' }], group: 'kombi', description: 'z.B. "Talente", "Corporates", "Euer Startup"' }),
    defineField({ name: 'kombiTaglineResult', title: 'Tagline Ergebniszeile', type: 'string', initialValue: '= maximale Reichweite für eure Innovation', group: 'kombi' }),

    // ---- Fokusfelder Texte (Bilder im Dokument "Fokusfelder") ----
    defineField({ name: 'fokusHeadingWhite', title: 'Fokusfelder-Überschrift (weißer Teil)', type: 'string', initialValue: 'UNSERE', group: 'fokus' }),
    defineField({ name: 'fokusHeadingOrange', title: 'Fokusfelder-Überschrift (oranger Teil)', type: 'string', initialValue: 'FOKUSFELDER', group: 'fokus' }),
    defineField({ name: 'fokusItems', title: 'Fokusfelder (6 Stück, Reihenfolge = Bildreihenfolge)', type: 'array', group: 'fokus', of: [{ type: 'object', fields: fokusFields, preview: { select: { title: 'title' } } }], validation: (Rule) => Rule.max(6), description: 'Reihenfolge: Produktion, Logistik & Einkauf, Energie & Nachhaltigkeit, Bau & Handwerk, Betriebs-Infrastruktur, Lifestyle' }),

    // ---- Weitere Texte ----
    defineField({ name: 'formatHeadingBefore', title: 'Formate-Überschrift (vor orange)', type: 'string', initialValue: 'BRINGE DEIN WISSEN IN UNSERE', group: 'sections' }),
    defineField({ name: 'formatHeadingOrange', title: 'Formate-Überschrift (oranger Teil)', type: 'string', initialValue: 'FORMATE', group: 'sections' }),
    defineField({ name: 'formatHeadingAfter', title: 'Formate-Überschrift (nach orange)', type: 'string', initialValue: 'EIN', group: 'sections' }),
    defineField({ name: 'exhibitorHeadingWhite1', title: 'Aussteller-Überschrift (Teil 1, weiß)', type: 'string', initialValue: 'WER', group: 'sections' }),
    defineField({ name: 'exhibitorHeadingOrange', title: 'Aussteller-Überschrift (oranger Teil)', type: 'string', initialValue: 'DABEI', group: 'sections' }),
    defineField({ name: 'exhibitorHeadingWhite2', title: 'Aussteller-Überschrift (Teil 3, weiß)', type: 'string', initialValue: 'IST', group: 'sections' }),
    defineField({ name: 'alleAusstellerText', title: '"Alle Aussteller" Button-Text', type: 'string', initialValue: 'Alle Aussteller', group: 'sections' }),
    defineField({ name: 'alleAusstellerLink', title: '"Alle Aussteller" Button-Link', type: 'string', initialValue: '/innovation-village#aussteller-2026', group: 'sections' }),
    defineField({ name: 'ticketCtaText', title: 'Ticket-CTA Text', type: 'string', initialValue: 'Als Startup Ticket sichern', group: 'sections' }),

    // ---- Aussteller-Auswahl (bestehend) ----
    defineField({
      name: 'featuredExhibitors',
      title: 'Wer dabei ist – Aussteller (optional, aus Liste)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibitor2025' }] }],
      description: 'Optional: Aussteller 2025 aus der bestehenden Liste wählen.',
      group: 'sections',
    }),

    // ---- Wer dabei ist: Logos manuell hochladen ----
    defineField({
      name: 'exhibitorLogos',
      title: 'Wer dabei ist – Logos (manuell)',
      type: 'array',
      group: 'aussteller',
      description: 'Lade hier die Logos für die Sektion "Wer dabei ist" hoch. Wenn mindestens ein Logo vorhanden ist, wird diese Liste angezeigt – sonst die Standard-Logos.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'whiteBackground', title: 'Weiße Kachel (für dunkle/bunte Logos)', type: 'boolean', initialValue: false }),
          defineField({ name: 'url', title: 'Link (optional)', type: 'url' }),
        ],
        preview: { select: { title: 'name', media: 'logo' } },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Für Startups' }
    },
  },
})
