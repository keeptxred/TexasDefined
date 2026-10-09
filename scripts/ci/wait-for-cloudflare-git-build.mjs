const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;
const eventName = process.env.GITHUB_EVENT_NAME;
const apiBase = process.env.GITHUB_API_URL || 'https://api.github.com';
const checkName = 'Workers Builds: texasdefined-site';
const appSlug = 'cloudflare-workers-and-pages';
const discoveryMs = Number(process.env.CLOUDFLARE_GIT_BUILD_DISCOVERY_MS || 30000);
const settleMs = Number(process.env.CLOUDFLARE_GIT_BUILD_SETTLE_MS || 240000);
const pollMs = Number(process.env.CLOUDFLARE_GIT_BUILD_POLL_MS || 5000);

if (eventName !== 'push') {
  console.log(`Cloudflare Git-build serialization skipped for ${eventName || 'unknown'} event.`);
  process.exit(0);
}
if (!token || !repository || !sha) {
  throw new Error('Cloudflare Git-build serialization requires GITHUB_TOKEN, GITHUB_REPOSITORY and GITHUB_SHA.');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function listChecks() {
  const response = await fetch(
    `${apiBase}/repos/${repository}/commits/${sha}/check-runs?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: AbortSignal.timeout(15000),
    },
  );
  if (!response.ok) {
    throw new Error(`GitHub check-run query failed: HTTP ${response.status} ${response.statusText}`);
  }
  const payload = await response.json();
  return (payload.check_runs || []).filter(
    (check) => check.name === checkName && check.app?.slug === appSlug,
  );
}

const discoveryDeadline = Date.now() + discoveryMs;
let checks = [];
while (Date.now() <= discoveryDeadline) {
  checks = await listChecks();
  if (checks.length) break;
  await sleep(pollMs);
}

if (!checks.length) {
  console.log(`No ${checkName} check appeared for ${sha}; continuing because the external Git integration may be disabled or path-filtered.`);
  process.exit(0);
}

console.log(`Detected ${checks.length} Cloudflare Git build check(s) for ${sha}; waiting for completion before protected deployment.`);
const settleDeadline = Date.now() + settleMs;
while (Date.now() <= settleDeadline) {
  checks = await listChecks();
  const pending = checks.filter((check) => check.status !== 'completed');
  if (!pending.length) {
    const outcomes = checks.map((check) => `${check.conclusion || 'unknown'}#${check.id}`).join(', ');
    console.log(`Cloudflare Git build settled before protected deployment: ${outcomes}.`);
    process.exit(0);
  }
  console.log(`Cloudflare Git build still active: ${pending.map((check) => `${check.status}#${check.id}`).join(', ')}`);
  await sleep(pollMs);
}

throw new Error(`Cloudflare Git build did not settle within ${settleMs}ms; refusing to race an external production deployment.`);
