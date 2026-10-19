import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { countyNames, countySlug } from "../metro-county-links.ts";
import { viatorMarketsForPlace } from "../viator-market-match.ts";
import { LEGACY_EDITORIAL_REDIRECTS, canonicalDestinationSlug } from "../../lib/legacy-editorial-redirects.ts";
import { isPrimaryTripPlannerDestination } from "../destination-availability.ts";
import type { Destination } from "../types.ts";

test("multi-county refuge descriptions cannot create a fictional county URL", () => {
  const counties = countyNames("Cameron, Hidalgo, Starr and Willacy counties");
  assert.deepEqual(counties, ["Cameron", "Hidalgo", "Starr", "Willacy"]);
  assert.deepEqual(counties.map(countySlug), ["cameron", "hidalgo", "starr", "willacy"]);
  assert.equal(countySlug("Cameron, Hidalgo, Starr and Willacy counties"), null);
  assert.equal(countySlug("fictional"), null);
  assert.equal(countySlug("DeWitt County"), "dewitt");
});
test("the city of Alamo matches the Valley, not San Antonio", () => {
  assert.deepEqual(viatorMarketsForPlace("Alamo").map((m) => m.slug), ["rio-grande-valley"]);
  assert.deepEqual(viatorMarketsForPlace("The Alamo").map((m) => m.slug), ["san-antonio"]);
});

test("McAllen day trips server shell links to both curated guides before lazy content", () => {
  const source = readFileSync("src/routes/explore.near.$metro.$collection.tsx", "utf8");
  const start = source.indexOf("data-mcallen-starter-guides");
  const end = source.indexOf("<Suspense fallback={null}>");
  assert.ok(start >= 0 && end > start, "the guide links must be in the lightweight route shell");
  assert.match(source.slice(start - 150, start + 850), /isMcAllenDayTrips[\s\S]*santa-ana-national-wildlife-refuge/);
  assert.match(source.slice(start, start + 850), /museum-of-south-texas-history-edinburg/);
  assert.match(source.slice(start, start + 850), /to="\/destination\/\$slug"/);
  assert.ok(!source.includes('slug: "museum-south-texas-history-edinburg"'), "avoid the competing museum slug");
});

test("Edinburg museum duplicates consolidate on the researched primary guide", () => {
  const alias = "museum-south-texas-history-edinburg";
  const primary = "museum-of-south-texas-history-edinburg";
  assert.equal(LEGACY_EDITORIAL_REDIRECTS["/destination/" + alias], "/destination/" + primary);
  assert.equal(canonicalDestinationSlug(alias), primary);
  assert.equal(canonicalDestinationSlug(primary), primary);
  assert.equal(isPrimaryTripPlannerDestination({ slug: alias } as Destination), false);
  assert.equal(isPrimaryTripPlannerDestination({ slug: primary } as Destination), true);
});

test("McAllen Santa Ana visitor notice is consistent with federal levee closure advisory", () => {
  const curated = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const refugee = readFileSync("src/data/national-wildlife-refuge-destinations.ts", "utf8");
  const curation = readFileSync("src/data/destination-curation-batch20.ts", "utf8");
  const section = curated.split('slug: "santa-ana-national-wildlife-refuge"')[1]?.split('slug: "estero-llano-grande-state-park"')[0] ?? "";
  const source = refugee.split('slug: "santa-ana-national-wildlife-refuge"')[1]?.split('slug: "texas-point-national-wildlife-refuge"')[0] ?? "";
  const overlay = curation.split('"santa-ana-national-wildlife-refuge":')[1]?.split('"balcones-canyonlands-national-wildlife-refuge"')[0] ?? "";
  for (const [name, block] of [["McAllen guide", section], ["refuge destination", source], ["visitor curation", overlay]] as const) {
    assert.match(block, /Levee Road/,`${name} missing FWS levee notice`);
    assert.match(block, /Bobcat Trail/,`${name} missing FWS bicycle detour`);
    assert.match(block, /October 18, 2026/,`${name} missing notice review date`);
    assert.match(block, /https:\/\/www\.fws\.gov\/refuge\/santa-ana\/visit-us/,`${name} missing official current access source`);
  }
});
