import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyHistoricalGsc404, REVIEW_OUTCOMES } from './gsc-404-classification.mjs';

const disposition = (firstStatus, finalStatus, invalidTemplate = false, error = null) =>
  classifyHistoricalGsc404({ firstStatus, finalStatus, invalidTemplate, error });

test('16 actual malformed router paths returning direct 404 count as expected', () => {
  for (const status of [404, 410]) {
    assert.equal(disposition(status, status, true), 'expected_invalid_template');
  }
});

test('historical 307 to encoded invalid token is NOT a legitimate redirect-to-missing', () => {
  assert.equal(disposition(307, 404, true), 'invalid_template_redirect_chain');
  assert.equal(disposition(301, 404, true), 'invalid_template_redirect_chain');
  assert.ok(REVIEW_OUTCOMES.has(disposition(307, 404, true)));
});

test('unknown invalid templates cannot become indexable 200 or unrelated 500', () => {
  assert.equal(disposition(200, 200, true), 'invalid_template_unexpected_response');
  assert.equal(disposition(500, 500, true), 'invalid_template_unexpected_response');
});

test('legitimate 301 to working page is distinct from a broken source alias', () => {
  assert.equal(disposition(301, 200), 'redirected_to_200');
  assert.equal(disposition(301, 404), 'redirect_to_missing');
  assert.ok(REVIEW_OUTCOMES.has(disposition(301, 404)));
  assert.ok(!REVIEW_OUTCOMES.has(disposition(301, 200)));
});

test('unpublished or retired source URL 404 is retained for individual disposition', () => {
  assert.equal(disposition(404, 404), 'missing_needs_disposition');
  assert.equal(disposition(410, 410), 'missing_needs_disposition');
  assert.equal(disposition(200, 200), 'now_200');
});

test('never collapse transport failures or server errors into a 404 signal', () => {
  assert.equal(disposition(null, null, false, 'timeout'), 'transport_or_chain_problem');
  assert.equal(disposition(500, 500), 'server_error');
  assert.equal(disposition(429, 429), 'other_http_status');
});
