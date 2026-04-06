import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { ResourceArticle } from '@/lib/resources'

interface ResourceArticlePageProps {
  article: ResourceArticle
  isPreview?: boolean
}

const darkSectionClass =
  "relative overflow-hidden bg-[linear-gradient(180deg,rgb(24_10_34_/_0.98),rgb(24_10_34_/_0.86)_40%,rgb(24_10_34_/_0.96)),radial-gradient(circle_farthest-corner_at_18%_14%,rgb(242_133_240_/_0.2),transparent_45%),radial-gradient(circle_farthest-corner_at_86%_82%,rgb(128_63_171_/_0.27),transparent_48%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.06),transparent_32%)] before:content-['']"

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-[#b36fd8] bg-[#7b3da9] px-8 py-4 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_28px_rgb(14_3_21_/_0.45)] transition-all duration-200 hover:-translate-y-px hover:border-[#d19bee] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25),0_18px_34px_rgb(14_3_21_/_0.55)]'

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-lg leading-8 text-white/75">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 text-xl font-semibold text-white">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="font-instrument-italic italic text-hpg-orchid">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string; blank?: boolean }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="underline decoration-hpg-orchid/40 underline-offset-2 transition hover:decoration-hpg-orchid"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) => {
      if (!value.url) return null
      return (
        <figure className="my-8">
          <Image
            src={value.url}
            alt={value.alt ?? ''}
            width={960}
            height={540}
            className="w-full rounded-xl object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-white/40">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

function formatPublishedDate(dateString: string | null): string | null {
  if (!dateString) return null
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function ResourceArticlePage({
  article,
  isPreview = false,
}: ResourceArticlePageProps) {
  const publishedDate = formatPublishedDate(article.publishedAt)

  return (
    <main className="pt-20">
      <section className={`${darkSectionClass} py-24`}>
        <div className="mx-auto max-w-[960px] px-6 lg:px-12">
          {isPreview && (
            <p className="mb-8 inline-flex rounded-full border border-hpg-orchid/40 bg-hpg-orchid/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-hpg-orchid">
              Mode preview
            </p>
          )}

          <p className="mb-6 text-sm font-semibold text-purple-400">Ressources</p>
          <h1 className="mb-8 text-5xl font-bold md:text-7xl">{article.title}</h1>

          {article.coverImage?.src && (
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt ?? article.title}
              width={960}
              height={480}
              className="mb-8 w-full rounded-xl object-cover"
              priority
            />
          )}

          <p className="max-w-3xl text-xl text-white/70">{article.excerpt}</p>

          {publishedDate && (
            <p className="mt-5 text-sm uppercase tracking-[0.08em] text-white/45">
              Publié le {publishedDate}
            </p>
          )}

          {article.content?.length > 0 ? (
            <article className="mt-12 space-y-6">
              <PortableText value={article.content} components={portableTextComponents} />
            </article>
          ) : (
            <p className="mt-12 text-lg text-white/65">Article en cours de rédaction.</p>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/lecurie/ressources" className={primaryButtonClass}>
              Retour aux ressources
            </Link>
            {isPreview && (
              <Link
                href={`/ressources/${article.slug}`}
                className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white/90 transition-colors hover:bg-white/5"
              >
                Ouvrir la version publique
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
