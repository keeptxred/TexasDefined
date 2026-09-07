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

function reportOptionalSearchFailure(label: string) {
  console.warn(`[search-documents-runtime] optional ${label} search enrichment unavailable`);
}

export async function buildSearchDocuments(): Promise<SearchDocument[]> {
  let rawBase: SearchDocument[] = [];
  try {
    rawBase = await platform.search.documents(scope);
  } catch {
    // The core fixture catalog is useful context, but Ask Texas must still be
    // able to answer from protected static authority documents when a lazy
    // editorial module or repository adapter is unavailable in the Worker.
    reportOptionalSearchFailure("core");
  }
  const base = rawBase.filter((document) => document.kind !== "article");

  if (rawBase.some((document) => document.kind === "article")) {
    try {
      const articleCatalog = await platform.articles.list(scope);
      const indexableArticleHrefs = new Set(
        articleCatalog
          .map(prepareArticleForDelivery)
          .filter(isArticleDiscoveryReady)
          .map((article) => `/article/${article.slug}`),
      );
      for (const document of rawBase) {
        if (document.kind !== "article" || !indexableArticleHrefs.has(document.href)) continue;
        base.push(document);
      }
    } catch {
      // Fail closed for article discovery. If publication-readiness cannot be
      // verified, keep non-article discovery working rather than exposing an
      // unverified article or throwing the entire search/Ask Texas request.
      reportOptionalSearchFailure("publication-ready article");
    }
  }

  const knownHrefs = new Set(base.map((document) => document.href));
  for (const document of staticSearchDocuments) {
    if (knownHrefs.has(document.href)) continue;
    base.push(document);
    knownHrefs.add(document.href);
  }

  try {
    const { buildPrioritySearchDocuments } = await import("./priority-search-documents");
    for (const document of buildPrioritySearchDocuments()) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
  } catch {
    reportOptionalSearchFailure("priority");
  }

  try {
    const { buildHuntingSearchDocuments } = await import("./hunting/search");
    for (const document of buildHuntingSearchDocuments()) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
  } catch {
    reportOptionalSearchFailure("hunting");
  }

  try {
    const { buildFishingSearchDocuments } = await import("./fishing/search");
    const fishingDocuments = await buildFishingSearchDocuments();
    for (const document of fishingDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
  } catch {
    reportOptionalSearchFailure("fishing");
  }

  try {
    const { buildSportsVenueSearchDocuments } = await import("./sports-venue-search");
    const sportsDocuments = buildSportsVenueSearchDocuments();
    for (const document of sportsDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
  } catch {
    reportOptionalSearchFailure("sports venue");
  }

  try {
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
  } catch {
    reportOptionalSearchFailure("major event");
  }

  try {
    const { buildCityMetroSearchDocuments } = await import("./city-metro-search");
    for (const document of buildCityMetroSearchDocuments()) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
  } catch {
    reportOptionalSearchFailure("city and metro");
  }

  try {
    const { buildRvParkSearchDocuments } = await import("./rv-parks");
    const rvParkDocuments = await buildRvParkSearchDocuments();
    for (const document of rvParkDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
  } catch {
    // The global search runtime can also be called from the custom Worker
    // entry used by Ask Texas, where TanStack createServerFn wrappers do not
    // have the route request context they have inside the app router. RV
    // discovery is optional here; never let that boundary crash all search.
    reportOptionalSearchFailure("RV park");
  }

  let destinations: Destination[];
  try {
    const { listResolvedDestinationSearchCatalog } = await import("./destination-query-runtime");
    destinations = await listResolvedDestinationSearchCatalog();
  } catch {
    reportOptionalSearchFailure("resolved destination");
    return [...new Map(base.map((document) => [document.href, document])).values()];
  }

  const nonDestinationDocuments = base.filter((document) => document.kind !== "destination");
  const nonDestinationHrefs = new Set(nonDestinationDocuments.map((document) => document.href));
  try {
    const { paintedChurchSearchDocuments } = await import("./painted-church-search");
    for (const document of paintedChurchSearchDocuments) {
      if (nonDestinationHrefs.has(document.href)) continue;
      const normalizedDocument: SearchDocument = document.id.startsWith("painted-church:")
        ? { ...document, kind: "guide" }
        : document;
      nonDestinationDocuments.push(normalizedDocument);
      nonDestinationHrefs.add(normalizedDocument.href);
    }
  } catch {
    reportOptionalSearchFailure("painted church");
  }

  if (!destinations.length) return nonDestinationDocuments;
  const documents = [
    ...nonDestinationDocuments,
    ...destinations.map(destinationSearchDocument),
  ];
  return [...new Map(documents.map((document) => [document.href, document])).values()];
}
