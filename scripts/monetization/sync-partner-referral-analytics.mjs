import { createHash } from 'node:crypto';

const DATASET = 'texas_defined_outcomes';
const TABLE = 'texasdefined_partner_referral_daily';
const WINDOW_DAYS = 31;
const MAX_ROWS = 10_000;
const UPSERT_CHUNK_SIZE = 400;
const HEARTBEAT_PARTNER = '__pipeline__';
const HEARTBEAT_PLACEMENT = 'sync-heartbeat';
const HEARTBEAT_PAGE_PATH = '/admin/partner-referrals';
const HEARTBEAT_DESTINATION = 'https://texasdefined.com/admin/partner-referrals';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function clean(value, max) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function validHttps(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString().slice(0, 1800) : '';
  } catch {
    return '';
  }
}

function validPath(value) {
  const path = clean(value, 600);
  return path.startsWith('/') ? path : '';
}

function dateOnly(value) {
  const raw = clean(value, 64);
  const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] || '';
}

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function asCount(value) {
  const count = Number(value);
  if (!Number.isFinite(count) || count < 0) return 0;
  return Math.round(count);
}

async function queryCloudflare(accountId, apiToken) {
  const sql = `SELECT
    formatDateTime(toStartOfDay(timestamp), '%Y-%m-%d', 'Etc/UTC') AS metricDate,
    blob2 AS partner,
    blob7 AS placement,
    blob11 AS pagePath,
    blob6 AS destinationUrl,
    SUM(_sample_interval) AS clickCount
  FROM ${DATASET}
  WHERE timestamp > NOW() - INTERVAL '${WINDOW_DAYS}' DAY
    AND blob1 = 'partner_referral_clicked'
    AND blob10 != 'ci-probe'
    AND blob2 != ''
    AND blob6 != ''
    AND blob11 != ''
  GROUP BY metricDate, partner, placement, pagePath, destinationUrl
  ORDER BY metricDate ASC
  LIMIT ${MAX_ROWS}
  FORMAT JSON`;

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiToken}` },
    body: sql,
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Cloudflare Analytics Engine query failed with HTTP ${response.status}: ${body.slice(0, 500)}`);
  }

  let payload;
  try { payload = JSON.parse(body); }
  catch { throw new Error('Cloudflare Analytics Engine returned invalid JSON.'); }
  if (!payload || !Array.isArray(payload.data)) throw new Error('Cloudflare Analytics Engine returned an unexpected response shape.');
  return payload.data;
}

function normalizeRows(rows) {
  const normalized = [];
  for (const row of rows) {
    const metricDate = dateOnly(row.metricDate);
    const partner = clean(row.partner, 120);
    const placement = clean(row.placement || 'unspecified', 160) || 'unspecified';
    const pagePath = validPath(row.pagePath);
    const destinationUrl = validHttps(row.destinationUrl);
    const clickCount = asCount(row.clickCount);
    if (!metricDate || !partner || !pagePath || !destinationUrl || clickCount <= 0) continue;
    normalized.push({
      metric_date: metricDate,
      partner,
      placement,
      page_path: pagePath,
      destination_url: destinationUrl,
      destination_hash: hash(destinationUrl),
      click_count: clickCount,
      synced_at: new Date().toISOString(),
    });
  }
  return normalized;
}

function heartbeatRow() {
  const syncedAt = new Date().toISOString();
  return {
    metric_date: syncedAt.slice(0, 10),
    partner: HEARTBEAT_PARTNER,
    placement: HEARTBEAT_PLACEMENT,
    page_path: HEARTBEAT_PAGE_PATH,
    destination_url: HEARTBEAT_DESTINATION,
    destination_hash: hash(HEARTBEAT_DESTINATION),
    click_count: 0,
    synced_at: syncedAt,
  };
}

async function upsertRows(supabaseUrl, serviceRoleKey, rows) {
  if (!rows.length) return;
  const endpoint = new URL(`/rest/v1/${TABLE}`, supabaseUrl);
  endpoint.searchParams.set('on_conflict', 'metric_date,partner,placement,page_path,destination_hash');

  for (let start = 0; start < rows.length; start += UPSERT_CHUNK_SIZE) {
    const chunk = rows.slice(start, start + UPSERT_CHUNK_SIZE);
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
      throw new Error(`Supabase referral aggregate upsert failed with HTTP ${response.status}: ${body.slice(0, 500)}`);
    }
  }
}

const accountId = required('CLOUDFLARE_ACCOUNT_ID');
const apiToken = required('CLOUDFLARE_API_TOKEN');
const supabaseUrl = required('SUPABASE_URL');
const serviceRoleKey = required('SUPABASE_SERVICE_ROLE_KEY');

const rawRows = await queryCloudflare(accountId, apiToken);
if (rawRows.length >= MAX_ROWS) throw new Error(`Cloudflare result hit the ${MAX_ROWS}-row safety cap; refine the aggregation before syncing.`);
const rows = normalizeRows(rawRows);
await upsertRows(supabaseUrl, serviceRoleKey, rows);
const heartbeat = heartbeatRow();
await upsertRows(supabaseUrl, serviceRoleKey, [heartbeat]);

const clicks = rows.reduce((sum, row) => sum + row.click_count, 0);
console.log(`Partner referral analytics sync complete: ${rows.length} aggregates covering ${clicks} non-CI clicks across the last ${WINDOW_DAYS} days; successful pipeline heartbeat ${heartbeat.synced_at}.`);
