import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ressources pour dirigeants en croissance | HyperGrowth',
  description:
    'Articles, insights et outils pour structurer votre croissance et scaler sans chaos.',
}

const containerClass =
  'hpg-container'

const btnViolet =
  'hpg-btn-violet group'

const Arrow = () => (
  <Image
    src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
    alt=""
    width={18}
    height={18}
    className="transition-transform duration-200 group-hover:-rotate-45"
  />
)

const articles = [
  {
    slug: 'quand-tout-repose-sur-vous-le-piege-du-micro-management',
    title: 'Quand tout repose sur vous : le piège du micro-management',
    category: 'Management',
    date: '29 novembre 2025',
    description:
      "Vous êtes le fondateur ou dirigeant d'une PME en phase de scaling et tout semble reposer sur vous. Travailler dur ne suffit pas, il faut travailler à bon escient.",
    image: '/images/68f76b48bf1f2b7d00286595_reprendre-le-lead.avif',
  },
  {
    slug: 'deleguer-sans-lacher-prise',
    title: 'Déléguer sans lâcher prise',
    category: 'Management',
    date: '21 octobre 2025',
    description:
      "La délégation efficace signifie changer de posture managériale tout en conservant vos standards de qualité.",
    image: '/images/68f761cafda0ac1ba0ef621c_COUVERTURE.avif',
  },
]

export default function EcurieRessourcesPage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[180px] pb-16 max-[767px]:pt-[130px] max-[767px]:pb-10">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[55vw] opacity-25"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              L&apos;Écurie
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Ressources
            </h1>
            <p className="max-w-[500px] font-thin leading-[1.7] text-hpg-silver">
              Articles et insights pour accélérer votre scalabilité.
            </p>
          </div>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-6">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Articles récents
            </span>
            <div className="grid grid-cols-2 gap-6 max-[767px]:grid-cols-1">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/ressources/${article.slug}`}
                  className="group flex flex-col gap-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02] transition hover:border-hpg-orchid/25 hover:bg-[rgb(24_10_34_/_0.3)]"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={640}
                      height={340}
                      className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-hpg-orchid">
                        {article.category}
                      </span>
                      <span className="text-[0.75rem] text-white/40">{article.date}</span>
                    </div>
                    <h2 className="text-[1.1rem] font-medium leading-[1.3] transition-colors group-hover:text-hpg-orchid">
                      {article.title}
                    </h2>
                    <p className="text-[0.85rem] font-thin leading-[1.6] text-hpg-silver">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* ── CTA Réserver un appel ────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div
            className="relative overflow-hidden rounded-[20px] p-12 text-center max-[767px]:p-8"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(125,63,171,0.35) 0%, rgba(10,4,16,0.95) 70%)',
              border: '1px solid rgba(242,133,240,0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Prochaine étape
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08]">
                Les ressources ne suffisent pas.{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">L&apos;accompagnement, si.</span>
              </h2>
              <p className="max-w-[480px] font-thin leading-[1.7] text-hpg-silver">
                Un Operating Partner analyse votre contexte en 30 minutes. Pas d&apos;engagement, juste de la clarté.
              </p>
              <Link href="/contact" className={btnViolet}>
                Réserver un appel
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
