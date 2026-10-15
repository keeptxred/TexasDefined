import assert from 'node:assert/strict';
import test from 'node:test';
import { TEXAS_VS_STATE_GROUPS, TEXAS_VS_STATES, texasVsRelatedStates, texasVsCanonicalPath } from '../../src/data/texas-vs-states-index.ts';

test('regional related reading reaches every Texas-vs-state page without increasing its link budget', () => {
  assert.equal(TEXAS_VS_STATES.length, 49);
  const incoming = new Map(TEXAS_VS_STATES.map(state => [state, 0]));
  for (const group of TEXAS_VS_STATE_GROUPS) {
    for (const state of group.states) {
      const peers = texasVsRelatedStates(state);
      assert.equal(peers.length, 6, state);
      assert.equal(new Set(peers).size, 6, state);
      assert.ok(!peers.includes(state), state);
      assert.ok(peers.every(peer => group.states.some(member => member === peer)), state);
      for (const peer of peers) {
        incoming.set(peer, incoming.get(peer) + 1);
        assert.ok(texasVsCanonicalPath(peer).startsWith('/texas-vs/') || texasVsCanonicalPath(peer).startsWith('/article/'), peer);
      }
    }
  }
  assert.deepEqual([...incoming.values()], Array(49).fill(6));
});

test('unknown state names produce no invented comparison links', () => {
  assert.deepEqual(texasVsRelatedStates('Not a State'), []);
});

test('redirect-only states retain one canonical article URL, not a duplicate comparison URL', () => {
  for (const state of ['California', 'Florida']) {
    assert.equal(texasVsCanonicalPath(state), '/article/texas-vs-' + state.toLowerCase() + '-differences');
  }
  for (const state of TEXAS_VS_STATES.filter(state => state !== 'California' && state !== 'Florida')) {
    assert.ok(texasVsCanonicalPath(state).startsWith('/texas-vs/'), state);
  }
});

