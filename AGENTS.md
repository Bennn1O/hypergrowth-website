## Projet

Site vitrine HyperGrowth. Astro statique, Tailwind v4, Bun, FR/EN, déployé sur Vercel. Voir `README.md` pour la structure et les conventions i18n.

- Fichiers en kebab-case. Les sections vivent dans `src/features/<feature>/components/`, les pages dans `src/pages/` restent minces.
- Tout texte visible passe par `src/i18n/dictionaries/` ou une collection de contenu, jamais en dur dans un composant.
- Tokens dans `src/styles/global.css` (`@theme`). Pas de `tailwind.config`.
- Avant de livrer : `bun run check && bun run test && bun run build`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
