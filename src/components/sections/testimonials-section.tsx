import Image from 'next/image'
import { StarIcon } from 'hugeicons-react'

const testimonialAvatars = [
  {
    src: '/images/portrait-julianne.avif',
    alt: 'Portrait de Julianne Aknine, fondatrice de Greenissime',
  },
  {
    src: '/images/portrait-marion.avif',
    alt: 'Portrait de Marion Carneiro, fondatrice de My Name is Bond',
  },
  {
    src: '/images/portrait-eva.avif',
    alt: 'Portrait de Eva Lecoq, fondatrice de SOVA care',
  },
  {
    src: '/images/portrait-laura.avif',
    alt: 'Portrait de Laura Chetail, fondatrice de KOKO Kombucha',
  },
]

export function TestimonialsSection() {
  return (
    <section className="my-32 mx-auto max-w-[1440px] px-6 lg:px-20">
      <div className="flex flex-col gap-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          {/* Left */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-4 border border-[#cfcfcf]/25 rounded-[5px] px-6 py-[0.6em] w-fit">
              <div className="text-sm font-light text-white/60">Communauté</div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Ils parlent de nous
            </h2>
            <div className="text-base md:text-lg text-white/70 font-light">
              HyperGrowth c'est plus de 150 dirigeants accompagnés, et autant de
              retours positifs.
            </div>
          </div>

          {/* Right - Avatar Stack & Rating */}
          <div className="flex flex-col gap-4 items-start lg:items-end">
            {/* Portrait Stack */}
            <div className="flex -space-x-4">
              {testimonialAvatars.map((avatar, idx) => (
                <Image
                  key={idx}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-[#180a22]"
                />
              ))}
            </div>

            {/* StarIcon Rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  size={15}
                  className="text-hpg-orchid"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Testimonials (would be CMS driven) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for testimonial cards from CMS */}
          <div className="bg-[rgba(24,10,34,0.8)] backdrop-blur-[10px] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  size={15}
                  className="text-hpg-orchid"
                />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed text-sm md:text-base">
              Excellent accompagnement, vraiment à l'écoute et avec de vrais
              conseils pratiques pour scaler.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Image
                src="/images/portrait-julianne.avif"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-sm font-bold">Client HyperGrowth</div>
                <div className="text-xs text-white/60">CEO</div>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(24,10,34,0.8)] backdrop-blur-[10px] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  size={15}
                  className="text-hpg-orchid"
                />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed text-sm md:text-base">
              Une méthodologie qui fonctionne. L'équipe est hyper réactive et sait
              exactement où mettre les efforts.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Image
                src="/images/portrait-marion.avif"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-sm font-bold">Client HyperGrowth</div>
                <div className="text-xs text-white/60">Founder</div>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(24,10,34,0.8)] backdrop-blur-[10px] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  size={15}
                  className="text-hpg-orchid"
                />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed text-sm md:text-base">
              J'ai enfin quelqu'un qui comprend mes défis et qui m'aide à
              structurer ma croissance.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Image
                src="/images/portrait-eva.avif"
                alt="Client"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-sm font-bold">Client HyperGrowth</div>
                <div className="text-xs text-white/60">CEO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
