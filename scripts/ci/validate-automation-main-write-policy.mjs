import fs from 'node:fs';

const failures = [];

function read(path) {
  if (!fs.existsSync(path)) {
    failures.push(`Missing protected automation file: ${path}`);
    return '';
  }
  return fs.readFileSync(path, 'utf8');
}

function requireText(path, source, text) {
  if (!source.includes(text)) failures.push(`${path} must retain: ${text}`);
}

function forbidPattern(path, source, pattern, description) {
  if (pattern.test(source)) failures.push(`${path} must not ${description}`);
}

const dispatcherPath = 'scripts/ci/dispatch-validate-branch.sh';
const dispatcher = read(dispatcherPath);
for (const contract of [
  'gh workflow run "$workflow" --ref "$branch"',
  '--event workflow_dispatch',
  'select(.headSha ==',
  'gh run watch "$run_id" --exit-status',
]) {
  requireText(dispatcherPath, dispatcher, contract);
}

const eventsPath = '.github/workflows/sync-texas-events.yml';
const events = read(eventsPath);
for (const contract of [
  'pull-requests: write',
  'actions: write',
  'automation/texas-events-sync-${GITHUB_RUN_ID}',
  'gh pr create',
  'bash scripts/ci/dispatch-validate-branch.sh "$BRANCH"',
  'git rebase origin/main',
  'git push --force-with-lease origin "$BRANCH"',
  'gh pr merge "$PR_URL" --squash --delete-branch',
  'gh workflow run deploy-production.yml --ref main',
]) {
  requireText(eventsPath, events, contract);
}
forbidPattern(eventsPath, events, /git\s+push\s+origin\s+HEAD:main/, 'push generated event data directly to main');
forbidPattern(eventsPath, events, /git\s+push\s+origin\s+main(?:\s|$)/m, 'push generated event data directly to main');

const imageWorkflows = [
  '.github/workflows/explore-hero-assets.yml',
  '.github/workflows/state-park-hero-assets.yml',
  '.github/workflows/repair-explore-hero-gaps.yml',
  '.github/workflows/populate-missing-site-images.yml',
];

for (const path of imageWorkflows) {
  const source = read(path);
  for (const contract of [
    'pull-requests: write',
    'actions: write',
    'gh pr create',
    'item-level image rights',
    'bash scripts/ci/dispatch-validate-branch.sh "$BRANCH"',
  ]) {
    requireText(path, source, contract);
  }
  forbidPattern(path, source, /git\s+push\s+origin\s+HEAD:main/, 'push generated images directly to main');
  forbidPattern(path, source, /git\s+push\s+origin\s+main(?:\s|$)/m, 'push generated images directly to main');
  forbidPattern(path, source, /^\s*git\s+push\s*$/m, 'use an unscoped git push from a main checkout');
  forbidPattern(path, source, /gh\s+pr\s+merge/, 'auto-merge generated image changes; item-level rights review must remain explicit');
}

if (failures.length) {
  console.error('Automation main-write policy validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Automation main-write policy passed: daily event refreshes use exact-branch validation, current-main reconciliation and explicit deployment; generated image changes remain reviewable PRs with explicit item-level rights review and official validation.');
