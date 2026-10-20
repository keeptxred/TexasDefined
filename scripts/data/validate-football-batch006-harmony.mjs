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
const batch006Records = registry.schoolRecords.filter(r => batch006.slugs.includes(r.slug));
assert.equal(batch006Records.length, 25, 'Batch 006 must keep exactly 25 registry records');
for (const record of batch006Records) {
  assert.notEqual(
    record.status === 'DEPLOYED' ? record.productionVerification : null,
    'NOT_DEPLOYED_NO_BROWSER_ACCEPTANCE',
    `DEPLOYED Batch 006 record may not claim it was never deployed or browser-tested: ${record.slug}`,
  );
}
for (const record of batch006Records) {
  assert.equal(record.productionVerification, 'BROWSER_PASS_BATCH006_75_SCHOOL_23_COUNTY_25_SITEMAP_2026_10_19', `${record.slug} must retain the October 19 technical browser evidence`);
  assert.equal(record.linkVerificationStatus, 'RECIPROCAL_COUNTY_BROWSER_PASS_BATCH006_2026_10_19', `${record.slug} must retain reciprocal county browser evidence`);
  assert.equal(record.technicalBrowserRun, 39273758531, `${record.slug} must retain the supporting browser run id`);
  assert.equal(record.actualProductionVerified, false, `${record.slug} must remain pending individual nine-dimension acceptance`);
}
const school = registry.schoolRecords.find(r => r.slug === 'big-sandy-harmony');
assert.ok(school && school.batch === 6 && ['IMPLEMENTED','MERGED','DEPLOYED','VERIFIED'].includes(school.status), 'Harmony may not be certified without implementation');
assert.equal(school.county, 'Upshur County');
assert.equal(school.campusCountySource, 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482256002294');
const editor = read('src/data/high-school-football/program-editorial.ts');
const index = editor.indexOf('  "big-sandy-harmony": {');
assert.ok(index >= 0, 'Harmony school-specific editorial missing');
const next = editor.indexOf('\n  "', index + 4);
const section = next > index ? editor.slice(index,next) : editor.slice(index);
for (const needle of ['"season": {','"milestones": [','"faq": [','2022','Poth','Quitman','Harmony Eagle Stadium','www.harmonyisd.net/o/ha/page/harmony-football','www.maxpreps.com/tx/big-sandy/harmony-eagles/football/']) {
  assert.ok(section.includes(needle), 'Missing exact-school Harmony editorial evidence: '+needle);
}
assert.equal((section.match(/"opponent":/g)||[]).length, 10, 'School must show ten sourced 2026 fixtures, no invented finals');

// Permanent score-integrity contract: avoid freezing the Oct 9 scorecard in
// code. Future verified finals can progress without weakening source checks.
const harmony = JSON.parse(section.slice(section.indexOf('{')).trim().replace(/,\s*$/, ''));

for (const [slug, expectedVenue, expectedAddress] of [
  ['blooming-grove', 'Lion Stadium', undefined],
  ['blue-ridge', 'Tiger Stadium', undefined],
  ['blanket', 'Tiger Stadium', '901 Avenue H, Blanket, TX 76432'],
  ['borger', 'Bulldog Stadium', undefined],
  ['bowie', 'Jackrabbit Stadium', undefined],
  ['bovina', 'Mustang Stadium', undefined],
  ['bishop', 'George Luna Stadium', undefined],
  ['bosqueville', 'Bulldog Stadium', undefined],
]) {
  const start = editor.indexOf('  "' + slug + '": {');
  assert.ok(start >= 0, slug + ' editorial must exist');
  const end = editor.indexOf('\n  "', start + 4);
  const source = end > start ? editor.slice(start, end) : editor.slice(start);
  const entry = JSON.parse(source.slice(source.indexOf('{')).trim().replace(/,\s*$/, ''));
  assert.equal(entry.venue?.name, expectedVenue, slug + ' must retain its first-party sourced venue name');
  assert.equal(entry.venue?.address, expectedAddress, slug + ' venue address must remain exactly as established by the first-party source');
  assert.ok(/entrance|parking|address/i.test(entry.venue?.note || ''), slug + ' venue note must preserve the unverified-access caveat');
}
const harmonyGames = harmony.season.games;
assert.equal(harmonyGames.length, 10, 'Preserve the researched 2026 ten-fixture roster');
const firstSeven = harmonyGames.filter(game => game.date <= '2026-10-09');
assert.equal(firstSeven.length, 7, 'Preserve October 9 historical checkpoint');
assert.ok(firstSeven.every(game => /^L\s+\d+[–-]\d+$/.test(game.result || '')), 'Retain each of the first seven reported losses');
const edgewood = harmonyGames.find(game => game.date === '2026-10-16' && game.opponent === 'Edgewood');
assert.ok(edgewood && edgewood.site === 'Away', 'Protect Harmony–Edgewood fixture identity');
assert.equal(edgewood.result, 'L 0–48', 'Protect newly sourced October 16 Edgewood final');
assert.equal(harmony.season.latestResultSourceUrl, 'https://www.houstonchronicle.com/sports/high-school/football/article/texas-scores-friday-week-16-22481255.php', 'Retain current source attribution for the October 16 final');
assert.ok(harmonyGames.every((game, i) => i === 0 || harmonyGames[i-1].date < game.date), 'Fixture dates must stay chronologically ordered');
const played = harmonyGames.filter(game => game.result);
assert.ok(played.every(game => /^([WL])\s+\d+[–-]\d+$/.test(game.result) && /^2026-\d\d-\d\d$/.test(game.date) && game.date <= harmony.season.verifiedAt), 'No malformed or future-dated scores presented as finals');
const wins = played.filter(game => game.result.startsWith('W ')).length;
const losses = played.filter(game => game.result.startsWith('L ')).length;
assert.ok(harmony.season.record.startsWith(wins + '–' + losses + ' through '), 'Record must equal scored 2026 fixtures');
const mostRecentDate = played.map(game => game.date).sort().at(-1);
const mostRecentLabel = new Date(mostRecentDate + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
assert.ok(harmony.season.record.includes('through ' + mostRecentLabel), 'Record must carry the actual latest completed match date');
assert.ok(harmony.season.sourceLabel.includes('October 16'), 'New October 16 final must have dated news attribution');

assert.ok(section.includes('Brian Mauk') && section.includes('former athletic director') && section.includes('MaxPreps'), 'Require KLTV-attributed coach and official district correction of outdated roster');
assert.ok(!section.includes('Sources conflict: the 2026 MaxPreps staff listing names Jeremy Jenkins'), 'Never imply the deceased former athletic director could currently be head coach');
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
