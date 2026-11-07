import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { COMPLETE_FISHING_LAKE_SLUGS, fishingFoundationAnchor, isCompleteFishingLakeSlug } from "@/data/fishing/slugs";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingLakesDirectory = lazy(() => import("@/components/fishing/FishingLakesDirectory").then((module) => ({ default: module.FishingLakesDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = "/fishing/lakes";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const description = "Compare complete TexasDefined fishing-lake guides across Texas by region, size, counties, nearby cities and verified fishery strengths, then open each lake for fish, access, boating, rules, reports and guide planning.";

export const Route = createFileRoute("/fishing/lakes")({
  loader: async ({ context }) => {
    const { fishSpeciesQuery, fishingLakesQuery, lakeSpeciesProfilesQuery, fishingAccessPointsQuery } = await import("@/data/fishing/queries");
    const [allLakes, species, lakeSpecies, accessPoints] = await Promise.all([
      context.queryClient.ensureQueryData(fishingLakesQuery({ limit: 100 })),
      context.queryClient.ensureQueryData(fishSpeciesQuery({ limit: 100 })),
      context.queryClient.ensureQueryData(lakeSpeciesProfilesQuery()),
      context.queryClient.ensureQueryData(fishingAccessPointsQuery({ limit: 1000 })),
    ]);
    const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
    const speciesById = new Map(species.map((row) => [row.id, row]));
    const targetsByLake = new Map<string, { name: string; quality: string; prominence: string; season?: string }[]>();
    for (const relation of lakeSpecies) {
      if (!lakes.some((lake) => lake.id === relation.lakeId)) continue;
      const fish = speciesById.get(relation.speciesId);
      if (!fish) continue;
      const current = targetsByLake.get(relation.lakeId) ?? [];
      current.push({ name: fish.commonName, quality: relation.quality, prominence: relation.prominence, season: relation.seasonalPatterns.find((pattern) => pattern.season !== "year-round")?.season ?? relation.seasonalPatterns[0]?.season });
      targetsByLake.set(relation.lakeId, current);
    }
    // Published, individually source-reviewed facilities only. Counts describe documented
    // types, NOT facilities confirmed open today or a guarantee of universal coverage.
    const accessByLake = new Map<string, { bank: number; boat: number; kayak: number }>();
    for (const facility of accessPoints) {
      if (!facility.sources.some((source) => /^https:\/\/tpwd\.texas\.gov\//.test(source.url))) continue;
      const key = facility.kind === "shore" || facility.kind === "pier" ? "bank"
        : facility.kind === "boat-ramp" ? "boat" : facility.kind === "kayak-launch" ? "kayak" : null;
      if (!key) continue;
      for (const lakeId of facility.lakeIds) {
        const value = accessByLake.get(lakeId) ?? { bank: 0, boat: 0, kayak: 0 };
        value[key] += 1;
        accessByLake.set(lakeId, value);
      }
    }
    const rows = lakes
      .map((lake) => ({
        lake,
        documentedAccess: accessByLake.get(lake.id) ?? { bank: 0, boat: 0, kayak: 0 },
        targets: (targetsByLake.get(lake.id) ?? [])
          .sort((left, right) => prominenceRank(left.prominence) - prominenceRank(right.prominence) || qualityRank(left.quality) - qualityRank(right.quality) || left.name.localeCompare(right.name)),
      }))
      .sort((left, right) => left.lake.name.localeCompare(right.lake.name));
    const latestReview = lakes.map((lake) => lake.verifiedAt).filter(Boolean).sort().at(-1);
    return { rows, latestReview };
  },
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const completeLakeCount = rows.length || COMPLETE_FISHING_LAKE_SLUGS.length;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${canonicalUrl}#page`, url: canonicalUrl, name: "Texas Fishing Lakes", description, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${canonicalUrl}#lakes` } },
        { "@type": "ItemList", "@id": `${canonicalUrl}#lakes`, name: "Complete TexasDefined fishing lake guides", numberOfItems: rows.length, itemListElement: rows.map(({ lake }, index) => ({ "@type": "ListItem", position: index + 1, name: lake.name, url: `${siteUrl}${fishingFoundationAnchor("lake", lake.slug)}` })) },
        { "@type": "BreadcrumbList", "@id": `${canonicalUrl}#breadcrumbs`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing lakes", item: canonicalUrl },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: `Texas Fishing Lakes — Compare ${completeLakeCount} Complete Lake Guides`, description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingLakesPage,
});

function FishingLakesPage() {
  const { rows, latestReview } = Route.useLoaderData();
  return (
    <>
      {/* Keep the canonical H1 and visitor introduction outside the lazy directory.
          Streaming and hydration may temporarily swap the Suspense subtree. */}
      <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li><li aria-hidden>·</li><li aria-current="page">Fishing lakes</li></ol></nav></Container>
      <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas fishing lakes</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Find the right Texas fishing lake by species, region and documented bank-fishing, boat-ramp or kayak access. Browse {rows.length} lake guides and compare source-backed seasonal research notes, then verify current conditions with the official agency before traveling.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/fishing" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Statewide fishing guide →</Link><Link to="/fishing/species" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fish species directory →</Link><Link to="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fishing regulations →</Link></div></Container></header>
      <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas fishing lakes…</div>}>
        <FishingLakesDirectory rows={rows} latestReview={latestReview} />
      </Suspense>
    </>
  );
}

function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }
function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : 3; }
