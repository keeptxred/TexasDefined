import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
const expected = ["fabens","fairfield","falfurrias","falls-city","farmersville","farwell","ferris","first-baptist-dallas","flatonia","florence","floresville","floydada","follett","forestburg","forney","forsan","fort-bend-austin","fort-bend-bush","fort-bend-christian","fort-bend-clements","fort-bend-crawford","fort-bend-dulles","fort-bend-elkins","fort-bend-hightower","fort-bend-kempner"];
assert.equal(registry.batch.number, 18, 'Batch018 registry active');
assert.deepEqual(registry.batch.slugs, expected, 'one stable 25-school Batch018 roster');
assert.equal(registry.schoolRecords.filter(record => record.status === 'VERIFIED').length, 405, 'do not alter prior signed 405 VERIFIED');
const identities = read('src/data/high-school-football/school-identities.ts');
const identitySlugs = [...identities.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(match => match[1]);
assert.equal(new Set(identitySlugs).size, identitySlugs.length,
  'school mascot identity must be unique across the verified directory');
const identityLines = identities.split('\n');
for (const slug of expected) {
  const row = identityLines.find(line => line.includes("slug: '" + slug + "'"));
  assert.ok(row && /mascot: '[^']+'/.test(row) && /sourceUrl: 'https:\/\/[^']+'/.test(row),
    'missing independently sourced mascot and school or TAPPS campus identity: ' + slug);
}
const states = expected.map(slug => {
  const record = registry.schoolRecords.find(item => item.slug === slug);
  assert.equal(record?.batch, 18, 'missing assigned school ' + slug);
  assert.ok(['NOT_REVIEWED', 'IMPLEMENTED'].includes(record.status), 'no unproved VERIFIED status ' + slug);
  return record.status;
});
assert.ok(states.every(state => state === 'NOT_REVIEWED') || states.every(state => state === 'IMPLEMENTED'),
  'no partial source-status promotion: all 25 school statuses must advance together');
const filenames = ['batch018-county-edges.ts','batch018-second-five-county-edges.ts','batch018-third-five-county-edges.ts','batch018-fourth-five-county-edges.ts','batch018-fifth-five-county-edges.ts'];
const edges = filenames.flatMap(name => [...read('src/data/high-school-football/' + name).matchAll(/[{] slug: '([a-z0-9-]+)', name: '[^']+', county: '([a-z0-9-]+)'/g)].map(([,slug,county]) => ({slug,county})));
assert.deepEqual(edges.map(edge => edge.slug), expected, '25 source-backed distinct campus counties in stable roster order');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const school = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county = read('src/routes/$kind.$slug.lazy.tsx');
assert.ok(school.includes("program.district === 21 && hasDistrict21TeamScorecard(schoolName)"),
  'retain source-checked 6A District 21 scorecards for Hightower, Elkins and all Batch018 overlays');
assert.ok(!school.includes('&& !editorial?.season && !editorial?.notice && hasDistrict21TeamScorecard(schoolName)'),
  'new editorial overlays must not suppress independently verified District 21 results');
const loaders = ['getBatch018SecondFiveEditorial','getBatch018ThirdFiveEditorial','getBatch018FourthFiveEditorial','getBatch018FifthFiveEditorial'];
for (const name of loaders) {
  assert.ok(server.includes(name + '(canonicalSlug)'), 'missing public SSR loader ' + name);
  assert.ok(server.includes(name + '(legacy.featured.slug)'), 'missing private fallback loader ' + name);
}
for (const name of ['BATCH018_FOOTBALL_COUNTY_EDGES','BATCH018_SECOND_FIVE_COUNTY_EDGES','BATCH018_THIRD_FIVE_COUNTY_EDGES','BATCH018_FOURTH_FIVE_COUNTY_EDGES','BATCH018_FIFTH_FIVE_COUNTY_EDGES']) {
  assert.ok(school.includes(name + '.map'), 'missing school->county links ' + name);
  assert.ok(county.includes(name + '.filter'), 'missing county->school links ' + name);
}
// Authority/Google helpful-content guard: a sourced school profile must be
// a practical, individually reported guide rather than a thin template or a
// repeated promise about what our AI/editorial process did not invent.
for (const slug of expected) {
  const editorial=read('src/data/high-school-football/program-editorial-b018-'+slug+'.ts');
  const overview=editorial.match(/\\n  overview: \\[([\\s\\S]*?)\\n  \\],/);
  assert.ok(overview,'Missing original school overview: '+slug);
  const paragraphs=overview[1].split('\\n').filter(line=>/^    ['"]/.test(line));
  assert.ok(paragraphs.length>=5,'Fewer than five school-specific editorial paragraphs: '+slug);
  assert.equal(new Set(paragraphs).size,paragraphs.length,'Duplicate sourced editorial paragraphs: '+slug);
  assert.ok((editorial.match(/https:\\/\\//g)||[]).length>=5,
    'Insufficient direct independent school/UIL source links: '+slug);
  const words=(editorial.replace(/https?:\\/\\/[^\\s'"]+/g,'').match(/[A-Za-zÀ-ÿ0-9’-]+/g)||[]).length;
  assert.ok(words>=460,'Batch018 thin source copy (below 460 bounded words): '+slug+' '+words);
  for (const paragraph of paragraphs) {
    assert.ok(!/^\\s*['"]No (?:other )?(?:unsourced|unverified|unsupported|unlicensed|fabricated|copyrighted)\\b/i.test(paragraph),
      'Replace meta-editorial disclaimers with useful verified visitor detail: '+slug);
    assert.ok(!/\\b(?:nestled|hidden gem|in conclusion|unparalleled|vibrant tapestry|embark on a journey)\\b/i.test(paragraph),
      'Robotic stock editorial wording in source: '+slug);
  }
}
console.log('PASS 25 Batch018 official-source school/campus edge integration, SSR, private fallback, and preserved signed 405; production 75/25 Chrome still required.');
