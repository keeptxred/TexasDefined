import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const registry = read('src/data/rv-parks/registry.server.ts');
const images = read('src/data/rv-parks/images.server.ts');
const productionSmoke = read('scripts/ci/verify-rv-production.mjs');
const rawInventory = [
  'src/data/rv-parks/hill-country.ts',
  'src/data/rv-parks/gulf-coast.ts',
  'src/data/rv-parks/piney-woods-east-texas.ts',
  'src/data/rv-parks/panhandle-north-texas.ts',
  'src/data/rv-parks/big-bend-west-texas.ts',
].map(read).join('\n');

const wave4 = [
  ['inks-lake-state-park-rv-loop', 'Inks Lake State Park RV Loop', 'https://tpwd.texas.gov/state-parks/inks-lake', 'actual'],
  ['mckinney-falls-state-park-rv-loop', 'McKinney Falls State Park RV Loop', 'https://tpwd.texas.gov/state-parks/mckinney-falls', 'representative'],
  ['sea-rim-state-park-rv-sites', 'Sea Rim State Park RV Sites', 'https://tpwd.texas.gov/state-parks/sea-rim', 'actual'],
  ['goose-island-state-park-rv-loop', 'Goose Island State Park RV Loop', 'https://tpwd.texas.gov/state-parks/goose-island', 'actual'],
  ['mustang-island-state-park-rv-loops', 'Mustang Island State Park RV Loops', 'https://tpwd.texas.gov/state-parks/mustang-island', 'actual'],
];

const errors = [];
const requireText = (haystack, needle, message) => { if (!haystack.includes(needle)) errors.push(message); };

function extractKeyedBlock(source, slug) {
  const doubleKey = `  "${slug}": {`;
  const singleKey = `  '${slug}': {`;
  let start = source.indexOf(doubleKey);
  if (start < 0) start = source.indexOf(singleKey);
  if (start < 0) return '';
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = source.indexOf('{', start); i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  return source.slice(start);
}

requireText(registry, 'export const RV_PARK_CURATED_PUBLIC_WAVE4_COUNT = 5;', 'Wave 4 curated-profile count must remain exactly five.');
const contentStart = registry.indexOf('const CONTENT_OVERRIDES');
const contentEnd = registry.indexOf('\n};\n\nlet order = 0;', contentStart);
const contentOverrides = contentStart >= 0 && contentEnd > contentStart ? registry.slice(contentStart, contentEnd) : '';
if (!contentOverrides) errors.push('Unable to isolate RV content overrides.');

for (const [slug, name, officialUrl, imageMode] of wave4) {
  requireText(rawInventory, slug, `${name} is missing from the original 250-record RV seed inventory.`);

  const sourceBlock = extractKeyedBlock(registry.slice(0, contentStart), slug);
  if (!sourceBlock) errors.push(`${name} is missing a registry source override.`);
  else {
    requireText(sourceBlock, `officialUrl: "${officialUrl}"`, `${name} must retain its official TPWD source.`);
    requireText(sourceBlock, 'sourceCheckedAt: "2026-09-12"', `${name} must retain the latest first-party review date.`);
    requireText(sourceBlock, 'managingAuthority: "Texas Parks and Wildlife Department"', `${name} must retain TPWD as managing authority.`);
    requireText(sourceBlock, 'coordinates: { lat:', `${name} must retain verified non-zero coordinates.`);
    requireText(sourceBlock, 'address: "', `${name} must retain its verified TPWD address.`);
  }

  const contentBlock = extractKeyedBlock(contentOverrides, slug);
  if (!contentBlock) errors.push(`${name} is missing substantive curated content.`);
  else {
    for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body: [']) {
      requireText(contentBlock, field, `${name} content is missing ${field.replace(':', '')}.`);
    }
    const bodyStart = contentBlock.indexOf('body: [');
    const bodyText = bodyStart >= 0 ? contentBlock.slice(bodyStart) : '';
    const bodyParagraphs = (bodyText.match(/^\s{6}".+",?$/gm) ?? []).length;
    if (bodyParagraphs < 3) errors.push(`${name} must retain at least three substantive body paragraphs.`);
  }

  const imageBlock = extractKeyedBlock(images, slug);
  if (!imageBlock) errors.push(`${name} is missing its governed image record.`);
  else {
    for (const field of ['sourceUrl:', 'license:', 'licenseUrl:', 'verifiedAt:', 'subjectScope:']) {
      requireText(imageBlock, field, `${name} image must retain ${field.replace(':', '')} metadata.`);
    }
    if (imageMode === 'actual') {
      requireText(imageBlock, 'actualLocation: true', `${name} must retain verified actual-location image status.`);
      if (imageBlock.includes('sourceKind: "generated-representative"') || imageBlock.includes("sourceKind: 'generated-representative'")) {
        errors.push(`${name} must not be represented as generated imagery while actualLocation is true.`);
      }
    } else {
      requireText(imageBlock, 'actualLocation: false', `${name} representative image must remain non-documentary.`);
      const representativeScope = imageBlock.includes('subjectScope: "representative"') || imageBlock.includes("subjectScope: 'representative'");
      if (!representativeScope) errors.push(`${name} representative image must retain representative subject scope.`);
      const generatedKind = imageBlock.includes('sourceKind: "generated-representative"') || imageBlock.includes("sourceKind: 'generated-representative'");
      if (!generatedKind) errors.push(`${name} representative image must retain generated-representative source kind.`);
      requireText(imageBlock, 'AI-generated representative editorial image', `${name} representative image must remain explicitly labeled as AI-generated representative editorial imagery.`);
    }
  }

  requireText(productionSmoke, `{ path: '/destination/${slug}', name: '${name}' }`, `${name} must remain in deployment-coupled production smoke.`);
}

if (contentOverrides.includes('"caddo-lake-state-park-rv-area": {')) errors.push('Caddo Lake must remain outside curated content overrides as the negative indexing control.');
requireText(productionSmoke, "const guardedProfile = { path: '/destination/caddo-lake-state-park-rv-area'", 'Caddo Lake must remain the explicit noindex production control.');

if (errors.length) {
  console.error('RV curated public wave 4 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 4 validation passed: five additional TPWD-sourced profiles are protected, exact versus representative image semantics remain honest, and Caddo Lake remains the noindex control.');
