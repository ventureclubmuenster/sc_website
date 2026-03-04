import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const exhibitor2025 = defineType({
  name: 'exhibitor2025',
  title: 'Aussteller 2025',
  type: 'document',
  fields: [
    orderRankField({ type: 'exhibitor2025' }),
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