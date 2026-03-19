import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'startupsPage',
  title: 'Seite: Für Startups',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'formate', title: 'Formate Bento Grid' },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'featuredExhibitors',
      title: 'Wer zuletzt dabei war – Aussteller',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'exhibitor2025' }],
        },
      ],
      description: 'Wähle Aussteller 2025 aus, die in der Sektion "Wer zuletzt dabei war" angezeigt werden sollen.',
      group: 'hero',
    }),
    defineField({
      name: 'formatItems',
      title: 'Formate Bento Grid',
      type: 'array',
      group: 'formate',
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
      return { title: 'Für Startups' }
    },
  },
})
