import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'speaker2026',
  title: 'Speaker 2026',
  type: 'document',
  fields: [
    orderRankField({ type: 'speaker2026' }),
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'title', title: 'Jobtitel / Rolle', type: 'string' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url' },
        { name: 'twitter', type: 'url' }
      ]
    }),
    defineField({
      name: 'stage',
      title: 'Stage',
      type: 'string',
      options: {
        list: [
          { title: 'Main Stage', value: 'Main Stage' },
          { title: 'Workshop', value: 'Workshop Stage' },
          { title: 'Ask me anything', value: 'Panel Stage' },
          { title: 'Live Podcast', value: 'Podcast Stage' },
        ],
      },
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'image' },
  },
})
