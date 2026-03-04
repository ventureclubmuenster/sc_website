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
  ]
})