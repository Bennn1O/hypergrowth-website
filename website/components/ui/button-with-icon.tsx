import Link from 'next/link';
import type React from 'react';

interface ButtonWithIconProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  external?: boolean;
  className?: string;
}

/**
 * Bouton réutilisable avec icône à droite
 * Utilisé pour les CTAs avec flèche
 */
export function ButtonWithIcon({
  href,
  children,
  icon,
  external = false,
  className = '',
}: ButtonWithIconProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      <span>{children}</span>
      {icon}
    </Link>
  );
}
