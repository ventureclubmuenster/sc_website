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
  name: 'unternehmenPage',
  title: 'Seite: Für Unternehmen',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'kombi', title: 'Einmalige Kombination' },
    { name: 'fokus', title: 'Fokusfelder (Texte)' },
    { name: 'sections', title: 'Weitere Texte' },
    { name: 'aussteller', title: 'Wer dabei ist (Logos)' },
    { name: 'bento', title: 'Benefits Bento Grid' },
  ],
  fields: [
    // ---- Hero ----
    defineField({ name: 'heroImage', title: 'Hero Hintergrundbild', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'IHR UNTERNEHMEN TREIBT DIE BRANCHE VORAN', description: 'Das letzte Wort wird automatisch orange dargestellt.', group: 'hero' }),
    defineField({ name: 'heroHighlight', title: 'Hero Highlight (orange)', type: 'string', initialValue: 'Co-Creation als Innovationstreiber', group: 'hero' }),

    // ---- Einmalige Kombination ----
    defineField({ name: 'kombiHeadingWhite', title: 'Überschrift (weißer Teil)', type: 'string', initialValue: 'EINE EINMALIGE', group: 'kombi' }),
    defineField({ name: 'kombiHeadingOrange', title: 'Überschrift (oranger Teil)', type: 'string', initialValue: 'KOMBINATION', group: 'kombi' }),
    defineField({ name: 'kombiIntro', title: 'Einleitungstext', type: 'text', rows: 2, initialValue: 'Startup Contacts bringt zusammen, was zusammen gehört, an einem einzigen Tag, unter einem Dach.', group: 'kombi' }),
    defineField({ name: 'kombiCards', title: 'Karten', type: 'array', group: 'kombi', of: [{ type: 'object', fields: cardFields, preview: { select: { title: 'title', subtitle: 'subtitle' } } }], validation: (Rule) => Rule.max(2) }),
    defineField({ name: 'kombiTaglineParts', title: 'Tagline-Teile (mit × verbunden)', type: 'array', of: [{ type: 'string' }], group: 'kombi', description: 'z.B. "Startups", "Talente", "Ihr Unternehmen"' }),
    defineField({ name: 'kombiTaglineResult', title: 'Tagline Ergebniszeile', type: 'string', initialValue: '= Innovation und Wachstum für Ihre Branche', group: 'kombi' }),

    // ---- Fokusfelder Texte ----
    defineField({ name: 'fokusHeadingWhite', title: 'Fokusfelder-Überschrift (weißer Teil)', type: 'string', initialValue: 'UNSERE', group: 'fokus' }),
    defineField({ name: 'fokusHeadingOrange', title: 'Fokusfelder-Überschrift (oranger Teil)', type: 'string', initialValue: 'FOKUSFELDER', group: 'fokus' }),
    defineField({ name: 'fokusItems', title: 'Fokusfelder (6 Stück, Reihenfolge = Bildreihenfolge)', type: 'array', group: 'fokus', of: [{ type: 'object', fields: fokusFields, preview: { select: { title: 'title' } } }], validation: (Rule) => Rule.max(6), description: 'Reihenfolge: Produktion, Logistik & Einkauf, Energie & Nachhaltigkeit, Bau & Handwerk, Betriebs-Infrastruktur, Lifestyle' }),

    // ---- Weitere Texte ----
    defineField({ name: 'formatHeadingBefore', title: 'Formate-Überschrift (vor orange)', type: 'string', initialValue: 'BRINGEN SIE IHR WISSEN IN UNSEREN', group: 'sections' }),
    defineField({ name: 'formatHeadingOrange', title: 'Formate-Überschrift (oranger Teil)', type: 'string', initialValue: 'FORMATEN', group: 'sections' }),
    defineField({ name: 'formatHeadingAfter', title: 'Formate-Überschrift (nach orange)', type: 'string', initialValue: 'EIN', group: 'sections' }),
    defineField({ name: 'exhibitorHeadingWhite1', title: 'Aussteller-Überschrift (Teil 1, weiß)', type: 'string', initialValue: 'WER', group: 'sections' }),
    defineField({ name: 'exhibitorHeadingOrange', title: 'Aussteller-Überschrift (oranger Teil)', type: 'string', initialValue: 'DABEI', group: 'sections' }),
    defineField({ name: 'exhibitorHeadingWhite2', title: 'Aussteller-Überschrift (Teil 3, weiß)', type: 'string', initialValue: 'IST', group: 'sections' }),
    defineField({ name: 'alleAusstellerText', title: '"Alle Aussteller" Button-Text', type: 'string', initialValue: 'Alle Aussteller', group: 'sections' }),
    defineField({ name: 'alleAusstellerLink', title: '"Alle Aussteller" Button-Link', type: 'string', initialValue: '/innovation-village#aussteller-2026', group: 'sections' }),
    defineField({ name: 'ticketCtaText', title: 'Ticket-CTA Text', type: 'string', initialValue: 'Als Unternehmen Ticket sichern', group: 'sections' }),

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

    // ---- Bento Grid (Bilder) ----
    defineField({ name: 'bentoStartupSzene', title: 'Bento: Zugang zur Startup Szene', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoVipAccess', title: 'Bento: VIP-Access', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoFoodDrinks', title: 'Bento: Food & Drinks', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoExperience', title: 'Bento: Experience', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoAfterwork', title: 'Bento: Afterwork', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoInnovationVillage', title: 'Bento: Innovation Village', type: 'image', options: { hotspot: true }, group: 'bento' }),
  ],
  preview: {
    prepare() {
      return { title: 'Für Unternehmen' }
    },
  },
})
