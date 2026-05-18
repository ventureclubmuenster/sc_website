import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'coCreationPage',
  title: 'Seite: Co-Creation',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'CO-CREATION CHALLENGE (Hero)', options: { collapsible: true, collapsed: false } },
    { name: 'wasIstChallenge', title: 'EIN SPRINT FÜR ECHTE AUFGABEN AUS DEM MITTELSTAND', options: { collapsible: true, collapsed: true } },
    { name: 'warumTeilnehmen', title: 'PRAKTISCHE INNOVATIONSERFAHRUNG MIT DIREKTEM UNTERNEHMENSZUGANG', options: { collapsible: true, collapsed: true } },
    { name: 'ablauf', title: 'EIN TAG, KLARE ARBEITSPHASEN', options: { collapsible: true, collapsed: true } },
    { name: 'hybrideLoesungen', title: 'HYBRIDE LÖSUNGEN FÜR REALE SYSTEME', options: { collapsible: true, collapsed: true } },
    { name: 'unternehmen', title: 'BETEILIGTE UNTERNEHMEN & INNOVATIONSFELDER', options: { collapsible: true, collapsed: true } },
    { name: 'partner', title: 'GEMEINSAM MIT R-FACTORY (Veranstalter)', options: { collapsible: true, collapsed: true } },
    { name: 'cta', title: 'BEREIT MITZUMACHEN? (Bewerbungs-CTA)', options: { collapsible: true, collapsed: true } },
    { name: 'vision', title: 'Vision (deprecated)', options: { collapsible: true, collapsed: true } },
    { name: 'paradigma', title: 'Paradigmenwechsel (deprecated)', options: { collapsible: true, collapsed: true } },
    { name: 'prinzipienGroup', title: 'Dreiklang (deprecated)', options: { collapsible: true, collapsed: true } },
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
      name: 'heroEyebrow',
      title: 'Hero Eyebrow (kleine Zeile oben)',
      description: 'Wird in Gradient-Farbe oberhalb der Headline angezeigt. Beispiel: "VCM × R-Factory · Startup Contacts · Halle Münsterland"',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      description: 'Beispiel: "CO-CREATION CHALLENGE"',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Hero Subline (kurze Zeile unter Headline)',
      description: 'Beispiel: "Reale Mittelstandsprobleme gemeinsam lösen"',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body (Fließtext)',
      description: 'Beschreibungstext direkt unter der Subline.',
      type: 'text',
      rows: 4,
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroNote',
      title: 'Hero Note (Hinweistext unter dem CTA-Button)',
      description: 'Kleiner, dezenter Hinweistext unter dem Bewerbungs-Button. Beispiel: "Die Bewerbung ist niedrigschwellig. … Das Startup Contacts Ticket inkl. Verpflegung ist mit inbegriffen."',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext (deprecated)',
      description: '⚠️ Wird aktuell nicht angezeigt. Wurde durch "Hero Body" + "Hero Note" ersetzt. Behalten für späteren Reuse.',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight (deprecated)',
      description: '⚠️ Wird aktuell nicht angezeigt. Wurde durch "Hero Eyebrow" ersetzt. Behalten für späteren Reuse.',
      type: 'string',
      fieldset: 'hero',
    }),

    // ── Was ist die Challenge ──
    defineField({
      name: 'wasIstChallengeEyebrow',
      title: 'Eyebrow (kleine Zeile)',
      description: 'Beispiel: "Was ist die Challenge?"',
      type: 'string',
      fieldset: 'wasIstChallenge',
    }),
    defineField({
      name: 'wasIstChallengeHeadline',
      title: 'Headline',
      description: 'Beispiel: "EIN SPRINT FÜR ECHTE AUFGABEN AUS DEM MITTELSTAND". Letztes Wort wird in Gradient-Farbe dargestellt.',
      type: 'string',
      fieldset: 'wasIstChallenge',
    }),
    defineField({
      name: 'wasIstChallengeIntro',
      title: 'Intro-Text',
      type: 'text',
      rows: 4,
      fieldset: 'wasIstChallenge',
    }),
    defineField({
      name: 'wasIstChallengeKarten',
      title: 'Karten (max. 3)',
      description: 'Drei nummerierte Karten mit Titel und Beschreibung. Optional kann pro Karte ein Bild ergänzt werden.',
      type: 'array',
      fieldset: 'wasIstChallenge',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Nummer', type: 'string', description: 'z.B. "01"' }),
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Bild (optional)', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // ── Warum teilnehmen ──
    defineField({
      name: 'warumTeilnehmenEyebrow',
      title: 'Eyebrow (kleine Zeile)',
      description: 'Beispiel: "Warum teilnehmen?"',
      type: 'string',
      fieldset: 'warumTeilnehmen',
    }),
    defineField({
      name: 'warumTeilnehmenHeadline',
      title: 'Headline',
      description: 'Beispiel: "PRAKTISCHE INNOVATIONSERFAHRUNG MIT DIREKTEM UNTERNEHMENSZUGANG". Letztes Wort wird in Gradient-Farbe dargestellt.',
      type: 'string',
      fieldset: 'warumTeilnehmen',
    }),
    defineField({
      name: 'warumTeilnehmenIntro',
      title: 'Intro-Text',
      type: 'text',
      rows: 4,
      fieldset: 'warumTeilnehmen',
    }),
    defineField({
      name: 'warumTeilnehmenBackgroundImage',
      title: 'Warum teilnehmen — Hintergrundbild',
      description: 'Vollflächiges Hintergrundbild hinter der Section (mit dunklem Overlay, ca. 30 % Sichtbarkeit).',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'warumTeilnehmen',
    }),
    defineField({
      name: 'warumTeilnehmenKarten',
      title: 'Karten (max. 4)',
      description: 'Vier Karten mit Titel und Beschreibung. Optional kann pro Karte ein Bild ergänzt werden.',
      type: 'array',
      fieldset: 'warumTeilnehmen',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Bild (optional)', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ── Vision (deprecated) ──
    defineField({
      name: 'visionHeadline',
      title: 'Vision Headline (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'string',
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionGradientWord',
      title: 'Wort in Gradient-Farbe (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'string',
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionText',
      title: 'Vision Beschreibungstext (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'text',
      rows: 4,
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionImage',
      title: 'Vision Bild (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'vision',
    }),

    // ── Paradigmenwechsel (deprecated) ──
    defineField({
      name: 'paradigmaNicht',
      title: 'NICHT (Liste) (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'paradigma',
    }),
    defineField({
      name: 'paradigmaSondern',
      title: 'SONDERN (Liste) (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'paradigma',
    }),

    // ── Dreiklang (Prinzipien) (deprecated) ──
    defineField({
      name: 'prinzipienBackgroundImage',
      title: 'Dreiklang Hintergrundbild (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'prinzipienGroup',
    }),
    defineField({
      name: 'prinzipien',
      title: 'Prinzipien (Zusammenarbeit · Lösung · Pitch) (deprecated)',
      description: '⚠️ Aktuell nicht angezeigt — behalten für späteren Reuse.',
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

    // ── Hybride Lösungen für reale Systeme ──
    defineField({
      name: 'hybrideLoesungenEyebrow',
      title: 'Eyebrow (kleine Zeile oben)',
      description: 'Beispiel: "Innovationsfokus"',
      type: 'string',
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenHeadline',
      title: 'Headline',
      description: 'Wörter in *Sternchen* werden im VCM-Gradient dargestellt. Standard: "HYBRIDE LÖSUNGEN FÜR *REALE SYSTEME*"',
      type: 'string',
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenIntro',
      title: 'Intro-Text',
      type: 'text',
      rows: 4,
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenImage',
      title: 'Hauptbild (großes Bild links)',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenImageTitle',
      title: 'Bild-Overlay — Titel',
      description: 'Fettgesetzte Zeile direkt über dem Body-Text im Bild-Overlay.',
      type: 'string',
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenImageSubtitle',
      title: 'Bild-Overlay — Subtitle (optional)',
      description: 'Optionaler kurzer Satz zwischen Titel und Body.',
      type: 'string',
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenImageBody',
      title: 'Bild-Overlay — Beschreibung',
      type: 'text',
      rows: 3,
      fieldset: 'hybrideLoesungen',
    }),
    defineField({
      name: 'hybrideLoesungenKarten',
      title: 'Karten (genau 4 empfohlen)',
      description: 'Stichwort-Karten rechts neben dem Hauptbild.',
      type: 'array',
      fieldset: 'hybrideLoesungen',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
      validation: (Rule) => Rule.max(4),
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
      description: 'Zeilenumbrüche aus diesem Feld werden auf der Website übernommen.',
      type: 'text',
      rows: 6,
      fieldset: 'partner',
    }),

    // ── Beteiligte Unternehmen ──
    defineField({
      name: 'unternehmenEyebrow',
      title: 'Eyebrow (kleine Zeile)',
      description: 'Beispiel: "Unternehmen & Aufgaben"',
      type: 'string',
      fieldset: 'unternehmen',
    }),
    defineField({
      name: 'unternehmenHeadline',
      title: 'Headline',
      description: 'Beispiel: "UNTERNEHMEN UND AUFGABEN FOLGEN". Letztes Wort wird in Gradient-Farbe dargestellt.',
      type: 'string',
      fieldset: 'unternehmen',
    }),
    defineField({
      name: 'unternehmenIntro',
      title: 'Intro-Text',
      type: 'text',
      rows: 3,
      fieldset: 'unternehmen',
    }),
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
