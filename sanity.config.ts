import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure, defaultDocumentNode } from './sanity/structure'

export default defineConfig({
  name: 'epigrap-studio',
  title: 'Epigrap — Superadmin',

  projectId: '5g1ky8nn',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, context) => {
      // Mendapatkan origin URL saat ini (bisa localhost atau domain production)
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

      if (context.document._type === 'homepage') {
        return `${baseUrl}/`
      }
      
      if (context.document._type === 'artifact') {
        const slug = (context.document.slugQR as any)?.current
        if (slug) {
          return `${baseUrl}/portal/${slug}`
        }
      }

      return prev
    },
  },
})
