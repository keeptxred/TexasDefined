import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave11.ts');
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

const wave11 = [
  ['dellanera-rv-park', 'Dellanera RV Park', 'https://galvestontx.gov/1329/Dellanera-RV-Park'],
  ['pleasure-island-rv-park', 'Pleasure Island RV Park', 'https://portarthurtx.gov/565/Pleasure-Island'],
  ['pioneer-rv-resort', 'Pioneer RV Resort', 'https://www.pioneerrvresorts.com/'],
  ['gulf-waters-beach-front-rv-resort', 'Gulf Waters Beach Front RV Resort', 'https://gulfwaters.com/port-aransas-rv-resort/'],
  ['jamaica-beach-rv-resort', 'Jamaica Beach RV Resort', 'https://jamaicabeachrvresort.com/about-us/'],
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

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE11_COUNT = 5;', 'Wave 11 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave11List(wave10Destinations)', 'RV facade must apply Wave 11 after Wave 10.');
requireText(audit, 'applyRvParkCuratedPublicWave11(applyRvParkCuratedPublicWave10(', 'Destination audit must evaluate Wave 11 after Wave 10.');
requireText(audit, 'hero-representative-ai', 'Destination audit must retain the fail-closed representative-AI hero error.');
requireText(inventoryAudit, "['src/data/rv-parks/curated-public-wave11.ts', 'WAVE11']", 'RV inventory classification must include the Wave 11 runtime overlay.');

for (const [slug, name, officialUrl] of wave11) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const block = blockFor(wave, slug);
  if (!block) {
    errors.push(`${name} is missing from the Wave 11 overlay.`);
    continue;
  }
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: "${officialUrl}"`, `${name} must retain its reviewed official source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-14"', `${name} must retain the Wave 11 source-review date.`);

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
  console.error('RV curated public wave 11 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 11 validation passed: five additional source-backed Gulf Coast RV profiles have destination-specific planning content and governed image metadata, while the existing final-image gate continues to control indexability.');
