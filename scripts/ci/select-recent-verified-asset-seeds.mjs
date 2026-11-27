import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const REPO = 'keeptxred/TexasDefined';
const MAX_AGE_MS = 72 * 60 * 60 * 1000;
// An eligible historical artifact supplies candidate paths only. The
// immutable run must be a recent successful protected main release, not a
// PR build, failed release, future record or untrusted fork.
export function selectRecentVerifiedAssetSeeds(response, now = Date.now(), currentRun = '') {
  if (!Number.isFinite(now) || !Array.isArray(response?.workflow_runs)) throw Error('Invalid release inventory');
  return response.workflow_runs.filter(run => {
    const age = now - Date.parse(run.created_at);
    return Number.isSafeInteger(run.id) && run.id > 0 && String(run.id) !== String(currentRun)
      && /^[a-f0-9]{40}$/.test(run.head_sha ?? '')
      && run.head_repository?.full_name === REPO && run.head_branch === 'main'
      && run.path === '.github/workflows/deploy-production.yml'
      && ['push','workflow_dispatch'].includes(run.event)
      && run.status === 'completed' && run.conclusion === 'success'
      && Number.isFinite(age) && age >= 0 && age <= MAX_AGE_MS;
  }).sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .slice(0, 20).map(run => ({id:run.id, sha:run.head_sha}));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const runs = selectRecentVerifiedAssetSeeds(JSON.parse(readFileSync(0,'utf8')), Date.now(), process.env.GITHUB_RUN_ID);
    for (const run of runs) console.log(run.id + '\t' + run.sha);
  } catch (e) { console.error(String(e.message)); process.exitCode = 1; }
}
