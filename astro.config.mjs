import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeBas from './src/lib/rehype-bas.mjs';
import rehypeBilder from './src/lib/rehype-bilder.mjs';

// SITE = sajtens adress. BASE används bara när sajten testas på en underadress.
export default defineConfig({
  site: process.env.SITE || 'https://www.tractory.se',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
  // Lägg alltid CSS i egna filer, aldrig direkt i sidan. Krävs av säkerhetsregeln i Bas.astro.
  build: { inlineStylesheets: 'never' },
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeBas, rehypeBilder] },
  // Gamla adresser som ska leda vidare
  redirects: { '/home': '/' },
});
