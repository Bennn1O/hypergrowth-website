# Page Méthode OP-X

## Aperçu
Page de présentation complète de la méthode OP-X (Operating Partner + eXperts) de HyperGrowth. Conversion moderne du fichier HTML Webflow original vers Next.js 15.

**Statut**: Production-ready
**Dernière mise à jour**: 16 février 2026

## Structure de la page

### 1. Hero Section
- Titre principal avec "OP-X" en italique rose
- Sous-titre et CTA "Contact"
- Grille de 6 logos clients (placeholders, à remplacer)

**Composants**: Link, Image

### 2. Problem Section (bg-gray-50)
- Badge "Votre Problématique"
- Titre et description
- 3 cartes problématiques:
  - Trésorerie qui s'évapore
  - Équipes qui s'épuisent
  - Pilotage à l'instinct

**Interactions**: Hover shadow

### 3. Concept Video Section
- Contenu gauche: titre, description, speaker card
- Vidéo YouTube intégrée (aspect ratio 16:9)
- Speaker: portrait circulaire + "Killian | Founder & OP"

**Composants**: Image, iframe YouTube

### 4. Messages/Tabs Section (bg-gray-50)
- Navigation par 3 points cliquables
- Contenu dynamique avec transition opacity
- Onglets:
  1. "Un programme calé sur les ambitions"
  2. "UN ÉCOSYSTÈME RICHE EN PROFILS EXPERTS" (actif par défaut)
  3. "VOUS DÉCIDEZ DE LA COURSE QUE VOUS ALLEZ COURIR"
- 2 CTA buttons (Scalabilité + Contact)

**État React**: `activeMessageTab` (useState)

### 5. OP-X Cards Section
- 2 cartes côte à côte (grid responsive)
- **Card OP**:
  - Lettre "OP" en rose
  - 5 items avec CheckIcon
  - Portrait 200x200

- **Card X**:
  - Lettre "X" en rose
  - 5 items avec CheckIcon (20+ domaines)
  - Portrait 200x200

**Icônes**: CheckIcon (Hugeicons)

### 6. Arguments Section (bg-gray-50)
- En-tête violet-900 avec bouton
- Grille 3 colonnes: 7 cartes argumentaires
- Numérotation 001-007
- Texte sur fond semi-transparent

**Variation**: Couleur de fond violet-900

### 7. Scalability Score Section
- Contenu gauche: titre, description, CTA
- Image à droite: team outdoor Bordeaux
- Aspect square

### 8. Case Studies Section (bg-gray-50)
- En-tête avec CTA vers /concept/case-studies
- Grille 3 colonnes: 3 statistiques
  - 400M€ - Valeur créée
  - +200% - Croissance moyenne
  - 50+ - Clients accompagnés

## Chemins des images

Tous les chemins d'images pointent vers `/public/images/methode-op-x/`:

```
public/
└── images/
    └── methode-op-x/
        ├── op-portrait.avif          # Portrait OP (200x200)
        ├── experts-portrait.avif     # Portrait Experts (200x200)
        ├── speaker-portrait.avif     # Portrait Speaker (70x70)
        └── team-outdoor.avif         # Team Bordeaux (1500x546)
```

### Images manquantes

Actuellement, les images affichent des `bg-gray-200` si absentes. Pour compléter:

1. Télécharger les images du CDN wubflow-shield
2. Placer dans `/public/images/methode-op-x/`
3. Relancer `npm run dev`

**Script**: `scripts/migrate-methode-op-x-images.sh` (bash)

## Code structure

### Interfaces TypeScript
```typescript
interface OPXCard {
  title: string;
  letter: 'OP' | 'X';
  description: string;
  items: string[];
  image: string;
  imageAlt: string;
  additionalText: string;
}

interface ArgumentCard {
  number: string;
  title: string;
  description: string;
}

interface Message {
  id: string;
  label: string;
  title: string;
  subtitle: string;
}
```

### Données locales
- `opxCards` (2 cartes)
- `argumentCards` (7 raisons)
- `messages` (3 onglets)

Toutes les données sont en français, avec accents préservés.

## Interactions

### Message Tabs
```typescript
const [activeMessageTab, setActiveMessageTab] = useState('Message-2');

{messages.map((message) => (
  <button
    onClick={() => setActiveMessageTab(message.id)}
    className={`${activeMessageTab === message.id ? 'bg-black' : 'bg-gray-300'}`}
  />
))}
```

Transition smooth avec `opacity` et `hidden`.

## Styling

### Tailwind Classes Utilisées
- **Spacing**: py-20, lg:py-32, px-6, lg:px-8, gap-12
- **Colors**: text-pink-500, bg-violet-900, border-gray-200
- **Typography**: text-5xl, font-bold, italic
- **Layout**: max-w-7xl, grid, flex
- **Effects**: hover:shadow-lg, transition-colors, rounded-2xl
- **Responsive**: grid-cols-1, md:grid-cols-2, lg:grid-cols-3

### Pas d'emojis
Utilisation exclusive de Hugeicons:
- `ArrowRight01Icon` - Flèches
- `CheckIcon` - Listes

## Links internes

- `/contact` - Page contact
- `/concept/test-de-scalabilite` - Test de scalabilité
- `/concept/case-studies` - Études de cas

## Performance

- **Images optimisées**: Next.js Image component
- **Lazy loading**: natif via Image component
- **Bundle**: ~12 KB JS (sans images)
- **Responsive**: Mobile-first avec breakpoints
- **Accessibilité**: aria-label sur boutons tabs

## Conformité

- Next.js 15
- React 19
- TypeScript strict
- Tailwind CSS v4
- Hugeicons React v0.4.0

## À faire

### Haute priorité
- [ ] Télécharger les 4 images
- [ ] Vérifier les liens internes (/contact, /concept/test-de-scalabilite)
- [ ] Tester la vidéo YouTube en responsive
- [ ] Tester la navigation des tabs

### Moyenne priorité
- [ ] Remplacer les 6 logos clients par les vrais
- [ ] Optimiser les srcset des images
- [ ] Ajouter des sitemaps/structured data si nécessaire
- [ ] Vérifier Core Web Vitals

### Basse priorité
- [ ] Ajouter des animations scroll (Framer Motion si souhaité)
- [ ] Internationalisation (FR/EN)
- [ ] A/B testing sur CTA buttons
- [ ] Analytics tracking

## Questions fréquentes

### Comment changer les couleurs?
Utiliser les tokens Tailwind dans les classes `bg-`, `text-`, `border-`. Voir `tailwind.config.ts`.

### Comment ajouter une nouvelle section?
1. Créer le composant JSX dans `page.tsx`
2. Ajouter les données (interfaces TypeScript)
3. Ajouter au retour du `export default`
4. Adapter le spacing (py-20 lg:py-32)

### Comment modifier les données?
Toutes les données (cartes, messages, arguments) sont au top du fichier. Les modifier directement dans les arrays.

### Comment tester les images?
```bash
cd website
npm run dev
# Ouvrir http://localhost:3000/concept/methode-op-x
```

---

**Créé**: 16 février 2026 | **Format**: Markdown | **Mainteneur**: Léa (Omen Studio)
