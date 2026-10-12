import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projectNetworkPublicProfile} from '../../src/data/network-public-profile-policy.ts';
const read=path=>readFileSync(path,'utf8');

test('four tiers reflect the agreed TexasDefined network model and honest add-on pricing',()=>{
 const src=read('src/routes/network.join.lazy.tsx');
 assert.deepEqual([...src.matchAll(/name: "Texas Defined (Basic|Plus|Featured|Business Presence)"/g)].map(x=>x[1]),
  ['Basic','Plus','Featured','Business Presence']);
 for(const price of ['Free','$19.99','$49.95','$79.99','$39.99','~$6.99']) assert.ok(src.includes(price),price);
 for(const claim of [
  'A polished TexasDefined-branded business page',
  'Automatic setup from one simple form',
  'Up to 12 photos and your business logo',
  'Private portal with unlimited self-service edits',
  'No setup fee or separate website hosting required',
  'Featured placement labeled as sponsored',
  'A custom domain or business email is a separate choice',
  'Illustrative price only, not an available subscription',
  'No add-ons are preselected, available for checkout or billed today',
  'search-engine indexing or ranking is never guaranteed',
  'Planned — not yet enrolling',
 ])assert.ok(src.includes(claim),claim);
 assert.match(src,/md:grid-cols-2 xl:grid-cols-4/);
 assert.match(src,/id="optional-extras"/);
});

test('new plans and extras cannot accidentally enter old Plus Checkout or public projection',()=>{
 const src=read('src/routes/network.join.lazy.tsx');
 assert.doesNotMatch(src,/apply\\?plan=(?:website|business-presence|featured)/);
 assert.match(src,/mailto:admin@texasdefined.com\\?subject=TexasDefined%20Business%20Presence%20Interest/);
 const intake=read('src/routes/network.apply.lazy.tsx');
 assert.match(intake,/type Plan = "basic" \\| "plus"/);
 const plusCheckout=read('src/routes/api.public.network-checkout.ts');
 assert.match(plusCheckout,/data.plan !== "plus"/);
 for (const plan of ['website','business-presence'])
  assert.equal(projectNetworkPublicProfile({slug:'synthetic-not-published',plan,profile:{business_name:'Not authorized'}}),null);
});

test('one complete customer launch still requires independent premium presence acceptance',()=>{
 const gate=read('src/data/network-atomic-launch-readiness.server.ts');
 assert.match(gate,/'hostedWebsiteDelivered'/);
 assert.match(gate,/for\\(const label of requiredEvidence\\)/);
 const docs=read('docs/network/FOUR_TIER_HOSTED_WEBSITE_LAUNCH_CONTRACT_2026-10-11.md');
 assert.match(docs,/hostedWebsiteDelivered/);
 assert.match(docs,/separate staging Supabase/i);
 assert.match(docs,/Stripe test-mode/i);
 assert.match(docs,/not an implemented website/i);
});
