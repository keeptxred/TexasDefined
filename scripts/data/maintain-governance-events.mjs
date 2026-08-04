const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
const headers = { apikey: key, authorization: `Bearer ${key}`, 'content-type': 'application/json' };

async function rpc(name, body) {
  const response = await fetch(`${url}/rest/v1/rpc/${name}`, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`${name} failed: ${response.status} ${(await response.text()).slice(0, 500)}`);
  return response.json();
}

const retainedDays = Math.max(30, Math.min(Number(process.env.GOVERNANCE_RETENTION_DAYS || 180), 3650));
const aggregateDays = Math.max(1, Math.min(Number(process.env.GOVERNANCE_AGGREGATE_DAYS || 30), 3650));
const refreshed = await rpc('refresh_platform_governance_daily_summaries', { days_back: aggregateDays });
const removed = await rpc('prune_platform_governance_events', { retain_days: retainedDays });
console.log(JSON.stringify({ ok: true, aggregateDays, refreshed, retainedDays, removed, completedAt: new Date().toISOString() }, null, 2));
