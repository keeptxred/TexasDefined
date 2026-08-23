import fs from 'node:fs';
import path from 'node:path';

const workflowDir = '.github/workflows';
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

  const checksOutMain = /\bref:\s*["']?main["']?\s*$/m.test(source);
  if (checksOutMain) {
    for (const line of source.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (/^git\s+push(?:\s+origin)?\s*$/.test(trimmed)) matches.push(trimmed);
    }
  }

  if (matches.length) findings.push({ file, matches: [...new Set(matches)] });
}

console.log('Direct-main writer inventory:');
if (!findings.length) console.log('- none');
for (const finding of findings) {
  console.log(`- [PROHIBITED] ${finding.file}`);
  for (const match of finding.matches) console.log(`    ${match}`);
}

if (findings.length) {
  console.error(`Direct-main writer policy found ${findings.length} workflow(s). TexasDefined workflows must publish repository changes through validated branches/PRs; direct writes to main are prohibited without exception.`);
  process.exit(1);
}

console.log('Direct-main writer policy passed: zero GitHub Actions workflows write directly to main.');
