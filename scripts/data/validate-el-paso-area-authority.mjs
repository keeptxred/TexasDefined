import { readFileSync, statSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const checks = [
  ['src/data/city-metro-authority.ts', [
    "targetId: 'county:el-paso'",
    "targetId: 'county:hudspeth'",
    'The El Paso, Texas metropolitan statistical area includes El Paso and Hudspeth counties',
  ]],
  ['src/data/knowledge-graph/relationships.ts', [
    "entity.kind === 'metro-area' && !explicit.has(candidate.id)",
    'countyContext(candidate) === entityCounty',
  ]],
  ['src/components/content/ElPasoAreaAuthority.tsx', [
    'export function ElPasoMetroGuide()',
    'export function ElPasoAreaCrossLinks(',
    '/city/el-paso',
    '/county/el-paso',
    '/county/hudspeth',
    '/article/moving-to-el-paso-guide',
    '/destination/franklin-mountains-state-park',
    '/destination/old-socorro-mission',
    '/destination/chamizal-national-memorial',
    '/destination/magoffin-home',
    '2020 Census',
    'MPO planning area',
    'Quintin Soloviev',
    'CC BY 4.0',
  ]],
  ['scripts/ci/purge-cloudflare-cache.mjs', [
    '\`https://\${zoneName}/county/el-paso\`',
  ]],
  ['src/data/el-paso-county-hero.ts', [
    '/images/explore/historic-sites/hueco-tanks-state-park.jpg',
    'Brian Stansberry',
    'Hueco-tanks-east-mtn-tx1.jpg',
    'creativecommons.org/licenses/by/3.0',
  ]],
  ['src/routes/$kind.$slug.lazy.tsx', [
    "entity.kind === 'county' && entity.slug === 'el-paso'",
    'elPasoCountyHero.src',
    'elPasoCountyHero.sourceUrl',
    'elPasoCountyHero.licenseUrl',
    'Hueco Tanks East Mountain in El Paso County',
    'CC BY 3.0',
    'fetchPriority="high"',
    '<ElPasoMetroGuide />',
    '<ElPasoAreaCrossLinks kind={entity.kind} slug={entity.slug} />',
    "entity.slug === 'el-paso-metro'",
  ]],
  ['src/lib/legacy-editorial-redirects.ts', [
    'LEGACY_EDITORIAL_REDIRECTS["/destination/el-paso"] = "/city/el-paso";',
  ]],
  ['src/routes/$kind.$slug.tsx', [
    "entity.slug === 'el-paso' ? elPasoCountyHero : undefined",
    'countyHeroImage?.src ?? countySeriesArticle?.hero.src',
  ]],
  ['src/routes/destination.$slug.tsx', [
    'countySlug === "el-paso" ? <Container><ElPasoAreaCrossLinks',
  ]],
  ['src/routes/article.$slug.tsx', [
    '<ElPasoAreaCrossLinks kind="article" slug={article.slug} />',
  ]],
  ['src/components/editorial/YsletaDelSurMuseumAuthority.tsx', [
    '/metro-area/el-paso-metro',
    '/city/el-paso',
  ]],
];

const failures = [];
// The state-owned Old Socorro Mission is a protected, CLOSED original site,
// not the separately operated nineteenth-century Socorro Mission church.
const oldSocorro = read('src/components/editorial/OldSocorroMissionAuthority.tsx');
const socorroRoute = read('src/routes/destination.$slug.tsx');
const socorroFacts = read('src/data/historic-site-fact-corrections.ts');
const socorroCounty = read('src/components/content/CountyHistoricSites.tsx');
const elPasoLinks = read('src/components/content/ElPasoAreaAuthority.tsx');
for (const marker of [
  'Old Socorro Mission', 'closed to the public', 'Different location',
  '1680', '1691', '1829', 'Early 1980s', 'thc.texas.gov', 'nps.gov',
  '/article/el-camino-real-de-tierra-adentro-national-historic-trail',
  '/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso',
]) if (!oldSocorro.includes(marker)) failures.push('Old Socorro authority missing ' + marker);
for (const marker of [
  'const OldSocorroMissionAuthority = lazy(() =>',
  '<OldSocorroMissionAuthority />',
  'isOldSocorro ? "Place"',
  'publicAccess: false',
  'Old Socorro Mission, Texas: Archaeology, History & Closure',
  'robots: indexable ? undefined : "noindex, follow"',
]) if (!socorroRoute.includes(marker)) failures.push('Old Socorro route/schema missing ' + marker);
for (const marker of [
  '10551 Nicholas Rd', 'CLOSED TO THE PUBLIC',
  'hero: missingDestinationHero(destination)',
  'directions: undefined',
]) if (!socorroFacts.includes(marker)) failures.push('Old Socorro facts/photo/closure contract missing ' + marker);
if (socorroCounty.includes('Historic active church on the El Paso Mission Trail')) failures.push('El Paso county mislabels closed original site as active church');
if (!elPasoLinks.includes('Old Socorro Mission — closed')) failures.push('El Paso related links lost the original archaeological site closure');
if (['google.com/maps/', 'maps/search/', 'maps/dir/'].some((marker) => oldSocorro.includes(marker))) failures.push('Old Socorro dedicated guide offers directions to the protected closed site');

const localCountyHero = new URL('../../public/images/explore/historic-sites/hueco-tanks-state-park.jpg', import.meta.url);
try {
  const asset = statSync(localCountyHero);
  if (!asset.isFile() || asset.size < 100_000) failures.push('El Paso County hero must be a substantive first-party photograph');
} catch {
  failures.push('El Paso County first-party hero asset is missing');
}
for (const [path, markers] of checks) {
  const content = read(path);
  for (const marker of markers) {
    if (!content.includes(marker)) failures.push(path + ': missing ' + marker);
  }
}

// The Ysleta cultural center must not reuse the service-yard/panorama
// photos as its documentary hero. Guard the subject, no-known-restrictions
// *photograph* claim and separately attributed mural artist rights.
const muralMedia = read('src/data/ysleta-cultural-center-media.ts');
const ysletaPage = read('src/components/editorial/YsletaDelSurMuseumAuthority.tsx');
const ysletaCard = read('src/data/museum-expansion-statewide-wave68.ts');
for (const marker of ['2014630705', 'Carol M. Highsmith', 'Bobby and Eddie Ortiz', 'Ricky V', 'Tigua \'95', 'no known restrictions']) {
  if (!muralMedia.includes(marker)) failures.push('Ysleta source provenance marker missing: ' + marker);
}
for (const [source,label] of [[ysletaPage,'museum guide'],[ysletaCard,'destination card']]) {
  if (!source.includes('YSLETA_CULTURAL_CENTER_MURAL')) failures.push('Ysleta actual-source mural photo not wired to ' + label);
  if (source.includes('Tigua_Cultural_Center.jpg') || source.includes('Tigua_Cultural_Center_2.jpg'))
    failures.push('Retired service/parking Cultural Center image still used in ' + label);
}
if (!ysletaPage.includes('not</strong> a photograph of the museum entrance') ||
    !ysletaPage.includes('sourceUrl') && !ysletaPage.includes('const photoUrl = YSLETA_CULTURAL_CENTER_MURAL.sourceUrl')) {
  failures.push('Ysleta documentary photo subject, source and entrance caveat missing');
}

const authority = read('src/components/content/ElPasoAreaAuthority.tsx');
const links = [...authority.matchAll(/href:\s*'(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)'/g)].map((match) => match[1]);
if (new Set(links).size !== links.length) failures.push('Duplicate editorial link in El Paso authority registry');
if (authority.includes('/destination/expo-center-of-taylor-county') || authority.includes('/sports-venue/ratliff-stadium')) failures.push('Unrelated venue reintroduced');

if (failures.length) {
  for (const failure of failures) console.error('FAIL:', failure);
  process.exit(1);
}
console.log('El Paso metro geography and reciprocal editorial link contracts validated.');
