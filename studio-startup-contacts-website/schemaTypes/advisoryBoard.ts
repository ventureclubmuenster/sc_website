import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'advisoryBoard',
  title: 'Advisory Board',
  type: 'document',
  fields: [
    orderRankField({ type: 'advisoryBoard' }),
    defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Rolle / Position', type: 'string' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkedin', title: 'LinkedIn Profil', type: 'url' }),
  ],
})
