#!/usr/bin/env node
// Durable premerge contract: preserve 105 previously verified teams and source-backed Harmony.
// Historical Batch005 and later active batches must not be conflated.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(path, 'utf8');
const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
const batch005 = registry.batch.number === 5 ? registry.batch : registry.completedBatches.find(b => b.number === 5);
const batch006 = registry.batch.number === 6 ? registry.batch : registry.completedBatches.find(b => b.number === 6);
assert.ok(batch005 && batch005.slugs.length === 25 && batch005.individuallyVerified === 25, 'Never lose certified Batch 005 school roster');
assert.ok(batch006 && batch006.slugs.length === 25 && batch006.slugs[0] === 'big-sandy-harmony', 'Batch 006 must retain stable assigned school set');
assert.ok(registry.schoolRecords.filter(r => r.status === 'VERIFIED').length >= 105, 'Do not demote previous 105 verified schools');
const school = registry.schoolRecords.find(r => r.slug === 'big-sandy-harmony');
assert.ok(school && school.batch === 6 && ['IMPLEMENTED','MERGED','DEPLOYED','VERIFIED'].includes(school.status), 'Harmony may not be certified without implementation');
assert.equal(school.county, 'Upshur County');
assert.equal(school.campusCountySource, 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482256002294');
const editor = read('src/data/high-school-football/program-editorial.ts');
const index = editor.indexOf('  "big-sandy-harmony": {');
assert.ok(index >= 0, 'Harmony school-specific editorial missing');
const next = editor.indexOf('\n  "', index + 4);
const section = next > index ? editor.slice(index,next) : editor.slice(index);
for (const needle of ['"season": {','"record": "0–7 through October 9, 2026','"milestones": [','"faq": [','2022','Poth','Quitman','Harmony Eagle Stadium','www.harmonyisd.net/o/ha/page/harmony-football','www.maxpreps.com/tx/big-sandy/harmony-eagles/football/']) {
  assert.ok(section.includes(needle), 'Missing exact-school Harmony editorial evidence: '+needle);
}
assert.equal((section.match(/"opponent":/g)||[]).length, 10, 'School must show ten sourced 2026 fixtures, no invented finals');
assert.ok(section.includes('Sources conflict') || section.includes('Sources disagree') || section.includes('Sources conflict:'), 'Coach discrepancy must be disclosed in public FAQ');
const identity = read('src/data/high-school-football/school-identities.ts');
assert.ok(identity.includes("slug: 'big-sandy-harmony', mascot: 'Eagles'"), 'Verify source-backed Eagles identity');
const profile = read('src/data/high-school-football/football-program-profile.server.ts');
assert.ok(profile.includes("'big-sandy-harmony': { officialSchoolName: 'Harmony High School', districtName: 'Harmony ISD', countyName: 'Upshur County'"), 'Do not confuse Harmony with other Big Sandy programs');
const page = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county = read('src/routes/$kind.$slug.lazy.tsx');
assert.ok(page.includes("'big-sandy-harmony': 'upshur'"), 'Harmony must link out to Upshur County');
assert.ok(county.includes("slug: 'big-sandy-harmony'"), 'Upshur County must reciprocate to Harmony');
assert.ok(county.includes("slug: 'big-sandy'"), 'Do not delete existing Wildcats county link');
const groupVerifier = read('scripts/ci/verify-football-batch005-production.mjs');
assert.ok(groupVerifier.includes('registry.completedBatches?.find(batch => batch.number === 5)'), 'Batch 005 verifier must keep working after next-batch assignment');
console.log('Harmony source-specific profile and archive integrity PASS; no production VERIFIED claim made here');
