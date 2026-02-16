# Page Ressources - L'écurie

## Description

Page de ressources et d'articles pour les dirigeants en phase de croissance. Inclut :
- Grille d'articles avec métadonnées
- Présentation de l'écurie HyperGrowth
- Affichage des équipes (OP et Experts)

## Localisation

```
/app/lecurie/ressources/page.tsx
```

## URL

```
https://hypergrowth.fr/lecurie/ressources
http://localhost:3000/lecurie/ressources (local)
```

## Composants utilisés

### Composants réutilisables
- `SectionBadge` : Badge avec icône pour les titres de section
- `ArticleCard` : Carte d'article avec image, métadonnées et CTA
- `TeamMemberCard` : Carte de membre d'équipe

### Hugeicons utilisés
- `ArrowRight01Icon` : Icône pour les CTA
- `Star01Icon` : Icône pour les badges

## Données

### Articles
Actuellement en dur dans le composant. Structure :

```typescript
{
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  slug: string
}
```

2 articles affichés initialement.

### Équipes
Killian Palermo et Ulysse El Sherbeeny.

## Images requises

| Image | Format | Statut |
|-------|--------|--------|
| `68dfda277a4f4332ebf28661_OP3.avif` | AVIF | ✓ Présent |
| `68f5ef368161d2b06039a184_Killian-carré.png` | PNG | ✗ À ajouter |
| `68f5ef6095b1b2eea9ac40f0_Ulysse-carré.png` | PNG | ✗ À ajouter |
| `68f5e45298cd778cac552b86_HPG_website_gradient-2.avif` | AVIF | ✗ À ajouter |

Chemin : `/public/images/`

## Responsivité

- **Mobile** : 1 colonne pour articles, stack vertical pour About
- **Tablet** : 2 colonnes pour articles
- **Desktop** : 4 colonnes pour les équipes

Breakpoints Tailwind utilisés : `md`, `lg`

## Performance

- Next.js `Image` component (lazy loading)
- Tailwind CSS (zero runtime)
- Code splitting potentiel (composants séparés)

Cible Lighthouse : > 90 sur toutes les métriques

## Sémantique HTML

- `<main>` : Contenu principal (implicite via sections)
- `<section>` : Divisions logiques (4 sections)
- `<h1>` : Titre principal
- `<h2>` : Sous-titres
- `<h3>` : Titres des cartes
- `<Link>` : Navigation interne
- `<Image>` : Optimisation images Next.js

## Accessibilité

- [ ] Vérifier contrast ratio (> 4.5:1)
- [ ] Tester keyboard navigation
- [ ] Valider avec screen reader
- [ ] WCAG 2.1 AA compliance

## Modifications futures

1. **Données dynamiques** : Intégrer avec CMS/DB
2. **Pagination** : Si > 10 articles
3. **Filtrage** : Par catégorie
4. **Recherche** : Barre de recherche
5. **Commentaires** : Système de discussion

## Tests

```bash
# Développement
npm run dev

# Type check
npm run type-check

# Build
npm run build
```

Accéder à : `http://localhost:3000/lecurie/ressources`

## Métadonnées

```
Title: "Ressources pour dirigeants | HyperGrowth"
Description: "Des articles concrets pour dirigeants en phase de croissance..."
```

À mettre à jour dans l'export `metadata`.

## Liens internes

- `/contact` : CTA "Démarrer votre projet"
- `/lecurie/a-propos` : Section About
- `/lecurie/les-op` : Découvrir les profils
- `/ressources/[slug]` : Articles individuels

## Conventions

- Kebab-case : noms de fichiers
- PascalCase : exports composants
- TypeScript : toutes les données
- Tailwind : styling uniquement
- Hugeicons : icônes uniquement

## Fichiers associés

- `/components/ui/section-badge.tsx`
- `/components/ui/article-card.tsx`
- `/components/ui/team-member-card.tsx`
- `RESSOURCES_CONVERSION.md` : Détails techniques
- `INTEGRATION_GUIDE.md` : Guide d'intégration

## Questions/Support

Consulter les fichiers de documentation avant modification.
