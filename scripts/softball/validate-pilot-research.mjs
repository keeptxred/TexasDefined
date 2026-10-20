#!/usr/bin/env node
// Five research dossiers are NOT authority pages. This validator ensures
// their initial identity/facts/sources cannot drift or be confused with
// neighboring schools while publication remains blocked until complete.
import assert from 'node:assert/strict';
import './validate-second-wave-champions.mjs';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOFTBALL_RESEARCH_TOPICS } from './complete-first-release-audit.mjs';

const root=resolve(import.meta.dirname,'../..');
const get=(path)=>JSON.parse(readFileSync(resolve(root,path),'utf8'));

const validDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0,10) === value;
};
const researchDateValid = (value, last) =>
  validDate(value) && value <= last &&
  (Date.parse(last + 'T00:00:00Z') - Date.parse(value + 'T00:00:00Z')) <= 183 * 86400000;
// Supports both academic sports seasons (2026-27, 1995-96) and explicit
// multiyear historical periods (1988-1995). Do not misdate college coaching
// history merely to fit a modern 20xx softball-season-only validator.
const validSeasonOrHistoricalPeriod = value => {
  const match = typeof value === 'string' ? value.match(/^((?:18|19|20)\d{2})-(\d{2}|(?:18|19|20)\d{2})$/) : null;
  if (!match) return false;
  const start = Number(match[1]);
  const suffix = match[2];
  let end = suffix.length === 2 ? Math.floor(start / 100) * 100 + Number(suffix) : Number(suffix);
  if (suffix.length === 2 && end < start) end += 100;
  return end >= start && end - start <= 25;
};

// Contract self-tests: no invalid dates, invented 2027 records, malformed or
// truncated 1988–1995 coaching intervals, or future source-verification dates.
assert.ok(validSeasonOrHistoricalPeriod('1988-1995'));
assert.ok(validSeasonOrHistoricalPeriod('1995-96'));
assert.ok(validSeasonOrHistoricalPeriod('2026-27'));
for (const bad of ['unknown', '1991-', '1988-2090', '2027-2026', 'spring-2027', '2026-13-50'])
  assert.equal(validSeasonOrHistoricalPeriod(bad),false,'Reject invalid season/tenure '+bad);
assert.equal(validDate('2026-02-30'),false,'Reject impossible calendar dates');
assert.equal(researchDateValid('2026-10-13','2026-10-12'),false,'Reject tomorrow as already researched');
assert.equal(researchDateValid('2026-10-11','2026-10-12'),true,'Retain original per-source check date');

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
    assert.ok(researchDateValid(s.checkedAt,pilot.lastReviewed),'Source must retain its ACTUAL valid checkedAt date, be no newer than lastReviewed and no older than 183 days');
  }
  for(const f of p.facts){
    assert.ok(f.claim.length>=60, 'Avoid terse generic historical claim '+p.name);
    assert.ok(Array.isArray(f.sourceIds)&&f.sourceIds.length>0&&f.sourceIds.every(id=>ids.has(id)),'Source ID missing in '+p.name);
    assert.ok(validSeasonOrHistoricalPeriod(f.season),'Facts must specify a real sports year (e.g. 2026-27 or 1995-96) or a full historical tenure (e.g. 1988-1995)');
  }
  assert.ok(!p.sources.some(s=>s.kind==='identity-disambiguation-ONLY' && !s.title.includes('WRONG SCHOOL')),
    'Disambiguation sources must state they are excluded');
  // A documented 'not-ready-to-publish' status must not trigger a false positive.
  // Reject only affirmative publication-ready statuses, never a negative research warning.
  assert.ok(!/^ready(?:[- ]to[- ]publish)(?:$|[- ])/i.test(p.programStatus),'No partial program page is ready');
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
verifiedFact('Shiner','runner-up to Bosqueville in a 4–1 final','uil-2007-final');
verifiedFact('Shiner','Bosqueville 11–1 in the state final','uil-2008-final');
verifiedFact('Shiner','Brandon Siegel as head coach','uil-2011-team');
verifiedFact('Shiner','tournament offensive benchmarks','uil-2011-recordbook');
verifiedFact('Shiner', 'cutoff date', 'uil-2026-pairings');
verifiedFact('Ganado', '2025–26 Ganado softball schedule', 'school-schedules');
verifiedFact('Ganado', 'prefinal submitted tally', 'uil-2026-pairings');
verifiedFact('Katy', 'its general campus address', 'school-contact');
verifiedFact('Pearland', 'varsity softball and JV softball filters', 'school-live-calendar');
verifiedFact('Pearland', "potentially inconsistent 'Game 3' opponent", 'school-2026-ticketing');
verifiedFact('Pearland', 'Michele Hyden', 'school-general-current');
assert.ok(byName('Shiner').sources.some(s => s.url.includes('/historical-archives/athletics/archives/softball/state/00_01/')),
  'Preserve primary original 2001 Shiner championship source rather than generic third-party archive');
assert.ok(byName('Pearland').gaps.some(g => g.includes('precise address/entrance') && g.includes('accessible spectator parking/gates')),
  'Pearland historic complex name is verified; precise current entrance and visitor access must remain unresolved');

// Every pilot program needs an independently attributed *facility status*,
// not an assumed football stadium, campus office, city park, or generic venue.
for (const p of pilot.pilotSchools) {
  const v=p.venueResearch;
  assert.ok(v && typeof v.namedField==='string' && v.namedField.length>=12,
    p.name + ': missing school-specific softball venue research');
  assert.ok(Array.isArray(v.sourceIds) && v.sourceIds.length > 0,
    p.name + ': softball venue identity must cite inspected records');
  const byId=new Map(p.sources.map(source=>[source.id,source]));
  assert.ok(v.sourceIds.every(id=>byId.has(id)),p.name+': unknown venue evidence ID');
  assert.ok(v.notes.length >= 100,p.name+': must explain limitations of researched venue');
  for(const state of ['nameVerified','physicalAddressVerified','parkingVerified','accessibleSeatingVerified'])
    assert.equal(typeof v[state],'boolean',p.name+': facility research '+state+' must be explicitly decided');
  if (v.nameVerified) assert.ok(v.sourceIds.some(id=>byId.get(id).kind==='official-school'),
    p.name+': a positively verified softball home venue requires official school evidence');
  if (!v.physicalAddressVerified) assert.ok(!v.streetAddress,
    p.name+': do not fill softball venue street address from district or campus mailing address');
}
// Current school website roles are meaningful research, but no school has yet
// separately issued a verified Spring 2027 roster/coaching appointment list.
for(const p of pilot.pilotSchools) {
  const staff=p.coachingResearch;
  assert.ok(staff && researchDateValid(staff.schoolWebsiteAsOf,pilot.lastReviewed),
    p.name+': staff research must be current and dated');
  assert.ok(p.sources.some(source=>source.id===staff.schoolStaffPageSourceId&&source.kind==='official-school'),
    p.name+': present-tense staff evidence requires original school-owned source');
  assert.equal(staff.explicitSpring2027SeasonStaffPublished,false,
    p.name+': do not auto-promote dated historic coaches to Spring 2027 season appointments');
  assert.ok(staff.notes.length>60,p.name+': staff and season limitations must be written out');
}
assert.equal(byName('Shiner').coachingResearch.listedHeadCoach,'Jason Keller');
assert.equal(byName('Pearland').coachingResearch.listedHeadCoach,'Michele Hyden');
assert.equal(byName('Katy').coachingResearch.listedHeadCoach,'Megan Vanetta');
assert.equal(byName('Ganado').coachingResearch.listedHeadCoach,null,
  'Official Ganado faculty membership cannot prove 2027 softball coaching');
// Amarillo Highland Park history was NOT generic: independent May 2024
// interviews and a real 2024-25 schedule document its inaugural softball era.
// They must never be repackaged as a Spring 2027 coach or finished venue.
assert.equal(byName('Amarillo Highland Park').coachingResearch.historicalHeadCoach,'Eliza Martinez');
assert.equal(byName('Amarillo Highland Park').coachingResearch.historicalAssistantCoach,'Mary Lieberknecht');
assert.equal(byName('Amarillo Highland Park').coachingResearch.historyDate,'2024-2025');
assert.ok(byName('Amarillo Highland Park').sources.some(s=>s.id==='presspass-may-2024-origin' && s.kind.includes('independent')),
 'First-program coaching and construction evidence must cite contemporary local reporter');
assert.ok(byName('Amarillo Highland Park').sources.some(s=>s.id==='hpark-2025-coach-schedule' && s.kind.includes('mirrored')),
 'Mirrored 2024-25 softball schedule must not be elevated to an official school-hosted source');
verifiedFact('Amarillo Highland Park','inaugural head SOFTBALL coach','presspass-may-2024-origin');
verifiedFact('Amarillo Highland Park','assistant Mary Lieberknecht','hpark-2025-coach-schedule');
verifiedFact('Amarillo Highland Park','$130 million school bond','presspass-may-2024-origin');
verifiedFact('Amarillo Highland Park','completed March 22, 2025 varsity softball game','hpark-2025-game-results');
verifiedFact('Amarillo Highland Park','SOUTH END OF THE EXISTING FOOTBALL FIELD','kfdanews-groundbreaking-2024');
assert.ok(byName('Amarillo Highland Park').conflicts.some(c=>c.includes('Dallas Highland Park ISD hpisd.org 2024 bond')),
  'Never cross-pollinate Dallas school 2024 bond project or Westchester field into Amarillo 2024 new program');
assert.equal(byName('Amarillo Highland Park').venueResearch.physicalAddressVerified,false,
 'Groundbreaking does not verify built field coordinates or 2027 gate accessibility');

assert.equal(byName('Amarillo Highland Park').coachingResearch.listedHeadCoach,null,
  'Do not use unverified third-party coach initial or Dallas staff');
verifiedFact('Katy','Megan Vanetta','school-current-athletics-coaches');
verifiedFact('Pearland','Kaitlin Owens','school-current-staff');
verifiedFact('Shiner','Anastacia Rehak','school-current-softball-staff');
verifiedFact('Ganado','Joshua Ervin','ganado-current-faculty');
verifiedFact('Amarillo Highland Park',"'two newest programs,' softball and baseball",'amarillo-official-feed');
verifiedFact('Ganado','501 West Devers','ganado-campus-address');

assert.equal(byName('Ganado').venueResearch.namedField,'Ganado Softball Field');
assert.ok(byName('Katy').venueResearch.namedField.includes('Kalum Haack'),
 'Post-July 2026 Katy field is named for retired longtime coach Kalum Haack; pre-2026 event label KHS-Softball Field is stale');
verifiedFact('Katy','Kalum Haack','katy-2026-board-naming');
verifiedFact('Katy','2015 state-champion softball team','katy-athletic-hall-2025');
verifiedFact('Katy',"Kalum Haack was the Jayhawks' head coach every season from 1988 through 1995",'kansas-haack-original-records');
assert.equal(byName('Katy').facts.find(f=>f.claim.includes("Kalum Haack was the Jayhawks' head coach every season"))?.season,'1988-1995','Historic Kansas coach career must show the COMPLETE 1988–1995 span, not a fabricated 1991–95 subset');
verifiedFact('Katy','Gayle Luedke, not Kalum Haack, as the 1996 Jayhawks head coach','kansas-haack-original-records');
assert.ok(byName('Katy').venueResearch.sourceIds.includes('katy-aug2026-field-name-report'),
 'Local independent account and July 27 school board item must accompany renamed Katy varsity venue');
assert.equal(byName('Pearland').venueResearch.nameVerified,true,'Historic first-party Pearland camp flyer verifies the softball COMPLEX NAME, not the 2027 gate');
assert.equal(byName('Pearland').venueResearch.namedField,'PHS Lady Oiler Softball Complex');
assert.equal(byName('Pearland').venueResearch.physicalAddressVerified,false,
  'Do not mistake an off-campus private camp payment address for the school girls softball field');
verifiedFact('Pearland','PHS Lady Oiler Softball Complex','pearland-official-2023-camp-flyer');
verifiedFact('Pearland','Laneigh Clark','pearland-official-2023-camp-flyer');
verifiedFact('Pearland','older camp flyer must NEVER','pearland-official-2023-camp-flyer');
assert.ok(byName('Pearland').conflicts.some(x=>x.includes('incorrect') || x.includes('misleading')),
  'Older Pearland school flyer erroneously labels state-appearance years as championship wins');
assert.ok(byName('Pearland').facts.filter(f=>f.sourceIds.includes('pearland-official-2023-camp-flyer'))
   .every(f=>f.season==='2023-24'),'August 2023 camp material belongs to incoming 2023–24 academic-year context, never 2027');
assert.equal(byName('Amarillo Highland Park').venueResearch.nameVerified,true,'Official 2025 school report now verifies historic HP Softball Field name');
assert.equal(byName('Amarillo Highland Park').venueResearch.namedField,'HP Softball Field');
assert.equal(byName('Amarillo Highland Park').venueResearch.physicalAddressVerified,false,'School ribbon cutting is not a published softball field street/gate address');
verifiedFact('Amarillo Highland Park','Friday, March 28, 2025 ribbon cutting','amarillo-2025-ribbon-cutting');
verifiedFact('Amarillo Highland Park',"'HP Softball Field'",'amarillo-2025-softball-camp-field');
verifiedFact('Amarillo Highland Park','15–2 win over Follett','amarillo-2025-first-district-win');
// Assert the actual UIL 2026 selection and award recipient, not the prose
// label chosen by an editor ("all-star" and "all-tournament" are both fine).
for (const [team, mvp] of [
  ['Shiner', 'Lauren Springfield'],
  ['Ganado', 'Saylor Bures'],
  ['Katy', 'Haley Schmitt'],
  ['Pearland', 'Madelyn Guzman'],
]) {
  verifiedFact(team, mvp, 'uil-2026-all-tournament');
}
verifiedFact('Shiner','eight championships','uil-all-time-appearances');
verifiedFact('Ganado','Ganado Softball Field','ganado-school-calendar');
verifiedFact('Katy',"'KHS-Softball Field'",'katy-official-venue-2025');
verifiedFact('Pearland','Madelyn Guzman','uil-2026-all-tournament');
verifiedFact('Amarillo Highland Park','E. Martinez','independent-staff-snapshot');

const collision=pilot.pilotSchools.find(p=>p.name==='Amarillo Highland Park');
assert.ok(collision,'Collision test requires Amarillo Highland Park Hornets');
assert.equal(collision.identity.campusUrl,'https://www.hpisd.net/','Do not confuse Amarillo Hornets with Dallas Scots');
assert.ok(collision.conflicts.some(s=>s.includes('Dallas')),'Record Dallas school identity collision');
assert.ok(!pilot.pilotSchools.some(p=>p.identity.campusUrl.includes('hpisd.org')),'Dallas school never belongs in this pilot');
// Statewide history crosswalk is one-time source research reusable across
// eleven eventual high-quality school pages. DO NOT treat it as page readiness.
const honors=get('docs/softball/research/uil-2026-state-champions-and-mvp.json');
assert.equal(honors.version,1,'UIL annual award research schema');
assert.equal(honors.season,'2025-26','Keep awards in their HISTORIC title season');
assert.equal(honors.records.length,11,'Full official 2026 UIL softball division coverage');
const honorsSources=new Map(honors.sources.map(s=>[s.id,s]));
assert.ok(honorsSources.get('uil-champion-archive')?.url.endsWith('/softball/archives'),
  'Championship identity must be anchored to original UIL archives');
assert.ok(honorsSources.get('uil-all-tournament')?.url.includes('2026-uil-softball-state-all-tournament-teams'),
  'State tournament MVP must be sourced to May 31 UIL release');
const seenHonors=new Set(), seenChampion=new Set();
for(const record of honors.records){
  assert.ok(!seenHonors.has(record.classification),'Repeated UIL historical championship division');
  seenHonors.add(record.classification);
  assert.ok(!seenChampion.has(record.champion),'Unexpected duplicate 2026 title champion');
  seenChampion.add(record.champion);
  assert.ok(record.awardMvp.length>=6,'Each historical award must have a named official recipient');
  assert.equal(record.championshipSourceId,'uil-champion-archive','Champions require official UIL source');
  assert.equal(record.awardSourceId,'uil-all-tournament','MVP requires dated official UIL source');
  assert.equal(record.athleteStatus,'historical-public-award-only','No private student roster or recruitment data inferred');
  assert.equal(record.allowRosterPublication,false,'Never auto-republish minor rosters');
  assert.equal(record.allowUnlicensedPhoto,false,'No school or student media without rights');
  const key=record.registry2026_27;
  const official=registry.schools.find(p=>p.name===key?.uilName);
  assert.ok(official,'Every champion must map to exact current UIL softball campus with explicit alias if needed');
  assert.equal(key.conference,official.conference,'Historical trophy class may differ from current UIL softball class');
  assert.equal(key.district,official.district,'Never use football or historical title district for current softball alignment');
  assert.equal(key.region,official.region,'Current region must match UIL softball alignment');
}
assert.equal(honors.records.find(p=>p.champion==='Mont Belvieu Barbers Hill')?.registry2026_27.conference,'6A',
 '2026 5A-DI champ Barbers Hill is in UIL 2026–27 6A softball alignment');
assert.equal(honors.records.find(p=>p.champion==='Jonesboro')?.registry2026_27.conference,'2A',
 '2026 1A champ Jonesboro appears in current 2A softball alignment (do not infer overall 2A school size)');
assert.equal(honors.records.find(p=>p.champion==='Santa Gertrudis Academy')?.registry2026_27.uilName,'Santa Gertrudis Acad',
 'Preserve exact 2026–27 UIL school abbreviation in join');
assert.equal(honors.records.find(p=>p.champion==='Mont Belvieu Barbers Hill')?.registry2026_27.uilName,'Mt Belvieu Barbers Hill',
 'Explicit crosswalk prevents missing current UIL Barbers Hill campus');

// A complete team page must understand the governing 2027 season dates,
// but statewide UIL deadlines are not proof of any school's match schedule.
const calendar=get('docs/softball/research/uil-2026-27-season-and-eligibility.json');
assert.equal(calendar.season,'2026-27');
assert.ok(researchDateValid(calendar.verifiedAt,pilot.lastReviewed),'Original statewide calendar source date must be retained, not advanced automatically');
assert.equal(calendar.milestones.length,11,'UIL practice-through-state calendar must be fully captured');
const calendarSources=new Map(calendar.source.map(x=>[x.id,x]));
assert.equal(calendarSources.get('uil-softball-dates')?.url,'https://www.uiltexas.org/softball');
assert.ok(calendarSources.get('uil-eligibility-constitution')?.url.endsWith('/constitution/general/eligibility'));
assert.ok(calendarSources.get('uil-2026-27-rule-changes')?.url.includes('2026-27-policy-info'));
const dateById=new Map(calendar.milestones.map(m=>[m.id,m.date]));
assert.equal(dateById.size,11,'No duplicate milestone IDs');
for(const m of calendar.milestones) {
  assert.match(m.date,/^2027-(?:0[1-6])-\d{2}$/,'Spring 2027 date not properly season-scoped');
  assert.equal(m.sourceId,'uil-softball-dates','Spring 2027 dates must use primary UIL calendar');
  assert.ok(Number.isFinite(Date.parse(m.date+'T00:00:00Z')),'Bad milestone date');
}
assert.equal(dateById.get('first-day-practice'),'2027-01-15');
assert.equal(dateById.get('first-day-interschool-scrimmages'),'2027-01-30');
assert.equal(dateById.get('first-day-interschool-games'),'2027-02-15');
assert.equal(dateById.get('district-certification-deadline'),'2027-04-27');
assert.equal(dateById.get('state-tournament-start'),'2027-06-03');
assert.equal(dateById.get('state-tournament-end'),'2027-06-05');
assert.ok(calendar.editorialRestrictions.some(x=>x.includes('school\'s actual game schedule')),
 'The statewide softball calendar must not be presented as each individual school schedule');
assert.ok(calendar.seasonSpecificExplanations.some(x=>x.id==='recruiting' && x.text.includes('Section 409')),
 'UIL Section 409 recruiting safeguards must be preserved in school page publishing policy');

// A district's TEA reporting county is NOT necessarily the physical campus
// county: Katy High is the known regression case (NCES: Fort Bend; ISD: Harris).
const campus=get('docs/softball/research/campus-identity-source-crosswalk.json');
assert.equal(campus.version,1);
assert.ok(researchDateValid(campus.verifiedAt,pilot.lastReviewed),'Original census verification date must be retained');
assert.equal(campus.schools.length,pilot.pilotSchools.length,'Pilot TEA campus identity census must be complete');
const campusIds=new Set();
for(const school of pilot.pilotSchools) {
  const record=campus.schools.find(c=>c.uilName===school.name);
  assert.ok(record,school.name+': no independently identified TEA/NCES campus');
  assert.match(record.teaCampusId,/^\d{9}$/,'TEA state campus code must have 9 digits');
  assert.ok(!campusIds.has(record.teaCampusId),'Two UIL campuses cannot share TEA ID');
  campusIds.add(record.teaCampusId);
  assert.equal(school.identity.teaCampusId,record.teaCampusId,'Identity file campus mismatches official crosswalk');
  assert.equal(school.identity.county,record.county,'Must use campus physical county, not ISD reporting county');
  assert.equal(school.identity.campusAddress,record.campusAddress,'Only independently verified school campus address is allowed');
  assert.equal(school.identity.officialCampusGradeSpan,record.grades,'Grade spans must retain middle school grades when appropriate');
  assert.equal(school.identity.historicalCampusEnrollment.count,record.historicalStudentCount);
  assert.equal(school.identity.historicalCampusEnrollment.year,'2024-25','Never display 2024–25 counts as 2026–27 current');
  assert.ok(record.historicalStudentCount>100 && record.historicalStudentCount<7000,'Sanity bounds for campus count');
  assert.equal(new URL(record.studentSource).protocol,'https:');
  assert.equal(new URL(record.campusAddressSource).protocol,'https:');
  assert.ok(school.facts.some(f=>f.sourceIds.includes('official-campus-students')&&f.sourceIds.includes('official-campus-location')),
    school.name+': source-backed dated campus/county/grade claims not in research dossier');
  assert.ok(record.caveat.length>=75,'Record school-specific caveat to avoid inexact football copy');
}
assert.equal(campus.schools.find(s=>s.uilName==='Katy').county,'Fort Bend','Katy HS campus physically in Fort Bend County, not district TEA Harris label');
assert.equal(campus.schools.find(s=>s.uilName==='Katy').teaCampusId,'101914001');
assert.equal(campus.schools.find(s=>s.uilName==='Amarillo Highland Park').teaCampusId,'188903001',
  'Must be Amarillo Potter County school, never Dallas Highland Park');
assert.equal(campus.schools.find(s=>s.uilName==='Shiner').grades,'07–12','Shiner school count includes grades 7 and 8');

const required=new Set(SOFTBALL_RESEARCH_TOPICS.map(s=>s.id));
assert.equal(required.size,38,'Keep complete-first-publish topic count stable');
assert.ok(!pilot.publicationAuthorization,'No publish shortcut');
console.log('PASS: verified research-only pilot '+pilot.pilotSchools.length+' UIL softball programs, '+facts+' distinct source-linked preliminary facts, '+sources+' source references and '+gaps+' explicit remaining research gaps. No team pages published.');
for(const [school,c] of Object.entries(researched)) console.log(school+': facts='+c[0]+' sources='+c[1]+' gaps='+c[2]);
