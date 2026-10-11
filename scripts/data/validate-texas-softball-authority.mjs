#!/usr/bin/env node
/** Protection against thin, unsourced or unroutable Texas softball pages. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const head = read('src/routes/sports.softball.{-$team}.tsx');
const shell = read('src/routes/sports.softball.{-$team}.lazy.tsx');
const hub = read('src/components/softball/SoftballHubPage.tsx');
const paris = read('src/components/softball/ParisJuniorCollegePage.tsx');
const volts = read('src/components/softball/TexasVoltsPage.tsx');
const schoolsPage = read('src/components/softball/SoftballSchoolsDirectory.tsx');
const sports = read('src/routes/sports.lazy.tsx');
const index = read('src/lib/public-routes.ts');

assert.ok(head.includes("createFileRoute('/sports/softball/{-$team}')"), 'One optional route must serve the hub and team profiles');
assert.ok(shell.includes("createLazyFileRoute('/sports/softball/{-$team}')"), 'Team pages must live in lazy router chunk');
assert.ok(head.includes('beforeLoad') && head.includes('notFound()'), 'Unknown team slugs must return 404');
assert.ok(head.includes('canonicalPath') && head.includes('title:') && head.includes('description'), 'All variants need unique SEO');
for (const [slug, body] of [['', hub], ['paris-junior-college', paris], ['texas-volts', volts], ['schools', schoolsPage]]) {
  const url = slug ? '/sports/softball/' + slug : '/sports/softball';
  assert.ok(index.includes('"' + url + '"'), 'Indexable registry missing ' + url);
  assert.ok(sports.includes('/sports/softball'), 'Sports homepage must link to hub');
  assert.ok(body.includes('application/ld+json'), url + ' must include SSR structured data');
  assert.ok(body.includes('Breadcrumb'), url + ' must show accessible breadcrumbs');
  assert.ok(body.includes('2026-10-11'), url + ' must carry reviewed source date');
  if (slug) {
    assert.ok(shell.includes("team === '" + slug + "'"), 'Dispatch missing team profile ' + slug);
    assert.ok(head.includes("'" + slug + "':"), 'Head route missing source-specific metadata for ' + slug);
  }
}
assert.ok(hub.includes('/sports/softball/paris-junior-college'), 'Hub must link PJC');
assert.ok(hub.includes('/sports/softball/texas-volts'), 'Hub must link professional softball');
assert.ok(paris.includes('/sports/softball'), 'PJC must link back to hub');
assert.ok(volts.includes('/sports/softball'), 'Volts must link back to hub');

for (const winner of ['Jonesboro', 'Ganado', 'Shiner', 'Grandview', 'Santa Gertrudis Academy',
  'Bullard', 'Liberty', 'Mont Belvieu Barbers Hill', 'Montgomery Lake Creek', 'Pearland', 'Katy']) {
  assert.ok(hub.includes(winner), 'Missing verified 2026 UIL champion: ' + winner);
}
for (const original of ['https://www.uiltexas.org/softball/archives', 'https://www.uiltexas.org/softball/alignments',
  'https://theausl.com/volts/about/', 'https://www.njcaa.org/', 'https://ascsports.org/standings.aspx?path=softball']) {
  assert.ok(hub.includes(original), 'Missing original governing-body reference: ' + original);
}
assert.ok(paris.includes('https://nfca.org/'), 'Paris award requires original NFCA source');
assert.ok(paris.includes('July 6, 2026'), 'Coach transition needs exact date');
assert.ok(paris.includes('2002'), 'Butler historical starting year must be stated');
assert.ok(paris.includes('regional staff honor'), 'Award may not be mislabeled as national or individual');
assert.ok(paris.includes('excluded here until'), 'Unverified biography must remain excluded');
assert.ok(volts.includes('AUSL') && volts.includes('Dell Diamond'), 'Professional softball profile incomplete');
assert.ok(hub.includes('/sports/softball/schools'), 'Hub must link to verified UIL directory');
assert.ok(schoolsPage.includes('/data/texas-softball-uil-2026-27.csv'), 'School directory must expose downloadable CSV');
assert.ok(schoolsPage.includes('useMemo') && schoolsPage.includes('useState'), 'School directory needs real school/region/conference/district filtering');

for (const body of [hub, paris, volts]) {
  for (const match of body.matchAll(/https:\/\/[^\s'"<>]+/g)) {
    const link = match[0].replace(/[),.;]+$/, '');
    if (link.includes('${')) continue;
    try { new URL(link); } catch { throw new Error('Invalid softball source URL: ' + match[0]); }
  }
}
const sourceSet = {
  '2A': 'https://www.uiltexas.org/files/alignments/2ASB_Rvsd6-15.pdf',
  '3A': 'https://www.uiltexas.org/files/alignments/263ASB.pdf',
  '4A': 'https://www.uiltexas.org/files/alignments/264ASB.pdf',
  '5A': 'https://www.uiltexas.org/files/alignments/265ASB.pdf',
  '6A': 'https://www.uiltexas.org/files/alignments/266ASB.pdf',
};
const alignment = JSON.parse(read('src/data/softball/uil-2026-27-registry.json'));
const csv = read('public/data/texas-softball-uil-2026-27.csv').trim();
assert.equal(alignment.season, '2026-27');
assert.equal(alignment.lastReviewed, '2026-10-11');
assert.equal(alignment.schools.length, 1192, '2026–27 UIL PDF extraction must preserve all reviewed source rows');
assert.equal(alignment.sources.length, 5);
const unique = new Set();
const seenDistricts = new Set();
for (const school of alignment.schools) {
  const pdf = sourceSet[school.conference];
  assert.ok(pdf, 'Unrecognized UIL softball conference '+school.conference);
  assert.equal(school.sourceUrl, pdf, 'Every listing must retain its exact conference-specific source PDF');
  assert.ok(Number.isInteger(school.district) && school.district>=1 && school.district<=32);
  assert.equal(school.region, Math.floor((school.district - 1)/8)+1, 'UIL district-to-region calculation failed');
  assert.ok(school.name.length >= 3 && !school.name.startsWith('District '));
  assert.ok(!/\s{2,}/.test(school.name), 'Bad PDF line-wrap artifact: '+school.name);
  const key=school.conference+'|'+school.name.toLowerCase();
  assert.ok(!unique.has(key), 'Duplicate listed school within conference: '+key);
  unique.add(key);
  seenDistricts.add(school.conference+'|'+school.district);
}
assert.equal(seenDistricts.size, 160, 'All 5×32 current UIL softball districts must be represented');
for (const source of alignment.sources) {
  assert.equal(source.sourceUrl, sourceSet[source.conference]);
  assert.equal(source.districtCount, 32);
  assert.equal(alignment.schools.filter(s => s.conference===source.conference).length, source.schoolCount);
}
assert.equal(csv.split(/\r?\n/).length, alignment.schools.length+1, 'CSV must have exactly one header plus all 1,192 rows');
assert.ok(csv.startsWith('name,conference,district,region,sourceUrl'), 'Export must retain primary-source URLs and grouping keys');
console.log('PASS: 2026–27 UIL softball directory, all 1,192 source-linked school listings across 160 sport-specific districts, filters and CSV');
console.log('PASS: scalable optional route, four source-backed softball pages, official 2026 UIL champions and SEO safeguards');
