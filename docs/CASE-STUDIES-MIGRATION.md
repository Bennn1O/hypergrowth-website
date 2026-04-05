# Migration du HTML Case Studies vers Next.js

## Vue d'ensemble

Ce document décrit la conversion de la page `/concept/case-studies` du fichier HTML Webflow vers une page Next.js 15 moderne avec React 19 et Tailwind CSS v4.

## Structure des fichiers

### Page principale
- **`/app/concept/case-studies/page.tsx`** - Page principale des études de cas

### Composants réutilisables
- **`/components/sections/case-study-card.tsx`** - Carte individuelle d'étude de cas
- **`/components/sections/client-logos-grid.tsx`** - Grille responsive des logos des clients

### Données et configuration
- **`/lib/case-studies.ts`** - Configuration centralisée des données des cas clients

### Layout
- **`/app/concept/layout.tsx`** - Layout pour la section "Concept"

## Détails de la conversion

### 1. Métadonnées (Metadata)
Conversion des open graph et twitter cards de Webflow vers Next.js `Metadata` API :
```typescript
export const metadata: Metadata = {
  title: 'Cas clients : structurer pour scale sans chaos | HyperGrowth',
  description: '...',
  openGraph: { /* ... */ },
  twitter: { /* ... */ }
}
```

### 2. Structure des composants
- **Hero Section** : Présentation avec badge "Le Concept", titre et CTA
- **Logos Slider** : Grille responsive des logos clients (14 logos)
- **Case Studies Grid** : Liste des études de cas avec images, noms d'entreprises et liens LinkedIn
- **Scalability Section** : Appel à tester la scalabilité du projet
- **Method Section** : Présentation du modèle OP-X avec cartes Operating Partner et Experts

### 3. Stack utilisé
- **Next.js 15** : Framework React moderne avec App Router
- **React 19** : Hooks et composants fonctionnels
- **Tailwind CSS v4** : Utility-first CSS framework
- **TypeScript** : Typage statique
- **Hugeicons React** : Icône ArrowRight01Icon

### 4. Images
Tous les chemins d'images pointent vers `/public/images/` :
- `/images/case-studies/pureva-case-study.avif`
- `/images/logos/logo-*.avif`
- `/images/portraits/operating-partner.avif`
- `/images/portraits/experts.avif`
- `/images/score-section-image.avif`
- `/images/icons/linkedin.svg`

## Architecture des données

### CaseStudy Interface
```typescript
interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkedinName: string;
  linkedinUrl: string;
  companyUrl: string;
}
```

### ClientLogo Interface
```typescript
interface ClientLogo {
  src: string;
  alt: string;
  width: number;
}
```

## Classe Tailwind personnalisées

Les classes suivantes du HTML original ont été converties en Tailwind :
- `.bulle` → `inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-700`
- Spacing et sizing avec Tailwind responsive (md:)

## Performance et accessibilité

### Optimisations
- `loading="lazy"` sur toutes les images
- `Image` component de Next.js pour optimisation automatique
- Typographie sémantique et structure HTML appropriée
- Classes ARIA et `role` attributes conservés

### Accessibilité
- Textes alt explicites sur toutes les images
- Liens avec `target="_blank"` et `rel="noopener noreferrer"`
- Structure heading hiérarchisée

## Ajout de nouveaux cas clients

### 1. Ajouter à `/lib/case-studies.ts`
```typescript
const caseStudies: CaseStudy[] = [
  // ... cases existantes
  {
    id: 'nouveau-client',
    slug: 'etude-de-cas-nouveau-client',
    title: 'Nom du client',
    description: 'Description courte',
    image: '/images/case-studies/nouveau-client-case-study.avif',
    imageAlt: 'Alt text approprié',
    linkedinName: 'Nom des fondateurs',
    linkedinUrl: 'https://linkedin.com/...',
    companyUrl: 'https://company.com',
  },
];
```

### 2. Télécharger l'image
Ajouter l'image dans `/public/images/case-studies/`

### 3. L'image apparaîtra automatiquement
La page utilise la source centralisée de données

## Responsive Design

La page utilise les breakpoints Tailwind standard :
- Mobile first (< 768px)
- `md:` pour tablette et desktop (≥ 768px)
- Grille responsive pour logos (grid-cols-3)

## Navigation et routing

### Routes associées
- `/concept` - Section concept (parent)
- `/concept/case-studies` - Études de cas
- `/case-studies/[slug]` - Page détail d'une étude de cas (à implémenter)
- `/contact` - Page contact
- `/concept/test-de-scalabilite` - Test de scalabilité
- `/concept/methode-op-x` - Méthode OP-X

## À faire

- [ ] Créer les images dans `/public/images/`
- [ ] Implémenter la page détail `/case-studies/[slug]/page.tsx`
- [ ] Ajouter plus d'études de cas au fichier `case-studies.ts`
- [ ] Tester la performance avec Lighthouse
- [ ] Vérifier l'accessibilité complète
