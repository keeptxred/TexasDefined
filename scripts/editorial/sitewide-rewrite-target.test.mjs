import test from 'node:test';
import assert from 'node:assert/strict';
import {findPagePaths,findOfficialSourceUrls,sourceReviewEligible,scheduledWorkflowInventory}
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
  assert.equal(sourceReviewEligible({...issue,labels:[{name:'autonomous-rewrite-in-progress'}]}),false);
  assert.equal(sourceReviewEligible({...issue,state:'closed'}),false);
  assert.equal(sourceReviewEligible({...issue,title:'Worker asset incident'}),false);
  assert.equal(sourceReviewEligible({...issue,body:'Official source HTTP 200 but no canonical page'}),false);
});
