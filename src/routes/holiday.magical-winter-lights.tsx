import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/holiday/magical-winter-lights";
const title = "Magical Winter Lights in Rosenberg: Visitor Guide and 2026 Status";
const description = "Magical Winter Lights brought giant illuminated lantern artwork and cultural attractions to Fort Bend County Fairgrounds in the 2025–26 holiday season. A new 2026–27 season has not yet been confirmed by an official date announcement reviewed October 21, 2026.";
export const Route = createFileRoute("/holiday/magical-winter-lights")({
  head: () => ({
    meta: [{ title: `${title} | TexasDefined` }, { name: "description", content: description }],
    links: [{ rel: "canonical", href: `https://texasdefined.com${canonicalPath}` }],
  }),
});

