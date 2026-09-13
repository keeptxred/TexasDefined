import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave5.ts');
const images = read('src/data/rv-parks/images.server.ts');
const indexFacade = read('src/data/rv-parks/index.ts');
const audit = read('src/data/destination-audit.ts');
const rawInventory = [
  'src/data/rv-parks/hill-country.ts',
  'src/data/rv-parks/gulf-coast.ts',
  'src/data/rv-parks/piney-woods-east-texas.ts',
  'src/data/rv-parks/panhandle-north-texas.ts',
  'src/data/rv-parks/big-bend-west-texas.ts',
].map(read).join('\n');

const wave5 = [
  ['mission-tejas-state-park-rv-loop', 'Mission Tejas State Park RV Loop', 'https://tpwd.texas.gov/state-parks/mission-tejas'],
  ['cooper-lake-state-park-rv-loops', 'Cooper Lake State Park RV Loops', 'https://tpwd.texas.gov/state-parks/cooper-lake'],
  ['caprock-canyons-state-park-rv-loop', 'Caprock Canyons State Park RV Loop', 'https://tpwd.texas.gov/state-parks/caprock-canyons'],
  ['abilene-state-park-rv-loop', 'Abilene State Park RV Loop', 'https://tpwd.texas.gov/state-parks/abilene'],
  ['lake-colorado-city-state-park-rv-loop', 'Lake Colorado City State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-colorado-city'],
];

const errors = [];
const requireText = (haystack, needle, message) => { if (!haystack.includes(needle)) errors.push(message); };

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE5_COUNT = 5;', 'Wave 5 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave5List(wave4Destinations)', 'RV facade must apply Wave 5 after Wave 4.');
requireText(audit, 'applyRvParkCuratedPublicWave5(applyRvParkCuratedPublicWave4(input))', 'Destination audit must evaluate Wave 4 and Wave 5 overlays in sequence.');

for (const [slug, name, officialUrl] of wave5) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const blockStart = wave.indexOf(`\"${slug}\": {`);
  if (blockStart < 0) {
    errors.push(`${name} is missing from the Wave 5 overlay.`);
    continue;
  }
  const nextStart = wave.indexOf('\n  "', blockStart + slug.length + 8);
  const block = wave.slice(blockStart, nextStart > blockStart ? nextStart : wave.indexOf('\n};', blockStart));
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: \"${officialUrl}\"`, `${name} must retain its official TPWD park source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-13"', `${name} must retain the Wave 5 source-review date.`);
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
}

if (wave.includes('"caddo-lake-state-park-rv-area": {')) errors.push('Caddo Lake must remain outside Wave 5 as the explicit noindex negative control.');

if (errors.length) {
  console.error('RV curated public wave 5 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 5 validation passed: five additional official-source profiles have substantive content, fresh source metadata, verified Texas coordinates and exact-location reusable imagery; Caddo Lake remains the noindex control.');
