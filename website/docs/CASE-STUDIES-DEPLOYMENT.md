# Checklist de déploiement : Case Studies Page

## Résumé des modifications

### Fichiers créés
- ✅ `/app/concept/case-studies/page.tsx` - Page principale (converti du HTML)
- ✅ `/app/concept/layout.tsx` - Layout parent
- ✅ `/lib/case-studies.ts` - Configuration centralisée
- ✅ `/components/sections/case-study-card.tsx` - Composant carte
- ✅ `/components/sections/client-logos-grid.tsx` - Composant grille logos
- ✅ `/components/ui/badge.tsx` - Composant badge réutilisable
- ✅ `/components/ui/button-with-icon.tsx` - Composant bouton avec icône
- ✅ `/docs/` - Documentation complète

### Fichiers modifiés
- Aucun fichier existant n'a été modifié

## Avant le déploiement

### Étape 1 : Images

- [ ] Créer la structure `/public/images/case-studies/`
- [ ] Créer la structure `/public/images/logos/`
- [ ] Créer la structure `/public/images/portraits/`
- [ ] Créer la structure `/public/images/icons/`
- [ ] Télécharger toutes les images (voir `IMAGES_CHECKLIST.md`)
- [ ] Vérifier que les images s'affichent correctement
- [ ] Vérifier l'optimisation des images

```bash
# Valider que les fichiers existent
find public/images -type f | grep -E "(case-studies|logos|portraits|icons)"
```

### Étape 2 : Développement

- [ ] Tester localement : `npm run dev`
- [ ] Accéder à `/concept/case-studies`
- [ ] Vérifier que toutes les sections s'affichent
- [ ] Tester sur mobile (responsive)
- [ ] Tester les liens (Contact, LinkedIn, scalabilité, OP-X)
- [ ] Vérifier les métadonnées Open Graph

### Étape 3 : Accessibilité et Performance

- [ ] Lancer Lighthouse : `npm run build`
- [ ] Vérifier le score d'accessibilité (min 90)
- [ ] Vérifier le score de performance (min 80)
- [ ] Vérifier les images alt text
- [ ] Tester la navigation au clavier
- [ ] Tester avec un lecteur d'écran

### Étape 4 : Tests

```bash
# Build de production
npm run build

# Vérifier les erreurs TypeScript
npm run type-check

# Linter
npm run lint
```

- [ ] Pas d'erreurs de build
- [ ] Pas d'erreurs TypeScript
- [ ] Pas d'avertissements lint
- [ ] Pas de console errors
- [ ] Pas de console warnings

### Étape 5 : Preview

```bash
# Démarrer le serveur de production
npm run start
```

- [ ] Accéder à `/concept/case-studies`
- [ ] Vérifier que la page fonctionne en mode production
- [ ] Vérifier les temps de chargement
- [ ] Vérifier les images sont optimisées

## Déploiement

### Étape 1 : Git

```bash
# Ajouter les fichiers
git add app/concept/
git add lib/case-studies.ts
git add components/sections/case-study-card.tsx
git add components/sections/client-logos-grid.tsx
git add components/ui/badge.tsx
git add components/ui/button-with-icon.tsx
git add docs/
git add public/images/

# Commit
git commit -m "feat: convert case-studies HTML to Next.js page

- Convert Webflow HTML to modern Next.js 15 + React 19 + Tailwind v4
- Add data-driven component architecture for case studies
- Implement responsive design with mobile-first approach
- Add Hugeicons for arrow icon
- Extract reusable components (Badge, ButtonWithIcon, CaseStudyCard)
- Centralize case study data configuration
- Include comprehensive documentation and migration guide"

# Push
git push origin feature/case-studies-nextjs
```

### Étape 2 : Vérification pré-merge

- [ ] Code review effectué
- [ ] Pas de merge conflicts
- [ ] CI/CD pipeline réussi
- [ ] Tests passent
- [ ] Build réussit

### Étape 3 : Merge et déploiement

```bash
# Merger vers main
git checkout main
git pull origin main
git merge --no-ff feature/case-studies-nextjs
git push origin main
```

- [ ] Pipeline de déploiement lancé
- [ ] Site déployé sur preview
- [ ] Vérifier la page en production : `/concept/case-studies`

## Après le déploiement

### Monitoring

- [ ] Monitoring des erreurs (Sentry, etc.)
- [ ] Monitoring des performances (Core Web Vitals)
- [ ] Vérifier les 404 ou liens brisés

### Vérifications post-déploiement

```bash
# Vérifier les liens
# (manuellement ou avec un tool comme Lighthouse CI)
- / (home)
- /concept (parent)
- /concept/case-studies (page actuelle)
- /contact
- /concept/test-de-scalabilite
- /concept/methode-op-x
```

- [ ] Tous les liens internes fonctionnent
- [ ] Tous les liens externes (LinkedIn, sites clients) fonctionnent
- [ ] Les métadonnées s'affichent correctement en social share
- [ ] Les images se chargent rapidement

## Fichiers à vérifier avant merge

```
app/concept/
├── layout.tsx                          ✅
└── case-studies/
    └── page.tsx                        ✅

lib/
└── case-studies.ts                     ✅

components/
├── sections/
│   ├── case-study-card.tsx             ✅
│   └── client-logos-grid.tsx           ✅
└── ui/
    ├── badge.tsx                       ✅
    └── button-with-icon.tsx            ✅

docs/
├── CASE-STUDIES-MIGRATION.md           ✅
├── EXTENDING-CASE-STUDIES.md           ✅
└── CASE-STUDIES-DEPLOYMENT.md          ✅

public/images/
├── case-studies/                       (à ajouter)
├── logos/                              (à ajouter)
├── portraits/                          (à ajouter)
└── icons/                              (à ajouter)
```

## Rollback en cas de problème

```bash
# Si problème trouvé après déploiement
git revert <commit-hash>
git push origin main

# Puis diagnostiquer et corriger
```

## Tâches futures

- [ ] Implémenter `/case-studies/[slug]/page.tsx` (page détail)
- [ ] Ajouter plus d'études de cas
- [ ] Ajouter un système de filtrage/recherche
- [ ] Implémenter les animations de scroll
- [ ] A/B test sur le design des cartes
- [ ] Analytics tracking sur les clics

## Contacts et support

- **Questions sur la migration ?** → Voir `CASE-STUDIES-MIGRATION.md`
- **Comment ajouter une étude de cas ?** → Voir `EXTENDING-CASE-STUDIES.md`
- **Erreur en prod ?** → Vérifier cette checklist et les logs

## Performance targets

| Métrique | Target | Actuel |
|----------|--------|--------|
| Lighthouse Performance | 80+ | - |
| Lighthouse Accessibility | 90+ | - |
| Lighthouse Best Practices | 90+ | - |
| Lighthouse SEO | 90+ | - |
| Core Web Vitals - LCP | < 2.5s | - |
| Core Web Vitals - FID | < 100ms | - |
| Core Web Vitals - CLS | < 0.1 | - |

## Signature

- [ ] Migration réalisée par : _____
- [ ] Code review effectué par : _____
- [ ] Déploiement effectué par : _____
- [ ] Date de déploiement : _____
