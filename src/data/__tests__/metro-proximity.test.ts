import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

import { hidalgoPumphouseAuthorityDestinations } from "../hidalgo-pumphouse-authority-destination.ts";
import { selectMetroProximityAffiliateEvents } from "../metro-proximity-event-selection.ts";
import type { MetroProximityResult } from "../metro-proximity.ts";

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
  METRO_PROXIMITY_TOWN_REFERENCES,
} from "../metro-proximity-town-references.ts";
import type { CategorySlug, Destination } from "../types.ts";
import { applyCuratedDestinationBatch9 } from "../destination-curation-batch9.ts";
import { applyCuratedDestinationBatch20 } from "../destination-curation-batch20.ts";
import { MCALLEN_WBC_SITES, MCALLEN_WBC_SOURCES } from "../mcallen-world-birding-center.ts";
import { CURATED_METRO_DAY_TRIP_SLUGS, curatedMetroDayTrips } from "../metro-day-trip-editorial.ts";

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


test("Dallas town pages use independently sourced road time rather than straight-line radius", () => {
  const dallas = getMetroProximityMetro("dallas")!;
  const one = getMetroProximityCollection("small-towns-1-hour")!;
  const two = getMetroProximityCollection("small-towns-2-hours")!;
  const three = getMetroProximityCollection("small-towns-3-hours")!;
  const rows = [
    destination(2001, "small-towns", { slug: "canton", name: "Canton", nearestTown: "Canton", county: "Van Zandt", coordinates: { lat: 32.5565, lng: -95.8633 } }),
    destination(2002, "small-towns", { slug: "clifton", name: "Clifton", nearestTown: "Clifton", county: "Bosque", coordinates: { lat: 31.7824, lng: -97.5767 } }),
    destination(2003, "small-towns", { slug: "jefferson", name: "Jefferson", nearestTown: "Jefferson", county: "Marion", coordinates: { lat: 32.7574, lng: -94.3452 } }),
    destination(2004, "small-towns", { slug: "unresearched-village", name: "Unresearched Village", nearestTown: "Unresearched Village", county: "Example", coordinates: { lat: 32.74, lng: -96.6 } }),
  ];
  assert.deepEqual(selectMetroProximityDestinations(rows, dallas, one).map((row) => row.destination.slug), ["canton"]);
  assert.deepEqual(selectMetroProximityDestinations(rows, dallas, two).map((row) => row.destination.slug), ["clifton"]);
  assert.deepEqual(selectMetroProximityDestinations(rows, dallas, three).map((row) => row.destination.slug), ["jefferson"]);
  assert.ok(selectMetroProximityDestinations(rows, dallas, three)[0].distanceMiles > three.radiusMiles, "Jefferson belongs in the road-time band even when beyond the old geographic radius");
  const close = selectMetroProximityTownReferences(dallas, one);
  assert.ok(close.length >= 4, "Dallas one-hour page no longer has empty town inventory");
  assert.ok(new Set(close.map((row) => row.town.county)).size >= 2, "Dallas close-in guide spans multiple counties");
  const midrange = selectMetroProximityTownReferences(dallas, two);
  const clifton = midrange.find((row) => row.town.slug === "clifton");
  assert.ok(clifton, "Clifton has an official source when the full destination catalog is unavailable");
  assert.ok(clifton.town.officialUrl.startsWith("https://visitclifton.org/"));
  assert.equal(selectMetroProximityTownReferences(dallas, two, selectMetroProximityDestinations(rows, dallas, two)).some((row) => row.town.slug === "clifton"), false, "Clifton must never be duplicated when a destination guide is available");
  const longer = selectMetroProximityTownReferences(dallas, three);
  assert.ok(longer.some((row) => row.town.slug === "jefferson"), "Jefferson has an official source even if its authority destination is missing");
  assert.equal(isMetroProximityCollectionIndexReadyWithTownReferences([], dallas, one), true, "official visitor sources meet the protected indexing floor");
  assert.equal(isMetroProximityCollectionIndexReadyWithTownReferences([], dallas, two), true, "two-hour road trips stay index-eligible even when live catalog is sparse");
  assert.equal(isMetroProximityCollectionIndexReadyWithTownReferences([], dallas, three), true, "three-hour road trips retain six distinct towns and three counties");
  assert.ok(new Set(selectMetroProximityTownReferences(dallas, three).map((row) => row.town.county)).size >= 3);

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

test("McAllen day trips leave distant Padre Island National Seashore and Malaquite for overnights", () => {
  const metro = getMetroProximityMetro("mcallen")!;
  const collection = getMetroProximityCollection("day-trips")!;
  const options = [
    destination(14, "beaches-coast", { slug: "padre-island-national-seashore", nearestTown: "Corpus Christi", coordinates: { lat: 27.45, lng: -97.31 } }),
    destination(15, "beaches-coast", { slug: "malaquite-beach", nearestTown: "Corpus Christi", coordinates: { lat: 27.43, lng: -97.30 } }),
    destination(16, "beaches-coast", { slug: "south-padre-island-beaches", nearestTown: "South Padre Island", coordinates: { lat: 26.11, lng: -97.16 } }),
  ];
  assert.deepEqual(selectMetroProximityDestinations(options, metro, collection).map((row) => row.destination.slug), ["south-padre-island-beaches"]);
  assert.ok(selectMetroProximityDestinations(options, getMetroProximityMetro("corpus-christi")!, collection).some((row) => row.destination.slug === "malaquite-beach"));
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


test("Hidalgo Pumphouse authority record is a source-checked, index-eligible real place", () => {
  const [site] = hidalgoPumphouseAuthorityDestinations;
  assert.equal(site.slug, "old-hidalgo-pumphouse-museum");
  assert.equal(site.category, "historic-sites");
  assert.equal(site.county, "Hidalgo County");
  assert.equal(site.nearestTown, "Hidalgo");
  assert.ok(site.officialUrl?.startsWith("https://cityofhidalgo.net/"));
  assert.ok(site.authorityGuide?.sources.some((source) => source.url.includes("atlas.thc.texas.gov/")));
  assert.ok(site.hero.credit?.includes("CC BY-SA 3.0"), "use an attributed exact-site historic photograph");
  assert.ok(site.body.join(" ").length > 900, "publish genuine visitor planning, not a thin SEO filler");
  assert.ok(site.summary.trim().length >= 90, "full factual summary is required by the canonical destination audit");
  assert.ok(site.body.length >= 3 && site.body.join(" ").length >= 450, "require the canonical minimum of substantive body copy");
  assert.ok(site.highlights.length >= 3, "require useful, specific visitor highlights");
  assert.ok(site.hero.src.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/"), "exact-site rights-cleared hero rather than a generic image");
  assert.ok(!/AI-generated representative editorial image/i.test(site.hero.credit ?? ""), "do not use a substitute AI hero");
  assert.equal(site.sourceCheckedAt, "2026-10-09");
});

test("a real Hidalgo County heritage destination repairs McAllen historic-site county diversity without relaxing thresholds", () => {
  const metro = getMetroProximityMetro("mcallen")!;
  const collection = getMetroProximityCollection("historic-sites")!;
  assert.equal(collection.minCounties, 3);
  const existing = [
    destination(701, "historic-sites", { slug: "iwo-jima-museum-monument", nearestTown: "Harlingen", county: "Cameron", coordinates: { lat: 26.185, lng: -97.71 } }),
    destination(702, "historic-sites", { slug: "palo-alto-battlefield-national-historical-park", nearestTown: "Brownsville", county: "Cameron", coordinates: { lat: 25.952, lng: -97.49 } }),
    destination(703, "historic-sites", { slug: "palmito-ranch-battlefield", nearestTown: "Brownsville", county: "Cameron", coordinates: { lat: 25.943, lng: -97.279 } }),
    destination(704, "historic-sites", { slug: "port-isabel-lighthouse", nearestTown: "Port Isabel", county: "Cameron", coordinates: { lat: 26.076, lng: -97.208 } }),
    destination(705, "historic-sites", { slug: "zapata-county-museum-history", nearestTown: "Zapata", county: "Zapata", coordinates: { lat: 26.9, lng: -99.27 } }),
  ];
  assert.equal(isMetroProximityCollectionIndexReady(existing, metro, collection), false, "only Cameron and Zapata counties are represented");
  const rows = [...existing, hidalgoPumphouseAuthorityDestinations[0]];
  assert.equal(isMetroProximityCollectionIndexReady(rows, metro, collection), true, "Hidalgo County adds genuine independently reviewed historical coverage");
  const chosen = selectMetroProximityDestinations(rows, metro, collection);
  assert.ok(chosen.some((row) => row.destination.slug === "old-hidalgo-pumphouse-museum"));
  assert.equal(new Set(chosen.map((row) => row.destination.county!.replace(/\s+County$/i, "").toLowerCase())).size, 3);
});

test("McAllen ordinary things-to-do excludes remote off-road beach shortcuts but keeps nearby verified history", () => {
  const metro = getMetroProximityMetro("mcallen")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const remote = destination(801, "beaches-coast", {
    slug: "yarborough-pass", nearestTown: "Corpus Christi", county: "Kleberg",
    coordinates: { lat: 27.20434, lng: -97.38929 },
  });
  const selected = selectMetroProximityDestinations([remote, hidalgoPumphouseAuthorityDestinations[0]], metro, collection);
  assert.deepEqual(selected.map((row) => row.destination.slug), ["old-hidalgo-pumphouse-museum"]);
});


function metroEvent(
  id: string,
  title: string,
  city: string,
  affiliate = true,
  href = "https://tickets.example.com/event",
  startDate = "2026-10-03",
) {
  return {
    id,
    title,
    city,
    startDate,
    endDate: null,
    ticketCta: { href, isAffiliate: affiliate },
  };
}

test("things-to-do event selection stays geographic, fresh, useful without tickets and affiliate-safe", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const galveston = destination(920, "small-towns", { name: "Galveston", nearestTown: "Galveston" });
  const results: MetroProximityResult[] = [
    { destination: galveston, distanceMiles: 47, distanceBand: "easy-day-trip" },
  ];
  const noTicket = { ...metroEvent("free", "Free Festival", "Houston"), ticketCta: null };
  const selected = selectMetroProximityAffiliateEvents(metro, collection, results, [], [
    metroEvent("houston", "Houston Show", "Houston"),
    metroEvent("galveston-a", "Island Festival", "Galveston"),
    metroEvent("galveston-b", "Island Festival", "Galveston"),
    metroEvent("austin", "Austin Show", "Austin"),
    metroEvent("official", "Official Only", "Houston", false),
    metroEvent("unsafe", "Unsafe Affiliate", "Houston", true, "javascript:alert(1)"),
    noTicket,
    metroEvent("past", "Past Show", "Houston", true, "https://tickets.example.com/past", "2026-09-29"),
    metroEvent("future", "Far Future Show", "Houston", true, "https://tickets.example.com/future", "2026-10-15"),
  ], { todayIso: "2026-09-30", horizonIso: "2026-10-14" });
  assert.deepEqual(selected.map((item) => item.id), ["houston", "galveston-a", "official", "unsafe", "free"]);
  assert.equal(selected.find((item) => item.id === "houston")?.ticketCta?.isAffiliate, true);
  assert.equal(selected.find((item) => item.id === "official")?.ticketCta, null);
  assert.equal(selected.find((item) => item.id === "unsafe")?.ticketCta, null);
  assert.equal(selected.find((item) => item.id === "free")?.ticketCta, null);
});

test("sourced weekend town references can surface a relevant dated event without a thin destination", () => {
  const metro = getMetroProximityMetro("dallas")!;
  const collection = getMetroProximityCollection("weekend-trips")!;
  const town = METRO_PROXIMITY_TOWN_REFERENCES.find((item) => item.slug === "clifton")!;
  assert.ok(town);
  const references = [{ town, distanceMiles: 92, distanceBand: "easy-day-trip" as const }];
  const selected = selectMetroProximityAffiliateEvents(metro, collection, [], references, [
    metroEvent("clifton", "Clifton Festival", "Clifton"),
    metroEvent("unrelated", "Austin Festival", "Austin"),
  ], { todayIso: "2026-09-30", horizonIso: "2026-10-14" });
  assert.deepEqual(selected.map((item) => item.id), ["clifton"]);
});

test("ongoing metro events remain eligible when their end date is current", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const ongoing = { ...metroEvent("ongoing", "Ongoing Fair", "Houston", true, "https://tickets.example.com/ongoing", "2026-09-28"), endDate: "2026-10-02" };
  const selected = selectMetroProximityAffiliateEvents(metro, collection, [], [], [ongoing], { todayIso: "2026-09-30", horizonIso: "2026-10-14" });
  assert.deepEqual(selected.map((item) => item.id), ["ongoing"]);
});

test("weekend-trip events stay in represented destination towns and unrelated intents stay event-free", () => {
  const metro = getMetroProximityMetro("houston")!;
  const weekend = getMetroProximityCollection("weekend-trips")!;
  const dayTrips = getMetroProximityCollection("day-trips")!;
  const brenham = destination(921, "small-towns", { name: "Brenham", nearestTown: "Brenham" });
  const results: MetroProximityResult[] = [
    { destination: brenham, distanceMiles: 75, distanceBand: "easy-day-trip" },
  ];
  const candidates = [
    metroEvent("houston", "Houston Show", "Houston"),
    metroEvent("brenham", "Brenham Festival", "Brenham"),
  ];
  assert.deepEqual(selectMetroProximityAffiliateEvents(metro, weekend, results, [], candidates).map((item) => item.id), ["brenham"]);
  assert.deepEqual(selectMetroProximityAffiliateEvents(metro, dayTrips, results, [], candidates), []);
});

test("fourteen curated metro day-trip guides only feature source-backed quality-gated results", () => {
  const leads: Record<string, string> = {
    houston: "brazos-bend-state-park",
    "san-antonio": "guadalupe-river-state-park",
    austin: "pedernales-falls-state-park",
    dallas: "dinosaur-valley-state-park",
    "fort-worth": "dinosaur-valley-state-park",
    "corpus-christi": "goose-island-state-park",
    waco: "mother-neff-state-park",
    "beaumont-port-arthur": "village-creek-state-park",
    "college-station": "lake-somerville-state-park",
    tyler: "purtis-creek-state-park",
    amarillo: "palo-duro-canyon-state-park",
    lubbock: "caprock-canyons-state-park",
    "midland-odessa": "monahans-sandhills-state-park",
    "el-paso": "hueco-tanks-state-park-and-historic-site",
  };
  assert.deepEqual(CURATED_METRO_DAY_TRIP_SLUGS, Object.keys(leads));
  for (const [metro, firstSlug] of Object.entries(leads)) {
    const eligible = [
      { destination: destination(100, "state-parks", { slug: firstSlug }), distanceMiles: 60, distanceBand: "easy-day-trip" as const },
      { destination: destination(101, "small-towns", { slug: "unverified-somewhere" }), distanceMiles: 80, distanceBand: "longer-day-trip" as const },
    ];
    const featured = curatedMetroDayTrips(metro, "day-trips", eligible);
    assert.equal(featured.length, 1, metro + " should show exactly one real destination and no placeholders");
    assert.equal(featured[0].result.destination.slug, firstSlug);
    assert.ok(featured[0].sourceUrl.startsWith("https://"), "official operator link must be HTTPS");
    assert.ok(
      /^https:\/\/(tpwd\.texas\.gov|www\.nps\.gov)\//.test(featured[0].sourceUrl),
      "featured destination uses the verified state or federal operator",
    );
    assert.ok(featured[0].why.length >= 80 && featured[0].check.length >= 35, "no thin itinerary or omitted visitor caution");
    assert.equal(curatedMetroDayTrips(metro, "weekend-trips", eligible).length, 0);
    assert.equal(curatedMetroDayTrips(metro, "day-trips", []).length, 0);
  }
  const canonicalHueco = { destination: destination(105, "state-parks", { slug: "hueco-tanks-state-park-and-historic-site" }), distanceMiles: 35, distanceBand: "easy-day-trip" as const };
  const legacyHueco = { destination: destination(106, "state-parks", { slug: "hueco-tanks-state-park-state-historic-site" }), distanceMiles: 35, distanceBand: "easy-day-trip" as const };
  assert.deepEqual(curatedMetroDayTrips("el-paso", "day-trips", [canonicalHueco]).map(row => row.slug),
    ["hueco-tanks-state-park-and-historic-site"],
    "El Paso must resolve its Hueco Tanks recommendation to the public canonical destination");
  assert.equal(curatedMetroDayTrips("el-paso", "day-trips", [legacyHueco]).length, 0,
    "a retired alias must not render as a second destination or a broken public visitor guide");
  const availability = readFileSync("src/data/destination-availability.ts", "utf8");
  assert.ok(availability.includes('"hueco-tanks-state-park-state-historic-site"'),
    "legacy Hueco Tanks record is intentionally excluded from the primary trip planner");
  assert.ok(!availability.includes('"hueco-tanks-state-park-and-historic-site"'),
    "do not exclude the canonical visitable Hueco Tanks guide when rectifying the alias");
  assert.equal(curatedMetroDayTrips("mcallen", "day-trips", [] as MetroProximityResult[]).length, 0, "keep separately verified McAllen curation unchanged");
});

test("new metro editorial candidates never create unsupported destinations or duplicate cards", () => {
  const duplicate = { destination: destination(102, "state-parks", { slug: "mother-neff-state-park" }), distanceMiles: 41, distanceBand: "easy-day-trip" as const };
  const wrong = { destination: destination(103, "state-parks", { slug: "fort-boggy-state-park" }), distanceMiles: 64, distanceBand: "easy-day-trip" as const };
  const featured = curatedMetroDayTrips("waco", "day-trips", [duplicate, duplicate, wrong]);
  assert.deepEqual(featured.map((item) => item.slug), ["mother-neff-state-park"], "duplicate resolved records cannot inflate the curated selection");
  assert.equal(curatedMetroDayTrips("tyler", "road-trips", [duplicate]).length, 0, "only day trips may show day-trip editorial");
});

test("day-trip affiliate impressions require onscreen visibility and retain approved click destinations", () => {
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const analytics = readFileSync("src/lib/affiliate-click.ts", "utf8");
  assert.ok(rich.includes("new IntersectionObserver"), "only observable modules should generate an impression");
  assert.ok(rich.includes("entry.intersectionRatio >= 0.2"), "not a page load impression");
  assert.ok(rich.includes("seenDayTripImpressions.add(panel)"), "strict-mode duplicate impressions are suppressed");
  assert.ok(rich.includes('placement: "metro-day-trips-experience"'), "use stable placement attribution");
  assert.ok(analytics.includes('event: "affiliate_impression"'), "impression must use a distinct measurement event");
  assert.ok(analytics.includes('event: "affiliate_' + 'click"'), "existing click event remains intact");
  assert.ok(analytics.includes("device_class:"), "compare mobile and desktop using nonpersonal device class");
});

test("day-trip source monitoring is scheduled, conservative and preserves researched editorial", () => {
  const script = readFileSync("scripts/data/check-metro-day-trips-sources.mjs", "utf8");
  const workflow = readFileSync(".github/workflows/verify-metro-day-trips-sources.yml", "utf8");
  assert.ok(workflow.includes('cron: "17 13 * * 1"'), "weekly source check");
  assert.ok(workflow.includes("workflow_dispatch:"), "manual recheck available");
  assert.ok(workflow.includes("upload-artifact@v4"), "record sources and dates");
  assert.ok(script.includes("response.status") && script.includes('inspect(url, "GET")'), "HEAD failures require independent GET confirmation");
  assert.ok(script.includes("entry.status === 404 || entry.status === 410"), "only confirmed missing operator pages fail");
  assert.ok(!script.includes("writeFileSync(\"src/data"), "link checker must not auto-replace source-backed destination data");
});

test("day-trip booking inventory targets verified markets rather than generic provider homepages", () => {
  const stay = readFileSync("public/stay-affiliate-options.js", "utf8");
  for (const path of [
    "https://www.hotels.com/de1644308/hotels-mcallen-and-vicinity-texas/",
    "https://www.hotels.com/de1644316/hotels-south-padre-island-and-vicinity-texas/",
  ]) assert.ok(stay.includes(path), "verified Hotels.com destination directory must be retained");
  assert.ok(stay.includes('placement: "mcallen-day-trips-base-hotels"'));
  assert.ok(stay.includes('placement: "mcallen-day-trips-coastal-weekend"'));
  assert.ok(stay.includes('placement: "waco-day-trips-weekend-stay"'));
  assert.ok(stay.includes('exactPropertyDestination(name)'), "Waco property booking links must use the existing verified registry");
  assert.ok(stay.includes("actions.appendChild(createTrackedLink({"), "bookings must be attributed through approved CJ deep-link builder");
  assert.ok(stay.includes('link.rel = "sponsored nofollow noopener noreferrer"'), "affiliate relationships disclosed");
  assert.ok(stay.includes("link.dataset.commercialPartner = partnerName(destination)"), "first-party referral tracking preserved");
  assert.ok(!stay.includes("McAllen hotel rooms available") && !stay.includes("Guaranteed South Padre rates"), "no made-up availability");
});

test("day-trip monetization reuses approved booking surfaces and keeps editorial choices independent", () => {
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx");
  const partner = readFileSync("src/routes/partner-with-us.tsx");
  assert.ok(rich.includes('data-day-trip-commercial-paths={metro.slug}'));
  assert.ok(rich.includes('pageData.indexReady'), "do not monetize noindex or thin collection");
  assert.ok(rich.includes('href="#expedia-travel-surface"'), "reuse existing booking panel instead of inventing a new affiliate destination");
  assert.ok(rich.includes('Affiliate disclosure: TexasDefined may earn a commission'));
  assert.ok(rich.includes('data-metro-curated-day-trips={metro.slug}'));
  assert.ok(rich.includes('Editorial destinations and rankings are never for sale'));
  assert.ok(partner.includes("day-trips)$/.test(value)") && partner.includes("explore\\/near\\/[a-z0-9-]+\\/day-trips"), "attribute narrowly scoped lead sources");
  assert.ok(rich.includes('hasVerifiedViatorMarketUrl(experienceMarketSlug)'), "only verified Viator market pages can receive a tour CTA");
  assert.ok(rich.includes('buildViatorAffiliateUrl(verifiedViatorMarketUrl(experienceMarketSlug)'), "use the centralized approved Viator affiliate link builder");
  assert.ok(rich.includes('trackAffiliateClick({ partner: "viator"'), "record opted-in Viator link clicks");
  assert.ok(rich.includes('rel="sponsored nofollow noopener noreferrer"'), "identify monetized external links");
  assert.ok(rich.includes('data-day-trip-viator-market={experienceMarketSlug}'), "expose a dedicated, measurable experience module");
  assert.ok(rich.includes('pageData.indexReady && hasVerifiedViatorMarketUrl'), "never monetize unverified destination inventory");
  assert.ok(rich.includes('metro.slug === "mcallen" ? "south-padre-island"'), "McAllen coastal partner offer must not impersonate the entire Valley");
});

test("day-trip affiliate writes wait for lazy metro outlet hydration rather than root hydration alone", () => {
  const stay = readFileSync("public/stay-affiliate-options.js", "utf8");
  const expedia = readFileSync("public/expedia-travel.js", "utf8");
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  // This guard must cover every metro, not only the separately reviewed McAllen page.
  assert.ok(stay.includes("document.documentElement.dataset.tdMetroDayTripsHydrated !== \"1\""),
    "early third-party affiliate DOM mutations must be deferred on all day-trip pages");
  assert.ok(expedia.includes("if (metroDayTripsHydrationPending()) return;"),
    "Expedia itself must not insert or replace the React-owned lodging slot before hydration");
  assert.ok(expedia.includes("document.documentElement.dataset.tdMetroDayTripsHydrated !== \"1\""),
    "all 14 metro day-trip routes require lazy-outlet readiness");
  assert.ok(expedia.includes('window.addEventListener("texasdefined:metro-day-trips-hydrated", scheduleSync)'),
    "Expedia resumes as soon as the metro outlet is ready");
  assert.ok(stay.includes('window.addEventListener("texasdefined:metro-day-trips-hydrated", scheduleSync)'),
    "refresh the booking panel after the lazy React outlet commits");
  assert.ok(rich.includes('document.documentElement.dataset.tdMetroDayTripsHydrated = "1"'),
    "the lazy React outlet itself owns the ready signal");
  assert.ok(rich.includes('window.dispatchEvent(new Event("texasdefined:metro-day-trips-hydrated"))'),
    "affiliates must be notified of successful outlet hydration");
  assert.ok(rich.includes("delete document.documentElement.dataset.tdMetroDayTripsHydrated"),
    "a client-side route change must clear the ready signal");
  assert.ok(rich.includes('document.documentElement.dataset.tdMcAllenDayTripsHydrated = "1"'),
    "preserve McAllen-specific downstream compatibility");
});

test("Amarillo Viator panel uses the already source-verified Palo Duro marketplace URL", () => {
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const verified = readFileSync("src/data/viator-destination-links.ts", "utf8");
  assert.ok(verified.includes('"amarillo-palo-duro": "https://www.viator.com/Amarillo/d29045"'),
    "do not invent an unverified generic Amarillo market link");
  assert.ok(rich.includes('metro.slug === "amarillo" ? "amarillo-palo-duro"'),
    "the approved Amarillo URL must power both CTA visibility and on-screen impression tracking");
  assert.ok(rich.includes("hasVerifiedViatorMarketUrl(experienceMarketSlug)"),
    "retain the affiliate quality gate instead of publishing generic tours");
});

test("El Paso day-trip reader guidance links closer public destinations without changing noindex eligibility", () => {
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const shell = readFileSync("src/routes/explore.near.$metro.$collection.tsx", "utf8");
  const proximity = readFileSync("src/data/metro-proximity.ts", "utf8");
  assert.ok(rich.includes('metro.slug === "el-paso" && collection.slug === "day-trips"'),
    "the extra guidance must not bleed into other metro collections");
  assert.ok(rich.includes('data-el-paso-short-trips="separate-from-distance-results"'),
    "the close-in local choices must be visibly separate from 18–150-mile results");
  for (const slug of ["franklin-mountains-state-park", "chamizal-national-memorial"]) {
    assert.ok(rich.includes('slug: "' + slug + '"'), "link an actual published authority guide: " + slug);
  }
  assert.ok(rich.includes("https://tpwd.texas.gov/state-parks/parks/franklin-mountains/"));
  assert.ok(rich.includes("https://www.nps.gov/cham/planyourvisit/hours.htm"));
  assert.ok(rich.includes("advance day-use reservations"));
  assert.ok(rich.includes("separate"));
  assert.ok(rich.includes("not a change to the page's source-coverage or indexing threshold"));
  const pageData = readFileSync("src/data/metro-proximity-page-data.server.ts", "utf8");
  assert.ok(pageData.includes("isMetroProximityCollectionIndexReadyWithTownReferences(destinations, metro, collection)"),
    "retain independent source-backed collection eligibility");
  assert.ok(pageData.includes('const robots = indexReady ? "index, follow, max-image-preview:large" : "noindex, follow"'),
    "reader guidance must not override server-owned indexability and robots");
  assert.ok(shell.includes("!indexReady"),
    "keep the visible noindex/quality explanation for thin city pages");
  assert.ok(proximity.includes("minResults: 10"), "do not lower geographic count floor");
  assert.ok(proximity.includes("minCounties: 4"), "do not lower diverse-county floor");
  assert.ok(proximity.includes("minimumMiles: 18"), "do not misrepresent inner-ring guidance as eligible day trips");
  const browser = readFileSync("scripts/ci/verify-metro-day-trips-production.mjs", "utf8");
  assert.ok(browser.includes('if(metro==="el-paso")'),
    "production desktop/mobile checks must inspect El Paso's local-guide complement");
  assert.ok(browser.includes('El Paso close-in outings are distinct from governed distance inventory'),
    "the browser contract must enforce the two local visitor guides and official sources");
  const sourceMonitor = readFileSync("scripts/data/check-metro-day-trips-sources.mjs", "utf8");
  assert.ok(sourceMonitor.includes('data-el-paso-short-trips="separate-from-distance-results"'),
    "weekly scheduled source monitor must include official URLs introduced in the El Paso local guide");
  assert.ok(sourceMonitor.includes("elPasoOperatorLinks"),
    "don't leave the NPS Chamizal visitor link outside ongoing source-health monitoring");
});

test("El Paso research leads are real operator references, not synthetic index-ready destination records", () => {
  const editorial = readFileSync("src/data/metro-day-trip-editorial.ts", "utf8");
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const monitor = readFileSync("scripts/data/check-metro-day-trips-sources.mjs", "utf8");
  const browser = readFileSync("scripts/ci/verify-metro-day-trips-production.mjs", "utf8");
  const proximity = readFileSync("src/data/metro-proximity.ts", "utf8");
  const registry = editorial.split("export const EL_PASO_SOURCE_BACKED_OUTINGS = [")[1]?.split("] as const;")[0] ?? "";
  const urls = [...registry.matchAll(/sourceUrl:\s*"(https:\/\/[^"]+)"/g)].map(match => match[1]);
  assert.equal(urls.length, 5, "require five source-backed visitor options independent of index-ready catalog");
  assert.equal(new Set(urls).size, 5, "do not inflate guides with duplicate official links");
  assert.ok(urls.includes("https://www.nps.gov/places/san-elizario-historic-district.htm"));
  assert.ok(urls.includes("https://www.nps.gov/gumo/planyourvisit/dunes.htm"));
  assert.ok(urls.includes("https://www.nps.gov/gumo/planyourvisit/pine_springs_area.htm"));
  assert.ok(urls.includes("https://www.elpasomissions.org/explore/museums/los-portales-museum/"));
  assert.ok(urls.includes("https://www.vanhorntexas.org/2159/Things-to-Do"));
  assert.ok(rich.includes('data-el-paso-source-backed-outings="operator-leads-not-indexable-destinations"'));
  assert.ok(rich.includes("EL_PASO_SOURCE_BACKED_OUTINGS.map("));
  assert.ok(rich.includes("not five new destination profiles"), "do not imply site guide or indexing quality that is not met");
  assert.ok(monitor.includes("elPasoOutingUrls.length !== 5"), "scheduled monitoring must fail closed if operator coverage disappears");
  assert.ok(monitor.includes('"www.elpasomissions.org"') && monitor.includes('"www.vanhorntexas.org"'));
  assert.ok(browser.includes("El Paso operator-backed visitor choices remain sourced and separate from indexable catalog"));
  for (const threshold of ["minResults: 10", "minTowns: 7", "minCounties: 4", "minCategories: 3", "minimumMiles: 18"]) {
    assert.ok(proximity.includes(threshold), "protected day-trip geographic diversity threshold missing: " + threshold);
  }
});
