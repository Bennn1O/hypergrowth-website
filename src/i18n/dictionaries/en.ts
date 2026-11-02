import type { Dictionary } from './fr';

/** English copy. Typed against the French dictionary: a missing key fails the build. */
export const en: Dictionary = {
  meta: {
    title: 'HyperGrowth — Growth partner',
    description:
      'Strategy, brand and acquisition: one team to build your brand, generate leads and grow your revenue.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    home: 'HyperGrowth home',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    languageSwitcher: 'Change language',
    clients: 'Trusted by',
    backToTop: 'Back to top',
  },
  nav: {
    services: 'Services',
    work: 'Work',
    studio: 'Studio',
    method: 'Method',
    contact: 'Contact us',
  },
  hero: {
    titleLines: ['One partner', 'for growth'],
    socialProofBefore: 'Join 1,000+',
    socialProofAfter: 'growing businesses.',
    description:
      'Everything you need to build your brand, generate leads and increase revenue, all from one expert marketing team.',
  },
  quickLinks: [
    { label: 'Resources', title: 'Stay ahead of digital trends', href: '#services' },
    { label: 'The team', title: 'The people behind your growth', href: '#studio' },
    { label: 'Our services', title: 'Performance & branding', href: '#services' },
  ],
  proof: {
    label: 'Trusted by companies of every size',
  },
  statement: {
    lead: 'We believe the strongest brands are built through strategy, not just aesthetics. Every campaign is ',
    quiet: 'designed to capture attention, inspire action, and create lasting business growth.',
    subLead: 'Performance-driven marketing, from ',
    subLead2: 'strategy to execution. ',
    subQuiet: 'Built for growing brands.',
  },
  stats: {
    title: 'Trusted by hundreds of growing businesses',
    description:
      'Every campaign is powered by creativity, data, and execution, helping brands achieve measurable success across every channel.',
    reachValue: '56M+',
    reachLabel: 'Global collaborations',
    awardsValue: '10+',
    awardsLabel: 'Industry awards',
    awardBadge: 'Best growth partner 2026',
    awardsDescription: 'Helping businesses grow through creative strategy and proven performance.',
  },
  services: {
    eyebrow: 'What we do',
    title: 'Let’s create marketing that delivers real results.',
    cta: 'Start your project',
    intro:
      'More than an agency, we’re a strategic partner dedicated to helping businesses attract the right audience, increase conversions, and achieve long-term growth.',
    chips: ['Strategy & planning', 'Creative production', 'Performance marketing', 'SEO optimization'],
    items: [
      {
        title: 'Brand direction',
        description:
          'Build a strong foundation with clear positioning, messaging, and visual identity that helps your brand stand out and stay memorable.',
      },
      {
        title: 'Performance marketing',
        description:
          'Launch data-driven campaigns that attract qualified audiences, increase conversions, and maximize your marketing ROI.',
      },
      {
        title: 'Creative content',
        description:
          'Create engaging visuals and compelling content that capture attention, strengthen your brand, and inspire action.',
      },
      {
        title: 'Analytics & optimization',
        description:
          'Measure campaign performance, uncover actionable insights, and continuously optimize every marketing effort for better results.',
      },
    ],
  },
  work: {
    title: 'Work',
  },
  footer: {
    mainMenu: 'Main menu',
    contactUs: 'Contact',
    followUs: 'Follow us',
    legal: 'Legal notice',
    privacy: 'Privacy',
    rights: 'All rights reserved',
  },
};
