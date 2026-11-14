// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Same canonical host as the previous hypergrowth.fr (www), so indexed URLs keep their signals.
  site: 'https://www.hypergrowth.fr',
  // URLs without a trailing slash, like the previous site: /mentions-legales, /en.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // One small stylesheet: inline it so the first paint does not wait on a CSS request.
    inlineStylesheets: 'always',
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
