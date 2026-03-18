import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ueberUnsPage',
  title: 'Seite: Über uns',
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
      return { title: 'Über uns' }
    },
  },
})
