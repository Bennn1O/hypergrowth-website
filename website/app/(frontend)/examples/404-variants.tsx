/**
 * Exemples de variantes de page 404
 *
 * Montre comment utiliser le composant NotFoundSection
 * avec différentes configurations pour différents cas d'usage.
 *
 * Pour tester :
 * - Créer un fichier [slug]/not-found.tsx dans chaque segment
 * - Importer et utiliser les composants depuis cet exemple
 */

'use client';

import { NotFoundSection } from '@/app/(frontend)/components/not-found-section';
import { SplineViewer } from '@/app/(frontend)/components/spline-viewer';

/**
 * Variante 1 : Page 404 standard (app root)
 */
export function Standard404Page() {
  return (
    <NotFoundSection
      title="Page introuvable"
      description="Cette page n'existe pas (ou plus). Mais pas de panique : découvrez comment structurer votre croissance avec HyperGrowth."
      showHelp={true}
    />
  );
}

/**
 * Variante 2 : 404 pour section Concept
 */
export function Concept404Page() {
  return (
    <NotFoundSection
      title="Concept non trouvé"
      description="Le concept que vous cherchez n'existe pas dans notre base. Consultez nos méthodes disponibles."
      primaryAction={{
        label: 'Voir tous les concepts',
        href: '/concept',
      }}
      secondaryAction={{
        label: "Retour à l'accueil",
        href: '/',
      }}
      showHelp={false}
    />
  );
}

/**
 * Variante 3 : 404 pour section Communauté
 */
export function Communaute404Page() {
  return (
    <NotFoundSection
      title="Événement ou ressource non trouvé"
      description="L'événement ou la ressource que vous cherchez n'existe pas dans notre communauté."
      primaryAction={{
        label: 'Voir les événements',
        href: '/communaute/evenements',
      }}
      secondaryAction={{
        label: 'Rejoindre HyperClub',
        href: '/communaute/hyperclub',
      }}
      showHelp={false}
    />
  );
}

/**
 * Variante 4 : État vide custom avec contenu
 */
export function EmptyStateWithContent() {
  return (
    <NotFoundSection
      title="Aucun résultat"
      description="Votre recherche n'a retourné aucun résultat. Essayez avec d'autres mots-clés."
      showHelp={false}
    >
      <div className="mt-6 rounded-lg border border-[#414141] bg-[#180a2233] p-6">
        <h3 className="font-400 text-white">Conseils de recherche :</h3>
        <ul className="mt-4 space-y-2 text-sm font-300 text-[#cfcfcf]">
          <li>Vérifiez l'orthographe de votre requête</li>
          <li>Essayez des mots-clés plus généraux</li>
          <li>Utilisez des filtres pour affiner votre recherche</li>
        </ul>
      </div>
    </NotFoundSection>
  );
}

/**
 * Variante 5 : 404 avec élément visuel custom (non-Spline)
 */
export function Custom404WithVisual() {
  const customVisual = (
    <div className="h-96 w-full rounded-[10px] bg-gradient-to-br from-[#803fab]/20 to-[#f285f0]/10 p-8 flex items-center justify-center md:h-full">
      <div className="text-center">
        <div className="inline-block p-4 rounded-full bg-[#803fab]/10 mb-4">
          <svg
            className="w-16 h-16 text-[#f285f0]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-[#cfcfcf] font-300">Oups ! Quelque chose s'est mal passé</p>
      </div>
    </div>
  );

  return (
    <NotFoundSection
      title="Erreur 404"
      description="Nous n'avons pas pu trouver ce que vous cherchiez."
      customVisual={customVisual}
      showHelp={true}
    />
  );
}

/**
 * Variante 6 : 404 avec Spline custom
 */
export function Custom404WithSpline() {
  return (
    <NotFoundSection
      title="Page non trouvée"
      description="Explorez notre univers et découvrez ce qui vous intéresse."
      customVisual={
        <SplineViewer
          splineUrl="https://prod.spline.design/YOUR-CUSTOM-ID/scene.splinecode"
          className="h-96 md:h-full rounded-[10px] overflow-hidden"
          fallback={<div className="text-white">Scène 3D indisponible</div>}
        />
      }
      showHelp={true}
    />
  );
}

/**
 * Variante 7 : 404 minimale (sans section aide)
 */
export function Minimal404Page() {
  return (
    <NotFoundSection
      title="404"
      description="Page non trouvée"
      showHelp={false}
    />
  );
}

/**
 * Variante 8 : 404 avec actions custom multiples
 */
export function Advanced404Page() {
  return (
    <NotFoundSection
      title="Ressource introuvable"
      description="La ressource que vous cherchez n'existe pas ou a été supprimée."
      primaryAction={{
        label: 'Retour précédent',
        href: '#',
      }}
      secondaryAction={{
        label: 'Support',
        href: '/contact',
      }}
      showHelp={true}
    >
      <div className="mt-8 space-y-4 rounded-lg border border-[#414141]/30 bg-[#803fab]/5 p-6">
        <h3 className="font-400 text-white">Avez-vous besoin d'assistance ?</h3>
        <p className="text-sm font-300 text-[#cfcfcf]">
          Si vous pensez qu'il y a une erreur, veuillez contacter notre équipe support.
        </p>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#803fab] px-4 py-2 font-400 text-white transition-all hover:bg-[#180a22] hover:text-[#f285f0]">
          Contacter le support
        </button>
      </div>
    </NotFoundSection>
  );
}

/**
 * Réutilisation dans un segment dynamique
 *
 * Exemple : app/blog/[slug]/not-found.tsx
 */
export function BlogPost404Page() {
  return (
    <NotFoundSection
      title="Article non trouvé"
      description="L'article que vous cherchez n'existe pas ou a été supprimé."
      primaryAction={{
        label: 'Voir tous les articles',
        href: '/blog',
      }}
      secondaryAction={{
        label: 'Accueil',
        href: '/',
      }}
      showHelp={false}
    />
  );
}
