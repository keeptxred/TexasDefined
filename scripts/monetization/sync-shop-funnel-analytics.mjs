const DATASET = 'texas_defined_outcomes';
const TABLE = 'texasdefined_shop_funnel_daily';
const WINDOW_DAYS = 31;
const RETENTION_DAYS = 90;
const MAX_ROWS = 10_000;
const EVENTS = [
  'shop_add_to_cart',
  'shop_checkout_started',
  'shop_checkout_created',
  'shop_checkout_failed',
  'shop_checkout_returned',
  'shop_purchase_confirmed',
  'shop_purchase_unconfirmed',
];

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function clean(value, max) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function dateOnly(value) {
  return clean(value, 64).match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '';
}

function asCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? Math.round(count) : 0;
}

async function queryCloudflare(accountId, apiToken) {
  const quotedEvents = EVENTS.map((event) => `'${event}'`).join(', ');
  const sql = `SELECT
    formatDateTime(toStartOfDay(timestamp), '%Y-%m-%d', 'Etc/UTC') AS metricDate,
    blob1 AS eventName,
    blob11 AS pagePath,
    if(blob10 = '', 'unspecified', blob10) AS detection,
    SUM(_sample_interval) AS eventCount
  FROM ${DATASET}
  WHERE timestamp > NOW() - INTERVAL '${WINDOW_DAYS}' DAY
    AND blob1 IN (${quotedEvents})
    AND blob10 != 'ci-probe'
  GROUP BY metricDate, eventName, pagePath, detection
  ORDER BY metricDate ASC
  LIMIT ${MAX_ROWS}
  FORMAT JSON`;

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiToken}` },
    body: sql,
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Cloudflare shop funnel query failed with HTTP ${response.status}: ${body.slice(0, 500)}`);

  let payload;
  try { payload = JSON.parse(body); }
  catch { throw new Error('Cloudflare shop funnel query returned invalid JSON.'); }
  if (!payload || !Array.isArray(payload.data)) throw new Error('Cloudflare shop funnel query returned an unexpected response shape.');
  return payload.data;
}

function normalizeRows(rows) {
  const syncedAt = new Date().toISOString();
  return rows.map((row) => ({
    metric_date: dateOnly(row.metricDate),
    event_name: clean(row.eventName, 80),
    page_path: clean(row.pagePath, 600),
    detection: clean(row.detection || 'unspecified', 120) || 'unspecified',
    event_count: asCount(row.eventCount),
    synced_at: syncedAt,
  })).filter((row) =>
    row.metric_date &&
    EVENTS.includes(row.event_name) &&
    row.page_path.startsWith('/') &&
    row.event_count > 0
  );
}

function heartbeatRow() {
  const syncedAt = new Date().toISOString();
  return {
    metric_date: syncedAt.slice(0, 10),
    event_name: 'shop_funnel_sync_heartbeat',
    page_path: '/admin/shop-funnel',
    detection: 'sync',
    event_count: 0,
    synced_at: syncedAt,
  };
}

async function upsertRows(supabaseUrl, serviceRoleKey, rows) {
  if (!rows.length) return;
  const endpoint = new URL(`/rest/v1/${TABLE}`, supabaseUrl);
  endpoint.searchParams.set('on_conflict', 'metric_date,event_name,page_path,detection');

  for (let start = 0; start < rows.length; start += 400) {
    const chunk = rows.slice(start, start + 400);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(chunk),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Supabase shop funnel upsert failed with HTTP ${response.status}: ${body.slice(0, 500)}`);
    }
  }
}

async function pruneOldRows(supabaseUrl, serviceRoleKey) {
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - RETENTION_DAYS);
  const endpoint = new URL(`/rest/v1/${TABLE}`, supabaseUrl);
  endpoint.searchParams.set('metric_date', `lt.${cutoff.toISOString().slice(0, 10)}`);
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'return=minimal',
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase shop funnel retention cleanup failed with HTTP ${response.status}: ${body.slice(0, 500)}`);
  }
}

const accountId = required('CLOUDFLARE_ACCOUNT_ID');
const apiToken = required('CLOUDFLARE_API_TOKEN');
const supabaseUrl = required('SUPABASE_URL');
const serviceRoleKey = required('SUPABASE_SERVICE_ROLE_KEY');

const rawRows = await queryCloudflare(accountId, apiToken);
if (rawRows.length >= MAX_ROWS) throw new Error(`Cloudflare shop funnel result hit the ${MAX_ROWS}-row safety cap.`);
const rows = normalizeRows(rawRows);
await upsertRows(supabaseUrl, serviceRoleKey, [...rows, heartbeatRow()]);
await pruneOldRows(supabaseUrl, serviceRoleKey);

const totals = Object.fromEntries(EVENTS.map((event) => [
  event,
  rows.filter((row) => row.event_name === event).reduce((sum, row) => sum + row.event_count, 0),
]));
console.log(`Shop funnel analytics sync complete: ${rows.length} aggregates across the last ${WINDOW_DAYS} days; ${JSON.stringify(totals)}`);
