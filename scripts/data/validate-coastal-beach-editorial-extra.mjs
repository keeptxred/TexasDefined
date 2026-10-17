import fs from "node:fs";
import assert from "node:assert/strict";
const read = (p) => fs.readFileSync(p, "utf8");
const source = read("src/data/coastal-beach-editorial-extra.ts");
const original = read("src/data/coastal-beach-editorial.ts");
const component = read("src/components/content/CoastalBeachFieldGuide.tsx");
const coastalCatalog = read("src/data/coastal-places.ts");
const data = source.match(/= (\{[\s\S]*\});\s*$/);
assert.ok(data, "Six additional coast pages need fully represented source records");
const records = JSON.parse(data[1]);
const expected = [
  "port-aransas-beach", "ib-magee-beach-park", "boca-chica-beach",
  "lighthouse-beach-port-lavaca", "mustang-island-state-park",
  "matagorda-bay-nature-park"
];
assert.deepEqual(Object.keys(records), expected, "Preserve all six operator-sourced coastal beach guides");
const known = new Set([...coastalCatalog.matchAll(/^\s+slug: "([^"]+)",/gm)].map((m) => m[1]));
for (const slug of expected) {
  assert.ok(known.has(slug), "No matching canonical coastal place: " + slug);
  const item = records[slug];
  for (const field of ["headline", "arrival", "rules", "visitorDecision"]) {
    assert.ok(typeof item[field] === "string" && item[field].length >= 55, slug + ": missing substantive " + field);
  }
  for (const field of ["sourceUrl", "extraUrl"]) {
    assert.match(item[field], /^https:\/\/[a-z0-9.-]+\//i, slug + ": invalid official source " + field);
  }
}
assert.ok(original.includes("export const COASTAL_BEACH_EDITORIAL"), "Existing researched beaches must remain in use");
assert.ok(component.includes('import { COASTAL_BEACH_EDITORIAL } from "@/data/coastal-beach-editorial";'), "The existing nine beach records must be imported");
assert.ok(component.includes('import { COASTAL_BEACH_EDITORIAL_EXTRA } from "@/data/coastal-beach-editorial-extra";'), "The six new beach records must be imported");
assert.ok(component.includes("COASTAL_BEACH_EDITORIAL[rawSlug] ?? COASTAL_BEACH_EDITORIAL_EXTRA[rawSlug]"), "Each destination must select researched operator detail");
assert.ok(component.includes("editorial.sourceUrl") && component.includes("editorial.extraUrl"), "Official visitor and rule sources must render");
console.log("Coastal beach editorial contract passed: nine existing plus six new individually researched operator guides.");
