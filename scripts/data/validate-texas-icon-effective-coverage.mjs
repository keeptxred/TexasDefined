import fs from 'node:fs';

const catalog = fs.readFileSync('src/data/things-unique-to-texas.ts', 'utf8');
const resolver = fs.readFileSync('src/data/things-unique-to-texas-links.ts', 'utf8');
const reference = fs.readFileSync('src/data/things-unique-to-texas-reference.ts', 'utf8');
const smoke = fs.readFileSync('.github/workflows/things-unique-to-texas-production-smoke.yml', 'utf8');
const failures = [];

const canonicalBlock = resolver.match(/const CANONICAL_ICON_LINKS:[\s\S]*?= \{([\s\S]*?)\n\};/);
const deepDiveBlock = resolver.match(/const DEEP_DIVE_ICON_LINKS:[\s\S]*?= \{([\s\S]*?)\n\};/);
const destinationIds = canonicalBlock ? [...canonicalBlock[1].matchAll(/^\s{2}(\d+):\s*"\/destination\/[^"]+",/gm)].map((match) => Number(match[1])) : [];
const deepDiveIds = deepDiveBlock ? [...deepDiveBlock[1].matchAll(/^\s{2}(\d+):\s*"\/(?!destination\/)[^"]+",/gm)].map((match) => Number(match[1])) : [];

// Source-owned links are the fourth argument to item(...). They are deliberately
// separate from the resolver registries because they belong to the magazine record itself.
const directItemLinks = [...catalog.matchAll(/^\s*item\((\d+),.*?,\s*"(\/[^"\n]+)"\),?\s*$/gm)]
  .map((match) => ({ id: Number(match[1]), href: match[2] }));

const expectedDirectLinks = new Map([
  [1, '/article/texas-barbecue-styles-explained'],
  [3, '/texas-symbols'],
  [6, '/texas-symbols'],
  [25, '/article/texas-barbecue-styles-explained'],
  [102, '/explore/painted-churches'],
  [172, '/sports-venues/high-school-football'],
  [196, '/article/texas-wildlife-guide'],
  [197, '/article/texas-wildflowers-guide'],
  [199, '/texas-symbols'],
  [202, '/texas-symbols'],
  [207, '/texas-symbols'],
  [208, '/texas-symbols'],
  [210, '/texas-symbols'],
  [217, '/texas-symbols'],
  [247, '/article/texas-farm-to-market-roads-explained'],
]);
const actualDirectLinks = new Map(directItemLinks.map((row) => [row.id, row.href]));

if (destinationIds.length < 42) failures.push(`Expected at least 42 destination registry IDs; found ${destinationIds.length}.`);
if (deepDiveIds.length < 49) failures.push(`Expected at least 49 editorial/deep-dive registry IDs; found ${deepDiveIds.length}.`);
if (directItemLinks.length < 15) failures.push(`Expected at least 15 source-owned direct item links; found ${directItemLinks.length}.`);
for (const [id, href] of expectedDirectLinks) {
  if (actualDirectLinks.get(id) !== href) failures.push(`Magazine item ${id} must retain source-owned direct link ${href}.`);
}
for (const { id, href } of directItemLinks) {
  if (!href.startsWith('/') || href.startsWith('//')) failures.push(`Magazine item ${id} direct link must remain root-relative: ${href}.`);
}

const registryIds = new Set([...destinationIds, ...deepDiveIds]);
const effectiveIds = new Set([...registryIds, ...directItemLinks.map((row) => row.id)]);
if (registryIds.size < 91) failures.push(`Expected at least 91 unique registry-backed IDs; found ${registryIds.size}.`);
if (effectiveIds.size < 105) failures.push(`Expected at least 105 effectively linked magazine records; found ${effectiveIds.size}.`);

for (const token of [
  'const deeperGuidePath = texasIconCanonicalHref(entry);',
  'TEXAS_ICON_REFERENCE_ROWS.filter((row) => row.deeperGuide !== null).length',
]) {
  if (!reference.includes(token)) failures.push(`Reference-row effective-coverage contract missing: ${token}`);
}
for (const token of [
  'test "$json_deep_links" -ge 105',
  'test "$csv_deep_links" -ge 105',
  'at least 105 effective deeper-guide records',
]) {
  if (!smoke.includes(token)) failures.push(`Production smoke effective-coverage contract missing: ${token}`);
}

if (failures.length) {
  console.error('Texas icon effective-coverage validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas icon effective-coverage validation passed: ${registryIds.size} registry-backed IDs plus ${directItemLinks.length} source-owned links resolve to ${effectiveIds.size} distinct deeper-linked magazine records.`);
