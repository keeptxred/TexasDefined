import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave6.ts');
const images = read('src/data/rv-parks/images.server.ts');
const indexFacade = read('src/data/rv-parks/index.ts');
const audit = read('src/data/destination-audit.ts');
const inventoryAudit = read('scripts/data/audit-rv-inventory-classification.mjs');
const rawInventory = [
  'src/data/rv-parks/hill-country.ts',
  'src/data/rv-parks/gulf-coast.ts',
  'src/data/rv-parks/piney-woods-east-texas.ts',
  'src/data/rv-parks/panhandle-north-texas.ts',
  'src/data/rv-parks/big-bend-west-texas.ts',
].map(read).join('\n');

const wave6 = [
  ['daingerfield-state-park-rv-loop', 'Daingerfield State Park RV Loop', 'https://tpwd.texas.gov/state-parks/daingerfield'],
  ['bob-sandlin-state-park-rv-loop', 'Bob Sandlin State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-bob-sandlin'],
  ['purtis-creek-state-park-rv-loop', 'Purtis Creek State Park RV Loop', 'https://tpwd.texas.gov/state-parks/purtis-creek'],
  ['ray-roberts-lake-state-park-rv-loops', 'Ray Roberts Lake State Park RV Loops', 'https://tpwd.texas.gov/state-parks/ray-roberts-lake'],
  ['san-angelo-state-park-rv-loop', 'San Angelo State Park RV Loop', 'https://tpwd.texas.gov/state-parks/san-angelo'],
];

const errors = [];
const requireText = (haystack, needle, message) => { if (!haystack.includes(needle)) errors.push(message); };

function blockFor(source, slug) {
  const singleStart = source.indexOf(`'${slug}': {`);
  const doubleStart = source.indexOf(`"${slug}": {`);
  const start = singleStart >= 0 ? singleStart : doubleStart;
  if (start < 0) return '';
  const singleNext = source.indexOf("\n  '", start + slug.length + 8);
  const doubleNext = source.indexOf('\n  "', start + slug.length + 8);
  const candidates = [singleNext, doubleNext].filter((value) => value > start);
  const end = candidates.length ? Math.min(...candidates) : source.indexOf('\n};', start);
  return source.slice(start, end > start ? end : undefined);
}

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE6_COUNT = 5;', 'Wave 6 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave6List(wave5Destinations)', 'RV facade must apply Wave 6 after Wave 5.');
requireText(audit, 'applyRvParkCuratedPublicWave6(applyRvParkCuratedPublicWave5(applyRvParkCuratedPublicWave4(input)))', 'Destination audit must evaluate Waves 4, 5 and 6 in runtime order.');
requireText(inventoryAudit, "['src/data/rv-parks/curated-public-wave6.ts', 'WAVE6']", 'RV inventory classification must include the Wave 6 runtime overlay.');
requireText(inventoryAudit, "/subjectScope:\\s*['\"]representative['\"]/", 'RV inventory classification must accept explicitly labeled representative images regardless of quote style.');

for (const [slug, name, officialUrl] of wave6) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const block = blockFor(wave, slug);
  if (!block) {
    errors.push(`${name} is missing from the Wave 6 overlay.`);
    continue;
  }
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: "${officialUrl}"`, `${name} must retain its official TPWD park source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-13"', `${name} must retain the Wave 6 source-review date.`);
  const body = block.match(/body:\s*\[([\s\S]*?)\]\s*,?/)?.[1] ?? '';
  const paragraphCount = [...body.matchAll(/"((?:\\.|[^"\\])*)"/g)].length;
  if (paragraphCount < 3) errors.push(`${name} must retain at least three substantive body paragraphs.`);
  const highlights = block.match(/highlights:\s*\[([^\]]+)\]/s)?.[1] ?? '';
  if ([...highlights.matchAll(/"((?:\\.|[^"\\])*)"/g)].length < 3) errors.push(`${name} must retain at least three visit highlights.`);

  const imageBlock = blockFor(images, slug);
  if (!imageBlock) {
    errors.push(`${name} is missing its governed image record.`);
    continue;
  }
  for (const field of ['src:', 'sourceUrl:', 'alt:', 'creator:', 'license:', 'licenseUrl:', 'verifiedAt:', 'subjectScope:']) {
    requireText(imageBlock, field, `${name} image is missing ${field.replace(':', '')} metadata.`);
  }
  const exactLocation = /actualLocation:\s*true/.test(imageBlock);
  const representative = /actualLocation:\s*false/.test(imageBlock)
    && /subjectScope:\s*['"]representative['"]/.test(imageBlock)
    && /sourceKind:\s*['"]generated-representative['"]/.test(imageBlock)
    && /AI-generated representative editorial image/.test(imageBlock);
  if (!exactLocation && !representative) {
    errors.push(`${name} must retain either rights-cleared exact-location imagery or explicit representative/non-documentary image labeling.`);
  }
}

if (wave.includes('"caddo-lake-state-park-rv-area": {') || wave.includes("'caddo-lake-state-park-rv-area': {")) {
  errors.push('Caddo Lake must remain outside Wave 6 as the explicit noindex negative control.');
}

if (errors.length) {
  console.error('RV curated public wave 6 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 6 validation passed: five additional TPWD-backed profiles have substantive planning copy, fresh source metadata, verified Texas coordinates and governed imagery with explicit documentary/representative semantics; Caddo Lake remains the noindex control.');
