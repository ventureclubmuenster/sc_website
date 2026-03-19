import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'workshopsPage',
  title: 'Seite: Workshops',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Sektion', options: { collapsible: true, collapsed: false } },
    { name: 'history', title: 'Highlights aus 2025', options: { collapsible: true, collapsed: true } },
    { name: 'preview2026', title: 'Was dich dieses Jahr erwartet', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
    }),
    defineField({
      name: 'workshopHistory',
      title: 'Workshop-Highlights (Letztes Jahr)',
      description: 'Die größten Workshops vom letzten Jahr als Karten.',
      type: 'array',
      fieldset: 'history',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Workshop-Titel', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'speaker', title: 'Speaker (Name & Unternehmen)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Kurzbeschreibung', type: 'text', rows: 2 },
            {
              name: 'logo',
              title: 'Logo 1 (Speaker/Unternehmen)',
              type: 'image',
              options: { hotspot: false },
            },
            {
              name: 'logoWhiteBg',
              title: 'Logo 1: Weißer Hintergrund',
              description: 'Aktivieren, wenn das Logo einen weißen Hintergrund braucht (z.B. bei dunklen Logos).',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'logo2',
              title: 'Logo 2 (optional)',
              type: 'image',
              options: { hotspot: false },
            },
            {
              name: 'logo2WhiteBg',
              title: 'Logo 2: Weißer Hintergrund',
              description: 'Aktivieren, wenn das Logo einen weißen Hintergrund braucht.',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'speaker' },
          },
        },
      ],
    }),
    defineField({
      name: 'previewTopics',
      title: 'Themen-Vorschau 2026',
      description: '4 Kacheln mit Bild, Kategorie-Badge und Titel für das 2x2-Grid.',
      type: 'array',
      fieldset: 'preview2026',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Kategorie-Badge (z.B. TECHNOLOGY)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'title', title: 'Themen-Titel', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'image',
              title: 'Hintergrundbild',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'category', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Workshops' }
    },
  },
})
