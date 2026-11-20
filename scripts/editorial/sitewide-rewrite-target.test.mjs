import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {findPagePaths,findOfficialSourceUrls,findIssuePages,issuePageSourcePairs,evidencePathFor,priorEditorialRewrites,sourceReviewEligible,scheduledWorkflowInventory}
  from './sitewide-rewrite-target.mjs';

test('all scheduled GitHub refresh workflows are discovered rather than hardcoded to three guides',()=>{
  const files=scheduledWorkflowInventory();
  assert.ok(files.length >= 25, 'missing sitewide scheduled coverage');
  for (const f of ['destination-visitor-fact-freshness.yml','event-authority-source-refresh.yml',
    'refresh-five-authority-groups.yml','top-attraction-source-health.yml'])
    assert.ok(files.includes(f),f+' must remain discoverable');
});
test('public existing page routes are selected, not external paths or private URIs',()=>{
  const body='See https://texasdefined.com/destination/mission-san-jose-san-antonio and '+
    'https://texasdefined.com/fishing/lakes for this specific visitor-fact change.';
  assert.deepEqual(findPagePaths(body),['/destination/mission-san-jose-san-antonio','/fishing/lakes']);
});
test('sources require HTTPS public host and reject service infrastructure',()=>{
  const body='https://www.nps.gov/saan/planyourvisit/sanjose.htm '+
    'https://texasdefined.com/destination/a '+
    'https://github.com/owner/repo/issues/1 '+
    'http://example.org/fail https://127.0.0.1/abc';
  assert.deepEqual(findOfficialSourceUrls(body),['https://www.nps.gov/saan/planyourvisit/sanjose.htm']);
});
test('only real open source-review issues with page and official sources are eligible',()=>{
  const issue={state:'open',title:'[Events] official source freshness',
    body:'https://texasdefined.com/event/texas-jazz-festival official source https://www.visitcorpuschristi.com/texas-jazz-festival/',
    labels:[]};
  assert.equal(sourceReviewEligible(issue),true);
  assert.equal(sourceReviewEligible({...issue,labels:[{name:'autonomous-rewrite-in-progress'}]}),true);
  assert.equal(sourceReviewEligible({...issue,state:'closed'}),false);
  assert.equal(sourceReviewEligible({...issue,title:'Worker asset incident'}),false);
  assert.equal(sourceReviewEligible({...issue,body:'Official source HTTP 200 but no canonical page'}),false);
});

test('heritage source-change issue without a canonical path maps to curated destination identity',()=>{
  const issue={title:'Destination visitor facts source refresh needed',state:'open',labels:[],
    body:'SOURCE_CHANGED https://www.nps.gov/saan/planyourvisit/sanjose.htm'};
  assert.deepEqual(findIssuePages(issue.body),['/destination/mission-san-jose-san-antonio']);
  assert.equal(sourceReviewEligible(issue),true);
});
test('the reviewed attraction operator list also resolves source-only tickets',()=>{
  assert.ok(findIssuePages('SOURCE_UNAVAILABLE https://www.fortworth.com/things-to-do/attractions/fort-worth-water-gardens/')
    .includes('/destination/fort-worth-water-gardens'));
});

test('umbrella issue event rows always link each page to its matching official source',()=>{
  const body=[
    '- `/event/a-christmas-affair` — source: https://www.jlaustin.org/a-christmas-affair/; check: 2026-11-07',
    '- `/event/dallas-zoo-lights` — source: https://www.dallaszoo.com/event/lights/; check: 2026-11-07',
    '- `/event/a-christmas-affair` — source: https://www.jlaustin.org/a-christmas-affair/',
  ].join('\n');
  const rows=issuePageSourcePairs(body);
  assert.deepEqual(rows.map(x=>[x.page,x.sourceUrl]),[
    ['/event/a-christmas-affair','https://www.jlaustin.org/a-christmas-affair/'],
    ['/event/dallas-zoo-lights','https://www.dallaszoo.com/event/lights/'],
  ]);
  assert.equal(sourceReviewEligible({state:'open',title:'event source freshness',body,labels:[]}),true);
});
test('one curated heritage official-source issue yields exactly its own canonical page',()=>{
  const rows=issuePageSourcePairs('SOURCE_CHANGED https://www.nps.gov/saan/planyourvisit/sanjose.htm');
  assert.deepEqual(rows.map(x=>[x.page,x.sourceUrl]),[
    ['/destination/mission-san-jose-san-antonio','https://www.nps.gov/saan/planyourvisit/sanjose.htm']]);
});
test('evidence paths distinguish multiple pages under a single issue',()=>{
  assert.equal(evidencePathFor(7233,'/event/a-christmas-affair'),
    'ops/editorial/auto-rewrite-evidence/issue-7233--event--a-christmas-affair.json');
  assert.notEqual(evidencePathFor(7233,'/event/a-christmas-affair'),
    evidencePathFor(7233,'/event/dallas-zoo-lights'));
  assert.throws(()=>evidencePathFor(7233,'../../.github/workflows/bypass.yml'));
});
test('legacy and page-specific evidence avoid rewriting same first event repeatedly',t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'td-backlog-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const dir=path.join(root,'ops/editorial/auto-rewrite-evidence');
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'issue-7233.json'),JSON.stringify({
    issue:7233,page:'/event/a-christmas-affair',facts:[{sourceUrl:'https://www.jlaustin.org/'}]}));
  fs.writeFileSync(path.join(dir,'issue-7233--event--dallas-zoo-lights.json'),JSON.stringify({
    issue:7233,page:'/event/dallas-zoo-lights',facts:[{sourceUrl:'https://www.dallaszoo.com/'}]}));
  const reviewed=priorEditorialRewrites(root);
  assert.ok(reviewed.has('7233\t/event/a-christmas-affair'));
  assert.ok(reviewed.has('7233\t/event/dallas-zoo-lights'));
  assert.ok(!reviewed.has('7233\t/event/texas-renaissance-festival'));
});
