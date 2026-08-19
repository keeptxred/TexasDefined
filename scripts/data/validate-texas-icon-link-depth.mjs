import fs from 'node:fs';

const source = fs.readFileSync('src/data/things-unique-to-texas-links.ts', 'utf8');
const reference = fs.readFileSync('src/data/things-unique-to-texas-reference.ts', 'utf8');
const route = fs.readFileSync('src/routes/things-unique-to-texas.tsx', 'utf8');
const hub = fs.readFileSync('src/routes/things-unique-to-texas.lazy.tsx', 'utf8');
const methodology = fs.readFileSync('src/routes/things-unique-to-texas.methodology.tsx', 'utf8');
const promotedArticleTargets = [
  ['src/data/fixtures/caddo-lake-cypress-morning.ts', 'slug: "caddo-lake-cypress-morning"', '/article/caddo-lake-cypress-morning'],
  ['src/data/fixtures/texas-wildlife-guide-stub.ts', 'slug: "texas-wildlife-guide"', '/article/texas-wildlife-guide'],
  ['src/data/fixtures/texas-trees-guide-stub.ts', 'slug: "texas-trees-guide"', '/article/texas-trees-guide'],
  ['src/data/fixtures/galveston-county-island-port-juneteenth.ts', 'slug: "galveston-county-island-port-juneteenth-texas"', '/article/galveston-county-island-port-juneteenth-texas'],
];
const promotedRouteTargets = [
  ['src/routes/texas-slang-explained.tsx', 'const canonicalPath = "/texas-slang-explained"', '/texas-slang-explained'],
  ['src/routes/texas-dance-halls-honky-tonks.tsx', 'const canonicalPath = "/texas-dance-halls-honky-tonks"', '/texas-dance-halls-honky-tonks'],
  ['src/routes/texas-breakfast-taco-guide.tsx', 'const canonicalPath = "/texas-breakfast-taco-guide"', '/texas-breakfast-taco-guide'],
  ['src/routes/texas-chili-con-carne-history.tsx', 'const canonicalPath = "/texas-chili-con-carne-history"', '/texas-chili-con-carne-history'],
];
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

if (destinationLinks.length < 41) failures.push(`Expected at least 41 exact destination mappings; found ${destinationLinks.length}.`);
if (deepDiveLinks.length < 43) failures.push(`Expected at least 43 purpose-built/editorial deep-dive mappings; found ${deepDiveLinks.length}.`);
if (destinationLinks.length + deepDiveLinks.length < 84) failures.push(`Expected at least 84 protected deeper-guide relationships; found ${destinationLinks.length + deepDiveLinks.length}.`);

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
  [32, '/texas-breakfast-taco-guide'],
  [36, '/texas-brand-origin-stories'],
  [37, '/texas-brand-origin-stories'],
  [38, '/texas-brand-origin-stories'],
  [42, '/texas-brand-origin-stories'],
  [44, '/texas-brand-origin-stories'],
  [45, '/texas-brand-origin-stories'],
  [60, '/article/caddo-lake-cypress-morning'],
  [166, '/texas-dance-halls-honky-tonks'],
  [167, '/texas-dance-halls-honky-tonks'],
  [173, '/texas-chili-con-carne-history'],
  [174, '/texas-dance-halls-honky-tonks'],
  [180, '/texas-dance-halls-honky-tonks'],
  [185, '/article/galveston-county-island-port-juneteenth-texas'],
  [190, '/texas-homecoming-mums'],
  [191, '/texas-dance-halls-honky-tonks'],
  [200, '/article/texas-wildlife-guide'],
  [201, '/article/texas-wildlife-guide'],
  [203, '/article/texas-wildlife-guide'],
  [204, '/article/texas-trees-guide'],
  [205, '/article/texas-trees-guide'],
  [206, '/article/texas-trees-guide'],
  [212, '/article/texas-wildlife-guide'],
  [213, '/article/texas-wildlife-guide'],
  [214, '/article/texas-wildlife-guide'],
  [215, '/article/texas-wildlife-guide'],
  [218, '/article/texas-trees-guide'],
  [220, '/article/texas-wildlife-guide'],
  [222, '/texas-slang-explained'],
  [223, '/texas-slang-explained'],
  [224, '/texas-slang-explained'],
  [231, '/texas-slang-explained'],
  [239, '/texas-slang-explained'],
]);
const actualDeepDiveMappings = new Map(deepDiveLinks.map((match) => [Number(match[1]), match[2]]));
for (const [id, href] of requiredDeepDiveMappings) {
  if (actualDeepDiveMappings.get(id) !== href) failures.push(`Icon ${id} must retain exact deeper guide ${href}.`);
}

for (const [file, slugToken, href] of [...promotedArticleTargets, ...promotedRouteTargets]) {
  if (!fs.existsSync(file)) {
    failures.push(`Promoted Texas icon target file is missing for ${href}: ${file}.`);
    continue;
  }
  const targetSource = fs.readFileSync(file, 'utf8');
  if (!targetSource.includes(slugToken)) failures.push(`Promoted Texas icon target ${href} no longer resolves from ${file}; missing ${slugToken}.`);
  if (!source.includes(`"${href}"`)) failures.push(`Promoted Texas icon target ${href} must remain referenced by the resolver registry.`);
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
for (const token of [
  'import { TEXAS_ICON_DEEPER_GUIDE_COUNT } from "@/data/things-unique-to-texas-reference";',
  'At the current source state, {TEXAS_ICON_DEEPER_GUIDE_COUNT} of the 250 records resolve to a deeper canonical TexasDefined guide.',
  '<dt className="font-semibold">Deeper guide links</dt>',
  '{TEXAS_ICON_DEEPER_GUIDE_COUNT} computed relationships',
]) {
  if (!methodology.includes(token)) failures.push(`Things That Define Texas methodology must expose computed deeper-guide coverage: ${token}`);
}

if (failures.length) {
  console.error('Texas icon link-depth validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas icon link-depth validation passed: ${destinationLinks.length} exact destination mappings plus ${deepDiveLinks.length} purpose-built/editorial deep dives (${destinationLinks.length + deepDiveLinks.length} protected relationships), with ${promotedArticleTargets.length + promotedRouteTargets.length} promoted authority targets verified on disk and hub/methodology coverage intact.`);
