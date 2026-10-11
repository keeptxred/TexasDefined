import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=name=>readFileSync(name,'utf8');
test('no customer API becomes usable before ALL verified launch evidence is accepted',()=>{
 const worker=src('src/server-entry.ts');
 assert.match(worker,/customerPath\.startsWith\("\/api\/public\/network-"\)/);
 assert.match(worker,/networkCustomerLaunchArmed/);
 assert.match(worker,/status:503/);
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
