import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'coCreationPage',
  title: 'Seite: Co-Creation',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'vision', title: 'Vision (Was ist Co-Creation?)', options: { collapsible: true, collapsed: true } },
    { name: 'paradigma', title: 'Paradigmenwechsel (NICHT vs. SONDERN)', options: { collapsible: true, collapsed: true } },
    { name: 'prinzipienGroup', title: 'Dreiklang (Zusammenarbeit · Lösung · Pitch)', options: { collapsible: true, collapsed: true } },
    { name: 'ablauf', title: 'Tagesablauf', options: { collapsible: true, collapsed: true } },
    { name: 'partner', title: 'Veranstalter (VCM × R-Factory)', options: { collapsible: true, collapsed: true } },
    { name: 'unternehmen', title: 'Beteiligte Unternehmen', options: { collapsible: true, collapsed: true } },
    { name: 'cta', title: 'Bewerbungs-CTA', options: { collapsible: true, collapsed: true } },
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
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      description: 'Letztes Wort wird automatisch in Gradient-Farbe dargestellt. Beispiel: "GEMEINSAM PROBLEME LÖSEN"',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight (optional)',
      description: 'Kleine Zeile in Gradient-Farbe unter dem Subtext. Beispiel: "VCM × R-Factory"',
      type: 'string',
      fieldset: 'hero',
    }),

    // ── Vision ──
    defineField({
      name: 'visionHeadline',
      title: 'Vision Headline',
      description: 'Beispiel: "AKTIV LÖSEN STATT PASSIV ZUHÖREN"',
      type: 'string',
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionGradientWord',
      title: 'Wort in Gradient-Farbe',
      description: 'Welches Wort aus der Headline soll in Gradient-Farbe? (case-insensitive)',
      type: 'string',
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionText',
      title: 'Vision Beschreibungstext',
      type: 'text',
      rows: 4,
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionImage',
      title: 'Vision Bild',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'vision',
    }),

    // ── Paradigmenwechsel ──
    defineField({
      name: 'paradigmaNicht',
      title: 'NICHT (Liste)',
      description: 'Liste von Punkten, die NICHT der Co-Creation entsprechen.',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'paradigma',
    }),
    defineField({
      name: 'paradigmaSondern',
      title: 'SONDERN (Liste)',
      description: 'Liste von Punkten, die Co-Creation ausmachen.',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'paradigma',
    }),

    // ── Dreiklang (Prinzipien) ──
    defineField({
      name: 'prinzipienBackgroundImage',
      title: 'Dreiklang Hintergrundbild',
      description: 'Bild, das großflächig hinter der Dreiklang-Sektion liegt (mit dunklem Overlay).',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'prinzipienGroup',
    }),
    defineField({
      name: 'prinzipien',
      title: 'Prinzipien (Zusammenarbeit · Lösung · Pitch)',
      description: 'Drei Karten mit Titel und Beschreibung.',
      type: 'array',
      fieldset: 'prinzipienGroup',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string', description: 'z.B. 🎓, ⚡, 🚀' }),
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'icon' },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // ── Tagesablauf ──
    defineField({
      name: 'ablaufStations',
      title: 'Stationen (Zeitplan)',
      description: 'Stationen des Tages mit Uhrzeit, Titel und optionaler Beschreibung.',
      type: 'array',
      fieldset: 'ablauf',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'time', title: 'Uhrzeit', type: 'string', description: 'z.B. "09:00"', validation: (r) => r.required() }),
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'time' },
          },
        },
      ],
    }),

    // ── Partner: VCM × R-Factory ──
    defineField({
      name: 'rFactoryLogo',
      title: 'R-Factory Logo',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'partner',
    }),
    defineField({
      name: 'vcmDescription',
      title: 'VCM Kurzbeschreibung',
      type: 'text',
      rows: 3,
      fieldset: 'partner',
    }),
    defineField({
      name: 'rFactoryDescription',
      title: 'R-Factory Kurzbeschreibung',
      type: 'text',
      rows: 3,
      fieldset: 'partner',
    }),

    // ── Beteiligte Unternehmen ──
    defineField({
      name: 'companies',
      title: 'Beteiligte Unternehmen',
      description: 'Lead-Unternehmen mit ihren Challenges. Bleibt leer, werden Platzhalter angezeigt.',
      type: 'array',
      fieldset: 'unternehmen',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Unternehmensname', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'whiteBackground', title: 'Weißer Hintergrund (für dunkle Logos)', type: 'boolean', initialValue: false }),
            defineField({ name: 'challenge', title: 'Challenge / Problemfeld', type: 'text', rows: 2, description: 'Optionale Kurzbeschreibung der Challenge.' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'challenge', media: 'logo' },
          },
        },
      ],
    }),

    // ── CTA ──
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      description: 'Beispiel: "BEREIT MITZUMACHEN?"',
      type: 'string',
      fieldset: 'cta',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Beschreibungstext',
      type: 'text',
      rows: 3,
      fieldset: 'cta',
    }),
    defineField({
      name: 'bewerbungsUrl',
      title: 'Bewerbungs-URL',
      description: 'URL zum Bewerbungsformular (z.B. Tally / Google Forms). Default: https://tally.so/r/PLACEHOLDER',
      type: 'url',
      fieldset: 'cta',
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA Hintergrundbild',
      description: 'Bild, das großflächig hinter der Bewerbungs-Sektion liegt (mit dunklem Overlay).',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'cta',
    }),
    defineField({
      name: 'ctaSideImages',
      title: 'CTA Seiten-Bilder (max. 4)',
      description:
        'Kreative kleine Bilder, die als schwebende Polaroids um die Bewerbungs-Sektion arrangiert werden. 0–4 Bilder. Bei mehr als 4 werden nur die ersten 4 verwendet.',
      type: 'array',
      fieldset: 'cta',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: 'caption', title: 'Bildunterschrift (optional)', type: 'string' }),
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Co-Creation' }
    },
  },
})
