/**
 * French copy, source of truth for the dictionary shape.
 * Everything here comes from the HG brain (méthode OP-X, trame d'immersion, guide de l'OP).
 * Lines marked "à valider" need Killian's go before launch.
 */
export const fr = {
  meta: {
    title: 'HyperGrowth · Le bras droit opérationnel des dirigeants',
    description:
      'Quand une entreprise grossit plus vite que son organisation : 48 heures d’immersion avec le dirigeant, une feuille de route à dix jours, puis des opérationnels qui tiennent les chantiers jusqu’à ce qu’ils tournent sans eux.',
  },
  a11y: {
    skipToContent: 'Aller au contenu',
    home: 'Accueil HyperGrowth',
    mainNav: 'Les étapes de la relation',
    languageSwitcher: 'Changer de langue',
    clock: 'Moment de la relation',
    backToTop: 'Revenir en haut',
    photo: 'Emplacement photo',
  },
  timeline: {
    stages: [
      { id: 'avant', label: 'Avant' },
      { id: 'immersion', label: '48h' },
      { id: 'dix-jours', label: 'J+10' },
      { id: 'ensuite', label: 'Ensuite' },
    ],
    contact: 'Un café ?',
  },
  chapter: {
    prefix: 'Ce qu’il faut savoir',
  },
  opening: {
    clock: 'Avant · J-10',
    eyebrow: 'HyperGrowth · Méthode OP-X',
    title: ['Votre entreprise', 'grossit plus vite', 'que son'],
    accent: 'organisation.',
    lead: 'On le sait parce qu’on s’y installe. Quarante-huit heures avec vous, puis des opérationnels qui restent jusqu’à ce que ça tienne.',
    hint: 'Faites défiler, l’horloge tourne.',
  },
  before: {
    clock: 'J-10',
    chapter: 'avant',
    title: 'Si vous êtes ici, quelqu’un vous a sûrement parlé de',
    accent: 'nous.',
    card: [
      'Le plus souvent, tout commence comme ça : un café, un dîner, un dirigeant qui en parle à un autre.',
      'Ce qu’on fait ne tient pas dans une plaquette.',
      'Alors voici, dans l’ordre, ce qui se passe quand on travaille ensemble.',
    ],
    statement: 'Un consultant livre un rapport et repart.',
    statementAccent: 'Nous, on reste.',
    posture:
      'Ni agence, ni cabinet. Un bras droit opérationnel, qui pose le diagnostic avec vous puis avance comme s’il faisait partie de la maison.',
    whoLabel: 'Pour qui',
    who: 'Pas un secteur, un moment : celui où l’entreprise grossit plus vite que son organisation. Un nouveau pays, un rachat, une levée, ou simplement un fondateur par qui tout passe encore.',
    meetLabel: 'Où l’on se croise',
    meet: [
      { name: 'Café Croissance', text: 'Le matin, quelques dirigeants autour d’une table, ville par ville.' },
      { name: 'Cocktail Croissance', text: 'Le soir, un format plus resserré.' },
      { name: 'Dîner CEO', text: 'Cinq entrepreneurs au plus, une seule table.' },
      { name: 'Chez vous', text: 'Un café dans vos locaux. Le plus simple, souvent.' },
    ],
  },
  immersion: {
    chapter: 'pendant les 48 heures',
    title: 'Quarante-huit heures,',
    accent: 'sans téléphone.',
    intro:
      'Un jour et demi à deux jours, chez vous ou dans nos bureaux. On cherche les vrais problèmes de l’entreprise, on construit les pistes avec vous, et vous repartez avec un cap.',
    rulesLabel: 'Les règles',
    rules: [
      'Partenaires, pas prestataires.',
      'Aucun appel pendant l’immersion.',
      'Tout est enregistré.',
      'Un ordre de grandeur suffit.',
      'À l’heure prévue, on passe à la suite.',
      'Chaque décision est écrite.',
    ],
    phaseLabel: 'Phase',
    exitLabel: 'Avant de passer à la suite',
    phases: [
      {
        name: 'Défricher',
        day: 'J1',
        start: '09:30',
        end: '12:45',
        text: 'Vous parlez, beaucoup plus que nous. Votre entreprise, votre parcours, ce qui coince. Puis on resserre, question après question, jusqu’à ce que tout tourne autour du même sujet.',
        steps: ['Cadrage', 'Ouverture large', 'Entonnoir'],
        exit: 'Au déjeuner, on valide les deux ou trois sujets.',
      },
      {
        name: 'Scénariser',
        day: 'J1',
        start: '14:00',
        end: '18:00',
        text: 'On confronte le récit du matin aux chiffres et à l’organisation réelle. Puis on construit des scénarios, sans encore les figer.',
        steps: ['Les chiffres', 'L’organisation réelle', 'Les scénarios'],
        exit: 'À 17h45, on relit sujets et options.',
      },
      {
        name: 'Poser',
        day: 'J2',
        start: '09:00',
        end: '12:30',
        text: 'Vous avez dormi sur les scénarios. On reprend à froid, on met sur papier, on projette : quoi, dans quel ordre, à quelle échéance.',
        steps: ['Reprise à froid', 'Mise sur papier', 'Projection'],
        exit: 'Au déjeuner, on valide la frise à six mois.',
      },
      {
        name: 'Fermer',
        day: 'J2',
        start: '14:00',
        end: '15:30',
        text: 'Vous reformulez le cap, à voix haute. On cale les dates de la suite avant de partir.',
        steps: ['Le cap reformulé', 'La suite et les documents'],
        exit: 'Vous repartez avec une direction, pas avec un document.',
      },
    ],
    interludes: [
      {
        time: 'J1 · 12:45',
        label: 'Déjeuner',
        title: 'Le point de',
        accent: 'bascule.',
        text: 'À la fin du déjeuner, on sait sur quoi l’immersion va porter.',
      },
      {
        time: 'J1 · Dîner',
        label: 'Dîner',
        title: 'En session, on parle pro. À table, on parle',
        accent: 'vrai.',
        text: 'Le dîner fait partie de la méthode. La nuit qui suit laisse infuser.',
      },
    ],
    partitionTitle: 'Trois rôles, distribués',
    partitionAccent: 'la veille.',
    partition: [
      { name: 'Ouvrir les portes', text: 'Explorer, lancer des pistes, créer les ouvertures.' },
      { name: 'Fermer les portes', text: 'Trancher, cadrer, ramener au factuel.' },
      { name: 'Tenir les portes', text: 'Distribuer les sujets, faire le passeur, tenir l’horloge.' },
    ],
  },
  tenDays: {
    chapter: 'sur les dix jours qui suivent',
    title: 'Deux documents,',
    accent: 'pas un de plus.',
    documents: [
      {
        name: 'L’audit',
        text: 'Le constat central et les leviers, puis le détail, composante par composante. Seulement celles qui ont pesé, dans l’ordre où elles ont pesé.',
      },
      {
        name: 'La feuille de route',
        text: 'Six mois de chantiers, datés et chiffrés. Chaque chantier a un objectif, un responsable et une date.',
      },
    ],
    milestones: [
      { time: 'J+3 à J+5', text: 'Entretiens avec vos équipes' },
      { time: 'J+10', text: 'Audit et feuille de route, envoyés 24 heures avant la restitution' },
      { time: 'J+20 à J+25', text: 'Vous décidez' },
      { time: 'J+30', text: 'Démarrage' },
    ],
    statement: 'La feuille de route reste la vôtre.',
    statementAccent: 'Avec ou sans nous.',
  },
  after: {
    clock: 'Mois 1 → 6',
    chapter: 'sur la suite',
    title: 'Un chantier réussi tient',
    accent: 'quand on n’est plus là.',
    text: 'Si vous lancez l’accompagnement, un Operating Partner devient votre interlocuteur. Il ne livre pas une recommandation : il configure l’outil, écrit le process, lance le recrutement, analyse la trésorerie. Chantier par chantier, jusqu’à ce que ça tourne sans vous, et sans lui.',
    facts: [
      { value: '1', label: 'Operating Partner référent, un seul interlocuteur' },
      { value: '2', label: 'rendez-vous par semaine' },
      { value: '6', label: 'mois de feuille de route, chantier par chantier' },
    ],
    wordsLabel: 'Ce qu’on tient',
    words: ['Organisation', 'Recrutement', 'Gouvernance', 'Finances', 'Acquisition', 'Delivery', 'Management'],
    wordsAside: '(Et la marque, la tech, le web ? Aussi. On y vient.)',
  },
  grid: {
    chapter: 'sur la grille OP-X',
    title: 'Chaque case vide devient un',
    accent: 'chantier.',
    intro:
      'L’immersion passe l’entreprise au crible d’une grille. Ce qui est vide ou fragile devient un chantier, et chaque chantier a ses gens : notre équipe quand on le tient nous-mêmes, notre réseau d’experts quand il faut un métier précis.',
    lookLabel: 'Ce qu’on y regarde',
    expertsLabel: 'Les expertises mobilisées',
    aside: 'Les noms de nos experts se donnent en rendez-vous, pas sur un site.',
    items: [
      {
        name: 'Organisation',
        look: 'Rôles, fiches de poste, recrutement, management, montée en compétences.',
        experts: ['Organisation', 'Recrutement', 'Formation'],
      },
      {
        name: 'Systèmes et process',
        look: 'CRM, ERP, automatisations, données, documentation interne.',
        experts: ['CRM et ERP', 'IA appliquée', 'Automatisation', 'Développement'],
      },
      {
        name: 'Gouvernance',
        look: 'Qui décide quoi, pacte d’associés, contrats, levée de fonds.',
        experts: ['Droit des sociétés', 'Levée de fonds', 'Propriété intellectuelle'],
      },
      {
        name: 'Acquisition',
        look: 'Publicité, SEO, prospection, vente, CRM et emailing.',
        experts: ['Paid media', 'SEO', 'Email et CRM', 'Influence', 'Événements'],
      },
      {
        name: 'Marque',
        look: 'Positionnement, identité, site, contenus.',
        experts: ['Stratégie de marque', 'Direction artistique', 'UX, UI et web', 'Photo et vidéo'],
      },
      {
        name: 'Finances',
        look: 'Comptabilité, contrôle de gestion, trésorerie, financement, projection du business plan.',
        experts: ['CFO externalisé', 'Expertise comptable', 'Subventions'],
      },
      {
        name: 'Delivery',
        look: 'Production, logistique, qualité, service client, gestion de projet.',
        experts: ['Gestion de projet', 'Logistique'],
      },
      {
        name: 'Dirigeant',
        look: 'Sa charge, sa place dans l’entreprise, ce qu’il doit lâcher.',
        experts: ['Coaching', 'Pairs', 'Prise de parole'],
      },
    ],
  },
  ecosystem: {
    chapter: 'sur ce qui gravite autour',
    title: 'Une agence, et tout ce qu’on a construit',
    accent: 'autour.',
    items: [
      { name: 'HyperClub', kind: 'Événements', text: 'Cafés, cocktails et dîners de dirigeants, pensés de A à Z.' },
      { name: 'Sphère 51', kind: 'Mise en relation', text: 'Le bon pair ou le bon expert, au bon moment.' },
      { name: 'Donna', kind: 'Assistanat', text: 'Des assistants personnels pour dirigeants.' },
      { name: 'Burning Moon', kind: 'Studio SaaS', text: 'Produit, développement et CTO externalisé.' },
      { name: 'Keiros', kind: 'Logiciel', text: 'La transcription par IA pour agences, premier produit de Burning Moon.' },
      { name: 'Vector', kind: 'Mémoire', text: 'Ce qu’on apprend d’une mission est écrit, et se transmet.' },
      { name: 'Cockpit', kind: 'Pilotage', text: 'Les chantiers, leurs responsables, leurs échéances.' },
    ],
  },
  team: {
    chapter: 'sur les gens',
    title: 'Une petite équipe,',
    accent: 'qui se déplace.',
    members: [
      { name: 'Killian', role: 'CEO', text: 'Ouvre les sujets en immersion. Stratégie, commercial, relation avec les dirigeants.' },
      { name: 'Benjamin', role: 'CTO et CPO', text: 'Ferme et tient le rythme en immersion. Tech, produit, données.' },
      { name: 'Caroline', role: 'Head of Quality', text: 'Les process communs, et leur amélioration.' },
      { name: 'Louise', role: 'Head of Event & Brand', text: 'Les événements, pour HyperGrowth et pour ses clients.' },
      { name: 'Ulysse', role: 'Head Sphère 51', text: 'La mise en relation : un expert, un prestataire, un pair.' },
      { name: 'Julie', role: 'Head Donna', text: 'L’assistanat de dirigeant.' },
      { name: 'Léa', role: 'Design et web', text: 'Identités, maquettes, sites.' },
    ],
    more: 'Et les Operating Partners, qui portent les missions au quotidien.',
  },
  closing: {
    clock: 'Maintenant',
    title: 'On commence par un',
    accent: 'café.',
    text: 'Chez vous, chez nous, ou au prochain Café Croissance. Pas de démo, pas de plaquette : une conversation.',
    cta: 'Prendre un café',
    pending: 'Coordonnées à venir',
  },
  footer: {
    line: 'Méthode OP-X',
    legal: 'Mentions légales',
    rights: 'Tous droits réservés',
  },
};

export type Dictionary = typeof fr;
