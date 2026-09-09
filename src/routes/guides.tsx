import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { guidesQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const description = "Travel, moving, homeowner, property-tax and everyday-life guides gathered in one editorial library.";
export const paintedChurchesGuide = {
  to: "/explore/painted-churches",
  label: "Painted Churches of Texas",
  body: "Explore the verified statewide collection, church-by-church history, artists, techniques, symbols, archival evidence, map and road-trip routes.",
  note: "A source-backed heritage reference and travel-planning system for 27 verified churches.",
} as const;

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/guides", title: "The Texas Guidebook", description }),
    links: [canonicalLink(texasDefinedBrand, "/guides")],
  }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(guidesQuery()); },
});