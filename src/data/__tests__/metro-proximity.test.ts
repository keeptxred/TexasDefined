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
import { applyCuratedDestinationBatch9 } from "../destination-curation-batch9.ts";
import { esteroLlanoGrandePreservedDestinations } from "../estero-llano-grande-preserved-destination.ts";
import { applyCuratedDestinationBatch20 } from "../destination-curation-batch20.ts";
import { MCALLEN_WBC_SITES, MCALLEN_WBC_SOURCES } from "../mcallen-world-birding-center.ts";

const hero = { src: "/images/test.jpg", alt: "Test place", width: 1200, height: 800 };

function destination(index: number, category: CategorySlug, overrides: Partial<Destination> = {}): Destination {
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
  const thin = Array.from({ length: collection.minResults }, (_, index) => destination(index + 1, "small-towns", { county: "One County", nearestTown: "One Town" }));
  assert.equal(isMetroProximityCollectionIndexReady(thin, metro, collection), false);
});

test("substantive, diverse inventory can clear the index gate", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const categories: CategorySlug[] = ["small-towns", "state-parks", "lakes-rivers", "historic-sites"];
  const rows = Array.from({ length: 16 }, (_, index) => destination(index + 1, categories[index % categories.length], {
    nearestTown: `Town ${index % 10}`,
    county: `County ${index % 5}`,
  }));
  assert.equal(isMetroProximityCollectionIndexReady(rows, metro, collection), true);
});

test("San Angelo closest-small-town page is geography-first instead of catalog-only", () => {
  const metro = getMetroProximityMetro("san-angelo")!;
  const collection = getMetroProximityCollection("small-towns-1-hour")!;
  const rows = selectMetroProximityTownReferences(metro, collection);
  const names = new Set(rows.map((row) => row.town.name));
  for (const name of ["Miles", "Christoval", "Mertzon", "Robert Lee", "Bronte", "Paint Rock", "Ballinger"]) assert.ok(names.has(name), `missing ${name}`);
  assert.ok(rows.every((row) => row.distanceMiles > collection.minimumMiles && row.distanceMiles <= collection.radiusMiles));
  assert.equal(isMetroProximityCollectionIndexReadyWithTownReferences([], metro, collection), true);
});

test("San Angelo town references stay inside configured geographic rings", () => {
  const metro = getMetroProximityMetro("san-angelo")!;
  const closest = getMetroProximityCollection("small-towns-1-hour")!;
  const middle = getMetroProximityCollection("small-towns-2-hours")!;
  const closestNames = new Set(selectMetroProximityTownReferences(metro, closest).map((row) => row.town.name));
  const middleNames = new Set(selectMetroProximityTownReferences(metro, middle).map((row) => row.town.name));
  assert.equal(closestNames.has("Eden"), false);
  for (const name of ["Eden", "Sterling City", "Eldorado", "Winters", "Big Lake"]) assert.ok(middleNames.has(name), `missing ${name}`);
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
  for (const slug of ["weekend-trips", "road-trips", "small-towns-1-hour", "small-towns-2-hours", "small-towns-3-hours", "lakes", "swimming-holes"]) assert.ok(slugs.has(slug as never), `missing ${slug}`);
});

test("McAllen day trips prioritize regional wildlife, allow local outings and drop unreachable coastal shortcuts", () => {
  const metro = getMetroProximityMetro("mcallen")!;
  const collection = getMetroProximityCollection("day-trips")!;
  const candidates = [
    destination(1, "state-parks", {
      slug: "bentsen-rio-grande-valley-state-park", nearestTown: "Mission", county: "Hidalgo",
      coordinates: { lat: 26.187, lng: -98.381 },
    }),
    destination(2, "outdoors", {
      slug: "santa-ana-national-wildlife-refuge", nearestTown: "Alamo", county: "Hidalgo",
      coordinates: { lat: 26.083, lng: -98.145 },
    }),
    destination(3, "beaches-coast", {
      slug: "yarborough-pass", nearestTown: "Padre Island", county: "Kleberg",
      coordinates: { lat: 27.20434, lng: -97.38929 },
    }),
    destination(4, "beaches-coast", {
      slug: "south-padre-island-beaches", nearestTown: "South Padre Island", county: "Cameron",
      coordinates: { lat: 26.113528, lng: -97.164556 },
    }),
    destination(5, "beaches-coast", {
      slug: "port-aransas-beach", nearestTown: "Port Aransas", county: "Nueces",
      coordinates: { lat: 27.82247, lng: -97.0592 },
    }),
    destination(6, "beaches-coast", {
      slug: "padre-island-national-seashore-backcountry", nearestTown: "Padre Island", county: "Kleberg",
      coordinates: { lat: 27.41533, lng: -97.30151 },
    }),
    destination(7, "historic-sites", {
      slug: "port-isabel-lighthouse", nearestTown: "Port Isabel", county: "Cameron",
      coordinates: { lat: 26.0764, lng: -97.2086 },
    }),
  ];
  const slugs = new Set(selectMetroProximityDestinations(candidates, metro, collection).map((row) => row.destination.slug));
  assert.ok(slugs.has("bentsen-rio-grande-valley-state-park"), "local Bentsen park should qualify");
  assert.ok(slugs.has("santa-ana-national-wildlife-refuge"), "Santa Ana belongs in the regional trip list");
  assert.ok(slugs.has("south-padre-island-beaches"), "reachable South Padre coast remains an option");
  assert.ok(slugs.has("port-isabel-lighthouse"), "the canonical Port Isabel Lighthouse guide must be eligible for the curated day-trip card");
  assert.ok(!slugs.has("yarborough-pass"), "high-clearance 4WD Yarborough Pass is not an ordinary day trip");
  assert.ok(!slugs.has("padre-island-national-seashore-backcountry"), "remote Padre Island backcountry is excluded");
  assert.ok(!slugs.has("port-aransas-beach"), "distant Coastal Bend beach should not take a Valley day-trip slot");
});

test("McAllen day trips cap repetitive town clusters while preserving nearby variety", () => {
  const metro = getMetroProximityMetro("mcallen")!;
  const collection = getMetroProximityCollection("day-trips")!;
  const rows = Array.from({ length: 12 }, (_, index) => destination(index + 1, index % 2 ? "historic-sites" : "beaches-coast", {
    nearestTown: index < 8 ? "South Padre Island" : "Weslaco",
    county: index < 8 ? "Cameron" : "Hidalgo",
    coordinates: { lat: 26.11 + index * 0.003, lng: -97.16 - index * 0.07 },
  }));
  const selected = selectMetroProximityDestinations(rows, metro, collection);
  assert.ok(selected.filter((row) => row.destination.nearestTown === "South Padre Island").length <= 2);
  assert.ok(selected.filter((row) => row.destination.nearestTown === "Weslaco").length <= 2);
  assert.ok(selected.some((row) => row.destination.nearestTown === "Weslaco"));
  assert.ok(selected.every((row, i) => i === 0 || row.distanceMiles >= selected[i - 1].distanceMiles));
});

test("McAllen editorial changes do not alter the standard geographic selector in other metros", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("day-trips")!;
  const tooClose = destination(1, "state-parks", { nearestTown: "Houston", coordinates: { lat: 29.762, lng: -95.371 } });
  const ordinary = destination(2, "state-parks", { nearestTown: "Richmond", coordinates: { lat: 29.58, lng: -95.76 } });
  assert.deepEqual(selectMetroProximityDestinations([tooClose, ordinary], metro, collection).map((row) => row.destination.slug), [ordinary.slug]);
});

test("generic metro day trips keep geographic variety instead of filling 30 slots from one town", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("day-trips")!;
  const repeated = Array.from({ length: 25 }, (_, index) => destination(index + 200, "beaches-coast", {
    nearestTown: "Overrepresented Beach Town",
    county: "County A",
    coordinates: { lat: 30.20 + index * 0.001, lng: -95.3698 },
  }));
  const categories: CategorySlug[] = ["state-parks", "lakes-rivers", "historic-sites", "small-towns"];
  const otherTowns = Array.from({ length: 12 }, (_, index) => destination(index + 300, categories[index % categories.length], {
    nearestTown: `Distinct Town ${index}`,
    county: `County ${index % 5}`,
    coordinates: { lat: 30.48 + index * 0.005, lng: -95.3698 },
  }));
  const selected = selectMetroProximityDestinations([...repeated, ...otherTowns], metro, collection);
  assert.equal(selected.filter((row) => row.destination.nearestTown === "Overrepresented Beach Town").length, 2);
  assert.equal(selected.length, 14, "use a useful diverse shortlist; do not add 16 redundant beach cards just to reach 30");
  assert.ok(new Set(selected.map((row) => row.destination.nearestTown)).size >= 10);
  assert.ok(new Set(selected.map((row) => row.destination.category)).size >= collection.minCategories);
  assert.ok(selected.every((row, i) => i === 0 || row.distanceMiles >= selected[i - 1].distanceMiles));
  assert.equal(isMetroProximityCollectionIndexReady([...repeated, ...otherTowns], metro, collection), true);
  assert.deepEqual(
    selectMetroProximityDestinations([...otherTowns, ...repeated].reverse(), metro, collection).map((row) => row.destination.slug),
    selected.map((row) => row.destination.slug),
    "catalog input order must not affect day-trip picks",
  );
});

test("sparse day-trip inventory only relaxes the town cap to meet the existing minimum", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("day-trips")!;
  const oneTown = Array.from({ length: 18 }, (_, index) => destination(index + 400, "state-parks", {
    nearestTown: "Single Town",
    county: "Single County",
    coordinates: { lat: 30.25 + index * 0.005, lng: -95.3698 },
  }));
  const selected = selectMetroProximityDestinations(oneTown, metro, collection);
  assert.equal(selected.length, collection.minResults);
  assert.equal(isMetroProximityCollectionIndexReady(oneTown, metro, collection), false, "weak geographic diversity must remain noindex");
});

test("remote backcountry shortcuts are excluded for all day-trip metros but not erased from other collections", () => {
  const metro = getMetroProximityMetro("corpus-christi")!;
  const dayTrips = getMetroProximityCollection("day-trips")!;
  const thingsToDo = getMetroProximityCollection("things-to-do")!;
  const remote = destination(501, "beaches-coast", {
    slug: "yarborough-pass", nearestTown: "Padre Island", county: "Kleberg",
    coordinates: { lat: 27.20434, lng: -97.38929 },
  });
  const accessible = destination(502, "state-parks", {
    slug: "ordinary-park", nearestTown: "Coastal Bend", county: "Nueces",
    coordinates: { lat: 27.45, lng: -97.39 },
  });
  assert.deepEqual(
    selectMetroProximityDestinations([remote, accessible], metro, dayTrips).map((row) => row.destination.slug),
    [accessible.slug],
  );
  assert.ok(
    selectMetroProximityDestinations([remote], metro, thingsToDo).some((row) => row.destination.slug === remote.slug),
    "other collections and destination detail should not silently lose a researched place",
  );
});

test("non-day-trip proximity collections retain their existing geographic ordering and breadth", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const sameTown = Array.from({ length: 16 }, (_, index) => destination(index + 600, "state-parks", {
    nearestTown: "Repeated Town", county: "County A", coordinates: { lat: 29.91 + index * 0.01, lng: -95.3698 },
  }));
  const selected = selectMetroProximityDestinations(sameTown, metro, collection);
  assert.equal(selected.length, sameTown.length, "do not silently constrain other collection families");
});

test("McAllen nine-site World Birding Center authority uses unique, source-backed, accessible visitor choices", () => {
  const expectedTowns = ["Roma", "Mission", "McAllen", "Hidalgo", "Edinburg", "Weslaco", "Harlingen", "Brownsville", "South Padre Island"];
  assert.equal(MCALLEN_WBC_SITES.length, 9, "the real network comprises three parks and six community sites");
  assert.deepEqual(MCALLEN_WBC_SITES.map((site) => site.location.split(" · ")[0]), expectedTowns);
  assert.equal(new Set(MCALLEN_WBC_SITES.map((site) => site.name)).size, 9);
  assert.equal(new Set(MCALLEN_WBC_SITES.map((site) => site.official)).size, 9);
  for (const site of MCALLEN_WBC_SITES) {
    assert.equal(new URL(site.official).protocol, "https:", site.name);
    assert.ok(site.plan.length > 90 && site.before.length > 60 && site.fit.length >= 16, site.name);
    assert.ok(!/\babout \d+ (?:minutes|hours) away\b/i.test(site.plan), "do not invent road-time estimates");
  }
  for (const source of Object.values(MCALLEN_WBC_SOURCES)) {
    assert.equal(new URL(source).protocol, "https:");
  }
});

test("four genuinely researched Lower Valley state parks are classified correctly and meet geographic requirements", () => {
  const expected = [
    ["bentsen-rio-grande-valley-state-park", "Mission", "Hidalgo"],
    ["estero-llano-grande-state-park", "Weslaco", "Hidalgo"],
    ["resaca-de-la-palma-state-park", "Brownsville", "Cameron"],
    ["falcon-state-park", "Falcon Heights", "Starr"],
  ] as const;
  const parks = expected.map(([slug], index) => {
    const input = destination(800 + index, "outdoors", { slug, nearestTown: "Unknown" });
    return applyCuratedDestinationBatch20(applyCuratedDestinationBatch9(input));
  });
  for (const [index, park] of parks.entries()) {
    assert.equal(park.category, "state-parks", `${park.slug} should be correctly classified as a TPWD state park`);
    assert.equal(park.nearestTown, expected[index][1]);
    assert.equal(park.county, expected[index][2]);
    assert.ok(park.summary.length >= 90);
    assert.ok(park.body.length >= 3 && park.body.join(" ").length >= 450, park.slug);
    assert.ok(park.hero.src.startsWith("/images/state-parks/"), `${park.slug} needs an existing licensed, exact-park hero`);
    assert.ok(Boolean(park.hero.credit));
    assert.ok(park.officialUrl?.startsWith("https://tpwd.texas.gov/state-parks/"));
    assert.ok(Date.parse(park.sourceCheckedAt ?? "") > 0);
  }
  const metro = getMetroProximityMetro("mcallen")!;
  const collection = getMetroProximityCollection("state-parks")!;
  const selected = selectMetroProximityDestinations(parks, metro, collection);
  assert.equal(selected.length, 4, "all four belong inside the McAllen state-park geographic radius");
  assert.ok(isMetroProximityCollectionIndexReady(parks, metro, collection), "authentic park choices meet the unchanged town/county/category gates");
});

test("canonical Estero Llano Grande fallback is a full, unique, vetted destination rather than a thin duplicate", () => {
  assert.equal(esteroLlanoGrandePreservedDestinations.length, 1);
  const [park] = esteroLlanoGrandePreservedDestinations;
  assert.equal(park.slug, "estero-llano-grande-state-park");
  assert.equal(park.category, "state-parks");
  assert.equal(park.nearestTown, "Weslaco");
  assert.equal(park.county, "Hidalgo");
  assert.ok(park.summary.length >= 90);
  assert.ok(park.body.length >= 3 && park.body.join(" ").length >= 450);
  assert.ok(park.highlights.length >= 3);
  assert.ok(park.hero.src.endsWith("/world-birding-center-estero-llano-grande-state-park.jpg"));
  assert.ok(park.hero.credit?.includes("Wikimedia Commons"));
  assert.equal(park.sourceCheckedAt, "2026-10-09");
  assert.ok(park.officialUrl?.startsWith("https://tpwd.texas.gov/state-parks/estero-llano-grande/"));

  const metro = getMetroProximityMetro("mcallen")!;
  const stateParks = getMetroProximityCollection("state-parks")!;
  const rows = selectMetroProximityDestinations([park, park], metro, stateParks);
  assert.deepEqual(rows.map((row) => row.destination.slug), ["estero-llano-grande-state-park"], "the duplicate gate must still apply");
  assert.ok(rows[0].distanceMiles < 40, "Estero is a genuine close-in Valley park");
});
