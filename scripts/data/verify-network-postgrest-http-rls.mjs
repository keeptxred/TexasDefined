/**
 * Actual local PostgREST JWT-authenticated HTTP boundary test on disposable
 * Postgres. It does NOT issue Supabase GoTrue sessions or perform Storage API
 * HTTP uploads. Prohibits all remote hostnames and non-test databases.
 */
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const PGRST_ORIGIN='http://127.0.0.1:3030';
const SECRET='ephemeral-network-http-jwt-secret-never-production-2026';
const FIRST='44444444-4444-4444-8444-444444444444';
const SECOND='55555555-5555-4555-8555-555555555555';
const OUTSIDER='88888888-8888-4888-8888-888888888888';
if (process.env.NETWORK_MIGRATION_REPLAY_ISOLATED!=='yes-ephemeral-local-only'
 || !['127.0.0.1','localhost'].includes(process.env.PGHOST)
 || process.env.PGDATABASE!=='network_replay'
 || process.env.PGUSER!=='postgres'
 || process.env.PGRST_HTTP_TEST_BASE !== PGRST_ORIGIN)
 throw Error('Refusing PostgREST HTTP tests outside disposable localhost network_replay');
const b64=v=>Buffer.from(typeof v==='string'?v:JSON.stringify(v)).toString('base64url');
function jwt(sub,expiresAt=Math.floor(Date.now()/1000)+300,role='authenticated') {
 const header=b64({alg:'HS256',typ:'JWT'});
 const payload=b64({role,sub,aud:'authenticated',exp:expiresAt});
 const body=header+'.'+payload;
 return body+'.'+createHmac('sha256',SECRET).update(body).digest('base64url');
}
async function get(table,token,{schema='public'}={}) {
 const headers={accept:'application/json'};
 if(token!==null)headers.authorization='Bearer '+token;
 if(schema!=='public')headers['accept-profile']=schema;
 const response=await fetch(PGRST_ORIGIN+'/'+table+'?select=*',{
  headers,signal:AbortSignal.timeout(8_000)
 });
 const text=await response.text();
 let body;
 try{body=JSON.parse(text)}catch{body=text.slice(0,240)}
 return {status:response.status,body};
}
async function post(table,token,payload,{schema='public'}={}) {
 const headers={
  authorization:'Bearer '+token,
  'content-type':'application/json',
  prefer:'return=minimal',
 };
 if(schema!=='public')headers['content-profile']=schema;
 const response=await fetch(PGRST_ORIGIN+'/'+table,{
  method:'POST',headers,body:JSON.stringify(payload),signal:AbortSignal.timeout(8_000)
 });
 return {status:response.status,body:(await response.text()).slice(0,400)};
}
function ensureDenied(res,label) {
 assert.ok([401,403].includes(res.status),label+': expected authorization denial, got '+res.status+' '+String(res.body));
}
async function rpc(name,token,params) {
 const headers={'content-type':'application/json'};
 if(token!==null)headers.authorization='Bearer '+token;
 const result=await fetch(PGRST_ORIGIN+'/rpc/'+name,{
  method:'POST',headers,body:JSON.stringify(params),signal:AbortSignal.timeout(8_000)
 });
 const raw=await result.text();
 let data;try{data=JSON.parse(raw)}catch{data=raw.slice(0,300)}
 return {status:result.status,body:data};
}
function expectRows(res,n,label){
 assert.equal(res.status,200,label+': HTTP '+res.status+' '+JSON.stringify(res.body).slice(0,180));
 assert.ok(Array.isArray(res.body),label+': missing JSON array');
 assert.equal(res.body.length,n,label+': unexpected row count');
 return res.body;
}
const tests=[
 ['texasdefined_network_business_accounts','public','id'],
 ['texasdefined_network_profile_revisions','public','id'],
 ['objects','storage','name'],
];
for(const [table,schema,key] of tests) {
 const one=expectRows(await get(table,jwt(FIRST),{schema}),1,table+' first verified owner');
 const two=expectRows(await get(table,jwt(SECOND),{schema}),1,table+' second verified owner');
 assert.notEqual(one[0][key],two[0][key],table+' cross-owner record leak');
 expectRows(await get(table,jwt(OUTSIDER),{schema}),0,table+' unknown owner');
 const anon=await get(table,null,{schema});
 assert.ok([401,403].includes(anon.status),table+' anonymous role unexpectedly saw private table: '+anon.status);
}
const expired=await get('texasdefined_network_business_accounts',jwt(FIRST,Math.floor(Date.now()/1000)-3600));
assert.equal(expired.status,401,'Expired JWT accepted');
const forged=jwt(FIRST).slice(0,-8)+'forgery1';
assert.equal((await get('texasdefined_network_business_accounts',forged)).status,401,'Forged JWT accepted');

const ownRevision={
 business_account_id:'a1111111-1111-4111-8111-111111111111',
 submitted_by:FIRST,
 proposed_profile:{description:'First owner authorized HTTP revision'},
};
const foreignRevision={
 business_account_id:'a2222222-2222-4222-8222-222222222222',
 submitted_by:FIRST,
 proposed_profile:{description:'Cross-owner revision rejected'},
};
ensureDenied(await post('texasdefined_network_profile_revisions',jwt(FIRST),foreignRevision),'cross-owner HTTP revision INSERT');
ensureDenied(await post('texasdefined_network_profile_revisions',jwt(OUTSIDER),ownRevision),'outsider HTTP revision INSERT');
const ownWrite=await post('texasdefined_network_profile_revisions',jwt(FIRST),ownRevision);
assert.equal(ownWrite.status,201,'Verified owner cannot submit own private revision: '+ownWrite.body);
expectRows(await get('texasdefined_network_profile_revisions',jwt(FIRST)),2,'authorized own HTTP revision');
expectRows(await get('texasdefined_network_profile_revisions',jwt(SECOND)),1,'foreign revision insert left second owner unchanged');

// Exercise the Featured count-based INSERT policy through actual HTTP, not only
// direct PostgreSQL transactions. 1 real metadata row + 22 seeded = 23.
execFileSync('psql',['-X','-v','ON_ERROR_STOP=1','-c',
 "INSERT INTO storage.objects(bucket_id,name) SELECT 'texasdefined-network-featured-drafts',"+
 "'44444444-4444-4444-8444-444444444444/a1111111-1111-4111-8111-111111111111/http-preexisting-'||n||'.webp'"+
 " FROM generate_series(1,22) AS n;"
],{timeout:10_000,encoding:'utf8',stdio:'pipe'});
expectRows(await get('objects',jwt(FIRST),{schema:'storage'}),23,'Featured HTTP quota before final slot');
const uploadRow=n=>({
 bucket_id:'texasdefined-network-featured-drafts',
 name:'44444444-4444-4444-8444-444444444444/a1111111-1111-4111-8111-111111111111/http-quota-'+n+'.webp',
});
ensureDenied(await post('objects',jwt(SECOND),uploadRow('cross'),{schema:'storage'}),'cross-owner HTTP draft metadata INSERT');
const twentyFourth=await post('objects',jwt(FIRST),uploadRow(24),{schema:'storage'});
assert.equal(twentyFourth.status,201,'HTTP upload slot 24 should succeed: '+twentyFourth.body);
ensureDenied(await post('objects',jwt(FIRST),uploadRow(25),{schema:'storage'}),'HTTP draft metadata 25th quota');
expectRows(await get('objects',jwt(FIRST),{schema:'storage'}),24,'Featured HTTP quota after 25th denial');
expectRows(await get('objects',jwt(SECOND),{schema:'storage'}),1,'other owner HTTP media unaffected');

const sql="UPDATE public.texasdefined_network_business_accounts SET access_enabled=false WHERE id='a2222222-2222-4222-8222-222222222222';";
execFileSync('psql',['-X','-v','ON_ERROR_STOP=1','-c',sql],{timeout:10_000,encoding:'utf8',stdio:'pipe'});
// Account identity is still visible by policy so legitimate cancellation/support
// is possible; previous private revision and draft media must be gone immediately.
expectRows(await get('texasdefined_network_business_accounts',jwt(SECOND)),1,'disabled owner own account shell');
expectRows(await get('texasdefined_network_profile_revisions',jwt(SECOND)),0,'disabled owner private revisions revoked');
ensureDenied(await post('texasdefined_network_profile_revisions',jwt(SECOND),{
 business_account_id:'a2222222-2222-4222-8222-222222222222',
 submitted_by:SECOND,proposed_profile:{description:'Disabled owner cannot submit'},
}),'disabled owner HTTP private revision INSERT');
expectRows(await get('objects',jwt(SECOND),{schema:'storage'}),0,'disabled owner draft media revoked');
expectRows(await get('texasdefined_network_profile_revisions',jwt(FIRST)),2,'unaffected first owner preserved');

/* Verify service-only notification RPCs at the real HTTP permission boundary.
   All records, provider references, JWTs and admin review evidence are synthetic. */
const serviceJwt=jwt(FIRST,Math.floor(Date.now()/1000)+300,'service_role');
for(const name of [
 'claim_texasdefined_network_notification',
 'finish_texasdefined_network_notification',
 'reconcile_texasdefined_network_notification'
]) {
 const params=name==='claim_texasdefined_network_notification'
   ? {p_limit:1}
   : name==='finish_texasdefined_network_notification'
     ? {p_id:'11111111-1111-4111-8111-111111111111',p_token:'11111111-1111-4111-8111-111111111111',p_provider_message_id:null,p_status:'failed',p_error_code:'mock_failure'}
     : {p_id:'11111111-1111-4111-8111-111111111111',p_claim_token:'11111111-1111-4111-8111-111111111111',p_resolution:'suppress_uncertain',p_evidence_reference:'mock attempted unauthorized admin reconciliation',p_reviewer_label:'sole-admin'};
 for(const token of [null,jwt(FIRST),jwt(OUTSIDER)]) {
  const outcome=await rpc(name,token,params);
  assert.ok([401,403,404].includes(outcome.status),
    name+' exposed to non-service caller over HTTP: '+outcome.status);
 }
}
const eventKey='local-postgrest-http-manual-reconciliation-'+Date.now();
const idOutput=execFileSync('psql',['-X','-At','-v','ON_ERROR_STOP=1','-c',
 "INSERT INTO public.texasdefined_network_email_outbox(event_key,event_type,recipient_email,payload)"+
 " VALUES('"+eventKey+"','application_received','network-http-fixture@example.invalid','{}') RETURNING id;"
],{timeout:10_000,encoding:'utf8',stdio:'pipe'}).trim();
const eventId=idOutput.split('\n')[0];
assert.match(eventId,/^[0-9a-f-]{36}$/,'service RPC test email row ID invalid');
const claimed=await rpc('claim_texasdefined_network_notification',serviceJwt,{p_limit:25});
assert.equal(claimed.status,200,'Service role cannot call notification claim RPC: '+JSON.stringify(claimed.body));
assert.ok(Array.isArray(claimed.body),'Service claim did not return records');
const chosen=claimed.body.find(row=>row.id===eventId);
assert.ok(chosen?.claim_token,'Synthetic service notification was not claimed');
const unknownToken='11111111-1111-4111-8111-111111111111';
const wrong=await rpc('finish_texasdefined_network_notification',serviceJwt,{
 p_id:eventId,p_token:unknownToken,p_provider_message_id:null,p_status:'failed',p_error_code:'mock_definitive_error'
});
assert.equal(wrong.status,200,'Wrong-token RPC did not run as service');
assert.equal(wrong.body,false,'Wrong-token notification finalization succeeded');
const hold=await rpc('reconcile_texasdefined_network_notification',serviceJwt,{
 p_id:eventId,p_claim_token:chosen.claim_token,p_resolution:'suppress_uncertain',
 p_evidence_reference:'mock uncertain provider response with no delivery confirmation',
 p_reviewer_label:'sole-admin',
});
assert.equal(hold.status,200,'Manual hold RPC denied service role');
assert.equal(hold.body,true,'Ambiguous provider claim not suppressed');
const recovered=await rpc('reconcile_texasdefined_network_notification',serviceJwt,{
 p_id:eventId,p_claim_token:chosen.claim_token,p_resolution:'sent_verified',
 p_evidence_reference:'mock later provider sent items confirmation receipt',
 p_reviewer_label:'sole-admin',p_verified_provider_id:'mock-http-provider-message-123',
});
assert.equal(recovered.status,200,'Manual recovery RPC denied service role');
assert.equal(recovered.body,true,'Confirmed delivery not reconciled');
const replay=await rpc('reconcile_texasdefined_network_notification',serviceJwt,{
 p_id:eventId,p_claim_token:chosen.claim_token,p_resolution:'sent_verified',
 p_evidence_reference:'mock later provider sent items confirmation receipt',
 p_reviewer_label:'sole-admin',p_verified_provider_id:'mock-http-provider-message-123',
});
assert.equal(replay.body,false,'Duplicate service recovery was accepted');
const receipt=execFileSync('psql',['-X','-At','-v','ON_ERROR_STOP=1','-c',
 "SELECT status||':'||provider_message_id FROM public.texasdefined_network_email_outbox WHERE id='"+eventId+"';"
],{timeout:10_000,encoding:'utf8',stdio:'pipe'}).trim();
assert.equal(receipt,'sent:mock-http-provider-message-123','Service HTTP recovery not durably committed');
console.log('NETWORK POSTGREST SERVICE RPC PASS: non-service HTTP denial, local service role claims, wrong-token denial, manual hold, later verified mock receipt, replay denial; no provider send');
console.log('NETWORK POSTGREST HTTP RESULT PASS: signed/expired/forged JWTs, anonymous denial, two owners and outsider, private SQL-backed Storage metadata, permitted owner writes, foreign and disabled write denial, 24-file HTTP quota, immediate disabled-owner revocation; disposable localhost only');
