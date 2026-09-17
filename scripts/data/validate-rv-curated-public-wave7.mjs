import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave7.ts');
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

const wave7 = [
  ['big-bend-national-park-cottonwood-campground', 'Big Bend National Park Cottonwood Campground', 'https://www.nps.gov/bibe/planyourvisit/cottonwood_campground.htm'],
  ['big-bend-national-park-rio-grande-village-rv-park', 'Big Bend National Park Rio Grande Village RV Park', 'https://www.nps.gov/bibe/planyourvisit/rgv_hookups.htm'],
  ['hueco-tanks-state-park-rv-sites', 'Hueco Tanks State Park RV Sites', 'https://tpwd.texas.gov/state-parks/hueco-tanks'],
  ['fort-griffin-state-historic-site-rv-loop', 'Fort Griffin State Historic Site RV Loop', 'https://thc.texas.gov/state-historic-sites/fort-griffin/fort-griffin-campgrounds'],
  ['davis-mountains-state-park-rv-loop', 'Davis Mountains State Park RV Loop', 'https://tpwd.texas.gov/state-parks/davis-mountains'],
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

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE7_COUNT = 5;', 'Wave 7 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave7List(wave6Destinations)', 'RV facade must apply Wave 7 after Wave 6.');
requireText(audit, 'applyRvParkCuratedPublicWave7(applyRvParkCuratedPublicWave6(applyRvParkCuratedPublicWave5(applyRvParkCuratedPublicWave4(input))))', 'Destination audit must evaluate Waves 4 through 7 in runtime order.');
requireText(inventoryAudit, "['src/data/rv-parks/curated-public-wave7.ts', 'WAVE7']", 'RV inventory classification must include the Wave 7 runtime overlay.');

for (const [slug, name, officialUrl] of wave7) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const block = blockFor(wave, slug);
  if (!block) {
    errors.push(`${name} is missing from the Wave 7 overlay.`);
    continue;
  }
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: "${officialUrl}"`, `${name} must retain its reviewed official source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-13"', `${name} must retain the Wave 7 source-review date.`);

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

if (wave.includes('"chisos-basin-campground-rv-sites": {') || wave.includes("'chisos-basin-campground-rv-sites': {")) {
  errors.push('Chisos Basin campground must remain outside Wave 7 while 2026 access messaging is internally inconsistent across current NPS pages.');
}

if (errors.length) {
  console.error('RV curated public wave 7 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 7 validation passed: five additional public-land RV profiles have substantive destination-specific planning copy, reviewed authority sources, usable coordinates and governed imagery; Chisos Basin remains held back pending unambiguous current access guidance.');
