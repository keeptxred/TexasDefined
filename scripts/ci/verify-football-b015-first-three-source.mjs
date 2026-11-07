import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(p, 'utf8');
const slugs = ['dell-city', 'denison', 'denton'];
const source = read('src/data/high-school-football/program-editorial-b015.ts');
const match = source.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(match, 'Batch015 editorial map missing');
const guides = JSON.parse(match[1]);
assert.deepEqual(Object.keys(guides), slugs);
const loader = read('src/data/high-school-football/program-editorial-b015-loader.server.ts');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
assert.ok(server.includes('await loadBatch015FootballProgramEditorial(canonicalSlug)'), 'not wired into SSR');
assert.ok(loader.includes("import('./program-editorial-b015')"), 'missing lazy loader');
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
const team = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county = read('src/routes/$kind.$slug.lazy.tsx');
for (const [slug, countySlug] of [['dell-city','hudspeth'],['denison','grayson'],['denton','denton']]) {
  assert.ok(team.includes("'" + slug + "': '" + countySlug + "'"), slug + ' missing campus county mapping');
  assert.ok(county.includes("slug: '" + slug + "'"), slug + ' missing reciprocal county listing');
}
for (const countySlug of ['hudspeth','grayson','denton']) {
  assert.equal([...county.matchAll(new RegExp("^  '" + countySlug + "':", 'gm'))].length, 1, countySlug + ' duplicate county key would erase existing school links');
}
assert.ok(guides['denison'].overview.join(' ').includes('326 W. Crawford'));
assert.ok(guides['denton'].notice.body.includes('not a confirmed universal'));
assert.ok(guides['dell-city'].faq[0].answer.includes('Not from the reviewed'));
console.log('PASS: three distinct first-party Batch015 SSR guides; registry unchanged and NOT production certified.');
