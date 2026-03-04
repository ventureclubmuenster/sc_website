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
          { title: 'Platin Partner', value: 'platin' },
          { title: 'Gold Partner', value: 'gold' },
          { title: 'Silber Partner', value: 'silber' },
          { title: 'Netzwerk Partner', value: 'network' }
        ]
      }
    }),
    defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'url', title: 'Website Link', type: 'url' }),
  ]
})
