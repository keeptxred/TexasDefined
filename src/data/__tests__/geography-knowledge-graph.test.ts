import assert from "node:assert/strict";
import test from "node:test";

import {
  GEOGRAPHY_KNOWLEDGE_GRAPH_VALIDATION_ERRORS,
  LEGACY_TRAVEL_REGION_GEOGRAPHY,
  TEXAS_COUNTY_GEOGRAPHY,
  TEXAS_PLACE_GEOGRAPHY,
  auditGeographyCoverage,
  geographyForPlace,
  resolveTexasGeography,
  withCanonicalArticleGeography,
  withCanonicalDestinationGeography,
  withCanonicalEventGeography,
} from "../geography-knowledge-graph.ts";
import { TEXAS_SUBREGIONS } from "../canonical-geography.ts";
import type { Article, Destination, TexasEvent, TexasRegion } from "../types.ts";

const hero = { src: "/test.jpg", alt: "test", width: 100, height: 100 };

test("Phase 2 geography knowledge graph is internally valid", () => {
  assert.deepEqual(GEOGRAPHY_KNOWLEDGE_GRAPH_VALIDATION_ERRORS, []);
  assert.ok(TEXAS_PLACE_GEOGRAPHY.length >= 65);
  assert.ok(TEXAS_COUNTY_GEOGRAPHY.size >= 45);
});

test("all legacy Travel/Explore regions crosswalk to the canonical graph", () => {
  const legacy: TexasRegion[] = ["hill-country", "gulf-coast", "big-bend", "panhandle", "piney-woods", "prairies-lakes", "south-texas"];
  for (const region of legacy) assert.ok(LEGACY_TRAVEL_REGION_GEOGRAPHY[region]?.primaryRegionId);
});

test("requested Phase 2 subregions are first-class typed definitions", () => {
  const ids = new Set(TEXAS_SUBREGIONS.map((item) => item.id));
  for (const id of ["cross-timbers", "texoma", "brazos-valley", "deep-east-texas", "golden-triangle"] as const) assert.ok(ids.has(id), id);
  assert.equal(TEXAS_SUBREGIONS.find((item) => item.id === "upper-east-texas")?.aliases.includes("Northeast Texas"), true);
  assert.equal(TEXAS_SUBREGIONS.find((item) => item.id === "trans-pecos")?.aliases.includes("Far West Texas"), true);
});

test("boundary and high-value relocation places resolve precisely", () => {
  assert.equal(geographyForPlace("Austin, TX")?.primaryRegionId, "central-texas");
  assert.deepEqual(geographyForPlace("Austin")?.gatewaySubregionIds, ["texas-hill-country"]);
  assert.equal(geographyForPlace("San Antonio")?.primaryRegionId, "south-texas");
  assert.equal(geographyForPlace("Dallas")?.metroId, "dallas-fort-worth");
  assert.ok(geographyForPlace("Beaumont")?.subregionIds.includes("golden-triangle"));
  assert.ok(geographyForPlace("College Station")?.subregionIds.includes("brazos-valley"));
  assert.ok(geographyForPlace("Sherman")?.subregionIds.includes("texoma"));
  assert.ok(geographyForPlace("Nacogdoches")?.subregionIds.includes("deep-east-texas"));
  assert.ok(geographyForPlace("Corpus Christi")?.subregionIds.includes("coastal-bend"));
});

test("county-series articles retain county identity while gaining canonical geography", () => {
  const article = {
    id: "test", brandId: "texasdefined", slug: "ector-county-odessa-oil-stonehenge-texas",
    title: "Ector County: Odessa and the Permian Basin", dek: "West Texas oil country", category: "texas-history",
    region: "big-bend", hero, authorId: "a-hollis", publishedAt: "2026-08-10", readingMinutes: 8,
    tags: ["Ector County", "Odessa", "Permian Basin", "West Texas"], body: [], relatedCollections: [], relatedDestinations: [],
  } satisfies Article;
  const enriched = withCanonicalArticleGeography(article);
  assert.equal(enriched.geography?.primaryRegionId, "west-texas");
  assert.ok(enriched.geography?.subregionIds.includes("permian-basin"));
  assert.ok(enriched.geography?.countySlugs?.includes("ector"));
});

test("destinations and events resolve from local place fields", () => {
  const destination = {
    id: "d", brandId: "texasdefined", slug: "test-caddo", name: "Test Caddo", summary: "test", category: "lakes-rivers",
    region: "piney-woods", nearestTown: "Uncertain", coordinates: { lat: 0, lng: 0 }, hero, bestSeason: "fall", entryNote: "test", highlights: [], body: [],
  } satisfies Destination;
  const event = {
    id: "e", brandId: "texasdefined", slug: "test-mcallen", name: "Test Event", blurb: "test", city: "McAllen",
    region: "south-texas", startDate: "2027-01-01", category: "culture",
  } satisfies TexasEvent;
  assert.equal(withCanonicalDestinationGeography(destination).geography?.primaryRegionId, "east-texas");
  assert.ok(withCanonicalEventGeography(event).geography?.subregionIds.includes("rio-grande-valley"));
});

test("legacy fallback prevents local-content geography orphans", () => {
  const assignment = resolveTexasGeography({ region: "prairies-lakes", county: "Unknown County" });
  assert.equal(assignment?.primaryRegionId, "north-texas");
  assert.deepEqual(assignment?.countySlugs, ["unknown"]);

  const report = auditGeographyCoverage({
    destinations: [{ id: "d", brandId: "texasdefined", slug: "x", name: "x", summary: "x", category: "outdoors", region: "panhandle", nearestTown: "Unknown", coordinates: { lat: 0, lng: 0 }, hero, bestSeason: "x", entryNote: "x", highlights: [], body: [] }],
    events: [{ id: "e", brandId: "texasdefined", slug: "y", name: "y", blurb: "y", city: "Unknown", region: "gulf-coast", startDate: "2027-01-01", category: "culture" }],
  });
  assert.equal(report.unresolved, 0);
  assert.equal(report.resolved, 2);
});
