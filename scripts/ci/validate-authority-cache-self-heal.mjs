import fs from 'node:fs';

const workflowPath = '.github/workflows/purge-authority-cache-after-deploy.yml';
const verifyWorkflowPath = '.github/workflows/verify-authority-freshness-after-deploy.yml';
const helperPath = 'scripts/ci/purge-cloudflare-cache.mjs';
const freshnessPath = 'scripts/ci/verify-authority-canonical-freshness.mjs';
const productionWorkflowPath = '.github/workflows/deploy-production.yml';
const failures = [];

for (const requiredPath of [workflowPath, verifyWorkflowPath]) {
  if (!fs.existsSync(requiredPath)) failures.push(`Missing authority cache workflow: ${requiredPath}`);
}

const workflow = fs.existsSync(workflowPath) ? fs.readFileSync(workflowPath, 'utf8') : '';
const verifyWorkflow = fs.existsSync(verifyWorkflowPath) ? fs.readFileSync(verifyWorkflowPath, 'utf8') : '';
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
  ["CLOUDFLARE_CACHE_API_TOKEN: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN }}", 'dedicated cache token'],
  ["CLOUDFLARE_CACHE_TOKEN_PRESENT: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN != '' }}", 'cache-token presence guard'],
  ['CLOUDFLARE_ZONE_NAME: texasdefined.com', 'fixed production zone'],
  ["CLOUDFLARE_PURGE_METRO_PROXIMITY: 'false'", 'authority-only purge scope'],
  ['ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'deployed-revision checkout'],
  ["if: ${{ env.CLOUDFLARE_CACHE_TOKEN_PRESENT == 'true' }}", 'dedicated-token purge guard'],
  ['node scripts/ci/purge-cloudflare-cache.mjs', 'targeted cache purge command'],
  ['node scripts/ci/verify-authority-canonical-freshness.mjs', 'post-purge freshness verification'],
  ["if [[ \"${FRESHNESS_OUTCOME}\" != 'success' ]]; then", 'freshness fail-closed gate'],
  ["if [[ \"${PURGE_OUTCOME}\" != 'success' ]]; then", 'global purge fail-closed gate'],
  ['The canonical authority pages were not proven fresh after deployment.', 'freshness failure message'],
  ['Authority global cache purge not proven', 'global purge failure message'],
  ['other Cloudflare edges may still serve stale authority HTML', 'multi-edge stale-cache protection'],
]) requireText(workflow, needle, label);

for (const [needle, label] of [
  ['workflow_run:', 'independent freshness workflow-run trigger'],
  ['- Purge authority cache after production deploy', 'freshness must wait for cache self-heal'],
  ['workflow_dispatch:', 'manual freshness trigger'],
  ["github.event.workflow_run.conclusion == 'success'", 'freshness requires successful cache self-heal'],
  ["github.event.workflow_run.head_branch == 'main'", 'freshness main-branch guard'],
  ['node scripts/ci/verify-authority-canonical-freshness.mjs', 'independent canonical freshness command'],
]) requireText(verifyWorkflow, needle, label);

if (verifyWorkflow.includes('- Deploy TexasDefined production')) {
  failures.push('Independent authority freshness must run after cache self-heal, not race the production deploy completion.');
}

for (const forbidden of ['purge_everything', 'purgeEverything', 'cache: purge-everything']) {
  if (workflow.includes(forbidden) || helper.includes(forbidden)) {
    failures.push(`Authority cache repair must remain targeted; forbidden broad-purge marker found: ${forbidden}`);
  }
}

for (const forbiddenFallback of [
  'secrets.CLOUDFLARE_DEPLOY_API_TOKEN',
  'secrets.CLOUDFLARE_API_TOKEN',
]) {
  if (workflow.includes(forbiddenFallback)) {
    failures.push(`Authority cache repair must not reuse deploy/general Cloudflare credentials: ${forbiddenFallback}`);
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
  "'Explore All 15 Major Texas River Basins'",
  "'Texas rivers at a glance: six quick answers'",
]) requireText(freshness, marker, `Texas rivers canonical freshness contract ${marker}`);

if (productionWorkflow.includes("CLOUDFLARE_CACHE_API_TOKEN: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN ||")) {
  failures.push('Primary production deployment must not fall back to deploy/general Cloudflare tokens for cache purge.');
}

if (failures.length) {
  console.error('Authority cache self-heal validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Authority cache self-heal protected: post-deploy repair requires a successful dedicated-token targeted purge and canonical freshness verification, independent verification waits for repair, broad purge is forbidden, and deploy/general Cloudflare credentials are never reused for cache invalidation.');
