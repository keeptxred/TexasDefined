import { createFileRoute } from "@tanstack/react-router";

const title = "Waco Attractions: Museums, Magnolia, Parks & Day Trips";
const description = "Explore Waco attractions, museums, the Suspension Bridge, Cameron Park and Magnolia, with official visit details and distinct ticket options.";
const canonical = "https://texasdefined.com/waco-attractions";

export const Route = createFileRoute("/waco-attractions")({
  head: () => ({
    meta: [
      { title },
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
