import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://8e023d3aca8b4645baeb6a7d8bb1124f@sentry.io/2155276"
  });
}

const log = error => {
  Sentry.captureException(error);
};

export default {
  log,
  init
};
