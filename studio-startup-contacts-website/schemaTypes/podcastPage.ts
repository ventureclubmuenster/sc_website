import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'podcastPage',
  title: 'Seite: Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      title: 'Featured Quote',
      type: 'text',
      rows: 3,
      description: 'Ein inspirierendes Zitat für den Highlight-Block',
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Zitat-Autor',
      type: 'string',
      description: 'Name der Person, von der das Zitat stammt',
    }),
    defineField({
      name: 'podcastEpisodes',
      title: 'Podcast Episoden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'guestName', title: 'Gast', type: 'string' }),
            defineField({ name: 'title', title: 'Titel der Episode', type: 'string' }),
            defineField({ name: 'description', title: 'Kurze Beschreibung', type: 'text', rows: 2 }),
            defineField({ name: 'youtubeId', title: 'YouTube Video ID', type: 'string', description: 'z.B. "dQw4w9WgXcQ" aus der YouTube-URL' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'guestName' },
          },
        },
      ],
    }),
    defineField({
      name: 'studioImage',
      title: 'Studio-Teaser Bild',
      type: 'image',
      options: { hotspot: true },
      description: 'Bild für die Studio-Teaser Sektion',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Podcast' }
    },
  },
})
