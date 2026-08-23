import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/explore/trip-planner")({
  validateSearch: (value: Record<string, unknown>) => ({ destination: typeof value.destination === "string" ? value.destination : undefined, trip: typeof value.trip === "string" ? value.trip : undefined }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/explore/trip-planner", title: "Texas Trip Planner", description: "Build a Texas itinerary around your region, interests, family, accessibility needs and daily driving tolerance." }),
    links: [canonicalLink(texasDefinedBrand, "/explore/trip-planner")],
  }),
});
