import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Startup Contacts Website',

  projectId: '7zy866a4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Inhalt')
          .items([
            orderableDocumentListDeskItem({type: 'speaker2025', title: 'Speaker 2025', S, context}),
            orderableDocumentListDeskItem({type: 'speaker2026', title: 'Speaker 2026', S, context}),
            orderableDocumentListDeskItem({type: 'partner2025', title: 'Partner & Sponsoren 2025', S, context}),
            orderableDocumentListDeskItem({type: 'partner2026', title: 'Partner & Sponsoren 2026', S, context}),
            orderableDocumentListDeskItem({type: 'exhibitor2025', title: 'Aussteller 2025', S, context}),
            orderableDocumentListDeskItem({type: 'exhibitor2026', title: 'Aussteller 2026', S, context}),
            orderableDocumentListDeskItem({type: 'team', title: 'Vorstand & Team', S, context}),
            orderableDocumentListDeskItem({type: 'program', title: 'Programm & Events', S, context}),
            // Singleton pages
            S.listItem()
              .title('Seiteneinstellungen')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Startseite')
              .id('landingPage')
              .child(S.document().schemaType('landingPage').documentId('landingPage')),
            S.listItem()
              .title('Ad Landing Page (SC26)')
              .id('adLandingPage')
              .child(S.document().schemaType('adLandingPage').documentId('adLandingPage')),
            S.listItem()
              .title('Advisory Board')
              .id('advisoryBoard')
              .child(S.document().schemaType('advisoryBoard').documentId('advisoryBoard')),
            S.listItem()
              .title('Seite: Talente (Für Studierende)')
              .id('studierendePage')
              .child(S.document().schemaType('studierendePage').documentId('studierendePage')),
            S.listItem()
              .title('Seite: Innovation Village')
              .id('innovationVillagePage')
              .child(S.document().schemaType('innovationVillagePage').documentId('innovationVillagePage')),
            S.listItem()
              .title('Seite: Für Unternehmen')
              .id('unternehmenPage')
              .child(S.document().schemaType('unternehmenPage').documentId('unternehmenPage')),
            S.listItem()
              .title('Seite: Für Startups')
              .id('startupsPage')
              .child(S.document().schemaType('startupsPage').documentId('startupsPage')),
            S.listItem()
              .title('Seite: Investoren')
              .id('investorenPage')
              .child(S.document().schemaType('investorenPage').documentId('investorenPage')),
            S.listItem()
              .title('Logo-Slider (Startseite & Tickets)')
              .id('logoSlider')
              .child(S.document().schemaType('logoSlider').documentId('logoSlider')),
            S.listItem()
              .title('Fokusfelder (Bilder)')
              .id('fokusfelder')
              .child(S.document().schemaType('fokusfelder').documentId('fokusfelder')),
            S.listItem()
              .title('Formate Bento Grid')
              .id('formateGrid')
              .child(S.document().schemaType('formateGrid').documentId('formateGrid')),
            S.listItem()
              .title('Seite: Workshops')
              .id('workshopsPage')
              .child(S.document().schemaType('workshopsPage').documentId('workshopsPage')),
            S.listItem()
              .title('Seite: Main Stage')
              .id('mainStagePage')
              .child(S.document().schemaType('mainStagePage').documentId('mainStagePage')),
            S.listItem()
              .title('Seite: Programm (Übersicht)')
              .id('programmPage')
              .child(S.document().schemaType('programmPage').documentId('programmPage')),
            S.listItem()
              .title('Seite: Über uns')
              .id('ueberUnsPage')
              .child(S.document().schemaType('ueberUnsPage').documentId('ueberUnsPage')),
            // Remaining types (SEO etc.)
            ...S.documentTypeListItems().filter(
              (item) => !['speaker2025', 'speaker2026', 'partner2025', 'partner2026', 'exhibitor2025', 'exhibitor2026', 'team', 'program', 'siteSettings', 'landingPage', 'adLandingPage', 'advisoryBoard', 'studierendePage', 'innovationVillagePage', 'unternehmenPage', 'startupsPage', 'investorenPage', 'fokusfelder', 'workshopsPage', 'mainStagePage', 'programmPage', 'ueberUnsPage', 'formateGrid', 'logoSlider'].includes(item.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
