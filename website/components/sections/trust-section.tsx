import Image from 'next/image'

const logos = [
  '68f246d99c0f71325b0fa8c9_10.avif',
  '68f246d902445111cfe4d20d_8.avif',
  '68f246d8f3f048136e02e401_3.avif',
  '690b518c1b1be138f398eb4e_HPG_web_logos-partenaires_13.avif',
  '690b518ce5274c3996037d83_HPG_web_logos-partenaires_11.avif',
]

export function TrustSection() {
  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <p className="text-center text-white/40 text-sm mb-12">Ils nous font confiance</p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
          {logos.map((logo) => (
            <div key={logo} className="relative w-32 h-12">
              <Image
                src={`/images/${logo}`}
                alt="Client logo"
                fill
                className="object-contain filter grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
