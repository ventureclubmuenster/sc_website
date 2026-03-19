import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ueberUnsPage',
  title: 'Seite: Über uns',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Sektion', options: { collapsible: true, collapsed: false } },
    { name: 'mission', title: 'Mission Grid (Venture Club)', options: { collapsible: true, collapsed: true } },
    { name: 'timeline', title: 'Timeline / Geschichte', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild (Gruppenfoto)',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
    }),
    defineField({
      name: 'missionCards',
      title: 'Mission-Kacheln (2x2 Grid)',
      description: '4 Kacheln: Wer wir sind, Was wir machen, Unser Warum, Unser Wie',
      type: 'array',
      fieldset: 'mission',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'hoverText', title: 'Hover-Text', description: 'Text der beim Hovern erscheint', type: 'text', rows: 2 },
            {
              name: 'image',
              title: 'Hintergrundbild',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'timelineEntries',
      title: 'Timeline-Einträge',
      description: 'Jahresblöcke mit Bild und Textabschnitten.',
      type: 'array',
      fieldset: 'timeline',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Jahr', type: 'string' },
            {
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'imagePosition',
              title: 'Bild-Position (Desktop)',
              type: 'string',
              options: {
                list: [
                  { title: 'Links', value: 'left' },
                  { title: 'Rechts', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            },
            {
              name: 'textBlocks',
              title: 'Textabschnitte',
              type: 'array',
              of: [{ type: 'text', rows: 3 }],
            },
          ],
          preview: {
            select: { title: 'year', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Über uns' }
    },
  },
})
