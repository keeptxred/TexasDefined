import test from 'node:test';
import assert from 'node:assert/strict';
import {auditHtml,assertWorkerVersion,resolveVerifiedRelease} from './verify-football-score-backlog-production.mjs';
const path='/texas-high-school-football-teams/example';
const row={date:'2026-10-30',opponent:'Columbia',pointsFor:42,pointsAgainst:0};
const html=(score='W 42–0',opponent='Columbia *',date='2026-10-30')=>'<link rel="canonical" href="https://texasdefined.com'+path+'"><main><h1>School</h1><table><tr><td><time datetime="'+date+'">Oct 30</time></td><td>'+opponent+'</td><td>Home</td><td>'+score+'</td></tr></table></main>';
test('requires actual canonical link, main content, correct dated opponent and exact result cell',()=>{
 assert.deepEqual(auditHtml(html(),path,[row]),[]);
 assert.deepEqual(auditHtml(html('<a>W 42–0 · matchup →</a>'),path,[row]),[]);
 assert.equal(auditHtml(html('W 42–01'),path,[row]).length,1);
 assert.equal(auditHtml(html('W 42–0','Columbia Academy'),path,[row]).length,1);
 assert.equal(auditHtml(html('W 42–0','Columbia','2026-10-31'),path,[row]).length,1);
 assert.throws(()=>auditHtml(html().replace('rel="canonical"','rel="alternate"'),path,[row]),/canonical/);
 assert.throws(()=>auditHtml(html().replace('</main>','</main><link rel="canonical" href="https://texasdefined.com/other">'),path,[row]),/canonical/);
 assert.equal(auditHtml(html('Final not yet verified')+'<script>'+html()+'</script>',path,[row]).length,1);
});
test('reviewed disputed and administrative outcomes are verified as distinct result types',()=>{
 assert.deepEqual(auditHtml(html('W reported scores differ (48–8 / 42–8)'),path,[{...row,pointsFor:undefined,pointsAgainst:undefined,outcome:'score-disputed-win',reportedScores:['48–8','42–8']}]),[]);
 assert.deepEqual(auditHtml(html('Not played — bye week'),path,[{...row,outcome:'not-played'}]),[]);
 assert.equal(auditHtml(html('W 1–0'),path,[{...row,outcome:'forfeit-win'}]).length,1);
});
const sha='a'.repeat(40),version='12345678-1234-1234-1234-123456789abc';
const deployment={id:1,sha,environment:'texasdefined-verified-worker',payload:{commit_sha:sha,worker_version:version,source_run_id:'42',source_run_attempt:'2'}};
test('resolves only successful ledger entry for triggering commit, workflow run and attempt',async()=>{
 let calls=[];
 const get=async p=>{calls.push(p);return p.includes('/statuses')?[{state:'success'}]:[{...deployment,id:2,payload:{...deployment.payload,source_run_attempt:'1'}},deployment];};
 const r=await resolveVerifiedRelease({sourceCommit:sha,runId:'42',runAttempt:'2',get});
 assert.equal(r.deploymentId,1);assert.equal(r.workerVersion,version);assert.equal(r.sourceCommit,sha);assert.equal(calls.length,2);
 await assert.rejects(resolveVerifiedRelease({sourceCommit:sha,runId:'43',get}),/No successful/);
 await assert.rejects(resolveVerifiedRelease({sourceCommit:sha,runId:'42',get:async p=>p.includes('/statuses')?[{state:'failure'}]:[deployment]}),/No successful/);
});
test('same stale Worker on both origins must not pass exact-release verification',()=>{
 assert.doesNotThrow(()=>assertWorkerVersion(version,version));
 assert.throws(()=>assertWorkerVersion('old-worker',version),/Wrong live Worker/);
 assert.throws(()=>assertWorkerVersion(null,version),/Wrong live Worker/);
});
