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

test("McAllen curated local and Brownsville operator-only stops have no invented destination guides", () => {
  const source = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const all = source.split("const MCALLEN_EDITORIAL_TRIPS = [")[1]?.split("] as const;")[0] ?? "";
  for (const [slug, name, url] of [
    ["quinta-mazatlan", "Quinta Mazatlán", "https://www.quintamazatlan.com/visit-explore/park-hours-admission"],
    ["sabal-palm-sanctuary", "Sabal Palm Sanctuary & Historic Rabb Plantation", "https://www.sabalpalmsanctuary.org/"],
  ]) {
    const block = all.split('slug: "' + slug + '"')[1]?.split("\n  },")[0] ?? "";
    assert.ok(block.includes("externalOnly: true"), slug + " must not link to nonexistent TexasDefined guide");
    assert.ok(block.includes(name), slug + " identity missing");
    assert.ok(block.includes(url), slug + " verified operator link missing");
    assert.match(block, /reviewed October 19, 2026/i);
  }
  assert.equal([...all.matchAll(/slug: "old-hidalgo-pumphouse-museum"/g)].length, 1);
  assert.ok(source.includes('!("externalOnly" in trip) && <Link to="/destination/$slug"'));
  assert.ok(source.includes('href={trip.official} target="_blank" rel="noopener noreferrer"'));
  assert.ok(source.includes("Quinta Mazatlán offers a close-to-home nature outing"));
});


test("McAllen lodging placement waits for lazy hydration and never interrupts curated cards", () => {
  const shell = readFileSync("src/routes/explore.near.$metro.$collection.tsx", "utf8");
  const rich = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const expedia = readFileSync("public/expedia-travel.js", "utf8");
  const affiliates = readFileSync("public/stay-affiliate-options.js", "utf8");
  const qa = readFileSync("scripts/ci/verify-mcallen-day-trips-visual.mjs", "utf8");
  assert.ok(shell.includes('isMcAllenDayTrips && <div data-stay-nearby-slot'), "the dedicated lodging slot must be McAllen-only");
  assert.ok(shell.indexOf('data-stay-nearby-slot') > shell.indexOf('<MetroProximityCollectionRich pageData={pageData}'), "lodging must follow the guide");
  assert.ok(rich.includes('tdMcAllenDayTripsHydrated = "1"'));
  assert.ok(rich.includes('texasdefined:mcallen-day-trips-hydrated'));
  assert.ok(expedia.includes('if (mcallenDayTripsHydrationPending()) return;'));
  assert.ok(expedia.includes('window.addEventListener("texasdefined:mcallen-day-trips-hydrated", scheduleSync)'));
  assert.ok(affiliates.includes('document.documentElement.dataset.tdMcAllenDayTripsHydrated !== "1"'));
  assert.ok(affiliates.includes('window.addEventListener("texasdefined:mcallen-day-trips-hydrated", scheduleSync)'));
  assert.ok(qa.includes('stayPanelInsideCuratedCard'));
  assert.ok(qa.includes('verify("no React hydration mismatch"'));
});

test("McAllen day-trip authority integrates all featured stops with sourced map and photography", () => {
  const src = readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
  const shell = readFileSync("src/routes/explore.near.$metro.$collection.tsx", "utf8");
  const a = src.split("const MCALLEN_FEATURED_POINTS = {")[1]?.split("} as const;")[0] ?? "";
  const b = src.split("const MCALLEN_EDITORIAL_TRIPS = [")[1]?.split("] as const;")[0] ?? "";
  const listed = [...b.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
  for (const slug of listed) assert.ok(a.includes('"' + slug + '"'), "map omits curated stop " + slug);
  assert.equal(listed.length, 10);
  assert.match(src, /function McAllenFeaturedMap/);
  assert.match(src, /openstreetmap\.org\/export\/embed\.html/);
  assert.match(src, /google\.com\/maps\/dir/);
  assert.match(src, /MCALLEN_OPEN_IMAGES/);
  assert.match(src, /William L\. Farr.*CC BY-SA 4\.0/);
  assert.match(src, /Alan Schmierer.*CC0/);
  assert.match(src, /isDestinationPhotoPlaceholder/);
  assert.match(shell, /10 curated choices/);
  assert.match(shell, /Additional researched places below/);
});
test("McAllen lodging provider choice stays within one post-guide module", () => {
  const choice = readFileSync("public/stay-affiliate-options.js", "utf8");
  const expedia = readFileSync("public/expedia-travel.js", "utf8");
  assert.match(choice, /surface\.dataset\.stayConsolidated = "true"/);
  assert.match(choice, /parent\.appendChild\(choice\)/);
  assert.match(choice, /Hotel and vacation-rental choices/);
  assert.match(expedia, /One stop for overnight stays/);
});
