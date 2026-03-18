import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'workshopsPage',
  title: 'Seite: Workshops',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Sektion', options: { collapsible: true, collapsed: false } },
    { name: 'history', title: 'Highlights aus 2025', options: { collapsible: true, collapsed: true } },
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
              name: 'logo2',
              title: 'Logo 2 (optional)',
              type: 'image',
              options: { hotspot: false },
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'speaker' },
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
