import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fokusfelder',
  title: 'Fokusfelder',
  type: 'document',
  description: 'Bilder für die Fokusfelder – werden auf allen Seiten verwendet (Startups, Unternehmen, etc.)',
  fields: [
    defineField({
      name: 'fokusProduktion',
      title: 'Produktion',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fokusLogistik',
      title: 'Logistik & Einkauf',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fokusEnergie',
      title: 'Energie & Nachhaltigkeit',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fokusBau',
      title: 'Bau- & Handwerk',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fokusInfrastruktur',
      title: 'Betriebs Infrastruktur',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fokusLifestyle',
      title: 'Lifestyle',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Fokusfelder' }
    },
  },
})
