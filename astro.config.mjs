import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE = sajtens adress. BASE används bara när sajten testas på en underadress.
export default defineConfig({
  site: process.env.SITE || 'https://www.tractory.se',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // Gamla adresser som ska leda vidare
  redirects: { '/home': '/' },
});
