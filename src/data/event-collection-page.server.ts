import { texasDefinedBrand } from "../brand/texasdefined";
import { buildMeta, canonicalLink } from "../lib/seo";
import { EVENT_COLLECTIONS, EVENT_COLLECTION_BY_SLUG, type EventCollectionDefinition } from "./event-collections";
import {
  TEMPORAL_EVENT_COLLECTIONS,
  resolveTemporalEventCollectionServer,
  type TemporalEventCollectionDefinition,
} from "./event-temporal-collections.server";
import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const eventCollectionByPath = new Map<string, EventCollectionDefinition | TemporalEventCollectionDefinition>([
  ...EVENT_COLLECTIONS.map((item) => [item.path, item] as const),
  ...TEMPORAL_EVENT_COLLECTIONS.map((item) => [item.path, item] as const),
]);
const sourcePolicyTitle = "Verified occurrence first, evergreen planning second";
const sourcePolicyParagraphs = [
  "Texas Defined uses permanent event-guide URLs, but it does not assume that an annual tradition repeats on the same dates every year. Organizer or host sources control the occurrence shown on each guide. When a future date is derived from an explicit recurrence rule rather than a dedicated annual schedule, the guide says so.",
  "The event page is the stable planning layer: why the event matters, how to approach the destination, related county or culture resources, and the official sources used for verification. Operational details such as gates, tickets, road closures, weather procedures and daily programs should always be rechecked with the organizer before travel.",
] as const;

type CollectionDefinition = EventCollectionDefinition | TemporalEventCollectionDefinition;
type DirectoryItems = ReturnType<typeof loadMajorEventGuideDirectoryServer>;

function buildCollectionHead(collection: CollectionDefinition, items: DirectoryItems, shouldIndex = true) {
  const canonicalPath = collection.path;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const itemListElement = items.map((event, index) => {
    const eventUrl = `${siteUrl}${event.href}`;
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": eventUrl,
        url: eventUrl,
        name: event.name,
        description: event.detail,
      },
    };
  });
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: collection.title,
      description: collection.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${pageUrl}#events` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#events`,
      name: collection.title,
      numberOfItems: itemListElement.length,
      itemListElement,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Texas Events", item: `${siteUrl}/events` },
        { "@type": "ListItem", position: 3, name: collection.title, item: pageUrl },
      ],
    },
  ];

  return {
    meta: buildMeta(texasDefinedBrand, {
      title: collection.title,
      description: collection.description,
      canonicalPath,
      robots: shouldIndex ? undefined : "noindex, follow, max-image-preview:large",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
  };
}

export function loadEventCollectionPageServer(slug: string) {
  const directory = loadMajorEventGuideDirectoryServer();
  const temporal = resolveTemporalEventCollectionServer(slug, directory);
  const evergreen = EVENT_COLLECTION_BY_SLUG.get(slug);
  if (!temporal && !evergreen) return null;

  const collection: CollectionDefinition = temporal ?? evergreen!;
  const items: DirectoryItems = temporal
    ? temporal.items
    : directory.filter((event) =>
        evergreen!.kind === "category"
          ? event.category === evergreen!.value
          : event.region === evergreen!.value,
      );
  const shouldIndex = temporal?.shouldIndex ?? true;
  const indexabilityNote = temporal?.indexabilityNote ?? "This collection is a durable, crawlable event-discovery page backed by permanent verified event guides.";

  const latestSourceCheck = items
    .map((item) => item.sourceCheckedAt)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1);

  const relatedCollections = collection.relatedPaths
    .map((relatedPath) => eventCollectionByPath.get(relatedPath))
    .filter((item): item is CollectionDefinition => Boolean(item))
    .map(({ path, title, description }) => ({ path, title, description }));

  return {
    ...collection,
    relatedCollections,
    itemCount: items.length,
    latestSourceCheck,
    items,
    shouldIndex,
    indexabilityNote,
    head: buildCollectionHead(collection, items, shouldIndex),
    sourcePolicyTitle,
    sourcePolicyParagraphs,
  };
}
