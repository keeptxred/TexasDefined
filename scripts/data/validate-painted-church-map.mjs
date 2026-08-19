import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const points = read('src/data/painted-church-map-points.ts');
const mapRoute = read('src/routes/explore.painted-churches.map.tsx');
const expanded = read('src/data/painted-churches-expanded.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const llms = read('src/routes/llms[.]txt.ts');
const manifest = JSON.parse(read('public/citation-magnets.json'));

const pointCount = (points.match(/slug: "/g) ?? []).length;
if (pointCount !== 24) failures.push(`Interactive Painted Churches map must retain 24 sourced points; found ${pointCount}.`);
for (const slug of ['corpus-christi-sacred-heart-catholic-church','san-antonio-st-joseph-catholic-church','serbin-st-paul-lutheran-church','praha-st-marys-assumption']) {
  if (!points.includes(`slug: "${slug}"`)) failures.push(`Map coordinate registry missing ${slug}.`);
}
for (const field of ['precision:', 'sourceUrl:', 'sourceLabel:', 'exact-property', 'near-property', 'community']) {
  if (!points.includes(field)) failures.push(`Map coordinate registry must preserve ${field}`);
}
if (!mapRoute.includes('useState') || !mapRoute.includes('aria-pressed') || !mapRoute.includes('setSelectedSlug')) failures.push('Map must remain interactive with accessible filters and pin selection.');
if (!mapRoute.includes('GeoCoordinates') || !mapRoute.includes('paintedChurchMapPoints')) failures.push('Map must publish sourced GeoCoordinates data.');
if (!mapRoute.includes('Coordinate methodology') || !mapRoute.includes('precisionLabel')) failures.push('Map must visibly explain coordinate precision.');
if (!expanded.includes('corpus-christi-sacred-heart-catholic-church') || !expanded.includes('san-antonio-st-joseph-catholic-church')) failures.push('Canonical collection must retain the two latest verified church promotions.');
for (const path of ['/explore/painted-churches/media','/explore/painted-churches/cite']) {
  if (!publicRoutes.includes(JSON.stringify(path))) failures.push(`Public route registry missing ${path}.`);
}
if (!llms.includes('currently contains 24 verified church profiles')) failures.push('llms.txt must state the current 24-church verified collection.');
if (!llms.includes('/explore/painted-churches/knowledge-graph') || !llms.includes('/explore/painted-churches/cite')) failures.push('llms.txt must expose Painted Churches authority graph and citation guidance.');
const manifestUrls = new Set(manifest.resources.map((resource) => resource.url));
for (const path of ['/explore/painted-churches/census','/explore/painted-churches/techniques','/explore/painted-churches/symbols','/explore/painted-churches/people','/explore/painted-churches/heritage','/explore/painted-churches/preservation','/explore/painted-churches/knowledge-graph','/explore/painted-churches/media','/explore/painted-churches/cite']) {
  const url = `https://texasdefined.com${path}`;
  if (!manifestUrls.has(url)) failures.push(`Citation manifest missing ${url}.`);
}

if (failures.length) {
  console.error('Painted Churches interactive map / 24-church authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Painted Churches map protected: 24 sourced pins, precision provenance, interactive filters, GeoCoordinates, public routes, llms guidance and citation manifest.');
