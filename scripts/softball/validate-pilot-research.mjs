#!/usr/bin/env node
// Five research dossiers are NOT authority pages. This validator ensures
// their initial identity/facts/sources cannot drift or be confused with
// neighboring schools while publication remains blocked until complete.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOFTBALL_RESEARCH_TOPICS } from './complete-first-release-audit.mjs';

const root=resolve(import.meta.dirname,'../..');
const get=(path)=>JSON.parse(readFileSync(resolve(root,path),'utf8'));
const registry=get('src/data/softball/uil-2026-27-registry.json');
const pilot=get('docs/softball/research/PILOT_DOSSIERS_2026-10-11.json');
const approved=get('src/data/softball/published-team-profiles.json');
assert.equal(pilot.season,registry.season);
assert.equal(pilot.publicationAuthorization,false,'Research notes are not authorization to publish');
assert.ok(pilot.pilotSchools.length>=5,'Maintain five diverse research pilot schools');
const seen=new Set();
let sources=0,facts=0,gaps=0;
const researched={};
for(const p of pilot.pilotSchools){
  assert.ok(!seen.has(p.name),'Duplicate school research '+p.name);
  seen.add(p.name);
  assert.equal(p.researchReadiness,'NOT READY TO PUBLISH','Dossiers cannot masquerade as published pages');
  assert.ok(!approved.pages.some(x=>x.identity?.uilName===p.name),
    'A research dossier is not sufficient to approve publishing '+p.name);
  const verified=registry.schools.find(s=>s.name===p.name&&s.conference===p.identity.conference&&s.district===p.identity.district&&s.region===p.identity.region);
  assert.ok(verified,'Wrong season or football district for '+p.name);
  assert.ok(p.sources.some(s=>s.url===verified.sourceUrl&&s.kind==='official-uil'),'Original source-specific alignment URL absent for '+p.name);
  assert.ok(p.sources.length>=4,'At least four real research sources required before dossier');
  assert.ok(p.facts.length>=4,'At least four individually attributed research observations required before dossier');
  assert.ok(p.gaps.length>=4,'Incomplete aspects must be clearly recorded before page promotion');
  assert.ok(p.identity.campusUrl.startsWith('https://'),'Require official campus/source URL for '+p.name);
  const ids=new Set();
  for(const s of p.sources){
    assert.ok(s.id&&!ids.has(s.id),'Duplicate source ID for '+p.name);
    ids.add(s.id);
    const u=new URL(s.url);
    assert.equal(u.protocol,'https:','Official reference must be HTTPS');
    assert.equal(s.checkedAt,pilot.lastReviewed,'Keep every source check version-stamped');
  }
  for(const f of p.facts){
    assert.ok(f.claim.length>=60, 'Avoid terse generic historical claim '+p.name);
    assert.ok(Array.isArray(f.sourceIds)&&f.sourceIds.length>0&&f.sourceIds.every(id=>ids.has(id)),'Source ID missing in '+p.name);
    assert.match(f.season,/^20\d\d-\d\d$/,'Every fact must say what season it concerns');
  }
  assert.ok(!p.sources.some(s=>s.kind==='identity-disambiguation-ONLY' && !s.title.includes('WRONG SCHOOL')),
    'Disambiguation sources must state they are excluded');
  assert.ok(!/READY TO PUBLISH|ready-to-publish/.test(p.programStatus),'No partial program page is ready');
  researched[p.name]=[p.facts.length,p.sources.length,p.gaps.length];
  facts+=p.facts.length;
  sources+=p.sources.length;
  gaps+=p.gaps.length;
}
// Research findings that must not regress into missing football-style history.
const byName = name => pilot.pilotSchools.find(p=>p.name === name);
const verifiedFact = (team, needle, sourceId) => {
  const record = byName(team)?.facts.find(f => f.claim.includes(needle) && f.sourceIds.includes(sourceId));
  assert.ok(record, team + ': missing authoritative dated finding ' + needle + ' from ' + sourceId);
};
verifiedFact('Shiner', '2001, 2002, 2008, 2011, 2015, 2016, 2024 and 2026', 'uil-state-2026');
verifiedFact('Shiner', 'Steven Cerny', 'uil-2017-team');
verifiedFact('Shiner', 'runner-up', 'uil-2025-final');
verifiedFact('Shiner', 'cutoff date', 'uil-2026-pairings');
verifiedFact('Ganado', '2025–26 Ganado softball schedule', 'school-schedules');
verifiedFact('Ganado', 'prefinal submitted tally', 'uil-2026-pairings');
verifiedFact('Katy', 'its general campus address', 'school-contact');
verifiedFact('Pearland', 'varsity softball and JV softball filters', 'school-live-calendar');
verifiedFact('Pearland', "potentially inconsistent 'Game 3' opponent", 'school-2026-ticketing');
verifiedFact('Pearland', 'Michele Hyden', 'school-general-current');
assert.ok(byName('Shiner').sources.some(s => s.url.includes('/historical-archives/athletics/archives/softball/state/00_01/')),
  'Preserve primary original 2001 Shiner championship source rather than generic third-party archive');
assert.ok(byName('Pearland').gaps.some(g => g.includes('softball stadium/field')),
  'Keep Pearland softball field unverified until official venue-specific evidence is found');

const collision=pilot.pilotSchools.find(p=>p.name==='Amarillo Highland Park');
assert.ok(collision,'Collision test requires Amarillo Highland Park Hornets');
assert.equal(collision.identity.campusUrl,'https://www.hpisd.net/','Do not confuse Amarillo Hornets with Dallas Scots');
assert.ok(collision.conflicts.some(s=>s.includes('Dallas')),'Record Dallas school identity collision');
assert.ok(!pilot.pilotSchools.some(p=>p.identity.campusUrl.includes('hpisd.org')),'Dallas school never belongs in this pilot');
const required=new Set(SOFTBALL_RESEARCH_TOPICS.map(s=>s.id));
assert.equal(required.size,38,'Keep complete-first-publish topic count stable');
assert.ok(!pilot.publicationAuthorization,'No publish shortcut');
console.log('PASS: verified research-only pilot '+pilot.pilotSchools.length+' UIL softball programs, '+facts+' distinct source-linked preliminary facts, '+sources+' source references and '+gaps+' explicit remaining research gaps. No team pages published.');
for(const [school,c] of Object.entries(researched)) console.log(school+': facts='+c[0]+' sources='+c[1]+' gaps='+c[2]);
