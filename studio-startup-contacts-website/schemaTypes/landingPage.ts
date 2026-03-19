import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Startseite',
  type: 'document',
  fieldsets: [
    { name: 'stellDirVor', title: 'Stell dir vor was', options: { collapsible: true, collapsed: false } },
    { name: 'networkingTogether', title: 'Networking Together', options: { collapsible: true, collapsed: true } },
    { name: 'wasDuErwarten', title: 'Was du erwarten kannst', options: { collapsible: true, collapsed: true } },
    { name: 'wenDuErwarten', title: 'Wen du erwarten kannst', options: { collapsible: true, collapsed: true } },
    { name: 'hallOfFameSection', title: 'Unsere Hall of Fame', options: { collapsible: true, collapsed: true } },
    { name: 'whyUsSection', title: 'Warum Startup Contacts', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ── Stell dir vor was ──
    defineField({
      name: 'stellDirVorSpeaker',
      title: 'Speaker & Themen — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'stellDirVor',
    }),
    defineField({
      name: 'stellDirVorBesucher',
      title: 'Besucher — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'stellDirVor',
    }),
    defineField({
      name: 'stellDirVorStaende',
      title: 'Stände — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'stellDirVor',
    }),

    // ── Networking Together ──
    defineField({
      name: 'networkingBg',
      title: 'Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'networkingTogether',
    }),

    // ── Was du erwarten kannst ──
    defineField({
      name: 'erwartungCoCreation',
      title: 'Stände & Co-Creation — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wasDuErwarten',
    }),
    defineField({
      name: 'erwartungWorkshops',
      title: 'Workshops — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wasDuErwarten',
    }),
    defineField({
      name: 'erwartungBuehne',
      title: 'Bühnenprogramm — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wasDuErwarten',
    }),
    defineField({
      name: 'erwartungSideEvents',
      title: 'Side Events — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wasDuErwarten',
    }),

    // ── Wen du erwarten kannst ──
    defineField({
      name: 'wenStartups',
      title: 'Startups — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wenDuErwarten',
    }),
    defineField({
      name: 'wenCorporates',
      title: 'Corporates — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wenDuErwarten',
    }),
    defineField({
      name: 'wenTalente',
      title: 'Talente — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wenDuErwarten',
    }),
    defineField({
      name: 'wenInvestoren',
      title: 'Investoren — Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'wenDuErwarten',
    }),

    // ── Unsere Hall of Fame ──
    defineField({
      name: 'hallOfFame',
      title: 'Hall of Fame Speaker',
      description: 'Wähle einige ausgewählte Speaker für die Hall of Fame Sektion aus.',
      type: 'array',
      fieldset: 'hallOfFameSection',
      of: [
        {
          type: 'reference',
          to: [{ type: 'speaker2025' }],
        },
      ],
      validation: (Rule) => Rule.max(6).unique(),
    }),

    // ── Warum Startup Contacts (bestehend) ──
    defineField({
      name: 'whyUs',
      title: 'Warum Startup Contacts Karten',
      type: 'array',
      fieldset: 'whyUsSection',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titel', type: 'string' },
            {
              name: 'bgImage',
              title: 'Hintergrundbild',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Startseite' }
    },
  },
})
