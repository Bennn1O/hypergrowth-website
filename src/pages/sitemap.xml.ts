import type { APIRoute } from 'astro';
import { localeLabels, localizePath, locales } from '../i18n';

/**
 * /sitemap.xml, the address Search Console already knows from the previous site.
 * Each page lists its FR and EN versions (hreflang), with FR as x-default.
 */
const PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/mentions-legales', changefreq: 'yearly', priority: '0.3' },
];

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = PAGES.flatMap((page) =>
    locales.map((locale) => {
      const links = locales
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${localeLabels[alt].htmlLang}" href="${abs(localizePath(page.path, alt))}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(localizePath(page.path, 'fr'))}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${abs(localizePath(page.path, locale))}</loc>\n${links}\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
