import fs from 'node:fs';

const workflowPath = '.github/workflows/sports-venue-hero-assets-wave7-reviewed.yml';
const source = fs.readFileSync(workflowPath, 'utf8');
const failures = [];

function count(needle) {
  return source.split(needle).length - 1;
}

function requireText(needle, label) {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
}

requireText('name: Sync reviewed sports venue hero assets wave 7', 'workflow identity');
requireText('scripts/data/sync-sports-venue-hero-assets-wave7-reviewed.mjs', 'reviewed sync command');
requireText('PR_BODY: >-', 'safe PR body environment block');
requireText('--body "$PR_BODY"', 'quoted PR body argument');
requireText('git status --porcelain -- public/images/sports-venues src/data/sports-venue-images-additions-wave7.ts scripts/data/sports-venue-hero-wave7-report.json', 'generated change scope');

if (count('- name: Run official validation on reviewed branch') !== 1) {
  failures.push('Reviewed hero workflow must contain exactly one official validation step.');
}
if (count('--body "$PR_BODY"') !== 1) {
  failures.push('Reviewed hero workflow must pass the generated PR body exactly once through PR_BODY.');
}
if (/^Reviewed sports venue hero reconciliation\./m.test(source)) {
  failures.push('Reviewed hero PR body escaped the YAML env block and would corrupt the workflow.');
}
if (/--body\s*$/.test(source)) {
  failures.push('Reviewed hero workflow contains an empty --body argument.');
}

if (failures.length) {
  console.error('Reviewed sports venue hero workflow validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Reviewed sports venue hero workflow contract validated.');
