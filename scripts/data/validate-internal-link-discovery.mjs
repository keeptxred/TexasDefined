import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const registry = read('src/lib/public-routes.ts');
const exploreDiscovery = read('src/components/editorial/ExploreDiscovery.tsx');
const texasLifeDiscovery = read('src/components/editorial/TexasLifeDiscovery.tsx');
const categoryPage = read('src/components/editorial/CategoryPage.tsx');
const exploreSitemap = read('src/routes/sitemap-explore[.]xml.ts');

for (const path of ['/property', '/explore/trip-planner']) {
  const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];
  if (!indexableSection.includes(`"${path}"`)) failures.push(`${path} must remain an indexable static route.`);
}

for (const target of ['/explore/trip-planner', '/browse/cities', '/events']) {
  if (!exploreDiscovery.includes(`to="${target}"`)) failures.push(`Explore discovery must link to ${target}.`);
}

for (const target of ['/property', '/decide/financial-tools', '/browse/cities', '/moving-to-texas', '/real-estate']) {
  if (!texasLifeDiscovery.includes(`to: "${target}"`)) failures.push(`Texas Life discovery must link to ${target}.`);
}

if (!categoryPage.includes('TexasLifeDiscovery')) failures.push('Texas Life category pages must render TexasLifeDiscovery.');
if (!categoryPage.includes('belongsToTexasLife && <TexasLifeDiscovery')) failures.push('TexasLifeDiscovery must be limited to Texas Life category surfaces.');
if (!exploreSitemap.includes('"/explore/trip-planner"')) failures.push('Explore sitemap must publish the Trip Planner.');

if (failures.length) {
  console.error('Internal-link discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Internal-link discovery pathways, hub promotion and Explore sitemap coverage are protected.');
