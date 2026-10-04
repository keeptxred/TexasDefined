import { texasDefinedBrand } from "@/brand/texasdefined";
import { listResolvedDestinations } from "@/data/destination-query-runtime";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

import {
  METRO_PROXIMITY_COLLECTIONS,
  getMetroProximityCollection,
  getMetroProximityMetro,
  isMetroProximityCollectionIndexReady,
  metroProximityCanonicalPath,
  metroProximityDescription,
  metroProximityHubReady,
  metroProximityTitle,
  selectMetroProximityDestinations,
} from "./metro-proximity";
import { buildMetroProximityEventContextServer } from "./metro-proximity-events.server";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function latestReview(destinations: Destination[]) {
  return destinations.map((destination) => destination.sourceCheckedAt).filter(Boolean).sort().at(-1);
}

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
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Approximate straight-line distance from metro center",
      value: Math.round(row.distanceMiles),
      unitText: "miles",
    },
  };
}

export async function loadMetroProximityHubPageDataServer(metroSlug: string) {
  const metro = getMetroProximityMetro(metroSlug);
  if (!metro) return null;
  const destinations = await listResolvedDestinations({ limit: 5000 });
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
  const image = highlights[0]?.destination.hero;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const reviewedAt = latestReview(highlights.map((row) => row.destination));
  const head = {
    meta: [
      ...buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt }),
      { name: "robots", content: ready ? "index, follow, max-image-preview:large" : "noindex, follow" },
    ],
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": pageUrl,
            url: pageUrl,
            name: title,
            description,
            isPartOf: { "@id": `${siteUrl}/#website` },
            mainEntity: { "@id": `${pageUrl}#collections` },
            breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
            ...(reviewedAt ? { dateModified: reviewedAt } : {}),
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#collections`,
            name: `Ways to explore near ${metro.name}`,
            numberOfItems: collections.length,
            itemListElement: collections.map((row, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: row.collection.label,
              url: `${siteUrl}/explore/near/${metro.slug}/${row.collection.slug}`,
            })),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
              { "@type": "ListItem", position: 3, name: `Near ${metro.name}`, item: pageUrl },
            ],
          },
        ],
      }),
    }],
  };
  return { metro, collections, ready, highlights, canonicalPath, title, description, reviewedAt, head };
}

export async function loadMetroProximityCollectionPageDataServer(metroSlug: string, collectionSlug: string) {
  const metro = getMetroProximityMetro(metroSlug);
  const collection = getMetroProximityCollection(collectionSlug);
  if (!metro || !collection) return null;
  const destinations = await listResolvedDestinations({ limit: 5000 });
  const results = selectMetroProximityDestinations(destinations, metro, collection);
  const indexReady = isMetroProximityCollectionIndexReady(destinations, metro, collection);
  const eventContext = buildMetroProximityEventContextServer(metro, collection, results);
  const canonicalPath = metroProximityCanonicalPath(metro.slug, collection.slug);
  const title = metroProximityTitle(metro, collection);
  const description = metroProximityDescription(metro, collection, results.length);
  const reviewedAt = latestReview(results.map((row) => row.destination));
  const image = results[0]?.destination.hero;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const head = {
    meta: [
      ...buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt }),
      { name: "robots", content: indexReady ? "index, follow, max-image-preview:large" : "noindex, follow" },
    ],
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": pageUrl,
            url: pageUrl,
            name: title,
            description,
            isPartOf: { "@id": `${siteUrl}/#website` },
            mainEntity: { "@id": `${pageUrl}#places` },
            breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
            ...(reviewedAt ? { dateModified: reviewedAt } : {}),
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#places`,
            name: title,
            numberOfItems: results.length,
            itemListElement: results.map((row, index) => ({
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
              { "@type": "ListItem", position: 3, name: `Near ${metro.name}`, item: `${siteUrl}/explore/near/${metro.slug}` },
              { "@type": "ListItem", position: 4, name: collection.label, item: pageUrl },
            ],
          },
        ],
      }),
    }],
  };
  return { metro, collection, results, eventContext, indexReady, canonicalPath, title, description, reviewedAt, head };
}
