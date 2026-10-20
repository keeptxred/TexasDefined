#!/usr/bin/env node
import assert from 'node:assert/strict';
import './verify-research-status.mjs';
import { validateProfile, validatePublishedManifest, SECTION_IDS } from './authority-contract.mjs';
import { SOFTBALL_RESEARCH_TOPICS } from './complete-first-release-audit.mjs';

const now = new Date('2026-10-11T15:00:00Z');
const reviewedAt = '2026-10-11';
const uilUrl = 'https://www.uiltexas.org/files/alignments/2ASB_Rvsd6-15.pdf';
const registry = { schools: [{
  name:'Amarillo Highland Park', conference:'2A', district:1, region:1, sourceUrl:uilUrl,
}] };
const sources = [
  {id:'uil-softball',url:uilUrl,title:'UIL official 2026-27 softball district alignment',kind:'uil',evidenceType:'primary',checkedAt:reviewedAt},
  {id:'school-official',url:'https://www.example.edu/softball',title:'School district official softball team information',kind:'school',evidenceType:'primary',checkedAt:reviewedAt},
  {id:'local-government',url:'https://www.texas.gov/venue',title:'Municipal field and game-day visitor records',kind:'government',evidenceType:'primary',checkedAt:reviewedAt},
  {id:'school-archive',url:'https://alumni.example.edu/archive',title:'School archives and softball program recollections',kind:'school',evidenceType:'primary',checkedAt:reviewedAt},
  {id:'state-results',url:'https://results.uiltexas.org/softball',title:'UIL archived championship tournament results',kind:'governing',evidenceType:'primary',checkedAt:reviewedAt},
  {id:'local-coverage',url:'https://panhandle.example.org/softball',title:'Local archived softball championship reporting',kind:'news',evidenceType:'secondary',checkedAt:reviewedAt},
];
const sectionText = (key, i) => [...Array(92)].map((_,j) => key + '-evidence-' + j + ' ' + ['school','verified','history','program','article','athletics'][i%6]).join(' ');

function valid() {
  return {
    slug:'amarillo-highland-park', status:'published', title:'Amarillo Highland Park softball: independently verified team history',
    ownerApproved:true, editor:'TexasDefined Editorial', canonicalPath:'/sports/softball/amarillo-highland-park',
    sport:'girls-softball', season:'2026-27', reviewedAt,
    uniqueThesis:'The verified historical record for the Amarillo Highland Park program requires comparison of the official softball district alignment, school archives, game-day venue and the community context. This research explains distinctive institutional milestones, player pathways and actual school-specific program identity, with original records rather than general praise and borrowed football classifications.',
    identity:{uilName:'Amarillo Highland Park',conference:'2A',district:1,region:1,schoolOfficialUrl:'https://www.example.edu',city:'Amarillo',schoolDistrict:'Highland Park ISD',mascot:'Hornets',county:'Potter',softballTeamName:'Lady Hornets'},
    sources:structuredClone(sources),
    researchAudit:Object.fromEntries(SOFTBALL_RESEARCH_TOPICS.map((topic,i)=>[topic.id,{
      finding:'verified',
      summary:'Synthetic evidence notes for the '+topic.id+' requirement specify independently consulted official school records, dated UIL documents and school-specific factual research to justify this first publication.',
      sourceIds:[sources[i % sources.length].id], checkedAt:reviewedAt,
    }])),
    claims:[...Array(20)].map((_,i)=>({
      id:'fact-'+i, text:'Documented school-specific evidence for season '+i+' identifies a distinct verified program milestone for the named varsity softball school.',
      sourceIds:[sources[i%sources.length].id],asOf:reviewedAt,
    })),
    sections:Object.fromEntries(SECTION_IDS.map((key,i)=>[key,{text:sectionText(key,i),sourceIds:[sources[i%sources.length].id]}])),
    media:[{path:'/images/softball/amarillo-highland-park.jpg',rights:'owned-original',sourceUrl:'https://www.example.edu/athletics',permissionEvidenceUrl:'https://www.example.edu/media-rights',alt:'A verified school-specific photo showing the softball home venue',credit:'TexasDefined verified media collection',identifiableMinor:false}],
    relatedPaths:['/sports/softball','/sports/softball/schools','/county/potter'],
    correctionsPolicy:'All records are checked against date-stamped primary sources. Readers may request corrections through our editorial team; contested information is reviewed, attributed, dated and corrected publicly when necessary.',
  };
}
function rejected(description, change, pattern) {
  const p=valid();
  change(p);
  const errors=validateProfile(p,registry,now);
  assert.ok(errors.some((msg)=>msg.includes(pattern)), description + ' should fail on ' + pattern + ', got: ' + errors.join('; '));
  console.log('PASS rejects ' + description);
}

const fixture=valid();
const baseline=validateProfile(fixture,registry,now);
assert.deepEqual(baseline,[],'Test-only complete editorial fixture must pass: '+baseline.join('; '));
assert.deepEqual(validatePublishedManifest({version:1,pages:[fixture]},registry,now),[]);
assert.deepEqual(validatePublishedManifest({version:1,pages:[]},registry,now),[]);
console.log('PASS: complete synthetic acceptance fixture, and no mass publishing from UIL directory');

rejected('incorrect UIL football-style district',p=>{p.identity.district=4},'exact match');
rejected('unknown club/football sport',p=>{p.sport='football'},'sport must be');
rejected('unapproved research draft',p=>{p.ownerApproved=false},'sign-off');
rejected('uncited claims',p=>{p.claims[0].sourceIds=[]},'every fact');
rejected('undated historical facts',p=>{p.claims[2].asOf='unknown'},'dated');
rejected('duplicate fact claims',p=>{p.claims[2].text=p.claims[1].text},'duplicate sourced fact');
rejected('missing UIL original PDF',p=>{p.sources[0].url='https://x.example/other'},'exact UIL');
rejected('too few independent sources',p=>{p.sources=p.sources.slice(0,1)},'six attributed');
rejected('thin team history section',p=>{p.sections.programHistory.text='Generic winning team.'},'programHistory');
rejected('placeholder prose',p=>{p.sections.programHistory.text+=' TODO'},'placeholder');
rejected('missing genuinely unique writing',p=>{p.uniqueThesis='Great softball team.'},'unique');
rejected('unlicensed stock/team image',p=>{p.media[0].rights='borrowed-internet'},'unlicensed');
rejected('identifiable minor photos',p=>{p.media[0].identifiableMinor=true},'minors');
rejected('no media rights evidence',p=>{p.media[0].permissionEvidenceUrl=''},'permission');
rejected('no source trace on venue',p=>{p.sections.homeFieldAndGameDay.sourceIds=[]},'homeFieldAndGameDay');
rejected('no backlink to state directory',p=>{p.relatedPaths=['/sports/softball','/county/potter']},'two hub backlinks');
rejected('expired seasonal research',p=>{p.reviewedAt='2025-01-01'},'older than');
rejected('incomplete first-release topic',p=>{delete p.researchAudit.programOrigins},'programOrigins');
rejected('unresolved topic after initial research',p=>{p.researchAudit.programOrigins.finding='pending'},'never pending');
rejected('missing verified game-day policies',p=>{p.researchAudit.gameDayPlanning.finding='documented-no-record'},'must be verified');
rejected('evidence-free source claims',p=>{p.researchAudit.homeFieldLocation.sourceIds=[]},'homeFieldLocation');
rejected('stale school-specific audit',p=>{p.researchAudit.championships.checkedAt='2025-03-11'},'season-current');
rejected('undocumented missing historical record',p=>{
  p.researchAudit.programOrigins.finding='documented-no-record';
  p.researchAudit.programOrigins.recordsSearched='';
},'documented search effort');
rejected('unsourced campus county',p=>{p.identity.county=''},'county');
rejected('unsourced softball team mascot',p=>{p.identity.mascot=''},'mascot');
rejected('unresearched local school identity',p=>{p.identity.schoolDistrict=''},'schoolDistrict');
const duplicate=structuredClone(fixture);
duplicate.slug='amarillo-highland-park-duplicate';
duplicate.canonicalPath='/sports/softball/'+duplicate.slug;
const errors=validatePublishedManifest({version:1,pages:[fixture,duplicate]},registry,now);
assert.ok(errors.some(x=>x.includes('Same school-season')),'No school-season may generate two pages');
assert.ok(errors.some(x=>x.includes('boilerplate duplicate')),'Entire shared articles must not pass as unique research');
console.log('PASS: 26 individual negative cases plus duplicate-school and duplicated-article gates, including every first-release research topic');
