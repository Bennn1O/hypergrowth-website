# Guide d'extension : Ajouter des études de cas

Ce guide explique comment ajouter de nouvelles études de cas à la page `/concept/case-studies`.

## Prérequis

- Les images optimisées (AVIF recommandé) en `/public/images/case-studies/`
- Les URLs LinkedIn des fondateurs
- L'URL du site web de l'entreprise

## Étapes

### 1. Préparer l'image

Enregistrer l'image dans `/public/images/case-studies/` avec le format:
```
[slug-du-projet]-case-study.avif
```

Par exemple: `nom-client-case-study.avif`

### 2. Ajouter l'étude de cas à la configuration

Éditer `/lib/case-studies.ts` et ajouter un nouvel objet à l'array `caseStudies`:

```typescript
export const caseStudies: CaseStudy[] = [
  {
    id: 'pureva',
    slug: 'etude-de-cas-pureva',
    title: 'Pureva',
    description: 'Structuration et scaling d\'une plateforme innovante.',
    image: '/images/case-studies/pureva-case-study.avif',
    imageAlt: 'Cas d\'étude Pureva',
    linkedinName: 'Adrien Charles-Nicolas & Vincent Mongis',
    linkedinUrl: 'https://www.linkedin.com/in/adrien-charles-nicolas-b819b6157/',
    companyUrl: 'https://pureva.com',
  },

  // Ajouter ici:
  {
    id: 'nouveau-client',
    slug: 'etude-de-cas-nouveau-client',
    title: 'Nom du Client',
    description: 'Description courte de ce que vous avez réalisé.',
    image: '/images/case-studies/nouveau-client-case-study.avif',
    imageAlt: 'Description de l\'image pour l\'accessibilité',
    linkedinName: 'Prénom Nom des Fondateurs',
    linkedinUrl: 'https://www.linkedin.com/in/fondateur/',
    companyUrl: 'https://www.website-du-client.com',
  },
];
```

### 3. Propriétés requises

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `id` | string | Identifiant unique | `'nouveau-client'` |
| `slug` | string | URL-friendly pour page détail | `'etude-de-cas-nouveau-client'` |
| `title` | string | Nom de l'entreprise | `'Nouveau Client'` |
| `description` | string | Description courte (1 phrase) | `'Stratégie de croissance et structuration'` |
| `image` | string | Chemin vers l'image | `'/images/case-studies/...'` |
| `imageAlt` | string | Texte alternatif (accessibilité) | `'Cas d\'étude Nouveau Client'` |
| `linkedinName` | string | Noms des fondateurs | `'Jean Dupont & Marie Martin'` |
| `linkedinUrl` | string | URL du profil LinkedIn | `'https://linkedin.com/in/...'` |
| `companyUrl` | string | Site web de l'entreprise | `'https://nouveauclient.com'` |

### 4. Vérifier et tester

1. Assurez-vous que l'image existe dans `/public/images/case-studies/`
2. Vérifiez que les URLs LinkedIn et site web sont valides
3. Testez localement:
   ```bash
   npm run dev
   # Accéder à http://localhost:3000/concept/case-studies
   ```

## Exemple complet

### Étape 1: Ajouter l'image
```
public/images/case-studies/techstartup-case-study.avif
```

### Étape 2: Ajouter à `lib/case-studies.ts`
```typescript
{
  id: 'techstartup',
  slug: 'etude-de-cas-techstartup',
  title: 'TechStartup',
  description: 'Scaling international et automatisation des processus d\'un SaaS B2B.',
  image: '/images/case-studies/techstartup-case-study.avif',
  imageAlt: 'Cas d\'étude TechStartup SaaS',
  linkedinName: 'Alex Chen & Sarah Williams',
  linkedinUrl: 'https://www.linkedin.com/in/alexchen/',
  companyUrl: 'https://techstartup.com',
}
```

### Étape 3: Vérifier
- L'image s'affiche correctement
- Les liens LinkedIn pointent vers les bons profils
- L'hover effect fonctionne sur la carte

## Notes importantes

### Accessibilité
- `imageAlt` doit décrire l'image de manière significative
- Exemple bon: `'Cas d\'étude : scaling SaaS de TechStartup'`
- Exemple mauvais: `'Image'` ou `'Photo'`

### Performance
- Les images AVIF sont automatiquement optimisées par Next.js
- Next.js génère automatiquement les formats modernes et de fallback

### Responsive Design
- Les cartes s'adaptent automatiquement au mobile (flex-col)
- Pas besoin de styles spécifiques supplémentaires

## Avenir : Page détail

Pour créer une page détail `/case-studies/[slug]/page.tsx`:

```typescript
// app/case-studies/[slug]/page.tsx
import { caseStudies } from '@/lib/case-studies';
import { notFound } from 'next/navigation';

interface Params {
  slug: string;
}

export default function CaseStudyDetailPage({ params }: { params: Params }) {
  const caseStudy = caseStudies.find(cs => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main>
      <h1>{caseStudy.title}</h1>
      {/* Plus de détails... */}
    </main>
  );
}
```

## Maintenance

- Les images doivent être nommées de manière cohérente
- Mettre à jour l'array `caseStudies` dès l'ajout d'une nouvelle étude
- Supprimer l'image quand l'étude de cas est retirée
- Vérifier les liens une fois par mois

## Troubleshooting

**L'image ne s'affiche pas:**
- Vérifier que le chemin dans `image` correspond au fichier réel
- Vérifier les permissions du fichier
- Vérifier que Next.js a redémarré après l'ajout de l'image

**Les liens LinkedIn ne fonctionnent pas:**
- Vérifier que l'URL commence par `https://`
- Vérifier que le profil est public

**La carte ne s'affiche pas:**
- Vérifier que l'objet dans `caseStudies` a toutes les propriétés requises
- Vérifier la console du navigateur pour les erreurs
