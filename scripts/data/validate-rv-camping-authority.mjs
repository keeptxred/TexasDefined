import fs from 'node:fs';

const server = fs.readFileSync('src/data/county-rv-camping.server.ts', 'utf8');
const countyBridge = fs.readFileSync('src/data/county-major-events.ts', 'utf8');
const county = fs.readFileSync('src/components/sports/CountySportsDestinations.tsx', 'utf8');
const camping = fs.readFileSync('src/routes/best-places-to-go-camping-in-texas.lazy.tsx', 'utf8');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required RV authority contract text: ${needle}`);
}

for (const wave of [
  'CAMPING_DISCOVERY_PROFILES',
  'CAMPING_DISCOVERY_PROFILES_WAVE2',
  'CAMPING_DISCOVERY_PROFILES_WAVE3',
  'CAMPING_DISCOVERY_PROFILES_WAVE4',
  'CAMPING_DISCOVERY_PROFILES_WAVE5',
]) requireText(server, wave, 'server RV projection');

requireText(server, 'profile.styles.includes("rv")', 'server RV-only filter');
requireText(server, 'profile.amenities.includes("full-hookup")', 'server full-hookup verification');
requireText(server, 'sourceUrl:', 'server authoritative source projection');
requireText(server, 'reservationUrl: profile.reservationUrl', 'server reservation projection');
requireText(countyBridge, 'createServerFn', 'shared county planning server boundary');
requireText(countyBridge, 'await import("./county-major-events.server")', 'county event server-only import');
requireText(countyBridge, 'import("./county-rv-camping.server")', 'county RV server-only import');
requireText(countyBridge, 'rvCamping: loadCountyRvCampingServer(data.countySlug)', 'shared county RV projection');
requireText(county, 'getCountyMajorEvents(county.slug)', 'shared county planning loading');
requireText(county, 'const rvCamping = countyPlanning.rvCamping;', 'county RV payload consumption');
if (county.includes("@/data/county-rv-camping")) errors.push('County UI must not import a second RV server-function bridge into the client graph.');
requireText(county, 'Verified RV camping in {county.name}', 'county RV heading');
requireText(county, 'Missing amenities mean not yet verified, not unavailable.', 'unknown-not-false copy');
requireText(county, '/best-places-to-go-camping-in-texas#rv-camping', 'statewide RV authority link');
requireText(camping, 'id="rv-camping"', 'statewide RV anchor');
requireText(camping, 'rvEntries.length', 'statewide verified RV count');
requireText(camping, 'fullHookupCount', 'statewide full-hookup count');
requireText(camping, 'private RV resorts are not added simply because they appear in a third-party directory or a seed list', 'private-park verification rule');
requireText(camping, 'Use one database instead of thin doorway pages', 'doorway-page protection');

if (errors.length) {
  console.error('RV camping authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('RV camping authority validation passed: county pages reuse one existing server-function boundary for events and a lean verified RV projection, official source and reservation links remain visible, unknown amenities are not treated as false, and the canonical statewide camping guide owns RV discovery without doorway-page multiplication.');
