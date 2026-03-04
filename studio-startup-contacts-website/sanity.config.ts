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
            ...S.documentTypeListItems().filter(
              (item) => !['speaker2025', 'speaker2026', 'partner2025', 'partner2026', 'exhibitor2025', 'exhibitor2026', 'team', 'program'].includes(item.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
