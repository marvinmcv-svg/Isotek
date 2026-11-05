'use client';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'isotek',
  title: 'ISOTEK LATAM — Administración',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Contenido').items([
          S.listItem().title('Ajustes del sitio').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          S.divider(),
          ...S.documentTypeListItems().filter((i) => i.getId() !== 'siteSettings'),
        ]),
    }),
    visionTool(),
  ],
});
