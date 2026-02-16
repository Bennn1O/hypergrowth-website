import Image from 'next/image'
import Link from 'next/link'

export function ScalabilityTestSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[linear-gradient(135deg,#2a0e30_0%,#1a0822_40%,#180a22_100%)] px-0 py-20">

      <div className="mx-auto w-full max-w-none overflow-visible px-0">
        <div className="mx-auto flex max-w-[1400px] flex-row items-center justify-center gap-20 px-[clamp(1rem,5vw,5rem)] max-[991px]:flex-col max-[991px]:gap-12 max-[479px]:px-4">
          <div className="flex flex-1 flex-col items-start gap-5 text-left max-[991px]:w-full">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">Le score de scalabilité</span>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">Votre projet est-il <span className="font-instrument-italic italic text-[#f285f0]">scalable</span> ?</h2>

            <p className="text-[0.95rem] leading-[1.7] text-[#cfcfcf]">
              Comprendre le potentiel de scalabilité de votre projet est la meilleure manière de commencer à prendre
              les bonnes décisions business dés aujourd'hui. Répondez au questionnaire et découvrez votre score.
            </p>

            <Link
              href="/concept/test-de-scalabilite"
              className="mt-1 inline-flex items-center justify-center gap-8 rounded-[12px] border border-[#9a59c5] bg-[#7d3fab] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]"
            >
              <div>Découvrir votre scalabilité</div>
              <Image src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg" alt="" width={20} height={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>

          <div className="flex w-[500px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-white/10 shadow-[0_26px_48px_rgb(6_2_10_/_0.35)] max-[991px]:w-full">
            <Image
              src="/images/68f091a6c74395c7e1f6dbd6__LRG5128.avif"
              alt="Photo de 3 Operating Partner travaillant en extérieur, avec une vue de Bordeaux en fond"
              width={920}
              height={690}
              className="block aspect-[4/3] w-full object-cover object-[45%_50%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
