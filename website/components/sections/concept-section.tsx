import Image from 'next/image'
import Link from 'next/link'

const containerClass =
  'mx-auto block max-w-[1300px] overflow-auto px-[5rem] py-[2.5rem] max-[991px]:w-[95vw] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:w-[95vw] max-[479px]:max-w-[95vw] max-[479px]:px-0'

const glassCardClass =
  'relative isolate flex min-h-[300px] flex-row items-center justify-center gap-4 self-stretch rounded-[12px] border border-white/12 bg-[rgb(35_20_46_/_0.52)] px-[1.25rem] py-[2.2rem] backdrop-blur-[26px] [mask-image:radial-gradient(160%_160%_at_50%_50%,rgb(0_0_0_/_0.96)_42%,rgb(0_0_0_/_0.86)_64%,transparent_100%)] transition hover:-translate-y-0.5 hover:border-[#f285f059] hover:shadow-[0_24px_40px_rgb(7_2_12_/_0.35)] max-[479px]:min-h-[240px]'

export function ConceptSection() {
  return (
    <section className="mx-auto mb-16">
      <main className={containerClass}>
        <main className="flex flex-col items-center justify-center gap-3 max-[479px]:px-4">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">Le Concept</span>

          <div className="flex w-full flex-col items-center justify-center gap-12">
            <div className="flex w-[70%] flex-col items-center justify-between gap-8 p-4 text-center max-[991px]:w-auto">
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.08]">Le modèle <span className="font-instrument-italic italic text-[#f285f0]">OP-X</span></h2>
                <p className="text-base font-medium leading-[1.6] text-[#cfcfcf]">1 Operating Partner pour vous accompagner, +20 Experts pour éxecuter à vos côtés.</p>
              </div>
            </div>

            <div className="flex w-[70%] flex-row items-center justify-start gap-6 max-[991px]:w-auto max-[479px]:flex-col">
              <div className={glassCardClass}>
                <div className="flex flex-col gap-4 self-stretch text-left">
                  <Image
                    src="/images/68f24ba7f77ac21dc6e1fc31__LRG4850.avif"
                    alt="Portrait de l'Operating Partner Ulysse El Sherbeeny"
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] min-h-[70px] min-w-[70px] overflow-hidden rounded-[5px] object-cover object-[50%_20%]"
                  />
                  <div className="text-[1.5rem] leading-[1.2] font-instrument-italic italic">Operating Partner</div>
                  <div className="font-thin">
                    Un expert de la croissance rejoint votre équipe dirigeante pour piloter la croissance avec vous, au quotidien.
                  </div>
                </div>
              </div>

              <div className={`${glassCardClass} text-center`}>
                <div className="flex flex-col gap-4 self-stretch text-left">
                  <Image
                    src="/images/692a54175cc379b9eeaf3183_samuel-fernandes.avif"
                    alt="Portrait d'expert"
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] min-h-[70px] min-w-[70px] overflow-hidden rounded-[5px] object-cover object-[50%_20%]"
                  />
                  <div className="text-[1.5rem] leading-[1.2] font-instrument-italic italic">Experts</div>
                  <div className="font-thin">
                    20+ experts <span className="font-archivo-italic italic">A-players</span> exécutent pour vous, et mettent en place les stratégie imaginées par votre OP.
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/concept/methode-op-x"
              className="inline-flex items-center justify-center gap-8 rounded-[12px] border border-[#9a59c5] bg-[#7d3fab] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]"
            >
              <div>En savoir plus</div>
              <Image src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg" alt="" width={20} height={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </main>
      </main>
    </section>
  )
}
