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

const wave2 = [
  {
    slug: 'tyler-state-park-rv-loop',
    name: 'Tyler State Park RV Loop',
    officialUrl: 'https://tpwd.texas.gov/state-parks/tyler',
    address: '789 Park Road 16, Tyler, TX 75706-9141',
    coordinates: 'coordinates: { lat: 32.481414, lng: -95.289441 }',
  },
  {
    slug: 'huntsville-state-park-rv-loop',
    name: 'Huntsville State Park RV Loop',
    officialUrl: 'https://tpwd.texas.gov/state-parks/huntsville',
    address: '565 Park Road 40 W, Huntsville, TX 77340',
    coordinates: 'coordinates: { lat: 30.628404, lng: -95.525921 }',
  },
  {
    slug: 'balmorhea-state-park-rv-area',
    name: 'Balmorhea State Park RV Area',
    officialUrl: 'https://tpwd.texas.gov/state-parks/balmorhea',
    address: '9207 TX-17, Toyahvale, TX 79786',
    coordinates: 'coordinates: { lat: 30.945036, lng: -103.786663 }',
  },
  {
    slug: 'davis-mountains-state-park-rv-loop',
    name: 'Davis Mountains State Park RV Loop',
    officialUrl: 'https://tpwd.texas.gov/state-parks/davis-mountains',
    address: 'TX-118 N., Park Rd. 3, Fort Davis, TX 79734',
    coordinates: 'coordinates: { lat: 30.599103, lng: -103.92945 }',
  },
  {
    slug: 'copper-breaks-state-park-rv-area',
    name: 'Copper Breaks State Park RV Area',
    officialUrl: 'https://tpwd.texas.gov/state-parks/copper-breaks',
    address: '777 Park Road 62, Quanah, TX 79252-7679',
    coordinates: 'coordinates: { lat: 34.112176, lng: -99.743296 }',
  },
];

const errors = [];
const requireText = (haystack, needle, message) => {
  if (!haystack.includes(needle)) errors.push(message);
};

requireText(registry, 'export const RV_PARK_CURATED_PUBLIC_WAVE2_COUNT = 5;', 'Wave 2 curated-profile count must remain exactly five.');

const contentStart = registry.indexOf('const CONTENT_OVERRIDES');
const contentEnd = registry.indexOf('\n};\n\nlet order = 0;', contentStart);
const contentOverrides = contentStart >= 0 && contentEnd > contentStart ? registry.slice(contentStart, contentEnd) : '';
if (!contentOverrides) errors.push('Unable to isolate RV content overrides.');

for (const profile of wave2) {
  requireText(rawInventory, profile.slug, `${profile.name} is missing from the original 250-record RV seed inventory.`);
  requireText(registry, `"${profile.slug}": {`, `${profile.name} is missing a registry override.`);
  requireText(registry, `officialUrl: "${profile.officialUrl}"`, `${profile.name} must use its official TPWD page.`);
  requireText(registry, `address: "${profile.address}"`, `${profile.name} is missing its verified TPWD address.`);
  requireText(registry, profile.coordinates, `${profile.name} is missing its verified non-zero TPWD coordinates.`);
  requireText(registry, 'managingAuthority: "Texas Parks and Wildlife Department"', 'Curated public RV profiles must retain TPWD as managing authority.');

  const contentIndex = contentOverrides.indexOf(`"${profile.slug}": {`);
  if (contentIndex < 0) {
    errors.push(`${profile.name} is missing substantive curated content.`);
  } else {
    const nextIndex = contentOverrides.indexOf('\n  "', contentIndex + profile.slug.length + 8);
    const block = contentOverrides.slice(contentIndex, nextIndex > contentIndex ? nextIndex : undefined);
    for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body: [']) {
      requireText(block, field, `${profile.name} content is missing ${field.replace(':', '')}.`);
    }
    const bodyParagraphs = (block.match(/^\s{6}".+",?$/gm) ?? []).length;
    if (bodyParagraphs < 3) errors.push(`${profile.name} must retain at least three substantive body paragraphs.`);
  }

  const imageIndex = images.indexOf(`'${profile.slug}': {`);
  if (imageIndex < 0) {
    errors.push(`${profile.name} is missing its exact-location licensed image record.`);
  } else {
    const nextImageIndex = images.indexOf("\n  '", imageIndex + profile.slug.length + 8);
    const imageBlock = images.slice(imageIndex, nextImageIndex > imageIndex ? nextImageIndex : undefined);
    requireText(imageBlock, 'actualLocation: true', `${profile.name} image must remain verified as actual-location media.`);
    requireText(imageBlock, 'licenseUrl:', `${profile.name} image must retain explicit reuse-license metadata.`);
    requireText(imageBlock, 'sourceUrl:', `${profile.name} image must retain source attribution metadata.`);
  }

  requireText(productionSmoke, `{ path: '/destination/${profile.slug}', name: '${profile.name}' }`, `${profile.name} must remain in the deployment-coupled RV production smoke.`);
}

if (contentOverrides.includes('"caddo-lake-state-park-rv-area": {')) {
  errors.push('Caddo Lake must remain outside curated content overrides as the negative indexing control for this wave.');
}
requireText(productionSmoke, "const guardedProfile = { path: '/destination/caddo-lake-state-park-rv-area'", 'Caddo Lake must remain the explicit noindex production control.');

if (errors.length) {
  console.error('RV curated public wave 2 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV curated public wave 2 validation passed: five TPWD-sourced, exact-image profiles are protected and Caddo Lake remains the noindex control.');
