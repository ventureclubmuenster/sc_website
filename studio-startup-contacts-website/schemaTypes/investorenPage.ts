import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'investorenPage',
  title: 'Seite: Investoren',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'bento', title: 'Bento Grid' },
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
  ],
  preview: {
    prepare() {
      return { title: 'Investoren' }
    },
  },
})
