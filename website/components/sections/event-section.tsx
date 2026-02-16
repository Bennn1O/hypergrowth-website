import Link from 'next/link'

export function EventSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-2xl">
            <div className="inline-flex mb-6 w-fit">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <p className="text-xs md:text-sm font-medium text-white/70">Communauté</p>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Évènements & lives
            </h2>
            <p className="text-base md:text-lg text-white/60">
              Chaque année, dans le cadre de l'HyperClub, nous organisons plusieurs évènements
              à destination d'entrepreneurs et de dirigeants afin d'explorer ensemble des
              problématiques business et de créer un réseau solide.
            </p>
          </div>

          {/* Event Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Café Croissance */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 hover:border-white/20 transition-colors duration-300">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Café Croissance
                </h3>
                <div className="inline-flex">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70">
                    Ouvert au public
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Un format <em>hot seat</em> de 8h à 15h. Vous présentez votre projet face à
                10 entrepreneurs et dirigeants confirmés, repartez avec une analyse claire et
                un plan d'action structuré.
              </p>
            </div>

            {/* Card 2: Mastermind */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 hover:border-white/20 transition-colors duration-300">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Mastermind
                </h3>
                <div className="inline-flex">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70">
                    Sur candidature
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                De 4 à 10 jours dans un lieu privé à l'étranger. Activités, ateliers, échanges
                et networking. Vous créez un réseau solide et vivez une expérience unique avec
                d'autres dirigeants.
              </p>
            </div>

            {/* Card 3: Dîners HyperClub */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 hover:border-white/20 transition-colors duration-300">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Dîners HyperClub
                </h3>
                <div className="inline-flex">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70">
                    Réservé aux membres
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Un dîner d'exception avec 6 à 8 entrepreneurs et dirigeants confirmés. Un
                moment exclusif pour échanger, créer des synergies et tisser des relations
                fortes autour d'une belle table.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/communaute/evenements"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              Découvrir tous les évènements
            </Link>
            <Link
              href="/communaute/hyperclub"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 bg-white/5 hover:bg-white/10 transition-colors"
            >
              En savoir plus sur HyperClub
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
