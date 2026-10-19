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
  ['src/data/el-paso-county-hero.ts', [
    '/images/state-parks/franklin-mountains-state-park.jpg',
    'Urban Versis 32',
    'Franklin_Mountains_State_Park_Cactus.jpg',
    'creativecommons.org/licenses/by-sa/4.0',
  ]],
  ['src/routes/$kind.$slug.lazy.tsx', [
    "entity.kind === 'county' && entity.slug === 'el-paso'",
    'elPasoCountyHero.src',
    'elPasoCountyHero.sourceUrl',
    'elPasoCountyHero.licenseUrl',
    'Franklin Mountains State Park in El Paso County',
    'CC BY-SA 4.0',
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
const localCountyHero = new URL('../../public/images/state-parks/franklin-mountains-state-park.jpg', import.meta.url);
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

const authority = read('src/components/content/ElPasoAreaAuthority.tsx');
const links = [...authority.matchAll(/href:\s*'(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)'/g)].map((match) => match[1]);
if (new Set(links).size !== links.length) failures.push('Duplicate editorial link in El Paso authority registry');
if (authority.includes('/destination/expo-center-of-taylor-county') || authority.includes('/sports-venue/ratliff-stadium')) failures.push('Unrelated venue reintroduced');

if (failures.length) {
  for (const failure of failures) console.error('FAIL:', failure);
  process.exit(1);
}
console.log('El Paso metro geography and reciprocal editorial link contracts validated.');
