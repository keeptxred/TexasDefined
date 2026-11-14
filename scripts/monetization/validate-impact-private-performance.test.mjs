import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const sql=readFileSync('supabase/migrations/20261027213000_create_private_impact_performance.sql','utf8');
const doc=readFileSync('docs/impact-private-performance.md','utf8');
test('Impact finance table is service-role only, RLS protected, no public grants',()=>{
  for(const needle of [
    'create table if not exists public.texasdefined_impact_performance_daily',
    'metric_date date primary key',
    'enable row level security',
    'revoke all on table public.texasdefined_impact_performance_daily from public, anon, authenticated',
    'grant select, insert, update, delete on table public.texasdefined_impact_performance_daily to service_role',
    'impact_currency_proof_required',
    'currency_code is not null',
  ])assert.ok(sql.includes(needle),'missing private reporting control '+needle);
  assert.doesNotMatch(sql,/grant\s+(?:select|all)\s+on\s+(?:table\s+)?public\.texasdefined_impact_performance_daily\s+to\s+(?:anon|authenticated)/i);
});
test('No customer or raw checkout fields in aggregate storage',()=>{
  assert.doesNotMatch(sql,/^\s*(?:action_id|customer_email|ip_address|tracking_id|order_id|raw_json)\s+/im);
  assert.match(doc,/not confirmed cash paid/);
  assert.match(doc,/not.*public/i);
});

test('Provider metrics stay behind the existing commercial-admin key and cannot leak into public routes',()=>{
  const server=readFileSync('src/data/partner-referral-analytics.server.ts','utf8');
  const page=readFileSync('src/routes/admin.partner-referrals.lazy.tsx','utf8');
  const types=readFileSync('src/data/partner-referral-analytics.types.ts','utf8');
  const access=server.indexOf('await assertSportsPartnerAccess(accessKey)');
  const provider=server.indexOf(".from('texasdefined_impact_performance_daily')");
  assert.ok(access>=0 && provider>access,'Impact provider access must follow commercial-admin authentication');
  assert.match(page,/dashboard\.impact\.providerActions30d/);
  assert.match(page,/Amounts and payouts are withheld/);
  assert.match(types,/settledCommissionVerified: false;/);
  assert.doesNotMatch(server,/console\.(?:log|debug|info).*impact/i);
});

test('Impact dashboard requests 30 COMPLETED Texas dates rather than 30 UTC dates including today',()=>{
  const server=readFileSync('src/data/partner-referral-analytics.server.ts','utf8');
  const ui=readFileSync('src/routes/admin.partner-referrals.lazy.tsx','utf8');
  assert.match(server,/function completedTexasReportWindow\(days: number, now = new Date\(\)\)/);
  assert.match(server,/timeZone: 'America\/Chicago'/);
  assert.match(server,/const impactWindow = completedTexasReportWindow\(WINDOW_DAYS\)/);
  assert.match(server,/\.gte\('metric_date', impactWindow\.start\)/);
  assert.match(server,/\.lt\('metric_date', impactWindow\.endExclusive\)/);
  assert.match(ui,/30 completed Texas calendar days/);
  assert.match(ui,/a missing provider report date is unknown, never an assumed zero/);
  const discovery=readFileSync('.github/workflows/discover-impact-reporting.yml','utf8');
  assert.doesNotMatch(discovery,/^  schedule:/m);
  assert.match(discovery,/workflow_dispatch:/);
  const sync=readFileSync('.github/workflows/sync-private-impact-performance.yml','utf8');
  assert.match(sync,/schedule:/);
});
