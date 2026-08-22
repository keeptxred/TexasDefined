import fs from 'node:fs';
import path from 'node:path';

const workflowDir = '.github/workflows';
const allowedDirectWriters = new Map([
  ['.github/workflows/certify-crosby-county-once.yml', 'retained marker is fail/validation'],
  ['.github/workflows/certify-gaines-county-once.yml', 'no retained complete PASS certification'],
  ['.github/workflows/certify-howard-county-once.yml', 'retained marker is fail/validation'],
  ['.github/workflows/certify-hutchinson-county-once.yml', 'no retained complete PASS certification'],
  ['.github/workflows/certify-morris-county-once.yml', 'retained marker is fail/source'],
  ['.github/workflows/certify-nolan-county-once.yml', 'retained marker is fail/validation'],
  ['.github/workflows/certify-rockwall-county-once.yml', 'no retained complete PASS certification'],
  ['.github/workflows/certify-scurry-county-once.yml', 'no retained complete PASS certification'],
  ['.github/workflows/certify-wise-county-once.yml', 'no retained complete PASS certification'],
  ['.github/workflows/certify-wood-county-once.yml', 'no retained complete PASS certification'],
]);
const findings = [];
const policyFailures = [];

function workflowFiles() {
  return fs.readdirSync(workflowDir)
    .filter((name) => /\.ya?ml$/i.test(name))
    .sort()
    .map((name) => path.join(workflowDir, name));
}

const explicitMainPatterns = [
  /git\s+push(?:\s+--[a-z-]+(?:=[^\s]+)?)*\s+origin\s+["']?HEAD:main["']?/gi,
  /git\s+push(?:\s+--[a-z-]+(?:=[^\s]+)?)*\s+origin\s+["']?main["']?(?=\s|$)/gim,
];

for (const file of workflowFiles()) {
  const source = fs.readFileSync(file, 'utf8');
  const matches = [];
  for (const pattern of explicitMainPatterns) {
    for (const match of source.matchAll(pattern)) matches.push(match[0].replace(/\s+/g, ' ').trim());
  }

  const checksOutMain = /\bref:\s*["']?main["']?\s*$/m.test(source);
  if (checksOutMain) {
    for (const line of source.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (/^git\s+push(?:\s+origin)?\s*$/.test(trimmed)) matches.push(trimmed);
    }
  }

  if (matches.length) findings.push({ file, source, matches: [...new Set(matches)] });
}

const unexpected = findings.filter(({ file }) => !allowedDirectWriters.has(file));
const staleAllowlist = [...allowedDirectWriters.keys()].filter((file) => !findings.some((finding) => finding.file === file));

for (const { file, source } of findings) {
  if (!allowedDirectWriters.has(file)) continue;

  if (!/^\.github\/workflows\/certify-[a-z0-9-]+-county-once\.yml$/.test(file)) {
    policyFailures.push(`${file}: direct-main exception must remain a one-time county certifier`);
  }
  if (/^\s*schedule:\s*$/m.test(source)) {
    policyFailures.push(`${file}: direct-main exception must never become scheduled`);
  }

  const county = file.match(/certify-([a-z0-9-]+)-county-once\.yml$/)?.[1];
  if (!county) continue;
  const markerPath = `.github/certification/${county}-county.json`;
  if (!fs.existsSync(markerPath)) continue;

  try {
    const marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
    const status = String(marker.status ?? '').toLowerCase();
    const stage = String(marker.stage ?? '').toLowerCase();
    if (status === 'pass' && stage === 'complete') {
      policyFailures.push(`${file}: ${county} County now has complete PASS evidence and must be retired instead of remaining a direct-main exception`);
    }
  } catch (error) {
    policyFailures.push(`${file}: certification marker ${markerPath} is invalid JSON (${error.message})`);
  }
}

console.log('Direct-main writer inventory:');
if (!findings.length) console.log('- none');
for (const finding of findings) {
  const reason = allowedDirectWriters.get(finding.file);
  const state = reason ? 'allowed-existing-debt' : 'UNEXPECTED';
  console.log(`- [${state}] ${finding.file}${reason ? ` — ${reason}` : ''}`);
  for (const match of finding.matches) console.log(`    ${match}`);
}

if (staleAllowlist.length) {
  console.error('Direct-main writer allowlist contains stale entries that no longer write directly to main; remove them from the allowlist:');
  for (const file of staleAllowlist) console.error(`- ${file}`);
  process.exit(1);
}

if (unexpected.length) {
  console.error(`Direct-main writer policy found ${unexpected.length} unapproved workflow(s). New direct-main writers are prohibited.`);
  process.exit(1);
}

if (policyFailures.length) {
  console.error('Direct-main writer exception policy failed:');
  for (const failure of policyFailures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Direct-main writer policy passed with ${findings.length} explicitly reviewed incomplete one-time county exception(s), no scheduled direct writers, and no unexpected writers.`);
