#!/usr/bin/env node
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const slugs=['colorado-city-colorado','columbus','comal-canyon',
  'comal-canyon-lake','comal-davenport'];
const source=readFileSync('src/data/high-school-football/program-editorial-b011.ts','utf8');
const match=source.match(/const BATCH011_EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});\s*export function/);
assert.ok(match,'Required typed, isolated Batch011 editorial map');
const data=JSON.parse(match[1]);
const identities=readFileSync('src/data/high-school-football/school-identities.ts','utf8');
const team=readFileSync('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
const county=readFileSync('src/routes/$kind.$slug.lazy.tsx','utf8');
const loader=readFileSync('src/data/high-school-football/program-editorial-b011-loader.server.ts','utf8');
const server=readFileSync('src/data/high-school-football/football-program-profile.server.ts','utf8');
const verifier=readFileSync('scripts/ci/verify-football-b011-first-five-production.mjs','utf8');
const workflow=readFileSync('.github/workflows/verify-football-b011-first-five-production.yml','utf8');
const countyBySlug={
  'colorado-city-colorado':'mitchell','columbus':'colorado',
  'comal-canyon':'comal','comal-canyon-lake':'comal','comal-davenport':'comal'
};
const expectedNames={
  'colorado-city-colorado':'Daniel Mejia',
  'columbus':'Matt Schobel',
  'comal-canyon':'Sean McAuliffe',
  'comal-canyon-lake':'Lawrence Parker',
  'comal-davenport':'Zimmerhanzel'
};
test('exact five distinct researched Texas programs, not unsupported UIL or generic pages',()=>{
 assert.deepEqual(Object.keys(data).filter(x=>slugs.includes(x)).sort(),[...slugs].sort());
 assert.equal(Object.keys(data).length,20,'First and second five source cohorts only');
 for(const slug of slugs){
   const d=data[slug];
   assert.equal(d.slug,slug);
   assert.ok(d.intro.length>250,'Distinct editorial must be substantial '+slug);
   assert.ok(d.overview.length>=4 && d.overview.every(x=>x.length>50),'Unique narrative sections '+slug);
   assert.ok(d.faq.length>=5 && d.faq.every(x=>x.question.length>15 && x.answer.length>45),
      'School-specific detailed answers '+slug);
   assert.ok(d.milestones.length>=3 && d.milestones.every(x=>x.sourceUrl.startsWith('https://')),
      'All historic claims require dated source links '+slug);
   assert.ok(d.seo.title.includes('Football') && d.seo.description.length>=80);
   assert.ok(d.development.sourceUrl.startsWith('https://'));
   assert.ok(d.schedule.sourceUrl.startsWith('https://'));
   assert.equal(d.season,undefined,'No fabricated cumulative W/L on '+slug);
   assert.equal(d.photo,undefined,'No invented school imagery/license on '+slug);
   assert.ok(source.includes(expectedNames[slug]),'Missing source-specific coach/athletic record '+slug);
   assert.ok(identities.includes("slug: '"+slug+"'"),'Missing verified first-party mascot '+slug);
   assert.ok(team.includes("'"+slug+"': '"+countyBySlug[slug]+"'"),'School county edge absent '+slug);
   assert.ok(county.includes("slug: '"+slug+"'"),'County reciprocal edge absent '+slug);
   assert.ok(loader.includes("'"+slug+"'"),'SSR source gating missing '+slug);
 }
});
test('source-only SSR precedence, exact Worker Chrome controls and no false acceptance',()=>{
 assert.ok(server.includes('loadBatch011FootballProgramEditorial(canonicalSlug)'));
 assert.ok(loader.includes("import('./program-editorial-b011')"));
 assert.ok(verifier.includes("reg.batch.number,11"));
 assert.ok(verifier.includes("status==='VERIFIED'"));
 for(const token of ['report.schoolChecks.length!==15','report.countyChecks.length!==3',
   'report.screenshots!==18','process.env.FOOTBALL_CHROME_SOURCE_SHA',
   'process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1',
   "'colorado-city-colorado'","'comal-davenport'"])
   assert.ok(verifier.includes(token),'Missing genuine first-five Chrome control '+token);
 for(const token of ['Deploy TexasDefined production','steps.release.outputs.sha',
   'node scripts/ci/pin-football-b010-production-release.mjs',
   'path: artifacts/b011-first-five-production-chrome/'])
   assert.ok(workflow.includes(token),'Chrome workflow source/retention guard absent '+token);
});
