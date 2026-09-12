import fs from 'node:fs';

const sitemapRoute = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const productionVerifier = fs.readFileSync('scripts/ci/verify-cavern-production-integrity.mjs', 'utf8');
const failures = [];

for (const marker of [
  'publicCavernDestinationFallbacks',
  'import("@/data/public-cavern-destinations")',
  'rawDestinations.push(...publicCavernDestinationFallbacks.filter',
  'const expandedSlugs = new Set(rawDestinations.map((destination) => destination.slug));',
]) {
  if (!sitemapRoute.includes(marker)) failures.push(`Explore sitemap is missing cavern fallback contract: ${marker}`);
}

for (const slug of [
  'natural-bridge-caverns',
  'inner-space-cavern',
  'longhorn-cavern-state-park',
  'caverns-of-sonora',
  'cascade-caverns',
  'cave-without-a-name',
  'wonder-world-cave',
  'kickapoo-cavern-state-park',
  'gorman-cave',
  'devils-sinkhole-state-natural-area',
  'westcave-preserve',
]) {
  if (!productionVerifier.includes(`'${slug}'`)) failures.push(`Production verifier is missing cavern slug: ${slug}`);
}

for (const marker of [
  "legacyDevilsSinkholeSlug = 'devil-s-sinkhole-state-natural-area'",
  "['caverns-of-sonora', 'Caverns of Sonora']",
  "['cascade-caverns', 'Cascade Caverns']",
  "['cave-without-a-name', 'Cave Without a Name']",
  `[\'devils-sinkhole-state-natural-area\', "Devil's Sinkhole State Natural Area"]`,
]) {
  if (!productionVerifier.includes(marker.replaceAll('\\\'', "'"))) failures.push(`Production verifier is missing restored cavern contract: ${marker}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Cavern production integrity contract passed.');
