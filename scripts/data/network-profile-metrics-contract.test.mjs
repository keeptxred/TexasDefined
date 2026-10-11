import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(path,'utf8');
test('aggregate counters exist only in private schema, no raw visitor or referrer storage',()=>{
 const sql=read('supabase/pending/20261011210000_network_profile_daily_metrics.sql');
 assert.match(sql,/texasdefined_network_internal\.profile_daily_metrics/);
 assert.match(sql,/REFERENCES public\.texasdefined_network_applications\(id\) ON DELETE CASCADE/);
 assert.match(sql,/ENABLE ROW LEVEL SECURITY/);
 assert.match(sql,/REVOKE ALL ON texasdefined_network_internal\.profile_daily_metrics/);
 assert.match(sql,/FROM PUBLIC,anon,authenticated,service_role/);
 assert.match(sql,/record_texasdefined_network_profile_metric/);
 assert.match(sql,/get_texasdefined_network_profile_metrics/);
 assert.match(sql,/prune_texasdefined_network_profile_metrics/);
 assert.match(sql,/LIMIT 5000/);
 assert.match(sql,/FOR UPDATE SKIP LOCKED/);
 assert.match(sql,/observed_on < \(now\(\) AT TIME ZONE 'UTC'\)::date-34/);

 assert.match(sql,/GRANT EXECUTE.*service_role/);
 assert.doesNotMatch(sql,/visitor_id|ip_address|user_agent|referrer_url/i);
 const replay=read('scripts/data/verify-network-migration-replay.mjs');
 assert.match(replay,/20261011210000_network_profile_daily_metrics.sql/);
 assert.match(replay,/PGDATABASE!=='network_replay'/);
});
test('server recording is rate limited independently and owner reporting is RLS-equivalent bound',()=>{
 const route=read('src/routes/api.public.network-metrics.ts');
 for(const token of ['networkCustomerLaunchArmed','getUser(token)','email_confirmed_at',
  'owner_user_id','access_enabled','matchingNetworkOwnerEmail',
  'paid_entitlement_active','is_published','record_texasdefined_network_profile_metric',
  'get_texasdefined_network_profile_metrics']){
  assert.ok(route.includes(token),token);
 }
 const worker=read('src/server-entry.ts');
 assert.match(worker,/prune_texasdefined_network_profile_metrics/);
 assert.match(worker,/networkCustomerLaunchArmed\(scopedEnv\)/);

 assert.match(worker,/TEXAS_DEFINED_NETWORK_METRICS_RATE_LIMITER/);
 assert.match(worker,/customerPath==="\/api\/public\/network-metrics"/);
 assert.match(worker,/if\(!result\?\.success\)\{[\s\S]*?status:429/);
 const config=read('wrangler.jsonc').replace(/^\s*\/\/.*$/gm,'');
 const parsed=JSON.parse(config);
 const limit=parsed.ratelimits.find(x=>x.name==='TEXAS_DEFINED_NETWORK_METRICS_RATE_LIMITER');
 assert.equal(limit.simple.limit,20);
 assert.equal(limit.simple.period,60);
 assert.ok(limit.namespace_id);
});
test('published profile observes actual contact interactions; only bound owner sees private statistics',()=>{
 const profile=read('src/routes/network.business.$slug.lazy.tsx');
 const dash=read('src/routes/business.dashboard.lazy.tsx');
 const component=read('src/components/network/NetworkPerformancePanel.tsx');
 for(const value of ['profile_view','website_click','social_click','phone_click'])
  assert.ok(profile.includes(value),value);
 assert.match(profile,/sessionStorage/);
 assert.match(dash,/account\?\.access_enabled&&published&&userId/);
 assert.match(dash,/NetworkPerformancePanel/);
 assert.match(component,/session\.user\.id!==userId/);
 assert.match(component,/report\.tier!==tier/);
 assert.match(component,/role="list"/);
 assert.doesNotMatch(component,/unique visitors|confirmed leads/i);
});
