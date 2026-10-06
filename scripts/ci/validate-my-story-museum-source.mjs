import fs from 'node:fs';

const source = fs.readFileSync('src/data/museum-expansion-statewide-wave85.ts', 'utf8');
const relationships = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const failures = [];

for (const marker of [
  'slug: "my-story-museum-crystal-city"',
  'src: "/images/museums/my-story-museum-crystal-city.webp"',
  'credit: "AI-generated image · TexasDefined"',
  'officialUrl: "https://www.crystalcitypilgrimage.org/my-story-museum"',
  'address: "224 E Zavala St, Crystal City, TX 78839"',
  'countySlugs: ["zavala"]',
  'authorityGuide:',
]) {
  if (!source.includes(marker)) failures.push(`My Story Museum source is missing: ${marker}`);
}

if (source.includes('hero: museumPlaceholder("My Story Museum")')) {
  failures.push('My Story Museum regressed to the generic destination placeholder hero.');
}
if (!relationships.includes('"my-story-museum-crystal-city"')) {
  failures.push('My Story Museum is missing from the destination authority-guide rendering allowlist.');
}
for (const marker of ['preservedExploreDestinations', 'auditDestination(destination).readyForIndexing', 'entry(`/destination/${item.slug}`']) {
  if (!sitemap.includes(marker)) failures.push(`Explore sitemap contract is missing: ${marker}`);
}

if (failures.length) {
  console.error(`My Story Museum source regression check failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('My Story Museum source regression check passed.');
