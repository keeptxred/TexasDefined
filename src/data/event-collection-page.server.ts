import { texasDefinedBrand } from "../brand/texasdefined";
import { buildMeta, canonicalLink } from "../lib/seo";
import { EVENT_COLLECTIONS, EVENT_COLLECTION_BY_SLUG, type EventCollectionDefinition } from "./event-collections";
import {
  TEMPORAL_EVENT_COLLECTIONS,
  resolveTemporalEventCollectionServer,
  type TemporalEventCollectionDefinition,
} from "./event-temporal-collections.server";
import { loadMajorEventGuideDirectoryServer, type MajorEventGuideDirectoryItem } from "./major-event-directory.server";
import {
  TOURNAMENT_COLLECTIONS,
  TOURNAMENT_COLLECTION_BY_SLUG,
  type TournamentCollectionDefinition,
} from "./texas-tournament-collections";
import { loadTournamentCollectionItemsServer } from "./texas-tournaments.server";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
type CollectionDefinition = EventCollectionDefinition | TemporalEventCollectionDefinition | TournamentCollectionDefinition;
type CollectionItem = Pick<MajorEventGuideDirectoryItem, "slug" | "href" | "name" | "city" | "countyName" | "detail" | "sourceCheckedAt">;

const eventCollectionByPath = new Map<string, CollectionDefinition>([
  ...EVENT_COLLECTIONS.map((item) => [item.path, item] as const),
  ...TEMPORAL_EVENT_COLLECTIONS.map((item) => [item.path, item] as const),
  ...TOURNAMENT_COLLECTIONS.map((item) => [item.path, item] as const),
]);
const sourcePolicyTitle = "Verified occurrence first, evergreen planning second";
const sourcePolicyParagraphs = [
  "Texas Defined uses permanent event-guide URLs, but it does not assume that an annual tradition repeats on the same dates every year. Organizer or host sources control the occurrence shown on each guide. When a future date is derived from an explicit recurrence rule rather than a dedicated annual schedule, the guide says so.",
  "The event page is the stable planning layer: why the event matters, how to approach the destination, related county or culture resources, and the official sources used for verification. Operational details such as gates, tickets, road closures, weather procedures and daily programs should always be rechecked with the organizer before travel.",
] as const;
const tournamentSourcePolicyTitle = "Seed broadly, index carefully";
const tournamentSourcePolicyParagraphs = [
  "The Texas Tournaments directory starts from a curated seed inventory so readers can discover the breadth of competition across the state. A seed name or location is not treated as proof of a current occurrence. Dates, host venue, organizer, eligibility, tickets and registration remain verification fields.",
  "Statewide and category collection pages are useful as durable discovery indexes. Individual tournament guides open to search only after current first-party evidence is checked; ambiguous multi-city, rotating and cross-county locations are not forced into a county relationship merely to create more local pages.",
] as const;

function buildCollectionHead(collection: CollectionDefinition, items: CollectionItem[], shouldIndex = true) {
  const canonicalPath = collection.path;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const itemListElement = items.map((event, index) => {
    if (collection.kind === "tournament") {
      if (event.sourceCheckedAt && event.href.startsWith("/event/")) {
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
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: event.name,
          description: event.detail,
        },
      };
    }

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

function tournamentItems(collection: TournamentCollectionDefinition): CollectionItem[] {
  return loadTournamentCollectionItemsServer(collection.value);
}

export function loadEventCollectionPageServer(slug: string) {
  const directory = loadMajorEventGuideDirectoryServer();
  const temporal = resolveTemporalEventCollectionServer(slug, directory);
  const evergreen = EVENT_COLLECTION_BY_SLUG.get(slug);
  const tournament = TOURNAMENT_COLLECTION_BY_SLUG.get(slug);
  if (!temporal && !evergreen && !tournament) return null;

  const collection: CollectionDefinition = tournament ?? temporal ?? evergreen!;
  const items: CollectionItem[] = tournament
    ? tournamentItems(tournament)
    : temporal
      ? temporal.items
      : directory.filter((event) =>
          evergreen!.kind === "category"
            ? event.category === evergreen!.value
            : event.region === evergreen!.value,
        );
  const shouldIndex = tournament ? items.length >= 5 : temporal?.shouldIndex ?? true;
  const verifiedTournamentCount = tournament
    ? items.filter((item) => Boolean(item.sourceCheckedAt) && item.href.startsWith("/event/")).length
    : 0;
  const indexabilityNote = tournament
    ? `This collection is indexable as a substantive discovery directory. ${verifiedTournamentCount} entries currently link to first-party-verified tournament guides; the remaining seed entries stay at the collection layer until their current occurrence details are verified.`
    : temporal?.indexabilityNote ?? "This collection is a durable, crawlable event-discovery page backed by permanent verified event guides.";

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
    itemCountLabel: tournament
      ? `${items.length.toLocaleString("en-US")} tournament and competition entries · ${verifiedTournamentCount.toLocaleString("en-US")} verified guides`
      : `${items.length.toLocaleString("en-US")} verified event guides${latestSourceCheck ? ` · Latest source check: ${latestSourceCheck}` : ""}`,
    itemsEyebrow: tournament ? "Texas tournament directory" : "Permanent planning pages",
    itemsTitle: tournament ? (tournament.value ? tournament.title : "250 Texas tournaments & competitions") : "Verified event guides",
    emptyMessage: tournament
      ? "No tournament seed currently belongs to this category."
      : "No permanent event guide currently meets the source standard for this collection; Texas Defined does not pad the page with invented dates.",
    head: buildCollectionHead(collection, items, shouldIndex),
    sourcePolicyTitle: tournament ? tournamentSourcePolicyTitle : sourcePolicyTitle,
    sourcePolicyParagraphs: tournament ? tournamentSourcePolicyParagraphs : sourcePolicyParagraphs,
  };
}
