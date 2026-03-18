import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'startupsPage',
  title: 'Seite: Für Startups',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
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
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Für Startups' }
    },
  },
})
