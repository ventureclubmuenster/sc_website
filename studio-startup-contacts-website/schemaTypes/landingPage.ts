import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Startseite',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Video', options: { collapsible: true, collapsed: false } },
    { name: 'stellDirVor', title: 'Stell dir vor was', options: { collapsible: true, collapsed: false } },
    { name: 'networkingTogether', title: 'Networking Together', options: { collapsible: true, collapsed: true } },
    { name: 'formateBento', title: 'Unsere Formate (Bento Grid)', options: { collapsible: true, collapsed: true } },
    { name: 'wenDuErwarten', title: 'Wen du erwarten kannst', options: { collapsible: true, collapsed: true } },
    { name: 'hallOfFameSection', title: 'Unsere Hall of Fame', options: { collapsible: true, collapsed: true } },
    { name: 'whyUsSection', title: 'Warum Startup Contacts', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ── Hero Video ──
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      description: 'MP4-Video für den Hero-Bereich der Startseite (empfohlen: max. 50 MB, komprimiert)',
      type: 'file',
      options: { accept: 'video/mp4,video/*' },
      fieldset: 'hero',
    }),

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

    // ── Unsere Formate (Bento Grid) ──
    defineField({
      name: 'formatItems',
      title: 'Formate Bento Grid',
      type: 'array',
      fieldset: 'formateBento',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 2 }),
            defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
            defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
            defineField({ name: 'image', title: 'Hintergrundbild', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'wide', title: 'Breites Element (2 Spalten)', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'buttonLink', media: 'image' },
          },
        },
      ],
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
