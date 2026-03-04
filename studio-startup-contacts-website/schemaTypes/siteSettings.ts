import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Seiteneinstellungen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Website Titel',
      type: 'string',
    }),
    defineField({
      name: 'clubLogo',
      title: 'Club Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'eventDate',
      title: 'Eventdatum',
      type: 'date',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Bezeichnung', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'href', title: 'Link (z.B. /speakers)', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'Globale SEO Einstellungen',
      type: 'seo',
    }),
  ],
})