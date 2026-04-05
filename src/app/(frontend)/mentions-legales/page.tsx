import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions Légales | HyperGrowth',
  description:
    "Consultez les mentions légales du site HyperGrowth : éditeur, hébergeur, propriété intellectuelle, cookies et données personnelles.",
}

const containerClass =
  'mx-auto block max-w-[960px] px-[5rem] py-[2.5rem] max-[991px]:max-w-[95vw] max-[991px]:px-[2.5rem] max-[767px]:px-4 max-[479px]:max-w-[95vw] max-[479px]:px-4'

export default function MentionsLegalesPage() {
  return (
    <main className="flex flex-col items-stretch">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[180px] pb-8 max-[767px]:pt-[130px]">
        <div className={containerClass}>
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
            Légal
          </span>
          <h1 className="mt-4 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1]">
            Mentions Légales
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section className="mx-auto w-full pb-16">
        <div className={containerClass}>
          <div className="flex flex-col gap-10 text-[0.95rem] font-thin leading-[1.8] text-hpg-silver">
            {/* Éditeur */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Éditeur du site
              </h2>
              <p>
                Le site hypergrowth.fr est édité par :
              </p>
              <ul className="flex flex-col gap-1 pl-5">
                <li>Raison sociale : HyperGrowth</li>
                <li>Forme juridique : Société par actions simplifiée (SAS)</li>
                <li>Capital social : 1 000 €</li>
                <li>SIRET : 979 194 503 00012</li>
                <li>SIREN : 979 194 503</li>
                <li>N° TVA intracommunautaire : FR19979194503</li>
                <li>Code NAF : 7022Z — Conseil pour les affaires et autres conseils de gestion</li>
                <li>Siège social : 9 Rue de Condé, 33000 Bordeaux</li>
                <li>Directeur de la publication : Killian Palermo</li>
                <li>
                  Contact :{' '}
                  <a
                    href="mailto:contact@hypergrowth.fr"
                    className="text-hpg-orchid transition hover:opacity-70"
                  >
                    contact@hypergrowth.fr
                  </a>
                </li>
              </ul>
            </div>

            {/* Hébergeur */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Hébergeur
              </h2>
              <ul className="flex flex-col gap-1 pl-5">
                <li>Raison sociale : Vercel Inc.</li>
                <li>Adresse : 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis</li>
                <li>Site web : vercel.com</li>
              </ul>
            </div>

            {/* Propriété intellectuelle */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur le site hypergrowth.fr
                (textes, images, graphismes, logo, icônes, vidéos, sons, logiciels,
                mises en page, bases de données) est protégé par le droit d&apos;auteur
                et le droit de la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication,
                adaptation de tout ou partie des éléments du site, quel que soit le
                moyen ou le procédé utilisé, est interdite sans l&apos;autorisation
                écrite préalable de l&apos;éditeur.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l&apos;un quelconque
                des éléments qu&apos;il contient sera considérée comme constitutive
                d&apos;une contrefaçon et poursuivie conformément aux dispositions des
                articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
              </p>
            </div>

            {/* Cookies */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Cookies
              </h2>
              <p>
                Le site hypergrowth.fr peut utiliser des cookies pour améliorer
                l&apos;expérience utilisateur, analyser le trafic et personnaliser le
                contenu. Un cookie est un petit fichier texte stocké sur votre
                terminal (ordinateur, tablette, smartphone) lors de votre visite.
              </p>
              <p>
                Vous pouvez à tout moment désactiver les cookies via les paramètres
                de votre navigateur. La désactivation des cookies peut toutefois
                limiter certaines fonctionnalités du site.
              </p>
              <p>
                Les cookies utilisés sur ce site peuvent inclure des cookies
                d&apos;analyse (mesure d&apos;audience) et des cookies de suivi
                marketing (Facebook Pixel).
              </p>
            </div>

            {/* Données personnelles */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Données personnelles
              </h2>
              <p>
                Les informations collectées via les formulaires du site (nom, prénom,
                email, téléphone) sont destinées exclusivement à HyperGrowth et ne
                seront en aucun cas cédées à des tiers.
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un
                droit d&apos;accès, de rectification, de suppression et
                d&apos;opposition sur vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, contactez-nous à l&apos;adresse :{' '}
                <a
                  href="mailto:contact@hypergrowth.fr"
                  className="text-hpg-orchid transition hover:opacity-70"
                >
                  contact@hypergrowth.fr
                </a>
              </p>
            </div>

            {/* Limitations de responsabilité */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Limitations de responsabilité
              </h2>
              <p>
                L&apos;éditeur du site s&apos;efforce de fournir des informations
                aussi précises que possible. Toutefois, il ne pourra être tenu
                responsable des omissions, des inexactitudes ou des carences dans la
                mise à jour, qu&apos;elles soient de son fait ou du fait de tiers.
              </p>
              <p>
                L&apos;éditeur ne saurait être tenu responsable des dommages directs
                ou indirects résultant de l&apos;accès au site ou de
                l&apos;impossibilité d&apos;y accéder.
              </p>
            </div>

            {/* Design */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[1.25rem] font-medium text-white">
                Conception du site
              </h2>
              <p>
                Design et direction artistique :{' '}
                <a
                  href="https://www.bleuecitadelle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hpg-orchid transition hover:opacity-70"
                >
                  Bleue Citadelle
                </a>
              </p>
            </div>

            {/* Retour */}
            <div className="pt-4">
              <Link
                href="/"
                className="text-[0.9rem] font-medium text-hpg-orchid transition hover:opacity-70"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
