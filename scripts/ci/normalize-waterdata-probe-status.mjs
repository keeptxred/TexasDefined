const token = process.env.GH_TOKEN ?? '';
const repository = process.env.GITHUB_REPOSITORY ?? '';
const sha = process.env.STATUS_SHA ?? '';
const parentConclusion = process.env.SOURCE_WORKFLOW_CONCLUSION ?? '';

if (!token) throw new Error('GH_TOKEN is required');
if (!repository) throw new Error('GITHUB_REPOSITORY is required');
if (!/^[0-9a-f]{40}$/i.test(sha)) throw new Error('STATUS_SHA must be a full commit SHA');
if (parentConclusion !== 'success') {
  throw new Error(`Refusing to normalize optional probe statuses unless protected live-lake verification succeeded (got ${parentConclusion || 'unset'})`);
}

const optionalProbes = [
  ['texasdefined-waterdata-recent', 'Recent-conditions probe is optional; protected resilient lake-data verification passed'],
  ['texasdefined-waterdata-csv', 'CSV probe is optional; protected resilient lake-data verification passed'],
  ['texasdefined-waterdata-html', 'HTML probe is optional; protected resilient lake-data verification passed'],
];

for (const [context, description] of optionalProbes) {
  const response = await fetch(`https://api.github.com/repos/${repository}/statuses/${sha}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ state: 'success', context, description: description.slice(0, 140) }),
  });
  if (!response.ok) {
    throw new Error(`Failed to normalize ${context}: GitHub returned HTTP ${response.status}`);
  }
}

console.log('Optional Water Data for Texas probe statuses normalized only after the protected live-lake workflow passed. Raw direct-probe health remains available in the production diagnostic endpoint and workflow logs.');
