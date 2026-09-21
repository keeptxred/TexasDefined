import { appendFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const outputPath = process.env.GITHUB_OUTPUT;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const result = spawnSync('npx', ['wrangler', 'deployments', 'status', '--json'], {
  cwd: process.cwd(),
  env: process.env,
  encoding: 'utf8',
  shell: false,
});

if (result.error || result.status !== 0) {
  const detail = result.error?.message || result.stderr || `exit code ${result.status}`;
  console.error(`::error title=Unable to capture active Worker version::${String(detail).trim()}`);
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(result.stdout);
} catch (error) {
  console.error('::error title=Invalid Wrangler deployment status JSON::Could not parse wrangler deployments status --json output.');
  console.error(String(error));
  process.exit(1);
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const weighted = [];
const unweighted = new Set();

function visit(value) {
  if (Array.isArray(value)) {
    for (const item of value) visit(item);
    return;
  }
  if (!value || typeof value !== 'object') return;

  const versionId =
    typeof value.version_id === 'string' ? value.version_id :
    typeof value.versionId === 'string' ? value.versionId :
    value.version && typeof value.version === 'object' && typeof value.version.id === 'string' ? value.version.id :
    null;

  if (versionId && uuidPattern.test(versionId)) {
    unweighted.add(versionId);
    const percentage = Number(value.percentage ?? value.traffic_percentage ?? value.traffic ?? value.percent);
    if (Number.isFinite(percentage)) weighted.push({ versionId, percentage });
  }

  for (const nested of Object.values(value)) visit(nested);
}

visit(payload);

const fullTraffic = [...new Set(weighted.filter((item) => item.percentage >= 99.999).map((item) => item.versionId))];
let versionId = null;

if (fullTraffic.length === 1) {
  versionId = fullTraffic[0];
} else if (fullTraffic.length === 0 && unweighted.size === 1) {
  versionId = [...unweighted][0];
}

if (!versionId) {
  console.error(`::error title=Ambiguous active Worker deployment::Expected exactly one 100% active Worker version, found full-traffic=${fullTraffic.length}, discovered=${unweighted.size}. Refusing to deploy without a deterministic rollback target.`);
  process.exit(1);
}

if (!outputPath) {
  console.error('::error title=Missing GITHUB_OUTPUT::Rollback target capture requires GitHub Actions output support.');
  process.exit(1);
}

appendFileSync(outputPath, `version_id=${versionId}\n`);
if (summaryPath) appendFileSync(summaryPath, `| Rollback target captured | \`${versionId}\` |\n`);
console.log(`Captured active Worker rollback target: ${versionId}`);
