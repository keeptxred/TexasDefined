import { createFileRoute } from "@tanstack/react-router";

const title = "Waco Ghost Tours: Night Walks, History & Booking Guide";
const description = "Compare Waco ghost walks and historical nighttime tours, departure details, tour durations, accessibility considerations and verified booking options.";
const canonicalPath = "/waco-ghost-tours";
const canonical = "https://texasdefined.com" + canonicalPath;

export const Route = createFileRoute("/waco-ghost-tours")({
  head: () => ({
    meta: [
      { title: title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
});
