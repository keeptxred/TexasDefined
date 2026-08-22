import fs from 'node:fs';
import path from 'node:path';

const workflowDir = '.github/workflows';
const allowedDirectWriters = new Set([]);
const findings = [];

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

  // A bare push from a workflow that explicitly checks out main is also a direct-main risk.
  const checksOutMain = /\bref:\s*["']?main["']?\s*$/m.test(source);
  if (checksOutMain) {
    for (const line of source.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (/^git\s+push(?:\s+origin)?\s*$/.test(trimmed)) matches.push(trimmed);
    }
  }

  if (matches.length) findings.push({ file, matches: [...new Set(matches)] });
}

const unexpected = findings.filter(({ file }) => !allowedDirectWriters.has(file));
const staleAllowlist = [...allowedDirectWriters].filter((file) => !findings.some((finding) => finding.file === file));

console.log('Direct-main writer inventory:');
if (!findings.length) console.log('- none');
for (const finding of findings) {
  const state = allowedDirectWriters.has(finding.file) ? 'allowed-existing-debt' : 'UNEXPECTED';
  console.log(`- [${state}] ${finding.file}`);
  for (const match of finding.matches) console.log(`    ${match}`);
}

if (staleAllowlist.length) {
  console.error('Direct-main writer allowlist contains stale entries that no longer write directly to main:');
  for (const file of staleAllowlist) console.error(`- ${file}`);
  process.exit(1);
}

if (unexpected.length) {
  console.error(`Direct-main writer policy found ${unexpected.length} unapproved workflow(s). Existing incomplete one-time exceptions must be reviewed and explicitly allowlisted; new direct-main writers are prohibited.`);
  process.exit(1);
}

console.log(`Direct-main writer policy passed with ${findings.length} explicitly reviewed existing exception(s) and no unexpected writers.`);
