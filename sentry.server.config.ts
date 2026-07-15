// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://6d8b8697218f1ced7e3a6f89a42e7b39@o4510997670002688.ingest.de.sentry.io/4511164898476112",
  enabled: isProduction,
  tracesSampleRate: isProduction ? 0.1 : 0,
  enableLogs: isProduction,
  sendDefaultPii: false,
});
