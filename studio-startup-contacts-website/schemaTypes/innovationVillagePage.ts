import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'innovationVillagePage',
  title: 'Seite: Innovation Village',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Bild',
      type: 'image',
      options: { hotspot: true },
      description: 'Hintergrundbild für den Hero-Bereich',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Untertitel',
      type: 'string',
      initialValue: 'Wer war zuletzt dabei? Schau dir unsere Aussteller an – oder werde selbst Teil des Innovation Village!',
    }),
    defineField({
      name: 'ausstellerImage',
      title: 'Bild – Für Aussteller',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ausstellerText1',
      title: 'Text 1 – Für Aussteller',
      type: 'text',
      rows: 4,
      initialValue: 'Im Innovation Village triffst du auf genau die Menschen, die deine Projekte voranbringen können.\nVon neugierigen Studierenden bis hin zu Young Professionals mit ersten Erfahrungen – auf unsere Messe stehen besonders junge Talente im Vordergrund. Zeige woran du arbeitest und komme direkt mit potenziellen Kunden, Bewerbern oder Partnern ins Gespräch.',
    }),
    defineField({
      name: 'ausstellerText2',
      title: 'Text 2 – Für Aussteller',
      type: 'text',
      rows: 4,
      initialValue: 'Neben Sichtbarkeit für dein Produkt oder deine Marke bietet das Village vor allem eins: Echten Austausch auf Augenhöhe. Wer dabei sein möchte, sichert sich nicht nur einen Platz mitten im Geschehen sondern auch Zugang zu den Talenten von morgen.',
    }),
    defineField({
      name: 'ausstellerCta',
      title: 'CTA Text – Für Aussteller',
      type: 'string',
      initialValue: 'Du möchtest als Aussteller dabei sein? Wir freuen uns über deine Nachricht!',
    }),
    defineField({
      name: 'besucherImage',
      title: 'Bild – Für Besucher',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'besucherText1',
      title: 'Text 1 – Für Besucher',
      type: 'text',
      rows: 4,
      initialValue: 'Im Innovation Village warten über 30 Aussteller darauf, dich an ihren Ständen zu begrüßen. Ob du einfach neugierig bist, spannende Gespräche suchst oder auf Jobsuche bist. Hier bist du genau richtig.\nIn persönlicher Atmosphäre lernst du innovative Lösungen, neue Ansätze und Menschen kennen, die mit Leidenschaft dabei sin. Lass dich inspirieren – direkt, nahbar und auf Augenhöhe.',
    }),
    defineField({
      name: 'besucherText2',
      title: 'Text 2 – Für Besucher',
      type: 'text',
      rows: 4,
      initialValue: 'Neben kleinen Goodies erwarten dich inspirierenden Gespräche und viele spannende Leute. Ob Startup oder etabliertes, innovatives Unternehmen: Das Innovation Village ist der perfekte Ort, um dich auszutauschen und Kontakte zu knüpfen. Vielleicht sogar für dein nächstes Projekt.',
    }),
    defineField({
      name: 'besucherCta',
      title: 'CTA Text – Für Besucher',
      type: 'string',
      initialValue: 'Klingt spannend? Melde dich jetzt für unseren Newsletter an, um nichts mehr zu verpassen!',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Innovation Village' }
    },
  },
})
