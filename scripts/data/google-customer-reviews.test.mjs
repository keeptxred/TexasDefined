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

import { merchantOfferDescription } from '../../src/lib/merchant-offer-description.ts';
test('Merchant descriptions state the exact catalog variant and retain supplier facts', () => {
  assert.equal(merchantOfferDescription('100% cotton. Botanical graphic.', 'Natural', 'M'), 'Color: Natural. Size: M. 100% cotton. Botanical graphic.');
  assert.equal(merchantOfferDescription('Graphic tee'), 'Graphic tee');
  assert.ok(merchantOfferDescription('supplier detail '.repeat(500), 'Blue', 'XL').length <= 5000);
});
