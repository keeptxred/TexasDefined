import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const route=(name)=>readFileSync('src/routes/'+name,'utf8');
test('Network directory is indexable only after public directory launch and actual published listings',()=>{
 const source=route('network.directory.tsx');
 assert.match(source,/NETWORK_DIRECTORY_ENABLED!==["']true["']\)return \{profiles:\[\],indexable:false\}/);
 assert.match(source,/\.eq\(["']is_published["'],\s*true\)/);
 assert.match(source,/indexable:profiles\.length>0/);
 assert.match(source,/loaderData\?\.indexable \? ["']index,follow["'] : ["']noindex,nofollow,noarchive["']/);
 assert.match(route('network.directory.lazy.tsx'),/\{profiles\} = Route\.useLoaderData\(\)/);
});
test('Only independently published business profiles become indexable; all private pages stay noindex',()=>{
 const source=route('network.business.$slug.tsx');
 assert.match(source,/NETWORK_DIRECTORY_ENABLED!==["']true["']\)return null/);
 assert.match(source,/\.eq\(["']is_published["'],\s*true\)/);
 assert.match(source,/return listing \? \{\.\.\.listing,indexable:true\} : null/);
 assert.match(source,/loaderData\?\.indexable \? ["']index,follow["'] : ["']noindex,nofollow,noarchive["']/);
 for(const path of ['network.apply.tsx','business.dashboard.tsx','network.billing.tsx','admin.network-applications.tsx']){
  assert.match(route(path),/noindex/i,path+' must never be indexed');
 }
});
test('UI catalog no longer says inactive product while actual checkout remains server gated',()=>{
 const ui=readFileSync('src/data/network-membership.ts','utf8');
 assert.match(ui,/provider_configured/);
 assert.doesNotMatch(ui,/NETWORK_CHECKOUT_ENABLED\s*=\s*false/);
 const server=readFileSync('src/data/network-stripe.server.ts','utf8');
 assert.match(server,/process\.env\.NETWORK_CHECKOUT_ENABLED==='true'/);
});
