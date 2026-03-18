import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'podcastPage',
  title: 'Seite: Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Podcast' }
    },
  },
})
