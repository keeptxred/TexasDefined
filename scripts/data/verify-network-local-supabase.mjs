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
/* Auth Admin's local generate_link prepares a Magic Link without sending mail.
   Validate the actual local GoTrue passwordless token exchange and replay gate.
   This never invokes the mail sender or /otp endpoint. */
const magicLink=await req('POST','/auth/v1/admin/generate_link',service,service,
 {type:'magiclink',email:one.email});
allowed(magicLink,'Local admin-generated no-send Magic Link');
const hash=magicLink.json?.hashed_token??magicLink.json?.properties?.hashed_token;
assert.ok(typeof hash==='string'&&hash.length>16,'No valid local Magic Link hash returned');
const otp=await req('POST','/auth/v1/verify',anon,anon,
 {token_hash:hash,type:'email'});
allowed(otp,'Local passwordless Magic Link verification');
assert.equal(otp.json?.user?.id,one.id,'Magic Link authenticated unexpected owner');
assert.ok(typeof otp.json?.access_token==='string'&&otp.json.access_token.length>50);
const reusedOtp=await req('POST','/auth/v1/verify',anon,anon,
 {token_hash:hash,type:'email'});
denied(reusedOtp,'Magic Link token replay');
console.log('NETWORK REAL LOCAL PASSWORDLESS PASS: admin-generated no-send Magic Link, actual GoTrue exchange, correct owner JWT, replay denial');

const app1=randomUUID(),app2=randomUUID(),account1=randomUUID(),account2=randomUUID();
for(const {id,email,app,account,name,city} of [
 {id:one.id,email:one.email,app:app1,account:account1,name:'GoTrue Owner One Synthetic Business',city:'Katy'},
 {id:two.id,email:two.email,app:app2,account:account2,name:'GoTrue Owner Two Synthetic Business',city:'Austin'}
]){
 sql("INSERT INTO public.texasdefined_network_applications"+
 "(id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active,terms_version,terms_snapshot_sha256,terms_accepted_at,representative_authority_accepted,facts_responsibility_accepted,media_responsibility_accepted,search_indexing_accepted) VALUES"+
 "('"+app+"','plus','published','"+name+"','Test','"+city+"','"+email+"',true,true,'2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true);"+
 "INSERT INTO public.texasdefined_network_business_accounts"+
 "(id,application_id,owner_user_id,membership_tier,access_enabled) VALUES"+
 "('"+account+"','"+app+"','"+id+"','featured',true);");
}

/** Actual PostgREST + real GoTrue authorization boundary for the new
 * metrics RPCs. All data remains in disposable unlinked local Supabase.
 * This is NOT a web app browser or a hosted Stripe/Graph staging test. */
const metricSlug1='network-local-metric-business-a';
const metricSlug2='network-local-metric-business-b';
const metricProfile1=JSON.stringify({business_name:'Synthetic Metrics One'});
const metricProfile2=JSON.stringify({business_name:'Synthetic Metrics Two'});
sql("INSERT INTO public.texasdefined_network_public_listings "+
 "(application_id,slug,plan,profile,is_published) VALUES "+
 "('"+app1+"','"+metricSlug1+"','plus','"+metricProfile1+"'::jsonb,true),"+
 "('"+app2+"','"+metricSlug2+"','plus','"+metricProfile2+"'::jsonb,true);");
const metricRecord=(token,slug,action)=>req('POST',
 '/rest/v1/rpc/record_texasdefined_network_profile_metric',
 token===service?service:anon,token,{p_slug:slug,p_action:action});
const metricRead=(token,id)=>req('POST',
 '/rest/v1/rpc/get_texasdefined_network_profile_metrics',
 token===service?service:anon,token,{p_application_id:id});
denied(await metricRecord(anon,metricSlug1,'profile_view'),'Anonymous cannot invoke metrics writer');
denied(await metricRecord(one.token,metricSlug1,'profile_view'),'Signed-in owner cannot invoke service-only metrics writer');
denied(await metricRead(one.token,app1),'Owner token cannot bypass protected report API through direct SQL RPC');
denied(await metricRead(two.token,app1),'Second owner token cannot access private metrics RPC');
allowed(await metricRecord(service,metricSlug1,'profile_view'),'Service can observe own published listing');
allowed(await metricRecord(service,metricSlug1,'profile_view'),'Service can increment aggregate');
allowed(await metricRecord(service,metricSlug1,'website_click'),'Service can count website click');
allowed(await metricRecord(service,metricSlug2,'social_click'),'Service can observe second listing');
const metricA=await metricRead(service,app1);
const metricB=await metricRead(service,app2);
allowed(metricA,'Service can retrieve listing A stats from actual PostgREST');
allowed(metricB,'Service can retrieve listing B stats from actual PostgREST');
assert.deepEqual(
 metricA.json.map(row=>[row.action,Number(row.event_count)]).sort((a,b)=>String(a[0]).localeCompare(String(b[0]))),
 [['profile_view',2],['website_click',1]],
 'Actual HTTP RPC listing A counts are incorrect or mixed with owner B');
assert.deepEqual(metricB.json.map(row=>[row.action,Number(row.event_count)]),
 [['social_click',1]],'Second owner metric rows leaked or were not recorded');
sql("UPDATE public.texasdefined_network_public_listings SET is_published=false "+
 "WHERE application_id='"+app2+"';");
const hidden=await metricRecord(service,metricSlug2,'profile_view');
allowed(hidden,'Unpublished metrics writer returns a fail-closed boolean');
assert.equal(hidden.json,false,'Unpublished listing was improperly counted');
// Maintenance RPC is callable only by service_role and does not alter
// recent reports. It executes through real PostgREST, not a SQL stub.
denied(await req('POST','/rest/v1/rpc/prune_texasdefined_network_profile_metrics',
 anon,anon,{}),'Anonymous cannot prune private business history');
denied(await req('POST','/rest/v1/rpc/prune_texasdefined_network_profile_metrics',
 anon,one.token,{}),'Signed-in owner cannot prune private business history');
const prune=await req('POST','/rest/v1/rpc/prune_texasdefined_network_profile_metrics',
 service,service,{});
allowed(prune,'Service-only aggregate retention RPC');
assert.equal(prune.json,0,'Recent metrics must not be deleted');
const afterHidden=await metricRead(service,app2);
allowed(afterHidden,'Service read after unpublication');
assert.equal(afterHidden.json.length,1,'Unpublished profile acquired an additional metric row');
console.log('NETWORK REAL LOCAL PROFILE METRICS PASS: service-only PostgREST RPC, denied anon/owner and foreign-owner direct calls, per-business atomic counters and unpublish rejection. Zero live data.');

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


// Independently exercise the ACTUAL service-only reviewed-owner provisioning RPC
// over local PostgREST with genuine confirmed GoTrue users. No emails are sent.
// These fake documented verification claims MUST NOT be copied to production.
const verifiedApp=randomUUID();
sql("INSERT INTO public.texasdefined_network_applications"+
 "(id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active,terms_version,terms_snapshot_sha256,terms_accepted_at,representative_authority_accepted,facts_responsibility_accepted,media_responsibility_accepted,search_indexing_accepted) VALUES"+
 "('"+verifiedApp+"','plus','approved','Synthetic Independent Verification','Test','Dallas','"+one.email+"',true,false,'2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true);");
const provisionParams={
 p_application_id:verifiedApp,p_user_id:one.id,
 p_method:'registry_documents',
 p_evidence:'synthetic local registry confirmation, not a real review',
 p_reviewer:'sole-admin',
};
const provisionCall=(roleToken,params)=>req('POST','/rest/v1/rpc/provision_verified_network_owner',
 roleToken===service?service:anon,roleToken,params);
denied(await provisionCall(anon,provisionParams),'Anonymous owner provisioning RPC');
denied(await provisionCall(one.token,provisionParams),'Owner cannot grant themselves membership');
denied(await provisionCall(two.token,provisionParams),'Other owner cannot grant membership');
denied(await provisionCall(service,{...provisionParams,p_user_id:two.id}),'Confirmed wrong-email owner provisioning');
denied(await provisionCall(service,{...provisionParams,p_evidence:'short'}),'Owner provisioning missing evidence');
const provisioned=await provisionCall(service,provisionParams);
allowed(provisioned,'Service-only independently verified owner provisioning');
const provisionedId=assertUuid(provisioned.json?.id);
assert.equal(provisioned.json?.access_enabled,true);
assert.equal(provisioned.json?.alreadyEnabled,false);
const afterProvision=await rest(one.token,'texasdefined_network_business_accounts');
allowed(afterProvision,'Verified owner can read their new Plus binding');
assert.ok(afterProvision.json.some(a=>a.id===provisionedId&&a.membership_tier==='plus'&&a.access_enabled===true),
 'Real confirmed owner was not linked to approved Plus business');
const provisionReplay=await provisionCall(service,provisionParams);
allowed(provisionReplay,'Idempotent already-enabled owner provisioning');
assert.equal(provisionReplay.json?.id,provisionedId);
assert.equal(provisionReplay.json?.alreadyEnabled,true);
assert.equal(sql("SELECT COUNT(*) FROM public.texasdefined_network_owner_verifications WHERE application_id='"+
 verifiedApp+"';"),'1','Duplicate owner-verification audit was inserted');
sql("UPDATE public.texasdefined_network_business_accounts SET access_enabled=false WHERE id='"+
 provisionedId+"';");
const reenabled=await provisionCall(service,provisionParams);
allowed(reenabled,'Service re-enable verified owner binding');
assert.equal(reenabled.json?.id,provisionedId);
assert.equal(reenabled.json?.access_enabled,true);
assert.equal(reenabled.json?.alreadyEnabled,false);
assert.equal(sql("SELECT COUNT(*) FROM public.texasdefined_network_owner_verifications WHERE application_id='"+
 verifiedApp+"';"),'2','Owner re-enable did not create exactly one new audit event');
assert.equal(sql("SELECT COUNT(*) FROM public.texasdefined_network_owner_verifications WHERE application_id='"+
 verifiedApp+"' AND provisioning_action='created';"),'1','Provision-created audit missing');
assert.equal(sql("SELECT COUNT(*) FROM public.texasdefined_network_owner_verifications WHERE application_id='"+
 verifiedApp+"' AND provisioning_action='reenabled';"),'1','Re-enable audit missing');
console.log('NETWORK REAL LOCAL OWNER PROVISIONING PASS: actual GoTrue-confirmed users, service-only RPC, wrong owner/email/evidence denied, Plus binding, idempotency and auditable revocation/re-enable');

const bucket='texasdefined-network-featured-drafts';
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZ8AAAAASUVORK5CYII=','base64');

/* Simulate a worker crash between private intake-media uploads and the final
   authoritative database commit. No customer contact or external provider.
   A pending incomplete record MUST NOT create a receipt or publish by itself. */
const interruptedApp=randomUUID(), interruptedEmail='interrupted-'+rand+'@example.invalid';
sql("INSERT INTO public.texasdefined_network_applications"+
 "(id,plan,status,business_name,category,city,contact_email,terms_version,terms_snapshot_sha256,terms_accepted_at,representative_authority_accepted,facts_responsibility_accepted,media_responsibility_accepted,search_indexing_accepted) VALUES"+
 "('"+interruptedApp+"','plus','pending_review','Interrupted Local Application','Test','Houston','"+interruptedEmail+"','2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true);");
const receiptForInterrupted=() => sql("SELECT COUNT(*) FROM public.texasdefined_network_email_outbox "+
 "WHERE event_key='application:"+interruptedApp+":received';");
assert.equal(receiptForInterrupted(),'0','Unfinished intake enqueued an email receipt');
const finalizeIntake=(token,logo,gallery)=>req(
 'POST','/rest/v1/rpc/finalize_texasdefined_network_intake',
 token===service?service:anon,token,
 {p_application_id:interruptedApp,p_logo:logo,p_gallery:gallery}
);
const incompleteLogo=interruptedApp+'/logo.png';
const incompleteGallery=interruptedApp+'/gallery-1.png';
denied(await finalizeIntake(one.token,incompleteLogo,[incompleteGallery]),
 'Ordinary Auth user must not finalize public intake');
const missingMedia=await finalizeIntake(service,incompleteLogo,[incompleteGallery]);
allowed(missingMedia,'Service attempt to finalize incomplete media inventory');
assert.equal(missingMedia.json,false,'Service finalized an intake with missing media');
assert.equal(receiptForInterrupted(),'0','Failed media finalization generated a receipt');
const appBucket='texasdefined-network-applications';
const uploadInterrupted=async path=>req('POST','/storage/v1/object/'+appBucket+'/'+path,
 service,service,png,'image/png');
allowed(await uploadInterrupted(incompleteLogo),'Real local private intake logo upload');
const partial=await finalizeIntake(service,incompleteLogo,[incompleteGallery]);
allowed(partial,'Service attempt to finalize partial upload');
assert.equal(partial.json,false,'Service committed intake missing gallery media');
assert.equal(receiptForInterrupted(),'0','Partial media upload generated application email');
assert.equal(sql("SELECT intake_complete::text FROM public.texasdefined_network_applications "+
 "WHERE id='"+interruptedApp+"';"),'false','Interrupted application incorrectly marked ready');
allowed(await uploadInterrupted(incompleteGallery),'Resumed private gallery upload');
const recoveredIntake=await finalizeIntake(service,incompleteLogo,[incompleteGallery]);
allowed(recoveredIntake,'Service finalize fully uploaded real intake');
assert.equal(recoveredIntake.json,true,'Fully uploaded application not committed');
assert.equal(receiptForInterrupted(),'1','Resumed intake failed to enqueue exactly one receipt');
assert.equal(sql("SELECT intake_complete::text FROM public.texasdefined_network_applications "+
 "WHERE id='"+interruptedApp+"';"),'true','Resumed application not marked complete');
const repeatedIntake=await finalizeIntake(service,incompleteLogo,[incompleteGallery]);
allowed(repeatedIntake,'Idempotent committed intake second finalization request');
assert.equal(repeatedIntake.json,false,'Already-finalized intake was allowed to commit twice');
assert.equal(receiptForInterrupted(),'1','Retry created a duplicate application receipt');
console.log('NETWORK REAL LOCAL INTAKE CRASH/RETRY PASS: actual private Storage bytes, missing gallery denies commit, no premature receipt, resumed finalization once, one outbox item and idempotent retry; no actual mail');

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
/* Signed links are bearer capabilities: minting needs owner SELECT permission.
   Test a ONE-SECOND URL that expires; do not promise revocation of existing
   pre-signed links on business disable until a separate provider test proves it. */
const forbiddenSign=await req('POST','/storage/v1/object/sign/'+bucket+'/'+path1,anon,two.token,{expiresIn:1});
denied(forbiddenSign,'Other owner cannot mint private signed URLs');
const allowedSign=await req('POST','/storage/v1/object/sign/'+bucket+'/'+path1,anon,one.token,{expiresIn:1});
allowed(allowedSign,'Verified owner can mint short-lived draft URL');
const url=allowedSign.json?.signedURL??allowedSign.json?.signedUrl;
assert.ok(typeof url==='string'&&url.length>25,'Private signed URL missing');
const normalized=url.startsWith('/object/')?'/storage/v1'+url:url;
const parsed=new URL(normalized,ORIGIN);
assert.equal(parsed.origin,ORIGIN,'Signed URL redirected outside disposable localhost');
assert.ok(parsed.pathname.startsWith('/storage/v1/object/sign/'+bucket+'/'),'Signed URL wrong bucket or endpoint');
const firstSigned=await req('GET',parsed.pathname+parsed.search,anon,anon);
allowed(firstSigned,'Short-lived bearer signed URL download');
assert.ok(firstSigned.bytes.equals(png),'Signed URL returned wrong image bytes');
await new Promise(resolve=>setTimeout(resolve,1800));
denied(await req('GET',parsed.pathname+parsed.search,anon,anon),'Expired private signed URL');
const upsertResponse=await fetch(ORIGIN+'/storage/v1/object/'+bucket+'/'+path1,{
 method:'POST',
 headers:{apikey:anon,authorization:'Bearer '+one.token,'content-type':'image/png','x-upsert':'true'},
 body:Buffer.from('changed-synthetic-bytes'),
 signal:AbortSignal.timeout(20_000),
});
denied({status:upsertResponse.status},'Private draft image overwrite/upsert');
const unchanged=await req('GET','/storage/v1/object/authenticated/'+bucket+'/'+path1,anon,one.token);
allowed(unchanged,'Original private image after rejected upsert');
assert.ok(unchanged.bytes.equals(png),'Rejected upsert modified previously stored bytes');
console.log('NETWORK REAL LOCAL SIGNED MEDIA PASS: owner-only URL minting, one-second expiry, private download, immutable no-upsert bytes');


/* Exercise two ACTUAL concurrent binary Storage API requests against 23 existing
   owner files, rather than merely sequential uploads or SQL-only sessions. */
for(let i=2;i<=23;i++){
 allowed(await upload(one,one.id+'/'+account1+'/local-quota-'+i+'.png'),'Owner Storage draft '+i);
}
const racePaths=[
 one.id+'/'+account1+'/local-race-24-a.png',
 one.id+'/'+account1+'/local-race-24-b.png',
];
const raceResults=await Promise.all(racePaths.map(path=>upload(one,path)));
const raceAccepted=raceResults.filter(result=>[200,201].includes(result.status));
const raceRejected=raceResults.filter(result=>result.status>=400&&result.status<500);
assert.equal(raceAccepted.length,1,'Concurrent Storage requests overshot or blocked quota; statuses='+raceResults.map(r=>r.status).join(','));
assert.equal(raceRejected.length,1,'25th concurrent Storage request was not safely denied; statuses='+raceResults.map(r=>r.status).join(','));
assert.equal(sql("SELECT object_count FROM texasdefined_network_internal.featured_storage_usage WHERE business_account_id='"+account1+"';"),
 '24','Atomic counter must match 24 real stored objects after competing HTTP uploads');
const raceWinner=racePaths[raceResults.findIndex(result=>[200,201].includes(result.status))];
const rejectedPath=racePaths[raceResults.findIndex(result=>result.status>=400&&result.status<500)];
denied(await upload(one,one.id+'/'+account1+'/local-quota-26.png'),'Additional Storage API upload beyond 24 drafts');
async function listOwnMedia(){
 return req('POST','/storage/v1/object/list/'+bucket,anon,one.token,{prefix:one.id+'/'+account1});
}
const storageRows=await listOwnMedia();
allowed(storageRows,'Private Storage owner list');
assert.equal(storageRows.json?.length,24,'24-object quota not enforced by actual concurrent Storage API');
assert.ok(storageRows.json.some(item=>item.name==='local-race-24-a.png') !==
 storageRows.json.some(item=>item.name==='local-race-24-b.png'),'Concurrent media winner not uniquely present');
console.log('NETWORK REAL STORAGE CONCURRENT QUOTA PASS: 23 existing files, two actual simultaneous HTTP uploads, exactly one accepted, one safe 4xx denial, no 25th object');

// Owner may clean an unreferenced draft through actual Storage DELETE API,
// but an immutable revision reference must keep approved/pending media safe.
sql("UPDATE public.texasdefined_network_profile_revisions SET "+
 "proposed_profile=jsonb_build_object('logo_storage_path','"+path1+"') "+
 "WHERE business_account_id='"+account1+"';");
const deletePaths=async (paths)=>req('DELETE','/storage/v1/object/'+bucket,anon,one.token,{prefixes:paths});
const protectedDelete=await deletePaths([path1]);
// Storage may acknowledge an empty DELETE result with HTTP 200 even if RLS
// silently prevents deleting the protected row. The invariant is that neither
// the Storage metadata NOR original bytes were actually removed or changed.
assert.ok(protectedDelete.status<500,'Referenced draft DELETE caused server failure');
const stillReferenced=sql("SELECT COUNT(*) FROM storage.objects WHERE bucket_id='"+
 bucket+"' AND name='"+path1+"';");
assert.equal(stillReferenced,'1','A private image referenced by a review was deleted');
const protectedDownload=await req('GET','/storage/v1/object/authenticated/'+bucket+'/'+path1,anon,one.token);
allowed(protectedDownload,'Referenced draft retained after authorized but ineffective DELETE');
assert.ok(protectedDownload.bytes.equals(png),'Referenced image bytes changed after failed deletion');
const orphanPath=one.id+'/'+account1+'/local-quota-2.png';
const cleaned=await deletePaths([orphanPath]);
assert.ok([200,204].includes(cleaned.status),'Owner cannot remove unreferenced draft: HTTP '+cleaned.status+' '+cleaned.text);
const afterCleanup=await listOwnMedia();
allowed(afterCleanup,'List after owner-authorized orphan cleanup');
assert.equal(afterCleanup.json?.length,23,'Unreferenced draft cleanup did not restore a quota slot');
assert.equal(sql("SELECT object_count FROM texasdefined_network_internal.featured_storage_usage WHERE business_account_id='"+account1+"';"),
 '23','Atomic usage was not decremented after actual Storage DELETE');
const replacementPath=one.id+'/'+account1+'/local-replaced-orphan.png';
allowed(await upload(one,replacementPath),'Recovered Storage draft upload after cleanup');
const afterRecovery=await listOwnMedia();
assert.equal(afterRecovery.json?.length,24,'Recovered quota slot did not restore exactly 24 drafts');
assert.equal(sql("SELECT object_count FROM texasdefined_network_internal.featured_storage_usage WHERE business_account_id='"+account1+"';"),
 '24','Restored atomic count does not match final actual Storage contents');
console.log('NETWORK REAL STORAGE CLEANUP PASS: referenced review image protected, unreferenced draft deletion permitted, original bytes immutable, freed quota slot restored');

sql("UPDATE public.texasdefined_network_business_accounts SET access_enabled=false WHERE id='"+account1+"';");
const after=await rest(one.token,'texasdefined_network_profile_revisions');
allowed(after,'Existing signed JWT after account revocation');
assert.equal(after.json?.length,0,'Disabled owner could read private revisions');
denied(await req('GET','/storage/v1/object/authenticated/'+bucket+'/'+path1,anon,one.token),
 'Disabled owner private Storage download');
denied(await upload(one,one.id+'/'+account1+'/post-disable.png'),'Disabled owner private Storage upload');
console.log('NETWORK REAL LOCAL AUTH STORAGE PASS: 2 real GoTrue logins, Supabase PostgREST authenticated RLS, foreign write denial, real Storage upload/download, MIME/3MB/24-object caps and disabled-owner revocation; disposable localhost; no Graph/Stripe/customer mail');
