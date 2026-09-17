import fs from 'node:fs';

const registry = JSON.parse(fs.readFileSync('public/stay-nearby-destination-hotels.json', 'utf8'));
const bootstrap = fs.readFileSync('public/expedia-travel.js', 'utf8');
const readinessPanel = fs.readFileSync('src/components/admin/StayMonetizationReadiness.tsx', 'utf8');
const platformHealth = fs.readFileSync('src/routes/admin.platform-health.lazy.tsx', 'utf8');
const adminNav = fs.readFileSync('src/routes/admin.tsx', 'utf8');
const destinationSources = {
  fredericksburg: fs.readFileSync('src/data/small-town-destinations-wave1.ts', 'utf8'),
  'galveston-seawall': fs.readFileSync('src/data/viator-destination-expansion-wave9.ts', 'utf8'),
  'texas-ranger-hall-of-fame-museum-waco': fs.readFileSync('src/data/museum-expansion-waco.ts', 'utf8'),
};
const expectedContexts = Object.keys(destinationSources);
const errors = [];
const fail = (message) => errors.push(message);

if (registry.version !== 1) fail('Destination stay registry version must be 1.');
if (!/^2026-09-\d{2}$/.test(registry.reviewedAt || '')) fail('Destination stay registry must carry a September 2026 review date.');
if (registry.policy?.maxCards !== 3) fail('Destination stay registry maxCards must remain 3.');
if (!Array.isArray(registry.properties) || registry.properties.length !== 9) fail('Controlled destination cohort must contain exactly 9 properties.');

const ids = new Set();
for (const property of registry.properties || []) {
  if (!property.id || ids.has(property.id)) fail(`Duplicate or missing property id: ${property.id || '(missing)'}`);
  ids.add(property.id);
  if (property.status !== 'active') fail(`${property.id}: controlled cohort properties must be active.`);
  if (property.image !== null) fail(`${property.id}: destination imagery must remain null until rights-qualified imagery is governed.`);
  if (!Array.isArray(property.bookingTargets) || property.bookingTargets.length !== 1) fail(`${property.id}: expected one fail-closed Expedia booking target.`);
  const target = property.bookingTargets?.[0];
  if (target?.provider !== 'expedia' || target?.verified !== false || target?.affiliateUrl !== null) fail(`${property.id}: property deeplink must remain unverified/null until an account-generated affiliate URL is verified.`);
  if (!Array.isArray(property.contexts) || property.contexts.length !== 1) fail(`${property.id}: expected exactly one controlled destination context.`);
  const context = property.contexts?.[0];
  if (context?.kind !== 'destination' || !expectedContexts.includes(context?.key)) fail(`${property.id}: invalid destination context ${context?.kind}:${context?.key}.`);
  if (!Number.isInteger(context?.rank) || context.rank < 1 || context.rank > 3) fail(`${property.id}: destination rank must be 1-3.`);
  if (!context?.source?.url?.startsWith('https://')) fail(`${property.id}: source URL must be HTTPS.`);
  if (!/^2026-09-\d{2}$/.test(context?.source?.verifiedAt || '')) fail(`${property.id}: source verification date is missing or stale.`);
  if (!context?.geographicContext || !context?.proximity || !context?.differentiator) fail(`${property.id}: editorial context is incomplete.`);
}

for (const key of expectedContexts) {
  const contexts = (registry.properties || []).flatMap((property) => (property.contexts || [])
    .filter((context) => context.kind === 'destination' && context.key === key)
    .map((context) => ({ property, context })));
  if (contexts.length !== 3) fail(`${key}: expected exactly three curated stay choices, found ${contexts.length}.`);
  const ranks = contexts.map(({ context }) => context.rank).sort((a, b) => a - b).join(',');
  if (ranks !== '1,2,3') fail(`${key}: ranks must be exactly 1,2,3; found ${ranks}.`);
  if (!destinationSources[key].includes(`slug: "${key}"`)) fail(`${key}: destination source registry no longer contains the canonical slug.`);
}

for (const marker of [
  'const DESTINATION_STAY_DATA_URL = "/stay-nearby-destination-hotels.json"',
  'fetchRegistry(DESTINATION_STAY_DATA_URL)',
  'Array.isArray(destination?.properties)',
  'Useful stays near this destination',
  'function contextHeading(kind)',
]) if (!bootstrap.includes(marker)) fail(`Expedia/Stay Nearby bootstrap missing destination cohort marker: ${marker}`);

for (const marker of [
  'Stay monetization readiness',
  'does not invent traffic, booking, conversion or revenue performance',
  "fetch('/stay-nearby-hotels.json'",
  "fetch('/stay-nearby-destination-hotels.json'",
  'Verified property links',
  'Property imagery ready',
  'Indexability gate',
  'Editorial fallback',
  'Unverified deeplinks',
  'id="stay-monetization"',
]) if (!readinessPanel.includes(marker)) fail(`Stay monetization readiness panel missing marker: ${marker}`);

if (!platformHealth.includes("import { StayMonetizationReadiness } from '@/components/admin/StayMonetizationReadiness'")) fail('Platform Health must import the stay monetization readiness panel.');
if (!platformHealth.includes('<StayMonetizationReadiness />')) fail('Platform Health must render the stay monetization readiness panel.');
if (!adminNav.includes('href="/admin/platform-health#stay-monetization"')) fail('Admin navigation must expose stay monetization readiness inside Platform Health.');

if (errors.length) {
  console.error('Controlled destination stay cohort validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Controlled destination stay cohort validation passed: ${expectedContexts.length} deep destination pages, ${registry.properties.length} source-backed properties, exactly 3 choices per destination, no unverified property deeplinks, no ungoverned property imagery, runtime overlay loading enabled, and embedded Platform Health readiness reporting is wired without fabricated performance data.`);
