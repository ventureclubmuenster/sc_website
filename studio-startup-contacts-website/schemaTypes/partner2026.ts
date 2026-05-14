import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'partner2026',
  title: 'Partner & Sponsoren 2026',
  type: 'document',
  fields: [
    orderRankField({ type: 'partner2026' }),
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Main Partner', value: 'main' },
          { title: 'Premium Partner', value: 'premium' },
          { title: 'Partner', value: 'partner' },
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
