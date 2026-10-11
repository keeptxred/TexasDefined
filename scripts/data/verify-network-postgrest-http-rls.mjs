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
function jwt(sub,expiresAt=Math.floor(Date.now()/1000)+300) {
 const header=b64({alg:'HS256',typ:'JWT'});
 const payload=b64({role:'authenticated',sub,aud:'authenticated',exp:expiresAt});
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
const sql="UPDATE public.texasdefined_network_business_accounts SET access_enabled=false WHERE id='a2222222-2222-4222-8222-222222222222';";
execFileSync('psql',['-X','-v','ON_ERROR_STOP=1','-c',sql],{timeout:10_000,encoding:'utf8',stdio:'pipe'});
// Account identity is still visible by policy so legitimate cancellation/support
// is possible; previous private revision and draft media must be gone immediately.
expectRows(await get('texasdefined_network_business_accounts',jwt(SECOND)),1,'disabled owner own account shell');
expectRows(await get('texasdefined_network_profile_revisions',jwt(SECOND)),0,'disabled owner private revisions revoked');
expectRows(await get('objects',jwt(SECOND),{schema:'storage'}),0,'disabled owner draft media revoked');
expectRows(await get('texasdefined_network_profile_revisions',jwt(FIRST)),1,'unaffected first owner preserved');
console.log('NETWORK POSTGREST HTTP RESULT PASS: signed/expired/forged JWTs, anonymous denial, two owners and outsider, private SQL-backed Storage metadata, immediate disabled-owner revocation; disposable localhost only');
