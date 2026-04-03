import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "À propos d'HyperGrowth : l'histoire derrière le concept OP-X",
  description:
    "L'Écurie — Notre histoire, nos rencontres, nos équipes. Notre mission est d'accompagner +1000 entrepreneurs à bâtir l'entreprise de leur rêve.",
}

const containerClass =
  'mx-auto block max-w-[1300px] px-[5rem] py-[2.5rem] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:max-w-[95vw] max-[479px]:px-4'

const glassClass =
  'border border-white/12 bg-[rgb(35_20_46_/_0.52)] backdrop-blur-[26px] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08),0_24px_52px_rgb(4_2_8_/_0.28)]'

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

const stats = [
  { value: '150+', label: 'Dirigeants accompagnés' },
  { value: '97%', label: 'Taux de satisfaction' },
  { value: '15M€', label: 'de CA annuel cumulé' },
  { value: '20+', label: 'Experts et OP mobilisables' },
]

const galleryImages = [
  { src: '/images/690b65a111a023bd76f69ec9_hypergrowth-photo-149.avif', alt: '' },
  { src: '/images/690b6345ccdc09ca5c79b911_DSC09918.avif', alt: '' },
  { src: '/images/690b658336aaa31030c19875_hypergrowth-photo-137.avif', alt: '' },
  { src: '/images/68f24abb8d7f007873da7740_HPG_event_110925-21.avif', alt: '' },
  { src: '/images/690b659d417cc4f0080b84b5_hypergrowth-photo-171.avif', alt: '' },
  { src: '/images/690b6314ed2fbe6dd3a808a4_killian-x-sixtine-moulle.avif', alt: '' },
  { src: '/images/690b656d00d85b85a6033273_hypergrowth-photo-027.avif', alt: '' },
  { src: '/images/690b6563f325840769b73eb1_hypergrowth-photo-009.avif', alt: '' },
  { src: '/images/690b6579b233a1f2555541fd_hypergrowth-photo-101.avif', alt: '' },
]

export default function AProposPage() {
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
              L&apos;amour de la{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">performance</span>
            </h1>
            <p className="max-w-[560px] text-base font-medium leading-[1.6] text-[#cfcfcf]">
              Optimiser, améliorer, réfléchir et constamment se remettre en question. C&apos;est
              l&apos;essence de la personnalité curieuse et obstinée de Killian Palermo qui
              l&apos;a poussé à aller se confronter aux challenges business les plus intenses.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="grid grid-cols-4 gap-4 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center gap-1 rounded-[12px] p-8 text-center ${glassClass}`}
              >
                <span className="font-instrument-italic italic text-[3rem] leading-none text-[#f285f0]">
                  {stat.value}
                </span>
                <span className="text-[0.8rem] font-medium leading-[1.4] text-white/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Notre mission
            </span>
            <h2 className="max-w-[700px] text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              Accompagner{' '}
              <span className="font-instrument-italic italic text-[#f285f0]">+1000</span>{' '}
              entrepreneurs à bâtir l&apos;entreprise de leur rêve
            </h2>
            <p className="max-w-[580px] font-thin leading-[1.7] text-[#cfcfcf]">
              À travers des systèmes éprouvés, des Operating Partners engagés et un réseau
              d&apos;experts A-players, nous aidons les dirigeants ambitieux à transformer leur
              hypercroissance en scaling contrôlé.
            </p>
          </div>
        </div>
      </section>

      {/* ── Concept OP ───────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-start gap-10 max-[767px]:flex-col">
            <div className="flex flex-1 flex-col gap-6">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Le Concept
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Un concept trop peu développé{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">en France</span>
              </h2>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                Pratique assez répandue de l&apos;autre côté de l&apos;Atlantique, nous avons
                repéré un véritable manque en France. Boards de direction coûteux, process lourds,
                mentorats peu calibrés — les entrepreneurs français doivent faire face à un
                véritable challenge simplement pour pouvoir se faire aider.
              </p>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                Avec le système d&apos;Operating Partner, vous gardez la flexibilité du début,
                vous ne rendez des comptes qu&apos;à vous même, et vous déléguez tout
                l&apos;opérationnel pour vous concentrer sur votre vision.
              </p>
              <Link href="/concept/methode-op-x" className={`self-start ${btnViolet}`}>
                Découvrir la méthode OP-X
                <Arrow />
              </Link>
            </div>
            <div className="w-[420px] shrink-0 overflow-hidden rounded-[16px] max-[767px]:w-full">
              <Image
                src="/images/68f091a6c74395c7e1f6dbd6__LRG5128.avif"
                alt="Operating Partners travaillant en extérieur"
                width={840}
                height={620}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Galerie photos ───────────────────────────────────────── */}
      <section className="mx-auto w-full overflow-hidden">
        <div className={containerClass}>
          <div className="grid grid-cols-3 gap-3 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1">
            {galleryImages.slice(0, 6).map((img, i) => (
              <div key={i} className="overflow-hidden rounded-[12px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={420}
                  height={300}
                  className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Les équipes ──────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                L&apos;équipe
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Les Operating Partners et{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">Experts</span>{' '}
                de l&apos;écosystème
              </h2>
            </div>
            <div className="flex gap-6 max-[767px]:flex-col">
              <div className={`flex flex-1 flex-col gap-4 rounded-[12px] p-8 ${glassClass}`}>
                <Image
                  src="/images/68df8890e6904420ead0e52d_HPG_website_icon_op.svg"
                  alt=""
                  width={40}
                  height={40}
                />
                <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                  Les OP
                </h3>
                <p className="font-thin leading-[1.6] text-[#cfcfcf]">
                  Ils vous accompagnent au quotidien, vous allègent, et vous aident à prendre
                  les décisions.
                </p>
              </div>
              <div className={`flex flex-1 flex-col gap-4 rounded-[12px] p-8 ${glassClass}`}>
                <Image
                  src="/images/68df8890c37be4d65a5b1cf4_HPG_website_icon_experts.svg"
                  alt=""
                  width={40}
                  height={40}
                />
                <h3 className="font-instrument-italic italic text-[1.5rem] leading-[1.2]">
                  Les Experts
                </h3>
                <p className="font-thin leading-[1.6] text-[#cfcfcf]">
                  Ils exécutent, apportent leur expertise et vous accompagnent sur une mission
                  précise.
                </p>
              </div>
            </div>
            <Link href="/lecurie/les-op" className={`self-start ${btnViolet}`}>
              Découvrir les profils
              <Arrow />
            </Link>
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
                Vous voulez un Operating Partner{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">à vos côtés ?</span>
              </h2>
              <p className="max-w-[480px] font-thin leading-[1.7] text-[#cfcfcf]">
                Un appel de 30 minutes avec Killian pour évaluer votre contexte et voir si le fit est là.
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
