import Image from 'next/image'
import Link from 'next/link'

const featuredArticle = {
  category: 'Management',
  date: 'November 29, 2025',
  title: 'Quand tout repose sur vous : le piège du micro-management',
  excerpt:
    "Vous êtes le fondateur ou dirigeant d'une PME en phase de scaling et tout semble reposer sur vous. Travailler dur ne suffit pas, il faut travailler à bon escient – et à ce stade, cela signifie lever la tête du guidon.",
  href: '/ressources/quand-tout-repose-sur-vous-le-piege-du-micro-management',
}

const articles = [
  {
    category: 'Management',
    date: 'October 21, 2025',
    title: 'Déléguer sans lâcher prise',
    image: '/images/68f761cafda0ac1ba0ef621c_COUVERTURE.avif',
    href: '/ressources/deleguer-sans-lacher-prise',
    imageAlt:
      'Portrait d\'une dirigeante concentrée devant son ordinateur, en pleine réflexion nocturne. Symbolise la charge mentale du CEO en scaling.',
  },
  {
    category: 'Management',
    date: 'November 29, 2025',
    title: 'Quand tout repose sur vous : le piège du micro-management',
    image: '/images/68f76b48bf1f2b7d00286595_reprendre-le-lead.avif',
    href: '/ressources/quand-tout-repose-sur-vous-le-piege-du-micro-management',
    imageAlt:
      'Portrait d\'un dirigeant submergé par le flux de documents, illustrant la surcharge mentale liée au micro-management.',
  },
]

const containerClass =
  'mx-auto block max-w-[1300px] overflow-auto px-[5rem] py-[2.5rem] max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

const glassClass =
  'border border-white/10 bg-[rgb(31_18_43_/_0.44)] backdrop-blur-[14px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.11),0_24px_52px_rgb(4_2_8_/_0.33)]'

export function ResourcesSection() {
  return (
    <section className="mx-auto py-10">
      <div className={containerClass}>
        <div className="flex flex-col gap-12 overflow-hidden rounded-[12px] border border-white/10 bg-transparent p-4 max-[479px]:px-4">
          <div className="flex flex-col items-start justify-center gap-3">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">L'écurie</span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]"><span className="font-instrument-italic italic text-[#f285f0]">Ressources</span></h2>
          </div>

          <div className="flex gap-6 max-[991px]:flex-col">
            <Link href={featuredArticle.href} className={`flex w-1/2 flex-col justify-between gap-8 rounded-[12px] p-8 transition hover:-translate-y-0.5 hover:border-[#f285f040] max-[991px]:w-full ${glassClass}`}>
              <div className="flex items-center justify-between">
                <div className="font-instrument-italic text-[#f285f0]">{featuredArticle.category}</div>
                <div className="text-[0.8rem] font-thin text-[#cfcfcf]">{featuredArticle.date}</div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[1.5rem] leading-[1.2]">{featuredArticle.title}</h3>
                <p className="text-[0.9rem] font-thin leading-[1.6] text-[#cfcfcf]">{featuredArticle.excerpt}</p>
              </div>

              <div className="text-[0.8rem] uppercase underline decoration-[#f285f0] decoration-[0.005px] underline-offset-[10px]">Lire l&apos;article</div>
            </Link>

            <div className="flex w-1/2 flex-col gap-4 max-[991px]:w-full">
              {articles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="flex flex-1 items-center gap-5 rounded-[12px] border border-transparent p-3 transition hover:-translate-y-0.5 hover:border-[#f285f040] hover:bg-white/[0.02]"
                >
                  <div className="h-full w-[40%] shrink-0 overflow-hidden rounded-[10px]">
                    <Image src={article.image} alt={article.imageAlt} width={420} height={260} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    <div className="flex items-center gap-3 text-[0.8rem] font-thin">
                      <span className="text-[#cfcfcf]">{article.category}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-[#737373]">{article.date}</span>
                    </div>

                    <h3 className="text-[1rem] font-light leading-[1.4]">{article.title}</h3>

                    <div className="text-[0.8rem] uppercase underline decoration-[#f285f0] decoration-[0.005px] underline-offset-[10px]">Lire l&apos;article</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end pt-4">
            <Link href="/lecurie/ressources" className="inline-flex items-center gap-8 border-b border-[#cfcfcf] pb-0 text-[#cfcfcf] hover:border-white hover:text-white">
              <div>Tout voir</div>
              <Image src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg" alt="" width={20} height={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
