import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'programmPage',
  title: 'Seite: Programm (Übersicht)',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Sektion', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      description: 'Hintergrundbild der Hero-Sektion auf der Programm-Übersichtsseite. Wird über dem dunklen Verlauf angezeigt.',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Programm (Übersicht)' }
    },
  },
})
