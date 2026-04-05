/**
 * SplineViewer Component
 *
 * Composant pour afficher les scènes Spline 3D de manière optimisée.
 * Charge le script Spline dynamiquement et gère les erreurs.
 *
 * @example
 * ```tsx
 * <SplineViewer
 *   splineUrl="https://prod.spline.design/LPJMuZUqQ2mfwrP5/scene.splinecode"
 *   className="h-96"
 * />
 * ```
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface SplineViewerProps {
  splineUrl: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function SplineViewer({
  splineUrl,
  className = 'h-96',
  fallback,
}: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Spline script dynamically
    const script = document.createElement('script');
    script.src = 'https://prod.spline.design/spline.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      // Spline script is now available globally
    };
    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className={`${className} rounded-lg bg-gradient-to-br from-[#803fab]/20 to-[#f285f0]/10 flex items-center justify-center`}>
        {fallback || (
          <div className="text-center">
            <p className="text-sm font-300 text-hpg-silver">Impossible de charger la scène 3D</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      data-animation-type="spline"
      data-spline-url={splineUrl}
    >
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#cfcfcf] border-t-[#f285f0]" />
            <p className="text-sm font-300 text-hpg-silver">Chargement de la scène 3D...</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Composant hérité pour compatibilité avec le canvas 404
 * Utilise le même pattern que l'HTML Webflow original
 */
export function SplineCanvas({
  splineUrl = 'https://prod.spline.design/LPJMuZUqQ2mfwrP5/scene.splinecode',
  className = 'h-96 md:h-full',
}: {
  splineUrl?: string;
  className?: string;
}) {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <canvas className="h-full w-full" />
      <SplineViewer
        splineUrl={splineUrl}
        className="absolute inset-0"
        fallback={
          <div className="bg-gradient-to-br from-[#803fab]/20 to-[#f285f0]/10 h-full flex items-center justify-center">
            <p className="text-sm font-300 text-hpg-silver">Élément 3D en cours de chargement...</p>
          </div>
        }
      />
    </div>
  );
}
