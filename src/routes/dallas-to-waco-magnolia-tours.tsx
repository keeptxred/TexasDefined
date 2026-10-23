import { createFileRoute } from "@tanstack/react-router";

const title = "Dallas to Waco Magnolia Tours: Day Trips, Departure & Tickets";
const description = "Plan a Dallas-to-Waco Magnolia day trip with tour departure guidance, inclusions, verified experience links and independent transport alternatives.";
const canonicalPath = "/dallas-to-waco-magnolia-tours";
const canonical = "https://texasdefined.com" + canonicalPath;

export const Route = createFileRoute("/dallas-to-waco-magnolia-tours")({
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
