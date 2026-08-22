import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const baseCounties = ['crosby','gaines','howard','hutchinson','morris','nolan','rockwall','scurry','wise','wood'];
const additionalCounties = ['borden','garza','delta','parmer','dawson'];
const counties = [...baseCounties, ...additionalCounties];
const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const baseArchivePath = 'scripts/ci/retired-county-certification-base-contracts.json';
const additionalArchivePath = 'scripts/ci/retired-county-certification-additional-contracts.json';
const retiredBase = JSON.parse(read(baseArchivePath));
const retiredAdditional = JSON.parse(read(additionalArchivePath));

for (const activePath of [
  'scripts/ci/incomplete-county-certification-config.json',
  'scripts/ci/additional-county-certification-config.json',
]) {
  if (fs.existsSync(activePath)) errors.push(`Completed county certification config must remain retired: ${activePath}`);
}

if (JSON.stringify(Object.keys(retiredBase).sort()) !== JSON.stringify([...baseCounties].sort())) {
  errors.push(`Retired base contract archive must contain exactly: ${baseCounties.join(', ')}`);
}
if (JSON.stringify(Object.keys(retiredAdditional).sort()) !== JSON.stringify([...additionalCounties].sort())) {
  errors.push(`Retired additional contract archive must contain exactly: ${additionalCounties.join(', ')}`);
}
const overlaps = Object.keys(retiredAdditional).filter((county) => Object.hasOwn(retiredBase, county));
if (overlaps.length) errors.push(`Retired county contract archives must not overlap: ${overlaps.join(', ')}`);
const config = { ...retiredBase, ...retiredAdditional };

for (const county of counties) {
  const item = config[county];
  if (!item) continue;
  if (!item.displayName || !item.fixture || !item.heroUrl) errors.push(`${county}: displayName, fixture and heroUrl are required`);
  if (!fs.existsSync(item.fixture)) errors.push(`${county}: fixture does not exist: ${item.fixture}`);
  if (!String(item.heroUrl).startsWith('https://')) errors.push(`${county}: heroUrl must use https`);
  if (!Array.isArray(item.sourceRequirements) || !item.sourceRequirements.length) errors.push(`${county}: sourceRequirements must remain non-empty`);
  if (!Array.isArray(item.pageMarkers) || item.pageMarkers.length < 5) errors.push(`${county}: pageMarkers must retain structured/editorial depth checks`);
  if (!item.pageMarkers?.includes(`https://texasdefined.com/county/${county}`)) errors.push(`${county}: canonical live-page marker missing`);
  if (item.targetSha && !/^[0-9a-f]{40}$/.test(item.targetSha)) errors.push(`${county}: targetSha must be blank or a full commit SHA`);

  const expectedLegacyPath = `/article/${path.basename(item.fixture, '.ts')}`;
  if (item.legacy?.mode !== 'redirect') errors.push(`${county}: retired contract must preserve legacy redirect mode`);
  if (item.legacy?.path !== expectedLegacyPath) errors.push(`${county}: legacy path must match fixture slug ${expectedLegacyPath}`);
  if (item.legacy?.locationExact !== `https://texasdefined.com/county/${county}`) errors.push(`${county}: legacy redirect must resolve exactly to the canonical county URL`);
  if (JSON.stringify(item.legacy?.statuses) !== JSON.stringify([301])) errors.push(`${county}: legacy redirect must remain exact HTTP 301`);

  for (const requirement of item.sourceRequirements ?? []) {
    if (!fs.existsSync(requirement.file)) {
      errors.push(`${county}: required source file missing: ${requirement.file}`);
      continue;
    }
    const source = read(requirement.file);
    for (const needle of requirement.includes ?? []) {
      if (!source.includes(needle)) errors.push(`${county}: retired source contract regressed; ${requirement.file} is missing: ${needle}`);
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

  const markerPath = `.github/certification/${county}-county.json`;
  if (!fs.existsSync(markerPath)) {
    errors.push(`${county}: PASS certification evidence is missing: ${markerPath}`);
  } else {
    try {
      const marker = JSON.parse(read(markerPath));
      if (String(marker.county ?? '').toLowerCase() !== county) errors.push(`${county}: evidence marker county field does not match`);
      if (String(marker.status ?? '').toLowerCase() !== 'pass') errors.push(`${county}: completed certification evidence must remain PASS`);
      if (String(marker.stage ?? '').toLowerCase() !== 'complete') errors.push(`${county}: completed certification evidence must remain complete`);
    } catch (error) {
      errors.push(`${county}: certification marker is invalid JSON (${error.message})`);
    }
  }

  const wrapperPath = `.github/workflows/certify-${county}-county-once.yml`;
  if (fs.existsSync(wrapperPath)) errors.push(`${county}: completed one-time certifier must remain retired (${wrapperPath})`);
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
  'CLOUDFLARE_DEPLOY_API_TOKEN:',
  'CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_DEPLOY_API_TOKEN || secrets.CLOUDFLARE_API_TOKEN }}',
  'CLOUDFLARE_DEPLOY_TOKEN_PRESENT:',
  'node scripts/ci/merge-county-certification-config.mjs',
  'node scripts/ci/run-incomplete-county-certification.mjs "$COUNTY"',
  'bash scripts/ci/publish-county-certification-evidence.sh',
  'Require certification pass',
]) if (!reusable.includes(needle)) errors.push(`${reusablePath}: missing protected reusable behavior ${needle}`);
if (reusable.includes('workflow_dispatch:')) errors.push(`${reusablePath}: retired reusable certifier must not be directly dispatchable`);
if (reusable.includes('git push origin HEAD:main')) errors.push(`${reusablePath}: direct main writes are forbidden`);

const mergerPath = 'scripts/ci/merge-county-certification-config.mjs';
const merger = read(mergerPath);
for (const needle of [
  'No active incomplete county certifications remain',
  'process.exit(1)',
]) if (!merger.includes(needle)) errors.push(`${mergerPath}: retired entry point must fail closed with ${needle}`);
const mergerRun = spawnSync('node', [mergerPath], { encoding: 'utf8' });
if (mergerRun.status === 0 || !`${mergerRun.stderr}${mergerRun.stdout}`.includes('No active incomplete county certifications remain')) {
  errors.push(`${mergerPath}: retired entry point must fail closed at runtime`);
}

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
]) if (!engine.includes(needle)) errors.push(`${enginePath}: protected certification behavior regressed: missing ${needle}`);
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
  ['node', ['--check', mergerPath], 'retired county entry-point syntax'],
  ['node', ['--check', 'scripts/ci/validate-direct-main-writer-inventory.mjs'], 'direct-main policy syntax'],
  ['node', ['--check', 'scripts/ci/validate-county-certifier-consolidation.mjs'], 'county certifier retirement contract syntax'],
  ['bash', ['-n', publisherPath], 'evidence publisher shell syntax'],
]) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) errors.push(`${label} failed: ${(result.stderr || result.stdout || '').trim()}`);
}

if (errors.length) {
  console.error('County certifier retirement validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`County certifier retirement safety passed: ${counties.length} completed one-time wrappers are removed, PASS evidence is retained, county-specific source/editorial/redirect contracts remain protected, the dormant reusable path is not directly dispatchable, and the former active entry point fails closed.`);
