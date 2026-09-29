import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function indexableDestinations(destinations: Destination[]) {
  return destinations.filter((destination) =>
    isPrimaryTripPlannerDestination(destination)
    && auditDestination(destination).readyForIndexing
  );
}

function latestReview(destinations: Destination[]) {
  return destinations.map((destination) => destination.sourceCheckedAt).filter(Boolean).sort().at(-1);
}

export const Route = createFileRoute("/explore/near/$metro")({
  loader: async ({ context, params }) => {
    const {
      METRO_PROXIMITY_COLLECTIONS,
      getMetroProximityMetro,
      isMetroProximityCollectionIndexReady,
      metroProximityCanonicalPath,
      metroProximityHubReady,
      selectMetroProximityDestinations,
    } = await import("@/data/metro-proximity");
    const metro = getMetroProximityMetro(params.metro);
    if (!metro) throw notFound();
    const destinations = indexableDestinations(await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })));
    const collections = METRO_PROXIMITY_COLLECTIONS
      .map((collection) => ({
        collection,
        results: selectMetroProximityDestinations(destinations, metro, collection),
        indexReady: isMetroProximityCollectionIndexReady(destinations, metro, collection),
      }))
      .filter((row) => row.indexReady);
    const ready = metroProximityHubReady(destinations, metro);
    const highlights = collections
      .flatMap((row) => row.results.slice(0, 3))
      .filter((row, index, all) => all.findIndex((candidate) => candidate.destination.slug === row.destination.slug) === index)
      .slice(0, 12);
    const canonicalPath = metroProximityCanonicalPath(metro.slug);
    const title = `Day Trips & Things to Do Near ${metro.name}`;
    const count = new Set(collections.flatMap((row) => row.results.map((item) => item.destination.slug))).size;
    const description = `Plan day trips and things to do near ${metro.name}, Texas with ${count} source-backed parks, towns, lakes, historic sites and outdoor destinations ordered by approximate distance.`;
    return { metro, collections, ready, highlights, canonicalPath, title, description, reviewedAt: latestReview(highlights.map((row) => row.destination)) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Nearby guide not found" }, { name: "robots", content: "noindex" }] };
    const { canonicalPath, title, description } = loaderData;
    const image = loaderData.highlights[0]?.destination.hero;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const graph = [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#collections` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        ...(loaderData.reviewedAt ? { dateModified: loaderData.reviewedAt } : {}),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#collections`,
        name: `Ways to explore near ${loaderData.metro.name}`,
        numberOfItems: loaderData.collections.length,
        itemListElement: loaderData.collections.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: row.collection.label,
          url: `${siteUrl}/explore/near/${loaderData.metro.slug}/${row.collection.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
          { "@type": "ListItem", position: 3, name: `Near ${loaderData.metro.name}`, item: pageUrl },
        ],
      },
    ];
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt }),
        { name: "robots", content: loaderData.ready ? "index, follow, max-image-preview:large" : "noindex, follow" },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
    };
  },
});
