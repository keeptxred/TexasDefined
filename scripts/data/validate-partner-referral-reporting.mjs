import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const migration = read('supabase/migrations/20260916032000_create_partner_referral_daily.sql');
const impressionMigration = read('supabase/migrations/20260918133000_add_partner_referral_impressions.sql');
const aggregateCommentMigration = read('supabase/migrations/20260918143500_update_partner_referral_aggregate_comment.sql');
const sync = read('scripts/monetization/sync-partner-referral-analytics.mjs');
const anomalyDetector = read('scripts/monetization/partner-referral-impression-anomaly.mjs');
const workflow = read('.github/workflows/sync-partner-referral-analytics.yml');
const server = read('src/data/partner-referral-analytics.server.ts');
const types = read('src/data/partner-referral-analytics.types.ts');
const functions = read('src/data/partner-referral-analytics.functions.ts');
const route = read('src/routes/admin.partner-referrals.tsx');
const lazyRoute = read('src/routes/admin.partner-referrals.lazy.tsx');
const admin = read('src/routes/admin.tsx');
const collector = read('src/lib/texas-defined-outcome-analytics.server.ts');
const analytics = read('src/platform/analytics.ts');
const errors = [];
const { detectAffiliateImpressionAnomalies } = await import('../monetization/partner-referral-impression-anomaly.mjs');

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

expect(aggregateCommentMigration, 'partner referral clicks and qualifying CTA impressions', 'aggregate table click/impression documentation');
expect(aggregateCommentMigration, 'Raw browser session identifiers are not stored here', 'aggregate table privacy documentation');

for (const [needle, label] of [
  ["const DATASET = 'texas_defined_outcomes'", 'outcome dataset'],
  ["blob1 IN ('partner_referral_clicked', 'partner_referral_shown')", 'partner click/impression filter'],
  ["blob1 = 'next_step_selected' AND blob2 = 'expedia-search'", 'Expedia search-start filter'],
  ['blob1 AS eventName', 'outcome event dimension'],
  ['SUM(_sample_interval) AS eventCount', 'sampling-aware outcome aggregation'],
  ['impression_count: 0', 'impression aggregate initialization'],
  ["partner === 'expedia-search'", 'reserved Expedia search-start aggregate identity'],
  ['searchStarts', 'Expedia search-start sync total'],
  ["blob10 != 'ci-probe'", 'CI probe exclusion'],
  ["const TABLE = 'texasdefined_partner_referral_daily'", 'private aggregate target'],
  ["createHash('sha256')", 'destination hash'],
  ["Prefer: 'resolution=merge-duplicates,return=minimal'", 'idempotent upsert'],
  ["const RETENTION_DAYS = 90", 'bounded aggregate retention'],
  ["async function pruneOldRows", 'retention cleanup'],
  ["method: 'DELETE'", 'retention delete request'],
  ["endpoint.searchParams.set('metric_date', `lt.${cutoff}`)", 'retention cutoff filter'],
  ["const retentionCutoff = await pruneOldRows", 'post-sync retention execution'],
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
  ["import { detectAffiliateImpressionAnomalies } from './partner-referral-impression-anomaly.mjs'", 'measurement anomaly detector import'],
  ['const anomalies = detectAffiliateImpressionAnomalies(rows)', 'post-normalization anomaly scan'],
  ['::warning title=Affiliate measurement anomaly::', 'non-blocking workflow anomaly warning'],
  ['anomalies.length} non-blocking measurement anomaly warning(s)', 'sync anomaly warning count'],
]) expect(sync, needle, label);
for (const [needle, label] of [
  ["ANOMALY_MONITORING_STARTED_AT = '2026-09-27'", 'post-remediation anomaly monitoring boundary'],
  ['ANOMALY_MIN_PAGE_IMPRESSIONS = 100', 'page-day anomaly minimum'],
  ['ANOMALY_MIN_PARTNER_IMPRESSIONS = 25', 'per-partner anomaly minimum'],
  ['ANOMALY_MIN_PARTNERS = 3', 'multi-partner anomaly minimum'],
  ["partner === '__pipeline__'", 'heartbeat anomaly exclusion'],
  ["partner === 'expedia-search'", 'Expedia search-start anomaly exclusion'],
  ['group.totalClicks === 0', 'zero-click anomaly requirement'],
  ['group.totalImpressions >= ANOMALY_MIN_PAGE_IMPRESSIONS', 'high-volume anomaly requirement'],
  ['group.partners.length >= ANOMALY_MIN_PARTNERS', 'multi-partner anomaly requirement'],
]) expect(anomalyDetector, needle, label);

const anomalyFixture = [
  { metric_date: '2026-09-27', partner: 'hotels.com', page_path: '/destination/test', impression_count: 40, click_count: 0 },
  { metric_date: '2026-09-27', partner: 'travelocity', page_path: '/destination/test', impression_count: 35, click_count: 0 },
  { metric_date: '2026-09-27', partner: 'vrbo', page_path: '/destination/test', impression_count: 30, click_count: 0 },
];
const detected = detectAffiliateImpressionAnomalies(anomalyFixture);
if (detected.length !== 1 || detected[0]?.totalImpressions !== 105 || detected[0]?.partners.length !== 3) {
  errors.push('Anomaly detector must flag a 100+ impression, zero-click page-day with three 25+ impression partners.');
}
if (detectAffiliateImpressionAnomalies(anomalyFixture.map((row, index) => index === 0 ? { ...row, click_count: 1 } : row)).length !== 0) {
  errors.push('Anomaly detector must not flag page-days that contain a measured referral click.');
}
if (detectAffiliateImpressionAnomalies(anomalyFixture.map((row) => ({ ...row, metric_date: '2026-09-26' }))).length !== 0) {
  errors.push('Anomaly detector must not re-warn on the acknowledged pre-monitoring September 26 incident.');
}
if (detectAffiliateImpressionAnomalies(anomalyFixture.slice(0, 2)).length !== 0) {
  errors.push('Anomaly detector must require at least three high-volume partners.');
}

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
  ["workflow_run:", 'production-deploy recovery trigger'],
  ["- 'Deploy TexasDefined production'", 'production-deploy recovery source'],
  ["github.event_name == 'workflow_run' && '70'", 'deploy-recovery freshness guard'],
  ["github.event_name == 'schedule' && github.event.schedule == '47 * * * *' && '70'", 'scheduled-fallback freshness guard'],
  ['authorize:', 'protected authorization job'],
  ['environment: texasdefined-publication', 'protected GitHub environment'],
  ['Authorize private referral sync', 'explicit environment authorization step'],
  ['needs: authorize', 'sync dependency on protected authorization'],
  ['CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}', 'repository Cloudflare analytics secret'],
  ["SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY || secrets.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY }}", 'private Supabase secret'],
  ["scripts/monetization/partner-referral-impression-anomaly.mjs", 'anomaly detector workflow path trigger'],
]) expect(workflow, needle, label);

const syncJobMatch = workflow.match(/\n  sync:\n([\s\S]*)$/);
if (!syncJobMatch) errors.push('Sync workflow must define a sync job.');
else if (/^    environment:/m.test(syncJobMatch[1])) {
  errors.push('Sync job must remain outside the texasdefined-publication environment so repository-level Analytics Engine credentials are not shadowed by environment-scoped deployment credentials.');
}

for (const [needle, label] of [
  ["resourceId: 'expedia-search'", 'central Expedia search-start identity'],
  ["detail.affiliate_partner !== 'expedia'", 'Expedia-only search-start filter'],
  ["detail.affiliate_module !== 'stay-nearby'", 'Stay Nearby-only search-start filter'],
  ["/^Search (?:all nearby stays|Expedia stays)/i", 'Expedia search-action label guard'],
  ["trackTexasDefinedOutcome('next_step_selected'", 'Expedia search-start first-party outcome'],
  ["window.addEventListener('texasdefined:affiliate-click', expediaSearchStarted as EventListener)", 'Expedia search-start browser listener'],
  ["window.removeEventListener('texasdefined:affiliate-click', expediaSearchStarted as EventListener)", 'Expedia search-start listener cleanup'],
]) expect(analytics, needle, label);

const retentionDays = Number(sync.match(/const RETENTION_DAYS = (\d+);/)?.[1] || 0);
const queryDays = Number(server.match(/const QUERY_DAYS = (\d+);/)?.[1] || 0);
if (!retentionDays || !queryDays || retentionDays <= queryDays) {
  errors.push(`Partner referral retention must exceed the dashboard query horizon; retention=${retentionDays || 'missing'} days, query=${queryDays || 'missing'} days.`);
}

for (const [needle, label] of [
  ["assertSportsPartnerAccess(accessKey)", 'commercial admin authorization'],
  ["from('texasdefined_partner_referral_daily')", 'private aggregate read'],
  ['impression_count', 'private impression aggregate read'],
  ["const IMPRESSION_TRACKING_STARTED_AT = '2026-09-18'", 'impression rollout start boundary'],
  ["const CTR_MEASUREMENT_STARTED_AT = '2026-09-27'", 'clean CTR measurement boundary'],
  ["const TRAVEL_ROUTING_MEASUREMENT_STARTED_AT = '2026-09-27'", 'clean Orbitz/Travelocity routing baseline'],
  ['const TRAVEL_ROUTING_MIN_IMPRESSIONS_PER_PARTNER = 100', 'routing comparison minimum exposure threshold'],
  ["const TRAVEL_ROUTING_PARTNERS = ['orbitz', 'travelocity'] as const", 'routing comparison partner allowlist'],
  ['totalImpressions30d', '30-day impression reporting'],
  ['totalSearchStarts30d', '30-day Expedia search-start reporting'],
  ['searchStartPlacements', 'Expedia search-start placement breakdown'],
  ['searchStartPages', 'Expedia search-start page breakdown'],
  ["row.partner === EXPEDIA_SEARCH_PARTNER", 'Expedia search rows excluded from referral CTR'],
  ['clickThroughRateSinceImpressionTracking', 'truthful post-rollout CTR reporting'],
  ['travelRoutingComparisonReady', 'routing comparison readiness gate'],
  ['travelRoutingPartners', 'clean routing partner breakdown'],
  ['metricDate >= TRAVEL_ROUTING_MEASUREMENT_STARTED_AT', 'clean travel routing measurement boundary'],
  ['measurementCtr = clickThroughRate', 'dimension-level measured-window CTR calculation'],
  ['metricDate >= CTR_MEASUREMENT_STARTED_AT', 'dimension-level clean CTR measurement boundary'],
  ['dailyImpressionsMap', 'daily impression aggregation'],
  ['impressions: date >= IMPRESSION_TRACKING_STARTED_AT ? dailyImpressionsMap.get(date) ?? 0 : null', 'pre-rollout daily impressions remain unmeasured'],
  ["import { supabaseAdmin } from '@/integrations/supabase/client.server'", 'server-only Supabase client'],
  ['weekOverWeekPercent', 'trend reporting'],
  ["row.partner === HEARTBEAT_PARTNER && row.placement === HEARTBEAT_PLACEMENT", 'heartbeat metric exclusion'],
  ['lastPipelineSyncAt', 'pipeline freshness reporting'],
  ['b.impressions30d - a.impressions30d', 'exposure-aware partner/placement/page/destination ranking'],
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
  ['CI probe events are excluded', 'synthetic traffic disclosure'],
  ['Last aggregate write', 'aggregate freshness label'],
  ['No referral rows yet', 'zero-row aggregate state'],
  ['Dashboard refreshed', 'dashboard query freshness label'],
  ['Hourly sync', 'pipeline freshness label'],
  ['No successful sync heartbeat', 'missing-heartbeat state'],
  ['most recent successful Cloudflare-to-Supabase pipeline run', 'heartbeat explanation'],
  ['most recent successful Cloudflare-to-Supabase pipeline run', 'healthy zero-click heartbeat explanation'],
  ['30d CTA impressions', 'impression headline metric'],
  ['30d Expedia search starts', 'Expedia search-start headline metric'],
  ['Last 7 days Expedia searches', 'Expedia search-start weekly metric'],
  ['reported separately from outbound referral clicks so referral CTR remains comparable', 'Expedia search-start semantic separation'],
  ['No Expedia search starts recorded yet.', 'Expedia search-start empty state'],
  ['CTR since', 'clean-window CTR metric'],
  ['dashboard.ctrMeasurementStartedAt', 'clean CTR date rendering'],
  ['dashboard.travelRoutingMeasurementStartedAt', 'clean travel routing date rendering'],
  ['Clean Orbitz vs Travelocity baseline', 'travel routing comparison section'],
  ['active CJ relationship term and booking type determine realized payout', 'commission-schedule uncertainty disclosure'],
  ['compare CTR with downstream bookings and realized commission before changing routing', 'commission-aware routing guidance'],
  ['Minimum impressions / provider', 'routing sample threshold metric'],
  ["dashboard.travelRoutingComparisonReady ? 'READY' : 'HOLD'", 'routing readiness state'],
  ['Hold the current routing split.', 'small-sample routing hold guidance'],
  ['not a statistical-significance claim', 'routing threshold limitation disclosure'],
  ['CTA impression history begins on {impressionStartLabel}', 'impression rollout date rendering'],
  ['rollout-day impressions remain visible but are excluded from CTR', 'rollout-versus-CTR explanation'],
  ['measurementCtr: row.measurementCtr', 'partner and placement measured-window CTR projection'],
  ['formatCtr(row.measurementCtr)', 'page and destination measured-window CTR rendering'],
  ["timeZone: 'UTC'", 'CTR start-date display timezone lock'],
  ['qualifying impressions', 'zero-click impression diagnosis'],
  ['impressions30d', 'partner/page/destination impression breakdowns'],
  ['Daily referral performance', 'combined daily performance heading'],
  ['Daily affiliate CTA impressions', 'daily impression trend accessibility label'],
  ['row.impressions === null', 'pre-rollout impression gap rendering'],
  ['maxDailyImpressions', 'independent daily impression scaling'],
  ['WATCHLIST_MIN_IMPRESSIONS = 3', 'zero-click watchlist minimum exposure threshold'],
  ['row.measurementImpressions >= WATCHLIST_MIN_IMPRESSIONS && row.measurementClicks === 0', 'clean-window zero-click watchlist filter'],
  ['Conversion watchlist', 'conversion watchlist section'],
  ['Seen but not clicked', 'zero-click watchlist heading'],
  ['Placements to review', 'zero-click placement watchlist'],
  ['Pages to review', 'zero-click page watchlist'],
  ['No zero-click rows meet the watchlist threshold yet.', 'zero-click watchlist empty state'],
]) expect(lazyRoute, needle, label);

if (lazyRoute.includes('Current approved hotel commission economics are treated as parity')) errors.push('Partner referral dashboard must not assume Orbitz and Travelocity commission parity when advertiser schedules differ and the active CJ term controls payout.');

expect(types, 'lastPipelineSyncAt: string | null', 'pipeline heartbeat dashboard type');
expect(types, 'ctrMeasurementStartedAt: string', 'clean CTR boundary dashboard type');
expect(types, 'travelRoutingMeasurementStartedAt: string', 'travel routing baseline dashboard type');
expect(types, 'travelRoutingMinimumImpressionsPerPartner: number', 'travel routing threshold dashboard type');
expect(types, 'travelRoutingComparisonReady: boolean', 'travel routing readiness dashboard type');
expect(types, 'TravelRoutingComparisonRow', 'travel routing row dashboard type');
expect(types, 'totalImpressions30d: number', 'dashboard impression total type');
expect(types, 'totalSearchStarts30d: number', 'dashboard Expedia search-start total type');
expect(types, 'PartnerSearchStartBreakdown', 'dashboard Expedia search-start breakdown type');
expect(types, 'clickThroughRateSinceImpressionTracking: number | null', 'dashboard CTR type');
expect(types, 'measurementCtr: number | null', 'dimension-level measured-window CTR type');
expect(types, 'measurementClicks: number', 'dimension-level measured click type');
expect(types, 'measurementImpressions: number', 'dimension-level measured impression type');
expect(types, 'impressions: number | null', 'daily measured-impression boundary type');
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

console.log('Partner referral reporting validation passed: referral clicks, CTA impressions and separately classified Expedia search starts are aggregated from the private Cloudflare dataset with sampling accounted for and CI probes excluded, pre-rollout daily impression history remains explicitly unmeasured while the September 18 rollout day stays visible, CTR uses only the clean September 27+ post-filter measurement window, Orbitz-versus-Travelocity routing uses the same clean September 27+ post-filter window with a 100-impression-per-provider hold gate, synchronized 100+ impression zero-click page-days across at least three 25+ impression partners emit warning-only measurement anomalies after the September 27 monitoring boundary, exposure volume breaks click ties so zero-click surfaces remain visible, the private dashboard promotes clean-window placements and pages with at least three measured impressions and zero clicks into a conversion watchlist, private aggregates are pruned to a 90-day retention window that exceeds the 60-day dashboard query horizon, only service_role can access the Supabase aggregate table, browser session IDs are not synchronized, the dashboard is protected by the existing commercial admin key and noindexed, zero-click syncs are distinguished from aggregate writes in the UI, successful pipeline runs have a reserved zero-count heartbeat excluded from referral metrics, the primary hourly sync has staggered schedule and production-deploy recovery opportunities that skip Cloudflare while the heartbeat is fresh, the sync remains gated by texasdefined-publication, and the Analytics Engine query uses the repository credential scope rather than the shadowing environment credential.');
