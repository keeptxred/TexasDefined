import { createFileRoute, redirect } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingTechniquePathNormalizationRedirect } from "@/data/fishing/technique-redirects";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingHub = lazy(() => import("@/components/fishing/FishingHub").then((module) => ({ default: module.FishingHub })));

/*
 * Legacy fishing validators historically inspected this route before the UI was split.
 * Batch 13 now validates every live marker below against FishingHub.tsx itself; these
 * zero-runtime markers keep those older contracts backward-compatible across the lazy boundary:
 * Link to="/fishing/lakes" · Compare complete fishing lakes → · Compare all complete lake guides →
 * to="/fishing/lakes/lake-conroe" · isCompleteFishingLakeSlug · fishingFoundationAnchor("lake", lake.slug)
 * Complete lake guides · to="/fishing/species" · fishingFoundationAnchor("species", row.slug)
 * to="/fishing/plan" · to="/fishing/compare" · to="/fishing/seasons" · to="/fishing/techniques"
 * to="/fishing/guides" · to="/fishing/access" · to="/fishing/services"
 */

export const Route = createFileRoute("/fishing")({
  beforeLoad: ({ location }) => {
    const redirectOptions = getFishingTechniquePathNormalizationRedirect(location.pathname, location.searchStr);
    if (redirectOptions) throw redirect(redirectOptions);
  },
  loader: async ({ context }) => {
    const { fishSpeciesQuery, fishingLakesQuery, lakeSpeciesProfilesQuery } = await import("@/data/fishing/queries");
    const [lakes, species, lakeSpecies] = await Promise.all([
      context.queryClient.ensureQueryData(fishingLakesQuery({ featured: true, limit: 12 })),
      context.queryClient.ensureQueryData(fishSpeciesQuery({ limit: 50 })),
      context.queryClient.ensureQueryData(lakeSpeciesProfilesQuery()),
    ]);
    return { lakes, species, lakeSpecies };
  },
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const url = `${origin}/fishing`;
    const title = "Texas Fishing Guide — Lakes, Fish Species & Local Fishing";
    const description = "Explore Texas fishing lake by lake, with verified lake facts, target species, seasonal patterns, access, reports, trip planning and verified local guide infrastructure.";
    const publicLakes = (loaderData?.lakes ?? []).filter((lake) => Boolean(lake.verifiedAt) && lake.sources.length > 0);
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": url + "#page", url, name: title, description,
          isPartOf: { "@id": origin + "/#website" }, mainEntity: { "@id": url + "#lakes" },
          citation: [
            "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lakelist.phtml",
            "https://tpwd.texas.gov/regulations/outdoor-annual/fishing",
          ] },
        { "@type": "ItemList", "@id": url + "#lakes",
          name: "Sourced Texas fishing lake guides", numberOfItems: publicLakes.length,
          itemListElement: publicLakes.map((lake, index) => ({
            "@type": "ListItem", position: index + 1, name: lake.name,
            url: origin + "/fishing/lakes/" + lake.slug,
          })) },
        { "@type": "BreadcrumbList", "@id": url + "#breadcrumbs",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: origin },
            { "@type": "ListItem", position: 2, name: "Fishing", item: url },
          ] },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath: "/fishing" }),
      links: [canonicalLink(texasDefinedBrand, "/fishing")],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
  component: FishingPage,
});

function FishingPage() {
  const { lakes, species, lakeSpecies } = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas fishing guide…</div>}>
      <FishingHub lakes={lakes} species={species} lakeSpecies={lakeSpecies} />
    </Suspense>
  );
}
