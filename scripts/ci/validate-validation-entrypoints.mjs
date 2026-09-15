import fs from 'node:fs';

const failures = [];
const canonicalRunner = 'node scripts/ci/run-premerge-validation.mjs';
const canonicalNpmCommand = 'npm run validate:premerge';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const scriptName of ['validate', 'validate:premerge']) {
  const actual = pkg.scripts?.[scriptName];
  if (actual !== canonicalRunner) {
    failures.push(`package.json scripts.${scriptName} must be exactly \"${canonicalRunner}\"; found ${JSON.stringify(actual)}.`);
  }
}

for (const workflowPath of ['.github/workflows/merge-gate.yml', '.github/workflows/validate.yml']) {
  const workflow = fs.readFileSync(workflowPath, 'utf8');
  if (!workflow.includes(`run: ${canonicalNpmCommand}`)) {
    failures.push(`${workflowPath} must invoke the canonical npm entry point with \"run: ${canonicalNpmCommand}\".`);
  }
}

const runner = fs.readFileSync('scripts/ci/run-premerge-validation.mjs', 'utf8');
for (const requiredCheck of [
  'scripts/data/validate-county-property-calculator-flow.mjs',
  'scripts/data/validate-gsc-page-one-ctr.mjs',
]) {
  if (!runner.includes(requiredCheck)) {
    failures.push(`Canonical pre-merge runner is missing legacy deterministic coverage: ${requiredCheck}.`);
  }
}

const agents = fs.readFileSync('AGENTS.md', 'utf8');
if (!agents.includes('`npm run validate:premerge`')) {
  failures.push('AGENTS.md must document `npm run validate:premerge` as the canonical deterministic pre-merge command.');
}

if (failures.length > 0) {
  console.error('Validation entry-point contract failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Validation entry-point contract passed: package scripts, CI workflows, legacy coverage, and repository guidance all point to the canonical pre-merge runner.');
