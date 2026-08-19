import fs from 'node:fs';

const lazy = fs.readFileSync('src/data/fixtures/lazy-standalone-evergreen.ts', 'utf8');
const historicSites = fs.readFileSync('src/data/historic-sites.ts', 'utf8');
const reciprocal = fs.readFileSync('src/data/historic-site-evergreen-links.ts', 'utf8');
const runtime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const failures = [];

const guides = [
  {
    slug: 'texas-revolution-historic-sites-road-trip',
    path: 'src/data/fixtures/texas-revolution-historic-sites-road-trip.ts',
    exportName: 'texasRevolutionHistoricSitesRoadTripArticle',
    destinations: ['san-felipe-de-austin', 'washington-on-the-brazos', 'fannin-battleground', 'presidio-la-bahia', 'san-jacinto-battleground'],
  },
  {
    slug: 'texas-frontier-forts-road-trip',
    path: 'src/data/fixtures/texas-frontier-forts-road-trip.ts',
    exportName: 'texasFrontierFortsRoadTripArticle',
    destinations: ['fort-martin-scott', 'fort-griffin', 'fort-mckavett', 'fort-lancaster'],
  },
  {
    slug: 'presidential-texas-historic-homes',
    path: 'src/data/fixtures/presidential-texas-historic-homes.ts',
    exportName: 'presidentialTexasHistoricHomesArticle',
    destinations: ['eisenhower-birthplace', 'bush-family-home', 'sam-rayburn-house', 'casa-navarro'],
  },
  {
    slug: 'brazoria-plantations-slavery-emancipation-history',
    path: 'src/data/fixtures/brazoria-plantations-slavery-emancipation-history.ts',
    exportName: 'brazoriaPlantationsSlaveryEmancipationHistoryArticle',
    destinations: ['levi-jordan-plantation', 'varner-hogg-plantation', 'first-capitol-of-texas', 'stephen-f-austin-memorial'],
  },
];

const seedBlock = historicSites.match(/export const historicSiteSeeds:[\s\S]*?= \[([\s\S]*?)\n\];/);
const seedSlugs = seedBlock ? [...seedBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]) : [];
if (seedSlugs.length !== 43) failures.push(`Expected 43 historic-site seeds while validating evergreen guides; found ${seedSlugs.length}.`);

for (const guide of guides) {
  if (!fs.existsSync(guide.path)) { failures.push(`Historic evergreen guide file is missing: ${guide.path}`); continue; }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Historic evergreen guide slug mismatch: ${guide.slug}.`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Historic evergreen guide export missing: ${guide.exportName}.`);
  if (!source.includes('category: "texas-history"')) failures.push(`Historic evergreen guide is not in texas-history: ${guide.slug}.`);
  if (!source.includes('sourceName: "Texas Historical Commission"')) failures.push(`Historic evergreen guide lacks THC source identity: ${guide.slug}.`);
  if (!source.includes('sourceUrl: "https://thc.texas.gov/historic-sites"')) failures.push(`Historic evergreen guide lacks canonical THC historic-sites source: ${guide.slug}.`);
  if (!source.includes('relatedDestinations: [')) failures.push(`Historic evergreen guide lacks related destination discovery: ${guide.slug}.`);

  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 14) failures.push(`Historic evergreen guide is too thin (${paragraphCount} paragraphs): ${guide.slug}.`);
  if (headingCount < 6) failures.push(`Historic evergreen guide lacks section depth (${headingCount} headings): ${guide.slug}.`);

  for (const destination of guide.destinations) {
    if (!seedSlugs.includes(destination)) failures.push(`Historic evergreen guide validator references non-seed destination ${destination} in ${guide.slug}.`);
    if (!source.includes(destination)) failures.push(`Historic evergreen guide does not link required destination ${destination}: ${guide.slug}.`);
  }

  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Historic evergreen stub is not registered: ${guide.slug}.`);
  if (!lazy.includes(`import("./${guide.path.split('/').pop().replace('.ts', '')}")`)) failures.push(`Historic evergreen full article is not lazy-loaded: ${guide.slug}.`);
  if (!lazy.includes(guide.exportName)) failures.push(`Historic evergreen lazy loader export mismatch: ${guide.slug}.`);

  const href = `/article/${guide.slug}`;
  if (!reciprocal.includes(`href: "${href}"`)) failures.push(`Historic destination reciprocal route guide link is missing: ${href}.`);
}

const reciprocalSlugSets = [...reciprocal.matchAll(/slugs:\s*new Set\(\[([\s\S]*?)\]\)/g)]
  .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]));
for (const slug of reciprocalSlugSets) if (!seedSlugs.includes(slug)) failures.push(`Historic reciprocal guide link references non-seed destination: ${slug}.`);

for (const marker of [
  'import { enrichHistoricSiteEvergreenLinks } from "./historic-site-evergreen-links";',
  'enrichHistoricSiteEvergreenLinks(',
  '.map(enrichHistoricSiteEvergreenLinks)',
]) if (!runtime.includes(marker)) failures.push(`Historic destination runtime is missing reciprocal evergreen enrichment: ${marker}`);

if (failures.length) {
  console.error('Historic-site evergreen validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Historic-site evergreen validation passed: ${guides.length} lazy-loaded Texas-history guides retain substantive depth, THC sourcing, verified destination links and reciprocal route-guide discovery from the statewide historic-site catalog.`);
