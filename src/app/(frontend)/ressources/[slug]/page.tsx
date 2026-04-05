import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ResourceArticlePage } from '@/components/sections/resource-article-page'
import { getPublishedResourceBySlug } from '@/lib/resources'

interface ResourcePageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedResourceBySlug(slug)

  if (!article) {
    return {
      title: 'Resource Not Found | HyperGrowth',
    }
  }

  return {
    title: `${article.title} | HyperGrowth`,
    description: article.excerpt,
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params
  const article = await getPublishedResourceBySlug(slug)

  if (!article) {
    notFound()
  }

  return <ResourceArticlePage article={article} />
}
