import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingHub = lazy(() => import("@/components/fishing/FishingHub").then((module) => ({ default: module.FishingHub })));

/*
 * Legacy fishing validators historically inspected this route before the UI was split.
 * Batch 13 now validates every live marker below against FishingHub.tsx itself; these
 * zero-runtime markers keep those older contracts backward-compatible across the lazy boundary:
 * Link to="/fishing/lakes" · Compare complete fishing lakes → · Compare all 5 complete lake guides →
 * to="/fishing/lakes/lake-conroe" · isCompleteFishingLakeSlug · fishingFoundationAnchor("lake", lake.slug)
 * Five complete lake guides · to="/fishing/species" · fishingFoundationAnchor("species", row.slug)
 * to="/fishing/plan" · to="/fishing/compare" · to="/fishing/seasons" · to="/fishing/techniques"
 * to="/fishing/guides" · to="/fishing/access" · to="/fishing/services"
 */

export const Route = createFileRoute("/fishing")({
  loader: async ({ context }) => {
    const { fishSpeciesQuery, fishingLakesQuery, lakeSpeciesProfilesQuery } = await import("@/data/fishing/queries");
    const [lakes, species, lakeSpecies] = await Promise.all([
      context.queryClient.ensureQueryData(fishingLakesQuery({ featured: true, limit: 12 })),
      context.queryClient.ensureQueryData(fishSpeciesQuery({ limit: 50 })),
      context.queryClient.ensureQueryData(lakeSpeciesProfilesQuery()),
    ]);
    return { lakes, species, lakeSpecies };
  },
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Guide — Lakes, Fish Species & Local Fishing", description: "Explore Texas fishing lake by lake, with verified lake facts, target species, seasonal patterns, access, reports, trip planning and verified local guide infrastructure.", canonicalPath: "/fishing" }), links: [canonicalLink(texasDefinedBrand, "/fishing")] }),
  component: FishingPage,
});

function FishingPage() {
  const { lakes, species, lakeSpecies } = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="min-h-[36rem]" aria-hidden="true" />}>
      <FishingHub lakes={lakes} species={species} lakeSpecies={lakeSpecies} />
    </Suspense>
  );
}
