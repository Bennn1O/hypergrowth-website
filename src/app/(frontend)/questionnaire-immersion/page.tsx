import type { Metadata } from "next";
import { cookies } from "next/headers";

import { ImmersionSessionGate } from "@/components/forms/immersion-session-gate";
import { IMMERSION_SESSION_COOKIE } from "@/lib/immersion-questionnaire";

export const metadata: Metadata = {
  description:
    "Questionnaire confidentiel de préparation à l’immersion HyperGrowth.",
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
  title: "Questionnaire d’immersion | HyperGrowth",
};

interface ImmersionQuestionnairePageProps {
  searchParams: Promise<{
    t?: string | string[];
  }>;
}

export default async function ImmersionQuestionnairePage({
  searchParams,
}: ImmersionQuestionnairePageProps) {
  const params = await searchParams;
  const initialToken = typeof params.t === "string" ? params.t : "";
  const cookieStore = await cookies();
  const hasSession = Boolean(cookieStore.get(IMMERSION_SESSION_COOKIE)?.value);

  return (
    <main className="pb-16 pt-36 sm:pt-40">
      <section className="hpg-container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Préparons ton{" "}
            <span className="font-instrument-italic font-normal italic text-hpg-orchid">
              immersion.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-hpg-silver sm:text-base">
            Tes réponses donnent à l’équipe les repères nécessaires pour
            préparer des échanges utiles dès le premier jour.
          </p>
        </div>

        <div className="hpg-glass-soft mx-auto max-w-5xl overflow-hidden rounded-2xl">
          <ImmersionSessionGate
            hasSession={hasSession}
            initialToken={initialToken}
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-white/50">
          Les informations transmises sont réservées à l’équipe HyperGrowth
          chargée de ton immersion.
        </p>
      </section>
    </main>
  );
}
