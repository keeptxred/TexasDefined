import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {findPagePaths,findOfficialSourceUrls,findIssuePages,issuePageSourcePairs,evidencePathFor,priorEditorialRewrites,pendingSourceIssueIds,sourceReviewEligible,scheduledWorkflowInventory,rotateCandidates,loadIssues}
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

test('open validated content PR blocks a duplicate issue draft but never closes the editorial backlog',()=>{
  const existing={title:'Source-verified editorial refresh for issue #7233',state:'open',
    head:{ref:'automation/sitewide-editorial-44761731798'}};
  const selected=pendingSourceIssueIds([existing,
    {...existing,state:'closed'},
    {...existing,title:'Another unrelated PR',head:{ref:'main'}},
  ]);
  assert.deepEqual([...selected],[7233]);
  assert.ok(!selected.has(7000));
});
test('attacker-like PR title without trusted bot branch does not suppress issue source monitoring',()=>{
  assert.deepEqual([...pendingSourceIssueIds([
    {title:'Source-verified editorial refresh for issue #7233',state:'open',head:{ref:'untrusted/branch'}},
    {title:'Source-verified editorial refresh for issue #7233',state:'open',head:{ref:'automation/sitewide-editorial-fake'}},
  ])],[]);
});

test('scheduled successive runs rotate all source-page candidates including no-op first result',()=>{
  const pending = [{page:'/destination/a'},{page:'/destination/b'},
    {page:'/destination/c'},{page:'/destination/d'}];
  assert.deepEqual(rotateCandidates(pending,1).map(x=>x.page),[
    '/destination/a','/destination/b','/destination/c','/destination/d']);
  assert.deepEqual(rotateCandidates(pending,2).map(x=>x.page),[
    '/destination/b','/destination/c','/destination/d','/destination/a']);
  assert.deepEqual(rotateCandidates(pending,3).map(x=>x.page),[
    '/destination/c','/destination/d','/destination/a','/destination/b']);
  assert.deepEqual(rotateCandidates(pending,4).map(x=>x.page),[
    '/destination/d','/destination/a','/destination/b','/destination/c']);
  assert.deepEqual(rotateCandidates(pending,5),pending);
  assert.deepEqual(rotateCandidates([],1),[]);
  assert.throws(()=>rotateCandidates(pending,0),/run number/);
});

test('complete open source backlog discovery includes old issues beyond page 1 and old top-45 cap',async()=>{
  const issue = number => ({number,state:'open',title:'Official source refresh needed',
    body:'https://texasdefined.com/event/a-christmas-affair https://www.jlaustin.org/a-christmas-affair/',
    updated_at:'2026-11-20T00:00:00Z'});
  const first=Array.from({length:100},(_,i)=>issue(1000+i));
  first[0]={...first[0],pull_request:{url:'https://api.github.com/repos/owner/repo/pulls/1'}};
  const second=[issue(2000),issue(2001)];
  const calls=[];
  const fetcher=async url=>{
    const page=Number(new URL(url).searchParams.get('page'));
    calls.push(page);
    return {ok:true,json:async()=>page===1?first:second};
  };
  const found=await loadIssues(fetcher,{Authorization:'Bearer fixture'});
  assert.deepEqual(calls,[1,2]);
  assert.equal(found.length,101);
  assert.ok(found.some(v=>v.number===2001),'older issue beyond first 100 not lost');
  assert.ok(!found.some(v=>v.number===1000),'pull requests are not eligible issues');
  assert.ok(found.every(sourceReviewEligible));
});
test('incomplete GitHub issue list fails closed instead of claiming complete sitewide coverage',async()=>{
  let pages=0;
  const endless=async()=>{pages++;return {ok:true,json:async()=>
    Array.from({length:100},(_,i)=>({number:pages*100+i,updated_at:'2026-11-20'}))};};
  await assert.rejects(loadIssues(endless,{Authorization:'Bearer fixture'}),/refuse truncated sitewide source refresh/);
  assert.equal(pages,25);
});

test('automated source-backed PR merge requests real protected production deployment',()=>{
  const finisher=fs.readFileSync(new URL('../../.github/workflows/finish-sitewide-source-backed-rewrite.yml',import.meta.url),'utf8');
  const sourceValidation=finisher.indexOf('git merge-base --is-ancestor "$validated_sha" origin/main');
  const deploy=finisher.indexOf('gh workflow run deploy-production.yml --ref main --repo "$REPO"');
  assert.ok(sourceValidation>=0,'must prove the validated source head is in current main');
  assert.ok(deploy>sourceValidation,'deploy dispatch must run ONLY after confirmed protected merge');
  assert.match(finisher,/\[\[ "\$merged" == true \]\] \|\|/,'must fail if auto-merge has not completed');
});
