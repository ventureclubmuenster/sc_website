import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'unternehmenPage',
  title: 'Seite: Für Unternehmen',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'bento', title: 'Benefits Bento Grid' },
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
  ],
  preview: {
    prepare() {
      return { title: 'Für Unternehmen' }
    },
  },
})
