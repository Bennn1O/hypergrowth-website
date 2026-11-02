/**
 * French copy, source of truth for the dictionary shape.
 * Copy marked "provisoire" comes from the Figma template and must be validated by HG.
 */
export const fr = {
  meta: {
    title: 'HyperGrowth — Partenaire de croissance',
    description:
      'Stratégie, marque et acquisition : une seule équipe pour construire votre marque, générer des leads et faire croître votre chiffre d’affaires.',
  },
  a11y: {
    skipToContent: 'Aller au contenu',
    home: 'Accueil HyperGrowth',
    mainNav: 'Navigation principale',
    openMenu: 'Ouvrir le menu',
    languageSwitcher: 'Changer de langue',
    clients: 'Ils nous font confiance',
    backToTop: 'Revenir en haut',
  },
  nav: {
    services: 'Services',
    work: 'Réalisations',
    studio: 'Studio',
    method: 'Méthode',
    contact: 'Nous contacter',
  },
  hero: {
    titleLines: ['Un partenaire', 'pour la croissance'],
    socialProofBefore: 'Rejoignez 1 000+', // provisoire
    socialProofAfter: 'entreprises en croissance.',
    description:
      'Tout ce qu’il faut pour construire votre marque, générer des leads et augmenter votre chiffre d’affaires, avec une seule équipe experte.',
  },
  quickLinks: [
    { label: 'Ressources', title: 'Garder une longueur d’avance', href: '#services' },
    { label: 'L’équipe', title: 'Les personnes derrière votre croissance', href: '#studio' },
    { label: 'Nos services', title: 'Performance & branding', href: '#services' },
  ],
  proof: {
    label: 'Des entreprises de toutes tailles nous font confiance', // provisoire
  },
  statement: {
    lead: 'Les marques fortes se construisent avec une stratégie, pas seulement une esthétique. Chaque campagne est ',
    quiet: 'pensée pour capter l’attention, déclencher l’action et créer une croissance durable.',
    subLead: 'Un marketing orienté performance, de ',
    subLead2: 'la stratégie à l’exécution. ',
    subQuiet: 'Pour les marques en croissance.',
  },
  stats: {
    title: 'La confiance de centaines d’entreprises en croissance', // provisoire
    description:
      'Chaque campagne combine créativité, données et exécution pour obtenir des résultats mesurables sur chaque canal.',
    reachValue: '56M+', // provisoire
    reachLabel: 'Collaborations dans le monde',
    awardsValue: '10+', // provisoire
    awardsLabel: 'Récompenses',
    awardBadge: 'Partenaire croissance 2026',
    awardsDescription: 'Nous aidons les entreprises à grandir grâce à une stratégie créative et une performance prouvée.',
  },
  services: {
    eyebrow: 'Ce que nous faisons',
    title: 'Faisons un marketing qui produit de vrais résultats.',
    cta: 'Démarrer votre projet',
    intro:
      'Plus qu’une agence, un partenaire stratégique qui aide les entreprises à attirer la bonne audience, augmenter leurs conversions et construire une croissance durable.',
    chips: ['Stratégie & planification', 'Production créative', 'Marketing de performance', 'Optimisation SEO'],
    items: [
      {
        title: 'Direction de marque',
        description:
          'Poser des fondations solides : positionnement, messages et identité visuelle pour une marque qui se distingue et reste en mémoire.',
      },
      {
        title: 'Marketing de performance',
        description:
          'Lancer des campagnes pilotées par la donnée pour attirer une audience qualifiée, augmenter les conversions et maximiser le ROI.',
      },
      {
        title: 'Contenu créatif',
        description:
          'Créer des visuels et des contenus qui captent l’attention, renforcent la marque et incitent à l’action.',
      },
      {
        title: 'Analytics & optimisation',
        description:
          'Mesurer la performance, dégager des enseignements actionnables et optimiser chaque action marketing en continu.',
      },
    ],
  },
  work: {
    title: 'Réalisations',
  },
  footer: {
    mainMenu: 'Menu principal',
    contactUs: 'Contact',
    followUs: 'Suivez-nous',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    rights: 'Tous droits réservés',
  },
};

export type Dictionary = typeof fr;
