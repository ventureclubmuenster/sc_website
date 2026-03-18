import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const partner2025 = defineType({
  name: 'partner2025',
  title: 'Partner & Sponsoren 2025',
  type: 'document',
  fields: [
    orderRankField({ type: 'partner2025' }),
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ 
      name: 'category', 
      title: 'Kategorie',
      type: 'string', 
      options: { 
        list: [
          { title: 'Main Partner', value: 'main' },
          { title: 'Supporter', value: 'supporter' },
          { title: 'Attendance Partner', value: 'attendance' },
          { title: 'Food & Beverage Partner', value: 'food-beverage' },
          { title: 'Network Partner', value: 'network' }
        ] 
      } 
    }),
    defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'whiteBackground',
      title: 'Weiße Kachel?',
      type: 'boolean',
      initialValue: true,
      description: 'An = weiße Kachel, Aus = schwarze Kachel',
    }),
    defineField({ name: 'url', title: 'Website Link', type: 'url' }),
  ]
})