/**
 * Real LOCAL Supabase GoTrue/Auth JWT issuance and Storage HTTP API integration.
 * No customer data, mail sends, remote Supabase URLs, Stripe, Graph, or deployment.
 * Requires a new, unlinked Supabase CLI stack at 127.0.0.1:54321/54322.
 */
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const ORIGIN='http://127.0.0.1:54321';
const anon=process.env.ANON_KEY||'';
const service=process.env.SERVICE_ROLE_KEY||'';
if(process.env.NETWORK_SUPABASE_REAL_E2E!=='yes-local-disposable-only'
 || process.env.API_URL!==ORIGIN
 || !anon.startsWith('eyJ')||!service.startsWith('eyJ')
 || process.env.SUPABASE_URL || process.env.SUPABASE_ACCESS_TOKEN
 || process.env.SUPABASE_DB_URL || process.env.SUPABASE_PROJECT_ID)
 throw Error('Refusing Auth/Storage test unless using unlinked disposable localhost Supabase');
const pwd='Disposable-Network-Auth-QA-Only-2026!';
function assertUuid(v){assert.match(v,/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);return v;}
async function req(method,url,key,token,body,contentType='application/json'){
 const headers={apikey:key,authorization:'Bearer '+token};
 if(body!==undefined)headers['content-type']=contentType;
 const res=await fetch(ORIGIN+url,{
  method,headers,body:body===undefined?undefined:(Buffer.isBuffer(body)?body:JSON.stringify(body)),
  signal:AbortSignal.timeout(20_000)
 });
 const buf=Buffer.from(await res.arrayBuffer());
 let json;try{json=JSON.parse(buf.toString('utf8'))}catch{json=null}
 return {status:res.status,json,text:buf.toString('utf8').slice(0,280),bytes:buf};
}
function allowed(r,label){assert.ok([200,201].includes(r.status),label+' returned HTTP '+r.status+': '+r.text);}
function denied(r,label){assert.ok(![200,201,204].includes(r.status),label+' unexpectedly succeeded (HTTP '+r.status+')');}
function sql(q){
 return execFileSync('psql',['-X','-At','-v','ON_ERROR_STOP=1','-h','127.0.0.1','-p','54322','-U','postgres','-d','postgres','-c',q],{
  encoding:'utf8',timeout:20_000,stdio:'pipe',env:{...process.env,PGPASSWORD:'postgres'}
 }).trim();
}
const rand=randomUUID().slice(0,8);
const userEmails=['owner-one-'+rand+'@example.invalid','owner-two-'+rand+'@example.invalid'];
async function newOwner(email){
 const user=await req('POST','/auth/v1/admin/users',service,service,
  {email,password:pwd,email_confirm:true});
 allowed(user,'Local Auth create confirmed fake owner');
 const id=assertUuid(user.json?.id);
 const signIn=await req('POST','/auth/v1/token?grant_type=password',anon,anon,
   {email,password:pwd});
 allowed(signIn,'Real local password sign-in');
 assert.equal(signIn.json?.user?.id,id,'GoTrue token user mismatch');
 assert.ok(typeof signIn.json?.access_token==='string'&&signIn.json.access_token.length>50);
 return {email,id,token:signIn.json.access_token};
}
const one=await newOwner(userEmails[0]);
const two=await newOwner(userEmails[1]);
const app1=randomUUID(),app2=randomUUID(),account1=randomUUID(),account2=randomUUID();
for(const {id,email,app,account,name,city} of [
 {id:one.id,email:one.email,app:app1,account:account1,name:'GoTrue Owner One Synthetic Business',city:'Katy'},
 {id:two.id,email:two.email,app:app2,account:account2,name:'GoTrue Owner Two Synthetic Business',city:'Austin'}
]){
 sql("INSERT INTO public.texasdefined_network_applications"+
 "(id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active) VALUES"+
 "('"+app+"','plus','published','"+name+"','Test','"+city+"','"+email+"',true,true);"+
 "INSERT INTO public.texasdefined_network_business_accounts"+
 "(id,application_id,owner_user_id,membership_tier,access_enabled) VALUES"+
 "('"+account+"','"+app+"','"+id+"','featured',true);");
}
async function rest(token,table,method='GET',body){
 return req(method,'/rest/v1/'+table+(method==='GET'?'?select=*':''),anon,token,body);
}
const a=await rest(one.token,'texasdefined_network_business_accounts');
const b=await rest(two.token,'texasdefined_network_business_accounts');
allowed(a,'Auth user one RLS account GET');
allowed(b,'Auth user two RLS account GET');
assert.deepEqual(a.json?.map(x=>x.id),[account1],'Owner one saw unauthorized accounts');
assert.deepEqual(b.json?.map(x=>x.id),[account2],'Owner two saw unauthorized accounts');
const revision={
 business_account_id:account1,
 submitted_by:one.id,
 proposed_profile:{description:'Local authenticated owner draft'},
};
const good=await rest(one.token,'texasdefined_network_profile_revisions','POST',revision);
assert.equal(good.status,201,'Real signed-in owner cannot submit Featured revision: '+good.text);
denied(await rest(two.token,'texasdefined_network_profile_revisions','POST',revision),
 'Second signed-in owner cross-account revision');
const own=await rest(one.token,'texasdefined_network_profile_revisions');
allowed(own,'Real Auth owner revision RLS');
assert.equal(own.json?.length,1,'Owner could not read own submitted revision');
const cross=await rest(two.token,'texasdefined_network_profile_revisions');
allowed(cross,'Second user RLS');
assert.equal(cross.json?.length,0,'Second user saw first owner private revision');

const bucket='texasdefined-network-featured-drafts';
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZ8AAAAASUVORK5CYII=','base64');
async function upload(user,path,content=png,type='image/png'){
 return req('POST','/storage/v1/object/'+bucket+'/'+path,anon,user.token,content,type);
}
const path1=one.id+'/'+account1+'/real-local-owner-one.png';
const path2=two.id+'/'+account2+'/real-local-owner-two.png';
allowed(await upload(one,path1),'Supabase Storage authenticated first owner image upload');
allowed(await upload(two,path2),'Supabase Storage authenticated second owner image upload');
denied(await upload(two,one.id+'/'+account1+'/cross-owner.png'),'Second owner Storage cross-path upload');
denied(await upload(one,one.id+'/'+account1+'/wrong-type.txt',Buffer.from('fake'),'text/plain'),'Storage MIME restrictions');
denied(await upload(one,one.id+'/'+account1+'/oversized.png',Buffer.alloc(3_000_001), 'image/png'),'Storage 3 MB restriction');
const ownedFile=await req('GET','/storage/v1/object/authenticated/'+bucket+'/'+path1,anon,one.token);
allowed(ownedFile,'Owner authenticated private file GET');
assert.ok(ownedFile.bytes.equals(png),'Storage returned different image bytes');
denied(await req('GET','/storage/v1/object/authenticated/'+bucket+'/'+path1,anon,two.token),
 'Other owner private image GET');

for(let i=2;i<=24;i++){
 allowed(await upload(one,one.id+'/'+account1+'/local-quota-'+i+'.png'),'Owner Storage draft '+i);
}
denied(await upload(one,one.id+'/'+account1+'/local-quota-25.png'),'25th Storage API draft upload');
const storageRows=await req('POST','/storage/v1/object/list/'+bucket,anon,one.token,{prefix:one.id+'/'+account1});
allowed(storageRows,'Private Storage owner list');
assert.equal(storageRows.json?.length,24,'24-object quota not enforced by actual Storage API');

sql("UPDATE public.texasdefined_network_business_accounts SET access_enabled=false WHERE id='"+account1+"';");
const after=await rest(one.token,'texasdefined_network_profile_revisions');
allowed(after,'Existing signed JWT after account revocation');
assert.equal(after.json?.length,0,'Disabled owner could read private revisions');
denied(await req('GET','/storage/v1/object/authenticated/'+bucket+'/'+path1,anon,one.token),
 'Disabled owner private Storage download');
denied(await upload(one,one.id+'/'+account1+'/post-disable.png'),'Disabled owner private Storage upload');
console.log('NETWORK REAL LOCAL AUTH STORAGE PASS: 2 real GoTrue logins, Supabase PostgREST authenticated RLS, foreign write denial, real Storage upload/download, MIME/3MB/24-object caps and disabled-owner revocation; disposable localhost; no Graph/Stripe/customer mail');
