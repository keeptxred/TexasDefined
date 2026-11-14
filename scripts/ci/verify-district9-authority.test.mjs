import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const read=(p)=>readFileSync(new URL('../../'+p,import.meta.url),'utf8');
const page=read('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx');
const head=read('src/routes/texas-high-school-football-districts_.$slug.tsx');
const guide=read('src/components/sports/District9Guide.tsx');
const names=read('src/data/high-school-football/district9-display-names.ts');
const job=read('.github/workflows/check-district9-sources.yml');
const checker=read('scripts/ci/verify-district9-authority.mjs');
test('verified UIL schools and friendly aliases',()=>{
 for(const [original,label] of [['Garland Lakeview Cent','Lakeview Centennial'],['Garland Rowlett','Rowlett'],['Garland Sachse','Sachse']])
  assert.ok(names.includes("'"+original+"': '"+label+"'"));
 assert.ok(page.includes('district9DisplayName(program.schoolName)'));
 assert.ok(head.includes('district9DisplayName(program.schoolName)'));
 assert.ok(guide.includes('six Garland ISD high schools') && guide.includes('two Wylie ISD'));
 assert.ok(guide.includes('Naaman Forest moved to 5A Division I'));
});
test('District 9 is a guide not an unfinished or duplicated scoreboard',()=>{
 assert.ok(page.includes('{district9Pilot && <District9Guide />}'));
 assert.ok(page.includes('!district16Pilot && !district9Pilot &&'));
 assert.ok(page.includes('district6Pilot || district9Pilot ? "Schedules, tickets & playoff path"'));
 assert.ok(page.includes('district9Pilot ? <Related href="#district-9-authority"'));
 for(const section of ['district-9-authority','district-9-game-day','district-9-sources','district-9-playoffs','district-9-faq'])
  assert.ok(guide.includes(section));
 assert.ok(!/DISTRICT9_STANDINGS|awayScore|homeScore|data-football-district-records=/.test(guide));
 assert.ok(page.indexOf('{district9Pilot && <District9Guide />}') < page.indexOf('<FootballMonetizationSlot',page.indexOf('{district9Pilot && <District9Guide />}')));
});
test('GitHub freshness workflow checks monthly, during season and quarterly',()=>{
 assert.ok(job.includes("cron: '29 15 1 * *'"));
 assert.ok(job.includes("cron: '31 15 * 8-12 2'"));
 assert.ok(job.includes('workflow_dispatch:'));
 assert.ok(checker.includes("['01','04','07','10']"));
 assert.ok(checker.includes("today>='2028-01-01'"));
 assert.ok(checker.includes("AbortSignal.timeout(9000)"));
 assert.ok(!/FOOTBALL_RESULTS_FEED_URL|scrapeResults|scoreSnapshot/.test(checker));
});

test('2026 varsity fixture snapshot is source-backed and not a results or standings table',()=>{
 assert.ok(guide.includes('district-9-calendar'));
 assert.ok(guide.includes('min-w-[36rem]') && guide.includes('overflow-x-auto'));
 assert.equal((guide.match(/\{ date: '(?:Thu|Fri), (?:Oct|Nov)\. /g)||[]).length,5);
 assert.ok(guide.includes('Wylie East at Lakeview Centennial'));
 assert.ok(guide.includes('not a full season calendar, live upcoming-games feed or reported-score table'));
 assert.ok(guide.includes('A past fixture remains a historical calendar entry'));
});
