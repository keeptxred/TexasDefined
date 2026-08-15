import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getLargemouthBassPageData } from "@/data/fishing/largemouth-bass-page-data.functions";
import { fishingSpeciesCanonicalPath } from "@/data/fishing/species-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishSpeciesGuide = lazy(() => import("@/components/fishing/FishSpeciesGuide").then((module) => ({ default: module.FishSpeciesGuide })));
const canonicalPath = fishingSpeciesCanonicalPath("largemouth-bass");
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/species/largemouth-bass")({
  loader: () => getLargemouthBassPageData(),
  head: ({ loaderData }) => {
    const url = `${siteUrl}${canonicalPath}`;
    const species = loaderData?.species;
    const profile = loaderData?.profile;
    const webPage = { "@type": "WebPage", "@id": url, url, name: "Largemouth Bass Fishing in Texas", description: profile?.overview, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${url}#species` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: profile?.verifiedAt, citation: profile?.sources.map((source) => source.url) };
    const speciesEntity = { "@type": "Thing", "@id": `${url}#species`, name: species?.commonName ?? "Largemouth bass", alternateName: species?.aliases, description: species?.summary, sameAs: profile?.sources[0]?.url };
    const breadcrumb = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
      { "@type": "ListItem", position: 3, name: "Fish species", item: `${siteUrl}/fishing/species` },
      { "@type": "ListItem", position: 4, name: "Largemouth bass", item: url },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Largemouth Bass Fishing in Texas — Seasons, Tactics & Best Lakes", description: "Fish largemouth bass across Texas with source-backed habitat, seasonal patterns, techniques, tackle, lures, ranked lakes, regulations and verified guide listings.", canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPage, speciesEntity, breadcrumb] }) }],
    };
  },
  component: LargemouthBassRoute,
});

function LargemouthBassRoute() {
  return (
    <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}>
      <FishSpeciesGuide pageData={Route.useLoaderData()} />
    </Suspense>
  );
}