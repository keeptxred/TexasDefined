#!/usr/bin/env node
// District 9 official-source URL and evergreen-content guard.
// Never fetch sports scores, standings, W/L tables or unlicensed feeds.
import assert from 'node:assert/strict';
import { readFile, writeFile, appendFile } from 'node:fs/promises';
const read = (p) => readFile(new URL('../../' + p, import.meta.url), 'utf8');
const [page, head, guide, workflow] = await Promise.all([
  read('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx'),
  read('src/routes/texas-high-school-football-districts_.$slug.tsx'),
  read('src/components/sports/District9Guide.tsx'),
  read('.github/workflows/check-district9-sources.yml'),
]);
assert.match(page,/district9Pilot\s*=\s*district\.slug === '6a-district-9'/);
assert.match(page,/district9Pilot\s*&&\s*<District9Guide\s*\/>/);
assert.match(page,/!district16Pilot && !district9Pilot &&/, 'No District 9 record table while paused');
assert.match(page,/district9Pilot \? <Related href="#district-9-authority"/);
assert.match(page,/district6Pilot \|\| district9Pilot \? "Schedules, tickets & playoff path"/);
assert.match(head,/District 9-6A Football: UIL Teams, Tickets & Stadiums \(2026–28\)/);
assert.match(head,/Automatic standings deferred/);
assert.match(page,/district9DisplayName\(program\.schoolName\)/);
assert.match(head,/district9DisplayName\(program\.schoolName\)/);
assert.ok(page.indexOf('{district9Pilot && <District9Guide />}') < page.indexOf('<FootballMonetizationSlot',page.indexOf('{district9Pilot && <District9Guide />}')));
for (const name of ['Garland','Lakeview Centennial','Rowlett','Sachse','North Garland','South Garland','Wylie','Wylie East']) {
  assert.ok(guide.includes(name),'Missing school '+name);
}
for(const id of ['district-9-authority','district-9-game-day','district-9-playoffs','district-9-sources','district-9-faq'])
  assert.ok(guide.includes(id),'Missing section '+id);
assert.match(guide,/Naaman Forest moved to 5A Division I/);
assert.match(guide,/automated District 9 scores, win\/loss records/);
assert.ok(!/fetch\s*\(|(?:parse|scrape)(?:Standings|Scores|Records)|DISTRICT9_STANDINGS|awayScore|homeScore|data-football-district-records=/.test(guide));
assert.ok(workflow.includes('31 15 * 8-12 2') && workflow.includes('29 15 1 * *'));
const officialSources = [
 'https://realignment.uiltexas.org/alignments/2026/2026_RR-Packet.pdf',
 'https://www.uiltexas.org/football',
 'https://www.uiltexas.org/football/playoff-brackets',
 'https://garlandisd.net/programs-services/athletics',
 'https://www.garlandisd.net/calendars/athletic-events-calendar',
 'https://garlandisd.net/programs-services/athletics/ticket-sales',
 'https://garlandisd.net/about/facility-directory/williams-stadium',
 'https://www.garlandisd.net/about/facility-directory/homer-b-johnson-stadium',
 'https://athletics.wylieisd.net/schools/wehs/mens-football',
 'https://athletics.wylieisd.net/facilities/wylie-stadium/directions-parking',
 'https://events.hometownticketing.com/boxoffice/wylieisd',
];
for (const url of officialSources) assert.ok(guide.includes(url),'Missing source '+url);
const reasons=[];
if(process.argv.includes('--check-links')) {
 for(const url of officialSources) {
  try {
    const options={redirect:'follow',signal:AbortSignal.timeout(9000),headers:{'User-Agent':'TexasDefinedDistrict9SourceReview/1.0 (+https://texasdefined.com)'}};
    const response=await fetch(url,{...options,method:'HEAD'});
    if([404,410].includes(response.status)){
      const detail=await fetch(url,{...options,method:'GET'});
      if([404,410].includes(detail.status))reasons.push('Official source returns '+detail.status+': '+url);
      await detail.body?.cancel();
    } else if (!response.ok) console.warn('Inconclusive source response '+response.status+': '+url);
    await response.body?.cancel();
  } catch(error) {console.warn('Official source probe inconclusive '+url+': '+String(error?.message||error));}
 }
}
const today=new Date().toISOString().slice(0,10);
if(today>='2027-07-01')reasons.push('Before the next football season: review varsity calendars, admissions, stadium guidance, and all 2026-specific copy.');
if(today>='2028-01-01')reasons.push('Check the new 2028–30 UIL district assignments and enrollment before presenting the next cycle.');
if(reasons.length){
 const body='# District 9-6A factual source review\n\nGitHub review on '+today+'. Confirm sources before editing page; no unlicensed scoreboard scraping.\n\n'
  +reasons.map(reason=>'- '+reason).join('\n')+'\n\nPinned: score, win/loss and standings automation remains a separately approved project.\n';
 await writeFile('district9-source-review.md',body);
 console.log(body);
}
if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,'review_needed='+(reasons.length?'true':'false')+'\n');
console.log('District 9 authority sources validated. Record automation: paused.');
