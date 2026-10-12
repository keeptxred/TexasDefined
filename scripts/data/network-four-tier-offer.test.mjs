import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projectNetworkPublicProfile} from '../../src/data/network-public-profile-policy.ts';
const read=path=>readFileSync(path,'utf8');

test('four plans have distinct names, stated price, and a credible bounded Website offer',()=>{
 const src=read('src/routes/network.join.lazy.tsx');
 assert.deepEqual([...src.matchAll(/name: "Texas Defined (Basic|Plus|Featured|Website)"/g)].map(x=>x[1]),
  ['Basic','Plus','Featured','Website']);
 for(const price of ['Free','$19.99','$49.95','$79.95'])assert.ok(src.includes(price),price);
 for(const claim of [
  'Up to five actual hosted pages with clear navigation',
  'Up to 12 approved photos',
  'Up to two reviewed content-update requests per billing month',
  'Page-level SEO and phone/email contact links',
  'no separate hosting bill',
  'not a standalone website or custom domain',
  'Proposed — not yet available for enrollment',
  'Paid promotions are labeled sponsored',
 ])assert.ok(src.includes(claim),claim);
 assert.match(src,/md:grid-cols-2 xl:grid-cols-4/);
});

test('Website cannot accidentally enter old Plus Checkout or bypass published profile tier projection',()=>{
 const join=read('src/routes/network.join.lazy.tsx');
 assert.match(join,/mailto:admin@texasdefined.com\?subject=TexasDefined%20Network%20Website%20Plan/);
 assert.doesNotMatch(join,/apply\?plan=website/);
 const intake=read('src/routes/network.apply.lazy.tsx');
 assert.match(intake,/type Plan = "basic" \| "plus"/);
 const plusCheckout=read('src/routes/api.public.network-checkout.ts');
 assert.match(plusCheckout,/data.plan !== "plus"/);
 const invalid=projectNetworkPublicProfile({slug:'synthetic-not-published',plan:'website',profile:{business_name:'Not authorized'}});
 assert.equal(invalid,null,'a proposed tier must never be published by the legacy listing projection');
});

test('one production cutover explicitly waits for independent Website acceptance',()=>{
 const gate=read('src/data/network-atomic-launch-readiness.server.ts');
 assert.match(gate,/'hostedWebsiteDelivered'/);
 assert.match(gate,/for\(const label of requiredEvidence\)/);
 const docs=read('docs/network/FOUR_TIER_HOSTED_WEBSITE_LAUNCH_CONTRACT_2026-10-11.md');
 assert.match(docs,/hostedWebsiteDelivered/);
 assert.match(docs,/separate staging Supabase/i);
 assert.match(docs,/Stripe test-mode/i);
 assert.match(docs,/not an implemented website/i);
});
