import fs from 'node:fs';
import path from 'node:path';
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

  const expectedLegacyPath = `/article/${path.basename(item.fixture, '.ts')}`;
  if (item.legacy?.mode !== 'redirect') errors.push(`${county}: current generic county-series architecture requires legacy mode redirect`);
  if (item.legacy?.path !== expectedLegacyPath) errors.push(`${county}: legacy path must match fixture slug ${expectedLegacyPath}`);
  if (item.legacy?.locationExact !== `https://texasdefined.com/county/${county}`) errors.push(`${county}: legacy redirect must resolve exactly to the canonical county URL`);
  if (JSON.stringify(item.legacy?.statuses) !== JSON.stringify([301])) errors.push(`${county}: current server contract requires exact HTTP 301 legacy redirect`);

  for (const requirement of item.sourceRequirements ?? []) {
    if (!fs.existsSync(requirement.file)) {
      errors.push(`${county}: required source file missing: ${requirement.file}`);
      continue;
    }
    const source = read(requirement.file);
    for (const needle of requirement.includes ?? []) {
      if (!source.includes(needle)) errors.push(`${county}: configured source requirement is stale; ${requirement.file} is missing: ${needle}`);
    }
    for (const needle of requirement.forbidden ?? []) {
      if (source.includes(needle)) errors.push(`${county}: forbidden regression marker is present in ${requirement.file}: ${needle}`);
    }
  }

  for (const file of item.canonicalScanFiles ?? []) {
    if (!fs.existsSync(file)) {
      errors.push(`${county}: canonical scan file missing: ${file}`);
      continue;
    }
    if (read(file).includes('www.texasdefined.com')) errors.push(`${county}: canonical scan file contains noncanonical www host: ${file}`);
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

const countySeries = read('src/data/county-series.ts');
for (const needle of [
  'articleSlug.indexOf("-county-")',
  'articleSlug.endsWith("-texas")',
  'return articleSlug.slice(0, markerIndex);',
]) if (!countySeries.includes(needle)) errors.push(`Generic legacy county-slug parser regressed: missing ${needle}`);

const server = read('src/server.ts');
for (const needle of [
  'const countySlug = countySlugForLegacyArticle(decodeURIComponent(match[1]));',
  'url.pathname = `/county/${countySlug}`;',
  'return Response.redirect(url.toString(), 301);',
]) if (!server.includes(needle)) errors.push(`Generic legacy county redirect regressed: missing ${needle}`);

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
for (const forbidden of ['git push origin HEAD:main', 'Fix Texas football alias route governance', 'Lazy-load Texas Life split articles']) {
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
  ['node', ['--check', 'scripts/ci/validate-county-certifier-consolidation.mjs'], 'county certifier contract syntax'],
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

console.log('County certifier consolidation passed: ten manual wrappers share one source-read-only production certification engine, exact-commit validated evidence PRs, zero direct-main writes, current source assertions are executable, and all legacy county-series article shapes are protected as exact 301 redirects to canonical county URLs.');
