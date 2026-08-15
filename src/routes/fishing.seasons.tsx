import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingSeasonData } from "@/data/fishing/season-data.functions";
import { FISHING_SEASONS_PATH, isFishingSeasonFilter, type FishingSeasonFilter } from "@/data/fishing/season-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingSeasonDirectory = lazy(() => import("@/components/fishing/FishingSeasonDirectory").then((module) => ({ default: module.FishingSeasonDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Explore source-backed spring, summer, fall and winter fishing patterns across TexasDefined's complete fishing-lake guides, with matching species and techniques kept separate from live fishing reports.";
type SeasonSearch = { season?: FishingSeasonFilter; species?: string };

const faq = [
  { question: "Is this a live Texas fishing forecast?", answer: "No. This guide organizes durable, source-backed seasonal patterns from complete TexasDefined lake guides. Live fishing reports and current conditions remain separate." },
  { question: "What does year-round mean here?", answer: "Year-round means the verified fishery opportunity is not limited to one named season. It does not mean conditions or catch rates are equally good every day." },
  { question: "Does TexasDefined rank the best fishing season?", answer: "No. Results are alphabetical by lake and species. Seasonal patterns explain when a source identifies a useful pattern; sponsorship never changes the order or guidance." },
];

export const Route = createFileRoute("/fishing/seasons")({
  validateSearch: (search: Record<string, unknown>): SeasonSearch => ({
    season: isFishingSeasonFilter(search.season) ? search.season : undefined,
    species: slug(search.species),
  }),
  loader: () => getFishingSeasonData(),
  head: ({ loaderData }) => {
    const lakes = [...new Map((loaderData?.entries ?? []).map((entry) => [entry.lake.id, entry.lake])).values()];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", url: `${siteUrl}${FISHING_SEASONS_PATH}`, name: "Texas Fishing Seasons", description, mainEntity: { "@id": `${siteUrl}${FISHING_SEASONS_PATH}#lakes` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_SEASONS_PATH}#lakes`, numberOfItems: lakes.length, itemListElement: lakes.map((lake, index) => ({ "@type": "ListItem", position: index + 1, name: lake.name, url: `${siteUrl}/fishing/lakes/${lake.slug}` })) },
        { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing seasons", item: `${siteUrl}${FISHING_SEASONS_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Seasons — Spring, Summer, Fall & Winter Patterns", description, canonicalPath: FISHING_SEASONS_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_SEASONS_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingSeasonsPage,
});

function FishingSeasonsPage() {
  return (
    <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}>
      <FishingSeasonDirectory data={Route.useLoaderData()} search={Route.useSearch()} />
    </Suspense>
  );
}

function slug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
