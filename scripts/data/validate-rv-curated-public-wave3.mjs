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

const wave3 = [
  ['lake-mineral-wells-state-park-rv-loop', 'Lake Mineral Wells State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-mineral-wells'],
  ['eisenhower-state-park-rv-loop', 'Eisenhower State Park RV Loop', 'https://tpwd.texas.gov/state-parks/eisenhower'],
  ['monahans-sandhills-state-park-rv-area', 'Monahans Sandhills State Park RV Area', 'https://tpwd.texas.gov/state-parks/monahans-sandhills'],
  ['bonham-state-park-rv-loop', 'Bonham State Park RV Loop', 'https://tpwd.texas.gov/state-parks/bonham'],
  ['lake-whitney-state-park-rv-loop', 'Lake Whitney State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-whitney'],
  ['martin-dies-jr-state-park-rv-loop', 'Martin Dies Jr. State Park RV Loop', 'https://tpwd.texas.gov/state-parks/martin-dies-jr'],
  ['lake-livingston-state-park-rv-loops', 'Lake Livingston State Park RV Loops', 'https://tpwd.texas.gov/state-parks/lake-livingston'],
  ['lake-arrowhead-state-park-rv-loop', 'Lake Arrowhead State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-arrowhead'],
  ['lake-tawakoni-state-park-rv-area', 'Lake Tawakoni State Park RV Area', 'https://tpwd.texas.gov/state-parks/lake-tawakoni'],
];

const errors = [];
const requireText = (haystack, needle, message) => { if (!haystack.includes(needle)) errors.push(message); };
requireText(registry, 'export const RV_PARK_CURATED_PUBLIC_WAVE3_COUNT = 9;', 'Wave 3 curated-profile count must remain exactly nine.');
const contentStart = registry.indexOf('const CONTENT_OVERRIDES');
const contentEnd = registry.indexOf('\n};\n\nlet order = 0;', contentStart);
const contentOverrides = contentStart >= 0 && contentEnd > contentStart ? registry.slice(contentStart, contentEnd) : '';
if (!contentOverrides) errors.push('Unable to isolate RV content overrides.');

for (const [slug, name, officialUrl] of wave3) {
  requireText(rawInventory, slug, name + ' is missing from the original 250-record RV seed inventory.');
  const sourceIndex = registry.indexOf('"' + slug + '": {');
  if (sourceIndex < 0) errors.push(name + ' is missing a registry source override.');
  else {
    const sourceEnd = registry.indexOf('\n  },', sourceIndex);
    const sourceBlock = registry.slice(sourceIndex, sourceEnd > sourceIndex ? sourceEnd : undefined);
    requireText(sourceBlock, 'officialUrl: "' + officialUrl + '"', name + ' must retain its official TPWD source.');
    requireText(sourceBlock, 'sourceCheckedAt: "2026-09-12"', name + ' must retain the latest first-party review date.');
    requireText(sourceBlock, 'managingAuthority: "Texas Parks and Wildlife Department"', name + ' must retain TPWD as managing authority.');
    requireText(sourceBlock, 'coordinates: { lat:', name + ' must retain verified non-zero coordinates.');
    requireText(sourceBlock, 'address: "', name + ' must retain its verified TPWD address.');
  }

  const contentIndex = contentOverrides.indexOf('"' + slug + '": {');
  if (contentIndex < 0) errors.push(name + ' is missing substantive curated content.');
  else {
    const nextIndex = contentOverrides.indexOf('\n  "', contentIndex + slug.length + 8);
    const block = contentOverrides.slice(contentIndex, nextIndex > contentIndex ? nextIndex : undefined);
    for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body: [']) requireText(block, field, name + ' content is missing ' + field.replace(':', '') + '.');
    const bodyParagraphs = (block.match(/^\s{6}".+",?$/gm) ?? []).length;
    if (bodyParagraphs < 3) errors.push(name + ' must retain at least three substantive body paragraphs.');
  }

  const imageIndex = images.indexOf("'" + slug + "': {");
  if (imageIndex < 0) errors.push(name + ' is missing its exact-location licensed image record.');
  else {
    const nextImageIndex = images.indexOf("\n  '", imageIndex + slug.length + 8);
    const imageBlock = images.slice(imageIndex, nextImageIndex > imageIndex ? nextImageIndex : undefined);
    requireText(imageBlock, 'actualLocation: true', name + ' image must remain verified as actual-location media.');
    requireText(imageBlock, 'licenseUrl:', name + ' image must retain explicit reuse-license metadata.');
    requireText(imageBlock, 'sourceUrl:', name + ' image must retain source attribution metadata.');
  }
  requireText(productionSmoke, "{ path: '/destination/" + slug + "', name: '" + name + "' }", name + ' must remain in deployment-coupled production smoke.');
}

if (contentOverrides.includes('"caddo-lake-state-park-rv-area": {')) errors.push('Caddo Lake must remain outside curated content overrides as the negative indexing control.');
requireText(productionSmoke, "const guardedProfile = { path: '/destination/caddo-lake-state-park-rv-area'", 'Caddo Lake must remain the explicit noindex production control.');

if (errors.length) {
  console.error('RV curated public wave 3 validation failed:');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}
console.log('RV curated public wave 3 validation passed: nine additional TPWD-sourced, exact-image profiles are protected and Caddo Lake remains the noindex control.');
