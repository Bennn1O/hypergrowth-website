import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Témoignages clients | HyperGrowth',
  description:
    'Ce que nos clients disent de leur accompagnement HyperGrowth. 150+ dirigeants accompagnés, 97% de satisfaction.',
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

const clientLogos = [
  { src: '/images/68f246d99c0f71325b0fa8c9_10.avif', alt: '' },
  { src: '/images/68f246d902445111cfe4d20d_8.avif', alt: '' },
  { src: '/images/68f246d8f3f048136e02e401_3.avif', alt: '' },
  { src: '/images/68f246d82979e450b678014f_6.avif', alt: '' },
  { src: '/images/68f246d829b9ad261622ba22_12.avif', alt: '' },
  { src: '/images/68f246d8564c0248e12490c9_5.avif', alt: '' },
  { src: '/images/68f246d8728a7b045347ea0f_logo-sova-care.svg', alt: '' },
  { src: '/images/68f246d863b4e3d783e683cf_14.avif', alt: '' },
  { src: '/images/68f246d8360b7b49e57bcd69_13.avif', alt: '' },
  { src: '/images/68f246d85e5a645da800b0a9_4.avif', alt: '' },
  { src: '/images/690b518dd86eff19215d6875_HPG_web_logos-partenaires_12.avif', alt: '' },
  { src: '/images/690b518d4cca311dae76b1e0_HPG_web_logos-partenaires_14.avif', alt: '' },
  { src: '/images/690b518c1b1be138f398eb4e_HPG_web_logos-partenaires_13.avif', alt: '' },
  { src: '/images/690b518ce5274c3996037d83_HPG_web_logos-partenaires_11.avif', alt: '' },
]

const testimonials = [
  {
    name: 'Gabriel Girardon Pazienza',
    role: 'CEO',
    company: 'Bleue Citadelle',
    companyUrl: 'https://bleuecitadelle.com',
    linkedin: 'https://www.linkedin.com/in/gabriel-girardon/',
    photo: '/images/694a7ec9e29d606df2d8a44a_1632819833484.avif',
    quote:
      "L'équipe HG a su s'adapter à ma posture d'agence particulière et me proposer un plan de scaling efficace et ultra personnalisé. En alliant le perso et le pro, mon projet a pris une toute autre envergure tout en m'évitant un surménage qui me semblait inévitable. Un énorme contraste avec les vendeurs de rêve qui pullulent dans la sphère du consulting, grâce à leur mélange de théorie et de concret. Je recommande chaudement à tous les entrepreneurs/dirigeants qui cherchent à passer un cap tout en restant lean et orientés action !",
  },
  {
    name: 'Jérôme Girard',
    role: 'Co-Fondateur',
    company: 'La Draft',
    companyUrl: 'https://ladraft.co/',
    linkedin: 'https://www.linkedin.com/in/jerome-girard-789b3b86/',
    photo: '/images/69496827d7541b3e2da5264b_1718637287531.avif',
    quote:
      "Cela fait maintenant 1 an que nous sommes accompagnés par Killian et son équipe et je peux dire sans hésitation que c'est l'une des meilleures décisions que nous avons prises pour notre business. Dès le début, il a su cerner nos besoins, je recommande !",
  },
  {
    name: 'Guillaume Vilain',
    role: 'CEO & Fondateur',
    company: 'Nophone',
    companyUrl: 'https://nophone.fr/',
    linkedin: 'https://www.linkedin.com/in/guillaumevilain/',
    photo: '/images/692a4d1a157b842ff1c96414_guillaume-vilain.avif',
    quote:
      "Je travaille avec HyperGrowth, principalement avec Killian et Julie depuis plusieurs mois et le moins que je puisse dire, c'est que l'accompagnement a carrément changé ma manière de piloter mon entreprise. Killian joue un véritable rôle de co-CEO : il m'aide à prendre du recul, à clarifier mes priorités et à identifier les bons leviers de croissance. On ne parle pas seulement de stratégie sur le papier, mais de mise en œuvre concrète, avec des systèmes, des process et des metrics qui me permettent enfin de visualiser pour piloter l'hypercroissance sans la subir.",
  },
  {
    name: 'Marion Carneiro',
    role: 'CEO',
    company: 'My Name Is Bond',
    companyUrl: 'https://mynameisbond.co/',
    linkedin: 'https://www.linkedin.com/in/marion-carneiro/',
    photo: '/images/691ef3e19b06a667ffe4e9e3_1761652261110.avif',
    quote:
      "Je recommande vivement Killian pour toute personne cherchant à faire passer son business au niveau supérieur. Quand j'étais confrontée à des défis majeurs qui freinaient la croissance de mon agence My Name Is Bond, Killian a su identifier rapidement ce qui n'allait pas en se basant sur de la data. Grâce à son expertise et à sa vision claire, il m'a aidé à comprendre ce qui limitait notre progression.",
  },
  {
    name: 'Adrien Charles-Nicolas',
    role: 'Co-Founder',
    company: 'Pureva',
    companyUrl: 'https://pureva.com',
    linkedin: 'https://www.linkedin.com/in/adrien-charles-nicolas-b819b6157/',
    photo: '/images/691ef31be310bc7c21652011_1707318975322.avif',
    quote:
      "Killian possède des qualités d'analyse humaines et structurelles qui peuvent faire changer grandement les choses sur une entreprise en croissance. Il est à la fois votre accélérateur et le pilier d'une structure organisée et surtout efficace !",
  },
]

export default function TemoignagesPage() {
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
              Communauté
            </span>
            <h1 className="text-[clamp(4rem,9vw,7.5rem)] font-bold leading-[1]">
              Témoignages
            </h1>
            <p className="max-w-[500px] font-thin leading-[1.7] text-[#cfcfcf]">
              Ce que nos clients disent de leur accompagnement.
            </p>
          </div>
        </div>
      </section>

      {/* ── Logos clients ────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-4">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
              Ils nous font confiance
            </span>
            <div className="flex flex-wrap items-center gap-8 opacity-50 max-[767px]:gap-5">
              {clientLogos.map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="h-7 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Témoignages ──────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex flex-col gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-6 rounded-[12px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-[8px] max-[767px]:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#f285f0]">
                    Témoignage
                  </span>
                  <Image
                    src="/images/68f62f2bf8f3beee3f75c9cb_HPG_website_icon_quote_blanc.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="shrink-0 opacity-20"
                  />
                </div>
                <p className="text-[0.95rem] leading-[1.75] text-[#cfcfcf]">{t.quote}</p>
                <div className="flex items-center gap-4 border-t border-white/[0.06] pt-6">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.9rem] font-medium">{t.name}</span>
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:opacity-70"
                      >
                        <Image
                          src="/images/68e76c318862de30ebd604fd_HPG_website_icon_in.svg"
                          alt="LinkedIn"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-[0.8rem] text-[#cfcfcf]">
                      <span className="font-instrument-italic italic text-[#f285f0]">{t.role}</span>
                      <span>@</span>
                      <a
                        href={t.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-white/20 underline-offset-2 transition hover:decoration-white/60"
                      >
                        {t.company}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HyperClub CTA ────────────────────────────────────────── */}
      <section className="mx-auto w-full">
        <div className={containerClass}>
          <div className="flex items-center gap-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02] max-[767px]:flex-col">
            <div className="flex flex-1 flex-col gap-5 p-10 max-[767px]:p-8">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                L&apos;HyperClub
              </span>
              <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
                Une communauté qui vous{' '}
                <span className="font-instrument-italic italic text-[#f285f0]">comprend</span>
              </h2>
              <p className="font-thin leading-[1.7] text-[#cfcfcf]">
                En rejoignant HyperGrowth, vous intégrez un collectif engagé, qui vous fait
                avancer plus vite, réfléchir plus justement, et accéder aux bonnes personnes
                au bon moment.
              </p>
              <Link href="/communaute/hyperclub" className={`self-start ${btnViolet}`}>
                Rejoindre l&apos;HyperClub
                <Arrow />
              </Link>
            </div>
            <div className="w-[360px] shrink-0 overflow-hidden max-[767px]:w-full">
              <Image
                src="/images/68dff51fedf4c46812d51800_club.avif"
                alt="Membres HyperClub"
                width={720}
                height={540}
                className="h-[360px] w-full object-cover max-[767px]:h-[240px]"
              />
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
              Nous avons créé ce questionnaire pour aider les founders à faire un état des
              lieux. Remplissez le en moins de 5 minutes.
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
