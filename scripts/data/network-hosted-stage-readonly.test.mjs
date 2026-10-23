import test from 'node:test';
import assert from 'node:assert/strict';
import {validateNetworkHostedStageConfig,runNetworkHostedStageReadOnly,runNetworkHostedRevokedOwnerReadOnly} from './network-hosted-stage-readonly.mjs';

const u1='11111111-1111-4111-8111-111111111111',
u2='22222222-2222-4222-8222-222222222222';
const a1='33333333-3333-4333-8333-333333333333',
a2='44444444-4444-4444-8444-444444444444';
const r1='55555555-5555-4555-8555-555555555555',
r2='66666666-6666-4666-8666-666666666666';
// Keep two-owner synthetic JWTs stable across second boundaries during CI.
const fixtureExpiresAt=Math.floor(Date.now()/1000)+3600;
const jwt=(nonce,sub,role='authenticated',exp=fixtureExpiresAt)=>[
 Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url'),
 Buffer.from(JSON.stringify({sub,role,exp,nonce})).toString('base64url'),
 'syntheticSignature'+nonce.repeat(30)
].join('.');
function env(){return {
 NETWORK_HOSTED_STAGE_READONLY_APPROVED:'approved-isolated-staging-only',
 NETWORK_STAGE_SUPABASE_URL:'https://staging0123456789.supabase.co/',
 NETWORK_STAGE_PROJECT_REF:'staging0123456789',
 NETWORK_STAGE_PUBLISHABLE_KEY:'sb_publishable_'+ 'X'.repeat(38),
 NETWORK_STAGE_OWNER_ONE_ID:u1,NETWORK_STAGE_OWNER_TWO_ID:u2,
 NETWORK_STAGE_OWNER_ONE_JWT:jwt('a',u1),NETWORK_STAGE_OWNER_TWO_JWT:jwt('b',u2),
 NETWORK_STAGE_ACCOUNT_ONE_ID:a1,NETWORK_STAGE_ACCOUNT_TWO_ID:a2,
 NETWORK_STAGE_REVISION_ONE_ID:r1,NETWORK_STAGE_REVISION_TWO_ID:r2,
 NETWORK_STAGE_MEDIA_ONE:'one.png',NETWORK_STAGE_MEDIA_TWO:'two.png'
};}
test('staging acceptance config is host-pinned, requires consent, rejects shared production and secrets',()=>{
 const good=validateNetworkHostedStageConfig(env());
 assert.equal(good.owners.length,2);
 const legacyAnon=[
   Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url'),
   Buffer.from('{"role":"anon"}').toString('base64url'),'signature'.repeat(7)].join('.');
 assert.equal(validateNetworkHostedStageConfig({...env(),NETWORK_STAGE_PUBLISHABLE_KEY:legacyAnon}).owners.length,2);
 const bad=[
  {NETWORK_HOSTED_STAGE_READONLY_APPROVED:undefined},
  {NETWORK_STAGE_SUPABASE_URL:'https://ftkznprjljkhymknvhye.supabase.co/'},
  {NETWORK_STAGE_SUPABASE_URL:'https://texasdefined.com'},
  {NETWORK_STAGE_SUPABASE_URL:'http://staging0123456789.supabase.co/'},
  {NETWORK_STAGE_SUPABASE_URL:'https://staging0123456789.supabase.co/private'},
  {NETWORK_STAGE_SUPABASE_URL:'https://staging0123456789.supabase.co/?token=bad'},
  {NETWORK_STAGE_PROJECT_REF:'not-staging0123456789'},
  {NETWORK_STAGE_PUBLISHABLE_KEY:'sb_secret_'+'X'.repeat(80)},
  {NETWORK_STAGE_PUBLISHABLE_KEY:jwt('a',u1)},
  {NETWORK_STAGE_PUBLISHABLE_KEY:[
    Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url'),
    Buffer.from('{"role":"service_role"}').toString('base64url'),'signature'.repeat(7)].join('.')},
  {NETWORK_STAGE_OWNER_ONE_JWT:jwt('b',u2)},
  {NETWORK_STAGE_OWNER_ONE_JWT:jwt('c',u1,'service_role')},
  {NETWORK_STAGE_OWNER_ONE_JWT:jwt('d',u1,'authenticated',1)},
  {NETWORK_STAGE_OWNER_ONE_JWT:jwt('e',u2)},
  {NETWORK_STAGE_OWNER_TWO_ID:u1},
  {NETWORK_STAGE_MEDIA_ONE:'../private.jpeg'},
 ];
 for(const over of bad)
  assert.throws(()=>validateNetworkHostedStageConfig({...env(),...over}),/invalid/);
});
function stageFetch({foreignRevisionLeak=false,foreignObjectLeak=false,revokedSecond=false,revokedRevisionLeak=false}={}){
 const c=validateNetworkHostedStageConfig(env());
 return async(url,options)=>{
  assert.equal(options.method==='POST'?options.method:'GET',options.method);
  assert.equal(options.redirect,'error');
  assert.equal(options.cache,'no-store');
  const token=options.headers.Authorization.substring(7);
  const index=c.owners.findIndex(owner=>owner.token===token);
  assert.ok(index===0||index===1);
  const owner=c.owners[index],other=c.owners[1-index];
  assert.match(url,/^https:\/\/staging0123456789\.supabase\.co\//);
  let status=200,body;
  if(url.endsWith('/auth/v1/user'))
    body={id:owner.id,email:'synthetic'+index+'@example.invalid',email_confirmed_at:'2026-10-11T00:00:00Z'};
  else if(url.includes('texasdefined_network_business_accounts'))
    body=[{id:owner.account,owner_user_id:owner.id,access_enabled:!(revokedSecond&&index===1),membership_tier:'featured'}];
  else if(url.includes('texasdefined_network_profile_revisions'))
    body=revokedSecond&&index===1&&!revokedRevisionLeak?[]:foreignRevisionLeak?[{id:other.revision,business_account_id:other.account}]:
      [{id:owner.revision,business_account_id:owner.account}];
  else if(url.includes('/storage/v1/object/authenticated/texasdefined-network-featured-drafts/')){
    if(revokedSecond&&index===1&&url.endsWith('/'+owner.id+'/'+owner.account+'/'+owner.media))status=403;
    else if(url.endsWith('/'+other.id+'/'+other.account+'/'+other.media))status=foreignObjectLeak?200:404;
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
 await assert.rejects(runNetworkHostedStageReadOnly(c,stageFetch({foreignRevisionLeak:true})),/revision RLS mismatch/);
});
test('cross-owner private Storage exposure makes acceptance fail',async()=>{
 const c=validateNetworkHostedStageConfig(env());
 await assert.rejects(runNetworkHostedStageReadOnly(c,stageFetch({foreignObjectLeak:true})),/cross-owner private Storage read not denied/);
});
test('after independently authorized staging revocation, a still-authenticated disabled owner loses revisions and private media',async()=>{
 const c=validateNetworkHostedStageConfig(env());
 const result=await runNetworkHostedRevokedOwnerReadOnly(c,stageFetch({revokedSecond:true}));
 assert.equal(result.accepted,true);
 assert.equal(result.checks,6);
 assert.equal(result.scope,'isolated-hosted-revoked-owner-read-only');
});
test('revocation acceptance rejects an owner still marked enabled',async()=>{
 const c=validateNetworkHostedStageConfig(env());
 await assert.rejects(runNetworkHostedRevokedOwnerReadOnly(c,stageFetch()),/disabled owner binding state not verified/);
});
test('the old vulnerable private revision SELECT policy FAILS for a truly disabled owner',async()=>{
 const c=validateNetworkHostedStageConfig(env());
 await assert.rejects(runNetworkHostedRevokedOwnerReadOnly(c,stageFetch({revokedSecond:true,revokedRevisionLeak:true})),/disabled owner can still read private revisions/);
});
test('fixture checks do not allow mutating HTTP requests',async()=>{
 let requests=0;
 const spy=async(url,options)=>{requests++;assert.equal(options.method,'GET');return stageFetch()(url,options);};
 await runNetworkHostedStageReadOnly(validateNetworkHostedStageConfig(env()),spy);
 assert.equal(requests,10);
});
