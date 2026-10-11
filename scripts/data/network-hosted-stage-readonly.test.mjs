import test from 'node:test';
import assert from 'node:assert/strict';
import {validateNetworkHostedStageConfig,runNetworkHostedStageReadOnly} from './network-hosted-stage-readonly.mjs';

const u1='11111111-1111-4111-8111-111111111111',
u2='22222222-2222-4222-8222-222222222222';
const a1='33333333-3333-4333-8333-333333333333',
a2='44444444-4444-4444-8444-444444444444';
const r1='55555555-5555-4555-8555-555555555555',
r2='66666666-6666-4666-8666-666666666666';
const jwt=(s)=>['eyJ'+s.repeat(35),'eyJ'+s.repeat(35),'eyJ'+s.repeat(35)].join('.');
function env(){return {
 NETWORK_HOSTED_STAGE_READONLY_APPROVED:'approved-isolated-staging-only',
 NETWORK_STAGE_SUPABASE_URL:'https://staging0123456789.supabase.co/',
 NETWORK_STAGE_PROJECT_REF:'staging0123456789',
 NETWORK_STAGE_PUBLISHABLE_KEY:'sb_publishable_'+ 'X'.repeat(38),
 NETWORK_STAGE_OWNER_ONE_ID:u1,NETWORK_STAGE_OWNER_TWO_ID:u2,
 NETWORK_STAGE_OWNER_ONE_JWT:jwt('a'),NETWORK_STAGE_OWNER_TWO_JWT:jwt('b'),
 NETWORK_STAGE_ACCOUNT_ONE_ID:a1,NETWORK_STAGE_ACCOUNT_TWO_ID:a2,
 NETWORK_STAGE_REVISION_ONE_ID:r1,NETWORK_STAGE_REVISION_TWO_ID:r2,
 NETWORK_STAGE_MEDIA_ONE:'one.png',NETWORK_STAGE_MEDIA_TWO:'two.png'
};}
test('staging acceptance config is host-pinned, requires consent, rejects shared production and secrets',()=>{
 const good=validateNetworkHostedStageConfig(env());
 assert.equal(good.owners.length,2);
 const bad=[
  {NETWORK_HOSTED_STAGE_READONLY_APPROVED:undefined},
  {NETWORK_STAGE_SUPABASE_URL:'https://ftkznprjljkhymknvhye.supabase.co/'},
  {NETWORK_STAGE_SUPABASE_URL:'https://texasdefined.com'},
  {NETWORK_STAGE_SUPABASE_URL:'http://staging0123456789.supabase.co/'},
  {NETWORK_STAGE_SUPABASE_URL:'https://staging0123456789.supabase.co/private'},
  {NETWORK_STAGE_SUPABASE_URL:'https://staging0123456789.supabase.co/?token=bad'},
  {NETWORK_STAGE_PROJECT_REF:'not-staging0123456789'},
  {NETWORK_STAGE_PUBLISHABLE_KEY:'sb_secret_'+'X'.repeat(80)},
  {NETWORK_STAGE_OWNER_ONE_JWT:jwt('b')},
  {NETWORK_STAGE_OWNER_TWO_ID:u1},
  {NETWORK_STAGE_MEDIA_ONE:'../private.jpeg'},
 ];
 for(const over of bad)
  assert.throws(()=>validateNetworkHostedStageConfig({...env(),...over}),/invalid/);
});
function stageFetch(leak=false){
 const c=validateNetworkHostedStageConfig(env());
 return async(url,options)=>{
  assert.equal(options.method==='POST'?options.method:'GET',options.method);
  assert.equal(options.redirect,'error');
  assert.equal(options.cache,'no-store');
  const token=options.headers.Authorization.substring(7);
  const index=c.owners.findIndex(owner=>owner.token===token);
  assert.ok(index===0||index===1);
  const owner=c.owners[index],other=c.owners[1-index];
  let status=200,body;
  if(url.endsWith('/auth/v1/user'))
    body={id:owner.id,email:'synthetic'+index+'@example.invalid',email_confirmed_at:'2026-10-11T00:00:00Z'};
  else if(url.includes('texasdefined_network_business_accounts'))
    body=[{id:owner.account,owner_user_id:owner.id,access_enabled:true,membership_tier:'featured'}];
  else if(url.includes('texasdefined_network_profile_revisions'))
    body=leak?[{id:other.revision,business_account_id:other.account}]:
      [{id:owner.revision,business_account_id:owner.account}];
  else if(url.includes('/storage/v1/object/')){
    if(url.endsWith('/'+other.id+'/'+other.account+'/'+other.media))status=leak?200:404;
    body={};
  } else throw Error('Unknown stage endpoint');
  return {status,json:async()=>body};
 };
}
test('two owner stage fixtures pass read-only HTTP/JWT/RLS/media proof in both directions',async()=>{
 const c=validateNetworkHostedStageConfig(env());
 const result=await runNetworkHostedStageReadOnly(c,stageFetch());
 assert.equal(result.accepted,true);
 assert.equal(result.checks,10);
 assert.equal(JSON.stringify(result).includes('example.invalid'),false);
});
test('cross-owner revision RLS leak makes acceptance fail',async()=>{
 const c=validateNetworkHostedStageConfig(env());
 await assert.rejects(runNetworkHostedStageReadOnly(c,stageFetch(true)),/revision RLS mismatch/);
});
test('fixture checks do not allow mutating HTTP requests',async()=>{
 let requests=0;
 const spy=async(url,options)=>{requests++;assert.equal(options.method,'GET');return stageFetch()(url,options);};
 await runNetworkHostedStageReadOnly(validateNetworkHostedStageConfig(env()),spy);
 assert.equal(requests,10);
});
