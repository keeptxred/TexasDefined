import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const counties = ['crosby','gaines','howard','hutchinson','morris','nolan','rockwall','scurry','wise','wood'];
const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const configPath = 'scripts/ci/incomplete-county-certification-config.json';
const config = JSON.parse(read(configPath));

if (JSON.stringify(Object.keys(config).sort()) !== JSON.stringify([...counties].sort())) {
  errors.push(`Certification config must contain exactly: ${counties.join(', ')}`);
}

for (const county of counties) {
  const item = config[county];
  if (!item) continue;
  if (!item.displayName || !item.fixture || !item.heroUrl) errors.push(`${county}: displayName, fixture and heroUrl are required`);
  if (!fs.existsSync(item.fixture)) errors.push(`${county}: fixture does not exist: ${item.fixture}`);
  if (!String(item.heroUrl).startsWith('https://')) errors.push(`${county}: heroUrl must use https`);
  if (!Array.isArray(item.sourceRequirements) || !item.sourceRequirements.length) errors.push(`${county}: sourceRequirements must be non-empty`);
  if (!Array.isArray(item.pageMarkers) || item.pageMarkers.length < 5) errors.push(`${county}: pageMarkers must retain structured/editorial depth checks`);
  if (!item.pageMarkers?.includes(`https://texasdefined.com/county/${county}`)) errors.push(`${county}: canonical live-page marker missing`);
  if (item.targetSha && !/^[0-9a-f]{40}$/.test(item.targetSha)) errors.push(`${county}: targetSha must be blank or a full commit SHA`);
  if (!['none','not-200','redirect'].includes(item.legacy?.mode)) errors.push(`${county}: unsupported legacy mode ${item.legacy?.mode}`);

  for (const requirement of item.sourceRequirements ?? []) {
    if (!fs.existsSync(requirement.file)) errors.push(`${county}: required source file missing: ${requirement.file}`);
  }
  for (const file of item.canonicalScanFiles ?? []) {
    if (!fs.existsSync(file)) errors.push(`${county}: canonical scan file missing: ${file}`);
  }

  const wrapperPath = `.github/workflows/certify-${county}-county-once.yml`;
  const wrapper = read(wrapperPath);
  for (const needle of [
    'workflow_dispatch:',
    'actions: write',
    'contents: write',
    'pull-requests: write',
    'uses: ./.github/workflows/certify-county-production-reusable.yml',
    `county: ${county}`,
    'secrets: inherit',
  ]) if (!wrapper.includes(needle)) errors.push(`${wrapperPath}: missing ${needle}`);
  for (const forbidden of ['schedule:', 'branches: [main]', 'git push', 'npm run deploy', 'python3']) {
    if (wrapper.includes(forbidden)) errors.push(`${wrapperPath}: thin wrapper must not contain ${forbidden}`);
  }
}

const reusablePath = '.github/workflows/certify-county-production-reusable.yml';
const reusable = read(reusablePath);
for (const needle of [
  'workflow_call:',
  'environment: texasdefined-publication',
  'actions: write',
  'contents: write',
  'pull-requests: write',
  'node scripts/ci/run-incomplete-county-certification.mjs "$COUNTY"',
  'bash scripts/ci/publish-county-certification-evidence.sh',
  'Require certification pass',
]) if (!reusable.includes(needle)) errors.push(`${reusablePath}: missing ${needle}`);
if (reusable.includes('git push origin HEAD:main')) errors.push(`${reusablePath}: direct main writes are forbidden`);

const enginePath = 'scripts/ci/run-incomplete-county-certification.mjs';
const engine = read(enginePath);
for (const needle of [
  "['run', 'validate']",
  "['run', 'deploy']",
  'main moved after validation',
  'main moved during deployment',
  'main moved during live verification',
  "const markerPath = `.github/certification/${county}-county.json`;",
  "evidence.status = 'pass';",
  "evidence.stage = 'complete';",
]) if (!engine.includes(needle)) errors.push(`${enginePath}: missing protected certification behavior ${needle}`);
for (const forbidden of ['git push origin HEAD:main', 'priority-search-pages.ts\')\n          s =', 'Fix Texas football alias route governance', 'Lazy-load Texas Life split articles']) {
  if (engine.includes(forbidden)) errors.push(`${enginePath}: certification engine must not mutate product source (${forbidden})`);
}

const publisherPath = 'scripts/ci/publish-county-certification-evidence.sh';
const publisher = read(publisherPath);
for (const needle of [
  'staged" != "$marker"',
  'gh workflow run validate.yml',
  'gh run watch',
  'git checkout -B "$branch" origin/main',
  'main advanced during evidence validation',
  'gh pr merge',
]) if (!publisher.includes(needle)) errors.push(`${publisherPath}: missing ${needle}`);
if (/git\s+push\s+origin\s+HEAD:main/.test(publisher)) errors.push(`${publisherPath}: direct main writes are forbidden`);

for (const [command, args, label] of [
  ['node', ['--check', enginePath], 'county certification engine syntax'],
  ['node', ['--check', 'scripts/ci/validate-direct-main-writer-inventory.mjs'], 'direct-main policy syntax'],
  ['bash', ['-n', publisherPath], 'evidence publisher shell syntax'],
]) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) errors.push(`${label} failed: ${(result.stderr || result.stdout || '').trim()}`);
}

if (errors.length) {
  console.error('County certifier consolidation validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('County certifier consolidation passed: ten manual wrappers share one source-read-only production certification engine, exact-commit validated evidence PRs, zero direct-main writes, and retained county-specific source/hero/live/legacy contracts.');
