import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function destinationSchema(row: { destination: Destination; distanceMiles: number }) {
  const destination = row.destination;
  return {
    "@type": "TouristAttraction",
    "@id": `${siteUrl}/destination/${destination.slug}#attraction`,
    name: destination.name,
    url: `${siteUrl}/destination/${destination.slug}`,
    description: destination.summary,
    image: absoluteUrl(texasDefinedBrand, destination.hero.src),
    ...(destination.officialUrl ? { sameAs: destination.officialUrl } : {}),
    ...(destination.sourceCheckedAt ? { dateModified: destination.sourceCheckedAt } : {}),
    ...(destination.managingAuthority ? { provider: { "@type": "Organization", name: destination.managingAuthority } } : {}),
    geo: { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng },
    additionalProperty: { "@type": "PropertyValue", name: "Approximate straight-line distance from metro center", value: Math.round(row.distanceMiles), unitText: "miles" },
  };
}

export const Route = createFileRoute("/explore/near/$metro/$collection")({
  loader: async ({ context, params }) => {
    const [
      { isPrimaryTripPlannerDestination },
      { auditDestination },
      { destinationsQuery },
      {
        getMetroProximityCollection,
      getMetroProximityMetro,
      isMetroProximityCollectionIndexReady,
      metroProximityCanonicalPath,
      metroProximityDescription,
      metroProximityTitle,
        selectMetroProximityDestinations,
      },
    ] = await Promise.all([
      import("@/data/destination-availability"),
      import("@/data/destination-audit"),
      import("@/data/queries"),
      import("@/data/metro-proximity"),
    ]);
    const metro = getMetroProximityMetro(params.metro);
    const collection = getMetroProximityCollection(params.collection);
    if (!metro || !collection) throw notFound();
    const destinations = (await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }))).filter((destination) =>
      isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing
    );
    const results = selectMetroProximityDestinations(destinations, metro, collection);
    const indexReady = isMetroProximityCollectionIndexReady(destinations, metro, collection);
    const canonicalPath = metroProximityCanonicalPath(metro.slug, collection.slug);
    const title = metroProximityTitle(metro, collection);
    const description = metroProximityDescription(metro, collection, results.length);
    const reviewedAt = results.map((row) => row.destination.sourceCheckedAt).filter(Boolean).sort().at(-1);
    return { metro, collection, results, indexReady, canonicalPath, title, description, reviewedAt };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Nearby collection not found" }, { name: "robots", content: "noindex" }] };
    const { canonicalPath, title, description } = loaderData;
    const image = loaderData.results[0]?.destination.hero;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const graph = [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#places` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        ...(loaderData.reviewedAt ? { dateModified: loaderData.reviewedAt } : {}),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#places`,
        name: title,
        numberOfItems: loaderData.results.length,
        itemListElement: loaderData.results.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: destinationSchema(row),
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
          { "@type": "ListItem", position: 3, name: `Near ${loaderData.metro.name}`, item: `${siteUrl}/explore/near/${loaderData.metro.slug}` },
          { "@type": "ListItem", position: 4, name: loaderData.collection.label, item: pageUrl },
        ],
      },
    ];
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt }),
        { name: "robots", content: loaderData.indexReady ? "index, follow, max-image-preview:large" : "noindex, follow" },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
    };
  },
});
