import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const wave = read('src/data/rv-parks/curated-public-wave10.ts');
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

const wave10 = [
  ['stewart-creek-park-rv-sites', 'Stewart Creek Park RV Sites', 'https://www.thecolonytx.gov/1060/Tent-RV-Camping'],
  ['loyd-park-rv-campground', 'Loyd Park RV Campground', 'https://www.gptx.org/Parks/Loyd-Park'],
  ['vineyards-campground-and-cabins', 'Vineyards Campground & Cabins', 'https://www.vineyardscampground.com/rv-rates/'],
  ['coleto-creek-regional-park-rv-area', 'Coleto Creek Regional Park RV Area', 'https://www.gbra.org/recreation/coleto-creek-park/'],
  ['matagorda-bay-nature-park-rv-resort', 'Matagorda Bay Nature Park RV Resort', 'https://lcraparks.com/parks/matagorda-bay-nature-park'],
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

requireText(wave, 'export const RV_PARK_CURATED_PUBLIC_WAVE10_COUNT = 5;', 'Wave 10 curated-profile count must remain exactly five.');
requireText(indexFacade, 'applyRvParkCuratedPublicWave10List(wave9Destinations)', 'RV facade must apply Wave 10 after Wave 9.');
requireText(audit, 'applyRvParkCuratedPublicWave10(applyRvParkCuratedPublicWave9(', 'Destination audit must evaluate Wave 10 after Wave 9.');
requireText(audit, 'hero-representative-ai', 'Destination audit must retain the fail-closed representative-AI hero error.');
requireText(inventoryAudit, "['src/data/rv-parks/curated-public-wave10.ts', 'WAVE10']", 'RV inventory classification must include the Wave 10 runtime overlay.');

for (const [slug, name, officialUrl] of wave10) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);
  const block = blockFor(wave, slug);
  if (!block) {
    errors.push(`${name} is missing from the Wave 10 overlay.`);
    continue;
  }
  for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:', 'coordinates:', 'address:', 'managingAuthority:']) {
    requireText(block, field, `${name} overlay is missing ${field.replace(':', '')}.`);
  }
  requireText(block, `officialUrl: "${officialUrl}"`, `${name} must retain its reviewed official source.`);
  requireText(block, 'sourceCheckedAt: "2026-09-13"', `${name} must retain the Wave 10 source-review date.`);

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
  console.error('RV curated public wave 10 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 10 validation passed: five additional authority-backed RV profiles have destination-specific planning content and reviewed source metadata, while the existing final-image gate continues to control indexability.');
