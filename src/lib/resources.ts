import { client } from '@/sanity/lib/client'
import { RESSOURCE_BY_SLUG_QUERY, RESSOURCE_SLUGS_QUERY } from '@/sanity/lib/queries'

export interface ResourceArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string | null
}

// ── Fallback statique ─────────────────────────────────────────────────────────

const staticArticles: Record<string, ResourceArticle> = {
  'deleguer-sans-lacher-prise': {
    id: 'deleguer-sans-lacher-prise',
    slug: 'deleguer-sans-lacher-prise',
    title: 'Déléguer sans lâcher prise',
    excerpt:
      'Comment déléguer efficacement sans perdre le contrôle stratégique. Les 5 leviers pour passer du "je fais tout" au pilotage.',
    content: `Dirigeant sursollicité : l'illusion du contrôle total

Quand une entreprise atteint un certain seuil de croissance, le dirigeant se retrouve pris dans un paradoxe : plus l'entreprise grandit, plus il est sollicité sur des sujets opérationnels. Répondre aux clients, valider chaque décision, résoudre les urgences du quotidien. Le sentiment de contrôle est rassurant, mais il masque une réalité : l'entreprise ne scale pas parce que tout repose sur une seule personne.

Ce mode de fonctionnement a des conséquences directes. L'équipe n'ose plus prendre d'initiatives. Les décisions s'accumulent en attente de validation. Le dirigeant travaille dans son entreprise au lieu de travailler sur son entreprise. La croissance stagne, non pas par manque d'opportunités, mais par manque de bande passante au sommet.

Déléguer sans perdre le contrôle : trouver le bon équilibre

Déléguer ne signifie pas abandonner. Il s'agit de passer d'un contrôle opérationnel (tout vérifier soi-même) à un contrôle stratégique (piloter les résultats). La différence est fondamentale : dans le premier cas, le dirigeant est le goulot d'étranglement. Dans le second, il libère la capacité d'exécution de son équipe tout en gardant la visibilité sur ce qui compte.

Cette transition demande un changement de posture. Il faut accepter que les choses ne seront pas faites exactement comme on les aurait faites soi-même, mais qu'elles seront faites. Et souvent, avec le bon cadre, elles seront mieux faites, parce que les personnes en charge sont plus proches du terrain.

5 leviers pour déléguer efficacement

1. Clarifier les rôles et responsabilités. Chaque personne doit savoir exactement ce qu'on attend d'elle, quelles décisions elle peut prendre seule, et quand elle doit remonter l'information. Sans cette clarté, la délégation crée de la confusion plutôt que de la fluidité.

2. Installer un management intermédiaire. Entre le dirigeant et les équipes opérationnelles, il faut des relais capables de porter la vision et de prendre des décisions au quotidien. Ce n'est pas un luxe, c'est une nécessité dès que l'équipe dépasse 8-10 personnes.

3. Mettre en place des KPIs et des process clairs. Les indicateurs permettent de piloter sans micro-manager. Si les chiffres sont au vert, pas besoin d'aller vérifier chaque tâche. Les process garantissent la qualité sans que le dirigeant soit dans la boucle de chaque décision.

4. Instaurer des rituels de suivi. Un point hebdomadaire structuré remplace des dizaines d'interruptions quotidiennes. Le format est simple : ce qui a été fait, ce qui est prévu, ce qui bloque. Le dirigeant garde la visibilité sans être dans l'exécution.

5. Se faire accompagner par un Operating Partner. Un OP apporte un regard extérieur et une méthodologie éprouvée pour structurer cette transition. Il aide à identifier les bons profils pour le management intermédiaire, à construire les process, et à installer les rituels. Le dirigeant n'est plus seul face à cette transformation.`,
    publishedAt: '2025-10-21T08:00:00.000Z',
  },
  'quand-tout-repose-sur-vous-le-piege-du-micro-management': {
    id: 'quand-tout-repose-sur-vous-le-piege-du-micro-management',
    slug: 'quand-tout-repose-sur-vous-le-piege-du-micro-management',
    title: 'Quand tout repose sur vous : le piège du micro-management',
    excerpt:
      'Quand tout repose sur vous : reprendre le lead sans micro-manager. Identifier les signes du mode pompier et retrouver une posture de CEO stratège.',
    content: `Les signes du mode pompier et ses conséquences

Le mode pompier, c'est quand le dirigeant passe ses journées à éteindre des incendies. Un client mécontent ici, un problème de livraison là, une tension dans l'équipe à gérer entre deux réunions. Chaque journée est une succession d'urgences qui empêche de se concentrer sur la stratégie, le développement commercial ou la structuration de l'entreprise.

Les signes sont reconnaissables : une boîte mail qui déborde, des réunions en continu, l'impression de ne jamais avancer sur les vrais sujets, et une fatigue qui s'installe. L'équipe, de son côté, attend les instructions au lieu de prendre des initiatives. Un cercle vicieux s'installe : plus le dirigeant intervient dans l'opérationnel, plus l'équipe se déresponsabilise, et plus il doit intervenir.

Les conséquences sont mesurables. La croissance ralentit parce que personne ne travaille sur le futur de l'entreprise. Les meilleurs éléments partent parce qu'ils n'ont pas d'autonomie. Le dirigeant s'épuise et prend des décisions de moins en moins bonnes par manque de recul. Le paradoxe : en voulant tout contrôler, on perd le contrôle.

Retrouver une posture de CEO stratège

La sortie du mode pompier passe par un changement de rôle. Le dirigeant doit passer de l'exécutant principal au pilote stratégique. Cela implique trois mouvements concrets.

D'abord, faire un audit honnête de son emploi du temps. Pendant une semaine, noter chaque tâche et la catégoriser : stratégique, opérationnelle, ou administrative. Dans la plupart des cas, moins de 20% du temps est consacré à des sujets stratégiques. L'objectif est d'inverser ce ratio.

Ensuite, identifier les 3-5 décisions qui ont le plus d'impact sur la croissance et se concentrer dessus. Le recrutement d'un directeur commercial, la refonte du process de vente, l'ouverture d'un nouveau marché. Ce sont ces décisions qui font la différence, pas la validation de la dernière facture fournisseur.

Enfin, construire un système qui permet à l'entreprise de fonctionner sans l'intervention permanente du dirigeant. Des process documentés, des personnes autonomes, des indicateurs clairs. L'entreprise doit pouvoir tourner si le dirigeant prend une semaine de vacances.

Le co-pilotage avec un Operating Partner

Un Operating Partner intervient aux côtés du dirigeant pour accélérer cette transformation. Son rôle n'est pas de remplacer le dirigeant, mais de l'aider à prendre du recul et à mettre en place les structures nécessaires.

L'OP commence par un diagnostic de la situation : où en est l'entreprise, quels sont les goulots d'étranglement, quelles sont les priorités. Il propose ensuite un plan d'action concret et accompagne sa mise en place, semaine après semaine.

L'avantage du co-pilotage, c'est que le dirigeant n'est plus seul face aux décisions difficiles. Il a un interlocuteur qui connaît les problématiques de croissance, qui a déjà vu d'autres entreprises traverser les mêmes phases, et qui peut challenger les idées sans enjeu politique interne.

Le résultat : un dirigeant qui retrouve de la clarté, une équipe qui gagne en autonomie, et une entreprise qui peut enfin passer à la vitesse supérieure.`,
    publishedAt: '2025-11-29T08:00:00.000Z',
  },
}

// ── Fonctions publiques ────────────────────────────────────────────────────────

export async function getPublishedResourceBySlug(slug: string): Promise<ResourceArticle | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticArticles[slug] ?? null
  }
  const data = await client.fetch(RESSOURCE_BY_SLUG_QUERY, { slug })
  if (data) return data as ResourceArticle
  return staticArticles[slug] ?? null
}

export async function getResourceSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return Object.keys(staticArticles)
  }
  const data = await client.fetch(RESSOURCE_SLUGS_QUERY)
  const sanitySlugs = data?.map((d: { slug: string }) => d.slug).filter(Boolean) ?? []
  return sanitySlugs.length ? sanitySlugs : Object.keys(staticArticles)
}
