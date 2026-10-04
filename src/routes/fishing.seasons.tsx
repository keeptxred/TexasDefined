import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingSeasonData } from "@/data/fishing/season-data.functions";
import { FISHING_SEASONS_PATH, isFishingSeasonFilter, type FishingSeasonFilter } from "@/data/fishing/season-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingSeasonDirectory = lazy(() => import("@/components/fishing/FishingSeasonDirectory").then((module) => ({ default: module.FishingSeasonDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Plan Texas lake fishing by month with seasonal patterns, species and region filters, lake guides, and fresh fishing reports.";
type SeasonSearch = { season?: FishingSeasonFilter; species?: string; month?: string; region?: string };

const faq = [
  { question: "What should I fish for in Texas this month?", answer: "Choose a month to see the matching source-backed seasonal lake and species patterns, then check fresh reports for current conditions." },
  { question: "How do I find winter fishing opportunities in Texas?", answer: "Choose Winter or December, January or February to see verified winter patterns plus year-round opportunities." },
  { question: "What does year-round mean?", answer: "It means the verified fishery opportunity is not limited to one named season. It does not mean catch rates, water conditions or access are equally good every day." },
  { question: "Where do I check what is happening right now?", answer: "Use the fresh-report section or the fishing reports directory. Expired reports are not presented as current conditions." },
];

export const Route = createFileRoute("/fishing/seasons")({
  validateSearch: (search: Record<string, unknown>): SeasonSearch => ({
    season: isFishingSeasonFilter(search.season) ? search.season : undefined,
    species: slug(search.species),
    month: monthSlug(search.month),
    region: slug(search.region),
  }),
  loader: () => getFishingSeasonData(),
  head: ({ loaderData }) => {
    const lakes = [...new Map((loaderData?.entries ?? []).map((entry) => [entry.lake.id, entry.lake])).values()];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", url: `${siteUrl}${FISHING_SEASONS_PATH}`, name: "Texas Lake Fishing Seasons", description, mainEntity: { "@id": `${siteUrl}${FISHING_SEASONS_PATH}#lakes` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_SEASONS_PATH}#lakes`, numberOfItems: lakes.length, itemListElement: lakes.map((lake, index) => ({ "@type": "ListItem", position: index + 1, name: lake.name, url: `${siteUrl}/fishing/lakes/${lake.slug}` })) },
        { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing seasons", item: `${siteUrl}${FISHING_SEASONS_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Lake Fishing Seasons by Month — What to Catch & Where", description, canonicalPath: FISHING_SEASONS_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_SEASONS_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingSeasonsPage,
});

function FishingSeasonsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas fishing seasons…</div>}>
      <FishingSeasonDirectory data={Route.useLoaderData()} search={Route.useSearch()} />
    </Suspense>
  );
}

function slug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
function monthSlug(value: unknown) { return typeof value === "string" && /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/.test(value) ? value : undefined; }
