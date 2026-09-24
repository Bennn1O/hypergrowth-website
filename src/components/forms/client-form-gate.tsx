"use client";

import { useEffect, useState } from "react";

import { ClientForm } from "@/components/forms/client-form";
import { FormLinkError } from "@/components/forms/client-form-screen";
import type { ClientFormKind } from "@/lib/client-forms";

interface ClientFormGateProps {
  hasSession: boolean;
  initialToken: string;
  kind: ClientFormKind;
  successHref?: string;
}

type SessionStatus = "error" | "loading" | "ready";

// Pose le token du lien en cookie, puis l'efface de l'URL. Sans token dans
// l'URL, une session déjà ouverte suffit à reprendre le formulaire.
export function ClientFormGate({
  hasSession,
  initialToken,
  kind,
  successHref,
}: ClientFormGateProps) {
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

    void fetch(`/api/forms/${kind}/session`, {
      body: JSON.stringify({ token: initialToken }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: controller.signal,
    })
      .then((response) => {
        if (controller.signal.aborted) return;
        setStatus(response.ok ? "ready" : "error");
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        if (controller.signal.aborted) return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [initialToken, kind]);

  if (status === "ready") {
    return <ClientForm kind={kind} successHref={successHref} />;
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
    <FormLinkError message="Ce lien est incomplet ou n’est plus valide. Demande un nouveau lien à l’équipe HyperGrowth." />
  );
}
