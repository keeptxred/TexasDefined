// Wait for the canonical protected deployment of the *exact* source commit.
// Path-filtered push workflows must not claim live production represents new
// source before Deploy TexasDefined production has finished successfully.
const sha = process.env.PRODUCTION_COMMIT_SHA || process.env.GITHUB_SHA;
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!/^[a-f0-9]{40}$/i.test(sha || '') || !/^[^/]+\/[^/]+$/.test(repository || '') || !token) {
  console.error('Missing valid production commit, repository, or GitHub token for deployment gate.');
  process.exit(2);
}
const maxAttempts = 72; // Up to 12 minutes of serialized deployment queue time.
const intervalMs = 10_000;
const url = `https://api.github.com/repos/${repository}/commits/${sha}/status`;
let lastState = 'missing';
for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    console.error(`GitHub production status lookup failed: HTTP ${response.status}, SHA=${sha}`);
    process.exit(1);
  }
  const data = await response.json();
  lastState = (data.statuses || []).find(s => s.context === 'texasdefined-production')?.state || 'missing';
  console.log(`Protected production status ${sha} attempt ${attempt}/${maxAttempts}: ${lastState}`);
  if (lastState === 'success') {
    console.log(`Exact-commit deployment gate passed for ${sha}.`);
    process.exit(0);
  }
  if (lastState === 'failure' || lastState === 'error') {
    console.error(`Protected deployment failed for ${sha}; refusing live production assertions.`);
    process.exit(1);
  }
  if (attempt < maxAttempts) await new Promise(resolve => setTimeout(resolve, intervalMs));
}
console.error(`Timed out waiting for exact-commit texasdefined-production=success on ${sha}; last state: ${lastState}`);
process.exit(1);
