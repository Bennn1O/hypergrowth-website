/**
 * CTAButton Component
 *
 * Composant de bouton CTA avec icône flèche optionnelle.
 * Utilise hugeicons-react pour l'icône.
 *
 * Usage:
 * ```tsx
 * <CTAButton href="/contact" icon>
 *   POSTULER
 * </CTAButton>
 *
 * <CTAButton href="/communaute/evenements" icon>
 *   VOIR TOUS LES ÉVÈNEMENTS
 * </CTAButton>
 * ```
 */

import Link from 'next/link';
import { ArrowRight01Icon } from 'hugeicons-react';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: boolean;
  variant?: 'primary' | 'secondary';
  target?: '_self' | '_blank';
}

export function CTAButton({
  href,
  children,
  icon = true,
  variant = 'primary',
  target = '_self',
}: CTAButtonProps) {
  const baseStyles = 'inline-flex items-center gap-3 px-6 py-4 font-semibold rounded-lg transition-colors w-fit';

  const variantStyles = {
    primary: 'bg-white text-neutral-950 hover:bg-white/90',
    secondary: 'border border-white/20 text-white hover:bg-white/5',
  };

  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      <span>{children}</span>
      {icon && <ArrowRight01Icon size={20} />}
    </Link>
  );
}
