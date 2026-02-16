# Marion Werquin Page - Component Guide

## Vue d'ensemble

Page dédiée au profil de Manon Werquin, Operating Partner chez HyperGrowth. Présente son parcours, expertise et connecte à l'écosystème d'autres OP.

## Structure des sections

### 1. Hero Section - `<section className="py-24 lg:py-32 bg-gradient-dark">`

**Contenu** :
- Grid 2 colonnes (desktop) : Portrait | Info Card
- Mobile : Stack vertical

**Composants enfants** :
- Image portrait (AVIF optimisé)
- Info Card avec glassmorphism
  - Badge "Operating Partner"
  - Titre h1
  - Social links (LinkedIn)
  - Tags d'expertise
  - Biographie (4 paragraphes)
  - CTA "Retour aux OP-X"

**Classes clés** :
```tsx
// Conteneur
bg-gradient-dark py-24 lg:py-32 max-w-[1440px] px-6 lg:px-20

// Grid
lg:grid-cols-[1fr,1.2fr] gap-12

// Portrait
aspect-square rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[600px]

// Info Card
glassmorphism rounded-3xl p-8 lg:p-12
```

---

### 2. Expertise Tags

**Rendu** :
```tsx
{expertiseAreas.map((area) => (
  <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
    {area}
  </div>
))}
```

**Styling** :
- Fond semi-transparent : `bg-white/10`
- Border blanc : `border border-white/10`
- Petit texte : `text-sm font-medium`
- Padding : `px-4 py-2`
- Border radius : `rounded-2xl`

---

### 3. Biography Section

**Structure** :
```tsx
<div className="prose prose-invert max-w-none mb-8 text-white/80">
  <p className="text-base leading-relaxed mb-4">...</p>
  // 4 paragraphes
</div>
```

**Classes** :
- Color override : `text-white/80`
- Line height : `leading-relaxed`
- Spacing : `mb-4` entre paragraphes
- Taille : `text-base` (cohérent avec body)

---

### 4. CTA Button - "Retour aux OP-X"

**Variantes** :
```tsx
// Hero Section - Primaire
<Link className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all group">
  <span className="text-xs uppercase tracking-wide">Retour aux OP-X</span>
  <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</Link>

// Section finale - Secondaire (gradient)
<Link className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all group shadow-lg hover:shadow-xl">
  <span className="text-sm uppercase tracking-wide font-bold">Voir toute l'équipe</span>
  <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
```

**Spécifications** :
- Padding : `px-6 py-3` (hero) ou `px-8 py-4` (secondaire)
- Border radius : `rounded-xl`
- Texte : `uppercase text-xs/sm tracking-wide font-semibold`
- Icon animation : `group-hover:translate-x-1`
- Transition : `transition-all` ou `transition-colors`

---

### 5. Other Operating Partners Section

**Grid de partenaires** :
```tsx
<div className="grid gap-8">
  {otherOperatingPartners.map((partner) => (
    <div className="glassmorphism rounded-3xl p-8 lg:p-12 group hover:bg-opacity-20 transition-all">
      <div className="grid lg:grid-cols-[320px,1fr] gap-8 lg:gap-12">
        {/* Portrait */}
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Info Card */}
        <div className="glassmorphism rounded-2xl p-8">...</div>
      </div>
    </div>
  ))}
</div>
```

**Hover effects** :
- Parent card : `hover:bg-opacity-20`
- Portrait image : `group-hover:scale-105 duration-500`
- Smooth transition : `transition-transform duration-500`

---

## Conventions de nommage

### Variables de données
```typescript
// Tableau d'expertise
const expertiseAreas = ['...', '...'] // string[]

// Tableau d'objets pour partenaires
const otherOperatingPartners = [
  {
    name: string
    role: string
    description: string
    image: string // filename sans /public/images/
    href: string
    linkedIn: string
    youtube: string
  }
]
```

### Classes Tailwind - Hiérarchie

```
Conteneur principal
└── Section
    ├── Container (max-w-[1440px] mx-auto px-6 lg:px-20)
    └── Grid/Content
        ├── Card (glassmorphism rounded-3xl p-8 lg:p-12)
        ├── Image (aspect-square rounded-2xl)
        └── Text (text-white/80 text-base leading-relaxed)
```

---

## Responsive Breakpoints

| Breakpoint | Valeur | Usage |
|-----------|--------|-------|
| Mobile | < 768px | Single column, reduced padding |
| Tablet | 768px - 1024px | Transition |
| Desktop | 1024px+ | Multi-column layouts |

### Points clés

```tsx
// Hero grid
lg:grid-cols-[1fr,1.2fr]  // 2 colonnes desktop
// Défaut : stack vertical

// Info card padding
p-8 lg:p-12  // 32px → 48px

// Typography
text-3xl lg:text-4xl  // 30px → 36px
text-5xl lg:text-6xl  // 48px → 60px

// Container padding
px-6 lg:px-20  // 24px → 80px
```

---

## Palette de couleurs

| Rôle | Couleur | Token |
|------|---------|-------|
| Fond principal | #0f0a1f | `bg-[#0f0a1f]` |
| Gradient accent | #6d28d9 → #8b5cf6 | `from-purple-600 to-pink-600` |
| Texte principal | #ffffff | `text-white` |
| Texte secondaire | rgba(255,255,255,0.8) | `text-white/80` |
| Texte tertiaire | rgba(255,255,255,0.6) | `text-white/60` |
| Border léger | rgba(255,255,255,0.1) | `border-white/10` |
| Glassmorphism bg | rgba(24,10,34,0.8) | Class CSS custom |

---

## Accessibilité

### ARIA Labels
```tsx
<a aria-label="LinkedIn">...</a>
<a aria-label="YouTube">...</a>
```

### Métadonnées
```typescript
export const metadata: Metadata = {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    images: [{ url, width, height, alt }]
    type: 'website'
  }
  twitter: {
    card: 'summary_large_image'
    title: string
    description: string
    images: string[]
  }
}
```

### Image Alt Text
```tsx
<Image alt="Portrait of Manon Werquin, Operating Partner" />
```

---

## Performance Checklist

- [ ] Images au format AVIF
- [ ] Priority flag sur LCP image (main portrait)
- [ ] Lazy loading par défaut (autres images)
- [ ] Aucune dépendance externe non-essentielles
- [ ] CSS via Tailwind uniquement
- [ ] Bundle size < 50KB (component code)
- [ ] Zero JavaScript pour le rendu initial

---

## Points d'extension

### 1. Ajouter un composant réutilisable

```typescript
// components/ui/expertise-tag.tsx
export function ExpertiseTag({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-sm font-medium text-white">
      {label}
    </div>
  )
}
```

### 2. Extraire les données dans un fichier séparé

```typescript
// data/operating-partners.ts
export const operatingPartners = [...]
```

### 3. Créer un composant Operating Partner Card

```typescript
// components/operating-partner-card.tsx
export function OperatingPartnerCard({ partner }: Props) {
  return (...)
}
```

---

## Fichiers liés

- Image : `/public/images/691d6cf72d819a8d8fb58687_manon-werquin.avif`
- Parent page : `/lecurie/les-op/page.tsx`
- Global styles : `/app/globals.css`
- Layout : `/app/layout.tsx`
