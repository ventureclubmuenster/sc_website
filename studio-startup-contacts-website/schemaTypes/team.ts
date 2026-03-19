import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'team',
  title: 'Vorstand & Team',
  type: 'document',
  fields: [
    orderRankField({ type: 'team' }),
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'role', title: 'Ressort / Rolle', type: 'string' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkedin', title: 'LinkedIn Profil', type: 'url' }),
    defineField({
      name: 'year',
      title: 'Jahr',
      type: 'string',
      options: {
        list: [
          { title: '2023', value: '2023' },
          { title: '2024', value: '2024' },
          { title: '2025', value: '2025' },
          { title: '2026', value: '2026' },
        ],
        layout: 'dropdown',
      },
      initialValue: '2026',
    }),
  ]
})