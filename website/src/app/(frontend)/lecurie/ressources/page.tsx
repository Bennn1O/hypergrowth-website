import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ressources pour dirigeants en croissance | HyperGrowth',
  description:
    'Articles, insights et outils pour structurer votre croissance et scaler sans chaos.',
}

const containerClass =
  'mx-auto block max-w-[1300px] px-[5rem] py-[2.5rem] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:max-w-[95vw] max-[479px]:px-0'

const btnViolet =
  'group inline-flex items-center justify-center gap-3 rounded-[12px] border border-[#9a59c5] bg-[#7d3fab] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] transition-colors hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]'

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
            <p className="max-w-[500px] font-thin leading-[1.7] text-[#cfcfcf]">
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
                  className="group flex flex-col gap-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02] transition hover:border-[#f285f040] hover:bg-[rgb(24_10_34_/_0.3)]"
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
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-[#f285f0]">
                        {article.category}
                      </span>
                      <span className="text-[0.75rem] text-white/40">{article.date}</span>
                    </div>
                    <h2 className="text-[1.1rem] font-medium leading-[1.3] transition-colors group-hover:text-[#f285f0]">
                      {article.title}
                    </h2>
                    <p className="text-[0.85rem] font-thin leading-[1.6] text-[#cfcfcf]">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About Killian ────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-start gap-10 max-[767px]:flex-col">
            <div className="w-[40%] shrink-0 overflow-hidden rounded-[12px] max-[767px]:w-full">
              <Image
                src="/images/68dfda277a4f4332ebf28661_OP3.avif"
                alt="Killian Palermo"
                width={700}
                height={700}
                className="h-[380px] w-full object-cover"
              />
            </div>
            <div className="sticky top-[120px] flex flex-col gap-5 py-4 max-[767px]:static">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                L&apos;écurie
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08]">
                15 projets créés, 7{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">échecs</span>,
                des millions générés
              </h2>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                J&apos;ai lancé plus de 15 boîtes, j&apos;en ai planté 7 et d&apos;autres ont
                généré des millions, ce qui m&apos;a permis de comprendre que le vrai défi,
                ce n&apos;est pas de démarrer, c&apos;est de scaler.
              </p>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                Pas de théorie — juste du concret, de l&apos;exécution et de la croissance
                maîtrisée.
              </p>
              <Link href="/lecurie/a-propos" className={`self-start ${btnViolet}`}>
                À propos
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Score scalabilité ────────────────────────────────────── */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Le score de scalabilité
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Votre projet est-il{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">scalable</span> ?
            </h2>
            <p className="max-w-[520px] font-thin leading-[1.7] text-[#cfcfcf]">
              Remplissez le questionnaire en moins de 5 minutes et faites enfin un état des
              lieux concret sur votre situation.
            </p>
            <Link href="/concept/test-de-scalabilite" className={btnViolet}>
              Découvrir mon score
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
