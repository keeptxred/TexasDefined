import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/air-shows")({
  head: () => ({
    meta: [
      { title: "Texas Air Shows 2026–2027 | Texas Defined" },
      { name: "description", content: "Verified Texas air-show dates, tickets, parking, military access, hotels and visitor guides." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com/events/air-shows" }],
  }),
});