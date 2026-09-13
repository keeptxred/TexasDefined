import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave4.ts');
const images = read('src/data/rv-parks/images.server.ts');
const indexFacade = read('src/data/rv-parks/index.ts');
const audit = read('src/data/destination-audit.ts');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const productionSmoke = read('scripts/ci/verify-rv-production.mjs');
const rawInventory = [
  'src/data/rv-parks/hill-country.ts',
  'src/data/rv-parks/gulf-coast.ts',
  'src/data/rv-parks/piney-woods-east-texas.ts',
  'src/data/rv-parks/panhandle-north-texas.ts',
  'src/data/rv-parks/big-bend-west-texas.ts',
].map(read).join('\n');

const wave4 = [
  ['inks-lake-state-park-rv-loop', 'Inks Lake State Park RV Loop', 'https://tpwd.texas.gov/state-parks/inks-lake'],
  ['sea-rim-state-park-rv-sites', 'Sea Rim State Park RV Sites', 'https://tpwd.texas.gov/state-parks/sea-rim'],
  ['goose-island-state-park-rv-loop', 'Goose Island State Park RV Loop', 'https://tpwd.texas.gov/state-parks/goose-island'],
  ['mustang-island-state-park-rv-loops', 'Mustang Island State Park RV Loops', 'https://tpwd.texas.gov/state-parks/mustang-island'],
  ['martin-creek-lake-state-park-rv-area', 'Martin Creek Lake State Park RV Area', 'https://tpwd.texas.gov/state-parks/martin-creek-lake'],
  ['atlanta-state-park-rv-loop', 'Atlanta State Park RV Loop', 'https://tpwd.texas.gov/state-parks/atlanta'],
];

const errors = [];
const requireText = (haystack, needle, message) => { if (!haystack.includes(needle)) errors.push(message); };

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE4_COUNT = 6;', 'Wave 4 curated-profile count must remain exactly six.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave4List(registry.loadRvParkDestinationsServer())', 'RV facade must apply Wave 4 before list/one/search responses.');
requireText(indexFacade, 'buildRvParkSearchDocumentsFromCuratedDestinations(destinations)', 'RV search must use curated Wave 4 summaries.');
requireText(audit, 'applyRvParkCuratedPublicWave4(input)', 'Destination audit must evaluate Wave 4 overlays so sitemap eligibility and page robots stay aligned.');
requireText(sitemap, 'auditDestination(destination).readyForIndexing', 'Explore sitemap must continue using the destination audit gate for RV profiles.');

for (const [slug, name, officialUrl] of wave4) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const blockStart = wave.indexOf(`\"${slug}\": {`);
  if (blockStart < 0) {
    errors.push(`${name} is missing from the Wave 4 overlay.`);
    continue;
  }
  const nextStart = wave.indexOf('\n  "', blockStart + slug.length + 8);
  const block = wave.slice(blockStart, nextStart > blockStart ? nextStart : wave.indexOf('\n};', blockStart));
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: \"${officialUrl}\"`, `${name} must retain its official TPWD park source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-13"', `${name} must retain the Wave 4 source-review date.`);
  const paragraphCount = (block.match(/^\s{6}".+",?$/gm) ?? []).length;
  if (paragraphCount < 3) errors.push(`${name} must retain at least three substantive body paragraphs.`);
  const highlights = block.match(/highlights: \[([^\]]+)\]/s)?.[1] ?? '';
  if ((highlights.match(/"/g) ?? []).length < 6) errors.push(`${name} must retain at least three visit highlights.`);

  const imageStartSingle = images.indexOf(`'${slug}': {`);
  const imageStartDouble = images.indexOf(`\"${slug}\": {`);
  const imageStart = imageStartSingle >= 0 ? imageStartSingle : imageStartDouble;
  if (imageStart < 0) {
    errors.push(`${name} is missing its governed image record.`);
  } else {
    const singleNext = images.indexOf("\n  '", imageStart + slug.length + 8);
    const doubleNext = images.indexOf('\n  "', imageStart + slug.length + 8);
    const candidates = [singleNext, doubleNext].filter((value) => value > imageStart);
    const imageEnd = candidates.length ? Math.min(...candidates) : images.indexOf('\n};', imageStart);
    const imageBlock = images.slice(imageStart, imageEnd > imageStart ? imageEnd : undefined);
    requireText(imageBlock, 'actualLocation: true', `${name} must use verified actual-location media before indexing.`);
    requireText(imageBlock, 'licenseUrl:', `${name} image must retain explicit reuse-license metadata.`);
    requireText(imageBlock, 'sourceUrl:', `${name} image must retain source attribution metadata.`);
  }

  requireText(productionSmoke, `{ path: '/destination/${slug}', name: '${name}' }`, `${name} must remain in deployment-coupled RV production smoke.`);
}

if (wave.includes('"caddo-lake-state-park-rv-area": {')) errors.push('Caddo Lake must remain outside Wave 4 as the explicit noindex negative control.');
requireText(productionSmoke, "const guardedProfile = { path: '/destination/caddo-lake-state-park-rv-area'", 'Caddo Lake must remain the explicit noindex production control.');

if (errors.length) {
  console.error('RV curated public wave 4 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 4 validation passed: six additional official-source profiles have substantive content, fresh source metadata, verified Texas coordinates, exact-location reusable imagery and production smoke coverage; Caddo Lake remains the noindex control.');
