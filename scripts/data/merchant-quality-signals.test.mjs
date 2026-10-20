import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { additionalMerchantImages } from '../../src/lib/merchant-offer-images.ts';

test('only real variant photos are exported, normalized duplicates removed and extra photos capped at ten', () => {
  const normalize = (value) => value?.startsWith('https://') ? value : '';
  const photos = ['https://front', null, 'invalid', 'https://back', 'https://back', ...Array.from({length: 12}, (_, i) => `https://detail-${i}`)];
  const result = additionalMerchantImages('https://front', photos, normalize);
  assert.equal(result.length, 10);
  assert.equal(result[0], 'https://back');
  assert.equal(new Set(result).size, 10);
  assert.ok(!result.includes('https://front'));
  assert.deepEqual(additionalMerchantImages('https://front', [], normalize), []);
});

test('shipping estimates include production and transit rather than missing delivery-time overrides', () => {
  const source = readFileSync('src/routes/google-merchant-feed[.]xml.ts', 'utf8');
  for (const [field, value] of [['min_handling_time', 3], ['max_handling_time', 7], ['min_transit_time', 2], ['max_transit_time', 5]]) {
    assert.ok(source.includes(`<g:${field}>${value}</g:${field}>`));
  }
  assert.ok(source.includes('variant.images ?? [], merchantImageUrl'));
  assert.ok(source.includes('<g:additional_image_link>'));
});
