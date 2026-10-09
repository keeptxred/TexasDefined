import { texasDefinedBrand } from "@/brand/texasdefined";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import { listResolvedDestinations } from "@/data/destination-query-runtime";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

import {
  METRO_PROXIMITY_COLLECTIONS,
  getMetroProximityCollection,
  getMetroProximityMetro,
  metroProximityCanonicalPath,
  metroProximityDescription,
  metroProximitySitemapEntries,
  metroProximityTitle,
  selectMetroProximityDestinations,
} from "./metro-proximity";
import { metroProximityCollectionPresentation } from "./metro-proximity-presentation";
import {
  isMetroProximityCollectionIndexReadyWithTownReferences,
  selectMetroProximityTownReferences,
  type MetroProximityTownResult,
} from "./metro-proximity-town-references";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function metroIndexableDestinations(destinations: Destination[]) {
  return destinations.filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing);
}

type MetroProximityMetro = NonNullable<ReturnType<typeof getMetroProximityMetro>>;
type MetroProximityCollection = NonNullable<ReturnType<typeof getMetroProximityCollection>>;

// These routes are already sitemap-eligible in production and must remain
// discoverable from their metro hubs even if one remote catalog read degrades.
// The existing readiness thresholds stay authoritative; this only retries the
// same governed catalog once before accepting a temporary degraded result.
const METRO_PROXIMITY_DISCOVERY_RETRY_TARGETS = new Map<string, readonly string[]>([
  ["amarillo", ["road-trips"]],
  ["el-paso", ["road-trips"]],
]);

async function loadMetroIndexableDestinations() {
  return metroIndexableDestinations(await listResolvedDestinations({ limit: 5000 }));
}

function readyMetroCollections(destinations: Destination[], metro: MetroProximityMetro) {
  return METRO_PROXIMITY_COLLECTIONS.filter((collection) =>
    isMetroProximityCollectionIndexReadyWithTownReferences(destinations, metro, collection),
  );
}

async function loadMetroIndexableDestinationsForCollection(
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
) {
  const first = await loadMetroIndexableDestinations();
  if (isMetroProximityCollectionIndexReadyWithTownReferences(first, metro, collection)) return first;

  const retry = await loadMetroIndexableDestinations();
  if (isMetroProximityCollectionIndexReadyWithTownReferences(retry, metro, collection)) return retry;
  return retry.length > first.length ? retry : first;
}

async function loadMetroIndexableDestinationsForHub(metro: MetroProximityMetro) {
  const first = await loadMetroIndexableDestinations();
  const firstReady = readyMetroCollections(first, metro);
  const required = METRO_PROXIMITY_DISCOVERY_RETRY_TARGETS.get(metro.slug) ?? [];
  if (firstReady.length >= 4 && required.every((slug) => firstReady.some((collection) => collection.slug === slug))) return first;

  const retry = await loadMetroIndexableDestinations();
  const retryReady = readyMetroCollections(retry, metro);
  const firstRequiredReady = required.filter((slug) => firstReady.some((collection) => collection.slug === slug)).length;
  const retryRequiredReady = required.filter((slug) => retryReady.some((collection) => collection.slug === slug)).length;
  if (retryRequiredReady > firstRequiredReady || retryReady.length > firstReady.length) return retry;
  return retry.length > first.length ? retry : first;
}

export async function loadMetroProximitySitemapEntriesServer() {
  // Sitemap eligibility must come from the exact same resolved destination
  // pipeline used by live metro pages. Accepting a caller-supplied catalog
  // allowed the sitemap to publish routes that the page loader correctly
  // marked noindex when the two catalog assembly paths diverged.
  const destinations = await loadMetroIndexableDestinations();
  return metroProximitySitemapEntries(destinations, isMetroProximityCollectionIndexReadyWithTownReferences);
}

function latestReview(values: Array<string | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1);
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

function townSchema(row: MetroProximityTownResult, pageUrl: string) {
  return {
    "@type": "City",
    "@id": `${pageUrl}#town-${row.town.slug}`,
    name: row.town.name,
    description: row.town.summary,
    sameAs: row.town.officialUrl,
    dateModified: row.town.sourceCheckedAt,
    containedInPlace: { "@type": "AdministrativeArea", name: `${row.town.county} County, Texas` },
    geo: { "@type": "GeoCoordinates", latitude: row.town.coordinates.lat, longitude: row.town.coordinates.lng },
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
  const destinations = await loadMetroIndexableDestinationsForHub(metro);
  const collections = METRO_PROXIMITY_COLLECTIONS
    .map((collection) => {
      const results = selectMetroProximityDestinations(destinations, metro, collection);
      const townReferences = selectMetroProximityTownReferences(metro, collection, results);
      return {
        collection,
        results,
        townReferences,
        optionCount: results.length + townReferences.length,
        indexReady: isMetroProximityCollectionIndexReadyWithTownReferences(destinations, metro, collection),
      };
    })
    .filter((row) => row.indexReady);
  const ready = collections.length >= 4;
  const highlights = collections
    .flatMap((row) => row.results)
    .filter((row, index, all) => all.findIndex((candidate) => candidate.destination.slug === row.destination.slug) === index)
    .sort((left, right) => left.distanceMiles - right.distanceMiles || left.destination.name.localeCompare(right.destination.name))
    .slice(0, 12);
  const canonicalPath = metroProximityCanonicalPath(metro.slug);
  const title = `Day Trips & Things to Do Near ${metro.name}`;
  const count = new Set([
    ...collections.flatMap((row) => row.results.map((item) => `destination:${item.destination.slug}`)),
    ...collections.flatMap((row) => row.townReferences.map((item) => `town:${item.town.slug}`)),
  ]).size;
  const description = `Plan day trips and things to do near ${metro.name}, Texas with ${count} source-backed parks, towns, lakes, historic sites and outdoor destinations ordered by approximate distance.`;
  const image = highlights[0]?.destination.hero;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const reviewedAt = latestReview([
    ...highlights.map((row) => row.destination.sourceCheckedAt),
    ...collections.flatMap((row) => row.townReferences.map((item) => item.town.sourceCheckedAt)),
  ]);
  const robots = ready ? "index, follow, max-image-preview:large" : "noindex, follow";
  const head = {
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt, robots }),
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
              name: metroProximityCollectionPresentation(row.collection).label,
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
  const destinations = await loadMetroIndexableDestinationsForCollection(metro, collection);
  const results = selectMetroProximityDestinations(destinations, metro, collection);
  const townReferences = selectMetroProximityTownReferences(metro, collection, results);
  const optionCount = results.length + townReferences.length;
  const indexReady = isMetroProximityCollectionIndexReadyWithTownReferences(destinations, metro, collection);
  const canonicalPath = metroProximityCanonicalPath(metro.slug, collection.slug);
  const presentation = metroProximityCollectionPresentation(collection);
  const isTexarkanaRoadTrips = metro.slug === "texarkana" && collection.slug === "road-trips";
  const isAustinTwoHourGuide = metro.slug === "austin" && collection.slug === "small-towns-2-hours";
  const title = isTexarkanaRoadTrips
    ? "Best Road Trips From Texarkana, Texas"
    : isAustinTwoHourGuide
      ? `${optionCount} Small Towns About 1–2 Hours From Austin, Texas`
      : presentation.usesGeographicRing
        ? `${presentation.titlePrefix} ${metro.name}, Texas`
        : metroProximityTitle(metro, collection);
  const description = isTexarkanaRoadTrips
    ? "Plan scenic drives and multi-stop road trips from Texarkana through the Piney Woods, Caddo country, historic East Texas towns, lakes and state parks, with route order, trip length, seasonal guidance and current driving links."
    : isAustinTwoHourGuide
      ? `Compare ${optionCount} worthwhile small-town day trips from Austin, with trip-planning guidance for Hill Country wine, Texas history, river towns, courthouse squares and heritage routes. Check live routing before you leave because Austin-area traffic can materially change drive times.`
      : presentation.usesGeographicRing
        ? `Compare ${optionCount} ${presentation.searchIntent} around ${metro.name}, screened by geographic distance with source-backed TexasDefined guides and official local references. Use the page's route links for current road mileage and driving time.`
        : metroProximityDescription(metro, collection, optionCount);
  const reviewedAt = latestReview([
    ...results.map((row) => row.destination.sourceCheckedAt),
    ...townReferences.map((row) => row.town.sourceCheckedAt),
  ]);
  const image = results[0]?.destination.hero;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const places = [
    ...results.map((row) => ({ distanceMiles: row.distanceMiles, schema: destinationSchema(row) })),
    ...townReferences.map((row) => ({ distanceMiles: row.distanceMiles, schema: townSchema(row, pageUrl) })),
  ].sort((left, right) => left.distanceMiles - right.distanceMiles);
  const robots = indexReady ? "index, follow, max-image-preview:large" : "noindex, follow";
  const head = {
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt, robots }),
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
            numberOfItems: places.length,
            itemListElement: places.map((place, index) => ({ "@type": "ListItem", position: index + 1, item: place.schema })),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
              { "@type": "ListItem", position: 3, name: `Near ${metro.name}`, item: `${siteUrl}/explore/near/${metro.slug}` },
              { "@type": "ListItem", position: 4, name: presentation.label, item: pageUrl },
            ],
          },
        ],
      }),
    }],
  };
  return { metro, collection, results, townReferences, optionCount, indexReady, presentation, canonicalPath, title, description, reviewedAt, head };
}
