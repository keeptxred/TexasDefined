import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
 ADVERTISING_PLANS,WEBSITE_HOSTING_TIERS,
 getWebsiteHostingEntitlements, getAdvertisingEntitlements,
 validateHostedWebsiteDraft,rankEligibleBusinessAdvertisements,hasIndependentProducts
} from '../../src/data/network-commercial-model.ts';
import {projectNetworkPublicProfile} from '../../src/data/network-public-profile-policy.ts';
const read=path=>readFileSync(path,'utf8');
const ownerId='11111111-1111-1111-1111-111111111111';
const pictures=n=>Array.from({length:n},(_,i)=>ownerId+'/photo-'+i+'.webp');
const pages=n=>Array.from({length:n},(_,i)=>({slug:i===0?'home':'page-'+i,title:'Page '+i,body:'Original business details '+i}));
const draft=(n,m)=>({businessName:"Jimmy's Fishing Guide",pages:pages(n),galleryStoragePaths:pictures(m)});

test('advertising and hosting are distinct products with separate plan identifiers',()=>{
 assert.deepEqual(ADVERTISING_PLANS.map(p=>p.id),['basic','plus','featured','priority']);
 assert.deepEqual(WEBSITE_HOSTING_TIERS.map(p=>p.id),['starter','business','premium']);
 assert.deepEqual(WEBSITE_HOSTING_TIERS.map(p=>p.maxPages),[1,3,5]);
 assert.deepEqual(WEBSITE_HOSTING_TIERS.map(p=>p.maxGalleryImages),[5,10,15]);
 assert.equal(getWebsiteHostingEntitlements('plus'),null);
 assert.equal(getAdvertisingEntitlements('business'),null);
 assert.deepEqual(hasIndependentProducts({advertising:'basic',hosting:'premium'}),{paidAdvertising:false,websiteHosting:true});
 assert.deepEqual(hasIndependentProducts({advertising:'featured',hosting:null}),{paidAdvertising:true,websiteHosting:false});
 assert.equal(WEBSITE_HOSTING_TIERS.some(p=>Object.hasOwn(p,'price')),false);
});

test('website draft enforces all three page and image allowances',()=>{
 for(const p of WEBSITE_HOSTING_TIERS){
  assert.equal(validateHostedWebsiteDraft(p.id,draft(p.maxPages,p.maxGalleryImages)).ok,true,p.id);
  assert.equal(validateHostedWebsiteDraft(p.id,draft(p.maxPages+1,p.maxGalleryImages)).ok,false,p.id+' page overage');
  assert.equal(validateHostedWebsiteDraft(p.id,draft(p.maxPages,p.maxGalleryImages+1)).ok,false,p.id+' photo overage');
 }
 assert.equal(validateHostedWebsiteDraft('invalid',draft(1,0)).ok,false);
 assert.equal(validateHostedWebsiteDraft('starter',draft(0,0)).ok,false);
 assert.equal(validateHostedWebsiteDraft('starter',{...draft(1,0),pages:[{slug:'contact',title:'Contact',body:'Hello'}]}).ok,false);
 assert.equal(validateHostedWebsiteDraft('premium',{...draft(2,0),pages:[pages(1)[0],pages(1)[0]]}).ok,false);
 assert.equal(validateHostedWebsiteDraft('premium',{...draft(1,1),galleryStoragePaths:['https://bad.host/image.jpg']}).ok,false);
 assert.equal(validateHostedWebsiteDraft('premium',{...draft(1,1),galleryStoragePaths:[ownerId+'/../escape.jpg']}).ok,false);
 assert.equal(validateHostedWebsiteDraft('premium',{...draft(1,1),galleryStoragePaths:[ownerId+'/photo.webp',ownerId+'/photo.webp']}).ok,false);
 assert.equal(validateHostedWebsiteDraft('starter',{...draft(1,0),pages:[{slug:'home',title:'Home',body:''}]}).ok,false);
});

test('advertising priority only sorts prequalified relevant business results',()=>{
 const eligible=[
  {advertisingTier:'basic',businessName:'A',slug:'a'},
  {advertisingTier:'featured',businessName:'B',slug:'b'},
  {advertisingTier:'priority',businessName:'C',slug:'c'},
  {advertisingTier:'plus',businessName:'D',slug:'d'},
 ];
 assert.deepEqual(rankEligibleBusinessAdvertisements(eligible).map(r=>r.slug),['c','b','d','a']);
 assert.equal(eligible[0].slug,'a','sorting must not mutate a caller list');
 assert.equal(ADVERTISING_PLANS.filter(x=>x.placementPriority>0).every(x=>x.sponsored),true);
});

test('join preview separates advertising and hosting without locking in speculative prices',()=>{
 const src=read('src/routes/network.join.lazy.tsx');
 assert.match(src,/ADVERTISING_PLANS\.map/);
 assert.match(src,/WEBSITE_HOSTING_TIERS\.map/);
 assert.match(src,/useState<"advertising"\|"hosting">/);
 assert.match(src,/aria-pressed/);
 assert.ok(src.includes('Pricing being finalized'));
 assert.ok(src.includes('Price to be finalized'));
 assert.ok(src.includes('Hosting does not include paid advertising placement'));
 assert.ok(src.includes('Only independently approved businesses'));
 assert.ok(src.includes('No add-ons are preselected'));
 for(const value of ['$19.99','$49.95','$79.99'])assert.ok(!src.includes(value),'No undecided tier price: '+value);
});

test('advertising and hosting cannot use the old Plus-only checkout or public profile plan projection',()=>{
 const src=read('src/routes/network.join.lazy.tsx');
 assert.ok(!['website','business-presence','featured','premium','business','starter'].some(plan=>src.includes('apply?plan='+plan)));
 const intake=read('src/routes/network.apply.lazy.tsx');
 assert.ok(intake.includes('type Plan = "basic" | "plus"'));
 const checkout=read('src/routes/api.public.network-checkout.ts');
 assert.match(checkout,/data.plan !== "plus"/);
 for(const plan of ['website','starter','business','premium'])
  assert.equal(projectNetworkPublicProfile({slug:'synthetic-not-published',plan,profile:{business_name:'Not authorized'}}),null);
});

test('full release gate still requires acceptance before standalone hosting is a customer promise',()=>{
 const gate=read('src/data/network-atomic-launch-readiness.server.ts');
 assert.match(gate,/'hostedWebsiteDelivered'/);
 const doc=read('docs/network/INDEPENDENT_ADVERTISING_AND_HOSTING_2026-10-12.md');
 for(const word of ['advertising','hosting','independent','Stripe','migration','noindex'])
  assert.match(doc,new RegExp(word,'i'));
});


test('template previews have true per-page navigation, are nonindexable and keep edits local',()=>{
 const lazy=read('src/routes/network.website-demo.lazy.tsx');
 const page=read('src/routes/network.website-demo.tsx');
 const renderer=read('src/components/network/HostedWebsiteTemplate.tsx');
 const editor=read('src/components/network/HostedWebsiteEditor.tsx');
 assert.match(page,/noindex,nofollow,noarchive/);
 assert.match(renderer,/href={buildPageHref\(page.slug\)}/);
 assert.match(lazy,/tier==='starter'/);
 assert.match(lazy,/tier==='business'/);
 assert.match(lazy,/Try the self-service editor/);
 assert.match(lazy,/Demo edits are not saved/);
 assert.match(editor,/maxLength={12000}/);
 assert.match(editor,/draft.pages.length>=limits.maxPages/);
 assert.ok(!lazy.includes('supabaseAdmin')&&!lazy.includes('createCheckoutSession'));
});
