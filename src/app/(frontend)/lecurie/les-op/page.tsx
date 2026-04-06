import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "L'Équipe HyperGrowth : Operating Partners & Experts",
  description:
    "Découvrez les Operating Partners et les Experts qui constituent l'écosystème HyperGrowth pour accompagner les dirigeants en hypercroissance.",
}

const containerClass =
  'hpg-container'

const glassClass =
  'hpg-glass'

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

const ops = [
  {
    name: 'Ulysse El Sherbeeny',
    role: 'CEO & OP',
    tagline: 'Expert du scaling personnel pour dirigeants',
    specialties: ['Diagnostic de Scalabilité', 'Lead Generation', 'Stratégie Marketing & Vente'],
    photo: '/images/691a9c6ffd17d3b642956b6f_Profil.avif',
    linkedin: 'https://www.linkedin.com/in/ulysse-el-sherbeeny/',
  },
  {
    name: 'Manon Werquin',
    role: 'Operating Partner',
    tagline: "Accompagne dirigeants et indépendants dans la structuration",
    specialties: ['Stratégie Marketing & Vente', 'Structuration d\'entreprise', 'Lead Generation'],
    photo: '/images/691d6cf72d819a8d8fb58687_manon-werquin.avif',
    linkedin: 'https://www.linkedin.com/in/manon-werquin/',
  },
  {
    name: 'Evan Riquelme',
    role: 'Operating Partner',
    tagline: "Copywriter spécialisé en direct response et systèmes d'acquisition",
    specialties: ['Lead Generation', 'Stratégie Marketing & Vente', 'Diagnostic de Scalabilité'],
    photo: '/images/691c04b0968fd7912c9495f0_evan.avif',
    linkedin: 'https://www.linkedin.com/in/evan-riquelme/',
  },
  {
    name: 'Benjamin Brémont',
    role: 'Operating Partner',
    tagline: 'Consultant en croissance spécialisé CRM et acquisition',
    specialties: ['Diagnostic de Scalabilité', 'Lead Generation', 'Structuration d\'entreprise'],
    photo: '/images/691c03760aa8bdaef402445a_6.avif',
    linkedin: 'https://www.linkedin.com/in/benjamin-bremont/',
  },
  {
    name: 'Julie Simon',
    role: 'Operating Partner',
    tagline: 'COO / Operating Partner externalisée',
    specialties: ['Stratégie Marketing & Vente', 'Lead Generation', 'Structuration d\'entreprise'],
    photo: '/images/691c061ffd35bc39df62402e_4.avif',
    linkedin: 'https://www.linkedin.com/in/julie-simon-op/',
  },
  {
    name: 'Julie Ducourau',
    role: 'Operating Partner',
    tagline: 'Responsable des opérations chez HyperGrowth',
    specialties: ['Lead Generation', 'Structuration d\'entreprise', 'Diagnostic de Scalabilité'],
    photo: '/images/691c030a24953cec9fda438c_2.avif',
    linkedin: 'https://www.linkedin.com/in/julie-ducourau/',
  },
  {
    name: 'Killian Palermo',
    role: 'Fondateur',
    tagline: "Entrepreneur et operating partner spécialisé dans l'hypercroissance",
    specialties: ['Diagnostic de Scalabilité', 'Stratégie Marketing & Vente', 'Structuration d\'entreprise'],
    photo: '/images/691c0365fd35bc39df5fa328_8.avif',
    linkedin: 'https://www.linkedin.com/in/killian-palermo/',
  },
]

const experts = [
  {
    name: 'Gabriel Girardon',
    role: 'Expert en branding',
    tagline: 'Expert en image de marque visuelle et verbale',
    specialty: 'Design Graphique, Web design, UX/UI',
    photo: '/images/692d6588601597f7adcd0b96_portrait.avif',
  },
  {
    name: 'Anthony Diochon',
    role: 'Expert-comptable',
    tagline: 'Cabinet sur-mesure pour dirigeants, parcours KPMG France et Canada',
    specialty: 'Comptabilité & Finances',
    photo: '/images/69246e7904d0945af5d37bb6_anthony-diochon.avif',
  },
  {
    name: 'Elise Hetsch',
    role: 'Nutritherapeute',
    tagline: 'Aide les dirigeants à reprendre le pouvoir sur leur énergie',
    specialty: 'Nutrition & Santé',
    photo: '/images/69245b88607064c4ad4689d2_elise-hetsch.avif',
  },
  {
    name: 'Samuel Fernandes',
    role: 'Expert Live Events',
    tagline: 'Fait passer les entreprises de 200k€ à 1M€/an grâce aux Live Events',
    specialty: 'Live Events (Webinaires)',
    photo: '/images/69245a7ec8515e0a48e321d0_samuel-fernandes.avif',
  },
  {
    name: 'Guillaume Pesnel',
    role: 'Expert CRM/Email',
    tagline: "Maîtrise Klaviyo comme peu d'équipes en France. Emails pensés pour générer du chiffre",
    specialty: 'CRM & Email Marketing',
    photo: '/images/692458acf8b048f9a195d760_guillaume-pesnel.avif',
  },
]

export default function LesOpPage() {
  return (
    <main className="flex flex-col items-stretch">
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
              L&apos;Équipe
            </h1>
            <p className="max-w-[560px] font-thin leading-[1.7] text-hpg-silver">
              Découvrez les Operating Partners et les Experts qui constituent
              l&apos;éco-système HyperGrowth.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Les Operating Partners
              </span>
              <p className="max-w-[500px] font-thin leading-[1.7] text-hpg-silver">
                Ils vous accompagnent au quotidien, vous allègent, et vous aident à prendre
                les décisions.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1">
              {ops.map((op) => (
                <div
                  key={op.name}
                  className={`flex flex-col gap-5 rounded-[12px] p-6 ${glassClass} transition hover:-translate-y-0.5 hover:border-hpg-orchid/19`}
                >
                  <Image
                    src={op.photo}
                    alt={`Portrait de ${op.name}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-[8px] object-cover object-top"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">{op.name}</h3>
                    <p className="text-[0.8rem] text-hpg-orchid">{op.role}</p>
                  </div>
                  <p className="flex-1 text-[0.85rem] font-thin leading-[1.6] text-hpg-silver">
                    {op.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {op.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-white/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={op.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[0.8rem] text-white/40 transition hover:text-white"
                  >
                    <Image
                      src="/images/68e76c318862de30ebd604fd_HPG_website_icon_in.svg"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                    />
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                Les Experts
              </span>
              <p className="max-w-[500px] font-thin leading-[1.7] text-hpg-silver">
                Ils exécutent, apportent leur expertise et vous accompagnent sur une mission
                précise.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1">
              {experts.map((expert) => (
                <div
                  key={expert.name}
                  className={`flex flex-col gap-5 rounded-[12px] p-6 ${glassClass}`}
                >
                  <Image
                    src={expert.photo}
                    alt={`Portrait de ${expert.name}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-[8px] object-cover object-top"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">{expert.name}</h3>
                    <p className="text-[0.8rem] text-hpg-orchid">{expert.role}</p>
                  </div>
                  <p className="flex-1 text-[0.85rem] font-thin leading-[1.6] text-hpg-silver">
                    {expert.tagline}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-white/60 self-start">
                    {expert.specialty}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
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
