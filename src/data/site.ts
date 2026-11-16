/**
 * Site-wide facts. Values set to null are hidden.
 * Taken from the previous hypergrowth.fr (contact page, footer, legal notice).
 */
export const site = {
  name: 'HyperGrowth',
  url: 'https://www.hypergrowth.fr',
  email: 'contact@hypergrowth.fr' as string | null,
  /** Killian's HubSpot calendar: every « book a call » on the previous site led here. */
  booking: 'https://meetings-eu1.hubspot.com/kpalermo' as string | null,
  phone: null as string | null,
  address: '9 Rue de Condé, 33000 Bordeaux' as string | null,
  /** Rybbit, self-hosted audience measurement (same site id as the previous site). */
  tracking: { src: 'https://tracking.hypergrowth.fr/api/script.js?siteId=01be6295df26', siteId: '01be6295df26' },
  /**
   * Meta pixel (the id the previous site's scalability Typeform used). Loaded only after the visitor
   * accepts in the cookie banner, and only on the production hosts so previews never pollute it.
   * Events: PageView on every page, Contact on every click towards the booking calendar.
   */
  metaPixel: { id: '727688240272851', hosts: ['www.hypergrowth.fr', 'hypergrowth.fr'] },
  socials: [
    { label: 'LinkedIn', href: null as string | null },
    { label: 'Instagram', href: null as string | null },
  ],
};
