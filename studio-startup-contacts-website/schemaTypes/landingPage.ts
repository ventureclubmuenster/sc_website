import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Startseite',
  type: 'document',
  fields: [
    defineField({
      name: 'whyUs',
      title: 'Warum Startup Contacts Sektion',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titel', type: 'string' }, // z.B. "Inspiration"
            { 
              name: 'bgImage', 
              title: 'Hintergrundbild', 
              type: 'image', 
              options: { hotspot: true } // Wichtig für den Fokus auf Gesichter
            },
          ],
        },
      ],
    }),
  ],
})