import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeVisibleText, isDue, validateLedger } from './check-football-authority-official-sources.mjs';

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
  const data = {schemaVersion:1,safety:{sourceCountCap:30,perSourceTimeoutMs:12000,
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
