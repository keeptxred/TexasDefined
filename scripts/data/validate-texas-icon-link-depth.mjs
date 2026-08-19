import fs from 'node:fs';

const source = fs.readFileSync('src/data/things-unique-to-texas-links.ts', 'utf8');
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
if (deepDiveLinks.length < 6) {
  failures.push(`Expected at least 6 purpose-built evergreen deep-dive mappings; found ${deepDiveLinks.length}.`);
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

for (const token of [
  'DEEP_DIVE_ICON_LINKS[entry.id] ?? entry.href ?? CANONICAL_ICON_LINKS[entry.id]',
  'TEXAS_ICON_CANONICAL_LINK_COUNT',
]) {
  if (!source.includes(token)) failures.push(`Texas icon resolver contract missing: ${token}`);
}

if (failures.length) {
  console.error('Texas icon link-depth validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas icon link-depth validation passed: ${destinationLinks.length} exact destination mappings plus ${deepDiveLinks.length} purpose-built deep dives are protected.`);
