/**
 * FeatureCard Component
 *
 * Composant de carte de feature avec icône, titre et description.
 * Utilisé pour afficher les avantages (hotseats, réseau, communauté)
 *
 * Usage:
 * ```tsx
 * <FeatureCard
 *   icon="/images/hpg-icon-op.svg"
 *   title="Hotseats trimestriels"
 *   description="Des sessions confidentielles entre pairs..."
 * />
 * ```
 */

import Image from 'next/image';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <Image
        src={icon}
        alt={title}
        width={50}
        height={50}
        className="mb-4"
      />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{description}</p>
    </div>
  );
}
