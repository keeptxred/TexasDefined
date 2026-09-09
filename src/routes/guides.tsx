import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { guidesQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const description = "Travel, moving, homeowner, property-tax and everyday-life guides gathered in one editorial library.";
export const texasExplainedGuide = {
  to: "/texas-explained",
  label: "Texas Explained",
  body: "Understand the systems behind the scenery: rivers, reservoirs, roads, courthouse towns, wildlife, homes, land and cultural regions.",
  note: "Ten connected evergreen guides to why Texas works the way it does.",
} as const;
export const paintedChurchesGuide = {
  to: "/explore/painted-churches",
  label: "Painted Churches of Texas",
  body: "Explore the verified statewide collection, church-by-church history, artists, techniques, symbols, archival evidence, map and road-trip routes.",
  note: "A source-backed heritage reference and travel-planning system for 27 verified churches.",
} as const;
export const travelIntro = "Start with Texas Explained for the why behind the state, compare CityPASS® and all 21 current attraction choices when Dallas, Houston or San Antonio are on the itinerary, then move into Painted Churches, parks, water, camping, roads, caverns, small towns, historic places and sports destinations.";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/guides", title: "The Texas Guidebook", description }),
    links: [canonicalLink(texasDefinedBrand, "/guides")],
  }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(guidesQuery()); },
});