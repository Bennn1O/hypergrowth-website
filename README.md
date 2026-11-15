# HyperGrowth — site

Site vitrine HyperGrowth : Astro (statique), Tailwind v4, Bun, FR/EN. Déployé sur Vercel.

## Commandes

| Commande          | Rôle                                         |
| ----------------- | -------------------------------------------- |
| `bun install`     | Dépendances                                  |
| `bun run dev`     | Serveur local (`astro dev --background` pour un agent) |
| `bun run check`   | Types Astro + TS (TypeScript 6 requis par `astro check`) |
| `bun run test`    | Tests unitaires (`bun test`)                 |
| `bun run build`   | Build statique dans `dist/` (pages, robots.txt, sitemap.xml) |
| `bun run preview` | Sert `dist/` en local                        |

## Structure

```
src/
  assets/brand/         logomark, logotype (SVG currentColor), lauriers
  components/layout/    header, footer, sélecteur de langue
  components/ui/        button, icon, logo, media-placeholder
  content/projects/     projets en Markdown, un dossier par langue (fr/, en/)
  content.config.ts     schéma des collections
  data/site.ts          coordonnées et réseaux (null = masqué)
  features/home/        sections de la home + chargement des projets
  i18n/                 config des locales, dictionnaires fr/en typés
  layouts/              base-layout (SEO, hreflang, canonical)
  pages/                / (FR) et /en/ (EN), pages minces qui rendent une feature
  styles/global.css     tokens @theme (couleurs, typo, rayons, ombres)
```

## Multilingue

- FR par défaut sans préfixe (`/`), EN sous `/en/`. Routage i18n natif d'Astro.
- Textes d'interface : `src/i18n/dictionaries/fr.ts` définit la forme ; `en.ts` est typé dessus, une clé manquante casse `bun run check`. Un test vérifie aussi la parité.
- Contenus : un fichier par langue dans `src/content/projects/<locale>/`, relié par `translationKey`.
- Nouvelle page : créer `src/pages/x.astro` et `src/pages/en/x.astro`, qui rendent le même composant de feature.

## Design system

- Palette marque : blush `#FFB6F4`, pink `#FF61A7`, purple `#842CB4`, ink `#111111`, mist `#E7E7E7`.
- Typo : Inter Tight (texte), Instrument Serif italique (accents), Cascadia Code (tags). **Provisoire** : à remplacer par les polices exactes du logotype et de la DA.
- Mise en page : maquette Figma « Marketing Agency », node `1:188`.
- Logos : vectorisés depuis les PNG de la DA. À remplacer par les SVG source.

## À fournir par HG

- Polices définitives, logo SVG source, photos (hero, équipe, services, projets).
- Logos clients autorisés, chiffres réels (les valeurs marquées `provisoire` dans `fr.ts` viennent du template).
- Coordonnées et réseaux dans `src/data/site.ts`, pages mentions légales et confidentialité.

## SEO et migration depuis l'ancien hypergrowth.fr

- Domaine canonique : `https://www.hypergrowth.fr`, URLs sans slash final (`/mentions-legales`, `/en`), comme l'ancien site.
- `src/pages/robots.txt.ts` et `src/pages/sitemap.xml.ts` : même adresse de sitemap que l'ancien site, avec les versions FR/EN (hreflang).
- `public/vercel.json` : redirections 301 de toutes les anciennes URLs (concept, communauté, écurie, études de cas, OP, ressources, contact) vers la section correspondante de la home, plus les formulaires Cockpit. `tests/redirects.test.ts` vérifie que chaque URL de l'ancien sitemap atterrit sur une page ou une section existante.
- Mesure d'audience : Rybbit, même script et même identifiant que l'ancien site (`src/data/site.ts`), chargé sur toutes les pages depuis `base-layout`. Bannière cookies reprise de l'ancien site (clé `hpg-cookie-consent`). Pixel Meta (`site.metaPixel`) chargé seulement après « Accepter » et sur le domaine de production : PageView, puis Contact à chaque clic vers le calendrier de Killian.
- Mentions légales : `src/content/legal/{fr,en}.md`.
