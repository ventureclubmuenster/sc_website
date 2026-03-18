import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'studierendePage',
  title: 'Seite: Für Studierende',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      description: 'Hintergrundbild für den Hero-Bereich (z.B. Messestand-Foto)',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'TALENTE AUFGEPASST',
      description: 'Große fette Überschrift im Hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'string',
      initialValue: 'Die Chance den Arbeitgeber von morgen zu finden',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight Text',
      type: 'string',
      initialValue: '30+ Startups und Unternehmen',
      description: 'Hervorgehobener Text (orange) unter dem Subtext',
    }),
    defineField({
      name: 'featureCards',
      title: 'Was dich erwartet – Karten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel (z.B. CO-CREATION)', type: 'string' }),
            defineField({ name: 'subheader', title: 'Subheader', type: 'string', description: 'Kurzer Untertitel unter dem Titel' }),
            defineField({ name: 'hoverText', title: 'Hover-Text', type: 'text', rows: 3 }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'bentoNetworking',
      title: 'Bento: Networking',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Kachel "Networking"',
    }),
    defineField({
      name: 'bentoTalks',
      title: 'Bento: Talks',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Kachel "Talks"',
    }),
    defineField({
      name: 'bentoStartups',
      title: 'Bento: Startups',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Kachel "Startups"',
    }),
    defineField({
      name: 'bentoKarriere',
      title: 'Bento: Karriere',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Kachel "Karriere"',
    }),
    defineField({
      name: 'bentoInnovation',
      title: 'Bento: Innovation',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Kachel "Innovation"',
    }),
    defineField({
      name: 'bentoAfterparty',
      title: 'Bento: Afterparty',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Kachel "Afterparty"',
    }),
    defineField({
      name: 'programCards',
      title: 'Unser Programm – Karten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel (z.B. WORKSHOPS)', type: 'string' }),
            defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Erfahre mehr' }),
            defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Für Studierende' }
    },
  },
})
