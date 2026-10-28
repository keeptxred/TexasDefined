import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeVisibleText, isDue, validateLedger, selectSourceCohort, probeSource } from './check-football-authority-official-sources.mjs';

test('source monitor ignores JavaScript/style UI churn and fingerprints visible source facts', () => {
  const one = '<html><head><title>A</title></head><body><script>nonce=123</script><style>.x{color:red}</style><main><h1>Football</h1><p>Coach Sample 2026</p></main></body></html>';
  const two = '<html><head><title>Different</title></head><body><script>nonce=999</script><style>.x{color:blue}</style><main> Football  Coach Sample 2026 </main></body></html>';
  assert.equal(normalizeVisibleText(one),normalizeVisibleText(two));
  assert.ok(normalizeVisibleText(one).includes('Coach Sample 2026'));
});

test('calendar review dates reject malformed dates and respect UTC day boundaries', () => {
  assert.equal(isDue('2026-10-31','2026-10-28'),false);
  assert.equal(isDue('2026-10-31','2026-10-31'),true);
  assert.equal(isDue('2026-10-31','2026-11-01'),true);
  assert.throws(()=>isDue('2026-02-30','2026-11-01'),/Invalid calendar/);
});

test('source watch permits only bounded explicit official URL hosts and valid registry slugs', () => {
  const data = {schemaVersion:1,nextSourceIndex:0,safety:{sourceCountCap:30,perRunSourceCap:25,perSourceTimeoutMs:12000,
    maxBodyBytes:1600000,approvedDomains:['example.edu','realignment.uiltexas.org','another-school.edu']},
    sources:Array.from({length:10},(_,i)=>({
      slug:'school-'+i,url:'https://example.edu/football/'+i,reviewAfter:'2026-11-07',
      contentFingerprint:null,lastObservedAt:null}))};
  const registry={schoolRecords:data.sources.map(s=>({slug:s.slug}))};
  assert.equal(validateLedger(data,registry,'2026-10-28'),10);
  const altered=structuredClone(data);
  altered.sources[0].url='https://example.edu.attacker.com/redirect';
  assert.throws(()=>validateLedger(altered,registry,'2026-10-28'),/authorized official host/i);
  const duplicate=structuredClone(data); duplicate.sources[1].slug=duplicate.sources[0].slug;
  assert.throws(()=>validateLedger(duplicate,registry,'2026-10-28'),/Unique source ID/);
});

test('cursor checks at most 25 sources and eventually reaches all 36 official URLs', () => {
  const ledger = { nextSourceIndex:0,safety:{perRunSourceCap:25},sources:
    Array.from({length:36},(_,i)=>({slug:'school-'+i})) };
  const first=selectSourceCohort(ledger);
  assert.equal(first.length,25);
  assert.equal(first[0].slug,'school-0');
  assert.equal(first[24].slug,'school-24');
  ledger.nextSourceIndex=(ledger.nextSourceIndex+first.length)%ledger.sources.length;
  const second=selectSourceCohort(ledger);
  assert.equal(second.length,25);
  assert.equal(second[0].slug,'school-25');
  assert.equal(second[11].slug,'school-0');
  assert.equal(new Set([...first,...second].map(x=>x.slug)).size,36);
  assert.equal(ledger.nextSourceIndex,25);
});

test('watch inventory fails closed for invalid cursor or a large per-run scan', () => {
  const data={schemaVersion:1,nextSourceIndex:0,
    safety:{sourceCountCap:36,perRunSourceCap:25,perSourceTimeoutMs:12000,
      maxBodyBytes:1600000,approvedDomains:['example.edu','district.edu','realignment.uiltexas.org']},
    sources:Array.from({length:36},(_,i)=>({
      slug:'school-'+i,url:'https://example.edu/'+i,
      reviewAfter:'2026-11-07',contentFingerprint:null,lastObservedAt:null}))};
  const registry={schoolRecords:data.sources.map(row=>({slug:row.slug}))};
  assert.equal(validateLedger(data,registry,'2026-10-28'),36);
  data.nextSourceIndex=36;
  assert.throws(()=>validateLedger(data,registry,'2026-10-28'),/cursor/);
  data.nextSourceIndex=0;data.safety.perRunSourceCap=26;
  assert.throws(()=>validateLedger(data,registry,'2026-10-28'),/more than 25/);
});

test('official source never fetches off-allowlist redirect destination', async () => {
  const savedFetch = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url, options) => {
    seen.push(String(url));
    assert.equal(options.redirect, 'manual');
    return new Response(null, {status:302,headers:{location:'https://unapproved.example/secret'}});
  };
  try {
    await assert.rejects(
      probeSource({url:'https://example.edu/football'}, {allowed:new Set(['example.edu']),timeoutMs:2000,maxBytes:1600000}),
      /unauthorized official host/);
    assert.deepEqual(seen,['https://example.edu/football']);
  } finally { globalThis.fetch = savedFetch; }
});

test('official source permits bounded same-host redirects before hashing', async () => {
  const savedFetch = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url, options) => {
    seen.push(String(url));
    assert.equal(options.redirect, 'manual');
    if (seen.length === 1) return new Response(null, {status:302,headers:{location:'/football/varsity'}});
    return new Response('<html><body><h1>Football</h1><p>'+'School-published varsity schedule '.repeat(8)+'</p></body></html>',
      {status:200,headers:{'content-type':'text/html'}});
  };
  try {
    const result=await probeSource({url:'https://example.edu/football'},{allowed:new Set(['example.edu']),timeoutMs:2000,maxBytes:1600000});
    assert.equal(seen.length,2);
    assert.equal(seen[1],'https://example.edu/football/varsity');
    assert.match(result.fingerprint,/^[a-f0-9]{64}$/);
  } finally { globalThis.fetch = savedFetch; }
});
