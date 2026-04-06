import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://6d8b8697218f1ced7e3a6f89a42e7b39@o4510997670002688.ingest.de.sentry.io/4511164898476112",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
