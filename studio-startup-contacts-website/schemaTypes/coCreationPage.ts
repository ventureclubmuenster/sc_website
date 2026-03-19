import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'coCreationPage',
  title: 'Seite: Co-Creation',
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
      return { title: 'Co-Creation' }
    },
  },
})
