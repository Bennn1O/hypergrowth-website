import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/case-studies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

/**
 * Composant de carte d'étude de cas
 * Affiche l'image, le titre de l'entreprise et les fondateurs avec lien LinkedIn
 */
export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-neutral-50 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex w-full flex-col gap-8 p-6 md:flex-row md:p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Image */}
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="flex w-full flex-1 flex-col justify-between gap-8 md:w-auto"
          >
            <div className="inline-block w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 md:w-auto">
              <Image
                src={caseStudy.image}
                alt={caseStudy.imageAlt}
                width={400}
                height={300}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Company Info */}
          <div className="flex-1">
            <div className="space-y-3">
              <a
                href={caseStudy.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-neutral-900 hover:text-neutral-700 transition-colors inline-block"
              >
                {caseStudy.title}
              </a>
              <a
                href={caseStudy.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <div className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  {caseStudy.linkedinName}
                </div>
                <Image
                  src="/images/icon-linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
