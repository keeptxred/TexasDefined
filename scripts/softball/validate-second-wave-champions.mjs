#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'../..');
const load=(p)=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const book=load('docs/softball/research/SECOND_WAVE_CHAMPION_DOSSIERS_2026-10-12.json');
const registry=load('src/data/softball/uil-2026-27-registry.json');
const manifest=load('src/data/softball/published-team-profiles.json');
const wanted=['Jonesboro','Grandview','Santa Gertrudis Acad','Bullard','Liberty'];
assert.equal(book.version,1);
assert.equal(book.status,'research-only');
assert.equal(book.publicationAuthorization,false);
assert.equal(book.historicalTitleSeason,'2025-26');
assert.equal(book.conferenceSeason,'2026-27');
assert.equal(book.programs.length,wanted.length);
const seen=new Set();
let facts=0;
for (const p of book.programs) {
  assert.ok(wanted.includes(p.uilName)&&!seen.has(p.uilName),'Wrong or duplicate UIL school');
  seen.add(p.uilName);
  const real=registry.schools.find(s=>s.name===p.uilName&&s.conference===p.alignment.conference&&s.district===p.alignment.district&&s.region===p.alignment.region);
  assert.ok(real,'Wrong UIL softball alignment for '+p.uilName);
  assert.equal(p.alignment.sourceUrl,real.sourceUrl);
  assert.equal(p.approvalStatus,'RESEARCH ONLY — NOT READY FOR TEAM PAGE');
  assert.ok(!manifest.pages.some(x=>x.identity?.uilName===p.uilName));
  assert.equal(p.season,'2026-27');
  assert.ok(p.championshipHistory.titleYears.includes(2026));
  assert.equal(p.championshipHistory.originalChampionArchive,'https://www.uiltexas.org/softball/archives');
  assert.ok(p.uilTeamSheet2026.url.startsWith('https://www.uiltexas.org/softball/state-team/'));
  assert.ok(p.uilTeamSheet2026.headCoach.length>5&&p.uilTeamSheet2026.assistants.length>=2);
  assert.ok(p.uilTeamSheet2026.submittedRecord.length>=3);
  assert.ok(p.prepublicationFacts.length>=5&&p.identityConflicts.length>=2&&p.openResearch.length>=6);
  for(const f of p.prepublicationFacts) {
    assert.match(f.id,/^fact-[1-9][0-9]*$/);
    assert.ok(f.text.length>=95,'Source-backed useful fact for '+p.uilName);
    assert.ok(['2025-26','historical-as-labeled'].includes(f.season));
    assert.equal(f.checkedAt,book.researchedAt);
    const u=new URL(f.sourceUrl);
    assert.equal(u.protocol,'https:');
    assert.ok(['www.uiltexas.org','www.jonesboroisd.net','gvisd.org','www.sgisd.net','www.bullardisd.net','www.libertyisd.net'].includes(u.hostname),'Only original official school/UIL sources');
    facts++;
  }
}
const draft=readFileSync(resolve(root,'docs/softball/research/SECOND_WAVE_EDITORIAL_DRAFTS_2026-10-12.md'),'utf8');
assert.ok(draft.length>=7000,'Five distinct researched original stories, not short name-and-district stubs');
assert.ok(draft.includes('Publication is still prohibited'),'Editorial chapters must be research-only');
for(const p of book.programs){
  const lead=p.uilName === 'Santa Gertrudis Acad'?'Santa Gertrudis Academy':p.uilName;
  assert.ok(draft.includes('## '+lead),'Every champion must have a dedicated original editorial chapter');
  assert.ok(draft.includes(p.uilTeamSheet2026.url),'Every researched chapter needs its original UIL season sheet');
  assert.ok(draft.includes(p.originalSchoolSource),'Every research chapter must cite a school-owned website');
}
assert.ok(draft.includes('Jonesboro, Arkansas'),'Do not confuse Texas Jonesboro with Arkansas');
assert.ok(draft.includes('Liberty-Eylau ISD'),'Do not confuse Liberty ISD with Texarkana school');

assert.deepEqual([...seen].sort(),[...wanted].sort());
const by=(name)=>book.programs.find(x=>x.uilName===name);
assert.equal(by('Jonesboro').alignment.conference,'2A');
assert.equal(by('Jonesboro').championshipHistory.historical2026Class,'1A');
assert.ok(by('Santa Gertrudis Acad').identityConflicts.some(x=>x.includes('Kingsville')));
assert.ok(by('Liberty').identityConflicts.some(x=>x.includes('Liberty-Eylau')));
assert.ok(by('Bullard').identityConflicts.some(x=>x.includes('Panther Stadium')));
assert.ok(by('Grandview').openResearch.some(x=>x.includes('photography')));
console.log('PASS: '+seen.size+' independently researched UIL programs, '+facts+' dated source-linked notes and no unauthorized pages');
