import { prepareArticleForDelivery } from "@/lib/editorial-image-delivery";
import { isArticleDiscoveryReady } from "./fixtures/texas-gateway-index-readiness";
import { platform, scope } from "./index";
import type { Destination, SearchDocument } from "./types";

function destinationSearchDocument(destination: Destination): SearchDocument {
  const keywords = [destination.category, destination.region, destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights].filter((value): value is string => Boolean(value));
  return { id: `destination:${destination.slug}`, brandId: "texasdefined", kind: "destination", title: destination.name, summary: destination.summary, keywords: [...new Set(keywords)], href: `/destination/${destination.slug}` };
}

const staticSearchDocuments: SearchDocument[] = [
  {
    id: "collection:texas-explained",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas Explained: 10 Guides to How the State Works",
    summary: "Ten connected guides to why Texas works the way it does: rivers, reservoirs, roads, counties and towns, plants and wildlife, homes and land, regions, culture and migration.",
    keywords: ["Texas Explained", "why Texas", "how Texas works", "Texas geography", "Texas regions", "Texas counties", "Texas nature", "Texas infrastructure", "Texas culture", "Texas settlement", "Texas rivers", "Texas lakes", "farm-to-market roads", "Texas courthouse squares", "Texas wildflowers", "Texas trees", "Texas wildlife", "Texas homes", "buying land in Texas", "Texas cultural regions"],
    href: "/texas-explained",
  },
];

export async function buildSearchDocuments(): Promise<SearchDocument[]> {
  const [rawBase, articleCatalog] = await Promise.all([
    platform.search.documents(scope),
    platform.articles.list(scope),
  ]);
  const indexableArticleHrefs = new Set(
    articleCatalog
      .map(prepareArticleForDelivery)
      .filter(isArticleDiscoveryReady)
      .map((article) => `/article/${article.slug}`),
  );
  const base = rawBase.filter(
    (document) => document.kind !== "article" || indexableArticleHrefs.has(document.href),
  );
  const knownHrefs = new Set(base.map((document) => document.href));
  for (const document of staticSearchDocuments) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { buildPrioritySearchDocuments } = await import("./priority-search-documents");
  for (const document of buildPrioritySearchDocuments()) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { buildHuntingSearchDocuments } = await import("./hunting/search");
  for (const document of buildHuntingSearchDocuments()) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { buildFishingSearchDocuments } = await import("./fishing/search");
  const fishingDocuments = await buildFishingSearchDocuments();
  for (const document of fishingDocuments) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { buildSportsVenueSearchDocuments } = await import("./sports-venue-search");
  const sportsDocuments = buildSportsVenueSearchDocuments();
  for (const document of sportsDocuments) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { getMajorEventGuideDirectory } = await import("./major-event-directory");
  const majorEventGuides = await getMajorEventGuideDirectory();
  for (const event of majorEventGuides) {
    const href = `/event/${event.slug}`;
    if (knownHrefs.has(href)) continue;
    base.push({
      id: `event-guide:${event.slug}`,
      brandId: "texasdefined",
      kind: "event",
      title: event.name,
      summary: `Permanent Texas Defined event guide · ${event.detail}`,
      keywords: [event.name, event.detail, "Texas events", "Texas festival guide"],
      href,
    });
    knownHrefs.add(href);
  }
  const { buildCityMetroSearchDocuments } = await import("./city-metro-search");
  for (const document of buildCityMetroSearchDocuments()) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { buildRvParkSearchDocuments } = await import("./rv-parks");
  const rvParkDocuments = await buildRvParkSearchDocuments();
  for (const document of rvParkDocuments) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }
  const { listResolvedDestinationSearchCatalog } = await import("./destination-query-runtime");
  const destinations = await listResolvedDestinationSearchCatalog();
  const nonDestinationDocuments = base.filter((document) => document.kind !== "destination");
  const nonDestinationHrefs = new Set(nonDestinationDocuments.map((document) => document.href));
  const { paintedChurchSearchDocuments } = await import("./painted-church-search");
  for (const document of paintedChurchSearchDocuments) {
    if (nonDestinationHrefs.has(document.href)) continue;
    const normalizedDocument: SearchDocument = document.id.startsWith("painted-church:")
      ? { ...document, kind: "guide" }
      : document;
    nonDestinationDocuments.push(normalizedDocument);
    nonDestinationHrefs.add(normalizedDocument.href);
  }
  if (!destinations.length) return nonDestinationDocuments;
  const documents = [
    ...nonDestinationDocuments,
    ...destinations.map(destinationSearchDocument),
  ];
  return [...new Map(documents.map((document) => [document.href, document])).values()];
}
