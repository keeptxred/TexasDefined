import fs from 'node:fs';
const failures = [];
const text = name => fs.readFileSync(`.github/workflows/${name}.yml`, 'utf8');
function required(source, needle, label) {
  if (!source.includes(needle)) failures.push(`${label} missing: ${needle}`);
}
const canonical = text('destination-canonical-smoke');
const indexing = text('destination-indexing-smoke');
for (const [name, source] of [['destination-canonical-smoke', canonical], ['destination-indexing-smoke', indexing]]) {
  required(source, "PRODUCTION_COMMIT_SHA: ${{ github.sha }}", name);
  required(source, 'node scripts/ci/wait-for-protected-production.mjs', name);
  required(source, 'statuses: read', name);
}
const canonicalWait = canonical.indexOf('node scripts/ci/wait-for-protected-production.mjs');
const canonicalFetch = canonical.indexOf("origin='https://texasdefined.com'");
if (canonicalWait < 0 || canonicalFetch <= canonicalWait) failures.push('Canonical destination live smoke must wait before network probes');
for (const job of ['hydration-stability','browser-stability','smoke']) {
  required(indexing, `  ${job}:\n    needs: deployment-gate`, 'Destination indexing must await deployment');
}
for (const [name, script] of [
  ['verify-city-authority-browser','scripts/ci/verify-city-authority-browser.mjs'],
  ['verify-budget-planner-browser','scripts/ci/verify-budget-planner-browser.mjs'],
]) {
  const source = text(name);
  required(source, "github.event_name == 'pull_request'", name + ' PR source check');
  required(source, `node --check ${script}`, name + ' PR source check');
  required(source, "if: ${{ github.event_name != 'pull_request' }}", name + ' live PR isolation');
  required(source, "PRODUCTION_COMMIT_SHA: ${{ github.sha }}", name + ' deployed SHA');
  required(source, 'node scripts/ci/wait-for-protected-production.mjs', name + ' protected deploy wait');
  required(source, 'statuses: read', name + ' status read');
  const verifyIndex = source.indexOf('\n  verify:\n');
  if (verifyIndex < 0) {
    failures.push(name + ' must have an explicit live verify job');
  } else {
    const sourceOnly = source.slice(0, verifyIndex);
    const liveJob = source.slice(verifyIndex);
    const waitAt = liveJob.indexOf('node scripts/ci/wait-for-protected-production.mjs');
    const probeAt = liveJob.indexOf('npm install --prefix /tmp/texasdefined-');
    if (sourceOnly.includes('node scripts/ci/wait-for-protected-production.mjs')) failures.push(name + ' must not wait for deployment during PR syntax checking');
    if (waitAt < 0 || probeAt <= waitAt) failures.push(name + ' live verify job must wait before starting browser checks');
  }
}
const waitScript = fs.readFileSync('scripts/ci/wait-for-protected-production.mjs', 'utf8');
for (const m of ['PRODUCTION_COMMIT_SHA', "s.context === 'texasdefined-production'", "if (lastState === 'success')", "if (lastState === 'failure' || lastState === 'error')"])
  required(waitScript, m, 'Fail-closed exact-commit deployment gate');
if (failures.length) { for(const f of failures) console.error('FAIL: '+f); process.exitCode=1; }
else console.log('Production browser and destination deployment-order safety passed.');
