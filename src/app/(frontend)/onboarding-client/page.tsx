import type { Metadata } from "next";

import { ClientFormPage } from "@/components/forms/client-form-page";

export const metadata: Metadata = {
  description: "Informations administratives et de facturation HyperGrowth.",
  robots: {
    follow: false,
    googleBot: {
      follow: false,
      index: false,
      noarchive: true,
      noimageindex: true,
      nosnippet: true,
    },
    index: false,
    nocache: true,
  },
  title: "Onboarding client | HyperGrowth",
};

interface PageProps {
  searchParams: Promise<{ t?: string | string[] }>;
}

export default function OnboardingClientPage({ searchParams }: PageProps) {
  return (
    <ClientFormPage
      footer="Ces informations servent uniquement à établir le contrat et la facturation. Elles ne sont jamais partagées."
      intro="Quelques informations sur ton entreprise pour préparer le contrat, la facturation et ton cadeau de bienvenue."
      kind="onboarding"
      searchParams={searchParams}
      successHref={process.env.GOCARDLESS_MANDATE_URL}
      title={
        <>
          Bienvenue chez{" "}
          <span className="font-instrument-italic font-normal italic text-hpg-orchid">
            HyperGrowth.
          </span>
        </>
      }
    />
  );
}
