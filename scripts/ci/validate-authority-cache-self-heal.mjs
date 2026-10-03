import fs from 'node:fs';

const workflowPath = '.github/workflows/purge-authority-cache-after-deploy.yml';
const helperPath = 'scripts/ci/purge-cloudflare-cache.mjs';
const freshnessPath = 'scripts/ci/verify-authority-canonical-freshness.mjs';
const productionWorkflowPath = '.github/workflows/deploy-production.yml';
const failures = [];

if (!fs.existsSync(workflowPath)) {
  failures.push(`Missing authority cache self-heal workflow: ${workflowPath}`);
}

const workflow = fs.existsSync(workflowPath) ? fs.readFileSync(workflowPath, 'utf8') : '';
const helper = fs.readFileSync(helperPath, 'utf8');
const freshness = fs.readFileSync(freshnessPath, 'utf8');
const productionWorkflow = fs.readFileSync(productionWorkflowPath, 'utf8');

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

for (const [needle, label] of [
  ['workflow_run:', 'post-deploy trigger'],
  ['- Deploy TexasDefined production', 'canonical deploy dependency'],
  ['workflow_dispatch:', 'manual repair trigger'],
  ["github.event.workflow_run.head_branch == 'main'", 'main-branch workflow-run guard'],
  ['environment: texasdefined-publication', 'publication environment protection'],
  ["CLOUDFLARE_CACHE_API_TOKEN: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN || secrets.CLOUDFLARE_DEPLOY_API_TOKEN || secrets.CLOUDFLARE_API_TOKEN }}", 'permission-checked cache-token fallback'],
  ['CLOUDFLARE_ZONE_NAME: texasdefined.com', 'fixed production zone'],
  ["CLOUDFLARE_PURGE_METRO_PROXIMITY: 'false'", 'authority-only purge scope'],
  ['ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'deployed-revision checkout'],
  ['node scripts/ci/purge-cloudflare-cache.mjs', 'targeted cache purge command'],
  ['node scripts/ci/verify-authority-canonical-freshness.mjs', 'post-purge freshness verification'],
  ['Authority cache self-heal failed', 'fail-closed aggregate result'],
]) requireText(workflow, needle, label);

for (const forbidden of ['purge_everything', 'purgeEverything', 'cache: purge-everything']) {
  if (workflow.includes(forbidden) || helper.includes(forbidden)) {
    failures.push(`Authority cache repair must remain targeted; forbidden broad-purge marker found: ${forbidden}`);
  }
}

for (const path of [
  '/article/texas-rivers-explained',
  '/article/texas-rio-grande-river-guide',
  '/article/texas-six-man-football-rules-explained',
]) requireText(helper, path, `governed authority purge URL ${path}`);

for (const marker of [
  "url: 'https://texasdefined.com/article/texas-rivers-explained'",
  "'Texas Rivers Explained'",
  "'Start with the map'",
  "'Open the full 15-basin comparison'",
  "'Texas rivers at a glance'",
]) requireText(freshness, marker, `Texas rivers canonical freshness contract ${marker}`);

// Keep the primary deployment least-privilege rule intact. The permission-checked
// fallback is allowed only in the isolated post-deploy repair workflow above.
if (productionWorkflow.includes("CLOUDFLARE_CACHE_API_TOKEN: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN ||")) {
  failures.push('Primary production deployment must not fall back to deploy/general Cloudflare tokens for cache purge.');
}

if (failures.length) {
  console.error('Authority cache self-heal validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Authority cache self-heal protected: post-deploy targeted purge, permission-checked fallback, canonical freshness verification, main-branch guard and least-privilege primary deployment are intact.');
