import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

// Protected reciprocal discovery remains rendered by PaintedChurchRoutePromo in the lazy UI:
// /explore/painted-churches/routes · /explore/painted-churches/map
export const Route = createFileRoute("/explore/trip-planner")({
  validateSearch: (value: Record<string, unknown>) => ({ destination: typeof value.destination === "string" ? value.destination : undefined, trip: typeof value.trip === "string" ? value.trip : undefined }),
  loader: async () => {
    const { getCampingSearchIndex } = await import("@/data/camping/camping-profiles");
    return { campingSearchIndex: await getCampingSearchIndex() };
  },
  head: ({ match }) => {
    const hasQueryState = Boolean(match.search.destination || match.search.trip);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: "/explore/trip-planner", title: "Texas Trip Planner", description: "Build a Texas itinerary around your region, interests, family, accessibility needs and daily driving tolerance.", robots: hasQueryState ? "noindex, follow" : undefined }),
      links: [canonicalLink(texasDefinedBrand, "/explore/trip-planner")],
    };
  },
});
