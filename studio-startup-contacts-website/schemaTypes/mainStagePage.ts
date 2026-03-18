import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mainStagePage',
  title: 'Seite: Main Stage',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Sektion', options: { collapsible: true, collapsed: false } },
    { name: 'flashback', title: 'Themen-Flashback (Letztes Jahr)', options: { collapsible: true, collapsed: true } },
    { name: 'hallOfFameSection', title: 'Hall of Fame', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroImage',
      title: 'Hero Hintergrundbild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
    }),

    // ── Themen-Flashback ──
    defineField({
      name: 'flashbackTitle',
      title: 'Flashback Überschrift',
      type: 'string',
      initialValue: 'DAS WAR DIE MAINSTAGE 2025',
      fieldset: 'flashback',
    }),
    defineField({
      name: 'flashbackTags',
      title: 'Themen-Tags',
      description: 'Themen aus dem letzten Jahr als Tags.',
      type: 'array',
      fieldset: 'flashback',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // ── Hall of Fame ──
    defineField({
      name: 'hallOfFame',
      title: 'Hall of Fame Speaker',
      description: 'Wähle Speaker für die Hall of Fame Sektion aus.',
      type: 'array',
      fieldset: 'hallOfFameSection',
      of: [
        {
          type: 'reference',
          to: [{ type: 'speaker2025' }, { type: 'speaker2026' }],
        },
      ],
      validation: (Rule) => Rule.max(6).unique(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Main Stage' }
    },
  },
})
