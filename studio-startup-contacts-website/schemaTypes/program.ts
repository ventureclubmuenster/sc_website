import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'program',
  title: 'Programm & Events',
  type: 'document',
  fields: [
    orderRankField({ type: 'program' }),
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ 
      name: 'type', 
      type: 'string', 
      options: { list: ['Keynote', 'Panel Discussion', 'Fireside Chat', 'Workshop', 'Live Podcast'] }
    }),
    defineField({ name: 'startTime', title: 'Startzeit', type: 'datetime' }),
    defineField({ name: 'endTime', title: 'Endzeit', type: 'datetime' }),
    defineField({ name: 'location', title: 'Bühne / Raum', type: 'string' }),
    defineField({
      name: 'speakers',
      title: 'Zugeordnete Speaker',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'speaker2025' }, { type: 'speaker2026' }] }]
    }),
    defineField({ name: 'description', type: 'text' }),
  ]
})