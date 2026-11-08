import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(p, 'utf8');
const slugs = ['dell-city', 'denison', 'denton', 'denton-braswell', 'denton-guyer'];
const newSlugs = ['dimmitt', 'donna', 'donna-north', 'dripping-springs', 'dublin'];
const source = read('src/data/high-school-football/program-editorial-b015.ts');
const match = source.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(match, 'Batch015 editorial map missing');
const guides = JSON.parse(match[1]);
assert.deepEqual(Object.keys(guides).slice(0, 5), slugs, 'preserve original five authored guides');
const loader = read('src/data/high-school-football/program-editorial-b015-loader.server.ts');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
assert.ok(server.includes('await loadBatch015FootballProgramEditorial(canonicalSlug)'), 'not wired into SSR');
assert.ok(loader.includes("import('./program-editorial-b015')"), 'missing lazy loader');
assert.ok(loader.includes('!BATCH015_FIRST_TWENTY.has(slug)'), 'Batch015 loader must check the defined twenty-school allowlist, not an obsolete variable');
assert.ok(!loader.includes('BATCH015_FIRST_THREE.has(slug)'), 'obsolete loader identifier causes production SSR ReferenceError');
const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
assert.equal(registry.schoolRecords.filter(s => s.status === 'VERIFIED').length, 330, 'do not change historical certifications');
for (const slug of slugs) {
  const g = guides[slug];
  assert.equal(g.slug, slug);
  assert.equal(registry.schoolRecords.find(s => s.slug === slug)?.status, 'NOT_REVIEWED', 'source branch must not claim production certification');
  assert.ok(g.campus.sourceUrl.startsWith('https://') && g.schedule.sourceUrl.startsWith('https://'));
  assert.ok(g.overview.length >= 4 && g.faq.length >= 3 && g.milestones.length >= 2);
  assert.ok(g.campus.address && g.notice.body);
}
const nextFive = ['dimmitt', 'donna', 'donna-north', 'dripping-springs', 'dublin'];
for (const slug of nextFive) {
  const g = guides[slug];
  assert.ok(g && g.slug === slug, slug + ' missing authored guide');
  assert.equal(registry.schoolRecords.find(s => s.slug === slug)?.status, 'NOT_REVIEWED', slug + ' cannot be promoted without live Chrome');
  assert.ok(g.campus.address && g.campus.sourceUrl.startsWith('https://'), slug + ' missing official campus evidence');
  assert.ok(g.schedule.sourceUrl.startsWith('https://') && g.notice.sourceUrl.startsWith('https://'), slug + ' missing official schedule/venue boundary');
  assert.ok(g.overview.length >= 4 && g.milestones.length >= 2 && g.faq.length >= 3, slug + ' lacks distinct editorial sections');
  assert.ok(g.overview.join(' ').includes('County'), slug + ' missing county context');
}
assert.notEqual(guides['donna'].campus.address, guides['donna-north'].campus.address, 'distinct Donna campuses must not be conflated');
for (const slug of newSlugs) {
  const g = guides[slug];
  assert.equal(g?.slug, slug, slug + ' missing distinct editorial');
  assert.equal(registry.schoolRecords.find(row => row.slug === slug)?.status, 'NOT_REVIEWED');
  for (const field of ['campus', 'schedule', 'notice']) {
    assert.ok(g[field]?.sourceUrl?.startsWith('https://'), slug + ' missing official-source URL for ' + field);
    assert.ok(g[field]?.verifiedAt, slug + ' missing source date for ' + field);
  }
  assert.ok(g.overview.length >= 4 && g.milestones.length >= 2 && g.faq.length >= 3);
}
assert.notEqual(guides.donna.campus.address, guides['donna-north'].campus.address, 'Donna campuses must remain distinct');
const team = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county = read('src/routes/$kind.$slug.lazy.tsx');
for (const [slug, countySlug] of [['dimmitt','castro'],['donna','hidalgo'],['donna-north','hidalgo'],['dripping-springs','hays'],['dublin','erath']]) {
  assert.ok(team.includes("'" + slug + "': '" + countySlug + "'"), slug + ' missing campus-county map');
  assert.ok(county.includes("slug: '" + slug + "'"), slug + ' missing reciprocal county link');
}
for (const [slug, countySlug] of [['dell-city','hudspeth'],['denison','grayson'],['denton','denton'],['denton-braswell','denton'],['denton-guyer','denton']]) {
  assert.ok(team.includes("'" + slug + "': '" + countySlug + "'"), slug + ' missing campus county mapping');
  assert.ok(county.includes("slug: '" + slug + "'"), slug + ' missing reciprocal county listing');
}
for (const countySlug of ['hudspeth','grayson','denton']) {
  assert.equal([...county.matchAll(new RegExp("^  '" + countySlug + "':", 'gm'))].length, 1, countySlug + ' duplicate county key would erase existing school links');
}
assert.ok(guides['denison'].overview.join(' ').includes('326 W. Crawford'));
assert.ok(guides['denton-braswell'].campus.address.includes('Aubrey'));
assert.ok(guides['denton-guyer'].campus.address.includes('Teasley Lane'));
assert.ok(guides['denton'].campus.address.includes('Bronco Way'));
assert.ok(guides['denton'].notice.body.includes('not a confirmed universal'));
assert.ok(guides['dell-city'].faq[0].answer.includes('Not from the reviewed'));
console.log('PASS: twenty distinct first-party Batch015 SSR guides; registry unchanged and NOT production certified.');
