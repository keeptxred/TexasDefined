import fs from 'node:fs';

const stubs = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs-2.ts', 'utf8');
const loader = fs.readFileSync('src/data/fixtures/lazy-evergreen.ts', 'utf8');
const articleSource = fs.readFileSync('src/data/fixtures/texas-explained-support-articles-2.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const failures = [];

const railroadHistory = 'https://www.tshaonline.org/handbook/entries/railroads';
const urbanizationHistory = 'https://www.tshaonline.org/handbook/entries/urbanization';
const currentRailPlan = 'https://www.txdot.gov/projects/projects-studies/statewide/texas-rail-plan-update.html';

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

if (failures.length) {
  console.error('Texas railroad town-growth authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas railroad town-growth authority validation passed: TSHA controls the historical railroad and urbanization claims, TxDOT remains the current rail-system source, and the canonical Article citation contract stays intact.');
