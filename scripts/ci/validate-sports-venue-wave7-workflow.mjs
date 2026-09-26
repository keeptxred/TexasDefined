import fs from 'node:fs';

const workflowPath = '.github/workflows/sports-venue-hero-assets-wave7-reviewed.yml';
const source = fs.readFileSync(workflowPath, 'utf8');
const failures = [];

const count = (needle) => source.split(needle).length - 1;

if (count('- name: Run official validation on reviewed branch') !== 1) {
  failures.push('Wave 7 workflow must contain exactly one official branch-validation step.');
}
if (count('run: bash scripts/ci/dispatch-validate-branch.sh "$BRANCH"') !== 1) {
  failures.push('Wave 7 workflow must dispatch official validation exactly once.');
}
if (!source.includes("--body $'Reviewed sports venue hero reconciliation.")) {
  failures.push('Wave 7 workflow PR creation must include a non-empty reviewed reconciliation body.');
}
if (/^[ \t]*--body[ \t]*$/m.test(source)) {
  failures.push('Wave 7 workflow contains a dangling --body argument.');
}
if (/^Reviewed sports venue hero reconciliation\./m.test(source)) {
  failures.push('Wave 7 workflow contains unindented prose outside a YAML step.');
}
for (const marker of [
  'workflow_dispatch:',
  'push:',
  'branches: [main]',
  'Resolve reviewed sports venue JPEGs',
  'Detect generated sports venue changes',
  'Create reviewed sports venue hero branch',
  'Open reviewed sports venue hero pull request',
]) {
  if (!source.includes(marker)) failures.push(`Wave 7 workflow contract missing: ${marker}`);
}

if (failures.length) {
  console.error('Sports venue Wave 7 workflow validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue Wave 7 workflow validation passed: PR body is intact, no stray prose remains, and branch validation is dispatched exactly once.');
