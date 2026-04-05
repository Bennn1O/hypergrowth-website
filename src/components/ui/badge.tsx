import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant Badge réutilisable
 * Utilisé pour les labels "Le Concept", "Ils nous font confiance", etc.
 */
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        px-3 py-1.5 rounded-full
        border border-neutral-200 bg-neutral-50
        text-xs font-medium text-neutral-700
        ${className}
      `}
    >
      {children}
    </div>
  );
}
