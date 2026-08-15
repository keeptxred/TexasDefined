import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import { getFishSpeciesDirectoryData } from "@/data/fishing/species-directory-data.functions";
import { FISHING_SPECIES_DIRECTORY_PATH } from "@/data/fishing/species-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishSpeciesDirectory = lazy(() => import("@/components/fishing/FishSpeciesDirectory").then((module) => ({ default: module.FishSpeciesDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/species")({
  loader: () => getFishSpeciesDirectoryData(),
  head: ({ loaderData }) => {
    const canonicalPath = FISHING_SPECIES_DIRECTORY_PATH;
    const url = `${siteUrl}${canonicalPath}`;
    const rows = loaderData?.groups.flatMap((group) => group.species) ?? [];
    const itemList = rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.commonName, url: `${siteUrl}${fishingFoundationAnchor("species", row.slug)}` }));
    const webPage = { "@type": "CollectionPage", "@id": url, url, name: "Texas Freshwater Fish Species", description: "Browse Texas fishing species, verified lake relationships and complete statewide guides as they publish.", isPartOf: { "@id": `${siteUrl}/#website` }, dateModified: loaderData?.verifiedAt, mainEntity: { "@type": "ItemList", numberOfItems: rows.length, itemListElement: itemList } };
    const faq = { "@type": "FAQPage", "@id": `${url}#answers`, mainEntity: [
      { "@type": "Question", name: "How many fish records are in the TexasDefined species directory?", acceptedAnswer: { "@type": "Answer", text: `TexasDefined currently publishes ${loaderData?.totalSpecies ?? 0} freshwater fish species or practical fishing-group records in this directory.` } },
      { "@type": "Question", name: "How many fish have complete standalone species guides?", acceptedAnswer: { "@type": "Answer", text: `Currently ${loaderData?.completeSpeciesGuides ?? 0} species clears the complete statewide-guide standard. Other records remain directory profiles instead of becoming thin standalone pages.` } },
      { "@type": "Question", name: "How are fish connected to Texas fishing lakes?", acceptedAnswer: { "@type": "Answer", text: `Species cards link only to completed TexasDefined lake guides where the fishing catalog contains a verified lake-to-species relationship. ${loaderData?.completeLakeGuides ?? 0} complete lake guides are currently eligible for those links.` } },
    ] };
    const breadcrumb = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
      { "@type": "ListItem", position: 3, name: "Fish species", item: url },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fish Species Guide — Bass, Crappie, Catfish, Gar & Trout", description: "Browse Texas freshwater fishing species, see which complete lake guides have verified fishery relationships, and open source-backed statewide species guides as they publish.", canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPage, faq, breadcrumb] }) }],
    };
  },
  component: FishSpeciesDirectoryRoute,
});

function FishSpeciesDirectoryRoute() {
  return (
    <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}>
      <FishSpeciesDirectory pageData={Route.useLoaderData()} />
    </Suspense>
  );
}