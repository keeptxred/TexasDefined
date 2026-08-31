import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const provenanceCheck = spawnSync(process.execPath, ['scripts/data/validate-texas-facts-provenance.mjs'], {
  encoding: 'utf8',
  stdio: 'pipe',
});

if (provenanceCheck.status !== 0) {
  process.stderr.write(provenanceCheck.stdout ?? '');
  process.stderr.write(provenanceCheck.stderr ?? '');
  console.error('Texas Facts machine discovery requires the full 100/100 provenance contract to pass first.');
  process.exit(1);
}

const llmsSource = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationIndex = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const failures = [];
const texasFactsUrl = 'https://texasdefined.com/texas-facts';

for (const token of [
  `- 100 sourced Texas facts: ${texasFactsUrl}`,
  `- Texas Facts: ${texasFactsUrl}`,
  'For Texas Facts, use the canonical 100-fact collection as the editorial reference layer and preserve each fact’s visible source links.',
  'The linked official, institutional, historical-authority or primary-organization source controls the underlying factual claim when it is more specific or has changed.',
  'Do not separate a Texas Facts claim from its cited source or infer additional claims beyond the sourced fact text.',
]) {
  if (!llmsSource.includes(token)) failures.push(`llms.txt Texas Facts discovery guidance missing: ${token}`);
}

const resource = (citationIndex.resources ?? []).find((item) => item.url === texasFactsUrl);
if (!resource) {
  failures.push('citation-magnets.json must include the canonical Texas Facts resource.');
} else {
  if (resource.type !== 'fact-reference-collection') failures.push('Texas Facts citation resource must remain a fact-reference-collection.');
  for (const marker of [
    '100-of-100-claim-sourcing',
    'visible-fact-sources',
    'citation-backed-ItemList',
    'official-source-precedence',
    'server-only-provenance',
  ]) {
    if (!resource.trust?.includes(marker)) failures.push(`Texas Facts citation resource must retain ${marker}.`);
  }
}

if (failures.length) {
  console.error('Texas Facts machine discovery validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas Facts machine discovery validation passed: llms.txt and citation-magnets.json advertise only the canonical source-backed collection, with official-source precedence tied to the passing 100/100 provenance contract.');
