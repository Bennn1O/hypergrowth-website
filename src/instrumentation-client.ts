import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://6d8b8697218f1ced7e3a6f89a42e7b39@o4510997670002688.ingest.de.sentry.io/4511164898476112",
  enabled: isProduction,
  tracesSampleRate: isProduction ? 0.1 : 0,
  enableLogs: isProduction,
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
