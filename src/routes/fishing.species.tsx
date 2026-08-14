import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { FishSpeciesDirectory } from "@/components/fishing/FishSpeciesDirectory";
import { getFishSpeciesDirectoryData } from "@/data/fishing/species-directory-data.functions";
import { FISHING_SPECIES_DIRECTORY_PATH } from "@/data/fishing/species-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/species")({
  loader: () => getFishSpeciesDirectoryData(),
  head: ({ loaderData }) => {
    const canonicalPath = FISHING_SPECIES_DIRECTORY_PATH;
    const url = `${siteUrl}${canonicalPath}`;
    const itemList = loaderData?.groups.flatMap((group) => group.species).map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.commonName, url: row.slug === "largemouth-bass" ? `${url}/largemouth-bass` : `${url}#species-${row.slug}` })) ?? [];
    const webPage = { "@type": "CollectionPage", "@id": url, url, name: "Texas Freshwater Fish Species", description: "Browse Texas fishing species, groups and the statewide fishing guides connected to lakes, seasons and techniques.", isPartOf: { "@id": `${siteUrl}/#website` }, dateModified: loaderData?.verifiedAt, mainEntity: { "@type": "ItemList", itemListElement: itemList } };
    const breadcrumb = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
      { "@type": "ListItem", position: 3, name: "Fish species", item: url },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fish Species Guide — Bass, Crappie, Catfish, Gar & Trout", description: "Browse Texas freshwater fishing species including bass, crappie, catfish, alligator gar, sunfish and seasonal rainbow trout, with source-backed guides as they publish.", canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPage, breadcrumb] }) }],
    };
  },
  component: FishSpeciesDirectoryRoute,
});

function FishSpeciesDirectoryRoute() {
  return <FishSpeciesDirectory pageData={Route.useLoaderData()} />;
}
