import fs from 'node:fs';

const errors = [];
const required = [
  'src/platform/internal-link-test-corpus.ts',
  'src/components/admin/InternalLinkGoldenCorpus.tsx',
  'src/routes/api.internal-link-tests.ts',
  'src/routes/admin.internal-link-tests.tsx',
  'src/routes/admin.internal-link-tests.lazy.tsx',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing golden-corpus file: ${path}`);
if (!errors.length) {
  const corpus = fs.readFileSync(required[0], 'utf8');
  const panel = fs.readFileSync(required[1], 'utf8');
  const api = fs.readFileSync(required[2], 'utf8');
  const page = `${fs.readFileSync(required[3], 'utf8')}\n${fs.readFileSync(required[4], 'utf8')}`;
  for (const id of ['canonical-travel-place','county-context-disambiguation','topic-priority','county-common-word-regression','county-explicit-common-name','unsafe-ambiguity-rejected','self-link-prevention','exposure-penalty']) {
    if (!corpus.includes(`id: '${id}'`)) errors.push(`Missing golden test case: ${id}`);
  }
  for (const collision of ['Live Oak County','Orange County','Wood County','Bee County','Falls County']) {
    if (!corpus.includes(collision)) errors.push(`Missing county collision fixture: ${collision}`);
  }
  for (const feature of ['runInternalLinkGoldenCorpus','resolveInternalEntityLinks','expectedEntityIds','expectedRejectedAmbiguous','expectedReason','passedCount','failedCount']) {
    if (!corpus.includes(feature)) errors.push(`Golden corpus feature missing: ${feature}`);
  }
  for (const feature of ['runInternalLinkGoldenCorpus','Golden link-quality corpus','Expected:','Actual:']) if (!panel.includes(feature)) errors.push(`Golden corpus panel feature missing: ${feature}`);
  for (const feature of ["createFileRoute('/api/internal-link-tests')",'runInternalLinkGoldenCorpus','status: report.passed ? 200 : 503','no-store','noindex, nofollow']) if (!api.includes(feature)) errors.push(`Golden corpus API feature missing: ${feature}`);
  for (const feature of ["createFileRoute('/admin/internal-link-tests')",'InternalLinkGoldenCorpus','diagnostic and read-only','/admin/platform-health','noindex,nofollow']) if (!page.includes(feature)) errors.push(`Golden corpus admin feature missing: ${feature}`);
}

if (errors.length) {
  console.error('Internal-link golden-corpus validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Phase 2 golden corpus, county collision regressions, diagnostics API, and read-only admin test page are protected.');
