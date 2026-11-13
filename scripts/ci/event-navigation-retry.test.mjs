import assert from 'node:assert/strict';
import test from 'node:test';
import { EVENT_NAV_ATTEMPTS, shouldRetryEventNavigationStatus } from './event-navigation-retry.mjs';

test('retry only isolated server faults, never false-positive content or canonical failures', () => {
  assert.equal(EVENT_NAV_ATTEMPTS, 3);
  for (const status of [500, 502, 503, 504]) {
    assert.equal(shouldRetryEventNavigationStatus(status,1),true);
    assert.equal(shouldRetryEventNavigationStatus(status,2),true);
    assert.equal(shouldRetryEventNavigationStatus(status,3),false);
  }
  for (const status of [0, 200, 201, 301, 302, 400, 403, 404, 429]) {
    for (const attempt of [1, 2, 3]) assert.equal(shouldRetryEventNavigationStatus(status,attempt),false);
  }
  assert.equal(shouldRetryEventNavigationStatus(500,0),false);
  assert.equal(shouldRetryEventNavigationStatus(500,4),false);
  assert.equal(shouldRetryEventNavigationStatus(undefined,1),false);
});
