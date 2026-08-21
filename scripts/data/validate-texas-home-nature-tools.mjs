import fs from 'node:fs';

const baseTools = fs.readFileSync('src/data/knowledge-bank/home-nature-tools.ts', 'utf8');
const expandedTools = fs.readFileSync('src/data/knowledge-bank/home-nature-tools-expanded.ts', 'utf8');
const tools = `${baseTools}\n${expandedTools}`;
const sources = fs.readFileSync('src/data/knowledge-bank/sources.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const routes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const failures = [];

if (!barrel.includes("export * from './home-nature-tools'")) failures.push('Knowledge Bank barrel must export staged home/nature tools.');
if (!barrel.includes("export * from './home-nature-tools-expanded'")) failures.push('Knowledge Bank barrel must export expanded staged home/nature tools.');
if (!/id:\s*['\"]ready-gov['\"]/.test(sources)) failures.push('Ready.gov must be registered as a canonical emergency-planning source.');
if (!sources.includes('https://www.ready.gov/')) failures.push('Ready.gov source must use its canonical HTTPS origin.');

const requiredToolIds = [
  'texas-emergency-water-planner',
  'texas-pool-volume-calculator',
  'texas-pool-water-loss-calculator',
  'texas-hurricane-72-48-24-checklist',
  'texas-freeze-prep-checklist',
  'texas-hurricane-supply-calculator',
  'texas-pool-opening-refill-calculator',
];
for (const id of requiredToolIds) if (!tools.includes(`id: '${id}'`)) failures.push(`Missing staged home/nature tool: ${id}`);

const plannedPaths = [...tools.matchAll(/plannedPath:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
if (plannedPaths.length !== requiredToolIds.length) failures.push(`Expected ${requiredToolIds.length} staged tool paths; found ${plannedPaths.length}.`);
if (new Set(plannedPaths).size !== plannedPaths.length) failures.push('Staged home/nature tool paths must be unique.');
for (const path of plannedPaths) {
  if (routes.includes(`'${path}'`) || routes.includes(`\"${path}\"`)) failures.push(`Staged tool leaked into public route registry: ${path}`);
  const slug = path.replace(/^\//, '');
  if (fs.existsSync(`src/routes/${slug}.tsx`)) failures.push(`Staged tool has a public file route before publication approval: ${path}`);
}

// Require runtime tool objects to remain staged; type declarations use a
// semicolon while actual object fields end with a comma.
const stagedCount = (tools.match(/publicationState:\s*['\"]staged['\"]\s*,/g) ?? []).length;
if (stagedCount !== requiredToolIds.length) failures.push(`Every home/nature tool must remain staged; found ${stagedCount} staged of ${requiredToolIds.length}.`);

if (!baseTools.includes('const GALLONS_PER_CUBIC_FOOT = 7.48052')) failures.push('Pool volume/loss tools must use the cubic-foot-to-gallon conversion constant.');
if (!baseTools.includes('const positiveInteger')) failures.push('Emergency-water planner must enforce whole-number household and day counts.');
if (!baseTools.includes("positiveInteger(input.people, 'people')")) failures.push('Emergency-water planner must validate people as a positive integer.');
if (!baseTools.includes("positiveInteger(input.days ?? 3, 'days')")) failures.push('Emergency-water planner must validate days as a positive integer with a three-day default.');
if (!baseTools.includes('input.gallonsPerPersonPerDay ?? 1')) failures.push('Emergency-water planner must default to one gallon per person per day.');
if (!baseTools.includes("sourceIds: ['ready-gov', 'tdem-emergency']")) failures.push('Emergency-water tool must retain Ready.gov and TDEM source provenance.');
if (!tools.includes('https://www.ready.gov/sites/default/files/documents/files/checklist3.pdf')) failures.push('Emergency guidance must retain claim-specific Ready.gov evidence.');
if (!tools.includes("reviewBy: '2027-08-01'")) failures.push('Source-backed staged preparedness tools must carry an explicit review date.');
if (!baseTools.includes('does not predict evaporation from weather')) failures.push('Pool water-loss engine must explicitly avoid claiming weather-based evaporation diagnosis.');
if (!baseTools.includes('hoursBefore: 72') || !baseTools.includes('hoursBefore: 48') || !baseTools.includes('hoursBefore: 24')) failures.push('Hurricane checklist must contain 72/48/24 organizational stages.');
if (!baseTools.includes('Follow evacuation orders')) failures.push('Hurricane checklist must explicitly defer to evacuation orders/local officials.');
if (!tools.includes('https://www.weather.gov/safety/hurricane')) failures.push('Hurricane checklist tool must retain claim-specific NWS hurricane evidence.');

if (!expandedTools.includes('estimateHurricaneSupplyBaseline')) failures.push('Expanded tools must include the hurricane supply baseline engine.');
if (!expandedTools.includes('foodPersonDays: input.people * water.days')) failures.push('Hurricane supply planner must represent food as person-days rather than invented meal/package counts.');
if (!expandedTools.includes('estimatePoolOpeningRefillGallons')) failures.push('Expanded tools must include the pool opening refill engine.');
if (!expandedTools.includes('estimatePoolWaterLossGallons')) failures.push('Pool opening refill must reuse the shared measured-water-change conversion.');
if (!expandedTools.includes('does not calculate chemical doses')) failures.push('Pool opening tool must explicitly avoid generic chemical dosing.');

const evidenceUrls = [...tools.matchAll(/https:\/\/[^'\"]+/g)].map((match) => match[0]);
for (const url of evidenceUrls) if (!url.startsWith('https://')) failures.push(`Tool evidence URL must use HTTPS: ${url}`);

if (failures.length) {
  console.error('Texas home/nature tool validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas home/nature tool validation passed: ${requiredToolIds.length} staged tools, ${plannedPaths.length} unique non-public planned paths, Ready.gov/NWS evidence, review windows, and publication-safety guards.`);
