import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getCampingSearchIndex } from "@/data/camping/camping-profiles";
import { buildMeta, canonicalLink } from "@/lib/seo";

const ExploreSearchPage = lazy(() =>
  import("@/components/explore/ExploreSearchPage").then((module) => ({
    default: module.ExploreSearchPage,
  })),
);

const text = z.string().optional().catch("");
const searchSchema = z.object({ q: text, category: text, region: text, season: text, accessible: text, origin: text, radius: text });

export const Route = createFileRoute("/explore/search")({
  validateSearch: searchSchema,
  loader: async () => ({ campingSearchIndex: await getCampingSearchIndex() }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Search the Texas Travel Guide",
      description: "Find parks, lakes, rivers, campgrounds, outdoor lodging, caverns, trails, historic places and other Texas destinations.",
      canonicalPath: "/explore/search",
      robots: "noindex, follow",
    }),
    links: [canonicalLink(texasDefinedBrand, "/explore/search")],
  }),
  component: ExploreSearchRoutePage,
});

function ExploreSearchRoutePage() {
  return <Suspense fallback={null}><ExploreSearchPage /></Suspense>;
}
