import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { ClientFormGate } from "@/components/forms/client-form-gate";
import { getSessionCookieName, type ClientFormKind } from "@/lib/client-forms";

interface ClientFormPageProps {
  footer: string;
  intro: string;
  kind: ClientFormKind;
  searchParams: Promise<{ t?: string | string[] }>;
  successHref?: string;
  title: ReactNode;
}

export async function ClientFormPage({
  footer,
  intro,
  kind,
  searchParams,
  successHref,
  title,
}: ClientFormPageProps) {
  const params = await searchParams;
  const initialToken = typeof params.t === "string" ? params.t : "";
  const cookieStore = await cookies();
  const hasSession = Boolean(
    cookieStore.get(getSessionCookieName(kind))?.value,
  );

  return (
    <main className="pb-16 pt-36 sm:pt-40">
      <section className="hpg-container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-hpg-silver sm:text-base">
            {intro}
          </p>
        </div>

        <div className="hpg-glass-soft mx-auto max-w-5xl overflow-hidden rounded-2xl">
          <ClientFormGate
            hasSession={hasSession}
            initialToken={initialToken}
            kind={kind}
            successHref={successHref}
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-white/50">
          {footer}
        </p>
      </section>
    </main>
  );
}
