import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/events/air-shows";

export const Route = createFileRoute("/events/air-shows")({
  head: () => ({
    meta: [
      { title: "Texas Air Shows 2026–2027 | Texas Defined" },
      { name: "description", content: "Texas air-show dates, tickets, parking and travel guides." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com" + canonicalPath }],
  }),
});