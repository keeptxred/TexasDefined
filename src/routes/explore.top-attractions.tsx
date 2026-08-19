import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions";
const description = "Twenty-five landmark Texas experiences, from the Alamo and River Walk to Big Bend, the Gulf Coast, museums, caverns, gardens and historic districts — with practical trip-planning guides for each stop.";

type RankedDestination = {
  rank: number;
  slug: string;
  name: string;
  destination: Destination;
};

export const Route = createFileRoute("/explore/top-attractions")({
  loader: async ({ context }) => {
    const [destinations, { resolveTopAttractionAuthority }, { TOP_TEXAS_ATTRACTIONS }] = await Promise.all([
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      import("@/data/top-attraction-authority-resolver"),
      import("@/data/top-texas-attractions"),
    ]);
    const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
    return TOP_TEXAS_ATTRACTIONS.flatMap((entry): RankedDestination[] => {
      const destination = bySlug.get(entry.slug);
      return destination ? [{ ...entry, destination: resolveTopAttractionAuthority(destination) }] : [];
    });
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const attractions = loaderData ?? [];
    const csvUrl = absoluteUrl(texasDefinedBrand, "/top-25-texas-attractions.csv");
    const jsonUrl = absoluteUrl(texasDefinedBrand, "/top-25-texas-attractions.json");
    const methodologyUrl = absoluteUrl(texasDefinedBrand, "/explore/top-attractions/methodology");
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Top 25 Texas Attractions | Texas Defined", description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Top 25 Texas Attractions", description, mainEntity: { "@id": `${pageUrl}#attractions` }, isBasedOn: methodologyUrl },
          { "@type": "ItemList", "@id": `${pageUrl}#attractions`, name: "Top 25 Texas Attractions", numberOfItems: attractions.length, itemListOrder: "https://schema.org/ItemListOrderAscending", itemListElement: attractions.map(({ rank, destination }) => ({ "@type": "ListItem", position: rank, name: destination.name, url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`) })) },
          { "@type": "Dataset", "@id": `${pageUrl}#comparison-dataset`, name: "TexasDefined Top 25 Texas Attractions comparison dataset", description: "Rank, canonical location, region, category, visit-length assessment, physical effort, weather exposure, advance-planning level, family fit, first-time Texas value, source-review date, controlling visitor source, supporting authority sources and road-trip membership for the Top 25 collection.", creator: { "@type": "Organization", "@id": `${absoluteUrl(texasDefinedBrand, "/authors/a-hollis")}#desk`, name: "Texas Defined Editorial Desk" }, isBasedOn: methodologyUrl, sameAs: pageUrl, variableMeasured: ["rank", "recommended visit", "physical effort", "weather exposure", "advance planning", "family fit", "first-time Texas value", "source checked date", "authority source count", "authority source URLs", "road-trip membership"], distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: csvUrl, name: "Top 25 Texas Attractions comparison CSV" }, { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: jsonUrl, name: "Top 25 Texas Attractions reference JSON" }] },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") }, { "@type": "ListItem", position: 3, name: "Top 25 Texas Attractions", item: pageUrl }] },
        ],
      })],
    };
  },
});
