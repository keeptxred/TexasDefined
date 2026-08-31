import fs from 'node:fs';

const factData = fs.readFileSync('src/data/texas-essential-facts.ts', 'utf8');
const sourceData = fs.readFileSync('src/data/texas-essential-fact-sources.ts', 'utf8');
const provenanceData = fs.readFileSync('src/data/texas-essential-facts-provenance.ts', 'utf8');
const routeData = fs.readFileSync('src/routes/texas-facts.tsx', 'utf8');
const lazyData = fs.readFileSync('src/routes/texas-facts.lazy.tsx', 'utf8');

const failures = [];
const factIds = [...factData.matchAll(/\bfact\((\d+),/g)].map((match) => Number(match[1]));
const assignmentIds = [...sourceData.matchAll(/^\s*(\d+): \[/gm)].map((match) => Number(match[1]));
const expectedIds = Array.from({ length: 100 }, (_, index) => index + 1);
const unique = (values) => [...new Set(values)].sort((a, b) => a - b);

if (factIds.length !== 100 || JSON.stringify(unique(factIds)) !== JSON.stringify(expectedIds)) {
  failures.push(`Texas Facts must retain exactly 100 uniquely numbered facts from 1–100; found ${factIds.length}.`);
}
if (assignmentIds.length !== 100 || JSON.stringify(unique(assignmentIds)) !== JSON.stringify(expectedIds)) {
  failures.push(`Texas Facts source assignments must cover every fact ID 1–100 exactly once; found ${assignmentIds.length}.`);
}

for (const token of [
  "const checkedAt = '2026-08-30';",
  "'official-government'",
  "'institutional'",
  "'historical-authority'",
  "'primary-organization'",
  'if (!keys?.length) throw new Error',
  'TEXAS_ESSENTIAL_FACT_SOURCE_ASSIGNMENTS',
  'TEXAS_ESSENTIAL_FACT_SOURCE_REGISTRY',
]) {
  if (!sourceData.includes(token)) failures.push(`Texas Facts source registry contract missing: ${token}`);
}

const sourceRows = [...sourceData.matchAll(/\w+: source\('([^']+)', '([^']+)', '([^']+)'\)/g)];
if (sourceRows.length < 60) failures.push(`Texas Facts must retain a diverse authoritative source registry; found only ${sourceRows.length} entries.`);
for (const [, name, url, kind] of sourceRows) {
  if (!name.trim()) failures.push('Texas Facts source registry contains an unnamed source.');
  if (!url.startsWith('https://')) failures.push(`Texas Facts source URL must use HTTPS: ${url}`);
  if (!['official-government', 'institutional', 'historical-authority', 'primary-organization'].includes(kind)) failures.push(`Texas Facts source kind is unsupported: ${kind}`);
}

for (const requiredSource of [
  'https://www.tsl.texas.gov/ref/abouttx/sixflags.html',
  'https://www.tshaonline.org/handbook/entries/texas-revolution',
  'https://data.census.gov/profile?g=040XX00US48&q=Texas',
  'https://www.usgs.gov/educational-resources/highest-and-lowest-elevations',
  'https://www.govinfo.gov/content/pkg/STATUTE-84/pdf/STATUTE-84-Pg119.pdf',
  'https://www.tsl.texas.gov/ref/abouttx/symbols',
  'https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf',
  'https://www.nasa.gov/reference/johnson-space-center/',
  'https://www.txcourts.gov/media/1460294/judicial-system-pamphlet-2025.pdf',
  'https://statutes.capitol.texas.gov/Docs/CN/htm/CN.3.htm',
  'https://statutes.capitol.texas.gov/?artSec=3.002&chapter=FA.3&code=FA&tab=1',
  'https://tspb.texas.gov/prop/tc/tc-history/myths-legends/index.html',
]) {
  if (!sourceData.includes(requiredSource)) failures.push(`Texas Facts high-value authoritative source missing: ${requiredSource}`);
}

for (const token of [
  "import { TEXAS_ESSENTIAL_FACTS } from './texas-essential-facts';",
  "import { texasEssentialFactSources, type TexasFactSource } from './texas-essential-fact-sources';",
  'PROVENANCED_TEXAS_ESSENTIAL_FACTS',
  'sources: texasEssentialFactSources(item.id)',
]) {
  if (!provenanceData.includes(token)) failures.push(`Texas Facts provenance join contract missing: ${token}`);
}

for (const token of [
  "import { PROVENANCED_TEXAS_ESSENTIAL_FACTS } from '@/data/texas-essential-facts-provenance';",
  "'@type': 'ItemList'",
  "'@type': 'CreativeWork'",
  'numberOfItems: factItems.length',
  'citation: item.sources.map((source) => source.url)',
  "mainEntity: { '@id': `${pageUrl}#facts` }",
]) {
  if (!routeData.includes(token)) failures.push(`Texas Facts provenance-backed schema contract missing: ${token}`);
}
if (routeData.includes("'@type': 'ClaimReview'")) failures.push('Texas Facts must not emit ClaimReview schema; the page is a sourced reference collection, not a fact-check verdict system.');

for (const token of [
  "PROVENANCED_TEXAS_ESSENTIAL_FACTS.filter",
  'item.sources.map((source)',
  'Source: {source.name} ↗',
  'target="_blank"',
  'rel="noreferrer"',
]) {
  if (!lazyData.includes(token)) failures.push(`Texas Facts visible source contract missing: ${token}`);
}

if (failures.length) {
  console.error('Texas Facts provenance validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Texas Facts provenance validation passed: 100/100 facts have fail-closed claim-level source assignments, visible source links and citation-backed ItemList schema; ClaimReview remains prohibited.`);
