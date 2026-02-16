# Marion Werquin Page - Guide d'utilisation

## Accès et navigation

### URLs
- **Production** : `https://hypergrowth.fr/lecurie/les-op/marion-werquin`
- **Développement** : `http://localhost:3000/lecurie/les-op/marion-werquin`

### Navigation interne
- **Depuis la liste des OP** : `/lecurie/les-op` (boutons vers profils individuels)
- **Vers le menu principal** : Navigation globale (Header)
- **Retour à la liste** : Bouton "Retour aux OP-X" ou CTA "Voir toute l'équipe"

---

## Modification du contenu

### Changer le nom ou le rôle

Fichier : `page.tsx`

```typescript
// Rechercher la section Hero et modifier :
<h1 className="text-5xl lg:text-6xl font-bold text-white mb-2">
  Manon Werquin  {/* ← Changer ici */}
</h1>
```

### Ajouter/modifier les domaines d'expertise

Fichier : `page.tsx`, ligne ~24-29

```typescript
const expertiseAreas = [
  'Stratégie Marketing & Vente',
  'Diagnostic de Scalabilité',
  'Structuration d\'entreprise',
  'Lead Generation',
  // Ajouter une nouvelle ligne ici
]
```

### Modifier la biographie

Fichier : `page.tsx`, section "Bio" (~ligne 160-190)

```typescript
<div className="prose prose-invert max-w-none mb-8 text-white/80">
  <p className="text-base leading-relaxed mb-4">
    {/* Éditer le texte ici - respecter le format <p> pour chaque paragraphe */}
  </p>
</div>
```

### Changer le lien LinkedIn

Fichier : `page.tsx`, sections Hero ou Social Links

```typescript
// Hero Section (~ligne 95)
<a
  href="https://www.linkedin.com/in/manon-werquin/"  {/* ← URL ici */}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
```

### Modifier l'image portrait

Fichier : `page.tsx`, section Hero (~ligne 65)

```typescript
<Image
  src="/images/691d6cf72d819a8d8fb58687_manon-werquin.avif"  {/* ← Chemin image */}
  alt="Portrait of Manon Werquin, Operating Partner"
  fill
  className="object-cover"
  priority
/>
```

Pour changer :
1. Télécharger l'image dans `/public/images/`
2. Remplacer le chemin ci-dessus
3. Respecter le format AVIF ou WebP pour performance

---

## Modification du design

### Espacement et layout

Fichier : `page.tsx`

```tsx
// Padding vertical des sections
<section className="py-24 lg:py-32">  {/* ← 24 (96px) mobile, 32 (128px) desktop */}

// Padding horizontal du conteneur
<div className="px-6 lg:px-20">  {/* ← 24px mobile, 80px desktop */}

// Gap entre colonnes
<div className="grid lg:grid-cols-[1fr,1.2fr] gap-12">  {/* ← 48px gap */}
```

### Couleurs

Fichier : `globals.css` (themes) ou className directs

```typescript
// Fond dégradé des sections
bg-gradient-dark  // Dégradé défini dans globals.css

// Fond gris-bleu
bg-[#0f0a1f]  // Couleur spécifique

// Glassmorphism
glassmorphism  // Classe custom (globals.css)

// Gradient bouton
from-purple-600 to-pink-600
hover:from-purple-700 hover:to-pink-700
```

### Typography

```typescript
// Titres principaux
text-5xl lg:text-6xl font-bold

// Titres secondaires
text-3xl lg:text-4xl font-bold

// Corps de texte
text-base leading-relaxed

// Petit texte (badges, labels)
text-xs font-semibold uppercase tracking-wide
```

### Border radius

```typescript
rounded-3xl   // Grandes cartes (48px)
rounded-2xl   // Cartes moyennes (32px)
rounded-xl    // Petits éléments (12px)
rounded-full  // Cercles (social icons)
```

---

## Ajouter une section

### Modèle de section

```typescript
<section className="py-24 lg:py-32 bg-gradient-dark">
  <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
    {/* Contenu ici */}
  </div>
</section>
```

### Exemple : Ajouter une section "Méthodologie"

```typescript
// Dans page.tsx, après la section "Hero"

<section className="py-24 lg:py-32 bg-[#0f0a1f]">
  <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
    <div className="mb-20">
      <h2 className="text-5xl lg:text-6xl font-bold text-white">
        Méthodologie
      </h2>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cartes méthodologie */}
    </div>
  </div>
</section>
```

---

## Ajouter/modifier les autres Operating Partners

Fichier : `page.tsx`, ligne ~48-58

```typescript
const otherOperatingPartners = [
  {
    name: 'Ulysse L. Sher',
    role: 'Operating Partner',
    description: '...',
    image: '691a9c6ffd17d3b642956b6f_Profil.avif',  // Chemin dans /public/images/
    href: '#',
    linkedIn: 'https://www.linkedin.com/in/...',
    youtube: 'https://www.youtube.com/@...',
  },
  // Ajouter un nouveau partenaire ici
  {
    name: 'Nouveau Nom',
    role: 'Rôle',
    description: 'Description...',
    image: 'filename-image.avif',
    href: '/',
    linkedIn: 'https://linkedin.com/...',
    youtube: null,  // ou 'https://youtube.com/...'
  },
]
```

---

## Maintenance des images

### Télécharger une nouvelle image

```bash
# 1. Placer l'image dans /public/images/
# Format recommandé : AVIF (meilleure compression)

# 2. Nommer selon convention
{brand}-{type}-{format}@{density}.avif
# Exemple : hypergrowth-portrait-manon@2x.avif

# 3. Vérifier la taille
du -h /public/images/filename.avif
```

### Optimisation d'images

Utiliser un outil en ligne :
- https://squoosh.app (Google)
- https://convertio.co/ (conversion format)
- https://imagecompressor.com (compression)

Spécifications recommandées :
- Format : AVIF ou WebP
- Max width : 1000px (pour portraits)
- Taille : < 15 KB (compressée)
- Alt text descriptif

---

## Tests et vérification

### Avant le déploiement

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Tests
npm test -- page.test.tsx

# 4. Linting
npm run lint
```

### Vérification visuelle

- [ ] Page charge correctement
- [ ] Images visibles (pas d'erreur 404)
- [ ] Liens fonctionnels
- [ ] Design responsive (mobile, tablet, desktop)
- [ ] Métadonnées visibles (inspecter le head)
- [ ] Pas d'erreurs console

---

## Debugging

### Images non chargées

```
Erreur : Image 404 ou "not found"

Vérifier :
1. Le fichier existe dans /public/images/
2. Le chemin est exact (case-sensitive)
3. Pas d'espaces ou caractères spéciaux dans le nom
4. Format supporté (AVIF, WebP, PNG, JPEG)
```

### Métadonnées manquantes

```
Erreur : Open Graph image non reconnu

Vérifier :
1. metadata export est présent
2. openGraph.images est un tableau
3. URL image est absolue (/images/...)
4. Alt text fourni
```

### Styles incohérents

```
Erreur : Classes Tailwind non appliquées

Vérifier :
1. next.config.ts inclut les chemins template
2. globals.css importe @import "tailwindcss"
3. Classe n'est pas "dinamic" (générée à l'exécution)
4. Pas de conflits CSS
```

---

## Performance monitoring

### Local development

```bash
# Démarrer le serveur dev
npm run dev

# Ouvrir DevTools (F12)
# Onglet Performance : recorder une session
# Onglet Lighthouse : générer un rapport
```

### Production monitoring

Intégrer avec :
- Vercel Analytics (si deployed sur Vercel)
- Google Analytics 4
- Sentry (pour les erreurs)

---

## Intégration CMS future

Pour rendre le contenu dynamique :

```typescript
// Au lieu de const expertiseAreas = [...]
// Utiliser une requête de données

async function getOperatingPartner(slug: string) {
  const response = await fetch(`/api/operating-partners/${slug}`)
  return response.json()
}

// Puis dans le composant
const partner = await getOperatingPartner('marion-werquin')
```

### Structure de données recommandée

```json
{
  "id": "marion-werquin",
  "name": "Manon Werquin",
  "role": "Operating Partner",
  "image": "/images/691d6cf72d819a8d8fb58687_manon-werquin.avif",
  "expertise": ["...", "..."],
  "biography": "...",
  "socialLinks": {
    "linkedin": "https://...",
    "youtube": null
  }
}
```

---

## Support

### Questions courantes

**Q : Comment changer la couleur du bouton ?**
A : Modifier les classes Tailwind : `bg-white/10 hover:bg-white/20` ou `from-purple-600 to-pink-600`

**Q : Comment ajouter une vidéo ?**
A : Créer une section avec un iframe ou utiliser un composant externe (react-player, etc.)

**Q : Comment rendre le texte multilingue ?**
A : Utiliser i18n (next-intl, zustand avec translations, etc.) et créer des versions de page par langue

**Q : Comment ajouter un formulaire de contact ?**
A : Créer un composant form avec validation (react-hook-form) et une API route pour le mail

---

## Conventions

### Fichier naming
- Components : `kebab-case` (`marion-werquin.tsx`)
- Exports : `PascalCase` (`export default function MarionWerquinPage {}`)
- Data files : `kebab-case` (`operating-partners.ts`)

### Code style
- Max line length : 100 caractères
- Indentation : 2 espaces (non configurable avec Prettier)
- Semicolons : Actifs
- Quotes : Double quotes

### Commit messages

```bash
git commit -m "feat: add Marion Werquin operating partner page"
git commit -m "fix: update image path for Marion Werquin"
git commit -m "docs: add usage guide for operating partner pages"
```

---

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Hugeicons React](https://hugeicons.com)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
