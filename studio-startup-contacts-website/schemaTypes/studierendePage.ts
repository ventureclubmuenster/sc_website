import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'studierendePage',
  title: 'Seite: Talente (Für Studierende)',
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
      name: 'bentoItems',
      title: 'Mehr als eine Messe – Bento Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titel (z.B. NETWORKING)', type: 'string' }),
            defineField({ name: 'buttonText', title: 'Button Text', type: 'string', description: 'Optional – z.B. "Erfahre mehr". Leer lassen = kein Button' }),
            defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', description: 'Optional – z.B. /co-creation' }),
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
      validation: (Rule) => Rule.max(7),
      description: 'Bis zu 7 Kacheln mit Titel und Bild',
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

    // ---- Einmalige Kombination ----
    defineField({ name: 'kombiHeadingWhite', title: 'Kombination: Überschrift (weiß)', type: 'string', initialValue: 'EINE EINMALIGE' }),
    defineField({ name: 'kombiHeadingOrange', title: 'Kombination: Überschrift (orange)', type: 'string', initialValue: 'KOMBINATION' }),
    defineField({ name: 'kombiIntro', title: 'Kombination: Einleitungstext', type: 'text', rows: 2, initialValue: 'Startup Contacts bringt zusammen, was zusammen gehört, an einem einzigen Tag, unter einem Dach.' }),
    defineField({
      name: 'kombiCards',
      title: 'Kombination: Karten',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titel', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Untertitel', type: 'string' }),
          defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle' } },
      }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({ name: 'kombiTaglineParts', title: 'Kombination: Tagline-Teile (mit × verbunden)', type: 'array', of: [{ type: 'string' }], description: 'z.B. "Startups", "Unternehmen", "Dein Talent"' }),
    defineField({ name: 'kombiTaglineResult', title: 'Kombination: Tagline Ergebniszeile', type: 'string', initialValue: '= dein Sprungbrett in die Karriere von morgen' }),

    // ---- Abschnitts-Überschriften ----
    defineField({ name: 'bentoHeadingWhite', title: '"Mehr als eine Messe": Überschrift (weiß)', type: 'string', initialValue: 'MEHR ALS EINE' }),
    defineField({ name: 'bentoHeadingOrange', title: '"Mehr als eine Messe": Überschrift (orange)', type: 'string', initialValue: 'MESSE' }),
    defineField({ name: 'exhibitorHeadingWhite1', title: 'Aussteller-Überschrift (Teil 1, weiß)', type: 'string', initialValue: 'WER' }),
    defineField({ name: 'exhibitorHeadingOrange', title: 'Aussteller-Überschrift (orange)', type: 'string', initialValue: 'DABEI' }),
    defineField({ name: 'exhibitorHeadingWhite2', title: 'Aussteller-Überschrift (Teil 3, weiß)', type: 'string', initialValue: 'IST' }),
    defineField({ name: 'alleAusstellerText', title: '"Alle Aussteller" Button-Text', type: 'string', initialValue: 'Alle Aussteller' }),
    defineField({ name: 'alleAusstellerLink', title: '"Alle Aussteller" Button-Link', type: 'string', initialValue: '/innovation-village#aussteller-2026' }),
    defineField({ name: 'ticketCtaText', title: 'Ticket-CTA Text (unten)', type: 'string', initialValue: 'Als Talent Ticket sichern' }),

    // ---- Perks / Benefits (Texte) ----
    defineField({ name: 'perksLabel', title: 'Perks: Label', type: 'string', initialValue: 'Deine Perks' }),
    defineField({ name: 'perkDrinks', title: 'Perks: Free Drinks', type: 'string', initialValue: 'Free Drinks' }),
    defineField({ name: 'perkLunch', title: 'Perks: Mittagessen', type: 'string', initialValue: 'Mittagessen dabei' }),
    defineField({ name: 'perkStartupSzeneTitle', title: 'Perks: Startup Szene Titel', type: 'string', initialValue: 'Startup Szene Münster' }),
    defineField({ name: 'perkStartupSzeneSub', title: 'Perks: Startup Szene Untertitel', type: 'string', initialValue: '30+ Aussteller vor Ort' }),
    defineField({ name: 'perkSpeakerTitle', title: 'Perks: Top Speaker Titel', type: 'string', initialValue: 'Top Speaker' }),
    defineField({ name: 'perkSpeakerSub', title: 'Perks: Top Speaker Untertitel', type: 'string', initialValue: 'und viele mehr' }),
    defineField({ name: 'perkAfterparty', title: 'Perks: Afterparty', type: 'string', initialValue: 'Afterparty' }),
    defineField({ name: 'perkWorkshopsTitle', title: 'Perks: Workshops Titel', type: 'string', initialValue: 'Workshops' }),
    defineField({ name: 'perkWorkshopsSub', title: 'Perks: Workshops Untertitel', type: 'string', initialValue: 'Hands-on Sessions' }),
    defineField({ name: 'perksCtaText', title: 'Perks: CTA Text', type: 'string', initialValue: 'Jetzt Ticket sichern' }),
    defineField({ name: 'perkStartupSzeneImage', title: 'Perks: Startup-Szene Hintergrundbild', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'perkWorkshopsImage', title: 'Perks: Workshops Hintergrundbild', type: 'image', options: { hotspot: true } }),

    // ---- Wer dabei ist: Logos manuell hochladen ----
    defineField({
      name: 'exhibitorLogos',
      title: 'Wer dabei ist – Logos (manuell)',
      type: 'array',
      description: 'Lade hier die Logos für die Sektion "Wer dabei ist" hoch. Wenn mindestens ein Logo vorhanden ist, wird diese Liste angezeigt – sonst die Standard-Logos.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'whiteBackground', title: 'Weiße Kachel (für dunkle/bunte Logos)', type: 'boolean', initialValue: false }),
          defineField({ name: 'url', title: 'Link (optional)', type: 'url' }),
        ],
        preview: { select: { title: 'name', media: 'logo' } },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Talente (Für Studierende)' }
    },
  },
})
