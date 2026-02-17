import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ResourceArticlePage } from '@/components/sections/resource-article-page'
import { getPreviewResourceById } from '@/lib/resources'

interface PreviewResourcePageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    preview?: string
    token?: string
    version?: string
  }>
}

export const metadata: Metadata = {
  title: 'Resource Preview | HyperGrowth',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function PreviewResourcePage({
  params,
  searchParams,
}: PreviewResourcePageProps) {
  const { id } = await params
  const { preview, token, version } = await searchParams
  const resolvedToken = token ?? process.env.DIRECTUS_PREVIEW_TOKEN

  if (preview !== 'true') {
    redirect('/lecurie/ressources')
  }

  if (!resolvedToken) {
    notFound()
  }

  const article = await getPreviewResourceById({
    id,
    token: resolvedToken,
    version,
  })

  if (!article) {
    notFound()
  }

  return <ResourceArticlePage article={article} isPreview />
}
