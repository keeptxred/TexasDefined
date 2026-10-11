import test from 'node:test';
import assert from 'node:assert/strict';
import {
  prepareNetworkGraphBatch, rehearseNetworkGraphResponses,
  dispatchPreparedNetworkGraphBatch, NETWORK_GRAPH_WORKER_MAX_BATCH,
} from '../../src/data/network-notification-dispatch-worker.server.ts';

function claim(i) {
  const suffix=String(i).padStart(12,'0');
  return {
    id:`11111111-1111-4111-8111-${suffix}`,
    claim_token:`22222222-2222-4222-8222-${suffix}`,
    event_key:`application:${suffix}:received`,
    event_type:'application_received',
    recipient_email:`test${i}@example.invalid`,
    payload:{business_name:'Synthetic Texas Business'},
    attempts:1,
  };
}
test('Graph batch rehearsal validates at most five independent claims and never sends',()=>{
  const originalFetch=globalThis.fetch;
  globalThis.fetch=async()=>{throw Error('Graph must never be contacted by rehearsal')};
  try {
    const rows=Array.from({length:NETWORK_GRAPH_WORKER_MAX_BATCH},(_,i)=>claim(i+1));
    assert.equal(prepareNetworkGraphBatch(rows).length,5);
    const statuses=[202,429,400,503,undefined];
    const outcomes=rehearseNetworkGraphResponses(rows,statuses);
    assert.equal(outcomes.length,5);
    assert.equal(outcomes[0].classification,'accepted_unconfirmed');
    assert.equal(outcomes[1].classification,'retryable_rejection');
    assert.equal(outcomes[2].classification,'permanent_rejection');
    assert.equal(outcomes[3].classification,'ambiguous_do_not_resend');
    for(const result of outcomes){
      assert.equal(result.mayMarkDelivered,false);
      assert.equal(result.mayRetryAutomatically,false);
      assert.equal(Object.hasOwn(result,'claimToken'),false);
      assert.equal(Object.hasOwn(result,'recipient'),false);
    }
  } finally { globalThis.fetch=originalFetch; }
});
test('batch refuses overlarge, corrupt or repeated claims before preparing any transport',()=>{
  assert.throws(()=>prepareNetworkGraphBatch(Array.from({length:6},(_,i)=>claim(i+1))),/batch invalid/);
  assert.throws(()=>prepareNetworkGraphBatch(null),/batch invalid/);
  assert.throws(()=>prepareNetworkGraphBatch([claim(1),claim(1)]),/repeated claim/);
  assert.throws(()=>prepareNetworkGraphBatch([claim(1),{...claim(2),claim_token:claim(1).claim_token}]),/repeated claim/);
  assert.throws(()=>prepareNetworkGraphBatch([claim(1),{...claim(2),attempts:4}]),/claim invalid/);
  assert.throws(()=>rehearseNetworkGraphResponses([claim(1)],[]),/outcomes invalid/);
});
test('the real dispatch seam is always disabled before any callbacks or network use',async()=>{
  let calls=0;
  await assert.rejects(
    dispatchPreparedNetworkGraphBatch([claim(1)],async()=>{calls++;return {status:202};}),
    /not authorized/,
  );
  assert.equal(calls,0);
});
