import type { APIRoute } from 'astro';

/** Same policy as the previous hypergrowth.fr: everything open, sitemap at /sitemap.xml. */
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
