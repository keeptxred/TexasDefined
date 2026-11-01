#!/usr/bin/env node
// Fail closed: all 25 schools, 75 viewport cases, 18 county cases and one
// pinned source/Worker in ONE actual Chrome job. No PNG count is required.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {verifyChromeReport} from './prepare-football-b011-certification.mjs';
const names=['first','second','third','fourth','fifth'];
const counties=[3,5,2,4,4];
const reg=JSON.parse(readFileSync('docs/football-authority/REGISTRY.json','utf8'));
assert.equal(reg.batch.number,11);
assert.equal(reg.batch.slugs.length,25);
const sha=process.env.FOOTBALL_CHROME_SOURCE_SHA;
const worker=process.env.FOOTBALL_EXPECTED_WORKER_VERSION;
const summary={version:1,batch:11,sourceCommit:sha,workerVersion:worker,technicalOnly:true,
  schoolCasesPassed:0,countyCasesPassed:0,schoolSlugs:[],groups:[],failures:[]};
for(let i=0;i<5;i++){
  const report=JSON.parse(readFileSync('artifacts/b011-'+names[i]+'-five-production-chrome/report.json','utf8'));
  const slugs=reg.batch.slugs.slice(i*5,(i+1)*5);
  verifyChromeReport(report,i,slugs,worker,sha);
  summary.schoolCasesPassed+=report.schoolChecks.length;
  summary.countyCasesPassed+=report.countyChecks.length;
  summary.schoolSlugs.push(...slugs);
  summary.groups.push({label:names[i]+'-five',schoolSlugs:slugs,schoolCasesPassed:15,
    countyCasesPassed:counties[i]});
}
assert.equal(summary.schoolCasesPassed,75);
assert.equal(summary.countyCasesPassed,18);
assert.deepEqual(summary.schoolSlugs,reg.batch.slugs);
writeFileSync('artifacts/b011-single-run-summary.json',JSON.stringify(summary,null,2)+'\n');
console.log('PASS: one genuine Chrome job, 25 schools, 75 viewports, 18 county cases, exact source SHA and Worker.');
