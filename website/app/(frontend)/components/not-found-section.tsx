/**
 * NotFoundSection Component
 *
 * Composant réutilisable pour les pages 404 et états vides.
 * Affiche le numéro 404, le message et les actions disponibles.
 *
 * @example
 * ```tsx
 * <NotFoundSection
 *   title="Page introuvable"
 *   description="Cette page n'existe pas (ou plus)."
 *   showHelp={true}
 * />
 * ```
 */

'use client';

import Link from 'next/link';
import { ArrowRight01Icon } from 'hugeicons-react';
import { ReactNode } from 'react';

interface NotFoundSectionProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  showHelp?: boolean;
  children?: ReactNode;
  customVisual?: ReactNode;
}

const defaultActions = {
  primary: {
    label: "Retour à l'accueil",
    href: '/',
  },
  secondary: {
    label: 'En savoir plus',
    href: '/concept',
  },
};

const helpLinks = [
  {
    label: 'La Méthode OP-X',
    description: 'Découvrez notre approche',
    href: '/concept/methode-op-x',
  },
  {
    label: 'Case Studies',
    description: 'Voir nos résultats',
    href: '/concept/case-studies',
  },
  {
    label: 'Événements',
    description: 'Rejoignez la communauté',
    href: '/communaute/evenements',
  },
  {
    label: 'À Propos',
    description: 'Qui sommes-nous ?',
    href: '/lecurie/a-propos',
  },
];

export function NotFoundSection({
  title = 'Page introuvable',
  description = "Cette page n'existe pas (ou plus). Mais pas de panique : découvrez comment structurer votre croissance avec HyperGrowth.",
  primaryAction = defaultActions.primary,
  secondaryAction = defaultActions.secondary,
  showHelp = true,
  children,
  customVisual,
}: NotFoundSectionProps) {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {/* Left: Content */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <div className="text-8xl font-bold leading-none text-[#f285f0] font-instrument md:text-9xl">
                404
              </div>
              <h1 className="mt-4 text-3xl font-400 leading-tight text-white md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-base font-300 leading-relaxed text-[#cfcfcf] md:text-lg">
                {description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#803fab] px-6 py-3 font-400 text-white transition-all duration-200 hover:bg-[#180a22] hover:text-[#f285f0]"
              >
                {primaryAction.label}
                <ArrowRight01Icon size={20} />
              </Link>
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center justify-center gap-2 border-b border-[#cfcfcf] px-0 py-3 font-400 text-[#cfcfcf] transition-all duration-200 hover:border-white hover:text-white"
              >
                {secondaryAction.label}
              </Link>
            </div>

            {children}
          </div>

          {/* Right: Visual Element */}
          <div className="relative flex items-center justify-center">
            {customVisual ? (
              customVisual
            ) : (
              <div className="h-96 w-full rounded-[10px] bg-gradient-to-br from-[#803fab]/20 to-[#f285f0]/10 p-8 text-center md:h-full">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-4">
                    <div className="text-6xl font-bold text-[#f285f0]/20 font-instrument">?</div>
                    <p className="text-sm font-300 text-[#cfcfcf]">Contenu visuel personnalisé</p>
                  </div>
                </div>
              </div>
            )}

            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-[10px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#803fab]/5 via-transparent to-[#f285f0]/5" />
              <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#803fab]/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#f285f0]/10 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Help Section */}
        {showHelp && (
          <div className="mt-16 border-t border-[#414141] pt-12 md:mt-20">
            <h2 className="text-lg font-400 text-white md:text-xl">Besoin d'aide ?</h2>
            <nav className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {helpLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-lg p-3 transition-all duration-200 hover:bg-[#180a2233]"
                >
                  <p className="font-400 text-[#f285f0] group-hover:text-white">{link.label}</p>
                  <p className="mt-1 text-sm font-300 text-[#cfcfcf]">{link.description}</p>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
