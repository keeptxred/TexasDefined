/**
 * Compare Cloudflare's recalculated daily referral aggregates against the
 * current private Supabase snapshot. A healthy hourly sync must not rewrite
 * thousands of identical historical rows just to refresh synced_at.
 *
 * The separate single-row pipeline heartbeat remains updated by every
 * successful run, including zero-traffic hours.
 */
const KEY_COLUMNS = [
  'metric_date','partner','placement','page_path',
  'destination_hash','acquisition_source',
];
export const referralRowKey = row =>
  KEY_COLUMNS.map(column => String(row[column] ?? '')).join('\u0000');

function count(value) {
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 0) throw new Error('Invalid referral aggregate count');
  return n;
}

export function changedReferralAggregates(incoming, existing) {
  if (!Array.isArray(incoming) || !Array.isArray(existing)) {
    throw new Error('Referral sync requires complete arrays');
  }
  const oldByKey = new Map();
  for (const row of existing) {
    const key = referralRowKey(row);
    if (oldByKey.has(key)) throw new Error('Duplicate existing aggregate identity; refusing partial update');
    oldByKey.set(key,row);
  }
  const seen = new Set();
  return incoming.filter(row => {
    const key = referralRowKey(row);
    if (seen.has(key)) throw new Error('Duplicate new aggregate identity');
    seen.add(key);
    const prev = oldByKey.get(key);
    const clicks = count(row.click_count), impressions = count(row.impression_count);
    return !prev || count(prev.click_count) !== clicks ||
      count(prev.impression_count) !== impressions ||
      prev.destination_url !== row.destination_url;
  });
}
