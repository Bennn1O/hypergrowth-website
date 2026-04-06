import Image from 'next/image';
import type { ClientLogo } from '@/lib/case-studies';

interface ClientLogosGridProps {
  logos: ClientLogo[];
}

/**
 * Grille de logos des clients
 * Affiche les logos des clients en une grille responsive
 */
export function ClientLogosGrid({ logos }: ClientLogosGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6 max-[479px]:grid-cols-2">
      {logos.map((logo, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center p-4 hover:opacity-75 transition-opacity"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={80}
            className="block h-auto max-h-[70px] w-auto max-w-[150px] object-contain opacity-[0.76] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
