# Page Marion Werquin - Operating Partner

Cette page présente Marion Werquin, Operating Partner chez HyperGrowth.

## Structure

### Chemin
`/lecurie/les-op/marion-werquin/`

### Fichiers
- `page.tsx` : Composant principal de la page (Next.js 15, React 19, TypeScript)

## Fonctionnalités

### Sections
1. **Hero Section** : Portrait et informations principales
   - Image portrait en haute résolution (AVIF)
   - Titre, badge "Operating Partner"
   - Lien LinkedIn
   - Domaines d'expertise (4 tags)
   - Biographie complète en 4 paragraphes

2. **Autres Operating Partners** : Affichage des autres OP
   - Carte avec portrait et informations
   - Description et liens sociaux (LinkedIn, YouTube)
   - Effet de survol responsive

### Design
- **Framework** : Tailwind CSS v4
- **Icons** : Hugeicons React (ArrowRight01Icon)
- **Couleurs** : Palette du projet HyperGrowth
  - Background : `#0f0a1f`
  - Primary Purple : `#6d28d9`
  - Accent Pink : `#ec4899`
- **Composants** :
  - Glassmorphism personnalisé
  - Dégradés (gradient-dark, gradient-to-r)
  - Effets de survol et transitions

### Responsive
- Mobile first approach
- Breakpoints : `lg:` (1024px)
- Grille adaptative : `lg:grid-cols-[320px,1fr]` → full width sur mobile
- Padding : `px-6 lg:px-20`

### Accessibilité
- Métadonnées OpenGraph et Twitter
- Alt text sur les images
- Labels ARIA sur les liens sociaux
- Hiérarchie sémantique HTML correcte (h1 > h2)

### Métadonnées
```typescript
title: 'Manon Werquin – OP HyperGrowth'
description: 'Manon Werquin accompagne les dirigeants ambitieux...'
og:image: '/images/691d6cf72d819a8d8fb58687_manon-werquin.avif'
```

## Image Assets

### Téléchargée
- `691d6cf72d819a8d8fb58687_manon-werquin.avif` : Portrait Marion Werquin (10KB)

### Emplacement
`/public/images/`

## Composants utilisés

### De la page
- Next.js `Image` component (optimisation automatique)
- Next.js `Link` component (navigation)
- Hugeicons `ArrowRight01Icon`

### Classes Tailwind
- Spacing : `py-24`, `lg:py-32`, `px-6`, `lg:px-20`
- Grid : `grid`, `lg:grid-cols-[...]`, `grid-cols-[320px,1fr]`
- Border : `rounded-3xl`, `rounded-2xl`, `border`, `border-white/20`
- Effects : `hover:scale-105`, `hover:bg-white/20`, `group-hover:translate-x-1`
- Colors : `text-white`, `text-white/80`, `text-white/70`, `bg-white/10`
- Backdrop : `backdrop-blur-xl`, `backdrop-filter`

## Intégration

La page s'intègre dans la structure existante :
- Layout parent : `/app/layout.tsx` (Header + Footer automatiques)
- Navigation : Lien vers `/lecurie/les-op` (page liste des OP)
- Cohérence avec `/lecurie/les-op/page.tsx` (structure et design)

## Performance

- Images : Format AVIF + WebP (next.config.ts)
- Lazy loading : `loading="eager"` pour le portrait (priority)
- Code splitting : Dynamique via Next.js
- Bundle : Hugeicons tree-shakeable

## Compatibilité

- Next.js : 15.1.6+
- React : 19.0.0+
- TypeScript : 5.7.2+
- Tailwind : 4.0.0+
- Hugeicons : 0.4.0+

## Points d'amélioration possibles

1. Ajouter une animation d'apparition au chargement
2. Créer un composant réutilisable pour les cartes d'OP
3. Dynamiser la section "Autres Operating Partners" avec une requête CMS
4. Ajouter un formulaire de contact
5. Implémenter le suivi d'événements (analytics)
