import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'coCreationAnmeldung',
  title: 'Co-Creation Anmeldung',
  type: 'document',
  fields: [
    defineField({
      name: 'vollerName',
      title: 'Vor- und Nachname',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .email()
          .max(254),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Student', value: 'Student' },
          { title: 'Young Professional', value: 'Young Professional' },
          { title: 'Sonstiges', value: 'Sonstiges' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statusSonstiges',
      title: 'Status (Sonstiges, Freitext)',
      type: 'string',
      hidden: ({ parent }) => parent?.status !== 'Sonstiges',
    }),
    defineField({
      name: 'institution',
      title: 'Hochschule / Arbeitgeber',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'rolle',
      title: 'Studiengang / Jobtitel',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'semester',
      title: 'Semester (optional)',
      type: 'string',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'skills',
      title: 'Was bringst du mit?',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Business / Strategie', value: 'Business / Strategie' },
          { title: 'Tech / IT', value: 'Tech / IT' },
          { title: 'Design / Kreativ', value: 'Design / Kreativ' },
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Marketing / Kommunikation', value: 'Marketing / Kommunikation' },
          { title: 'Sonstiges', value: 'Sonstiges' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'skillsSonstiges',
      title: 'Skills (Sonstiges, Freitext)',
      type: 'string',
      hidden: ({ parent }) => !parent?.skills?.includes('Sonstiges'),
    }),
    defineField({
      name: 'motivation',
      title: 'Warum möchtest du teilnehmen?',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(2000),
    }),
    defineField({
      name: 'verfuegbarkeit',
      title: 'Verfügbarkeit am 15.06.2026 (09:00–17:00)',
      type: 'string',
      options: {
        list: [
          { title: 'Ja', value: 'Ja' },
          { title: 'Nein', value: 'Nein' },
          { title: 'Unsicher', value: 'Unsicher' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'essensPraeferenz',
      title: 'Essenspräferenz',
      type: 'string',
      options: {
        list: [
          { title: 'Mit Fleisch', value: 'Mit Fleisch' },
          { title: 'Vegetarisch', value: 'Vegetarisch' },
          { title: 'Vegan', value: 'Vegan' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eingegangenAm',
      title: 'Eingegangen am',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'vollerName',
      email: 'email',
      status: 'status',
      eingegangenAm: 'eingegangenAm',
    },
    prepare({ title, email, status, eingegangenAm }) {
      const date = eingegangenAm
        ? new Date(eingegangenAm).toLocaleDateString('de-DE')
        : ''
      return {
        title: title || '(ohne Namen)',
        subtitle: [email, status, date].filter(Boolean).join(' · '),
      }
    },
  },
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'eingegangenAmDesc',
      by: [{ field: 'eingegangenAm', direction: 'desc' }],
    },
  ],
})
