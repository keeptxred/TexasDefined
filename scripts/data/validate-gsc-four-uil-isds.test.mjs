import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

const read = file => readFileSync(file, 'utf8');
const bridges = read('src/data/high-school-football/verified-uil-isd-bridges.ts');
const aligned = read('src/data/high-school-football/uil-football-alignments-2026.server.ts');
const enrollment = read('src/data/high-school-football/uil-football-enrollments-2026.generated.ts');
const server = read('src/data/high-school-football/football-isds.server.ts');
const detail = read('src/routes/texas-high-school-football-isds_.$slug.lazy.tsx');
const head = read('src/routes/texas-high-school-football-isds_.$slug.tsx');
const smoke = read('scripts/ci/verify-built-worker-ssr-core.mjs');

const candidates = [
  {school: 'Brookesmith', district: 'Brookesmith ISD', campus: '025908001', tag: '1A', uil: '1AD2FB2026.pdf', slug: 'brookesmith-isd'},
  {school: 'Morgan', district: 'Morgan ISD', campus: '018903001', tag: '1A', uil: '1AD2FB2026.pdf', slug: 'morgan-isd'},
  {school: 'Walnut Springs', district: 'Walnut Springs ISD', campus: '018905003', tag: '1A', uil: '1AD2FB2026.pdf', slug: 'walnut-springs-isd'},
  {school: 'Three Rivers', district: 'Three Rivers ISD', campus: '149902001', tag: '2A', uil: '2AD2FB2026.pdf', slug: 'three-rivers-isd'},
];

test('four exact TEA+UIL identities retained; no guessed charter or basketball-only ISD', () => {
  assert.equal((bridges.match(/    sourceSchoolName: '/g) || []).length, 4);
  assert.equal(new Set(candidates.map(c=>c.campus)).size, 4);
  for (const x of candidates) {
    for (const field of [
      `sourceSchoolName: '${x.school}'`, `districtName: '${x.district}'`,
      `campusId: '${x.campus}'`, `classification: '${x.tag}'`,
      x.uil, `https://realignment.uiltexas.org/`,
      `teaSource: 'https://rptsvr1.tea.texas.gov/`,
    ]) assert.ok(bridges.includes(field), x.slug + ' source missing ' + field);
    assert.ok(aligned.includes(x.school), x.school + ' absent from UIL 2026 football');
    assert.ok(enrollment.includes('"' + x.school + '":'), x.school + ' missing official enrollment');
    assert.ok(smoke.includes('/texas-high-school-football-isds/' + x.slug), x.slug + ' missing real SSR gate');
  }
  assert.ok(!bridges.includes('Golden Rule'));
  assert.ok(!bridges.includes("districtName: 'Central ISD'"));
});

test('the bridge refuses mismatched UIL year, conference, division, format or source URL', () => {
  for (const marker of [
    "program.alignmentCycle === '2026-28'",
    'program.sourceSchoolName === bridge.sourceSchoolName',
    'program.classification === bridge.classification',
    'program.division === bridge.division',
    'program.footballType === bridge.footballType',
    'program.sourceUrl === bridge.uilSource',
  ]) assert.ok(bridges.includes(marker), marker);
});

test('four page loaders use exact current UIL list with TEA campus ID, no AskTED dependency', () => {
  assert.ok(server.includes('function verifiedGscFootballIsdProfile(slug: string)'));
  assert.ok(server.includes('verifiedFootballIsdBridge(program)?.districtName === evidence.districtName'));
  assert.ok(server.includes('if (matched.length !== 1) return null;'));
  assert.ok(server.includes('const sourceBacked = verifiedGscFootballIsdProfile(slug);'));
  assert.ok(server.indexOf('if (sourceBacked) return sourceBacked;') < server.lastIndexOf('const built = await buildFootballIsdDirectory();'));
  assert.ok(server.includes('reconcileVerifiedFootballIsdBridge(uilProgram)') || server.includes('reconcileVerifiedFootballIsdBridge(base)'));
  assert.ok(server.includes('matchedProgramCount + unmatchedProgramCount !== 1268'), 'do not weaken UIL count integrity');
  assert.ok(server.includes('return built.isds.find((district) => district.slug === slug) ?? null;'), 'unknown school-districts must still 404');
});

test('each ISD page shows two distinct researched paragraphs and direct official references', () => {
  assert.equal((bridges.match(/    authoritySummary: /g) || []).length, 4);
  assert.equal((bridges.match(/    sourceDistinction: /g) || []).length, 4);
  assert.ok(detail.includes('district.verifiedEvidence.authoritySummary'));
  assert.ok(detail.includes('district.verifiedEvidence.sourceDistinction'));
  assert.ok(detail.includes('district.verifiedEvidence.teaSource'));
  assert.ok(detail.includes('district.verifiedEvidence.uilSource'));
  assert.ok(detail.includes('district.verifiedEvidence.campusId'));
  assert.ok(head.includes('loaderData.verifiedEvidence'));
  assert.ok(head.includes('rel: \'canonical\''));
});

test('TEA campus and district URL identifiers preserve leading zeros as strings', () => {
  assert.ok(bridges.includes("const districtId = bridge.campusId.slice(0, 6);"));
  assert.ok(bridges.includes('id=${bridge.campusId}&view=school'));
  assert.ok(bridges.includes('id=${districtId}&view=district'));
});
