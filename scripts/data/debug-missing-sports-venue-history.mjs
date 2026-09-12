import fs from 'node:fs/promises';

const enrichmentFiles = [
  'src/data/sports-venue-enrichment.ts',
  'src/data/sports-venue-enrichment-batch2.ts',
  'src/data/sports-venue-enrichment-batch3.ts',
  'src/data/sports-venue-enrichment-batch4-racing.ts',
  'src/data/sports-venue-enrichment-batch5.ts',
  'src/data/sports-venue-enrichment-batch6.ts',
  'src/data/sports-venue-enrichment-batch7-major-completion.ts',
  'src/data/sports-venue-enrichment-batch8a-completion.ts',
  'src/data/sports-venue-enrichment-batch8b-completion.ts',
];
const remediationFiles = [
  'src/data/sports-venue-content-remediation.ts',
  'src/data/sports-venue-content-remediation-wave2.ts',
  'src/data/sports-venue-content-remediation-wave3.ts',
  'src/data/sports-venue-content-remediation-wave4.ts',
  'src/data/sports-venue-content-remediation-wave5.ts',
  'src/data/sports-venue-content-remediation-wave6.ts',
  'src/data/sports-venue-content-remediation-wave7.ts',
  'src/data/sports-venue-content-remediation-wave8.ts',
  'src/data/sports-venue-content-remediation-wave9.ts',
];
const parseEntries = (source) => [...source.matchAll(/^\s{2}'([^']+)': \{([\s\S]*?)(?=^\s{2}'[^']+': \{|^\};)/gm)].map((m) => ({ slug: m[1], body: m[2] }));
const hasHistory = (body) => /^\s{4}history:\s*/m.test(body);

const base = new Map();
for (const file of enrichmentFiles) {
  const source = await fs.readFile(file, 'utf8');
  for (const entry of parseEntries(source)) base.set(entry.slug, { ...entry, file });
}
const remediated = new Set();
for (const file of remediationFiles) {
  const source = await fs.readFile(file, 'utf8');
  const marker = source.indexOf('export const SPORTS_VENUE_CONTENT_REMEDIATION');
  if (marker < 0) continue;
  for (const entry of parseEntries(source.slice(marker))) remediated.add(entry.slug);
}
const baseOnly = [...base.values()].filter(({ slug }) => !remediated.has(slug));
const missing = baseOnly.filter(({ body }) => !hasHistory(body));
console.log(`base-only=${baseOnly.length}`);
console.log(`base-only slugs: ${baseOnly.map(({ slug }) => slug).sort().join(', ')}`);
console.log(`missing history=${missing.length}`);
for (const item of missing.sort((a, b) => a.slug.localeCompare(b.slug))) console.log(`${item.slug} :: ${item.file}`);
if (missing.length !== 5) process.exitCode = 2;
