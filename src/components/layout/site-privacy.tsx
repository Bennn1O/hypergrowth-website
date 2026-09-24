"use client";

import Script from "next/script";

import { CookieBanner } from "@/components/layout/cookie-banner";

export function SiteCookieBanner() {
  return <CookieBanner />;
}

export function SiteTracking() {
  return (
    <Script
      src="https://tracking.hypergrowth.fr/api/script.js"
      data-site-id="01be6295df26"
      data-skip-patterns='["/studio"]'
      strategy="afterInteractive"
    />
  );
}
