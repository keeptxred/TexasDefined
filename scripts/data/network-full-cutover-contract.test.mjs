import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=name=>readFileSync(name,'utf8');
test('no customer API becomes usable before ALL verified launch evidence is accepted',()=>{
 const worker=src('src/server-entry.ts');
 assert.match(worker,/customerPath\.startsWith\("\/api\/public\/network-"\)/);
 assert.match(worker,/networkCustomerLaunchArmed/);
 assert.match(worker,/status:503/);
 assert.match(worker,/customerPath!=="\/api\/public\/network-billing"/);
 assert.match(worker,/customerPath!=="\/api\/public\/network-checkout"/);
 assert.match(src('src/routes/api.public.network-billing.ts'),/networkCustomerLaunchArmed/);
 assert.match(src('src/routes/api.public.network-checkout.ts'),/networkCustomerLaunchArmed/);
 const gate=src('src/data/network-atomic-launch-readiness.server.ts');
 assert.match(gate,/NETWORK_LAUNCH_EVIDENCE_JSON/);
 assert.match(gate,/inspectNetworkAtomicLaunch\(environment/);
 assert.match(gate,/NETWORK_LAUNCH_ATOMIC_VERIFIED/);
});
test('forms, private owner access and all editorial public listing loaders require the same gate',()=>{
 for(const f of ['src/routes/network.apply.tsx','src/routes/network.billing.tsx',
  'src/routes/business.dashboard.tsx','src/routes/network.directory.tsx',
  'src/routes/network.business.$slug.tsx','src/routes/network.join.tsx']){
  assert.match(src(f),/networkCustomerLaunchArmed/,f);
 }
});
test('reviewed Network listing sitemap is release-gated, revision-safe and not stale-cache reused',()=>{
 const sitemap=src('src/routes/sitemap[.]xml.ts');
 assert.match(sitemap,/networkAccepted=networkCustomerLaunchArmed\(process\.env\)/);
 assert.match(sitemap,/searchParams\.set\("network-release","v1"\)/);
 assert.match(sitemap,/texasdefined_network_public_listings/);
 assert.match(sitemap,/\.eq\("is_published",true\)/);
 assert.match(sitemap,/\/network\/business\//);
 assert.match(sitemap,/\/network\/join/);
 assert.match(sitemap,/\/network\/directory/);
 assert.doesNotMatch(sitemap,/texasdefined_network_applications/);
});
test('real Graph scheduled sender and public routes share complete release boundary',()=>{
 const source=src('src/data/network-notification-cron.server.ts');
 assert.match(source,/networkCustomerLaunchArmed\(environment\)/);
 assert.match(source,/Graph runtime release mismatch/);
 assert.match(src('wrangler.jsonc'),/"crons": \["\*\/15 \* \* \* \*"\]/);
});

test('staging business profiles and sitemap are never indexable',()=>{
 assert.match(src('src/server-entry.ts'),/networkRequestHostAllowed/);
 assert.match(src('src/server-entry.ts'),/Reflect\.get\(env,"NETWORK_ISOLATED_STAGING"\)/);
 assert.match(src('src/server-entry.ts'),/including TanStack/);
 for(const file of ['src/routes/network.directory.tsx','src/routes/network.business.$slug.tsx','src/routes/network.join.tsx','src/routes/sitemap[.]xml.ts']){
  assert.match(src(file),/NETWORK_ISOLATED_STAGING/,file);
 }
});

test('every customer-facing admin transition requires the atomic release; emergency unpublish stays available',()=>{
 const source=src('src/data/network-review.server.ts');
 assert.match(source,/async function assertNetworkUnifiedLaunch/);
 const names=['setNetworkApplicationReview','reviewNetworkRevision','publishApprovedNetworkListing','provisionReviewedNetworkOwner'];
 for(const name of names){
  const start=source.indexOf('export async function '+name+'(');
  assert.ok(start>=0,name);
  const next=source.slice(start,start+900);
  assert.match(next,/await assertNetworkUnifiedLaunch\(\)/,name);
 }
 // Keep emergency unpublish available to the sole administrator, even if
 // marketing and payment switches have been paused after a problem.
 const start=source.indexOf('export async function unpublishNetworkListing(');
 assert.ok(start>=0);
 const emergency=source.slice(start,start+450);
 assert.match(emergency,/assertNetworkAdminAccess/);
 assert.doesNotMatch(emergency,/assertNetworkUnifiedLaunch/);
});

test('mail safety in full staging always points send, provider proof and operator recovery at the same synthetic admin mailbox',()=>{
 const worker=src('src/data/network-notification-cron.server.ts');
 assert.match(worker,/networkGraphPlanForEnvironment\(plan,environment\)/);
 assert.match(worker,/submitNetworkGraphHttpRequest\(outbound\(plan\)/);
 assert.match(worker,/findNetworkGraphSentItemsEvidence\(outbound\(plan\)/);
 const recovery=src('src/data/network-notification-recovery.server.ts');
 assert.match(recovery,/networkGraphPlanForEnvironment\(prepareNetworkGraphClaim\(current\),process\.env\)/);
 const transport=src('src/data/network-notification-graph-transport.server.ts');
 assert.match(transport,/NETWORK_ISOLATED_STAGING==='true'/);
 assert.match(transport,/plan\.recipient!==NETWORK_NOTIFICATION_SENDER/);
});

test('the single launch gate includes independent delivery of every publicly advertised plan benefit',()=>{
 const gate=src('src/data/network-atomic-launch-readiness.server.ts');
 const marketing=src('src/routes/network.join.lazy.tsx');
 assert.match(gate,/planBenefitsDelivered/);
 assert.match(marketing,/Basic listing performance statistics/);
 assert.match(marketing,/Expanded performance insights: daily trends, contact-action breakdown and seven-day comparisons/);
 assert.match(marketing,/no separate hosting bill/);
 assert.match(marketing,/not a standalone website or custom domain/);
 assert.match(marketing,/Paid promotions are labeled sponsored/);
});

test('Plus and Featured performance must have real collection, owner-only reports and pending rollout SQL',()=>{
 const entry=src('src/server-entry.ts');
 const worker=src('src/routes/api.public.network-metrics.ts');
 assert.match(entry,/TEXAS_DEFINED_NETWORK_METRICS_RATE_LIMITER/);
 assert.match(worker,/paid_entitlement_active/);
 assert.match(worker,/owner_user_id/);
 assert.match(worker,/get_texasdefined_network_profile_metrics/);
 assert.match(src('src/data/network-atomic-launch-readiness.server.ts'),/planBenefitsDelivered/);
 assert.match(src('src/routes/business.dashboard.lazy.tsx'),/NetworkPerformancePanel/);
 assert.match(src('scripts/data/verify-network-migration-replay.mjs'),/20261011210000_network_profile_daily_metrics.sql/);
});

test('rejected launch and rate-limited POSTs drain at most 64 KiB without killing the Worker',()=>{
 const entry=src('src/server-entry.ts');
 assert.match(entry,/async function drainRejectedNetworkPost\(request:Request\)/);
 assert.match(entry,/size>65536/);
 const cutoff=entry.indexOf('if(!networkCustomerLaunchArmed(env as Record');
 assert.ok(cutoff>0);
 assert.match(entry.slice(cutoff,cutoff+300),/await drainRejectedNetworkPost\(request\)/);
 assert.match(entry,/if\(!result\?\.success\)\{\s*await drainRejectedNetworkPost\(request\)/);
 assert.match(entry,/if \(!rate\?\.success\)\{await drainRejectedNetworkPost\(request\)/);
});
