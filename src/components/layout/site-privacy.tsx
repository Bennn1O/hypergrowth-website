"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

import { CookieBanner } from "@/components/layout/cookie-banner";

const PRIVATE_PATHS = new Set(["/questionnaire-immersion"]);

function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PATHS.has(pathname);
}

export function SiteCookieBanner() {
  const pathname = usePathname();
  if (isPrivatePath(pathname)) return null;

  return <CookieBanner />;
}

export function SiteTracking() {
  const pathname = usePathname();
  if (isPrivatePath(pathname)) return null;

  return (
    <Script
      src="https://tracking.hypergrowth.fr/api/script.js"
      data-site-id="01be6295df26"
      data-skip-patterns='["/studio"]'
      strategy="afterInteractive"
    />
  );
}
