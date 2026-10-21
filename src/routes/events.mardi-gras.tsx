import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/events/mardi-gras";

export const Route = createFileRoute("/events/mardi-gras")({
  head: () => ({
    meta: [
      { title: "Mardi Gras in Texas 2027: Parades, Dates & Travel Guides | Texas Defined" },
      { name: "description", content: "Compare verified 2027 Texas Mardi Gras parades in Galveston, Jefferson, Bandera, Port Arthur, Kemah and more. Find tickets, family tips, maps and places to stay." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com" + canonicalPath }],
  }),
});
