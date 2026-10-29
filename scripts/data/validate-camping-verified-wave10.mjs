import fs from "node:fs";
import assert from "node:assert/strict";

const read = path => fs.readFileSync(path, "utf8");
const basedir = "src/data/camping/";
const previous = ["discovery.ts", ...Array.from({ length: 8 }, (_, i) => `profiles-wave${i + 2}.ts`)];
const sources = previous.map(file => read(basedir + file));
const wave10 = read(basedir + "profiles-wave10.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const verifier = read("scripts/ci/verify-camping-authority-production.mjs");

const slugs = source => [...source.matchAll(/destinationSlug:\s*"([^"]+)"/g)].map(m => m[1]);
const anchors = source => [...source.matchAll(/destinationSlug:\s*"([^"]+)"(?:,\s*profileSlug:\s*"([^"]+)")?/g)].map(m => m[2] || m[1]);
const old = sources.flatMap(anchors);
const additions = anchors(wave10);
const expected = [
  "possum-kingdom-state-park", "atlanta-state-park", "daingerfield-state-park",
  "fort-richardson-state-park", "devils-river-state-natural-area",
  "government-canyon-state-natural-area",
];
assert.equal(old.length, 66, "preserve original 57 plus first nine TPWD profiles");
assert.equal(new Set(old).size, 66, "first 66 campground anchors must remain unique");
assert.deepEqual(slugs(wave10), expected, "second wave must contain exactly six independently researched parks");
assert.equal(additions.length, 6, "six unique campsite identities required");
assert.equal(new Set([...old, ...additions]).size, 72, "all 72 campground anchors must be unique");
assert.ok(!slugs(wave10).includes("stephen-f-austin-state-park"), "Stephen F. Austin already exists in wave9");
assert.ok(wave10.includes('VERIFIED_AT = "2026-10-29"'), "sources must retain actual research date");

for (const needle of [
  'import("@/data/camping/profiles-wave10")',
  "...CAMPING_DISCOVERY_PROFILES_WAVE10",
  "hasCampingDestinationGuide(profile.destinationSlug)",
  "${pageUrl}#${profileAnchor(profile)}",
]) assert.ok(route.includes(needle), "SSR/schema loader missing " + needle);

const section = (slug, next) => {
  const start = wave10.indexOf('destinationSlug: "' + slug + '"');
  assert.ok(start >= 0);
  const end = next ? wave10.indexOf('destinationSlug: "' + next + '"', start + 1)
    : wave10.indexOf("export const CAMPING_DISCOVERY_PROFILES_WAVE10", start);
  assert.ok(end > start);
  return wave10.slice(start, end);
};
const possum = section(expected[0], expected[1]);
assert.ok(possum.includes("winter cabin renovations") && possum.includes("/possum-kingdom/alert"),
  "winter amenity and hunting closure warnings must link official alert");
const atlanta = section(expected[1], expected[2]);
assert.ok(atlanta.includes("wood and charcoal fires") && atlanta.includes("/atlanta/alert"),
  "current fire restriction and hunting closures must be explicit");
const devils = section(expected[4], expected[5]);
assert.ok(devils.includes("two Del Norte hike-in") && devils.includes("no entry after 4 p.m."),
  "Devils River unit counts and hard arrival cutoff must match TPWD");
assert.ok(devils.includes("access-permit-overview"), "river paddler camps must remain permit-distinguished");
const gov = section(expected[5], null);
assert.ok(gov.includes("Sites 1, 14, 16 and 18") && gov.includes("accessibility-information"),
  "accessible campground claims require site-specific official evidence");
assert.ok(!/nightly|\$\d+/i.test(wave10), "do not freeze variable campsite fees");
assert.ok(wave10.includes("CAMPING_PROFILES_WAVE10.map"), "lean projection missing");
assert.ok(verifier.includes("count < 72"), "public acceptance must require all 72 profiles");
console.log("Camping Wave10 verified: 66 existing plus six unique, current TPWD alerts, unit-specific visitor guidance and 72-profile release guard.");
