import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };

const release = read('src/data/painted-church-release-review.ts');
const route = read('src/routes/explore.painted-churches.release-review.tsx');
const publication = read('src/lib/painted-church-publication.ts');
const deploy = read('.github/workflows/deploy-production.yml');
const preindexWorkflow = read('.github/workflows/painted-churches-preindex.yml');

for (const token of ['church-launch-floor','current-main','ci-build-live','owner-approval','public-indexing-switch']) requireText(release, token, 'Release contract');
requireText(release, 'paintedChurchIndexLaunchReady', 'Release contract');
requireText(release, 'complete: false', 'Release contract must retain external/manual blockers');
requireText(route, 'Indexing requires more than excellent content.', 'Release review route');
requireText(route, 'No inferred approvals.', 'Release review route');
requireText(publication, '/explore/painted-churches/release-review', 'Permanent release-audit noindex');
requireText(publication, 'PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false', 'Search publication default');
requireText(deploy, "env.PUBLIC_INDEXING_ENABLED == 'true'", 'Operational publication gate');
requireText(preindexWorkflow, 'git merge-base --is-ancestor origin/main HEAD', 'Release-base freshness gate');

if (failures.length) {
  console.error(`Painted Churches release-review validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches release controls protected: documentary readiness, current-main ancestry, CI/live verification, explicit owner approval and final indexing switch remain separate gates.');
