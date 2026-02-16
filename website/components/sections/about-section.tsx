import Image from 'next/image'
import Link from 'next/link'

const fullContainerClass =
  'mx-auto flex max-w-[1300px] flex-col items-center justify-center px-8 py-4 max-[767px]:px-4 max-[479px]:mx-0 max-[479px]:px-0'

export function AboutSection() {
  return (
    <section className="mx-auto">
      <div className={fullContainerClass}>
        <div className="flex items-start gap-10 max-[767px]:flex-col max-[767px]:gap-6">
          <div className="w-[50%] shrink-0 overflow-hidden rounded-[12px] max-[767px]:w-full">
            <Image
              src="/images/68dfda277a4f4332ebf28661_OP3.avif"
              alt="Killian Palermo debout face à une table"
              width={1500}
              height={1000}
              className="w-full object-cover"
            />
          </div>

          <div className="sticky top-[120px] flex flex-col items-start gap-5 py-4 max-[767px]:static">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">L'écurie</span>

            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">
              15 projets créés, 7 <span className="font-instrument-italic italic text-[#f285f0]">échecs</span>, des millions générés : j'ai appris par l'<span className="font-instrument-italic italic text-[#f285f0]">expérience.</span>
            </h2>

            <p className="text-[0.95rem] font-thin leading-[1.7] text-[#cfcfcf]">
              J'ai lancé plus de 15 boîtes, j'en ai planté 7 et d'autres ont généré des millions, ce qui m'a
              permis de comprendre que le vrai défi, ce n'est pas de démarrer, c'est de scaler.
            </p>

            <p className="text-[0.95rem] font-thin leading-[1.7] text-[#cfcfcf]">
              J'ai donc créé un modèle simple et efficace : un Operating Partner qui avance avec toi, soutenu par
              des experts métiers.
            </p>

            <p className="text-[0.95rem] font-thin leading-[1.7] text-[#cfcfcf]">
              Pas de théorie juste du concret, de l'exécution et de la croissance maîtrisée.
            </p>

            <Link
              href="/lecurie/a-propos"
              className="mt-2 inline-flex items-center justify-center gap-8 rounded-[12px] border border-[#9a59c5] bg-[#7d3fab] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]"
            >
              <div>À propos</div>
              <Image src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg" alt="" width={20} height={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
