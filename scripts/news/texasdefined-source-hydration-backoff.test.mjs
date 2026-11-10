import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cooldownFeedIds, SOURCE_HYDRATION_FAILURE_COOLDOWN_HOURS } from './texasdefined-source-hydration-backoff.mjs';

const now = Date.parse('2026-11-10T04:00:00Z');
const row = (id, result, at) => ({
  feed_item_id: id, last_result: result, last_attempt_at: at,
});

test('does not immediately retry unreadable original pages while starving other leads', () => {
  assert.equal(SOURCE_HYDRATION_FAILURE_COOLDOWN_HOURS, 24);
  const blocked = cooldownFeedIds([
    row(6900193, 'no_readable_body', '2026-11-10T03:27:18Z'),
    row(6900188, 'no_readable_body', '2026-11-10T03:27:18Z'),
    row(6896188, 'update_failed', '2026-11-10T03:27:18Z'),
    row(6890379, 'success', '2026-11-10T03:27:18Z'),
  ], now);
  assert.deepEqual([...blocked].sort((a,b)=>a-b), [6896188,6900188,6900193]);
});

test('retry is automatically re-enabled after cooldown; invalid/future timestamps do not create perpetual holds', () => {
  const rows = [
    row(1, 'no_readable_body', '2026-11-09T04:00:00Z'),
    row(2, 'no_readable_body', '2026-11-09T03:59:59Z'),
    row(3, 'no_readable_body', '2026-11-10T04:01:00Z'),
    row(4, 'no_readable_body', 'invalid'),
    row(5, 'success', '2026-11-10T03:50:00Z'),
    row(6, 'update_failed', '2026-11-10T03:59:59Z'),
  ];
  assert.deepEqual([...cooldownFeedIds(rows,now)], [6]);
});

test('non-failure rows, missing IDs and null state are not treated as publisher rejections', () => {
  assert.equal(cooldownFeedIds(null, now).size, 0);
  assert.equal(cooldownFeedIds([row(0,'no_readable_body','2026-11-10T03:55:00Z'),row(7,'success','2026-11-10T03:55:00Z')],now).size,0);
});
