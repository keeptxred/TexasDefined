import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pinnedVersionUrl, recoverObserved, OLD_VERSIONS, LOGGED_MISSING } from './recover-observed-hashes-from-old-worker.mjs';

const NOW=Date.parse('2026-11-02T18:00:00Z');
function setup() {
  return mkdtemp(join(tmpdir(),'td-old-version-hash-test-'));
}
function paths(root) {
  return {snapshotPath:join(root,'snapshot.json'),reportPath:join(root,'report.json'),
    folder:join(root,'assets')};
}
async function seed(root) {
  const x=paths(root);
  await mkdir(x.folder,{recursive:true});
  await writeFile(x.snapshotPath,JSON.stringify({format:1,snapshots:[{format:1,pages:[],retainedAssets:[]}]}));
  return x;
}
test('only exact known-first-party version URL and safe assets are eligible',()=>{
  assert.equal(pinnedVersionUrl(OLD_VERSIONS[0],'/assets/'+LOGGED_MISSING[0]),
    'https://35e64cd8-texasdefined-site.freddy-coppola.workers.dev/assets/useQuery-6nTz4IUX.js');
  assert.throws(()=>pinnedVersionUrl('fake-version','/assets/useQuery-6nTz4IUX.js'));
  assert.throws(()=>pinnedVersionUrl(OLD_VERSIONS[0],'/assets/../../secret.js'));
  assert.throws(()=>pinnedVersionUrl(OLD_VERSIONS[0],'https://evil.example/file.js'));
});
test('recover old JS only from matching pinned Worker preview; hash and verify on both public origins',async()=>{
  const root=await setup();
  try {
    const x=await seed(root),js=Buffer.from('export const trace = "observed-hash-only";\n');
    // These two hashes were NOT in the first-three-version confirmed-miss set.
    // The recovery implementation must genuinely probe the supplied first version.
    const recoverable = 'Header-C0Y_eOti.js';
    const unavailable = 'Container-mLbojg-d.js';
    const seen=[];
    const fetchImpl=async(url,opts)=>{
      seen.push(url);
      assert.equal(opts.redirect,'manual');
      return new Response(url.endsWith(recoverable)?js:'missing',
        {status:url.endsWith(recoverable)?200:404,
          headers:{'content-type':url.endsWith(recoverable)?'application/javascript':'text/html'}});
    };
    const report=await recoverObserved({...x,now:NOW,versions:[OLD_VERSIONS[0]],
      filenames:[recoverable,unavailable],fetchImpl});
    assert.equal(report.recovered.length,1);
    assert.equal(report.unresolved.length,1);
    assert.equal(report.probed.length,2, 'one recoverable and one unavailable hash must each be tested');
    assert.equal(report.probed[0].matched,true);
    assert.equal(report.probed[1].matched,false);
    assert.equal(report.recovered[0].sha256,createHash('sha256').update(js).digest('hex'));
    assert.deepEqual(await readFile(join(x.folder,recoverable)),js);
    assert.equal(existsSync(join(x.folder,unavailable)),false);
    const saved=JSON.parse(await readFile(x.snapshotPath,'utf8'));
    assert.equal(saved.snapshots[0].retainedAssets[0].preSha256,report.recovered[0].sha256);
    assert.equal(saved.snapshots[0].retainedAssets[0].sourceVersionId,OLD_VERSIONS[0]);
    assert.ok(seen.every(url=>url.startsWith('https://35e64cd8-texasdefined-site.freddy-coppola.workers.dev/assets/')));
  } finally { await rm(root,{recursive:true,force:true}); }
});
test('HTML captcha under HTTP200 is never recorded as an old JavaScript asset',async()=>{
  const root=await setup();
  try {
    const x=await seed(root);
    const report=await recoverObserved({...x,now:NOW,filenames:['Header-C0Y_eOti.js'],
      versions:[OLD_VERSIONS[0]],fetchImpl:async()=>new Response('<html>client challenge</html>',
        {headers:{'content-type':'text/html'},status:200})});
    assert.equal(report.probed.length,1, 'captcha case must exercise a real pinned Worker fetch');
    assert.equal(report.recovered.length,0);
    assert.equal(report.unresolved.length,1);
    assert.deepEqual(JSON.parse(await readFile(x.snapshotPath,'utf8')).snapshots[0].retainedAssets,[]);
  } finally {await rm(root,{recursive:true,force:true});}
});
test('emergency recovery self-expires without network requests; no guessing of old files',async()=>{
  const root=await setup();
  try {
    const x=await seed(root);
    const report=await recoverObserved({...x,now:Date.parse('2026-11-06T00:00:00Z'),
      filenames:LOGGED_MISSING.slice(0,1),versions:[OLD_VERSIONS[0]],
      fetchImpl:async()=>{throw Error('expired recovery must not fetch');}});
    assert.equal(report.expired,true);
    assert.equal(report.recovered.length,0);
  } finally {await rm(root,{recursive:true,force:true});}
});

test('the twelve confirmed first-three-version misses search older pinned versions by exact path',async()=>{
  const root=await setup();
  try {
    const x=await seed(root);
    const requested=[];
    const expected=Buffer.from('export const recovered = "older pinned version";');
    const older=OLD_VERSIONS[3].slice(0,8);
    const fetchImpl=async(url)=>{
      requested.push(url);
      if(url.startsWith('https://'+older+'-texasdefined-site') && url.endsWith('useQuery-6nTz4IUX.js'))
        return new Response(expected,{status:200,headers:{'content-type':'application/javascript'}});
      return new Response('absent',{status:404,headers:{'content-type':'text/html'}});
    };
    const report=await recoverObserved({...x,now:NOW,filenames:['useQuery-6nTz4IUX.js'],
      versions:OLD_VERSIONS,fetchImpl});
    assert.equal(report.recovered.length,1);
    assert.equal(report.recovered[0].sourceVersionId,OLD_VERSIONS[3]);
    assert.equal(requested.length,1, 'proven missing first 3 are not redundantly re-requested');
    assert.deepEqual(await readFile(join(x.folder,'useQuery-6nTz4IUX.js')),expected);
  } finally {await rm(root,{recursive:true,force:true});}
});
