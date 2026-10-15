import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewOrderFromResponse } from '../../src/lib/google-customer-reviews.ts';
const merchant = 5843243953;
const order = { merchant_id: merchant, order_id: 'cs_live_receipt', email: 'buyer@example.test', delivery_country: 'US', estimated_delivery_date: '2026-11-03' };
test('only the approved review fields reach Google for the matching merchant', () => {
  assert.deepEqual(reviewOrderFromResponse({ ...order, phone: 'private', address: 'private' }, merchant), order);
});
test('unusable or foreign receipt data cannot start a review prompt', () => {
  for (const invalid of [null, {}, { ...order, merchant_id: 1 }, { ...order, order_id: 'cs_test_receipt' }, { ...order, email: 'invalid' }, { ...order, delivery_country: 'CA' }, { ...order, estimated_delivery_date: 'tomorrow' }]) {
    assert.equal(reviewOrderFromResponse(invalid, merchant), null);
  }
});
