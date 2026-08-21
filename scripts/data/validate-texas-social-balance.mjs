import fs from 'node:fs';

const source = fs.readFileSync('src/data/knowledge-bank/social-batch.ts', 'utf8');
const failures = [];

if (!source.includes('maxPerDomain?: number')) failures.push('Social batch options must expose a maxPerDomain override.');
if (!source.includes('const defaultDomainCap')) failures.push('Social batching must define a default per-domain cap.');
if (!source.includes('const domainCounts')) failures.push('Social batching must track selected records per domain.');
if (!source.includes('>= maxPerDomain')) failures.push('Social batching must enforce the per-domain cap during fill selection.');
if (!source.includes('usedDomains.has(record.domain)')) failures.push('Social batching must retain the first-pass domain diversity rule.');
if (!source.includes('rotationSeed?: string')) failures.push('Social batch options must expose a deterministic rotationSeed override.');
if (!source.includes('function rotationRank')) failures.push('Social batching must define a deterministic equal-score rotation rank.');
if (!source.includes('const rotationSeed = options.rotationSeed ?? asOfDate')) failures.push('Social batching must rotate equal-score candidates daily by default.');
if (!source.includes('rotationRank(a.id, rotationSeed)')) failures.push('Social batching must use the rotation rank as an equal-score tie breaker.');
if (!source.includes('renderTexasSocialPost(record, format, asOfDate)')) failures.push('Social batching must pass its freshness date through to direct rendering.');
if (!source.includes('TEXAS_KNOWLEDGE_CATALOG')) failures.push('Default social batching must use the canonical Knowledge Bank catalog.');

if (failures.length) {
  console.error('Texas social balance validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Texas social balance validation passed: domain-diverse capped selection and deterministic daily rotation are enforced.');
