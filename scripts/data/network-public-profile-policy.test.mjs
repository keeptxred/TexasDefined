import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projectNetworkPublicProfile} from '../../src/data/network-public-profile-policy.ts';
const profile={
 business_name:'Sample Shop',category:'Retail',city:'Katy',
 description:'Texas business',address:'Test area',phone:'5551234567',hours:'9 to 5',
 website:'https://business.invalid',social:'https://social.invalid/example',
 services:'Test service',faq:'Frequently asked',offer:'New offer',
 contact_email:'private-owner@example.invalid',owner_user_id:'sensitive-user-uuid',
 fake_internal_billing:'not public',properties:{secret:true},
};
const example={slug:'test-shop',plan:'basic',profile,gallery_storage_paths:['business/photo.png']};
test('Basic response excludes EVERY paid-only and unexpected field before SSR serialization',()=>{
 const value=projectNetworkPublicProfile(example);
 assert.ok(value);
 assert.equal(value.plan,'basic');
 assert.equal(value.profile.business_name,'Sample Shop');
 assert.equal(value.profile.phone,'5551234567');
 assert.equal(value.profile.website,undefined);
 assert.equal(value.profile.social,undefined);
 assert.equal(value.profile.services,undefined);
 assert.equal(value.profile.faq,undefined);
 assert.equal(value.profile.offer,undefined);
 assert.equal(value.profile.owner_user_id,undefined);
 assert.equal(value.profile.contact_email,undefined);
 assert.equal(value.profile.fake_internal_billing,undefined);
 assert.equal(value.profile.properties,undefined);
 assert.deepEqual(value.gallery_storage_paths,[]);
 assert.equal(JSON.stringify(value).includes('private-owner@example.invalid'),false);
 assert.equal(example.profile.website,'https://business.invalid','must not mutate shared source');
});
test('Plus and Featured can show supported enhanced benefits without leaking unknown keys',()=>{
 for(const plan of ['plus','featured']){
  const value=projectNetworkPublicProfile({...example,plan});
  assert.equal(value.profile.website,'https://business.invalid');
  assert.equal(value.profile.services,'Test service');
  assert.equal(value.profile.offer,'New offer');
  assert.deepEqual(value.gallery_storage_paths,['business/photo.png']);
  assert.equal(value.profile.contact_email,undefined);
  assert.equal(value.profile.owner_user_id,undefined);
 }
});
test('unrecognized plans, invalid profile payloads, and untrusted array-valued fields fail closed',()=>{
 for(const v of [
  {...example,plan:'secret'},
  {...example,plan:'PLUS'},
  {...example,profile:'owner-secret'},
  {...example,profile:null},
  {...example,profile:['owner-secret']},
  null,
 ])assert.equal(projectNetworkPublicProfile(v),null);
 const plus=projectNetworkPublicProfile({...example,plan:'plus',
  gallery_storage_paths:[null,33,'a'.repeat(501),'safe.jpg']});
 assert.deepEqual(plus.gallery_storage_paths,['safe.jpg']);
});
test('both the loader AND public React profile enforce paid tier, with coherent plan marketing',()=>{
 const loader=readFileSync('src/routes/network.business.$slug.tsx','utf8');
 const display=readFileSync('src/routes/network.business.$slug.lazy.tsx','utf8');
 const join=readFileSync('src/routes/network.join.lazy.tsx','utf8');
 assert.match(loader,/projectNetworkPublicProfile\(listing\)/);
 for(const field of ['services','faq','offer','website','social']){
  assert.ok(display.includes("enhanced&&get('"+field+"')"),field);
 }
 assert.match(display,/enhanced&&record\.gallery_storage_paths/);
 assert.match(join,/No prominent website or social-media buttons/);
 assert.match(join,/Prominent official website link/);
 assert.match(join,/No website required/);
});
