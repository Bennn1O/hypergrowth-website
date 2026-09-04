"use client";

import { Alert02Icon } from "hugeicons-react";
import { useEffect, useState } from "react";

import { ImmersionQuestionnaireForm } from "@/components/forms/immersion-questionnaire-form";
import { getImmersionStorageKey } from "@/lib/immersion-questionnaire";

interface ImmersionSessionGateProps {
  hasSession: boolean;
  initialToken: string;
}

type SessionStatus = "error" | "loading" | "ready";

export function ImmersionSessionGate({
  hasSession,
  initialToken,
}: ImmersionSessionGateProps) {
  const [status, setStatus] = useState<SessionStatus>(
    initialToken ? "loading" : hasSession ? "ready" : "error",
  );

  useEffect(() => {
    if (!initialToken) return;

    const controller = new AbortController();

    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname,
    );

    void fetch("/api/immersion-session", {
      body: JSON.stringify({ accessToken: initialToken }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: controller.signal,
    })
      .then((response) => {
        if (controller.signal.aborted) return;
        if (!response.ok) {
          setStatus("error");
          return;
        }

        try {
          window.sessionStorage.removeItem(getImmersionStorageKey());
        } catch {
          // Une nouvelle session reste utilisable sans stockage navigateur.
        }
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        if (controller.signal.aborted) return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [initialToken]);

  if (status === "ready") {
    return <ImmersionQuestionnaireForm hasAccess />;
  }

  if (status === "loading") {
    return (
      <div
        aria-live="polite"
        className="flex min-h-160 items-center justify-center px-5 py-14 text-center text-sm text-hpg-silver"
      >
        Ouverture de ton questionnaire…
      </div>
    );
  }

  return (
    <div className="flex min-h-160 items-center justify-center px-5 py-14">
      <div
        className="flex max-w-lg items-start gap-3 rounded-xl border border-red-300/35 bg-red-300/10 p-5 text-sm leading-6 text-red-200"
        role="alert"
      >
        <Alert02Icon className="mt-0.5 size-5 shrink-0" />
        <span>
          Ce lien est incomplet ou n’est plus valide. Demande un nouveau lien à
          l’équipe HyperGrowth.
        </span>
      </div>
    </div>
  );
}
