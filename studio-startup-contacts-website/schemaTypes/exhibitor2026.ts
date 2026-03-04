import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'exhibitor2026',
  title: 'Aussteller 2026',
  type: 'document',
  fields: [
    orderRankField({ type: 'exhibitor2026' }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: { list: ['Startup', 'Unternehmen', 'Investor', 'Partner'] }
    }),
    defineField({ name: 'description', title: 'Kurzbeschreibung', type: 'text' }),
    defineField({ name: 'standNumber', title: 'Standnummer', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
  ]
})
