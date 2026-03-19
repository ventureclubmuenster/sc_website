import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'investorenPage',
  title: 'Seite: Investoren',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'bento', title: 'Bento Grid' },
    { name: 'formate', title: 'Formate Bento Grid' },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'bentoInvestorBreakfast',
      title: 'Bento: Investor Breakfast',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoLetztesJahr',
      title: 'Bento: Wer letztes Jahr dabei war',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoMuensterTop5',
      title: 'Bento: Münster Top 5 Gründungshochschulen',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoVipArea',
      title: 'Bento: VIP Area',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoMeetGreet',
      title: 'Bento: Meet & Greet',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),

    // Formate Bento Grid
    defineField({
      name: 'formatItems',
      title: 'Formate Bento Grid',
      type: 'array',
      group: 'formate',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 2 }),
            defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
            defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
            defineField({ name: 'image', title: 'Hintergrundbild', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'wide', title: 'Breites Element (2 Spalten)', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'buttonLink', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Investoren' }
    },
  },
})
