import { defineField } from 'sanity'

export default {
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  fields: [
    defineField({ name: 'Startup Contacts 2026', title: 'Startup Contacts 2026', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
    defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image' }),
  ]
}
