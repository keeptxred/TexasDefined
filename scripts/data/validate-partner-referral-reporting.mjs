import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const migration = read('supabase/migrations/20260916032000_create_partner_referral_daily.sql');
const impressionMigration = read('supabase/migrations/20260918133000_add_partner_referral_impressions.sql');
const sync = read('scripts/monetization/sync-partner-referral-analytics.mjs');
const workflow = read('.github/workflows/sync-partner-referral-analytics.yml');
const server = read('src/data/partner-referral-analytics.server.ts');
const types = read('src/data/partner-referral-analytics.types.ts');
const functions = read('src/data/partner-referral-analytics.functions.ts');
const route = read('src/routes/admin.partner-referrals.tsx');
const lazyRoute = read('src/routes/admin.partner-referrals.lazy.tsx');
const admin = read('src/routes/admin.tsx');
const collector = read('src/lib/texas-defined-outcome-analytics.server.ts');
const errors = [];

function expect(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['create table if not exists public.texasdefined_partner_referral_daily', 'private aggregate table'],
  ['alter table public.texasdefined_partner_referral_daily enable row level security', 'RLS'],
  ['revoke all on table public.texasdefined_partner_referral_daily from public, anon, authenticated', 'public-role revocation'],
  ['grant select, insert, update, delete on table public.texasdefined_partner_referral_daily to service_role', 'service-role access'],
  ['destination_hash text not null', 'destination identity key'],
  ['primary key (metric_date, partner, placement, page_path, destination_hash)', 'idempotent aggregate key'],
]) expect(migration, needle, label);

for (const [needle, label] of [
  ['add column if not exists impression_count bigint not null default 0', 'affiliate impression aggregate column'],
  ['check (impression_count >= 0)', 'nonnegative impression count'],
  ['Privacy-safe daily count of qualifying commercial CTA impressions', 'impression privacy contract'],
]) expect(impressionMigration, needle, label);

for (const [needle, label] of [
  ["const DATASET = 'texas_defined_outcomes'", 'outcome dataset'],
  ["blob1 IN ('partner_referral_clicked', 'partner_referral_shown')", 'partner click/impression filter'],
  ['blob1 AS eventName', 'outcome event dimension'],
  ['SUM(_sample_interval) AS eventCount', 'sampling-aware outcome aggregation'],
  ['impression_count: 0', 'impression aggregate initialization'],
  ["blob10 != 'ci-probe'", 'CI probe exclusion'],
  ["const TABLE = 'texasdefined_partner_referral_daily'", 'private aggregate target'],
  ["createHash('sha256')", 'destination hash'],
  ["Prefer: 'resolution=merge-duplicates,return=minimal'", 'idempotent upsert'],
  ["required('CLOUDFLARE_API_TOKEN')", 'Cloudflare token requirement'],
  ["required('SUPABASE_SERVICE_ROLE_KEY')", 'Supabase service-role requirement'],
  ["const HEARTBEAT_PARTNER = '__pipeline__'", 'reserved sync heartbeat identity'],
  ["const HEARTBEAT_PLACEMENT = 'sync-heartbeat'", 'sync heartbeat placement'],
  ["const FALLBACK_STALE_MINUTES_ENV = 'PARTNER_REFERRAL_SYNC_IF_STALE_MINUTES'", 'fallback freshness environment'],
  ['async function latestHeartbeatAgeMinutes', 'service-role heartbeat freshness lookup'],
  ["endpoint.searchParams.set('partner', `eq.${HEARTBEAT_PARTNER}`)", 'heartbeat partner filter'],
  ["endpoint.searchParams.set('placement', `eq.${HEARTBEAT_PLACEMENT}`)", 'heartbeat placement filter'],
  ['if (heartbeatAgeMinutes <= fallbackStaleMinutes)', 'fallback freshness skip'],
  ['Partner referral analytics fallback skipped', 'fallback skip telemetry'],
  ['click_count: 0', 'zero-click heartbeat'],
  ['impression_count: 0', 'zero-impression heartbeat'],
  ['await upsertRows(supabaseUrl, serviceRoleKey, [heartbeat])', 'post-aggregate heartbeat write'],
]) expect(sync, needle, label);
if (/sessionId|session_id/.test(sync)) errors.push('Sync must not read or persist browser session identifiers.');
const fallbackGuardIndex = sync.indexOf('if (fallbackStaleMinutes > 0)');
const cloudflareCredentialIndex = sync.indexOf("const accountId = required('CLOUDFLARE_ACCOUNT_ID')");
if (fallbackGuardIndex < 0 || cloudflareCredentialIndex < 0 || fallbackGuardIndex > cloudflareCredentialIndex) {
  errors.push('Fallback freshness guard must run before Cloudflare credentials are required so healthy fallback runs avoid an unnecessary Analytics Engine query.');
}

for (const [needle, label] of [
  ["schedule:", 'scheduled sync'],
  ["cron: '17 * * * *'", 'primary hourly sync cadence'],
  ["cron: '47 * * * *'", 'fallback hourly sync opportunity'],
  ["PARTNER_REFERRAL_SYNC_IF_STALE_MINUTES: ${{ github.event_name == 'schedule' && github.event.schedule == '47 * * * *' && '70' || '' }}", 'fallback-only freshness guard'],
  ['authorize:', 'protected authorization job'],
  ['environment: texasdefined-publication', 'protected GitHub environment'],
  ['Authorize private referral sync', 'explicit environment authorization step'],
  ['needs: authorize', 'sync dependency on protected authorization'],
  ['CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}', 'repository Cloudflare analytics secret'],
  ["SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY || secrets.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY }}", 'private Supabase secret'],
]) expect(workflow, needle, label);

const syncJobMatch = workflow.match(/\n  sync:\n([\s\S]*)$/);
if (!syncJobMatch) errors.push('Sync workflow must define a sync job.');
else if (/^    environment:/m.test(syncJobMatch[1])) {
  errors.push('Sync job must remain outside the texasdefined-publication environment so repository-level Analytics Engine credentials are not shadowed by environment-scoped deployment credentials.');
}

for (const [needle, label] of [
  ["assertSportsPartnerAccess(accessKey)", 'commercial admin authorization'],
  ["from('texasdefined_partner_referral_daily')", 'private aggregate read'],
  ['impression_count', 'private impression aggregate read'],
  ['IMPRESSION_TRACKING_STARTED_AT', 'CTR tracking start boundary'],
  ['totalImpressions30d', '30-day impression reporting'],
  ['clickThroughRateSinceImpressionTracking', 'truthful post-rollout CTR reporting'],
  ["import { supabaseAdmin } from '@/integrations/supabase/client.server'", 'server-only Supabase client'],
  ['weekOverWeekPercent', 'trend reporting'],
  ["row.partner === HEARTBEAT_PARTNER && row.placement === HEARTBEAT_PLACEMENT", 'heartbeat metric exclusion'],
  ['lastPipelineSyncAt', 'pipeline freshness reporting'],
]) expect(server, needle, label);

for (const [needle, label] of [
  ["createServerFn({ method: 'POST' })", 'server function'],
  ["await import('@/data/partner-referral-analytics.server')", 'server-only dynamic import'],
]) expect(functions, needle, label);
if (functions.includes('client.server')) errors.push('Client-shipped partner referral function must not import the service-role client directly.');

for (const [needle, label] of [
  ["createFileRoute('/admin/partner-referrals')", 'admin route'],
  ["noindex,nofollow,noarchive", 'admin noindex directive'],
]) expect(route, needle, label);

for (const [needle, label] of [
  ["createLazyFileRoute('/admin/partner-referrals')", 'admin lazy route'],
  ["const SESSION_KEY = 'texasdefined:sports-partner-admin-key'", 'shared commercial admin key'],
  ['raw browser session IDs are not stored', 'privacy disclosure'],
  ['CI probe clicks are excluded', 'synthetic traffic disclosure'],
  ['Last aggregate write', 'aggregate freshness label'],
  ['No referral rows yet', 'zero-row aggregate state'],
  ['Dashboard refreshed', 'dashboard query freshness label'],
  ['Hourly sync', 'pipeline freshness label'],
  ['No successful sync heartbeat', 'missing-heartbeat state'],
  ['most recent successful Cloudflare-to-Supabase pipeline run', 'heartbeat explanation'],
  ['most recent successful Cloudflare-to-Supabase pipeline run', 'healthy zero-click heartbeat explanation'],
  ['30d CTA impressions', 'impression headline metric'],
  ['CTR since', 'post-rollout CTR metric'],
  ['qualifying impressions', 'zero-click impression diagnosis'],
  ['impressions30d', 'partner/page/destination impression breakdowns'],
]) expect(lazyRoute, needle, label);

expect(types, 'lastPipelineSyncAt: string | null', 'pipeline heartbeat dashboard type');
expect(types, 'totalImpressions30d: number', 'dashboard impression total type');
expect(types, 'clickThroughRateSinceImpressionTracking: number | null', 'dashboard CTR type');
expect(admin, '<Link to="/admin/partner-referrals"', 'operations navigation');
expect(collector, '// Browser session IDs are intentionally never persisted in Analytics Engine.', 'collector session-minimization contract');

for (const source of [server, functions, route, lazyRoute, admin]) {
  if (source.includes('CLOUDFLARE_API_TOKEN') || source.includes('SUPABASE_SERVICE_ROLE_KEY')) {
    errors.push('Client/server route code must not embed analytics or service-role credentials.');
  }
}

if (errors.length) {
  console.error('Partner referral reporting validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Partner referral reporting validation passed: referral clicks are aggregated from the private Cloudflare dataset with sampling accounted for and CI probes excluded, only service_role can access the Supabase aggregate table, browser session IDs are not synchronized, the dashboard is protected by the existing commercial admin key and noindexed, zero-click syncs are distinguished from aggregate writes in the UI, successful pipeline runs have a reserved zero-count heartbeat excluded from referral metrics, the primary hourly sync has a staggered fallback opportunity that skips Cloudflare while the heartbeat is fresh, the scheduled sync remains gated by texasdefined-publication, and the Analytics Engine query uses the repository credential scope rather than the shadowing environment credential.');
