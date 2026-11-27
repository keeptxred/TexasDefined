import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/holiday/magical-winter-lights";
const title = "Magical Winter Lights in Rosenberg: Visitor Guide and 2026 Status";
const description = "The 2026–27 Magical Winter Lights opening is on hold, according to the organizer's November 23 announcement reported November 24. Its ticket portal lists conflicting venue and date information. Do not travel or purchase until a new official opening is confirmed.";
export const Route = createFileRoute("/holiday/magical-winter-lights")({
  head: () => ({
    meta: [{ title: `${title} | TexasDefined` }, { name: "description", content: description }],
    links: [{ rel: "canonical", href: `https://texasdefined.com${canonicalPath}` }],
  }),
});

