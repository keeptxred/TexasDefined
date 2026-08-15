import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "@/data/fishing/slugs";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingLakesDirectory = lazy(() => import("@/components/fishing/FishingLakesDirectory").then((module) => ({ default: module.FishingLakesDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = "/fishing/lakes";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const description = "Compare ten complete TexasDefined fishing-lake guides across Texas by region, size, counties, nearby cities and verified fishery strengths, then open each lake for fish, access, boating, rules, reports and guide planning.";

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
    const quickAnswers = buildQuickAnswers(rows.length);
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${canonicalUrl}#page`, url: canonicalUrl, name: "Texas Fishing Lakes", description, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${canonicalUrl}#lakes` } },
        { "@type": "ItemList", "@id": `${canonicalUrl}#lakes`, name: "Complete TexasDefined fishing lake guides", numberOfItems: rows.length, itemListElement: rows.map(({ lake }, index) => ({ "@type": "ListItem", position: index + 1, name: lake.name, url: `${siteUrl}${fishingFoundationAnchor("lake", lake.slug)}` })) },
        { "@type": "FAQPage", "@id": `${canonicalUrl}#answers`, mainEntity: quickAnswers.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", "@id": `${canonicalUrl}#breadcrumbs`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing lakes", item: canonicalUrl },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Lakes — Compare 10 Complete Lake Guides", description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingLakesPage,
});

function FishingLakesPage() {
  const { rows, latestReview } = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}>
      <FishingLakesDirectory rows={rows} latestReview={latestReview} />
    </Suspense>
  );
}

function buildQuickAnswers(count: number) {
  return [
    { question: "How many complete Texas fishing lake guides are here?", answer: `TexasDefined currently publishes ${count} complete fishing-lake guides in this directory. The collection spans East Texas, North and Central Texas, the Hill Country, South Texas and the Rio Grande border region.` },
    { question: "Are these ranked as the best fishing lakes in Texas?", answer: "No. This directory compares completed, source-backed TexasDefined guides. It does not claim a universal best-lake ranking, and the collection will expand as more lake profiles clear the same verification standard." },
    { question: "Can I compare what fish each lake is known for?", answer: "Yes. Each lake card shows the strongest verified lake-to-species relationships currently in the fishing catalog, while the full lake guide explains seasonal patterns and techniques without presenting them as a live fishing report." },
    { question: "Where should I check current regulations and lake conditions?", answer: "Open the individual lake guide and follow its official source links. TexasDefined keeps current regulations, water levels, access restrictions and fishing reports separate from durable lake facts because those details can change." },
  ];
}
function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }
function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : 3; }
