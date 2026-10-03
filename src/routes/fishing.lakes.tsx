import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { COMPLETE_FISHING_LAKE_SLUGS, fishingFoundationAnchor, isCompleteFishingLakeSlug } from "@/data/fishing/slugs";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingLakesDirectory = lazy(() => import("@/components/fishing/FishingLakesDirectory").then((module) => ({ default: module.FishingLakesDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = "/fishing/lakes";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const csvUrl = `${siteUrl}/fishing/lakes.csv`;
const description = "Search, filter, map and download TexasDefined's source-backed Texas Lakes Database with lake size, depth, counties, nearby cities, river basins, waterways, managing authorities and documented fishery strengths.";

export const Route = createFileRoute("/fishing/lakes")({
  loader: async ({ context }) => {
    const { fishSpeciesQuery, fishingLakesQuery, lakeSpeciesProfilesQuery } = await import("@/data/fishing/queries");
    const [allLakes, species, lakeSpecies] = await Promise.all([
      context.queryClient.ensureQueryData(fishingLakesQuery({ limit: 100 })),
      context.queryClient.ensureQueryData(fishSpeciesQuery({ limit: 100 })),
      context.queryClient.ensureQueryData(lakeSpeciesProfilesQuery()),
    ]);
    const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
    const speciesById = new Map(species.map((row) => [row.id, row]));
    const targetsByLake = new Map<string, { name: string; quality: string; prominence: string }[]>();
    for (const relation of lakeSpecies) {
      if (!lakes.some((lake) => lake.id === relation.lakeId)) continue;
      const fish = speciesById.get(relation.speciesId);
      if (!fish) continue;
      const current = targetsByLake.get(relation.lakeId) ?? [];
      current.push({ name: fish.commonName, quality: relation.quality, prominence: relation.prominence });
      targetsByLake.set(relation.lakeId, current);
    }
    const rows = lakes
      .map((lake) => ({
        lake,
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
    const quickAnswers = buildQuickAnswers(completeLakeCount);
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${canonicalUrl}#page`, url: canonicalUrl, name: "Texas Lakes Database", description, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${canonicalUrl}#dataset` } },
        {
          "@type": "Dataset",
          "@id": `${canonicalUrl}#dataset`,
          name: "TexasDefined Texas Lakes Database",
          description,
          url: canonicalUrl,
          spatialCoverage: { "@type": "State", name: "Texas" },
          creator: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
          publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
          dateModified: loaderData?.latestReview,
          variableMeasured: ["Lake name", "Counties", "Nearest cities", "Surface acreage", "Maximum depth", "Year impounded", "River basin", "Primary waterway", "Managing authority", "Coordinates", "Documented fish species"],
          distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: csvUrl }],
          hasPart: { "@id": `${canonicalUrl}#lakes` },
        },
        { "@type": "ItemList", "@id": `${canonicalUrl}#lakes`, name: "Source-backed Texas lake records", numberOfItems: rows.length, itemListElement: rows.map(({ lake }, index) => ({ "@type": "ListItem", position: index + 1, name: lake.name, url: `${siteUrl}${fishingFoundationAnchor("lake", lake.slug)}` })) },
        { "@type": "FAQPage", "@id": `${canonicalUrl}#answers`, mainEntity: quickAnswers.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", "@id": `${canonicalUrl}#breadcrumbs`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Texas Lakes Database", item: canonicalUrl },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: `Texas Lakes Database — Map & Compare ${completeLakeCount} Source-Backed Lakes`, description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingLakesPage,
});

function FishingLakesPage() {
  const { rows, latestReview } = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas lakes database…</div>}>
      <FishingLakesDirectory rows={rows} latestReview={latestReview} />
    </Suspense>
  );
}

function buildQuickAnswers(count: number) {
  return [
    { question: "How many lakes are in this Texas Lakes Database?", answer: `TexasDefined currently publishes ${count} complete, source-backed lake records in this database. The scope is intentionally limited to records that have cleared the site's lake-guide verification standard rather than attempting to expose every named waterbody as a thin page.` },
    { question: "Is this a list of every lake in Texas?", answer: "No. It is a maintained reference set of verified Texas lake records with enough structured information to support useful comparison. TexasDefined expands the dataset as additional lakes clear the same sourcing and completeness standard." },
    { question: "Can I compare what fish each lake is known for?", answer: "Yes. Each lake record includes the strongest verified lake-to-species relationships currently in the fishing catalog, while the full lake guide explains seasonal patterns and techniques without presenting them as a live fishing report." },
    { question: "Where should I check current regulations and lake conditions?", answer: "Open the individual lake guide and follow its official source links. TexasDefined keeps current regulations, water levels, access restrictions and fishing reports separate from durable lake facts because those details can change." },
  ];
}
function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }
function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : 3; }
