import { defineType, defineField } from 'sanity'

const cardFields = [
  defineField({ name: 'title', title: 'Titel', type: 'string' }),
  defineField({ name: 'subtitle', title: 'Untertitel', type: 'string' }),
  defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
]

export default defineType({
  name: 'investorenPage',
  title: 'Seite: Investoren',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'why', title: 'Warum Startup Contacts' },
    { name: 'sections', title: 'Weitere Texte' },
    { name: 'bento', title: 'Bento Grid' },
  ],
  fields: [
    // ---- Hero ----
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'SMART MONEY TRIFFT INNOVATION',
      description: 'Das letzte Wort wird automatisch orange dargestellt.',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Entdecken Sie die vielversprechendsten Startups der Region, bevor es alle anderen tun',
      group: 'hero',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight (orange)',
      type: 'string',
      initialValue: 'Exklusiver Zugang. Direkter Kontakt. Echte Deals.',
      group: 'hero',
    }),

    // ---- Warum Startup Contacts ----
    defineField({
      name: 'whyHeadingWhite',
      title: 'Überschrift (weißer Teil)',
      type: 'string',
      initialValue: 'WARUM',
      group: 'why',
    }),
    defineField({
      name: 'whyHeadingOrange',
      title: 'Überschrift (oranger Teil)',
      type: 'string',
      initialValue: 'STARTUP CONTACTS?',
      group: 'why',
    }),
    defineField({
      name: 'whyIntro',
      title: 'Einleitungstext',
      type: 'text',
      rows: 2,
      initialValue: 'Ein Tag. Ein Ort. Maximaler Zugang zu den innovativsten Gründern der Region.',
      group: 'why',
    }),
    defineField({
      name: 'whyCards',
      title: 'Karten',
      type: 'array',
      group: 'why',
      of: [{ type: 'object', fields: cardFields, preview: { select: { title: 'title', subtitle: 'subtitle' } } }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'whyTaglineParts',
      title: 'Tagline-Teile (werden mit × verbunden)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'why',
      description: 'z.B. "Talente", "Unternehmen", "Startups" – getrennt durch ein oranges ×.',
    }),
    defineField({
      name: 'whyTaglineResult',
      title: 'Tagline Ergebniszeile',
      type: 'string',
      initialValue: '= wo Probleme auf Lösungen treffen',
      group: 'why',
    }),

    // ---- Weitere Texte ----
    defineField({
      name: 'formatHeadingBefore',
      title: 'Formate-Überschrift (Teil vor orange)',
      type: 'string',
      initialValue: 'LERNE DIE SZENE BEI UNSEREN',
      group: 'sections',
    }),
    defineField({
      name: 'formatHeadingOrange',
      title: 'Formate-Überschrift (oranger Teil)',
      type: 'string',
      initialValue: 'FORMATEN',
      group: 'sections',
    }),
    defineField({
      name: 'formatHeadingAfter',
      title: 'Formate-Überschrift (Teil nach orange)',
      type: 'string',
      initialValue: 'KENNEN',
      group: 'sections',
    }),
    defineField({
      name: 'ticketCtaText',
      title: 'Ticket-CTA Text',
      type: 'string',
      initialValue: 'Als Investor Ticket sichern',
      group: 'sections',
    }),

    // ---- Bento Grid (Bilder) ----
    defineField({ name: 'bentoInvestorBreakfast', title: 'Bento: Investor Breakfast', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoLetztesJahr', title: 'Bento: Wer letztes Jahr dabei war', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoMuensterTop5', title: 'Bento: Münster Top 5 Gründungshochschulen', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoVipArea', title: 'Bento: VIP Area', type: 'image', options: { hotspot: true }, group: 'bento' }),
    defineField({ name: 'bentoMeetGreet', title: 'Bento: Meet & Greet', type: 'image', options: { hotspot: true }, group: 'bento' }),
  ],
  preview: {
    prepare() {
      return { title: 'Investoren' }
    },
  },
})
