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
// Two independently grounded milestones must remain distinguishable: the
// 2026-10-19 single-Worker pre-graphics run and the 2026-10-21 post-graphics
// 75/75 browser and 75/75 graphic run. A new owner-directed *technical*
// verified policy cannot fabricate human editorial/photo-rights acceptance.
const lastPregraphics = batch006.technicalBrowserAcceptance;
assert.equal(lastPregraphics.runId,39273758531,'Preserve October 19 pre-graphics production evidence');
assert.equal(lastPregraphics.schoolCasesPassed,75,'Preserve all 75 October 19 school viewports');
const completedTechnical = batch006.state === 'VERIFIED_BATCH_006_COMPLETE';
if (completedTechnical) {
  assert.equal(batch006.individuallyVerified,25,'Technical completion must require 25 school profiles');
  assert.equal(batch006.remainingToVerify,0,'Completed Batch006 cannot retain unverified assignments');
  assert.equal(batch006.manualEditorialReviewRequiredForCompletion,false,'Owner-directed optional manual-review policy must persist');
  const delivery = batch006.publicationDelivery;
  assert.ok(delivery && delivery.strictRunConclusion === 'success'
    && delivery.postGraphicsChromeRun === 39532328953
    && delivery.strictSingleWorkerVersionPassed === true,
    'Batch006 technical completion must link to a green single-release post-graphics production run');
  assert.equal(delivery.schoolViewCasesPassed,75,'Require all 75 published school viewports');
  assert.equal(delivery.graphicCasesPassed,75,'Require all 75 source-derived graphics');
  assert.equal(delivery.countyLinksPassed,23,'Require all 23 school/county link pages');
  assert.equal(delivery.sitemapEntriesPassed,25,'Require all 25 sitemap entries');
  assert.equal(delivery.individualEditorialAccepted,0,
    'Do not invent approvals in the historical owner-requested technical completion checkpoint');
  for (const record of batch006Records) {
    assert.equal(record.status,'VERIFIED',record.slug+' must be production technically verified');
    assert.equal(record.actualProductionVerified,true,record.slug+' must have real live production evidence');
    assert.equal(record.productionVerifiedAt,delivery.strictRunCompletedAt,
      record.slug+' must use real Chrome completion timestamp, not invented signoff');
    assert.equal(record.productionVerification,
      'BATCH006_POST_GRAPHICS_LIVE_CHROME_75_OF_75_SCHOOLS_75_OF_75_GRAPHICS_23_COUNTIES_25_SITEMAP_ONE_WORKER',
      record.slug+' must retain post-graphics Chrome evidence');
    assert.equal(record.technicalBrowserRun,delivery.postGraphicsChromeRun,
      record.slug+' must reference the successful current live run');
    assert.equal(record.manualEditorialReviewRequiredForCompletion,false,
      record.slug+' must not require a missing human reviewer');
    assert.equal(record.linkVerificationStatus,'RECIPROCAL_COUNTY_BROWSER_PASS_BATCH006_2026_10_19',
      record.slug+' must preserve county browser provenance');
  }
} else {
  // Archived in-progress batches must retain their original source and
  // production status; never promote without the required technical proof.
  for (const record of batch006Records) {
    assert.equal(record.productionVerification,'BROWSER_PASS_BATCH006_75_SCHOOL_23_COUNTY_25_SITEMAP_2026_10_19',
      record.slug+' must retain the October 19 technical browser evidence');
    assert.equal(record.linkVerificationStatus,'RECIPROCAL_COUNTY_BROWSER_PASS_BATCH006_2026_10_19');
    assert.equal(record.technicalBrowserRun,39273758531);
    assert.equal(record.actualProductionVerified,false);
  }
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
