import fs from 'node:fs'
import path from 'node:path'
import {
  authentication,
  createCollection,
  createDirectus,
  createField,
  createItem,
  deleteCollection,
  readCollections,
  readFieldsByCollection,
  readItems,
  rest,
  updateCollection,
  updateItem,
} from '@directus/sdk'

const STATUS_NOTE = 'Recommended values: draft, published, archived'

function loadEnvFile(filename = '.env') {
  const envPath = path.resolve(process.cwd(), filename)
  if (!fs.existsSync(envPath)) {
    return
  }

  const content = fs.readFileSync(envPath, 'utf8')
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`[seed] Missing required environment variable: ${name}`)
  }

  return value
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForDirectus(baseUrl) {
  const healthUrl = `${baseUrl.replace(/\/$/, '')}/server/health`

  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(healthUrl)
      if (response.ok) {
        return
      }
    } catch {
      // Continue retrying.
    }

    await sleep(2000)
  }

  throw new Error(`[seed] Directus is not reachable on ${healthUrl}`)
}

loadEnvFile('.env')

const FRONTEND_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000'

const articlesCollection = process.env.DIRECTUS_ARTICLES_COLLECTION ?? 'articles'
const eventsCollection = process.env.DIRECTUS_EVENTS_COLLECTION ?? 'events'
const teamCollection = process.env.DIRECTUS_TEAM_COLLECTION ?? 'team_members'
const useCasesCollection = process.env.DIRECTUS_USE_CASES_COLLECTION ?? 'use_cases'
const deprecatedCollections = ['evenements']

const COLLECTION_DEFINITIONS = [
  {
    collection: articlesCollection,
    meta: {
      icon: 'article',
      note: 'HyperGrowth blog articles',
      accountability: 'all',
      hidden: false,
      singleton: false,
      versioning: true,
      preview_url: `${FRONTEND_URL}/ressources/preview/{{id}}?preview=true&version={{version}}`,
    },
    fields: [
      {
        field: 'title',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'full' },
      },
      {
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'half' },
      },
      {
        field: 'category',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'excerpt',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'content',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          width: 'half',
          note: STATUS_NOTE,
        },
      },
      {
        field: 'published_at',
        type: 'dateTime',
        meta: { interface: 'datetime', width: 'half' },
      },
    ],
  },
  {
    collection: eventsCollection,
    meta: {
      icon: 'event',
      note: 'HyperGrowth events (upcoming and past)',
      accountability: 'all',
      hidden: false,
      singleton: false,
      versioning: true,
    },
    fields: [
      {
        field: 'title',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'full' },
      },
      {
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'half' },
      },
      {
        field: 'href',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'category',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          width: 'half',
          note: 'Recommended values: open, candidature, members, past',
        },
      },
      {
        field: 'access_mode',
        type: 'string',
        meta: {
          interface: 'input',
          width: 'half',
          note: 'Examples: Sur inscription, Ouvert au public',
        },
      },
      {
        field: 'is_past',
        type: 'boolean',
        meta: { interface: 'boolean', width: 'half' },
      },
      {
        field: 'date',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'date_end',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'location',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'country',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'description',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'long_description',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'format',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'target_audience',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'image_url',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'cta_label',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'cta_url',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'published_at',
        type: 'dateTime',
        meta: { interface: 'datetime', width: 'half' },
      },
    ],
  },
  {
    collection: teamCollection,
    meta: {
      icon: 'groups',
      note: 'HyperGrowth team members (scalable)',
      accountability: 'all',
      hidden: false,
      singleton: false,
      versioning: true,
    },
    fields: [
      {
        field: 'full_name',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'full' },
      },
      {
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'half' },
      },
      {
        field: 'role',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'half' },
      },
      {
        field: 'team_type',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          width: 'half',
          note: 'Recommended values: leadership, operating_partner, expert',
        },
      },
      {
        field: 'is_featured',
        type: 'boolean',
        meta: { interface: 'boolean', width: 'half' },
      },
      {
        field: 'sort_order',
        type: 'integer',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'profile_path',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'profile_image',
        type: 'uuid',
        meta: {
          interface: 'file-image',
          display: 'image',
          special: ['file'],
          width: 'half',
          note: 'Upload member image (stored in directus_files).',
        },
        schema: {
          is_nullable: true,
          foreign_key_table: 'directus_files',
          foreign_key_column: 'id',
        },
      },
      {
        field: 'image_url',
        type: 'string',
        meta: {
          interface: 'input',
          width: 'half',
          note: 'Legacy URL field. Prefer profile_image upload.',
        },
      },
      {
        field: 'website_url',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'linkedin_url',
        type: 'string',
        meta: { interface: 'input', width: 'full' },
      },
      {
        field: 'short_bio',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'long_bio',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          width: 'half',
          note: STATUS_NOTE,
        },
      },
      {
        field: 'published_at',
        type: 'dateTime',
        meta: { interface: 'datetime', width: 'half' },
      },
    ],
  },
  {
    collection: useCasesCollection,
    meta: {
      icon: 'work',
      note: 'HyperGrowth client use cases',
      accountability: 'all',
      hidden: false,
      singleton: false,
      versioning: true,
    },
    fields: [
      {
        field: 'title',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'full' },
      },
      {
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', required: true, width: 'half' },
      },
      {
        field: 'client_name',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'summary',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'challenge',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'approach',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'outcomes',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          width: 'half',
          note: STATUS_NOTE,
        },
      },
      {
        field: 'published_at',
        type: 'dateTime',
        meta: { interface: 'datetime', width: 'half' },
      },
      {
        field: 'cta_label',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
      {
        field: 'cta_url',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
      },
    ],
  },
]

const SEED_ITEMS = {
  [articlesCollection]: [
    {
      title: 'Déléguer sans lâcher prise',
      slug: 'deleguer-sans-lacher-prise',
      category: 'Management',
      excerpt: 'Comment déléguer efficacement sans perdre le contrôle stratégique.',
      content:
        "Vous ne scalez pas en travaillant plus, vous scalez en construisant une équipe capable d'exécuter sans vous sur chaque décision.\n\nDéléguer ne veut pas dire disparaître. Déléguer veut dire poser un cadre clair, des standards visibles et un rythme de pilotage assumé.\n\nCe passage est souvent le plus inconfortable pour un dirigeant, mais c'est celui qui libère la croissance durable.",
      status: 'published',
      published_at: '2025-10-21T08:00:00.000Z',
    },
    {
      title: 'Quand tout repose sur vous : le piège du micro-management',
      slug: 'quand-tout-repose-sur-vous-le-piege-du-micro-management',
      category: 'Management',
      excerpt:
        'Quand tout repose sur vous : reprendre le lead sans micro-manager.',
      content:
        "Le micro-management n'est pas un problème de contrôle, c'est un signal d'organisation saturée.\n\nQuand chaque arbitrage remonte au CEO, la vitesse chute, la clarté s'effondre et l'équipe perd en autonomie.\n\nL'enjeu n'est pas de lâcher prise aveuglément, mais de reconfigurer les rôles, les responsabilités et les boucles de décision.",
      status: 'published',
      published_at: '2025-11-29T08:00:00.000Z',
    },
  ],
  [eventsCollection]: [
    {
      title: 'Café Croissance Lille',
      slug: 'cafe-croissance-lille',
      href: '/evenements/cafe-croissance-lille',
      category: 'Café Croissance',
      status: 'past',
      access_mode: 'Sur inscription',
      is_past: true,
      date: 'December 17, 2025',
      date_end: null,
      location: 'Lille',
      country: 'FRANCE',
      description:
        "Un format Hotseat. De 8h à 15h, vous placez votre projet face à 10 entrepreneurs et dirigeants confirmés et repartez avec un plan d'action.",
      long_description:
        'Café Croissance est un cercle de 10-15 entrepreneurs qui viennent résoudre un vrai blocage business ou personnel grâce à un hot seat guidé et à l’intelligence collective. Pendant deux heures, chacun repart avec plus de clarté, des angles morts révélés et un plan d’action concret. Le prochain a lieu le 21 novembre, à L’Hôtel L’Arbre Voyageur à Lille.',
      format: 'Hotseat (8h à 15h)',
      target_audience: 'Dirigeants et entrepreneurs en croissance',
      image_url:
        'https://cdn.prod.website-files.com/68d56b17b598c54a4e9c8d9d/68f5e452cca6813a53397562_HPG_website_gradient-3.avif',
      cta_label: "S'inscrire à l'évènement",
      cta_url: '/',
      published_at: '2025-12-17T08:00:00.000Z',
    },
    {
      title: 'Mastermind Sri Lanka',
      slug: 'mastermind-srilanka',
      href: '/evenements/mastermind-srilanka',
      category: 'Mastermind',
      status: 'past',
      access_mode: 'Sur inscription',
      is_past: true,
      date: 'November 29, 2025',
      date_end: 'December 7, 2025',
      location: 'Weligama',
      country: 'SRI LANKA',
      description:
        "De 4 à 10 jours dans un lieu privé, à l'étranger, activités, moments d'échange et de networking. Vous vous créez un réseau solide et vivez une aventure avec d'autres dirigeants.",
      long_description:
        "Le Mastermind Hypergrowth est un cercle restreint de 10-20 entrepreneurs en hyper-croissance, réunis pour scaler plus vite grâce à un environnement d'exigence et de clarté. Le principe : l'entreprise ne peut pas aller plus loin que le dirigeant, donc on travaille sur les deux en parallèle.",
      format: 'Immersion (4 à 10 jours)',
      target_audience: 'Entrepreneurs en hyper-croissance',
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/6921379f82977e6bf5b9dcc3_Tangalle-Sri-Lanka-Aerial.avif',
      cta_label: "S'inscrire à l'évènement",
      cta_url: '/',
      published_at: '2025-11-29T08:00:00.000Z',
    },
    {
      title: 'Café Croissance Bordeaux',
      slug: 'charity-gala-winter-2023',
      href: '/evenements/charity-gala-winter-2023',
      category: 'Café Croissance',
      status: 'past',
      access_mode: 'Ouvert au public',
      is_past: true,
      date: 'November 14, 2025',
      date_end: null,
      location: 'Bordeaux',
      country: 'FRANCE',
      description:
        "Un format Hotseat. De 8h à 15h, vous placez votre projet face à 10 entrepreneurs et dirigeants confirmés et repartez avec un plan d'action.",
      long_description:
        'Le Café Croissance est un cercle d’entrepreneurs en croissance où chacun met sur la table un problème réel et repart avec un plan clair. Format hot seat : une personne expose sa situation, le groupe décortique, challenge, apporte des angles morts et des solutions concrètes. L’objectif est simple : résoudre en 2 heures ce que tu rumines depuis 2 mois, grâce à la puissance du collectif et à un cadre exigeant.',
      format: 'Hotseat (8h à 15h)',
      target_audience: 'Dirigeants et entrepreneurs en croissance',
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/69171efbd9f015da9a2384d3__LRG2592.avif',
      cta_label: "S'inscrire à l'évènement",
      cta_url: '/',
      published_at: '2025-11-14T08:00:00.000Z',
    },
  ],
  [teamCollection]: [
    {
      full_name: 'Killian Palermo',
      slug: 'killian-palermo',
      role: 'Founder & Chief OP',
      team_type: 'leadership',
      is_featured: true,
      sort_order: 1,
      profile_path: '/operating-partners/killian-palermo',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691c0365fd35bc39df5fa328_8.avif',
      website_url: 'https://www.hypergrowth.fr/',
      linkedin_url: 'https://www.linkedin.com/in/killianpalermo/',
      short_bio:
        "Fondateur d'Hypergrowth, Killian est entrepreneur et operating partner spécialisé dans l'hypercroissance. Avec plus de dix ans d'expérience, un exit et plus de 150 dirigeants accompagnés, il transforme les organisations en machines de croissance prévisible.",
      long_bio:
        "Killian Palermo est entrepreneur et operating partner spécialisé dans l'hypercroissance, reconnu pour sa capacité à accélérer des entreprises déjà performantes. Fort de plus de dix ans d'expérience et d'un exit significatif, il a accompagné plus de 150 dirigeants et piloté plusieurs centaines de millions d'euros de croissance cumulée.\n\nSon expertise repose sur trois axes : une lucidité stratégique qui lui permet de lire rapidement une situation, la mise en place de systèmes opérationnels qui éliminent le chaos interne, et une capacité à aider les CEOs à prendre des décisions difficiles avec clarté et vitesse. Il intervient précisément lorsque l'entreprise atteint un plafond invisible : organisation bancale, priorités floues, exécution inégale, manque de structure.\n\nDans ces contextes, Killian agit comme copilote stratégique. Il clarifie les enjeux, tranche là où il faut trancher, installe du rythme et transforme le business en machine de croissance prévisible.\n\nEn co-pilotant Hypergrowth, il met à disposition son expérience de terrain, son réseau d'experts et une approche 360° : stratégie, marketing, opérations, management, finance, posture de dirigeant. Sa force tient dans une lecture précise des leviers qui changent la trajectoire d'une entreprise et dans sa capacité à amener un CEO à son vrai niveau, sans compromis.",
      status: 'published',
      published_at: '2025-09-01T09:00:00.000Z',
    },
    {
      full_name: 'Ulysse L. Sher',
      slug: 'ulysselsher-operating-partner',
      role: 'Operating Partner, CEO de HyperGrowth',
      team_type: 'leadership',
      is_featured: true,
      sort_order: 2,
      profile_path: '/operating-partners/ulysselsher-operating-partner',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691a9c6ffd17d3b642956b6f_Profil.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/ulysse-l-sher-04515a154/',
      short_bio:
        'CEO de Hypergrowth, Ulysse est expert du scaling personnel pour dirigeants. Il articule performance physique, clarté mentale et posture sociale pour transformer les fondateurs en moteurs crédibles et durables de leur hypercroissance.',
      long_bio:
        "Ulysse L. Sher est le CEO de Hypergrowth et l'un des rares experts à articuler concrètement le lien entre performance personnelle et hypercroissance business. Fort de dix ans d'expérience en stratégie, marketing, vente et entrepreneuriat, il s'appuie sur une conviction centrale : un dirigeant qui ne se transforme pas au rythme de sa boîte finit par devenir son propre plafond de verre.\n\nSa trajectoire, marquée par des épreuves précoces et une quête de sens profonde, a façonné une approche globale de la performance : physique, mentale et sociale. Ce triptyque constitue la base de sa méthode, visant à remettre de l'ordre dans le corps, clarifier l'esprit et renforcer la posture, pour créer des dirigeants capables de porter une croissance ambitieuse.\n\nUlysse accompagne aujourd'hui des entrepreneurs intermédiaires et avancés dont le développement est freiné par leurs propres limites internes. Son travail consiste à diagnostiquer leur posture, solidifier leurs fondations, structurer leurs routines, renforcer leur discipline et installer des systèmes d'OKR pour transformer les intentions en exécution.\n\nSa mission est claire : former des fondateurs capables de soutenir, sécuriser et accélérer la croissance de leur entreprise. Pour lui, le scaling personnel n'est pas un \"bonus\" : c'est le moteur invisible de toute hypercroissance durable.",
      status: 'published',
      published_at: '2025-09-02T09:00:00.000Z',
    },
    {
      full_name: 'Manon Werquin',
      slug: 'manon-werquin-operating-partner',
      role: 'Operating Partner',
      team_type: 'operating_partner',
      is_featured: true,
      sort_order: 3,
      profile_path: '/operating-partners/manon-werquin-operating-partner',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691d6cf72d819a8d8fb58687_Manon%20Werquin.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/manon-werquin/',
      short_bio:
        'Entrepreneure depuis six ans, Manon accompagne dirigeants et indépendants dans la structuration de leur organisation. Experte Notion et gestion de projet, elle agit comme co-pilote opérationnel pour réduire la charge mentale et clarifier les outils.',
      long_bio:
        "Entrepreneure depuis six ans, Manon Werquin accompagne dirigeants et indépendant·es avec un positionnement clair : structurer leur organisation et mettre en place des outils sur mesure, efficaces et durables. Formée en continu à Notion, elle combine maîtrise de l'outil, gestion de projet et compréhension des réalités du terrain pour créer des systèmes adaptés aux contraintes quotidiennes.\n\nIssue d'une famille entièrement tournée vers l'entrepreneuriat, elle grandit au milieu des défis que représente la gestion d'une entreprise. Cette culture lui permet d'aborder chaque accompagnement avec une approche humaine et réaliste : l'organisation n'est pas seulement une affaire de process, elle touche directement la charge mentale, l'équilibre personnel et la capacité à faire croître un projet.\n\nManon a été responsable d'un espace de coworking rassemblant plus de 2 500 indépendants et entreprises à Lille, puis responsable des 50 partenariats d'une TPE spécialisée dans la qualité de vie au travail. Cette exposition à une grande diversité de métiers - coachs, consultants, agences, artisans, PME, experts bien-être, communication ou stratégie - constitue aujourd'hui un écosystème qu'elle mobilise pour ses clients lorsque nécessaire.\n\nSans prospection agressive ni jargon inutile, elle mise sur la pédagogie, la relation et l'adaptation. Son rôle de co-pilote : aider les TPE/PME à garder le cap, structurer leurs outils, fluidifier leurs méthodes et les accompagner dans la durée pour qu'elles puissent se concentrer sur l'essentiel.",
      status: 'published',
      published_at: '2025-09-03T09:00:00.000Z',
    },
    {
      full_name: 'Anthony Diochon',
      slug: 'anthony-diochon',
      role: 'Expert',
      team_type: 'expert',
      is_featured: false,
      sort_order: 4,
      profile_path: '/operating-partners/anthony-diochon',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/69246e7904d0945af5d37bb6_Anthony%20Diochon.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/anthony-diochon/',
      short_bio:
        "Anthony est expert-comptable et entrepreneur à Lyon. Passé par KPMG en France et au Canada, il cofonde avec Harry un cabinet sur-mesure pour dirigeants, alliant proximité, réactivité et accompagnement déjà éprouvé auprès de 150 clients.",
      long_bio:
        "Anthony Diochon est expert-comptable et entrepreneur à Lyon. Après plusieurs années chez KPMG, en France puis au Canada, il développe une expertise solide en comptabilité, en audit et en conseil auprès de dirigeants. Ce passage dans un environnement international lui donne une vision structurée des enjeux financiers des entreprises, quel que soit leur stade de maturité.\n\nAvec son associé Harry, il cofonde un cabinet pensé pour les dirigeants, avec une promesse claire : des solutions sur mesure, adaptées à la réalité de chaque entreprise. L'objectif n'est pas seulement de produire des chiffres, mais de les mettre au service des décisions stratégiques.\n\nLeur approche repose sur trois piliers : proximité avec les clients, réactivité dans les échanges et compréhension fine des enjeux derrière chaque dossier. Plus de 150 clients ont déjà été accompagnés dans la durée, avec un travail centré sur la fiabilité des comptes, la sécurisation des obligations comptables et un regard structuré sur la situation financière.\n\nAnthony met ainsi son expérience de terrain et son parcours entre France et Canada au service d'un objectif simple : offrir aux dirigeants une base financière claire pour piloter leur entreprise en confiance.",
      status: 'published',
      published_at: '2025-09-04T09:00:00.000Z',
    },
    {
      full_name: 'Benjamin Brémont',
      slug: 'ben-bremont-operating-partner',
      role: 'Operating Partner',
      team_type: 'operating_partner',
      is_featured: false,
      sort_order: 5,
      profile_path: '/operating-partners/ben-bremont-operating-partner',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691c03760aa8bdaef402445a_6.avif',
      website_url: 'https://sarahwilson.com',
      linkedin_url: 'https://www.linkedin.com/in/benjamin-b-367231143/',
      short_bio:
        'Consultant en croissance spécialisé CRM et acquisition, Benjamin accompagne freelances, studios et entreprises en expansion pour transformer un fonctionnement chaotique en système pilotable, en clarifiant les offres, les funnels, le CRM et les process commerciaux.',
      long_bio:
        "Benjamin Brémont est consultant en croissance, spécialisé en CRM, acquisition et structuration des systèmes commerciaux. Il intervient comme partenaire part-time, directement au cœur des opérations, pour remettre de l'ordre, clarifier les offres et transformer un ensemble d'actions dispersées en système pilotable. Son travail s'adresse autant aux freelances qui veulent passer de 0 à 10k MRR qu'aux équipes qui cherchent à stabiliser une croissance déjà lancée.\n\nSa méthode tient en trois verbes : cartographier, structurer, automatiser. Concrètement, Benjamin aide ses clients à définir leurs ICP, refondre leur CRM, construire des funnels cohérents, créer des séquences outbound efficaces, organiser le delivery et poser des SOPs pour rendre l'organisation réellement scalable. L'objectif est toujours le même : obtenir un système clair, mesurable et actionnable.\n\nEn parallèle, il développe plusieurs produits autour des systèmes d'acquisition. Parmi eux, FastScribe, conçu pour transformer un enregistrement en ressource actionnable : transcription, résumé, analyse, puis interaction via IA. Il explore aussi la création d'outils dédiés aux wireframes SaaS, aux marketplaces verticales et aux systèmes d'acquisition automatisés.\n\nAu fil des années, Benjamin a structuré une communauté de plus de 2 500 entrepreneurs orientés exécution, à qui il partage une approche directe : dire les choses telles qu'elles sont, challenger les croyances et chercher la vérité business plutôt qu'une validation superficielle.",
      status: 'published',
      published_at: '2025-09-05T09:00:00.000Z',
    },
    {
      full_name: 'Elise Hetsch',
      slug: 'elise-hetsch',
      role: 'Expert',
      team_type: 'expert',
      is_featured: false,
      sort_order: 6,
      profile_path: '/operating-partners/elise-hetsch',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/69245b88607064c4ad4689d2_Elise%20Hetsch.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/elise-hetsch/',
      short_bio:
        "Élise Hetsch est nutritherapeute et experte en santé préventive. Elle aide les dirigeants à reprendre l pouvoir sur leur énergie grâce à la nutrition, la micro-nutrition et l'hygiène de vie durable.e",
      long_bio:
        "Élise Hetsch est experte en nutrition et en santé, avec une approche centrée sur la prévention et l'hygiène de vie. Elle accompagne chacun à reprendre le pouvoir sur son bien-être grâce à la nutrition, à des routines structurées et à des choix plus cohérents au quotidien.\n\nPartant du constat que l'information autour de la santé est souvent confuse, contradictoire et difficile à appliquer, elle adopte une démarche pédagogique et progressive pour apprendre pas à pas à prendre soin de soi. L'idée : rendre concret ce qui reste souvent théorique, en transformant les bonnes pratiques en habitudes ancrées dans la réalité de chacun.\n\nSon approche se positionne comme un accompagnement clair vers une santé durable : comprendre les bases, ajuster progressivement son hygiène de vie, installer des repères stables et retrouver une relation plus sereine à son corps et à son énergie.\n\nÉlise s'adresse notamment aux personnes très sollicitées - dont les dirigeants - pour qui la performance au quotidien dépend directement de leur niveau de vitalité. Son travail consiste à leur offrir un cadre simple et structuré, pour leur permettre de retrouver de la clarté, de l'énergie et une vision plus long terme de leur santé.",
      status: 'published',
      published_at: '2025-09-06T09:00:00.000Z',
    },
    {
      full_name: 'Evan Riquelme',
      slug: 'evan-riquelme-operating-partner',
      role: 'Operating Partner',
      team_type: 'operating_partner',
      is_featured: false,
      sort_order: 7,
      profile_path: '/operating-partners/evan-riquelme-operating-partner',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691c04b0968fd7912c9495f0_evan.avif',
      website_url: 'https://davidbrown.com',
      linkedin_url: 'https://www.linkedin.com/in/evan-riquelme-1a7600173/',
      short_bio:
        "Copywriter spécialisé en direct response et systèmes d'acquisition, Evan transforme une vision en écosystème marketing clair et rentable. Chez Hypergrowth, il combine stratégie, copywriting et exécution pour bâtir des systèmes qui vendent de manière répétable.",
      long_bio:
        "Copywriter depuis 2021, Evan Riquelme s'est spécialisé en direct response marketing et en création de systèmes d'acquisition capables de générer une croissance mesurable. Sa force : transformer une vision en un écosystème marketing clair, cohérent et rentable.\n\nSon travail repose sur trois piliers : clarification du message, construction de processus de vente solides et optimisation data-driven des performances. Il intervient à la fois sur la réflexion stratégique et sur l'opérationnel : tunnels de vente, email marketing, VSL, pages de vente, séquences, analytics, cadrage des actions et pilotage projet. L'objectif n'est pas seulement de \"faire du marketing\", mais de concevoir des architectures qui transforment réellement l'attention en revenus.\n\nChez Hypergrowth, Evan occupe un rôle hybride d'Operating Partner. Il se situe à l'intersection du copywriting, de la stratégie marketing et de l'exécution terrain pour aider les dirigeants à structurer leur croissance. Il les accompagne dans la mise en place de systèmes qui vendent de manière répétable, scalable et durable, au lieu de dépendre d'un coup de chance ou d'un contenu ponctuellement viral.\n\nSa démarche est profondément pragmatique et orientée résultats, avec une obsession assumée : créer, optimiser et opérer des systèmes qui transforment une intention en résultats concrets et une vision en réalité business.",
      status: 'published',
      published_at: '2025-09-07T09:00:00.000Z',
    },
    {
      full_name: 'Gabriel Girardon',
      slug: 'gabriel-girardon',
      role: 'Expert',
      team_type: 'expert',
      is_featured: false,
      sort_order: 8,
      profile_path: '/operating-partners/gabriel-girardon',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/692d6588601597f7adcd0b96_portrait.avif',
      website_url: 'https://www.bleuecitadelle.com',
      linkedin_url: 'https://www.linkedin.com/in/gabriel-girardon/',
      short_bio:
        'Gabriel Girardon est expert en image de marque visuelle et verbale. Il transforme la vision des dirigeants en identités durables et des expériences web structurées, centrées utilisateur, capables de soutenir une croissance lisible, cohérente et scalable.',
      long_bio:
        "Gabriel Girardon est expert en image de marque visuelle et verbale, spécialisé dans la création d'identités durables et d'expériences web qui soutiennent réellement la croissance. Son travail commence là où celui d'un designer classique s'arrête : comprendre le business, la vision et les contraintes opérationnelles pour transformer une intention en système visuel clair, cohérent et exploitable.\n\nAvant de rejoindre Hypergrowth, Gabriel passe quatre années à diriger son propre studio, au contact direct de dizaines de dirigeants et projets à différents stades de maturité. Cette période, marquée par des voyages et beaucoup d'introspection, lui apprend que la qualité d'une marque ne dépend pas seulement de l'esthétique - mais de sa capacité à porter le projet sur plusieurs années, loin des tendances éphémères et de la confusion créative.\n\nUn élément a particulièrement façonné sa méthode : ses débuts en tant que simple graphiste, où il découvre la frustration de créer sans comprendre les tenants et aboutissants d'un projet. C'est ce qui le pousse à chercher la vision, les enjeux, l'utilisateur final, et à développer une approche profondément stratégique du design.\n\nSes piliers sont clairs : aligner la vision (le marché a toujours raison), servir l'expérience utilisateur comme colonne vertébrale d'un business durable, structurer des concepts forts à partir d'idées encore floues.\n\nGabriel accompagne aujourd'hui des dirigeants et des projets mid-stage qui veulent construire du solide, clarifier leur identité et poser les fondations visuelles qui permettront d'accélérer sans confusion. Chez Hypergrowth, il structure des univers visuels durables - identités, UX, UI, systèmes éditoriaux - qui renforcent la lisibilité, l'exécution et la cohérence de la croissance.\n\nSon objectif est simple : transformer une vision en marque claire, pertinente et capable de tenir dans le temps.",
      status: 'published',
      published_at: '2025-09-08T09:00:00.000Z',
    },
    {
      full_name: 'Guillaume Pesnel',
      slug: 'guillaume-pesnel',
      role: 'Expert',
      team_type: 'expert',
      is_featured: false,
      sort_order: 9,
      profile_path: '/operating-partners/guillaume-pesnel',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/692458acf8b048f9a195d760_Guillaume%20Pesnel.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/guillaume-pesnel/',
      short_bio:
        'Cofondateur de Bohème Studio, Guillaume maîtrise Klaviyo comme peu d’équipes en France. Il conçoit des emails beaux, cohérents avec la DA et pensés pour une seule chose : générer du chiffre, de façon lisible.',
      long_bio:
        "Guillaume Pesnel est le co-fondateur de Bohème Studio, un studio d'email-marketing hybride qui maîtrise Klaviyo comme peu d'équipes en France. Son obsession est simple : créer des emails beaux, cohérents avec la direction artistique des marques... et qui génèrent réellement du chiffre.\n\nAvec son équipe, il accompagne des marques comme Meeko, Adam & Eve, Marie-Jeanne, Sport Orthèse, House Of Freïa, Vog Store, Drink Haura, Koko Kombucha, Pavenrod, Humu Surf Company, MatchyMatcha et d'autres partenaires exigeants. Toutes partagent un même besoin : plus de clarté dans leurs communications, plus d'impact sur leurs audiences et plus de chiffre issu de leurs canaux propriétaires.\n\nChez Bohème Studio, le travail sur l'email dépasse la simple rédaction de campagnes : il s'agit de concevoir une architecture globale, entre flows automatisés, campagnes ponctuelles et cohérence de marque. Guillaume veille à ce que chaque message serve à la fois la performance et l'image, en alignant les objectifs business, la voix de la marque et l'expérience utilisateur.\n\nSon approche s'adresse particulièrement aux marques qui veulent professionnaliser leur CRM, tirer le meilleur de Klaviyo et transformer l'email en un véritable levier de croissance durable.",
      status: 'published',
      published_at: '2025-09-09T09:00:00.000Z',
    },
    {
      full_name: 'Julie Ducourau',
      slug: 'julie-ducourau-operating-partner',
      role: 'Operating Partner',
      team_type: 'operating_partner',
      is_featured: false,
      sort_order: 10,
      profile_path: '/operating-partners/julie-ducourau-operating-partner',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691c030a24953cec9fda438c_2.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/julie-ducourau/',
      short_bio:
        'Responsable des opérations chez Hypergrowth et Operating Partner, Julie accompagne les dirigeants sur la structuration, les process et l’automatisation, pour soutenir une croissance ambitieuse sans fragiliser l’interne ni diluer la vision.',
      long_bio:
        "Julie Ducourau est responsable des opérations chez Hypergrowth et Operating Partner auprès des clients. Son rôle central : aider les dirigeants à structurer leur entreprise pour soutenir une croissance ambitieuse sans créer de fragilité interne.\n\nAvant Hypergrowth, elle passe près de deux ans comme consultante en stratégie IT dans un cabinet de conseil, où elle accompagne grands groupes et maisons de luxe sur des sujets de gouvernance, de performance et de transformation digitale. Cette immersion dans des environnements complexes lui donne une vision fine du fonctionnement réel des organisations : forces, angles morts, dépendances internes, rythmes et limites.\n\nDe cette expérience naît une conviction forte : beaucoup de dirigeants avancent très vite, mais sans colonne vertébrale opérationnelle capable d'absorber leur ambition. Résultat : perte d'énergie, décisions sous pression, répétition des mêmes problèmes et croissance qui ralentit malgré les efforts.\n\nC'est pour répondre à ce problème qu'elle se lance à son compte, puis rejoint Hypergrowth. Julie accompagne aujourd'hui les entrepreneurs en 360° : organisation interne, processus, automatisation, structuration opérationnelle, priorisation et exécution. Son objectif : devenir une partenaire de confiance, capable de créer l'architecture invisible qui permet aux dirigeants de croître sans sacrifier leur vision, leur clarté ou leur énergie.",
      status: 'published',
      published_at: '2025-09-10T09:00:00.000Z',
    },
    {
      full_name: 'Julie Simon',
      slug: 'julie-simon-operating-partner',
      role: 'Operating Partner',
      team_type: 'operating_partner',
      is_featured: false,
      sort_order: 11,
      profile_path: '/operating-partners/julie-simon-operating-partner',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/691c061ffd35bc39df62402e_4.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/julie-simon/',
      short_bio:
        'Avec près de dix ans dans la distribution, le marketing client et le management, Julie intervient aujourd’hui comme COO / Operating Partner externalisée pour aider TPE et PME à structurer leurs opérations sans créer de lourdeur inutile.',
      long_bio:
        "Avant de devenir COO et Operating Partner externalisée, Julie Simon passe près de dix ans dans la distribution, où elle construit une expertise opérationnelle centrée sur le terrain, le client et les équipes à taille humaine. Elle commence dans la grande distribution, côté marketing client : e-mailing, segmentation, campagnes, analyse des comportements d'achat. Cette base lui donne une compréhension fine du lien entre données, communication et expérience client.\n\nElle rejoint ensuite l'entreprise familiale dans la distribution automobile, à un poste hybride de responsable achats. Elle y dirige une cellule de sourcing composée de profils commerciaux, tout en conservant une casquette opérationnelle d'acheteuse. Cette expérience la confronte à la réalité quotidienne d'une PME : gestion des équipes, coordination interne, process, tensions opérationnelles, arbitrages rapides. En parallèle, elle accompagne ses parents comme bras droit sur la structuration globale de l'entreprise, avec un rôle proche d'un operating partner interne.\n\nAujourd'hui, Julie intervient comme COO / Operating Partner à temps partagé. Elle apporte une expertise ancrée dans le réel : compréhension du terrain, adaptation rapide aux contextes, capacité à structurer les opérations sans alourdir la machine. Sa formation initiale en marketing digital et e-commerce, combinée à son exposition prolongée aux PME, lui permet d'allier vision stratégique et exécution opérationnelle, au service de dirigeants qui veulent faire évoluer leur entreprise tout en gardant le contrôle.",
      status: 'published',
      published_at: '2025-09-11T09:00:00.000Z',
    },
    {
      full_name: 'Samuel Fernandes',
      slug: 'samuel-fernandes',
      role: 'Expert',
      team_type: 'expert',
      is_featured: false,
      sort_order: 12,
      profile_path: '/operating-partners/samuel-fernandes',
      profile_image: null,
      image_url:
        'https://cdn.prod.website-files.com/68de656a1e43b8bb511a7784/69245a7ec8515e0a48e321d0_Samuel%20Fernandes.avif',
      website_url: null,
      linkedin_url: 'https://www.linkedin.com/in/samuel-fernandes-3729a91a8/',
      short_bio:
        'Samuel Fernandes fait passer les entreprises de 200k€ à 1M€/an grâce aux Live Events. Il accompagne les content creators pour créer des offres irrésistibles et des systèmes de vente performants, aux côtés de talents reconnus.',
      long_bio:
        "Samuel Fernandes quitte l'école à 19 ans pour apprendre plus vite que n'importe où. Parti seul en Afrique du Sud, il découvre l'entrepreneuriat presque par hasard et démarre sa trajectoire en accompagnant ses premiers créateurs de contenu. Cette décision marque le début d'un parcours centré sur l'exécution, l'apprentissage rapide et la proximité avec le terrain.\n\nDepuis, il aide les content creators à lancer des offres irrésistibles, structurer leurs décisions et bâtir des systèmes de vente performants. Son travail se concentre particulièrement sur la puissance des Live Events, qu'il utilise comme levier pour faire passer des entreprises de 200k€ à 1M€/an.\n\nSamuel intervient aux côtés de talents comme Ulysse Lubin, Eliott Meunier ou Delphine Pinon, en les aidant à transformer leur audience en clients à travers des lancements structurés et des tunnels adaptés à leur univers. Les résultats se traduisent par des dizaines de lancements et de tunnels mis en place.\n\nSon accompagnement s'adresse aux créateurs qui veulent professionnaliser leur approche, clarifier leurs offres et utiliser les événements live comme véritable moteur de croissance, plutôt que comme simple prise de parole ponctuelle.",
      status: 'published',
      published_at: '2025-09-12T09:00:00.000Z',
    },
  ],
  [useCasesCollection]: [
    {
      title: 'Étude de cas Pureva',
      slug: 'etude-de-cas-pureva',
      client_name: 'Pureva',
      summary:
        'Comment structurer une startup en hypercroissance sans en brider la dynamique ?',
      challenge:
        "Avant HyperGrowth — Les désirs du client : Structurer la croissance et stabiliser l'entreprise. Adrien & Vincent voulaient un cadre stratégique clair (finance, RH, pilotage) pour absorber leur hypercroissance sans perdre en qualité.\n\nProblèmes et challenges : Hypercroissance non pilotée. Trésorerie sous pression, modèle 100 % externalisé difficile à coordonner, décisions lentes, absence de pilotage financier et manque d'expertise tech pour la suite.",
      approach:
        "Avec HyperGrowth — Les désirs du client : Structuration & pilotage complet. Mise en place d'un système financier robuste, optimisation du BFR, structuration des process, gouvernance fondée, intégration de prestataires clés et activation d'un comité scientifique.\n\nRésultats : Clarté, alignement et puissance décisionnelle. Dirigeants alignés, organisation fluide, vision long terme assumée, écosystème de partenaires structuré et moteur de croissance réactivé.",
      outcomes:
        'Témoignage : "Killian possède des qualités d\'analyse humaines et structurelles qui peuvent faire changer grandement les choses sur une entreprise en croissance. Il est à la fois votre accélérateur et le pilier d\'une structure organisée et surtout efficace !" — Vincent Mongis & Adrien Charles-Nicolas, CEO @Pureva\n\n+230% : Croissance de l\'ARR depuis le début de l\'accompagnement.\n+100K€ : Trésorerie récupérée via optimisation financière.',
      status: 'published',
      published_at: '2025-09-10T09:00:00.000Z',
      cta_label: 'Parler à un OP',
      cta_url: '/contact',
    },
  ],
}

async function createFieldWithFallback(client, collectionName, fieldDefinition) {
  try {
    await client.request(createField(collectionName, fieldDefinition))
    return fieldDefinition.type
  } catch (error) {
    if (fieldDefinition.type === 'dateTime') {
      const timestampField = { ...fieldDefinition, type: 'timestamp' }
      await client.request(createField(collectionName, timestampField))
      return 'timestamp'
    }

    throw error
  }
}

async function ensureCollection(client, collectionSet, definition) {
  if (!collectionSet.has(definition.collection)) {
    await client.request(
      createCollection({
        collection: definition.collection,
        meta: definition.meta,
        schema: { name: definition.collection },
      }),
    )
    collectionSet.add(definition.collection)
    console.log(`[seed] Collection created: ${definition.collection}`)
  } else {
    await client.request(
      updateCollection(definition.collection, {
        meta: definition.meta,
      }),
    )
    console.log(`[seed] Collection updated: ${definition.collection}`)
  }
}

async function ensureFields(client, definition) {
  const existingFields = await client.request(
    readFieldsByCollection(definition.collection),
  )
  const existingFieldSet = new Set(existingFields.map((field) => field.field))

  for (const field of definition.fields) {
    if (existingFieldSet.has(field.field)) {
      continue
    }

    const createdType = await createFieldWithFallback(
      client,
      definition.collection,
      field,
    )
    console.log(
      `[seed] Field created: ${definition.collection}.${field.field} (${createdType})`,
    )
  }
}

async function removeDeprecatedCollections(client, collectionSet) {
  for (const collectionName of deprecatedCollections) {
    if (!collectionSet.has(collectionName)) {
      continue
    }

    await client.request(deleteCollection(collectionName))
    collectionSet.delete(collectionName)
    console.log(`[seed] Collection deleted: ${collectionName}`)
  }
}

async function upsertItems(client, collectionName, items) {
  let created = 0
  let updated = 0

  for (const item of items) {
    const existing = await client.request(
      readItems(collectionName, {
        filter: { slug: { _eq: item.slug } },
        fields: ['id', 'slug'],
        limit: 1,
      }),
    )

    if (existing.length > 0) {
      await client.request(updateItem(collectionName, existing[0].id, item))
      updated += 1
      continue
    }

    await client.request(createItem(collectionName, item))
    created += 1
  }

  console.log(
    `[seed] ${collectionName}: ${created} created, ${updated} updated`,
  )
}

async function run() {
  const directusUrl =
    process.env.DIRECTUS_SEED_URL ??
    process.env.NEXT_PUBLIC_DIRECTUS_URL ??
    process.env.DIRECTUS_PUBLIC_URL ??
    process.env.DIRECTUS_URL ??
    'http://localhost:8055'

  const adminEmail = requireEnv('DIRECTUS_ADMIN_EMAIL')
  const adminPassword = requireEnv('DIRECTUS_ADMIN_PASSWORD')

  console.log(`[seed] Target Directus URL: ${directusUrl}`)
  await waitForDirectus(directusUrl)

  const client = createDirectus(directusUrl)
    .with(authentication('json'))
    .with(rest())

  await client.login(
    {
      email: adminEmail,
      password: adminPassword,
    },
    { mode: 'json' },
  )

  const collections = await client.request(readCollections({ fields: ['collection'] }))
  const collectionSet = new Set(collections.map((collection) => collection.collection))

  await removeDeprecatedCollections(client, collectionSet)

  for (const definition of COLLECTION_DEFINITIONS) {
    await ensureCollection(client, collectionSet, definition)
    await ensureFields(client, definition)
    await upsertItems(client, definition.collection, SEED_ITEMS[definition.collection])
  }

  console.log('[seed] Directus seed completed.')
}

run().catch((error) => {
  console.error('[seed] Directus seed failed.')
  console.error(error)
  process.exit(1)
})
