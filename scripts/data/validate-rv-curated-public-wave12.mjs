import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave12.ts');
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

const wave12 = [
  ['padre-balli-park-rv-area', 'Padre Balli Park RV Area', 'https://www.nuecesbeachparks.com/padre-balli-park'],
  ['andy-bowie-county-park-rv-area', 'Andy Bowie County Park RV Area', 'https://www.cameroncountytx.gov/parks-coastal-parks/parks-andy-bowie/'],
  ['adolph-thomae-jr-county-park-rv-loop', 'Adolph Thomae Jr. County Park RV Loop', 'https://www.cameroncountytx.gov/parks-home/'],
  ['kaufer-hubert-memorial-park-rv-area', 'Kaufer-Hubert Memorial Park RV Area', 'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ctc/kingsville-loop'],
  ['stella-mare-rv-resort', 'Stella Mare RV Resort', 'https://stellamarervresort.com/rv-sites/'],
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

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE12_COUNT = 5;', 'Wave 12 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave12List(wave11Destinations)', 'RV facade must apply Wave 12 after Wave 11.');
requireText(audit, 'applyRvParkCuratedPublicWave12(applyRvParkCuratedPublicWave11(', 'Destination audit must evaluate Wave 12 after Wave 11.');
requireText(audit, 'hero-representative-ai', 'Destination audit must retain the fail-closed representative-AI hero error.');
requireText(inventoryAudit, "['src/data/rv-parks/curated-public-wave12.ts', 'WAVE12']", 'RV inventory classification must include the Wave 12 runtime overlay.');

for (const [slug, name, officialUrl] of wave12) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const block = blockFor(wave, slug);
  if (!block) {
    errors.push(`${name} is missing from the Wave 12 overlay.`);
    continue;
  }
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: "${officialUrl}"`, `${name} must retain its reviewed official source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-14"', `${name} must retain the Wave 12 source-review date.`);

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
    && /sourceKind:\s*['"]generated-representative['"]/.test(imageBlock)
    && /AI-generated representative editorial image/i.test(imageBlock);
  if (!exactLocation && !representative) {
    errors.push(`${name} must retain either rights-cleared exact-location imagery or explicit temporary representative-AI labeling.`);
  }
}

if (errors.length) {
  console.error('RV curated public wave 12 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 12 validation passed: five additional source-backed coastal RV profiles have destination-specific planning content and governed image metadata, while the existing final-image gate continues to control indexability.');
