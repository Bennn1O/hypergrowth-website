import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Méthode OP-X : la stratégie sur-mesure pour scaler votre entreprise | HyperGrowth',
  description: 'Accélérez sans chaos, sans surcharge, sans perte de vision grâce à la méthode OP-X.',
}

const containerClass =
  'hpg-container'

const glassClass =
  'hpg-glass-soft'

const btnViolet =
  'hpg-btn-violet group'

const btnOutline =
  'group inline-flex items-center justify-center gap-3 rounded-[12px] border border-white/20 bg-white/[0.03] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white transition-colors hover:border-white/40'

const Arrow = () => (
  <Image
    src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
    alt=""
    width={18}
    height={18}
    className="transition-transform duration-200 group-hover:-rotate-45"
  />
)

const CheckIcon = () => (
  <Image
    src="/images/68df8890acfc8334ff5e2f81_HPG_website_icon_check.svg"
    alt=""
    width={20}
    height={20}
    className="shrink-0"
  />
)

const opItems = [
  'Analyse vos données',
  'Priorise vos actions',
  'Structure vos process',
  'Coordonne les équipes',
  'Garantit un reporting clair',
]

const xDomains = [
  'Marketing & branding',
  'Sales',
  'Comptabilité',
  'Financement',
  'Et 20+ autres domaines',
]

const benefits = [
  {
    num: '001',
    title: "Brisez l'isolement du dirigeant",
    desc: "Vous n'êtes plus seul pour porter la vision, gérer les urgences et décider sous pression. Un vrai copilote entre dans la boucle.",
  },
  {
    num: '002',
    title: 'Gagnez du temps et prenez du recul',
    desc: "En nous confiant l'opérationnel, vous récupérez des heures précieuses pour penser, piloter et respirer.",
  },
  {
    num: '003',
    title: 'Boostez votre croissance sans perdre votre âme',
    desc: 'Chaque action vise à maximiser votre marge, accélérer votre scaling et alléger votre charge mentale.',
  },
  {
    num: '004',
    title: 'Préservez votre équilibre (et celui de votre équipe)',
    desc: "On réduit le stress et la confusion en créant un cadre clair, où chacun sait où il va et pourquoi. Moins de bruit, plus d'énergie.",
  },
  {
    num: '005',
    title: 'Profitez de méthodes testées sur le terrain',
    desc: "Nos OP et nos experts sont des A-players. Toutes les méthodes qu'ils utilisent sont validées sur le terrain depuis des années.",
  },
  {
    num: '006',
    title: "Retrouvez l'agilité du début, sans chaos",
    desc: "Votre environnement bouge ? On ajuste en temps réel. Vous gardez la vitesse d'une scale-up avec la structure d'un grand.",
  },
  {
    num: '007',
    title: 'Décidez avec clarté, guidé par la data',
    desc: "Plus de place au hasard et aux opérations à tâtons. On installe des systèmes de suivi pour éclairer chaque décision avec des indicateurs fiables.",
  },
]

const partnerLogos = [
  { src: '/images/logo-3.avif', alt: '' },
  { src: '/images/logo-4.avif', alt: '' },
  { src: '/images/logo-5.avif', alt: '' },
  { src: '/images/logo-6.avif', alt: '' },
  { src: '/images/logo-8.avif', alt: '' },
  { src: '/images/logo-10.avif', alt: '' },
  { src: '/images/logo-12.avif', alt: '' },
  { src: '/images/logo-13.avif', alt: '' },
]

export default function MethodeOpXPage() {
  return (
    <main className="flex flex-col items-stretch">
      <section className="relative overflow-hidden pt-[180px] pb-20 max-[767px]:pt-[130px] max-[767px]:pb-12">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[65vh] w-[55vw] opacity-30"
          style={{ background: 'radial-gradient(ellipse at 80% 0%, #7d3fab 0%, transparent 65%)' }}
        />
        <div className={containerClass}>
          <div className="flex flex-col items-center text-center gap-6">
            <span className="inline-block rounded border border-white/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/50">
              Le Concept
            </span>
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-[1.02]">
              La Méthode{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">OP-X</span>
            </h1>
            <p className="max-w-[500px] text-[1rem] font-normal leading-[1.7] text-hpg-silver">
              Accélérez sans chaos, sans surcharge, sans perte de vision grâce à la méthode OP-X
            </p>
            <Link href="/contact" className={btnViolet}>
              Réserver un appel
              <Arrow />
            </Link>
          </div>
          <div className="mt-16 flex flex-col gap-5">
            <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/30">
              Ils nous font confiance
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-40 max-[767px]:gap-5">
              {partnerLogos.map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-12">
            <div className="mx-auto flex max-w-[680px] flex-col items-center text-center gap-4">
              <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/50">
                Votre Problématique
              </span>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium leading-[1.1]">
                Votre hypercroissance amène du CA, mais aussi du flou et des{' '}
                <span className="font-instrument-italic italic text-hpg-orchid">noeuds.</span>
              </h2>
              <p className="text-[0.95rem] font-normal leading-[1.7] text-hpg-silver">
                Vous courez après les urgences, votre vision se trouble, et vous cherchez à
                reconstruire un business lisible, sans freiner l'élan actuel.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-[767px]:grid-cols-1">
              {[
                {
                  title: "Votre trésorerie s'évapore",
                  desc: 'Des priorités floues et mal hiérarchisées',
                },
                {
                  title: "Vos équipes s'épuisent",
                  desc: "La qualité de l'exécution dégringole",
                },
                {
                  title: "Vous pilotez à l'instinct",
                  desc: 'Au feeling, sans data, sans structure, sans recul',
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className={`flex flex-col justify-between gap-10 rounded-[12px] p-8 ${glassClass}`}
                >
                  <h3 className="text-[1.2rem] font-medium leading-[1.25]">{p.title}</h3>
                  <p className="text-[0.9rem] font-normal leading-[1.6] text-hpg-silver">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className={`flex flex-col gap-8 rounded-[12px] p-10 ${glassClass} max-[767px]:p-6`}>
            <div className="flex flex-col items-center text-center gap-4">
              <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/50">
                Le Concept
              </span>
              <h2 className="max-w-[520px] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1]">
                3 minutes pour savoir si le modèle est fait pour vous.
              </h2>
              <p className="max-w-[460px] text-[0.9rem] font-normal leading-[1.7] text-hpg-silver">
                Nous avons préparé une vidéo pour vous expliquer le concept HyperGrowth.
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-[8px]" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/3myod_Q7gm0"
                title="Concept HyperGrowth — Killian, Founder & OP"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <p className="text-center text-[0.8rem] text-white/40">Killian | Founder &amp; OP</p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div
            className={`flex flex-col items-center text-center gap-6 rounded-[12px] p-12 ${glassClass} max-[767px]:p-8`}
          >
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/40">
              Un écosystème riche en profils experts
            </span>
            <h2 className="max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08]">
              Jamais seul dans les{' '}
              <span className="font-instrument-italic italic text-hpg-orchid">décisions</span>
            </h2>
            <p className="max-w-[560px] text-[0.95rem] font-normal leading-[1.7] text-hpg-silver">
              Rejoindre HyperGrowth, c'est intégrer un cercle d'entrepreneurs partageant défis et
              succès. En plus de votre OP et des leurs experts, l'entraide et les retours
              d'expérience font naître une force collective inarrêtable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className={btnViolet}>
                <span>Réserver un appel</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col">
            <div className="flex items-center gap-16 py-16 max-[991px]:flex-col max-[991px]:gap-8 max-[767px]:py-10">
              <div className="flex flex-1 flex-col gap-8">
                <span className="font-instrument-italic italic text-[5.5rem] leading-none text-hpg-orchid max-[767px]:text-[4rem]">
                  OP
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-[1.12]">
                    1 Operating Partner prêt à piloter avec vous
                  </h2>
                  <p className="text-[0.9rem] font-normal leading-[1.7] text-hpg-silver">
                    Un expert du scale qui rejoint votre équipe dirigeante pour piloter la
                    croissance avec vous, au quotidien.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {opItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9rem] text-hpg-silver">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[0.9rem] font-normal leading-[1.6] text-white/50">
                  Vous n'êtes plus seul pour prendre les bonnes décisions et garder le cap.
                </p>
              </div>
              <div className="w-[320px] shrink-0 overflow-hidden rounded-[16px] max-[991px]:w-full max-[991px]:max-w-[420px]">
                <Image
                  src="/images/68dfda277a4f4332ebf28661_OP3.avif"
                  alt="Killian Palermo debout face à une table"
                  width={640}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="h-px bg-white/10" />
            <div className="flex items-center gap-16 py-16 max-[991px]:flex-col max-[991px]:gap-8 max-[767px]:py-10">
              <div className="flex flex-1 flex-col gap-8">
                <span className="font-instrument-italic italic text-[5.5rem] leading-none text-hpg-orchid max-[767px]:text-[4rem]">
                  X
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-[1.12]">
                    20 experts A-players prêts à exécuter pour vous
                  </h2>
                  <p className="text-[0.9rem] font-normal leading-[1.7] text-hpg-silver">
                    20 experts activés selon votre feuille de route, uniquement quand c'est
                    nécessaire.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {xDomains.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9rem] text-hpg-silver">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[0.9rem] font-normal leading-[1.6] text-white/50">
                  Ciblé, efficace, 100% orienté impact.
                </p>
              </div>
              <div className="w-[320px] shrink-0 overflow-hidden rounded-[16px] max-[991px]:w-full max-[991px]:max-w-[420px]">
                <Image
                  src="/images/68f2494c41e7f6f8102e921a__LRG4426-2.avif"
                  alt="Portrait de l'Operating Partner Julie Ducourau"
                  width={640}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="grid grid-cols-3 gap-4 max-[767px]:grid-cols-1">
            <div className="relative col-span-2 flex flex-col justify-between gap-6 overflow-hidden rounded-[12px] bg-hpg-violet-btn p-10 max-[767px]:col-span-1 max-[767px]:p-8">
              <span
                className="pointer-events-none absolute right-2 bottom-[-1rem] select-none text-[12rem] font-medium leading-none text-white/10 max-[767px]:text-[8rem]"
                aria-hidden="true"
              >
                07
              </span>
              <div className="relative z-10 flex flex-col gap-4">
                <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/60">
                  La méthode pensée autour de vos enjeux
                </span>
                <h2 className="max-w-[400px] text-[clamp(1.3rem,2.2vw,1.8rem)] font-medium leading-[1.15]">
                  Raisons pour lesquelles les CEO d'entreprises en{' '}
                  <span className="font-instrument-italic italic">HyperCroissance</span> adorent
                  cette approche
                </h2>
              </div>
              <Link
                href="/contact"
                className="group relative z-10 inline-flex items-center gap-3 self-start rounded-[10px] border border-white/30 bg-white/10 px-5 py-3 text-[0.85rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Démarrer votre projet
                <Image
                  src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:-rotate-45"
                />
              </Link>
            </div>
            {benefits.map((b) => (
              <div
                key={b.num}
                className={`flex flex-col gap-4 rounded-[12px] p-8 ${glassClass}`}
              >
                <span className="text-[0.7rem] font-medium text-white/30">{b.num}</span>
                <h3 className="text-[1rem] font-medium leading-[1.3]">{b.title}</h3>
                <p className="mt-auto text-[0.85rem] font-normal leading-[1.6] text-hpg-silver">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div
            className="relative flex items-center justify-between gap-12 overflow-hidden rounded-[12px] p-12 max-[991px]:flex-col max-[991px]:p-8"
            style={{
              background: 'linear-gradient(135deg, #3d1260 0%, #7d3fab 55%, #9b4faa 100%)',
            }}
          >
            <div className="relative z-10 flex max-w-[460px] flex-col gap-5">
              <span className="inline-block self-start rounded border border-white/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/70">
                Le score de scalabilité
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08]">
                Votre projet est-il scalable ?
              </h2>
              <p className="text-[0.9rem] font-normal leading-[1.7] text-white/80">
                Comprendre le potentiel de scalabilité de votre projet est la meilleure manière de
                commencer à prendre les bonnes décisions business dès aujourd'hui.
              </p>
              <p className="text-[0.9rem] font-normal leading-[1.7] text-white/80">
                Répondez au questionnaire et découvrez votre score, pour vous faire une idée du
                potentiel concret de votre entreprise.
              </p>
              <Link
                href="/concept/test-de-scalabilite"
                className="group self-start inline-flex items-center gap-3 rounded-[12px] border border-white/40 bg-white/15 px-6 py-[0.85rem] text-[0.9rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                Découvrir votre scalabilité
                <Image
                  src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:-rotate-45"
                />
              </Link>
            </div>
            <div className="w-[380px] shrink-0 overflow-hidden rounded-[12px] max-[991px]:w-full max-[991px]:max-w-[420px]">
              <Image
                src="/images/68f091a6c74395c7e1f6dbd6__LRG5128.avif"
                alt="Photo de 3 Operating Partners travaillant en extérieur"
                width={760}
                height={560}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/40">
                Nos résultats
              </span>
              <h2 className="max-w-[640px] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.12]">
                Au travers de nos case studies, nous vous livrons une vision chiffrée de l'impact
                que nous avons eu sur certains de nos clients.
              </h2>
              <Link href="/concept/case-studies" className={`self-start mt-2 ${btnViolet}`}>
                <span>Nos études de cas</span>
                <Arrow />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1">
              {[
                { value: '400M€', label: "de chiffre d'affaire piloté" },
                { value: '150+', label: 'dirigeants accompagnés' },
                { value: '80+', label: "membres de l'HyperClub" },
                { value: '+7M€', label: "levés par nos clients" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className={`flex flex-col gap-2 rounded-[12px] p-8 ${glassClass}`}
                >
                  <span className="text-[2rem] font-medium text-hpg-orchid">{stat.value}</span>
                  <span className="text-[0.85rem] font-normal text-hpg-silver">{stat.label}</span>
                </div>
              ))}
            </div>
            <div
              className={`flex gap-8 rounded-[12px] p-10 ${glassClass} max-[767px]:flex-col max-[767px]:p-8`}
            >
              <div className="flex flex-1 flex-col gap-6">
                <Image
                  src="/images/68f62f2bf8f3beee3f75c9cb_HPG_website_icon_quote_blanc.svg"
                  alt=""
                  width={36}
                  height={28}
                  className="opacity-50"
                />
                <p className="text-[1rem] font-normal leading-[1.7] text-white/90">
                  Killian possède des qualités d'analyse humaines et structurelles qui peuvent
                  faire changer grandement les choses sur une entreprise en croissance. Il est à
                  la fois votre accélérateur et le pilier d'une structure organisée et surtout
                  efficace !
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-6">
                  <Image
                    src="/images/6921580b599cf93460328c8c_IMG_8814.webp"
                    alt="Adrien Charles-Nicolas & Vincent Mongis"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-[0.9rem] font-medium">
                      Adrien Charles-Nicolas & Vincent Mongis
                    </p>
                    <p className="text-[0.8rem] text-white/50">CEO @ Pureva</p>
                  </div>
                  <Image
                    src="/images/68e76c318862de30ebd604fd_HPG_website_icon_in.svg"
                    alt="LinkedIn"
                    width={18}
                    height={18}
                    className="opacity-50"
                  />
                </div>
              </div>
              <div className="flex w-[260px] shrink-0 flex-col gap-4 max-[767px]:w-full max-[767px]:flex-row max-[479px]:flex-col">
                <div className={`flex flex-1 flex-col gap-2 rounded-[12px] p-6 ${glassClass}`}>
                  <span className="text-[2.2rem] font-medium text-hpg-orchid">+230%</span>
                  <span className="text-[0.8rem] font-normal leading-[1.5] text-hpg-silver">
                    Croissance de l'ARR depuis le début de l'accompagnement.
                  </span>
                </div>
                <div className={`flex flex-1 flex-col gap-2 rounded-[12px] p-6 ${glassClass}`}>
                  <span className="text-[2.2rem] font-medium text-hpg-orchid">+100K€</span>
                  <span className="text-[0.8rem] font-normal leading-[1.5] text-hpg-silver">
                    Trésorerie récupérée via optimisation financière.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
