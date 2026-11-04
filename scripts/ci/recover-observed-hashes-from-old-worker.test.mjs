import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pinnedVersionUrl, recoverObserved, OLD_VERSIONS, LOGGED_MISSING, RECENT_OBSERVED_VERSIONS, RECENT_MISSING, SATURATED_PREVIOUS_WORKER_VERSIONS, SATURATED_PREVIOUS_MISSING, SECOND_PASS_MISSING, SECOND_PASS_PREVIEW_VERSIONS, LATEST_MISSING, LATEST_PREVIEW_VERSIONS } from './recover-observed-hashes-from-old-worker.mjs';

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

test('Nov2 verified exact old main hash checks only actual recent first-party preview bytes', async () => {
  const root = await setup();
  try {
    const x = await seed(root);
    const name = 'main-BmrHq_-j.js';
    assert.equal(RECENT_MISSING.has(name), true);
    const bytes = Buffer.from('export const verifiedOldCalculatorModule = true;');
    const urls = [];
    const report = await recoverObserved({ ...x, now: NOW, filenames: [name],
      versions: [OLD_VERSIONS[0]], recentVersions: [RECENT_OBSERVED_VERSIONS[0]],
      fetchImpl: async (url, opts) => {
        urls.push(url);
        assert.equal(opts.redirect, 'manual');
        return new Response(bytes, { status: 200,
          headers: { 'content-type': 'application/javascript' } });
      } });
    assert.deepEqual(urls, [pinnedVersionUrl(RECENT_OBSERVED_VERSIONS[0], '/assets/' + name)]);
    assert.equal(report.recovered.length, 1);
    assert.equal(report.unresolved.length, 0);
    assert.equal(report.recovered[0].sha256,
      createHash('sha256').update(bytes).digest('hex'));
    assert.deepEqual(await readFile(join(x.folder, name)), bytes);
    const saved = JSON.parse(await readFile(x.snapshotPath, 'utf8'));
    assert.equal(saved.snapshots[0].retainedAssets[0].sourceVersionId, RECENT_OBSERVED_VERSIONS[0]);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('a missing recent logged hash is reported and never replaced by invented content', async () => {
  const root = await setup();
  try {
    const x = await seed(root);
    const name = 'AnswerSummary-ClpRNP9w.js';
    const report = await recoverObserved({ ...x, now: NOW,
      filenames: [name], versions: [OLD_VERSIONS[0]],
      supplementalVersions: SECOND_PASS_PREVIEW_VERSIONS.slice(0, 2),
      fetchImpl: async () => new Response('not found', { status: 404,
        headers: { 'content-type': 'text/html' } }) });
    assert.equal(report.probed.length, 2, 'two independent new previews checked without repeating six proven negatives');
    assert.equal(report.recovered.length, 0);
    assert.deepEqual(report.unresolved.map(x => x.path), ['/assets/' + name]);
    assert.equal(existsSync(join(x.folder, name)), false);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('five exact omitted historical assets are recovered only from the authenticated outgoing Worker preview', async () => {
  const root = await setup();
  try {
    const x = await seed(root);
    const urls = [];
    const bytes = Buffer.from('export const originalHistoricalCode = 1;');
    const names = [...SATURATED_PREVIOUS_MISSING];
    const report = await recoverObserved({...x, now: NOW, filenames: names,
      saturatedVersions: SATURATED_PREVIOUS_WORKER_VERSIONS, fetchImpl: async (url, opts) => {
        urls.push(url);
        assert.equal(opts.redirect, 'manual');
        return new Response(bytes, {status: 200, headers: {'content-type': 'application/javascript'}});
      }});
    assert.equal(report.recovered.length, 5);
    assert.equal(report.unresolved.length, 0);
    assert.deepEqual(new Set(urls), new Set(names.map(n =>
      pinnedVersionUrl(SATURATED_PREVIOUS_WORKER_VERSIONS[0], '/assets/' + n))));
    for (const recovered of report.recovered) {
      assert.equal(recovered.sha256, createHash('sha256').update(bytes).digest('hex'));
      assert.equal(recovered.sourceVersionId, SATURATED_PREVIOUS_WORKER_VERSIONS[0]);
    }
  } finally { await rm(root, {recursive: true, force: true}); }
});


test('verified old main hash searches pinned older Worker after six-generation miss', async () => {
  const root = await setup();
  try {
    const x = await seed(root);
    const name = 'main-BmrHq_-j.js';
    const expected = Buffer.from('export const genuinePinnedOldHash = 1;');
    const urls = [];
    const report = await recoverObserved({...x, now: NOW, filenames: [name],
      recentVersions: [RECENT_OBSERVED_VERSIONS[0]], versions: [OLD_VERSIONS[0]],
      fetchImpl: async url => {
        urls.push(url);
        return url.startsWith('https://' + OLD_VERSIONS[0].slice(0, 8) + '-')
          ? new Response(expected, {status: 200, headers: {'content-type': 'application/javascript'}})
          : new Response('missing', {status: 404, headers: {'content-type': 'text/html'}});
      }});
    assert.equal(report.probed.length, 2);
    assert.equal(report.recovered.length, 1);
    assert.equal(report.recovered[0].sourceVersionId, OLD_VERSIONS[0]);
    assert.deepEqual(urls, [
      pinnedVersionUrl(RECENT_OBSERVED_VERSIONS[0], '/assets/' + name),
      pinnedVersionUrl(OLD_VERSIONS[0], '/assets/' + name),
    ]);
    assert.deepEqual(await readFile(join(x.folder,name)), expected);
  } finally { await rm(root,{recursive:true,force:true}); }
});

test('verified recovery target and version lists stay within hard budgets', () => {
  assert.equal(LOGGED_MISSING.length, 31);
  assert.equal(SECOND_PASS_MISSING.size, 3);
  assert.equal(SECOND_PASS_PREVIEW_VERSIONS.length, 10);
  assert.equal(LATEST_MISSING.size, 1);
  assert.equal(LATEST_PREVIEW_VERSIONS.length, 4);
  for (const name of [...SECOND_PASS_MISSING, ...LATEST_MISSING]) assert.ok(LOGGED_MISSING.includes(name), name);
  assert.equal(RECENT_OBSERVED_VERSIONS.length, 6);
  assert.equal(SATURATED_PREVIOUS_WORKER_VERSIONS.length, 1);
  for (const name of [...RECENT_MISSING, ...SATURATED_PREVIOUS_MISSING])
    assert.ok(LOGGED_MISSING.includes(name), name);
});

test('three unrecovered Bing calculator hashes search only new independently verified preview versions', async () => {
  const root = await setup();
  try {
    const x = await seed(root), name = 'AnswerSummary-ClpRNP9w.js';
    const version = SECOND_PASS_PREVIEW_VERSIONS[1];
    const real = Buffer.from('export const exactOriginalBingModule = true;');
    const requested = [];
    const report = await recoverObserved({ ...x, now: NOW, filenames: [name],
      supplementalVersions: SECOND_PASS_PREVIEW_VERSIONS.slice(0, 2),
      fetchImpl: async url => {
        requested.push(url);
        return url.startsWith('https://' + version.slice(0, 8) + '-')
          ? new Response(real, { status: 200, headers: { 'content-type': 'application/javascript' } })
          : new Response('missing', { status: 404, headers: { 'content-type': 'text/html' } });
      } });
    assert.deepEqual(requested, [
      pinnedVersionUrl(SECOND_PASS_PREVIEW_VERSIONS[0], '/assets/' + name),
      pinnedVersionUrl(version, '/assets/' + name)]);
    assert.equal(report.recovered.length, 1);
    assert.equal(report.recovered[0].sourceVersionId, version);
    assert.equal(report.recovered[0].sha256, createHash('sha256').update(real).digest('hex'));
    assert.deepEqual(await readFile(join(x.folder, name)), real);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('live AI-search useSuspenseQuery import probes only four verified newer Worker previews', async () => {
  const root = await setup();
  try {
    const x = await seed(root), name = 'useSuspenseQuery-LwAPVdI7.js';
    const version = LATEST_PREVIEW_VERSIONS[1];
    const real = Buffer.from('export const exactOriginalSuspenseQueryModule = true;');
    const requested = [];
    const report = await recoverObserved({ ...x, now: NOW, filenames: [name],
      latestVersions: LATEST_PREVIEW_VERSIONS.slice(0, 2),
      fetchImpl: async url => {
        requested.push(url);
        return url.startsWith('https://' + version.slice(0, 8) + '-')
          ? new Response(real, { status: 200, headers: { 'content-type': 'text/javascript' } })
          : new Response('missing', { status: 404, headers: { 'content-type': 'text/html' } });
      } });
    assert.deepEqual(requested, [
      pinnedVersionUrl(LATEST_PREVIEW_VERSIONS[0], '/assets/' + name),
      pinnedVersionUrl(version, '/assets/' + name)]);
    assert.equal(report.recovered.length, 1);
    assert.equal(report.recovered[0].sourceVersionId, version);
    assert.deepEqual(await readFile(join(x.folder, name)), real);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('extra original-byte preview scans cannot escape exact version ceilings', async () => {
  const root = await setup();
  try {
    const x = await seed(root);
    await assert.rejects(recoverObserved({...x, now: NOW, filenames: ['AnswerSummary-ClpRNP9w.js'],
      supplementalVersions: [...SECOND_PASS_PREVIEW_VERSIONS, OLD_VERSIONS[0]],
      fetchImpl: async () => { throw Error('should not probe'); } }), /Historical recovery bounds exceeded/);
    await assert.rejects(recoverObserved({...x, now: NOW, filenames: ['useSuspenseQuery-LwAPVdI7.js'],
      latestVersions: [...LATEST_PREVIEW_VERSIONS, OLD_VERSIONS[0]],
      fetchImpl: async () => { throw Error('should not probe'); } }), /Historical recovery bounds exceeded/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
