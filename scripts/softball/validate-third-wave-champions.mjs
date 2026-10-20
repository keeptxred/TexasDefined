#!/usr/bin/env node
/** Research-only guard for the two champion programs not in the first ten dossiers.
 * NEVER grants permission to publish a profile.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOFTBALL_RESEARCH_TOPICS } from './complete-first-release-audit.mjs';
const root=resolve(import.meta.dirname,'../..');
const get=(p)=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const text=(p)=>readFileSync(resolve(root,p),'utf8');
const book=get('docs/softball/research/THIRD_WAVE_CHAMPION_DOSSIERS_2026-10-12.json');
const registry=get('src/data/softball/uil-2026-27-registry.json');
const honors=get('docs/softball/research/uil-2026-state-champions-and-mvp.json');
const published=get('src/data/softball/published-team-profiles.json');
const desired=new Map([
  ['Mt Belvieu Barbers Hill',{conference:'6A',district:18,region:3,awarded:'Mont Belvieu Barbers Hill',titles:['2020-21','2024-25','2025-26']}],
  ['Montgomery Lake Creek',{conference:'5A',district:17,region:3,awarded:'Montgomery Lake Creek',titles:['2021-22','2022-23','2024-25','2025-26']}],
]);
assert.equal(book.version,1);
assert.equal(book.season,'2026-27');
assert.equal(book.status,'research-only');
assert.equal(book.publicationAuthorization,false);
assert.equal(book.programs.length,2);
const topicIds=new Set(SOFTBALL_RESEARCH_TOPICS.map(x=>x.id));
assert.equal(topicIds.size,38,'The complete first-release contract changed');
let checked=0;
for (const p of book.programs) {
  const official=desired.get(p.uilName);
  assert.ok(official,'Unexpected or duplicate 2026 UIL champion');
  desired.delete(p.uilName);
  assert.equal(p.researchStatus,'NOT READY TO PUBLISH');
  assert.equal(p.publicationAuthorization,false);
  assert.equal(p.alignment.season,'2026-27');
  for (const key of ['conference','district','region']) assert.equal(p.alignment[key],official[key]);
  const real=registry.schools.find(s=>s.name===p.uilName&&s.conference===official.conference&&s.district===official.district&&s.region===official.region);
  assert.ok(real,'Misidentified UIL football/softball school or conference');
  assert.equal(p.alignment.url,real.sourceUrl);
  assert.ok(honors.records.some(x=>x.champion===official.awarded&&x.registry2026_27.uilName===p.uilName),
    '2026 title team missing UIL champion crosswalk');
  assert.deepEqual(p.historicalChampionships.map(x=>x.season),official.titles,
    'Historic state champions or title-year assertions drifted');
  assert.ok(!published.pages.some(x=>x.identity?.uilName===p.uilName),
    'Research-only dossier may not be auto-published');
  const sourceIds=new Set();
  assert.ok(p.sources.length>=9);
  for(const s of p.sources){
    assert.ok(s.id&&!sourceIds.has(s.id),'Duplicate source ID');
    sourceIds.add(s.id);
    assert.equal(new URL(s.url).protocol,'https:');
    assert.equal(s.checkedAt,book.researchDate);
  }
  assert.equal(Object.keys(p.researchDimensions).length,38);
  assert.ok(Object.keys(p.researchDimensions).every(id=>topicIds.has(id)));
  for(const t of SOFTBALL_RESEARCH_TOPICS) {
    const d=p.researchDimensions[t.id];
    assert.equal(d.critical,t.critical);
    assert.equal(d.researchPrompt,t.note);
    assert.ok(['source-lead-not-signed-off','research-open'].includes(d.state),
      'Research-only audit must never declare topic signed-off');
    assert.ok(Array.isArray(d.sourceIds)&&d.sourceIds.every(id=>sourceIds.has(id)));
    if(d.state==='source-lead-not-signed-off') assert.ok(d.sourceIds.length,
      'Source leads must actually identify evidence');
  }
  const factIds=new Set();
  assert.ok(p.facts.length>=10);
  for(const f of p.facts) {
    assert.ok(f.id&&!factIds.has(f.id),'Repeated fact identifier');
    factIds.add(f.id);
    assert.ok(f.claim.length>=70&&f.limitations.length>=60,'Each claim needs substantive caveat');
    assert.ok(f.sourceIds.length&&f.sourceIds.every(id=>sourceIds.has(id)),
      'Research observation requires traceable first-party sources');
    assert.equal(f.checkedAt,book.researchDate);
    checked++;
  }
  assert.ok(p.blockers.length>=7&&p.blockers.every(s=>s.length>=70),
    'No consequential publication blocker may be silently skipped');
}
assert.equal(desired.size,0,'Missing one 2026 champion research packet');
const draft=text('docs/softball/research/THIRD_WAVE_EDITORIAL_DRAFTS_2026-10-12.md');
assert.ok(draft.length>=6500&&draft.includes('RESEARCH ONLY'));
for(const school of ['Barbers Hill Eagles','Lake Creek Lions']) assert.ok(draft.includes(school));
assert.ok(draft.includes('11–0')&&draft.includes('40–1'),
  'Original title game and final-record source distinctions need editorial evidence');
console.log('PASS: 2 additional source-aware champion dossiers, '+checked+
  ' traced claims, both with all 38 research topics NOT signed off and zero unauthorized pages');
