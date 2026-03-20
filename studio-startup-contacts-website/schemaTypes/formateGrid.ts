import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'formateGrid',
  title: 'Formate Bento Grid',
  type: 'document',
  description: 'Formate-Kacheln – werden auf allen Seiten verwendet (Startseite, Unternehmen, Investoren, Startups).',
  fields: [
    defineField({
      name: 'items',
      title: 'Formate',
      type: 'array',
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
  ],
  preview: {
    prepare() {
      return { title: 'Formate Bento Grid' }
    },
  },
})
