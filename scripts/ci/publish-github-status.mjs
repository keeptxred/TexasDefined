const [context, outcome, successDescription, failureDescription = successDescription] = process.argv.slice(2);

if (!context || !outcome || !successDescription) {
  console.error('Usage: node scripts/ci/publish-github-status.mjs <context> <pending|success|failure|skipped> <success/pending description> [failure description]');
  process.exit(2);
}

if (outcome === 'skipped' || outcome === '') {
  console.log(`Skipping ${context} status publication because the stage did not run.`);
  process.exit(0);
}

const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const statusTargetOverride = process.env.STATUS_TARGET_SHA;
if (statusTargetOverride && !/^[a-f0-9]{40}$/i.test(statusTargetOverride)) {
  console.error('::error title=Invalid CI status target::STATUS_TARGET_SHA must be a 40-character commit SHA.');
  process.exit(2);
}
const sha = statusTargetOverride || process.env.GITHUB_SHA;

if (!token || !repository || !sha) {
  console.log(`::warning title=CI telemetry unavailable::Could not publish ${context} status because GitHub token/repository/SHA metadata is unavailable.`);
  process.exit(0);
}

const state = outcome === 'pending' ? 'pending' : outcome === 'success' ? 'success' : 'failure';
const description = state === 'failure' ? failureDescription : successDescription;
const runId = process.env.GITHUB_RUN_ID;
const targetUrl = runId && /^\d+$/.test(runId)
  ? `https://github.com/${repository}/actions/runs/${runId}`
  : undefined;

try {
  const response = await fetch(`https://api.github.com/repos/${repository}/statuses/${sha}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state, context, description: description.slice(0, 140), ...(targetUrl ? { target_url: targetUrl } : {}) }),
  });

  if (!response.ok) {
    const body = (await response.text()).slice(0, 500);
    console.log(`::warning title=CI telemetry failed::GitHub status '${context}' could not be published (${response.status}). ${body}`);
    process.exit(0);
  }

  console.log(`Published ${context}: ${state} — ${description}`);
} catch (error) {
  console.log(`::warning title=CI telemetry failed::GitHub status '${context}' could not be published: ${error instanceof Error ? error.message : String(error)}`);
}
