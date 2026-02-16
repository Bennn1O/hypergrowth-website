/**
 * SectionBadge Component
 *
 * Composant réutilisable pour les badges de section "L'Écurie", "Évènements", etc.
 *
 * Usage:
 * ```tsx
 * <SectionBadge label="Communauté" />
 * <SectionBadge label="L'Écurie" />
 * ```
 */

interface SectionBadgeProps {
  label: string;
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
}
