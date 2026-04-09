// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

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
      token: env.SANITY_API_TOKEN,
    }),
    react(),
  ],
});