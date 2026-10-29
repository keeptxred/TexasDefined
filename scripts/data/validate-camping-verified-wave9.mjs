import fs from "node:fs";
import assert from "node:assert/strict";

const read = (file) => fs.readFileSync(file, "utf8");
const path = "src/data/camping/";
const prior = ["discovery.ts", ...Array.from({ length: 7 }, (_, i) => `profiles-wave${i + 2}.ts`)];
const sources = prior.map((file) => ({ file, text: read(path + file) }));
const ninth = read(path + "profiles-wave9.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const verifier = read("scripts/ci/verify-camping-authority-production.mjs");

const namedSlugs = (text) => [...text.matchAll(/destinationSlug:\s*"([^"]+)"/g)].map((m) => m[1]);
const namedAnchors = (text) => [...text.matchAll(/destinationSlug:\s*"([^"]+)"(?:,\s*profileSlug:\s*"([^"]+)")?/g)].map((m) => m[2] || m[1]);
const priorSlugs = sources.flatMap(({ text }) => namedSlugs(text));
const priorAnchors = sources.flatMap(({ text }) => namedAnchors(text));
const newSlugs = namedSlugs(ninth);
const uniqueNew = [
  "abilene-state-park", "blanco-state-park", "bonham-state-park",
  "buescher-state-park", "cleburne-state-park", "cooper-lake-state-park",
  "copper-breaks-state-park", "stephen-f-austin-state-park",
  "lockhart-state-park",
];

assert.equal(priorSlugs.length, 57, "preserve original verified 57-profile inventory");
assert.equal(new Set(priorAnchors).size, 57, "baseline campground anchors must remain unique, including unit-specific profileSlugs");
assert.deepEqual(newSlugs, uniqueNew, "wave 9 must be exactly nine reviewed, nonduplicated parks");
assert.equal(new Set([...priorAnchors, ...newSlugs]).size, 66, "66 unique campground anchors required");
assert.ok(priorSlugs.includes("lake-tawakoni-state-park"), "Lake Tawakoni existing verified profile must be preserved");
assert.ok(!newSlugs.includes("lake-tawakoni-state-park"), "do not duplicate Lake Tawakoni");

for (const needle of [
  'import("@/data/camping/profiles-wave9")',
  "...CAMPING_DISCOVERY_PROFILES_WAVE9",
  "hasCampingDestinationGuide(profile.destinationSlug)",
  "${pageUrl}#${profileAnchor(profile)}",
]) assert.ok(route.includes(needle), "camping route missing " + needle);

assert.ok(ninth.includes('const VERIFIED_AT = "2026-10-29"'), "source review must retain the real verification date");
assert.ok(ninth.includes('sources: profile.sources.map(({ label, url }) => ({ label, url }))'), "client projection must stay lean");
assert.ok(ninth.includes("whyCampHere: profile.campingNotes[0]"), "camping decision reason must reach UI");

const between = (slug, next) => {
  const start = ninth.indexOf('destinationSlug: "' + slug + '"');
  assert.ok(start >= 0);
  const end = next ? ninth.indexOf('destinationSlug: "' + next + '"', start + 1) : ninth.indexOf("export const CAMPING_DISCOVERY_PROFILES_WAVE9", start);
  assert.ok(end > start);
  return ninth.slice(start, end);
};
const abilene = between("abilene-state-park", "blanco-state-park");
assert.ok(abilene.includes("Lake Abilene") && abilene.includes("low water"), "disclose verified lake closure");
assert.ok(abilene.includes("https://tpwd.texas.gov/state-parks/abilene/alert"), "park alert must be attributed");
for (const forbidden of ['"swimming"', '"lake-access"', '"fishing"']) assert.ok(!abilene.includes(forbidden), "closed lake amenity incorrectly advertised: " + forbidden);

const cooper = between("cooper-lake-state-park", "copper-breaks-state-park");
assert.ok(cooper.includes("nonprofit youth organizations"), "Doctors Creek group camp restriction must be explicit");
assert.ok(cooper.includes("https://tpwd.texas.gov/state-parks/cooper-lake/alert"), "South Sulphur fire notice must be sourced");
assert.ok(ninth.includes('CAMPING_DISCOVERY_PROFILES_WAVE9.map'), "lean client projection missing");
assert.ok(!/nightly|\$\d+/i.test(ninth), "live campground prices must not be frozen into evergreen profiles");
assert.ok(!route.includes("destinationsQuery({ limit: 5000 })"), "do not restore heavyweight statewide destination resolver");
assert.ok(verifier.includes("count < 66"), "production acceptance must reject a stale 57-profile guide");
console.log("Camping Wave 9 recovery contract passed: 57 preserved + 9 distinct profiles, current operator sources, safety exclusions and 66-profile SSR acceptance.");
