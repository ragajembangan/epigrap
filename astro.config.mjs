// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// Fallback: Cloudflare injects secrets into process.env at build time
const sanityToken = env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!sanityToken) {
  console.warn('⚠️  SANITY_API_TOKEN tidak ditemukan! Portal SSR tidak akan bisa fetch data.');
}

// https://astro.build/config
export default defineConfig({
  site: 'https://epigrap.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    sitemap(),
    sanity({
      projectId: '5g1ky8nn',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
      token: sanityToken,
    }),
    react(),
  ],
});