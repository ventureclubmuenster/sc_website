import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'studierendePage',
  title: 'Seite: Für Studierende',
  type: 'document',
  fields: [
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Hintergrundvideo für den Hero-Bereich',
    }),
    defineField({
      name: 'heroHeadingPrefix',
      title: 'Überschrift Prefix (weiß)',
      type: 'string',
      initialValue: 'FÜR',
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Überschrift Highlight (orange)',
      type: 'string',
      initialValue: 'STUDIERENDE',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Untertitel',
      type: 'string',
      initialValue: 'Werde Teil der größten Startup- und Innovationsmesse in NRW!',
    }),
    defineField({
      name: 'heroDateLine',
      title: 'Datum & Ort (fett)',
      type: 'string',
      initialValue: '23. Juni 2025, Halle Münsterland',
    }),
    defineField({
      name: 'featureCards',
      title: 'Was dich erwartet – Karten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel (z.B. COMMUNITY)', type: 'string' }),
            defineField({ name: 'hoverText', title: 'Hover-Text', type: 'text', rows: 3 }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Für Studierende' }
    },
  },
})
