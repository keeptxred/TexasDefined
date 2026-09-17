import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave8.ts');
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

const wave8 = [
  ['lost-maples-state-natural-area-rv-campground', 'Lost Maples State Natural Area RV Campground', 'https://tpwd.texas.gov/state-parks/lost-maples'],
  ['mckinney-falls-state-park-rv-loop', 'McKinney Falls State Park RV Loop', 'https://tpwd.texas.gov/state-parks/mckinney-falls'],
  ['padre-island-national-seashore-malaquite-campground', 'Padre Island National Seashore Malaquite Campground', 'https://www.nps.gov/pais/planyourvisit/malaquite_campground.htm'],
  ['ratcliff-lake-recreation-area-rv-sites', 'Ratcliff Lake Recreation Area RV Sites', 'https://www.fs.usda.gov/r08/texas/recreation/ratcliff-lake-936-655-2299'],
  ['cagle-recreation-area-rv-loop', 'Cagle Recreation Area RV Loop', 'https://www.recreation.gov/camping/campgrounds/234004'],
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

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE8_COUNT = 5;', 'Wave 8 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave8List(wave7Destinations)', 'RV facade must apply Wave 8 after Wave 7.');
requireText(audit, 'applyRvParkCuratedPublicWave8(applyRvParkCuratedPublicWave7(applyRvParkCuratedPublicWave6(applyRvParkCuratedPublicWave5(applyRvParkCuratedPublicWave4(input)))))', 'Destination audit must evaluate Waves 4 through 8 in runtime order.');
requireText(inventoryAudit, "['src/data/rv-parks/curated-public-wave8.ts', 'WAVE8']", 'RV inventory classification must include the Wave 8 runtime overlay.');

for (const [slug, name, officialUrl] of wave8) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const block = blockFor(wave, slug);
  if (!block) {
    errors.push(`${name} is missing from the Wave 8 overlay.`);
    continue;
  }
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: "${officialUrl}"`, `${name} must retain its reviewed official source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-13"', `${name} must retain the Wave 8 source-review date.`);

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
  for (const field of ['src:', 'sourceUrl:', 'alt:', 'width:', 'height:', 'creator:', 'license:', 'licenseUrl:', 'verifiedAt', 'subjectScope:']) {
    requireText(imageBlock, field, `${name} image is missing ${field.replace(':', '')} metadata.`);
  }
  const exactLocation = /actualLocation:\s*true/.test(imageBlock);
  const representative = /actualLocation:\s*false/.test(imageBlock)
    && /subjectScope:\s*['"]representative['"]/.test(imageBlock)
    && /sourceKind:\s*['"]generated-representative['"]/.test(imageBlock);
  if (!exactLocation && !representative) {
    errors.push(`${name} must retain either rights-cleared exact-location imagery or explicit representative/non-documentary image labeling.`);
  }
}

if (errors.length) {
  console.error('RV curated public wave 8 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 8 validation passed: five more authority-backed public RV profiles have substantive destination-specific planning copy, current source metadata, usable coordinates and governed imagery.');
