import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'unternehmenPage',
  title: 'Seite: Für Unternehmen',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'bento', title: 'Benefits Bento Grid' },
    { name: 'formate', title: 'Formate Bento Grid' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // Bento Grid
    defineField({
      name: 'bentoStartupSzene',
      title: 'Bento: Zugang zur Startup Szene',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoVipAccess',
      title: 'Bento: VIP-Access',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoFoodDrinks',
      title: 'Bento: Food & Drinks',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoExperience',
      title: 'Bento: Experience',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoAfterwork',
      title: 'Bento: Afterwork',
      type: 'image',
      options: { hotspot: true },
      group: 'bento',
    }),
    defineField({
      name: 'bentoInnovationVillage',
      title: 'Bento: Innovation Village',
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
      return { title: 'Für Unternehmen' }
    },
  },
})
