import fs from 'node:fs';

const stubs = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs-2.ts', 'utf8');
const loader = fs.readFileSync('src/data/fixtures/lazy-evergreen.ts', 'utf8');
const articleSource = fs.readFileSync('src/data/fixtures/texas-explained-support-articles-2.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const llms = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationMagnets = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const failures = [];

const railroadHistory = 'https://www.tshaonline.org/handbook/entries/railroads';
const urbanizationHistory = 'https://www.tshaonline.org/handbook/entries/urbanization';
const currentRailPlan = 'https://www.txdot.gov/projects/projects-studies/statewide/texas-rail-plan-update.html';
const railroadMachineUrl = 'https://texasdefined.com/article/texas-railroads-town-growth-explained';

const railroadStubMatch = stubs.match(/export const texasRailroadsTownGrowthGuideStub:[\s\S]*?export const texasRuralWellsWaterGuideStub:/);
const railroadStub = railroadStubMatch?.[0] ?? '';

for (const token of [
  'slug: "texas-railroads-town-growth-explained"',
  'sourceName: "Texas State Historical Association — Railroads"',
  `sourceUrl: "${railroadHistory}"`,
]) {
  if (!railroadStub.includes(token)) failures.push(`Texas railroad history stub contract missing: ${token}`);
}

if (railroadStub.includes('sourceName: "Texas Department of Transportation"')) {
  failures.push('Texas railroad history stub must not use current TxDOT planning as the primary historical authority.');
}

for (const token of [
  'texasRailroadsTownGrowthGuideStub',
  'texasRailroadHistoryOfficialLinks',
  `href: "${railroadHistory}"`,
  `href: "${urbanizationHistory}"`,
  `href: "${currentRailPlan}"`,
  'sourceName: "Texas State Historical Association — Railroads"',
  `sourceUrl: "${railroadHistory}"`,
]) {
  if (!loader.includes(token)) failures.push(`Texas railroad history delivery contract missing: ${token}`);
}

for (const token of [
  'slug: "texas-railroads-town-growth-explained"',
  "TxDOT's 2024 Texas Rail Plan places the beginning of continuous railroad service in Texas in the 1850s",
  'A community connected to a major route could gain easier access to distant markets, travelers, mail, supplies and investment.',
  'Passenger rail is no longer the dominant way Texans move between most communities, but freight rail remains a major part of the state\'s transportation system.',
]) {
  if (!articleSource.includes(token)) failures.push(`Texas railroad history article contract missing: ${token}`);
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRoute.includes(token)) failures.push(`Article route source/citation contract missing: ${token}`);
}

for (const token of [
  `- Texas railroad town-growth history: ${railroadMachineUrl}`,
  "Treat TSHA's Handbook of Texas railroad and urbanization entries as controlling for historical development context.",
  "Treat TxDOT's current Texas Rail Plan and current rail-system sources as controlling for present-day network, planning, project and operational information.",
  'Do not use the evergreen history article as current passenger-service, freight-operations, project-status, schedule or safety guidance.',
]) {
  if (!llms.includes(token)) failures.push(`Texas railroad machine-discovery guidance missing: ${token}`);
}

const railroadMagnets = citationMagnets.resources?.filter((resource) => resource.url === railroadMachineUrl) ?? [];
if (railroadMagnets.length !== 1) {
  failures.push(`Texas railroad citation-magnet entry count must be exactly one; found ${railroadMagnets.length}.`);
} else {
  const railroadMagnet = railroadMagnets[0];
  for (const token of [
    'TSHA-railroad-history',
    'TSHA-urbanization-history',
    'TxDOT-current-rail-network',
    'official-source-precedence',
    'Article-schema-citation',
    'current-operations-caveat',
  ]) {
    if (!railroadMagnet.trust?.includes(token)) failures.push(`Texas railroad citation-magnet trust contract missing: ${token}`);
  }
  if (railroadMagnet.trust?.includes('TxDOT-primary-source')) {
    failures.push('Texas railroad citation magnet must not present TxDOT as the primary historical source.');
  }
}

if (failures.length) {
  console.error('Texas railroad town-growth authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas railroad town-growth authority validation passed: TSHA controls historical railroad and urbanization claims, TxDOT controls current rail-system information, the Article citation contract stays intact, and both machine-discovery surfaces remain fail-closed.');
