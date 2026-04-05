import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight01Icon } from 'hugeicons-react'

interface ArticleCardProps {
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  slug: string
}

export function ArticleCard({
  title,
  category,
  date,
  excerpt,
  image,
  slug,
}: ArticleCardProps) {
  return (
    <Link href={`/ressources/${slug}`} className="group">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-neutral-800">
          <Image
            src={`/images/${image}`}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-8 flex flex-col grow">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-900 text-purple-300 text-xs font-semibold">
              {category}
            </span>
            <span className="text-sm text-gray-500">{date}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-400 mb-6 grow">
            {excerpt}
          </p>

          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <span>Lire l'article</span>
            <ArrowRight01Icon size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
