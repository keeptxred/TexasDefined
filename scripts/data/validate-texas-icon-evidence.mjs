import fs from "node:fs";

/**
 * Five Things That Define Texas chapter quality and editorial-placement gate.
 * Verifies source-linked, visit-useful evidence without enforcing word-count padding.
 * Corrections should update the evidence, not weaken these assertions.
 */
const read = (path) => fs.readFileSync(path, "utf8");
const catalog = read("src/data/things-unique-to-texas.ts");
const file = read("src/data/texas-icon-field-notes.ts");
const renderer = read("src/routes/things-unique-to-texas_.$category.lazy.tsx");
const metadata = read("src/routes/things-unique-to-texas_.$category.tsx");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const prefix = "export const TEXAS_ICON_FIELD_NOTES: Readonly<Record<number, TexasIconFieldNote>> = ";
const suffix = ";\nexport const VERIFIED_TEXAS_ICON_FIELD_IDS";
const start = file.indexOf(prefix);
const end = file.indexOf(suffix, start);
check(start !== -1 && end !== -1, "Source-linked field notes must have an explicit serialized inventory.");
const notes = start !== -1 && end !== -1 ? JSON.parse(file.slice(start + prefix.length, end)) : {};

const ids = [...catalog.matchAll(/\bitem\((\d+),/g)].map((m) => +m[1]);
check(ids.length === 250 && new Set(ids).size === 250, "Preserve the full set of 250 stable source reference IDs.");

const groups = ["food-drink","texas-brands","natural-wonders","landmarks","roadside-small-towns","culture-music","wildlife-landscape","slang-folklore"];
const owner = new Map();
for (const slug of groups) {
  const a = catalog.indexOf(`    slug: "${slug}"`);
  const b = catalog.indexOf("  {\n    slug:", a + 8);
  const segment = catalog.slice(a, b < 0 ? undefined : b);
  for (const match of segment.matchAll(/\bitem\((\d+),/g)) {
    const id = +match[1];
    check(!owner.has(id), `Reference ID ${id} appears in multiple chapters.`);
    owner.set(id, slug);
  }
}
check(owner.size === 250, "The public chapter archive must retain all stable IDs.");

const targets = ["landmarks","roadside-small-towns","culture-music","wildlife-landscape","slang-folklore"];
for (const slug of targets) {
  const researched = Object.keys(notes).filter((id) => owner.get(+id) === slug);
  check(researched.length >= 5, `Expected five or more direct-source field records for ${slug}, found ${researched.length}.`);
}
for (const [idText, item] of Object.entries(notes)) {
  const id = +idText;
  check(owner.has(id), `Field note refers to absent source ID ${id}.`);
  check(typeof item.topic === "string" && item.topic.length >= 8, `Field note ${id} lacks a meaningful topic.`);
  check(typeof item.fact === "string" && item.fact.length >= 100, `Field note ${id} lacks an evidence-based distinction.`);
  check(typeof item.usefulFor === "string" && item.usefulFor.length >= 70, `Field note ${id} lacks a practical decision or clear editorial use.`);
  check(Array.isArray(item.sources) && item.sources.length >= 1, `Field note ${id} has no traceable sources.`);
  const urls = (item.sources ?? []).map((x) => x.url);
  check(urls.length === new Set(urls).size, `Field note ${id} repeats a citation.`);
  for (const source of item.sources ?? []) {
    check(typeof source.label === "string" && source.label.length >= 10, `Field note ${id} has an unlabeled citation.`);
    check(typeof source.url === "string" && (source.url.startsWith("https://") || /^\/[a-z]/.test(source.url)), `Field note ${id} has an unsupported or unsafe source link.`);
  }
}
const movedTo = new Map([
  [140, "natural-wonders"],[161, "food-drink"],[162, "food-drink"],[165, "natural-wonders"],
  [202, "culture-music"],[211, "culture-music"],[228, "culture-music"],[229, "culture-music"],
  [230, "culture-music"],[241, "culture-music"],[242, "landmarks"],[243, "culture-music"],
  [245, "culture-music"],[246, "culture-music"],[247, "roadside-small-towns"],[248, "culture-music"],
]);
for (const [id, slug] of movedTo) {
  check(owner.get(id) === slug, `Misclassified reference ${id}: expected ${slug}, got ${owner.get(id)}.`);
}

for (const marker of [
  "TEXAS_ICON_FIELD_NOTES[entry.id]",
  "sourceBackedEntries.map",
  "fieldNote.sources.map",
  'href={source.url}',
  "fieldNote.usefulFor",
  "texas-icon-",
  "Entry-specific research you can use",
  "Read the related TexasDefined guide",
]) check(renderer.includes(marker), `Category rendering is missing source/visitor usability feature: ${marker}`);
check(!renderer.includes('This analysis compares historical and institutional sources. It does not represent first-hand'), "Remove repeated generic disclaimer in favor of record-level sourcing.");
check(metadata.includes('dateModified: "2026-11-16"'), "Update structured modification date when content materially changes.");
for (const [id, needle] of [
  [88, "Caddo Nation"], [93, "Mission Control"], [123, "Reconstruction"],
  [130, "Elmgreen"], [146, "never cross flooded"], [185, "General Granger"],
  [201, "540 cranes"], [212, "Laguna Atascosa"], [219, "spring flow"], [238, "1853 blackface"],
]) check((notes[id]?.fact ?? "").toLowerCase().includes(needle.toLowerCase()) || (notes[id]?.usefulFor ?? "").toLowerCase().includes(needle.toLowerCase()), `Core verified distinction missing for entry ${id}: ${needle}`);

if (failures.length) {
  for (const failure of failures) console.error("FAIL", failure);
  process.exit(1);
}
console.log(`Texas icon evidence validated: ${owner.size} stable source IDs, ${Object.keys(notes).length} cited entry records across five chapters, ${movedTo.size} corrected placements, current schema provenance and accessible source-link rendering.`);
