import Image from 'next/image'
import Link from 'next/link'

const fullContainerClass =
  'mx-auto flex max-w-[1300px] flex-col items-center justify-center px-8 py-4 max-[767px]:px-4 max-[479px]:mx-0 max-[479px]:px-0'

export function CommunitySection() {
  return (
    <section className="mx-auto">
      <div className={fullContainerClass}>
        <div className="flex items-start gap-10 max-[767px]:flex-col max-[767px]:gap-6">
          <div className="w-[50%] shrink-0 overflow-hidden rounded-[12px] max-[767px]:w-full">
            <Image
              src="/images/68dff51fedf4c46812d51800_club.avif"
              alt="Photo depuis les loges surmontant un circuit de formule 1, réservé aux membres du HyperClub"
              width={480}
              height={640}
              className="w-full object-cover"
            />
          </div>

          <div className="sticky top-[120px] flex flex-col items-start gap-5 py-4 max-[767px]:static">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">Communauté</span>

            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium leading-[1.08]">Une <span className="font-instrument-italic italic text-[#f285f0]">communauté</span> qui vous comprend</h2>

            <p className="text-[0.95rem] font-thin leading-[1.7] text-[#cfcfcf]">
              En rejoignant HyperGrowth, vous intégrez un collectif engagé, qui vous fait avancer plus vite,
              réfléchir plus justement, et accéder aux bonnes personnes au bon moment.
            </p>

            <Link
              href="/communaute/hyperclub"
              className="mt-2 inline-flex items-center justify-center gap-8 rounded-[12px] border border-[#9a59c5] bg-[#7d3fab] px-6 py-[0.85rem] text-[0.9rem] font-medium tracking-[0.02em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_14px_30px_rgb(25_8_40_/_0.45)] group transition-colors hover:border-[#f285f0] hover:bg-[#1a0d28] hover:text-[#f285f0]"
            >
              <div>HyperClub</div>
              <Image src="/images/68df8890ec2e4ea24f700e96_HPG_website_icon_arrow.svg" alt="" width={20} height={20} className="transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
