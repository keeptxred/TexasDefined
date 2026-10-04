import assert from "node:assert/strict";
import { test } from "node:test";

import {
  METRO_PROXIMITY_COLLECTIONS,
  getMetroProximityCollection,
  getMetroProximityMetro,
  isMetroProximityCollectionIndexReady,
  selectMetroProximityDestinations,
} from "../metro-proximity.ts";
import {
  isMetroProximityCollectionIndexReadyWithTownReferences,
  selectMetroProximityTownReferences,
} from "../metro-proximity-town-references.ts";
import type { CategorySlug, Destination } from "../types.ts";

const hero = { src: "/images/test.jpg", alt: "Test place", width: 1200, height: 800 };

function destination(
  index: number,
  category: CategorySlug,
  overrides: Partial<Destination> = {},
): Destination {
  return {
    id: `test-${index}`,
    brandId: "texasdefined",
    slug: `test-place-${index}`,
    name: `Test Place ${index}`,
    summary: `Test Place ${index} has enough destination-specific planning context to satisfy the metro-proximity quality floor while exercising geographic diversity and search-intent filtering.`,
    category,
    region: "gulf-coast",
    nearestTown: `Town ${index % 8}`,
    county: `County ${index % 4}`,
    coordinates: { lat: 29.7604 + ((index % 6) * 0.08), lng: -95.3698 + ((index % 5) * 0.07) },
    hero,
    bestSeason: "Fall through spring for comfortable conditions.",
    entryNote: "Verify current access and hours before traveling.",
    highlights: ["local character", "outdoor stop", "day trip"],
    body: ["A sufficiently detailed destination body for deterministic testing."],
    ...overrides,
  };
}

test("unknown metro and collection slugs fail closed", () => {
  assert.equal(getMetroProximityMetro("not-a-metro"), undefined);
  assert.equal(getMetroProximityCollection("not-a-collection"), undefined);
});

test("small-town hour-intent rings are non-overlapping", () => {
  const one = getMetroProximityCollection("small-towns-1-hour")!;
  const two = getMetroProximityCollection("small-towns-2-hours")!;
  const three = getMetroProximityCollection("small-towns-3-hours")!;
  assert.equal(one.radiusMiles, two.minimumMiles);
  assert.equal(two.radiusMiles, three.minimumMiles);
  assert.ok(one.minimumMiles < one.radiusMiles);
  assert.ok(two.minimumMiles < two.radiusMiles);
  assert.ok(three.minimumMiles < three.radiusMiles);
});

test("duplicate destination slugs cannot inflate collection inventory", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const place = destination(1, "small-towns");
  const rows = selectMetroProximityDestinations([place, place, place], metro, collection);
  assert.equal(rows.length, 1);
});

test("swimming-hole intent requires water-use language, not only a broad outdoor category", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("swimming-holes")!;
  const swimming = destination(1, "state-parks", { summary: "A spring-fed swimming pool and tubing destination with enough detailed visitor context for families planning a summer water day near Houston." });
  const dry = destination(2, "outdoors", { summary: "A dry prairie hiking preserve with birding trails and enough detailed visitor context, but no designated aquatic recreation or water access." });
  const rows = selectMetroProximityDestinations([swimming, dry], metro, collection);
  assert.deepEqual(rows.map((row) => row.destination.slug), [swimming.slug]);
});

test("thin or geographically narrow collections remain noindex", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const thin = Array.from({ length: collection.minResults }, (_, index) =>
    destination(index + 1, "small-towns", { county: "One County", nearestTown: "One Town" }),
  );
  assert.equal(isMetroProximityCollectionIndexReady(thin, metro, collection), false);
});

test("substantive, diverse inventory can clear the index gate", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const categories: CategorySlug[] = ["small-towns", "state-parks", "lakes-rivers", "historic-sites"];
  const rows = Array.from({ length: 16 }, (_, index) =>
    destination(index + 1, categories[index % categories.length], {
      nearestTown: `Town ${index % 10}`,
      county: `County ${index % 5}`,
    }),
  );
  assert.equal(isMetroProximityCollectionIndexReady(rows, metro, collection), true);
});

test("San Angelo one-hour guide is geography-first instead of destination-catalog-only", () => {
  const metro = getMetroProximityMetro("san-angelo")!;
  const collection = getMetroProximityCollection("small-towns-1-hour")!;
  const rows = selectMetroProximityTownReferences(metro, collection);
  assert.deepEqual(rows.map((row) => row.town.name), [
    "Miles",
    "Christoval",
    "Mertzon",
    "Robert Lee",
    "Bronte",
    "Paint Rock",
    "Ballinger",
  ]);
  assert.equal(isMetroProximityCollectionIndexReadyWithTownReferences([], metro, collection), true);
});

test("San Angelo town references stay inside their configured distance rings", () => {
  const metro = getMetroProximityMetro("san-angelo")!;
  const oneHour = getMetroProximityCollection("small-towns-1-hour")!;
  const twoHours = getMetroProximityCollection("small-towns-2-hours")!;
  const oneHourNames = new Set(selectMetroProximityTownReferences(metro, oneHour).map((row) => row.town.name));
  const twoHourNames = new Set(selectMetroProximityTownReferences(metro, twoHours).map((row) => row.town.name));
  assert.equal(oneHourNames.has("Eden"), false);
  for (const name of ["Eden", "Sterling City", "Eldorado", "Winters", "Big Lake"]) assert.ok(twoHourNames.has(name), `missing ${name}`);
});

test("a full destination guide supersedes its supplemental town reference", () => {
  const metro = getMetroProximityMetro("san-angelo")!;
  const collection = getMetroProximityCollection("small-towns-1-hour")!;
  const christoval = destination(99, "small-towns", {
    slug: "christoval",
    name: "Christoval",
    nearestTown: "Christoval",
    county: "Tom Green",
    coordinates: { lat: 31.1932, lng: -100.4998 },
  });
  const destinationRows = selectMetroProximityDestinations([christoval], metro, collection);
  const townRows = selectMetroProximityTownReferences(metro, collection, destinationRows);
  assert.equal(townRows.some((row) => row.town.slug === "christoval"), false);
});

test("launch registry includes requested trip-intent expansions", () => {
  const slugs = new Set(METRO_PROXIMITY_COLLECTIONS.map((collection) => collection.slug));
  for (const slug of [
    "weekend-trips",
    "road-trips",
    "small-towns-1-hour",
    "small-towns-2-hours",
    "small-towns-3-hours",
    "lakes",
    "swimming-holes",
  ]) assert.ok(slugs.has(slug as never), `missing ${slug}`);
});
