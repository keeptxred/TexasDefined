import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const points = read('src/data/painted-church-map-points.ts');
const mapRoute = read('src/routes/explore.painted-churches.map.tsx');
const compareRoute = read('src/routes/explore.painted-churches.compare.tsx');
const authoritySources = read('src/data/painted-church-authority-sources.ts');
const trustRouter = read('src/components/authority/CitationCollectionTrustRouter.tsx');
const expanded = read('src/data/painted-churches-expanded.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const llms = read('src/routes/llms[.]txt.ts');
const manifest = JSON.parse(read('public/citation-magnets.json'));

const pointCount = (points.match(/slug: "/g) ?? []).length;
if (pointCount !== 28) failures.push(`Interactive Painted Churches map must retain 28 sourced points; found ${pointCount}.`);
for (const slug of ['corpus-christi-sacred-heart-catholic-church','san-antonio-st-joseph-catholic-church','anderson-st-stanislaus-kostka','castroville-st-louis-catholic-church','lacoste-our-lady-of-grace','serbin-st-paul-lutheran-church','praha-st-marys-assumption']) {
  if (!points.includes(`slug: "${slug}"`)) failures.push(`Map coordinate registry missing ${slug}.`);
}
for (const field of ['precision:', 'sourceUrl:', 'sourceLabel:', 'exact-property', 'near-property', 'community']) {
  if (!points.includes(field)) failures.push(`Map coordinate registry must preserve ${field}`);
}
if (!mapRoute.includes('useState') || !mapRoute.includes('aria-pressed') || !mapRoute.includes('setSelectedSlug')) failures.push('Map must remain interactive with accessible filters and pin selection.');
if (!mapRoute.includes('GeoCoordinates') || !mapRoute.includes('paintedChurchMapPoints')) failures.push('Map must publish sourced GeoCoordinates data.');
if (!mapRoute.includes('Coordinate methodology') || !mapRoute.includes('precisionLabel')) failures.push('Map must visibly explain coordinate precision.');
for (const token of ['effectiveSelectedSlug', 'onFocus={() => setSelectedSlug', 'openstreetmap.org/export/embed.html', 'Search these results', 'viewBoxForBounds']) {
  if (!mapRoute.includes(token)) failures.push(`Map UX regression: missing ${token}.`);
}
if (!mapRoute.includes('hasPart: paintedChurchMapPoints.map')) failures.push('Map coordinate Dataset must model church locations with hasPart.');
if (!mapRoute.includes('DataDownload')) failures.push('Map coordinate Dataset must expose CSV/JSON downloads as distributions.');
if (mapRoute.includes('distribution: paintedChurchMapPoints.map')) failures.push('Map must not model Place records as Dataset distributions.');
if (!mapRoute.includes('dateModified: paintedChurchAuthorityExpansionDate')) failures.push('Map freshness metadata must follow the canonical authority expansion date.');
if (!compareRoute.includes('dateModified: paintedChurchAuthorityExpansionDate')) failures.push('Comparison freshness metadata must follow the canonical authority expansion date.');
if (!authoritySources.includes('export const paintedChurchAuthorityExpansionDate = "2026-09-25"')) failures.push('Canonical Painted Churches authority expansion date is missing.');
if (!trustRouter.includes("Regional grouping, church identity, coordinate provenance and map interaction reviewed October 6, 2026.")) failures.push('Painted Churches map trust note must reflect the current review date and scope.');
if (!trustRouter.includes("Comparison labels, 28-record collection coverage and freshness metadata reviewed October 6, 2026.")) failures.push('Painted Churches comparison trust note must reflect current coverage and freshness review.');
for (const slug of ['corpus-christi-sacred-heart-catholic-church','san-antonio-st-joseph-catholic-church','anderson-st-stanislaus-kostka','castroville-st-louis-catholic-church','lacoste-our-lady-of-grace']) {
  if (!expanded.includes(slug)) failures.push(`Canonical collection must retain verified promotion ${slug}.`);
}
for (const path of ['/explore/painted-churches/media','/explore/painted-churches/cite','/explore/painted-churches/then-and-now']) {
  if (!publicRoutes.includes(JSON.stringify(path))) failures.push(`Public route registry missing ${path}.`);
}
if (!llms.includes('currently contains 28 verified church profiles')) failures.push('llms.txt must state the current 28-church verified collection.');
if (!llms.includes('/explore/painted-churches/knowledge-graph') || !llms.includes('/explore/painted-churches/cite') || !llms.includes('/explore/painted-churches/then-and-now')) failures.push('llms.txt must expose Painted Churches authority graph, archival comparison and citation guidance.');
const manifestUrls = new Set(manifest.resources.map((resource) => resource.url));
for (const path of ['/explore/painted-churches/census','/explore/painted-churches/techniques','/explore/painted-churches/symbols','/explore/painted-churches/people','/explore/painted-churches/heritage','/explore/painted-churches/preservation','/explore/painted-churches/knowledge-graph','/explore/painted-churches/then-and-now','/explore/painted-churches/media','/explore/painted-churches/cite']) {
  const url = `https://texasdefined.com${path}`;
  if (!manifestUrls.has(url)) failures.push(`Citation manifest missing ${url}.`);
}

if (failures.length) {
  console.error('Painted Churches interactive map / 28-church authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Painted Churches map protected: 28 sourced pins, synchronized selection, regional zoom, live street-map context, searchable directory, precision provenance, correct Dataset modeling, canonical freshness metadata, public routes, llms guidance and citation manifest.');
