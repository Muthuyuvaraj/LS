import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cartospatialtechnologies.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', ta: 'ta-IN' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
