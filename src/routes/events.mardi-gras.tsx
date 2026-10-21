import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/mardi-gras")({
  head: () => ({
    meta: [
      { title: "Texas Mardi Gras 2027: Dates & Parades | Texas Defined" },
      { name: "description", content: "Compare verified Texas Mardi Gras 2027 parades, official schedules, free viewing, tickets and travel tips." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com/events/mardi-gras" }],
  }),
});
