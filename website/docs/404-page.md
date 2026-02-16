# Page 404 - Documentation

Conversion de la page 404 Webflow vers Next.js 15 + React 19 + TypeScript + Tailwind CSS v4.

## Fichiers

### 1. `/app/not-found.tsx`
La page 404 principal de l'application Next.js. Fichier spécial reconnu automatiquement par Next.js pour les routes non trouvées.

**Fonctionnalités :**
- Affichage du numéro 404 avec typographie Instrument
- Message d'erreur personnalisé
- Boutons d'action CTA
- Intégration Spline 3D
- Section d'aide avec liens internes
- Navbar navigation
- Footer branded

**Palette couleurs :**
- Fond : `#180a22` (Nitro Night)
- Accent primaire : `#803fab` (Velocity Violet)
- Accent secondaire : `#f285f0` (Orchid)
- Texte neutre : `#cfcfcf` (Silver Circuit)
- Gris : `#414141` (Stealth Carbon)

### 2. `/app/components/not-found-section.tsx`
Composant réutilisable pour afficher une section 404 n'importe où dans l'app.

**Props :**
```typescript
interface NotFoundSectionProps {
  title?: string;                          // Titre personnalisé
  description?: string;                    // Description personnalisée
  primaryAction?: { label: string; href: string };    // Bouton primaire
  secondaryAction?: { label: string; href: string };  // Bouton secondaire
  showHelp?: boolean;                      // Afficher la section aide
  children?: ReactNode;                    // Contenu additionnel
  customVisual?: ReactNode;                // Élément visuel personnalisé
}
```

**Utilisation :**
```tsx
import { NotFoundSection } from '@/app/components/not-found-section';

export default function CustomNotFound() {
  return (
    <NotFoundSection
      title="Ressource non trouvée"
      description="La ressource que vous cherchez n'est pas disponible."
      showHelp={true}
    />
  );
}
```

### 3. `/app/components/spline-viewer.tsx`
Composant pour afficher les scènes Spline 3D de manière optimisée.

**Composants :**

#### `SplineViewer`
Composant base pour charger Spline dynamiquement.

```typescript
interface SplineViewerProps {
  splineUrl: string;              // URL de la scène Spline
  className?: string;             // Classes Tailwind
  fallback?: React.ReactNode;     // Affichage en cas d'erreur
}
```

**Utilisation :**
```tsx
import { SplineViewer } from '@/app/components/spline-viewer';

export default function Scene() {
  return (
    <SplineViewer
      splineUrl="https://prod.spline.design/YOUR-ID/scene.splinecode"
      className="h-96 md:h-full"
    />
  );
}
```

#### `SplineCanvas`
Wrapper pour compatibilité avec canvas HTML (legacy).

```tsx
<SplineCanvas
  splineUrl="https://prod.spline.design/YOUR-ID/scene.splinecode"
  className="h-96"
/>
```

## Architecture

### Mise en page
```
not-found.tsx
├── Navbar (navigation sticky)
├── Main content
│   └── NotFoundSection
│       ├── Left: 404 Number + Title + Description + CTA
│       └── Right: Spline 3D Canvas
├── Help section (avec liens)
└── Footer
```

### Responsive
- **Mobile** : Layout stacked, typographie adaptée
- **Tablet** : Grid 2 colonnes commence à md
- **Desktop** : Full width optimisé

### Accessibilité
- Sémantique HTML appropriée
- ARIA labels sur les liens de navigation
- Contraste de couleur suffisant
- Navigation accessible au clavier
- Structure heading cohérente (h1 > h2)

## Icônes

Utilisation de **Hugeicons React** :
```tsx
import { ArrowRight01Icon } from 'hugeicons-react';

<ArrowRight01Icon size={20} variant="Linear" />
```

Variants disponibles :
- `Bold` : Ligne épaisse
- `Linear` : Ligne simple
- `Outline` : Contour

## Variables de couleur

À configurer dans `tailwind.config.ts` :
```typescript
colors: {
  'hypergrowth': {
    'night': '#180a22',      // bg principal
    'violet': '#803fab',     // accent primaire
    'orchid': '#f285f0',     // accent secondaire
    'metal': '#737373',      // gris moyen
    'silver': '#cfcfcf',     // gris clair
    'carbon': '#414141',     // gris foncé
  }
}
```

Puis utilisation : `bg-hypergrowth-night` au lieu de `bg-[#180a22]`

## Typographie

Polices utilisées :
- **Archivo** : Body text, main
- **Instrument** : Headings, accents (includes Italic variant)

Poids disponibles :
- 100 : Light (Instrument Regular)
- 300 : Light
- 400 : Regular
- 700 : Bold

## Performance

### Optimisations
- LazyLoad des images (si présentes)
- Chargement dynamique du script Spline
- Pas de CSS bloqueant
- Critical CSS inline (via Tailwind)
- Composants "use client" où nécessaire

### Métriques cibles
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## États

### Spline Viewer
- **Loading** : Spinner animé + message
- **Loaded** : Scene affichée
- **Error** : Message d'erreur + fallback

### Boutons
- **Default** : Violet fond, white texte
- **Hover** : Night fond, Orchid texte
- **Secondary** : Transparent fond, silver border-bottom

## Intégration avec Next.js

### Structure Next.js 15
```
app/
├── not-found.tsx              # Page 404 spéciale
├── layout.tsx                 # Layout racine
├── page.tsx                   # Page d'accueil
└── components/
    ├── not-found-section.tsx  # Composant réutilisable
    └── spline-viewer.tsx      # Composant Spline
```

### Export
La page 404 est automatiquement utilisée pour les routes non trouvées grâce au naming convention Next.js.

Pas besoin de configuration spéciale.

## Migration depuis Webflow

### Points convertis
- Canvas Spline remplacé par `SplineCanvas`
- Navigation navbar migré vers composant Link
- Styles Webflow convertis en Tailwind CSS
- Palettes de couleurs préservées
- Responsive design responsive mobile-first

### Éléments supprimés
- Scripts Webflow (jQuery, Webflow JS)
- Webflow CMS
- Meta tags SEO (à configurer dans layout.tsx)
- Google Analytics, Facebook Pixel (à configurer)

### À ajouter
- Meta tags dans `layout.tsx`
- Analytics (GA4, Hotjar, etc.)
- A/B testing si nécessaire
- Form handling pour contact

## Tests

### Unit Tests
```typescript
// Exemple : tester le composant NotFoundSection
import { render, screen } from '@testing-library/react';
import { NotFoundSection } from '@/app/components/not-found-section';

describe('NotFoundSection', () => {
  it('displays 404 number', () => {
    render(<NotFoundSection />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('shows custom title', () => {
    render(<NotFoundSection title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
```

### Visual Tests
- Vérifier responsive sur mobile, tablet, desktop
- Tester l'animation Spline sur différents navigateurs
- Vérifier les transitions au hover

## Dépendances

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "hugeicons-react": "^latest"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Ressources externes

- [Spline Design](https://spline.design/)
- [Hugeicons Library](https://hugeicons.com/)
- [Next.js Special Files](https://nextjs.org/docs/app/api-reference/file-conventions)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## Support Spline

La scène 3D utilisée : `https://prod.spline.design/LPJMuZUqQ2mfwrP5/scene.splinecode`

À remplacer par votre propre URL Spline si modification nécessaire.

## Notes

- Cette implémentation préserve le design original Webflow
- Les couleurs sont hardcodées pour l'instant (préférer les CSS vars)
- Le footer est un placeholder minimaliste
- La navbar partage le même style que le reste du site (à adapter selon besoins)
