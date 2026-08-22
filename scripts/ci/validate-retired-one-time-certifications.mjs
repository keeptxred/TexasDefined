import fs from 'node:fs';

const retired = [
  { county: 'andrews', workflow: '.github/workflows/certify-andrews-county-once.yml', mode: 'removed' },
  { county: 'cochran', workflow: '.github/workflows/certify-cochran-county-once.yml', mode: 'audit-stub' },
  { county: 'cottle', workflow: '.github/workflows/certify-cottle-county-once.yml', mode: 'audit-stub' },
  { county: 'fisher', workflow: '.github/workflows/certify-fisher-county-once.yml', mode: 'audit-stub' },
  { county: 'king', workflow: '.github/workflows/certify-king-county-once.yml', mode: 'audit-stub' },
];

const failures = [];

for (const { county, workflow, mode } of retired) {
  const markerPath = `.github/certification/${county}-county.json`;
  if (!fs.existsSync(markerPath)) {
    failures.push(`${county}: retained certification marker is missing (${markerPath})`);
    continue;
  }

  let marker;
  try {
    marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
  } catch (error) {
    failures.push(`${county}: certification marker is invalid JSON (${error.message})`);
    continue;
  }

  if (String(marker.county ?? '').toLowerCase() !== county) failures.push(`${county}: marker county field does not match`);
  if (String(marker.status ?? '').toLowerCase() !== 'pass') failures.push(`${county}: retired certification status must remain PASS`);
  if (String(marker.stage ?? '').toLowerCase() !== 'complete') failures.push(`${county}: retired certification stage must remain complete`);

  if (mode === 'removed') {
    if (fs.existsSync(workflow)) failures.push(`${county}: completed one-time workflow must remain removed (${workflow})`);
    continue;
  }

  if (!fs.existsSync(workflow)) {
    failures.push(`${county}: expected read-only retirement audit stub is missing (${workflow})`);
    continue;
  }

  const source = fs.readFileSync(workflow, 'utf8');
  const required = [
    'workflow_dispatch:',
    'contents: read',
    `node scripts/ci/verify-retired-county-certification.mjs ${county}`,
  ];
  for (const text of required) {
    if (!source.includes(text)) failures.push(`${county}: retired audit stub must retain ${text}`);
  }

  const forbidden = [
    [/contents:\s*write/, 'contents: write'],
    [/git\s+push/, 'git push'],
    [/npm\s+run\s+deploy/, 'npm run deploy'],
    [/wrangler\s+deploy/, 'wrangler deploy'],
    [/gh\s+pr\s+merge/, 'PR auto-merge'],
  ];
  for (const [pattern, description] of forbidden) {
    if (pattern.test(source)) failures.push(`${county}: retired audit stub must not contain ${description}`);
  }
}

if (failures.length) {
  console.error('Retired one-time certification validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Retired one-time certification policy passed for ${retired.length} completed counties: retained PASS evidence is intact and no retired certifier can write or deploy.`);
