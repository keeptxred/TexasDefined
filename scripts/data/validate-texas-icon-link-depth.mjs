import fs from 'node:fs';

const source = fs.readFileSync('src/data/things-unique-to-texas-links.ts', 'utf8');
const reference = fs.readFileSync('src/data/things-unique-to-texas-reference.ts', 'utf8');
const route = fs.readFileSync('src/routes/things-unique-to-texas.tsx', 'utf8');
const hub = fs.readFileSync('src/routes/things-unique-to-texas.lazy.tsx', 'utf8');
const failures = [];

const canonicalBlock = source.match(/const CANONICAL_ICON_LINKS:[\s\S]*?= \{([\s\S]*?)\n\};/);
const deepDiveBlock = source.match(/const DEEP_DIVE_ICON_LINKS:[\s\S]*?= \{([\s\S]*?)\n\};/);

if (!canonicalBlock) failures.push('Canonical Texas icon destination-link registry is missing.');
if (!deepDiveBlock) failures.push('Purpose-built Texas icon deep-dive registry is missing.');

const destinationLinks = canonicalBlock
  ? [...canonicalBlock[1].matchAll(/^\s{2}(\d+):\s*"(\/destination\/[^"]+)",/gm)]
  : [];
const deepDiveLinks = deepDiveBlock
  ? [...deepDiveBlock[1].matchAll(/^\s{2}(\d+):\s*"(\/[^"]+)",/gm)]
  : [];

if (destinationLinks.length < 41) {
  failures.push(`Expected at least 41 exact destination mappings; found ${destinationLinks.length}.`);
}
if (deepDiveLinks.length < 18) {
  failures.push(`Expected at least 18 purpose-built/editorial deep-dive mappings; found ${deepDiveLinks.length}.`);
}
if (destinationLinks.length + deepDiveLinks.length < 59) {
  failures.push(`Expected at least 59 protected deeper-guide relationships; found ${destinationLinks.length + deepDiveLinks.length}.`);
}

const allIds = [...destinationLinks, ...deepDiveLinks].map((match) => Number(match[1]));
if (new Set(allIds).size !== allIds.length) failures.push('Texas icon resolver IDs must be unique across destination and deep-dive registries.');

for (const [, id, href] of destinationLinks) {
  if (!href.startsWith('/destination/')) failures.push(`Icon ${id} destination mapping is not canonical: ${href}`);
}
for (const [, id, href] of deepDiveLinks) {
  if (href.startsWith('/destination/')) failures.push(`Icon ${id} belongs in the destination registry, not deep dives: ${href}`);
  if (!href.startsWith('/')) failures.push(`Icon ${id} deep-dive link must be root-relative: ${href}`);
}

const requiredDeepDiveMappings = new Map([
  [2, '/texas-chicken-fried-steak-guide'],
  [3, '/texas-chili-con-carne-history'],
  [4, '/texas-breakfast-taco-guide'],
  [7, '/dr-pepper-texas-history'],
  [8, '/texas-brand-origin-stories'],
  [9, '/article/kolache-or-klobasnek-texas-story'],
  [12, '/texas-brand-origin-stories'],
  [14, '/san-antonio-puffy-taco-history'],
  [18, '/barbacoa-big-red-san-antonio'],
  [30, '/texas-ranch-water-guide'],
  [36, '/texas-brand-origin-stories'],
  [37, '/texas-brand-origin-stories'],
  [38, '/texas-brand-origin-stories'],
  [42, '/texas-brand-origin-stories'],
  [44, '/texas-brand-origin-stories'],
  [45, '/texas-brand-origin-stories'],
  [180, '/texas-dance-halls-honky-tonks'],
  [190, '/texas-homecoming-mums'],
]);
const actualDeepDiveMappings = new Map(deepDiveLinks.map((match) => [Number(match[1]), match[2]]));
for (const [id, href] of requiredDeepDiveMappings) {
  if (actualDeepDiveMappings.get(id) !== href) failures.push(`Icon ${id} must retain exact deeper guide ${href}.`);
}

for (const token of [
  'DEEP_DIVE_ICON_LINKS[entry.id] ?? entry.href ?? CANONICAL_ICON_LINKS[entry.id]',
  'TEXAS_ICON_CANONICAL_LINK_COUNT',
]) {
  if (!source.includes(token)) failures.push(`Texas icon resolver contract missing: ${token}`);
}

for (const token of [
  'TEXAS_ICON_DEEPER_GUIDE_COUNT',
  'TEXAS_ICON_REFERENCE_ROWS.filter((row) => row.deeperGuide !== null).length',
]) {
  if (!reference.includes(token)) failures.push(`Texas icon reference-layer coverage contract missing: ${token}`);
}
if (!route.includes('deeperGuideCount: TEXAS_ICON_DEEPER_GUIDE_COUNT')) failures.push('Things That Define Texas loader must expose the computed deeper-guide count.');
if (!hub.includes('const { categories, itemCount, deeperGuideCount } = Route.useLoaderData();')) failures.push('Things That Define Texas hub must consume the computed deeper-guide count.');
if (!hub.includes('<Stat value={String(deeperGuideCount)} label="Deeper guide links" />')) failures.push('Things That Define Texas hub must display deeper-guide coverage as a headline statistic.');
if (hub.includes('label="Very big state"')) failures.push('Things That Define Texas hub must not replace its authority metric with the old novelty statistic.');

if (failures.length) {
  console.error('Texas icon link-depth validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas icon link-depth validation passed: ${destinationLinks.length} exact destination mappings plus ${deepDiveLinks.length} purpose-built/editorial deep dives (${destinationLinks.length + deepDiveLinks.length} protected relationships) are retained, and the hub exposes its computed deeper-guide coverage.`);
