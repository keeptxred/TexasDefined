import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(p,'utf8');
const slugs = ['denton-ryan','denver-city','detroit','devine','deweyville'];
const source = read('src/data/high-school-football/program-editorial-b015.ts');
const m = source.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(m,'Batch015 editorial map absent');
const guides = JSON.parse(m[1]);
assert.deepEqual(Object.keys(guides).slice(5,10),slugs,'second-five school identities and order');
const loader = read('src/data/high-school-football/program-editorial-b015-loader.server.ts');
assert.ok(loader.includes('!BATCH015_FIRST_TEN.has(slug)'), 'SSR loader allowlist must be defined');
for(const slug of slugs) {
 const g = guides[slug];
 assert.equal(g?.slug,slug);
 assert.ok(g.campus.address && g.campus.sourceUrl.startsWith('https://'));
 assert.ok(g.schedule.sourceUrl.startsWith('https://'));
 assert.ok(g.overview.length>=4 && g.faq.length>=3 && g.milestones.length>=2);
}
const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
assert.equal(registry.schoolRecords.filter(s=>s.status==='VERIFIED').length,330,'preserve historical certified count');
for(const slug of slugs)assert.equal(registry.schoolRecords.find(s=>s.slug===slug)?.status,'NOT_REVIEWED','no unverified promotion');
const team = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county = read('src/routes/$kind.$slug.lazy.tsx');
for(const [slug,c] of [['denton-ryan','denton'],['detroit','red-river'],['deweyville','newton']]) {
 assert.ok(team.includes("'"+slug+"': '"+c+"'"),slug+' physical county mapping missing');
 assert.ok(county.includes("slug: '"+slug+"'"),slug+' county reciprocal link missing');
 assert.equal([...county.matchAll(new RegExp("^  '"+c+"':",'gm'))].length,1,c+' duplicate county mapping');
}
assert.ok(guides.detroit.overview.join(' ').includes('110 E Garner'),'district-office collision guard');
assert.ok(guides.deweyville.overview.join(' ').includes('Newton County'),'postal city is not county');
assert.ok(guides['denton-ryan'].overview.join(' ').includes('East McKinney'),'Ryan distinct campus guard');
assert.ok(guides.devine.overview.join(' ').includes('605 W Hondo'),'Devine district-office collision guard');
assert.ok(guides['denver-city'].notice.body.includes('Nov. 6'),'dated event is not universal venue');
console.log('PASS: five distinct Batch015 second-five source-bounded SSR guides, three verified reciprocal counties, no false certification');
