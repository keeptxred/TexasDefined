import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/events/air-shows";
const description = "Confirmed Texas air shows in 2026–2027 with visitor guides, tickets, parking rules, military-base access, hotels and verified organizer links.";

export const Route = createFileRoute("/events/air-shows")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Air Shows 2026–2027: Dates, Tickets & Visitor Guides", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});