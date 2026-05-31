import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'logoSlider',
  title: 'Logo-Slider (Startseite & Tickets)',
  type: 'document',
  description:
    'Die Logos im laufenden Banner auf der Startseite (Hero) und auf der Ticketseite. ' +
    'Die Logos werden automatisch in Schwarz/Weiß (weiß auf schwarzem Grund) dargestellt und ' +
    'laufen endlos von rechts nach links. Reihenfolge per Drag & Drop änderbar.',
  fields: [
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'logo',
          title: 'Logo',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo-Bild',
              type: 'image',
              description:
                'Am besten ein PNG oder SVG mit transparentem Hintergrund. ' +
                'Die Farbe wird automatisch auf Weiß gesetzt – die Originalfarbe spielt also keine Rolle.',
              options: { hotspot: false },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name (für Alt-Text / SEO)',
              type: 'string',
            }),
            defineField({
              name: 'whiteBackground',
              title: 'Heller / weißer Hintergrund',
              type: 'boolean',
              description:
                'Wird normalerweise automatisch erkannt. Manuell aktivieren, wenn das Logo einen ' +
                'hellen Hintergrund hat und sonst als weißer Block erscheint – dann wird es auf einer ' +
                'weißen Fläche in Originalfarbe angezeigt, damit man es erkennt.',
              initialValue: false,
            }),
            defineField({
              name: 'scalePercent',
              title: 'Größe (%)',
              type: 'number',
              description:
                'Größe dieses Logos im Slider. Standard = 100. Kleiner z. B. 80, größer z. B. 120.',
              initialValue: 100,
              validation: (Rule) => Rule.min(30).max(200),
            }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Logo', media }
            },
          },
        },
      ],
      options: { layout: 'grid' },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Logo-Slider' }
    },
  },
})
